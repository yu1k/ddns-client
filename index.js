'use strict';

const axios = require('axios');
const cron = require('node-cron');

const path = require("path");
const ENV_FILE_PATH = path.join(__dirname, "./config.env");
require("dotenv").config({ path: ENV_FILE_PATH });

const ip = require("./lib/ip");

/**
 * 必要なクレデンシャルをチェック
 * ない場合は process.exit(1) する。
 */
if (!(process.env.DDNS_USERNAME || process.env.DDNS_PASSWORD || process.env.DDNS_HOSTNAME || process.env.SLACK_WEBHOOK_URL)) {
    console.log(
        '###############################' + '\n' +
        '# Please set env parameter... #' + '\n' +
        '###############################'
    );
    process.exit(1);
}

const GOOGLE_DOMAINS_ENDPOINT_URL = 'https://domains.google.com/nic/update';

// username:password をBase64エンコードする
const basicAuthInfo = Buffer.from(`${process.env.DDNS_USERNAME}:${process.env.DDNS_PASSWORD}`).toString('base64');
console.log(basicAuthInfo);

// DDNS のDNSレコードを更新する
async function postDdnsUpdateAPI() {
    const GOOGLE_DDNS_OPTION_HEADERS = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Basic ${basicAuthInfo}`,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    }

    //IPドレスを取得する
    let host_info = await ip.getGlobalIpAddress();
    let host_ip_addr = host_info;
    // デバッグ用
    // console.log('host_ip_addr' + host_ip_addr);

    // ログ用の時間を格納する
    let currentTime = null;

    try {
        // ログ用
        currentTime = new Date();

        const response = await axios.post(`${GOOGLE_DOMAINS_ENDPOINT_URL}?hostname=${process.env.DDNS_HOSTNAME}&myip=${host_ip_addr}`, {}, { 'headers': GOOGLE_DDNS_OPTION_HEADERS });
        // ref: https://support.google.com/domains/answer/6147083?hl=ja
        console.log('response Status: ' + response.data + "\n" + 'current time: ' + currentTime);

        // 最初のリクエスト以外で response.data が good だった場合に該当の response.data をSlackに投げる
        // ...
        let SLACK_WEBHOOK_OPTIONS_HEADERS = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        };

        if ((response.data).match(/good/)) {
            const slack_post = await axios.post(process.env.SLACK_WEBHOOK_URL, { 'channel': '#bot-test', 'username': 'DDNS更新確認くん', 'text': `${response.data}`, 'icon_emoji': ':memo:' }, { 'headers': SLACK_WEBHOOK_OPTIONS_HEADERS });
            console.log('slack response Status: ' + slack_post.data);
        }

    } catch (error) {
        console.log('response Status: ' + error);
    };
}

// 初回の実行はcronを用いず行う
postDdnsUpdateAPI();
console.log('initialize, current time: ' + new Date());

// 10分ごとに実行する
setInterval(postDdnsUpdateAPI, 600000);
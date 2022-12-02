'use strict';

const axios = require('axios');
const cron = require('node-cron');

const path = require("path");
const ENV_FILE_PATH = path.join(__dirname, "./config.env");
require("dotenv").config({ path: ENV_FILE_PATH });

const ip = require("./lib/ip");
const dns = require("./lib/dns");

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

/**
 * DNSレコードを更新する関数
 * IPv4アドレスの場合は Aレコードが更新される
 * IPv6アドレスの場合は AAAA レコードが更新される
*/
async function updateDnsRecord() {
    const GOOGLE_DDNS_OPTION_HEADERS = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Basic ${basicAuthInfo}`,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    }

    //IPドレスを取得する
    let hostIpAddress = await ip.getGlobalIpAddress();

    // DNSレコードを更新する前に更新前のIPアドレスを格納する
    let ipAddressBeforeUpdate = null;
    dns.getIpAddressViaDnsLookup(process.env.DDNS_HOSTNAME, ip.getIpAddressType(process.env.DDNS_HOSTNAME)).then((data) => {
        data = ipAddressBeforeUpdate;
    });

    // ログ用の時間を格納する変数
    let currentTime = null;

    try {
        // ログ用
        currentTime = new Date();

        // https://support.google.com/domains/answer/6147083?hl=ja
        const response = await axios.post(`${GOOGLE_DOMAINS_ENDPOINT_URL}?hostname=${process.env.DDNS_HOSTNAME}&myip=${hostIpAddress}`, {}, { 'headers': GOOGLE_DDNS_OPTION_HEADERS });
        // ログを表示させる
        console.log('response Status: ' + response.data + "\n" + 'current time: ' + currentTime);

        // 文字列のtrue, falseをBooleanに変換して SLACK_NOTICE_FLAG変数 に格納する。デフォルトではtrueとして処理を開始するようになっています。
        let SLACK_NOTICE_FLAG = true;
        if (process.env.SLACK_NOTICE_FLAG) {
            SLACK_NOTICE_FLAG = JSON.parse(process.env.SLACK_NOTICE_FLAG.toLowerCase());
        }
        if (SLACK_NOTICE_FLAG != false) {
            let SLACK_WEBHOOK_OPTIONS_HEADERS = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            };

            if ((response.data).match(/good/)) {
                // 現在のIPアドレスがDNSレコード更新前のIPアドレスと異なっていた場合にSlackへ通知する
                if (hostIpAddress != ipAddressBeforeUpdate) {
                    const slackPost = await axios.post(process.env.SLACK_WEBHOOK_URL, { 'channel': '#bot-test', 'username': 'DDNS更新確認くん', 'text': `${response.data}\nIPアドレスは更新されました。`, 'icon_emoji': ':memo:' }, { 'headers': SLACK_WEBHOOK_OPTIONS_HEADERS });
                    console.log('slack response Status: ' + slackPost.data);
                }
            }
            const slackPost = await axios.post(process.env.SLACK_WEBHOOK_URL, { 'channel': '#bot-test', 'username': 'DDNS更新確認くん', 'text': `${response.data}\nIPアドレスは更新されました。`, 'icon_emoji': ':memo:' }, { 'headers': SLACK_WEBHOOK_OPTIONS_HEADERS });
            console.log('slack response Status: ' + slackPost.data);
        }
    } catch (error) {
        console.log('response Status: ' + error);
    };
}

// 初回の実行はcronを用いず行う
updateDnsRecord();
console.log('initialize, current time: ' + new Date());

// 10分ごとに実行する
setInterval(updateDnsRecord, 600000);
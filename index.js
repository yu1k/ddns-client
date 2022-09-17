'use strict';

const axios = require('axios');
const cron = require('node-cron');

/**
 * 必要なクレデンシャルをチェック
 * ない場合は process.exit(1) する。
 */
if (!(process.env.DDNS_USERNAME || process.env.DDNS_PASSWORD || process.env.DDNS_HOSTNAME)) {
    console.log(
        '###############################' + '\n' +
        '# Please set env parameter... #' + '\n' +
        '###############################'
    );
    process.exit(1);
}

const GOOGLE_DOMAINS_ENDPOINT_URL = 'https://domains.google.com/nic/update';
const IPINFO_IO_URL = 'https://ipinfo.io/';

/**
 * 現在のIPアドレスを取得する
 * request for https://ipinfo.io/
 **/
async function getGlobalIpAddr() {
    try {
        let host_info = await axios.get(IPINFO_IO_URL);
        console.log('host_ip_addr: ' + host_info.data.ip);
        return host_info;
    } catch (error) {
        console.error('status: ' + error);
        return;
    }
}

// username:password をBase64エンコードする
const basicAuthInfo = Buffer.from(`${process.env.DDNS_USERNAME}:${process.env.DDNS_PASSWORD}`).toString('base64');
console.log(basicAuthInfo);

// DDNS のDNSレコードを更新する
async function postDdnsUpdateAPI() {
    const optionHeaders = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Basic ${basicAuthInfo}`,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
    }

    //IPドレスを取得する
    let host_info = await getGlobalIpAddr();
    let host_ip_addr = host_info.data.ip;
    // デバッグ用
    // console.log('host_ip_addr' + host_ip_addr);

    try {
        const response = await axios.post(`${GOOGLE_DOMAINS_ENDPOINT_URL}?hostname=${process.env.DDNS_HOSTNAME}&myip=${host_ip_addr}`, {}, { 'headers': optionHeaders });
        // ref: https://support.google.com/domains/answer/6147083?hl=ja
        console.log('response Status: ' + response.data);

        // 最初のリクエスト以外で response.data が good だった場合に該当の response.data をSlackに投げる
        // ...

    } catch (error) {
        console.log('response Status: ' + error);
    };
}

// 初回の実行はcronを用いず行う
postDdnsUpdateAPI();
console.log('initialize, current time: ' + new Date());

let cTime = null;
// 10分ごとに実行する
cron.schedule('*/10 * * * *', () => {
    postDdnsUpdateAPI();
    // ログ用
    cTime = new Date();
    console.log('current time: ' + cTime);
});
"use strict";

const axios = require("axios");

/**
 * 必要なクレデンシャルをチェック
 * ない場合は process.exit(1) する。
 */
/*
if (!(process.env.DDNS_USERNAME || process.env.DDNS_PASSWORD || process.env.DDNS_HOSTNAME)) {
    console.log(
        '###############################' + "\n" +
        '# Please set env parameter... #' + "\n" +
        '###############################'
    );
    process.exit(1);
}*/

const GOOGLE_DOMAINS_ENDPOINT_URL = 'https://domains.google.com/nic/update'
const IPINFO_IO_URL = 'https://ipinfo.io/'

/**
 * 現在のIPアドレスを取得する
 * request for https://ipinfo.io/
 **/
async function getGlobalIpAddr() {
    try {
        const result = await axios.get(IPINFO_IO_URL)
        console.log(result.data.ip)
    } catch (error) {
        console.error("status: " + error);
    }
}

getGlobalIpAddr();
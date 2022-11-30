"use strict";

const axios = require("axios");

/**
 * 現在のネットワーク環境からインターネットへ行く際に利用しているグローバルIPアドレスを取得してreturnで返す関数。Internet reachabilityがない環境ではnullをreturnで返す。
 * request for https://ipinfo.io/
 */
const IPINFO_IO_URL = 'https://ipinfo.io/';
async function getGlobalIpAddress() {
    let ipAddrInfo = null;
    try {
        ipAddrInfo = await axios.get(IPINFO_IO_URL, {
            responseType: "json",
            responseEncoding: "utf8"
        });
        return ipAddrInfo.data.ip;
    } catch (err) {
        if(String(err).match(/getaddrinfo ENOTFOUND/g)){
            console.error("DNSでの名前解決に失敗しました。ネットワーク環境を確認してください。" + "\n" + "エラーメッセージ: " + err);
        }
        else{
            console.error("予期しないエラーが発生しました。" + "\n" + "エラーメッセージ: " + err);
        }
        console.log("終了します。");
        return ipAddrInfo;
    }
}

module.exports = {
    getGlobalIpAddress
};
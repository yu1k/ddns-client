"use strict";

const axios = require("axios");

/**
 * 引数に指定されたIPアドレスがIPv4アドレスかIPv6アドレスか判定する。
 * IPv4の場合は IPv4 という文字列を返す
 * IPv6の場合は IPv6 という文字列を返す
 * それ以外は null を返す
 */
 function getIpAddressType(IP_ADDRESS_PROTOCOL_TYPE){
    // エラーチェック
    if(!(IP_ADDRESS_PROTOCOL_TYPE)){
        return null;
    }
    if(!(typeof IP_ADDRESS_PROTOCOL_TYPE === "string")){
        return null;
    }
    // 引数に指定した文字列がIPv4アドレス, IPv6アドレス以外の文字列だった場合
    if(!(IP_ADDRESS_PROTOCOL_TYPE.match(/^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/g) || IP_ADDRESS_PROTOCOL_TYPE.match(/^(?:(?:(?:(?:[\da-f]){1,4}:){6}|::(?:(?:[\da-f]){1,4}:){5}|(?:[\da-f]){0,4}::(?:(?:[\da-f]){1,4}:){4}|(?:(?:(?:[\da-f]){1,4}:){0,1}(?:[\da-f]){1,4})?::(?:(?:[\da-f]){1,4}:){3}|(?:(?:(?:[\da-f]){1,4}:){0,2}(?:[\da-f]){1,4})?::(?:(?:[\da-f]){1,4}:){2}|(?:(?:(?:[\da-f]){1,4}:){0,3}(?:[\da-f]){1,4})?::(?:(?:[\da-f]){1,4}:)|(?:(?:(?:[\da-f]){1,4}:){0,4}(?:[\da-f]){1,4})?::)(?:(?:[\da-f]){1,4}:(?:[\da-f]){1,4}|(?:(?:\d|[1-9]\d|1\d\d|2(?:[0-4]\d|5[0-5])).){3}(?:(?:\d|[1-9]\d|1\d\d|2(?:[0-4]\d|5[0-5]))))|(?:(?:(?:[\da-f]){1,4}:){0,5}(?:[\da-f]){1,4})?::(?:[\da-f]){1,4}|(?:(?:(?:[\da-f]){1,4}:){0,6}(?:[\da-f]){1,4})?::)$/g))){
        return null;
    }

    // IPv4
    if(IP_ADDRESS_PROTOCOL_TYPE.match(/^((?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])[.]){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/g)){
        return "IPv4";
    }

    // IPv6
    if(IP_ADDRESS_PROTOCOL_TYPE.match(/^(?:(?:(?:(?:[\da-f]){1,4}:){6}|::(?:(?:[\da-f]){1,4}:){5}|(?:[\da-f]){0,4}::(?:(?:[\da-f]){1,4}:){4}|(?:(?:(?:[\da-f]){1,4}:){0,1}(?:[\da-f]){1,4})?::(?:(?:[\da-f]){1,4}:){3}|(?:(?:(?:[\da-f]){1,4}:){0,2}(?:[\da-f]){1,4})?::(?:(?:[\da-f]){1,4}:){2}|(?:(?:(?:[\da-f]){1,4}:){0,3}(?:[\da-f]){1,4})?::(?:(?:[\da-f]){1,4}:)|(?:(?:(?:[\da-f]){1,4}:){0,4}(?:[\da-f]){1,4})?::)(?:(?:[\da-f]){1,4}:(?:[\da-f]){1,4}|(?:(?:\d|[1-9]\d|1\d\d|2(?:[0-4]\d|5[0-5])).){3}(?:(?:\d|[1-9]\d|1\d\d|2(?:[0-4]\d|5[0-5]))))|(?:(?:(?:[\da-f]){1,4}:){0,5}(?:[\da-f]){1,4})?::(?:[\da-f]){1,4}|(?:(?:(?:[\da-f]){1,4}:){0,6}(?:[\da-f]){1,4})?::)$/g)){
        return "IPv6";
    }

}

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
    getIpAddressType,
    getGlobalIpAddress
};
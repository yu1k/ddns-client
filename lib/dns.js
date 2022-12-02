"use strict";

const dns = require("dns").promises;
const { Resolver } = require("dns").promises;
const resolver = new Resolver();

// DNSリゾルバを指定する
resolver.setServers([
    "8.8.8.8",
    "8.8.4.4",
    "2001:4860:4860:0:0:0:0:8888",
    "2001:4860:4860:0:0:0:0:8844"
]);

let options = {
    family: 0,
    all: true,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
    verbatim: false
};

/**
 * 引数に指定したホスト名のAレコード、またはAAAAレコードから名前解決してIPアドレスを取得する関数。IPアドレスを取得してJSONで返す。エラー等で失敗したらnullを返します。
 * getIpAddressViaDnsLookup(ホスト名, IPv4かIPv6か);
 * リファレンス: https://nodejs.org/api/dns.html#dnslookuphostname-options-callback
 *
 * この関数の実行例(IPv4): getIpAddressViaDnsLookup("localhost", "v4").then((data) => { console.log(data); });
 * 返り値の例: {"address": "127.0.0.1", "family": 4}
 *
 * この関数の実行例(IPv6): getIpAddressViaDnsLookup("localhost", "v6").then((data) => { console.log(data); });
 * 返り値の例: {"address": "::1", "family": 6}
*/
async function getIpAddressViaDnsLookup(DDNS_HOSTNAME, IP_ADDRESS_PROTOCOL_TYPE) {
    let DDNS_HOST_IP_ADDRESS = null;
    try {
        //
        if (!(IP_ADDRESS_PROTOCOL_TYPE === "v4" || IP_ADDRESS_PROTOCOL_TYPE === "v6")) {
            return null;
        }
        if (IP_ADDRESS_PROTOCOL_TYPE === "v4") {
            options.family = 4;
            DDNS_HOST_IP_ADDRESS = await dns.lookup(DDNS_HOSTNAME, options);
        }
        if (IP_ADDRESS_PROTOCOL_TYPE === "v6") {
            options.family = 6;
            DDNS_HOST_IP_ADDRESS = await dns.lookup(DDNS_HOSTNAME, options);
        }
        // JSONに整形する
        DDNS_HOST_IP_ADDRESS = JSON.stringify(DDNS_HOST_IP_ADDRESS).replace(/\[|\]/g, "");

        return DDNS_HOST_IP_ADDRESS;
    } catch (err) {
        if (String(err).match(/ENOTFOUND/g)) {
            console.log("DNSの名前解決に失敗しました。" + "\n" + "エラーメッセージ: " + err);

            // return DDNS_HOST_IP_ADDRESS;

            return null;
        }
        if (err) {
            console.log("予期しないエラーが発生しました。終了します。" + "\n" + "エラーメッセージ: " + err);
            // return DDNS_HOST_IP_ADDRESS;

            return null;
        }
    }
}

/**
 * 引数に指定したホスト名のAレコードからIPv4アドレスを取得する関数。IPv4アドレスを取得して文字列(String)として返す。エラー等で失敗したらnullを返します。
 * getIpv4AddressViaDnsResolve(ホスト名);
 *
 * この関数の実行例(ホスト名にexample.comを指定してIPv4アドレスをconsoleに表示する): getIpv4AddressViaDnsResolve("example.com").then((data) => { console.log(data); });
 * 返り値の例: 0.0.0.0
*/
async function getIpv4AddressViaDnsResolve(DDNS_HOSTNAME) {
    let DDNS_HOST_IP_ADDRESS = null;
    try {
        DDNS_HOST_IP_ADDRESS = await resolver.resolve(DDNS_HOSTNAME, ("A"));
        DDNS_HOST_IP_ADDRESS = String(DDNS_HOST_IP_ADDRESS).replace(/\[|\]/g, "");

        return DDNS_HOST_IP_ADDRESS;
    } catch (err) {
        if (String(err).match(/ENODATA/g)) {
            console.log("引数にホスト名を指定してください。" + "\n" + "エラーメッセージ: " + err);
            return null;
        }
        if (String(err).match(/ENOTFOUND/g)) {
            console.log("DNSの名前解決に失敗しました。" + "\n" + "エラーメッセージ: " + err);
            return null;
        }
        if (err) {
            console.log("予期しないエラーが発生しました。終了します。" + "\n" + "エラーメッセージ: " + err);
            return null;
        }
    }
}

/**
 * 引数に指定したホスト名のAAAAレコードからIPv6アドレスを取得する関数。IPv6アドレスを取得して文字列(String)として返す。エラー等で失敗したらnullを返します。
 * getIpv6AddressViaDnsResolve(ホスト名);
 *
 * この関数の実行例(ホスト名にexample.comを指定してIPv6アドレスをconsoleに表示する): getIpv6AddressViaDnsResolve("example.com").then((data) => { console.log(data); });
 * 返り値の例: 2001:0db8:0000:0000:0000:0000:0000:0001
*/
async function getIpv6AddressViaDnsResolve(DDNS_HOSTNAME) {
    let DDNS_HOST_IP_ADDRESS = null;
    try {
        DDNS_HOST_IP_ADDRESS = await resolver.resolve(DDNS_HOSTNAME, ("AAAA"));
        DDNS_HOST_IP_ADDRESS = String(DDNS_HOST_IP_ADDRESS).replace(/\[|\]/g, "");

        return DDNS_HOST_IP_ADDRESS;
    } catch (err) {
        if (String(err).match(/ENODATA/g)) {
            console.log("引数にホスト名を指定してください。" + "\n" + "エラーメッセージ: " + err);
            return null;
        }
        if (String(err).match(/ENOTFOUND/g)) {
            console.log("DNSの名前解決に失敗しました。" + "\n" + "エラーメッセージ: " + err);
            return null;
        }
        if (err) {
            console.log("予期しないエラーが発生しました。終了します。" + "\n" + "エラーメッセージ: " + err);
            return null;
        }
    }
}

module.exports = {
    getIpAddressViaDnsLookup,
    getIpv4AddressViaDnsResolve,
    getIpv6AddressViaDnsResolve
};
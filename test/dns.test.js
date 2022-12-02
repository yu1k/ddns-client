"use strict";

const dns = require("../lib/dns");

describe("dnsモジュールをテストする。", () => {
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhost", 4).then((data) => {
            expect(JSON.parse(data).address).toStrictEqual("127.0.0.1");
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhost", "IPv4").then((data) => {
            expect(JSON.parse(data).address).toStrictEqual("127.0.0.1");
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhost", "v4").then((data) => {
            expect(JSON.parse(data).address).toStrictEqual("127.0.0.1");
        });
    });

    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhost", 6).then((data) => {
            expect(JSON.parse(data).address).toStrictEqual("::1");
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhost", "v6").then((data) => {
            expect(JSON.parse(data).address).toStrictEqual("::1");
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhost", "IPv6").then((data) => {
            expect(JSON.parse(data).address).toStrictEqual("::1");
        });
    });

    // getIpAddressViaDnsLookup関数の例外処理を起こすテスト
    test("dns.getIpAddressViaDnsLookup関数の引数に存在しないホスト名を指定してnullが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhos", 4).then((data) => {
            expect(data).toStrictEqual(null);
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数に存在しないホスト名を指定してnullが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("localhos", 6).then((data) => {
            expect(data).toStrictEqual(null);
        });
    });

    // getIpv4AddressViaDnsResolve関数のテスト
    test("dns.getIpv4AddressViaDnsResolve関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpv4AddressViaDnsResolve("dns.google.com").then((data) => {
           expect(data).toEqual(expect.stringMatching(/8.8.8.8/g));
        });
    });
    test("dns.getIpv4AddressViaDnsResolve関数の引数に存在しないホスト名を指定してnullが返ってくるか。", () => {
        return dns.getIpv4AddressViaDnsResolve("localhos").then((data) => {
            expect(data).toBe(null);
        });
    });

    // getIpv6AddressViaDnsResolve関数のテスト
    test("dns.getIpv6AddressViaDnsResolve関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpv6AddressViaDnsResolve("dns.google.com").then((data) => {
            expect(data).toEqual(expect.stringMatching(/2001:4860:4860::8888/g));
        });
    });
    test("dns.getIpv6AddressViaDnsResolve関数の引数に存在しないホスト名を指定してnullが返ってくるか。", () => {
        return dns.getIpv6AddressViaDnsResolve("localhos").then((data) => {
            expect(data).toBe(null);
        });
    });

});

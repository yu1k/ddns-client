"use strict";

const dns = require("../lib/dns");

describe("dnsモジュールをテストする。", () => {
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("dns.google.com", 4).then((data) => {
            expect(data).toEqual(expect.stringMatching(/8.8.8.8|8.8.4.4/g));
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("dns.google.com", "IPv4").then((data) => {
            expect(data).toEqual(expect.stringMatching(/8.8.8.8|8.8.4.4/g));
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv4アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("dns.google.com", "v4").then((data) => {
            expect(data).toEqual(expect.stringMatching(/8.8.8.8|8.8.4.4/g));
        });
    });

    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("dns.google.com", 6).then((data) => {
            expect(data).toStrictEqual(expect.stringMatching(/2001:4860:4860::8888|2001:4860:4860::8844|::ffff:8.8.8.8|::ffff:8.8.4.4/g));
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("dns.google.com", "v6").then((data) => {
            expect(data).toStrictEqual(expect.stringMatching(/2001:4860:4860::8888|2001:4860:4860::8844|::ffff:8.8.8.8|::ffff:8.8.4.4/g));
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("dns.google.com", "IPv6").then((data) => {
            expect(data).toStrictEqual(expect.stringMatching(/2001:4860:4860::8888|2001:4860:4860::8844|::ffff:8.8.8.8|::ffff:8.8.4.4/g));
        });
    });
    test("dns.getIpAddressViaDnsLookup関数の引数にホスト名を指定してIPv6アドレスが返ってくるか。", () => {
        return dns.getIpAddressViaDnsLookup("example.com", "IPv6").then((data) => {
            expect(data).toStrictEqual(expect.stringMatching(/2606:2800:220:1:248:1893:25c8:1946|::ffff:93.184.216.34/g));
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
           expect(data).toEqual(expect.stringMatching(/8.8.8.8|8.8.4.4/g));
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
            expect(data).toEqual(expect.stringMatching(/2001:4860:4860::8888|2001:4860:4860::8844/g));
        });
    });
    test("dns.getIpv6AddressViaDnsResolve関数の引数に存在しないホスト名を指定してnullが返ってくるか。", () => {
        return dns.getIpv6AddressViaDnsResolve("localhos").then((data) => {
            expect(data).toBe(null);
        });
    });

});

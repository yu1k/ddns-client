"use strict";

const ip = require("../lib/ip");

// テンプレート
describe("runs template", () => {
    test("1は1であることを確認する", () => {
        expect(1).toBe(1);
    });
});

describe("ip モジュールをテストする。", () => {
    // getGlobalIpAddress() 関数のテスト
    test("8ビットごとにドットを境にして表記されているか。正しいIPアドレスの形式になっているか。", () => {
        return ip.getGlobalIpAddress().then((data) => {
            expect(data.match(/\./g).length).toBe(3);
        });
    });

    // getIpAddressType() 関数のテスト
    test("getIpAddressType() の引数にIPv4アドレスを指定して IPv4 の文字列が帰ってくるか", () => {
        expect(ip.getIpAddressType("192.0.2.0")).toBe("IPv4");
    });
    test("getIpAddressType() の引数にIPv4アドレスを指定して IPv4 の文字列が帰ってくるか", () => {
        expect(ip.getIpAddressType("127.0.0.1")).toBe("IPv4");
    });
    test("getIpAddressType() の引数にIPv6アドレスを指定して IPv6 の文字列が帰ってくるか", () => {
        expect(ip.getIpAddressType("2001:db8::")).toBe("IPv6");
    });
    test("getIpAddressType() の引数にIPv6アドレスを指定して IPv6 の文字列が帰ってくるか", () => {
        expect(ip.getIpAddressType("::1")).toBe("IPv6");
    });
    test("getIpAddressType() の引数に存在しないIPアドレスを指定して null が帰ってくるか", () => {
        expect(ip.getIpAddressType("192.0.2.256")).toBe(null);
    });
    test("getIpAddressType() の引数に存在しないIPアドレスを指定して null が帰ってくるか", () => {
        expect(ip.getIpAddressType("192.0.2")).toBe(null);
    });
});

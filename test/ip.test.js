"use strict";

const ip = require("../lib/ip");

// テンプレート
describe("runs template", () => {
    test("1は1であることを確認する", () => {
        expect(1).toBe(1);
    });
});

// IPv4 の環境でテストする
describe("ip モジュールをテストする。", () => {
    // getGlobalIpAddress() 関数のテスト
    test("8ビットごとにドットを境にして表記されているか。正しいIPアドレスの形式になっているか。", () => {
        return ip.getGlobalIpAddress().then((data) => {
            expect(data.match(/\./g).length).toBe(3);
        });
    });
});

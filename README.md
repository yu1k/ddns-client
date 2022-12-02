# ddns-client

[![CI](https://github.com/yu1k/ddns-client/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/yu1k/ddns-client/actions/workflows/ci.yml)

## description

ddns-client は現在のグローバルIPv4アドレスまたはIPv6アドレスを取得します。

取得したIPアドレスをネームサーバーに通知し、ダイナミックDNSサービスで登録してあるホスト名のAレコード、またはAAAAレコードを更新するツールです。

## Requirement

### 確認済みの環境:

- OS: Ubuntu 20.04, macOS
- シェル: bash
- Node.js Version: v16.18.0
- docker -v: `Docker version 20.10.18`
- docker-compose -v: `docker-compose version 1.29.2`

## Usage

### Dockerコンテナ上の環境で動かしたい場合

1. `./config.env` ファイルに各種設定を書きます。
    
    ```
    DDNS_USERNAME=xxx
    Google domains ダイナミックDNSでDDNSの設定を行なった際に、Google domainsから払い出されたユーザ名を格納します。
    
    DDNS_PASSWORD=xxx
    Google domains ダイナミックDNSでDDNSの設定を行なった際に、Google domainsから払い出されたパスワードを格納します。
    DDNS_HOSTNAME=host.example.com
    Google domains ダイナミックDNSでDDNSの設定を行なった際に、登録したホスト名を格納します。
    
    SLACK_NOTICE_FLAG=true or false
    Slackに通知したいかを true, false で指定します。ddns-client でのデフォルトではSlackへ通知しない設定になっています。
    true: Slackへ通知します。
    false: Slackへ通知しません。
    
    SLACK_WEBHOOK_URL=xxx
    Slackで通知したい場合にWebhookインテグレーションを設定します。その際に払い出されたWebhook URLを格納します。
    ```

2. 以下のコマンドを実行して起動します。

    ```
    $ git clone https://github.com/yu1k/ddns-client.git ddns-client && cd $_
    $ docker-compose up -d --build
    docker-compose を利用してコンテナを起動させます。
    ```

3. 停止や再起動したい場合は以下のコマンドを実行します。

    ```
    $ docker-compose restart [container_name]
    指定したコンテナを再起動します。

    $ docker-compose stop [container_name]
    指定したコンテナを停止します。

    $ docker-compose down --rmi local
    起動したコンテナを停止し、コンテナ、ネットワーク、ボリューム、イメージ等の関連するリソースを削除します。
    ```

### ホストOSの環境で動かしたい場合

...

### Run test

```
$ npm run test
```

自動テストを実行する。

## 機能

- [x] Google Domains ダイナミック DNS への対応
- [ ] [OPEN IPv6 ダイナミック DNS for フレッツ・光ネクスト への対応](https://i.open.ad.jp/)
- [x] 定時実行
- [x] IPアドレスに変更があった場合、Webhook経由でSlackへPOSTして通知する処理
- [x] Docker コンテナ上で動作する
- [ ] ホストOSの環境で動かしたい場合の説明を書く
- [ ] テストを追加する

## Thanks

ddns-client は、[ipinfo.io](https://ipinfo.io/)を使用してグローバルIPアドレスを取得します。

IPv6アドレスの正規表現は [IPv6 対応 Web アプリケーション開発作法 -  Internet Week 2011](https://www.nic.ad.jp/ja/materials/iw/2011/proceedings/t5/t5-04.pdf) 資料のページを参考しました。
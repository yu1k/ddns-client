# ddns-client

## 動作環境

- OS: Ubuntu 20.04
- シェル: bash
- Node.js Version: ...

- docker -v: `Docker version 20.10.18`
- docker-compose -v: `docker-compose version 1.29.2`

## 起動方法

### Dockerコンテナ上の環境で動かしたい場合

1. `./config.env` ファイルに各種設定を書く

2. 以下のコマンドを実行して起動する

    ```
    $ git clone https://github.com/yu1k/ddns-client.git ddns-client && cd $_
    $ docker-compose up -d --build
    docker-compose を利用してコンテナを起動させる
    ```

3. 停止や再起動したい場合は以下のコマンドを実行する

    ```
    $ docker-compose restart [container_name]
    指定したコンテナを再起動する

    $ docker-compose stop [container_name]
    指定したコンテナを停止する

    $ docker-compose down --rmi local
    起動したコンテナを停止し、コンテナ、ネットワーク、ボリューム、イメージ等の関連するリソースを削除する
    ```

### Linux 環境で動かしたい場合

```
$ git clone https://github.com/yu1k/ddns-client.git ddns-client && cd $_ && npm install
$ env DDNS_USERNAME='xxx' DDNS_PASSWORD='xxx' DDNS_HOSTNAME='xxx' SLACK_WEBHOOK_URL='xxx' npm start
```

## 機能

- [x] Google Domains ダイナミック DNS への対応
- [ ] [OPEN IPv6 ダイナミック DNS for フレッツ・光ネクスト への対応](https://i.open.ad.jp/)
- [x] 定時実行
- [ ] IPアドレスに変更があった場合、Webhook経由でSlackへPOSTして通知する処理
- [x] Docker コンテナ上で動作する
- [ ] テストを追加

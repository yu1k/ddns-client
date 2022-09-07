# ddns-client

## 起動方法

```
$ git clone https://github.com/yu1k/ddns-client.git ddns-client && cd $_ && npm install
$ env DDNS_USERNAME='xxx' DDNS_PASSWORD='xxx' DDNS_HOSTNAME='xxx' SLACK_WEBHOOK_URL='xxx' npm start
```

## 機能

- [ ] IPアドレスに変更があった場合、Webhook経由でSlackへPOSTして通知する処理
- [ ] Docker コンテナ上で動作する

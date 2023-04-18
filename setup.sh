#!/bin/bash

set -euxo pipefail

DOCKER_DAEMON_CONFIG_FILE='/etc/docker/daemon.json'
# /etc/docker/daemon.json ファイルが存在しない場合のみコピー処理を行う
if [ ! -e $DOCKER_DAEMON_CONFIG_FILE ]; then
    # DockerのデーモンでIPv6サポートを有効にする設定をします。
    # 参考1: https://docs.docker.jp/config/daemon/ipv6.html
    # 参考2: https://docs.docker.jp/engine/userguide/networking/default_network/ipv6.html
    # fixed-cidr-v6 キーで指定したIPv6 ULAアドレスは docker0 に設定されます。
    cp ./docker_daemon.json /etc/docker/daemon.json
    systemctl restart docker.service
    echo 'done...'
    exit 0
else
    echo '/etc/docker/daemon.json ファイルが存在します。処理を終了します。'
    exit 1
fi

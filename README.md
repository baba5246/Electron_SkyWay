# Electron_SkyWay
ElectronでSkyWayを使うサンプルアプリです。

```
$ npm install
```
を実行して依存ライブラリをインストールします。
```
$ npm run build
```
を実行するとWindows, Mac, Linuxの３つのパッケージが作成されます。  
個別にパッケージを作成したい場合は
```
$ npm run build_win
$ npm run build_linux
$ npm run build_mac
```
のいずれかを実行します。

作成された実行ファイル実行します。  
ログに、
```
My Id:XXXXXXXXXXXXXXXX
```
と表示されれば、SkyWay接続成功です。  
起動したまま、もう一つ実行ファイルを実行すると、自動的に接続されカメラもしくはスクリーンの映像がシェアされます。
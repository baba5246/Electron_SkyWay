# Electron_SkyWay for Ishiguro Lab

ElectronでSkyWayを使うサンプルアプリ [Electron_Skyway](https://github.com/turbographics2000/Electron_SkyWay) を少し修正したアプリです。

## 前準備

1. Skyway というサービスを使ってビデオ通信（WebRTC）を行います
    * 事前に[こちらから](https://webrtc.ecl.ntt.com/)無料版に会員登録して、 API キーを作成してください
    * **注意：APIキーの設定を変更し、「利用可能ドメイン」に "electron" と入力して保存しておいてください**

2. git と Node.js を PC にインストールしてください。
    * **注意：Node.js はバージョン `12.3.1` をインストールしてください**
    * 他のバージョンでも動くかもしれませんが、保証しません


## 使い方

Mac/Linux の例です。Windows も Powershell を使用すれば同様のことができると思います。

1. Github からリポジトリをクローンしてきます。または、下記リンクにアクセスし Code > Download Zip でファイルをダウンロードしてください。

    ```
    $ git clone https://github.com/baba5246/Electron_SkyWay.git
    ```

2. Terminal または Powershell でフォルダ内に移動し、ライブラリをインストールします

    ```
    $ cd Electron_Skyway
    $ npm install
    ```

3. window.js の変数 `SkyWay_ApiKey` に作成した Skyway の API キーを入力します

3. デスクトップアプリを作成します

    ```
    $ npm run build
    ```

    * 上記を実行すると、Windows, Mac, Linuxの３つのパッケージが作成されます
    * 個別にパッケージを作成したい場合は、以下のいずれかを実行します。

        ```
        $ npm run build_win
        $ npm run build_linux
        $ npm run build_mac
        ```

4. 作成された実行ファイル実行します。
    * ログに以下が表示されれば成功です
        ```
        My Id:XXXXXXXXXXXXXXXX
        ```
    * 起動したまま、もう一つ実行ファイルを実行すると、自動的に接続されカメラもしくはスクリーンの映像がシェアされます。

![スクリーンショット](electron_skyway_ss.png)

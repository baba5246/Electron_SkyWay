const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let win = null;

app.on('window-all-closed', _ => {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', _ => {
    electron.session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['Origin'] = 'electron://electron';
        callback({
            cancel: false,
            requestHeaders: details.requestHeaders
        });
    });

    win = new BrowserWindow({ width: 800, height: 600 });
    win.loadURL('file://' + __dirname + '/window.html');
    //win.webContents.openDevTools();
    win.on('closed', _ => {
        win = null;
    });
});

// Sota へのソケット通信の例
const net = require('net');
const port = 8000
const host = '192.168.0.1'
client = net.Socket();
client.connect(port, host, null);
client.write('motion raiseHand\n')
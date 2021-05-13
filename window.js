

const {desktopCapturer} = require('electron');

const SkyWay_ApiKey = 'YOUR-SKYWAY-API-KEY';
let peer = null;
let peerList = null;

window.onload = _ => {
    peer = new Peer({
        key: SkyWay_ApiKey,
        debug: 3
    });
    peer.on('open', async _ => {
        addMsg(`My Id:${peer.id}`);
        try {
            // 動作検証を楽にするため、２つ起動すると自動的に接続するようにする。(1:1のみ)
            peerList = await listAllPeers();
            addMsg(`peerList.length = ${peerList.length}`);
            if (peerList.length === 2) {
                callPeerId = peerList.filter(peerId => peerId !== peer.id)[0];
                await call(callPeerId);
            }
        } catch (err) {
            addMsg(err);
        }
    });
    peer.on('call', async call => {
        setupCallEventHandlers(call);
        const stream = await getLocalStream();
        call.answer(stream);
    });
};

function listAllPeers() {
    return new Promise((resolve, reject) => {
        peer.listAllPeers(peerList => {
            resolve(peerList);
        });
    });
}

function getVideoInputDevices() {
    return navigator.mediaDevices.enumerateDevices().then(devices => {
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        addMsg(`videoInputs.length = ${videoInputs.length}`);
        if (videoInputs.length) return videoInputs;
        throw new Error('カメラが接続されていません。');
    });
}

function getDesktopWindows() {
    return new Promise((resolve, reject) => {
        desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
            resolve(sources);
        });
    });
}

async function getLocalStream() {
    try {
        // 複数のカメラが接続されている場合、ユーザーごとに別々のカメラを使用する。
        // 接続されているカメラが一つだけ、かつ動作喧噪を１つのPCで行う場合、
        // 別々のプロセスから同じカメラにアクセスできないため、Screen Shareも併用する。(カメラ優先)
        const cameraDevices = await getVideoInputDevices();
        const screens = await getDesktopWindows();
        const captureSources = [...cameraDevices, ...screens];
        const captureSource = captureSources[peerList.indexOf(peer.id)];
        const constraints = { audio: false }; // ハウるので音声なし。
        if (captureSource.deviceId) {
            constraints.video = { deviceId: captureSource.deviceId };
        } else {
            constraints.video = {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: captureSource.id,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720
                }
            };
        }
        addMsg(`video capture from "${captureSource.label || captureSource.name}"`);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localView.srcObject = stream;
        return stream;
    } catch (err) {
        addMsg(err);
    }
}

async function call(peerId) {
    addMsg(`call to ${peerId}`);
    const stream = await getLocalStream();
    const call = peer.call(peerId, stream);
    setupCallEventHandlers(call);
}

function setupCallEventHandlers(call) {
    call.on('stream', stream => {
        addMsg('on stream');
        remoteView.srcObject = stream;
    });
    call.on('close', _ => {
        console.log('call closed.');
    });
}

function addMsg(msg) {
    const elmRow = document.createElement('div');
    const elmTime = document.createElement('span');
    const elmMsg = document.createElement('span');
    const dt = new Date();
    const h = `${dt.getHours()}`.padStart(2, '0');
    const m = `${dt.getMinutes()}`.padStart(2, '0');
    const s = `${dt.getSeconds()}`.padStart(2, '0');
    const ms = `${dt.getMilliseconds()}`.padEnd(3, '0');
    
    elmTime.textContent =`${h}:${m}:${s}.${ms}`;
    elmTime.className = 'log-time';
    elmMsg.textContent = `${msg.message || msg}`;
    elmMsg.className = 'log-msg';
    elmRow.appendChild(elmTime);
    elmRow.appendChild(elmMsg);
    elmRow.className = 'log-row';
    msgContainer.insertBefore(elmRow, msgContainer.firstChild);
}

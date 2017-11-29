window.onload = _ => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.google.co.jp?xhr');
    xhr.onload = _ => {
        console.log('xhr success.');
    }
    xhr.onerror = err => {
        console.log('xhr fail.', err);
    };
    xhr.send();

    fetch('https://www.google.co.jp?fetch')
        .then(res => res.text())
        .then(txt => console.log('fetch success.'))
        .catch(err => console.log('fetch error.', err));

    const ws = new WebSocket('ws://demos.kaazing.com/echo');
    ws.onopen = _ => {
        ws.close();
    };
    ws.onclose = res => {
        console.log(`ws res code:${res.code}`);
    };
};
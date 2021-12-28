let ws = new WebSocket("ws://localhost:3001");
ws.addEventListener('open', function (event) {
    ws.send('Hello Ws Server!');
});
ws.addEventListener('close', function (event) {
    ws.send('ws close!');
});
ws.addEventListener('message', function (event) {
    let data = event.data;
    try {
        console.log(JSON.parse(data))
    } catch {
        console.log(data)
    }
});
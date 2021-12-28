const Koa = require('koa');
const app = new Koa();
import fs from 'fs'
import path from 'path'
import { WebSocketServer } from 'ws';



app.use(async (ctx: any) => {
    ctx.type = "html";
    // ctx.body = fs.readFileSync(path.join(__dirname, './index.html'));
    console.log(path)
    ctx.body = {
        data: 'wangwenjian12'
    }
});

app.listen(3000);
console.log('listen 3000')

async function createWebSocketServer() {
    let obj = connent()
    let wsServer = await resolveHttpServer(obj)
    let wss = new WebSocketServer({ noServer: true });
    wsServer.on('upgrade', (req: any, socket: any, head: any) => {
        if (req.headers['sec-websocket-protocol'] === 'vite-hmr') {
            wss.handleUpgrade(req, socket, head, (ws: any) => {
                wss.emit('connection', ws, req);
            });
        }
    })
}

function connent() {
    // TODO NodeJS.EventEmitter
    // function app(req, res, next) { app.handle(req, res, next); }
    // merge(app, proto);
    // merge(app, EventEmitter$3.prototype);
    // app.route = '/';
    // app.stack = [];
    return {};
}

// 创建http服务
async function resolveHttpServer(app: any) {
    return require('http').createServer(app);
}
// async function createWebSocketServer(server: any, config:any,) {
//     return require('http').createServer(app);
// }

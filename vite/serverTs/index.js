"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require('koa');
const app = new Koa();
const path_1 = __importDefault(require("path"));
const ws_1 = require("ws");
app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.type = "html";
    // ctx.body = fs.readFileSync(path.join(__dirname, './index.html'));
    console.log(path_1.default);
    ctx.body = {
        data: 'wangwenjian12'
    };
}));
app.listen(3000);
console.log('listen 3000');
function createWebSocketServer() {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = connent();
        let wsServer = yield resolveHttpServer(obj);
        let wss = new ws_1.WebSocketServer({ noServer: true });
        wsServer.on('upgrade', (req, socket, head) => {
            if (req.headers['sec-websocket-protocol'] === 'vite-hmr') {
                wss.handleUpgrade(req, socket, head, (ws) => {
                    wss.emit('connection', ws, req);
                });
            }
        });
    });
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
function resolveHttpServer(app) {
    return __awaiter(this, void 0, void 0, function* () {
        return require('http').createServer(app);
    });
}
// async function createWebSocketServer(server: any, config:any,) {
//     return require('http').createServer(app);
// }

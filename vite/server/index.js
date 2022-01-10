import Koa from 'koa';
const app = new Koa();
import fs from 'fs'
import path from 'path'
import config from './config.js'
import { createWebSocketServer, createWatcher } from './plugin.js'

function createServer() {
    // 创建webSocketServer
    let ws = createWebSocketServer(config)
    // 监听开发环境文件
    let watcher = createWatcher(config)
    watcher
        .on('add', file => {
            ws.send(`新建【${file}】`)
            console.log(`新建：${file}】`)
        })
        .on('change', file => {
            file = path.normalize(file)
            ws.send(`更改【${file}】`)
            console.log(`更改【${file}】`)

            try {
                await handleHMRUpdate(file, server);
            }
            catch (err) {
                ws.send({
                    type: 'error',
                    err: JSON.stringify(err)
                });
            }
        })
        .on('unlink', file => {
            ws.send(`删除【${file}】`)
            console.log(`删除【${file}】`)
        })
        .on('error', error => {
            console.log(`Error: ${error}`)
        })


    app.use(async (ctx) => {
        ctx.type = "html";
        ctx.body = fs.readFileSync(path.resolve('./vite/server/index.html'));
    });
    app.listen(3000);
    console.log('listen: 3000')
}

createServer()


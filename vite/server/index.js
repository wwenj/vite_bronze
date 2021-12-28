import Koa from 'koa';
const app = new Koa();
import fs from 'fs'
import path from 'path'
import config from './config.js'
import { createWebSocketServer, createWatcher} from  './plugin.js'

// 创建webSocketServer
let ws = createWebSocketServer(config)
// 监听开发环境文件
let watcher = createWatcher(config)
watcher
    .on('add', path => {
        ws.send(`新建【${path}】`)
        console.log(`新建：${path}】`)
    })
    .on('change', path =>{
        ws.send(`更改【${path}】`)
        console.log(`更改【${path}】`)
    })
    .on('unlink', path => {
        ws.send(`删除【${path}】`)
        console.log(`删除【${path}】`)
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





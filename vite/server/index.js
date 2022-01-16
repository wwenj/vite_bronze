import Koa from 'koa';
const app = new Koa();
import fs from 'fs'
import path from 'path'
import config from './config.js'
import { createWebSocketServer, createWatcher } from './plugin.js'

// 返回相对路径
function getShortName(file, root) {
    return file.startsWith(root + '/') ? path.posix.relative(root, file) : file
}

// 创建dev server
function createServer() {
    // 创建 webSocketServer，用于热更新通信
    let ws = createWebSocketServer(config)

    // 创建 Watcher 监听开发环境文件
    let watcher = createWatcher(config)
    watcher
        .on('add', file => {
            console.log(`新建：${file}】`)
            ws.send({
                type: 'full-reload',
                path: '*'
            })
        })
        .on('change', file => {
            file = path.normalize(file)
            console.log(`更改【${file}】`)
            let shortName = '/' + getShortName(file, config.root)
            let update = {
                path: shortName,
                timestamp: Date.now()
            }
            if (shortName.endsWith('.js') || shortName.endsWith('.css')) {
                update.type = 'js-update'
            } else {
                update = { type: 'full-reload' }
            }
            ws.send(update)
        })
        .on('unlink', file => {
            console.log(`删除【${file}】`)
            ws.send({
                type: 'full-reload',
                path: '*'
            })
        })
        .on('error', error => {
            console.log(`Error: ${error}`)
        })


    app.use(async (ctx) => {
        // const { request: { url, query } } = ctx
        let url = ctx.path
        // if (url.split('')[0] !== '.' && url.split('')[0] !== '/') {
        //     console.log(url)
        //     ctx.type = 'application/javascript'
        //     ctx.body = 'module'
        //     return
        // }
        if (url == '/') {
            // 入口html
            ctx.type = "text/html";
            ctx.body = fs.readFileSync(path.resolve(config.root, 'index.html'), 'utf-8');
        } else if (url.endsWith('.css')) {
            // .css文件处理
            const style = fs.readFileSync(path.resolve(config.root, url.slice(1)), 'utf-8')
            let content = `
                const css = "${style.replace(/\n/g, '')}"
                let linkDom = document.createElement('style')
                linkDom.setAttribute('type', 'text/css')
                document.head.appendChild(linkDom) 
                linkDom.innerHTML = css`
            ctx.type = 'application/javascript'
            ctx.body = content
        } else if (url.endsWith('.js')) {
            // .js文件处理
            const content = fs.readFileSync(path.resolve(config.root, url.slice(1)), 'utf-8')
            ctx.type = 'application/javascript'
            ctx.body = content
        } else if (url.endsWith('.png')) {
            // .png文件处理
            const content = fs.readFileSync(path.resolve(config.root, url.slice(1)))
            ctx.type = 'image/png'
            ctx.body = content
        } else if (url === '/@vite/client') {
            const content = fs.readFileSync(path.resolve('./vite/client/index.js'), 'utf-8')
            ctx.type = 'application/javascript'
            ctx.body = content
        } else {
            console.log('未定义该类型:' + url)
        }
    });
    app.listen(config.server.port);
    console.log(`Vite dev server running！\nlocal:http://localhost:${config.server.port}`)
}

createServer()

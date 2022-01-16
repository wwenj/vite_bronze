import { WebSocketServer } from 'ws';
import chokidar from 'chokidar';

// 创建webSocket
export function createWebSocketServer(config) {
    const wss = new WebSocketServer({ port: 8888 });
    wss.on('connection', function connection(socket) {
        socket.send(JSON.stringify({ type: 'connected' }))
        socket.on('message', function message(data) {
            console.log('接受客户端WS信息: %s', data);
        });
    });
    return {
        on: wss.on.bind(wss),
        off: wss.off.bind(wss),
        send(payload) {
            if (wss.clients.size) {
                const stringified = JSON.stringify(payload)
                wss.clients.forEach((client) => {
                    if (client.readyState === 1) {
                        client.send(stringified)
                    }
                })
            }
        },
        close() {
            console.log('ws断开连接')
        }
    }
}
// chokidar 文件监听
export function createWatcher(config) {
    return chokidar.watch(config.root, {
        // 不监听文件
        ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/.DS_Store/**',
        ],
        ignoreInitial: true,
        ignorePermissionErrors: true, // 无权限文件忽略错误
        disableGlobbing: true, //watch传递路径字符串
    })
}

export function createPluginContainer({ plugins, logger, root, build: { rollupOptions } }, moduleGraph, watcher) {
    const container = {
        options: {

        },
        getModuleInfo(){
            
        },
        // 开始打包
        async buildStart() {
        },

        async resolveId(rawId, importer = join(root, 'index.html'), options) {

        },

        async load(id, options) {

        },

        async transform(code, id, options) {

        },

        async close() {
        }
    }
    return container
}
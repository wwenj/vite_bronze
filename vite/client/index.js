// 客户端插入ws代码
let ws = new WebSocket("ws://localhost:8888");
ws.addEventListener('open', function (event) {
    ws.send('ws open!');
});
ws.addEventListener('close', function (event) {
    console.log('ws close!')
});

// 接受服务端ws，触发模块更新
ws.addEventListener('message', function (event) {
    let data = event.data;
    try {
        let update = JSON.parse(data)
        // console.log(update)
        switch (update.type) {
            case 'connected':
                console.log(`[vite] connected.`)
                // setInterval(() => ws.send('ping'),5000)
                break
            case 'full-reload':
                location.reload()
                break
            case 'js-update':
                fetchUpdate(update)
                break
        }
    } catch {
        console.log(data)
    }
});

// 对于代码变更的模块重新发起请求
let fetchUpdate = async function (update) {
    let { path, timestamp } = update
    await import(`${location.href}${path.slice(1)}?import&t=${timestamp}`)
    console.log(`[vite] hot updated: ${path}`)
}

// css link更新
// let cssUpdate = function (update) {
//     let { path, timestamp } = update
//     path = path.replace(/\?.*/, '')
//     const el = Array.from(
//         document.querySelectorAll('link')
//     ).find((e) => e.href.includes(path))
//     if (el) {
//         el.href = `${location.href}${path.slice(1)}${path.includes('?') ? '&' : '?'}t=${timestamp}`
//     }
//     console.log(`[vite] css hot updated: ${path}`)
// }

// 更新css
// export function updateStyle(id, content) {
//     let style = sheetsMap.get(id)
//     if (style && !(style instanceof CSSStyleSheet)) {
//         removeStyle(id)
//         style = undefined
//     }

//     if (!style) {
//         style = new CSSStyleSheet()
//         style.replaceSync(content)
//         // @ts-ignore
//         document.adoptedStyleSheets = [...document.adoptedStyleSheets, style]
//     } else {
//         style.replaceSync(content)
//     }
//     sheetsMap.set(id, style)
// }
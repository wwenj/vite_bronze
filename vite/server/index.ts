const Koa = require('koa');
const app = new Koa();
const fs = require('fs')
const path = require('path')


app.use(async (ctx: any) => {
    ctx.type = "html";
    // ctx.body = fs.readFileSync(path.join(__dirname, './index.html'));
    ctx.body = {
        data:'wangwenjia11n'
    }
});

app.listen(3000);
console.log('listen 3000')


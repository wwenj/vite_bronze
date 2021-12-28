import path from 'path'
export default {
    root: path.resolve('./src'),
    server: {
        "port": 3001,
        "fs": {
            "strict": true,
            "allow": [
                "/Users/wangwenjian/Desktop/Private/code/viteHtml"
            ],
            "deny": [
                ".env",
                ".env.*",
                "*.{crt,pem}"
            ]
        }
    }
}
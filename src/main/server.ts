import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
app.set('port', '3000') //监听3000端口，地址为 http://localhost:3000

app.all('*', function (req, res, next) {
  // 解决跨域问题
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

// 配置代理
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://example.com', // 目标服务器
    changeOrigin: true, // 更改请求头中的 `Host` 为目标 URL
    pathRewrite: {
      '^/api': '' // 重写路径，例如将 `/api/users` 重写为 `/users`
    }
  })
)

// 启动服务器
const server = app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000')
})

// 如果使用 WebSocket，确保服务器实例也能处理 WebSocket 连接
server.on(
  'upgrade',
  createProxyMiddleware({
    target: 'http://example.com', // 目标 WebSocket 服务器
    changeOrigin: true,
    ws: true // 启用 WebSocket 支持
  }).upgrade
)

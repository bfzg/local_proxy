import express, { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import fs from 'fs'
import { getFilePath } from './utils/path'

type ProxyItem = {
  id: string
  enable: boolean
  matchUrl: string
  target: string
  isReplace: boolean
  pathRewriteOrigin: string
  pathRewriteTarget: string
}

let server: any // 用于存储服务器实例
let app: Express // 保存 express 实例
let proxyOptions: ProxyItem[] // 从配置中加载的代理选项

const loadProxyConfig = (): ProxyItem[] => {
  const configPath = getFilePath('config.json')
  const configFile = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(configFile)
}

// 创建并启动服务器的函数
const createServer = (): void => {
  app = express()
  app.set('port', '3001') // 设置端口

  // 解决跨域问题的中间件
  app.all('*', function (req, res, next) {
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

  // 使用加载的配置应用代理
  proxyOptions.forEach((item) => {
    if (!item.enable) return
    app.use(
      item.matchUrl,
      createProxyMiddleware({
        target: item.target,
        changeOrigin: item.isReplace,
        pathRewrite: {
          [`^${item.matchUrl}`]: item.pathRewriteTarget
        }
      })
    )
  })

  app.use('*', (_, res) => {
    res.status(404).send('No matching proxy configuration found.')
  })

  // 启动服务器
  server = app.listen(3001, () => {
    console.log('server run http://localhost:3001')
  })

  // WebSocket 处理
  // server.on(
  //   'upgrade',
  //   createProxyMiddleware({
  //     target: proxyOptions.target,
  //     changeOrigin: true,
  //     ws: true
  //   }).upgrade
  // )
}

// 重启服务器的函数
const restartServer = (): void => {
  if (server) {
    server.close(() => {
      console.log('server restart')
      proxyOptions = loadProxyConfig() // 重新加载代理配置
      createServer() // 重新启动服务器
    })
  } else {
    console.log('no server create server')
    proxyOptions = loadProxyConfig() // 初次加载代理配置
    createServer() // 启动服务器
  }
}

// 初次启动服务器
proxyOptions = loadProxyConfig()

// 导出重启函数以便在其他地方使用
export { restartServer, createServer }

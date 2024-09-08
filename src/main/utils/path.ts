import { app } from 'electron'
import { join } from 'path'
import fs from 'fs'
// 获取安装目录下的文件路径
export const getFilePath = (filePath: string): string => {
  let configPath
  const isDev = process.env.NODE_ENV === 'development'
  if (isDev) {
    // 开发环境下，直接使用当前项目的 config.js 文件
    configPath = join(__dirname, filePath)
  } else {
    // 生产环境下，将文件存储到用户的可写目录中
    const userDataPath = app.getPath('userData')
    configPath = join(userDataPath, filePath)
  }

  // 检查文件是否存在，如果不存在则创建
  if (!fs.existsSync(configPath)) {
    // 创建文件
    fs.writeFileSync(configPath, '[]', 'utf-8')
  }
  return configPath
}

// src/main/fileManager.ts
import * as fs from 'fs'

// 读取文件
export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 写入文件
export const writeFile = (filePath: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf-8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

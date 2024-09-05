interface Window {
  electronAPI: {
    readFile: (filePath: string) => Promise<{ status: string; data?: string; error?: string }>
    writeFile: (filePath: string, content: string) => Promise<{ status: string; error?: string }>
  }
}

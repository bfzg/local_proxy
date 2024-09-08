declare module Proxys {
  type ProxyItem = {
    id: string
    enable: boolean
    matchUrl: string
    target: string
    isReplace: boolean
    pathRewriteOrigin: string
    pathRewriteTarget: string
  }
}

import { Card, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { ParseJSON } from '@renderer/utils/json'
const ProxyCard: React.FC<Proxys.ProxyItem> = (props) => {
  const handleRemove = async () => {
    const dataArr = await window.electronAPI.readFile('config.json')
    if (dataArr.data) {
      const data = ParseJSON(dataArr.data)
      const newData = data.filter((item) => item.id !== props.id)
      window.electronAPI.writeFile('config.json', JSON.stringify(newData)).then(() => {
        console.log('删除成功')
      })
    }
  }

  return (
    <Card className={`${props.enable ? '' : 'opacity-50'}`}>
      <CardContent className="flex justify-between align-middle items-center">
        <div>
          <Typography variant="h5">{props.matchUrl}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>远程地址: {props.target}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            重写格式: {props.pathRewriteOrigin} to {props.pathRewriteTarget}
          </Typography>
        </div>
        <div>
          <IconButton onClick={handleRemove}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProxyCard

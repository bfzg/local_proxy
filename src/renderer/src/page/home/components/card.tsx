import { Card, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'

interface IProxyCard {
  handleRemove: () => void
  handleEdit: () => void
}

const ProxyCard: React.FC<Proxys.ProxyItem & IProxyCard> = (props) => {
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
        <div className="space-x-2">
          <IconButton onClick={() => props.handleEdit()}>
            <BorderColorIcon color="info" />
          </IconButton>
          <IconButton
            onClick={() => {
              if (window.confirm('你确定要删除这个项目吗？')) {
                props.handleRemove()
              }
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProxyCard

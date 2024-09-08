import { Button, Checkbox, Dialog, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Grid from '@mui/material/Grid2'

export interface IAddFormFunc {
  openModal: () => void
}

interface IAddForm {
  ref: any
}

const AddForm: React.FC<IAddForm> = forwardRef(({}, ref) => {
  useImperativeHandle(ref, () => ({
    openModal: () => {
      setOpen(true)
    }
  }))

  const [open, setOpen] = useState(false)

  // 定义表单状态
  const [formData, setFormData] = useState<Proxys.ProxyItem>({
    id: '',
    enable: true,
    matchUrl: '',
    target: '',
    isReplace: false,
    pathRewriteOrigin: '',
    pathRewriteTarget: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleChangeIsReplace = (value: boolean) => {
    setFormData({
      ...formData,
      isReplace: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 提交表单
    let data: any = []
    const dataArr = await window.electronAPI.readFile('./config.json')
    if (dataArr.data) {
      data = [...JSON.parse(dataArr.data), { ...formData, id: Date.now().toString() }]
    } else {
      data = [{ ...formData, id: Date.now().toString() }]
    }
    window.electronAPI.writeFile('./config.json', JSON.stringify(data)).then(() => {
      handleClose()
    })
  }

  const handleClose = () => {
    setOpen(false)
    setFormData({
      id: '',
      enable: true,
      matchUrl: '',
      target: '',
      isReplace: false,
      pathRewriteOrigin: '',
      pathRewriteTarget: ''
    })
  }

  return (
    <div>
      <Dialog
        onClose={(_, reason) => {
          if (reason === 'backdropClick') return
          handleClose()
        }}
        open={open}
        hideBackdrop
      >
        <div className="p-3">
          <Typography variant="h5">添加匹配项</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="匹配字段"
              name="matchUrl"
              value={formData.matchUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="远程目标地址"
              name="target"
              value={formData.target}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControlLabel
              name="isReplace"
              control={
                <Checkbox
                  onChange={(e) => handleChangeIsReplace(e.target.checked)}
                  checked={formData.isReplace}
                />
              }
              label="是否替换Url"
            />
            {formData.isReplace && (
              <Grid container spacing={4} alignContent={'center'}>
                <Grid size={5}>
                  <TextField
                    label="匹配项"
                    name="pathRewriteOrigin"
                    value={formData.pathRewriteOrigin}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid size={2} alignContent={'center'}>
                  <div className="text-center">{'<--->'}</div>
                </Grid>
                <Grid size={5}>
                  <TextField
                    label="目标项"
                    name="pathRewriteTarget"
                    value={formData.pathRewriteTarget}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            )}
            <div className="space-x-2 text-end">
              <Button variant="outlined" onClick={handleClose}>
                取消
              </Button>
              <Button type="submit" variant="contained" color="primary">
                提交
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  )
})

export default AddForm

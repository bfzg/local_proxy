import React, { useState } from 'react'
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Box,
  Typography
} from '@mui/material'

const FormConfig: React.FC = () => {
  // 定义表单状态
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    agreeToTerms: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({
      ...formData,
      gender: e.target.value as string
    })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agreeToTerms: e.target.checked
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 提交表单
    console.log(formData)
  }

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        注册表单
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* 姓名输入框 */}
        <TextField
          label="姓名"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {/* 年龄输入框 */}
        <TextField
          label="年龄"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
          required
        />

        {/* 同意条款复选框 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              name="agreeToTerms"
              required
            />
          }
          label="同意条款"
        />

        {/* 提交按钮 */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          提交
        </Button>
      </form>
    </Box>
  )
}

export default FormConfig

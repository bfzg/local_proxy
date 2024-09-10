import React, { useEffect, useRef, useState } from 'react'
import ProxyCard from './components/card'
import Grid from '@mui/material/Grid2'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ReplayIcon from '@mui/icons-material/Replay'
import AddForm, { IAddFormFunc } from './components/add'
import { ParseJSON } from '@renderer/utils/json'
const View: React.FC = () => {
  const addFormRef = useRef<IAddFormFunc>()
  const [dataList, setDataList] = useState<Proxys.ProxyItem[]>([])

  useEffect(() => {
    findData()
  }, [])

  const findData = () => {
    window.electronAPI.readFile('config.json').then((res) => {
      const data = ParseJSON(res.data)
      if (data) {
        setDataList(data)
      }
    })
  }

  const onClickAdd = () => {
    addFormRef.current?.openModal(false)
  }

  const handleRemove = async (id: string) => {
    const dataArr = await window.electronAPI.readFile('config.json')
    if (dataArr.data) {
      const data = ParseJSON(dataArr.data)
      const newData = data.filter((item) => item.id !== id)
      window.electronAPI.writeFile('config.json', JSON.stringify(newData)).then(() => {
        findData()
      })
    }
  }

  return (
    <div className="p-2">
      <div className="border-b-2 border-gray-400 py-2 mb-3 space-x-2">
        <Button variant="contained" startIcon={<AddIcon />} onClick={onClickAdd}>
          添加
        </Button>
        <Button variant="contained" startIcon={<ReplayIcon />} onClick={findData}>
          刷新
        </Button>
      </div>
      <Grid container spacing={4}>
        {dataList.map((item, index) => (
          <Grid key={item.matchUrl + index} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            <ProxyCard
              {...item}
              handleEdit={() => addFormRef.current?.openModal(true, item)}
              handleRemove={() => handleRemove(item.id)}
            />
          </Grid>
        ))}
      </Grid>
      <AddForm onRefresh={findData} ref={addFormRef} />
    </div>
  )
}

export default View

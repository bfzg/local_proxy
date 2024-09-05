import React, { useEffect } from 'react'
import FormConfig from './components/form'

const View: React.FC = () => {
  useEffect(() => {
    console.log('View')
    console.log(window.electronAPI)
  }, [])
  return (
    <div>
      <FormConfig />
    </div>
  )
}

export default View

import React, { useEffect } from 'react'

const View: React.FC = () => {
  useEffect(() => {
    console.log('View')
    console.log(window.electronAPI)
  }, [])
  return <div>View</div>
}

export default View

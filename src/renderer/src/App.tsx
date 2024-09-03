import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './page/home/view'

function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App

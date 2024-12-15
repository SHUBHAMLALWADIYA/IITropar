import { useState } from 'react'
import LMSPage from './LMSpage'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LMSPage/>
    </>
  )
}

export default App

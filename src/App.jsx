import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="toolbar">
          <h2>Toolbar Time</h2>

      </div>
      <div id="setup-area">
          <h2>Your setup here:</h2>

      </div>
    </>
  )
}

export default App

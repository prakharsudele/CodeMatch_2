import { useState } from 'react'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Landing></Landing>
    </>
  )
}

export default App

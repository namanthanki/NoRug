import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CreateLaunchPool from './components/CreateLaunchPool';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CreateLaunchPool />
     </>
  )
}

export default App

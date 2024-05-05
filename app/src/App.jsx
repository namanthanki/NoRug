import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CreateLaunchPool from './components/CreateLaunchPool';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/create" element={<CreateLaunchPool/>}/>
    </Routes>
    </Router>
     </>
  )
}

export default App

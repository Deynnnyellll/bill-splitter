import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'

// Routes
import Home from './components/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Navbar />
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'

// Routes
import Home from './components/Home'
import CreateBill from './components/CreateBill'

function App() {
  return (
    <>
      <Routes>
        <Route path='home'>
          <Route path='' element={<Home />}/>
          <Route path='create-bill' element={<CreateBill />} />
        </Route>
      </Routes>
      <Navbar />
    </>
  )
}

export default App

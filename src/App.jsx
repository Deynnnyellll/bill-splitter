import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'

// Routes
import Home from './components/Home'
import CreateBill from './components/CreateBill'
import Receipt from './components/Receipt'

function App() {
  return (
    <>
      <Routes>
        <Route path='home'>
          <Route path='' element={<Home />}/>
          <Route path='create-bill' element={<CreateBill />} />
          <Route path='receipt' element={<Receipt />} />
        </Route>
      </Routes>
      <Navbar />
    </>
  )
}

export default App

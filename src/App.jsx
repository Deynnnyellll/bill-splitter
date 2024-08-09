import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'

// Routes
import Home from './components/Home'
import CreateBill from './components/CreateBill'
import Receipt from './components/Receipt'
import SelectFriends from './components/SelectFriends'

function App() {
  return (
    <>
      <Routes>
        <Route path='home'>
          <Route path='' element={<Home />}/>
          <Route path='create-bill' element={<CreateBill />} />
          <Route path='receipt' element={<Receipt />} />
          <Route path='select-friends' element={<SelectFriends />} />
        </Route>
      </Routes>
      <Navbar />
    </>
  )
}

export default App

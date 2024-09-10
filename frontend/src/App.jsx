import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from './custom hooks/useAuthContext'

// Routes
import Home from './components/Home'
import CreateBill from './components/CreateBill'
import Receipt from './components/Receipt'
import SelectFriends from './components/SelectFriends'
import History from './components/History';
import AddPositions from './components/AddPositions';
import Login from './components/Login'

function App() {
  const { user } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='login' element={!user ? <Login /> : <Navigate to='/home' /> } />
        <Route path='home'>
          <Route path='' element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path='create-bill' element={<CreateBill />} />
          <Route path='receipt'>
            <Route path=':ID' element={<Receipt />} />
          </Route>
          <Route path='select-friends' element={<SelectFriends />} />
        </Route>
        <Route path='history'>
          <Route path='' element={<History />} />
        </Route>
        <Route path='add-position'>
          <Route path='' element={<AddPositions />} />
        </Route>
      </Routes>
      {/* <Navbar /> */}
    </>
  )
}

export default App

import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from "./component/Navbar"
import Home from './pages/Home'
import Codechef from './pages/Codechef'
import Codeforces from './pages/Codeforces'
import Login from './pages/Login'
import About from './pages/About'
import Leetcode from './pages/Leetcode'
import Add from "./pages/Add"
import ThemeContext from "./context/ThemeContext"
import Logout from './component/Logout'
import ForgotPassword from './component/ForgotPassword'

const App = () => {
  return (
    <div>
    <BrowserRouter>
        <ThemeContext>
          <Navbar />
          <div className='mt-40'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/codechef' element={<Codechef />} />
            <Route path='/leetcode' element={<Leetcode />} />
            <Route path='/codeforces' element={<Codeforces />} />
            <Route path='/about' element={<About />} />
            <Route path='/add' element={<Add></Add>}></Route>
            <Route path='/logout' element={<Logout></Logout>}></Route>
            <Route path='/support' element={<Add></Add>}></Route>
            <Route path='/team' element={<Add></Add>}></Route>
            <Route path='/forgot' element={<ForgotPassword></ForgotPassword>}></Route>
          </Routes>
          </div>
        </ThemeContext>
      </BrowserRouter>
    </div>
  )
}
export default App

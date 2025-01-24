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
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ThemeContext>
          <Navbar />
          <div className='mt-40'>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/codechef" element={<Codechef />} />
            <Route path="/leetcode" element={<Leetcode />} />
            <Route path="/codeforces" element={<Codeforces />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<Add />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/support" element={<Add />} />
            <Route path="/team" element={<Add />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            </Routes>
          </div>
        </ThemeContext>
      </BrowserRouter>
    </div>
  )
}
export default App

import './App.css'
import { Route, Routes, useNavigate } from 'react-router'
import Header from "../components/Header"
import All from "../components/All"
import Blog from "../components/Blog"
import Create from "../components/Create"
import Login from "../components/Login"
import Signup from "../components/Signup"

function App() {

  const pathname = location.pathname
  const showHeader  = (pathname === '/login' || pathname === '/signup')

  const navigate = useNavigate()

  if(!showHeader && !localStorage.getItem("token")) {
    setTimeout(() => {
      navigate("/signup")
    }, 2000)
    return (
      <div className='text-center p-2 text-3xl'>Redirecting to signup page</div>
    )
  }
  
  return (
    <div className="w-full h-screen p-6">
      {!showHeader && <Header/>}
      
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<All/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/create" element={<Create/>}/>
        </Routes>
      

    </div>
  )
}


export default App

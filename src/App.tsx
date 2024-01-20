import './global.css'
import { Routes, Route }  from 'react-router-dom'
import Home from "./lib/pages/Home"
import Login from "./lib/pages/Login"
import Signup from "./lib/pages/Signup"
import { ProtectedRoute } from './components/ui/AuthRouter'
const App = () => {
  return (
      <div className='confirmPassword'>
        <div className='flex justify-center items-center h-full'>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </div>
  )
}

export default App
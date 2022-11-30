import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route} from 'react-router-dom'
import PublicLayout from './components/PublicLayout'
import Login from './features/auth/Login'
import Feed from './features/feed/feedPage'
import RequireAuth from './features/auth/REquireAuth'
import Verify from './features/auth/verifyCode'
import './assets/css/App.css'
import Register from './features/register/register'
import SendCode from './features/auth/sendCode'
import NotFound from './pages/NotFound'


function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />} >
        <Route index element={<Login/>} />
        <Route path='login' element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="reauth" element={<SendCode />} />
        <Route path="verify" element={<Verify/>} />
        <Route element={<RequireAuth />}>
          <Route path='feed' element={<Feed />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
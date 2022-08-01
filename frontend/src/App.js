import { Routes, Route, useLocation } from 'react-router-dom'
import HeaderNavAuth from './components/common/HeaderNavAuth'
import HeaderNav from './components/common/HeaderNav'

import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Signup2 from './pages/auth/signup2'
import Signup3 from './pages/auth/signup3'
import Signup4 from './pages/auth/signup4'
import LandingPage from './pages/landingPage'
import FindInfo from './pages/auth/find-info'
import FindEmail from './pages/auth/find-email'
import FindPassword from './pages/auth/find-password'

import Main from './pages/meeting/main'
import Meeting from './pages/meeting/meeting'

import UserProfile from './pages/settings/userProfile'
import Subscribe from './pages/settings/subscribe'
import Password from './pages/settings/password'
import Heart from './pages/settings/heart'

function App() {
  const location = useLocation()

  let selectedNav = ''
  if (location.pathname.includes('auth')) {
    if (
      location.pathname === '/auth' ||
      location.pathname === '/auth/signup' ||
      location.pathname === '/auth/signup2' ||
      location.pathname === '/auth/signup3' ||
      location.pathname === '/auth/signup4'
    ) {
      selectedNav = <HeaderNavAuth color="white" fixed />
    } else {
      selectedNav = <HeaderNavAuth color="black" />
    }
  } else {
    selectedNav = <HeaderNav />
  }

  return (
    <>
      {selectedNav}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signup2" element={<Signup2 />} />
          <Route path="/auth/signup3" element={<Signup3 />} />
          <Route path="/auth/signup4" element={<Signup4 />} />
          <Route path="/auth/find-info" element={<FindInfo />} />
          <Route path="/auth/find-email" element={<FindEmail />} />
          <Route path="/auth/find-password" element={<FindPassword />} />
          <Route path="/meeting" element={<Main />} />
          <Route path="/meeting/:roomId" element={<Meeting />} />
          <Route path="/setting" element={<UserProfile />} />
          <Route path="/setting/subscribe" element={<Subscribe />} />
          <Route path="/setting/password" element={<Password />} />
          <Route path="/setting/heart" element={<Heart />} />
        </Routes>
      </main>
    </>
  )
}

export default App

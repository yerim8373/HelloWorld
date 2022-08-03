import { Routes, Route, useLocation } from 'react-router-dom'
import HeaderNavAuth from './components/common/HeaderNavAuth'
import HeaderNav from './components/common/HeaderNav'

import Login from './pages/auth/login'
import SignupPage from './pages/auth/SignupPage'
import SignupStep1 from './components/auth/SignupStep1'
import SignupStep2 from './components/auth/SignupStep2'
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

import SettingsPage from './pages/settings/SettingsPage'
import ProfilePage from './pages/settings/ProfilePage'
import SubscribePage from './pages/settings/SubscribePage'
import PasswordPage from './pages/settings/PasswordPage'
import HeartPage from './pages/settings/HeartPage'
import WithdrawalPage from './pages/settings/WithdrawalPage'

const authPathSet = new Set([
  '/auth',
  '/auth/signup',
  '/auth/signup2',
  '/auth/signup3',
  '/auth/signup4',
  '/auth/find-info',
  '/auth/find-email',
  '/auth/find-password',
  '/signup',
])

function App() {
  const { pathname: path } = useLocation()

  let selectedNav = ''
  if (authPathSet.has(path)) {
    if (path.includes('find-email') || path.includes('find-password')) {
      selectedNav = <HeaderNavAuth color="black" />
    } else {
      selectedNav = <HeaderNavAuth color="white" fixed />
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signup2" element={<Signup2 />} />
          <Route path="/auth/signup3" element={<Signup3 />} />
          <Route path="/auth/signup4" element={<Signup4 />} />
          <Route path="/auth/find-info" element={<FindInfo />} />
          <Route path="/auth/find-email" element={<FindEmail />} />
          <Route path="/auth/find-password" element={<FindPassword />} />
          <Route path="/meeting" element={<Main />} />
          <Route path="/meeting/:roomId" element={<Meeting />} />
          <Route path="/settings/*" element={<SettingsPage />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="subscribe" element={<SubscribePage />} />
            <Route path="password" element={<PasswordPage />} />
            <Route path="heart" element={<HeartPage />} />
            <Route path="withdrawal" element={<WithdrawalPage />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App

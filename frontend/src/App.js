import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import HeaderNavAuth from './components/common/HeaderNavAuth'
import HeaderNav from './components/common/HeaderNav'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
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

import { useDispatch, useSelector } from 'react-redux'
import { validToken } from './store/auth-thunkActions'

const authPathSet = new Set([
  '/login',
  '/auth/find-info',
  '/auth/find-email',
  '/auth/find-password',
  '/signup',
])

function App() {
  const { pathname: path } = useLocation()

  // 사용 nav 설정
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

  // token 여부 확인
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const checkToken = () => {
    if (state.token) {
      // 서버 리프레시 토큰 에러
      // 요청만 만들고 에러 처리되면 확인하자
      // dispatch(validToken(state.token))
      return true
    }
    return false
  }

  return (
    <>
      {selectedNav}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              checkToken() ? (
                <Navigate replace to="/meeting" />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
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

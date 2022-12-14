import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import HeaderNavAuth from './components/common/HeaderNavAuth'
import HeaderNav from './components/common/HeaderNav'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import LandingPage from './pages/LandingPage'
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
import useInterval from './components/utils/hooks/useInterval'
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'

const authPathSet = new Set([
  '/login',
  '/auth/find-info',
  '/auth/find-email',
  '/auth/find-password',
  '/signup',
])

function App() {
  const { pathname: path } = useLocation()
  const dispatch = useDispatch()

  // 사용 nav 설정
  let selectedNav = ''
  if (authPathSet.has(path)) {
    if (
      path.includes('find-email') ||
      path.includes('find-password') ||
      path.includes('find-info')
    ) {
      selectedNav = <HeaderNavAuth color="black" />
    } else {
      selectedNav = <HeaderNavAuth color="white" fixed />
    }
  } else {
    selectedNav = <HeaderNav />
  }

  // token 여부 확인
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  // 토큰 재평가하기 (이슈 있음)

  useInterval(
    () => {
      if (auth) dispatch(validToken(auth.token))
    },
    auth ? 300000 : null,
  )

  return (
    <>
      {selectedNav}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
            <Route
              path="*"
              element={<Navigate to="/settings/profile" replace />}
            />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App

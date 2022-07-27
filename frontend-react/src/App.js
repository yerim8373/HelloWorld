import HeaderNavAuth from "./components/common/HeaderNavAuth";
import HeaderNav from "./components/common/HeaderNav";

import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import LandingPage from "./pages/landingPage";
import FindInfo from "./pages/auth/find-info";
import FindEmail from "./pages/auth/find-email";
import FindPassword from "./pages/auth/find-password";

import Main from "./pages/meeting/main";
import Loading from "./pages/meeting/loading";
import Meeting from "./pages/meeting/meeting";

import UserProfile from "./pages/settings/userProfile";
import Subscribe from "./pages/settings/subscribe";
import Password from "./pages/settings/password";
import Heart from "./pages/settings/heart";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  let selectedNav = "";
  if (location.pathname.includes("auth")) {
    if (location.pathname === "/auth" || location.pathname === "/auth/signup") {
      selectedNav = <HeaderNavAuth color="white" fixed={true} />;
    } else {
      selectedNav = <HeaderNavAuth color="black" />;
    }
  } else {
    selectedNav = <HeaderNav />;
  }

  return (
    <>
      {selectedNav}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/auth" element={<Login />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/find-info" element={<FindInfo />}></Route>
          <Route path="/auth/find-email" element={<FindEmail />}></Route>
          <Route path="/auth/find-password" element={<FindPassword />}></Route>
          <Route path="/meeting" element={<Main />}></Route>
          <Route path="/meeting/loading" element={<Loading />}></Route>
          <Route path="/meeting/:roomId" element={<Meeting />}></Route>
          <Route path="/setting" element={<UserProfile />}></Route>
          <Route path="/setting/subscribe" element={<Subscribe />}></Route>
          <Route path="/setting/password" element={<Password />}></Route>
          <Route path="/setting/heart" element={<Heart />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;

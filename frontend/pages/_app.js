
import "../styles/minireset.min.css";
import "../styles/pretendard.css";
import "../styles/globals.css";
import { wrapper } from "../store";
import HeaderNav from "../components/common/HeaderNav";
import HeaderNavAuth from "../components/common/HeaderNavAuth";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname.includes("auth") ? <HeaderNavAuth /> : <HeaderNav />}
      <Component {...pageProps} />

      <div id="modal-root"></div>
    </>
  );
}

export default wrapper.withRedux(MyApp);
// export default MyApp;

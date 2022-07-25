import "../styles/minireset.min.css";
import "../styles/pretendard.css";
import "../styles/globals.css";
import { wrapper } from "../store";
import HeaderNav from "../components/common/HeaderNav";;

function MyApp({ Component, pageProps }) {


  return (
    <>
      <HeaderNav />
      <Component {...pageProps} />

      <div id="modal-root"></div>
    </>
  );
}

export default wrapper.withRedux(MyApp);

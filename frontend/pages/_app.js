import "../styles/globals.css";
import { wrapper } from "../store";
import HeaderNav from "../components/common/HeaderNav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeaderNav />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);

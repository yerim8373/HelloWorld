import "../styles/minireset.min.css";
import "../styles/pretendard.css";
import "../styles/globals.css";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);

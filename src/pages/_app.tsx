import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { setupStore, storeWrapper } from "../store";
import { Provider } from "react-redux";

import '../styles/app.sass'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default storeWrapper.withRedux(App)

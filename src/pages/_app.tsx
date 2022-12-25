import "../styles/bootstrap.min.css";
import "../styles/elegant-icons.css";
import "../styles/style.css";

import Footer from "../components/Footer";
import Header from "../components/Header";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

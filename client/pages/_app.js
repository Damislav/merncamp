import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.css";
import { UserProvider } from "../context";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head />
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

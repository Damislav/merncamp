import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import Head from "next/head";
import "./public/css/styles.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

import 'antd/dist/antd.css';
import Top from '../component/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Top/>
      <Component {...pageProps} />
    </>
  )

}

export default MyApp

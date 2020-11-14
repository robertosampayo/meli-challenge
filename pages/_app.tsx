import { AppProps } from 'next/app'
import '../styles/styles.scss'
import '../styles/ngprogress.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import  { ItemState } from '../context/items/itemState'
import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }: AppProps) {
  return (
    <ItemState >
      <Component {...pageProps} />
    </ItemState>
  )
}

export default App
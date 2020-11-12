import { AppProps } from 'next/app'
import '../styles/styles.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import  { ItemState } from '../context/items/itemState'


function App({ Component, pageProps }: AppProps) {
  return (
    <ItemState >
      <Component {...pageProps} />
    </ItemState>
  )
}

export default App
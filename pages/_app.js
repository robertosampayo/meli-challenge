import App from 'next/app'
import '../styles/styles.scss'
import  { ItemState } from '../context/items/itemState'


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ItemState>
        <Component {...pageProps} />
      </ItemState>
    )
  }
}

export default MyApp
import '../styles/globals.css'
import smoothscroll from 'smoothscroll-polyfill'
if (process.browser) {
  smoothscroll.polyfill()
}
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

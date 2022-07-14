import { AppProvider } from '../context/app-context';
import { NetworkProvider } from '../context/network-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <NetworkProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </NetworkProvider>
  )
}

export default MyApp

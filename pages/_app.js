import { useEffect, useState } from 'react';
import { AppProvider } from '../context/app-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isOnline, setOnlineStatus] = useState(true);

  useEffect(() => {
    const setFromEvent = function(event) {
      if(event.type === 'online') {
          setOnlineStatus(true);
      }
      else if(event.type === 'offline') {
          setOnlineStatus(false);
      }
    }

    window.addEventListener("online", setFromEvent);
    window.addEventListener("offline", setFromEvent);

    return() => {
        window.removeEventListener("online", setFromEvent);
        window.removeEventListener("offline", setFromEvent);
    }
  })

  useEffect(() => {
    if(!isOnline) {
      alert('You are offline. Please check your internet connection.');
    }
  }, [isOnline]);

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp

import { createContext, useContext, useEffect, useState } from 'react';

export const NetworkContext = createContext({})

export function useNetworkContext() {
  return useContext(NetworkContext);
}

export function NetworkProvider({ children }) {
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
  }, [])

  return (
    <NetworkContext.Provider value={isOnline}>
      {children}
    </NetworkContext.Provider>
  )
}

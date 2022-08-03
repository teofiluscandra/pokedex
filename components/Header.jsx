import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, BarChart, Filter } from 'react-feather';
import { useAppContext } from '../context/app-context';

const Header = ({ isHome=true }) => {
  const [state, dispatch] = useAppContext();
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

  return isHome ? (
    <header className="sticky top-0 left-0 right-0 z-30 flex flex-wrap items-center justify-end px-2 py-3 space-x-5 bg-white">
      <button className={`${state.compareMode ? 'text-white bg-green-600' : 'bg-white'} py-2 px-3 rounded-2xl leading-none`} onClick={() => dispatch({ type: 'TOGGLE_COMPARE_MODE' })}>Compare</button>
      <button onClick={() => dispatch({type: 'TOGGLE_FILTER_MODE'})}><Filter /></button>
      <span className="text-xs font-extrabold"><BarChart className={`${isOnline ? 'text-green-500' : 'text-red-500'}`}/>{isOnline ? 'Online' : 'Offline'}</span>
    </header>
  ) :
  (
    <header className="sticky top-0 left-0 right-0 z-30 flex flex-wrap items-center px-2 py-3 mb-2 space-x-5 bg-white border-b-2">
      <Link href="/">
        <a className="inline-block px-6 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out rounded focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"><ArrowLeft /></a>
      </Link>
    </header>
  )
}

export default Header;

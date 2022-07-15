import Link from 'next/link';
import { ArrowLeft } from 'react-feather';

const Header = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-30 flex flex-wrap items-center px-2 py-3 mb-2 space-x-5 bg-white border-b-2">
      <Link href="/">
        <a className="inline-block px-6 text-xs font-medium leading-tight uppercase transition duration-150 ease-in-out rounded focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg"><ArrowLeft /></a>
      </Link>
    </header>
  )
}

export default Header;

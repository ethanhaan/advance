import { useState, useEffect } from 'react'
import Navbar from './global_components/Navbar/Navbar';
import FrontPage from './pages/front_page/front_page';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <Navbar isScrolled={isNavbarScrolled} />
      <FrontPage />
    </div>
  )
}

export default App

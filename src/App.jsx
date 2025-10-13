import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './global_components/Navbar/Navbar';
import FrontPage from './pages/front_page/front_page';
import AboutPage from './pages/about_page/about_page';
import TestPage from './pages/test_page/test_page';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

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
      <Routes>
        <Route path="/" element={<FrontPage setIsNavbarFixed={setIsNavbarFixed} />} />
        <Route path="/about" element={<AboutPage setIsNavbarFixed={setIsNavbarFixed} />} />
        <Route path="/test" element={<TestPage/>} />
      </Routes>
    </div>
  )
}

export default App

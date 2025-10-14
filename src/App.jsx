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

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);

  return (
    <div>
      <Navbar isNavbarFixed={isNavbarFixed} isOpaque={isOpaque}/>
      <Routes>
        <Route path="/" element={<FrontPage setIsNavbarFixed={setIsNavbarFixed} setIsOpaque={setIsOpaque} />} />
        <Route path="/about" element={<AboutPage setIsNavbarFixed={setIsNavbarFixed} />} />
        <Route path="/test" element={<TestPage/>} />
      </Routes>
    </div>
  )
}

export default App

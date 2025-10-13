import { useState } from 'react'
import Navbar from './global_components/Navbar/Navbar';
import FrontPage from './pages/front_page/front_page';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  return (
    <div>
      <Navbar isFixed={isNavbarFixed} />
      <FrontPage setIsNavbarFixed={setIsNavbarFixed}/>
    </div>
  )
}

export default App

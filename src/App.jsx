import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './global_components/Navbar/Navbar';
import FrontPage from './pages/front_page/front_page';
import AboutPage from './pages/about_page/about_page';
import TestPage from './pages/test_page/test_page';
import PageTransition from './global_components/PageTransition';
import './App.css';

function App() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isOpaque, setIsOpaque] = useState(false);

  // Get current route so we can key the tree
  const location = useLocation();

  return (
    <div style={{backgroundColor: "#060A1B"}}>
      <Navbar isNavbarFixed={isNavbarFixed} isOpaque={isOpaque} />

      {/* This container lets exit/enter pages overlap */}
      <div style={{ position: 'relative', minHeight: '100svh' }}>
        <AnimatePresence
          mode="wait"         // wait for exit to finish before entering next
          initial={false}     // no entrance on first paint
          onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
        >
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <FrontPage setIsNavbarFixed={setIsNavbarFixed} setIsOpaque={setIsOpaque} />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <AboutPage setIsNavbarFixed={setIsNavbarFixed} />
                </PageTransition>
              }
            />
            <Route
              path="/test"
              element={
                <PageTransition>
                  <TestPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;


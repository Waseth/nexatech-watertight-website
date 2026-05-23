import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar navigate={navigate} activePage={activePage} />
      {activePage === 'home' && (
        <>
          <Hero navigate={navigate} />
          <Services />
          <Team />
          <Contact />
        </>
      )}
      {activePage === 'services' && <Services standalone />}
      {activePage === 'team' && <Team standalone />}
      {activePage === 'contact' && <Contact standalone />}
      <Footer navigate={navigate} />
    </div>
  );
}

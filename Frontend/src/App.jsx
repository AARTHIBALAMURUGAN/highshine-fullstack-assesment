import { useEffect } from 'react';
import './App.css';
import CTABanner from './Components/CTABanner';
import Gallery from './Components/Gallery';
import Hero from './Components/Hero';
import IndustryGap from './Components/IndustryGap';
import Leadership from './Components/Leadership';
import Navbar from './Components/Navbar';
import Story from './Components/Story';
import Timeline from './Components/Timeline';
import Values from './Components/Values';
import { initGA, trackPageView } from './analytics';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const logVisitor = async (page) => {
  try {
    await fetch(`${API_URL}/api/visitor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        referrer: document.referrer || 'direct',
        country: 'Unknown'
      })
    });
  } catch (err) {
    console.log('Visitor log failed silently');
  }
};

function App() {
  useEffect(() => {
    initGA();
    trackPageView(window.location.pathname);
    logVisitor(window.location.pathname);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <IndustryGap />
      <Story />
      <Timeline />
      <Values />
      <Leadership />
      <Gallery />
      <CTABanner />
    </div>
  );
}

export default App;
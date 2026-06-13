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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const VISITOR_ID_KEY = 'highshine_visitor_id';


const createUuid = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  return template.replace(/[xy]/g, (character) => {
    const random = (Math.random() * 16) | 0;
    const value = character === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

const getOrCreateVisitorId = () => {
  const storedVisitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (storedVisitorId) {
    return storedVisitorId;
  }

  const visitorId = createUuid();
  localStorage.setItem(VISITOR_ID_KEY, visitorId);

  return visitorId;
};

const logVisitor = async (page) => {
  const visitorId = getOrCreateVisitorId();

  try {
    
    await fetch(`${API_URL}/api/visitor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
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

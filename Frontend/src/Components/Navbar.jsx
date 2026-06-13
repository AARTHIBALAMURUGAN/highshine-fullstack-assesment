import { useState, useEffect } from "react";
import '../styles/Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About Us', href: '#about' },
  { label: 'Industries', href: '#industries' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Our Works', href: '#works' },

];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);//check nav is scrolled or not 
  const [menuOpen, setMenuOpen] = useState(false);//mobile view menu
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll); // cleanup funtion;

  }, []);
   


  const handleLinkClick = (label) => {
    setActiveLink(label);
    setMenuOpen(false);
  }; 

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
         
        <div className="navbar-inner">

          
          <div className="navbar-logo">
            <img
              src="https://highshine.in/assets/images/logo/Highshine-2.svg"
              alt="Highshine IT Solutions"
              className="navbar-logo-img"
            />
          </div>

          
          <ul className="navbar-links">
            
            {navLinks.map((link) => (
              <li key={link.label}>
                
                <a  href={link.href}
                  className={activeLink === link.label ? 'active' : ''}
                  onClick={() => handleLinkClick(link.label)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="navbar-cta">
            Contact Us
          </a>
          <div
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            
             <a key={link.label}
              href={link.href}
              onClick={() => handleLinkClick(link.label)}
            >
              {link.label}
            </a>
          ))}
            <a
    href="#contact"
    className="navbar-cta mobile-contact-btn"
    onClick={() => setMenuOpen(false)}
  >
    Contact Us
  </a>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;

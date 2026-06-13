import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import robovitics from "../../assets/RoboVITics White Logo.svg";
import gravitas from "../../assets/newgravlogo.svg";
import "./Navbar.css";

const LINKS = [
  { to: "/#hero", label: "Home" },
  { to: "/#aboutUsSection", label: "About" },
  { to: "/#faqsection", label: "FAQs" },
  { to: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // Once the user has scrolled past the hero scroll-sequence section,
      // keep the navbar permanently visible (no hide-on-scroll).
      const heroEl = document.getElementById("hero");
      const pastHero = heroEl
        ? heroEl.getBoundingClientRect().bottom <= window.innerHeight * 1.1
        : false;
      setHidden(!pastHero && y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="home"
      className={`rw-nav ${hidden && !open ? "rw-nav--hidden" : ""} ${
        scrolled ? "rw-nav--scrolled" : ""
      }`}
    >
      <div className="rw-nav-inner">
        <Link to="/#hero" className="rw-nav-brand" onClick={() => setOpen(false)}>
          <img src={robovitics} alt="RoboVITics" />
        </Link>

        <nav className={`rw-nav-links ${open ? "is-open" : ""}`}>
          {LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rw-nav-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="rw-nav-right">
          <Link to="/#hero" className="rw-nav-gravitas" onClick={() => setOpen(false)}>
            <img src={gravitas} alt="graVITas" />
          </Link>
          <button
            className={`rw-nav-burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

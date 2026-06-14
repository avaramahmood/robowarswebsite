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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // The navbar stays completely hidden through the hero scroll-sequence
      // and reveals exactly when the animation reaches its final frame.
      // The film finishes at FILM_END (76%) of the hero's scroll track; the
      // rest is a dwell zone. Mirror that here so the bar appears on the last
      // frame, then stays permanently visible.
      const FILM_END = 0.62;
      const heroEl = document.getElementById("hero");
      let pastHero = true;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress =
          scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 1;
        pastHero = progress >= FILM_END;
      }
      setReady(pastHero);
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
      className={`rw-nav ${ready ? "rw-nav--ready" : ""} ${
        hidden && !open ? "rw-nav--hidden" : ""
      } ${scrolled ? "rw-nav--scrolled" : ""}`}
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
          <Link to="https://gravitas.vit.ac.in/" className="rw-nav-gravitas" onClick={() => setOpen(false)}>
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

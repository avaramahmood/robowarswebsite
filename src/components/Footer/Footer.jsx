import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import {
  InstagramIcon,
  LinkedInIcon,
  FacebookIcon,
  GlobeIcon,
} from "../icons/SocialIcons";
import "./Footer.css";

const NAV = [
  { to: "/#hero", label: "Home" },
  { to: "/#aboutUsSection", label: "About" },
  { to: "/#faqsection", label: "FAQ" },
  { to: "/#contact", label: "Contact" },
];

const SOCIALS = [
  {
    href: "https://www.instagram.com/robovitics/",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.linkedin.com/company/robovitics/",
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  {
    href: "https://robovitics.in/",
    label: "robovitics.in",
    Icon: GlobeIcon,
  },
  {
    href: "https://www.facebook.com/robovitics",
    label: "Facebook",
    Icon: FacebookIcon,
  },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-brand">
          <h2 className="footer-wordmark">ROBOWARS</h2>
          <p className="footer-sub">
            graVITas '26 · VIT Vellore
            <br />
            Forge · Battle · Wreck
          </p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          {NAV.map((l) => (
            <Link key={l.label} to={l.to}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h3>Follow</h3>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social"
            >
              <s.Icon />
              {s.label}
            </a>
          ))}
        </div>

      </div>

      <div className="footer-bar">
        <span>© 2026 RoboVITics — The official robotics club of VIT</span>
        <Link to="/#hero" className="footer-top">
          Back to top ↑
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;

import React, { useState } from "react";
import useReveal from "../../hooks/useReveal";
import robowarsLogo from "../../assets/robowars logo.png";
import "./Sponsors.css";

const SPONSORS = [
  {
    tier: "Title Sponsor",
    src: robowarsLogo,
    alt: "Sponsor",
    desc: "Coming soon",
    featured: true,
  },
  {
    tier: "Technology Partner",
    src: robowarsLogo,
    alt: "Sponsor",
    desc: "Coming soon",
    featured: false,
  },
];

const SHEET_ENDPOINT = import.meta.env.VITE_SPONSOR_SHEET_URL;

const Sponsors = () => {
  const headRef = useReveal(0.2);
  const gridRef = useReveal(0.15);
  const ctaRef = useReveal(0.2);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;
    setStatus("loading");
    try {
      await fetch(
        `${SHEET_ENDPOINT}?email=${encodeURIComponent(trimmed)}&ts=${Date.now()}`,
        { mode: "no-cors" }
      );
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="sponsors-inner">
        <div className="sponsors-head reveal" ref={headRef}>
          <p className="section-kicker">Supported By</p>
          <h2 className="section-heading">Our Sponsors</h2>
          <p className="sponsors-desc">
            Robowars&nbsp;'26 is powered by leaders in engineering and innovation.
          </p>
        </div>

        <div className="sponsors-grid reveal" ref={gridRef}>
          {SPONSORS.map((s) => (
            <div
              className={`sponsor-card ${s.featured ? "sponsor-card--featured" : ""}`}
              key={s.alt}
            >
              <p className="sponsor-card-tier">{s.tier}</p>
              <div className="sponsor-card-logo">
                <img src={s.src} alt={s.alt} />
              </div>
              <p className="sponsor-card-desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="sponsors-cta reveal" ref={ctaRef}>
          <div className="sponsors-cta-left">
            <p className="sponsors-cta-label">Become a Sponsor</p>
            <p className="sponsors-cta-text">
              Partner with India's biggest combat robotics championship.
            </p>
          </div>
          <form className="sponsors-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="sponsors-email-input"
              required
            />
            <button type="submit" className="rw-btn" disabled={status === "loading" || status === "done"}>
              {status === "done" ? "Received ✓" : status === "loading" ? "Sending…" : status === "error" ? "Try Again" : "Get in Touch"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;

import React, { useState, useEffect, useRef, useCallback } from "react";
import useReveal from "../../hooks/useReveal";
import { InstagramIcon } from "../icons/SocialIcons";
import "./Gallery.css";

const CDN =
  "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency";

const SLIDES = [
  { type: "image", src: `${CDN}/v1727411412/img1_vxxuqd.jpg?_s=public-apps`, alt: "Combat bots" },
  { type: "image", src: `${CDN}/v1727411415/img4_cjreoa.jpg?_s=public-apps`, alt: "Arena action" },
  { type: "image", src: `${CDN}/v1727411419/img3_zxgemk.jpg?_s=public-apps`, alt: "Robot battle" },
  { type: "image", src: `${CDN}/v1727411417/robovitics_team_hee1en.jpg?_s=public-apps`, alt: "RoboVITics team" },
  { type: "image", src: `${CDN}/v1727411408/gravitas_vitjpeg_im9ljt.jpg?_s=public-apps`, alt: "graVITas event" },
  { type: "cta" },
];

const N       = SLIDES.length;
const RATIO   = 0.65;  // slide width as fraction of container — must match CSS padding-inline
const GAP     = 20;    // px — must match CSS gap

const Gallery = () => {
  const headRef  = useReveal(0.3);
  const wrapRef  = useRef(null);
  const swRef    = useRef(0);    // current slide width in px
  const activeRef = useRef(0);
  const fromUser  = useRef(false); // true when active change came from user scroll

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Set slide widths (percentage width is ambiguous on scroll-flex containers)
  const applyWidths = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sw = Math.round(el.offsetWidth * RATIO);
    swRef.current = sw;
    el.querySelectorAll(".g-slide").forEach(s => { s.style.width = sw + "px"; });
  }, []);

  // Programmatic scroll to a slide index
  const scrollToIdx = useCallback((idx, smooth = true) => {
    const el = wrapRef.current;
    if (!el || !swRef.current) return;
    el.scrollTo({ left: idx * (swRef.current + GAP), behavior: smooth ? "smooth" : "instant" });
  }, []);

  // Initial setup + window resize
  useEffect(() => {
    applyWidths();
    scrollToIdx(0, false);
    const onResize = () => { applyWidths(); scrollToIdx(activeRef.current, false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyWidths, scrollToIdx]);

  // Whenever active changes for any reason, sync scroll — but skip if the
  // change itself came from a user scroll (native snap already positioned it)
  useEffect(() => {
    activeRef.current = active;
    if (!fromUser.current) scrollToIdx(active);
    fromUser.current = false;
  }, [active, scrollToIdx]);

  // Update active dot / classes as user scrolls
  const onScroll = useCallback(() => {
    const el = wrapRef.current;
    if (!el || !swRef.current) return;
    const idx = Math.min(
      Math.max(Math.round(el.scrollLeft / (swRef.current + GAP)), 0),
      N - 1,
    );
    if (idx !== activeRef.current) {
      fromUser.current = true;
      setActive(idx);
    }
  }, []);

  // Auto-advance every 4 s, pause while user is interacting
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(a => (a + 1) % N), 4000);
    return () => clearInterval(id);
  }, [paused]);

  const prev = (active - 1 + N) % N;
  const next = (active + 1) % N;

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-head reveal" ref={headRef}>
        <p className="section-kicker">Gallery</p>
        <h2 className="section-heading">From the <em>arena</em></h2>
      </div>

      <div className="gallery-stage">
        <button
          className="gallery-arrow gallery-arrow--prev"
          onClick={() => { fromUser.current = false; setActive(prev); }}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

      <div
        className="gallery-overflow"
        ref={wrapRef}
        onScroll={onScroll}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
      >
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          const isAdj    = i === prev || i === next;
          return (
            <div
              key={i}
              className={`g-slide ${isActive ? "is-active" : ""} ${isAdj ? "is-adj" : ""}`}
            >
              {slide.type === "cta" ? (
                <a
                  className="g-cta"
                  href="https://www.instagram.com/robovitics/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="g-cta-badge">
                    <InstagramIcon /> Instagram
                  </span>
                  <p className="g-cta-pre">Follow the</p>
                  <p className="g-cta-title">Build-Up</p>
                  <p className="g-cta-handle">
                    <InstagramIcon /> @robovitics
                  </p>
                  <span className="g-cta-arrow">↗</span>
                </a>
              ) : (
                <img src={slide.src} alt={slide.alt} loading="lazy" draggable="false" />
              )}
            </div>
          );
        })}
      </div>

        <button
          className="gallery-arrow gallery-arrow--next"
          onClick={() => { fromUser.current = false; setActive(next); }}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="gallery-footer">
        <div className="gallery-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`gallery-dot ${i === active ? "is-active" : ""}`}
              onClick={() => { fromUser.current = false; setActive(i); }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="gallery-counter">
          {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default Gallery;

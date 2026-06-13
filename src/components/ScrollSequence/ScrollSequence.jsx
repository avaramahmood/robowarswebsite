import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ScrollSequence.css";

// TODO: replace with your actual YouTube channel / livestream URL
const YT_URL = "https://www.youtube.com/@RoboVITics";

// 85 webp frames rendered from the arena flythrough video:
// top-down logo shot -> camera dives -> the two bots clash at floor level.
const FRAME_COUNT = 85;
const frameUrl = (i, size) =>
  `/scroll_animation/${size}/${String(i).padStart(4, "0")}.webp`;

// The film finishes at 76% of the scroll track; the rest is a dwell zone —
// a "speedbreaker" that holds the final shot so the reveal gets a beat
// of rest before the next section arrives.
const FILM_END = 0.76;
const EASE = 0.14; // frame lerp factor — higher = snappier scrub

// Non-linear frame mapping: the first ~25 frames get 50% of the scroll
// track, making the opening shot linger before the camera dives.
const filmToFrame = (film) => {
  const PIVOT = 0.50;       // 50% of film scroll = slow zone boundary
  const PIVOT_F = 25;       // frame 25 is the slow/fast transition point
  if (film <= PIVOT) {
    return (film / PIVOT) * PIVOT_F;
  }
  return PIVOT_F + ((film - PIVOT) / (1 - PIVOT)) * (FRAME_COUNT - 1 - PIVOT_F);
};

const ScrollSequence = () => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const railRef = useRef(null);
  const imagesRef = useRef([]);
  const drawnRef = useRef(-1);
  const currentRef = useRef(0); // eased float frame position
  const targetRef = useRef(0); // raw scroll-derived frame position
  const progressRef = useRef(0);
  const idleTimerRef = useRef(null);

  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [cueVisible, setCueVisible] = useState(true);
  const [isPortraitMobile, setIsPortraitMobile] = useState(
    () => window.innerWidth <= 820 && window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const check = () =>
      setIsPortraitMobile(window.innerWidth <= 820 && window.innerHeight > window.innerWidth);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    // cover-fit the 16:9 frame into the viewport
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    drawnRef.current = index;
  }, []);

  // Preload: first frame immediately, then a coarse pass (every ~6th frame)
  // so scrubbing responds right away, then fill in the rest.
  useEffect(() => {
    if (isPortraitMobile) return;
    let cancelled = false;
    const size = window.innerWidth <= 820 ? "sm" : "lg";
    const images = new Array(FRAME_COUNT);
    imagesRef.current = images;

    const load = (i) =>
      new Promise((resolve) => {
        if (images[i]) return resolve(images[i]);
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = frameUrl(i, size);
        images[i] = img;
      });

    (async () => {
      await load(0);
      if (cancelled) return;
      setFirstFrameReady(true);
      requestAnimationFrame(() => drawFrame(0));

      const coarse = [];
      for (let i = 6; i < FRAME_COUNT; i += 6) coarse.push(load(i));
      await load(FRAME_COUNT - 1);
      await Promise.all(coarse);
      for (let i = 1; i < FRAME_COUNT && !cancelled; i++) await load(i);
    })();

    return () => {
      cancelled = true;
    };
  }, [drawFrame, isPortraitMobile]);

  useEffect(() => {
    if (isPortraitMobile) return;
    const canvas = canvasRef.current;
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (drawnRef.current >= 0) drawFrame(drawnRef.current);
    };
    resize();

    // Magnetic snap: if the user parks mid-film near the end, glide them
    // onto the final hero shot instead of leaving a half-finished frame.
    const scheduleSnap = () => {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        const p = progressRef.current;
        if (p > 0.55 && p < FILM_END) {
          const wrapper = wrapperRef.current;
          if (!wrapper) return;
          const top =
            window.scrollY +
            wrapper.getBoundingClientRect().top +
            (wrapper.offsetHeight - window.innerHeight) * (FILM_END + 0.04);
          if (window.__lenis) {
            window.__lenis.scrollTo(top, { duration: 1.1 });
          } else {
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }, 260);
    };

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      progressRef.current = progress;

      const film = Math.min(1, progress / FILM_END);
      targetRef.current = filmToFrame(film);

      setRevealed(progress >= FILM_END);
      // Keep cue visible for roughly the first 3 frames (adjusted for slow-start mapping)
      setCueVisible(progress < 0.05);
      scheduleSnap();
    };

    // Eased render loop: the displayed frame chases the scroll position,
    // which keeps fast scrolls fluid instead of strobing between frames.
    const tick = () => {
      raf = requestAnimationFrame(tick);

      if (railRef.current) {
        const film = Math.min(1, progressRef.current / FILM_END);
        railRef.current.style.transform = `scaleY(${film})`;
      }

      const diff = targetRef.current - currentRef.current;
      if (Math.abs(diff) > 0.01) {
        currentRef.current += diff * EASE;
      } else {
        currentRef.current = targetRef.current;
      }

      let index = Math.round(currentRef.current);
      // nearest already-loaded frame so scrubbing never freezes
      while (
        index > 0 &&
        (!imagesRef.current[index] || !imagesRef.current[index].complete)
      ) {
        index--;
      }
      if (index !== drawnRef.current) drawFrame(index);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimerRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [drawFrame, isPortraitMobile]);

  if (isPortraitMobile) {
    return (
      <div className="seq-wrapper seq-static" id="hero">
        <div className="seq-sticky">
          <img
            className="seq-static-bg"
            src="/scroll_animation/sm/0084.webp"
            alt=""
          />
          <div className="seq-scrim" />
          <div className="seq-content">
            <p className="seq-kicker">graVITas '26 · VIT Vellore</p>
            <h1 className="seq-title">ROBOWARS</h1>
            <p className="seq-tagline">
              Forge <span>·</span> Battle <span>·</span> Wreck
            </p>
            <p className="seq-desc">
              India's biggest combat robotics championship. Forty war machines,
              one arena — witness the clash live.
            </p>
            <div className="seq-buttons">
              <a className="rw-btn" href={YT_URL} target="_blank" rel="noopener noreferrer">
                Watch Live
              </a>
              <a className="rw-btn rw-btn--ghost" href="https://drive.google.com/uc?export=download&id=1CvdzntBlzWyqLViS8DLlV-l8wyV2ouu-" target="_blank" rel="noopener noreferrer">
                Rulebook
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="seq-wrapper" id="hero" ref={wrapperRef}>
      <div className={`seq-sticky ${revealed ? "is-revealed" : ""}`}>
        <canvas ref={canvasRef} className="seq-canvas" />
        {!firstFrameReady && <div className="seq-loading" />}

        {/* silent intro — just a scroll cue */}
        <div className={`seq-cue ${cueVisible ? "" : "is-hidden"}`}>
          <div className="seq-cue-mouse">
            <div className="seq-cue-dot" />
          </div>
        </div>

        {/* sequence progress rail */}
        <div className={`seq-rail ${revealed || cueVisible ? "is-hidden" : ""}`}>
          <div className="seq-rail-fill" ref={railRef} />
        </div>

        {/* scrim + content once the bots clash */}
        <div className="seq-scrim" />
        <div className="seq-content">
          <p className="seq-kicker">graVITas '26 · VIT Vellore</p>
          <h1 className="seq-title">ROBOWARS</h1>
          <p className="seq-tagline">
            Forge <span>·</span> Battle <span>·</span> Wreck
          </p>
          <p className="seq-desc">
            India's biggest combat robotics championship. Forty war machines,
            one arena — witness the clash live.
          </p>
          <div className="seq-buttons">
            <a className="rw-btn" href={YT_URL} target="_blank" rel="noopener noreferrer">
              Watch Live
            </a>
            <a className="rw-btn rw-btn--ghost" href="https://drive.google.com/uc?export=download&id=1CvdzntBlzWyqLViS8DLlV-l8wyV2ouu-" target="_blank" rel="noopener noreferrer">
              Rulebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSequence;

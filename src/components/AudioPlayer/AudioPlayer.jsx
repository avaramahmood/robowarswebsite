import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const TRACKS = [
  { src: "/audio/theme.mp3", type: "audio/mpeg" },
  { src: "/audio/theme.wav", type: "audio/wav" },
];

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Browsers block autoplay with sound, so arm playback on the first
  // user interaction anywhere on the page.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    const start = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };

    audio.play().then(() => setPlaying(true)).catch(() => {
      window.addEventListener("pointerdown", start, { once: true });
      window.addEventListener("keydown", start, { once: true });
    });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        {TRACKS.map((t) => (
          <source key={t.src} src={t.src} type={t.type} />
        ))}
      </audio>
      <button
        className={`audio-toggle ${playing ? "is-playing" : ""}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        title={playing ? "Mute music" : "Play music"}
      >
        <span className="audio-bars">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
    </>
  );
};

export default AudioPlayer;

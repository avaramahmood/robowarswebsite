import React from "react";
import "./Ticker.css";

// accent: true = red, accent: false = white
const ITEMS = [
  { text: "VIT VELLORE", accent: false },
  { text: "BATTLE", accent: true },
  { text: "ROBOWARS", accent: false },
  { text: "WRECK", accent: true },
  { text: "FORGE", accent: false },
  { text: "VIT VELLORE", accent: true },
  { text: "BATTLE", accent: false },
  { text: "ROBOWARS", accent: true },
  { text: "WRECK", accent: false },
  { text: "FORGE", accent: true },
];

const Row = () => (
  <div className="ticker-row" aria-hidden="true">
    {ITEMS.map((item, i) => (
      <span
        className={`ticker-item${item.accent ? " ticker-item--accent" : ""}`}
        key={i}
      >
        {item.text}
        <i className="ticker-dot" />
      </span>
    ))}
  </div>
);

const Ticker = () => (
  <div className="ticker">
    <div className="ticker-track">
      <Row />
      <Row />
      <Row />
    </div>
  </div>
);

export default Ticker;

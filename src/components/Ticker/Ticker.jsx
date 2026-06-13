import React from "react";
import "./Ticker.css";

// accent: true = red (event names), accent: false = white (action words / separators)
const ITEMS = [
  { text: "GRAVITAS '26", accent: true },
  { text: "FORGE", accent: false },
  { text: "VIT VELLORE", accent: true },
  { text: "BATTLE", accent: false },
  { text: "ROBOWARS '26", accent: true },
  { text: "WRECK", accent: false },
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

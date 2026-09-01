import React from "react";
import { useNavigate } from "react-router-dom";
import useReveal from "../../hooks/useReveal";
import "./WeightClasses.css";

const CLASSES = [
  {
    kg: "8",
    name: "Featherweight",
    desc: "It's all about speed and precision. Deal damage with spinners and flippers while trading hits at full tilt.",
  },
  {
    kg: "15",
    name: "Middleweight",
    desc: "The perfect balance of speed and armor. Hit hard, move fast, and outsmart your opponent with every move.",
  },
  {
    kg: "60",
    name: "Heavyweight",
    desc: "Pure destructive power. Bring the biggest weapons, absorb massive hits, and dominate the arena.",
  },
];

const WeightClasses = () => {
  const headRef = useReveal(0.3);
  const gridRef = useReveal(0.15);

  return (
    <section className="wc" id="weightclasses">
      <div className="wc-head reveal" ref={headRef}>
        <p className="section-kicker">Weight classes</p>
        <h2 className="section-heading">
          Three divisions,
          <br />
          one <em>champion</em> each
        </h2>
      </div>

      <div className="wc-grid reveal" ref={gridRef}>
        {CLASSES.map((c) => (
          <button
            key={c.kg}
            className="wc-card"
          >
            <span className="wc-kg">
              {c.kg}
              <em>KG</em>
            </span>
            <span className="wc-name">{c.name}</span>
            <span className="wc-desc">{c.desc}</span>
            
          </button>
        ))}
      </div>
    </section>
  );
};

export default WeightClasses;

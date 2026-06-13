import React from "react";
import { useNavigate } from "react-router-dom";
import useReveal from "../../hooks/useReveal";
import "./WeightClasses.css";

const CLASSES = [
  {
    kg: "8",
    name: "Featherweight",
    desc: "Fast, vicious and precise — spinners and flippers trading hits at full tilt.",
  },
  {
    kg: "15",
    name: "Middleweight",
    desc: "The balance of speed and armor. Where strategy starts deciding fights.",
  },
  {
    kg: "60",
    name: "Heavyweight",
    desc: "Raw destructive power. Sparks, shrapnel and the loudest crowd of the night.",
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

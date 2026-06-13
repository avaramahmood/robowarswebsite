import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import "./Loadingpage.css";
import image from "../../assets/war logo.gif";

const Progressbar = ({ value }) => {
  const progressRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (value === 100) {
      setTimeout(() => {
        controls.start("fading");
      }, 1000);
    }
  }, [value, controls]);

  return (
    <motion.div
      className="progressbar-container"
      ref={progressRef}
      variants={{
        fading: { opacity: 0, y: "100%" },
      }}
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={controls}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="loading-stack">
        <img src={image} className="loading-logo" alt="Robowars logo" />
        <h1 className="loading-title">ROBOWARS</h1>
        <p className="loading-sub">graVITas '26 · VIT Vellore</p>
        <div className="progressbar">
          <motion.div
            className="bar"
            animate={{ width: `${value}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <span className="loading-percent">{Math.round(value)}%</span>
      </div>
    </motion.div>
  );
};

export default Progressbar;

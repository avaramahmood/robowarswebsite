import React from "react";
import useReveal from "../../hooks/useReveal";
import AboutImage from "../../assets/AboutImage.jpg";
import "./About.css";

const ROWS = [
  {
    index: "01",
    title: "ROBOWARS",
    kicker: "The event",
    image: AboutImage,
    text: "The flagship event of graVITas and one of the biggest combat robotics championships in India. More than forty bots battle around the clock in the country's largest and safest arena — teams from across the globe fight for the title with their war machines.",
  },
  {
    index: "02",
    title: "RoboVITics",
    kicker: "The club",
    image:
      "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411417/robovitics_team_hee1en.jpg?_s=public-apps",
    text: "The official robotics club of VIT Vellore — a collective of tech enthusiasts who learn, build and compete. Workshops, seminars and hands-on sessions feed remarkable projects and teams that keep bringing home accolades.",
  },
  {
    index: "03",
    title: "graVITas",
    kicker: "The festival",
    image:
      "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411408/gravitas_vitjpeg_im9ljt.jpg?_s=public-apps",
    text: "VIT's annual techno-management carnival — a platform that brings together innovative events across every field of engineering. Workshops, competitions, exhibitions: a celebration of knowledge, creativity and machines.",
  },
];

const Row = ({ row, flip }) => {
  const ref = useReveal(0.2);
  return (
    <div className={`about-row reveal ${flip ? "is-flipped" : ""}`} ref={ref}>
      <div className="about-media">
        <img src={row.image} alt={row.title} loading="lazy" />
      </div>
      <div className="about-copy">
        <span className="about-index">{row.index}</span>
        <p className="about-kicker">{row.kicker}</p>
        <h3 className="about-title">{row.title}</h3>
        <p className="about-text">{row.text}</p>
      </div>
    </div>
  );
};

const About = () => {
  const headRef = useReveal(0.3);
  return (
    <section className="about" id="aboutUsSection">
      <div className="about-head reveal" ref={headRef}>
        <p className="section-kicker">About</p>
        <h2 className="section-heading">
          Where machines
          <br />
          earn <em>glory</em>
        </h2>
      </div>
      <div className="about-rows">
        {ROWS.map((row, i) => (
          <Row key={row.index} row={row} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
};

export default About;

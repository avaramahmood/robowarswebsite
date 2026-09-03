import React from "react";
import useReveal from "../../hooks/useReveal";
import arenaImage from "../../assets/images/arena.JPG";
import roboviticsImage from "../../assets/images/Robovitics.jpeg";
import gravitasImage from "../../assets/images/gravitas.jpg";
import "./About.css";

const ROWS = [
  {
    index: "01",
    title: "ROBOWARS",
    kicker: "The event",
    image: arenaImage,
    text: "The flagship event of graVITas and one of the biggest combat robotics championships in India. More than forty bots battle around the clock in the country's largest and safest arena, with teams from across the nation competing for the title with their war machines.",
  },
  {
    index: "02",
    title: "RoboVITics",
    kicker: "The Organizers",
    image: roboviticsImage,
    text: "RoboVITics is one of the largest and most active technical elite clubs of VIT, Vellore, dedicated to robotics, automation, and innovation. Comprising a community of technology enthusiasts, the club is committed to relentless research, developing advanced autonomous systems, and competitively implementing solutions that set the standard for robotics and automation.",
  },
  {
    index: "03",
    title: "graVITas",
    kicker: "The festival",
    image: gravitasImage,
    text: "As VIT Vellore's flagship techno-management festival, graVITas unites innovation, engineering, and creativity on one dynamic platform. From hackathons and robotics competitions to expert led workshops and cutting edge exhibitions, every event is designed to inspire collaboration, ignite curiosity, and transform ideas into impactful technological solutions, empowering the next generation of engineers and innovators.",
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

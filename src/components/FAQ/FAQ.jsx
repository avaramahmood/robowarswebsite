import React, { useState } from "react";
import useReveal from "../../hooks/useReveal";
import "./FAQ.css";

const FAQ_DATA = [
  {
    question: "When and where is Robowars happening?",
    answer:
      "Robowars will be happening during Gravitas and will be from 26th Sep to 28th Sep 2025 at VIT Vellore. Stay tuned for the timings!",
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "If you're a part of a team that builds bots and bots follow our regulations.",
  },
  {
    question: "How long is the event?",
    answer: "It happens for 4 hours throughout the day for up to 3 days!",
  },
  {
    question: "What are the bot specifications?",
    answer:
      "Bots must comply with the weight and weapon regulations mentioned in the official rulebook.",
  },
  {
    question: "Can we bring multiple bots under one team?",
    answer:
      "Yes! A team can bring multiple bots, including 8kg, 15kg, and 60kg categories, as long as they comply with the event rules.",
  },
  {
    question: "What is the maximum and minimum bot weight allowed?",
    answer:
      "The minimum bot weight category is 8kg and the maximum allowed category is 60kg. Ensure your bot falls within these limits.",
  },
  {
    question: "What are the rules and regulations?",
    answer:
      "You can download the official rules and regulations PDF from the 'Rulebook' option above.",
  },
];

const FAQ = () => {
  const headRef = useReveal(0.3);
  const listRef = useReveal(0.15);
  const [active, setActive] = useState(null);

  return (
    <section className="faq" id="faqsection">
      <div className="faq-head reveal" ref={headRef}>
        <p className="section-kicker">FAQ</p>
        <h2 className="section-heading">
          Good <em>questions</em>
        </h2>
      </div>

      <div className="faq-list reveal" ref={listRef}>
        {FAQ_DATA.map((item, i) => (
          <div className={`faq-item ${active === i ? "is-open" : ""}`} key={i}>
            <button
              className="faq-q"
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
            >
              <span className="faq-i">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-question">{item.question}</span>
              <span className="faq-plus" aria-hidden="true" />
            </button>
            <div className="faq-a">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

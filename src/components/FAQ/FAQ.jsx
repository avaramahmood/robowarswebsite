import React, { useState } from "react";
import useReveal from "../../hooks/useReveal";
import "./FAQ.css";

const FAQ_DATA = [
  {
    question: "When and where is Robowars happening?",
    answer:
      "Robowars will occur during GraVITas from 18th to 20th September 2026 at VIT Vellore.",
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "If you and your teammates can build bots, you can participate, as long as the bot follows our regulations",
  },
  {
    question: "How long is the event?",
    answer: "It spans 3 days, with 12-hour sessions each day.",
  },
  {
    question: "What are the bot specifications?",
    answer:
      "Bots must adhere to the weight and weapon specifications outlined in the official rulebook.",
  },
  {
    question: "Can we bring multiple bots under one team?",
    answer:
      "Yes. A team may register multiple bots across the 8kg, 15kg, and 60kg categories, provided each bot complies with the event rules.",
  },
  {
    question: "What is the maximum and minimum bot weight allowed?",
    answer:
      "The minimum bot weight is 8kg, and the maximum is 60kg. Your bot must fall within one of the approved weight categories.",
  },
  {
    question: "What are the rules and regulations?",
    answer:
      "You can download the official Rulebook from the 'Rulebook' section above for detailed rules and regulations.",
  },
];

const FAQ = () => {
  const headRef = useReveal(0.3);
  const listRef = useReveal(0.15);
  const [active, setActive] = useState(null);

  return (
    <section className="faq" id="faqsection">
      <div className="faq-head reveal" ref={headRef}>
        <p className="section-kicker">The questions</p>
        <h2 className="section-heading">FAQs</h2>
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

import React from "react";
import useReveal from "../../hooks/useReveal";
import "./Contact.css";

const CONTACTS = [
  {
    name: "Yash Pathak",
    role: "Chairperson",
    phone: "+91 96919 33181",
    tel: "tel:+919691933181",
  },
  {
    name: "Ayan Gattani",
    role: "Secretary",
    phone: "+91 83699 79901",
    tel: "tel:+918369979901",
  },
];

const Contact = () => {
  const headRef = useReveal(0.2);
  const cardsRef = useReveal(0.15);
  const socialsRef = useReveal(0.2);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        {/* Heading row */}
        <div className="contact-head-row reveal" ref={headRef}>
          <div>
            <p className="section-kicker">Get in Touch</p>
            <h2 className="section-heading">
              Contact <em>Us</em>
            </h2>
          </div>
          <p className="contact-copy">
            Questions about registration, sponsorship, or the event itself?
            Reach out to the RoboVITics leadership directly.
          </p>
        </div>

        {/* Cards — side by side, full width */}
        <div className="contact-cards reveal" ref={cardsRef}>
          {CONTACTS.map((c) => (
            <div className="contact-card" key={c.name}>
              <p className="contact-card-role">{c.role}</p>
              <h3 className="contact-card-name">{c.name}</h3>
              <a href={c.tel} className="contact-card-phone">
                {c.phone}
              </a>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Contact;

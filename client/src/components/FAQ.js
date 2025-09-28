import React, { useState } from 'react';
import './styles/FAQ.css';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What problem are we solving?",
      answer:
        "Excessive and inappropriate use of antimicrobials in livestock leaves residues in meat, milk, and eggs. This can harm consumer health and contribute to antimicrobial resistance (AMR). Current monitoring systems are fragmented and outdated."
    },
    {
      question: "What is CattleSense?",
      answer:
        "CattleSense is a centralized digital portal that tracks antimicrobial usage, ensures compliance with Maximum Residue Limits (MRL), and improves transparency across the livestock value chain—from farm to fork."
    },
    {
      question: "How does it help farmers?",
      answer:
        "Farmers can easily profile livestock, log antimicrobial dosages, and receive automated alerts about withdrawal periods, ensuring better yields and safer products."
    },
    {
      question: "What role do veterinarians play?",
      answer:
        "Veterinarians verify prescriptions, track treatment logs, and ensure compliance with safety standards, helping prevent misuse of antimicrobials."
    },
    {
      question: "How do consumers benefit?",
      answer:
        "Consumers gain trust and transparency. They can trace products back to farms, ensuring the meat, milk, or eggs they consume are safe and responsibly produced."
    },
    {
      question: "How does the government or regulators benefit?",
      answer:
        "Regulators get access to real-time dashboards, regional compliance metrics, and trend analysis, enabling better enforcement of MRL norms and policy-making."
    }
  ];

  return (
    <div className="faq-section">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="material-symbols-outlined">
                  {activeIndex === index ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

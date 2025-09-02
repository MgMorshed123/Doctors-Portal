import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection } from "./Animated";
// import { AnimatedSection } from "./AnimatedSection";

// Static JSON Data
const staticData = {
  faqs: [
    {
      id: 1,
      question: "What are the hospital’s visiting hours?",
      answer:
        "Visiting hours are from 10:00 AM to 8:00 PM daily. ICU and special care units may have restricted visiting times — please confirm with the nurse station before your visit.",
    },
    {
      id: 2,
      question: "Do you accept health insurance?",
      answer:
        "Yes, we work with most major insurance providers. Please contact our billing department or check with the front desk to confirm if your insurance is accepted.",
    },
    {
      id: 3,
      question: "How can I book a doctor’s appointment?",
      answer:
        "Appointments can be booked online through our patient portal, by calling our hospital helpline, or by visiting the outpatient department (OPD) reception.",
    },
    {
      id: 4,
      question: "What should I bring when visiting the hospital?",
      answer:
        "Please carry a valid photo ID, your insurance card (if applicable), a list of medications you are currently taking, and any previous medical reports or test results.",
    },
    {
      id: 5,
      question: "Does the hospital provide emergency services?",
      answer:
        "Yes, our 24/7 Emergency Department is equipped to handle all types of medical emergencies. You can reach emergency services anytime at our dedicated helpline number.",
    },
    {
      id: 6,
      question: "Can I get diagnostic tests done at the hospital?",
      answer:
        "Yes, our hospital has an in-house laboratory and imaging center, offering blood tests, X-rays, ultrasounds, MRIs, CT scans, and other diagnostic services.",
    },
  ],
};

export const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <AnimatedSection className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {staticData.faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-background-light dark:bg-background-dark rounded-lg shadow-md overflow-hidden border border-primary-light/20 dark:border-primary-dark/20"
              whileHover={{ scale: 1.02 }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none bg-primary-light/5 dark:bg-primary-dark/5"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <span className="font-semibold text-text-light dark:text-text-dark">
                  {faq.question}
                </span>
                {openId === faq.id ? (
                  <ChevronUp className="text-accent-light dark:text-accent-dark" />
                ) : (
                  <ChevronDown className="text-accent-light dark:text-accent-dark" />
                )}
              </button>
              {openId === faq.id && (
                <div className="px-6 pb-4 bg-primary-light/10 dark:bg-primary-dark/10">
                  <p className="text-secondary-light dark:text-secondary-dark">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./Animated";

// Static JSON Data
const staticData = {
  insurance: [
    "Blue Cross Blue Shield",
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Medicare",
    "Medicaid",
    "Kaiser Permanente",
    "Humana",
  ],
};

export const InsuranceOptions = () => (
  <AnimatedSection className="py-16 bg-background-light dark:bg-background-dark">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-12">
        Insurance Partners
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {staticData.insurance.map((insurance, index) => (
          <motion.div
            key={index}
            className="bg-background-light dark:bg-background-dark p-4 rounded-lg text-center hover:shadow-md transition-shadow border border-primary-light/20 dark:border-primary-dark/20"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="font-semibold text-text-light dark:text-text-dark">
              {insurance}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

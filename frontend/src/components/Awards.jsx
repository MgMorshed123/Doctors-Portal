import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { AnimatedSection } from "./Animated";

// Static JSON Data
const staticData = {
  awards: [
    {
      id: 1,
      title: "Best Healthcare Provider 2024",
      organization: "Medical Excellence Awards",
    },
    {
      id: 2,
      title: "Patient Safety Excellence",
      organization: "Healthcare Quality Institute",
    },
    {
      id: 3,
      title: "Innovation in Digital Health",
      organization: "Tech Health Summit",
    },
    {
      id: 4,
      title: "Community Service Award",
      organization: "Local Healthcare Board",
    },
  ],
};

export const Awards = () => (
  <AnimatedSection className="py-16 bg-background-light dark:bg-background-dark">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-12">
        Awards & Certificates
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticData.awards.map((award, index) => (
          <motion.div
            key={award.id}
            className="bg-primary-light/10 dark:bg-primary-dark/10 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Award
              className="mx-auto mb-4 text-accent-light dark:text-accent-dark"
              size={48}
            />
            <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
              {award.title}
            </h3>
            <p className="text-secondary-light dark:text-secondary-dark text-sm">
              {award.organization}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

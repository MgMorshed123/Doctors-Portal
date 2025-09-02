import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { AnimatedSection } from "./Animated";

// Static JSON Data
const staticData = {
  healthTips: [
    {
      id: 1,
      title: "Stay Hydrated",
      tip: "Drink at least 8 glasses of water daily to maintain optimal health and energy levels.",
    },
    {
      id: 2,
      title: "Regular Exercise",
      tip: "Aim for 30 minutes of moderate exercise at least 5 days a week for cardiovascular health.",
    },
    {
      id: 3,
      title: "Balanced Diet",
      tip: "Include plenty of fruits, vegetables, whole grains, and lean proteins in your daily meals.",
    },
    {
      id: 4,
      title: "Quality Sleep",
      tip: "Get 7-9 hours of quality sleep each night to support your immune system and mental health.",
    },
  ],
};

export const HealthTips = () => (
  <AnimatedSection className="py-16 bg-background-light dark:bg-background-dark">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-12">
        Health Tips
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staticData.healthTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-secondary-light/50 dark:border-secondary-dark/50 glow-effect"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Heart
              className="text-accent-light dark:text-accent-dark mb-4"
              size={32}
            />
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
              {tip.title}
            </h3>
            <p className="text-secondary-light dark:text-secondary-dark text-sm">
              {tip.tip}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./Animated";

// Static JSON Data
const staticData = {
  forumPosts: [
    {
      id: 1,
      title: "Tips for managing diabetes?",
      author: "HealthSeeker123",
      replies: 12,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      title: "Best exercises for back pain",
      author: "FitnessFan",
      replies: 8,
      lastActivity: "5 hours ago",
    },
    {
      id: 3,
      title: "Nutrition advice for seniors",
      author: "CaringDaughter",
      replies: 15,
      lastActivity: "1 day ago",
    },
  ],
};

export const Forum = () => (
  <AnimatedSection className="py-16 bg-background-light dark:bg-background-dark">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-text-light dark:text-text-dark mb-12">
        Community Forum
      </h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {staticData.forumPosts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary-light/20 dark:border-primary-dark/20"
            whileHover={{ x: 5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-text-light dark:text-text-dark mb-2">
                  {post.title}
                </h3>
                <p className="text-secondary-light dark:text-secondary-dark text-sm">
                  By {post.author}
                </p>
              </div>
              <div className="text-right text-sm text-secondary-light dark:text-secondary-dark">
                <div>{post.replies} replies</div>
                <div>{post.lastActivity}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

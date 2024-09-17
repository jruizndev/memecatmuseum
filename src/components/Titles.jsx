// Titles.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./titles.css";

const titles = [
  "Cats Sitting",
  "Cats Cats",
  "Sitting Humans",
  "Cats Enfadados",
  "Me Dijiste",
];

const Titles = () => {
  return (
    <div className="titles-wrapper">
      {" "}
      {/* Wrapper div for positioning */}
      <div className="sections-container">
        {titles.map((title, index) => (
          <TitleSection key={index} title={title} />
        ))}
      </div>
    </div>
  );
};

// Component for individual title section
const TitleSection = ({ title }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Animation triggers when 20% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Define the animation variants
  const variants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="section"
      ref={ref} // Ensure this ref is correctly applied
      initial="hidden"
      animate={controls} // This should be correct
      variants={variants}
    >
      <h1 className="title-text">{title}</h1>
    </motion.div>
  );
};

export default Titles;

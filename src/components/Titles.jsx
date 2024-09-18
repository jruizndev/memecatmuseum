/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Titles.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./titles.css";

const TitleSection = ({ title }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false, // Trigger animation every time the element enters the view
    threshold: 0.2, // Animation triggers when 20% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // Reset animation when out of view
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
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="section"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <h1 className="title-text">
        {title.split(" ").map((word, index) =>
          index < 3 ? (
            <span key={index}>
              {word}
              <br />
            </span>
          ) : null
        )}
      </h1>
    </motion.div>
  );
};

export default TitleSection;

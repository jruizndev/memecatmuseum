// Titles.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./title.css";

const titles = [
  "Cats Sitting",
  "Cats Cats",
  "Sitting Humans",
  "Cats Enfadados",
  "Me Dijiste",
];

const Titles = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Animation will trigger when 20% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
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
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="sections-container">
      {titles.map((title, index) => (
        <motion.div
          className="section"
          key={index}
          ref={ref}
          initial="hidden"
          animate={controls}
          exit="exit"
          variants={variants}
        >
          <h1 className="title-text">{title}</h1>
        </motion.div>
      ))}
    </div>
  );
};

export default Titles;

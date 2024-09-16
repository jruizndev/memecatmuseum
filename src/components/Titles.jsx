import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../components/title.css";

const Title = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <motion.h1
      className="title"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {text || "Default Title"} {/* Fallback in case text is undefined */}
    </motion.h1>
  );
};

export default Title;

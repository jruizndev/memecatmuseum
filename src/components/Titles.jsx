import { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
    <h1 className={`title ${isVisible ? "visible" : ""}`}>
      {text || "Default Title"} {/* Fallback in case text is undefined */}
    </h1>
  );
};

Title.propTypes = {
  text: PropTypes.string,
};

export default Title;

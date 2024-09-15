// SlideInText.js
import React from "react";
import { motion } from "framer-motion";

const SlideInText = ({ text }) => {
  return (
    <motion.div
      initial={{ x: "-100vw", opacity: 0 }} // Start off-screen to the left and hidden
      animate={{ x: 0, opacity: 1 }} // Slide to the original position and reveal
      transition={{ type: "spring", stiffness: 50, damping: 10 }} // Spring animation for a smooth effect
    >
      {text}
    </motion.div>
  );
};

export default SlideInText;

// // //
// 3. Use the Animation Component:

// Import and use this component in your main application or wherever you want the animation to appear.
//  App.js
// import React from 'react';
// import SlideInText from './SlideInText';

// function App() {
//   return (
//     <div>
//       <h1>Your Website</h1>
//       <SlideInText text="Sustainability and Culture" />
//     </div>
//   );
// }

// export default App;

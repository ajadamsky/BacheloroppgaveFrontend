import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "6rem",
  height: "6rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingDot = {
  width: "1.5rem",
  height: "1.5rem",
  display: "block",
  backgroundColor: "#1d3c34",
  borderRadius: "0.75rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingDotVariants = {
  start: {
    y: "0",
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    y: "0",
  },
};

const loadingDotTransition = {
  duration: 0.4,
  repeat: Infinity,
  repeatDelay: 0.4,
  repeatType: "reverse",
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <div style={{maxHeight: "30px"}}>
      <div className="fixed  w-full min-h-screen z-50 bg-black opacity-30" />
      <div className="flex fixed w-full justify-center items-center h-screen">
        <motion.div
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={loadingDot}
            variants={loadingDotVariants}
            transition={loadingDotTransition}
          ></motion.span>
          <motion.span
            style={loadingDot}
            variants={loadingDotVariants}
            transition={loadingDotTransition}
          ></motion.span>
          <motion.span
            style={loadingDot}
            variants={loadingDotVariants}
            transition={loadingDotTransition}
          ></motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;

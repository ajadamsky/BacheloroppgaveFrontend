import React from "react";
import {motion} from "framer-motion";

const errorContainer = {
  height: "4rem",
  width: "40rem",
  display: "flex",
  opacity: 1,
  backgroundColor: "rgba(255, 161, 161, 0.3)",
  borderRadius: "5px",
  justifyContent: "start",
  alignItems: "center"
};

const errorContainerVariants = {
    start: {
        opacity: 0,
        scale: 0.5,
    },
    end: {
        opacity: 1,
        scale: 1,
    }
}

const ErrorNotification = (props) => {
  return (
    <motion.div style={errorContainer} variants={errorContainerVariants} initial="start" animate="end">
        <img
            style={{
                width: "auto",
                height: "30%",
                display: "flex",
                marginLeft: "3%",
                marginTop: "auto",
                marginBottom: "auto",
                opacity: 1,
            }}
            className="errSymbol"
            src={require("../errSym.png")}
        />

        <p style={{
            marginTop: "auto",
            marginBottom: "auto",

            marginLeft: "3%",
        }}>
            {props.message}
        </p>
    </motion.div>
  );
};

export default ErrorNotification


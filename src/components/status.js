import React from "react";



const Status = (props) => {
    return (
        <div
            style={{
                borderRadius: "10px",
                backgroundColor: props.color,
                display: "flex",
                width: "auto",
                marginLeft: "1rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                paddingTop: "0.1rem",
                paddingBottom: "0.1rem"
            }}
        >
            <p
                style={{
                    marginTop: "auto",
                    marginBottom: "auto",

                    marginRight: "auto",
                    marginLeft: "auto",

                }}
            >
                {props.type}
            </p>
        </div>
    );
};

export default Status;

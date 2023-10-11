import React from "react";
import { motion } from "framer-motion";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBTypography,
} from "mdb-react-ui-kit";
import {fetchTopComment} from "../components/post";
import { DateTime, Duration } from "luxon";

const comment = (props) => {

    var postDate = DateTime.fromISO(props.date); // .setLocale('fr')
    var displayTime = postDate.toRelative();

  return (
    <div className="d-flex flex-start mt-4">
      <a className="me-3" href="#">
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
          alt="avatar"
          width="65"
          height="65"
        />
      </a>

      <div className="flex-grow-1 flex-shrink-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-1">
              {props.userName} <span className="small"> &#x2022; {displayTime}</span>
            </p>
          </div>
          <p className="small mb-0">{props.content}</p>
        </div>
      </div>
      <div className="blank-space"></div>
    </div>
    
  );
};

export default comment;

import React, { useState } from "react";
import arrowImg from "../arrow.png";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { UrlConfig } from "../config";
import Loader from "../components/loader";
import ErrorNotification from "../components/errorNotification";
import { UseAuth } from "../functions/authentication";



const arrow = {
  height: "4rem",
  width: "4rem",
  borderRadius: "5px",
  marginRight: "1rem",
  marginLeft: "1rem",
  float: "right",
};

const voteContainer = {
  display: "flex",
  flexDirection: "Column",
  marginTop: "auto",
  marginBottom: "auto",
};

const voteText = {
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  textAlign: "center",
};

async function fetchUserVote(userId, postId) {
  if (postId) {
    return await fetch(UrlConfig.serverUrl + "/Vote/user/post/" + postId, {
      headers: {
        userId: userId,
      },
    }).then((res) => {
      const result = res.json();
      return result;
    });
  }
}

const Vote = (props) => {
  const { token } = UseAuth();
  const postId = props.id;

  const [hasLiked, setHasLiked] = useState(props.liked)
  const [likedCount, setLikeCount] = useState(props.votes)

 /*  const {data, status, refetch} = useQuery({
    queryKey: ["Vote", props.id]
  }) */
  async function doVote(dir, postId, userId, count) {
    console.log("did vote");
    if (postId) {
      let formData = new FormData();
      formData.append("direction", dir);
      formData.append("postId", postId);

      return await fetch(UrlConfig.serverUrl + "/Vote", {
        headers: {
          userId: userId,
        },
        body: formData,
        method: "post",
      }).then((res) => {
        const result = res.json();
        setHasLiked(dir)
        setLikeCount((cur) => cur += count) 
        return result
      });
    }
  }

  if (hasLiked == 1) {
    return (
      <div style={voteContainer}>
        <button
          class="voteButton"
          style={arrow}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            doVote(0, postId, token, -1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={{
              width: "2em",
              height: "2em",
              //horizontalAlign: "1em"
            }}
          >
            <path
              fill="#48a23f"
              d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z"
            />
          </svg>
        </button>
        <p style={voteText}>{likedCount}</p>
        <button
          class="voteButton"
          style={arrow}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            doVote(-1, postId, token, -2);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={{
              width: "2em",
              height: "2em",
              //horizontalAlign: "1em"
            }}
          >
            <path
              fill="#b7acaa"
              d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26s-12.5-14.5-22-14.5l-72 0 0-288c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32l0 288-72 0c-9.6 0-18.2 5.7-22 14.5z"
            />
          </svg>
        </button>
      </div>
    );
  }

  if (hasLiked == -1) {
    return (
      <div style={voteContainer}>
        <button
          class="voteButton"
          style={arrow}
          onClick={() => doVote(1, props.id, token, 2)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={{
              width: "2em",
              height: "2em",
              //horizontalAlign: "1em"
            }}
          >
            <path
              fill="#b7acaa"
              d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z"
            />
          </svg>
        </button>
        <p style={voteText}>{likedCount}</p>
        <button
          class="voteButton"
          style={arrow}
          onClick={() => doVote(0, props.id, token, 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={{
              width: "2em",
              height: "2em",
              //horizontalAlign: "1em"
            }}
          >
            <path
              fill="#48a23f"
              d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26s-12.5-14.5-22-14.5l-72 0 0-288c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32l0 288-72 0c-9.6 0-18.2 5.7-22 14.5z"
            />
          </svg>
        </button>
      </div>
    );
  }

  if (hasLiked == 0) {
  return (
    <div style={voteContainer}>
      <button
        class="voteButton"
        style={arrow}
        onClick={() => doVote(1, props.id, token, 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          style={{
            width: "2em",
            height: "2em",
            //horizontalAlign: "1em"
          }}
        >
          <path
            fill="#b7acaa"
            d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z"
          />
        </svg>
      </button>
      <p style={voteText}>{likedCount}</p>
      <button
        class="voteButton"
        style={arrow}
        onClick={() => doVote(-1, props.id, token, -1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          style={{
            width: "2em",
            height: "2em",
            //horizontalAlign: "1em"
          }}
        >
          <path
            fill="#b7acaa"
            d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26s-12.5-14.5-22-14.5l-72 0 0-288c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32l0 288-72 0c-9.6 0-18.2 5.7-22 14.5z"
          />
        </svg>
      </button>
    </div>
  );
};
}


export default Vote;

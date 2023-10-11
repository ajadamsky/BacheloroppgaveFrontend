import React from "react";
import { UrlConfig } from "../config";
import "../styling/posts.css";
import "../App.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Loader from "../components/loader";
import ErrorNotification from "../components/errorNotification";
import { useQuery } from "react-query";
import Post from "../components/post";
import { UseAuth } from "../functions/authentication";

async function fetchPostsData(token) {
  return await fetch(UrlConfig.serverUrl + "/Post", {
    headers: { userId: token },
  }).then((res) => {
    const result = res.json();
    return result;
  });
}

export default function Posts() {
  const { token } = UseAuth();
  const { error, data, status } = useQuery({
    queryKey: ["Posts123"],
    queryFn: () => fetchPostsData(token),
  });

  function displayPostsData() {
    if (data == undefined) {
      return;
    }

    return data.map((element) => {
      let hasLiked = 0;

      if (element.liked != undefined) {
        if (element.liked.liked == true) {
          hasLiked = 1;
        } else {
          hasLiked = -1;
        }
      }
      return (
        <>
          <Post
            id={element.id}
            title={element.title}
            description={element.description}
            userName={element.user.userName}
            status={element.status.type}
            category={element.category.type}
            votes={element.up_votes - element.down_votes || 0}
            date={element.created}
            comments={element.comments ?? 0}
            liked={hasLiked}
          />

          <div className="blank-space"></div>
        </>
      );
    });
  }

  return (
    <>
      <div className="Appcontainer">
        <section style={{ backgroundColor: "#f0f4e3" }}>
          <MDBContainer className="py-5" style={{ maxWidth: "100%" }}>
            <MDBRow className="justify-content-center">
              <MDBCol md="12" lg="10">
                <MDBCard className="text-dark">
                  <MDBCardBody className="p-4 header-text">
                    <MDBTypography tag="h1" className="mb-2">
                      Asplan Viak <br /> Feedback System
                    </MDBTypography>
                    <p className="fw-light mb-4 pb-2">
                      <br />
                      <h5>
                        Se alle feedbackene med ris, ros og forbedringsforslag
                        sendt til oss
                      </h5>
                    </p>
                    <br />
                  </MDBCardBody>
                  <div className="blank-space-header"></div>
                  {status == "loading" ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100vh",
                        }}
                      >
                        <Loader />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {status == "error" ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "10vh",
                        }}
                      >
                        <ErrorNotification
                          message={error.name + " : " + error.message}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {status == "success" ? <>{displayPostsData()}</> : ""}
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </>
  );
}

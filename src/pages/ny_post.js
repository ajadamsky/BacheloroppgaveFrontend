import React, { useState, useEffect, useRef } from "react";
import { UrlConfig } from "../config";
import logo from "../logo5.png";
import "../styling/ny_post.css";

import { UseAuth } from "../functions/authentication";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRadio,
  MDBRow,
  MDBTextArea,
  MDBRange,
  MDBInput,
  MDBScrollspy,
} from "mdb-react-ui-kit";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../components/loader";

export default function NyPosts() {
  const [loading, setLoading] = useState(false);
  const { token } = UseAuth();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const [labelTakk, setLabelTakk] = useState("");

  const navgiate = useNavigate();

  useEffect(() => {
    fetch(UrlConfig.serverUrl + "/Category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((e) => console.log(e));
  }, []);

  async function submitData() {
    setLoading(true);
    let myForm = new FormData();
    myForm.append("categoryId", categoryId);
    myForm.append("title", title);
    myForm.append("description", descriptionRef.current.value);
    let res = await fetch(UrlConfig.serverUrl + "/Post", {
      method: "post",
      headers: { userId: token },
      body: myForm,
    });

    if (res.status == "200") {
      setLoading(false);
      setLabelTakk("Takk for din tilbakemelding! Vi setter pris på det.");

      setTimeout(() => {
        setLabelTakk("");
        navgiate("/posts");
      }, 3000);
    }
  }

  return (
    <>
      <div className="container">
        <div className="main-container-item2">
          <img className="image-container2" src={logo} />
        </div>

        <div className="beskrivelse d-flex flex-column align-items-center justify-content-center">
          <div className="beskrivelse2">
            <h3>Din tilbakemelding betyr mye for oss!</h3>
          </div>
          <div className="beskrivelse3">
            <h5>
              Vennligst fyll ut vårt skjema. Velg hva slags feedback du ønsker å
              registere, deretter skriv hva kan vi gjøre for å forbedre
              brukeropplevelse av våre tjenester.
            </h5>
          </div>
        </div>
        <br />
        <br />

        <form
          className="px-4"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            submitData();
          }}
        >
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol size="11">
                <MDBCard>
                  <MDBCardBody>
                    <div className="text-center">
                      <MDBIcon
                        far
                        icon="file-alt mb-3 text-primary"
                        size="4x"
                      />
                    </div>
                    <p className="text-center">
                      <strong>
                        <h5>Hva slags feedback ønsker du å registrere?</h5>
                      </strong>
                    </p>

                    <div>
                      <select
                        required
                        className="form-control"
                        aria-label="Floating label select example"
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="" disabled selected="selected">
                          -- Velg --
                        </option>
                        {categories.map((element) => {
                          return (
                            <option value={element.id}>{element.type}</option>
                          );
                        })}
                      </select>
                    </div>

                    <hr></hr>
                    <p className="text-center">
                      <strong>
                        <h5>Tittel</h5>
                      </strong>
                    </p>
                    <MDBInput
                      className="mb-4"
                      label="Skriv feedbacken din her:"
                      id="tittel"
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      required
                    />
                    <div className="editorContainer">
                      <ReactQuill
                        ref={descriptionRef}
                        theme="snow"
                        className="editor"
                        id="textAreaExample"
                        type="text"
                        required
                      />
                    </div>
                  </MDBCardBody>
                  <MDBCardFooter>
                    <div className="text-end d-flex flex-row">
                      <div className="p-2">
                        <p>{labelTakk}</p>
                      </div>

                      <div className="ml-auto p-2">
                        {loading ? (
                          <Loader />
                        ) : (
                          <button
                            type="submit"
                            className="submit-ny-innlegg btn btn-success"
                          >
                            Send inn
                          </button>
                        )}
                      </div>
                    </div>
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
        <br />
      </div>
    </>
  );
}

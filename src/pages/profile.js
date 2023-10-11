import React, { useRef, useState } from "react";
import "../App.css";
import "../styling/profile.css";
import { DefaultPanel } from "../components/admin/panel";
import { UrlConfig } from "../config";
import { UseAuth } from "../functions/authentication";
import Loader from "../components/loader";
import defaultImg from "../default.jpg"

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [labelSuccess, setLabelSuccess] = useState("");
  const { token, profilePicture } = UseAuth();
  const [inputFile, setInputFile] = useState(0);
  const preview = useRef();

  function previwProfilePic(file) {
    setInputFile(file);
    preview.current.src = URL.createObjectURL(file);
  }

  async function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  async function submitForm() {
    setLoading(true);
    await blobToBase64(inputFile).then((profileImg) => {
      let url = new URL(UrlConfig.serverUrl + "/User/id/" + token);
      fetch(url, {
        method: "post",
        headers: {
          userId: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileImg),
      }).then(() => {
        setLoading(false);
        setLabelSuccess("Profil bildet endret. Refresh netsiden for å se endringene");

        setTimeout(() => {
          setLabelSuccess("");
        }, 5000);
      });
    });
  }

  return (
    <>
      <div className="Appcontainer">
        <DefaultPanel
          header={"Rediger profil"}
          title={"Her kan du legge til eller endre profil bildet ditt"}
        />
        <form
          className="m-2 p-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <div class="form-group">
            <input
              className="custom-file-input"
              required
              type="file"
              accept="image/*"
              class="form-control"
              id="profilePic"
              placeholder="File"
              onChange={(e) => previwProfilePic(e.target.files[0])}
            />
            <div style={{ height: "10px" }}></div>

            <img
              ref={preview}
              src={profilePicture ?? defaultImg}
              style={{ width: "200px" }}
              alt="Image preview"
            ></img>
          </div>
          <hr></hr>
          <div className="d-flex flex-row">
            <div className="p-2">
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  class="btn btn-success"
                  style={{ backgroundColor: "#198754" }}
                >
                  Lagre
                </button>
              )}
            </div>
            <div className="ml-auto p-2">{labelSuccess}</div>
          </div>
        </form>
      </div>
    </>
  );
}

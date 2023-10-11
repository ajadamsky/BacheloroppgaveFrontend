import React, { useState, useRef } from "react";
import { useQuery } from "react-query";
import "../../App.css";
import Loader from "../../components/loader";
import ErrorNotification from "../../components/errorNotification";
import AdminPanel from "../../components/admin/panel";
import { fetchCategories } from "../../functions/category";
import { UrlConfig } from "../../config";
import { UseAuth } from "../../functions/authentication";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Category() {
  const { token } = UseAuth();

  const { data: categoryData, status: categoryStatus, refetch: refetchCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => fetchCategories(),
  });

  function displayCategoryData() {
    return categoryData.map((element) => {
      let nyDato = new Date(element.created).toLocaleDateString();
      return (
        <DisplayCategory
          id={element.id}
          type={element.type}
          description={element.description}
          created={nyDato}
        />
      );
    });
  }

  const [typeInput, setTypeInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onSuccess, setOnSuccess] = useState("");
  async function submitAddCategory() {
    setIsLoading(true);
    let url = new URL(UrlConfig.serverUrl + "/Category");

    let newForm = new FormData();
    newForm.append("type", typeInput);
    newForm.append("description", descriptionInput);

    let result = await fetch(url, {
      method: "post",
      headers: { userId: token },
      body: newForm,
    });

    if (result.status == "200") {
      setIsLoading(false);
      setOnSuccess("Success");
      refetchCategory();
      setTimeout(() => {
        setOnSuccess("");
      }, 3000);
    } else {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="Appcontainer">
        <AdminPanel title={"Se eller legg til kategorier"} />
        <div className="blank-space-header" style={{ height: "50px" }}></div>
        <div className="add-new-category d-flex flex-column align-items-center">
          <button
            type="button"
            class="btn btn-success"
            data-toggle="modal"
            data-target="#kategoriModal"
          >
            Legg til en ny kategori
          </button>
        </div>
        <div className="blank-space-header" style={{ height: "50px" }}></div>
        <div className="mainContent" style={{ overflow: "scroll" }}>
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Beskrivelse</th>
                <th scope="col">Opprettet</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {categoryStatus === "success" ? displayCategoryData() : ""}
            </MDBTableBody>
          </MDBTable>
        </div>
        {categoryStatus === "loading" ? (
          <div className="d-flex flex-column align-items-center">
            <Loader />
          </div>
        ) : (
          ""
        )}
      </div>

      <div
        class="modal fade"
        id="kategoriModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="kategoriModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitAddCategory();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="kategoriModalLabel">
                  Legg til kategori
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="type">Type</label>
                  <input
                    class="form-control"
                    id="type"
                    type="text"
                    onChange={(e) => setTypeInput(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label for="description">Gi en beskrivelse</label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    onChange={(e) => setDescriptionInput(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <div>{onSuccess}</div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Lukk
                </button>
                {isLoading ? (
                  <Loader />
                ) : (
                  <button type="submit" class="btn btn-success">
                    Lagre
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function DisplayCategory(props) {
  return (
    <>
      <tr id={props.id}>
        <td>
          <p className="fw-normal mb-1">{props.type}</p>
        </td>
        <td>
          <p className="fw-normal mb-1">{props.description}</p>
        </td>
        <td>
          <p className="fw-normal">{props.created}</p>
        </td>
      </tr>
    </>
  );
}

import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import { UrlConfig } from "../../config";
import { UseAuth } from "../../functions/authentication";
import Loader from "../loader";
import ErrorNotification from "../errorNotification";

export default function DisplayPosts(props) {
  const [postStatus, setPostStatus] = useState(props.status);
  const { token } = UseAuth();

  async function fetchStatus() {
    let url = new URL(UrlConfig.serverUrl + "/Status/post/" + props.id);
    return await fetch(url, {
      headers: {
        userId: token,
      },
    }).then((res) => {
      return res.json();
    });
  }

  const {
    data: status,
    status: statusStatus,
    refetch: refetchStatus,
  } = useQuery({
    refetchOnWindowFocus: false,
    enabled: false,
    queryKey: ["status", props.id],
    queryFn: () => fetchStatus(),
  });

  const whatStatusColor = () => {
    let color = "";
    if (postStatus == "Besvart") color = "success";
    else if (postStatus == "Venter") color = "warning";
    else if (postStatus == "Avslått") color = "danger";

    return (
      <>
        <MDBBadge color={color} pill>
          {postStatus}
        </MDBBadge>
      </>
    );
  };

  return (
    <>
      <tr id={props.id}>
        <td>
          <div className="d-flex align-items-center">
            <img
              src={props.profilePicture ?? "https://mdbootstrap.com/img/new/avatars/8.jpg"}
              alt=""
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">{props.userName}</p>
              <p className="text-muted mb-0">{props.email}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{props.title}</p>
        </td>
        <td>
          <div dangerouslySetInnerHTML={{__html: props.description}}></div>
        </td>
        <td>{whatStatusColor()}</td>
        <td>
          <MDBBadge color="warning" pill>
            {props.category}
          </MDBBadge>
        </td>
        <td>
          <p className="fw-normal">{props.created}</p>
        </td>
        <td>
          <div className="d-flex flex-column">
            <a
              className="pr-2"
              color="link"
              rounded
              size="sm"
              href={"/posts/id/" + props.id}
            >
              Åpne
            </a>

            <a
              color="link"
              rounded
              size="sm"
              href="#"
              data-toggle="modal"
              data-target={"#modal-for-" + props.id}
              onClick={() => refetchStatus()}
            >
              Sett status
            </a>
          </div>
        </td>
      </tr>

      <StatusModal
        postId={props.id}
        status={status}
        statusStatus={statusStatus}
        setPostStatus={setPostStatus}
      />
    </>
  );
}

function StatusModal({ postId, status, statusStatus, setPostStatus }) {
  const { token } = UseAuth();
  const typeOfStatuses = ["venter", "Besvart", "Avslått"];
  const [statusType, setStatusType] = useState("");
  const [statusDescription, setStatusDescription] = useState("");
  const [displayTakk, setDisplayTakk] = useState("");

  useEffect(() => {
    console.log("rerednering this blabla");
    if (status != undefined) {
      setStatusDescription(status.description);
    }
  }, [status]);

  async function postStatus() {
    let url = new URL(UrlConfig.serverUrl + "/Status");

    let myForm = new FormData();
    myForm.append("postId", postId);
    myForm.append("type", statusType);
    myForm.append("description", statusDescription);

    let res = await fetch(url, {
      method: "post",
      headers: { userId: token },
      body: myForm,
    });

    if (res.status == "200") {
      setDisplayTakk("Status oppdatert");

      setTimeout(() => {
        setDisplayTakk("");
        setPostStatus(statusType);
      }, 3000);
    }
  }

  function displayCurrentStatus() {
    return (
      <>
        <div class="form-group">
          <label for="statusDescription">Beskrivelse</label>
          <input
            type="text"
            class="form-control"
            id="statusDescription"
            aria-describedby="description"
            placeholder="status description"
            onChange={(e) => setStatusDescription(e.target.value)}
            value={statusDescription}
          />
          <small id="statusHelp" class="form-text text-muted">
            Gi en status beskrivelse
          </small>
        </div>

        <div class="form-group">
          <label for="selectStatus">Velg status</label>
          <select
            class="form-control"
            id="selectStatus"
            onChange={(e) => setStatusType(e.target.value)}
          >
            {typeOfStatuses.map((el) => {
              if (status.type == el) {
                return <option selected>{el}</option>;
              } else {
                return <option>{el}</option>;
              }
            })}
          </select>
        </div>
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postStatus();
        }}
      >
        <div
          class="modal fade"
          id={"modal-for-" + postId}
          tabindex="-1"
          role="dialog"
          aria-label={"modal-for-" + postId}
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id={"modal-for-" + postId}>
                  Status
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
                {statusStatus == "loading" ? <Loader /> : ""}
                {statusStatus == "error" ? (
                  <ErrorNotification message="error" />
                ) : (
                  ""
                )}
                {statusStatus == "success" ? displayCurrentStatus() : ""}
              </div>
              {statusStatus == "success" ? (
                <>
                  <div class="modal-footer">
                    <div>{displayTakk}</div>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Avbryt
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Lagre
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { UrlConfig } from "../../config";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { MdSearch } from "react-icons/md";
import "../../styling/brukere.css";
import "../../App.css";
import AdminPanel from "../../components/admin/panel";
import { UseAuth } from "../../functions/authentication";
import { useQuery } from "react-query";
import Loader from "../../components/loader";
import ErrorNotification from "../../components/errorNotification";

function DisplayBruker(props) {
  const { token } = UseAuth();
  const rolleRef = useRef();
  const [curURoleId, setCurURoleId] = useState(props.userRoleId);
  const [curURole, setCurURole] = useState(props.rolle);

  const [updateStatus, setUpdateStatus] = useState("");

  const {
    data: userRoles,
    status: userRoleStatus,
    refetch,
  } = useQuery({
    refetchOnWindowFocus: false,
    enabled: false,
    queryKey: ["userRoles", props.userId],
    queryFn: () => fetchUserRoles(token),
  });

  async function fetchUserRoles(userId) {
    let url = new URL(UrlConfig.serverUrl + "/Role");
    return await fetch(url, {
      headers: {
        userId: userId,
      },
    }).then((res) => {
      return res.json();
    });
  }

  const randImg =
    "https://mdbootstrap.com/img/new/avatars/" +
    Math.floor(Math.random() * 15) +
    ".jpg";

  async function updateUserRole(token) {
    let url = new URL(UrlConfig.serverUrl + "/User/id/" + props.userId);
    url.searchParams.append("userRoleId", curURoleId);

    let res = await fetch(url, {
      method: "post",
      headers: { userId: token },
    });

    if (res.status == "200") {
      setUpdateStatus("Bruker rolle endret");

      console.log(curURoleId);
      setTimeout(() => {
        setUpdateStatus("");
        userRoles?.forEach((element) => {
          if (element.id == curURoleId) {
            rolleRef.current.innerHTML = element.type;
          }
        });
      }, 3000);
    } else {
      setUpdateStatus("Kunne ikke endre rolle");

      setTimeout(() => {
        setUpdateStatus("");
      }, 3000);
    }
  }

  return (
    <>
      <tr>
        <td>
          <div className="d-flex align-items-center">
            <img
              src={randImg}
              alt=""
              style={{ width: "45px", height: "45px" }}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">{props.userName}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{props.userEmail}</p>
        </td>
        <td>
          <p ref={rolleRef} className="fw-normal mb-1">
            {props.rolle}
          </p>
        </td>
        <td>
          <p className="fw-normal mb-1">{props.opprettet}</p>
        </td>
        <td>
          <div className="d-flex flex-column">
            <a
              color="link"
              rounded
              size="sm"
              href="#"
              data-toggle="modal"
              data-target={"#bruker-modal-" + props.userId}
              onClick={() => refetch()}
            >
              Endre
            </a>
            <a color="link" rounded size="sm" href="#">
              Slett
            </a>
          </div>
        </td>
      </tr>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserRole(token);
        }}
      >
        <div
          class="modal fade"
          id={"bruker-modal-" + props.userId}
          tabindex="-1"
          role="dialog"
          aria-labelledby={"bruker-modal-" + props.userId}
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id={"bruker-modal-" + props.userId}>
                  Endre rolle for <b>{props.userName}</b>
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
                {userRoleStatus == "loading" ? <Loader /> : ""}

                {userRoleStatus == "error" ? <ErrorNotification /> : ""}

                {userRoleStatus == "success" ? (
                  <>
                    <div class="form-group">
                      <label for="selectStatus">Velg rolle</label>
                      <select
                        class="form-control"
                        id="selectStatus"
                        onChange={(e) => {
                          setCurURoleId(e.target.value);
                        }}
                      >
                        {userRoles.map((el) => {
                          if (el.type == props.rolle) {
                            return (
                              <option value={el.id} selected>
                                {el.type}
                              </option>
                            );
                          } else {
                            return <option value={el.id}>{el.type}</option>;
                          }
                        })}
                      </select>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div class="modal-footer">
                <div>{updateStatus}</div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Lukk
                </button>
                <button type="submit" class="btn btn-primary">
                  Lagre endringer
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default function Brukere() {
  const { token } = UseAuth();

  const { data: users, status: userStatus } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(token),
  });

  async function fetchUsers(userId) {
    let url = new URL(UrlConfig.serverUrl + "/User");
    return await fetch(url, {
      headers: {
        userId: userId,
      },
    }).then((res) => {
      return res.json();
    });
  }

  const display = () => {
    return users.map((element) => {
      if (element.id == token) return;

      let newdate = new Date(element.created);
      return (
        <DisplayBruker
          userId={element.id}
          userName={element.userName}
          userEmail={element.email}
          rolle={element.userRole.type}
          opprettet={newdate.toLocaleDateString()}
          userRoleId={element.userRole.id}
        />
      );
    });
  };

  return (
    <>
      <div className="Appcontainer">
        <AdminPanel
          title={
            "Her kan du finne oversikt over alle brukere. Endre rolle til brukeren eller slette brukere."
          }
        />
        <div className="blank-space-header"></div>

        <MDBCardBody className="p-4">
          <form action="#" onSubmit="#">
            <div class="form-inline my-2 my-lg-3">
              {" "}
              <MdSearch style={{ fontSize: "25px" }} />
              <input
                type="text"
                class="form-control"
                placeholder="Søk..."
                aria-label="Søk etter tittel eller bruker"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append"></div>
            </div>
          </form>
        </MDBCardBody>
        <div className="mainContent" style={{ overflow: "scroll" }}>
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Navn</th>
                <th scope="col">Email</th>
                <th scope="col">Rolle</th>
                <th scope="col">Opprettet</th>
                <th scope="col">Administer</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {userStatus == "success" ? display() : ""}
            </MDBTableBody>
          </MDBTable>
        </div>
        {userStatus == "loading" ? (
          <div className="d-flex flex-column align-items-center">
            <Loader />
          </div>
        ) : (
          ""
        )}

        {userStatus == "error" ? (
          <div className="d-flex flex-column align-items-center">
            <ErrorNotification />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardBody,
    MDBTypography,
  } from "mdb-react-ui-kit";

export default function AdminPanel({ title }) {
    
  return (
    <>
      <MDBCardBody className="p-4 header-text">
        <MDBTypography tag="h1" className="mb-2">
          Admin Panel
        </MDBTypography>
        <p className="fw-light mb-4 pb-2">
          <br />
          <h5>
            {title}
          </h5>
        </p>
        <br />
      </MDBCardBody>
    </>
  );
}

export function DefaultPanel({ header, title }) {
    
  return (
    <>
      <MDBCardBody className="p-4 header-text">
        <MDBTypography tag="h1" className="mb-2">
          {header}
        </MDBTypography>
        <p className="fw-light mb-4 pb-2">
          <br />
          <h5>
            {title}
          </h5>
        </p>
        <br />
      </MDBCardBody>
    </>
  );
}


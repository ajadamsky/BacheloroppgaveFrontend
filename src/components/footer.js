import React from "react";
import "../styling/footer.css"

export default function Footer() {
  return (
    <>
      <div className="footer d-flex flex-column align-items-center justify-content-center">
        <h5 className="footer-text-large">Kontaktinformasjon</h5>
        <p className="footer-text-small">
          Kontakt oss på redaksjon@asplanviak.no
        </p>
        <p className="footer-text-smaller">
          Laget av UiA studenter for Asplan Viak © 2023
        </p>
      </div>
    </>
  );
}

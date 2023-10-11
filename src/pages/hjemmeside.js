import "../styling/hjemmeside.css";
import React from "react";
import asplan from "../illustrasjon.png";
import il1 from "../1.png";
import il2 from "../2.png";
import il3 from "../3.png";
import Footer from "../components/footer";
import il4 from "../4.png";
import il5 from "../5.png";
import il6 from "../6.png";
import viak from "../asplan_viak_1.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef } from 'react';
import { motion } from "framer-motion";

/*export default function Hjemmeside() {
    return (
        <h1 className="hjemmeside">User Feedback System</h1>
        
    )
}
*/

function Hjemmeside() {
  const scroll1 = useRef(null);
  const scroll2 = useRef(null);
  const scroll3 = useRef(null);

  function handlePictureClick() {
    scroll1.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function handlePictureClick2() {
    scroll2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function handlePictureClick3() {
    scroll3.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  return (
    <>
        <div className="main-container ">
          <div className="main-container-item-1">
            <div className="tittel">
              Asplan Viak <br /> Feedback System
            </div>
            <div className="undertittel">
              <h3>Registrer din tilbakemelding av våre tjenester utvilket av Asplan
              Viak. Vi er nysgjerrige på å høre hva du mener om oss mens vi hjelper deg
              så godt vi kan.</h3>
            </div>
          </div>
          <div className="main-container-item">
          <motion.h1
                animate={{ x: [1, 1, 1], opacity: 1, scale: 1 }}
                transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: [0.5, 0.71, 1, 1.5],
                }}
                initial={{ opacity: 0, scale: 0.5 }}
            >
            <img className="image-container" src={asplan}  />
            </motion.h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="forklaring d-flex justify-content-center">
           Hvordan fungerer det?
            </div>
            <div className="col-sm">
              <div
                className="image1"
                style={{ backgroundImage: `url(${il4})` }}onClick={handlePictureClick}
              ></div>
              <p class="text-center">1. Logg inn </p> Det er lett å komme i gang
              med vårt system. Vi krever ingen registrering. Logg deg inn på
              en-to-tre med Azure AD. Helt gratis.
            </div>
            <div className="col-sm">
              <div
                className="image2"
                style={{ backgroundImage: `url(${il5})` }}onClick={handlePictureClick2}
              ></div>
              <p class="text-center">2. Registrer feedback </p>Registrer
              tilbakemelding av din opplevelse av våre tjenester som du har
              brukt. Da kan du velge mellom ris, ros, tips eller forbedring.
            </div>
            <div className="col-sm">
              <div
                className="image3"
                style={{ backgroundImage: `url(${il6})` }}onClick={handlePictureClick3}
              ></div>
              <p class="text-center">3. Vent på svar fra oss </p> Sånn, da er
              det gjort! Vi skal gå gjennom feedbacken din. Du vil straks få et
              svar av oss. Vi setter pris på at du tok deg tid!
            </div>
          </div>
        </div>
        <div className="container">
        <div  ref={scroll1} className="forklaring2 d-flex flex-column align-items-center justify-content-center">
        <div className="row">
        <div className="col-sm-7 p-4 d-flex flex-column align-items-center justify-content-center "><h1><p class="font-weight-bold">Trygt innlogging med Azure AD <h3>For din sikkerhet</h3></p></h1></div> 
        <div className="col-sm-5 p-4 "><h3>Vårt mål er at du skal kunne ta raskt i bruk vårt system. Derfor bruker vi bare løsninger du kan virkelig stole på, med Microsoft innloggingsystem. <br /> <br />Enklere blir det ikke. </h3> </div>
        </div> 
        </div>
        <br/>
        <div ref={scroll2}className="forklaring3 d-flex flex-column align-items-center justify-content-center">
        <div className="row">
        <div className="col-sm-7 p-4 d-flex flex-column align-items-center justify-content-center "><h1><p class="font-weight-bold">Feedbacksystem for våre ansatte<h3>Utviklet av oss til deg</h3></p></h1></div> 
        <div className="col-sm-5 p-4 "><h3>Asplan Viak ønsker å få alle slags tilbakemeldinger av sine tjenester fra brukere. Derfor ber vi deg om å registerere alt det du ønsker å si til oss. Slik kan vi bli bedre.<br /> <br />Enklere blir det ikke. </h3> </div>
        </div>
        </div>
        <br/>
        <div ref={scroll3}className="forklaring4 d-flex flex-column align-items-center justify-content-center">
        <div className="row">
        <div className="col-sm-7 p-4 d-flex flex-column align-items-center justify-content-center "><h1><p class="font-weight-bold">Vi leser alle tilbakemeldinger<h3>Og selvsagt svarer på dem</h3></p></h1></div> 
        <div className="col-sm-5 p-4 "><h3>Vi får et varsel når det kommer en ny melding til oss. En av våre administratore skal gå gjennom feedbackem din. Kanskje du skal være med på å endre fremtiden?</h3> </div>
        </div> 
        </div>
        <br/>
</div>

    </>
  );
}

export default Hjemmeside;

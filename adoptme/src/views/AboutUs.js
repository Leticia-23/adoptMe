import React from "react";
import { Container } from "react-bootstrap";

function AboutUs() {
  return (
    <div className="aboutUs">
      <Container className="mb-5 text-center">
        <h1 style={{ color: "#ff7043" }}>Who are we?</h1>
        <p>
          We are a community where any institution that have animals to adopt
          have a place with us. In addition, anyone has the opportunity to meet
          the institutions and animals for adoption.
        </p>
        <p>
          This community and this web page have been created by Leticia Sánchez
          Romero.
        </p>
        <h1 style={{ color: "#ff7043" }}>What do we do?</h1>
        <p>
          Any institution can contact us to belong to our community and make
          yourself known.
        </p>
        <p>
          We provide institutions with the option to add information about all
          the animals they have for adoption and those that have already been
          adopted.
        </p>
        <p>
          We provide users with the opportunity to find all the information
          about the institutions and the animals for adoption by them. In this
          way they can know which animals they can adopt and how to contact the
          institutions (websites, telephones).
        </p>
        <h1 style={{ color: "#ff7043" }}>Where is the information obtained?</h1>
        <p className="mb-5 pb-5">
          The information is obtained thanks to the institutions that are
          registered in our community. All the animals that they registry are
          ready to be seen for everyone.
        </p>
      </Container>
    </div>
  );
}

export default AboutUs;

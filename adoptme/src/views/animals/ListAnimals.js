import React, { useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import Adopt from "./components/Adopt";
import Adopted from "./components/Adopted";

function ListAnimals() {
  const [option, setOption] = useState(true);

  const handleChange = (e) => {
    if (option) {
      setOption(false);
    } else {
      setOption(true);
    }
  };

  return (
    <div className="listAnimals">
      <Container className="mb-5 pb-5">
        <h1 className="text-center" style={{ color: "#ff7043" }}>
          Animals
        </h1>
        <Row className="mb-3">
          <Form.Select aria-label="Select option" onChange={handleChange}>
            <option value="Adopt">Animals to adopt</option>
            <option value="Adopted">Adopted animals</option>
          </Form.Select>
        </Row>
        <Container>{option ? <Adopt /> : <Adopted />}</Container>
      </Container>
    </div>
  );
}

export default ListAnimals;

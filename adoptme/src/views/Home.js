import React from "react";
import { Container, Button } from "react-bootstrap";

function Home() {
  return (
    <div className="App mt-4">
      <Container className="mt-5 mb-5 col-lg-4 col-sm-7 col-md-6">
        <h1 className="text-center"> Laboratories project 2</h1>
        <Button
          className="text-center col-6 m-5"
          variant="primary"
          type="submit"
        >
          Lab 2
        </Button>
        <Button
          className="text-center col-6 m-5"
          variant="primary"
          type="submit"
        >
          Lab 3
        </Button>
      </Container>
    </div>
  );
}

export default Home;

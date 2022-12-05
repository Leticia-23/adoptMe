import React, { useState, useRef, useContext } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";

import { UserContext } from "../../environment/UserProvider";

function EditAnimal() {
  // TODO: get animal information
  let { animal, setAnimal } = "";

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [bornDate, setBornDate] = useState("");
  let [size, setSize] = useState("");
  let [color, setColor] = useState("");
  let [danger, setDanger] = useState("");
  let [sterile, setSterile] = useState("");
  let [adopted, setAdopted] = useState("");
  let [adoptionDate, setAdoptionDate] = useState("");
  let [userAdopt, setUserAdopt] = useState("");

  //TODO: put animal photo
  let [img, setImg] = useState("/assets/person-circle.svg");
  let [imgFile, setImgFile] = useState(null);

  const inputRef = useRef(null);
  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleImgChange = (event) => {
    if (event.target.files.length !== 1) {
      return;
    }
    setImgFile(event.target.files[0]);
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Name: " +
        name +
        "description" +
        description +
        " born date: " +
        bornDate +
        " Size: " +
        size +
        " color: " +
        color +
        " danger:" +
        danger +
        " sterile: " +
        sterile +
        " adopted: " +
        adopted +
        " adoptionDate:" +
        adoptionDate +
        " userAdopt: " +
        userAdopt
    );

    /* createUser({
      name: state.name,
      email: state.email,
      password: state.password,
      repeatPassword: state.repeatPassword,
    })
      .then((response) => {
        console.log(response);
        navigate("/lab3-login");
      })
      .catch((error) => {
        console.log(error);
        return;
      }); */
  };

  return (
    <div className="editProfile">
      <Container className="mb-5 pb-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <div className="col-sm-4 text-center">
              <input
                ref={inputRef}
                className="d-none"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleImgChange}
              />
              <img
                className="img img-responsive clickable w-100 border border-primary profile-pic "
                onClick={handleUpload}
                src={img}
                alt=""
              />
              <p className="mt-3 text-center">Animal photo</p>
            </div>
            <div className="col-sm-4">
              <h2>Animal name</h2>
              <Form.Group className="mb-3 text-start " controlId="name">
                <Form.Control
                  type="name"
                  placeholder="New animal name"
                  onInput={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="description">
                <textarea
                  class="form-control"
                  rows="4"
                  id="description"
                  placeholder="New information"
                  onInput={(e) => setDescription(e.target.value)}
                ></textarea>
              </Form.Group>

              {/* TODO: change to calendar form */}
              <Form.Group className="mb-3 text-start " controlId="borDate">
                <Form.Control
                  type="borDate"
                  placeholder="Animal borDate"
                  onInput={(e) => setBornDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="size">
                <Form.Control
                  type="size"
                  placeholder="Animal size"
                  onInput={(e) => setSize(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="color">
                <Form.Control
                  type="color"
                  placeholder="Animal color"
                  onInput={(e) => setColor(e.target.value)}
                />
              </Form.Group>
            </div>

            {/* TODO: change to choose option */}
            <Form.Group className="mb-3 text-start " controlId="danger">
              <Form.Control
                type="danger"
                placeholder="Animal danger"
                onInput={(e) => setDanger(e.target.value)}
              />
            </Form.Group>

            {/* TODO: change to choose option */}
            <Form.Group className="mb-3 text-start " controlId="sterile">
              <Form.Control
                type="sterile"
                placeholder="Animal sterile"
                onInput={(e) => setSterile(e.target.value)}
              />
            </Form.Group>

            {/* TODO: change to choose option */}
            <Form.Group className="mb-3 text-start " controlId="adopted">
              <Form.Control
                type="adopted"
                placeholder="Adopted or not"
                onInput={(e) => setAdopted(e.target.value)}
              />
            </Form.Group>

            {/* TODO: change to calendar form */}
            <Form.Group className="mb-3 text-start " controlId="adoptionDate">
              <Form.Control
                type="adoptionDate"
                placeholder="New adoption date"
                onInput={(e) => setAdoptionDate(e.target.value)}
              />
            </Form.Group>

            {/* TODO: list of users or delete this info */}
            <Form.Group className="mb-3 text-start " controlId="userAdopt">
              <Form.Control
                type="userAdopt"
                placeholder="User who adopted"
                onInput={(e) => setUserAdopt(e.target.value)}
              />
            </Form.Group>

            <Row className="mt-3">
              <Col className="text-center">
                <button type="submit" className="btn btn-primary">
                  Update instituion
                </button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default EditAnimal;

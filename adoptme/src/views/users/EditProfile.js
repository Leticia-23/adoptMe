import React, { useState, useRef, useContext } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";

import { UserContext } from "../../environment/UserProvider";

function EditProfile() {
  let { user, setUser } = useContext(UserContext);

  let [username, setUsername] = useState("");
  let [biography, setBiography] = useState("");
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  //TODO: put user profile
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
        username +
        "biography" +
        biography +
        " Password:" +
        password +
        " New password: " +
        newPassword +
        " Repeat new password: " +
        repeatedNewPassword
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
              <p className="mt-3 text-center">User avatar</p>
            </div>
            <div className="col-sm-4">
              <h1>Username</h1>
              <Form.Group className="mb-3 text-start " controlId="name">
                <Form.Control
                  type="name"
                  placeholder="New name"
                  onInput={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="biography">
                <textarea
                  class="form-control"
                  rows="4"
                  id="biography"
                  placeholder="New biography"
                  onInput={(e) => setBiography(e.target.value)}
                ></textarea>
              </Form.Group>

              <h5>Password</h5>
              <Form.Group className="mb-3 text-start " controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Actual password"
                  onInput={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="newPassword">
                <Form.Control
                  type="password"
                  placeholder="New password"
                  onInput={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 text-start "
                controlId="repeatedNewPassword"
              >
                <Form.Control
                  type="password"
                  placeholder="Repeat new password"
                  onInput={(e) => setRepeatedNewPassword(e.target.value)}
                />
              </Form.Group>
            </div>

            <Row className="mt-3">
              <Col className="text-center">
                <button type="submit" className="btn btn-outline-warning">
                  Update profile
                </button>
              </Col>
            </Row>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default EditProfile;

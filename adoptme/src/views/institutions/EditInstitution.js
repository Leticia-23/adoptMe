import React, { useState, useRef, useContext } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";

import { UserContext } from "../../environment/UserProvider";

function EditInstitution() {
  let { institution, setInstition } = useContext(UserContext);

  let [new_name, setNew_name] = useState("");
  let [information, setInformation] = useState("");
  let [webURL, setWebURL] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  //TODO: put institution image
  let [img, setImg] = useState("/assets/person-circle.svg");
  let [imgFile, setImgFile] = useState(null);

  /*   useEffectOnce(() => {
    getSelfInstitutionInfo()
      .then((result) => {
        let institution = Institution.from(result);
        setInstitution(institution);
        setContextInstitution(institution);
      })
      .catch((error) => {
        console.error(error);
      });
  }); */

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
        new_name +
        "information" +
        information +
        " web: " +
        webURL +
        " phone: " +
        phone +
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
              <p className="mt-3 text-center">Institution avatar</p>
            </div>
            <div className="col-sm-4">
              <h2>Username</h2>
              <Form.Group className="mb-3 text-start " controlId="name">
                <Form.Control
                  type="name"
                  placeholder="New name"
                  onInput={(e) => setNew_name(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="information">
                <textarea
                  class="form-control"
                  rows="4"
                  id="information"
                  placeholder="New information"
                  onInput={(e) => setInformation(e.target.value)}
                ></textarea>
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="web">
                <Form.Control
                  type="web"
                  placeholder="New web URL"
                  onInput={(e) => setWebURL(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="phone">
                <Form.Control
                  type="phone"
                  placeholder="New phone number"
                  onInput={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-sm-4">
              <h2>Password</h2>
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

export default EditInstitution;

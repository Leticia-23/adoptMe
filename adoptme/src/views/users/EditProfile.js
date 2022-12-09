import React, { useState, useRef, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Row, Form, Col } from "react-bootstrap";

import { UserContext } from "../../environment/UserProvider";

import { toImageUrl, updateUser_api, getSelfInformation } from "../../api/Api";
import User from "../../models/User";

// TODO: upload avatar photo
function EditProfile() {
  let { user, setUser } = useContext(UserContext);

  let [username, setUsername] = useState("");
  let [biography, setBiography] = useState("");
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  let provImg = user.avatar
    ? toImageUrl(user.avatar)
    : "/assets/person-circle.svg";
  let [img, setImg] = useState(provImg);
  let [imgFile, setImgFile] = useState(null);

  useEffectOnce(() => {
    getSelfInformation({ id: user.id })
      .then((result) => {
        let user = User.from(result);
        setUser(user);
        setUsername(user.username);
        setBiography(user.biography);
        setImg(
          user.avatar ? toImageUrl(user.avatar) : "/assets/person-circle.svg"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  });

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

    updateUser_api({
      new_name: username,
      biography: biography,
      actual_password: password,
      password: newPassword,
      repeatPassword: repeatedNewPassword,
      avatar: img,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
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
              <h2>{user.name}</h2>
              <Form.Group className="mb-3 text-start " controlId="name">
                <Form.Control
                  type="name"
                  placeholder="New name"
                  onInput={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-start " controlId="biography">
                <textarea
                  className="form-control"
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
                <button type="submit" className="btn btn-primary">
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

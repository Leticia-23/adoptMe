import React, { useState, useRef, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Row, Form, Col } from "react-bootstrap";

import { UserContext } from "../../environment/UserProvider";

import { useNavigate } from "react-router-dom";

import {
  updateUser_api,
  getSelfInformation,
  uploadAvatar,
} from "../../api/Api";
import User from "../../models/User";

function EditProfile() {
  const navigate = useNavigate();

  let { user, setUser } = useContext(UserContext);

  let [username, setUsername] = useState("");
  let [biography, setBiography] = useState("");
  let [password, setPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  let [img, setImg] = useState(
    user.avatar ? user.avatar : "/assets/person-circle.svg"
  );
  let [imgFile, setImgFile] = useState(null);

  useEffectOnce(() => {
    getSelfInformation({ id: user.id })
      .then((result) => {
        let user = User.from(result);
        setUser(user);
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

    let display_url;

    if (imgFile) {
      uploadAvatar({
        imgFile: imgFile,
      })
        .then((response) => {
          display_url = response.display_url;

          updateUser_api({
            new_name: username,
            biography: biography,
            actual_password: password,
            password: newPassword,
            repeatPassword: repeatedNewPassword,
            avatar: display_url,
          })
            .then((response) => {
              console.log(response);
              navigate("/profile");
            })
            .catch((error) => {
              console.log(error);
              return;
            });
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      updateUser_api({
        new_name: username,
        biography: biography,
        actual_password: password,
        password: newPassword,
        repeatPassword: repeatedNewPassword,
        avatar: "",
      })
        .then((response) => {
          console.log(response);
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
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
                className="img img-responsive clickable w-100 border border-primary "
                onClick={handleUpload}
                src={img}
                alt=""
              />
              <p className="mt-3 text-center">User avatar</p>
            </div>
            <div className="col-sm-4">
              <h2 style={{ color: "#ff7043" }}>{user.name}</h2>
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

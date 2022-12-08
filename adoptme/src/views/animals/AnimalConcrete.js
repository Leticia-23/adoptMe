import React, { useState, useContext } from "react";
import { useEffectOnce } from "usehooks-ts";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useParams } from "react-router";

import moment from "moment";

import { InstitutionContext, UserContext } from "../../environment";
import { Animal, Institution } from "../../models";
import {
  getInstitutionInfo,
  getPrivateAnimal_api,
  getPublicAnimal_api,
  toImageUrl,
} from "../../api/Api";

function AnimalConcrete() {
  let [isInstOwner, setisInstOwner] = useState(false);
  let [isRegistered, setisRegistered] = useState(false);
  let [isAdopted, setisAdopted] = useState(false);
  let [animal, setAnimal] = useState(null);
  let [institution, setInstitution] = useState(null);

  let { institution: currentInstitution } = useContext(InstitutionContext);
  let { user: currentUser } = useContext(UserContext);

  let { animalId } = useParams();

  useEffectOnce(() => {
    // Check if there is a registered user or institution viewing this page
    if (currentUser || currentInstitution) {
      setisRegistered(true);
    }

    console.log("useEffectOnce");

    if (isRegistered) {
      getPrivateAnimal_api(animalId)
        .then((result) => {
          let animal = Animal.from(result);
          setAnimal(animal);
          if (
            currentInstitution &&
            currentInstitution.id === animal.institution
          ) {
            setisInstOwner(true);
          }
          if (animal.adopted) {
            setisAdopted(true);
          }

          getInstitutionInfo(animal.institution)
            .then((result) => {
              let institution = Institution.from(result);
              setInstitution(institution);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getPublicAnimal_api(animalId)
        .then((result) => {
          let animal = Animal.from(result);
          setAnimal(animal);
          if (
            currentInstitution &&
            currentInstitution.id === animal.institution
          ) {
            setisInstOwner(true);
          }
          if (animal.adopted) {
            setisAdopted(true);
          }

          getInstitutionInfo(animal.institution)
            .then((result) => {
              let institution = Institution.from(result);
              setInstitution(institution);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  if (!animal || !institution) {
    return <></>;
  }

  return (
    <div className="animal">
      <Container className="mb-5 pb-5">
        <Row>
          <div className="col-sm-8">
            <h1>{animal.animal_name}</h1>

            <h5 className="mt-4">Description:</h5>
            <p>{animal.description}</p>
          </div>
          <div className="col-sm-4 text-center">
            <img
              className="mb-3 img img-responsive profile-pic"
              src={
                animal.photo
                  ? toImageUrl(animal.photo)
                  : "/assets/person-circle.svg"
              }
              alt={animal.animal_name}
            />
          </div>
        </Row>
        <Row>
          <div className="col-sm-4">
            <h5 className="mt-4">Specie:</h5>
            <p>{animal.specie}</p>

            <h5 className="mt-4">Breed:</h5>
            <p>{animal.breed}</p>

            {isRegistered && <h5 className="mt-4">Born date:</h5>}
            {isRegistered && (
              <p>{moment(animal.createdAt).format("DD-MM-YYYY")}</p>
            )}

            {isRegistered && <h5 className="mt-4">Color:</h5>}
            {isRegistered && <p>{animal.color}</p>}

            {isRegistered && <h5 className="mt-4">Sterile:</h5>}
            {isRegistered && <p>{animal.sterile ? "Yes" : "No"}</p>}
          </div>
          <div className="col-sm-4">
            <h5 className="mt-4">Sex:</h5>
            <p>{animal.sex}</p>

            <h5 className="mt-4">Institution:</h5>
            <Link to={"/institution/" + institution.id}>
              <p>{institution.name}</p>
            </Link>

            {isRegistered && <h5 className="mt-4">Size:</h5>}
            {isRegistered && <p>{animal.size}</p>}

            {isRegistered && <h5 className="mt-4">Danger:</h5>}
            {isRegistered && <p>{animal.danger ? "Yes" : "No"}</p>}
          </div>
          <div className="col-sm-4">
            <h5 className="mt-4">Adopted:</h5>
            <p>{animal.adopted ? "Yes" : "No"}</p>

            {isRegistered && isAdopted && (
              <h5 className="mt-4">Adoption date:</h5>
            )}
            {isRegistered && isAdopted && animal.adoptionDate && (
              <p>{moment(animal.adoptionDate).format("DD-MM-YYYY")}</p>
            )}
            {isRegistered && isAdopted && (
              <h5 className="mt-4">Person who adopted:</h5>
            )}
            {isRegistered && isAdopted && (
              <p>
                Name user adopted link to the profile or this person is not
                registered in this community
              </p>
            )}
          </div>
        </Row>
        <Row>
          <Col className="text-center">
            {isRegistered && isInstOwner && (
              <Link to="/editAnimal" className="btn btn-primary mt-2">
                Edit animal information
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AnimalConcrete;

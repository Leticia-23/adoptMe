import React, { useState } from "react";
import { Container } from "react-bootstrap";
import InstitutionCard from "./components/InstitutionCard";

import { useEffectOnce } from "usehooks-ts";

function ListInstitutions() {
  const institution1 = [
    "Institution name",
    "institution information institution information institution information institution information institution information institution informationvvv v institution informationinstitution informationinstitution information institution information institution information institution informationinstitution information institution information institution informationinstitution informationinstitution informationvinstitution informationinstitution information institution informationinstitution informationinstitution informationinstitution information",
    "alt for the picture",
    "23-05-2022",
  ];
  const institution2 = [
    "Institution ",
    "institution information institution information institution information institution information institution information institution informationvvv v institution informationinstitution informationinstitution information institution information institution information institution informationinstitution information institution information institution informationinstitution informationinstitution informationvinstitution informationinstitution information institution informationinstitution informationinstitution informationinstitution information",
    "alt for the picture",
    "22-05-2022",
  ];
  const institution3 = [
    "Institution name",
    "institution information institution information institution information institution information institution information institution informationvvv v institution informationinstitution informationinstitution information institution information institution information institution informationinstitution information institution information institution informationinstitution informationinstitution informationvinstitution informationinstitution information institution informationinstitution informationinstitution informationinstitution information",
    "alt for the picture",
    "24-05-2022",
  ];

  const institutions_ = [institution1, institution2, institution3];

  const [institutions, setInstitutions] = useState([]);

  useEffectOnce(() => {
    /* getAnimals({
      starts: (pag - 1) * animalsPerPage,
      rows: animalsPerPage,
      specie: filterSpecie || null,
      breed: filterBreed ? filterBreed.toUpperCase() : null,
    })
      .then((result) => {
        console.log("res", result);
        setTotalAnimals(result.data.total);
        let animal_list = result.data.pets.map((animal) =>
          ListAnimal.from(animal)
        );
        setAnimals(animal_list);
      })
      .catch((error) => {
        console.error(error);
      }); */
  });

  return (
    <div className="listInstitutions">
      <Container className="mb-5 pb-5">
        <h1 className="text-center">Institutions</h1>
        <Container>
          <div className="mb-2">
            {institutions_.map((inst, i) => (
              <InstitutionCard key={i} institution={inst} />
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ListInstitutions;

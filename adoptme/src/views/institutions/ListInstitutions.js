import React from "react";
import { Container } from "react-bootstrap";
import InstitutionCard from "./components/InstitutionCard";

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

  const institutions = [institution1, institution2, institution3];

  return (
    <div className="listInstitutions">
      <Container className="mb-5 pb-5">
        <h1 className="text-center">Institutions</h1>
        <Container>
          <div className="mb-2">
            {institutions.map((inst, i) => (
              <InstitutionCard key={i} institution={inst} />
            ))}
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ListInstitutions;

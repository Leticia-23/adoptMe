import React, { useState } from "react";
import { Container } from "react-bootstrap";
import InstitutionCard from "./components/InstitutionCard";

import { useEffectOnce } from "usehooks-ts";
import { getInstitutions_api } from "../../api/Api";

import { ListInstitution } from "../../models";

function ListInstitutions() {
  const [institutions, setInstitutions] = useState([]);

  useEffectOnce(() => {
    getInstitutions_api()
      .then((result) => {
        let institution_list = result.institutions.map((institution) =>
          ListInstitution.from(institution)
        );
        setInstitutions(institution_list);
      })
      .catch((error) => {
        console.error(error);
      });
  });

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

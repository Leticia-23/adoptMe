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
        <h1 className="text-center" style={{ color: "#ff7043" }}>
          Institutions
        </h1>
        <Container>
          {institutions.length > 0 ? (
            <div className="mb-2">
              {institutions.map((inst, i) => (
                <InstitutionCard key={i} institution={inst} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-5">
              <h4 style={{ color: "#ff7043" }}>
                No institutions registered yet
              </h4>
            </div>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default ListInstitutions;

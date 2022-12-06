import React from "react";

import { useLocalStorageObject } from "../extensions/localStorageObject";

import { Institution } from "../models";

// InstitutionContext stores the current logged institution or None if not logged.
export var InstitutionContext = React.createContext({
  institution: null,
  setInstitution: (_) => {},
});

function InstitutionProvider({ children }) {
  const [institution, setInstitution] = useLocalStorageObject(
    "institution",
    null,
    Institution
  );

  return (
    <InstitutionContext.Provider value={{ institution, setInstitution }}>
      {children}
    </InstitutionContext.Provider>
  );
}

export default InstitutionProvider;

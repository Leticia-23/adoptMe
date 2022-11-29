import React from "react";

import useLocalStorage from "../extensions/localStorage";

// TokenContext stores the current logged user or None if not logged.
export var TokenContext = React.createContext({
  token: null,
  setToken: (_) => {},
});

function TokenProvider({ children }) {
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenProvider;

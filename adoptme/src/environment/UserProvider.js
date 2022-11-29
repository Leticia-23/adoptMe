import React from "react";
import useLocalStorageObject from "../extensions/localStorageObject";

import { User } from "../models";

// UserContext stores the current logged user or None if not logged.
export var UserContext = React.createContext({
  user: null,
  setUser: (_) => {},
});

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorageObject("user", null, User);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

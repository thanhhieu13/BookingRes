// import { createContext, useState } from "react";

// const UserType = createContext();

// const UserContext = ({ children }) => {
//     const [userId, setUserId] = useState("");
//     return (
//         <UserType.Provider value={{ userId, setUserId }}>
//             {children}
//         </UserType.Provider>
//     )
// }

// export { UserType, UserContext };

// UserContext.js

import React, { createContext, useState } from 'react';

export const UserType = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserType.Provider value={{ userId, setUserId, user, updateUser }}>
      {children}
    </UserType.Provider>
  );
};


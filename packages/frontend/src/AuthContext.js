import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./firebase";
import { PropTypes } from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState("");
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setIsLoggedIn(user !== null);
      if (user) {
        try {
          const token = await user.getIdToken();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/getUserId`,
            { headers }
          );
          setUid(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    uid,
    setUid,
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

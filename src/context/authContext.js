import { createContext, useContext, useState } from "react";
import { loginRequest, panelRequest } from "../api/auth.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Espera 0.5 segundos para poder comprobar que muestra loading
      // await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await loginRequest(email, password);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const panel = async () => {
    try {
      const res = await panelRequest();
      setUserData(res.data);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        login,
        panel,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

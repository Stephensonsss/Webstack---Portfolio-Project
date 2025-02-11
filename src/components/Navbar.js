import React from "react";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../services/firebase";

const Navbar = ({ user }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await logoutUser();
    history.push("/login");
  };

  return (
    <nav>
      <h1>Weather App</h1>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => history.push("/dashboard")}>Dashboard</button>
        </>
      ) : (
        <>
          <button onClick={() => history.push("/login")}>Login</button>
          <button onClick={() => history.push("/register")}>Register</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;

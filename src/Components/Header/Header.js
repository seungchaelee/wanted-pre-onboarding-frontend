import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("access_token");
    navigate("../", { replace: true });
  };

  return (
    <>
      <div className="header">
        <h1>
          <Link to="/">Main Page</Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </h1>
        <div className="menu">
          <Link to="/signup" className="link">
            signup
          </Link>
          <Link to="/signin" className="link">
            signin
          </Link>
          <Link to="/todo" className="link">
            todo
          </Link>
        </div>
      </div>
    </>
  );
}

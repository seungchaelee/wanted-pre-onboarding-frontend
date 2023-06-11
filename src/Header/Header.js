import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header">
        <h1>
          <Link to="/">Main Page</Link>
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

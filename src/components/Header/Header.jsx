import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fw-bold p-4 text-center">
      <Link className="text-decoration-none" to="/">
        Home
      </Link>
      <Link className="text-decoration-none mx-5" to="/login">
        Login
      </Link>
      <Link className="text-decoration-none" to="/register">Register</Link>
    </div>
  );
};

export default Header;

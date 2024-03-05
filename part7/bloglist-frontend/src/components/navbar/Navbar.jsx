import React from "react";
import { Link } from "react-router-dom";
import Info from "./Info";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="p-1 flex flex-row justify-between border-b-2 border-black">
      <div>
        <Link className="mx-2 text-2xl" to={"/"}>
          Blogs
        </Link>
        <Link className="mx-2 text-2xl" to={"/users"}>
          Users
        </Link>
      </div>
      <div>
        <Info user={user} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import Title from "../titles/title";
import { Link } from "react-router-dom";

const UserContainer = ({ users }) => {
  return (
    <div>
      <Title type={"h2"} text={"Users"} />
      <div>
        <div className="grid grid-cols-2">
          <div className="text-2xl font-medium underline">User's name:</div>
          <div className="text-2xl font-medium underline">Blogs created:</div>
        </div>
        <div>
          {users.map((user) => (
            <div className="grid grid-cols-2" key={user.id}>
              <Link
                to={`${user.id}`}
                className="text-2xl font-medium hover:border-2 border-black"
              >
                {user.name}
              </Link>
              <div className="text-2xl font-medium pl-10">
                {user.blogs.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserContainer;

import React from "react";
import Title from "../titles/title";

const UserContainer = ({ users }) => {
  return (
    <div>
      <Title type={"h2"} text={"Users"} />
      <table className="table-fixed">
        <thead>
          <tr>
            <th>User's name:</th>
            <th>Blogs created:</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Title type={"h3"} text={user.name} />
              <td className="text-2xl font-medium pl-10">
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserContainer;

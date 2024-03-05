import React from "react";
import { useParams } from "react-router-dom";
import Title from "../titles/title";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }
  return (
    <>
      <Title type={"h2"} text={user.name} />
      <Title type={"h3"} text={"added blogs:"} />
      <ul className="list-disc">
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;

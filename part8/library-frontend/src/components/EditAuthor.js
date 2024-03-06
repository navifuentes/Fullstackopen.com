import React, { useState } from "react";
import { EDIT_YEAR, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const [editYear] = useMutation(EDIT_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (e) => {
    e.preventDefault();

    console.log("updated born year");
    editYear({ variables: { name, setBornTo: year } });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            born
            <input
              type="number"
              value={year}
              onChange={({ target }) => setYear(Number(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  );
};

export default EditAuthor;

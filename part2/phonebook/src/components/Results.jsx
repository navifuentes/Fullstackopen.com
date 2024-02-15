import React from "react";

const Results = ({ search, persons, deletePerson }) => {
  if (search.length === 0) {
    return persons.map((x) => (
      <div key={x.name}>
        {x.name} {x.number}{" "}
        <button onClick={() => deletePerson(x)}>delete</button>
      </div>
    ));
  }

  return search.map((x) => (
    <div key={x.name}>
      {x.name} {x.number}{" "}
      <button onClick={() => deletePerson(x)}>delete</button>
    </div>
  ));
};

export default Results;

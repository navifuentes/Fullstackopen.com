import React from "react";

const Results = ({ search, persons }) => {
  if (search.length === 0) {
    return persons.map((x) => (
      <div key={x.name}>
        {x.name} {x.number}
      </div>
    ));
  }

  return search.map((x) => (
    <div key={x.name}>
      {x.name} {x.number}
    </div>
  ));
};

export default Results;

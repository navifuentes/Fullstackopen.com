import React from "react";

const PersonForm = ({ addPerson, handleChangeName, handleChangeNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleChangeName} />
      </div>
      <div>
        number: <input placeholder="000-000000" onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

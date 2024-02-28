import { useState } from "react";

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <br />
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <br />
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </>
  );
};

export default Togglable;

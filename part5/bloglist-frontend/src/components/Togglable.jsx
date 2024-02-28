import { React, useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef(({ children }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

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
});

Togglable.displayName = "Togglable";
export default Togglable;

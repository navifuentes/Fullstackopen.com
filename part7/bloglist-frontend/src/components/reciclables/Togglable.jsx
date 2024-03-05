import { React, useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(({ children, text }, refs) => {
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
    <div>
      <div style={hideWhenVisible}>
        <br />

        <button
          className="px-8 rounded-full bg-blue-600 text-white"
          onClick={toggleVisibility}
        >
          {text}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <br />

        <div className="flex flex-col items-center">
          <button
            className="w-16 rounded-full bg-blue-600 text-white"
            onClick={toggleVisibility}
          >
            hide
          </button>
        </div>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
export default Togglable;

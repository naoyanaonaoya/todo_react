import React, { useEffect, useRef } from "react";
import "../css/App.css";

const InputTodo = (props) => {
  const { todoText, onChange, onClick } = props;
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  });
  // console.log(onChange.text);
  // console.log(onChange.deadline);
  return (
    <React.Fragment>
      <div className="input-area wrapper">
        <input
          ref={ref}
          type="text"
          placeholder="input TODO"
          value={todoText.text}
          onChange={onChange.text}
        />
        <input
          type="date"
          placeholder="deadline"
          value={todoText.deadline}
          onChange={onChange.deadline}
        />
        <button onClick={onClick}>add</button>
      </div>
    </React.Fragment>
  );
};

export default InputTodo;

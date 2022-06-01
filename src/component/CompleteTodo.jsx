import React from "react";
import "../css/App.css";

const CompleteTodo = (props) => {
  const { todos, onClickRedo } = props;
  return (
    <React.Fragment>
      <div className="complete-area wrapper">
        <p className="title">complete todos</p>
        <ul>
          {todos.map((todo, index) => {
            return (
              <React.Fragment key={todo.text}>
                <li>
                  <div className="list-row">
                    <p>{todo.text}</p>
                    <p>{todo.today}</p>
                    <button onClick={() => onClickRedo(index)}>redo</button>
                  </div>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default CompleteTodo;

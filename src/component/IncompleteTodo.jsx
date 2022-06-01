import React from "react";

const IncompleteTodo = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <React.Fragment>
      <div className="incomplete-area wrapper">
        <p className="title">incomplete todos</p>
        <ul>
          {todos.map((todo, index) => {
            return (
              <React.Fragment key={todo.text}>
                <li>
                  <div className="list-row">
                    <p>{todo.text}</p>
                    <p>{todo.deadline}</p>
                    <button onClick={() => onClickComplete(index)}>
                      complete
                    </button>
                    <button onClick={() => onClickDelete(index)}>remove</button>
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

export default IncompleteTodo;

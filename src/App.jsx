import React, { useState } from "react";
import "./css/App.css";
import Header from "./component/Header";
import WorldClock from "./component/WorldClock";
import InputTodo from "./component/InputTodo";
import IncompleteTodo from "./component/IncompleteTodo";
import CompleteTodo from "./component/CompleteTodo";

function App() {
  // https://qiita.com/hirochan/items/fe0faed237e47b47f3ca
  const [todoText, setTodoText] = useState({
    text: "",
    deadline: "",
    today: "",
  });
  const [incompleteTodos, setIncompleteTodos] = useState([
    // {
    //   text: "テスト勉強",
    //   deadline: "2022-05-22",
    //   today: "2022-05-30",
    // },
    // {
    //   text: "読書",
    //   deadline: "2022-05-21",
    //   today: "2022-05-30",
    // },
  ]);
  const [completeTodos, setCompleteTodos] = useState([]);
  // const [today, setToday] = useState("");
  const onChangeTodoText = (event) => {
    // eventが起きた場所のtargetのvalueを取り出す
    // console.log(event.target.value);
    setTodoText({ ...todoText, text: event.target.value });
    // setTodoText({ text: event.target.value });
  };
  const onChangeTodoDeadline = (event) => {
    setTodoText({
      ...todoText,
      deadline: event.target.value,
    });
    // console.log(todoText);
  };

  const onClickAdd = () => {
    if (todoText.text === "" || todoText.deadline === "") {
      return;
    }

    let incompleteTodos_len = Object.keys(incompleteTodos).length;
    // console.log(object_len);
    let flag_number = 0;
    let regexp = RegExp(`${todoText.text}`);
    // console.log(regexp);
    for (let index = 0; index < incompleteTodos_len; index++) {
      // console.log(incompleteTodos[index].text);
      if (regexp.test(incompleteTodos[index].text)) {
        // console.log("ok");
        flag_number = flag_number + 1;
      }
    }
    let completeTodos_len = Object.keys(completeTodos).length;
    for (let index = 0; index < completeTodos_len; index++) {
      // console.log(incompleteTodos[index].text);
      if (regexp.test(completeTodos[index].text)) {
        // console.log("ok");
        flag_number = flag_number + 1;
      }
    }
    // console.log(flag_number);
    if (flag_number !== 0) {
      todoText.text = `${todoText.text}(${flag_number})`;
    }
    const newIncompleteTodos = [...incompleteTodos, todoText];
    const newIncompleteTodosSorted = newIncompleteTodos.sort(function (a, b) {
      return a.deadline < b.deadline ? -1 : 1;
    });
    setIncompleteTodos(newIncompleteTodosSorted);
    setTodoText({ ...todoText, text: "", deadline: "", today: "" });
  };

  // 今日の日付を返す関数
  const returnToday = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let date = new Date().getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (date < 10) {
      date = `0${date}`;
    }
    const todayString = `${year}-${month}-${date}`;
    return todayString;
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    incompleteTodos[index].today = returnToday();
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    console.log(newCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickDelete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
  };

  const onClickRedo = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    const newIncompleteTodosSorted = newIncompleteTodos.sort(function (a, b) {
      return a.deadline < b.deadline ? -1 : 1;
    });
    setIncompleteTodos(newIncompleteTodosSorted);
  };

  // const setIncompleteTodos

  return (
    <React.Fragment>
      <Header />
      <WorldClock />
      <InputTodo
        todoText={todoText}
        // 複数関数がある場合は関数として渡す
        onChange={{ text: onChangeTodoText, deadline: onChangeTodoDeadline }}
        onClick={onClickAdd}
      />
      <IncompleteTodo
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodo todos={completeTodos} onClickRedo={onClickRedo} />
    </React.Fragment>
  );
}

export default App;

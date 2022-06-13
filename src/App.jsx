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
    // console.log(incompleteTodos_len);

    // 重複の検索
    let flag_number = 0;
    // todo => ok
    // 正規表現で検索を一度実装したが、これだとうまく行かない
    // ex) 最初に"testtest"というタスク名で入力して、次に"test"というタスク名をいれると、重複していないのに重複したと認識される
    // 完全一致じゃなくて、一部でも一致したら重複だと判定するから
    // 完全一致で検索する必要がある
    // しかし完全一致にすると'test(1)'に'test'が引っかからなくなる`
    // 完全一致と正規表現部分一致(text + (.))(数字一桁対応)の両方を使って、どっちかがtrueになればカウントアップ
    // todo
    // incomplete listでremoveをするとカウントアップが不足し、同じ名前のタスク名が発生し、mapのkeyが一意じゃなくなる
    // どこかでグローバルにこれまでのflag_numberの最大値を保存しておけば、その最大値より小さければ最大値+1を用いれば良い？
    let regexp = RegExp(`${todoText.text}\(.\)`);
    // console.log(regexp);
    for (let index = 0; index < incompleteTodos_len; index++) {
      // console.log(incompleteTodos[index].text);
      if (
        incompleteTodos[index].text === todoText.text ||
        regexp.test(incompleteTodos[index].text)
      ) {
        // console.log("duplicate");
        flag_number = flag_number + 1;
      }
    }
    let completeTodos_len = Object.keys(completeTodos).length;
    for (let index = 0; index < completeTodos_len; index++) {
      // console.log(completeTodos[index].text);
      if (
        completeTodos[index].text === todoText.text ||
        regexp.test(completeTodos[index].text)
      ) {
        // console.log("duplicate");
        flag_number = flag_number + 1;
      }
    }
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

import React, { useState } from "react";

class Clock extends React.Component {
  // this.stateの初期状態を設定するクラスコンストラクタ
  constructor(props) {
    // クラスのコンポーネントは常にpropsを引数として親クラスの
    // コンストラクタを呼び出す必要がある
    super(props);
    this.state = { date: new Date() };
  }

  // ライフサイクルメソッド
  // componentDidMount(), componentWillUnmount()など

  // タイマーの設定をしたいのは、最初にClockがDOMとして描画されるとき
  // 出力がDOMにレンダーされたあとに実行される
  // 1000 msecごとにthis.tick()が呼び出される
  componentDidMount() {
    // thick()が関数でstateを更新している関数
    this.timerID = setInterval(() => this.thick(), 1000);
  }

  // タイマーをクリアしたいのは、Clockが生成したDOMが削除されるとき
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 実際に更新している場所
  thick() {
    this.setState({
      date: new Date(),
    });
  }

  // renderはclassに必ず必要
  // renderのあとにreturn
  render() {
    return (
      <div>
        {/* <h1>thick thick</h1> */}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;

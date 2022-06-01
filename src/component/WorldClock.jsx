import React from "react";

import Selectbox from "./Selectbox";
import Clock from "./Clock";

class WorldClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDifference: "",
      nowTime: "",
    };
  }

  // コンポーネントがマウントされた後に実行
  componentDidMount() {
    setInterval(() => {
      this.setState({
        nowTime: this.getTime(this.state.timeDifference),
      });
    }, 1000);
  }

  // 日付と時間を取得する
  getTime(timeDifference = 0) {
    let japanTime = new Date().getTime();
    let nowTime = new Date(japanTime + timeDifference * 60 * 60 * 1000);
    let year = nowTime.getFullYear();
    let month = nowTime.getMonth() + 1;
    let date = nowTime.getDate();
    let hours = nowTime.getHours();
    let minutes = nowTime.getMinutes();
    let seconds = nowTime.getSeconds();

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    const time = `${year}年 ${month}月 ${date}日 ${hours}:${minutes}:${seconds}`;
    const today = `today is ${year}-${month}-${date}`;

    return today;
  }

  doChange = (event) => {
    event.preventDefault();
    this.setState({
      timeDifference: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <Selectbox doChange={this.doChange} /> */}
        <Clock time={this.state.nowTime} />
      </React.Fragment>
    );
  }
}

export default WorldClock;

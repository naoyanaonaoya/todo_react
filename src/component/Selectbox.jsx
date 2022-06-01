import React from "react";
import "../css/Selectbox.css";

class Selectbox extends React.Component {
  render() {
    const cities = [
      { timelag: "0", name: "東京" },
      { timelag: "-1", name: "シンガポール" },
      { timelag: "-7", name: "ヘルシンキ" }, //　ただのフィンランド好きなだけ
      { timelag: "-8", name: "パリ" },
      { timelag: "-13", name: "ニューヨーク" },
    ];
    return (
      <React.Fragment>
        <select name="city" onChange={this.props.doChange}>
          {cities.map((city) => {
            return (
              <option key={city.timelag} value={city.timelag}>
                {city.name}
              </option>
            );
          })}
        </select>
      </React.Fragment>
    );
  }
}

export default Selectbox;

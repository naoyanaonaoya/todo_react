import React, { Component } from "react";
import "../css/Clock.css";

class Clock extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <h2>{this.props.time}</h2>
        </div>
      </React.Fragment>
    );
  }
}

export default Clock;

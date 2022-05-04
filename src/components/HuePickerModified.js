"use strict";

import React from "react";
import reactCSS from "reactcss";
import { HuePicker } from "react-color";

class HuePickerModified extends React.Component {
  state = {
    color: {
      r: this.props.inputColor[0],
      g: this.props.inputColor[1],
      b: this.props.inputColor[2],
      a: "1",
    },
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          borderRadius: "100%",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
      },
    });

    return (
      <div className="huePicker">
        <div className="huePicker--selector">
          <HuePicker
            direction="vertical"
            width="16px"
            height="30vh"
            color={this.state.color}
            onChange={this.handleChange}
          />
        </div>
        <div className="huePicker--swatches">
          <div
            className="huePicker--swatch"
            id={this.props.id}
            style={styles.color}
          ></div>
        </div>
      </div>
    );
  }
}

export default HuePickerModified;

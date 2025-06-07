import React from "react";
import ShapeComponent from "./Shape";

class CircleComponent extends ShapeComponent {
  render() {
    return (
      <div
        style={{
          width: this.state.size,
          height: this.state.size,
          borderRadius: "50%",
          backgroundColor: this.state.color
        }}
      />
    );
  }
}

export default CircleComponent;
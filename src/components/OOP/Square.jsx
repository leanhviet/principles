import React from "react";
import ShapeComponent from "./Shape";

class SquareComponent extends ShapeComponent {
  render() {
    return (
      <div
        style={{
          width: this.state.size,
          height: this.state.size,
          backgroundColor: this.state.color
        }}
      />
    );
  }
}

export default SquareComponent;
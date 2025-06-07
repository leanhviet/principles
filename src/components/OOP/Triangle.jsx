import React from "react";
import ShapeComponent from "./Shape";

class TriangleComponent extends ShapeComponent {
  render() {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${this.state.size / 2}px solid transparent`,
          borderRight: `${this.state.size / 2}px solid transparent`,
          borderBottom: `${this.state.size}px solid ${this.state.color}`
        }}
      />
    );
  }
}

export default TriangleComponent;
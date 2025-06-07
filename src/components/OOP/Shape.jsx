import React from "react";

// Shape là lớp cha chứa các thuộc tính và phương thức chung cho tất cả các hình dạng.
class ShapeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 100, // Kích thước mặc định
      color: "black" // Màu mặc định
    };
  }

  changeSize(newSize) {
    this.setState({ size: newSize });
  }

  changeColor(newColor) {
    this.setState({ color: newColor });
  }

  render() {
    // Phương thức này sẽ được ghi đè bởi các lớp con
    return null;
  }
}

export default ShapeComponent;
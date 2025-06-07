/*
  Lập trình Hướng Đối tượng (OOP) là một mô hình lập trình dựa trên khái niệm "đối tượng", 
    giúp tổ chức mã nguồn một cách có cấu trúc và dễ quản lý. Các khái niệm chính của OOP bao gồm:

  Lớp (Class) và Đối tượng (Object): Lớp là bản thiết kế, còn đối tượng là thể hiện cụ thể của lớp.
  Kế thừa (Inheritance): Cho phép một lớp con thừa hưởng các thuộc tính và phương thức từ lớp cha.
  Đa hình (Polymorphism): Cho phép các đối tượng của các lớp khác nhau có thể được xử lý thông qua cùng một giao diện, dù chúng có hành vi khác nhau.
  Đóng gói (Encapsulation): Ẩn giấu chi tiết bên trong của đối tượng và chỉ lộ ra những gì cần thiết.
  Trừu tượng (Abstraction): Giảm sự phức tạp bằng cách ẩn chi tiết và chỉ hiển thị các tính năng cần thiết.

  *Với ReactJS*:
  Lớp và Đối tượng: Mỗi component trong React (đặc biệt là class component) giống như một lớp, và mỗi lần bạn sử dụng <Component /> là bạn đang tạo một đối tượng từ lớp đó.
  Kế thừa: Bạn có thể tạo các component con kế thừa từ component cha bằng cách sử dụng extends.
  Đa hình: Các component khác nhau có thể có cùng tên phương thức (như render), nhưng thực hiện các hành vi khác nhau.
  Đóng gói: Mỗi component quản lý trạng thái (state) của riêng mình và chỉ chia sẻ dữ liệu cần thiết qua props.
  Trừu tượng: React cho phép bạn xây dựng giao diện phức tạp bằng cách kết hợp các component nhỏ hơn, ẩn đi sự phức tạp bên trong.
 */

  // Ví dụ về OOP trong React
  /*
    Để minh họa các khái niệm OOP, chúng ta sẽ tạo một ứng dụng React đơn giản với các component hình dạng: 
      Circle (hình tròn), Square (hình vuông), và Triangle (hình tam giác). Mỗi hình dạng sẽ có khả năng thay đổi kích thước và màu sắc.
  */

import React from "react";
import Circle from "../components/OOP/Circle";
import Square from "../components/OOP/Square";
import Triangle from "../components/OOP/Triangle";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.circleRef = React.createRef();
    this.squareRef = React.createRef();
    this.triangleRef = React.createRef();
  }

  changeAllSizes(newSize) {
    this.circleRef.current.changeSize(newSize);
    this.squareRef.current.changeSize(newSize);
    this.triangleRef.current.changeSize(newSize);
  }

  render() {
    return (
      <div style={{ display: "flex", gap: "20px" }}>
        <Circle ref={this.circleRef} />
        <Square ref={this.squareRef} />
        <Triangle ref={this.triangleRef} />
        <div>
          <button onClick={() => this.changeAllSizes(150)}>
            Tăng kích thước
          </button>
          <button onClick={() => this.changeAllSizes(50)}>
            Giảm kích thước
          </button>
        </div>
      </div>
    );
  }
}

export default App;

/**
 * Lưu ý: Trong thực tế, React khuyến nghị quản lý trạng thái ở component cha và truyền props xuống các component con thay vì gọi trực tiếp phương thức qua refs như trong ví dụ này. 
 * Tuy nhiên, để minh họa khái niệm đối tượng trong OOP (mỗi đối tượng có trạng thái và hành vi riêng), chúng ta để mỗi component tự quản lý trạng thái của mình.
 */

/**
 * Lớp và Đối tượng:
 *  "Shape" là một lớp cha, đóng vai trò như bản thiết kế chung.
 *  "Circle, Square, và Triangle" là các lớp con. Mỗi lần bạn sử dụng <Circle />, bạn tạo ra một đối tượng cụ thể với trạng thái riêng (size, color).
 * 
 * Kế thừa (Inheritance):   
 *  Circle, Square, và Triangle kế thừa từ Shape, nên chúng có thể sử dụng các phương thức changeSize và changeColor mà không cần định nghĩa lại.
 * 
 * Đa hình (Polymorphism):
 *  Mỗi lớp con ghi đè phương thức render để vẽ hình dạng khác nhau (tròn, vuông, tam giác), 
 *  dù chúng cùng được gọi là render. Đây là ví dụ điển hình của đa hình: cùng một tên phương thức, nhưng hành vi khác nhau.
 * 
 * Đóng gói:
 *  Mỗi component tự quản lý trạng thái (state) size và color của mình. 
 *  Component App không cần biết chi tiết bên trong, chỉ cần gọi changeSize để thay đổi trạng thái.
 * 
 * Trừu tượng (Abstraction):
 *  Shape cung cấp một giao diện chung cho tất cả các hình dạng. 
 *  Component App có thể tương tác với các hình dạng mà không cần biết cách mỗi hình được vẽ, điều này làm giảm sự phức tạp.
 */

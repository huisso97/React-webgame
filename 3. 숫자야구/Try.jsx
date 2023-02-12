import React, { PureComponent, memo, useState } from "react";

// class Try extends PureComponent {
//   render() {
//     return (
//       <li>
//         <b>{this.props.value.fruit}</b> - {this.props.index}
//       </li>
//     );
//   }
// }

const Try = memo(({ tryInfo }) => {
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult("1");
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});

export default Try;

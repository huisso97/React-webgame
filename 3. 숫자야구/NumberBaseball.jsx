import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {}
class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(), // [1, 3, 5, 7]
    tries: 0,
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런!",
        // 기존 배열 복사 후, 새로운 값 추가
        tries: [...this.state.tries, { try: this.state.value, result: "홈런" }],
      });
    } else {
      // 답 틀렸으면
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      // 10번 틀렸을 때
      if (this.state.tries.length >= 9) {
        this.setState({
          result: "dd",
        });
      } else {
      }
    }
  };

  onChangeInput = () => {};

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((v, i) => {
            return <Try key={v.fruits + v.taste} value={v} index={i} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;

import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // [1, 3, 5, 7]
    tries: [], // push x -> react가 변화감지 못함
  };

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          // 기존 배열 복사 후, 새로운 값 추가
          tries: [...prevState.tries, { try: value, result: '홈런' }],
        };
      });
      alert('게임을 다시 시작합나디.');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      // 자동 inputRef로 커서 포커싱
      this.inputRef.current.focus();
    } else {
      // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      // 10번 이상 틀렸을 때
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`,
        });

        alert('게임을 다시 시작합나디.');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        // 자동 inputRef로 커서 포커싱
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` },
            ],
            value: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도:`} tryInfp={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;

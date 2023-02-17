import React, { Component } from 'react';
class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: [],
  };
  // 값이 바뀌어도 리렌더링 안됨
  timeout;
  startTime;
  endTime;
  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.',
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      // 앞의 settimeout이 콜스택으로 넘어가더라도 clearTimeout으로 제거할 수 있다
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요',
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prev) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...prev.result, this.endTime - this.startTime],
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: [],
    });
  };
  renderAverage = () => {
    const { result } = this.state;
    // console.log(result);
    return (
      result.length !== 0 && (
        <div>
          평균시간 :{result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
      )
    );
  };
  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
        <button onClick={this.onReset}>reset</button>
      </>
    );
  }
}

export default ResponseCheck;

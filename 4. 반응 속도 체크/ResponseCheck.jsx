import React, { useState, useRef, useCallback, useMemo } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');

      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭하세요.');

        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      // 앞의 settimeout이 콜스택으로 넘어가더라도 clearTimeout으로 제거할 수 있다
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급했습니다. 다시 클릭하세요!');
    } else if (state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prev) => [...prev, endTime.current - startTime.current]);
    }
  }, [state]);

  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  const renderAverage = () => {
    return (
      result.length !== 0 && (
        <div>
          평균시간 :{result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
      )
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
      <button onClick={onReset}>reset</button>
    </>
  );
};

export default ResponseCheck;

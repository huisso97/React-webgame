import React from "react";
import { BrowerRouter, HashRouter, Link, Route } from "react-router-dom";
import NumberBaseball from "../3. 숫자야구/NumberBaseballFunc";
import RSP from "../5. 가위바위보(18version)/RSP";
import Lotto from "../6. 로또 추첨기/LottoClass";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowerRouter>
      <Link to="/number-baseball">숫자야구</Link>
      <br />
      <Link to="/number-baseball">숫자야구</Link>
      <br />
      <Link to="/number-baseball">숫자야구</Link>
      <div>
        <Route path="/number-baseball" component={NumberBaseball} />
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-generator" component={Lotto} />
        <Route path="/game:name" component={GameMatcher} />
      </div>
    </BrowerRouter>
  );
};

export default Games;

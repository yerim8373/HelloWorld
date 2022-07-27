import React from "react";
import Sheet from "../common/Sheet";
import Input from "../common/Input";
import Button from "../common/Button";

import classes from "../auth/LoginForm.module.css";

// import Link from "next/link";
// import { useRouter } from "next/router";

import { NavLink, useNavigate } from "react-router-dom";

// 유효성 검사 설정
// useRef를 통한 현재 input 값 읽기
// useEffect를 통한 useRef 변경마다, 유효성 체크
// 디바운싱을 통한 최적화
// 조건에 따라, 부적합한 값인 경우, 그에 따른 알맞은 에러값 모두 송출
// 마음의 숙제 : 할 수 있다면 비즈니스 로직으로 빼서 처리하자!!

const LoginForm = () => {
  const navigate = useNavigate();
  function routerPushHandler() {
    navigate("/auth/signup");
  }

  return (
    <Sheet>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={classes.login_main}>
          <h2 className={classes.login_title}>로그인</h2>
          <div>
            <Input
              id={"Email"}
              type={"email"}
              placeholder={"example@example.com"}
            />
          </div>
          <div>
            <Input id={"비밀번호"} type={"password"} />
          </div>
        </div>
        <div className={classes.login_btns}>
          <div>
            <Button text="로그인" />
          </div>
          <div>
            <Button
              onEvent={routerPushHandler}
              color={"recommend"}
              text="회원가입"
            />
          </div>
        </div>
      </form>
      <p className={classes.login_tip}>
        이메일이나 비밀번호를 잊었다면{" "}
        <NavLink to="/auth/find-info">
          <span className={classes.login_find_info}>여기</span>
        </NavLink>{" "}
        를 클릭하세요
      </p>
    </Sheet>
  );
};

export default LoginForm;

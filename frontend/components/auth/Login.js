import React from "react";
import Sheet from "../common/Sheet";
import Input from "../common/Input";
import Button from "../common/Button";

import classes from "../auth/Login.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  function routerPushHandler() {
    router.push("/auth/signup");
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
        <Link href="./auth/find-info">
          <a className={classes.login_find_info}>여기</a>
        </Link>{" "}
        를 클릭하세요
      </p>
    </Sheet>
  );
};

export default Login;

import LodingSpinner from "../components/common/LoadingSpinner";
import Input from "../components/common/Input";
import Sheet from "../components/common/sheet";

export default function LandingPage() {
  return (
    <>
      <h1>랜딩 페이지</h1>
      {/* 로딩 스피너 시험용 */}
      {/* <LodingSpinner viewCount={5} /> */}
      {/* input 시험용 */}S
      {/* <form>
        <Input
          id={"Email"}
          type={"email"}
          placeholder={"example@example.com"}
        />
        <Input id={"비밀번호"} type={"password"} />
      </form> */}
      <Sheet />
    </>
  );
}

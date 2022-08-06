import React from "react";
import { useState } from "react";
import { useUserData } from "../../hooks/useUserData";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "../../styles/_RegisterPageStyles";

const Index = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const { mutate: AddUserData } = useUserData();

  const setUserDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const registerNewUserHandler = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    if (registerData.password.length < 8) {
      alert("비밀번호는 8자리 이상 입력해주세요");
      window.location.reload();
    } else {
      AddUserData(registerData);
    }
  };

  return (
    <S.RegisterWrapper>
      <S.RegisterInputWrapper>
        <form onSubmit={registerNewUserHandler}>
          <S.InputContainer>
            <span>이메일</span>
            <Input
              name="email"
              type="email"
              InputHandler={setUserDataHandler}
            />
            <span>비밀번호</span>
            <Input
              name="password"
              type="password"
              InputHandler={setUserDataHandler}
            />
            <Button props="가입하기" isValid={true} />
          </S.InputContainer>
        </form>
      </S.RegisterInputWrapper>
    </S.RegisterWrapper>
  );
};

export default Index;

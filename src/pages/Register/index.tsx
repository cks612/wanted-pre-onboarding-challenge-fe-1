import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useUserData } from "../../hooks/useUserData";
import * as S from "../../styles/_CommonCssStyles";

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
    <RegisterWrapper>
      <RegisterInputWrapper>
        <form onSubmit={registerNewUserHandler}>
          <InputContainer>
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
          </InputContainer>
        </form>
      </RegisterInputWrapper>
    </RegisterWrapper>
  );
};

export default Index;

const RegisterWrapper = styled.div`
  ${S.commonDisplay}
  min-height: 100vh;
  background: #fff;
`;

const RegisterInputWrapper = styled.div`
  display: flex;
  max-width: 50%;
`;

const InputContainer = styled.div`
  ${S.commonDisplay}
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;

  span {
    width: 30%;
  }
`;

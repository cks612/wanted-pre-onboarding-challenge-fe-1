import { useMutation } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "../../styles/_CommonCssStyles";
import { Login, TextProps } from "../../types";
import { request } from "../../utils/axios-utils";

const Index = () => {
  const [data, setData] = useState<Login>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const isValid = useMemo(
    () =>
      data.email.includes("@") &&
      data.email.includes(".") &&
      data.password.length >= 8,
    [data.email, data.password]
  );

  const { mutate: postLogin } = useMutation(
    async () => {
      return await request({ url: "/users/login", method: "post", data: data });
    },
    {
      onSuccess: (res) => {
        if (localStorage.getItem("token")) return navigate("/main");
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/main");
      },
    }
  );

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const loginSubmitHandler = () => {
    postLogin();
  };

  return (
    <MainWrapper>
      <MainContainer>
        <h2>로그인 / 회원가입</h2>

        <Input name="email" type="text" InputHandler={loginInputHandler} />
        <InputText isValid={isValid}>@ 이메일 형식으로 입력해주세요</InputText>
        <Input
          name="password"
          type="password"
          InputHandler={loginInputHandler}
        />
        <InputText isValid={isValid}>비밀번호는 8글자 이상입니다</InputText>
        <ButtonWrapper>
          <Button
            props="로그인"
            isValid={isValid}
            submitHandler={loginSubmitHandler}
          />
          <RegisterLink to="/register">
            <Button props="회원가입" isValid={true} />
          </RegisterLink>
        </ButtonWrapper>
      </MainContainer>
    </MainWrapper>
  );
};

export default Index;

const MainWrapper = styled.div`
  ${S.commonDisplay}
  min-height: 100vh;
  background: #fff;
`;

const MainContainer = styled.div`
  ${S.commonDisplay}
  flex-direction: column;
  min-width: 20%;
  gap: 10px;

  h2 {
    padding-bottom: 30px;
    font-size: 2em;
    font-weight: 800;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const InputText = styled.p<TextProps>`
  width: 100%;
  color: red;

  ${({ isValid }) => {
    if (isValid === true) {
      return css`
        color: lightgreen;
      `;
    }
  }}
`;

const RegisterLink = styled(Link)`
  width: 100%;
`;

import React, { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Login } from "../../types";
import { request } from "../../utils/axios-utils";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "../../styles/_AuthPageStyles";

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
        if (localStorage.getItem("token")) return navigate("/auth");
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/");
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
    <S.MainWrapper>
      <S.MainContainer>
        <h2>로그인 / 회원가입</h2>

        <Input name="email" type="text" InputHandler={loginInputHandler} />
        <S.InputText isValid={isValid}>
          @ 이메일 형식으로 입력해주세요
        </S.InputText>
        <Input
          name="password"
          type="password"
          InputHandler={loginInputHandler}
        />
        <S.InputText isValid={isValid}>비밀번호는 8글자 이상입니다</S.InputText>
        <S.ButtonWrapper>
          <Button
            props="로그인"
            isValid={isValid}
            submitHandler={loginSubmitHandler}
          />
          <S.RegisterLink to="/register">
            <Button props="회원가입" isValid={true} />
          </S.RegisterLink>
        </S.ButtonWrapper>
      </S.MainContainer>
    </S.MainWrapper>
  );
};

export default Index;

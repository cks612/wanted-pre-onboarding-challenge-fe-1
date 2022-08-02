import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import * as S from "../../styles/_CommonCssStyles";

interface Login {
  userId: string;
  userPw: string;
}

const Index = () => {
  const [data, setData] = useState<Login>({
    userId: "",
    userPw: "",
  });

  const isValid = useMemo(
    () =>
      data.userId.includes("@") &&
      data.userId.includes(".") &&
      data.userPw.length >= 8,
    [data.userId, data.userPw]
  );
  return (
    <MainWrapper>
      <MainContainer>
        <h2>로그인 / 회원가입</h2>
        <Input />
        <InputText>@ 이메일 형식으로 입력해주세요</InputText>
        <Input />
        <InputText>비밀번호는 8글자 이상입니다</InputText>
        <ButtonWrapper>
          <Button props="로그인" isValid={isValid} />
          <Button props="회원가입" isValid={true} />
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
  min-width: 35%;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

const InputText = styled.p`
  width: 100%;
`;

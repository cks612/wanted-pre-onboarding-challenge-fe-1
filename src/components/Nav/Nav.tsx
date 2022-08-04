import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <GnbWrapper>
      <GnbContainer>
        <h1>To Do List</h1>
        <LoginButton to="/">로그인</LoginButton>
      </GnbContainer>
    </GnbWrapper>
  );
};

export default Nav;

const GnbWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid black;
`;

const GnbContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding: 10px 20px;

  h1 {
    font-size: 2em;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  color: #000;
  border: 2px solid ${({ theme }) => theme.fontColor};
  border-radius: 25px;
  background: transparent;
  font-weight: 600;
  transform: translateY(3px);
  text-decoration: none;

  cursor: pointer;

  &:hover {
    border: 2px solid ${({ theme }) => theme.pointColor};
    color: ${({ theme }) => theme.pointColor};
  }
`;

import React from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logInOutHandler = () => {
    if (token) {
      localStorage.clear();
      navigate("/auth");
    }
    if (!token) return navigate("/auth");
  };

  return (
    <GnbWrapper>
      <GnbContainer>
        <h1>To Do List</h1>
        {token ? (
          <LoginButton onClick={logInOutHandler}>로그아웃</LoginButton>
        ) : (
          <LoginButton onClick={logInOutHandler}>로그인</LoginButton>
        )}
      </GnbContainer>
    </GnbWrapper>
  );
};

export default Nav;

const GnbWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid black;
  z-index: 1000;
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

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  color: #000;
  border: 2px solid ${({ theme }) => theme.pointColor};
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

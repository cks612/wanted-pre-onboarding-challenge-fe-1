import React, { ReactEventHandler } from "react";
import styled from "styled-components";

const Input = ({
  name,
  type,
  InputHandler,
}: {
  name: string;
  type: string;
  InputHandler?: ReactEventHandler;
}) => {
  return (
    <InputArea name={name} type={type} onChange={InputHandler}></InputArea>
  );
};

export default Input;

const InputArea = styled.input`
  width: 100%;
  height: 30px;
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
`;

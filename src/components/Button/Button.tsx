import React, { ReactEventHandler } from "react";
import styled, { css } from "styled-components";
import * as S from "../../styles/_CommonCssStyles";

interface ButtonProps {
  isValid: boolean;
}

const Button = ({
  props,
  isValid,
  submitHandler,
}: {
  props: string;
  isValid: boolean;
  submitHandler?: ReactEventHandler;
}): JSX.Element => {
  return (
    <ButtonWrapper isValid={isValid} onClick={submitHandler}>
      {props}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.button<ButtonProps>`
  ${S.commonDisplay}
  width: 100%;
  height: 50px;
  border: 1px solid black;
  color: ${({ theme }) => theme.whiteColor};
  cursor: pointer;

  ${({ isValid }) => {
    if (isValid === true) {
      return css`
        background: ${({ theme }) => theme.backGroundColor};
      `;
    }
  }}

  &:disabled {
    opacity: 0.6;
  }
`;

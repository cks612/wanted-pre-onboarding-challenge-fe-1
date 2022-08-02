import React from "react";
import styled, { css } from "styled-components";
import * as S from "../../styles/_CommonCssStyles";

interface ButtonProps {
  isValid: boolean;
}

const Button = ({
  props,
  isValid,
}: {
  props: string;
  isValid: boolean;
}): JSX.Element => {
  return <ButtonWrapper isValid={isValid}>{props}</ButtonWrapper>;
};

export default Button;

const ButtonWrapper = styled.button<ButtonProps>`
  ${S.commonDisplay}
  width: 100%;
  height: 50px;
  border: 1px solid red;
  color: ${({ theme }) => theme.whiteColor};

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

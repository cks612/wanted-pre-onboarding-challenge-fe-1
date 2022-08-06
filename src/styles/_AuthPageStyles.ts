import styled, { css } from "styled-components";
import { TextProps } from "../types";
import { Link } from "react-router-dom";
import * as S from "../styles/_CommonCssStyles";

export const MainWrapper = styled.div`
  ${S.commonDisplay}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

export const MainContainer = styled.div`
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

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const InputText = styled.p<TextProps>`
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

export const RegisterLink = styled(Link)`
  width: 100%;
`;

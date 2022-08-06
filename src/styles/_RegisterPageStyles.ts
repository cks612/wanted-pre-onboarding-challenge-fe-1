import styled from "styled-components";
import * as S from "../styles/_CommonCssStyles";

export const RegisterWrapper = styled.div`
  ${S.commonDisplay}
  min-height: 100vh;
  background: #fff;
`;

export const RegisterInputWrapper = styled.div`
  display: flex;
  max-width: 50%;
`;

export const InputContainer = styled.div`
  ${S.commonDisplay}
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;

  span {
    width: 30%;
  }
`;

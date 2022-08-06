import styled from "styled-components";
import * as S from "../styles/_CommonCssStyles";

export const TodoWrapper = styled.div`
  ${S.commonDisplay}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

export const TodoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-top: 80px;
`;

export const TodoTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  padding: 10px 20px;
  gap: 20px;
  flex: 0 0 20%;
  border-right: 2px solid black;

  button {
    width: 100%;
    height: 40px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.pointColor};
    border-radius: 25px;
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.pointColor};
    }
  }
`;

export const TodosDataWrapper = styled.div`
  ${S.commonDisplay}
  width: 100%;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 20px;
  cursor: pointer;
`;

export const TodoContents = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0 0 80%;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  gap: 10px;
`;

export const TodoContentsTitle = styled.input`
  width: 75%;
  height: 6%;
  font-size: 2em;
  text-align: center;
`;

export const TodoContentsWrapper = styled.textarea`
  width: 75%;
  height: 80%;
  font-size: 2em;
  text-align: center;
`;

export const TodoContentButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 75%;
  gap: 20px;

  button {
    ${S.commonDisplay}
    width: 100px;
    height: 30px;
    border: 1px solid ${({ theme }) => theme.pointColor};
    border-radius: 20px;
    background: transparent;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.pointColor};
    }
  }
`;

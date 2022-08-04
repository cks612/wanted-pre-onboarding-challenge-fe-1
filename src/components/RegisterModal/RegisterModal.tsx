import React, { ChangeEvent, ReactEventHandler, useState } from "react";
import styled from "styled-components";
import { useAddTodosData } from "../../hooks/useTodoListDatahooks";
import * as S from "../../styles/_CommonCssStyles";

const RegisterModal = ({
  isModalOn,
  createTodosHandler,
}: {
  isModalOn: boolean;
  createTodosHandler: ReactEventHandler;
}) => {
  const [todosData, setTodosData] = useState({
    title: "",
    content: "",
  });

  const { mutate: AddTodos } = useAddTodosData();

  const todosDataHandler = (e: ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;
      setTodosData((prev) => ({ ...prev, [name]: value }));
    } else if (e.target instanceof HTMLTextAreaElement) {
      const { name, value } = e.target;
      setTodosData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitTodosData = () => {
    if (todosData.title.length > 0 && todosData.content.length > 0) {
      AddTodos(todosData);
    } else {
      alert("제목과 내용을 입력하세여");
      window.location.reload();
    }
  };

  return (
    <RegisterModalWrapper>
      <RegisterModalContent>
        <TodosTitleContainer>
          <TodosTitle>제목 :</TodosTitle>
          <TodosTitleInput
            name="title"
            onChange={todosDataHandler}
          ></TodosTitleInput>
        </TodosTitleContainer>
        <TodosContentContainer>
          <TodosContent>내용 :</TodosContent>
          <TodosContentTextarea
            name="content"
            onChange={todosDataHandler}
          ></TodosContentTextarea>
        </TodosContentContainer>
        <TodosSubmitButton onClick={submitTodosData}>
          제출하기
        </TodosSubmitButton>
      </RegisterModalContent>

      {isModalOn && <HideScreen onClick={createTodosHandler}></HideScreen>}
    </RegisterModalWrapper>
  );
};

export default RegisterModal;

const RegisterModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const RegisterModalContent = styled.div`
  position: absolute;
  width: 500px;
  height: 50%;
  left: 50%;
  border: 3px solid black;
  border-radius: 15px;
  transform: translate(-50%, 50%);
  background: #fff;
  z-index: 100000;
`;

const HideScreen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 1;
`;

const TodosTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 35px;
  border-bottom: 1px solid black;
`;

const TodosTitle = styled.div`
  ${S.commonDisplay}
  width: 100%;
  flex: 0 0 20%;
  border-right: 1px solid black;
`;

const TodosTitleInput = styled.input`
  flex: 0 0 78%;
  padding: 10px 20px;
  border: none;
`;

const TodosContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  border-bottom: 1px solid black;
`;

const TodosContent = styled.div`
  ${S.commonDisplay}
  width: 100%;
  flex: 0 0 20%;
  border-right: 1px solid black;
`;

const TodosContentTextarea = styled.textarea`
  flex: 0 0 80%;
  padding: 10px 20px;
  border: none;
`;

const TodosSubmitButton = styled.button`
  width: 100%;
  height: 47px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: transparent;
  cursor: pointer;
`;

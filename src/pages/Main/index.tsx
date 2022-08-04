import React, { useState } from "react";
import styled from "styled-components";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import { useGetListData } from "../../hooks/useTodoListDatahooks";
import * as S from "../../styles/_CommonCssStyles";

const Index = () => {
  const [isModalOn, setIsModalOn] = useState(false);

  const onSuccess = (data: string) => {
    console.log("====", data);
  };
  const onError = (error: Error) => {
    console.log("====", error);
  };

  const createTodosHandler = () => {
    setIsModalOn(!isModalOn);
  };

  const { isLoading, data, isFetching } = useGetListData(onSuccess, onError);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <TodoWrapper>
        <TodoContainer>
          <TodoTitle>
            TO-DO <button onClick={createTodosHandler}>등록하기</button>
          </TodoTitle>

          <TodoContents>
            {/* {data.data?.map((data: any) => {
            return <div>{data}</div>;
          })} */}
          </TodoContents>
        </TodoContainer>
        {isModalOn && (
          <RegisterModal
            isModalOn={isModalOn}
            createTodosHandler={createTodosHandler}
          ></RegisterModal>
        )}
      </TodoWrapper>
    </>
  );
};

export default Index;

const TodoWrapper = styled.div`
  ${S.commonDisplay}

  min-height: 100vh;
`;

const TodoTitle = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5em;
  font-weight: 900;

  button {
    background: transparent;
    border: none;
    font-weight: 500;
    cursor: pointer;
  }
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80%;
  height: 500px;
`;

const TodoContents = styled.div`
  height: 100%;
  border: 1px solid black;
`;

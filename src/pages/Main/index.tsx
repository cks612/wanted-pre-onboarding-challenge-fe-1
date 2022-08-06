import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import {
  useDeleteList,
  useGetListData,
  useUpdateList,
} from "../../hooks/useTodoListDatahooks";
import * as S from "../../styles/_CommonCssStyles";

export interface elementType {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type queryDataType = {
  data: queryDataType2;
};

type queryDataType2 = {
  data: elementType;
};

const Index = () => {
  const [todoData, setTodoData] = useState<elementType[]>([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [isClicked, setIsClicked] = useState(true);

  const [updateTodoData, setUpdateTodoData] = useState({
    title: "",
    content: "",
  });

  const token = localStorage.getItem("token");
  const currentTabIdx = todoData?.findIndex((data) => currentTab === data.id);
  const navigate = useNavigate();

  const onSuccess = (data: queryDataType) => {
    console.log("====", data);
  };
  const onError = (error: Error) => {
    console.log("====", error);
  };

  const { isLoading, data, isFetching } = useGetListData(onSuccess, onError);
  const { mutate: UpdateTodoList } = useUpdateList();
  const { mutate: DeleteTodoList } = useDeleteList();

  const createTodosHandler = () => {
    if (token) {
      setIsModalOn(!isModalOn);
    } else {
      alert("로그인 후 사용해주세요");
      navigate("/auth");
    }
  };

  const updateTodosHandler = () => {
    setIsClicked(!isClicked);
  };

  const currentTabHandler = (e: string) => {
    setCurrentTab(e);
  };

  const todosDataHandler = (e: ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value } = e.target;
      setUpdateTodoData((prev) => ({ ...prev, [name]: value }));
    } else if (e.target instanceof HTMLTextAreaElement) {
      const { name, value } = e.target;
      setUpdateTodoData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateTodoListHandler = () => {
    const id = todoData[currentTabIdx].id;
    UpdateTodoList({ updateTodoData, id });
  };

  const deleteTodoListHandler = () => {
    DeleteTodoList(todoData[currentTabIdx].id);
  };

  data && localStorage.setItem("todos", JSON.stringify(data.data.data));

  useEffect(() => {
    const saved = data && JSON.parse(localStorage.getItem("todos") || "");
    if (saved !== null) {
      setTodoData(saved);
    }
  }, [data]);

  useEffect(() => {
    setUpdateTodoData({
      title: todoData?.[currentTabIdx]?.title,
      content: todoData?.[currentTabIdx]?.content,
    });
  }, [currentTab]);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <TodoWrapper>
        <TodoContainer>
          <TodoTitle>
            <button onClick={createTodosHandler}>등록하기</button>
            {todoData?.map((data) => {
              return (
                <TodosDataWrapper
                  key={data.id}
                  onClick={() => currentTabHandler(data.id)}
                >
                  {data.title}
                </TodosDataWrapper>
              );
            })}
          </TodoTitle>

          <TodoContents>
            <TodoContentsTitle
              name="title"
              defaultValue={updateTodoData.title}
              disabled={isClicked}
              onChange={todosDataHandler}
            ></TodoContentsTitle>
            <TodoContentsWrapper
              name="content"
              defaultValue={updateTodoData.content}
              disabled={isClicked}
              onChange={todosDataHandler}
            ></TodoContentsWrapper>
            <TodoContentButtonWrapper>
              <button onClick={updateTodosHandler}>수정하기</button>
              {isClicked === false && (
                <button onClick={updateTodoListHandler}>저장</button>
              )}
              <button onClick={deleteTodoListHandler}>삭제</button>
            </TodoContentButtonWrapper>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-top: 80px;
`;

const TodoTitle = styled.div`
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

const TodosDataWrapper = styled.div`
  ${S.commonDisplay}
  width: 100%;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 20px;
  cursor: pointer;
`;

const TodoContents = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0 0 80%;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  gap: 10px;
`;

const TodoContentsTitle = styled.input`
  width: 75%;
  height: 6%;
  font-size: 2em;
  text-align: center;
`;

const TodoContentsWrapper = styled.textarea`
  width: 75%;
  height: 80%;
  font-size: 2em;
  text-align: center;
`;

const TodoContentButtonWrapper = styled.div`
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

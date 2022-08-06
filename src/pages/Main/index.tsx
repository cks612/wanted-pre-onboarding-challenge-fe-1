import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import {
  useDeleteList,
  useGetListData,
  useUpdateList,
} from "../../hooks/useTodoListDatahooks";
import { elementType, queryDataType } from "../../types";
import * as S from "../../styles/_MainPageStyles";

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
      <S.TodoWrapper>
        <S.TodoContainer>
          <S.TodoTitle>
            <button onClick={createTodosHandler}>등록하기</button>
            {todoData?.map((data) => {
              return (
                <S.TodosDataWrapper
                  key={data.id}
                  onClick={() => setCurrentTab(data.id)}
                >
                  {data.title}
                </S.TodosDataWrapper>
              );
            })}
          </S.TodoTitle>

          <S.TodoContents>
            <S.TodoContentsTitle
              name="title"
              defaultValue={updateTodoData.title}
              disabled={isClicked}
              onChange={todosDataHandler}
            ></S.TodoContentsTitle>
            <S.TodoContentsWrapper
              name="content"
              defaultValue={updateTodoData.content}
              disabled={isClicked}
              onChange={todosDataHandler}
            ></S.TodoContentsWrapper>
            <S.TodoContentButtonWrapper>
              <button onClick={() => setIsClicked(!isClicked)}>수정하기</button>
              {isClicked === false && (
                <button onClick={updateTodoListHandler}>저장</button>
              )}
              <button onClick={deleteTodoListHandler}>삭제</button>
            </S.TodoContentButtonWrapper>
          </S.TodoContents>
        </S.TodoContainer>
        {isModalOn && (
          <RegisterModal
            isModalOn={isModalOn}
            createTodosHandler={createTodosHandler}
          ></RegisterModal>
        )}
      </S.TodoWrapper>
    </>
  );
};

export default Index;

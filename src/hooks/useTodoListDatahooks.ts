import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios-utils";

const fetchCustomer = () => {
  return request({ url: "/todos" });
};

const AddTodos = (todosData: {}) => {
  return request({ url: "/todos", method: "post", data: todosData });
};

const UpdateTodoList = ({
  updateTodoData,
  id,
}: {
  updateTodoData: { title: string; content: string };
  id: string;
}) => {
  return request({ url: `/todos/${id}`, method: "put", data: updateTodoData });
};

const DeleteToDOList = (id: string) => {
  return request({ url: `/todos/${id}`, method: "delete" });
};

export const useGetListData = (onSuccess: any, onError: any) => {
  return useQuery(["getList"], fetchCustomer, {
    onSuccess,
    onError,
  });
};

export const useAddTodosData = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(AddTodos, {
    onMutate: async (todosData) => {
      const previousUserData = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], () => {
        return {
          data: [todosData],
        };
      });
      return {
        previousUserData,
      };
    },

    onSuccess: (rs) => {
      alert("Todos 일정이 저장되었습니다");
      window.location.reload();
    },

    onError: (_error, _user, context: any) => {
      console.log(context);
      queryClient.setQueryData(["todos"], context.previousUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
};

export const useUpdateList = () => {
  const queryClient = useQueryClient();
  return useMutation(UpdateTodoList, {
    onMutate: async (updateTodoData) => {
      const previousUserData = queryClient.getQueryData(["todoList"]);
      queryClient.setQueryData(["todoList"], () => {
        return {
          data: [updateTodoData.updateTodoData],
        };
      });
      return {
        previousUserData,
      };
    },
    onSuccess: () => {
      alert("정보가 수정되었습니다");
      window.location.reload();
    },

    onError: (_error, _user, context: any) => {
      console.log(context);
      queryClient.setQueryData(["todoList"], context.previousUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todoList"]);
    },
  });
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  return useMutation(DeleteToDOList, {
    onMutate: async () => {
      await queryClient.cancelQueries(["delete"]);
      const previousHeroData = queryClient.getQueryData(["delete"]);
      queryClient.setQueryData(["delete"], (oldQueryData: {}) => {
        return {
          ...oldQueryData,
        };
      });
      return {
        previousHeroData,
      };
    },
    onSuccess: () => {
      alert("List가 삭제되었습니다");
      window.location.reload();
    },
    onError: (_error, _toDoList, context: any) => {
      queryClient.setQueryData(["delete"], context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["delete"]);
    },
  });
};

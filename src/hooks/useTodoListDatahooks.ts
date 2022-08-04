import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { request } from "../utils/axios-utils";

const fetchCustomer = () => {
  return request({ url: "/todos" });
};

export const useGetListData = (onSuccess: any, onError: any) => {
  return useQuery(["getList"], fetchCustomer, {
    onSuccess,
    onError,
  });
};

const AddTodos = (todosData: {}) => {
  return request({ url: "/todos", method: "post", data: todosData });
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
      navigate("/main");
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

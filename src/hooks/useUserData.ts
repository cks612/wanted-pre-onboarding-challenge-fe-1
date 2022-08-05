import { request } from "../utils/axios-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AddUserData = (userData: {}) => {
  return request({ url: "/users/create", method: "post", data: userData });
};

export const useUserData = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation(AddUserData, {
    onMutate: async (users) => {
      const previousUserData = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], () => {
        return {
          data: [users],
        };
      });
      return {
        previousUserData,
      };
    },
    onSuccess: (res) => {
      alert(res.data.message);
      navigate("/");
    },

    onError: (_error, _user, context: any) => {
      console.log(context);
      queryClient.setQueryData(["users"], context.previousUserData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

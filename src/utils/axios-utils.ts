import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080",
});
const token = localStorage.getItem("token");
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response: any) => response;
  const onError = (error: Error) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

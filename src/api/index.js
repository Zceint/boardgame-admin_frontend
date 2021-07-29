//encapsulate axios;
import axios from "axios";
import message from "../util/message";

const backendURL = "http://localhost:5000";

const ajax = (method = "GET", url, data = {}) => {
  let promise;
  return new Promise((resolve, reject) => {
    switch (method) {
      case "GET":
        promise = axios.get(url, {
          params: data,
        });
        break;
      case "POST":
        promise = axios.post(url, data);
        break;
      default:
        break;
    }
    promise
      .then((response) => resolve(response))
      .catch((error) => {
        message.error(error.message);
      });
  });
};

export const reqLogin = ({ email, password }) => {
  return ajax("POST", backendURL + "/login", { email, password });
};

export const reqCategoryAdd = ({ name }) => {
  return ajax("POST", backendURL + "/category/add", { name });
};

export const reqCategoryList = () => {
  return ajax("GET", backendURL + "/category/list", {});
};

export const reqCategoryDelete = ({ name }) => {
  return ajax("POST", backendURL + "/category/delete", { name });
};

export const reqProduct = axios.get(
  "https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&pretty=true&client_id=Q7FGFvjQSI&limit=100"
);

export const searchProduct = ({ name }) => {
  return ajax(
    "GET",
    "https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&pretty=true&client_id=Q7FGFvjQSI&exact&limit=4",
    { name }
  );
};

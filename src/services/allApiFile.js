import { commonAPI } from "./commonAPI";

import { BASE_URL } from "./baseurl";

//1) register user
export const registerAPI = async (user) => {
  return await commonAPI("post", `${BASE_URL}/user/register`, user, "");
};
//
//2) login user
export const loginAPI = async (reqBody) => {
  return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "");
};
//get all users
export const getUsersAPI = async (reqHeader) => {
  return await commonAPI("get", `${BASE_URL}/get-users`, "", reqHeader);
};

//get a user
export const getAUserAPI = async (userId) => {
  return await commonAPI("get", `${BASE_URL}/api/user/${userId}`, "", "");
};

//3) add food item API //

export const addFoodItemAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "post",
    `${BASE_URL}/add-food-item`,
    reqBody,
    reqHeader
  );
};

//edit food item
export const editFoodItemAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${BASE_URL}/fooditems/edit/${id}`,
    reqBody,
    reqHeader
  );
};
//delete food item
export const deleteFoodItemAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${BASE_URL}/fooditems/delete/${id}`,
    {},
    reqHeader
  );
};

//4) get food list

export const getFoodListAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/get-food-list`, "", "");
};

//5)add Order List

export const AddOrderAPI = async (reqBody) => {
  return await commonAPI("POST", `${BASE_URL}/add-order`, reqBody);
};

export const updateAOrderAPI = async (id, reqBody) => {
  return await commonAPI("PATCH", `${BASE_URL}/update-a-order/${id}`, reqBody);
};
//6) get Order List

export const getOrderListAPI = async () => {
  return await commonAPI("GET", `${BASE_URL}/orders`, "", "");
};

import { CREATE_POSTS_FAILURE, CREATE_POSTS_REQUEST, CREATE_POSTS_SUCCESS, GET_CLASS_FAILURE, GET_CLASS_REQUEST, GET_CLASS_SUCCESS, GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "../constants/classConstants";

import axios from "../../axios";
import { CLEAR_ERRORS } from "../constants/userConstants";

// Login
export const getClass = (id,user) => async (dispatch) => {
  try {
    dispatch({ type: GET_CLASS_REQUEST });

    const { data } = await axios.get(`/class/${id}`);
    dispatch({ type: GET_CLASS_SUCCESS, payload: {class:data.class,user}});
  } catch (error) {
    dispatch({ type: GET_CLASS_FAILURE, payload: error.response.data.message });
  }
};
export const getPostsAndAssignments = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const { data } = await axios.get(`/class/get_posts_assignments/${id}`);
    dispatch({ type: GET_POSTS_SUCCESS, payload: data.data});
  } catch (error) {
    dispatch({ type: GET_POSTS_FAILURE, payload: error.response.data.message });
  }
};

export const createPost = (formData,id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POSTS_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/class/createPost/${id}`,formData,config);

    console.log(data,"data");
    dispatch({ type: CREATE_POSTS_SUCCESS, payload: data.post});
  } catch (error) {
    dispatch({ type: CREATE_POSTS_FAILURE, payload: error.response.data.message });
  }
};




export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

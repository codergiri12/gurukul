import { CREATE_ASSIGNMENT_FAILURE, CREATE_ASSIGNMENT_REQUEST, CREATE_ASSIGNMENT_SUCCESS, CREATE_CLASS_FAILURE, CREATE_CLASS_REQUEST, CREATE_CLASS_SUCCESS, CREATE_POSTS_FAILURE, CREATE_POSTS_REQUEST, CREATE_POSTS_SUCCESS, DELETE_ASSIGNMENT_FAILURE, DELETE_ASSIGNMENT_REQUEST, DELETE_ASSIGNMENT_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, EDIT_ASSIGNMENT_FAILURE, EDIT_ASSIGNMENT_REQUEST, EDIT_ASSIGNMENT_SUCCESS, EDIT_POST_FAILURE, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, GET_ASSIGNMENT_FAILURE, GET_ASSIGNMENT_REQUEST, GET_ASSIGNMENT_SUBMISSION_FAILURE, GET_ASSIGNMENT_SUBMISSION_REQUEST, GET_ASSIGNMENT_SUBMISSION_SUCCESS, GET_ASSIGNMENT_SUCCESS, GET_CLASS_FAILURE, GET_CLASS_REQUEST, GET_CLASS_SUCCESS, GET_GRADES_FAILURE, GET_GRADES_REQUEST, GET_GRADES_SUCCESS, GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POST_FAILURE, GET_POST_REQUEST, GET_POST_SUCCESS, GET_SUBMISSION_FAILURE, GET_SUBMISSION_REQUEST, GET_SUBMISSION_SUCCESS, JOIN_CLASS_FAILURE, JOIN_CLASS_REQUEST, JOIN_CLASS_SUCCESS, SUBMIT_ASSIGNMENT_FAILURE, SUBMIT_ASSIGNMENT_REQUEST, SUBMIT_ASSIGNMENT_SUCCESS, UNSUBMIT_ASSIGNMENT_FAILURE, UNSUBMIT_ASSIGNMENT_REQUEST, UNSUBMIT_ASSIGNMENT_SUCCESS, UPDATE_GRADE_FAILURE, UPDATE_GRADE_REQUEST, UPDATE_GRADE_SUCCESS } from "../constants/classConstants";

import axios from "../../axios";
import { CLEAR_ERRORS } from "../constants/userConstants";
import { GET_EXAMS_SUCCESS } from "../constants/examConstants";

// Login
export const getClass = (id,user) => async (dispatch) => {
  try {
    dispatch({ type: GET_CLASS_REQUEST });
    const { data } = await axios.get(`/class/${id}`);
    dispatch({ type: GET_CLASS_SUCCESS, payload: {class:data.class,user}});
    dispatch({ type: GET_EXAMS_SUCCESS, payload: data.class.exams });

  } catch (error) {
    dispatch({ type: GET_CLASS_FAILURE, payload: error.response.data.message });
  }
};
export const createClass = (className,teacherId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CLASS_REQUEST });
    const { data } = await axios.post(`/class/create`,{className , user_id:teacherId });
    dispatch({ type: CREATE_CLASS_SUCCESS, payload: {message:data.message,classroom:data.classroom}});

  } catch (error) {
    dispatch({ type: CREATE_CLASS_FAILURE, payload: error.response.data.message });
  }
};
export const joinClass = (classCode,teacherId) => async (dispatch) => {
  try {
    dispatch({ type: JOIN_CLASS_REQUEST });
    const { data } = await axios.post(`/class/join`,{classCode , user_id:teacherId });
    dispatch({ type: JOIN_CLASS_SUCCESS, payload: {message:data.message,classroom:data.classroom}});

  } catch (error) {
    dispatch({ type: JOIN_CLASS_FAILURE, payload: error.response.data.message });
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
export const getGrades = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_GRADES_REQUEST });

    const { data } = await axios.get(`/class/getGrades/${id}`);
    dispatch({ type: GET_GRADES_SUCCESS, payload: {assignmentGrades: data.assignmentGrades, examGrades: data.examGrades}});
  } catch (error) {
    dispatch({ type: GET_GRADES_FAILURE, payload: error.response.data.message });
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
export const editPost = (formData,id) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_POST_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/class/updatePost/${id}`,formData,config);

    console.log(data,"data");
    dispatch({ type: EDIT_POST_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: EDIT_POST_FAILURE, payload: error.response.data.message });
  }
};
export const deletePost = (classId,postId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const { data } = await axios.delete(`/class/deletePost/${classId}/${postId}`);

    console.log(data,"data");
    dispatch({ type: DELETE_POST_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: DELETE_POST_FAILURE, payload: error.response.data.message });
  }
};
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });

    const { data } = await axios.get(`/class/getPost/${id}`);

    dispatch({ type: GET_POST_SUCCESS, payload: data.post});
  } catch (error) {
    dispatch({ type: GET_POST_FAILURE, payload: error.response.data.message });
  }
};
export const getSubmissions  = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSIGNMENT_SUBMISSION_REQUEST });

    const { data } = await axios.get(`/class/submissions/${id}`);

    dispatch({ type: GET_ASSIGNMENT_SUBMISSION_SUCCESS, payload: {assignment:data.assignment,submitted:data.submitted, notSubmitted: data.notSubmitted} });
  } catch (error) {
    dispatch({ type: GET_ASSIGNMENT_SUBMISSION_FAILURE, payload: error.response.data.message });
  }
};
export const getSubmission  = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBMISSION_REQUEST });

    const { data } = await axios.get(`/class/submission/${id}`);

    dispatch({ type: GET_SUBMISSION_SUCCESS, payload: data.submission });
  } catch (error) {
    dispatch({ type: GET_SUBMISSION_FAILURE, payload: error.response.data.message });
  }
};
export const getAssignment = (id, studentId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSIGNMENT_REQUEST });

    const { data } = await axios.get(`/class/getAssignment/${id}/${studentId}`);

    dispatch({ type: GET_ASSIGNMENT_SUCCESS, payload: {assignment:data.assignment,submission:data.submission} });
  } catch (error) {
    dispatch({ type: GET_ASSIGNMENT_FAILURE, payload: error.response.data.message });
  }
};
export const submitAssignment = (formData, assignmentId ) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_ASSIGNMENT_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/class/submitAssignment/${assignmentId}`,formData, config);

    dispatch({ type: SUBMIT_ASSIGNMENT_SUCCESS, payload: data.submission});
  } catch (error) {
    dispatch({ type: SUBMIT_ASSIGNMENT_FAILURE, payload: error.response.data.message });
  }
};
export const unsubmitAssignment = (assignmentId , userId ) => async (dispatch) => {
  try {
    dispatch({ type: UNSUBMIT_ASSIGNMENT_REQUEST });
    await axios.delete(`/class/unsubmitAssignment/${assignmentId}/${userId}`);

    dispatch({ type: UNSUBMIT_ASSIGNMENT_SUCCESS, payload: null});
  } catch (error) {
    dispatch({ type: UNSUBMIT_ASSIGNMENT_FAILURE, payload: error.response.data.message });
  }
};

export const createAssignment = (formData,id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ASSIGNMENT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/class/createAssignment/${id}`,formData,config);

    console.log(data,"data");
    dispatch({ type: CREATE_ASSIGNMENT_SUCCESS, payload: data.assignment });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: CREATE_ASSIGNMENT_FAILURE, payload: error.response.data.message });
  }
};
export const editAssignment = (formData,id) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ASSIGNMENT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(`/class/updateAssignment/${id}`,formData,config);

    console.log(data,"data");
    dispatch({ type: EDIT_ASSIGNMENT_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: EDIT_ASSIGNMENT_FAILURE, payload: error.response.data.message });
  }
};
export const deleteAssignment = (classId,assignmentId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ASSIGNMENT_REQUEST });

    const { data } = await axios.delete(`/class/deleteAssignment/${classId}/${assignmentId}`);

    console.log(data,"data");
    dispatch({ type: DELETE_ASSIGNMENT_SUCCESS, payload: data.message});
  } catch (error) {
    dispatch({ type: DELETE_ASSIGNMENT_FAILURE, payload: error.response.data.message });
  }
};
export const updateGrade = (gradeId , newMarks) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_GRADE_REQUEST });

    const { data } = await axios.post(`/class/updateGrade/${gradeId}`,{marks:newMarks});

    console.log(data,"data");
    dispatch({ type: UPDATE_GRADE_SUCCESS, payload: data.grade });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: UPDATE_GRADE_FAILURE, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

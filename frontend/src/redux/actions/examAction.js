import axios from "../../axios";
import { CREATE_EXAM_FAILURE, CREATE_EXAM_REQUEST, CREATE_EXAM_SUCCESS, CREATE_QUESTION_FAILURE, CREATE_QUESTION_REQUEST, CREATE_QUESTION_SUCCESS, DELETE_EXAM_FAILURE, DELETE_EXAM_REQUEST, DELETE_EXAM_SUCCESS, DELETE_QUESTION_FAILURE, DELETE_QUESTION_REQUEST, DELETE_QUESTION_SUCCESS, EDIT_EXAM_FAILURE, EDIT_EXAM_REQUEST, EDIT_EXAM_SUCCESS, EDIT_QUESTION_FAILURE, EDIT_QUESTION_REQUEST, EDIT_QUESTION_SUCCESS, GET_EXAMS_FAILURE, GET_EXAMS_REQUEST, GET_EXAMS_SUCCESS, GET_EXAM_FAILURE, GET_EXAM_REPORT_FAILURE, GET_EXAM_REPORT_REQUEST, GET_EXAM_REPORT_SUCCESS, GET_EXAM_REQUEST, GET_EXAM_SUCCESS, GET_QUESTIONS_FAILURE, GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS } from "../constants/examConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";


export const getExams = (classId) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAMS_REQUEST });

    const { data } = await axios.get(`/exam/exams/${classId}`);

    dispatch({ type: GET_EXAMS_SUCCESS, payload: data.exams });
  } catch (error) {
    dispatch({ type: GET_EXAMS_FAILURE, payload: error.response.data.message });
  }
};

export const getExam = (examId) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_REQUEST });

    const { data } = await axios.get(`/exam/${examId}`);

    dispatch({ type: GET_EXAM_SUCCESS, payload: data.exam });
  } catch (error) {
    dispatch({ type: GET_EXAM_FAILURE, payload: error.response.data.message });
  }
};


export const getQuestions = (examId) => async (dispatch) => {
  try {
    dispatch({ type: GET_QUESTIONS_REQUEST });

    const { data } = await axios.get(`/exam/questions/${examId}`);

    dispatch({ type: GET_QUESTIONS_SUCCESS, payload: data.questions });
  } catch (error) {
    dispatch({ type: GET_QUESTIONS_FAILURE, payload: error.response.data.message });
  }
};

export const createExam = (formData,classId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EXAM_REQUEST });

    const { data } = await axios.post(`/exam/createExam/${classId}`,formData);

    console.log(data,"data");
    dispatch({ type: CREATE_EXAM_SUCCESS, payload: {exam:data.exam , success:data.message} });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: CREATE_EXAM_FAILURE, payload: error.response.data.message });
  }
};
export const editExam = (formData,examId) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_EXAM_REQUEST });

    const { data } = await axios.put(`/exam/editExam/${examId}`,formData);

    console.log(data,"data");
    dispatch({ type: EDIT_EXAM_SUCCESS, payload: {exams:data.exams , success:data.message} });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: EDIT_EXAM_FAILURE, payload: error.response.data.message });
  }
};

export const deleteExam = (examId , classId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXAM_REQUEST });

    const { data } = await axios.delete(`/exam/deleteExam/${classId}/${examId}`);

    console.log(data,"data");
    dispatch({ type: DELETE_EXAM_SUCCESS, payload: {success:data.message , exams : data.updatedClass.exams} });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: DELETE_EXAM_FAILURE, payload: error.response.data.message });
  }
};
export const createQuestion = (formData,examId) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_QUESTION_REQUEST });

    const { data } = await axios.post(`/exam/createQuestion/${examId}`,formData);

    console.log(data,"data");
    dispatch({ type: CREATE_QUESTION_SUCCESS, payload: data.question });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: CREATE_QUESTION_FAILURE, payload: error.response.data.message });
  }
};

export const editQuestion = (formData,questionId) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_QUESTION_REQUEST });

    const { data } = await axios.put(`/exam/editQuestion/${questionId}`,formData);

    console.log(data,"data");
    dispatch({ type: EDIT_QUESTION_SUCCESS, payload: {questions:data.questions , success:data.message} });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: EDIT_QUESTION_FAILURE, payload: error.response.data.message });
  }
};

export const deleteQuestion = (examId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUESTION_REQUEST });

    const { data } = await axios.delete(`/exam/question/${examId}`);

    console.log(data,"data");
    dispatch({ type: DELETE_QUESTION_SUCCESS, payload: {success:data.message , questions : data.updatedExam.questions} });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: DELETE_QUESTION_FAILURE, payload: error.response.data.message });
  }
};
export const getExamReport = (userId , examId) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_REPORT_REQUEST });

    const { data } = await axios.get(`/exam/getExamReport/${userId}/${examId}`);

    console.log(data,"data");
    dispatch({ type: GET_EXAM_REPORT_SUCCESS, payload: {examReport:data.examReport, exam : data.exam,questions:data.questions} });
  } catch (error) {
    console.error("error: ",error)
    dispatch({ type: GET_EXAM_REPORT_FAILURE, payload: error.response.data.message });
  }
};



export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
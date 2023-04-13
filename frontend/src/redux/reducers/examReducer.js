import { CREATE_EXAM_FAILURE, CREATE_EXAM_REQUEST, CREATE_EXAM_SUCCESS, CREATE_QUESTION_FAILURE, CREATE_QUESTION_REQUEST, CREATE_QUESTION_SUCCESS, DELETE_EXAM_FAILURE, DELETE_EXAM_REQUEST, DELETE_EXAM_SUCCESS, DELETE_QUESTION_REQUEST, DELETE_QUESTION_SUCCESS, EDIT_EXAM_FAILURE, EDIT_EXAM_REQUEST, EDIT_EXAM_SUCCESS, EDIT_QUESTION_FAILURE, EDIT_QUESTION_REQUEST, EDIT_QUESTION_SUCCESS, GET_EXAMS_FAILURE, GET_EXAMS_REQUEST, GET_EXAMS_SUCCESS, GET_EXAM_FAILURE, GET_EXAM_REPORT_FAILURE, GET_EXAM_REPORT_REQUEST, GET_EXAM_REPORT_SUCCESS, GET_EXAM_REQUEST, GET_EXAM_SUCCESS, GET_QUESTIONS_FAILURE, GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS } from "../constants/examConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";


export const examReducer = (state = { examReport: null , exams:[] , exam:{} , questions:[] , error:null, success:null }, action) => {
  switch (action.type){
    case GET_EXAMS_REQUEST:
    case GET_EXAM_REQUEST:
    case GET_QUESTIONS_REQUEST:
    case CREATE_EXAM_REQUEST:
    case CREATE_QUESTION_REQUEST:
    case DELETE_EXAM_REQUEST:
    case DELETE_QUESTION_REQUEST:
    case EDIT_EXAM_REQUEST:
    case EDIT_QUESTION_REQUEST:
    case GET_EXAM_REPORT_REQUEST:
      return {
        ...state,
        loading: true
      }

    case GET_EXAMS_SUCCESS:
      return {
        ...state , loading: false , exams : action.payload
      }
    case GET_EXAM_SUCCESS:
      return {
        ...state , loading: false , exam : action.payload , questions: [...action.payload.questions]
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state , loading: false , questions : action.payload
      }

    case CREATE_EXAM_SUCCESS:
      return {
        ...state , loading: false , exams : [...state.exams , action.payload.exam] , success : action.payload.success 
      }
    case CREATE_QUESTION_SUCCESS:
      return {
        ...state , loading: false , questions : [...state.questions , action.payload]
      }

    case DELETE_EXAM_SUCCESS:
    case EDIT_EXAM_SUCCESS:
      return {...state , loading: false , exams : [...action.payload.exams] , success : action.payload.success}

    case DELETE_QUESTION_SUCCESS:
    case EDIT_QUESTION_SUCCESS:
      return {...state , loading: false , questions : [...action.payload.questions] , success : action.payload.success}

    case GET_EXAM_REPORT_SUCCESS:
      return {...state , loading: false , examReport : action.payload.examReport , exam : action.payload.exam ,questions : [...action.payload.questions] }

    case GET_EXAMS_FAILURE:
    case GET_EXAM_FAILURE:
    case GET_QUESTIONS_FAILURE:
    case CREATE_EXAM_FAILURE:
    case CREATE_QUESTION_FAILURE:
    case DELETE_EXAM_FAILURE:
    case DELETE_EXAM_FAILURE:
    case EDIT_EXAM_FAILURE:
    case EDIT_QUESTION_FAILURE:
    case GET_EXAM_REPORT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success : null
      };
    default:
      return state;
  }
}
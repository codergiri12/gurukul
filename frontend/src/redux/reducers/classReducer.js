import { CREATE_ASSIGNMENT_FAILURE, CREATE_ASSIGNMENT_REQUEST, CREATE_ASSIGNMENT_SUCCESS, CREATE_POSTS_FAILURE, CREATE_POSTS_REQUEST, CREATE_POSTS_SUCCESS, GET_ASSIGNMENT_FAILURE, GET_ASSIGNMENT_REQUEST, GET_ASSIGNMENT_SUBMISSION_FAILURE, GET_ASSIGNMENT_SUBMISSION_REQUEST, GET_ASSIGNMENT_SUBMISSION_SUCCESS, GET_ASSIGNMENT_SUCCESS, GET_CLASS_FAILURE, GET_CLASS_REQUEST, GET_CLASS_SUCCESS, GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POST_FAILURE, GET_POST_REQUEST, GET_POST_SUCCESS, GET_SUBMISSION_FAILURE, GET_SUBMISSION_REQUEST, GET_SUBMISSION_SUCCESS, SUBMIT_ASSIGNMENT_FAILURE, SUBMIT_ASSIGNMENT_REQUEST, SUBMIT_ASSIGNMENT_SUCCESS, UNSUBMIT_ASSIGNMENT_FAILURE, UNSUBMIT_ASSIGNMENT_REQUEST, UNSUBMIT_ASSIGNMENT_SUCCESS, UPDATE_GRADE_FAILURE, UPDATE_GRADE_REQUEST, UPDATE_GRADE_SUCCESS } from "../constants/classConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";


export const classReducer = (state = { class: {} }, action) => {
  switch (action.type) {
    case GET_CLASS_REQUEST:
    case GET_POSTS_REQUEST:
    case GET_POST_REQUEST:
    case GET_ASSIGNMENT_REQUEST:
    case GET_SUBMISSION_REQUEST:
    case GET_ASSIGNMENT_SUBMISSION_REQUEST:
    case CREATE_POSTS_REQUEST:
    case CREATE_ASSIGNMENT_REQUEST:
    case SUBMIT_ASSIGNMENT_REQUEST:
    case UNSUBMIT_ASSIGNMENT_REQUEST:
    case UPDATE_GRADE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false
      };
    
    case GET_CLASS_SUCCESS:
      console.log({x: action.payload.user ,y: action.payload.class })
      return {
        ...state,
        loading: false,
        class: action.payload.class,
        isTeacher: (action.payload.user._id === action.payload.class.ownerId ),
      };
    
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: null
      }
    case GET_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        assignment: action.payload.assignment,
        submission : action.payload.submission,
        error: null
      }
    case GET_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        studentSubmission : action.payload,
        error: null
      }
    case GET_ASSIGNMENT_SUBMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        assignment: action.payload.assignment,
        submitted : action.payload.submitted,
        notSubmitted: action.payload.notSubmitted,
        error: null
      }
    case SUBMIT_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        submission : action.payload,
        error: null
      }
    case UNSUBMIT_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        submission : action.payload,
        error: null
      }
    case CREATE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload,...state.posts],
        success:true
      }
    case CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success:true
      }
    case UPDATE_GRADE_SUCCESS:
      const oldSubmission = state.studentSubmission;
      return {
        ...state,
        loading: false,
        studentSubmission : {...oldSubmission, grade : action.payload}
      }
    
    case GET_CLASS_FAILURE:
    case GET_POSTS_FAILURE:
    case GET_POST_FAILURE:
    case GET_ASSIGNMENT_FAILURE:
    case GET_SUBMISSION_FAILURE:
    case CREATE_POSTS_FAILURE:
    case CREATE_ASSIGNMENT_FAILURE:
    case SUBMIT_ASSIGNMENT_FAILURE:
    case UNSUBMIT_ASSIGNMENT_FAILURE:
    case GET_ASSIGNMENT_SUBMISSION_FAILURE:
    case UPDATE_GRADE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
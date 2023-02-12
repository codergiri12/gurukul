import { CREATE_POSTS_FAILURE, CREATE_POSTS_REQUEST, CREATE_POSTS_SUCCESS, GET_CLASS_FAILURE, GET_CLASS_REQUEST, GET_CLASS_SUCCESS, GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "../constants/classConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";


export const classReducer = (state = { class: {} }, action) => {
  switch (action.type) {
    case GET_CLASS_REQUEST:
    case GET_POSTS_REQUEST:
    case CREATE_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    
    case GET_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        class: action.payload.class,
        isTeacher: (action.payload.user._id === action.payload.class.ownerId )
      };
    
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    case CREATE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload,...state.posts]
      }
    case GET_CLASS_FAILURE:
    case GET_POSTS_FAILURE:
    case CREATE_POSTS_FAILURE:
      return {
        loading: false,
        error: action.payload
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
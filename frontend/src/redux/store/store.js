import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {userReducer} from "../reducers/userReducer";
import { classReducer } from "../reducers/classReducer";
import { examReducer } from "../reducers/examReducer";

const reducer = combineReducers({
  user: userReducer,
  class: classReducer,
  exam : examReducer
});

let initialState = {
  
};
const loggerMiddleware = ({ getState }) => next => action => {
  console.log('Action type:', action.type);
  const result = next(action);
  console.log('State after:', getState());
  return result;
};

const middleware = [thunk,loggerMiddleware];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
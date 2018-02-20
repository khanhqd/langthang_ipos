import appReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";

const consoleMessage = store => next => action => {
  let result;
  console.log("////////////////");
  console.log("dispatching action => " + action.type);
  console.log("payload: ", action.payload);
  result = next(action);
  // console.log('STATE CONSOLE', store.getState());
  console.log("////////////////");
  return result;
};

export default (initialState = {}) => {
  return applyMiddleware(consoleMessage)(createStore)(appReducer, initialState);
};
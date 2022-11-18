import { combineReducers } from "redux";
import { detailReducer, selectedDetailsReducer } from "./stockreducer";
const reducers = combineReducers({
  alldetails: detailReducer,
});
export default reducers;

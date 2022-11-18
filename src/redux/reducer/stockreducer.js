import { ActionTypes } from "../action/action.type";

const initialState = {
  details: [],
  fetchQuotesDetails: [],
};
export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DETAILS: {
      return { ...state, details: action.payload };
    }
    case ActionTypes.SELECTED_DETAILS:
      return { ...state, fetchQuotesDetails: action.payload };
    case ActionTypes.REMOVE_SELECTED_DETAILS:
      return { ...state, fetchQuotesDetails: [] };
    default:
      return state;
  }
};

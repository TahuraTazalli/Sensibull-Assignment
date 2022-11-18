import apifiles from "../../API/apifiles";
import { ActionTypes } from "../action/action.type";
export const setDetails = (details) => {
  return {
    type: ActionTypes.SET_DETAILS,
    payload: details,
  };
};
export const selectedDetails = (details) => {
  return {
    type: ActionTypes.SELECTED_DETAILS,
    payload: details,
  };
};
export const removSelectedDetails = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_DETAILS,
  };
};
export const fetchDetails = (data) => {
  console.log("fetchInstrumentsDetails", data);

  return { type: ActionTypes.FETCH_DETAILS, payload: data };
};

export const fetchInstrumentsDetails = () => async (dispatch) => {
  const response = await apifiles.get("/api/v2/instruments");
  dispatch(fetchDetails(response?.data));
};

export const fetchQuotesDetails = (symbol) => async (dispatch) => {
  const response = await apifiles.get(`/api/v2/quotes/${symbol}`);
  dispatch({ type: ActionTypes.SELECTED_DETAILS, payload: response.data });
};

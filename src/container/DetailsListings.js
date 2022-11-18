import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StockComponent from "./StockComponent";
import {
  fetchInstrumentsDetails,
  removSelectedDetails,
} from "../redux/action/stockaction";
const DetailsListings = () => {
  const details = useSelector((state) => {
    console.log("initial-state", state);
    return state.alldetails;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInstrumentsDetails());
    dispatch(removSelectedDetails());
  }, []);
  // console.log("DetailsListings:", details);
  return (
    <div>
      <StockComponent />
    </div>
  );
};
export default DetailsListings;

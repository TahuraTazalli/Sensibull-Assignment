import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  fetchQuotesDetails,
  removSelectedDetails,
} from "../redux/action/stockaction";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const QuotesDetails = () => {
  const details = useSelector((state) => state.alldetails.fetchQuotesDetails);
  const { symbol } = useParams();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (symbol && symbol !== "") fetchQuotesDetails(symbol);
  //   return () => {
  //     // dispatch(removSelectedDetails());
  //   };
  // }, [symbol]);
  useEffect(() => {
    if (symbol && symbol !== "") fetchQuotesDetails(symbol);

    dispatch(fetchQuotesDetails(symbol));
  }, [symbol]);
  console.log("detailssss", details.payload);
  return (
    <div>
      {Object.keys(details).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
                <StyledTableCell align="right">Validtill</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details?.payload[symbol].length &&
                details?.payload[symbol].map((detail) => (
                  <StyledTableRow key={detail.name}>
                    <StyledTableCell align="right">{detail.price}</StyledTableCell>
                    <StyledTableCell align="right">{detail.time}</StyledTableCell>
                    <StyledTableCell align="right">{detail.valid_till}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
export default QuotesDetails;

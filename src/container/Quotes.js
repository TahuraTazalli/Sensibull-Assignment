import React, { useEffect, useState } from "react";
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
import { fetchQuotesDetails } from "../redux/action/stockaction";
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
  const [order, setOrder] = useState("ASC");
  const { symbol } = useParams();

  const details = useSelector((state) => state.alldetails.fetchQuotesDetails);
  const [data, setData] = useState(null);
  const sorting = () => {
    if (order === "ASC") {
      const sorted = [...data].sort(({ time: a }, { time: b }) =>
        a < b ? -1 : a > b ? 1 : 0
      );
      console.log("sortedsorted", sorted);
      setData(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...data].sort(({ time: a }, { time: b }) =>
        a > b ? -1 : a > b ? 1 : 0
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  useEffect(() => {
    setData(Object.keys(details).length && details.payload[symbol]);
  }, [details.payload]);
  console.log("data", data);

  const dispatch = useDispatch();
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
              <StyledTableCell align="center">{symbol}</StyledTableCell>

              <TableRow>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right" onClick={() => sorting()}>
                  Time
                </StyledTableCell>
                <StyledTableCell align="right">Validtill</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length &&
                data.map((detail) => (
                  <StyledTableRow key={detail.name}>
                    <StyledTableCell align="right">
                      {detail.price}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {detail.time}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {detail.valid_till}
                    </StyledTableCell>
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

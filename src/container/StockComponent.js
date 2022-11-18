import React, { useState } from "react";
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
import { useSelector } from "react-redux";
// import { Routes, Route, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

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
const StockComponent = () => {
  const [update, setUpdate] = useState("");
  // const navigate = useNavigate();
  const details = useSelector((state) => {
    console.log("stateee", state);
    return state.alldetails.details;
  });

  const splitDetails = details?.length && details.split("\n");
  const arrange =
    splitDetails?.length &&
    splitDetails
      .map((splitDetail, i) => {
        const splitFirstLine =
          splitDetails?.length && splitDetails[0].split(",");
        console.log("splitFirstLine", splitFirstLine);

        if (i !== 0) {
          const splitData = splitDetail.split(",");
          const createObj = {};

          createObj[splitFirstLine[0]] = splitData[0];
          createObj[splitFirstLine[1]] = splitData[1];
          createObj[splitFirstLine[2]] = splitData[2];
          createObj[splitFirstLine[3]] = splitData[3];
          console.log("splitDatasplitData", createObj);

          return createObj;
        }
      })
      .filter((details) => details !== undefined);
  console.log("arrangearrange", arrange);
  const onChangeAutocomplete = (event, newValue) => {
    event.preventDefault();
    setUpdate(arrange.Symbol);
    // navigate("/quotes/:symbol");
  };
  const clickEventHandler = (detail) => {
    console.log("Detailss", detail);
    // const { Symbol } = detail;
  };
  const abc = () => {};
  return (
    <>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={arrange}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={onChangeAutocomplete}
            label="Search"
          />
        )}
      />
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Symbol</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Sector</StyledTableCell>
                <StyledTableCell align="right">Validtill</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrange?.length &&
                arrange.map((detail) => (
                  <StyledTableRow key={detail.name}>
                    <StyledTableCell
                      align="right"
                      onClick={() => clickEventHandler(detail)}
                      component={Link}
                      to={`/quotes/${detail.Symbol}`}
                    >
                      {detail.Symbol}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {detail.Name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {detail.Sector}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {detail.Validtill}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );

  // console.log("StockComponent:", renderLists);

  // return <>{renderLists}</>;
};
export default StockComponent;

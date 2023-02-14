import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";

import * as opportunities from "./opportunities.json";
import {
  Box,
  Dialog,
  FormControlLabel,
  Switch,
  TablePagination,
  TableSortLabel
} from "@mui/material";
import HistoryTable from "./HistoryTable";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";

export default function BasicTable() {
  const data = opportunities.default;

  // The following 3 functions are from documentation on enhanced chartjs table - toggles between ascending and descending
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "oppName",
      numeric: false,
      disablePadding: true,
      label: "Opportunity"
    },
    {
      id: "stage",
      numeric: false,
      disablePadding: false,
      label: "Stage"
    },
    {
      id: "repProbability",
      numeric: true,
      disablePadding: false,
      label: "Rep Probability"
    },
    {
      id: "pilytixProbability",
      numeric: true,
      disablePadding: false,
      label: "PX Probability"
    },
    {
      id: "pilytixTier",
      numeric: true,
      disablePadding: false,
      label: "PX Tier"
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "PX Amount"
    },
    {
      id: "product",
      numeric: true,
      disablePadding: false,
      label: "Product"
    },
    {
      id: "salesRepName",
      numeric: true,
      disablePadding: false,
      label: "Sales Rep"
    }
  ];

  // This function sets up the table head with sort functionality, and returns the table head to be used in table render. The main change from the example enhanced table is the removal of the row select feature, since we are using the modal card to display the additional information.

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "left" : "center"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  };

  // export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // code from documentation to set up pagination and density options

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // Logic to set up modal card pop up

  function handleRowClick(event, row) {
    setModalInfo(row);
    setOpen(!open);
  }

  //modalInfo set the content of the modal dynamically based on which row was clicked
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [history, setHistory] = useState("chart");
  const populateModal = (modalInfo) => {
    let row = modalInfo;

    // sets up toggle between chart and table view
    const handleClick = () => {
      if (history === "chart") {
        setHistory("table");
      } else if (history === "table") {
        setHistory("chart");
      }
    };
    return (
      <div>
        <p style={{ fontSize: 20, fontWeight: "bold" }}>
          Stage {row.stage} with {row.oppName}
        </p>
        {row.pilytixTier === "1 Star" && "★"}
        {row.pilytixTier === "2 Stars" && "★★"}
        {row.pilytixTier === "3 Stars" && "★★★"}
        {row.pilytixTier === "4 Stars" && "★★★★"}
        {row.pilytixTier === "5 Stars" && "★★★★★"}
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          <div
            style={{
              marginLeft: 20,
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <div>Sales Rep: {row.salesRepName}</div>
            <div>|</div>
            <div>PX Amount: {row.amount}</div>
            <div>|</div>
            <div>Product: {row.product}</div>
          </div>
          <div
            style={{
              marginLeft: 20,
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <p>Current Rep Probability: {row.repProbability}</p>
            <p>Current PX Probability: {row.pilytixProbability}</p>
          </div>
        </div>
        <div onClick={handleClick}>
          {row.probabilityHistory ? (
            <div style={{ height: 330 }}>
              {history === "table" ? (
                <div
                  style={{
                    padding: 10,
                    margin: 10,
                    width: 537,
                    height: 300,
                    borderStyle: "solid",
                    borderWidth: 1,
                    overflowY: "auto"
                  }}
                >
                  <HistoryTable row={row.probabilityHistory} />{" "}
                </div>
              ) : history === "chart" ? (
                <LineGraph array={row.probabilityHistory} />
              ) : null}
            </div>
          ) : null}
        </div>
        {row.pilytixFactorsIncreasingWin ? (
          <div>
            <BarGraph
              wins={row.pilytixFactorsIncreasingWin}
              losses={row.pilytixFactorsDecreasingWin}
            />
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  onClick={(event) => handleRowClick(event, row)}
                  key={row.oppId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.oppName}
                  </TableCell>
                  <TableCell align="center">{row.stage}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        backgroundColor:
                          row.repProbability < 0.2
                            ? "#b3e2ff"
                            : row.repProbability < 0.4
                            ? "#87d1ff"
                            : row.repProbability < 0.6
                            ? "#57beff"
                            : row.repProbability < 0.8
                            ? "#009dff"
                            : "#007fd1",
                        width: "50%",
                        padding: 2,
                        textAlign: "center",
                        borderRadius: "0.5rem"
                      }}
                    >
                      {row.repProbability}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        backgroundColor:
                          row.pilytixProbability < 0.2
                            ? "#b3e2ff"
                            : row.pilytixProbability < 0.4
                            ? "#87d1ff"
                            : row.pilytixProbability < 0.6
                            ? "#57beff"
                            : row.pilytixProbability < 0.8
                            ? "#009dff"
                            : "#007fd1",
                        width: "50%",
                        padding: 2,
                        textAlign: "center",
                        borderRadius: "0.5rem"
                      }}
                    >
                      {row.pilytixProbability}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {row.pilytixTier === "1 Star" && "★"}
                    {row.pilytixTier === "2 Stars" && "★★"}
                    {row.pilytixTier === "3 Stars" && "★★★"}
                    {row.pilytixTier === "4 Stars" && "★★★★"}
                    {row.pilytixTier === "5 Stars" && "★★★★★"}
                  </TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.product}</TableCell>
                  <TableCell align="center">{row.salesRepName}</TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          sx={{ marginLeft: 5 }}
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Compact View"
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </span>

      {/* MUI uses Dialog to display a modal that can easily be closed by clicking away and does not take user input */}
      <Dialog
        PaperProps={{
          sx: {
            width: "70%",
            height: 800
          }
        }}
        fullWidth
        open={open}
        onClose={() => setOpen(!open)}
      >
        <>{populateModal(modalInfo)}</>
      </Dialog>
    </div>
  );
}

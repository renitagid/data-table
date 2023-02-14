import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function MessageTable({ array }) {
  return (
    <div>
      <TableContainer sx={{ justifyContent: "center" }} component={Paper}>
        Click to toggle chart/table
        <Table
          sx={{ width: 400, margin: "auto", padding: 10 }}
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="right">
                  <div
                    style={{
                      backgroundColor:
                        row.weight.value === 1
                          ? "#c8f0e4"
                          : row.weight.value === 2
                          ? "#6fd7b9"
                          : row.weight.value === 3
                          ? "#2da683"
                          : row.weight.value === -3
                          ? "#bb434c"
                          : row.weight.value === -2
                          ? "#F8797c"
                          : row.weight.value === -1
                          ? "#ffb09c"
                          : "#FFFFFF",
                      width: "75%",
                      padding: 2,
                      textAlign: "center",
                      borderRadius: "0.5rem"
                    }}
                  >
                    {row.weight.description}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div>{row.message}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

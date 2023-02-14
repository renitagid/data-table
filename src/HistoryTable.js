import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function HistoryTable({ row }) {
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
              <TableCell align="left">Days Ago</TableCell>
              <TableCell align="left">Pilytix Probability</TableCell>
              <TableCell align="left">Rep Probability</TableCell>
            </TableRow>
          </TableHead>

          {/* The rows are sorted with the most recent on top so the most relevant info is seen first. Background coloring is provided for a quick visual cue of the strength of the probability*/}

          <TableBody>
            {row
              ?.sort((a, b) => a.daysAgo - b.daysAgo)
              .map((row) => (
                <TableRow
                  key={row.oppId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.daysAgo}
                  </TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        backgroundColor:
                          row.pilytixProb < 0.2
                            ? "#b3e2ff"
                            : row.pilytixProb < 0.4
                            ? "#87d1ff"
                            : row.pilytixProb < 0.6
                            ? "#57beff"
                            : row.pilytixProb < 0.8
                            ? "#009dff"
                            : "#0078c2",
                        width: "50%",
                        padding: 2,
                        textAlign: "center",
                        borderRadius: "0.5rem"
                      }}
                    >
                      {row.pilytixProb}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        backgroundColor:
                          row.repProb < 0.2
                            ? "#b3e2ff"
                            : row.repProb < 0.4
                            ? "#87d1ff"
                            : row.repProb < 0.6
                            ? "#57beff"
                            : row.repProb < 0.8
                            ? "#009dff"
                            : "#0078c2",
                        width: "50%",
                        padding: 2,
                        textAlign: "center",
                        borderRadius: "0.5rem"
                      }}
                    >
                      {row.repProb}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

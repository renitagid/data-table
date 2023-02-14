import "./styles.css";
import BasicTable from "./Table";
import { createTheme, ThemeProvider } from "@mui/material";

// Theme is set in App.js for consistent font throughout

export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Jost", "sans-serif"].join(",")
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h2>PILYTIX Scored Opportunities</h2>
        <BasicTable></BasicTable>
      </div>
    </ThemeProvider>
  );
}

//  I testify that the work done on this take-home assignment is my own.
//  Due to working on this in small chunks throughout the weekend, I am not able to provide an exact time spent.
//  However, I would roughly estimate that I spent about 2 hours planning, researching, and reading documentation, and then about 6 hours of coding.
//  Signed, Renita Gidlund
// renita.gidlund@gmail.com

import "./App.css";
//import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";
//import { Snackbar, Alert } from "@material-ui/core";
import GlobalSnackbars from "./components/GlobalSnackbars";

function App() {
  // const [snackBar, setSnackbar] = useState({ open: false, msg: "", severity: "info" });
  // const { open, msg, severity } = snackBar;
  // const openSnackbar = (msg, severity = "info") => {
  //   setSnackbar({ open: true, msg, severity });
  // };
  // const closeSnackbar = () => {
  //   setSnackbar({ open: false, msg, severity });
  // };

  return (
    <div className="App">
      <GlobalSnackbars />
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={closeSnackbar}
        key={msg}
        autoHideDuration={6000}
      >
        <Alert onClose={closeSnackbar} severity={severity}>
          {msg}
        </Alert>
      </Snackbar> */}
      <Switch>
        {/* <Route path="/login">
          <Login openSnackbar={openSnackbar} />
        </Route> */}
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;

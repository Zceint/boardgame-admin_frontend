import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { DRAWER_WIDTH } from "../../config/constant";
import Clock from "../Clock";
import storageUtil from "../../util/storage";
import { withRouter } from "react-router-dom";

function Header(props) {
  const handleLogout = () => {
    if (window.confirm("Are you sure to log out?")) {
      storageUtil.removeUser();
      props.history.replace("/login");
    }
  };

  return (
    <Box>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }}>
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            BoardgameCo
          </Typography>
          <Clock />
          <Button
            color="inherit"
            size="large"
            onClick={handleLogout}
            sx={{ ml: 5, "&:hover": { backgroundColor: "secondary.dark" } }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default withRouter(Header);

import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Avatar, Typography } from "@material-ui/core";
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink, withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/styles";
import { DRAWER_WIDTH } from "../../config/constant";
import { theme } from "../../config/theme";
import storageUtil from "../../util/storage";

const user = storageUtil.getUser();
const useStyles = makeStyles({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
});

function LeftNav(props) {
  const classes = useStyles();
  const path = props.location.pathname;

  return (
    <Drawer variant="permanent" width={DRAWER_WIDTH} classes={{ paper: classes.drawerPaper }}>
      <Divider />
      <Avatar
        sx={{
          backgroundColor: theme.palette.secondary.main,
          m: 2,
          width: 80,
          height: 80,
          display: "flex",
          alignSelf: "center",
        }}
      >
        <PersonRoundedIcon sx={{ height: 60, width: 60 }} />
      </Avatar>
      <Typography variant="h6">{user.email}</Typography>

      <List>
        <ListItem button key="Home" component={NavLink} to="/" selected={path === "/"}>
          <ListItemIcon>
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Category" component={NavLink} to="/category" selected={path === "/category"}>
          <ListItemIcon>
            <CategoryRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>
        <ListItem button key="product" component={NavLink} to="/product" selected={path === "/product"}>
          <ListItemIcon>
            <StorefrontRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Product" />
        </ListItem>
        <ListItem button key="Dashboard" component={NavLink} to="/dashboard" selected={path === "/dashboard"}>
          <ListItemIcon>
            <DashboardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}

export default withRouter(LeftNav);

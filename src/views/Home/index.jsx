import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DRAWER_WIDTH, HEADER_HEIGHT } from "../../config/constant";
import Dashboard from "../Dashboard";
import Category from "../Category";
import Product from "../Product";
import storageUtil from "../../util/storage";
import Admin from "../Admin";

const useStyles = makeStyles({
  container: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    height: `calc(100% - ${HEADER_HEIGHT}px)`,
    marginTop: HEADER_HEIGHT,
    marginLeft: DRAWER_WIDTH,
    padding: 20,
  },
  content: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
});

export default function Home() {
  const classes = useStyles();
  return storageUtil.getUser() ? (
    <>
      <LeftNav />
      <Header />
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Switch>
            <Route path="/home" component={Admin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/category" component={Category} />
            <Route path="/product" component={Product} />
            <Redirect to="/home" />
          </Switch>
        </Box>
      </Box>
    </>
  ) : (
    <Redirect to="/login" />
  );
}

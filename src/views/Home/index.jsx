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

const useStyles = makeStyles({
  content: {
    backgroundColor: "white",
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    height: `calc(100% - ${HEADER_HEIGHT}px)`,
    marginTop: HEADER_HEIGHT,
    marginLeft: DRAWER_WIDTH,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <LeftNav />
      <Header />
      <Box className={classes.content}>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/category" component={Category} />
          <Route path="/product" component={Product} />
          <Redirect to="/" />
        </Switch>
      </Box>
    </>
  );
}

import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import AppContainer from "./AppContainer/AppContainer";
import AppNavbar from "./AppNavbar/AppNavbar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppNavbar />
        <AppContainer />
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(theme => ({
  "@global": {
    body: {
      margin: 0
    },
    "@font-face": {
      fontFamily: "'Roboto', sans-serif",
      src: "url('https://fonts.googleapis.com/css?family=Roboto')"
    }
  },
  root: {
    position: "fixed",
    width: "100%",
    height: "100%",
    userSelect: "none",
    fontFamily: '"Roboto", sans-serif',
    overflow: "hidden",
    borderRadius: 4,
    background: theme.palette.background,
    backgroundSize: "400% 400%",
    animation: "Gradient 15s ease infinite",
    display: "flex",
    flexDirection: "column"
  },
  "@keyframes Gradient": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  }
}))(App);
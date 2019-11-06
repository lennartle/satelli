/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { remote } from "electron";

import { withStyles } from "@material-ui/core/styles";

import Person from "@material-ui/icons/Settings";
import Close from "@material-ui/icons/Close";
import Minimize from "@material-ui/icons/Minimize";

import Button from "./NavbarButton";
import Settings from "./Settings";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = { isSettingsOpen: false };
  }

  render() {
    const { classes } = this.props;
    const { isSettingsOpen } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.navBar}>
          <Button
            style={isSettingsOpen ? { color: "white" } : {}}
            // onClick={() => this.setState({ isSettingsOpen: !isSettingsOpen })}
          >
            <Person style={{ marginRight: "5px" }} />
            Settings
          </Button>

          <div className={classes.dragRegion} />

          <Button
            onClick={() => {
              remote.getCurrentWindow().minimize();
            }}
          >
            <Minimize />
          </Button>

          <Button
            className={classes.closeBtn}
            onClick={() => {
              remote.getCurrentWindow().close();
            }}
          >
            <Close />
          </Button>
        </div>
        <Settings isOpen={isSettingsOpen} />
      </div>
    );
  }
}

AppNavbar.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(() => ({
  root: {},
  navBar: {
    display: "flex",
    alignItems: "center",
    zIndex: 5,
    position: "relative",
    boxShadow: "0px 5px 20px 0px #00000047"
  },
  dragRegion: {
    position: "relative",
    flexGrow: 1,
    height: 33,
    alignSelf: "flex-end",
    WebkitAppRegion: "drag"
  },
  closeBtn: {
    "&:hover": {
      background: "#ef5350"
    }
  }
}))(AppNavbar);

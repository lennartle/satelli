import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const NavbarButton = props => {
  const { classes, ...other } = props;

  return <Button classes={{ root: classes.root }} {...other} />;
};

NavbarButton.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(() => ({
  root: {
    transition: "200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    minWidth: "unset",
    borderRadius: "unset",
    textTransform: "unset",
    lineHeight: "unset",
    height: "36px",
    padding: "0px 10px",
    color: "#ffffff4d",
    background: "transparent",
    "&:hover": {
      color: "#ffffff",
      background: "#ffffff14"
    }
  }
}))(NavbarButton);

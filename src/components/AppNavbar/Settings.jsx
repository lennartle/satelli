import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";

import Card from "@material-ui/core/Card";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, isOpen } = this.props;

    return (
      <Collapse in={isOpen}>
        <Card elevation={0} className={classes.root}>
          Coming soon!
        </Card>
      </Collapse>
    );
  }
}

Settings.defaultProps = {
  isOpen: false
};

Settings.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool
};

export default withStyles(theme => ({
  root: {
    height: 200,
    width: 360,
    transition: "300ms",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: theme.palette.cardContent,
    margin: "auto",
    textAlign: "center",
    color: "#636363"
  }
}))(Settings);

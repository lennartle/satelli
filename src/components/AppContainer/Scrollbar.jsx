import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { Scrollbars } from "react-custom-scrollbars";

const styles = () => ({
  view: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  trackVertical: {
    top: 10,
    bottom: 10,
    right: 5,
    borderRadius: 3
  }
});

const Scrollbar = props => {
  const { classes, ...other } = props;

  return (
    <Scrollbars
      renderTrackVertical={p => (
        <div {...p} className={classes.trackVertical} />
      )}
      renderView={p => <div {...p} className={classes.view} />}
      autoHide
      {...other}
    />
  );
};

Scrollbar.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Scrollbar);

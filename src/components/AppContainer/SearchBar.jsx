import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "fit-content",
    height: "fit-content",
    transition: "250ms",
    margin: "8px auto"
  },
  searchIcon: {
    width: theme.spacing.unit * 7,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    fontFamily: "inherit"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 8,
    transition: theme.transitions.create("width"),
    width: 240,
    [theme.breakpoints.up("sm")]: {
      width: 240,
      "&:focus": {
        width: 400
      }
    },
    [theme.breakpoints.up("md")]: {
      width: 240,
      "&:focus": {
        width: 600
      }
    }
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  render() {
    const { classes, onSubmit } = this.props;

    const { value } = this.state;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onKeyDown={e => {
            if (e.key === "Enter") onSubmit(value);
          }}
          onChange={e => this.setState({ value: e.target.value })}
          placeholder="Search Torrents…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchBar);

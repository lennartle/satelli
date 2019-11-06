import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Header from "@material-ui/core/CardHeader";

import CardChip from "./CardChip";

const StyledHeader = withStyles(theme => ({
  root: {
    padding: "7px 10px",
    backgroundColor: theme.palette.cardHeader
  },
  title: {
    color: "rgba(255, 255, 255, 0.87)",
    fontSize: "1.3rem"
  },
  action: {
    marginTop: "unset",
    marginRight: "unset"
  }
}))(Header);

const CardHeader = props => {
  const { title, backgroundColor, size, seeds } = props;

  return (
    <StyledHeader
      style={backgroundColor ? { backgroundColor } : {}}
      title={title}
      action={<CardChip size={size} seeds={seeds} />}
    />
  );
};

CardHeader.defaultProps = {
  backgroundColor: undefined
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  size: PropTypes.string.isRequired,
  seeds: PropTypes.number.isRequired
};

export default CardHeader;

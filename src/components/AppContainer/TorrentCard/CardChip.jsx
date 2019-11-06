import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Person from "@material-ui/icons/Person";

import Chip from "@material-ui/core/Chip";

const StyledChip = withStyles(() => ({
  root: {
    marginLeft: "10px",
    height: "28px",
    borderRadius: "4px",
    backgroundColor: "#00000038",
    color: "#ffffffde"
  },
  icon: {
    color: "inherit",
    marginRight: "-6px"
  },
  label: {
    paddingLeft: 8,
    paddingRight: 8
  }
}))(Chip);

const CardChip = props => {
  const { size, seeds } = props;

  return (
    <div>
      <StyledChip label={size} />
      <StyledChip icon={<Person />} label={seeds} />
    </div>
  );
};

CardChip.propTypes = {
  size: PropTypes.string.isRequired,
  seeds: PropTypes.number.isRequired
};

export default CardChip;

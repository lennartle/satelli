import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {},
  tooltip: {
    background: theme.palette.vlc,
    opacity: 1
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent #f8992f transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `#f8992f transparent transparent transparent`
      }
    }
  },
  arrow: {
    position: "absolute",
    fontSize: 6,
    width: "3em",
    height: "3em",
    marginLeft: 27,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid"
    }
  },
  cardListitem: {
    color: theme.palette.cardText,
    padding: 10,
    backgroundColor: theme.palette.cardListItemBackground,
    "&:hover": {
      backgroundColor: theme.palette.cardListItemBackgroundHover
    },
    borderRadius: 5,
    margin: "5px 0",
    cursor: "pointer",
    transition: theme.transitions.create()
  }
});

class CardListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, name, onClick } = this.props;

    return (
      <Tooltip
        title={
          <React.Fragment>
            Open in VLC
            <span className={classes.arrow} />
          </React.Fragment>
        }
        classes={{ popper: classes.arrowPopper, tooltip: classes.tooltip }}
        style={{ top: "-10px" }}
      >
        <Typography
          noWrap
          onClick={() => onClick()}
          className={classes.cardListitem}
        >
          {name}
        </Typography>
      </Tooltip>
    );
  }
}

CardListItem.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(CardListItem);

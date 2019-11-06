import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import Magnet from "./Magnet.svg";

const styles = theme => {
  return {
    root: { background: theme.palette.cardActions },
    magnetButton: {
      textTransform: "unset",
      margin: "0 5px",
      minWidth: 46
    },
    magnetIcon: {
      height: 18,
      width: 18,
      fill: theme.palette.cardText
    },
    downloadButton: {
      marginLeft: "auto",
      textTransform: "unset",
      margin: "0 5px",
      color: theme.palette.cardText
    },
    vlcButton: {
      textTransform: "unset",
      margin: "0 5px",
      color: "white",
      background: "#00000047",
      "&:hover": {
        background: theme.palette.vlc
      }
    },
    vlcButtonActive: {
      background: theme.palette.vlc
    },
    tooltip: {
      margin: "15px 0"
    }
  };
};

const CardActons = props => {
  const { classes, onMagnet, onDownload, onVLC, vlcActive } = props;

  return (
    <CardActions className={classes.root} disableActionSpacing>
      <Tooltip title="Copy MagnetURI" classes={{ tooltip: classes.tooltip }}>
        <Button
          size="small"
          className={classes.magnetButton}
          onClick={() => onMagnet()}
        >
          <Magnet className={classes.magnetIcon} />
        </Button>
      </Tooltip>
      <Tooltip
        title="Open in torrent app"
        classes={{ tooltip: classes.tooltip }}
      >
        <Button
          size="small"
          className={classes.downloadButton}
          onClick={() => onDownload()}
        >
          Download
        </Button>
      </Tooltip>
      <Button
        size="small"
        className={vlcActive ? classes.vlcButtonActive : ""}
        classes={{ root: classes.vlcButton }}
        onClick={() => onVLC()}
      >
        {vlcActive ? "Close" : "VLC Stream"}
      </Button>
    </CardActions>
  );
};

CardActons.defaultProps = {
  vlcActive: false
};

CardActons.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onMagnet: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onVLC: PropTypes.func.isRequired,
  vlcActive: PropTypes.bool
};

export default withStyles(styles)(CardActons);

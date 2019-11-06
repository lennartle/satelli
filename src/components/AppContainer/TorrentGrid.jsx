import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

import TorrentCard from "./TorrentCard/TorrentCard";
import Scrollbar from "./Scrollbar";

const styles = theme => ({
  root: {
    display: "grid",
    position: "relative",
    padding: 17,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    gridGap: "15px",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
    }
  }
});

const trackerInfo = {
  "1337x": {
    title: "1337X"
  },
  ThePirateBay: {
    title: "The Pirate Bay"
  },
  Nnm: {
    title: "NNM"
  },
  Rutracker: {
    title: "Rutracker"
  }
};

const TorrentGrid = props => {
  const { classes, torrents } = props;

  return (
    <Scrollbar>
      <div className={classes.root}>
        {torrents.map(item => {
          if (item.seeds > 0) {
            const { title } = trackerInfo[item.tracker];

            return (
              <TorrentCard key={shortid.generate()} title={title} data={item} />
            );
          }

          return undefined;
        })}
      </div>
    </Scrollbar>
  );
};

TorrentGrid.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  torrents: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default withStyles(styles)(TorrentGrid);

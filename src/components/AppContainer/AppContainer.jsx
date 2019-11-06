import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";

import tg from "torrent-grabber";

import SearchBar from "./SearchBar";
import TorrentGrid from "./TorrentGrid";

const trackersToUse = [
  "1337x",
  "ThePirateBay",
  "Nnm"
  // ["Rutracker", { login: "LennartLence", pass: "f20o5r7g10e15t6" }]
];

const styles = theme => ({
  root: {
    color: "white",
    display: "grid",
    gridTemplateRows: "auto 1fr",
    height: "-webkit-fill-available"
  },
  searchPanel: {
    boxShadow: "0px 8px 5px #0000000d",
    transition: theme.transitions.create()
  },
  progressBarRoot: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: "-2px",
    height: "2px"
  },
  barColorPrimary: {
    backgroundColor: "#ffffff4f"
  },
  colorPrimary: { backgroundColor: "unset" }
});

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { torrents: [], searching: false };
  }

  componentDidMount() {
    Promise.all(trackersToUse.map(tracker => tg.activate(tracker)));
  }

  async handleSearch(query) {
    this.setState({ searching: true });

    const searchResult = await tg.search(query, {
      groupByTracker: false
    });

    this.setState({ torrents: searchResult, searching: false });
  }

  render() {
    const { classes } = this.props;
    const { torrents, searching } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.searchPanel}>
          <SearchBar onSubmit={v => this.handleSearch(v)} />

          <Fade in={searching} mountOnEnter unmountOnExit>
            <LinearProgress
              classes={{
                root: classes.progressBarRoot,
                barColorPrimary: classes.barColorPrimary,
                colorPrimary: classes.colorPrimary
              }}
            />
          </Fade>
        </div>

        <Slide direction="up" in={!searching} mountOnEnter unmountOnExit>
          <TorrentGrid torrents={torrents} />
        </Slide>
      </div>
    );
  }
}

AppContainer.defaultProps = {};

AppContainer.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(AppContainer);

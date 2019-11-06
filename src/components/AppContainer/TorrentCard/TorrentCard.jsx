/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { shell } from "electron";

import ts from "torrent-webserver";
import tg from "torrent-grabber";
import fs from "filesize";
import path from "path";
import copy from "copy-text-to-clipboard";

import vlcLoader from "../../../utils/vlcLoader";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";

import CardHeader from "./CardHeader";
import CardListItem from "./CardListItem";
import CardActons from "./CardActons";

const styles = theme => ({
  root: {},
  card: {
    transition: theme.transitions.create(),
    background: "transparent"
  },
  cardContent: {
    background: theme.palette.cardContent,
    textAlign: "center",
    "&:last-child": {
      paddingBottom: "16px"
    }
  },
  cardItemList: { background: theme.palette.cardActions },
  typography: {
    color: theme.palette.cardText
  },
  closeServerButton: {
    textTransform: "unset",
    margin: "0 5px",
    color: "white",
    background: "#00000047",
    "&:hover": {
      background: theme.palette.vlc
    }
  }
});

class TorrentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      fileData: [],
      sessionPort: null,
      hover: false,
      magnet: undefined
    };
  }

  async getMagnet() {
    const { magnet } = this.state;

    if (!magnet) {
      const { data } = this.props;

      const newMagnet = await tg.getMagnet(data);

      this.setState({ magnet: newMagnet });

      return newMagnet;
    }

    return magnet;
  }

  handleListItem(id) {
    const { sessionPort, fileData } = this.state;

    vlcLoader(`http://localhost:${sessionPort}/${fileData[id].fileIndex}`);
  }

  async handleDownload() {
    const magnet = await this.getMagnet();

    shell.openExternal(magnet);
  }

  async handleCopyMagnet() {
    const magnet = await this.getMagnet();

    copy(magnet);
  }

  async handleVLCStream() {
    const { active } = this.state;

    const magnet = await this.getMagnet();

    if (!active) {
      this.setState({ active: true });

      ts.newTorrent(magnet)
        .then(t => {
          const torrent = t;

          torrent.onMetadata = () => {
            this.setState({ fileData: torrent.files });
          };

          torrent.onVerifying = () => {};

          torrent.onReady = sessionPort => {
            this.setState({ sessionPort });
          };
        })
        .catch(() => {
          this.setState({ active: !active });

          ts.removeTorrent(magnet);
        });
    } else {
      this.setState({ active: !active, fileData: [], sessionPort: null });

      ts.removeTorrent(magnet);
    }
  }

  render() {
    const { title, data, classes, backgroundColor } = this.props;
    const { active, fileData, hover, sessionPort } = this.state;

    try {
      return (
        <div className={classes.root}>
          <Card
            className={classes.card}
            elevation={active ? 14 : 2}
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
          >
            <CardHeader
              title={title}
              backgroundColor={backgroundColor}
              seeds={data.seeds}
              size={fs(data.size)}
            />
            <CardContent className={classes.cardContent}>
              <Typography className={classes.typography}>
                {data.title}
              </Typography>
            </CardContent>
            <Collapse in={hover} unmountOnExit>
              <CardActons
                onDownload={() => this.handleDownload()}
                onMagnet={() => this.handleCopyMagnet()}
                onVLC={() => this.handleVLCStream()}
                vlcActive={active}
              />
            </Collapse>
            <Collapse in={active} unmountOnExit>
              <Divider />
              <CardContent
                className={classes.cardItemList}
                classes={{
                  root: classes.cardContent
                }}
              >
                {sessionPort ? (
                  <div>
                    {fileData.map((item, key) => (
                      <CardListItem
                        name={path.basename(item.filePath)}
                        onClick={() => this.handleListItem(key)}
                      />
                    ))}
                  </div>
                ) : (
                  <div>
                    <LinearProgress />
                    {active ? (
                      <Typography
                        style={{ color: "rgba(0, 0, 0, 0.6)", padding: "15px" }}
                      >
                        Getting info...
                      </Typography>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </div>
      );
    } catch (error) {
      return null;
    }
  }
}

TorrentCard.defaultProps = {
  title: "Tracker",
  backgroundColor: undefined
};

TorrentCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  data: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(TorrentCard);

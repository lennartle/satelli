/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer, setConfig } from "react-hot-loader";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import App from "./components/App";

setConfig({
  showReactDomPatchNotification: false
});

const blackTheme = createMuiTheme({
  palette: {
    vlc: "#ff9447",
    background: "#525252",
    cardHeader: "#0000004d",
    cardContent: "#5f5f5f",
    cardActions: "#545454",
    cardText: "#ffffff80",
    cardListItemBackground: "#0000001c",
    cardListItemBackgroundHover: "#3131318f"
  },
  typography: {
    useNextVariants: true
  }
});

const defaultTheme = createMuiTheme({
  palette: {
    vlc: "#ff9447",
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    cardHeader: "#0000004d",
    cardContent: "white",
    cardActions: "#ffffffdb",
    cardText: "#00000099",
    cardListItemBackground: "#5f5f5f26",
    cardListItemBackgroundHover: "#5f5f5f61"
  },
  typography: {
    useNextVariants: true
  }
});

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider theme={defaultTheme}>
        <Component />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./components/App", () => {
    // eslint-disable-next-line global-require
    render(require("./components/App").default);
  });
}

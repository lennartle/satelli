/* eslint-disable*/

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 540,
    height: 740,
    minWidth: 400,
    minHeight: 300,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
    // resizable: false,
    // backgroundColor: "#000000"
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    if (isDev) {
      mainWindow.openDevTools();

      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
        REDUX_DEVTOOLS
      } = require("electron-devtools-installer");

      installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
        .then(name => console.log(`Added Extension:  ${name}`))
        .catch(err => console.log("An error occurred: ", err));
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

import regedit from "regedit";
import { spawn } from "child_process";
import path from "path";
import { remote } from "electron";

const regKeys = [
  "HKLM\\SOFTWARE\\Wow6432Node\\VideoLAN\\VLC",
  "HKLM\\SOFTWARE\\VideoLAN\\VLC"
];

let vlcPath;

const getRegPath = keys => {
  return new Promise(resolve => {
    let i = 0;

    const p = key => {
      regedit.list(keys[key], (err, result) => {
        if (err) {
          i = +1;
          p(i);
        }

        resolve(result[keys[key]].values[""].value);
      });
    };

    p(i);
  });
};

const vlcLoader = async link => {
  if (!vlcPath) {
    regedit.setExternalVBSLocation(
      path.join(path.dirname(remote.app.getPath("exe")), "./resources/app.asar.unpacked/src/vbs")
    );

    vlcPath = await getRegPath(regKeys);
  }

  spawn(vlcPath, [link]);
};

export default vlcLoader;

/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const WebSocket = require('ws')

function print(...args: any[]) {
  log.warn(...args);
  // console.log(...args);
}

console.log()

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  log.warn("Running createWindow() method");
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'resources')
    : path.join(__dirname, '../resources');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

app.on('ready', () => {

  function start_python_server() {
    let backendDistPath = process.env.NODE_ENV === 'production' ?
    path.join(process.resourcesPath, 'sotcat_backend_dist') : path.join(__dirname, '..', 'sotcat_backend_dist');

    // let fullPath = path.join(__dirname, '..',  'sotcat_backend_dist');
    print("Looking for packaged backend at: ", backendDistPath);
    let backendIsPackaged = require('fs').existsSync(backendDistPath);

    if (!backendIsPackaged) {
      print("No packaged backend detected, attempting to run python backend server");

      var subpy = require('child_process').spawn('python', ['./src/sotcat_backend/server.py'])

      subpy.stdout.on('data', (data: any) => {
        print(data.toString());
      });

      process.on('exit', () => subpy.kill());

    } else {
      print("Running packaged backend server");

      let scriptPath = path.join(backendDistPath, 'server', 'server.exe');
      print('Executing script: ', scriptPath);
      var subpy = require('child_process').exec(scriptPath);

      subpy.stdout.setEncoding('utf8')
      subpy.stdout.on('data', function(data: any) {
        print(data.toString());
      });

      process.on('exit', () => subpy.kill());
    }
  }

  let pythonWS = new WebSocket('ws://localhost:8001');

  function connect_to_python_ws() {

    // delay to let python server start
    setTimeout(() => {
      pythonWS = new WebSocket('ws://localhost:8001');

      // delay to let websocket connect
      setTimeout(() => {
        if (pythonWS.readyState != WebSocket.CONNECTED) {
          print('Error: failed to connect to Python websocket in 5s');
        }
      }, 0.1)
    }, 5);
  }


  setTimeout(() => {
    if (pythonWS.readyState != WebSocket.CONNECTED) {
      print('python WS in state: ', pythonWS.readyState);
      print('no Python server detected after 0.1 seconds, starting one...');

      start_python_server();
      connect_to_python_ws();
    } else {
      print('Existing Python server detected.');
    }
  }, 0.1);

  pythonWS.on('message', (msg: string) => {
    print('[Python] ', msg);
  });

})

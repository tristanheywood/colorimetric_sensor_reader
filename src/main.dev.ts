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
import { ChildProcess } from 'child_process';

const WebSocket = require('ws');

function print(...args: any[]) {
  log.warn(...args);
  // console.log(...args);
}


class NodeServer {

  pythonWS?: WebSocket
  pythonServerPID?: number
  pythonServerProcess?: ChildProcess

  _sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  init_pythonWS() {
    this.pythonWS = new WebSocket('ws://0.0.0.0:8001');
    print('Opening pythonWS client websocket');

    this.pythonWS!.onerror = (error) => {
      print('pythonWS error:', error);
    };

    this.pythonWS!.onmessage = (msg) => {
      print('[Python] ', msg.data);
    }
  }

  async python_ws_is_connected() {
    await this._sleep(1000);
    print('python WS in state: ', this.pythonWS!.readyState);

    if (this.pythonWS!.readyState == WebSocket.OPEN) {
      print('Python WS connected');
      return true;
    }
    print('Python WS not connected');
    return false;
  }

  async start_python_server() {
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
      print('Starting EXE: ', scriptPath);
      // var subpy = require('child_process').exec(scriptPath);
      var subpy = require('child_process').spawn(scriptPath);
      this.pythonServerPID = subpy.pid;
      this.pythonServerProcess = subpy;

      subpy.stdout.setEncoding('utf8')
      subpy.stdout.on('data', function(data: any) {
        print(data.toString());
      });

      process.on('exit', () => subpy.kill());
    }
  }

  async init_python_server() {

    this.init_pythonWS();

    if (! await this.python_ws_is_connected()) {
      print('Python server not detected, starting one...');
      await this.start_python_server();
      await this._sleep(5000);
      this.init_pythonWS();
      if (! await this.python_ws_is_connected()) {
        print('Failed to connect to python WS');
      }
    } else {
      print('Existing Python server found, using');
    }
  }

  maybe_kill_python_server() {
    if (this.pythonServerPID != undefined) {
      print("Attempting to kill python server process with PID:", this.pythonServerPID);
      this.pythonServerProcess?.kill();
      let subKill = require('child_process').spawn("taskkill", ["/pid", this.pythonServerPID, '/T', '/F']);
      // print(subKill);
      subKill.stdout.on('data', (data: any) => {
        print("subKill: ", data)
      });
    }
  }
}

var nodeServer = new NodeServer();

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
    nodeServer.maybe_kill_python_server();
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

  print('Ensuring Python server is running');
  nodeServer.init_python_server();

})

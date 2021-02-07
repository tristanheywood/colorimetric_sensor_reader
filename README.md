# Colorimetric Sensor Reader

A GUI application to read, and compute statistics from, colorimetric sensors. Developed to support a PhD project on inexpensive cancer detection through analysis of certain compounds in exhaled breath - using a colorimetric sensor.

*Built from HTML/CSS, Typescript, React, Electron and Node, using the template: https://github.com/electron-react-boilerplate/electron-react-boilerplate*

***
**Download:** https://github.com/tristanheywood/colorimetric_sensor_reader/releases/download/v1.0.0/Colorimetric.Sensor.Reader.Setup.1.0.0.exe
***

## Running the prebuilt .exe

Windows Defender may block the exe from running. Open "Windows Security" and go to "Virus & threat protection". Under protection history find "Threat removed" or "Threat blocked", with the affected item listed as `C:\Users\YourName\AppData\Local\Programs\electron-react-boilerplate\resources\sotcat_backend_dist\server\server.exe`. Allow this exe to run.

## Build and Run

### Install

```
pip install -r src/sotcat_backend/requirements.txt
yarn
```

### Protobuf install

Install chocolately

```
choco install protoc
conda install protobuf
```

### Run in dev mode

```
yarn start
```

### Build and run release mode

Run `build_python_dist.ps1` to freeze the Python backend into a standalone executable.

Run `build_release.ps1` to create the exe in the `release` folder. This executable will run the Reader without needing to install any other dependencies.

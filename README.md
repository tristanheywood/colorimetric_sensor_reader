# Colorimetric Sensor Reader

A GUI application to read, and compute statistics from, colorimetric sensors. Developed to support a PhD project on inexpensive cancer detection through analysis of certain compounds in exhaled breath - using a colorimetric sensor.

*Built from HTML/CSS, Typescript, React, Electron and Node, using the template: https://github.com/electron-react-boilerplate/electron-react-boilerplate*

![Colorimetric Sensor Reader - Animated Demo](media/demo_image_2.png)
***
**Download:** https://github.com/tristanheywood/colorimetric_sensor_reader/releases/download/v1.0.0/Colorimetric.Sensor.Reader.Setup.1.0.0.exe
***

## Note: Antivirus Software

This application uses [PyInstaller](https://www.pyinstaller.org/) to build a standalone .exe file. This can offten trigger antivirus false positives. This is a known issue: 
https://github.com/pyinstaller/pyinstaller/issues/603. 

If this happens you will need to manually allow the application to run:

### Windows Defender:

Open "Windows Security" and go to "Virus & threat protection". Under protection history find "Threat removed" or "Threat blocked", with the affected item listed as `C:\Users\<YourName>\AppData\Local\Programs\colorimetric-sensor-reader\resources\sotcat_backend_dist\server\server.exe`. Allow this exe to run.

If you are uncomfortable allowing this app past your antivirus software, you can always run it from the source code (see below)

## Build and Run

### Install

Install Python 3.8 and Node.js 15.5, then:

```
pip install -r src/sotcat_backend/requirements.txt
npm install --global yarn
yarn
```

### Install Protobuf

Install [Chocolately](https://chocolatey.org/install) then:

```
choco install protoc
conda install protobuf
```

### Run the app from source:

```
python .\src\sotcat_backend\server.py
yarn start
```

### Build the standalone .exe release

Run `build_python_dist.ps1` to freeze the Python backend into a standalone executable.

Run `build_release.ps1` to create the exe in the `release` folder. This executable will run the Reader without needing to install any other dependencies.

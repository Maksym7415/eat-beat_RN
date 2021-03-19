# Description

Eat beat  mobile app

[Expo official documentation](https://docs.expo.io/)



##ATTENTION ACCESS FOR THE EXPO
*user*: yakmoon
*password*: 8VFpYVXTmwK4rwM


#Run backend
Open consol where will be backend

    git clone https://gitlab.telesens.ua/MPopov/eat-beat

    git checkout develop

# Dependencies

* [Android studio](https://developer.android.com/studio)

  If you are not already using Hyper-V: Performance (Intel ® HAXM) ([See here for AMD or Hyper-V](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html))
* [PowerShell](https://docs.microsoft.com/ru-ru/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-7.1)


Install [chocolate](https://chocolatey.org/install) using PowerShell:

    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

Install [nodejs](https://nodejs.org/en/) and [java](https://www.java.com/en/) using chocolate and PowerShell:

    choco install -y nodejs.install openjdk8

Install [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
```
npm install --global yarn
```



make steps from the  file *Readme.dev.md*
#Setup emulator
*   android studio open

    **File>Settings**
* Then choose

  **Appearance & Behavior> System Settings> Android SDK**
* Tab **SDK Tools**

  Checkbox **Intel 86 Emulator Accelerator (HAXM installer)**

* AWD manager

    *   Press **+ Create Virtual Device**

    *   Choose **Phone** and Pixel 4 APi 29 and press button **Next**
  
    *   On the step **Select a system image** choose **Release Name** = **Q** and press button **Next**

    *   On the step **Verify Configuration** uncheck **Device Frame** and press button **Finish**

# Check Dependencies
  ```
  choco -v
  ```

* Check emulator

  ```
   adb -v
  ```
* Check emulator

  ```
   yarn --version
  ```

* check available emulator devices

  ```
  adb devices
  ```


# Running app
* in root folder
    
    
    npm i 
    npm run  start

open 
http://localhost:19002/

Then make settings: 
* connection choose *local*

* *run android on Android device/emulator*

# Build android apk
* make sure you have installed `expo-cli` globally

```npm i expo-cli -g```

* make sure you have `url.js` file in the project's root folder (ignored by git)

url.js content:
```
export const baseURL = "http://52.72.42.64:8081/";
```
* start Android build:
```
expo login
expo build:android --release-channel <build version>
npm run build:expo
```

* open in browser link, displayed by `npm run build:expo` command

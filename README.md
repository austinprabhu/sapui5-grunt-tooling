## SAPUI5 Grunt Tooling

This grunt script makes running SAP UI5 application ( with gateway backend ) very easy. Script was created to address following issues. 

1. CORS issues (when connecting to backend odata service)
2. Downloading UI5 library to local system 
3. UI5 version differences (between development system and gateway backend)
4. Run UI5 applications deployed in gateway in local system without changing ui5 bootstrap

This script uses sapui5 cdn for UI5 libraries and provide options to change UI5 version used in development. Also provides easy way to setup proxies so that application can be tested with backend service without CORS errors.

### How to run the demo

clone the repo 

```
git clone https://github.com/austinprabhu/sapui5-grunt-tooling
```

Run npm install to install the dependencies. Run build command to to start the webserver.

```
cd sapui5-grunt-tooling
npm install
npm run serve
```

Open [http://localhost:3000](http://localhost:3000) in browser

### How to use in your application

copy/migrate package.json, .env and gruntfile.js from repo into your application. 

Following parameters can be modified in .env

Modify host/port/htts settings to match your backend gateway server 
```
ODATA_HOST = 'services.odata.org'
ODATA_PORT = '443'
ODATA_HTTPS = true

```

Modify UI5 Version parameter to match your gateway server UI5 version
```
UI5_HOST = 'sapui5.hana.ondemand.com'
UI5_PORT = '443'
UI5_HTTPS = true;
UI5_VERSION = '1.52.9'

```


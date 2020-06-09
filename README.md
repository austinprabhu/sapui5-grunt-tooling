## SAPUI5 Grunt Tooling

This grunt script makes running SAP UI5 application ( with gateway backend ) very easy. Script was created to address following issues. 

1. CORS issues (when connecting to backend odata service)
2. Downloading UI5 library to local system 
3. UI5 version differences (between development system and gateway backend)

This script uses sapui5 cdn for UI5 libraries and provide options to change UI5 version used in development. Also provides easy way to setup proxies so that application can be tested with backend service without CORS errors.

### How to run the demo

clone the repo 

```
git clone https://github.com/austinprabhu/sapui5-grunt-tooling
```

Run npm install to install the dependencies. Run build command to to start the webserver.

```
npm install
npm run serve
```

Open [http://localhost:3000](http://localhost:3000) in browser

### How to use in your application

copy package.json and gruntfile.js from repo into your application. 

Following parameters can be modified in gruntfile.js

Modify host/port/htts settings to match your backend gateway server 
```
odataProxy: {
				host: 'services.odata.org',
				port: '443',
				https: true
```

Modify UI5 Version parameter to match your gateway server UI5 version
```
ui5Proxy: {
				host: 'sapui5.hana.ondemand.com',
				port: '443',
				https: true,
				ui5Version: '1.52.9'
```


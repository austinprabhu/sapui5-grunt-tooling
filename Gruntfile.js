module.exports = function (grunt) {
	'use strict';

	//load env config
	require('dotenv').config();
	//get values - assign defaults
	var LOCAL_PORT = process.env.LOCAL_PORT || '3000';
	var ODATA_HOST = process.env.ODATA_HOST || 'services.odata.org';
	var ODATA_PORT = process.env.ODATA_PORT || '443';
	var ODATA_HTTPS = process.env.ODATA_HTTPS || true;
	var UI5_HOST = process.env.UI5_HOST || 'sapui5.hana.ondemand.com'
	var UI5_PORT = process.env.UI5_PORT || '443'
	var UI5_HTTPS = process.env.UI5_HTTPS || true;
 	var UI5_VERSION = process.env.UI5_VERSION || '1.52.9'

	// load grunt plugins
	require('jit-grunt')(grunt, {
		configureProxies: 'grunt-connect-proxy'
	});

	// create config
	grunt.initConfig({

		settings: {
			connect: {
				host: 'localhost',
				port: LOCAL_PORT
			},
			callback: {
				host: '127.0.0.1',
				port: '80'
			},
			odataProxy: {
				host: ODATA_HOST,
				port: ODATA_PORT,
				https: ODATA_HTTPS

			},
			ui5Proxy: {
				host: UI5_HOST,
				port: UI5_PORT,
				https: UI5_HTTPS,
				ui5Version: UI5_VERSION
				//ui5Version: '1.58.7'
			}
		},

		connect: {
			options: {

				livereload: 35729,
				middleware: function (connect, options, defaultMiddleware) {
					var aMiddlewares = [];
					aMiddlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);
					aMiddlewares.push(defaultMiddleware);
					return aMiddlewares;
				}
			},
			connectWebapp: {
				options: {
					hostname: '<%= settings.connect.host %>',
					port: '<%= settings.connect.port %>',
					base: ['webapp'],
					open: false
				}
			},
			proxies: [{
				context: '/resources',
				host: '<%= settings.ui5Proxy.host %>',
				port: '<%= settings.ui5Proxy.port %>',
				https: '<%= settings.ui5Proxy.https %>',
				rewrite: {
					'/resources': '/<%= settings.ui5Proxy.ui5Version %>/resources'
				}
			}, {
				context: '/test-resources',
				host: '<%= settings.ui5Proxy.host %>',
				port: '<%= settings.ui5Proxy.port %>',
				https: '<%= settings.ui5Proxy.https %>',
				rewrite: {
					'/test-resources': '/<%= settings.ui5Proxy.ui5Version %>/test-resources'
				}
			}, {
				context: ['/sap/opu/odata','/V2'],
				host: '<%= settings.odataProxy.host %>',
				port: '<%= settings.odataProxy.port %>',
				rewrite: {
					'^.*(metadata).*$': '$&\&saml2=disabled'
				},
				https: '<%= settings.odataProxy.https %>'
			}]
		},

		watch: {
			options: {
				livereload: true
			},
			watchWebapp: {
				files: ['webapp/**/*']
			}
		}
	});

	// register serve task
	grunt.registerTask('serve', ['configureProxies:server', 'connect:connectWebapp' , 'watch:watchWebapp']);

	// register default task
	grunt.registerTask('default', ['serve']);
};
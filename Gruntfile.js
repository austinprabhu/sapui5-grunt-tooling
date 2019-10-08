module.exports = function (grunt) {
	'use strict';

	// load grunt plugins
	require('jit-grunt')(grunt, {
		configureProxies: 'grunt-connect-proxy'
	});

	// create config
	grunt.initConfig({

		settings: {
			connect: {
				host: 'localhost',
				port: '3000'
			},
			callback: {
				host: '127.0.0.1',
				port: '80'
			},
			odataProxy: {
				host: 'services.odata.org',
				port: '443',
				https: true

			},
			ui5Proxy: {
				host: 'sapui5.hana.ondemand.com',
				port: '443',
				https: true,
				ui5Version: '1.52.9'
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
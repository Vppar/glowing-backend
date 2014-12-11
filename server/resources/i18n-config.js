//=============================================================================
// I18N CONFIGURATION
//=============================================================================
'use strict';

var prop = require('app-config');
var i18n = require('i18n');
var i18nConfig = {};

/**
 * Configure application resource bundles.
 * @param app - Express instance initialized.
 */
i18nConfig.init = function(app) {

	if (!app) {
		throw (prop.config.message.routes.missing_application);
	}

	i18n.configure({
		//Setup some locales
		locales: prop.config.i18n.locales,
		//Define default locale
		defaultLocale: prop.config.i18n.defaultLocale,
		//Define where to store json files
		directory: prop.config.i18n.directory,
		//Wwhether to write new locale information to disk
		updateFiles: prop.config.i18n.updateFiles,
		//What to use as the indentation unit
		indent: '\t',
		// setting extension of json files
		extension: '.json'
	});

	app.use(i18n.init);
};

module.exports = i18nConfig;
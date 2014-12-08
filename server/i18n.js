//=============================================================================
// I18N CONFIGURATION
//=============================================================================
'use strict';
var prop = require('app-config');
var i18n = require('i18n');
var i18nConfig = {};

i18nConfig.config = function() {
    i18n.configure({      
      locales:prop.config.i18n.locales,
      defaultLocale: prop.config.i18n.defaultLocale,
      directory: prop.config.i18n.directory,
      updateFiles: prop.config.i18n.updateFiles
    });
};


i18nConfig.init = function(app) {

  if (!app) {
     throw(prop.config.message.routes.missing_application);
  }

  app.use(i18n.init);

};

module.exports = i18nConfig;
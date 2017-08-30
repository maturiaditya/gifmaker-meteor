Package.describe({
  name: 'meteor-gifmaker',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Create gif from images',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');
    api.addFiles('client/save_file.js', 'client');
    api.addFiles('client/gifmaker.js', 'client');
    api.addFiles('.npm/package/node_modules/gifshot/build/gifshot.js');
});


Npm.depends({
  gifshot: '0.3.2'
});
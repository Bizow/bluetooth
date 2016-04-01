Package.describe({
    name: 'cordova-plugin-bluetoothle',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('mongo');
    api.use('templating');
    api.use('reactive-var');

    api.addFiles('server.js', 'server');

    api.addFiles('shared.js');

    api.addFiles('styles.css', 'client');

    api.addFiles('console.html', 'client');
    api.addFiles('console.js', 'client');

    api.addFiles('service.html', 'client');
    api.addFiles('service.js', 'client');

    api.addFiles('index.html', 'client');
    api.addFiles('client.js', 'client');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('cordova-plugin-bluetoothle');
    api.addFiles('cordova-plugin-bluetoothle-tests.js');
});

Npm.depends({

});

Cordova.depends({
    //"uk.co.workingedge.phonegap.plugin.LaunchNavigator":"https://github.com/dpa99c/phonegap-launch-navigator/tarball/2ecef4bf70d028554a9da75f5646eb3accb30c6f"
    //"cordova-plugin-bluetooth-serial": "0.4.5"
    //"cordova-plugin-bluetoothle-improvisio": "3.2.0"
    //"cordova-plugin-bluetoothle": "3.1.0"             //bluetooth crash
    //"com.randdusing.bluetoothle":"2.1.2"              //depricated
    "cordova-plugin-ble-central": "1.0.4"
});

'use strict';
var packager = require('electron-packager');
var options = {
  // 'arch': 'x64',
  // 'all': true,
  'platform': 'win32',
  'dir': './dist',
  'app-copyright': 'Alan Panayotov',
  'app-version': '0.0.1',
  'asar': true,
  'icon': './app.ico',
  'name': 'SpotifyClient',
  'out': './releases',
  'overwrite': true,
  'prune': true,
  'version': '1.3.4',
  'win32metadata': {
    'CompanyName': 'Alan Panayotov',
    'FileDescription': 'Spotify Client', /*This is what display windows on task manager, shortcut and process*/
    'OriginalFilename': 'SpotifyClient',
    'ProductName': 'Spotify Client',
    'InternalName': 'SpotifyClient'
  }
};
packager(options, function done_callback(err, appPaths) {
  console.log("Error: ", err);
  console.log("appPaths: ", appPaths);
});
#!/usr/bin/env node

// Original : https://blog.nraboy.com/2015/01/hooks-apache-cordova-mobile-applications/
// Modified by Gavin Pickin - 05/09/15
// Updated for AFTER UPDATE cleanup

var fs = require('fs');
var path = require('path');
var rmdir = require('../../www/node_modules/rimraf');
 
var foldersToProcess = [
    "platforms"
];

console.log('-----------------------------------------'); 
console.log('Cordova AFTER BUILD Cleanup Starting');
 
foldersToProcess.forEach(function(folder) {
    processFiles(folder);
});

function processFiles(dir) {
    fs.readdir(dir, function(err, list) {
        if(err) {
            console.log('processFiles err: ' + err);
            return;
        }
        list.forEach(function(file) {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if(!stat.isDirectory()) {
                    switch(path.basename(file)) {
                        case ".DS_Store":
                            fs.unlink(file, function(error) {
                                console.log("Removed file " + file);
                            });
                            break;
                        case "Thumbs.db":
                            fs.unlink(file, function(error) {
                                console.log("Removed file " + file);
                            });
                            break;
                        default:
                            //console.log("Skipping file " + file);
                            break;
                    }
                }
                else {
                    if ( path.basename(file) === 'node_modules' ){
                    		rmdir( file, function( error ){} );
                    		console.log("Removed file " + file);
                    }
                    else {
                    		processFiles( file );
                    }
                }
            });
        });
    });
}
/*
 *Library for storing and editing data
 *
 */

// Dependencies
const { open, writeFile, close } = require('fs');
const { join } = require('path');

// Container for the module
const lib = {};

// Base path to the data folder
lib.baseDir = join(__dirname, '/../.data/');

// Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing
  open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Convert the data to a string
      const stringData = JSON.stringify(data);

      // Write to the file and close it
      writeFile(fileDescriptor, stringData, err => {
        if (!err) {
          // Closing the file
          close(fileDescriptor, err => {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing the file!');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

// Exporting the module
module.exports = lib;

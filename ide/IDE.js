/**
 * Base class for IDE projects to implement.
 *
 * @param name
 * @constructor
 */
'use strict';
/* jshint unused:false*/
/* globals console, cp, mkdir, process */

var fs       = require('fs'),
    pathNode = require('path');

function IDE(name) {
  this.name = name;
  this.templateSource = 'template';
  this.executable = null;
}

IDE.prototype = {
  constructor  : IDE,
  createContext: function (custom) {
  },
  open         : function (location) {
  },
  createProject: function (destination, context) {
  },
  validatePath : function (path, errorMessage) {
    errorMessage = errorMessage || 'Error "' + path + '" is not a valid path.';

    // Nodejs does not understand HOME alias like the shell.
    var pathPieces = pathNode.normalize(path).split(pathNode.sep);
    if (pathPieces[0] === '~') pathPieces[0] = process.env.HOME || process.env.USERPROFILE;
    path = pathNode.join(pathPieces.join(pathNode.sep));

    var valid = !(typeof path === 'undefined' || !fs.existsSync(path));

    if (!valid)
      console.error(errorMessage);

    return valid;
  }
};

module.exports = IDE;
"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var Logger = function (msg) {
    if (process.env.APP_DEBUG) {
        console.log(msg);
    }
};
exports.Logger = Logger;

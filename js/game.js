(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.game = mod.exports;
    }
})(this, function () {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    // A small game writted in JavaScript

    // Canvas element
    var canvas = document.getElementById("game");

    // Class for the PlayArea

    var Area = function Area() {
        _classCallCheck(this, Area);
    };

    // Start the game
    var game = new Area();
});
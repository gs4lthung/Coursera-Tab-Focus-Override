// ==UserScript==
// @name         Coursera Tab Focus Override
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Prevent Coursera from pausing videos when tab is inactive
// @match        *://*.coursera.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Object.defineProperty(document, 'visibilityState', {
        get: function() {
            return 'visible';
        },
        configurable: true
    });

    Object.defineProperty(document, 'hidden', {
        get: function() {
            return false;
        },
        configurable: true
    });

    window.addEventListener('visibilitychange', function(e) {
        e.stopImmediatePropagation();
    }, true);

    window.addEventListener('blur', function(e) {
        e.stopImmediatePropagation();
    }, true);

    document.hasFocus = function() {
        return true;
    };

    const originalRaf = window.requestAnimationFrame;
    window.requestAnimationFrame = function(callback) {
        return originalRaf(function(timestamp) {
            try {
                callback(timestamp);
            } catch (e) {
                console.error('requestAnimationFrame callback error:', e);
            }
        });
    };

    console.log('[Tampermonkey] Coursera tab visibility overrides active.');
})();

# 🛠️ Coursera Tab Focus Override (Tampermonkey Script)

This Tampermonkey user script prevents Coursera from automatically pausing videos when the browser tab loses focus. Ideal for multitasking or taking notes in another window.

## 📌 Features

- Fakes `document.visibilityState` and `document.hidden`
- Blocks `visibilitychange` and `blur` events
- Overrides `document.hasFocus()` to always return `true`
- Helps keep videos playing even when you switch tabs

## ⚙️ Requirements

- [Tampermonkey](https://www.tampermonkey.net/) installed on your browser (Chrome, Firefox, Edge, Brave, etc.)

## 🚀 Installation

1. Install Tampermonkey from your browser's extension store.
2. Click the Tampermonkey icon and choose **"Create a new script"**.
3. Replace the default code with the contents of [`coursera-tab-focus-override.user.js`](./coursera-tab-focus-override.user.js).
4. Save the script.
5. Open [Coursera](https://www.coursera.org), play a video, and try switching tabs — it should continue playing.

## 💻 Script Code

```javascript
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

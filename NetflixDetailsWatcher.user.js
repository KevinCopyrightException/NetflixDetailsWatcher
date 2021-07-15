// ==UserScript==
// @name         Netflix Details Watcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  
// @author       KG
// @match        https://www.netflix.com/*
// @icon         
// @grant        
// ==/UserScript==

(function() {
    'use strict';

    let vids = document.getElementsByClassName("slider-item");

    console.log(vids);

    for (let vid of vids) {
        console.log(vid);
    }
})();
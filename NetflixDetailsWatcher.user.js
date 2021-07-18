// ==UserScript==
// @name         Netflix Details Watcher
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description
// @author       KG
// @match        https://www.netflix.com/*
// @icon
// @grant
// ==/UserScript==

(function() {
    'use strict';

    function addListeners(){
        let btns = document.getElementsByTagName("button");
        let slideItems = document.getElementsByClassName("slider-item");

        for (let btn of btns) {

            if (btn.dataset.uia === "billboard-more-info"){
                btn.onclick = (ev) => {
                    setTimeout(() => {createInfoButtons();}, 1200);
                };
            }
        }

        for (let slideItem of slideItems) {

            slideItem.onmouseover = (ev) => {
                setTimeout(() => {
                    let expandButton = document.querySelector("[data-uia='expand-to-detail-button']");
                    console.log(expandButton);
                    if (expandButton){
                        expandButton.onclick = (ev) => {
                            setTimeout(() => {createInfoButtons();}, 1200);
                        };
                    }
                }, 800);
            };
        }
    }

    function createInfoButtons(){
        let titleCards = document.getElementsByClassName("titleCard--container");

        for (let titleCard of titleCards){
            let trackContent = titleCard.querySelector(".ptrack-content");
            let metaDataContainer = titleCard.querySelector(".titleCard--metadataWrapper");
            let closeItems = document.querySelectorAll(".previewModal-close, .previewModal--backDrop");

            for (let closeItem of closeItems){
                closeItem.onclick = () => {
                    setTimeout(() => {addListeners();}, 500);
                };
            }

            let contentString = trackContent.dataset.uiTrackingContext;
            let decodedContentString = decodeURI(contentString);
            let parsedContentString = JSON.parse(decodedContentString);

            let infoBtn = document.createElement("BUTTON");
            infoBtn.onclick = (ev) => {
                ev.stopPropagation();
                location.href = "https://www.netflix.com/browse?jbv=" + parsedContentString.video_id;
            };
            infoBtn.innerHTML = "Info";
            infoBtn.style.backgroundColor = "#2c2c2c";
            infoBtn.style.border = "1px solid #8c8c8c";
            infoBtn.style.marginLeft = "1em";
            infoBtn.style.marginRight = "1em";
            infoBtn.style.marginTop = "1em";
            infoBtn.style.width = "100%";
            infoBtn.style.maxWidth = "88%";

            metaDataContainer.insertBefore(infoBtn, metaDataContainer.firstChild);
        }
    }

    let previewModelOpen = document.getElementsByClassName("previewModal--wrapper");
    if (previewModelOpen.length > 0){
        setTimeout(() => {createInfoButtons();}, 1200);
    }

    addListeners();
})();
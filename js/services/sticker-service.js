'use strict'
var gStickers = [{
        id: 1,
        url: 'img/stickers/1.png',
        pos: { x: 100 / 2, y: 100 / 2 },
        size: 100
    },
    {
        id: 2,
        url: 'img/stickers/2.png',
        pos: { x: 100 / 2, y: 100 / 2 },
        size: 100
    },
    {
        id: 3,
        url: 'img/stickers/3.png',
        pos: { x: 100 / 2, y: 100 / 2 },
        size: 100
    },
];

function getStickers() {
    return gStickers;
}

function getStickersById(stickerId) {
    return gStickers.find(sticker => {
        return sticker.id === stickerId;
    });
}

function checkStickerClicked(clickedPos) {
    for (var stickerId = 0; stickerId < gStickers.length; stickerId++) {

        if ((y < clickedPos.y) && (clickedPos.y < endY)) return lineID;
    }
}

function moveSticker(stickerId, dx, dy) {
    gStickers[stickerId].pos.x += dx;
    gStickers[stickerId].pos.y += dy;
}
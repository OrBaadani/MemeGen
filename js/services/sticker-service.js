'use strict'
var gStickers = [{
        id: 1,
        url: 'img/stickers/1.png',
        pos: { x: 100 / 2, y: 100 / 2 },
        size: 100,
        isDrag: false,
        img: ''
    },
    {
        id: 2,
        url: 'img/stickers/2.png',
        pos: { x: 100 / 2, y: 100 / 2 },
        size: 100,
        isDrag: false,
        img: ''
    },
    {
        id: 3,
        url: 'img/stickers/3.png',
        pos: { x: 100 / 2, y: 100 / 2 },
        size: 100,
        isDrag: false,
        img: ''
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
    for (var i = 0; i < gStickers.length; i++) {
        if ((gStickers[i].pos.y < clickedPos.y) &&
            (clickedPos.y < (gStickers[i].pos.y + gStickers[i].size)) &&
            (gStickers[i].pos.x < clickedPos.x) &&
            (clickedPos.x < (gStickers[i].pos.x + gStickers[i].size))) return gStickers[i].id;
    }
}

function moveSticker(stickerId, dx, dy) {
    gStickers[stickerId].pos.x += dx;
    gStickers[stickerId].pos.y += dy;
}

function updateSticker(stickerID, prop, val) {
    getStickersById(stickerID)[prop] = val;
}
'use strict'

var gMeme;
var gSavedMemes;

function createMeme(imgId, txt, pos) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            pos,
            txt,
            size: 50,
            align: 'center',
            color: 'white',
            font: 'impact',
            isDrag: false
        }]
    };
}

function createLine(pos, txt) {
    gMeme.lines.push({
        pos,
        txt,
        size: 50,
        align: 'center',
        color: 'white',
        font: 'impact',
        isDrag: false
    });
}

function getCurrMeme() {
    return gMeme;
}

function updateMemeCurrImg(imgID) {
    gMeme.selectedImgId = imgID;
}

function updateMemeTxt(lineID, property, value) {
    gMeme.lines[lineID][property] = value;
}

function updateLinePos(lineID, axis, value) {
    gMeme.lines[lineID].pos[axis] = value;
}

function deleteLine(lineID) {
    var lineidx = gMeme.lines.findIndex(line => {
        return lineID === line.id;
    })
    gMeme.lines.splice(lineidx, 1);
}

function updateSelectedLine(newValue) {
    gMeme.selectedLineIdx = newValue;
}

function checkLineClicked(clickedPos) {
    for (var lineID = 0; lineID < gMeme.lines.length; lineID++) {
        var lineHeight = gMeme.lines[lineID].size;
        var posY = gMeme.lines[lineID].pos.y;
        var posX = gMeme.lines[lineID].pos.x;
        var y = posY - lineHeight;
        var endY = posY + 12;
        var width = gElCanvas.width - 20;
        if ((y < clickedPos.y) && (clickedPos.y < endY)) return lineID;
    }
}

function moveLine(lineID, dx, dy) {
    gMeme.lines[lineID].pos.x += dx;
    gMeme.lines[lineID].pos.y += dy;
}

function createSticker() {

}

function addMeme(url) {
    saved.push(url);
}

function getSavedMemes() {
    var saved = loadFromStorage('memeDB');
    if (!saved) saved = [];
    gSavedMemes = saved;
    return gSavedMemes;
}
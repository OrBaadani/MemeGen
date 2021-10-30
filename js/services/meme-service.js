'use strict'

var gMeme;

function createMeme(imgId, txt, pos, size, align, color) {
    // if (!size) size = 50;
    // if (!align) align = 'left';
    // if (!color) color = 'black';
    // if (!pos) pos = { x: gElCanvas.width / 2, y: 75 };
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            pos,
            txt,
            size,
            align,
            color,
            font: 'impact',
            isDrag: false
        }]
    };
}

function createLine(pos, txt, size, align, color) {
    gMeme.lines.push({
        pos,
        txt,
        size,
        align,
        color,
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

// function isObjClicked(clickedPos) {
//     for (var lineID = 0; lineID < gMeme.lines.length; lineID++) {
//         // if (!gMeme.lines[lineID].txt) return;
//         var lineHeight = gMeme.lines[lineID].size;
//         var posY = gMeme.lines[lineID].pos.y;
//         // var posX = gMeme.lines[lineID].pos.x;
//         // var x = posX;
//         var y = posY - lineHeight;
//         var endY = posY + 12;
//         if (lineID === 1) {
//             console.log(gElCanvas.height)
//         }

//         if ((y < clickedPos.y) && (clickedPos.y < endY)) return true;
//     }
// }

function moveLine(lineID, dx, dy) {
    gMeme.lines[lineID].pos.x += dx
    gMeme.lines[lineID].pos.y += dy

}
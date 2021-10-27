'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = [{
        id: 1,
        url: 'img/meme-imgs-sqr/1.jpg',
        keywords: ['happy']
    },
    {
        id: 2,
        url: 'img/meme-imgs-sqr/2.jpg',
        keywords: ['happy']
    },

];

var gMeme;
// {
// selectedImgId: 1,
// selectedLineIdx: 0,
// lines: [{
//     txt: '',
//     size: 40,
//     align: '',
//     color: ''
// }]
// };

function createImgs(id, keywords) {
    [{
        id,
        url: `img/meme-imgs-sqr/${id}.jpg`,
        keywords: keywords
    }];
}

function createMeme(imgId, txt, pos, size, align, color) {
    if (!size) size = 40;
    if (!align) align = 'ltr';
    if (!color) color = 'black';
    if (!pos) pos = { x: 50, y: 50 };
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            pos,
            txt,
            size,
            align,
            color
        }]
    };
}

function createLine(pos, txt, size, align, color) {
    gMeme.lines.push({
        pos,
        txt,
        size,
        align,
        color
    });
}

function getCurrMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getImgsById(imgID) {
    return gImgs.find(function(img) {
        return img.id === imgID;
    });
}

function updateMemeCurrImg(imgID) {
    gMeme.selectedImgId = imgID;
}

// function updateMemeTxtSize(lineID, size) {
//     gMeme.lines[lineID].size = size;
// }

// function updateMemeTxt(lineID, txt) {
//     gMeme.lines[lineID].txt = txt;
// }

// function updateMemeTxtColor(lineID, color) {
//     gMeme.lines[lineID].color = color;
// }

function updateMemeTxt(lineID, property, value) {
    gMeme.lines[lineID][property] = value;
}

function updateLinePos(lineID, axis, value) {
    gMeme.lines[lineID].pos.axis = value;
}

function deleteLine(lineID) {
    gMeme.lines.splice(lineID, 1);
}
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

var gMeme = [{
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}];
var gMemes;

function createImgs(id, keywords) {
    [{
        id,
        url: `img/meme-imgs-sqr/${id}.jpg`,
        keywords: keywords
    }];
}

function _createMeme(imgId, txt, size, align, color) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt,
            size,
            align,
            color
        }]
    };
}

function addMeme(imgId, txt, size, align, color) {
    gMemes.unshift(_createMeme(imgId, txt, size, align, color));
}

function getMemes() {
    return gMemes;
}

function getImgs() {
    return gImgs;
}

function getImgsById(imgID) {
    return gImgs.find(function(img) {
        return img.id === imgID;
    });

}
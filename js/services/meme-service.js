'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = [{
        id: 1,
        url: 'img/meme-imgs-sqr/1.jpg',
        keywords: ['funny']
    },
    {
        id: 2,
        url: 'img/meme-imgs-sqr/2.jpg',
        keywords: ['animal', 'happy', 'cute']
    },
    {
        id: 3,
        url: 'img/meme-imgs-sqr/3.jpg',
        keywords: ['animal', 'happy', 'cute']
    },
    {
        id: 4,
        url: 'img/meme-imgs-sqr/4.jpg',
        keywords: ['animal']
    },
    {
        id: 5,
        url: 'img/meme-imgs-sqr/5.jpg',
        keywords: ['cute', 'baby', 'mad']
    },
    {
        id: 6,
        url: 'img/meme-imgs-sqr/6.jpg',
        keywords: ['alien', 'man']
    },
    {
        id: 7,
        url: 'img/meme-imgs-sqr/7.jpg',
        keywords: ['baby', 'cute']
    },
    {
        id: 8,
        url: 'img/meme-imgs-sqr/8.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/meme-imgs-sqr/9.jpg',
        keywords: ['happy']
    },
    {
        id: 10,
        url: 'img/meme-imgs-sqr/10.jpg',
        keywords: ['happy']
    },
    {
        id: 11,
        url: 'img/meme-imgs-sqr/11.jpg',
        keywords: ['happy']
    },
    {
        id: 12,
        url: 'img/meme-imgs-sqr/12.jpg',
        keywords: ['happy']
    },
    {
        id: 13,
        url: 'img/meme-imgs-sqr/13.jpg',
        keywords: ['happy']
    },
    {
        id: 14,
        url: 'img/meme-imgs-sqr/14.jpg',
        keywords: ['movie']
    },
    {
        id: 15,
        url: 'img/meme-imgs-sqr/15.jpg',
        keywords: ['happy']
    },
    {
        id: 16,
        url: 'img/meme-imgs-sqr/16.jpg',
        keywords: ['happy']
    },
    {
        id: 17,
        url: 'img/meme-imgs-sqr/17.jpg',
        keywords: ['happy']
    },
    {
        id: 18,
        url: 'img/meme-imgs-sqr/18.jpg',
        keywords: ['cartoon', 'movie']
    }

];

var gMeme;

function createImgs(id, keywords) {
    [{
        id,
        url: `img/meme-imgs-sqr/${id}.jpg`,
        keywords: keywords
    }];
}

function searchImg(searchWord) {
    const images = gImgs.filter(img => {
        return img.keywords.some(keyword => {
            return (keyword === searchWord);
        });
    });
    return images;
}

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
    return gImgs.find(img => {
        return img.id === imgID;
    });
}
// function getLineById(lineID) {
//    return gMeme.lines.find(line => {
//         return lineID === line.id;
//     })
// }
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
'use strict'


var gElCanvas;
var gCtx;
var gCurrImg;
var gCurrLineId = 0;

function init() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
}

function onAddMeme() {
    var eltxt = document.querySelector('#txt').value;

    addMeme(imgId, txt, size, align, color);
}

function uploadImgToCanvas(imgID) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
    }
    img.src = getImgsById(imgID).url;
}

function renderCanvas() {
    console.log('render', );
    gCtx.save();
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.restore();
}

function drawText(x, y, text, size, color, align) {

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Impact`;
    gCtx.direction = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function onTypeText(elText) {
    if (getCurrMeme().lines.length === 0) createLine({ x: 50, y: 50 }, '', 40, '', '');

    updateMemeTxt(getCurrMeme().selectedLineIdx, 'txt', elText.value);
    renderCanvas();
    renderTxtLine();
}

function onColor(elColor) {
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'color', elColor.value);
    renderCanvas();
    renderTxtLine();
}

function renderTxtLine() {
    var lines = getCurrMeme().lines;
    lines.forEach((line, idx) => {
        drawText(line.pos.x, line.pos.y, line.txt, line.size, line.color, line.align);
    });
}

function renderGallery() {
    const imgs = getImgs();
    var strHtmls = imgs.map(function(img) {
        return `<img src="${img.url}" onclick="onChooseImg(this,${img.id})"/>`;

    });
    strHtmls = strHtmls.join('');
    document.querySelector('.image-gallery').innerHTML = strHtmls;
}

function onChooseImg(elImg, imgID) {
    gCurrImg = elImg;
    uploadImgToCanvas(imgID);
    createMeme(imgID, '');
    // updateMemeCurrImg(imgID);
}

function onFontSize(bigSmall) {
    var memeLine = getCurrMeme().lines[getCurrMeme().selectedLineIdx];
    if (bigSmall === '+') memeLine.size += 5;
    else if (bigSmall === '-') memeLine.size -= 5;
    // updateMemeTxtSize(0, memeLine.size);
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'size', memeLine.size);
    renderCanvas();
    renderTxtLine();
}

function onChangeLine() {
    var text = document.querySelector('#txt').value;
    text = '';
    if (getCurrMeme().selectedLineIdx === 1) getCurrMeme().selectedLineIdx = 0;
    else if (getCurrMeme().selectedLineIdx === 0) getCurrMeme().selectedLineIdx = 1;
    text = getCurrMeme().lines[getCurrMeme().selectedLineIdx].txt;
}

function onAddMoreLines() {
    if (getCurrMeme().selectedLineIdx === 1) return;
    getCurrMeme().selectedLineIdx++;
    document.querySelector('#txt').value = '';
    if (getCurrMeme().selectedLineIdx === 1) createLine({ x: 50, y: 350 }, '', 40, '', '');
}

function onMoveLine(upDown) {
    var lineId = getCurrMeme().selectedLineIdx;
    if (upDown === 'up') getCurrMeme().lines[lineId].pos.y -= 10;
    else if (upDown === 'down') getCurrMeme().lines[lineId].pos.y += 10;
    updateLinePos(lineId, 'y', getCurrMeme().lines[lineId].pos.y);
    renderCanvas();
    renderTxtLine();
}

function onDeleteLine() {
    var lineId = getCurrMeme().selectedLineIdx;
    if (getCurrMeme().lines.length === 0) return;
    deleteLine(lineId);
    console.log(lineId);
    renderTxtLine();
    renderCanvas();
    document.querySelector('#txt').value = '';

}
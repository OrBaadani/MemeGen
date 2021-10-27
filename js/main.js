'use strict'


var gElCanvas;
var gCtx;
var gCurrImgId;
var gCurrImg;

function init() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    onAddText();
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
    // gCtx.fillStyle = "#ede5ff";
    uploadImgToCanvas(gCurrImgId);
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.restore();
}

function drawText(x, y, text, size, color) {

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'white';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Impact`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onAddText() {
    var text = document.querySelector('#txt');
    text.addEventListener('keyup', () => {
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(50, 50, text.value, 40, 'black');
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
    gCurrImgId = imgID;
    gCurrImg = elImg;
    uploadImgToCanvas(imgID);
}
'use strict'


var gElCanvas;
var gCtx;
var gCurrImg;
var gCurrLineId = 0;
var gSearch = false;

function init() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery(getImgs());
}

function onAddMeme() {
    var eltxt = document.querySelector('#txt').value;

    addMeme(imgId, txt, size, align, color);
}

function onShowImg() {
    document.querySelector('.generator-container').style.display = 'none';
}

function uploadImgToCanvas(imgID) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    img.src = getImgsById(imgID).url;
}

function renderCanvas() {
    gCtx.save();
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.restore();
}

function drawText(x, y, text, size, color, align) {

    gCtx.lineWidth = 2;
    gCtx.strokeStyle = '#ffffff';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Impact`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function onTypeText(elText) {
    if (getCurrMeme().lines.length === 0) createLine({ x: 20, y: 75 }, '', 50, '', '');

    updateMemeTxt(getCurrMeme().selectedLineIdx, 'txt', elText.value);
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);

}

function onColor(elColor) {
    console.log('line id for color', getCurrMeme().selectedLineIdx)
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'color', elColor.value);
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);

}

function renderTxtLine() {
    var lines = getCurrMeme().lines;
    lines.forEach((line, idx) => {
        drawText(line.pos.x, line.pos.y, line.txt, line.size, line.color, line.align);
    });


}

function renderGallery(imgs) {
    if (!gSearch) var strInput = `<div class="input-file-container">
    <label for="file-input-btn" class="file-input-btn flex center align-center"></label>
    <input type="file" id="file-input-btn" name="image" onchange="onImgInput(event)" />
</div>`;
    else var strInput = "";
    var strHtmls = imgs.map(function(img) {
        return `<img src="${img.url}" onclick="onChooseImg(this,${img.id})"/>`;

    });
    strHtmls = strHtmls.join('');
    document.querySelector('.image-gallery').innerHTML = strInput + strHtmls;
    gSearch = false;
}

function onChooseImg(elImg, imgID) {
    gCurrImg = elImg;
    uploadImgToCanvas(imgID);
    createMeme(imgID, '', { x: gElCanvas.width / 2, y: 75 }, 50, 'center', 'black');

    // updateMemeCurrImg(imgID);
    document.querySelector('.generator-container').style.display = 'block';
}

function onFontSize(bigSmall) {
    var memeLine = getCurrMeme().lines[getCurrMeme().selectedLineIdx];
    if (bigSmall === '+') memeLine.size += 5;
    else if (bigSmall === '-') memeLine.size -= 5;
    // updateMemeTxtSize(0, memeLine.size);
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'size', memeLine.size);
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);

}

function onChangeLine() {
    renderCanvas();
    var lineId = getCurrMeme().selectedLineIdx;
    if (lineId === 1) lineId = 0;
    else if (lineId === 0) lineId = 1;
    updateSelectedLine(lineId);
    document.querySelector('#txt').value = getCurrMeme().lines[lineId].txt;
    markLine(lineId);
    renderTxtLine();
}

function onAddMoreLines() {
    var lineId = getCurrMeme().selectedLineIdx;
    if (lineId === 1) return;
    lineId++;
    document.querySelector('#txt').value = '';
    updateSelectedLine(lineId);
    if (lineId === 1) createLine({ x: gElCanvas.width / 2, y: gElCanvas.height - 75 }, '', 50, 'center', 'black');
}

function onMoveLine(upDown) {
    var lineId = getCurrMeme().selectedLineIdx;
    var posY = getCurrMeme().lines[lineId].pos.y;
    if (upDown === 'up') posY -= 10;
    else if (upDown === 'down') posY += 10;
    updateLinePos(lineId, 'y', posY);
    renderCanvas();
    renderTxtLine();
    markLine(lineId);
}

function onDeleteLine() {
    if (getCurrMeme().lines.length === 0) return;
    var lineId = getCurrMeme().selectedLineIdx;
    deleteLine(lineId);
    renderCanvas();
    renderTxtLine();
    if (lineId !== 0) lineId--;
    updateSelectedLine(lineId);
    document.querySelector('#txt').value = '';
}

function onAlign(value) {

    var lineId = getCurrMeme().selectedLineIdx;
    var posX = getCurrMeme().lines[lineId].pos.x;
    if (value === 'left') {
        posX = 10 + 5;
    }
    if (value === 'right') {
        posX = gElCanvas.width - 10 - 5;
    }
    if (value === 'center') {
        posX = gElCanvas.width / 2;
    }


    updateLinePos(lineId, 'x', posX);


    updateMemeTxt(lineId, 'align', value);
    renderCanvas();
    renderTxtLine();
    markLine(lineId);

}

function downloadMeme(elLink) {
    // setBackground('white');
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx, 'transparent');

    const imgContent = gElCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function markLine(lineID, color = 'lightgray') {

    var posY = getCurrMeme().lines[lineID].pos.y;
    var posX = getCurrMeme().lines[lineID].pos.x;

    // var lineLength = gElCanvas.width - 60; //30 each side
    var lineHeight = getCurrMeme().lines[lineID].size;

    drawLine(color, 10, posY - lineHeight, gElCanvas.width - 10, posY - lineHeight);
    drawLine(color, 10, posY - lineHeight, 10, posY + 12);
    drawLine(color, 10, posY + 12, gElCanvas.width - 10, posY + 12);
    drawLine(color, gElCanvas.width - 10, posY - lineHeight, gElCanvas.width - 10, posY + 12);
    // renderCanvas();
    // renderTxtLine();

}

function drawLine(color, x, y, xEnd, yEnd) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(xEnd, yEnd);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = color;
    gCtx.stroke();
}


function onImgInput(ev) {
    var reader = new FileReader()
    reader.onload = function(event) {
        var img = new Image()
        img.onload = img.onload = () => {
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        }
        img.src = event.target.result;
        gCurrImg = img;
    }
    reader.readAsDataURL(ev.target.files[0]);
    createMeme(gCurrImg, '', { x: gElCanvas.width / 2, y: 75 }, 50, 'center', 'black');
    document.querySelector('.generator-container').style.display = 'block';
}

function onSearch(ev) {
    ev.preventDefault();
    var word = document.querySelector('.search-input').value;
    if (!word) renderGallery(getImgs());
    else {
        gSearch = true;
        var searched = searchImg(word);
        if (!searched.length) renderGallery([]);
        else renderGallery(searched);
    }
}
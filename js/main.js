'use strict'

var gElCanvas;
var gCtx;
var gCurrImg;
var gCurrLineId = 0;
var gSearch = false;
var gMore = false;


function init() {

    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery(getImgs());
    renderFilterWords(5);
    renderSavedMemes();
    // renderStickersGallery();
    addListeners();
    gElCanvas.style.cursor = 'grab';
}

function onAddMeme() {
    var eltxt = document.querySelector('#txt').value;
    addMeme(imgId, txt, size, align, color);
}

function onShowImg() {
    document.querySelector('.generator-container').style.display = 'none';
    document.body.classList.remove('menu-open');
}

function uploadImgToCanvas(imgID) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    img.src = getImgsById(imgID).url;
}

function renderCanvas() {
    resizeCanvas();
    gCtx.save();
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.restore();
    renderSticker();
}

function drawText(x, y, text, size, color, font, align) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onTypeText(elText) {
    if (getCurrMeme().lines.length === 0) createLine({ x: 20, y: 75 }, '');
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'txt', elText.value);
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);
}

function onColor(elColor) {
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'color', elColor.value);
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);
}

function onFontSelect(font) {
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'font', font);
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);
}

function renderTxtLine() {
    var lines = getCurrMeme().lines;
    lines.forEach((line, idx) => {
        drawText(line.pos.x, line.pos.y, line.txt, line.size, line.color, line.font, line.align);
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
    createMeme(imgID, '', { x: gElCanvas.width / 2, y: 75 });
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
    if (getCurrMeme().lines.length <= 1) return;
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
    if (lineId === 1) createLine({ x: gElCanvas.width / 2, y: gElCanvas.height - 75 }, '');
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

    if (lineId !== 0) lineId--;
    updateSelectedLine(lineId);
    renderCanvas();
    renderTxtLine();
    markLine(lineId);
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
    if (!getCurrMeme().lines[lineID]) return;
    var posY = getCurrMeme().lines[lineID].pos.y;
    var posX = getCurrMeme().lines[lineID].pos.x;
    var lineHeight = getCurrMeme().lines[lineID].size;
    drawLine(color, 10, posY - lineHeight, gElCanvas.width - 10, posY - lineHeight);
    drawLine(color, 10, posY - lineHeight, 10, posY + 12);
    drawLine(color, 10, posY + 12, gElCanvas.width - 10, posY + 12);
    drawLine(color, gElCanvas.width - 10, posY - lineHeight, gElCanvas.width - 10, posY + 12);
    // drawRect(color, 10, posY - lineHeight, gElCanvas.width - 10, posY + 12);
}

function drawRect(color, x, y, xEnd, yEnd) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.rect(x, y, xEnd, yEnd);
    gCtx.fillStyle = 'transparent';
    gCtx.strokeStyle = color;
    gCtx.stroke();
}

function drawLine(color, x, y, xEnd, yEnd) {
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gCtx.lineTo(xEnd, yEnd);
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = color;
    gCtx.stroke();
}

function resizeCanvas() {
    const elContainer = document.querySelector('canvas');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
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
    createMeme(gCurrImg, '', { x: gElCanvas.width / 2, y: 75 });
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

function renderFilterWords(num) {
    if (!num) var keywords = sortBy();
    else var keywords = sortBy().slice(0, num);
    var strHtmls = keywords.map((keyword) => {
        return `<div style="font-size:100%" onclick="onSizeFilter(this,'${keyword.keyword}')">${keyword.keyword}</div>`;
    });
    strHtmls = strHtmls.join('');
    document.querySelector('.filter-words-section').innerHTML = strHtmls;
}

function onSizeFilter(elWord, keyword) {
    if (elWord.style.fontSize === '200%') return
    var fontSize = parseInt((elWord.style.fontSize).slice(0, -1));
    fontSize += 10;
    elWord.style.fontSize = fontSize + '%';
    gSearch = true;
    renderGallery(searchImg(keyword));
    // renderFilterWords();
}

function onMore(elBtn) {
    if (!gMore) {
        renderFilterWords();
        elBtn.style.alignSelf = 'flex-start';
        elBtn.innerText = 'less';
        gMore = true;
    } else {
        renderFilterWords(5);
        elBtn.style.alignSelf = 'center';
        elBtn.innerText = 'more';
        gMore = false;
    }
}

function onSaveMeme() {
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx, 'transparent');
    var url = gElCanvas.toDataURL();
    // document.querySelector('.canvas-img').src = url;
    addMeme(url);
    renderSavedMemes();
}

function renderSavedMemes() {
    var str = ``;
    for (var i = 0; i < getSavedMemes().length; i++) {
        str += `<img class="saved-memes-img" src="${getSavedMemes()[i]}">`
    }
    document.querySelector('.saved-memes').innerHTML = str;
}

function onShowSavedMemes() {
    document.querySelector('.saved-memes-section').classList.toggle('hide');
    document.body.classList.remove('menu-open');
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderStickersGallery() {
    var stickers = getStickers();
    var strHtmls = stickers.map((sticker) => {
        return `<img onclick ="onDrawSticker(${sticker.id})"src="${sticker.url}">`;
    });
    strHtmls = strHtmls.join('');
    document.querySelector('.stickers-section').innerHTML = strHtmls;
}

function onDrawSticker(stickerId) {
    uploadStickerToCanvas(stickerId);
}

function uploadStickerToCanvas(stickerId) {
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, getStickers()[stickerId].pos.x, getStickers()[stickerId].pos.y, getStickers()[stickerId].size, getStickers()[stickerId].size);
    }
    img.src = getStickersById(stickerId).url;
    updateSticker(stickerId, 'img', img);
}

function renderSticker() {
    var stickers = getStickers();
    if (stickers)
        for (var i = 0; i < stickers.length; i++) {
            if (stickers[i].img !== '') {
                gCtx.drawImage(stickers[i].img, stickers[i].pos.x, stickers[i].pos.y, stickers[i].size, stickers[i].size);
            }
        }
}
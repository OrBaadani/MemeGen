var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        renderCanvas();
        renderTxtLine();
        markLine(getCurrMeme().selectedLineIdx);

    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gElCanvas.style.cursor = 'grabbing';
    const pos = getEvPos(ev);
    const lineID = checkLineClicked(pos);
    if (lineID === undefined) {
        // if()
        // else
        return;
    }
    updateMemeTxt(lineID, 'isDrag', true);
    updateSelectedLine(lineID);
    renderCanvas();
    renderTxtLine();
    markLine(lineID);
    gStartPos = pos;

}

function onMove(ev) {

    const pos = getEvPos(ev);
    var lineId = getCurrMeme().selectedLineIdx;
    const line = getCurrMeme().lines[lineId];
    if (line.isDrag) {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos;
        moveLine(lineId, dx, dy);
        renderCanvas();
        renderTxtLine();
        markLine(lineId);
    }

}

function onUp() {
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'isDrag', false);
    gElCanvas.style.cursor = 'grab';

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
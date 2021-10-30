var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function addListeners() {
    addMouseListeners()
    addTouchListeners()
        // window.addEventListener('mousemove', () => {
        //     document.body.style.cursor = 'default';
        // })
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
    const pos = getEvPos(ev);
    if (!isObjClicked(pos)) return;
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'isDrag', true);
    console.log('clicked');
    renderCanvas();
    renderTxtLine();
    markLine(getCurrMeme().selectedLineIdx);
    gStartPos = pos;
}

function onMove(ev) {

    const pos = getEvPos(ev);
    var lineId = getCurrMeme().selectedLineIdx;
    const line = getCurrMeme().lines[lineId];
    if (isObjClicked(pos)) {
        document.body.style.cursor = 'move';
    } else {
        document.body.style.cursor = 'default';
    }
}

function onUp() {
    updateMemeTxt(getCurrMeme().selectedLineIdx, 'isDrag', false);
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
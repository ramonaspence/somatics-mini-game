const spell = {}
const notes = []

class Timer {
    constructor() {
        this.start = Date.now();
        this.time = Date.now() - this.start;
    }
}

function initializeGame() {
    // start timer
    const timer = new Timer();
    // initalize notes with spell
    initializeNotes();
    // run game, updating state thousandth of a millisecond (??)
    setInterval(updateGameState, 1000/1000) 
}

function initializeNotes() {
    // get width and height of game area

    // calculate size and position of notes

    // create notes
}

function updateGameState() {
    // move notes down game area
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let y = parseInt(note.style.top);
        note.style.top = (y + 1) + "px";
    }
}

window.addEventListener('load', initializeGame, false);
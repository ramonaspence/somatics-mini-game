
const spell = {'a': 1000, 's':2000, 'd':3000, 'f':4000,}
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
    const gameWidth = document.getElementById("game").style.width;
    const gameHeight = document.getElementById("game").style.height;
    // calculate size and position of notes
    const noteSize = 125;
    const noteSpacing = 10;
    const totalNoteWidth = noteSize * 4 + noteSpacing * 3;
    const startX = (gameWidth - totalNoteWidth) / 16;
    const startY = 0;
    // create notes
    for (let i = 0; i < 4; i++) {
        const note = document.createElement('div');
        note.style.width = noteSize + 'px';
        note.style.height = noteSize + 'px';
        note.style.backgroundColor = 'lavender';
        note.style.position = 'absolute';
        note.style.left = startX + i * (noteSize + noteSpacing) + 'px';
        note.style.top = startY + 'px';
        document.getElementById("notes").appendChild(note);
        notes.push(note)
    // }

}

function initializeNotes(spell, start) {
    for (const [key, value] of Object.entries(spell)) {
        setTimeout(function(){addNote(key)}, value)
    }
}

function updateGameState() {
    // move notes down game area
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let y = parseInt(note.style.top);
        note.style.top = (y + 1) + "px";
    

        // Check if the note has reached the bottom of the screen
        let target = document.getElementById("target")
        console.log(target.style.top)
        if (y >= 800) {
        // If the note has reached the bottom, remove it from the game
        notes.splice(i, 1);
        i--;
        note.remove();
        }
    }   
}

window.addEventListener('load', initializeGame, false);
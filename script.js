
const keyCodes = {
    'a': 65, 's': 83, 'd': 68, 'f': 70
}

const spell = {
    'passing_score': 4,
    'notes': {
        'a': 1000, 
        's':2000, 
        'd':3000, 
        'f':4000,
    },
}
const notes = []
var score = 0;

function isHit(key) {
    score += 1;
}

function isMiss(key) {
    score -= 1;
    var note = document.getElementById(key + "note")
    document.getElementById(key).removeChild(note);
}

function judgeScore() {
    // decides if spell succeeded or failed based on score
    if (score >= spell['passing_score']) {
        // you win!
    }
}

function checkPosition(key) {
    var targetY = parseInt(document.getElementById("target").style.top) - 5;
    var targetY2 = parseInt(document.getElementById("target").style.top) + 5;

    var noteY = parseInt(document.getElementById(key + "note").style.top);
    
    if (noteY > targetY && noteY < targetY2) {
        isHit(key);
    }

    else if (noteY < targetY || noteY > targetY2) {
        isMiss(key);
    }
}

function initializeGame(spell) {
    // initalize notes with spell
    initializeNotes(spell);
    // add target zone
    addTarget();
    // run game, updating state every millisecond
    setInterval(updateGameState, 1)
}

function addTarget() {
    target = document.createElement("div");
    target.id = "target";
    target.style.width = 500 + "px";
    target.style.height = 125 + "px";
    target.style.top = 700 + "px";
    document.getElementById("game").appendChild(target);
}

function addNote(key) {
    const column = 125;
    const noteSize = 125;
    const noteSpacing = 10;
    const startY = 0;
    const note = document.createElement('div');
    note.id = key + "note"
    note.style.width = column + 'px';
    note.style.height = noteSize + 'px';
    note.style.backgroundColor = 'lavender';
    note.style.position = 'absolute';
    note.style.top = startY + 'px';
    document.getElementById(key).appendChild(note);
    notes.push(note)
}

function initializeNotes(spell, start) {
    for (const [key, value] of Object.entries(spell['notes'])) {
        setTimeout(function(){addNote(key)}, value)
    }
}

function onKeyPress(event) {
    if (event.keyCode === keyCodes[event.key]) {
        checkPosition(event.key)
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
        if (y >= 800) {
        // If the note has reached the bottom, remove it from the game
        notes.splice(i, 1);
        i--;
        note.remove();
        }
    }
}

document.addEventListener('keydown', function(event) {onKeyPress(event)});

document.getElementById("startButton").addEventListener('click', function(){initializeGame(spell)}, false);

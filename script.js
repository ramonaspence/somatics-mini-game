
const keyCodes = {
    'a': 65, 's': 83, 'd': 68, 'f': 70
}

// notes spawn after the listed amount of time in milliseconds
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

// show score variable in window
document.getElementById("score").innerHTML = score;


function isHit(key) {
    score += 1;
    document.getElementById("score").innerHTML = score;

}

function isMiss(key) {
    // score -= 1;

    // if key pressed too soon, remove note
    var note = document.getElementById(key + "note");
    document.getElementById(key).removeChild(note);
}

function judgeScore() {
    // Decides if spell succeeded or failed based on score
    if (score >= spell['passing_score']) {
        // you win!
    }
}

function checkPosition(key) {
    /* Check the position of a note against the position of the 
        target area to determine if the note was hit successfully. */
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
    // Initalize notes with spell
    initializeNotes(spell);
    // Add target zone
    addTarget();
    // Run game, updating state every millisecond
    setInterval(updateGameState, 1);
}

function addTarget() {
    /* Add target when game starts. In theory, the target area could be different for different spells. It could also be smaller or bigger based on a difficulty setting. */


    target = document.createElement("div");
    target.id = "target";
    target.style.width = 500 + "px";
    target.style.height = 125 + "px";
    // Top property will be used to check the target area's position
    target.style.top = 500 + "px";
    document.getElementById("game").appendChild(target);
}

function addNote(key) {
    // add individual note and set css properties
    const column = 125;
    const noteSize = 125;
    const noteSpacing = 10;
    const startY = 0;
    const note = document.createElement('div');
    note.id = key + "note";
    note.style.width = column + 'px';
    note.style.height = noteSize + 'px';
    note.style.backgroundColor = 'lavender';
    note.style.position = 'absolute';
    note.style.top = startY + 'px';
    document.getElementById(key).appendChild(note);
    notes.push(note);
}

function initializeNotes(spell, start) {
    // Loops through spell object to spawn notes
    for (const [key, value] of Object.entries(spell['notes'])) {
        setTimeout(function(){addNote(key)}, value);
    }
}

function onKeyPress(event) {
    // Check which key has been pressed and pass that key to the checkPosition function
    if (event.keyCode === keyCodes[event.key]) {
        checkPosition(event.key);
    }
}

function updateGameState() {
    // Move notes down game area
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let y = parseInt(note.style.top);
        note.style.top = (y + 1) + "px";

        // Check if the note has reached the bottom of the screen
        let target = document.getElementById("target");
        if (y >= 800) {
        // If the note has reached the bottom, remove it from the game
        notes.splice(i, 1);
        i--;
        note.remove();
        }
    }
}

// Listen for any keypress
document.addEventListener('keydown', function(event) {onKeyPress(event)});

// Start button initializes the game
document.getElementById("startButton").addEventListener('click', function(){initializeGame(spell)}, false);

let numberOfBeats = 16;
let beatsPerBar = 4;

// Create an object containing all the audio files currently used in the drum machine:

let drumAudio = {
    kick: new Audio("assets/kick.wav"),
    clap: new Audio("assets/clap.wav"),
    closedhh: new Audio("assets/closedhh.wav"),
    tom: new Audio("assets/tom.wav"),
    cowbell: new Audio("assets/cowbell.wav"),
    openhh: new Audio("assets/openhh.wav"),
    snare: new Audio("assets/snare.wav"),
    tamb: new Audio("assets/tamb.wav"),
}

// Assign event listeners to toggle the buttons to change color 
// and play the appropriate sound when clicked (if not running):

for (let key in drumAudio) {
    const buttons = document.querySelectorAll(`.${key} button`);
    buttons.forEach(button => button.addEventListener("click", function () {
        this.classList.toggle("on");
        if (!isPlaying) {
            drumAudio[key].play();
            drumAudio[key].currentTime = 0;
        }
    }))
}

// Tempo

const tempoSlider = document.querySelector("#tempo-slider");
tempoSlider.addEventListener("input", updateTempo);

function updateTempo() {
    const bpm = document.querySelector("#bpm");
    bpm.innerHTML = `${tempoSlider.value} bpm`;

}
// Sets up the play/stop button

const playStop = document.querySelector("#play-stop");
playStop.addEventListener("click", handlePlay)

let isPlaying = false;

let playInterval;
let i = 0;

function handlePlay() {

    let tempoInMs = (1000 / (tempoSlider.value / 60)) / beatsPerBar;

    if (isPlaying) {
        clearInterval(playInterval);
        clearPanelHighlight();
        tempoSlider.disabled = false;
    }

    if (!isPlaying) {
        playInterval = setInterval(drumMachine, tempoInMs);
        tempoSlider.disabled = true;
    }

    isPlaying = !isPlaying;
    i = 0;
    updatePlayButton();
}

// This function runs the drum machine when the play button is pressed:

function drumMachine() {
    let drumSounds = makeDrumPattern();

    for (let j = 0; j < drumSounds.length; j++) {
        if (drumSounds[j].hits[i % numberOfBeats]) {
            drumSounds[j].sound.play();
            drumSounds[j].sound.currentTime = 0;
        }

    }

    highlightPanel();
    i++;
}

function makeDrumPattern() {
    let pattern = [];

    for (let key in drumAudio) {
        let arr = [...document.querySelectorAll(`.${key} button`)]
            .map(button => button.classList.contains("on"));
        pattern.push({
            sound: drumAudio[key],
            hits: arr
        });

    }
    return pattern;
}
const panels = document.querySelectorAll(".panel");

function highlightPanel() {
    clearPanelHighlight();
    panels[i % numberOfBeats].classList.add("panel-highlight");
}

function clearPanelHighlight() {
    panels.forEach(panel => panel.classList.remove("panel-highlight"));
}

function updatePlayButton() {
    if (isPlaying)
        playStop.innerHTML = `<i class="fa fa-stop"></i>`;
    if (!isPlaying)
        playStop.innerHTML = `<i class="fa fa-play"></i>`;
}
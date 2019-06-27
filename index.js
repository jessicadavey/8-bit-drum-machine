// Create an object containing all the audio files currently used in the drum machine:

let drumAudio = {
    tom: new Audio("assets/tom.wav"),
    cowbell: new Audio("assets/cowbell.wav")
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

// Sets up the play/stop button

const playStop = document.querySelector("#play-stop");
playStop.addEventListener("click", handlePlay)

let isPlaying = false;

let playInterval;
let i = 0;

function handlePlay() {

    if (isPlaying) {
        clearInterval(playInterval);
        clearPanelSelect();
    }

    if (!isPlaying) {
        playInterval = setInterval(drumMachine, 500);
    }

    isPlaying = !isPlaying;
    i = 0;
    updatePlayButton();
}

// This function runs the drum machine when the play button is pressed:

function drumMachine() {
    let drumSounds = makeDrumPattern();

    for (let j = 0; j < drumSounds.length; j++) {
        if (drumSounds[j].hits[i % 4])
            drumSounds[j].sound.play();
    }

    selectPanel();
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

function selectPanel() {
    clearPanelSelect();
    panels[i % 4].classList.add("panel-select");
}

function clearPanelSelect() {
    panels.forEach(panel => panel.classList.remove("panel-select"));
}

function updatePlayButton() {
    if (isPlaying)
        playStop.innerHTML = `<i class="fa fa-stop"></i>`;
    if (!isPlaying)
        playStop.innerHTML = `<i class="fa fa-play"></i>`;
}
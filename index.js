const tomButtons = document.querySelectorAll(".tom button");
console.log(tomButtons);
tomButtons.forEach(button => button.addEventListener("click", handleTom));

function handleTom() {
    this.classList.toggle("on");
    tom.play();
    tom.currentTime = 0;
}

const cowbellButtons = document.querySelectorAll(".cowbell button");
cowbellButtons.forEach(button => button.addEventListener("click", handleCowbell));

function handleCowbell() {
    this.classList.toggle("on");
    cowbell.play();
    cowbell.currentTime = 0;
}

let tom = new Audio("assets/tom.wav");
let cowbell = new Audio("assets/cowbell.wav");


const playStop = document.querySelector("#play-stop");
playStop.addEventListener("click", handlePlay)

let isPlaying = false;

let playInterval;
let i = 0;



function handlePlay() {

    if (isPlaying) {
        clearInterval(playInterval);
    }

    if (!isPlaying) {
        playInterval = setInterval(drumMachine, 500);
    }

    isPlaying = !isPlaying;
    i = 0;
    updatePlayButton();
}


function makeDrumPattern() {
    let tomArray = [...tomButtons].map(button => {
        return button.classList.contains("on") ? tom : null;
    })

    let cowbellArray = [...cowbellButtons].map(button => {
        return button.classList.contains("on") ? cowbell : null;
    })

    let audioArray = [
        [],
        [],
        [],
        []
    ]

    for (let i = 0; i < audioArray.length; i++) {
        audioArray[i] = [tomArray[i], cowbellArray[i]];
    }
    return audioArray;
}


function drumMachine() {
    let audioArray = makeDrumPattern();

    let currentSoundArray = audioArray[i % 4];

    for (let sound of currentSoundArray)
        if (sound) sound.play();
    selectPanel();
    i++;
}

function selectPanel() {
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => panel.classList.remove("panel-select"));
    panels[i % 4].classList.add("panel-select");
}

function updatePlayButton() {
    if (isPlaying)
        playStop.innerHTML = `<i class="fa fa-stop"></i>`;
    if (!isPlaying)
        playStop.innerHTML = `<i class="fa fa-play"></i>`;
}
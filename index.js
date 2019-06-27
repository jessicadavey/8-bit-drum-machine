// const tomButtons = document.querySelectorAll(".tom button");
// tomButtons.forEach(button => button.addEventListener("click", function () {
//     this.classList.toggle("on");
//     tom.play();
//     tom.currentTime = 0;
// }));

// function handleTom() {
//     this.classList.toggle("on");
//     tom.play();
//     tom.currentTime = 0;
// }

// const cowbellButtons = document.querySelectorAll(".cowbell button");
// cowbellButtons.forEach(button => button.addEventListener("click", handleCowbell));

// function handleCowbell() {
//     this.classList.toggle("on");
//     cowbell.play();
//     cowbell.currentTime = 0;
// }



const buttons = document.querySelectorAll("span button");
buttons.forEach(button => button.addEventListener("click", function () {
    this.classList.toggle("on");
}))


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

let drumAudio = {
    tom: tom,
    cowbell: cowbell
}


function makeDrumPattern() {
    let pattern = [];

    for (let key in drumAudio) {
        let arr = [...document.querySelectorAll(`.${key} button`)]
            .map(button => button.classList.contains("on"));
        anotherArray.push({
            sound: drumAudio[key],
            hits: arr
        });

    }
    return pattern;
}

function drumMachine() {
    let drumSounds = makeDrumPattern();

    for (let j = 0; j < drumSounds.length; j++) {
        if (drumSounds[j].hits[i % 4])
            drumSounds[j].sound.play();
    }

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
const tomButtons = document.querySelectorAll(".tom");
tomButtons.forEach(button => button.addEventListener("click", handleTom));

function handleTom() {
    this.classList.toggle("tom-on");
    tom.play();
    tom.currentTime = 0;
}

const cowbellButtons = document.querySelectorAll(".cowbell");
cowbellButtons.forEach(button => button.addEventListener("click", handleCowbell));

function handleCowbell() {
    this.classList.toggle("cowbell-on");
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
    let audioArray = [...tomButtons].map(button => {
        return button.classList.contains("tom-on") ? tom : null;
    })

    if (isPlaying) {
        clearInterval(playInterval);
    }

    if (!isPlaying) {
        playInterval = setInterval(drumMachine, 500, audioArray);
    }

    isPlaying = !isPlaying;
    i = 0;
    updatePlayButton();
}




function drumMachine(array) {
    let currentSound = array[i % 4];
    if (currentSound)
        currentSound.play();
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
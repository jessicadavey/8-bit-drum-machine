const buttons = document.querySelectorAll(".pad");
buttons.forEach(button => button.addEventListener("click", handlePad));

function handlePad() {
    this.classList.toggle("on");
}

const playStop = document.querySelector("#play-stop");
playStop.addEventListener("click", handlePlay)

let isPlaying = false;

let playInterval;

function handlePlay() {

    if (isPlaying) {
        clearInterval(playInterval);
    }

    if (!isPlaying) {
        playInterval = setInterval(selectPanel, 500);
    }

    isPlaying = !isPlaying;
    updatePlayButton();
}

let i = 0;

function selectPanel() {
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => panel.classList.remove("panel-select"));
    panels[i % 4].classList.add("panel-select");
    i++;
}

function updatePlayButton() {
    if (isPlaying)
        playStop.innerHTML = `<i class="fa fa-stop"></i>`;
    if (!isPlaying)
        playStop.innerHTML = `<i class="fa fa-play"></i>`;
}
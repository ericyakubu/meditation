const TimeOption = document.querySelectorAll(".time_option");
const BackgroundOption = document.querySelectorAll(".background_option");
const Timer = document.querySelector("#timer");
const MeditationApp = document.getElementById("meditation");
const BackgroundVideo = document.getElementById("backgroundVideo");
const BackgroundAudio = document.getElementById("audio");
const AddTimeBtns = document.querySelectorAll(".addTime");
const Hamburger = document.getElementById("hamburger");
const Menu = document.getElementById("menu");

TimeOption.forEach((e) => {
    e.addEventListener("click", timer);
});

BackgroundOption.forEach((e) => {
    e.addEventListener("click", setBackground);
});

AddTimeBtns.forEach((e) => {
    e.addEventListener("click", addTime);
});

Hamburger.addEventListener("click", hamburgerOpen);

let time = 0;
let countdown = false;
let background = false;

function hamburgerOpen(e) {
    e.preventDefault();

    console.log(Menu.style.display);

    Menu.classList.toggle("active");
}

function timer(e) {
    e.preventDefault();

    time = e.target.value * 60;

    let sec = time % 60;
    let min = (time - sec) / 60;
    // time--;

    if (sec < 10) {
        let secSub = sec;
        sec = `0${secSub}`;
    }
    if (min < 10) {
        let minSub = min;
        min = `0${minSub}`;
    }

    Timer.innerText = `${min} : 00`;
    validate();
}

function setBackground(e) {
    e.preventDefault();

    if (!background) {
        background = !background;
    }
    MeditationApp.style.background = "none";

    if (e.target.value === "rain") {
        BackgroundVideo.setAttribute("src", "./rain_vid_1.mp4");
        BackgroundAudio.setAttribute("src", "./rain_mp3.mp3");
    }
    if (e.target.value === "beach") {
        BackgroundVideo.setAttribute("src", "./beach_vid.mp4");
        BackgroundAudio.setAttribute("src", "./ocean_mp3.mp3");
    }

    BackgroundVideo.play();
    BackgroundAudio.play();
    validate();
}

function addTime(e) {
    e.preventDefault();

    if (time + e.target.value * 60 <= 3600) {
        time = time + e.target.value * 60;
        let sec = time % 60;
        let min = (time - sec) / 60;

        if (sec < 10) {
            let secSub = sec;
            sec = `0${secSub}`;
        }
        if (min < 10) {
            let minSub = min;
            min = `0${minSub}`;
        }
        Timer.innerText = `${min} : ${sec}`;
        validate();
    }
    return time;
}

function validate() {
    if (time > 0 && background & !countdown) {
        countdown = !countdown;
        interval();
    }
}

function interval() {
    const test = setInterval(function () {
        if (time === 0 && background) {
            Timer.innerText = `00 : 00`;
            clearInterval(test);
        } else if (time > 0 && background) {
            time--;
            let sec = time % 60;
            let min = (time - sec) / 60;
            if (sec < 10) {
                let secSub = sec;
                sec = `0${secSub}`;
            }
            if (min < 10) {
                let minSub = min;
                min = `0${minSub}`;
            }
            Timer.innerText = `${min} : ${sec}`;
        }
    }, 1000);
}

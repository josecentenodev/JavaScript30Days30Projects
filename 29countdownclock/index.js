let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timer
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds);
    displayEndTime(then);

    setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if it should stop
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTime(secondsLeft);
    }, 1000);
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${
        remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
    console.log(seconds);
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// we can just select an element by its name & children aswell
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})
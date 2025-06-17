let timerId = null;
let time = 25 * 60;
let isStopwatch = false;
let isRunning = false;

function updateDisplay() {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (timerId !== null || isRunning) return;
  isRunning = true;

  timerId = setInterval(() => {
    if (isStopwatch) {
      time++;
    } else {
      if (time <= 0) {
        stopTimer();
        return;
      }
      time--;
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
}

function resetTimer(duration = null) {
  stopTimer();
  if (isStopwatch) {
    time = 0;
  } else {
    time = (duration !== null ? duration : 25) * 60;
  }
  updateDisplay();
}

function switchToWork() {
  isStopwatch = false;
  resetTimer(25);
  document.body.style.backgroundImage = "url('study.jpg')";
  document.body.classList.add("has-bg-image");
  updateTimerBackground();
  updateColorPickersVisibility();
}

function switchToBreak() {
  isStopwatch = false;
  resetTimer(5);
  document.body.style.backgroundImage = "url('break.webp')";
  document.body.classList.add("has-bg-image");
  updateTimerBackground();
  updateColorPickersVisibility();
}

function switchToStopwatch() {
  stopTimer();
  isStopwatch = true;
  time = 0;
  document.body.style.backgroundImage = "none";
  document.body.classList.add("has-bg-image");
  updateTimerBackground();
  updateDisplay();
  updateColorPickersVisibility();
}

function updateColorPickersVisibility() {
  const hasBackgroundImage = document.body.style.backgroundImage && document.body.style.backgroundImage !== "none";

  // 背景色: 背景画像がある場合は非表示
  document.getElementById("bgColorLabel").style.display = hasBackgroundImage ? 'none' : 'inline-block';
  document.getElementById("bgColorPicker").style.display = hasBackgroundImage ? 'none' : 'inline-block';

  // 文字色: 背景画像がないときのみラベル表示、ピッカーは常に表示
  document.getElementById("textColorLabel").style.display = hasBackgroundImage ? 'none' : 'inline-block';
  document.getElementById("textColorPicker").style.display = 'inline-block';
}

// 背景画像を非表示にするボタン機能
function clearBackgroundImage() {
  document.body.style.backgroundImage = "none";
  document.body.classList.remove("has-bg-image");
  updateTimerBackground();
  updateColorPickersVisibility();
}

// 背景付きタイマー表示のためのCSSクラス管理
function updateTimerBackground() {
  const timer = document.getElementById("timer");
  const bgImage = document.body.style.backgroundImage;
  if (bgImage && bgImage !== "none") {
    timer.classList.add("timer-with-bg");
  } else {
    timer.classList.remove("timer-with-bg");
  }
}

function toggleFullscreen() {
  const icon = document.querySelector("#fullscreenBtn .material-icons");

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    icon.textContent = "fullscreen_exit";
  } else {
    document.exitFullscreen();
    icon.textContent = "fullscreen";
  }
}

// 背景色
document.getElementById("bgColorPicker").addEventListener("change", function () {
  document.body.style.backgroundColor = this.value;
});

// 文字色
document.getElementById("textColorPicker").addEventListener("change", function () {
  document.getElementById("timer").style.color = this.value;
});

updateColorPickersVisibility(); 

window.onload = function () {
  updateColorPickersVisibility();
};
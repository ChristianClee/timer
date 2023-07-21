const inputEl = document.querySelector('.input');
const buttonEl = document.querySelector('.button');
const timerEl = document.querySelector('.display');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

const createTimerAnimator = () => {
  let num = 0 
  return (seconds) => {
    num += 1
    const myNum = num
    timerEl.textContent = getFormatDate(seconds)
    const interval = setInterval(() => {
      if (num !== myNum || seconds == 0) {
        // it clean old setInterval when another setInterval starts or seconds == 0
        clearInterval(interval)
      } else {
        seconds -= 1
        timerEl.textContent = getFormatDate(seconds)
        if (seconds === 0) {
          getConfetti()
        }
      }
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();


inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  validate()
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  inputEl.value = '';
});


function getFormatDate(seconds) {
  // it gets format time from seconds
  switch (true) {
    case (seconds < 60):
      return `00:00:${getZero(seconds)}`
    case (seconds < 3600):
      return `00:${getMin_sec(seconds)}`
    default:
      return getHours_min_sec(seconds)
  }
function getZero(seconds) {
  let result = String(seconds)
  return (result.length < 2)? `0${result}` : `${result}`
}
function getMin_sec(seconds) {
  let min = Math.floor(seconds / 60)
  let sec = seconds % 60
  min = getZero(min)
  sec = getZero(sec)
  return `${min}:${sec}`
}
function getHours_min_sec(seconds) {
  let hours = Math.floor(seconds / 3600)
  hours = getZero(hours)

  let min = seconds % 3600
  min_sec = getMin_sec(min)
  return `${hours}:${min_sec}`
}
}
function validate() {
    const a = parseInt(inputEl.value)  
  if (!isNaN(a)) {
    inputEl.value = a
  } else {
    inputEl.value = ""
  }
}
function getConfetti() {
  confetti({
    spread: 75,
    particleCount: 100,
    origin: {
      y: 0.5,
      x: 0.5
    }
  })
}


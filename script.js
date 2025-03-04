// Funny Quotes
const funnyQuotes = [
  "Time waits for no one... except when you’re staring at this countdown. ⏳",
  "Countdowns: Because patience is overrated. ⏱️",
  "You’ll never get this time back… just saying. ⏰",
  "Tick-tock, my friend… the clock is judging you. ⌛",
  "Waiting for this countdown like it’s free pizza delivery. 🍕⏳"
];

// Set Random Quote
function setRandomQuote() {
  document.getElementById('quote').textContent = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
}
setRandomQuote();

// Store Timer Intervals
let intervals = {};

// 🔊 Play Alarm Sound
function playAlarm() {
  const alarmSound = document.getElementById('alarm');
  if (alarmSound) {
    alarmSound.play().catch(() => {
      alert("Timer finished! Enable sound to hear the alarm.");
    });
  }
}

// 🕒 Add Timer
document.getElementById('add-timer').addEventListener('click', function () {
  setRandomQuote();

  const nameInput = document.getElementById('timer-name').value.trim();
  const dateInput = document.getElementById('date').value;
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (!dateInput) {
    alert('Please select a date!');
    return;
  }

  // 📅 Calculate Target Date & Time
  const now = new Date();
  let targetDate = new Date(dateInput);
  targetDate.setHours(now.getHours() + hours);
  targetDate.setMinutes(now.getMinutes() + minutes);
  targetDate.setSeconds(now.getSeconds() + seconds);

  console.log("⏳ Target Date Set To:", targetDate); // Debugging Log

  if (isNaN(targetDate.getTime()) || targetDate <= now) {
    alert('Invalid date and time. Please enter a future time.');
    return;
  }

  const timerId = `timer-${Date.now()}`;
  const timersContainer = document.getElementById('timers-container');

  // 🎛️ Timer UI
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  timerElement.id = timerId;
  timerElement.innerHTML = `
    <p class="timer-name">${nameInput || 'Unnamed Timer'}</p>
    <p class="timer-date">📅 ${targetDate.toDateString()}</p>
    <div class="timer-display">
      <p><span id="${timerId}-days">00</span> Days</p>
      <p><span id="${timerId}-hours">00</span> Hours</p>
      <p><span id="${timerId}-minutes">00</span> Minutes</p>
      <p><span id="${timerId}-seconds">00</span> Seconds</p>
    </div>
    <button class="remove-btn" data-id="${timerId}">❌ Remove</button>
  `;
  timersContainer.appendChild(timerElement);

  // 🕒 Start Countdown After UI is Updated
  setTimeout(() => {
    startCountdown(timerId, targetDate, timerElement);
  }, 100);

  // 🗑️ Remove Timer
  timerElement.querySelector('.remove-btn').addEventListener('click', function () {
    clearInterval(intervals[timerId]);
    delete intervals[timerId];
    timerElement.remove();
  });
});

// Start Countdown Function
function startCountdown(timerId, targetDate, timerElement) {
  function updateTimer() {
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
      clearInterval(intervals[timerId]);
      delete intervals[timerId];
      playAlarm();

      // Show "Countdown Complete"
      timerElement.innerHTML = `
        <p class="timer-name">${timerElement.dataset.name || 'Unnamed Timer'}</p>
        <p class="timer-date">📅 ${targetDate.toDateString()}</p>
        <p>🎉 Countdown Complete! 🎉</p>
        <button class="remove-btn" data-id="${timerId}">❌ Remove</button>
      `;

      // Remove Timer Button
      timerElement.querySelector('.remove-btn').addEventListener('click', function () {
        clearInterval(intervals[timerId]);
        delete intervals[timerId];
        timerElement.remove();
      });

      return;
    }

    // Select elements safely
    const daysEl = document.getElementById(`${timerId}-days`);
    const hoursEl = document.getElementById(`${timerId}-hours`);
    const minutesEl = document.getElementById(`${timerId}-minutes`);
    const secondsEl = document.getElementById(`${timerId}-seconds`);

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return; // Prevents errors

    // Apply flip animation before updating numbers
    [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => {
      el.style.animation = "none";
      void el.offsetWidth; // Force reflow
      el.style.animation = "flip 0.6s ease-in-out";
    });

    // Update the countdown values
    daysEl.textContent = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    hoursEl.textContent = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    minutesEl.textContent = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    secondsEl.textContent = String(Math.floor((timeDiff % (1000 * 60)) / 1000)).padStart(2, '0');
  }

  // Store and Start Timer Interval
  intervals[timerId] = setInterval(updateTimer, 1000);
  updateTimer();
}

// 🌙 Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');
  document.querySelectorAll('.timer').forEach(timer => {
    timer.classList.toggle('dark-mode');
  });

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// 🌙 Apply Theme on Load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.container').classList.add('dark-mode');
    document.querySelectorAll('.timer').forEach(timer => {
      timer.classList.add('dark-mode');
    });
  }
});

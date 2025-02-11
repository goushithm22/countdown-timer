// script.js
document.getElementById('add-timer').addEventListener('click', function () {
  const targetDateInput = document.getElementById('date').value;
  if (!targetDateInput) {
    alert('Please select a target date and time!');
    return;
  }

  const targetDate = new Date(targetDateInput);
  const timerId = `timer-${Date.now()}`;
  const timersContainer = document.getElementById('timers-container');

  // Create timer element
  const timerElement = document.createElement('div');
  timerElement.classList.add('timer');
  timerElement.id = timerId;
  timerElement.innerHTML = `
    <div>
      <p><span id="${timerId}-days">00</span> Days</p>
      <p><span id="${timerId}-hours">00</span> Hours</p>
      <p><span id="${timerId}-minutes">00</span> Minutes</p>
      <p><span id="${timerId}-seconds">00</span> Seconds</p>
    </div>
    <button class="remove-btn" data-id="${timerId}">Remove</button>
  `;
  timersContainer.appendChild(timerElement);

  // Function to update the timer
  function updateTimer() {
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
      clearInterval(interval);
      document.getElementById(`${timerId}-days`).textContent = '00';
      document.getElementById(`${timerId}-hours`).textContent = '00';
      document.getElementById(`${timerId}-minutes`).textContent = '00';
      document.getElementById(`${timerId}-seconds`).textContent = '00';
      timerElement.innerHTML = `<p>Countdown Complete!</p>`;
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById(`${timerId}-days`).textContent = String(days).padStart(2, '0');
    document.getElementById(`${timerId}-hours`).textContent = String(hours).padStart(2, '0');
    document.getElementById(`${timerId}-minutes`).textContent = String(minutes).padStart(2, '0');
    document.getElementById(`${timerId}-seconds`).textContent = String(seconds).padStart(2, '0');
  }

  const interval = setInterval(updateTimer, 1000);
  updateTimer();

  // Remove timer functionality
  timerElement.querySelector('.remove-btn').addEventListener('click', function () {
    clearInterval(interval);
    timerElement.remove();
  });
});

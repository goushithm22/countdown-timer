# Countdown Timer ⏳

A simple yet effective **countdown timer web app** built with **HTML**, **CSS**, and **JavaScript**.  
This project helped me practice **DOM manipulation**, **event handling**, and updating the UI in real time — essential skills in dynamic front-end development.

---

## 🎯 Project Purpose

To understand and implement:
- JavaScript functions & time-based logic
- Real-time DOM updates
- Clean and structured event-driven code
- Basic front-end app interactivity

---

## 🚀 Features

- 🕒 Enter a custom future date/time
- ⏳ Live countdown display in **days, hours, minutes, and seconds**
- ⛔ Automatically stops once countdown hits zero
- 🔄 Simple UI with focused UX and responsive behavior

---

## 🛠️ Technologies Used

- **HTML5** – Structured layout with semantic elements  
- **CSS3** – Styling with Flexbox for responsive alignment  
- **JavaScript (Vanilla)** – Core logic and DOM manipulation for real-time updates  

---

## 📁 File Structure

```bash
countdown-timer/
│
├── index.html       # Main webpage structure
├── styles.css       # Custom styling for layout and design
└── script.js        # Countdown logic and DOM interaction
```

---

## 📸 Screenshot

*You can insert a screenshot of the timer interface here*

---

## 🔍 Key Learning Outcomes

- Mastered **JavaScript Date object** and time calculations  
- Practiced using `setInterval()` for real-time updates  
- Gained experience in **DOM selection and manipulation**
- Built a fully interactive and functional feature using only frontend tech  
- Understood **separation of concerns** between HTML, CSS, and JS

---

## 🧪 How It Works

1. User selects a future date and clicks "Start Countdown"
2. Timer starts counting down and updates every second
3. When countdown reaches zero, it stops and shows a completion message

```js
// Core Logic Example
const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  // Calculate days/hours/minutes/seconds
  // Update DOM
  if (distance < 0) clearInterval(interval);
}, 1000);
```

---

## ▶️ Run the Project

1. Clone the repo:
   ```bash
   git clone https://github.com/goushithm22/countdown-timer.git
   cd countdown-timer
   ```
2. Open `index.html` in your browser or use Live Server (VS Code).

---

## 🧩 Future Enhancements

- Add preset timers (e.g., 10 min, 1 hour)
- Add alert sound or confetti animation when countdown ends
- Allow pause/resume/reset functionality
- Improve mobile UI and add dark mode

---

## 📄 License

Licensed under the **MIT License** — feel free to use and improve.

---

## 🙌 Acknowledgements

- Built as part of my journey into **JavaScript fundamentals**
- Inspired by productivity and utility-based tools

---


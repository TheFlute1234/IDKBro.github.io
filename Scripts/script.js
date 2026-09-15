fetch('./event_dates/blue_band.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('blue-text');
    textContainer.textContent = data;
  }); 

fetch('./event_dates/gold_band.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('gold-text');
    textContainer.textContent = data;
  });

fetch('./event_dates/stage_band.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('stage-text');
    textContainer.textContent = data;
  }); 

fetch('./event_dates/class.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('class-text');
    textContainer.textContent = data;
  }); 

fetch('./event_dates/drama.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('drama-text');
    textContainer.textContent = data;
  }); 

const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar(month, year) {
  calendarDates.innerHTML = '';
  monthYear.textContent = `${months[month]} ${year}`;

  // Get the first day of the month
  const firstDay = new Date(year, month, 1).getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get today's date
  const today = new Date();

  // Create blanks before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    calendarDates.appendChild(blank);
  }

  // Populate the days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;

    // Highlight today's date
    if (
      i === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      day.classList.add('current-date');
    }

    calendarDates.appendChild(day);
  }
}

renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

calendarDates.addEventListener('click', (e) => {
  if (e.target.textContent !== '') {
    alert(`You clicked on ${e.target.textContent} ${months[currentMonth]} ${currentYear}`);
  }
});

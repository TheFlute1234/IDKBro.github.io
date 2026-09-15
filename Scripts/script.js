let events = [];

const eventFiles = [
  {
    file: './event_dates/gold_band.txt',
    name: 'Gold Band',
    className: 'gold-event'
  },
];

Promise.all(
  eventFiles.map(eventFile =>
    fetch(eventFile.file)
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');

        lines.forEach(line => {
          if (line.trim() === '') return;

          const [date, eventName] = line.split('|');

          events.push({
            date: date.trim(),
            name: eventName
              ? eventName.trim()
              : eventFile.name,
            className: eventFile.className
          });
        });
      })
  )
).then(() => {
  renderCalendar(currentMonth, currentYear);
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

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Blank spaces before the first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    calendarDates.appendChild(blank);
  }

  // Create the calendar days
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;

    // Highlight today
    if (
      i === today.getDate() &&
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      day.classList.add('current-date');
    }

    // Format the date as YYYY-MM-DD
    const dateString =
      `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    // Find events on this date
    const dayEvents = events.filter(event => event.date === dateString);

    // Display events on the day
    dayEvents.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.textContent = event.name;
      eventElement.classList.add(event.className);

      day.appendChild(eventElement);
    });

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

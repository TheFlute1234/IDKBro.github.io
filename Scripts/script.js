const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let goldBandEvents = [];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


// Load events from gold_band.txt
fetch('./event_dates/gold_band.txt')
  .then(response => response.text())
  .then(data => {

    const lines = data.split('\n');

    lines.forEach(line => {

      if (line.trim() === '') {
        return;
      }

      const parts = line.split('|');

      const date = parts[0].trim();
      const eventName = parts[1]
        ? parts[1].trim()
        : 'Gold Band Event';

      goldBandEvents.push({
        date: date,
        name: eventName
      });

    });

    renderCalendar(currentMonth, currentYear);
  });


// Draw the calendar
function renderCalendar(month, year) {

  calendarDates.innerHTML = '';

  monthYear.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();


  // Empty spaces before the first day
  for (let i = 0; i < firstDay; i++) {

    const blank = document.createElement('div');

    blank.classList.add('calendar-day', 'empty-day');

    calendarDates.appendChild(blank);
  }


  // Create each day
  for (let i = 1; i <= daysInMonth; i++) {

    const day = document.createElement('div');

    day.classList.add('calendar-day');

    day.textContent = i;


    // Highlight today
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {

      day.classList.add('current-date');

    }


    // Create date in YYYY-MM-DD format
    const dateString =
      `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;


    // Find events on this date
    const eventsToday = goldBandEvents.filter(
      event => event.date === dateString
    );


    // If there is an event, add a symbol
    if (eventsToday.length > 0) {

      const eventSymbol = document.createElement('span');

      eventSymbol.textContent = '🎵';

      eventSymbol.classList.add('event-symbol');

      day.appendChild(eventSymbol);

    }


    // Clicking a date
    day.addEventListener('click', () => {

      if (eventsToday.length > 0) {

        let message =
          `${months[month]} ${i}, ${year}\n\n`;

        eventsToday.forEach(event => {

          message += `🎵 ${event.name}\n`;

        });

        alert(message);

      } else {

        alert(
          `Nothing scheduled for ${months[month]} ${i}, ${year}.`
        );

      }

    });


    calendarDates.appendChild(day);
  }
}


// Previous month
prevMonthBtn.addEventListener('click', () => {

  currentMonth--;

  if (currentMonth < 0) {

    currentMonth = 11;
    currentYear--;

  }

  renderCalendar(currentMonth, currentYear);

});


// Next month
nextMonthBtn.addEventListener('click', () => {

  currentMonth++;

  if (currentMonth > 11) {

    currentMonth = 0;
    currentYear++;

  }

  renderCalendar(currentMonth, currentYear);

});

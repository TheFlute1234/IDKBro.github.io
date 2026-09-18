const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

const eventModal = document.getElementById('event-modal');
const eventModalTitle = document.getElementById('event-modal-title');
const eventModalContent = document.getElementById('event-modal-content');
const closeModalBtn = document.getElementById('close-modal');

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
  .then(response => {
    if (!response.ok) {
      throw new Error('Could not load gold_band.txt');
    }

    return response.text();
  })

  .then(data => {

    const lines = data.split(/\r?\n/);

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

  })

  .catch(error => {

    console.error(error);

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

    blank.classList.add(
      'calendar-day',
      'empty-day'
    );

    calendarDates.appendChild(blank);

  }


  // Create each day
  for (let i = 1; i <= daysInMonth; i++) {

    const day = document.createElement('button');

    day.type = 'button';

    day.classList.add('calendar-day');


    // Date number
    const dateNumber = document.createElement('span');

    dateNumber.classList.add('date-number');

    dateNumber.textContent = i;

    day.appendChild(dateNumber);


    // Highlight today's date
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


    // Show event symbol
    if (eventsToday.length > 0) {

      day.classList.add('has-event');

      const eventSymbol = document.createElement('span');

      eventSymbol.classList.add('event-symbol');

      eventSymbol.setAttribute(
        'aria-label',
        'Gold Band event'
      );

      eventSymbol.textContent = '●';

      day.appendChild(eventSymbol);

    }


    // Clicking a date
    day.addEventListener('click', () => {

      showEvents(
        month,
        year,
        i,
        eventsToday
      );

    });


    calendarDates.appendChild(day);

  }

}


// Show event information
function showEvents(
  month,
  year,
  day,
  eventsToday
) {

  eventModalTitle.textContent =
    `${months[month]} ${day}, ${year}`;

  eventModalContent.innerHTML = '';


  // No events
  if (eventsToday.length === 0) {

    const message = document.createElement('p');

    message.classList.add('no-event');

    message.textContent =
      'There are no Gold Band events scheduled for this day.';

    eventModalContent.appendChild(message);

  }


  // Events exist
  else {

    eventsToday.forEach(event => {

      const eventItem =
        document.createElement('div');

      eventItem.classList.add('event-item');


      const symbol =
        document.createElement('span');

      symbol.classList.add(
        'event-item-symbol'
      );

      symbol.textContent = '●';


      const name =
        document.createElement('span');

      name.textContent = event.name;


      eventItem.appendChild(symbol);

      eventItem.appendChild(name);

      eventModalContent.appendChild(
        eventItem
      );

    });

  }


  // Show popup
  eventModal.hidden = false;

  closeModalBtn.focus();

}


// Close popup
function closeModal() {

  eventModal.hidden = true;

}


closeModalBtn.addEventListener(
  'click',
  closeModal
);


// Close when clicking outside popup
eventModal.addEventListener(
  'click',
  event => {

    if (
      event.target.hasAttribute(
        'data-close-modal'
      )
    ) {

      closeModal();

    }

  }
);


// Close with Escape key
document.addEventListener(
  'keydown',
  event => {

    if (
      event.key === 'Escape' &&
      !eventModal.hidden
    ) {

      closeModal();

    }

  }
);


// Previous month
prevMonthBtn.addEventListener(
  'click',
  () => {

    currentMonth--;

    if (currentMonth < 0) {

      currentMonth = 11;

      currentYear--;

    }

    renderCalendar(
      currentMonth,
      currentYear
    );

  }
);


// Next month
nextMonthBtn.addEventListener(
  'click',
  () => {

    currentMonth++;

    if (currentMonth > 11) {

      currentMonth = 0;

      currentYear++;

    }

    renderCalendar(
      currentMonth,
      currentYear
    );

  }
);

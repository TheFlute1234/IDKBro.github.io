fetch('../event_dates/blue_band.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('blue-text');
    textContainer.textContent = data;
  }); 

fetch('../event_dates/gold_band.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('gold-text');
    textContainer.textContent = data;
  });

fetch('../event_dates/stage_band.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('stage-text');
    textContainer.textContent = data;
  }); 

fetch('../event_dates/class.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('class-text');
    textContainer.textContent = data;
  }); 

fetch('../event_dates/drama.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('drama-text');
    textContainer.textContent = data;
  }); 

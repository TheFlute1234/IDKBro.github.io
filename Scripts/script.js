// Change 'document.txt' to match your actual filename 
fetch('dates.txt') 
  .then(response => response.text()) 
  .then(data => { 
    const textContainer = document.getElementById('date-text').textContent;
    textContainer.textContent = data;
  }); 

// Import the render template module
import { renderTemplate } from '../shared/render';

// Add an async self-executing main function
(async() => {

  // Fetch the template source
  const template = await fetch('/templates/main.html').then(r => r.text());

  // Set a timer to change the message after 5 seconds
  setTimeout(async() => {

    // Fetch the new data
    const data = await fetch('/update').then(r => r.json());

    // Open the document
    document.open();
    
    // Replace the content
    document.write(renderTemplate(template, data));

    // Close the document
    document.close();
  
  // Run every 5 seconds
  }, 5000);

})();
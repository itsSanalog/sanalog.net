document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the user input from the URL input field
    var url = document.getElementById('urlInput').value;
  
    // Create the clickable link HTML
    var linkHTML = '<a href="' + url + '">' + url + '</a>';
  
    // Display the generated link
    document.getElementById('output').innerHTML = linkHTML;
  });
  
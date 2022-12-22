// Test deployment at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev

// Returns HTML template when client visits side, which sends a GET request to the server
const doGet = (e) => {
  return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Bookr');
}

// Global function to allow separation of HTML, CSS, and JavaScript
const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
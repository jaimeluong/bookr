// Test deployment at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev

// Returns HTML template when client visits side, which sends a GET request to the server
const doGet = (e) => {
  return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Bookr');
}

// Global function to allow separation of HTML, CSS, and JavaScript
const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Run in dev console for manual authorization
const forceAuthorization = () => {
  const sheets = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');
  const mail = GmailApp.getInboxUnreadCount();
  const drive = DriveApp.getStorageUsed();
  const calendar = CalendarApp.getAllCalendars();
}
// Test deployment at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev

// Returns HTML template when client visits side, which sends a GET request to the server
const doGet = (e) => { // doGet functions as a router to direct client to correct page based on request parameters
  switch (e.pathInfo) {
    case 'book': // Eventually break up into /propertyId/book somehow...
      return HtmlService.createTemplateFromFile('booking_application').evaluate().setTitle('Book a stay');
    case 'properties':
      return HtmlService.createTemplateFromFile('properties').evaluate().setTitle('Available properties');
    case 'bookings':
      return HtmlService.createTemplateFromFile('admin_bookings').evaluate().setTitle('Submitted bookings');
    case 'metrics':
      return HtmlService.createTemplateFromFile('metrics').evaluate().setTitle('Business metrics');
    case 'manage':
      return HtmlService.createTemplateFromFile('management').evaluate().setTitle('Property management');
    default: // Index page, with no pathInfo
      return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Bookr');
  }

  // Add logic for alternative routing if e.pathInfo is a propertyId number
}

// Global function to allow separation of HTML, CSS, and JavaScript
const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Get data of available properties from database to send to properties page
const getProperties = () => {
  let properties = SPREADSHEET.getSheetByName('Properties');
  let data = properties.getRange(2,1,properties.getLastRow()-1,properties.getLastColumn()).getValues();
  return data;
}

// Run in dev console for manual authorization
const forceAuthorization = () => {
  const accessibility = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');
  const mail = GmailApp.getInboxUnreadCount();
  const drive = DriveApp.getStorageUsed();
  const calendar = CalendarApp.getAllCalendars();
}
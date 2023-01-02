// Home page at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev
// Book link at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev/book?propertyId=1001
// Properties link at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev/properties
// Bookings link at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev/bookings
// Management link at https://script.google.com/macros/s/AKfycbwxYsTpb3W3QObNYOfYuBVjq8O6FOSQ4rAS9_yUBqY/dev/manage

// Returns HTML template when client visits page, which sends a GET request to the server to retrieve HTML
const doGet = (e) => { // doGet functions as a router to direct client to the correct page based on request parameters
  // Get array of properties' IDs for use in custom routing
  let properties = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo').getSheetByName('Properties');
  let arr = properties.getRange(2,1,properties.getLastRow()-1,1).getValues().flat().map(id => parseInt(id));

  switch (e.pathInfo) {
    case 'book':
      if(arr.indexOf(parseInt(e.parameter.propertyId)) !== -1) { // Looks for a property ID in the URL parameter that matches an existing property's
        let page = HtmlService.createTemplateFromFile('booking_application');
        page.propertyId = e.parameter.propertyId; // Gets property ID to make available in HTML
        let props = getNames();
        page.property = props[props.indexOf(e.parameter.propertyId.toString())+1] // Gets property name to make available in HTML
        let data = getProperties().flat().map(obj => obj.toString());
        page.url = data[data.indexOf(e.parameter.propertyId.toString())+9]; // Gets property image URL to make available in HTML
        return page.evaluate().setTitle('Book a stay');
      } else {
        return HtmlService.createTemplateFromFile('error').evaluate().setTitle('Error'); // Returns error page if a property was not found with that ID
      }
    case 'properties':
      return HtmlService.createTemplateFromFile('properties').evaluate().setTitle('Available properties');
    case 'bookings':
      return HtmlService.createTemplateFromFile('admin_bookings').evaluate().setTitle('Submitted bookings');
    case 'manage':
      return HtmlService.createTemplateFromFile('management').evaluate().setTitle('Property management');
    default: // Index page
      return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Bookr');
  }
}

// Global function to allow separation of HTML, CSS, and JavaScript
const include = (filename) => {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Global variable for database spreadsheet object
const SPREADSHEET = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');

// Get data of available properties from database to send to client-side
const getProperties = () => {
  let properties = SPREADSHEET.getSheetByName('Properties');
  let data = properties.getRange(2,1,properties.getLastRow()-1,properties.getLastColumn()).getValues(); // 2-dimensional array
  return data;
}

// Function that returns an array to match property IDs with their names
const getNames = () => {
  let properties = SPREADSHEET.getSheetByName('Properties');
  return properties.getRange(2,1,properties.getLastRow()-1,2).getValues().flat().map(id => id.toString()); // Return an array of strings, with name one index higher than ID
}

// Run in developer console for manual authorization
const forceAuthorization = () => {
  let s = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');
  let g = GmailApp.getInboxUnreadCount();
  let d = DriveApp.getStorageUsed();
  let c = CalendarApp.getAllCalendars();
}
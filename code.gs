// doGet functions as a router to direct client to the correct page based on request parameters

// Returns HTML template when client visits page, which sends a GET request to the server to retrieve HTML
const doGet = (e) => {
  // Get array of properties' IDs for use in custom routing
  let properties = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo').getSheetByName('Properties');
  let arr = properties.getRange(2,1,properties.getLastRow()-1,1).getValues().flat().map(id => parseInt(id));
  let page;

  switch (e.pathInfo) {
    case 'book':
      if(arr.indexOf(parseInt(e.parameter.propertyId)) !== -1) { // Looks for a property ID in the URL parameter that matches an existing property's
        page = HtmlService.createTemplateFromFile('booking_application');
        page.propertyId = e.parameter.propertyId; // Gets property ID to make available in HTML
        let props = getNames();
        page.property = props[props.indexOf(e.parameter.propertyId.toString())+1] // Gets property name to make available in HTML
        let data = getProperties().flat().map(obj => obj.toString());
        page.url = data[data.indexOf(e.parameter.propertyId.toString())+9]; // Gets property image URL to make available in HTML
        page.link = getLink(); // Gets active deployment link to make available in HTML
        return page.evaluate().setTitle('Book a stay');
      } else {
        return HtmlService.createTemplateFromFile('error').evaluate().setTitle('Error'); // Returns error page if a property was not found with that ID
      }
    case 'properties':
      page = HtmlService.createTemplateFromFile('properties');
      page.link = getLink();
      return page.evaluate().setTitle('Available properties');
    case 'bookings':
      page = HtmlService.createTemplateFromFile('admin_bookings');
      page.link = getLink();
      return page.evaluate().setTitle('Submitted bookings');
    case 'manage':
      page = HtmlService.createTemplateFromFile('management');
      page.link = getLink();
      return page.evaluate().setTitle('Property management');
    default: // Index page
      page = HtmlService.createTemplateFromFile('index');
      page.link = getLink();
      return page.evaluate().setTitle('Bookr');
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
  data.push(getLink());
  return data;
}

// Gets an array to match property IDs with their names
const getNames = () => {
  let properties = SPREADSHEET.getSheetByName('Properties');
  return properties.getRange(2,1,properties.getLastRow()-1,2).getValues().flat().map(id => id.toString()); // Return an array of strings, with name one index higher than ID
}

// Get active deployment link
const getLink = () => {
  return SPREADSHEET.getSheetByName('Link').getRange(1,1).getValue().toString();
}

// Run in developer console for manual authorization
const forceAuthorization = () => {
  let s = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');
  let g = GmailApp.getInboxUnreadCount();
  let d = DriveApp.getStorageUsed();
  let c = CalendarApp.getAllCalendars();
}
// Add stay to admin calendar with admin approval
const addToCalendar = (data) => {
  // Get calendar object
  let calendar = CalendarApp.getCalendarById('fffc98ba3466912503d94e403dbce979b73cc8e216b5eabd4e9904d8e393d3a0@group.calendar.google.com');

  // Get properties sheet to extract location data
  let propertiesSheet = SPREADSHEET.getSheetByName('Properties');

  // Get properties to match up IDs to names
  let properties = getNames();

  // Get data to create calendar event
  let title = `${data[2]} ${data[3]} at ${properties[properties.indexOf(data[7].toString())+1]}`;
  let startDate = data[8];
  let endDate = data[9];
  let acc;
  if(data[10] == 'TRUE') {
    acc = 'Yes';
  } else {
    acc = 'No';
  }
  let desc = `${data[2]} ${data[3]} and ${data[6]} guest(s) for ${data[12]} day(s)\n\nEmail address: ${data[4]}\nPhone number: ${data[5]}\nAccessibility provided: ${acc}`;
  let row = properties.indexOf(data[7].toString())+2;
  let location = `${propertiesSheet.getRange(row,3,1,1).getValue()}, ${propertiesSheet.getRange(row,4,1,1).getValue()}`;
  // let guests = data[4]; // Commenting out so mock email address data isn't used to invite guests

  // Create event on calendar and invite client to event
  let event = calendar.createAllDayEvent(title, startDate, endDate, { // event object isn't used but it must be declared for createAllDayEvent() to work
    description: desc,
    location: location,
    // guests: guests,
  });
}
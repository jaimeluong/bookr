// Add stay to admin Bookr calendar if admin has approved stay
const addToCalendar = (data) => {
  // Get calendar object
  let calendar = CalendarApp.getCalendarById('fffc98ba3466912503d94e403dbce979b73cc8e216b5eabd4e9904d8e393d3a0@group.calendar.google.com');

  // Get data to create calendar event
  let title = `${data[2]} ${data[3]} at propertyName`; // Insert propertyName variable after routing configuration
  let startDate = data[8];
  let endDate = data[9];
  let acc;
  if(data[10] == 'TRUE') {
    acc = 'Yes';
  } else {
    acc = 'No';
  }
  let desc = `${data[2]} ${data[3]} and ${data[6]} guest(s) for ${data[12]} day(s)\n\nEmail address: ${data[4]}\nPhone number: ${data[5]}\nAccessibility provided: ${acc}`;
  let location = data[7]; // Will show up as blank for now until routing is configured
  // let guests = data[4]; // Commenting out so mock email address data isn't used to invite guests

  // Create event on calendar and invite client to event
  let event = calendar.createAllDayEvent(title, startDate, endDate, {
    description: desc,
    location: location,
    // guests: guests,
  });
}
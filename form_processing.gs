// Global variable for database spreadsheet object
const SPREADSHEET = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');

// Process booking application form when user hits Submit
const processBookingForm = (formObject) => {
  const applications = SPREADSHEET.getSheetByName('Applications'); // Applications sheet
  let row = applications.getLastRow()+1; // Row to deposit last submission
  let dataLegend = [ // Map keys of form submission to column
    [1, Utilities.getUuid()],
    [2, new Date()],
    [3, formObject.firstName],
    [4, formObject.lastName],
    [5, formObject.email],
    [6, formObject.phone],
    [7, formObject.guests],
    // Add in property_requested field based off of the form the user is using (after booking link is added directly to property page)
    [9, formObject.checkinDate],
    [10, formObject.checkoutDate],
    [11, formObject.accessibility],
    [12, formObject.promoEmails],
    [13, dateDifference(convertToDate(formObject.checkoutDate), convertToDate(formObject.checkinDate))]
  ];

  // Loop through legend to set values
  for(var i=0; i<dataLegend.length; i++) {
    applications.getRange(row,dataLegend[i][0]).setValue(dataLegend[i][1]);
  }
}

// Determine date difference (inclusive) between check-in and check-out times
const dateDifference = (start, end) => {
  return (start.getTime()-end.getTime())/(1000*60*60*24)+1;
}

// Convert date string to date object
const convertToDate = (date) => {
  return new Date(date);
}
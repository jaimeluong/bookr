// Global variable for database spreadsheet object
const SPREADSHEET = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');

// Process booking application form
const processBookingForm = (formObject) => {
  const applications = SPREADSHEET.getSheetByName('Applications');
  let row = applications.getLastRow()+1;

  // Refactor to loop over formObject
  // Refactor to use dynamic column numbers
  // Write helper function to determine length of stay in days (inclusive)
  // property_requested field will be filled out based on user's booking page (booking link directly from property viewing)
  applications.getRange(row,1).setValue(Utilities.getUuid());
  applications.getRange(row,2).setValue(new Date());
  applications.getRange(row,3).setValue(formObject.firstName);
  applications.getRange(row,4).setValue(formObject.lastName);
  applications.getRange(row,5).setValue(formObject.email);
  applications.getRange(row,6).setValue(formObject.phone);
  applications.getRange(row,7).setValue(formObject.guests);
  applications.getRange(row,9).setValue(formObject.checkinDate);
  applications.getRange(row,10).setValue(formObject.checkoutDate);
  applications.getRange(row,11).setValue(formObject.accessibility);
  applications.getRange(row,13).setValue(formObject.promoEmails);
}
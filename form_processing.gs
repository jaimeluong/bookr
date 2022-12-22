// Global variable for database spreadsheet object
const SPREADSHEET = SpreadsheetApp.openById('1o8zttMRHnp2Yf493vDYB2SJ_1xXwK1EkB8jgnAWAdVo');

// Process booking application form
const processBookingForm = (formObject) => {
  const applications = SPREADSHEET.getSheetByName('Applications');
  let row = applications.getLastRow()+1;
  let id = Utilities.getUuid();
  let time = new Date();

  applications.getRange(row,1).setValue(id);
  applications.getRange(row,2).setValue(time);
  applications.getRange(row,3).setValue(formObject.firstName);
  applications.getRange(row,4).setValue(formObject.lastName);
  applications.getRange(row,5).setValue(formObject.email);
  applications.getRange(row,6).setValue(formObject.phone);
}
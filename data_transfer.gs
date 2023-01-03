// Allow admin to manually approve bookings, which triggers certain actions
const transferBookings = () => {
  // Get relevant sheet objects
  let applicationsSheet = SPREADSHEET.getSheetByName('Applications');
  let bookingsSheet = SPREADSHEET.getSheetByName('Bookings');

  // Get current cell
  let currentCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getCurrentCell();

  // Check for edit conditions to proceed, only if the correct column is modified with specific values
  if(currentCell.getColumn() == 14) {
    if(currentCell.getValue() === 'YES') { // Send row to Bookings sheet, send confirmation email to client, add stay to calendar
      let data = applicationsSheet.getRange(currentCell.getRow(),1,1,13).getValues();
      bookingsSheet.getRange(bookingsSheet.getLastRow()+1,1,1,13).setValues(data);
      sendStatusEmail(bookingsSheet, currentCell.getRow(), true);
      addToCalendar(data.flat());
    } else if(currentCell.getValue() === 'NO') { // Send rejection email if admin has rejected
      sendStatusEmail(applicationsSheet, currentCell.getRow(), false);
    }
  }
}
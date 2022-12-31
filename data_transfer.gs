// Transfer approved bookings to new sheet after admin approval, runs on edit to transfer data
const transferBookings = () => {
  // Get relevant sheet objects
  let applicationsSheet = SPREADSHEET.getSheetByName('Applications')
  let bookingsSheet = SPREADSHEET.getSheetByName('Bookings');

  // Get current cell
  let currentCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getCurrentCell();

  // Handle admin approval or rejection of booking application
  if(currentCell.getColumn() == 14) {
    if(currentCell.getValue() === 'YES') { // Send approved email if admin has approved, send data to confirmed Bookings sheet
      let data = applicationsSheet.getRange(currentCell.getRow(),1,1,13).getValues();
      bookingsSheet.getRange(bookingsSheet.getLastRow()+1,1,1,13).setValues(data);
      sendStatusEmail(bookingsSheet, currentCell.getRow(), true);
    } else if(currentCell.getValue() === 'NO') { // Send rejection email if admin has rejected
      sendStatusEmail(applicationsSheet, currentCell.getRow(), false);
    }
  }
}
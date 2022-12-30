// Transfer approved bookings to new sheet after admin approval, runs on edit to transfer data
const transferBookings = () => {
  // Get relevant sheet objects
  let applicationsSheet = SPREADSHEET.getSheetByName('Applications')
  let bookingsSheet = SPREADSHEET.getSheetByName('Bookings');

  // Get current cell
  let currentCell = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getCurrentCell();

  // Only send data to Bookings sheet if the admin manually approves it
  if(currentCell.getColumn() == 14 && currentCell.getValue() === 'YES') {
    let data = applicationsSheet.getRange(currentCell.getRow(),1,1,13).getValues();
    bookingsSheet.getRange(bookingsSheet.getLastRow()+1,1,1,13).setValues(data);

    // Send approved email after admin has approved
    sendApprovedEmail(bookingsSheet, currentCell.getRow());
  }
}
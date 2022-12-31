// Send a confirmation email to the applicant after they've submitted a booking
const sendConfirmationEmail = (formObject) => {
  // Create htmlTemplate object to insert variables into HTML
  let htmlTemplate = HtmlService.createTemplateFromFile('confirmation_email');
  
  // Create variables to pass into email template
  htmlTemplate.firstName = formObject.firstName;
  htmlTemplate.lastName = formObject.lastName;
  htmlTemplate.email = formObject.email;
  htmlTemplate.phone = formObject.phone;
  htmlTemplate.guests = formObject.guests;
  // Put in propertyName when I figure out custom routing
  htmlTemplate.checkinDate = formObject.checkinDate;
  htmlTemplate.checkoutDate = formObject.checkoutDate;
  if(formObject.accessibility == 'TRUE') {
    htmlTemplate.accessibility = 'Yes';
  } else {
    htmlTemplate.accessibility = 'No';
  }
  htmlTemplate.days = dateDifference(convertToDate(formObject.checkoutDate), convertToDate(formObject.checkinDate));

  // Create htmlBody object from htmlTemplate
  let body = htmlTemplate.evaluate().getContent();

  // Send email, this version is for dev purposes because we do not want to be sending emails to random people
  GmailApp.sendEmail('jaime.luong@gmail.com', `[Bookr] Booking confirmation for ${formObject.firstName} ${formObject.lastName} on ${Utilities.formatDate(convertToDate(formObject.checkinDate), 'GMT', 'MM-dd-yyyy')}`, '', {
    htmlBody: body
  });
  
  // Prod version
  // GmailApp.sendEmail(formObject.email, `[Bookr] Booking confirmation for ${formObject.firstName} ${formObject.lastName} on ${Utilities.formatDate(convertToDate(formObject.checkinDate), 'GMT', 'MM-dd-yyyy')}`, '', {
  //   htmlBody: body
  // });
}

// Send an approved email if the admin has approved the stay or a rejection email if the admin has rejected the stay
const sendStatusEmail = (sheet, row, approved) => {
  // Array of row data in Bookings or Applications sheet
  let data = sheet.getRange(row,1,1,10).getValues().flat();

  // Create htmlTemplate object to insert variables into HTML depending on if approved or rejected
  let htmlTemplate;
  if(approved) {
    htmlTemplate = HtmlService.createTemplateFromFile('approved_email');
  } else {
    htmlTemplate = HtmlService.createTemplateFromFile('rejection_email');
  }

  // Create variables to pass into email template
  htmlTemplate.firstName = data[2];
  // Put in propertyName when I figure out custom routing
  htmlTemplate.checkinDate = Utilities.formatDate(data[8], 'GMT', 'MM-dd-yyyy');
  htmlTemplate.checkoutDate = Utilities.formatDate(data[9], 'GMT', 'MM-dd-yyyy');
  htmlTemplate.timestamp = Utilities.formatDate(data[1], 'GMT', 'MM-dd-yyyy');

  // Create htmlBody object from htmlTemplate
  let body = htmlTemplate.evaluate().getContent();

  if(approved) {
    // Send email, this version is for dev purposes because we do not want to be sending emails to random people
    GmailApp.sendEmail('jaime.luong@gmail.com', `[Bookr] Booking approval for ${data[2]} ${data[3]} on ${Utilities.formatDate(data[8], 'GMT', 'MM-dd-yyyy')}`, '', {
      htmlBody: body
    });

    // Prod version
    // GmailApp.sendEmail(data[4], `[Bookr] Booking approval for ${data[2]} ${data[3]} on ${Utilities.formatDate(data[8], 'GMT', 'MM-dd-yyyy')}`, '', {
    //   htmlBody: body
    // });
  } else {
    // Send email, this version is for dev purposes because we do not want to be sending emails to random people
    GmailApp.sendEmail('jaime.luong@gmail.com', `[Bookr] Booking rejection for ${data[2]} ${data[3]} on ${Utilities.formatDate(data[8], 'GMT', 'MM-dd-yyyy')}`, '', {
      htmlBody: body
    });

    // Prod version
    // GmailApp.sendEmail(data[4], `[Bookr] Booking rejection for ${data[2]} ${data[3]} on ${Utilities.formatDate(data[8], 'GMT', 'MM-dd-yyyy')}`, '', {
    //   htmlBody: body
    // });
  }
}

// Send a reminder email two days before the stay is to begin
// Trigger installed to run every morning at 8 AM
const sendReminderEmail = () => {
  // Get sheet object and data
  let bookingsSheet = SPREADSHEET.getSheetByName('Bookings');
  let bookingData = bookingsSheet.getRange(2,1,bookingsSheet.getLastRow()-1,13).getValues();

  // Get current date
  let today = new Date('December 29, 2022 08:30:00 -0600');

  // Loop through data to send reminder emails
  for(var i=0; i<bookingData.length; i++) {
    if(Math.round((bookingData[i][8].getTime()-today.getTime())/(1000*60*60*24)) == 2) {
      // Create htmlTemplate object to insert variables into HTML
      let htmlTemplate = HtmlService.createTemplateFromFile('reminder_email');

      // Create variables to pass into email template
      htmlTemplate.firstName = bookingData[i][2];
      htmlTemplate.lastName = bookingData[i][3];
      htmlTemplate.email = bookingData[i][4];
      htmlTemplate.phone = bookingData[i][5];
      htmlTemplate.guests = bookingData[i][6];
      htmlTemplate.checkinDate = Utilities.formatDate(bookingData[i][8], 'GMT', 'MM-dd-yyyy');
      htmlTemplate.checkoutDate = Utilities.formatDate(bookingData[i][9], 'GMT', 'MM-dd-yyyy');
      htmlTemplate.days = bookingData[i][12];

      // Create htmlBody object from htmlTemplate
      let body = htmlTemplate.evaluate().getContent();

      // Send email, this version is for dev purposes because we do not want to be sending emails to random people
      GmailApp.sendEmail('jaime.luong@gmail.com', `[Bookr] Reminder of upcoming reservation starting on ${Utilities.formatDate(bookingData[i][8], 'GMT', 'MM-dd-yyyy')}`, '', {
        htmlBody: body
      });

      // Prod version
      // GmailApp.sendEmail(bookingData[i][4], `[Bookr] Reminder of upcoming reservation starting on ${Utilities.formatDate(bookingData[i][8], 'GMT', 'MM-dd-yyyy')}`, '', {
      //   htmlBody: body
      // });
    }
  }
}
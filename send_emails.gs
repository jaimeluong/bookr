// Send a confirmation email to the applicant after they've submitted a booking
const sendConfirmationEmail = (formObject) => {
  // Create htmlTemplate object to insert variables into HTML
  var htmlTemplate = HtmlService.createTemplateFromFile("confirmation_email");
  
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
  var body = htmlTemplate.evaluate().getContent();

  // Send email, this version is for dev purposes because we do not want to be sending emails to random people
  GmailApp.sendEmail('jaime.luong@gmail.com', `Booking confirmation for ${formObject.firstName} ${formObject.lastName} on ${formObject.checkinDate}`, '', {
    htmlBody: body
  });
  
  // Prod version
  // GmailApp.sendEmail(formObject.email, `Booking confirmation for ${formObject.firstName} ${formObject.lastName} on ${formObject.checkinDate}`, '', {
  //   htmlBody: body
  // });
}

// Send an approved email if the admin has approved the stay
const sendApprovedEmail = (sheet, row) => {
  // Array of row data in Bookings sheet
  let data = sheet.getRange(row,1,1,10).getValues().flat();

  // Create htmlTemplate object to insert variables into HTML
  var htmlTemplate = HtmlService.createTemplateFromFile("approved_email");

  // Create variables to pass into email template
  htmlTemplate.firstName = data[2];
  // Put in propertyName when I figure out custom routing
  htmlTemplate.checkinDate = Utilities.formatDate(data[8], "GMT", 'MM-dd-yyyy');
  htmlTemplate.checkoutDate = Utilities.formatDate(data[9], "GMT", 'MM-dd-yyyy');

  // Create htmlBody object from htmlTemplate
  var body = htmlTemplate.evaluate().getContent();

  // Send email, this version is for dev purposes because we do not want to be sending emails to random people
  GmailApp.sendEmail('jaime.luong@gmail.com', `Booking approval for ${data[2]} ${data[3]} on ${Utilities.formatDate(data[8], "GMT", 'MM-dd-yyyy')}`, '', {
    htmlBody: body
  });
  
  // Prod version
  // GmailApp.sendEmail(data[4], `Booking approval for ${data[2]} ${data[3]} on ${Utilities.formatDate(data[8], "GMT", 'MM-dd-yyyy')}`, '', {
  //   htmlBody: body
  // });
}
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

  
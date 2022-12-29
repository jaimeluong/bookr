// Send a confirmation email to the applicant after they've submitted a booking
const sendConfirmationEmail = (formObject) => {
  // GmailApp.sendEmail(formObject.email, `Booking confirmation for ${formObject.firstName} ${formObject.lastName} on ${formObject.checkinDate}`, 'lorem ipsum');
  
  // This version is for dev purposes because we do not want to be sending emails to random people
  GmailApp.sendEmail('jaime.luong@gmail.com', `Booking confirmation for ${formObject.firstName} ${formObject.lastName} on ${formObject.checkinDate}`, 'lorem ipsum'); // Change to method with 4 options in order to use htmlBody in advanced parameters
}
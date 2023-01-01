// Process booking application form when user hits Submit
const processBookingForm = (formObject) => {
  const applications = SPREADSHEET.getSheetByName('Applications'); // Applications sheet
  let row = applications.getLastRow()+1; // Row to deposit latest submission
  let dataLegend = [ // Map keys of form submission to column
    [1, Utilities.getUuid()],
    [2, new Date()],
    [3, formObject.firstName],
    [4, formObject.lastName],
    [5, formObject.email],
    [6, formObject.phone],
    [7, formObject.guests],
    [8, formObject.propertyId],
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

  // Call sendConfirmationEmail function and pass in form object
  sendConfirmationEmail(formObject);
}

// Process add form when admin submits a new property to the database
const processAddForm = (formObject) => {
  const properties = SPREADSHEET.getSheetByName('Properties'); // Properties sheet
  let row = properties.getLastRow()+1; // Row to deposit latest submission
  let dataLegend = [ // Map keys of form submission to column
    [1, properties.getLastRow()+1000],
    [2, formObject.name],
    [3, formObject.city],
    [4, formObject.state],
    [5, formObject.type],
    [6, formObject.guests],
    [7, formObject.beds],
    [8, formObject.baths],
    [9, formObject.price],
    [10, formObject.url]
  ];

  // Loop through legend to set values
  for(var i=0; i<dataLegend.length; i++) {
    properties.getRange(row,dataLegend[i][0]).setValue(dataLegend[i][1]);
  }
}

// Process delete form when admin deletes a property from the database
const processDeleteForm = (formObject) => {
  const properties = SPREADSHEET.getSheetByName('Properties'); // Properties sheet
  let data = properties.getRange(2,1,properties.getLastRow()+1,1).getValues().flat().map(id => id.toString());
  properties.deleteRow(data.indexOf(formObject.property)+2);
}

// Process modify form when admin updates a property's fields in the database
const processModifyForm = (formObject) => {
  const properties = SPREADSHEET.getSheetByName('Properties'); // Properties sheet
  let data = properties.getRange(2,1,properties.getLastRow()+1,1).getValues().flat().map(id => id.toString());
  let row = data.indexOf(formObject.property)+2
  let dataLegend = [ // Map keys of form submission to column
    [1, formObject.property],
    [2, formObject.name],
    [3, formObject.city],
    [4, formObject.state],
    [5, formObject.type],
    [6, formObject.guests],
    [7, formObject.beds],
    [8, formObject.baths],
    [9, formObject.price],
    [10, formObject.url]
  ];
  // Loop through legend to set values
  for(var j=0; j<dataLegend.length; j++) {
    properties.getRange(row,dataLegend[j][0],1,1).setValue(dataLegend[j][1]);
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
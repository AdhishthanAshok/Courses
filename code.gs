function onEdit() {
  // Getting basic things ready ...
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getActiveRange();
  var column = range.getColumn();

  // Check if the edited cell is in the "post August" tab
  if (sheet.getName() === "post August" && column === 4) {
    // Get the current date and time
    var dateTime = new Date();
    var date = Utilities.formatDate(dateTime, "GMT+5:30", "yyyy-MM-dd");
    var time = Utilities.formatDate(dateTime, "GMT+5:30", "HH:mm:ss");

    // Write date, time, and "1" to the corresponding cells in the same row
    if (range.getRow() !== 1) {
      sheet.getRange(range.getRow(), 2).setValue(date);
      sheet.getRange(range.getRow(), 3).setValue(time);
      sheet.getRange(range.getRow(), 1).setValue(1);

      // Calculate and update the sum at the end of the sheet
      updateSum(sheet);
      // Calling the Dashboard function
      updateDashboard();
    }
  }
}

function updateSum(sheet) {
  // Storing the basic variable
  var lastRow = sheet.getLastRow();
  var sum = 0;

  // Loop through all the "1" values in column 1 and calculate the sum
  for (var i = 1; i <= lastRow; i++) {
    var value = sheet.getRange(i, 1).getValue();
    if (value === 1) {
      sum++;
    }
  }

  // Writing the sum in the first columns last cell
  sheet.getRange(lastRow + 1, 1).setValue(sum);
}

function updateDashboard() {
  // making variable for triggering both files.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var machinesSheet = ss.getSheetByName("post August");
  var dashboardSheet = ss.getSheetByName("Dashboard");

  // Get the values from the "post August" sheet starting from row 1 (Including Headers)
  var data = machinesSheet
    .getRange(1, 1, machinesSheet.getLastRow() - 1, 1)
    .getValues();

  // Calculate the sum of "1" values
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] === 1) {
      sum++;
    }
  }
  //  Difference section
  var lastRow = dashboardSheet.getLastRow();
  var previousSum = 0;
  var differ = 0;
  // making lastRow > 1 because of the Headers.
  if (lastRow > 1) {
    var range = dashboardSheet.getRange("B" + lastRow);
    if (range.getValue() !== "") {
      previousSum = range.getValue();
      differ = sum - previousSum;
    }
  }

  // Write the sum to the "Dashboard" sheet
  var dateTime = new Date();
  var date = Utilities.formatDate(dateTime, "GMT+5:30", "yyyy-MM-dd");
  // for the first value differ will be equal to 0 so we make differ move 1 row and added a condition..
  if (differ !== 0) {
    dashboardSheet.appendRow([date, sum, differ]);
  } else {
    dashboardSheet.appendRow([date, sum]);
  }
}


function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    // Check if headers exist, if not, create them
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp", 
        "Name", 
        "Email ID", 
        "Contact Number", 
        "Experience", 
        "Role", 
        "Location", 
        "Current CTC", 
        "Expected CTC", 
        "Notice Period", 
        "CV Link"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
    }
    
    // Handle CV Upload to Google Drive if provided
    var cvUrl = "No CV provided";
    if (data.cv && data.cv.includes("base64")) {
      var folderName = "Job_Applications_CVs";
      var folders = DriveApp.getFoldersByName(folderName);
      var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
      
      var contentType = data.cv.substring(5, data.cv.indexOf(';'));
      var bytes = Utilities.base64Decode(data.cv.split(',')[1]);
      var blob = Utilities.newBlob(bytes, contentType, data.cvName || "CV_" + data.name + ".pdf");
      var file = folder.createFile(blob);
      cvUrl = file.getUrl();
    }
    
    // Append the user data
    sheet.appendRow([
      data.submittedAt,
      data.name,
      data.email,
      "'" + data.phone, // Force as string to preserve leading zeros if any
      data.experience,
      data.role,
      data.location,
      data.currentCTC,
      data.expectedCTC,
      data.noticePeriod,
      cvUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (f) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": f.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

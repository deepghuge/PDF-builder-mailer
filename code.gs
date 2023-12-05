


function createBulkPDF() {
  const docfile = DriveApp.getFileById("ID_of_googledocs_file");
  const tempfolder = DriveApp.getFolderById("ID_of_temperorystorage_folder");
  const pdffolder = DriveApp.getFolderById("ID_of_pdfstorage_folder");
  const currentsheet = SpreadsheetApp.openById("Sheet_ID").getSheetByName("Sheet1_Name");

  const data = currentsheet.getRange(2,1,currentsheet.getLastRow()-1,3).getValues();
  

  data.forEach(row => {
    //
    createPDF(row[0],row[1],"Letter for "+row[0]+" "+row[1],docfile,tempfolder,pdffolder);
    //
  })
}

function createPDF(firstname,lastname,pdfname,docfile,tempfolder,pdffolder) {


  

  const tempfile = docfile.makeCopy(tempfolder);
  const tempdocfile = DocumentApp.openById(tempfile.getId());
  const body = tempdocfile.getBody();


  body.replaceText("{first}",firstname);
  body.replaceText("{last}",lastname);
  tempdocfile.saveAndClose();


  const pdfcontentblob = tempfile.getAs(MimeType.PDF);
  pdffolder.createFile(pdfcontentblob).setName(pdfname);
  tempfile.setTrashed(true);



}

function sendMails(){
  var workbook = SpreadsheetApp.openById("Sheet_ID");
  var emails = workbook.getSheetByName("Sheet1_Name");
  var message = workbook.getSheetByName("Sheet2_Name");
  var subject = message.getRange('A2').getValue();
  var lencounter = emails.getLastRow();
  var emailfolder = DriveApp.getFoldersByName('PDF_Folder_Name').next();
  
  let status = [];

  for (var i=2;i<=lencounter;i++){
      
    var fname = emails.getRange('A' + i).getValue();
    var lname = emails.getRange('B' + i).getValue();
    var emailaddress = emails.getRange('C' + i).getValue();
    var filename = emails.getRange('D' + i).getValue();
    
    var file = emailfolder.getFilesByName(filename);



    var htmlBody = HtmlService.createHtmlOutputFromFile('format.html');
    var htmltext = htmlBody.getContent();
    finalmsg = "Hi " + fname + " " + lname + "," + htmltext;

    try {MailApp.sendEmail(emailaddress,subject,finalmsg,{attachments:[file.next().getAs(MimeType.PDF)],htmlBody:finalmsg});
    status.push(["sent"]);
    }catch(err){
    status.push(["failed"]);  
    }
    
  }
  
  emails.getRange(2,5,emails.getLastRow()-1,1).setValues(status);
}


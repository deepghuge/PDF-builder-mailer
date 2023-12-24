# PDF-builder-mailer
This Google Apps Script is designed to streamline the process of generating personalized PDFs and sending them via email to a list of recipients. The script utilizes Google Docs for the template, Google Sheets for data storage, and Google Drive for temporary and final file storage.

## Prerequisites
Google Docs Template: Ensure you have a Google Docs template with placeholders like "{first}" and "{last}" that will be dynamically replaced with actual data.

Google Sheets: Set up a Google Sheets document with two sheets - one for recipient details (Sheet1) and another for email configuration (Sheet2).

Folder IDs: Obtain the unique IDs of the Google Docs file, the temporary storage folder, the PDF storage folder, and the spreadsheet containing recipient details.

HTML Email Template: Create an HTML file (format.html) containing the desired email content. Ensure it is uploaded in the same directory as the script.

## Configuration
Open the script and replace the placeholder "ID_of_googledocs_file" with the actual ID of your Google Docs template.

Replace "ID_of_temperorystorage_folder" with the ID of the folder used for temporary storage.

Replace "ID_of_pdfstorage_folder" with the ID of the folder where the final PDFs will be stored.

Replace "Sheet_ID" with the ID of the Google Sheets document.

Replace "Sheet1_Name" with the name of the sheet containing recipient details.

Replace "Sheet2_Name" with the name of the sheet containing email configuration.

Replace "PDF_Folder_Name" with the name of the folder in Google Drive where the PDFs will be stored.

## Usage
Run the createBulkPDF() function to generate personalized PDFs for each recipient.

Run the sendMails() function to send emails to the recipients with the attached PDFs.

Please note that this script assumes that the recipient details are stored in columns A, B, and C of Sheet1, and the email configuration (including the email subject) is in Sheet2. The script logs the status of each email (sent or failed) in column E of Sheet1.

Feel free to customize the script and HTML template according to your specific needs.

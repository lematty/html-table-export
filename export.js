// Add URL here
const url = 'https://www.some-url-here.com';

/*
* Go to the URL where you want to download the table..
* Inspect table element (make sure its of type <table>),
* Right click on table element
* Copy => Copy selector
* Replace the value for selector by pasting the copied selector value
*/
const selector = 'body > table'; // Add table selector here

let validUrl;
try {
  validUrl = new URL(url);
} catch (error) {
  validUrl = '';
}

const fileName = validUrl.host ? `${validUrl.host}.xlsb` : 'table.xlsb';

function createScriptTag(source, content) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = source || '';
  script.text = content || '';
  document.head.appendChild(script);
}

function addSheetsJS() {
  const sheetsJs = 'https://unpkg.com/xlsx/dist/xlsx.full.min.js'; // SheetsJS CDN
  createScriptTag(sheetsJs, '');
}

function addSheetsDownloader() {
  setTimeout(() => { // to make sure this runs after the library script
    createScriptTag('', download());
  }, 3000);
}

function download() {
  const htmlTable = document.querySelector(selector);
  const workbook = XLSX.utils.table_to_book(htmlTable);
  XLSX.writeFile(workbook, fileName);
}

addSheetsJS();
addSheetsDownloader();

// ============================================================
// Personal Training Mission — Google Apps Script Backend
// วาง code นี้ใน Apps Script แล้ว Deploy เป็น Web App
// ============================================================

const SHEET_NAME = 'PTM_Data';

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['key', 'value', 'updated_at']);
    sheet.getRange('A1:C1').setFontWeight('bold');
  }
  return sheet;
}

// ── GET (Restore) ─────────────────────────────────────────────
function doGet(e) {
  const params = e.parameter;
  const key = params.key || '';
  
  if (params.action === 'load' && key) {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === key) {
        return ContentService
          .createTextOutput(JSON.stringify({ ok: true, value: data[i][1] }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, value: null }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'PTM Drive API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── POST (Backup) ─────────────────────────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { action, key, value } = body;

    if (action === 'save' && key) {
      const sheet = getSheet();
      const data = sheet.getDataRange().getValues();
      const now = new Date().toISOString();
      
      // Update existing row or append new
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === key) {
          sheet.getRange(i + 1, 2, 1, 2).setValues([[value, now]]);
          return ContentService
            .createTextOutput(JSON.stringify({ ok: true, msg: 'updated' }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      sheet.appendRow([key, value, now]);
      return ContentService
        .createTextOutput(JSON.stringify({ ok: true, msg: 'created' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

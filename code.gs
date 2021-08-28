function doGet(e) {
  if (!e.parameter.page) {
    var template = HtmlService.createTemplateFromFile('index')
    return  template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
  }
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width , initial-scale=1')
}


function getUrl() {
  var url = ScriptApp.getService().getUrl()
  return url
}

function uploadFiles(form) {
  try {
    var folderDes = DriveApp.getFolderById('1Xhbh2jQMX_VSQZ8f52H9t8BJHlM5ueun')
    var subFolder = form.myLecturer
    var folder, folders = DriveApp.getFoldersByName(subFolder);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = folderDes.createFolder(subFolder);
    }
    var home = "https://script.google.com/macros/s/AKfycbxddpLioVlYU1cxQG65r2Feex0GS9wcMdqeMltsL8qg_wmolscR/exec";
        
    var file = folder.createFile(form.myFile);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.COMMENT);
    var url = file.getUrl()
    var lecturer = form.myLecturer
    var leader = form.myleader
    var projectTitle = form.myProjectTitle
    var numGroup = form.myNumGroup
    var email = form.myEmail
    var telephone = form.myTelephone
    
    // ** changeUrl for spreadsheet **
    var ss = SpreadsheetApp.openById("1SVHsz6prrdZafyi3lmlfBdgjc6nGmFQSzpWt-43j_wc");
    var sh = ss.getSheetByName('sheet1')
    ss.appendRow([new Date(), lecturer, leader, projectTitle, numGroup, email, telephone, url])
    return  "ข้อมูลของ.." + leader + " ทำโปรเจ็คเรื่อง " + projectTitle+ " ได้ถูกอัพโหลดเข้าระบบเป็นที่เรียบร้อยแล้ว ขอบคุณครับ  <p><p><a href ='"+url+"' ><button>คลิกดูงานที่ส่ง</button></a> <p><a href ='"+home+"' ><button>กลับหน้าหลัก</button></a>"   
  } catch (error) {
    return error.toString();
  }

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}


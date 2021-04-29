const options = [
    "select_translate",
    // "select_transDirect",
    // "select_subType",
]

function $(id) {
  return document.getElementById(id)
}

// 将选项保存在 chrome.storage 中。
function save_options() {
  var isAuto = $("auto_trs").checked,
      isAutoSWT = $("select_translate").checked
      // transDirect = $("select_transDirect").options.selectedIndex,
      // subType = $("select_subType").options.selectedIndex;
  chrome.storage.sync.set({
    isAutoTranslate: isAuto,
    isAutoSWT: isAutoSWT,
    // transDirect: transDirect,
    // subType: subType,
  },
    function () {
      // 更新状态，告诉用户选项已保存。
      console.log(isAuto, isAutoSWT)
    }
  );
}

// 从保存在 chrome.storage 中的首选项恢复选择框和复选框状态。
function restore_options() {
  // 使用默认值 color = 'red' 和 likesColor = true 。
  chrome.storage.sync.get(
    {
      isAutoTranslate: false,
      isAutoSWT: true,
      transDirect: 1,
      subType: 0,
      favoriteColor: "red",
      likesColor: true
    },
    function (items) {
      // console.log(items)
      $("auto_trs").checked = items.isAutoTranslate;
      if (items.isAutoTranslate) {
        chrome.browserAction.setBadgeText({text: "auto"});
        chrome.browserAction.setBadgeBackgroundColor({color: "#5ebb8d"});
      } else {
        chrome.browserAction.setBadgeText({text: ""});
      }
      $("select_translate").checked = items.isAutoSWT;
      // $("select_transDirect").options.selectedIndex = items.transDirect;
      // $("select_subType").options.selectedIndex = items.subType;
    }
  );
}
document.addEventListener("DOMContentLoaded", () => {
  restore_options()
  setI18n()
});
$("auto_trs").addEventListener('change', () => {
  save_options()
  if($("auto_trs").checked) {
    chrome.browserAction.setBadgeText({text: "auto"});
    chrome.browserAction.setBadgeBackgroundColor({color: "#5ebb8d"});
    // chrome.browserAction.setIcon({path: 'images/logo-auto.png'});
    // console.log("auto");
  }
  else {
    chrome.browserAction.setBadgeText({text: ""});
    // chrome.browserAction.setIcon({path: 'images/logo_128.png'});
  }
})
options.forEach((option) => {
  $(option).addEventListener('change', () => {
      save_options()
  })
})

function setI18n () {
  $('optionsAutoSWT').innerText = chrome.i18n.getMessage('optionsAutoSWT')
  $('optionsAutoWebTrs').innerText = chrome.i18n.getMessage('optionsAutoWebTrs')

  // $('defaultTrsDirect').innerText = chrome.i18n.getMessage('defaultTrsDirect')
  // $('transZh2En').innerText = chrome.i18n.getMessage('transZh2En')
  // $('transEn2Zh').innerText = chrome.i18n.getMessage('transEn2Zh')
  // $('transJp2Zh').innerText = chrome.i18n.getMessage('transJp2Zh')

  // $('defaultSubtype').innerText = chrome.i18n.getMessage('defaultSubtype')
  // $('optionBil').innerText = chrome.i18n.getMessage('optionBil')
  // $('optionSource').innerText = chrome.i18n.getMessage('optionSource')
  // $('optionTarget').innerText = chrome.i18n.getMessage('optionTarget')

  $('textDocTrs').innerText = chrome.i18n.getMessage('textDocTrs')
  $('UserCenter').innerText = chrome.i18n.getMessage('UserCenter')
  $('xiaoyiApp').innerText = chrome.i18n.getMessage('xiaoyiApp')
  $('feedback').innerText = chrome.i18n.getMessage('feedback')
}

var bg = chrome.extension.getBackgroundPage();
console.log(bg)
bg.main();
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   let tab = tabs[0];
//   bg.main(tab);
// })
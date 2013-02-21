chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert(request);

    if(request == 'initSelectorHighlight'){
      chrome.tabs.executeScript(null, { file: "vendor/javascripts/jquery-1.9.1.min.js" });
      chrome.tabs.executeScript(null, { file: "selector.js" });
    }
  });


chrome.browserAction.onClicked.addListener(function(tab) {
});
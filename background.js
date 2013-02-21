chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

    if(request == 'initSelectorHighlight'){
      chrome.tabs.executeScript(null, { file: "vendor/javascripts/jquery-1.9.1.min.js" });
      chrome.tabs.executeScript(null, { file: "selector.js" });
    } else if (request.selected_object !== undefined){
    	notifyDevtools(request.selected_object);
    }
  });


chrome.browserAction.onClicked.addListener(function(tab) {
});

var ports = {};
chrome.extension.onConnect.addListener(function(port) {
    if (port.name !== "devtools") return;
    ports[port.portId_] = port;
    // Remove port when destroyed (eg when devtools instance is closed)
    port.onDisconnect.addListener(function(port) {
        delete ports[port.portId_];
    });
    port.onMessage.addListener(function(msg) {
        // Whatever you wish
        console.log(msg);
    });
});
// Function to send a message to all devtool.html views:
function notifyDevtools(msg) {
    Object.keys(ports).forEach(function(portId_) {
        ports[portId_].postMessage(msg);
    });
}
console.log("hello from devtools");
chrome.devtools.panels.create("HTML Object Creator",
                              "panel/test.png",
                              "panel/panel.html",
                              function(panel) { console.log("hello from callback"); });
                              
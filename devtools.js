console.log("hello from devtools");
chrome.devtools.panels.create(
  "HTML Object Creator",
  "panel/test.png",
  "panel/panel.html",
  function(panel) {
    // panel.executeScript(null, { file: "jquery-1.9.1.min.js" });
    // alert(jQuery());
    // $('input[name="new_object_id"]').val('lalalala');
    // panel.onShown.addListener(function(message){
    //   // blablabla
    // })
  });
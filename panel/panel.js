$(document).ready(function(){
  $('input[name="new_object_id"]').val('lalalala');
  
  $('#highlight').click(function(){
    chrome.extension.sendMessage('initSelectorHighlight', function(response) {});
  })
  chrome.extension.onConnect.addListener(function (port){
     port.onMessage.addListener(function(request, sender, sendResponse) {
      alert('message fro client, by panel!');
      if(request.message == 'newObject'){
        alert('sent new object message@');
      }
    })
  });
})

function show_object(selected_object) {
    
  // Stupid example, PoC

  $('input[name*="new_object_"]').val();
  $('input[name="new_object_xpath"]').val(selected_object.xpath);
  $('input[name="new_object_id"]').val(selected_object.id);
  $('input[name="new_object_class"]').val(selected_object.class);
  $('input[name="new_object_tag"]').val(selected_object.tag);
  $('input[name="new_object_name"]').val(selected_object.name);
  $('input[name="new_object_type"]').val(selected_object.type);
  $('input[name="new_object_content"]').val(selected_object.content);

  $('#suggested_name').html(selected_object.extra.suggested_name);
  $('#object_locator').html(selected_object.extra.object_locator);
  $('#object_type').html(selected_object.extra.object_type);
  
}
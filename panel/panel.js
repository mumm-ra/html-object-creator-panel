$(document).ready(function(){
  $('input[name="new_object_id"]').val('lalalala');
  
  $('#highlight').click(function(){
    chrome.extension.sendMessage('initSelectorHighlight', function(response) {});
  })

  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      alert('message fro client, by panel!');
      if(request.message == 'newObject'){
        alert('sent new object message@');
      }
    }
  );
//   $('#new_object_map').submit(function(e){
//     // e.preventDefault();
//     // alert('haha!');
//     $('#new_object_map').append('<h1>Hello!<h1/>');
//   })
})
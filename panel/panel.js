$(document).ready(function(){
  $('input[name="new_object_id"]').val('lalalala');
  
  $('#highlight').click(function(){
    chrome.extension.sendMessage('initSelectorHighlight', function(response) {});
  })
//   $('#new_object_map').submit(function(e){
//     // e.preventDefault();
//     // alert('haha!');
//     $('#new_object_map').append('<h1>Hello!<h1/>');
//   })
})
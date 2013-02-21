Selector = {
  _:{
    type_hash: {"A":"link",
      "BUTTON": "button", 
      "DIV": "text", 
      "INPUT": 
        {"text": "text_box", 
         "chackbox": "checkbox", 
         "password":"password", 
         "radio": "radio_button"}, 
      "SPAN": "text"}
  },

  xpath: function(event){
      var hierarchy = [],
          current = event.toElement||event.target;

      while (current.parentNode){
          hierarchy.unshift(current);
          current = current.parentNode;
      }
      var xPath = hierarchy.map(function(el,i){
              return el.nodeName.toLowerCase() + ((el.id !== '') ? '#'+el.id : '') + ((el.className !== '') ? '.'+el.className.split(' ').join('.') : '');
          }).join('/');
  
      return xPath;
  },
  suggested_name: function(elem_name,elem_content){
    if(elem_name != undefined && elem_name != "") {
      return elem_name;
    } else {
      var regex = new RegExp(" ", "g");
      var sug_name = elem_content.replace(regex,"_").substring(0,32);
      return sug_name;
    }
  },
  object_locator: function(elem_id,elem_xpath){

    if(elem_id != undefined && elem_id != "") {
      return "id : " + elem_id
    } else {  
          return "xpath : " + elem_xpath;
    }
  },
  object_type: function(tag,type){
    var tag_type = Selector._.type_hash[tag];
    if(tag_type == undefined) {
      return "unknown";
    }
    if(typeof(tag_type) == "string") { 
      return tag_type;
    } else {
      return tag_type[type];
    }
  },
  highlighter: function(event){
    switch (event.type){
      case 'mouseover':
        //$(this).data('bgcolor', $(this).css('background-color'));
            $(this).addClass('important_color');

        var $parent_clickable = $(this).closest('[onclick]');
        if ($parent_clickable != []){
          $parent_clickable.data('onclick', $parent_clickable.attr('onclick'));
          $parent_clickable.removeAttr('onclick');
        }
        
        break;
      case 'mouseout':
        //$(this).css('background-color', $(this).data('bgcolor'));
        $(this).removeClass('important_color');
        break;
      case 'click':
          event.stopPropagation();
          event.preventDefault();

          element_xpath = Selector.xpath(event);
          element_id = this.id;
          element_class = this.classList.toString();
          element_tag = this.tagName;
          element_name = this.name;
          element_type = this.type;
          element_content = $(this).html();          
          
          var selected_object = {
            'xpath': element_xpath,
            'id':element_id,
            'class':element_class,
            'tag':element_tag,
            'name':element_name,
            'type':element_type,
            'content':element_content,
            'extra': {
              'suggested_name': Selector.suggested_name(element_name,element_content),
              'object_locator': Selector.object_locator(element_id,element_xpath),
              'object_type': Selector.object_type(element_tag,element_type)
            }
          };

          chrome.extension.sendMessage({'selected_object': selected_object}, function(response) {
            console.log(response);
          });
          $('body').off('mouseover mouseout click','*');

        break;
    }
      return false;
  }

}
$(document).ready(function(){
  $('body').on('mouseover mouseout click','*', Selector.highlighter);
});

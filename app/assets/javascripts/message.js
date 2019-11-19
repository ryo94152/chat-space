$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message__text">
                    <div class="lower-message__content">
                    ${message.content}
                    </div>
                    ${img}
                  </div>
                </div>`
  return html;
  }
$(function(){
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var messege = new FormData(this);
    var url = $(this).attr('action'); 
    $.ajax({
      url: url,
      type: "POST",
      data: messege,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
      $('form')[0].reset();
    })    
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    });
    return false;
  });
});
});
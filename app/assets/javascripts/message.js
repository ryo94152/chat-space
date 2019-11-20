$(function(){
  function buildHTML(message) {
    // var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img class= "lower-message__image" src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
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
    
      var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        let last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          let insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });
        })
        .fail(function() {
          alert('error');
        });
      };
    };
      setInterval(reloadMessages, 5000);
});
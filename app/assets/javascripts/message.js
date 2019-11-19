$(function(){
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.date}
           </div>
         </div>
         <div class="message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="message__upper-info">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.date}
           </div>
         </div>
         <div class="message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
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
      $('#message_content').val(''); //input内のメッセージを消す
    })    
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    });
    return false;
  });
});
});
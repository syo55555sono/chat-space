window.addEventListener('DOMContentLoaded', (function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-id="${message.id}">
                    <div class="message__info">
                      <p class="message__info__talker">
                        ${message.name}
                      </p>
                      <p class="message__info__date">
                        ${message.date}
                      </p>
                    </div>
                    <p class="message__text">
                      <div class="lower-message__content">
                        ${message.content}
                      </div>
                        <img class="lower-message__image" src="${message.image}">
                    </p>
                  </div>`
    }  else {
        var html = `<div class="message" data-id="${message.id}">
        <div class="message__info">
          <p class="message__info__talker">
            ${message.name}
          </p>
          <p class="message__info__date">
            ${message.date}
          </p>
        </div>
        <div class="message__text">
          ${message.content}
        </div>`
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $(".submit-btn").prop( "disabled", false );
    })
    .fail(function(data){
      alert('メッセージ送信に失敗しました');
    })
  })
  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id =  $('.message').last().data('id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }};
  setInterval(reloadMessages, 7000);
}))

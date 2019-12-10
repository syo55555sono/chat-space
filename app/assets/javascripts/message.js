window.addEventListener('DOMContentLoaded', (function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message">
                    <div class="message__info">
                      <p class="message__info__talker">
                      ${message.name}
                      </p>
                      <p class="message__info__date">
                      ${message.date}
                      </p>
                    </div>
                    <p class="message__text">
                      <div>
                      ${message.content}
                      </div>
                      ${message.image}
                    </p>
                  </div>`
    }  else {
        var html = `<div class="message">
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $(".submit-btn").prop( "disabled", false );
      $('#message_content').val('');
    })
    .fail(function(data){
      alert('メッセージ送信に失敗しました');
    })
  })
}))

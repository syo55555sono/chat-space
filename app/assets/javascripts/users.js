$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function appendUserToMemberList(name, user_id) {
    var html = 
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value=${user_id}>
        <p class='chat-group-user__name'>${name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    member_list.append(html);
  }

  function appendNoUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user}</p>
      </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
  $("#user-search-result").on('click',".user-search-add", function(){
    var name = $(this).attr("data-user-name");
        var id = $(this).attr("data-user-id");
        $(this).parent().remove();
        appendUserToMemberList(name,id);
      });

      $("#chat-group-users").on("click", '.js-remove-btn', function() {
        $(this).parent().remove();
      });
});
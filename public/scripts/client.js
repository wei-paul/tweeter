$(document).ready(function() {

  //shows TWEET CONTAINER:

  $(".buttontweet").on("click", function() {
    $(".wholetextcontainer").show();
  });

  //RENDER A TWEET AND APPENDING THE NEWLYCREATED TWEET(CHILD) TO PARENT.
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
      const $newtweet = createTweetElement(tweet);
      $('.tweets-container').prepend($newtweet);
    });

  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
 //CREATING A TWEET TEMPLATE
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class="tweet-container">
            <header class="tweet-header">
              <div class="user-header">
                <div class="avatar-container">
                  <img src="${tweetData.user.avatars}"/>
                </div>
                <b>${tweetData.user.name}</b>
              </div>
              <b>${tweetData.user.handle}</b>
            </header>
            <content class="messages">
              <p id="chat-box">${escape(tweetData.content.text)}</p>
            </content>
            <hr>
            <footer class="multipleicon">
              <span>${timeago.format(tweetData.created_at)}</span>
              <div class="icon">
                <i class="fas fa-heart blue-hover" id="heart"></i>
                <i class="fas fa-retweet blue-hover" id="retweet"></i>
                <i class="fas fa-flag blue-hover" id="flag"></i>
              </div>
            </footer>
        </article>`);
    
    return $tweet;
  };
  

// FORM SUBMISSION USING JQUERY (AJAX REQUEST)

  let url = 'http://localhost:8080/tweets';

  const loadtweets = function() {
    $.ajax({
      url: url,
      method: "GET",
    })
      .then((result) => {
        $('.tweets-container').html("");
        const newTweet = result[result.length - 1];
        renderTweets(result);
      });
    
  };
  loadtweets();
  
  $("form").on("submit", function(event) {
    const MAX_COUNTER = 140;
    event.preventDefault();
    $(".warning").hide();
    if ($("form")[0][0].value.length > MAX_COUNTER) {
      return $(".warning").show();
    }
    $.ajax({
      url: url,
      method: "POST",
      data: $("form").serialize(),
    })
      .then(() => {
        $("#tweet-text").val('');
        $("#counter").text(MAX_COUNTER);
        loadtweets();
      })

      .catch((error) => {
        console.log('error:', error);
      });
  });

});
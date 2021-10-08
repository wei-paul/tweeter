$(document).ready(function() {
  $("#tweet-text").on("keyup", onChange);
});

const onChange = function () {
  const MAX_CHARS = 140;
  const text = $(this).val();
  const remaining = MAX_CHARS - text.length;
  const remainingCharsText = $("#counter");
  remainingCharsText.text(remaining);
  remainingCharsText.css("color", function() {
    if (remaining < 0) {
      return "red";
    } 
    if (remaining > 0) {
      return "#545149";
    }
    
  })
};
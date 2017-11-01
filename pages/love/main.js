/* Carousel Main JavaScript */

function change(X){
  X.src = images[i];
  X.alt = altText[i];
}

function replaceThings(){
  canFade = "false";
//   $("h1").fadeOut(200, function() {$("h1").text(altText[i]);
//   });
//   $("h1").fadeIn(200);
  $(".mainPic").fadeOut(200, function() {change(this);
  });
  $(".mainPic").fadeIn(200, function() {canFade = "true"});
}

function replaceForward(){
  if (canFade === "true"){
    if (i === 10){
      i = 0;
    }
    else {
      i = i+1; 
    }
    replaceThings();
  }
}

function replaceBackward(){
  if (canFade === "true"){  
    if (i === 0){
      i = 10;
    }
    else {
      i = i-1; 
    }
    if (canFade = "true"){
      replaceThings();
    }
  }
}

function prepare(){
  $("#forward").click(function() {
    replaceForward();
  });
  $("#backward").click(function() {
    replaceBackward();
  });
  $(".thumbnailBorder").hover(
  function () {
    $(this).addClass("hover");
  }, function () {
    $(this).removeClass("hover");
  }
  );
  $(".thumbnail").click(function(event) {
    if (canFade === "true") {
      i = event.target.id/1;
      replaceThings();
    }
  });
  $(document).keydown(function(event){
    if (event.keyCode === 37) { 
      replaceBackward();
      return false;
    }
    if (event.keyCode === 39) {
      replaceForward();
      return false;
    }
  });
}

$(document).ready(function () {
  prepare();
});
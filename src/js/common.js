$(document).ready(function() {
	
var hide              = "hide",
    total             = "total",
    absolute          = "absolute",
    $sidebar          = $(".sidebar"),
    $content          = $(".content"),
    jobPosition       = $(".jobs-prev").offset().top * 4,
    devSize           = 1200,
    $sidebarWidth     = $sidebar.width(),
    $contentWidth     = $content.width(),
    $documentWidth    = $(document).width(),
    $topMenuLi        = $(".top-menu").find("li");

    
$sidebar.height($content.height())


function sidebarAnimation(type){
  switch(type) {
    case "hide":
      $sidebar.addClass(hide);
      $content.addClass(total);
      break;
    case "show":
      $sidebar.removeClass(hide);
      $content.removeClass(total);
      break;
    case "total":
      $sidebar
        .addClass(total)
        .removeClass(hide)
        .removeAttr("style");
      $content.addClass(absolute);
      break;
    case "normal":
      $sidebar
        .removeClass(total)
        .height($content.height());
      $content.removeClass(absolute);
      break;
  }
}






function transition(bool){
  if(bool == false){
    $content.addClass("transition-none")
    $sidebar.addClass("transition-none")
  }
  if(bool == true){
    $content.removeClass("transition-none")
    $sidebar.removeClass("transition-none")
  }
  
}



$("[data-button=about]").on("click",function(){
  sidebarAnimation("total")
})

$("[data-button=project]").on("click",function(){
  sidebarAnimation("normal")
  if($(window).width() <= devSize){
    sidebarAnimation("hide")
  }
})

$topMenuLi.on("click",function(){
  $topMenuLi.removeClass("active");
  $(this).addClass("active");
})



$(window).scroll(function(){
    if(!$sidebar.hasClass(total)){
      if($(this).scrollTop() > jobPosition){
      sidebarAnimation("hide")
      }
      else if($(this).width() > devSize){
        sidebarAnimation("show")
      }
    }
})

$(window).load(function(){
  if($(this).width() <= devSize){
    transition(false)
    setTimeout(function(){transition(true)},500)
    sidebarAnimation("hide")
  }
})

$(window).resize(function(){
  if($(this).width() <= devSize && !$sidebar.hasClass(total)){

    sidebarAnimation("hide")


  }else if($(this).scrollTop() < jobPosition){
    sidebarAnimation("show")
  }


  if(!$sidebar.hasClass(total)){
    setTimeout(function(){$sidebar.height($content.height())},500)
  }
  
    
  
  
})


})


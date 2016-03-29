$(document).ready(function() {
	var hide     	= "hide",
    contentTotal 	= "content-total",
    sidebarTotal 	= "sidebar-total",
    absolute     	= "absolute",
    $sidebar     	= $(".sidebar"),
    $content     	= $(".content"),
    jobPosition 	= $(".jobs").offset().top,
    $project 		= $("#project"),
    $about 			= $("#about"),
    $header 		= $("header"),
    $headerLi 		= $header.find("li"),
    active			= "active";
  


function showSidebar(){
  $sidebar
    .removeClass(sidebarTotal)
    .removeClass(hide)
  $content
     .removeClass(absolute)
     .removeClass(contentTotal)
}

function hideSidebar(){
  $sidebar
    .addClass(hide)
    .removeClass(sidebarTotal)
  $content
    .removeClass(absolute)
    .addClass(contentTotal)
}

function totalSidebar(){
  $content.addClass(absolute);
  $sidebar
    .removeClass(hide)
    .addClass(sidebarTotal)
}

$headerLi.on("click",function(){
	$headerLi.removeClass(active);
	$(this).addClass(active)
})



$project.on("click",function(){
  showSidebar();
})

$about.on("click",function(){
  totalSidebar();
})



$(window).on("scroll",function(){
  if($(this).scrollTop() >= jobPosition - 100){
    hideSidebar()
  }
  else if(!$sidebar.hasClass(sidebarTotal)){
    showSidebar()
  }
})
})
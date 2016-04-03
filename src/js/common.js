$(document).ready(function() {
	
var hide              = "hide",
    total             = "total",
    totalSidebar      = "total-sidebar",
    contentAbsolute   = "content-absolute",
    $sidebar          = $(".sidebar"),
    $content          = $(".content"),
    jobPosition       = ($(".jobs-prev").offset().top + $(".jobs-prev").height()/2),
    devSize           = 1200,
    $topMenuLi        = $(".top-menu").find("li"),
    $prevLink         = $(".job-content").find("a"),
    $footerLink       = $(".footer-galery-item").find("a"),
    $mobileMenu       = $(".mobile-menu"),
    $mobileMenuButton = $(".mobile-menu-botton");

    



function sidebarAnimation(type){
  switch(type) {
    case "hide":
      $sidebar.addClass(hide);
      $(".jobs-prev").addClass(total);       
      break;
    case "show":
      $sidebar.removeClass(hide);
      $(".jobs-prev").removeClass(total);
      break;
    case "total-sidebar":
      $sidebar.addClass(totalSidebar);
      $content.addClass(contentAbsolute);
      break;
    case "normal-sidebar":
      $sidebar.removeClass(totalSidebar);
      $content.removeClass(contentAbsolute);
      break;
  }
}


$mobileMenuButton.click(function(){
  $(this).toggleClass("open");
  $mobileMenu.toggleClass("menu-opacity");
});

$mobileMenu.find("li").click(function(){
  $mobileMenuButton.removeClass("open");
  $mobileMenu.removeClass("menu-opacity");
});


  function addColorSection(){
    var colorArr  = ["middle","light","dark"],
        color     = 0;
    $(".jobs").each(function(index){
      if(color > 2){
        color = 0;
      }
      $(this).addClass(colorArr[color++]);
    });
  }

  function addAttrSection(){
    $.each($(".jobs"),function(id){
      $(this).attr("id","work-" + (id+1));
    });
    $prevLink .each(function(val){
      $(this).attr("href","#work-" + (val+1));
    });
    $(".footer-galery-item a").each(function(val){
      $(this).attr("href","#work-" + (val+1));
    });
  }


  function addScroll2Id(){
    $prevLink.on("click",function(){
      var element = $(this).attr("href");
      var position = $(element).offset().top;
      $('html,body').animate({scrollTop : position},600);
      return false;
    });
    $footerLink.on("click",function(){
      var element = $(this).attr("href");
      var position = $(element).offset().top;
      $('html,body').animate({scrollTop : position},600);
      return false;
    });
    $("[data-button=email]").on("click",function(){
      setTimeout(function(){
        var position = $("#email-address").offset().top;
        $('html,body').animate({scrollTop : position},600);
      },500);
      $topMenuLi.removeClass("active");
      $("[data-button=about]").addClass("active");
    });


  }

  function addPopUpManager(){
    $(".jobs-galery").each(function(i){
      $(this).find("a").attr("data-pop-up",(i+1)).magnificPopup({
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: true,
        mainClass: 'mfp-with-zoom',
        gallery: {enabled: true,navigateByImgClick: true,preload: [0,1]},
        zoom: {enabled: true,duration: 300,}
      });
    });
  }


/*$(".jobs").scrollDots({
    //"scrollOnClick" : true,
    "scrollPosition" : "top",
    "activeClass" : "dots-active",
    "dotClass"   : "dott",
    "dotsWrapClass"  : "dotts-wrap"
  });
  $(".dotts-wrap").prepend("<div id='cap' class='icons i_cap'></div>")
  $("#cap").on("click",function(){
    $('html,body').animate({scrollTop : 0},600).clearQueue();
  })*/




  






$("[data-button=about] , [data-button=email]").on("click",function(){
  $(".footer-galery-item").addClass("none");
  sidebarAnimation(totalSidebar);
  $topMenuLi.removeClass("active");
  $(".top-menu [data-button=about]").addClass("active");
});


$("[data-button=project]").on("click",function(){
  sidebarAnimation("normal-sidebar");
  $(".footer-galery-item").removeClass("none");
  $topMenuLi.removeClass("active");
  $(".top-menu [data-button=project]").addClass("active");

  if($(window).width() <= devSize){
    sidebarAnimation("hide");
  }
  return false;
});

$("#up").click(function(){
  $('html,body').animate({scrollTop : 0},600);
});

$topMenuLi.on("click",function(){
  $topMenuLi.removeAttr("class","active");
  $(this).addClass("active");
});




function ajaxForm(){



  $(".input-wrap").find("input").keyup(function(){
            if($(this).val()){
              $(this).removeClass("inputError");
              $(this).siblings(".form-error").empty();
            }
          });
  $(".input-wrap").find("textarea").keyup(function(){
            if($(this).val()){
              $(this).removeClass("inputError");
              $(this).siblings(".form-error").empty();
            }
  });

  $('button').click(function (e){
        e.preventDefault();
        var pattern = /^([0-9a-zA-Z_-]+\.)*[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+)*\.[a-z]{2,6}$/;
        var email =$("#email");
        var name = $("#name");
            var text = $("#text"); 
            var contacts_form_wrap = $("form");
            var input_wrap = $(".input-wrap");
            var error=0; 
            var dataString = 'name='+ name.val() + '&email=' + email.val().toLowerCase() + '&text=' + text.val();
              
              var field = ["name", "email","text"];




              for(var i = 0; i < input_wrap.length; i++){
                if(input_wrap.find("#" + field[i]).val() === ""){
                  error = 1;
                  input_wrap.find("#" + field[i]).addClass("inputError");
                  input_wrap.find("#" + field[i]).siblings(".form-error").text("*поле пустое").animate({opacity : 1},800);
                }
                else{
                  input_wrap.find("#" + field[i]).removeClass("inputError");
                  input_wrap.find("#" + field[i]).siblings(".form-error").empty();
                }

                }
                if(email.val() !== ""){
                  if(!pattern.test(email.val())){
                    error = 1;
                    email.siblings(".form-error").text("не верный e-mail").animate({opacity : 1},800);
                    email.addClass("inputError");
                }
                }


                


        
              

          if(error === 0){

                                
                                contacts_form_wrap.trigger( 'reset' );
                                $('.success').fadeIn("slow");
                                setTimeout(function(){
                      $('.success').fadeOut("slow");
                    } ,3000);



              /*$.ajax({  
                    type: "POST",  
                    url: "/assets/templates/portfolio/ajax/mail.php",
                    data: dataString,
                  success:  function() {
                                
                                contacts_form_wrap.trigger( 'reset' );
                                $('.success').fadeIn("slow");
                                setTimeout(function(){
                      $('.success').fadeOut("slow");
                    } ,3000);
                        }
                });*/
        }
        else{
          setTimeout(function(){
            contacts_form_wrap.find("input").removeClass("inputError");
            contacts_form_wrap.find("textarea").removeClass("inputError");
            contacts_form_wrap.find(".form-error").animate({opacity : 0},800);
          },6000);
        }

       });


}

function calcSkills(){
  $.each($(".scale"),function(){
    var number = $(this).find("span").text();
    var procent = 100 / 10 * Number(number);
    $(this).children(".state").css({
      "width" : procent+"%"
    });
  })
}

  addAttrSection();
  addScroll2Id();
  addColorSection();
  addPopUpManager();
  ajaxForm();

  calcSkills();


$(window).scroll(function(){
    if(!$sidebar.hasClass(total)){
      if($(this).scrollTop() > jobPosition){
        //$(".dotts-wrap").addClass("dotts-wrap-hide");
        sidebarAnimation("hide");
      }
      else if($(this).width() > devSize){
        sidebarAnimation("show");
        //$(".dotts-wrap").removeClass("dotts-wrap-hide");
      }
    }
});

$(window).load(function(){
  if($(this).width() <= devSize){
    sidebarAnimation("hide");
  }
  $(".preloader").fadeOut("slow").delay(300);
});

$(window).resize(function(){
  if($(this).width() <= devSize){

    sidebarAnimation("hide");

  }else if($(this).scrollTop() < jobPosition){
    sidebarAnimation("show");
  }
  if($(window).width() > devSize){
    $mobileMenuButton.removeClass("open");
    $mobileMenu.removeClass("menu-opacity");
  }
  
    
  
  
});


});


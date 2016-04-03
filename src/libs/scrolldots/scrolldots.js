;(function($) {
  

  $.fn.scrollDots = function(options) {

  	var settings = $.extend({
  			"dotsWrapClass"	: "plugin-dots-wrap",
			"dotClass" 		: "plugin-dot",
			"activeClass" 		: false ,
			"offset"			: "top",
			"scrollOnClick"		: "false",
			"speed"				: 600,
			"scrollPosition"	: "top",
			"dotsWrapAdd"		: "body"
	}, options);


    var $this = this;
    function addDots(){

	var dotsClass 		= 	settings.dotClass,
    	dotsWrapClass	=	settings.dotsWrapClass,
    	dotsWrapAdd	=	settings.dotsWrapAdd,
    	scrollOnClick	=	settings.scrollOnClick;



    		



    	$(dotsWrapAdd).prepend("<div class='"+ dotsWrapClass +"'></div>")

    	if(dotsWrapClass == "plugin-dots-wrap"){
    		$("."	+	dotsWrapClass + "").css({
    			"position" : "fixed",
    			"right"		: "0",
    			"z-index"	: "10000",
    			"top"		: "50%",
    			"transform" : "translateY(-50%)"
    		})


    		
    	}
    	

    	$this.each(function(i){
    		$(this).attr("data-dots","work-"+ (i+1) +"");
    		$("."	+	dotsWrapClass + "").append("<div class='" + dotsClass + "' data-dots='work-" + (i+1) + "' >");
    		if(dotsClass == "plugin-dot"){
    			$("."	+	dotsWrapClass + "").find("div").css({
    				"border"	: "2px solid #333",
    				"height"	: "16px",
    				"width"		: "16px",
    				"border-radius" : "50%",
    				"margin"	: "5px"
    			})
    		if(scrollOnClick == true && dotsClass == "plugin-dot"){
    			$("."	+	dotsWrapClass + "").css({
    				"cursor" : "pointer"
    			})
    		}
    		}
    	})
    }

    function addScroll(){
    	$this.each(function(i,val){

    		var pos;
    		switch(settings.scrollPosition){
				case "top":
					pos = $(val).offset().top;
					break
				case "bottom":
					var offsetTop = $(val).offset().top;
					pos = offsetTop + $(val).height();
					break
				case "center":
					var offsetTop = $(val).offset().top;
					pos = offsetTop + ($(val).height() / 2);
					break
				default:
					pos = $(val).offset().top;
			}





    		
    		var hash = $(this).attr("data-dots");
    		$("."+settings.dotClass).each(function(i){

    			$(this).on("click",function(){
    				if($(this).attr("data-dots") == hash){
						$('html,body').animate({scrollTop : pos + 1},settings.speed).clearQueue();
					}	

    			})
									
				})
    	})
    }

     addDots();
    if(settings.scrollOnClick == true){
    	addScroll();
    }
   
    

    var positionInit = function sectionInPos(){
    	var activeClass		= settings.activeClass;
		var scrollTop 		= $(window).scrollTop(),
			scrollBottom 	= scrollTop + $(window).height(),
			scrollCenter 	= scrollTop + ($(window).height() / 2);
		$this.each(function(){
			switch(settings.offset){
				case "top":
					offset = $(this).offset().top;
					break
				case "bottom":
					var offsetTop = $(this).offset().top;
					offset = offsetTop + $(this).height();
					break
				case "center":
					var offsetTop = $(this).offset().top;
					offset = offsetTop + ($(this).height() / 2);
					break
				/*default:
					parser = settings.offset;
					pater = parser.replace(/(\d+)/g, '$1 ')
					test = pater.split(" ");
					//console.log(test[1]);
					offset = $(this).offset().top + Number(test[0]);
					//console.log(offset);
					break*/
			}
			//console.log(scrollTop)
			if(scrollTop >= offset && scrollTop <= offset + $(this).height()){
				var hash = $(this).attr("data-dots");
				//console.log(true)
				
				$("."+settings.dotClass).each(function(i){
					if($(this).attr("data-dots") == hash){
						if(activeClass == false){
							$(".plugin-dot").css({
								"background-color" :  "inherit"
							})
							$(this).css({
								"background-color" :  "#333"
							})
						}else{
							$("."+settings.dotClass).removeClass(settings.activeClass);
							$(this).addClass(settings.activeClass);
						}
						
					}					
				})
			}
			/*else if(scrollTop > offset + $(this).height()){
				$("."+settings.dottClass).removeClass(settings.activeClass);
			}*/
			
		})	
	}
      $(window).scroll(function(){
      	positionInit();
      })

      $('*').resize(function(){
      	positionInit();
      })

      $(window).load(function(){
      	positionInit();
      })
      
      return $this;
  };


})(jQuery);
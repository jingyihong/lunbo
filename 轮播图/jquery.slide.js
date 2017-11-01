;(function($){

	$.fn.slide = function(opt){
		var data = {
			prev:"#prev",
			next:"#next",
			speed:600,
			time:2000,
			bg:"bg",
			driction:"left"
		}
		var set = $.extend({},data,opt);
		
		var next = $(set.next),
			prev = $(set.prev),
			count = 0,
			len = $(this).find("img").length,
			big = $(this).children("ul"),
			lis = $(this).find("ol li"),
			timer = null,
			str = "margin-"+set.driction,
			imgH,
			obj = {},
			ind = 0;

		return $(this).each(function(){

			if(set.driction == "left"){
				imgH = $(this).find("img").width();
				big.width(imgH*len);
			}else{
				imgH = $(this).find("img").height();
				big.height(imgH*len);
			}

			function show(){
				obj[str] = -count*imgH;
				big.stop().animate(obj,set.speed);
				lis.eq(ind).addClass(set.bg).siblings().removeClass(set.bg);
			}

			function auto(){
				ind++;
				if(count >= len-1){
					count = 0;
					obj[str] = -count*imgH;
					big.css(obj);
				}
				if(ind > len-2){
					ind = 0;
				}
				count++;
				show();
			}

			next.on("click",function(){
				auto();
			})
			prev.on("click",function(){
				ind--;
				if(count<=0){
					count = len-1;
					obj[str] = -count*imgH;
					big.css(obj);
				}
				if(ind<0){
					ind = len-2;
				}
				count--;
				show();
			})
			lis.on("click",function(){
				count = $(this).index();
				ind = $(this).index();
				show();
			})
			$(this).hover(function(){
				clearInterval(timer);
			},function(){
				timer = setInterval(function(){
					auto();
				},set.time);
			}).trigger("mouseleave");
		})
	}

})(jQuery)
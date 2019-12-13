// JavaScript Document
$(document).ready(function() {
		// ±µ¦¬ query string
		var querystring = location.search.replace( '?', '' ).split( '&' );
		var qs = {};
		for ( var i=0; i<querystring.length; i++ ) {
			  var name = querystring[i].split('=')[0];
			  var value = querystring[i].split('=')[1];
			  qs[name] = value;
		}
		var mypage=qs["tf"];
		navList(mypage);
		$(".nav").hover(function () {
			$(this).addClass("hover");
		}, function () {
			$(this).removeClass("hover");
		});
		$(".nav p").hover(function () {
			if ($(this).hasClass("on")) { return; }
			$(this).addClass("hover");
		}, function () {
			if ($(this).hasClass("on")) { return; }
			$(this).removeClass("hover");
		});
	   $(".nav").click(function(){
			var $div = $(this).siblings(".list-item");
			if ($(this).parent().hasClass("selected")) {
				$div.slideUp(600);
				$(this).parent().removeClass("selected");
			}
			if ($div.is(":hidden")) {
				$(".list-item").slideUp(600);

				$div.slideDown(600);
	
			} else {
				$div.slideUp(600);
			}
		});
	   
	   
	   
		function navList(id) {
			clist=$(".opencontent");
			$("#J_navlist li").removeClass("selected");
			
			for(a=0;a<clist.length;a++){
				if(cleanhref($(".opencontent").eq(a).attr("href"))==id){	//§ä¨ì
					$(".opencontent").eq(a).parents(".list-item ").slideDown(600);
					$(".opencontent").eq(a).parents(".list-item ").parent("li").addClass("selected");
				}
			}
	}	
	function cleanhref(myhrefval){
			temp=myhrefval;
			if(temp.indexOf("/")>=0){
				temp=temp.substring(temp.lastIndexOf('/') + 1);
			}
			return temp;
	}
});
 (function($){ 
	popbase = function(x,y) { 
		out="<div id='pop'>";
		out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
		out+="	<div id='popin'>\n";
		out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
		out+="		<div id='pophead'>"+x+"</div>\n";
		out+="			<div id='popbody'>\n";
		y
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#pop").stop().fadeIn(400);  
   };  
	poplogin = function(x) { 
		out="<div id='pop' style='position:fixed;background:url(img/b30.png);width:100%;height:100%;z-index:999999;display:none;overflow:hidden;'>";
		out+="<a href=''  class='popclose' style='position:absolute;top:0px;right:0px;width:100%;height:100%;z-index:0;display:block;' ></a>";
		out+="<div id='popin' class='shadow' style='position:absolute;top:50%;left:50%;width:200px;height:100px;margin-top:-600px;margin-left:-150px;padding:50px;z-index:9999;background:#f5fcff;color:#286db4;border:10px solid #689df4;text-align:center;font-size:16px;-webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;'>\n";
		out+='<i class="fa fa-exclamation-triangle"></i>'+x;
		out+="</div>";
		out+="</div>";
		 $("body").prepend(out);
		 $("#popin").animate({"margin-top":-90},300).animate({"margin-top":-100},50).delay(1000).animate({"margin-top":-90},50).animate({"margin-top":-600},300);
		$("#pop").stop().fadeIn(400).delay(900).fadeOut(400); 
   }; 
	// AJAX  JASON
 	ajaxarr=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		return  $.ajax({
			 type:'GET',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":y,"timtess":$.now()}
		});
	}; 
 	ajaxarrpost=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		return  $.ajax({
			 type:'POST',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":y,"timtess":$.now()}
		});
	}; 
 	cleanhref= function(x) { 
		temp=x;
		if(temp.indexOf("/")>=0){
			temp=temp.substring(temp.lastIndexOf('/') + 1);
		}
		return temp;
	};
   popclose= function() {
		$("#popin").stop().fadeOut(300).remove();
		$("#pop").delay(200).stop().fadeOut(300).remove();
   }
	changeimg=function(x){
		temp=x.attr("src");
		tempb=temp.split("_x");
		if(tempb[1]){
			x.attr("src",tempb[0]+tempb[1]);				
		}else{
			tempb=temp.split(".j");
			if(tempb[1]){
				x.attr("src",tempb[0]+"_x.j"+tempb[1]);
			}else{
				tempb=temp.split(".p");
				x.attr("src",tempb[0]+"_x.p"+tempb[1]);
			}			
		}
	}
	//form validation
	vemail=function(x,z){
		var a = x.val();
		//var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
		var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9_.-]+.[a-z]{2,4}$/;
		if(filter.test(a)){
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	vtext=function(x,y,z,mx){
		if(x.val().length> mx){
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;			
		}else if(x.val().length < y){
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}else{
			x.removeClass("forminput");
			x.parent(".formitem").children(".formerr").hide();
			return true;
		}
	}
	 vnum=function(x,y,z,mx){
		var numbers = /^[-+]?[0-9]+$/;  
		if(x.val().match(numbers) && x.val() >=y && x.val()<=mx){  
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	 vcheck=function(x,z){
		var numbers = /^[-+]?[0-9]+$/;  
		if(x.is(':checked')){  
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			alert("請確認"+z);
			return false;
		}
	}
 	subutf8=function(str, startInBytes, lengthInBytes) {
		var resultStr = '';
		var startInChars = 0;
		for (bytePos = 0; bytePos < startInBytes; startInChars++) {
			ch = str.charCodeAt(startInChars);
			bytePos += (ch < 128) ? 1 : encode_utf8(str[startInChars]).length;
		}
		end = startInChars + lengthInBytes - 1;
		for (n = startInChars; startInChars <= end; n++) {
			ch = str.charCodeAt(n);
			end -= (ch < 128) ? 1 : encode_utf8(str[n]).length;
			resultStr += str[n];
		}
		return resultStr;
	}
})(jQuery); 
 
$(document).ready(function(){
   ismobile=0;
	// 共用功能
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		ismobile=1;
	}
	$("body").delegate(".popclose","click",function(e){
		e.preventDefault();
		popclose();
	});	
	$("body").delegate(".btn","click",function(e){
		e.preventDefault();									   
	});
	//自動延伸 teatarea 功能
	$("textarea").css("-ms-overflow-style","none");
	$("textarea").css("overflow","hidden");
	$("textarea").val("");
	$("body").delegate("textarea","keyup",function(){
		 $(this).height( 0 );								   
		inheight=this.scrollHeight;
		if(inheight<40){
			inheight=40;
		}
		$(this).css("height",inheight);
	});

	// 互換 IMAGE 的 HOVER 共用
	$(".hoverimg").hover(function(){
		if($(this).parents("a").hasClass("selected")){
		}else{
			changeimg($(this));
		}
	},function(){
		if($(this).parents("a").hasClass("selected")){
		}else{
			if($(this).hasClass("selected")){
			}else{
				changeimg($(this));
			}
		}
	});	
});

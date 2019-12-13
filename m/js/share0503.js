var mainstop=0;
(function($){
    popnotice=function(x) { //一般地跳出
		popbaseu(x);
    }
	popbase_v = function(x) { //title/內容/是否可以關閉--使用u版
		out="<div id='pop' class='popframe'>";
		out+="	<a href=''  class='popclose popclosebg  applebtn' style='' ></a>";
		out+="	<div id='popinu'>\n";
		out+="			<div id='popbodyu'  style='text-align:center;'>\n";
		out+=x;
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		wh=$(window).height();
		$("#popbodyu").css("max-height",2*wh/3);
		$("#pop").show();
		myx=$("#popinu").outerHeight();
		$("#pop").hide();
		$("#popinu").css("top",(wh-myx)/2);
		$("#popinu").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#pop").stop().fadeIn(400);
		chkpopfull();
   };
	popbase = function(x,y,z) { //title/內容/是否可以關閉--使用u版
		out="<div id='popu' class='popframe'>";
		if(z!="n"){
			out+="	<a href=''  class='popcloseu popclosebg  applebtn' style='' ></a>";
		}
		out+="	<div id='popinu'>\n";
		if(z!='n'){
			out+="	<a href=''  class='popcloseu popclosebtn  applebtn' style='color:#000;' ><i class='fa fa-times'></i></a>";
		}
		out+="		<div id='popheadu'>"+x+"</div>\n";
		out+="			<div id='popbodyu'  style='text-align:center;'>\n";
		out+=y;
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		wh=$(window).height();
		$("#popbodyu").css("max-height",2*wh/3);
		$("#popu").show();
		myx=$("#popinu").outerHeight();
		$("#popu").hide();
		$("#popinu").css("top",(wh-myx)/2);
		$("#popinu").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#popu").stop().fadeIn(400);
		chkpopfull();
   };
	popbase_2 = function(y) { //title/內容/是否可以關閉
		var out="<div id='pop' class='popframe'>";
		out+="	<a href=''  class='popcloseu popclosebg  applebtn' style='' ></a>";
		out+="	<div id='popin'>\n";
		out+=y;
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#pop").stop().fadeIn(400);
		chkpopfull();
   };
	popbaseu = function(y,z) { //title/內容/是否可以關閉
		out="<div id='popu' class='popframe'>";
		out+="	<a href=''  class='popcloseu popclosebg  applebtn' style='' ></a>";
		out+="	<div id='popinu'>\n";
		if(z=="c"){
			out+="	<a href=''  class='popcloseu popclosebtn  applebtn' style='color:#000;' ><i class='fa fa-times'></i></a>";
		}
		out+=y;
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		wh=$(window).height();
		$("#popu").show();
		myx=$("#popinu").outerHeight();
		$("#popu").hide();
		$("#popinu").css("top",(wh-myx)/2);
		$("#popinu").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#popu").stop().fadeIn(400);
		chkpopfull();

   };
   //使用者3曾
  popbaseuseru = function(y) { //title/內容/是否可以關閉
		out="<div id='popuseru' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popuseru").hide();
		$("#popuseru").show();
		chkpopfull();
   };
  popbaseuseru2 = function(y) { //title/內容/是否可以關閉
   out="<div id='popuseru2' class='popframe home'>";
   out+=y;
   out+="</div>";
   $("body").prepend(out);
   var ww=$(window).width();
   $("#popuseru2").show();
   chkpopfull();
  };
   //使用者1從
  	popbaseuser = function(y) { //title/內容/是否可以關閉
		out="<div id='popuser' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		//$("body").addClass("fixbody");
		$("#popuser").hide();
		$("#popuser").show();
		chkpopfull();
		//$("#popuser").css("left",ww);
		//$("#popuser").stop().fadeIn(400);
		//$("#popuser").animate({"left":0},400);
   };
   //qna的特殊
 	popbasefullq = function(y) { //title/內容/是否可以關閉
		if($("#popfullq").length>0){
			popfullcloseq();
		}
		out="<div id='popfullq' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popfullq").hide();
		$("#popfullq").show();
		chkpopfull();
   };
   //chatroom
	allpopup = function(y) { //共用跳在最上層
    var plist=$(".popframe");
    var topz=333;
    for(var a=0;a<plist.length;a++){
      if(parseInt(plist.eq(a).css("z-index"))>topz){
        topz=parseInt(plist.eq(a).css("z-index"));
      }
    }
    topz++;
		out="<div id='allpopup"+topz+"' class='allpopup popframe home' style='z-index:"+topz+"'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		$("#allpopup"+topz).show();
   };
   //chatroom
	popchatfull = function(y) { //title/內容/是否可以關閉
		if($("#popchatfull").length>0){
			popfullclosechat();
		}
		out="<div id='popchatfull' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popchatfull").hide();
		$("#popchatfull").show();
		chkpopfull();
   };
   //chatroom 跳出
	popchatfullu = function(y) { //title/內容/是否可以關閉
		if($("#popchatfullu").length>0){
			popfullclosechatu();
		}
		out="<div id='popchatfullu' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popchatfullu").hide();
		$("#popchatfullu").show();
		chkpopfull();
   };
   //chatroom 跳出2
	popchatfullu2 = function(y) { //title/內容/是否可以關閉
		if($("#popchatfullu2").length>0){
			popfullclosechatu2();
		}
		out="<div id='popchatfullu2' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		//$("body").addClass("fixbody");
		$("#popchatfullu2").hide();
		$("#popchatfullu2").show();
		chkpopfull();
   };
   //共用--這通常是pop出單一內容時
	popbasefull = function(y) { //title/內容/是否可以關閉
		if($("#popfull").length>0){
			popfullclose();
		}
		out="<div id='popfull' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popfull").show();
		chkpopfull();

   };
   //共用上層--通常留言都是這層
	popbasefullu = function(y) { //title/內容/是否可以關閉
		out="<div id='popfullu' class='popframe home'>";
		out+=y;
		out+="</div>";
		//$("body").addClass("fixbody");
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popfullu").hide();
		$("#popfullu").show();
		chkpopfull();
		//$("#popfullu").css("left",ww);
		//$("#popfullu").stop().fadeIn(400);
		//$("#popfullu").animate({"left":0},400);
   };
   //共用上兩層--這是選擇tag那層
	popbasefullu2 = function(y) { //title/內容/是否可以關閉
		out="<div id='popfullu2' class='popframe home'>";
		out+=y;
		out+="</div>";
		//$("body").addClass("fixbody");
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popfullu2").hide();
		$("#popfullu2").show();
		chkpopfull();
		//$("#popfullu2").css("left",ww);
		//$("#popfullu2").stop().fadeIn(400);
		//$("#popfullu2").animate({"left":0},400);
   };
   //共用特上層(最上層了)
	popbasefullt = function(y) { //title/內容/是否可以關閉
		if($("#popfullt").length>0){
			popfullcloset();
		}
		out="<div id='popfullt' class='popframe home'>";
		out+=y;
		out+="</div>";
		$("body").prepend(out);
		var ww=$(window).width();
	//	$("body").addClass("fixbody");
		$("#popfullt").hide();
		$("#popfullt").show();
		chkpopfull();
		//$("#popfullt").css("left",ww);
		//$("#popfullt").stop().fadeIn(400);
		//$("#popfullt").animate({"left":0},400);

   };
   //攻略
 	popbasefullart = function(y) { //title/內容/是否可以關閉
		out="<div id='popfullart' class='popframe home'>";
		out+=y;
		out+="</div>";
		//$("body").addClass("fixbody");
		$("body").prepend(out);
		var ww=$(window).width();
		$("#popfullart").hide();
		$("#popfullart").show();
		chkpopfull();
		//$("#popfullart").css("left",ww);
		//$("#popfullart").stop().fadeIn(400);
		//$("#popfullart").animate({"left":0},400);
   };
   //顯示個人的圖片
   popnewsimgself=function(x){
     var  out="<div id='allpopimgwrap' style='position:fixed;'><div class='loaderbox'><img src='assets/img/loader.gif'></div></div>";
	   if($("#popfullt").length>0){
		   $("#popfullt").html(out);
	   }else{
		   popbasefullt(out)
	   }
     img = new Image();
     img.onload = function(){
       xwidth = this.width;
       xheight = this.height;
       mt=parseInt((1-(xheight/xwidth)/($(window).height()/$(window).width()))*50);
       var zout="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+x+"' style='top:"+mt+"vh;' class='touchimg' id='poptouchimg' >";
       zout+="<div class='popfullcloset applebtn' ><i class='fa fa-times'></i></div>";
       $("#allpopimgwrap").html(zout);
       orgrate=$("#poptouchimg").width();
     }
     img.src =sessionStorage.getItem("imgurl")+"uploadfile/"+x;
   }
   //顯示跳出的圖片
   popnewsimg=function(x,y){
	   var piclist=x;
	   var picid=y;
	   var  out="<div id='allpopimgwrap'  style='position:fixed;'><div class='loaderbox'><img src='assets/img/loader.gif'></div></div>";
	   if($("#popfullt").length>0){
		   $("#popfullt").html(out);
	   }else{
		   popbasefullt(out)
	   }
	   var thispic="";
	   var picpos=0;
	   if(picid){
		   for(var a=0;a<piclist.length;a++){
			   if(piclist[a]['thisid']==picid){
				   picpos=a;
				   thispic=piclist[a]['thisfile'];
			   }
		   }
	   }else{
		   thispic=piclist[0]['thisfile'];
	   }
	   if(thispic){
			img = new Image();
			img.onload = function(){
			   	xwidth = this.width;
				xheight = this.height;
				mt=parseInt((1-(xheight/xwidth)/($(window).height()/$(window).width()))*50);
				var zout="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+thispic+"' style='top:"+mt+"vh;' class='touchimg' id='poptouchimg' >";
				if(picpos<(piclist.length-1)){
					zout+="<div class='popimgclick applebtn right'  data-type='gonext' data-val='"+piclist[(picpos+1)]['thisid']+"'><i class='fa fa-chevron-right'></i></div>";
				}
				if(picpos>0){
					zout+="<div class='popimgclick applebtn left' data-type='gonext' data-val='"+piclist[(picpos-1)]['thisid']+"'><i class='fa fa-chevron-left'></i></div>";
				}
				zout+="<div class='popfullcloset applebtn' ><i class='fa fa-times'></i></div>";
		   	$("#allpopimgwrap").html(zout);
        orgrate=$("#poptouchimg").width();
			}
			img.src =sessionStorage.getItem("imgurl")+"uploadfile/"+thispic;
	   }else{
		   $("#popimgwrap").html('');
	   }
   }
   //斷航
   nl2br=function(x){
	 //   if(x.indexOf("newsfilebox")>0){//有圖
			//xa=x.replace("<div class=newstextbox>","<div class=\"newstextbox\">");
			//xa=xa.replace("<div class=\"newstextbox\">","<div class=\"newstextbox\">\n");
	 		//xa=xa.replace("<div class=newsfilebox>","<div class=\"newsfilebox\">");
			//xa=xa.replace("<div class=\"newsfilebox\">","\n<div class=\"newsfilebox\">");
			var xorg="";
			var xplus="";
			var xline=1;
			var xx2="";
			var vidcnt=0;
			var x2="";
			if(x && x.length>0){
				xx=x.split("\n");
				for(var a=0;a<xx.length;a++){
					if(xline>1){
						xx2+="\n";
					}
					if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
						var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
						xplus+="<iframe class='vitem' width='468' height='263' style='"+((vidcnt>0)?"display:none;":"")+" margin:0;max-width:100%;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
						vidcnt++;
					}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
						var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
						xplus+="<iframe class='vitem' width='468' height='263' style='"+((vidcnt>0)?"display:none;":"")+" margin:0;max-width:100%;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
						vidcnt++;
					}else if(xx[a].indexOf("https://youtu.be/")==0){
  					var yy=xx[a].split("https://youtu.be/")[1];
  					xplus+="<iframe class='vitem' width='468' height='263' style='"+((vidcnt>0)?"display:none;":"")+" margin:0;max-width:100%;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
  					vidcnt++;
  				}else if(xx[a].indexOf("twitch.tv/")>=0){
						var yy=xx[a].split("twitch.tv/")[1];
						var yyy=yy.split("/v/");
						if(yyy.length>1){
							xplus+="<iframe class='vitem' src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='"+((vidcnt>0)?"display:none;":"")+" margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
						}else{
							xplus+="<iframe class='vitem' src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='"+((vidcnt>0)?"display:none;":"")+" margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
						}
						vidcnt++;
					}else if(xx[a].indexOf("http://")==0){
						xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
						xline++;
					}else if(xx[a].indexOf("https://")==0){
						xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
						xline++;
					}else{
						xx2+=xx[a];
						xline++;
					}
				}
				//xx2=xx2.replace("<div class=\"newstextbox\">\n","<div class=\"newstextbox\">");
				//xx2=xx2.replace("\n<div class=\"newsfilebox\">","<div class=\"newsfilebox\">");
				x2=xx2.replace(/\n/g, "<BR>");
				x2=x2+"</div>";
				var tts="<div style='padding:0 10px;position:absolute;top:0;left:0;opacity:0;z-index:0;' id='temptest'>"+x2+"</div>";
				$("body").append(tts);
				var th=$("#temptest").height();
				$("#temptest").remove();
				if(xplus.length>0){
					x2+="<div>"+xplus+"</div>";
				}
				if(vidcnt>1){
					x2+="<div class='show'>...閱讀更多</div>";
				}else if(th>115){
					x2+="<div class='show'>...閱讀更多</div>";
				}
			}else{
				x2="</div>";
			}
			return x2;
		//}
   }
   insert_changerchat=function(x){
		var nx=x;
		var tt=parseInt(nx['timekey']+"000");
		var d = new Date(tt);
		var m1="";
		var m2="";
		if(d.getHours()<10){
			m1="0"+d.getHours();
		}else{
			m1=d.getHours();
		}
		if(d.getMinutes()<10){
			m2="0"+d.getMinutes();
		}else{
			m2=d.getMinutes();
		}
		var mtime=m1+":"+m2;

		if(nx['content'].indexOf("https://www.youtube.com/watch?v&#061;")==0){
			var yy=nx['content'].split("https://www.youtube.com/watch?v&#061;")[1];
			newx="<div class='box photo'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><span class=time>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("https://m.youtube.com/watch?v&#061;")==0){
			var yy=nx['content'].split("https://m.youtube.com/watch?v&#061;")[1];
			newx="<div class='box photo'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><span class=time>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("https://youtu.be/")==0){
      var yy=nx['content'].split("https://youtu.be/")[1];
      newx="<div class='box photo'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><span class=time>"+mtime+"</span></div>";
    }else if(nx['content'].indexOf("twitch.tv/")>=0){
			var yy=nx['content'].split("twitch.tv/")[1];
			var yyy=yy.split("/v/");
			if(yyy.length>1){
				newx="<div class='box photo'><iframe src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='100%' height='150' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe><span class=time>"+mtime+"</span></div>";
			}else{
				newx="<div class='box photo'><iframe src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='100%' height='150' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe><span class=time>"+mtime+"</span></div>";
			}
		}else if(nx['content'].indexOf("http://")==0){
			newx="<div class='box'><a href='"+nx['content']+"' target='_new'>"+nx['content']+"</a><span class=time>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("https://")==0){
			newx="<div class='box'><a href='"+nx['content']+"' target='_new'>"+nx['content']+"</a><span class=time>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("src=")>0 && nx['content'].indexOf("uploadfile")>0){//上傳
		//	var ttt=nx['content'].replace(/img\//g, sessionStorage.getItem("imgurl")+"img/");
    	var ttt=nx['content'].replace(/uploadfile\//g, sessionStorage.getItem("imgurl")+"uploadfile/");
			newx="<div class='box photo'><a href='"+ttt+"'>"+ttt+"</a><span class='time'>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("src=")>0){//表情
			var ttt=nx['content'].replace(/img\//g, sessionStorage.getItem("imgurl")+"img/");
			newx="<div class='box photo'>"+ttt+"<span class='time'>"+mtime+"</span></div>";
		}else{
			newx="<div class='box'>"+nx['content']+"<span class=time>"+mtime+"</span></div>";
		}
		newx=newx.replace(/uploadfile/g, sessionStorage.getItem("imgurl")+"uploadfile");
	   return newx
   }
    //斷航--回復版
   nl2br_reply=function(x){
	 //   if(x.indexOf("newsfilebox")>0){//有圖
			xa=x.replace("<div class=newstextbox>","<div class=\"newstextbox\">\n");
			xa=xa.replace("<div class=\"newstextbox\">","<div class=\"newstextbox\">\n");
	 		//xa=xa.replace("<div class=newsfilebox>","<div class=\"newsfilebox\">");
			//xa=xa.replace("<div class=\"newsfilebox\">","\n<div class=\"newsfilebox\">");
			xa=xa.replace("</div>","\n</div>");	//2017-9 把收尾也段行
			var xorg="";
			var xplus="";
			var xline=1;
			var xx2="";
			var x2="";
			if(xa){
				xx=xa.split("\n");
				for(var a=0;a<xx.length;a++){
					if(xline>1){
						xx2+="\n";
					}
					if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
						var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
						xx2+="<iframe width='468' height='263' style='margin:0;max-width:100%;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
					}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
						var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
						xx2+="<iframe width='468' height='263' style='margin:0;max-width:100%;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
					}else if(xx[a].indexOf("https://youtu.be/")==0){
  					var yy=xx[a].split("https://youtu.be/")[1];
            xx2+="<iframe width='468' height='263' style='margin:0;max-width:100%;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
  					break;
  				}else if(xx[a].indexOf("twitch.tv/")>=0){
						var yy=xx[a].split("twitch.tv/")[1];
						var yyy=yy.split("/v/");
						if(yyy.length>1){
							xx2+="<iframe src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
						}else{
							xx2+="<iframe src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
						}
					}else if(xx[a].indexOf("http://")==0){
						xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
						xline++;
					}else if(xx[a].indexOf("https://")==0){
						xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
						xline++;
					}else if(xx[a].indexOf("src=")>0 && xx[a].indexOf("uploadfile")>0){//上傳
      			var ttt=xx[a].replace(/uploadfile\//g, sessionStorage.getItem("imgurl")+"uploadfile/");
      			xx2+=ttt;
      		}else if(xx[a].indexOf("src=")>0){//表情
      			var ttt=xx[a].replace(/img\//g, sessionStorage.getItem("imgurl")+"img/");
      			xx2+=ttt;
      		}else{
						xx2+=xx[a];
						xline++;
					}
				}
				//xx2=xx2.replace("<div class=\"newstextbox\">\n","<div class=\"newstextbox\">");
				//xx2=xx2.replace("\n<div class=\"newsfilebox\">","<div class=\"newsfilebox\">");
				x2=xx2.replace(/\n/g, "<BR>");
				x2=x2+"</div>";
				/*
				var tts="<div style='padding:0 10px;position:absolute;top:0;left:0;opacity:0;z-index:0;' id='temptest'>"+x2+"</div>";
				$("body").append(tts);
				var th=$("#temptest").height();
				$("#temptest").remove();
				if(th>115){
					x2+="<div class='show'>...閱讀更多</div>";
				}
				*/
				//if(xplus.length>0){
				//	x2+="<div>"+xplus+"</div>";
				//}
			}
			return x2;
		//}
   }
   //斷航-去頭版
   nl2brx=function(x){
		var xa=x;
		xa=xa.replace("<div class=newstextbox>","");
		xa=xa.replace("<div class=\"newstextbox\">","");
		xa=xa.replace("</div>","");
		var xx2="";
		var x2="";
		if(xa){
			xx=xa.split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx2.length>0){
					xx2+="\n";
				}
				if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("twitch.tv/")>=0){
					var yy=xx[a].split("twitch.tv/")[1];
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						xx2+="<iframe src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}else{
						xx2+="<iframe src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}
				}else if(xx[a].indexOf("http://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else if(xx[a].indexOf("https://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else{
					xx2+=xx[a];
				}
			}
			x2=xx2.replace(/\n/g, "<BR>");
		}
	   return "<div class=\"newstextbox\">"+x2+"</div>";
   }
   //斷航-簡易版
   nl2brs=function(x){
		var xa=x;
		var xx2="";
		var x2="";
		if(xa){
			xx=xa.split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("twitch.tv/")>=0){
					var yy=xx[a].split("twitch.tv/")[1];
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						xx2+="<iframe src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}else{
						xx2+="<iframe src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}
				}else if(xx[a].indexOf("http://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else if(xx[a].indexOf("https://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else{
					xx2+=xx[a];
				}
				if(a<(xx.length-1)){
					xx2+="\n";
				}
			}
			x2=xx2.replace(/\n/g, "<BR>");
		}
	   return x2;
   }

   //文章版
   nl2br_art=function(x){
		var xa=x;
		var xx2="";
		var x2="";
		if(xa){
			xx=xa.split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("twitch.tv/")>=0){
					var yy=xx[a].split("twitch.tv/")[1];
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						xx2+="<iframe src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}else{
						xx2+="<iframe src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}

				}else if(xx[a].indexOf("http://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else if(xx[a].indexOf("https://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else{
					xx2+=xx[a];
				}
				if(a<(xx.length-1)){
					xx2+="\n";
				}
			}
			x2=xx2.replace(/\n/g, "<BR>");
			x2=x2.replace(/uploadfile/g, sessionStorage.getItem("imgurl")+"uploadfile");
		}
	   return x2;
   }
	change_myshow=function(x,y,z){
		var me=z;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,y);//更改物件,顯示與否
		tempitem=ajaxarr("change_myshow",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				swal($data[1])
			}else{
				if(me.hasClass("fayellow")){
					me.removeClass("fayellow");
					me.addClass("fagray");
				}else{
					me.removeClass("fagray");
					me.addClass("fayellow");
				}
			}
		});
	}
	//更換個人資料
	update_myshow=function(x,y,z,y2){
		var me=z;
		var myid=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,y,y2);//更改物件,顯示與否
		tempitem=ajaxarr("update_myshow",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				popnotice(data[1])
			}else{
				if(myid=="addgame"){
					out="";
					var tags=JSON.parse(sessionStorage.getItem("tags"));
					getg=0;
					for(w=0;w<3;w++){
						dd="";
						if(data[1][w]){
							getg++;
							for(var a=0;a<tags.length;a++){
								if(tags[a]['gameid']==data[1][w]['gameid']){
									dd=tags[a]['gamename'];
								}
							}
							nn="";
							if(data[1][w]['gamenote']){
								nn=data[1][w]['gamenote'];
							}
							out+="                            	<div class='subformitem subformitem_2'>\n";
							out+="                                	<span>"+dd+"</span>\n";
							//out+="                                  <span>備註："+nn+"</span>\n";
							out+="                                  <span class='rely'>";
							out+="										<div id='egame"+w+"value'>備註："+nn+"</DIV>";
							out+="                                		<div class='hidediv'>\n";
							out+="                                			<input type='text' name='egame"+w+"' value='"+nn+"' class='formfield' id='egame"+w+"form' style='width:50%'>\n";
							out+="                                  		<input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='egame"+w+"' />\n";
							out+="                                		</div>\n";
							out+="									</span>\n";
							out+="                                  <span> <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='time'></i><i class='fa fa-times fayellow maright5 fa-vc  btn aboutclick' data-name='gamedel' data-id='game"+(w+1)+"'></i>\n";
							out+="                                	<i class='fa fa-eye "+(data[1][w]['game_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='game"+(w+1)+"'></i></span>\n";
							out+="                                  <div class='clr'></div>\n";
							out+="                              </div>\n";
						}
					}
					$("#mytagwrap").html(out);
					me.parents(".hidediv").hide();
					if(getg>=3){
						$(".fa-plus").hide();
					}else{
						$(".fa-plus").show();
					}
				}else if(myid=="gamedel"){
					var out="";
					var tags=JSON.parse(sessionStorage.getItem("tags"));
					getg=0;
					if(data[1].length>0){
						for(w=0;w<3;w++){
							dd="";
							if(data[1].length && data[1][w]){
								getg++;
								for(var a=0;a<tags.length;a++){
									if(tags[a]['gameid']==data[1][w]['gameid']){
										dd=tags[a]['gamename'];
									}
								}
								nn="";
								if(data[1][w]['gamenote']){
									nn=data[1][w]['gamenote'];
								}
								/*
								out+="                            	<div class='subformitem subformitem_2'>\n";
								out+="                                	<span>"+dd+"</span>\n";
								//out+="                                  <span>備註："+nn+"</span>\n";
								out+="                                  <span class='rely'>";
								out+="										<div id='egame"+w+"value'>備註："+nn+"</DIV>";
								out+="                                		<div class='hidediv'>\n";
								out+="                                			<input type='text' name='egame"+w+"' value='"+nn+"' class='formfield' id='egame"+w+"form' style='width:50%'>\n";
								out+="                                  		<input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='egame"+w+"' />\n";
								out+="                                		</div>\n";
								out+="									</span>\n";
								out+="                                  <span> <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='time'></i><i class='fa fa-times fayellow maright5 fa-vc  btn aboutclick' data-name='gamedel' data-id='game"+(w+1)+"'></i>\n";
								out+="                                	<i class='fa fa-eye "+(data[1][w]['game_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='game"+(w+1)+"'></i></span>\n";
								out+="                                  <div class='clr'></div>\n";
								out+="                              </div>\n";
								*/
							}
						}
					}
					$("#mytagwrap").html(out);
					if(getg>=3){
						$(".fa-plus").hide();
					}else{
						$(".fa-plus").show();
					}
				}else{
					if(myid=="time" || myid=="location" ){
						$("#"+myid+"value").html(data[1]);
					}else if(myid=="name"){
						$("#"+myid+"value").html(data[1]);
					}else if(myid=="pass"){
						//$("#"+myid+"value").html(data[1]);
					}else{
						$("#"+myid+"value").html("備註："+data[1]);
					}
					me.parents(".hidediv").hide();
				}
			}
		});
	}
	 copyToClipboard=function(element) {
		var $temp =$("<input>");
		$("body").append($temp);
		$temp.val(element).select();
		document.execCommand("copy");
		$temp.remove();
		swal("複製成功");
	}
	popshare=function(a,b) { //一般地跳出
		var x="";
		//xurl=window.location.toString();
		//xpage=xurl.substring(0,xurl.lastIndexOf('/'));
		//x=xpage+"/share.php?page="+a+"&id="+b;
		x="<a href='"+remotebase+"share.php?page="+a+"&id="+b+"' id='sharemeplease' target=_new >"+remotebase+"share.php?page="+a+"&id="+b+"</a><div style='margin-top:5px;' class='copytoclip submitclick border5 btn bgcolor_lc' data-target='#sharemeplease'>複製網址</div>";
		popbaseu("<div style='padding:10px;word-wrap: break-word;'>分享連結:<BR>"+x+"</div>","c");
	}
   //反轉 n12bt
   br2nl=function(x){
		var xa=x;
		//xa=xa.replace("<div class=newstextbox>","");
		//xa=xa.replace("</div>","");
		xa=xa.replace(/<br>/g, "\n");
		var xx=xa.split("\n");
		var xx2="";
		for(var a=0;a<xx.length;a++){
			if(xx[a].indexOf("https://www.youtube.com/embed/")>0){
				var yy=xx[a].split("https://www.youtube.com/embed/")[1];
				var yyb=yy.split("'")[0];
				yyb=yy.split("\"")[0];
				if(xx2){
					xx2+="\nhttps://www.youtube.com/watch?v="+yyb;
				}else{
					xx2+="https://www.youtube.com/watch?v="+yyb;
				}
			}else if(xx[a].indexOf("http://player.twitch.tv/?")>0){
				var yy=xx[a].split("http://player.twitch.tv/?")[1];
				var yyy=yy.split("video=v");
				if(yyy.length>1){
					var yyy2=yyy[1].split("&")[0];
					if(xx2){
						xx2+="\nhttp://www.twitch.tv/v/"+yyy2;
					}else{
						xx2+="http://www.twitch.tv/v/"+yyy2;
					}
				}else{
					var yyy2=yy.split("channel=")[1];
					var yyy3=yyy2.split("'")[0];
					yyy3=yyy2.split("\"")[0];
					if(xx2){
						xx2+="\nhttp://www.twitch.tv/"+yyy3;
					}else{
						xx2+="http://www.twitch.tv/"+yyy3;
					}
				}
			}else if(xx[a].indexOf("href=\"")>=0){
				var yy=xx[a].split("href=\"")[1];
				var yyb=yy.split("\"")[0];
				if(xx2){
					xx2+="\n"+yyb;
				}else{
					xx2+=yyb;
				}
			}else{
				if(xx2){
					xx2+="\n"+xx[a];
				}else{
					xx2+=xx[a];
				}
			}
		}
	   return xx2;
   }
   //轉換時間
   chk_timeitem=function(){
	   run_timeitem();
	   var timechk=setInterval(function(){
		 run_timeitem();
	    },30000);
   }
   set_video=function(){
				var myVid=$("video");
				for(var a=0;a<myVid.length;a++){
					var temp=myVid.eq(a);
					temp.on('loadedmetadata', function() {
  							temp.prop("currentTime",2);
					});
				}
   }
   run_timeitem=function(){
	   var nowx = new Date().getTime();
	   tlist=$(".timeitem");
	   for(var a=0;a<tlist.length;a++){
		   if(tlist.eq(a).data("t")){
				var n=new Date( Date.parse(tlist.eq(a).data("t").replace(/-/g,"/") )).getTime();
				if((nowx-n)<1000*60*60*24){//10小時內
					var k=nowx-n;
					if(k>1000*60*100){//超過小時
						sh=Math.floor(k/(1000*60*60));
						tlist.eq(a).html("於"+sh+"小時前");
					}else if(k>1000*60){
						sh=Math.floor(k/(1000*60));
						tlist.eq(a).html("於"+sh+"分鐘前");
					}else{
						tlist.eq(a).html("於剛剛");
					}
				}else{
					var n=new Date( Date.parse(tlist.eq(a).data("t").replace(/-/g,"/") ));
					tlist.eq(a).html(n.getFullYear()+"年"+(n.getMonth()+1)+"月"+n.getDate()+"日 "+ run_addZero(n.getHours())+":"+run_addZero(n.getMinutes()));
				}
		   }
	   }
   }
	run_addZero=function(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	//計算高度
	run_chknewstext=function(x){
		var allh=18*20;
		for(var a=0;a<x.length;a++){
			chk=x.eq(a).height();
			if(chk>allh){
				x.eq(a).css("height",allh-155);//長文張折疊的高度計算 ==> Pman
				x.eq(a).append("<div class='newstextmore'>......繼續閱讀</div>");
			}
		}
	}
	// AJAX  JASON
 	ajaxarr=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		var temp=y;
		var ntemp
		for(var a=0;a<temp.length;a++){
			if($.isArray(temp[a])){
			}else if(temp[a] && temp[a].length>0){
				temp[a] = temp[a].replace("https","QQHUIRCAJOSDIJDOW");
				temp[a] = temp[a].replace("http","VMASODIWEJWOJEO");
			}else{
			}
		}
		return  $.ajax({
			 type:'GET',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":temp,"timtess":$.now()}
		});
	};

 	ajaxarrval=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
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
  allpopupclose= function(xme) {
    var r = confirm("請位是否要關閉修改畫面？所有未儲存的修改將會遺失！");
    if(r == true){
      xme.parents(".allpopup").remove();
      chkpopfull();
    }
  }
  allpopupclosedir= function(xme) {
    xme.parents(".allpopup").remove();
    chkpopfull();
  }
   popclose= function() {
		$("#popin").stop().animate({"margin-top":-600},500);
		$("#pop").delay(400).stop().fadeOut(300).remove();
		chkpopfull();
   }
   popcloseu= function() {
		$("#popinu").stop().animate({"margin-top":-600},500);
		$("#popu").delay(400).stop().fadeOut(300).remove();
		if($(".mce-floatpanel").length>0){
			$(".mce-floatpanel").remove();
			$("#mce-modal-block").hide();
		}
		chkpopfull();
   }
   popcloseu2= function() {
		$("#popinu").stop().animate({"margin-top":-600},500);
		$("#popu").delay(400).stop().fadeOut(300).remove();
		chkpopfull();
   }
   popuserclose= function() {
		var ww=$(window).width();
		//$("#popuser").stop().animate({"left":-ww},400).remove();
		$("#popuser").remove();
		chkpopfull();
   }
    popusercloseu= function() {
		var ww=$(window).width();
		//$("#popuseru").stop().animate({"left":-ww},400).remove();
		$("#popuseru").remove();
		chkpopfull();
   }
   popusercloseu2= function() {
   var ww=$(window).width();
   $("#popuseru2").remove();
   chkpopfull();
  }
    popfullcloseq= function() {
		var ww=$(window).width();
		//$("#popfullq").stop().animate({"left":-ww},400).remove();
		$("#popfullq").remove();
		sessionStorage.setItem("qnaselect","");
		chkpopfull();
   }
   popfullclosechat= function() {
		var ww=$(window).width();
		$("#popchatfull").remove();
		chkpopfull();
   }
   popfullclosechatu= function() {
		var ww=$(window).width();
		$("#popchatfullu").remove();
		chkpopfull();
   }
   popfullclosechatu2= function() {
		var ww=$(window).width();
		$("#popchatfullu2").remove();
		chkpopfull();
   }
   popfullclose= function() {
		var ww=$(window).width();
		//$("#popfull").stop().animate({"left":-ww},400).remove();
		$("#popfull").remove();
		$(".htitle").removeClass("htitleon");
		chkpopfull();
   }
   popfullcloseu= function() {
		var ww=$(window).width();
		//$("#popfullu").stop().animate({"left":-ww},400).remove();
		$("#popfullu").remove();
		chkpopfull();
   }
   popfullcloseu2= function() {
		var ww=$(window).width();
		//$("#popfullu2").stop().animate({"left":-ww},400).remove();
		$("#popfullu2").remove();
		chkpopfull();
   }
   popfullcloset= function() {
		var ww=$(window).width();
		$("#popfullt").remove();
		//$("#popfullt").stop().animate({"left":-ww},400).remove();
		chkpopfull();
   }
   popfullcloseart= function() {
		var ww=$(window).width();
		//$("#popfullart").stop().animate({"left":-ww},400).remove();
		$("#popfullart").remove();
		chkpopfull();
   }
   chkpopfull=function(){
	   setTimeout(function(){
       if($(".allpopup").length==0 && $("#popfull").length==0  && $("#popfullt").length==0 && $("#popfullu").length==0 &&$("#popfullu2").length==0&&$("#popuser").length==0&&$("#popuseru").length==0&&$("#popuseru2").length==0&&$("#popfullut").length==0&&$("#popfulluq").length==0&&$("#popchatfull").length==0&&$("#popchatfullu").length==0&&$("#popchatfullu2").length==0){
 				$("body").removeClass("fixbody");
         $("#mainwrap").removeClass("fixbody");
         setTimeout(function(){
           $(document).scrollTop(mainstop);
         },200);
         if(curpage){
           $("footer").show();
           setTimeout(function(){
             $('footer .slides').slick();
           },500);
         }
 			}else{
 				if($("body").hasClass("fixbody")){
 				}else{
           mainstop=$(document).scrollTop();
           $("body").addClass("fixbody");
           $("#mainwrap").addClass("fixbody");
 				}
 				$("footer").hide();
 			}
		},300);
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
			//x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			swal(x.data("err"));
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	vtext=function(x,y,z,mx){
		if(x.val().length> mx){
			x.addClass("forminput");
			swal(x.data("err"));
			return false;
		}else if(x.val().length < y){
			x.addClass("forminput");
			swal(x.data("err"));
			return false;
		}else{
			x.removeClass("forminput");
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
	vdate=function(x){
		t=Date.parse(x.val());
		if(isNaN(t)){
			x.addClass("forminput");
			//x.parent(".formitem").children(".formerr").show();
			return false;
		}else{
			//x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}
	}
	vdateval=function(x){
		t=Date.parse(x);
		if(isNaN(t)){
			x.addClass("forminput");
			//x.parent(".formitem").children(".formerr").show();
			return false;
		}else{
			//x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}
	}
	 vcheck=function(x,z){
		var numbers = /^[-+]?[0-9]+$/;
		if(x.is(':checked')){
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			//popnotice("請確認"+z);
			swal(x.data("err"));
			return false;
		}
	}
	 vcheckb=function(x,z){
		var numbers = /^[-+]?[0-9]+$/;
		if(x.is(':checked')){
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			swal(x.data("err"));
			//x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	tinysetup=function(x){
		tinymce.init({
			language:"zh_TW",
			valid_children : "+body[style],+body[link]",
			theme_advanced_font_sizes: "12px,14px,15px,16px,18px,21px,24px",
			font_size_style_values : "12px,14px,15px,16px,18px,21px,24px",
			selector: x,
			plugins: [
									"advlist autolink lists link image charmap print preview anchor",
									"searchreplace visualblocks code fullscreen",
									"table contextmenu paste",
									"textcolor"
			],
			toolbar: "insertfile undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
		});
	}
	topnavchange=function(curpage,x){
		var showkey=curpage;
		if(curpage=="publishpage"){
			showkey="articlepage";
		}

		navlist= $(".slides .slick-slide");
		navlist.removeClass("on");
		for(var a=0;a<navlist.length;a++){
			if(navlist.eq(a).data("type")==showkey){
				navlist.eq(a).addClass("on");
			}
		}
		/*
		$(".leftinfoselectitem").removeClass("leftinfoselectitemon");
		navlist=$(".topnavclick");
		navlist.eq(7).children("img").attr("src","img/nav_shop.png");
		for(var a=0;a<navlist.length;a++){
			if(navlist.eq(a).data("type")==showkey){
				navlist.eq(a).addClass("on");
				if(a==7){
					navlist.eq(7).children("img").attr("src","img/nav_shopo.png");
				}
			}
		}
		navlistx=$(".leftinfoselectitem");
		for(var a=0;a<navlistx.length;a++){
			if(navlistx.eq(a).data("type")==showkey){
				if(showkey=="mypage"){
					if(navlistx.eq(a).data("val")==x){
						navlistx.eq(a).addClass("leftinfoselectitemon");
					}
				}else{
					navlistx.eq(a).addClass("leftinfoselectitemon");
				}
			}
		}
		*/

	}
	mynav_change=function(x){
		$(".mysubclick").removeClass("on");
		$(".mysubclick").eq(x-1).addClass("on");

	}


	centermyimg=function(){
		mylist=$(".imgitemboxp img");
		rw=$(".imgitemboxp").width();
		rh=$(".imgitemboxp").height();
		if(mylist.length>0){
			for(var a=0;a<mylist.length;a++){
				h=mylist.eq(a).height();
				w=mylist.eq(a).width();
				if((h/w)>(rh/rw)){
					mylist.eq(a).css("width",rw);
					mylist.eq(a).css("height",rw*h/w);
					mylist.eq(a).css("margin-top",-(rw*h/w-rh)/2);
				}else if(w>h){
					mylist.eq(a).css("height",rh);
					mylist.eq(a).css("width",rh*w/h);
					mylist.eq(a).css("margin-left",-(rh*w/h-rw)/2);
				}
			}
		}
	}
	centermyimg2=function(){
		if($(".imgitemboximg img").length>0){
			mylist=$(".imgitemboximg img");
			rw=$(".imgitemboximg").width();
			rh=$(".imgitemboximg").height();
		}else{
			mylist=$(".imgitembox img");
			rw=$(".imgitembox").width();
			rh=$(".imgitembox").height();
		}
		if(mylist.length>0){
			for(var a=0;a<mylist.length;a++){
				h=mylist.eq(a).height();
				w=mylist.eq(a).width();
				if((h/w)>(rh/rw)){
					mylist.eq(a).css("width",rw);
					mylist.eq(a).css("height",rw*h/w);
					mylist.eq(a).css("margin-top", -(rw*h/w-rh)/2);
				}else{
					mylist.eq(a).css("height",rh);
					mylist.eq(a).css("width",rh*w/h);
					mylist.eq(a).css("margin-left",-(rh*w/h-rw)/2);
				}
			}
		}
	}
	chk_regpoints=function(){//註冊時計算點數
		toppoint=parseInt($("#poppoints").data("p1"))+parseInt($("#poppoints").data("p2"))+parseInt($("#poppoints").data("p3"));
		allpoint=parseInt($("#poppoints").data("p1"));
		if($("#popgame1").val().length>0 && $("#popgametime").val().length>0 ){
			allpoint=allpoint+parseInt($("#poppoints").data("p2"));
		}
		if($("#headpicid").val().length>0 && $("#frontpicid").val().length>0){
			allpoint=allpoint+parseInt($("#poppoints").data("p3"));
		}
		if(allpoint<toppoint){
			allpoint="目前已得到"+allpoint+"點";
		}else{
			allpoint="恭喜您，得到最高的"+allpoint+"點!";
		}
		$("#poppoints").html(allpoint);
	}
	get_ages = function(x) {
		var now = new Date();
		var past = new Date(x);
		if(past.getFullYear()){
			var nowYear = now.getFullYear();
			var pastYear = past.getFullYear();
			var nowM = now.getMonth();
			var pastM = past.getMonth();
			if(now.getMonth()<past.getMonth()){
				age = now.getFullYear() - past.getFullYear();
			}else if(now.getMonth()>past.getMonth()){
				age = now.getFullYear() -1- past.getFullYear();
			}else{
				if(now.getDate()>=past.getDate()){
				age = now.getFullYear() - past.getFullYear();
			  }else{
				age = now.getFullYear() -1- past.getFullYear();
			  }
			}
			return age;
		}else{
			return "年不知幾許";
		}
	};
	get_horo=function(x){
		horo1=['-1','19','49','78','108','139','171','202','233','264','295','324','353'];
		horo2=['-1','19','49','79','109','140','172','203','234','265','296','325','354'];
		horon=['魔羯座','水瓶座','雙魚座','白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','魔羯座'];
		var past = new Date(x);
		if(past.getFullYear()){
			var mydays = dayofyear(past);
			var testx=past.getFullYear()+"-3-1";
			var testd=dayofyear(new Date(testx));
						if(testd==59){
							horo=horo1;
						}else{
							horo=horo2;
						}
						for(a=0;a<horo.length;a++){
							if(mydays>horo[a]){
								myh=horon[a];
							}
						}
			return myh;
		}else{
			return "人客來座";
		}
	}
	dayofyear=function(d) {   // d is a Date object
		var yn = d.getFullYear();
		var mn = d.getMonth();
		var dn = d.getDate();
		var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
		var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
		var ddiff = Math.round((d2-d1)/864e5);
		return ddiff+1;
	}
	setimages=function(m){
		ttotal=m.length;
		var pout="";
		if(ttotal==1){
			pout+="<div class='albfacewrap popimgclick btn ' data-val='"+m[0]['thisid']+"'>";
			pout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+pics[0]['thisfile']+"' class='albfacepicw'>";
			pout+="</div>";
		}else if(ttotal==2){
			pout+="<div class='albfacewrap popimgclick btn ' data-val='"+m[0]['thisid']+"'>";
			pout+="<div class='albface1'>";
			pout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+m[0]['thisfile']+"' class='albfacepic"+m[0]['t']+"'>";
			pout+="</div>";
			pout+="<div class='albface1'>";
			pout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+m[1]['thisfile']+"' class='albfacepic"+m[1]['t']+"'>";
			pout+="</div>";
			pout+="</div>";
		}else{
			var img = new Image();
			pout+="<div class='albfacewrap popimgclick btn ' data-val='"+m[0]['thisid']+"'>";
			pout+="<div class='albface1'>";
			pout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+m[0]['thisfile']+"' class='albfacepic"+m[0]['t']+"'>";
			pout+="</div>";
			pout+="<div class='albface2'>";
			pout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+m[1]['thisfile']+"' class='albfacepic"+m[1]['t']+"'>";
			pout+="</div>";
			pout+="<div class='albface3'>";
			pout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+m[2]['thisfile']+"' class='albfacepic"+m[2]['t']+"'>";
			if(ttotal>3){
				pout+="<div class='albface3cover'>+ "+(ttotal-3)+"</div>";
			}
			pout+="</div>";
			pout+="<div class=clr></div>";
			pout+="</div>";
		}
		return pout;
	}
	set_bannerselect=function(x){
		//檢查gameid
		mybanner=[];
		cc=0;
		tags=JSON.parse(sessionStorage.getItem("tags"));
		if(localStorage.getItem("gameselect")){
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
			for(var b=0;b<x.length;b++){
				for(var a=0;a<gameselect.length;a++){
					for(var r=0;r<tags.length;r++){
						if(gameselect[a]['gameid']==tags[r]['gameid']){
							if(tags[r]['typeid']==x[b]['gameid']){
								mybanner[cc]=x[b];
								cc++;
							}
						}
					}
				}
			}
			if(cc>0){
				return mybanner;
			}else{
				return x;
			}
		}else{
			return x;
		}
	}
	stringBytes=function(c){
		var n=c.length,s;
		var len=0;
		for(var i=0; i <n;i++){
			s=c.charCodeAt(i);
			while( s > 0 ){
				len++;
				s = s >> 8;
			}
		}
		return len;
	}
	smallpics=function(x){
		if(x.indexOf(".jpg")>0){
			return x.replace(".jpg", "s.jpg");
		}else if(x.indexOf(".png")>0){
			return x.replace(".png", "s.png");
	}}
	chk_notice=function(){
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
			tempitem=ajaxarr("chk_notice",tempvals,ajaxurl);
			tempitem.success(function(data){
				if(data){
					if(parseInt(data[1])>0){
						$("#hnoticeqty").html(data[1]);
					}else{
						$("#hnoticeqty").html("");
					}
					if(parseInt(data[2])>0){
						$("#hchatqty").html(data[2]);
					}else{
						$("#hchatqty").html("");
					}
					if(parseInt(data[0])>0){
						$("#haddfriendqty").html(data[0]);
					}else{
						$("#haddfriendqty").html("");
					}
				}
			});
		}
	}
	popactpass = function(x) {
		var tempvals=Array("2","16");
		tempitem=ajaxarr("get_awa",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data 義
			out="您好,\n您的會員已經確認,請花一點時間填寫下列資訊,完成註冊\n\n*完整填寫所有資料,可以多獲得點數"+data[0]+"點";
			swal(out);
		});
	}
	chk_online=function(){
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
			tempitem=ajaxarr("chk_online",tempvals,ajaxurl);
			tempitem.success(function(data){//回傳 data
			});
		}
	}
	chk_friends=function(){
			//$("#friendlist").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");  //20161103 Pman 取消前台右側讀取時的轉圈圈，因為刷新的時間縮短，會一直出現。
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
			tempitem=ajaxarr("get_friends",tempvals,ajaxurl);
			tempitem.success(function(data){
				out="";
				if(data[0]=="ERR"){
				}else{
					if(data[1].length>0){
						for(var a=0;a<data[1].length;a++){
							out+="            	<!--item-->\n";
							out+="            	<div class='frienditem  applebtn' data-type='friend' data-val='"+data[1][a]['uid']+"'>\n";
							out+="                	<div class='friendimgwrap friendimgwrapon'>\n";
							out+="                    	<div class='friendimgbox'>\n";
							if(data[1][a]['headpic']){
								out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1][a]['headpic']); +"' />\n";
							}else{
								out+="                        	<img src='img/basicheads.png' />\n";
							}
							out+="                     	</div>\n";
							out+="                     </div>\n";
							out+="                     <div class='frienditemtext'>"+data[1][a]['name']+"</div>\n";
							out+="                     <div class='clr'></div>\n";
							out+="            	</div>\n";
							out+="                <!--item end -->				\n";
						}
					}
					if(data[2].length>0){
						for(var a=0;a<data[2].length;a++){
							out+="            	<!--item-->\n";
							out+="            	<div class='frienditem applebtn' data-type='friend' data-val='"+data[2][a]['uid']+"'>\n";
							out+="                	<div class='friendimgwrap'>\n";
							out+="                    	<div class='friendimgbox'>\n";
							if(data[2][a]['headpic']){
								out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[2][a]['headpic'])+"' />\n";
							}else{
								out+="                        	<img src='img/basicheads.png' />\n";
							}
							out+="                     	</div>\n";
							out+="                     </div>\n";
							out+="                     <div class='frienditemtext'><span>"+data[2][a]['name']+"</span></div>\n";
							out+="                     <div class='clr'></div>\n";
							out+="            	</div>\n";
							out+="                <!--item end -->				\n";
						}
					}
				}
				$("#friendlist").html(out);
			});
	}

	wall_slides=function(){
		if($(".slick-active").length>1){
			setTimeout(function(){
				$('.article .main .slides').slick('unslick');
			},50);
			setTimeout(function(){
				wall_slidesin();
			},100);

		}else{
			wall_slidesin();
		}

	}
	unwallslide=function(){
		$('.article .main .slides').slick('unslick');
	};
	wall_slidesin=function(){
			$('.article .main .slides').slick({
					dots: true,
					centerMode: true,
					centerPadding: '0',
					slidesToShow: 1,
					autoplay: false,
					autoplaySpeed: 4000,
					fade: false,
					adaptiveHeight: true,
					responsive: [{
						breakpoint: 508,
						settings: {
							arrows: false,
							centerMode: true,
						}
					}, ]
			});
	}
	getmoreboard=function(x){//中央版控制--x==動態牆上之選項....y=人的id
		mem=JSON.parse(sessionStorage.getItem("member"));
		if($("#mainitemlast").data("val")){
			mylast=$("#mainitemlast").data("val");
		}else{
			mylast=0;
		}
		if(x){}else{x=0;}
		var mytype=$("#maincontentbox").data("type");
		var myval=$("#maincontentbox").data("val");
		y="";
		if($("#maincontentbox").data("id")){
			var y=$("#maincontentbox").data("id");
		}

		if(mytype=="wall"){
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
		}else if(mytype=="shop"){
			gameselect=$("#mainitemlast").data("select");
			y=$("#mainitemlast").data("sort");
		}else if(mytype=="mywall"){
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
		}else{
			if(sessionStorage.getItem("qnaselect")==""){
				gameselect=JSON.parse(localStorage.getItem("gameselect"));
			}else{
				gameselect=sessionStorage.getItem("qnaselect");
			}
		}
		var myselect=x;
    var tempxx="<div id='mainitemlast'><div style='position:relative;height:120px;'><div class='loaderbox'><img src='assets/img/loader.gif' style='width:16%;'></div></div></div>";
    $("#mainitemlast").replaceWith(tempxx);
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect,y);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
		tempitem=ajaxarr("show_board",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
			if(data[0]=="ERR"){
				if(data[1]){
					//alert(data[1])
				}
			}else{
				var out="";
				var lastid="";
				if(mytype=="wall" && myval=="mainlist"){
					out+=get_insertbanner();
					if(data && data.length>0){
						for(var a=0;a<data.length;a++){
							lastid=data[a]['main']['thisid'];
							out+=print_wallitem(data[a]);
						}
					}
				}else if(mytype=="match" && myval=="mainlist"){
					for(a=0;a<data[1].length;a++){
						lastid=data[1][a]['uid'];
						out+=print_frienditem(data[1][a],1);
					}
				}else if(mytype=="mywall" && myval=="mainlist"){
					for(a=0;a<data[1].length;a++){
						lastid=data[1][a]['main']['thisid'];
						out+=print_wallitem(data[1][a]);
						if( ((a+1)%5) == 0){
							out+=get_insertbanner();
						}
					}
				}else if(mytype=="qna" && myval=="mainlist"){
					for(var a=0;a<data.length;a++){
						lastid=data[a]['thisid'];
						out+=print_qnaitem(data[a]);
					}
				}else if(mytype=="shop"){
					ext=$(".album .list").length;
					for(var a=0;a<data[1].length;a++){
						ext++;
						out+=print_shopitem(data[1][a]);
					}
					lastid=ext;
				}else if(mytype=="notice" && myval=="mainlist"){
					out+="                        	<div class='mainitem_2'>\n";
					out+="                            	<span>XXX 發佈了一篇攻略「XXXXXXXX」</span>\n";
					out+="                                <span>2015/6/11 13:00</span>\n";
					out+="                            </div>\n";
					out+=out;
					out+=out;
					out+=out;
				}else if(mytype=="article" && myval=="mainlist"){
					if(data && data[1].length>0){
						for(var a=0;a<data[1].length;a++){
							lastid=data[1][a]['thisid'];
							out+=print_articleitem(data[1][a]);
						}
						out+=get_insertbanner();
					}
				}
				if(data.length>0){
					sessionStorage.setItem("getmore","1");
					out+="<div id='mainitemlast' data-val='"+lastid+"' data-select='"+myselect+"' data-sort='"+y+"'></div>";
					$("#mainitemlast").replaceWith(out);
					run_timeitem();
					set_video();
          setTimeout(function(){
  					wall_slides();
  				},1000);
					run_chknewstext($("#maincontentbox .newstextbox"));
				}else{
          $("#mainitemlast").replaceWith("");
					sessionStorage.setItem("getmore","0");
				}
			};
		});
	}
	getaboutboard=function(x){//myabout front
		var mem=x;
    gameselect=JSON.parse(localStorage.getItem("gameselect"));
		var tempvals=Array(mem,gameselect);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
		tempitem=ajaxarr("show_myboard",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
			if(data[0]=="ERR"){
				if(data[1]){
				//	$("#anoutmaincontentbox").html(data[1])
				}
			}else{
				var out="";
				if(data[1] && data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						out+=print_wallitem(data[1][a]);
					}
				}
				if(out){
					$("#anoutmaincontentbox").html(out)
					run_timeitem();
					set_video();
          setTimeout(function(){
  					wall_slides();
  				},1000);
					run_chknewstext($("#anoutmaincontentbox .newstextbox"));
				}
			};
		});
	}
	popgetmoreboard=function(x,z,y,p){//中央版控制--x==動態牆上之選項....y=人的id
		mem=JSON.parse(sessionStorage.getItem("member"));
		if($("#popitemlast").data("val")){			mylast=$("#popitemlast").data("val");		}else{			mylast=0;		}
		if(x){}else{x=0;}
		var mytype=$("#popcontentbox").data("type");
		var myval=$("#popcontentbox").data("val");
		y="";
		if($("#popcontentbox").data("id")){			var y=$("#popcontentbox").data("id");		}
		var myselect=x;
		if(mytype=="article" && myval=="mainlist"){//這裡需要好幾個值 1=誰(id),類別=正搞,炒搞, 搜尋=key 最後id=
			var tempvals=Array(x,z,y,p); //類別 / key / 最後id / page
			tempitem=ajaxarr("show_mypage3",tempvals,ajaxurl);
			tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
				if(data[0]=="ERR"){
				}else{
					var out="";
					var lastid="";
					if(data && data[1].length>0){
						for(var a=0;a<data[1].length;a++){
							lastid=data[1][a]['thisid'];
							out+=print_articleitem(data[1][a],1);
						}
						sessionStorage.setItem("popgetmore","1");
						out+="<div id='popitemlast' data-val='"+lastid+"' data-select='"+myselect+"'></div>";
						$("#popitemlast").replaceWith(out);
						run_timeitem();
						set_video();
						//setsize();
					}else{
						sessionStorage.setItem("popgetmore","0");
					}
				};
			});
		}
	}
	closeallframe=function(){
		var plist=$(".popframe");
		$(".popframe").remove();
	}
  getOrientation=function(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
    var view = new DataView(e.target.result);
    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
      if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
      var little = view.getUint16(offset += 6, false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      var tags = view.getUint16(offset, little);
      offset += 2;
      for (var i = 0; i < tags; i++)
        if (view.getUint16(offset + (i * 12), little) == 0x0112)
        return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }
})(jQuery);

$(document).ready(function(){
  $("body").delegate(".copytoboard","click",function(){
		copyToClipboard($(this).data("val"));
	 });
   $("body").delegate(".allpopupclose","click",function(e){
 		e.preventDefault();
    var me=$(this);
    if(me.hasClass("submitback")){
      var r = confirm("請位是否要關閉修改畫面？所有未儲存的修改將會遺失！");
      if(r == true){
        me.parents(".allpopup").remove();
        chkpopfull();
      }
    }else{
      	me.parents(".allpopup").remove();
        chkpopfull();
    }



 	});
	$("body").delegate(".popclose","click",function(e){
		e.preventDefault();
		popclose();
	});
	$("body").delegate(".popcloseu","click",function(e){
		e.preventDefault();
		popcloseu();
	});
	$("body").delegate(".popuserclose","click",function(e){
		e.preventDefault();
		popuserclose();
	});
	//這個特別給 user edit
	$("body").delegate(".popusercloseu","click",function(e){
		e.preventDefault();
		//popuserclose();//先關下面一層
		popusercloseu();//關掉editer
		//y=sessionStorage.getItem("userid");
		//show_mypagefront(y);//重新顯示使用者
	});
  $("body").delegate(".popusercloseu2","click",function(e){
		e.preventDefault();
		popusercloseu2();//關掉editer
	});
	$("body").delegate(".popfullclosechat","click",function(e){
		e.preventDefault();
		popfullclosechat();
	});
	$("body").delegate(".popfullclosechatu","click",function(e){
		e.preventDefault();
		popfullclosechatu();
	});
	$("body").delegate(".popfullclosechatu2","click",function(e){
		e.preventDefault();
		popfullclosechatu2();
	});
	$("body").delegate(".popfullclose","click",function(e){
		e.preventDefault();
		popfullclose();
	});
	$("body").delegate(".popfullcloseu","click",function(e){
		e.preventDefault();
		popfullcloseu();
	});
	$("body").delegate(".popfullcloseu2","click",function(e){
		e.preventDefault();
		popfullcloseu2();
	});
	$("body").delegate(".popfullcloset","click",function(e){
		e.preventDefault();
		popfullcloset();
	});
	$("body").delegate(".popfullcloseq","click",function(e){
		e.preventDefault();
		popfullcloseq();
	});
	$("body").delegate(".popfullcloseart","click",function(e){
		e.preventDefault();
		popfullcloseart();
	});
	$("body").delegate(".btn","click",function(e){
		e.preventDefault();
	});
  $("body").delegate(".applebtn","click",function(e){
    e.preventDefault();
	});
	//自動延伸 teatarea 功能
	$("textarea").css("-ms-overflow-style","none");
	$("textarea").css("overflow","hidden");
	//$("textarea").val("");

	$("body").delegate("textarea","keyup",function(){
		if(!$(this).hasClass("notmove")){
			 $(this).height( 0 );
			inheight=this.scrollHeight;
			if(inheight<40){
				inheight=40;
			}
			$(this).css("height",inheight);
		}
	});
	$('body').on('focus',".birthday", function(){
		$(this).datepicker({
            			changeYear: true,
						yearRange: "-80:-5",
						dateFormat: 'yy-mm-dd',
						minDate: '1920-07-01',
						maxDate: '0',
						defaultDate: '-9000'
		});
	});
	$('body').on('focus',".chosen", function(){
		//jQuery($(this)).chosen();
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
	$('body').delegate(".replyshowall","click", function(){
		$(this).hide();
		$(this).siblings(".mcreplyitem").slideDown(500);
		$(this).siblings(".mcreplyitem2").slideDown(500);
	 });
	//上傳檔案的共用
	$("body").delegate(".instantuploadm","change",function(){//多重檔案--相簿
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
			var me=$(this);
			var ifile = this.files;
			var tpchk=0;

			for(a=0;a<ifile.length;a++){
				if(ifile[a].type == 'image/png' || ifile[a].type == 'image/jpg' || ifile[a].type == 'image/gif' || ifile[a].type == 'image/jpeg'){
					//if(ifile[a].size > 2000000) {	tpchk=1;	}
				}else{			tpchk=2;	}
			}
			if(ifile.length>20){
				swal("限制最多20張圖片");
			}else if(ifile.length >5 && ( me.data("job")=="uploadqnapic" || me.data("job")=="uploadnewspic" ) ) {
				swal("上傳最高上限五張圖片");
			}
    //  else if(tpchk==1) {
			//	swal("相片大小一張限制2MB");
		//	}
      else if(tpchk==2) {
				swal("檔案格式不符合,僅接受jpg,gif,png格式");
			}else {
				var formData = new FormData();
				for(a=0;a<ifile.length;a++){
				 formData.append( 'val'+a,ifile[a]);
				}
				 formData.append( 'job', $(this).data("job"));
				 formData.append( 'uid',sessionStorage.getItem("userid"));
				 formData.append( 'ukey',sessionStorage.getItem("key"));
         if(me.data("pictarget")){
           $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loader.gif'></div>");
         }
				 $.ajax({
						url: ajaxurl,  //server script to process data
						type: 'POST',
						success: completeHandler = function(data) {
							$(".fileupload").val('');//更新 2016/7/18
							datax=JSON.parse(data);
							if(datax[0]=="ERR"){
								swal("會員資料不符合,請重新登入,謝謝");
							}else{
								if(me.data("job")=="uploadnewspic"){//這是動態上傳-QNA圖片也共用
									var pout="";
									for(var a=0;a<datax[1].length;a++){
                        				pout+="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+datax[1][a]+"'><i class='fa fa-times-circle predelclick' aria-hidden='true' data-job='newspic'  data-albid='"+datax[0]+"' data-val='"+datax[2][a]+"' ></i></div>";
									}
									if(datax[1].length<5){
                        				pout+="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+datax[0]+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
									}
									pout+="<div class='insertreplace clr'></div>";
									$("#"+me.data("pictarget")).html(pout);
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(datax[0]);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val("1");
									}
								}else if(me.data("job")=="uploadnewspicbook"){//這是相簿
									var pout="";
									for(var a=0;a<datax[1].length;a++){
										pout+="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+datax[1][a]+"'><i class='fa fa-times-circle predelclick' aria-hidden='true' data-job='albpic'  data-albid='"+datax[0]+"' data-val='"+datax[2][a]+"' ></i></div>";
									}
									pout+="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+datax[0]+"' class='fileupload instantupload' data-job='addalbpicx' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>\n";
									pout+="<div class='clr'></div>";
									$("#newstitlewrapx").show();
									$("#"+me.data("pictarget")).html(pout);
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(datax[0]);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val("3");
									}
								}else if(me.data("job")=="uploadqnapic"){
									var pout="";//這要去不同相簿
									for(var a=0;a<datax[1].length;a++){
										pout+="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albqpic' data-albid='"+datax[0]+"' data-val='"+datax[2][a]+"' ></i><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+datax[1][a]+"'></div>";
									}
									if(datax[1].length<5){
										pout+="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+datax[0]+"' class='fileupload instantupload' data-job='addalbqpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form>\n";
										pout+="</div>";
									}
									pout+="<div class='clr'></div>";
									$("#"+me.data("pictarget")).html(pout);
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(datax[0]);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val("1");
									}
								}
							}
						},
						error: errorHandler = function() {
							swal("發生錯誤,請檢查檔案");
						},
						// Form data
						data: formData,
						//Options to tell JQuery not to process data or worry about content-type
						cache: false,
						contentType: false,
						processData: false
					}, 'json');
			}
		}else{
			swal("本功能僅開放會員使用");
		}
	});

	//上傳檔案的共用
	$("body").delegate(".instantupload","change",function(){
		//允許免會員上船的只有 uploadhead,uploadfront
		isallowed=0;
		if($(this).data("job")=="uploadhead" || $(this).data("job")=="uploadfront"){
			isallowed=1;
		}else if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
			isallowed=1;
		}
		if(isallowed==1){
			var me=$(this);
			var ifile = this.files[0];
			var tpchk=0;
      var ort=0;
      if(ismobile==2){
  			getOrientation(ifile, function(orientation) {
      			ort=orientation;
    		});
      }
			if(ifile.type == 'image/png' || ifile.type == 'image/jpg' || ifile.type == 'image/gif' || ifile.type == 'image/jpeg'){
				tpchk=1;
			}else if(ifile.type == 'video/mp4' && $(this).data("format")=="mp4"){
				tpchk=2;
			}
			if(ifile.name.length < 1) {
			}
			else if(ifile.size > 20000000 && tpchk==2) {
				swal("影片 尺寸不得超過20MB");
			}
			else if(tpchk==0) {
				if($(this).data("format")=="mp4"){
					swal("檔案格式不符合,僅接受mp4格式");
				}else{
					swal("檔案格式不符合,僅接受jpg,gif,png格式");
				}
			}
			else {
				var formData = new FormData();
				formData.append( 'val',ifile  );
				 me.hide();
				 if($("#frontpicitem")){
					 var fpicxx=$("#frontpicitem").attr("src");//這是給frontpic用的
				}
				 formData.append( 'job', $(this).data("job"));
				 formData.append( 'uid',sessionStorage.getItem("userid"));
				 formData.append( 'ukey',sessionStorage.getItem("key"));
				 formData.append( 'albid',me.data("albid"));
         formData.append( 'ort',ort);
				 if(me.data("albid")){
					 if(me.data("job")=="addalbpicb"){
						 $("#"+me.data("pictarget")).html("<div class='loaderboxs'><img src='img/loaderd.gif'></div>");
					 }else{
						 $("#"+me.data("pictarget")).html("<div class='loaderboxs'><img src='img/loader.gif'></div>");
					 }
				 }else if(me.data("job")=="uploadfront" || me.data("job")=="uploadhead"  || me.data("job")=="uploadfrontb" || me.data("job")=="uploadheadb" ){
					 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
				 }else{
					 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loader.gif'></div>");
				 }
         if(me.data("pictargettype2")){
           $("#"+me.data("pictargettype2")).append("<div class='loaderbox'><img src='img/loaderd.gif' style='width:50px;height:50px;'></div>");
         }
				 var returnbox="";
				 $.ajax({
						url: ajaxurl,  //server script to process data
						type: 'POST',
						//Ajax events
						success: completeHandler = function(data) {
							me.show();
              if(me.data("pictargettype2")){
                $(".loaderbox").remove();
              }
							$(".fileupload").val('');//更新 2016/7/18
							cdata=data.replace(/ /g,'');
							if(cdata=="ERR"){
								swal("會員資料不符合,請重新登入,謝謝");
							}else if(cdata=="ERRB"){
								swal("上傳最高限制二十張圖片");
							}else if(cdata=="ERRC"){
								swal("上傳最高限制二十張圖片");
							}else if(cdata=="ERRH"){
								swal("上傳圖片高度限制350px");
							}else{
								//判斷是否是回應
								if(me.data("job")=="uploadnewsreplypic"){
									if(me.data("type")=="replace"){
                        				pout="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdata+"'></div>";
										$("#"+me.data("pictarget")).html(pout);
									}
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(cdata);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val(tpchk);
									}
								}else if(me.data("job")=="addalbpic"){//動態新增照片
									cdatax=cdata.split("_");
									if(cdata.indexOf("gif")>0){
                    tempout="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdatax[0]+"' ><i class='fa fa-times-circle predelclick' aria-hidden='true' data-job='newspic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"'  ></i></div>";
									}else{
										tempout="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdatax[0].replace(/\./g, "s.")+"'><i class='fa fa-times-circle predelclick' aria-hidden='true' data-job='newspic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"'  ></i></div>";
									}
									if($("#newsformfilebox").find(".inblock").length<=3 ){//上船前第幾個,上船後+1 限制五張
										tempout+="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
									}
									$("#"+me.data("pictarget")).replaceWith(tempout);
								}else if(me.data("job")=="addalbpicx"){//相簿新增照片
									cdatax=cdata.split("_");
									if(cdata.indexOf("gif")>0){
                    tempout="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdatax[0]+"' ><i class='fa fa-times-circle predelclick' aria-hidden='true' data-job='albpic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"'  ></i></div>";
									}else{
										tempout="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdatax[0].replace(/\./g, "s.")+"'><i class='fa fa-times-circle predelclick' aria-hidden='true' data-job='albpic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"'  ></i></div>";
									}
									returnbox="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbpicx' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
									tempout+=returnbox;
									$("#"+me.data("pictarget")).replaceWith(tempout);
									//更新列表
									var tx=$("#myalbumwrap .list");
									for(a=0;a<tx.length;a++){
										if(tx.eq(a).data("id")==me.data("albid")){
											var albcnt=parseInt(tx.eq(a).find(".albcnt").html());
											tx.eq(a).find(".albcnt").html(albcnt+1);

										}
									}
									//更新相簿明細
									if($("#popfull").length>=1){
										show_mypagealbin(me.data("albid"));
									}
								}else if(me.data("job")=="addalbpicb"){//動態相簿新增照片--相簿內
									var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),cdata); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
									tempitem=ajaxarr("get_myphotoid",tempvals,ajaxurl);
									tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
										out="";
										out+="                        <div class='imgitembox delhide'>\n";
										out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data['thisfile']+"' class='popimgclick btn' data-val='"+data['thisid']+"'/>\n";
										out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3' data-type='pho'   data-albid='"+data['albid']+"' data-id='"+data['thisid']+"'></i></span>\n";
										out+="                        </div>				\n";
										out+="<div class='imgitembox delhide temppicwrapb' id='addalbpicwrapb'><img src='img/addpicb.png'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+data['albid']+"' class='fileupload instantupload' data-job='addalbpicb' data-form='addpicform' data-target='temppicwrapb' data-pictarget='addalbpicwrapb' data-type='insert' /></form>\n";
										out+="</div>";
										$("#"+me.data("pictarget")).replaceWith(out);
										centermyimg2();//share.js
									});
								}else if(me.data("job")=="addalbqpic"){//QNA新增照片
									cdatax=cdata.split("_");
									if(cdata.indexOf("gif")>0){
										tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albqpic' data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdatax[0]+"' style='height:100%'></div>";
									}else{
										tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albqpic' data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdatax[0].replace(/\./g, "s.")+"'></div>";
									}
									if(parseInt(cdatax[1])<=3){//上船前第幾個,上船後+1
										returnbox="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbqpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>\n";
									}
									tempout+=returnbox;
									$("#"+me.data("pictarget")).replaceWith(tempout);
								}else if(me.data("job")=="uploadfrontb"){
									out="";
									out+="                	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdata+"' style='position:relative;z-index:9;'  id='frontpicitem' />\n";
									out+="					<div class='btn border5 fixer' style='top:10px;left:10px;'>請選擇</div>";
									out+="					<div class='btn border5 fixer clickconfirm' style='bottom:5px;right:100px;z-index:49' data-type='frontpiccancel' data-val='"+fpicxx+"'>取消修改</div>";
									out+="					<div class='btn border5 fixer clickconfirm' style='bottom:5px;right:0px;z-index:49' data-type='frontpic' data-val='"+cdata+"'>確認修改</div>";
									out+="                  <input type='file' accept='image/*'  style='top:10px;left:10px;' class='formfield instantupload' name='frontpic'  data-job='uploadfrontb' data-form='frontpicformb' data-pictarget='mypagefrontpic' data-target='frontpicid' data-type='replace'>\n";
									$("#"+me.data("pictarget")).html(out);
									$(".profileimgclick").show();

								}else if(me.data("job")=="uploadhead"){//註冊時上船大頭
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(cdata);
									}
									out="";
									me.siblings("img").attr("src",sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(cdata));
								}else if(me.data("job")=="uploadheadb"){
									out="";
									out+="                            <div class='mypeopleimg'>\n";
									out+="                				<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(cdata)+"' style='position:relative;z-index:9;'  class='popimgclick fullw' data-type='self' data-val='"+cdata+"' />\n";
									out+="							  </div>\n";
									out+="							  	<div class='btn border5 fixer clickconfirm' style='bottom:0px;right:0px;z-index:49' data-type='headpic' data-val='"+cdata+"'>確認修改</div>";
									out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;display:none;' id='headpicclick'>請選擇</div>";
									out+="                            	<input type='file' accept='image/*'  id='headpicform' style='top:10px;left:10px;display:none;' class='formfield instantupload' name='headpic'  data-job='uploadheadb' data-form='headpicformb' data-pictarget='mypageheadpic' data-target='frontpicid' data-type='replace'>\n";
									$("#"+me.data("pictarget")).html(out);
								}else if(me.data("job")=="uploadchatroom"){//chatroom上傳圖片
									imgsrc="XX{img2}"+cdata;
									chat_input(me.data("val"),imgsrc);//id,內容  ajax.js
								}else if(me.data("job")=="uploadarticle"){//article 攻略封面上傳
									$("#titlepic").val(cdata)
									$("#articlepicformbox").html("<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdata+"'><i class='fa fa-times-circle predelclick applebtn' aria-hidden='true' data-job='articlepic' data-val='titlepic' ></i></div>");
								}else if(me.data("job")=="uploadarticleinsert"){//article 攻略內文差圖
									var $txt = $("#articletext");
									var cPos = $txt[0].selectionStart;
									if(cPos || cPos===0){
										var textAreaTxt = $txt.val();
										var txtToAdd = "{image:"+cdata+"}";
										$txt.val(textAreaTxt.substring(0, cPos) + txtToAdd + textAreaTxt.substring(cPos) );
									}else{
										swal("請先選擇圖片插入位置");
									}
								}else{
									if(me.data("type")=="cover"){
										me.val('');
										me.parents(".instantbox").append("<span class='inblock coverpic'><i class='predelclick fa fa-times' data-job='newspic' data-val='"+cdata+"' data-target='"+me.data("target")+"' data-targettype='"+me.data("targettype")+"'></i><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdata+"' class='instantimgb'></span>");
										if(me.data("job")=="uploadhead"){
											me.parents(".instantbox").css("height",100);
										}else{
											me.parents(".instantbox").css("height",80);
										}
									}else if(me.data("type")=="replace"){
										if(me.data("format")=="mp4"){
											$("#"+me.data("pictarget")).html("<span class='inblock'><i class='predelclick fa fa-times' data-job='newspic' data-val='"+cdata+"' data-target='"+me.data("target")+"' data-targettype='"+me.data("targettype")+"'></i><video width=100% controls id='newstempvideo'><source src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdata+"' type='video/mp4'></video></span>");
											var h=$("#newstempvideo").innerHeight();
											$("#newstempvideo").css("height",h);
										}else{
											$("#"+me.data("pictarget")).html("<span class='inblock'><i class='predelclick fa fa-times' data-job='newspic' data-val='"+cdata+"' data-target='"+me.data("target")+"' data-targettype='"+me.data("targettype")+"'></i><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+cdata+"' class='imgover'></span>");
										}
									}
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(cdata);
										if(me.data("job")=="uploadfront" ||me.data("job")=="uploadhead"){
											chk_regpoints();
										}
									}
									if(me.data("targettype")){//需要傳檔案ID的
										$("#"+me.data("targettype")).val(tpchk);
									}
								}
							}
						},
						error: errorHandler = function() {
							swal("發生錯誤,請檢查檔案");
							$("#"+me.data("pictarget")).html(returnbox);
						},
						// Form data
						data: formData,
						cache: false,
						contentType: false,
						processData: false
					}, 'json');
			}
		}else{
			swal("本功能僅開放會員使用");
		}
	});
	$("body").delegate('.scrollable','mousewheel DOMMouseScroll', function(e){
		var e0 = e.originalEvent,
		delta = e0.wheelDelta || -e0.detail;
		this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		e.preventDefault();
	});
	$("body").delegate('#newstext','keyup', function(){
		if($("#newsformfilebox").html()){//已有資料
		}else{
			var xx=$("#newstext").val().split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx[a].indexOf("https://www.youtube.com/watch?v=")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v=")[1];
					$("#newsformfilebox").html("<iframe  width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'></iframe>");
					break;
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v=")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v=")[1];
					$("#newsformfilebox").html("<iframe  width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'></iframe>");
					break;
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					$("#newsformfilebox").html("<iframe  width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'></iframe>");
					break;
				}else if(xx[a].indexOf("twitch.tv/")==0){
					var yy=xx[a].split("twitch.tv/")[1];
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						$("#newsformfilebox").html("<iframe src='http://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>");
					}else{
						$("#newsformfilebox").html("<iframe src='http://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>");
					}
					break;
				}
			}
		}
	});
  $("body").delegate("#dialog-windows","click",function() {
      $(".chart").removeClass("on");
      $(this).removeClass("on");
      $("#dialog-windows").removeClass("short");
  });
});

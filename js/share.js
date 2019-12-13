(function($){ 
	popimg = function(x,y,z) { //title/內容/是否可以關閉
		out="";
		if($("#pop").length){
			$(".popimgclick").remove();
		}else{
			out+="<div id='pop'>";
			out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
			out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
			out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
			out+="		<img src='uploadfile/"+x+"' id='popimg'>\n";
		}
		if(y){
			out+="<i class='picgoprev fa fa-chevron-left popimgclick' data-val='"+y+"'></i>";
		}
		if(z){
			out+="<i class='picgonext fa fa-chevron-right popimgclick' data-val='"+z+"'></i>";
		}
		if($("#pop").length){
		}else{
			out+="</div>";
		}
		if($("#pop").length){
			
			$("#popimg").animate({"opacity":0},500,function(){
				var tepimg = new Image();
				tepimg.onload = function(){
					$("#popimg").attr("src","uploadfile/"+x);
					$("#popimg").animate({"opacity":1},500);
					$("#popin").prepend(out);
				}
				tepimg.src = "uploadfile/"+x;
			});
		}else{
			$("body").prepend(out);
			$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
			$("#pop").stop().fadeIn(400); 
		}
		c=$("#popimg").height();
		d=$("#popin").height();
		if(c>d){
			$("#popimg").css("height",d);
		}
   };  
	popbase = function(x,y,z) { //title/內容/是否可以關閉
		out="<div id='pop'>";
		if(z!="n"){
			out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
		}
		out+="	<div id='popin'>\n";
		if(z!='n'){
			out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
		}
		out+="		<div id='pophead'>"+x+"</div>\n";
		out+="			<div id='popbody'>\n";
		out+=y;
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#pop").stop().fadeIn(400);  
   };  
   //跳出 chatroom
   popchatroom=function(x){
	   var out="";
	   out+="<div class='chatroom' data-id='"+x+"' id='chat"+x+"'>\n";
	   out+="	<div class='chattitle'>\n";
	   out+="    	<span class='titlename' style='width:75%;text-align:left;'></span>\n";//這裡插入名字
	   out+="      	<span class='fa-stack fR closechat' data-val='"+x+"'><i class='fa fa-circle  fa-stack-2x fagray'></i><i class='fa fa-times fa-stack-1x fayellow'></i></span>\n";
	   out+="       <span class='fR'><i class='fa fa-plus fa-2x fagray chatfriendclick'  data-val='"+x+"'></i></span>\n";
	   out+="   </div>\n";
	   out+="   <div class='chatfsearch'>\n";
	   out+="       <input type=text name='chatfsearchbox' class='chatfsearchbox' />\n";
	   out+="       <div class='btn'>完成</div>\n";
	   out+="       <div class='chatauto'></div>\n";
	   out+="   </div>\n";
	   out+="   <div class='chatbox'>\n";
	   /*
	   //其他人
	   out+="    	<div class='chatline1'>\n";
	   out+="        	<img src='img/people.jpg' class='chatlinehead' />\n";
	   out+="           <span class='chattalk'>我是好人也</span>\n";
	   out+="           <div class='clr'></div>\n";
	   out+="       </div>\n";
	   //自己
	   out+="    	<div class='chatline2'>\n";
	   out+="           <span class='chattalk'>我是好人也是好人,我是好人也是好人,我是好人也是好人,我是好人也是好人,</span>\n";
	   out+="           <div class='clr'></div>\n";
	   out+="       </div>\n";
	   	*/
	   out+="   </div>\n";
	   out+="   <div class='chatinputbox'>\n";
	   out+="    	<div class='chatinputinbox'>\n";
	   out+="      	    <input type=text name='chatinput' class='chatinput' placeholder='請輸入對話' data-val='"+x+"'/>\n";
	   out+="           <i class='fa fa-smile-o fagray chaticonselect' data-val='"+x+"'></i>\n";
	   out+="           <div id='chatpicclick'>\n";
	   out+="           	<i class='fa fa-camera chatpicclickimg'></i>\n";
	   out+="               <form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='chatpicform'><input name='file' type='file' class='fileupload instantupload' data-val='"+x+"' data-job='uploadchatroom' /></form>\n";
	   out+="           </div>\n";
	   out+="       </div>\n";
	   out+="   </div>\n";
	   out+="</div>\n";
	   $("body").append(out);
	   get_chat_content(x);//ajax.js
	   resetchatroom();//固定位置

   }
   // chatroom content
   chat_content=function(id,x){
	   var out="";
	   for(var a=0;a<x.length;a++){
		   if(x[a]['fromid']==sessionStorage.getItem("userid")){
			   out+="    	<div class='chatline2'>\n";
			   if(x[a]['content'].indexOf("src=")>0){
				   out+="<span class='chatimg'>"+x[a]['content']+"</span>";
			   }else{
				   out+="           <span class='chattalk'>"+x[a]['content']+"</span>\n";
			   }
			   out+="           <div class='clr'></div>\n";
			   out+="       </div>\n";			   
		   }else if(x[a]['fromid']!='0'){
			   out+="    	<div class='chatline1'>\n";
			   
				   if(x[a]['name']){
					   out+="        	<img src='uploadfile/"+x[a]['name']+"' class='chatlinehead' />\n";
				   }else{
					   out+="        	<img src='img/basichead.png' class='chatlinehead' />\n";
				   }
				   if(x[a]['content'].indexOf("src=")>0){
					   out+="<span class='chatimg'>"+x[a]['content']+"</span>";
				   }else{
					   out+="           <span class='chattalk'>"+x[a]['content']+"</span>\n";
				   }	
			   out+="           <div class='clr'></div>\n";
			   out+="       </div>\n";			   
		   }else{
				   out+="<div class='chatline3'>"+x[a]['content']+"</div>";
			}
	   }
	   $("#chat"+id+" .chatbox").append(out);
	   $("#chat"+id+" .chatbox").stop().animate({scrollTop :100000},200);
   }
   //斷航
   nl2br=function(x){
	   return x.replace(/\n/g, "<BR>"); 
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
  							temp.prop("currentTime",1);
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
					tlist.eq(a).html(n.getFullYear()+"年"+(n.getMonth()+1)+"月"+n.getDate()+"日 "+ n.getHours()+":"+n.getMinutes());
				}
		   }
	   }
   }
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
		$("#popin").stop().animate({"margin-top":-600},500);
		$("#pop").delay(400).stop().fadeOut(300).remove();
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
	vdate=function(x){
		t=Date.parse(x.val());
		if(isNaN(t)){
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}else{
			x.parent(".formitem").children(".formerr").hide();
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
			popnotice("請確認"+z);
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
		var showkey="";
		if(curpage=="wallpage"){
			showkey="wallpage";
		}else if(curpage=="friendpage"){
			showkey="friendpage";
		}else if(curpage=="matchpage"){
			showkey="matchpage";
		}else if(curpage=="articlepage" || curpage=="publishpage"){
			showkey="articlepage";
		}else if(curpage=="rankpage"){
			showkey="rankpage";
		}else if(curpage=="qnapage"){
			showkey="qnapage";
		}else if(curpage=="actpage"){
			showkey="actpage";
		}else if(curpage=="shoppage"){
			showkey="shoppage";
		}else if(curpage=="collectpage"){
			showkey="collectpage";
		}else if(curpage=="mypage"){
			showkey="mypage";
		}
		$(".topnavclick").removeClass("on");
		$(".leftinfoselectitem").removeClass("leftinfoselectitemon");
		navlist=$(".topnavclick");
		for(var a=0;a<navlist.length;a++){
			if(navlist.eq(a).data("type")==showkey){
				navlist.eq(a).addClass("on");
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
		
	}
	mynav_change=function(x){
		$(".mysubclick").removeClass("on");
		$(".mysubclick").eq(x-1).addClass("on");
		
	}
	print_shopitem=function(data){
		out="";
		out+="                    	<!--product item-->\n";
		out+="                        <div class='storeitembox'>\n";
		if(parseInt(data['qty'])>0){
			out+="                        	<img src='img/product/product"+data['thisid']+"_s.jpg'   class='btn storeitemclickb' data-val='"+data['thisid']+"'/>\n";
		}else{
			out+="                        	<img src='img/product/product"+data['thisid']+"_s.jpg'  />\n";
		}
		out+="                            <div class='storeitemtitle'>"+data['productname']+"</div>\n";
		out+="                            <div class='storeitembody'>\n";
		if(parseInt(data['qty'])>0){
			out+="                            	<div class='btn storeitemclick fR' data-val='"+data['thisid']+"'>兌換商品</div>\n";
		}else{
			out+="                            	<div class='btn storeitemclick fR' >缺貨中</div>\n";
		}
		out+="                            	<P><span class='bgipdis'></span> "+data['dispoints']+"</P>\n";
		out+="                            </div>\n";
		out+="                        </div>\n";
		out+="                        <!--item end-->\n";

		return out;
	}
	print_articleitem=function(data,x){
		out="";
		out+="    					<!--product item-->\n";
		out+="                        <div class='storeitembox'>\n";
		if(x==2){
			if(data['thisfile']){
				out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='pageclick'  data-type='publishpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='btn pageclick' data-type='publishpage' data-val='"+data['thisid']+"'/>";
			}
		}else{
			if(data['thisfile']){
				out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='btn pageclick'  data-type='artpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='btn pageclick' data-type='artpage' data-val='"+data['thisid']+"'/>";
			}
		}
		out+="                            <div class='storeitemtitle'>"+data['thistitle']+"</div>\n";
		out+="                            <div class='storeitembody'>\n";
		if(x==2){
			out+="                            	<div class='btn pageclick storeitemclickx fR' data-type='publishpage' data-val='"+data['thisid']+"'>看攻略</div>\n";
		}else{
			out+="                            	<div class='btn pageclick storeitemclickx fR' data-type='artpage' data-val='"+data['thisid']+"'>看攻略</div>\n";
		}
		out+="                            	<P>贊助("+data['likes']+") 留言("+data['reply']+") </P>\n";
		out+="                            </div>\n";
		out+="                        </div>\n";
		out+="    					<!--item end-->		\n";
		return out;
	}
	print_qnaitem=function(xdata){
		var xout="";
		mem=JSON.parse(sessionStorage.getItem("member"));
		xout+="	                        	<div class='mainitem'>";
		xout+="                            	<div class='mainitemtitle'>\n";
		xout+="                                	<div class='mainitemimg'>\n";
		if(xdata['userpic']){
			xout+="<img src='uploadfile/"+xdata['userpic']+"' />\n";
		}else{
			xout+="<img src='img/basicheads.png' />\n";
		}
		xout+="</div>\n";
		xout+="                                    <div class='mainitemtitletext'>\n";
		if(sessionStorage.getItem("userid")){
			xout+="                                    	<div class='mainitemtitleselect'>\n";
			xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
			xout+="                                                <ul class='mainitemtitleselectlist'>\n";
			if(sessionStorage.getItem("userid")==xdata['uid']){
			}else{
				xout+="                                                <li class='maintemselect'  data-type='qna'  data-val='1' data-id='"+xdata['thisid']+"'>檢舉</li>\n";
			}
			xout+="                                            	</ul>\n";
			xout+="                                        </div>\n";
		}
		xout+="                                    	<div >\n";
		xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><h1>"+xdata['user']+"</h1></a>\n";
		xout+="                                            <h6 class='timeitem' data-t='"+xdata['dateadd']+"'>"+xdata['dateadd']+"</h6>\n";
		xout+="                                        </div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemcontent'>\n";
		xout+="                                	<div class='mainitemcontenttop'>\n";
		xout+=nl2br(xdata['thiscontent']);
		xout+="                                    </div>\n";
		xout+="                                	<div class='mainitemcontenttag'>\n";
		if(xdata['tag']){
			xout+="                                    	"+xdata['tag']+" \n";
		}
		xout+="                                    </div>\n";
		xout+="                                    <div class='mainitemcontentpoint'>\n";
		xout+="                                        <P class='fL'><span class='bgip'></span> +"+xdata['points']+"</P>\n";
		xout+="                                        <div class='qa_ansbox border5 fR'>回答("+xdata['reply'].length+")</div>\n";
		xout+="                                        <div class='qa_knowbtn border5 fR' data-val='"+xdata['thisid']+"'>我也想知道("+xdata['als']+")</div>\n";
		xout+="                                        <div class='clr'></div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemreply'>\n";
		if((xdata['reply'].length-4)>0){
			xout+="<div class='replyshowall'>尚有"+(xdata['reply'].length-4)+"篇回答,看全部</div>";
		}
		haswin=0;
		for(var b=0;b<xdata['reply'].length;b++){
			if(xdata['reply'][b]['winner']==1){
				haswin=1;
			}
		}
		for(var b=0;b<xdata['reply'].length;b++){
			xout+="                                	<!--reitem-->\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' >\n";//20180906 Pman 頭像加上連結
			if((xdata['reply'].length-b)>4){
				xout+="                                	<div class='mcreplyitem' style='display:none;'>\n";
			}else{
				xout+="                                	<div class='mcreplyitem'>\n";
			}
			xout+="										</a>\n";
			xout+="                                		<div class='mcreplyicon'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' >\n";//20180906 Pman 頭像加上連結
			if(xdata['reply'][b]['userpic']){
				xout+="<img src='uploadfile/"+xdata['reply'][b]['userpic']+"'  />\n";
			}else{
				xout+="<img src='img/basicheads.png' />\n";
			}
			xout+="										</a>\n";
			xout+="</div>\n";
			xout+="                                        <div class='mcreplybox_q'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' ><span class='color_red'>"+xdata['reply'][b]['user']+"</span></a>\n";
			xout+=nl2br(xdata['reply'][b]['thiscontent']);
			xout+="                                            <div class='mcreplyboxsub timeitem' data-t='"+xdata['reply'][b]['dateadd']+"'>"+xdata['reply'][b]['dateadd']+" </div>\n";
			xout+="                                        </div>\n";
			if(haswin==0){
				xout+="                                        <div class='mcreplybigp'>\n";
				if(sessionStorage.getItem("userid")==xdata['uid']){
					xout+="                                        	<span class='bgip bgipon' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"' data-val='maker'></span>\n";
				}else{
					xout+="                                        	<span class='bgip bgipon' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"'></span>\n";
				}
				xout+="                                        </div>\n";
			}			
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		xout+="		                                	<!--reitem-->\n";
		xout+="                                	<div class='mcreplyitem' style='padding-bottom:5px;'>\n";
		xout+="                                    	<div class='mcreplyicon'>\n";
		if(mem['headpic']){
			xout+="                                    	<img src='uploadfile/"+mem['headpic']+"'  />\n";
		}else{
			xout+="										<img src='img/basicheads.png' />\n";
		}
		xout+="                                        </div>\n";
		xout+="                                        <div class='mcreplybox_q'>\n";
		xout+="                                			<form action='' method='post' class='qnaformreply' >\n";
		xout+="                                        	<textarea class='replynow formfield' data-type='qnaformreply' data-id='"+xdata['thisid']+"' placeholder='發表意見'></textarea>\n";
		xout+=" 											<input type='hidden' name='picid' class='picid formfield'>\n";
		xout+=" 											<input type='hidden' name='pictype' class='pictype formfield'>\n";
		xout+="											</form>\n";
		xout+="                                    		<div class='replypicclick'>\n";
		xout+="                                    	  		<img src='img/mainpicbtn.jpg' />\n";
		xout+="                                        		<form action='' method=post enctype='multipart/form-data' class='pciform hideform newspicform'><input name='file' type='file' class='fileupload instantupload' data-job='uploadnewsreplypic' data-form='qnaformreply' data-target='picid' data-targettype='pictype' data-pictarget='replypcibox' data-type='replace' /></form>\n";
		xout+="                                   		</div>\n";
		xout+="											<div class='replypcibox'></div>\n";
		xout+="                                        </div>\n";
		xout+="                                        <div class='clr'></div>\n";
		xout+="                                    </div>\n";
		xout+="                                    <!--reitem end -->\n";
		xout+="                                </div>\n";
		xout+="                            </div>";
		return xout;

	}
	print_wallitem=function(xdata){
		point010="";
		point012="";
		if(sessionStorage.getItem("userid")){
			mem=JSON.parse(sessionStorage.getItem("member"));
			point010=JSON.parse(sessionStorage.getItem("point010"));
			point012=JSON.parse(sessionStorage.getItem("point012"));
		}		
		var xout="";
		xout+="	                        	<div class='mainitem delhide'>";
		xout+="                            	<div class='mainitemtitle'>\n";
		xout+="                                	<div class='mainitemimg'>\n";
		if(xdata['userpic']){
			xout+="<img src='uploadfile/"+xdata['userpic']+"' />\n";
		}else{
			xout+="<img src='img/basicheads.png' />\n";
		}
		xout+="</div>\n";
		xout+="                                    <div class='mainitemtitletext'>\n";
		if(sessionStorage.getItem("userid")){
			xout+="                                    	<div class='mainitemtitleselect'>\n";
			xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
			xout+="                                                <ul class='mainitemtitleselectlist'>\n";
			if(sessionStorage.getItem("userid")==xdata['uid']){
				xout+="                                                <li class='maintemselect' data-val='3' data-type='wall' data-id='"+xdata['main']['thisid']+"'>刪除</li>\n";
			}else{
				xout+="                                                <li class='maintemselect' data-val='1' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>檢舉</li>\n";
				xout+="                                                <li class='maintemselect' data-val='2' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>收藏</li>\n";
			}
			xout+="                                            	</ul>\n";
			xout+="                                        </div>\n";
		}
		xout+="                                    	<div >\n";
		xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><h1>"+xdata['user']+"</h1></a>\n";
		xout+="                                            <h6 class='timeitem' data-t='"+xdata['main']['dateadd']+"'>"+xdata['main']['dateadd']+"</h6>\n";
		xout+="                                        </div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemcontent'>\n";
		xout+="                                	<div class='mainitemcontenttop'>\n";
		if(xdata['main']['typeid']=="4"){
			xout+="<div class='pageclick btn' data-type='artpage' data-val='"+xdata['main']['aid']+"'>\n";
		}
		xout+=nl2br(xdata['main']['thiscontent']);
		if(xdata['main']['typeid']=="4"){
			xout+="</div>\n";
		}		
		xout+="                                    </div>\n";
		xout+="                                	<div class='mainitemcontenttag'>\n";
		if(xdata['tag']){
			xout+="                                    	"+xdata['tag']+" \n";
		}
		xout+="                                    </div>\n";
		xout+="                                    <div class='mainitemcontentpoint'>\n";
		xout+="                                        <div style='margin-left:15px;'>留言("+xdata['reply'].length+")</div>\n";
		xout+="                                        <div class='newslikeboxwrap'>贊助(<span class='newslikebox'>"+xdata['main']['likes']+"</span> )</div>\n";
		if(sessionStorage.getItem("userid")==xdata['main']['memberid']){
			xout+="                                    	<P class='fL'><span class='bgipoff fL'></span> <span class='newspointsbox fL'>+"+xdata['main']['points']+"</span></P>\n";
		}else{
			flag=0;
			if(point010 && point010.length>0){
				for(var a=0;a<point010.length;a++){
					if(point010[a]['note']==xdata['main']['thisid']){
						flag=1;
						break;
					}
				}
			}else if(sessionStorage.getItem("userid")){
			}else{
				flag=1;
			}
			if(flag==1){
				xout+="                                    	<P class='fL'><span class='bgipoff fL'></span> <span class='newspointsbox fL'>+"+xdata['main']['points']+"</span></P>\n";
			}else{
				xout+="                                    	<P class='fL'><span class='bgip fL' data-type='news' data-id='"+xdata['main']['thisid']+"'></span> <span class='newspointsbox'>+"+xdata['main']['points']+"</span></P>\n";
			}
		}
		xout+="                                        <div class='clr'></div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemreply'>\n";
		if((xdata['reply'].length-4)>0){
			xout+="<div class='replyshowall'>尚有"+(xdata['reply'].length-4)+"篇留言,看全部</div>";
		}
		for(var b=0;b<xdata['reply'].length;b++){
			xout+="                                	<!--reitem-->\n";
			if((xdata['reply'].length-b)>4){
				xout+="                                	<div class='mcreplyitem' style='display:none;'>\n";
			}else{
				xout+="                                	<div class='mcreplyitem'>\n";
			}
			xout+="                                		<div class='mcreplyicon'>\n";
			if(xdata['reply'][b]['userpic']){
				xout+="<img src='uploadfile/"+xdata['reply'][b]['userpic']+"'  />\n";
			}else{
				xout+="<img src='img/basicheads.png' />\n";
			}
			xout+="</div>\n";
			xout+="                                        <div class='mcreplybox'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"'><span class='color_red'>"+xdata['reply'][b]['user']+"</span></a>\n";
			xout+=nl2br(xdata['reply'][b]['thiscontent']);
			xout+="                                            <div class='mcreplyboxsub timeitem' data-t='"+xdata['reply'][b]['dateadd']+"'>"+xdata['reply'][b]['dateadd']+" <a href=''>贊助</a>  <a href=''>回覆</a></div>\n";
			xout+="                                        </div>\n";
			xout+="                                        <div class='mcreplybigp'>\n";
			if(sessionStorage.getItem("userid")==xdata['reply'][b]['memberid']){
				xout+="                                        	<span class='bgipoff'></span>\n";
			}else{
				flag=0;
				if(point012 && point012.length>0){
					for(var a=0;a<point012.length;a++){
						if(point012[a]['note']==xdata['reply'][b]['thisid']){
							flag=1;
							break;
						}
					}
				}else if(sessionStorage.getItem("userid")){
				}else{
					flag=1;
				}
				if(flag==1 || sessionStorage.getItem("userid")==""){
					xout+="                                        	<span class='bgipoff'></span>\n";
				}else{
					xout+="                                        	<span class='bgip' data-type='newsreply' data-id='"+xdata['reply'][b]['thisid']+"'></span>\n";
				}
			}
			xout+="                                        </div>\n";
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		if(sessionStorage.getItem("userid")){
			xout+="		                                	<!--reitem-->\n";
			xout+="                                	<div class='mcreplyitem' style='padding-bottom:5px;'>\n";
			xout+="                                    	<div class='mcreplyicon'>\n";
			if(mem['headpic']){
				xout+="                                    	<img src='uploadfile/"+mem['headpic']+"'  />\n";
			}else{
				xout+="										<img src='img/basicheads.png' />\n";
			}
			xout+="                                        </div>\n";
			xout+="                                        <div class='mcreplybox'>\n";
			xout+="                                			<form action='' method='post' class='newsformreply' >\n";
			xout+="                                        	<textarea class='replynow formfield' data-type='newsformreply' data-id='"+xdata['main']['thisid']+"' placeholder='發表意見'></textarea>\n";
			xout+=" 											<input type='hidden' name='picid' class='picid formfield'>\n";
			xout+=" 											<input type='hidden' name='pictype' class='pictype formfield'>\n";
			xout+="											</form>\n";
			xout+="                                    		<div class='replypicclick'>\n";
			xout+="                                    	  		<img src='img/mainpicbtn.jpg' />\n";
			xout+="                                        		<form action='' method=post enctype='multipart/form-data' class='pciform hideform newspicform'><input name='file' type='file' class='fileupload instantupload' data-job='uploadnewsreplypic' data-form='newsformreply' data-target='picid' data-targettype='pictype' data-pictarget='replypcibox' data-type='replace' /></form>\n";
			xout+="                                   		</div>\n";
			xout+="											<div class='replypcibox'></div>\n";
			xout+="                                        </div>\n";
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		xout+="                                </div>\n";
		xout+="                            </div>";
		return xout;

	}
	print_frienditem=function(xdata,z){//z=1 加朋友, z=2 刪除邀請
		ranks=JSON.parse(sessionStorage.getItem("ranks"));
		tags=JSON.parse(sessionStorage.getItem("tags"));
		showrank="";
		 myrank="";
		 myrate="";
		 for(var a=0;a<ranks.length;a++){
			  if(parseInt(xdata['score'])>=parseInt(ranks[a]['score'])){
				  showrank=ranks[a]['rankname'];
				   myrank=ranks[a]['rankid'];
			  }
		 }

		var out="";
			out+="                                <!--人物框-->\n";
			out+="                                <div class='mainitem'>\n";
			out+="                                    <div class='mainitemtitle'>\n";
			out+="                                        <div class='mainitemimg'>\n";
			if(xdata['headpic']){
				out+="                                            <img src='uploadfile/"+xdata['headpic']+"' />\n";
			}else{
				out+="										<img src='img/basicheads.png' />\n";
			}
			out+="										  </div>\n";
			out+="                                        <div class='mainitemtitletext'>\n";
			out+="                                            <div >\n";
			if(z==1){
				out+="                                                <div class='btn addfriend fR' data-type='add' data-val='"+xdata['uid']+"'>加朋友</div>\n";
			}else if(z==2){
				out+="                                                <div class='btn addfriend fR' data-type='delete' data-val='"+xdata['uid']+"'>取消邀請</div>\n";
			}else if(z==3){
				out+="                                                <div class='btn addfriend fR' data-type='add2' data-val='"+xdata['uid']+"'>加朋友</div> <div class='btn addfriend fR' data-type='reject' data-val='"+xdata['uid']+"'>拒絕邀請</div>\n";
			}else if(z==4){//取消朋友
				out+="                                                <div class='btn addfriend fR' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</div>\n";
			}
			out+="                                                <a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><h1>"+xdata['nickname']+"</h1></a>\n";
			out+="                                                <h6>"+showrank+"/聲望."+myrank+"</h6>\n";
			out+="                                            </div>\n";
			out+="                                        </div>\n";
			out+="                                    </div>\n";
			out+="                                    <div class='mainitemcontent'>\n";
			out+="                                        <div>\n";
			out+="                                            <img src='img/leftgameicond.png' class='fL' />\n";
			out+="                                            <span class='fL mainitemcontenttext'>正在玩的遊戲</span> \n";
			out+="                                            <div class='clr'></div>\n";
			out+="                                        </div>\n";
			for(var a=1;a<4;a++){
				if(xdata['game'+a] && xdata['game'+a] >0 && xdata['game'+a+"_v"]==1){
					showtag="";
					mytag="";
					 for(var b=0;b<tags.length;b++){
						  if(tags[b]['gameid']==xdata['game'+a]){
							  showtag=tags[b]['gamename'];
							   mytag=tags[b]['gameid'];
						  }
					 }					
					out+="                                        <div class='centergameonlist'>\n";
					out+="                                            <div class='leftgameonlistnamed'>\n";
					out+="                                                "+showtag+"\n";
					out+="                                            </div>\n";
					out+="                                            <div class='leftgameonlistnoted'>\n";
					if(xdata['game'+a+'note']){
						out+="                                                備註："+xdata['game'+a+'note']+"\n";
					}
					out+="                                            </div>                        \n";
					out+="                                        </div>\n";
				}
			}
			out+="                                    </div>\n";
			out+="                                </div>\n";
			out+="                                <!--人物框尾-->\n";
			return out;
	}
	centermyimg=function(){
		mylist=$(".imgitemboxp img");
		if(mylist.length>0){
			for(var a=0;a<mylist.length;a++){
				h=mylist.eq(a).height();
				w=mylist.eq(a).width();
				if(h>w){
					mylist.eq(a).css("width",70);
					mylist.eq(a).css("height",70*h/w);
					mylist.eq(a).css("margin-top",-70*((h-w)/w)/2);
				}else if(w>h){
					mylist.eq(a).css("height",70);
					mylist.eq(a).css("width",70*w/h);
					mylist.eq(a).css("margin-left",-70*((w-h)/h)/2);
				}
			}
		}
	}
	centermyimg2=function(){
		mylist=$(".imgitembox img");
		if(mylist.length>0){
			for(var a=0;a<mylist.length;a++){
				h=mylist.eq(a).height();
				w=mylist.eq(a).width();
				if(h>w){
					mylist.eq(a).css("width",170);
					mylist.eq(a).css("height",170*h/w);
					mylist.eq(a).css("margin-top",-170*((h-w)/w)/2);
				}else if(w>h){
					mylist.eq(a).css("height",170);
					mylist.eq(a).css("width",170*w/h);
					mylist.eq(a).css("margin-left",-170*((w-h)/h)/2);
				}
			}
		}
	}
		/*
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
​	*/
	set_chaticon=function(){
		chatpic=JSON.parse(sessionStorage.getItem("chatpic"));
		out="";
		outa="";
		outb="";
		for(var a=0;a<chatpic.length;a++){
			outa+="<img src='img/chat/type"+chatpic[a]['thisid']+".png' class='icongroupclick' data-val='"+a+"' title='"+chatpic[a]['thisname']+"'/>\n";
			outb+="<div  class='icongroup'>\n";
			for(var b=0;b<chatpic[a]['pic'].length;b++){
				outb+="<img src='img/chat/"+chatpic[a]['pic'][b]['thisid']+"s.png' data-val='"+chatpic[a]['pic'][b]['thisid']+"'  title='"+chatpic[a]['pic'][b]['thisname']+"' />\n";
			}
			outb+="</div>\n";
		}
		out+="<div id='icontypelist'>\n";
		out+=outa;
		out+="</div>\n";
		out+=outb;
		$("#iconboxin").html(out);	
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
	//$("textarea").val("");
	$("body").delegate("textarea","keyup",function(){
		 $(this).height( 0 );								   
		inheight=this.scrollHeight;
		if(inheight<40){
			inheight=40;
		}
		$(this).css("height",inheight);
	});
	/*
	$("body").on("focusin",".birthday",function(){
		$(this).datepicker({
						dateFormat: 'yy-mm-dd',
						minDate: '1920-07-01',
						maxDate: '0',
						defaultDate: 7000
		});
	});
	*/
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
		jQuery($(this)).chosen();
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
					if(ifile[a].size > 2000000) {	tpchk=1;	}
				}else{			tpchk=2;	}
			}
			if(ifile.length>20){
				popnotice("相簿限制20張圖片");
			}else if(ifile.length<=3){
				popnotice("相簿限制至少3張圖片");
			}else if(tpchk==1) {
				popnotice("圖片 尺寸不得超過2MB");
			}else if(tpchk==2) {
				popnotice("檔案格式不符合,僅接受jpg,gif,png格式");
			}else { 
				var formData = new FormData();
				for(a=0;a<ifile.length;a++){
				 formData.append( 'val'+a,ifile[a]);
				}
				 formData.append( 'job', $(this).data("job"));
				 formData.append( 'uid',sessionStorage.getItem("userid"));
				 formData.append( 'ukey',sessionStorage.getItem("key"));
				 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loader.gif'></div>");
				 $.ajax({
						url: 'ajax.php',  //server script to process data
						type: 'POST',
						success: completeHandler = function(data) {
							//cdata=data.replace(/ /g,'');
							datax=JSON.parse(data);
							if(datax[0]=="ERR"){
								popnotice("會員資料不符合,請重新登入,謝謝");
							}else{
								var pout="";
								for(var a=0;a<datax[1].length;a++){
									pout+="<div class='temppicwrap'><img src='uploadfile/"+datax[1][a]+"'></div>";
								}
								pout+="<div class='clr'></div>";
								$("#newstitlewrapx").show();
								$("#newspicform").hide();
								$("#newsvidform").hide();
								$("#"+me.data("pictarget")).html(pout);
								if(me.data("target")){//需要傳檔案ID的
									$("#"+me.data("target")).val(datax[0]);
								}
								if(me.data("targettype")){//需要傳檔案的類別
									$("#"+me.data("targettype")).val("album");
								}
							}
						},
						error: errorHandler = function() {
							popnotice("發生錯誤,請檢查檔案");
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
			popnotice("本功能僅開放會員使用");
		}
	});	
	$("body").delegate(".gameadd","change",function(){//註冊看點數
		chk_regpoints();
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
			if(ifile.type == 'image/png' || ifile.type == 'image/jpg' || ifile.type == 'image/gif' || ifile.type == 'image/jpeg'){
				tpchk=1;
			}else if(ifile.type == 'video/mp4' && $(this).data("format")=="mp4"){
				tpchk=2;
			}
			if(ifile.name.length < 1) {
			}
			else if(ifile.size > 2000000 && tpchk==1) {
				popnotice("圖片 尺寸不得超過2MB");
			}
			else if(ifile.size > 5000000 && tpchk==2) {
				popnotice("影片 尺寸不得超過5MB");
			}
			else if(tpchk==0) {
				if($(this).data("format")=="mp4"){
					popnotice("檔案格式不符合,僅接受mp4格式");
				}else{
					popnotice("檔案格式不符合,僅接受jpg,gif,png格式");
				}
			}
			else { 
				var formData = new FormData();
				//if(me.data("job")=="uploadnewsreplypic"){
					//alert(me.parents(1).siblings("."+me.data("form")).data("test"))
					formData.append( 'val',ifile  );

				//}else{
			//		 formData.append( 'val', $('#'+$(this).data("form")+' .instantupload')[0].files[0] );
				//}
				 me.hide();
				 formData.append( 'job', $(this).data("job"));
				 formData.append( 'uid',sessionStorage.getItem("userid"));
				 formData.append( 'ukey',sessionStorage.getItem("key"));
				 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loader.gif'></div>");
				 $.ajax({
						url: 'ajax.php',  //server script to process data
						type: 'POST',
						//Ajax events
						success: completeHandler = function(data) {
							me.show();
							cdata=data.replace(/ /g,'');
							if(cdata=="ERR"){
								popnotice("會員資料不符合,請重新登入,謝謝");
							}else{
								//判斷是否是回應
								if(me.data("job")=="uploadnewsreplypic"){
									if(me.data("type")=="replace"){
										me.parents(1).siblings("."+me.data("pictarget")).html("<img src='uploadfile/"+cdata+"'>");
									}
									me.parents(1).siblings("."+me.data("form")).children("."+me.data("target")).val(cdata);
									me.parents(1).siblings("."+me.data("form")).children("."+me.data("targettype")).val(tpchk);
								}else if(me.data("job")=="uploadfrontb"){
									out="";
									out+="                	<img src='uploadfile/"+cdata+"' style='position:relative;z-index:9;' />\n";
									out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;'>請選擇</div>";
									out+="                            	<input type='file'  style='top:10px;left:10px;' class='formfield instantupload' name='frontpic'  data-job='uploadfrontb' data-form='frontpicformb' data-pictarget='mypagefrontpic' data-target='frontpicid' data-type='replace'>\n";
									$("#"+me.data("pictarget")).html(out);
									$(".profileimgclick").show();
									//更新 session
									mem=JSON.parse(sessionStorage.getItem("member"));
									mem['frontpic']=cdata;
									sessionStorage.setItem("member",JSON.stringify(mem));//更新
								}else if(me.data("job")=="uploadheadb"){
									out="";
									out+="                            <div class='mypeopleimg'>\n";
									out+="                				<img src='uploadfile/"+cdata+"' style='position:relative;z-index:9;' class='fullw' />\n";
									out+="							  </div>\n";
									out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;display:none;' id='headpicclick'>請選擇</div>";
									out+="                            	<input type='file'  id='headpicform' style='top:10px;left:10px;display:none;' class='formfield instantupload' name='headpic'  data-job='uploadheadb' data-form='headpicformb' data-pictarget='mypageheadpic' data-target='frontpicid' data-type='replace'>\n";
									$("#"+me.data("pictarget")).html(out);
									//更新 session
									mem=JSON.parse(sessionStorage.getItem("member"));
									mem['headpic']=cdata;
									sessionStorage.setItem("member",JSON.stringify(mem));//更新
								}else if(me.data("job")=="uploadchatroom"){//chatroom上傳圖片
									imgsrc="XX{img2}"+cdata;
									chat_input(me.data("val"),imgsrc);//id,內容  ajax.js
								}					
								else{
									if(me.data("type")=="cover"){
										//me.siblings(".btn").css("opacity",0);
										me.val('');
										me.parents(".instantbox").append("<img src='uploadfile/"+cdata+"' class='instantimg imgover'>");
										$(".instantbox").css("height",80);
									}else if(me.data("type")=="replace"){
										if(me.data("format")=="mp4"){
											$("#"+me.data("pictarget")).html("<video width=100% controls id='newstempvideo'><source src='uploadfile/"+cdata+"' type='video/mp4'></video>");
											var h=$("#newstempvideo").innerHeight();
											$("#newstempvideo").css("height",h);
										}else{
											$("#"+me.data("pictarget")).html("<img src='uploadfile/"+cdata+"' class='imgover'>");
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
							popnotice("發生錯誤,請檢查檔案");
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
			popnotice("本功能僅開放會員使用");
		}
	});

});

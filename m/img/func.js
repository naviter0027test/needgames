// 請更新  fb.js 中的 appid
// 所有 local storage 在 store.js
$(document).ready(function() {
	//設定
	var $company="PEPO工作團隊";
	var $window = $(window);
	var windowHeight = 0; 
	var windowwidth = 0;
	var ismobile=0;	//手機平板設定
	var user_id="";
	var fbname="";	
	var fbemail="";
	var fbacc=0;	
	var url=window.location.toString();	
	window.page=url.substring(url.lastIndexOf('/') + 1).split("?")[0];		//目前頁面 設定成glabals
	var popon="";
	//匯入store.js
	$.getScript('js/store.js', function() {	});	
	//檢查是否是平版
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		ismobile=0;
	}
	// 接收 query string
	var querystring = location.search.replace( '?', '' ).split( '&' );
	var qs = {};
	for ( var i=0; i<querystring.length; i++ ) {
		  var name = querystring[i].split('=')[0];
		  var value = querystring[i].split('=')[1];
		  qs[name] = value;
	} 
	setsize();
	setprepage();//一些進網頁需要設定的內容..就算是切換時也跑一次...
	//登入管理相關
	$.getScript('js/login.js', function() {
		//進入頁面從首頁開始
		indexpage();
		//第一次登入進入
		if(qs['act']){
			chk_mem(qs['act']);
		}
		allstart();
	});	
	//所有程式包裹在這裏面
	function allstart(){
		//############ 起始抓取資料 ####################
		if(page=="start.html" || page==""){
			//$("#headtime").css("opacity",0);
			//抓取資料
			//更新頁面
			//indexrefresh();
		}
	
		//###################### 行  為 ##############################
		//######################  共 用 行 為##############################
		//######  scroll ############
		sessionStorage.setItem("getmore","1");	
		$(window).scroll(function (event) {
			var scroll = $(window).scrollTop();
			if($("#maincontentbox").data("type") && $("#mainitemlast") ){//有值的才跑 && 有最下面的div的才跑
				if(scroll>=($(document).height()-($(window).height()+50)) && sessionStorage.getItem("getmore")==1){//繼續抓資料
					sessionStorage.setItem("getmore","2");
					getmoreboard();
				}
			}
		});
		//處理使用者變換尺寸
		$window.resize(function(){
			$window = $(window);
			setsize();
		});
		// ########### 框架相關 #####################
		// nav 設定
		for(var a=0;a<$(".navclick").length;a++){
			if(cleanhref($(".navclick").eq(a).attr("href"))==page){
				$(".navclick").eq(a).children("li").addClass("on");
			}
			if(cleanhref($(".navclick").eq(a).attr("href"))=="index.html" && page==""){
				$(".navclick").eq(a).children("li").addClass("on");
			}
		}
		// index 特殊拉動上下左右 
		$("#showmenu").click(function(){
			if(parseInt($("#mheaderwrap").css("top"))==50){
				$("#mheaderwrap").stop().animate({"top":-1000},500);
			}else{
				$("#mheaderwrap").stop().animate({"top":50},500);
			}
		});
		$("#arrup").click(function(){
			$('html, body').stop().animate({scrollTop:0},800);		   
		});
		// ########### header 上功能 #####################
		//關閉所有pop
		$("#mainwrap").click(function(){
			if(popon==1){
				popreturn();
				$(".headpop").hide();
			}
		});
		//通知開啟/關閉
		$(".htitle").click(function(){
			if($(this).hasClass("htitleon")){
				popon=0;
				$(this).removeClass("htitleon");
				$(this).siblings(".hlist").hide();
			}else{
				popon=1;
				$(".hlist").hide();
				$(".poptitles").removeClass("htitleon");
				$(this).addClass("htitleon");
				$(".headpop").hide();
				$(this).siblings(".hlist").show();
			}
		});	
		//左側 addgameonlisttitle
		$("#addgameonlisttitle").click(function(){
												/*
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$("#addgameonlistformwrap").hide();
			}else{
				$(this).addClass("on");
				$("#addgameonlistformwrap").show();
				jQuery(".chosen").chosen();
			}
			*/
		});
		//登入後項目開啟/關閉
		$("#logtitle").click(function(){
			if($(this).hasClass("tracktitleon")){
				$(this).removeClass("tracktitleon");
				$("#loglist").hide();
			}else{
				popreturn();
				$(this).addClass("tracktitleon");
				$(".headpop").hide();
				$("#loglist").show();
			}
		});	
		//########### 網站幣相關 ######################
		//按 bgip的行為
		$("body").delegate(".bgip","click",function(){
			//需要套ajax
			$(this).addClass("bgipoff");
	
		});	
		//登入登出
		$("body").delegate(".loginclick","click",function(){
			poplogin();
		});
		//註冊
		$("body").delegate(".registorclick","click",function(){
			popregister();
		});	
		//忘記密碼
		$("body").delegate(".foregclick","click",function(e){
			e.preventDefault();
			popclose();
			popforget();
		});	
		
		// ####### 表格相關 #################
		//送出表格 
		$("body").delegate(".submitclick","click",function(e){
				e.preventDefault();
				passme=1;
				if($(this).data("type")=="orderform"){
					mylist=$(".form-control");
					for(var a=0;a<mylist.length;a++){
						if(mylist.eq(a).attr("name")=="email"){
							if(vemail(mylist.eq(a),'')){
							}else{
								passme=0;
							}
						}else if(mylist.eq(a).attr("name")=="phone"){
							if(vtext(mylist.eq(a),7,'',13)){
							}else{
								passme=0;
							}
						}else{
							if(vtext(mylist.eq(a),1,'',300)){
							}else{
								passme=0;
							}
						}
					}
					if(passme==1){
						alert("OK");
						mylistb=$(".formfield");
						for(var a=0;a<mylistb.length;a++){
							mylistb.eq(a).val('');
						}
					}else{
					}
				}else if($(this).data("type")=="loginform"){//登入
					passme=1;
					mylist=$("#"+$(this).data("type")+" .form-control");
					for(var a=0;a<mylist.length;a++){
							if(mylist.eq(a).attr("name")=="pass"){
								if(vtext(mylist.eq(a),6,'',12)){
								}else{
									passme=0;
								}
							}else{
								if(vtext(mylist.eq(a),1,'',300)){
								}else{
									passme=0;
								}
							}
					}
					if(passme==1){
							//檢查驗證碼
							var tempvals=Array("1",mylist.eq(2).val(),mylist.eq(0).val(),mylist.eq(1).val());
							tempitem=ajaxarr("mem_login",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義	
								if(data[0]=="ERR"){
									alert(data[1]);
									$("#codepagew").html(data[2]);
								}else{
									alert("登入成功了,謝謝");
									//這邊套登入相關
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]) ;
									sessionStorage.setItem("key",data[3]) ;
									indexpage();
									popclose();
								}
							});
					}
				}else if($(this).data("type")=="forgetform"){//忘記密碼
					passme=1;
					mylist=$("#"+$(this).data("type")+" .form-control");
					for(var a=0;a<mylist.length;a++){
							if(mylist.eq(a).attr("name")=="name"){
								if(vemail(mylist.eq(a),'')){
								}else{
									passme=0;
								}
							}
					}

					if(passme==1){
							//檢查驗證碼
							var tempvals=Array("1",mylist.eq(0).val());
							tempitem=ajaxarr("mem_forget",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義	
								if(data[0]=="ERR"){
									alert(data[1]);
								}else{
									$("#popbody").html("一封信已經寄至您的信箱<BR>請前往查看<BR><BR>"+$company+"敬上");
								}
							});
					}
				}else if($(this).data("type")=="popmemberform"){//驗證後會員
					passme=1;
					mylist=$("#"+$(this).data("type")+" .form-control");
					for(var a=0;a<mylist.length;a++){
							if(mylist.eq(a).attr("name")=="birth"){
								if(vdate(mylist.eq(a))){
								}else{
									passme=0;
								}
							}else{
								if(vtext(mylist.eq(a),1,'',200)){
								}else{
									passme=0;
								}
							}
					}
					if(passme==1){
							alllist=$("#"+$(this).data("type")+" .formfield");
							var tempvals=Array(sessionStorage.getItem("key"),mylist.eq(0).val(),alllist.eq(1).val(),alllist.eq(2).val(),alllist.eq(3).val(),alllist.eq(4).val(),alllist.eq(5).val(),alllist.eq(6).val(),alllist.eq(7).val(),alllist.eq(8).val(),alllist.eq(9).val(),alllist.eq(10).val(),alllist.eq(11).val(),alllist.eq(12).val());
							tempitem=ajaxarr("mem_actsave",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義	
								if(data[0]=="ERR"){
									alert(data[1]);
								}else{
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]);
									$("#popbody").html("謝謝您的加入<BR>請稍待片刻我們替您登入<BR><BR>"+$company+"敬上");
									setTimeout(function(){
										 location.href=window.page;
									},3000);
								}
							});
					}
				}else if($(this).data("type")=="regform"){//註冊
					passme=1;
					mylist=$("#"+$(this).data("type")+" .form-control");
					for(var a=0;a<mylist.length;a++){
							if(mylist.eq(a).attr("name")=="pass"){
								if(vtext(mylist.eq(a),6,'',12)){
								}else{
									passme=0;
								}
							}else if(mylist.eq(a).attr("name")=="passb"){
								if(vtext(mylist.eq(a),6,'',12)){
								}else{
									passme=0;
								}
							}else if(mylist.eq(a).attr("name")=="name"){
								if(vemail(mylist.eq(a),'')){
								}else{
									passme=0;
								}
							}else{
								if(vtext(mylist.eq(a),1,'',300)){
								}else{
									passme=0;
								}
							}
					}
					if(passme==1){
							//檢查驗證碼
							var tempvals=Array("1",mylist.eq(3).val(),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val());
							tempitem=ajaxarr("mem_reg",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義	
								if(data[0]=="ERR"){
									alert(data[1]);
									$("#codepagew").html(data[2]);
								}else{
									$("#popbody").html("謝謝您的註冊<BR>一封信已經寄至您的信箱<BR>請前往查看<BR><BR>"+$company+"敬上");
								}
							});
					}
				}
				
		});
		//表格填寫確認
		$("body").delegate(".form-control","keyup",function(e){
			if($(this).attr("name")=="email"){
				vemail($(this),'');
			}else if($(this).attr("name")=="name"){
				vemail($(this),'');
			}else if($(this).attr("name")=="phone"){
				vtext($(this),7,'',13);
			}else if($(this).attr("name")=="pass"){
				vtext($(this),6,'',12);
			}else if($(this).attr("name")=="passb"){
				vtext($(this),6,'',12);
			}else{
				vtext($(this),1,'',300);
			}
		});
		//隱藏表格顯示
		$("body").delegate(".editprofileclick","click",function(){
			$(this).parent("div").siblings("div").children(".hidediv").show();
			jQuery(".chosenx").chosen();
		});
		  
		//選擇分類
		$("body").delegate("#q_type","change",function(){
		//	if(e.which == 13) { 	
			//	e.preventDefault();
				myval=$("#q_type").val();
				orglist=$("#q_typewrap .q_tag");
				tpass=1;
				if(orglist.length>0){
					for(var a=0;a<orglist.length;a++){
						if(orglist.eq(a).data("val")==myval){
							tpass=0;
						}
					}
					if(tpass==1){
						$("#q_typewrap").html("<span class='q_tag border5' data-val='"+myval+"'>"+myval+" <i class='fa fa-times fa-vc q_tagdel' data-val='"+myval+"'></i></span>");
						$("#q_typebox").hide();
					}
				}else{
					$("#q_typewrap").html("<span class='q_tag border5' data-val='"+myval+"'>"+myval+" <i class='fa fa-times fa-vc q_tagdel' data-val='"+myval+"'></i></span>");
					$("#q_typebox").hide();
				}
		//	}
		});
		$("body").delegate(".q_tagdel","click",function(){
			$(this).parents(".q_tag").remove();
			$("#q_typebox").show();
		});
	
		// ##########  按 morediv 的行為 這是有限高的div 變大... ##################
		$("body").delegate(".morediv","click",function(){
			mytype=$(this).data("type");
			myoffset=$(this).position();
			myoffsettop=myoffset.top;
			same=$(this)[0].outerHTML;
			$(this).html("<img src='img/loader.gif' style='padding:20px;'>");
			var metemp=$(this);
			 now = new Date();
			insert="<div class='formdivdiv'><P class='title'>張關鍵 發佈一則關於 ' 課綱' 的新貼文</P><p class='timmer' data-time='"+now.toISOString().substr(0, 10)+" "+now.toString().substr(16, 8)+"'>"+now.toISOString().substr(0, 10)+" "+now.toString().substr(16, 8)+"</p></div>";
			output=insert+insert+insert;
			ttp=metemp.parents(".headdiv").attr("id");
			setTimeout(function(){
				metemp.replaceWith(output+same);
				$("#"+ttp).css("padding-top","15px");
				$("#"+ttp).stop().animate({scrollTop :myoffsettop},800);	
			},1500);
		});
		// ########## 其他互動  ####################
		//按下 maincontenttagselect 的行為 --tag切換
		$("body").delegate(".tagselect","click",function(){	
			$(this).parent(".tagtitlewrap").children(".tagselect").removeClass("on");
			$(this).addClass("on");
			thisval=$(this).data("val");
			$(this).parent(".tagtitlewrap").siblings(".tagcontentwrap").children(".tagcontentbox").hide();
			$(this).parent(".tagtitlewrap").siblings(".tagcontentwrap").children(".tagcontentbox").eq(thisval).show();
		});
		//按下 mselectclick 的行為
		$("body").delegate(".mselectclick ","click",function(){
			if($(this).hasClass("fa-chevron-up")){
				$(this).removeClass("fa-chevron-up");
				$(this).addClass("fa-chevron-down");
				$(this).siblings(".mainitemtitleselectlist").hide();
			}else{
				$(this).removeClass("fa-chevron-down");
				$(this).addClass("fa-chevron-up");
				$(this).siblings(".mainitemtitleselectlist").show();
			}
	
		});	
		$("#topadimgclick").click(function(){
			$("#headeroutwrap").animate({"top":-250},500);
			$("#mainwrap").animate({"margin-top":45},500);
			$("#mainright").animate({"top":45},500,function(){setsize();});
			$("#mainleft").animate({"top":45},500);
		});
		//圖片管理的X
		$("body").delegate(".imgitembox","mouseenter",function(){	
			$(this).children(".imgdelclick").show();
		});
		$("body").delegate(".imgitembox","mouseleave",function(){	
			$(this).children(".imgdelclick").hide();
		});	
		
	
		//控制placeholder
		$('input:text, textarea').each(function(){
			var $this = $(this);
			$this.data('placeholder', $this.attr('placeholder'))
				 .focus(function(){$this.removeAttr('placeholder');})
				 .blur(function(){$this.attr('placeholder', $this.data('placeholder'));});
		});
	
		// ##########  CHAT ROOM RELATED  ########################
		var chroomid="";
		$("body").delegate(".chaticonselect","click",function(){
			temp=$(this).offset();
			chroomid=$(this).data("val");
			myleft=parseInt(temp.left);
			$("#iconbox").css("left",myleft-150).css("bottom",20);
			$("#iconbox").show();
		});	
		$("body").delegate(".chatfriendclick","click",function(){
			if($("#"+$(this).data("val")).children(".chatfsearch").css("display")=="block"){
				$("#"+$(this).data("val")).children(".chatfsearch").children(".chatfsearchbox").val('');
				$("#"+$(this).data("val")).children(".chatfsearch").hide();
				$("#"+$(this).data("val")).children(".chatfsearch").children(".chatauto").html('');
				$("#"+$(this).data("val")).children(".chatfsearch").children(".chatauto").hide();
			}else{
				$("#"+$(this).data("val")).children(".chatfsearch").show();
			}
		});
		$("body").delegate(".chatfsearch .btn","click",function(){
				$(this).siblings(".chatfsearchbox").val('');
				$(this).siblings(".chatauto").html('');
				$(this).parents(".chatfsearch").hide();
				$(this).siblings(".chatauto").hide();
				
		});	
		//關閉一些chatroom多開的東西
		$("body").delegate("#mainwrap,.chatbox","click",function(){
			if($("#iconbox").css("display")=="block"){
				$("#iconbox").hide();
			}
		});
		$("body").delegate(".chatbox","click",function(){
			$(this).siblings(".chatfsearch").hide();
		});
		//這是測試用..實際需要抓取
		$("body").delegate(".chatfsearchbox","keyup",function(e){
				p=$(this).val();
				out="<div class='cfitem' data-val='sss'><img src='img/people.jpg'>"+p+" user</div>";
				out=out+out+out+out+out;
				$(this).siblings(".chatauto").html(out);
				$(this).siblings(".chatauto").show();
		});	
		//這是測試用..實際需要ajax
		$("body").delegate("#icontypelist img","click",function(){
			$(".icongroup").hide();
			$(".icongroup").eq($(this).data("val")).show()
		});	
		//這是測試用..實際需要紀錄
		$("body").delegate(".icongroup img","click",function(){
			$("#iconbox").hide();
			$("#"+chroomid).children(".chatbox").append("<div class='chatline2'>          <span class='chattalkp'><img src='img/people.jpg'></span>            <div class='clr'></div>        </div>");		
			$("#"+chroomid+" .chatbox").animate({"scrollTop":80000},500);
		});	
		//這是測試用..實際需要紀錄
		$("body").delegate(".chatinput","keypress",function(e){
			if(e.which == 13) {
				$("#"+$(this).data("val")).children(".chatbox").append("<div class='chatline2'>          <span class='chattalk'>"+$(this).val()+"</span>            <div class='clr'></div>        </div>");		
				$("#"+$(this).data("val")+" .chatbox").animate({"scrollTop":80000},500);
				$(this).val('');
			}
		});	
		$("body").delegate(".closechat","click",function(){
			$("#"+$(this).data("val")).remove();
		});	
	}
	// ##########  CHAT ROOM RELATED  END ########################	
	// ###########  PAGE CONTROL ########################
	// Page new or update
	function framerefresh(){//每多少秒抓一次資料
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
		}else{
		}
		//其他
		
	}
	//
	function indexpage(){
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			show_afterloginhead();//左方頭部
		}else{
			show_beforeloginhead();//左方頭部
		}
	}
	
	
	
	function popreturn(){
		$(".poptitles").removeClass("htitleon");
	}

});
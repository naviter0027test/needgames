// 請更新  fb.js 中的 appid
// 所有 local storage 在 store.js
$(document).ready(function() {
	//設定
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
	
	//匯入fb.js fb 登入的插件-相關修改請至 fb.js
	$.getScript('js/fb.js', function() {
	});	
	//匯入store.js
	$.getScript('js/store.js', function() {
	});	
	
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
	//############ 起始抓取資料 ####################
	if(page=="index.html" || page==""){
		$("#headtime").css("opacity",0);
		//抓取資料
		//更新頁面
		indexrefresh();
	}
	//###################### 行  為 ##############################
	//######################  共 用 行 為##############################
	//scroll
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
	// nav 設定
	for(var a=0;a<$(".navclick").length;a++){
		if(cleanhref($(".navclick").eq(a).attr("href"))==page){
			$(".navclick").eq(a).children("li").addClass("on");
		}
		if(cleanhref($(".navclick").eq(a).attr("href"))=="index.html" && page==""){
			$(".navclick").eq(a).children("li").addClass("on");
		}
	}
    //index 特殊拉動上下左右
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
	// header 上功能
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
	//按 bgip的行為
	$("body").delegate(".bgip","click",function(){
		//需要套ajax
		$(this).addClass("bgipoff");

	});	
	//送出表格
	$("body").delegate("#submitclick","click",function(e){
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
						if(vtext(mylist.eq(a),7,'',12)){
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
			}
	});
	//表格填寫確認
	$("body").delegate(".form-control","keyup",function(e){
		if($(this).attr("name")=="email"){
			vemail($(this),'');
		}else{
			vtext($(this),1,'',300);
		}
	});
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
	// 按 morediv 的行為 這是有限高的div 變大...
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
	// 所有 switch 選項顯示第一個
	//$(".selectwrap .selectitm2").eq(0).addClass("selectitmon");
	//$(".selectwrap .selectitm3").eq(0).addClass("selectitmon");
	// switch 偵測
	$(".selectitm2").click(function(){
		$(this).parent(0).children(".selectitm2").removeClass("selectitmon");
		$(this).addClass("selectitmon");
		 if($(this).data("target")){
			 $("#"+ $(this).data("target") +" .formdiv").hide();
			$("#"+ $(this).data("target") +" .formdiv").eq($(this).data("val")).show();
			localStorage.setItem($(this).data("target"),$(this).data("val"));
		 }
		 // index reflash
		 if($(this).data("type")=="indexselectitm"){
			indexrefresh();
		 }
	});
	$(".selectitm3").click(function(){
		$(this).parent(0).children(".selectitm3").removeClass("selectitmon");
		$(this).addClass("selectitmon");
		 if($(this).data("target")){
			$("#"+ $(this).data("target") +" formdiv").hide();
			$("#"+ $(this).data("target") +" formdiv").eq($(this).data("val")).show();
			localStorage.setItem($(this).data("target"),$(this).data("val"));
		 }
		 // index reflash
		 if($(this).data("type")=="indexselectitm"){
			indexrefresh();
		 }
	});
	$("#topadimgclick").click(function(){
		$("#headeroutwrap").animate({"top":-250},500);
		$("#mainwrap").animate({"margin-top":45},500);
		$("#mainright").animate({"top":45},500,function(){setsize();});
		$("#mainleft").animate({"top":45},500);
	})
	$("body").delegate(".hoverpop","mouseenter",function(){
		$(this).prepend("<span class='hoverdiv shadow3'>"+$(this).data("hottext")+"</span>");
	});
	$("body").delegate(".hoverpop","mouseleave",function(){
		 $(this).children(".hoverdiv").remove();
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
	// ##########  CHAT ROOM RELATED  END ########################	
	
	
	// Page new or update
	function indexrefresh(){
	}
	function popreturn(){
		$(".poptitles").removeClass("htitleon");
	}

});
﻿// 請更新  fb.js 中的 appid
// 所有 local storage 在 store.js
var blnSMenuOpen=0; //20190425 Pman 次選單是否開啟(新增參數)
$(document).ready(function() {
	//設定
	var $company="KYOMONS工作團隊";
	var chkfb=0;
	var $window = $(window);
	var windowHeight = 0;
	var windowwidth = 0;
	var ismobile=0;	//手機平板設定
	var user_id="";
	var fbname="";
	var fbemail="";
	var fbacc=0;
	var chattime=3000;//chatroom refresh---這個設定和後台通知有連動..因此不能直接改
	var refreshnote=10000;//檢查訊息時間
	var refreshtimer=30000;//檢查訊息時間
	var xxme="";
	var vpflag="";
	var mQA=0; //20190328 Pman
	var url=window.location.toString();
	window.page=url.substring(url.lastIndexOf('/') + 1).split("?")[0];		//目前頁面 設定成glabals
	if(window.location.hostname=="99mission.why3s.tw"){
		var fbid="257730147730215";
	}else if(window.location.hostname=="www.coinpayments.tw"){ //20190107 Pman 修改為正式站網址
		var fbid="130898547491195";
	}else if(window.location.hostname=="www.coinpayments.tw:8080"){ //20190107 Pman 修改為正式站網址
		var fbid="1486682161360214";
	}else{
		var fbid="130898547491195"; //20190107 Pman 修改FB APP ID
	}
	var popon="";
	var curpage="";//目前頁面
	var curtab="";//目前TAB
	var chatreload="";
	var isinchat=0;
	//轉址判斷
	//20190312 Pman 轉址判斷改以瀏覽器類型進行
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
	//if($window.width()<900){ //20190227 Pman 修正偵測寬度的值
			var goaddress=url.substring(0,url.lastIndexOf('/'))+"/m/"+url.substring(url.lastIndexOf('/') + 1);
			window.location.replace(goaddress);
	}
	/* $window.resize(function(){
		$window = $(window);
		if($window.width()<900){ //20190227 Pman 修正偵測寬度的值
				var goaddress=url.substring(0,url.lastIndexOf('/'))+"/m/"+url.substring(url.lastIndexOf('/') + 1);
				window.location.replace(goaddress);
		}
	}); */
	// 接收 query string
	var querystring = location.search.replace( '?', '' ).split( '&' );
	var qs = {};
	var lastme="";
	var start=0;
	var hasstate=0;
	for ( var i=0; i<querystring.length; i++ ) {
		  var name = querystring[i].split('=')[0];
		  var value = querystring[i].split('=')[1];
		  qs[name] = value;
	}
	if(qs["refid"]){//介紹人
		localStorage.setItem("refid",qs["refid"])
	}
	$(window).bind("popstate", function(e){
		var state =event.state;
		//console.log("event.state:"+event.state);
		console.log("event.state.page:"+event.state.page);//20190730 Pman gj 輸出參考資訊
		if(state){

			if(hasstate==0){
				//console.log("event.state.hasstate1:"+hasstate);
				curpage=state.page;
				showpage(curpage,"");
			}else{
				//console.log("event.state.curpage:"+curpage);
				//console.log("event.state.hasstate2:"+hasstate);
				if(curpage=="artpage"){//20190730 Pman 從攻略內文點瀏覽器的上一頁，這時curpage會是「artpage」，這時送去showpage，會GG...所以，先試著將curpage的參數換掉，如果有問題，再回頭看看。
					curpage="articlepage";
					showpage(curpage,"");//20190730 Pman 整段if是新寫的內容，目的是從攻略內文點瀏覽器的上一頁時，能回到列表頁正確的位置
				}

				hasstate=0;
			}
		}else{
			//updateSite("home");
		}
	});
	var bshow=0;
	$window.scroll(function (event) {
		calrightpos();
		/*
		sp=$window.scrollTop();
		mlist=$(".rightbanner");
		var vx=parseInt($(".midwrapin").offset().left)+488;
		if(mlist.length>0){
			var mah=$(".midwrapinleft").height();
			var mbh=$(".midwrapinright").height();//右方全高 ...mbh-$(window).height()==右方比windows高的不分...
			if(mah>mbh){
				var txtop=$("#topad").height();
				txtop+=parseInt($("#headeroutwrap").css("top"));
				txtop+=$("#headerwrap").height();
				txtop+=5;
				if(mbh>($(window).height()-txtop)){
					if(bshow==0 && sp>=(mbh-$(window).height())){
						$(".midwrapinright").css("position","fixed").css("left",vx).css("top","auto").css("bottom",10);
						bshow=1;
					}else if(bshow==1 && sp<(mbh-$(window).height())){
						bshow=0;
						$(".midwrapinright").css("position","relative").css("left","auto").css("bottom","auto").css("top","auto");
					}
				}else{
					$(".midwrapinright").css("position","fixed").css("left",vx).css("top",txtop).css("bottom","auto");
				}
			}else{
				bshow=0;
				$(".midwrapinright").css("position","relative").css("left","auto").css("bottom","auto").css("top","auto");
			}
		}
		*/
	});
	//先關閉通知
	$(".hwrap").hide();
	$.getScript('js/sharenew.js', function() {
		$.getScript('js/ajaxnew.js', function() {
			//匯入store.js
			$.getScript('js/store.js', function() {	});
			setsize();
			setprepage();//一些進網頁需要設定的內容..就算是切換時也跑一次...
			var cntss=7;
			//登入管理相關
			$.getScript('js/login.js', function() {
				//第一次登入進入
				if(qs['act']){
					chk_mem(qs['act']);
				}
				cntss--;
			});
			//左方menu
			$.getScript('js/leftmenu.js', function() {
				cntss--;
			});
			//中央
			$.getScript('js/center.js', function() {
				cntss--;
			});
			//右方
			$.getScript('js/rightlist.js', function() {
				cntss--;
			});
			//notice
			$.getScript('js/notice.js', function() {
				cntss--;
			});
			var gb=0;
			sessionStorage.setItem("ranks","");
			if(gb==0 && sessionStorage.getItem("ranks")==""){
				get_basic();//抓取等級及標籤等基礎資料-在ajax
			}
			sessionStorage.setItem("gamerem","");
			if(sessionStorage.getItem("userid")){//已經登入--檢查後台...有時被reload時需要
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));// 類別,ID
				tempitem=ajaxarr("chk_mem",tempvals,"ajax.php");
				tempitem.success(function(data){//回傳 data 義
					if(data[0]=="ERR"){
						var d = new Date();
						var n = d.getTime();
						if(localStorage.getItem("re_userid") && localStorage.getItem("re_time") && localStorage.getItem("re_key") && parseInt(localStorage.getItem("re_time"))>parseInt(n)){//檢查是否有自動登入
							var tempvals=Array(localStorage.getItem("re_userid"),localStorage.getItem("re_key"));// 類別,ID
							tempitem=ajaxarr("mem_autologin",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
								sessionStorage.setItem("gamerem","1");
								if(data[0]=="ERR"){
								}else{
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]) ;
									sessionStorage.setItem("key",data[3]) ;
									sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
									sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
									sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
									if(data[1]['phonev']=="0"){
										popclose();
										pop_vrequest();
									}
								}
								cntss--;
							});
						}else{
							sessionStorage.setItem("member","");
							//sessionStorage.setItem("userid","");
							sessionStorage.setItem("key","");
							sessionStorage.setItem("point010","");//更新
							sessionStorage.setItem("point012","");//更新
							sessionStorage.setItem("point014","");//更新
							localStorage.removeItem("re_userid");
							localStorage.removeItem("re_key");
							localStorage.removeItem("re_time");
							sessionStorage.setItem("gamerem","1");
							cntss--;
						}
					}else{
						sessionStorage.setItem("gamerem","1");
						cntss--;
					}
				});
			}else{ //新登入
				if(localStorage.getItem("re_userid") && localStorage.getItem("re_time") && localStorage.getItem("re_key")){//檢查是否有自動登入
					var d = new Date();
					var n = d.getTime();
					if(parseInt(localStorage.getItem("re_time"))>parseInt(n)){//仍在時限內繼續
						var tempvals=Array(localStorage.getItem("re_userid"),localStorage.getItem("re_key"));// 類別,ID
						tempitem=ajaxarr("mem_autologin",tempvals,"ajax.php");
						tempitem.success(function(data){//回傳 data 義
							sessionStorage.setItem("gamerem","1");
							if(data[0]=="ERR"){
							}else{
								sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
								sessionStorage.setItem("userid",data[2]) ;
								sessionStorage.setItem("key",data[3]) ;
								sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
								sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
								sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
								if(data[1]['phonev']=="0"){
									popclose();
									pop_vrequest();
								}
							}
							cntss--;
						});
					}else{
						localStorage.removeItem("re_userid");
						localStorage.removeItem("re_key");
						localStorage.removeItem("re_time");
						sessionStorage.setItem("gamerem","1");
						localStorage.removeItem("gameselect");
						cntss--;
					}
				}else{
					sessionStorage.setItem("gamerem","1");
					cntss--;
				}
			}
			//如果是會員..顯示

			var setstart=setInterval(function(){
				//有些需要等抓取結束
				if(gb==0 && sessionStorage.getItem("ranks") !="" && sessionStorage.getItem("tags") !="" && sessionStorage.getItem("gametimes") !="" && sessionStorage.getItem("gamerem") !="" ){//等get_basic 結束
					cntss--;
				}
				if(cntss<=0){
					hasstate=2;//表示是第一次近來
					clearInterval(setstart);
					//等一下下在開始..等其他資料跑完..和儲存完畢
						setTimeout(function(){
								//進入頁面從動態牆開始
								if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0 && qs["page"]){
									curpage=qs["page"];
									//showpage(curpage,"");
									showpage(1);
								}else{
									curpage="wallpage";
									if(window.page!="share.php"){
										history.pushState({page:curpage}, '', "?page="+curpage);//history
									}
									showpage(1);
								}
								//其他功能開始
								setTimeout(function(){
									allstart();
								},500);
						},500);
				}
			},400);
		});
	});
	//所有程式包裹在這裏面
	function allstart(){
		//pop_vrequest();
		//############ 起始抓取資料 ####################
		if(sessionStorage.getItem("member")){
			$(".hwrap").show();
		}
		framerefresh();//開始執行即時功能
		get_topbanner();//更換上方banner
		set_chaticon();//設定聊天室貼圖,在share.js
		//設定右下角搜尋
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			$("#friendsearchbox").show();
		}else{
			$("#friendsearchbox").hide();
		}
		//###################### 行  為 ##############################
		//######################  共 用 行 為##############################
		//######  scroll ############
		sessionStorage.setItem("getmore","1");
		$(window).scroll(function (event) {
			var scroll = $(window).scrollTop();
			if($("#maincontentbox").data("type") && $("#mainitemlast") ){//有值的才跑 && 有最下面的div的才跑
				if(scroll>=($(document).height()-($(window).height()+250)) && sessionStorage.getItem("getmore")==1){//繼續抓資料
					sessionStorage.setItem("getmore","2");
					if($("#mainitemlast").data("select")){
						getmoreboard($("#mainitemlast").data("select"));
					}else{
						getmoreboard();
					}
				}
			}
		});
		//需要放上面
		//檢查FB
		/*
		$("body").delegate(".fbbtn","click",function(e){
			e.preventDefault();
			if(chkfb==1){
			}else{
				popnotice("fb尚未連結\n 請稍待reload畫面 \n reload後請稍等候10秒上下 ");
				location.reload();
			}
		});
		*/
		//處理使用者變換尺寸
		$window.resize(function(){
			$window = $(window);
			setsize();
		});
		// ########### 框架相關 #####################
		// nav 設定
		//更換框架
		$("body").delegate(".pageclick","click",function(e){
			e.preventDefault();
			curpage=$(this).data("type");
			history.pushState({page:curpage}, '', "?page="+curpage);//history
			//window[curpage]();
			$('html, body').stop().animate({scrollTop:0},100);

			var dd="";
			if($(this).data("id")){
				dd=$(this).data("id");
			}
			var w=$("#rightmenuwrap").html();
			console.log("val:"+$(this).data("val"));
			showpage($(this).data("val"),dd);
		});
		
		$("body").delegate(".pageclick.topnavclick","click",function(e){
			sessionStorage.setItem("actPG","1"); //20190730 Pman 點選選單時，重設到起始頁面
		});
		
		//pop 更換框架
		$("body").delegate(".ppageclick","click",function(e){
			e.preventDefault();
			$(this).parents(".hwrap").children(".hlist").hide();
			$(this).parents(".hwrap").children(".htitle").removeClass("htitleon");
			curpage=$(this).data("type");
			$('html, body').stop().animate({scrollTop:0},100);
			//window.History.pushState({n:data}, 'page'+curpage, "?page="+curpage);//history
			//if($(this).data("type")=="matchitem"){
			//	curpage="matchpage";
			//	showpage(curpage,"3");
			//}else{
				showpage($(this).data("val"));
			//}

		});
		//更換 mypage 內框架
		$("body").delegate(".mysubclick","click",function(e){
			e.preventDefault();
			x=$(this).data("val");
			y=$(this).data("id");
			mynav_change(x);//在share.js
			if(x==1){
				show_mypagefront(y);
			}else if(x==2){
				show_mypageabout(y);
			}else if(x==3){
				show_mypagearticle(y,1,1,1);
			}else if(x==4){
				show_mypagefriend(y);
			}else if(x==5){
				show_mypagephoto(y,2); //20180907 Pman 客戶要求不顯示動態相片
			}
		});
		//切換資料顯示與否
		$("body").delegate(".showprofileclick","click",function(e){
			e.preventDefault();
			me=$(this);
			x=$(this).data("name");
			if($(this).hasClass("fayellow")){
				y="n";
			}else{
				y="y";
			}
			change_myshow(x,y,me);//更換顯示 在 ajax
		});
		$("body").delegate(".showrightmenu","click",function(e){
			if($(this).children(".fachanger").hasClass("fa-caret-down")){
				$(this).children(".fachanger").removeClass("fa-caret-down");
				$(this).children(".fachanger").addClass("fa-caret-up");
				$(".hlist").hide();//0813
				$(".htitle").removeClass("htitleon");//0813
				$("#rightmenuwrap").show();
			}else{
				$(this).children(".fachanger").removeClass("fa-caret-up");
				$(this).children(".fachanger").addClass("fa-caret-down");
				$("#rightmenuwrap").hide();
			}
		});
		//切換icon hover
		$("body").delegate(".leftinfoselectitemcircle","mouseenter",function(e){

			$(this).children(".leftinfoselectitemin").stop().animate({"left":-38},300);
			$(this).children(".leftinfoselectitembg").stop().animate({"opacity":1},300);
		});
		$("body").delegate(".leftinfoselectitemcircle","mouseleave",function(e){
			$(this).children(".leftinfoselectitemin").stop().animate({"left":0},300);
			$(this).children(".leftinfoselectitembg").stop().animate({"opacity":0},300);
		});
		//右上角選單
		$("body").delegate(".submenuclick","click",function(e){
			if($(this).data("val")==1){
			}else if($(this).data("val")==2){
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
				tempitem=ajaxarr("mem_getpoint",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						var out="";
						out+="                    <div class='formline2'>\n";
						out+="                        <div class='formitem formitem_3 tleft energy_title_left'>累積貢獻值</div>\n"; //20190328 Pman 調整文案
						out+="                        <div class='formitem formitem_3 dtext energy_title_right'>"+data[1]['score']+"</div>\n";
						out+="                        <div class='clr'></div>\n";
						out+="                    </div>\n";
						out+="                    <div class='formline2'>\n";
						out+="                        <div class='formitem formitem_3 tleft energy_title_left'>剩餘貢獻值</div>\n"; //20190328 Pman 調整文案
						out+="                        <div class='formitem formitem_3 dtext energy_title_right'>"+data[1]['points']+"</div>\n";
						out+="                        <div class='clr'></div>\n";
						out+="                    </div>\n";
						out+="                    <img src='../img/pointL.png' style='max-width:100%;'>\n"; //20190329 Pman 新增一張說明圖
						out+="                    <div class='formline2'>\n";
						out+="                        <div class='energy_table_title'>近30日貢獻值紀錄</div>\n"; //20190402 Pman 更換CSS
						out+="                        <div class='formitem formitem_3 energy_title_table'>\n";
						out+="							<span class='span4'>時間</span>";
						out+="							<span class='span2'>貢獻值增減</span>";
						out+="							<span class='span3'>事由</span>";
						out+="							<span class='span1'>備註</span>";
						out+="						  </div>\n";
						out+="                        <div class='clr'></div>\n";
						out+="                    </div>\n";
						for(var a=0;a<data[2].length;a++){
							if(data[2][a]['points']!=0){					//濾掉貢獻值變動為0的項目  ==> Pman 20170103
								out+="                    <div class='formline2'>\n";
								//out+="                        <div class='formitem formitem_3 tleft'></div>\n";
								out+="                        <div class='formitem formitem_3 energy_title_table'>\n";
								out+="							<span class='span4'>"+data[2][a]['dateadd']+"</span>";
								out+="							<span class='span2 tright'>"+data[2][a]['points']+"</span>";
								out+="							<span class='span3'>"+data[2][a]['pointname']+"</span>";
								if(parseInt(data[2][a]['orderid'])>100){
									out+="							<span class='span1'>訂單號碼："+data[2][a]['orderid']+"</span>";
								}else{
									out+="							<span class='span1'></span>";
								}
								out+="						  </div>\n";
								out+="                        <div class='clr'></div>\n";
								out+="                    </div>\n";
							}
						}
						out+="                    <div class='formline'>\n";
						out+="                    </div>\n";
						popbase("貢獻值紀錄",out,"");
					}
				});
			}else if($(this).data("val")==3){
				popmember();
			}else if($(this).data("val")==4){
				popprivacy();
			}else if($(this).data("val")==5){
				popcontactus();
			}else if($(this).data("val")==6){//登出
				curpage="wallpage";
				//要更新後台
				var tempvals=Array('tretete86758456','');
				tempitem=ajaxarr("mem_logoff",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						sessionStorage.setItem("member",'');//更新
						sessionStorage.setItem("userid",'') ;
						sessionStorage.setItem("key",'') ;
						sessionStorage.setItem("point010",'');//更新
						sessionStorage.setItem("point012",'');//更新
						sessionStorage.setItem("point014",'');//更新
						//sessionStorage.setItem("gameselect",'');//更新
						localStorage.removeItem("gameselect");
						localStorage.removeItem("re_userid");
						localStorage.removeItem("re_key");
						localStorage.removeItem("re_time");

						//showpage(1);
						location.reload();
					}
				});

			}else if($(this).data("val")==7){//手機認證
				pop_vform();
			}
			$("#rightmenuwrap").hide();
			$(".showrightmenu").children(".fachanger").removeClass("fa-caret-up");
			$(".showrightmenu").children(".fachanger").addClass("fa-caret-down");
		});

		//FB相關
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
		window.fbAsyncInit = function() {
			chkfb=1;
			FB.init({
			  appId      : fbid,
			  xfbml      : true,
			  version    : 'v2.8',
			  frictionlessRequests : true
			});
			$("body").delegate(".fbclick","click",function(e){
				var me=$(this);
				var trem=$("#"+$(this).data("type")+"form .formfield");
				popclose();
				//var tempvals=Array("3");//建立授權接口
				//tempitem=ajaxarr("mem_login",tempvals,"ajax.php");
				//tempitem.success(function(data){//回傳 data 義
				//		var fbcode=data[0];
						FB.login(function(response) {
							if(response.authResponse) {
								access_token = response.authResponse.accessToken; //get access token
								var xfbid = response.authResponse.userID; //get FB UID
									var tempvals=Array("3");//建立授權接口
									tempitem=ajaxarr("mem_login",tempvals,"ajax.php");
									tempitem.success(function(data){//回傳 data 義
										var fbcode=data[0];
										FB.api('/me?fields=birthday,email,name', function(response) {
											fbname=response.name;
											fbmail=response.email;
											fbbirth=response.birthday;
											if(me.data("type")=="link"){//登入串聯
												setTimeout(function(){
													poploginap(xfbid,fbname,fbmail,fbbirth);
												},500);
											}else if(me.data("type")=="rlink"){//註冊串聯
												setTimeout(function(){
													popregisterap(xfbid,fbname,fbmail,fbbirth);
												},500);
											}else if(me.data("type")=="login"){// fb 登入
											//	var trem=$("#"+$(this).data("type")+" .formfield");
												var tempvals=Array("2",xfbid,fbname,fbmail,fbbirth,fbcode);

												tempitem=ajaxarr("mem_login",tempvals,"ajax.php");
												tempitem.success(function(data){//回傳 data 義
													if(data[0]=="ERR"){
														popnotice(data[1]);
														popregister();
													}else if(data[0]=="OKFB"){
														if(trem.eq(3).is(':checked')){
															var d = new Date();
															var n = d.getTime();
															localStorage.setItem("re_userid",data[2]);
															localStorage.setItem("re_key",data[3]);
															localStorage.setItem("re_time",n+86400*30000);
														}
														chk_mem(data[1]);
													}else{
														popnotice("登入成功！");
														//20180911 Pman 客戶要求修改文案
														$(".hwrap").show();
														$("#friendsearchbox").show();
														if(trem.eq(3).is(':checked')){
															var d = new Date();
															var n = d.getTime();
															localStorage.setItem("re_userid",data[2]);
															localStorage.setItem("re_key",data[7]);
															localStorage.setItem("re_time",n+86400*30000);
														}
														sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
														sessionStorage.setItem("userid",data[2]) ;
														sessionStorage.setItem("key",data[3]) ;
														sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
														sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
														sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
														showpage(1);
														refreshchk();
														popclose();
														if(data[1]['phonev']=="0"){
															setTimeout(function(){
																popclose();
																pop_vrequest();
															},3000);
														}
													}
												});
											}
										});
									});
							}
						}, {scope: 'email,user_birthday'});
				//});
			});
		}
		//變更個人資料
		$("body").delegate(".aboutclick","click",function(e){
			e.preventDefault();
			me=$(this);
			x=$(this).data("name");
			if(x!="gamedel"){
				var myval =$("#"+x+"form").val();
				myval = myval .replace(/\s*$/,"");
				$("#"+x+"form").val(myval);
				if(x=="name" && myval.length>0 ){//暱稱
					var m = encodeURIComponent(myval).match(/%[89ABab]/g);
					if(m){
						m2=m.length/2
					}else{

						m2=0;
					}

					alllength=myval.length+m2;//m算出中文總寬..2倍的英文..所以加一半
					if(alllength>28 ){
						popnotice("暱稱太長,容許28英數字或14中文字");
						return false;
					}
				}else if(x=="name"){
					popnotice("暱稱不得空白");
					return false;
				}

			}
			y2="";
			if(x=="addgame"){
				y=myval;
				y2=$("#"+x+"note").val();
			}else if(x=="gamedel"){
				y=$(this).data("id");
			}else{
				y=myval;
				if(y){
				}else{
					y=$("."+x+"form:checked").val();
				}
			}
			update_myshow(x,y,me,y2);//更換顯示 在 ajax
		});
		//回應另一個回應
		$("body").delegate(".replyclick","click",function(e){
			var me=$(this);
			var rebox=me.parents(".mainitemreply").find(".replyspeakbox");
			rebox.find(".replyspeakinsert").html('');
			rebox.find(".replyspeakinsert").html("<span class='replytonamebox'>"+me.data('name')+"</span>");
			rebox.find(".replyto").val(me.data("id"));
			rebox.find(".replynow").focus();
		});
		//確認更換圖片
		$("body").delegate(".clickconfirm","click",function(e){
			var me=$(this);
			if(me.data("type")=="headpic"){
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadheadc",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						//更新 session
						mem=JSON.parse(sessionStorage.getItem("member"));
						mem['headpic']=cdata;
						sessionStorage.setItem("member",JSON.stringify(mem));//更新
						me.remove();
						show_afterloginhead();//重新顯示人物資料
					}
				});
			}else if(me.data("type")=="frontpic"){
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("val"));
				tempitem=ajaxarr("uploadfrontc",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						//更新 session
						mem=JSON.parse(sessionStorage.getItem("member"));
						mem['frontpic']=me.data("val");
						sessionStorage.setItem("member",JSON.stringify(mem));//更新
						$(".clickconfirm").remove();
					}
				});
			}else if(me.data("type")=="frontpiccancel"){
				$("#frontpicitem").attr("src",me.data("val"));
				$("#frontpicitem").show();
				$(".clickconfirm").remove();
			}
		});
		//隱藏img
		$("body").delegate(".imgover","click",function(e){
			$(this).hide();
		});
		//copy to clipboard
		$("body").delegate(".copytoclip","click",function(){
			var target=$($(this).data("target"));
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val(target.text()).select();
			document.execCommand("copy");
			$temp.remove();
			//alert("連結已複製至剪貼簿");
			alert("複製成功！"); //20180904 Pman 客戶要求修改
			//copyToClipboard($(this).data("target"))
		});
		// 跳出相片
		$("body").delegate(".popimgclick","click",function(e){
			var temp=$(this).data('type');
			if(temp=="chat"){
				var tem=$(this).children("img").attr("src").split("uploadfile/")[1];
				popimg(tem,'','','');
			}else if(temp=="self"){
				var tem=$(this).data("val");
				popimg(tem,'','','');
			}else{
				var tempvals=Array("1",$(this).data('val'),$(this).data('type'));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
				tempitem=ajaxarr("getpics",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						popimg(data[1],data[2],data[3],temp);
					}
				});
			}
		});
		//動態牆顯示全部
		$("body").delegate(".newstextmore","click",function(e){
			$(this).parents(0).css("height","auto");
			$(this).remove();
		});
		//QA跳出相片
		$("body").delegate(".qnapics","click",function(e){
			var temp=$(this).attr('src');
			popimgsimple(temp);
		});

		//跳出會員條款
		//$("body").delegate(".agreemember","click",function(e){
		//	popmember();
		//});
		//headpic顯示 edit icon
		$("body").delegate("#mypageheadwrap","mouseenter",function(e){
			$(".profileimgclickb").show();
		});
		$("body").delegate("#mypageheadwrap","mouseleave",function(e){
			$(".profileimgclickb").hide();
		});
		//### 排行榜 ###
		$("body").delegate("#monthselect","change",function(e){
			show_centerranklistin($("#gamelistwrap").data("ranktype"),$(this).val(),$("#gamelistwrap").data("type"));
		});
		$("body").delegate(".monthselectb","click",function(e){
			show_centerranklistin($("#gamelistwrap").data("ranktype"),$(this).data("m"),$("#gamelistwrap").data("type"));
		});
		//選單
		$("body").delegate(".leftrankselect","click",function(e){
			if($(this).data("type")=="subclick"){
				$(".lefttypeselect_b").removeClass("lefttypeselect_bon");
				$(this).addClass("lefttypeselect_bon");
				$(".lefttypeselect").removeClass("lefttypeselecton");
				$(".lefttypeselect").eq(2).addClass("lefttypeselecton");
				show_centerranklistin('9','',$(this).data("id"));
			}else if($(this).data("type")=="open"){
				if($(this).hasClass("on")){
					$(this).removeClass("on");
					$("#leftsub1").slideUp(500);
					$(this).removeClass("lefttypeselecton");
					$(this).parents(".rollbar-content").css("top",0);
				}else{
					$(this).addClass("on");
					$("#leftsub1").slideDown(500);
					$(".lefttypeselect").removeClass("lefttypeselecton");
					$(this).addClass("lefttypeselecton");
				}
			}else{
				$(".lefttypeselect_b").removeClass("lefttypeselect_bon");
				$(".lefttypeselect").removeClass("lefttypeselecton");
				$(this).addClass("lefttypeselecton");
				show_centerranklistin($(this).data("val"),'','');
			}
		});
		// index 特殊拉動上下左右
		$("#arrup").click(function(){
			$('html, body').stop().animate({scrollTop:0},800);
		});
		// ########### header 上功能 #####################
		//關閉所有pop
		$("#mainwrap, #mainright,#mainleft").click(function(){
			if(popon==1){
				popreturn();
				$(".headpop").hide();
				$(".fachanger").removeClass("fa-caret-up");
				$(".fachanger").addClass("fa-caret-down");
			}
		});
		//通知開啟/關閉---按開後就消去未閱讀
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
				//$(".headpop").hide();
				$(".showrightmenu").children(".fachanger").removeClass("fa-caret-up");
				$(".showrightmenu").children(".fachanger").addClass("fa-caret-down");
				$("#rightmenuwrap").hide();
				//清掉通知
				$(this).children("span").html('');
				//送去ajax
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("type"));// 類別,ID
				tempitem=ajaxarr("clr_notice",tempvals,"ajax.php");
				tempitem.success(function(data){//回傳 data 義
				});
				get_navpop($(this).data("type"),0);//AJAX.JS
				//$(this).siblings(".hlist").show();
			}
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
		//這是動態牆特殊功能 刪除相簿..回到最初
		$("body").delegate(".returnmeclick","click",function(){
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));// 類別,ID
			tempitem=ajaxarr("returnme",tempvals,"ajax.php");
			tempitem.success(function(data){//回傳 data 義
				if(data[0]=="ERR"){
					popnotice(data[1]);
				}else{
					$("#newstitlewrapx").hide();
					$("#newsformfilebox").html("");
					$("#newsformfilename").val("");
					$("#newsformfiletype").val("");
				}
			});
		});
		//######## 檢舉 / 收藏  /  刪除 ###################
		$("body").delegate(".maintemselect","click",function(){
			var me=$(this);
			var thistype=$(this).data("type");
			var thisval=parseInt($(this).data("val"));
			var thisid=$(this).data("id");
			var thisjob=$(this).data("job");
			if(thisval==1){
				popreport(thistype,thisid);
				lastme=me;
				/*
				if(window.confirm("確認要檢舉嗎?")) {

					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,thistype,thisid);// 類別,ID
					tempitem=ajaxarr("reactions",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							popnotice(data[1]);
							me.parents(".delhide").remove();
							me.parent(".mainitemtitleselectlist").hide();
							me.parent(".mainitemtitleselectlist").siblings(".mselectclick").removeClass("fa-chevron-up");
							me.parent(".mainitemtitleselectlist").siblings(".mselectclick").addClass("fa-chevron-down");
							me.addClass("fa-chevron-down");
						}else{
							me.parents(".delhide").remove();
							popnotice("資料已經送至版主,謝謝您協助我們打造更好的未來");
						}
					});
				}
				*/
			}else if(thisval==99){
				//if(window.confirm("確認要檢舉嗎?")) {
				if(window.confirm("是否送出檢舉？")) {	//20190904 Pman 客戶要求修改
					if($("#reporttext").val()){
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"1",thistype,thisid,$("#reporttext").val());// 類別,ID
						tempitem=ajaxarr("reactions",tempvals,"ajax.php");
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								popclose();
								setTimeout(function(){
									popnotice(data[1]);
									lastme.parents(".delhide").remove();
									lastme.parent(".mainitemtitleselectlist").hide();
									lastme.parent(".mainitemtitleselectlist").siblings(".mselectclick").removeClass("fa-chevron-up");
									lastme.parent(".mainitemtitleselectlist").siblings(".mselectclick").addClass("fa-chevron-down");
									lastme.addClass("fa-chevron-down");
								},600);
							}else{
								 popclose();
								lastme.parents(".delhide").remove();
								popnotice("資料已經送至版主,謝謝您協助我們打造更好的未來");
							}
						});
					}else{
						alert("請輸入檢舉原因");
					}
				}
			}else if(thisval==2){
				//if(window.confirm("確認要收藏嗎?")) {
				if(window.confirm("是否確認收藏？")) {	//20190904 Pman 客戶要求修改
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,thistype,thisid);// 類別,ID
					tempitem=ajaxarr("reactions",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							popnotice(data[1]);
						}else{
							me.parent(".mainitemtitleselectlist").hide();
							me.parent(".mainitemtitleselectlist").siblings(".mselectclick").removeClass("fa-chevron-up");
							me.parent(".mainitemtitleselectlist").siblings(".mselectclick").addClass("fa-chevron-down");
							//popnotice("資料已經收藏");
							popnotice("收藏成功！");//20190904 Pman 客戶要求修改
						}
					});
				}
			}else if(thisval==3){

				//if(window.confirm("是否確認刪除？提醒您，刪除後將無法回復")) {
				if(window.confirm("刪除將無法復原，是否刪除？")) {//20190904 Pman 客戶要求修改
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,thistype,thisid);// 類別,ID
					tempitem=ajaxarr("reactions",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							popnotice(data[1]);
						}else{
							if(thisjob=="c"){
								show_centerarc(2);
							}else{
								if(me.data("type")=="qna"){
									me.parents(".mainitem").remove();
									show_afterloginhead();//重新顯示人物資料
								}else if(me.data("type")=="article"){
									curpage="mypage";
									history.pushState({page:curpage}, '', "?page="+curpage);//history
									$('html, body').stop().animate({scrollTop:0},100);
									var dd="";
									showpage("3",dd);
								}else if(me.data("type")=="wallreply"){
									me.parents(".mcreplyitem").remove();
								}else{
									me.parents(".delhide").remove();
								}
							}
						}
					});
				}
			}else if(thisval==4){//編輯--三個地方有-動態牆/攻略/QA
				if($(this).data("type")=="wall"){
					var thisOpentype=$(this).data("open"); //20190416 Pman 取得opentype
					console.log("open:"+thisOpentype);
					$(this).hide();
					var tempa=$(this).parents(".mainitemtitle").siblings(".mainitemcontent").children(".mainitemcontenttop").children(".newsfilebox").html();
					var temp=$(this).parents(".mainitemtitle").siblings(".mainitemcontent").children(".mainitemcontenttop").children(".newstextbox");
					var xx=temp.html();
					var xx2=xx.split("<div class=\"newsfilebox\">")[0];
					if($(this).parents(".mainitem").children(".mainitemcontent").children(".mainitemcontenttop").children(".newstextbox").height()=="205"){
						xx2=xx2.replace('<div class="newstextmore">......繼續閱讀</div>','');
						$(this).parents(".mainitem").children(".mainitemcontent").children(".mainitemcontenttop").children(".newstextbox").css("height","auto");
					}
					var tempb=br2nl(xx2);
					//20190328 Pman 預計加入觀看權限的變更功能
					var sltOpenType="";//20190416 Pman 新增處理隱私設定
					sltOpenType+="<option value='1'"+((thisOpentype==1)?"selected='selected'":"")+">公開</option>";
					sltOpenType+="<option value='2'"+((thisOpentype==2)?"selected='selected'":"")+">僅限朋友</option>";
					sltOpenType+="<option value='3'"+((thisOpentype==3)?"selected='selected'":"")+">僅限本人</option>";

					temp.html("<textarea class='inserttext'>"+tempb+"</textarea><input name='submit' class='insertclick submitclick border5' type='submit' value='更新' data-type='newsformin' data-id='"+thisid+"' ><div id='q_openbox_edit'><select name='q_open_edit' id='q_open_edit' class='' style='/*display: none;*/'>"+sltOpenType+"</select></div><div class='clr'></div>");
				}else if($(this).data("type")=="qna"){
					if($(this).parents(".mainitemtitle2").length>0){//尚未有結果
						$(this).hide();
						var tempa=$(this).parents(".mainitemtitle2").siblings(".mainitemcontent").children(".mainitemcontenttop").children(".newsfilebox").html();
						var temp=$(this).parents(".mainitemtitle2").siblings(".mainitemcontent").children(".mainitemcontenttop").children(".newstextbox");
						var tempt=$(this).parents(".mainitemtitletext").find(".qatitlewrap");
						var tempm=$(this).parents(".mainitem").find(".storeitemlikes2").children("span").eq(1);
						var xx=temp.html();
						var xx2=xx.split("<div class=\"newsfilebox\">")[0];
						var tempb=br2nl(xx2);
						temp.html("<textarea class='inserttext' style='width:98%;height:150px;'>"+tempb+"</textarea><input name='submit' class='insertclick submitclick border5' type='submit' value='更新' data-type='qnaformin' data-id='"+thisid+"'><div class='clr'></div>");
						tempt.html("<input type=text class='qnatemptitle' value='"+tempt.text()+"'>");
						tempm.html("<input type=text class='qnatempmoney' value='"+tempm.text()+"'>");
					}else if($(this).parents(".mainitemtitle1").length>0){//已經有結果
						popnotice("已有正解之文章無法編輯");
					}
				}else if($(this).data("type")=="article"){
					curpage="mypage";
					topnavchange(curpage,3);
					show_centerpublish(thisid);
				}
			}else if(thisval==5){// QNA 追蹤-
				set_qaalso(me,$(this).data("id"));//在 ajax
			}else if(thisval==9){// 分享
				popshare($(this).data("type"),$(this).data("id"));
			}
			if(me.data("type")=="wallreply"){
				me.parents(".mcreplytitleselectlist").hide();
				me.parents(".mcreplytitleselectlist").siblings(".mselectclick").removeClass("fa-chevron-up");
				me.parents(".mcreplytitleselectlist").siblings(".mselectclick").addClass("fa-chevron-down");
			}else{
			me.parents(".mainitemtitleselectlist").hide();
			me.parents(".mainitemtitleselectlist").siblings(".mselectclick").removeClass("fa-chevron-up");
			me.parents(".mainitemtitleselectlist").siblings(".mselectclick").addClass("fa-chevron-down");
			}
		});
		//########### 網站幣相關 ######################
		//#### 按 bgip的行為 ######
		$("body").delegate(".bgip,.qnap ","click",function(){
			var me=$(this);
			if(me.hasClass("noclick")){//disable
			}else if(me.data("type")=="qnalike"){
				if(me.data("val") && me.data("val")=="maker"){
					//if(window.confirm("選擇這個答案為最佳答案?請注意選擇後無法更改")){
					if(window.confirm("選擇後將無法更改，是否選擇此回答為最佳解答？")){//20190904 Pman 客戶要求修改
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("key"),me.data("id"));// 類別,ID
						tempitem=ajaxarr("givepoint",tempvals,"ajax.php");
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								popnotice(data[1]);
							}else{
								popnotice(data[1]);
								show_afterloginhead();//重新顯示人物資料
								if(me.data("val")=="maker"){
									me.parents(".mcreplyqna").html("<span class='qnapwin'>最佳正解</span>");
								}else{
									me.addClass("qnapoff");
									me.removeClass("qnap");
									me.data("type","");
									me.data("id","");
									cp=parseInt(me.siblings(".qnaptext").text());
									me.siblings(".qnaptext").text(cp+1);
								}
							}
						});
					}
				//}else if(window.confirm("是否確認投票支持這個回答？")){
				}else if(window.confirm("確認支持這個回答？")){//20190904 Pman 客戶要求修改
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("key"),me.data("id"));// 類別,ID
					tempitem=ajaxarr("givepoint",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							popnotice(data[1]);
						}else{
							popnotice(data[1]);
							show_afterloginhead();//重新顯示人物資料
							if(me.data("val")=="maker"){
								me.parents(".mcreplyqna").html("<span class='qnapwin'>最佳正解</span>");
							}else{
								me.addClass("qnapoff");
								me.removeClass("qnap");
								me.data("type","");
								me.data("id","");
								cp=parseInt(me.siblings(".qnaptext").text());
								me.siblings(".qnaptext").text(cp+1);
							}
						}
					});
				}
			}else{
				if(window.confirm("給予貢獻值表示支持?")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("id"));// 類別,ID
					tempitem=ajaxarr("givepoint",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							popnotice(data[1]);
						}else{
							if(me.data("type")=="news"){
								sessionStorage.setItem("point010",JSON.stringify(data[1]));//更新
								me.parents(0).siblings(".newslikeboxwrap").children(".newslikebox").html(data[2]);
								me.siblings(".newspointsbox").html(data[3]);

							}else if(me.data("type")=="newsreply"){
								sessionStorage.setItem("point012",JSON.stringify(data[1]));//更新
							}
							show_afterloginhead();//重新顯示人物資料
							me.addClass("bgipoff");
							me.removeClass("bgip");
							me.data("type","");
							me.data("id","");

						}
					});
				}
			}
		});
		//########## 登入相關 ##################################
		//登入登出
		$("body").delegate(".loginclick","click",function(){
			if($(this).attr("type")=="ap"){
				popclose();
				setTimeout(function(){
					poploginap();
				},500);
			}else{
				poplogin();
			}
		});
		//註冊
		$("body").delegate(".registorclick","click",function(){
			if($(this).data("type")=="ap"){
				popclose();
				setTimeout(function(){
					popregisterap();
				},500);
			}else{
				popregister();
			}
		});
		$("body").delegate("#aggrementclick","click",function(){
			popmember();
		});
		$("body").delegate("#privacyclick","click",function(){
			popprivacy();
		});
		//忘記密碼
		$("body").delegate(".foregclick","click",function(e){
			e.preventDefault();
			popclose();
			popforget();
		});
		// ############ 搜尋 #############################
		$("body").delegate(".searchsubmit","click",function(e){
			key=$(this).siblings(".searchtext").val();
			if($(this).data("type")=="article"){

				get_centerarticlelist(curtab,1,key);
			}else if($(this).data("type")=="arc2"){
				get_centerarclist(2,1,key);
			}
		});
		$("body").delegate(".searchtext","keyup",function(e){
			if(e.which == 13 ) {
				key=$(this).val();
				get_centerarticlelist(curtab,1,key);
			}
		});
		// ########### 換頁 #############################
		$("body").delegate(".inpageclick","click",function(e){
			if($(this).data("type")=="article"){
				if($(this).data("pg")){
					var mypg=$(this).data("pg");
					sessionStorage.setItem("actPG",$(this).data("pg")); //20190730 Pman 點選頁數時，設定參數值
				}else{
					sessionStorage.setItem("actPG","1"); //20190730 Pman 重置參數值為1
					mypg=1;
				}
				console.log("curtab:"+curtab);
				console.log("mypg:"+mypg);
				console.log("data_s:"+$(this).data("s"));
				get_centerarticlelist(curtab,mypg,$(this).data("s"));
			}else if($(this).data("type")=="arc2"){
				if($(this).data("pg")){
					var mypg=$(this).data("pg");
				}else{
					mypg=1;
				}
				get_centerarclist(2,mypg,$(this).data("s"));
			}else if($(this).data("type")=="myarticle"){
				if($(this).data("pg")){
					var mypg=$(this).data("pg");
				}else{
					mypg=1;
				}
				show_mypagearticlein($(this).data("m"),$(this).data("val"),$(this).data("s"),mypg);
			}
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
					radioval=$("#orderform input[name=pickup]:checked").val();

                                        //確認是否要歐付寶支付
                                        var isOpay = false;
                                        if($('#orderform [name=discount]').length > 0) {
                                            isOpay = true;
                                            var pointLimit = parseInt($('#orderform [name=discount]').attr('pointLimit'));
                                            var discount = parseInt($('#orderform [name=discount]').val());
                                            if(pointLimit != -1 && discount > pointLimit) {
                                                alert('輸入的折扣點不得高於'+ pointLimit);
                                                passme=0;
                                            }
                                            var price = parseInt($($('.storeitemlikes .fL')[0]).text());
                                            if(discount >= price && passme == 1) {
                                                alert('輸入的折扣點不得高於商品價格');
                                                passme=0;
                                            }
                                            var playerPoints = parseInt($('#leftpeopleinfo .bgipoff').parent().text());
                                            if(discount > playerPoints && passme == 1) {
                                                alert('輸入的折扣點不得高於持有點數');
                                                passme=0;
                                            }
                                            if(passme == 0)
                                                return false;
                                            radioval = 0;
                                        }
					if(passme==1){
						me=$(this);
						me.parents(".formitem").append("<div id='tempcover' style='position:absolute;top:0;left:0;width:100%;height:100%;z-index:99;text-align:center;'><img src='img/loaderys.gif' style='margin:5px auto;'></div>");
						radioval=$("#orderform input[name=pickup]:checked").val();
						mylistb=$(".formfield");
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylistb.eq(0).val(),mylistb.eq(1).val(),mylistb.eq(2).val(),mylistb.eq(3).val(),mylistb.eq(4).val(),radioval,mylistb.eq(5).val(),mylistb.eq(6).val());
                                                //改為所有的商品都要歐付寶支付
                                                if($('#orderform [name=discount]').length > 0) {
                                                    tempvals=Array(
                                                        sessionStorage.getItem("userid"),
                                                        sessionStorage.getItem("key"),
                                                        mylistb.eq(0).val(),
                                                        mylistb.eq(1).val(),
                                                        mylistb.eq(3).val(),
                                                        mylistb.eq(4).val(),
                                                        mylistb.eq(5).val(),
                                                        radioval,
                                                        mylistb.eq(6).val(),
                                                        mylistb.eq(7).val(),
                                                        mylistb.eq(2).val(),
                                                    );
                                                }
							tempitem=ajaxarr("saveorder",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
                                                            console.log(data);
								$("#tempcover").remove();
								if(data[0]=="ERR"){
									popnotice(data[1]);
								}else{
									show_afterloginhead();
									$("#maincontentwrap").html("<div class='responsetext'>商品已成功下單，並導向支付頁面</div>");//20191231 要改為下單
                                                                        //確認是否為opay，並進行金流導向
                                                                        if(isOpay == true) {
                                                                            location.href = '/func/jumpForm.php';
                                                                        }

								}
							});
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
							var trem=$("#"+$(this).data("type")+" .formfield");
							var tempvals=Array("1",mylist.eq(2).val(),mylist.eq(0).val(),mylist.eq(1).val(),trem.eq(4).val(),trem.eq(5).val(),trem.eq(6).val(),trem.eq(7).val());
							tempitem=ajaxarr("mem_login",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
								if(data[0]=="ERR"){
									popnotice(data[1]);
									$("#codepagew").html(data[2]);
								}else{
									popnotice("登入成功！");//20180911 Pman 客戶要求修改文案
									$(".hwrap").show();
									$("#friendsearchbox").show();
									//這邊套登入相關
									if(trem.eq(3).is(':checked')){
										var d = new Date();
										var n = d.getTime();
										localStorage.setItem("re_userid",data[2]);
										localStorage.setItem("re_key",data[7]);
										localStorage.setItem("re_time",n+86400*30000);
									}
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]) ;
									sessionStorage.setItem("key",data[3]) ;
									sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
									sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
									sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
									showpage(1);
									refreshchk();
									popclose();
									if(data[1]['phonev']=="0"){
										setTimeout(function(){
											popclose();
											pop_vrequest();
										},3000);
									}
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
									popnotice(data[1]);
								}else{
									//$("#popbody").html("忘記密碼確認信已經寄至您的信箱<BR>請前往查看<BR><BR>"+$company+"敬上");
									$("#popbody").html("您的密碼已寄至您的聯絡信箱/手機"); //20180904 Pman 客戶要求要改
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
							}else if(mylist.eq(a).attr("name")=="email"){
								if(vemail(mylist.eq(a))){
								}else{
									passme=0;
								}
							}else if(mylist.eq(a).attr("name")=="nick"){
									if(vtext(mylist.eq(a),4,'',15)){
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
					for(var a=0;a<3;a++){
						if(stringBytes($(".rgnotes").eq(a).val())>60){
							passme=0;
							$(".rgnotes").eq(a).parent(".formitem").children(".formerr").show();
						}else{
							$(".rgnotes").eq(a).parent(".formitem").children(".formerr").hide();
						}
					}
					if(passme==1){
							var alllist=$("#"+$(this).data("type")+" .formfield");
							var tempvals=Array(sessionStorage.getItem("key"),mylist.eq(0).val(),alllist.eq(1).val(),alllist.eq(2).val(),alllist.eq(3).val(),alllist.eq(4).val(),alllist.eq(5).val(),alllist.eq(6).val(),alllist.eq(7).val(),alllist.eq(8).val(),alllist.eq(9).val(),alllist.eq(10).val(),alllist.eq(11).val(),alllist.eq(12).val(),alllist.eq(13).val());
							tempitem=ajaxarr("mem_actsave",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
                                                            console.log(data);
								if(data[0]=="ERR"){
									popnotice(data[1]);
								}else{
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]);
									//設定正在玩的遊戲-成感興趣的遊戲
									var tempx= new Array();
									var temp = new Object();
									temp.gameid="999999";
									temp.show="1"; //20190408 Pman 改成預設為全部看
									tempx.push(temp);
									for(b=5;b<10;b+=2){ //20190506 Pman 遊戲ID的位置取錯了，原本是寫7，應該是從5開始
										if(alllist.eq(b).val().length>0){
											var temp = new Object();
											temp.gameid=alllist.eq(b).val();
											console.log("id:"+b+">>"+alllist.eq(b).val());
											temp.show="0"; //20190408 Pman 改成預設為全部看
											tempx.push(temp);
										}
									}
									localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
									//$("#popbody").html("謝謝您的加入<BR>請稍待片刻我們替您登入<BR><BR>"+$company+"敬上");//20180904 Pman修改
									$("#popbody").html("正在登入，請稍候");

									setTimeout(function(){
										 location.href=window.page;
									},3000);
								}
							});
					}
				}else if($(this).data("type")=="regform"){//註冊
					passme=1;
					var me=$(this);
					mylist=$("#"+$(this).data("type")+" .form-control");
					mylistb=$("#"+$(this).data("type")+" .formfield");
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
							}else if(mylist.eq(a).attr("name")=="agree"){
								if(vcheckb(mylist.eq(a),'')){
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
						if(mylistb.length<7){//fb 快速註冊
							me.removeClass("submitclick");
							me.addClass("submitclicktemp");
							me.val("請稍待...");
							var tempvals=Array("2",mylistb.eq(2).val(),mylistb.eq(3).val(),mylistb.eq(4).val(),mylistb.eq(5).val(),mylistb.eq(1).val());
							tempitem=ajaxarr("mem_reg",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
								me.removeClass("submitclicktemp");
								if(data[0]=="ERR"){
									popnotice(data[1]);
									me.addClass("submitclick");
									me.val("送出");
									$("#codepagew").html(data[2]);
								}else if(data[0]=="OKFB"){//直接轉去後面程序
									popclose();

									chk_mem(data[1]);
								}
							});
						}else{
							//檢查驗證碼
							me.removeClass("submitclick");
							me.addClass("submitclicktemp");
							me.val("請稍待...");
							var tempvals=Array("1",mylist.eq(4).val(),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylistb.eq(5).val(),mylistb.eq(6).val(),mylistb.eq(7).val(),mylistb.eq(8).val(),mylistb.eq(9).val());
                                                    console.log(tempvals);
							tempitem=ajaxarr("mem_reg",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
                                                            console.log(data);
								me.removeClass("submitclicktemp");
								if(data[0]=="ERR"){
									popnotice(data[1]);
									me.addClass("submitclick");
									me.val("送出");
									$("#codepagew").html(data[2]);
								}else if(data[0]=="OKFB"){//直接轉去後面程序
									popclose();
									chk_mem(data[1]);
								}else{
									me.hide();
									$("#popbody").html("謝謝您的註冊<BR>一封信已經寄至您的信箱<BR>請前往查看<BR><BR>"+$company+"敬上");
								}
							});
						}
					}
				}else if($(this).data("type")=="contactform"){//聯絡
					passme=1;
					var me=$(this);
					mylist=$("#"+$(this).data("type")+" .form-control");
					mylistb=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylist.length;a++){
						if(mylist.eq(a).attr("name")=="name"){
							if(vtext(mylist.eq(a),1,'',200)){
							}else{
								passme=0;
							}
						}else if(mylist.eq(a).attr("name")=="email"){
							if(vemail(mylist.eq(a),'')){
							}else{
								passme=0;
							}
						}else if(mylist.eq(a).attr("name")=="title"){
							if(vtext(mylist.eq(a),1,'',20)){
							}else{
								passme=0;
							}
						}else{
							if(vtext(mylist.eq(a),1,'',1000)){
							}else{
								passme=0;
							}
						}
					}
					if(passme==1){
							//檢查驗證碼
							me.removeClass("submitclick");
							me.addClass("submitclicktemp");
							me.val("請稍待...");
							var tempvals=Array("1",mylistb.eq(0).val(),mylistb.eq(1).val(),mylistb.eq(2).val(),mylistb.eq(3).val(),mylistb.eq(4).val(),mylistb.eq(5).val(),mylistb.eq(6).val(),mylistb.eq(7).val());
							tempitem=ajaxarr("mem_contact",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
								me.removeClass("submitclicktemp");
								if(data[0]=="ERR"){
									popnotice(data[1]);
									me.addClass("submitclick");
									me.val("送出");
									$("#codepagew").html(data[2]);
								}else{
									me.hide();
									//$("#popbody").html("謝謝您對KYOMON的興趣<BR>相關人員會馬上與您聯繫<BR><BR>"+$company+"敬上");
									$("#popbody").html("您的需求已傳送,請等候相關人員與您聯繫"); //20180904 Pman 客戶要求修改
								}
							});
					}
				}else if($(this).data("type")=="newsform"){//動態牆
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylista.length;a++){
							if(mylista.eq(a).attr("name")=="newstext"){
								if(vtext(mylista.eq(a),1,'',3000)){
								}else{
									passme=0;
								}
							}
					}
					if($("#q_type").val().length>=1){
					}else{
						passme=0;
						//alert($("#q_type").val());
						popnotice('請選擇遊戲');
					}//20180918 Pman 重新開啟標籤必選
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,title,content,picid,pictype,tag
								$("#newstext").val(escape($("#newstext").val())); //20190321 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),$("#q_type").val(),$("#q_open").val());
								tempitem=ajaxarr("uploadnews",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										mylist.val('');
										$("#q_type").val('').trigger("chosen:updated");
										$("#q_open").val('1').trigger("chosen:updated");
										$("#newsformfilebox").html('');
										$("#q_typewrap").html('');
										$("#newstext").css("height",60);
										get_centerwalllist(curtab);//重新抓動態強
										show_afterloginhead();//重新顯示人物資料
										$("#q_typebox").show();
										$("#newstitlewrapx").hide();
									}
								});
							}else{
								popnotice("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="albumform"){//動態牆
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylista.length;a++){
							if(mylista.eq(a).attr("name")=="newstext"){
								if(vtext(mylista.eq(a),1,'',3000)){
								}else{
									passme=0;
								}
							}
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,title,content,picid,pictype,tag
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),$("#q_type").val(),$("#q_open").val());
								tempitem=ajaxarr("uploadnews",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										//$("#albuminputwrapx").hide();
										// mylist.val('');
										//$("#q_type").val('').trigger("chosen:updated");
										//$("#q_open").val('1').trigger("chosen:updated");
										//$("#newsformfilebox").html('');
										//$("#q_typewrap").html('');
										//$("#newstext").css("height",60);
										//重新抓取相簿
										show_mypagephoto(sessionStorage.getItem("userid"),'2');

										//get_centerwalllist(curtab);//重新抓動態強
										//show_afterloginhead();//重新顯示人物資料
										//$("#q_typebox").show();
										//$("#newstitlewrapx").hide();
									}
								});
							}else{
								popnotice("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="albumupform"){//相簿更新
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylista.length;a++){
							if(mylista.eq(a).attr("name")=="newstext"){
								if(vtext(mylista.eq(a),1,'',3000)){
								}else{
									passme=0;
								}
							}
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),$("#q_open2").val(),$("#albeditform").data("id"));
								tempitem=ajaxarr("uploadnewsalb",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										//重新抓取相簿
										show_mypagephoto(sessionStorage.getItem("userid"),'2');
									}
								});
							}else{
								popnotice("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="newsformin"){//動態牆文字編輯
					passme=1;
					thisval=$(this).siblings(".inserttext").val();
					var me=$(this);
					if(thisval.length>0){
					}else{
						thisval=" ";
					}
					console.log("cc:"+$("#q_open_edit").val());
					if(passme==1){
						$(this).parents(".mainitem").find(".maintemselect").show();//回頭顯示選項
						//檢查驗證
						thisval=escape(thisval); //20190321 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
						if(sessionStorage.getItem("userid")){
							nID=$(this).data("id"); //20190702 Pman 目前在進行編輯的data-id
							var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,$(this).data("id"),$("#q_open_edit").val());//20190416 Pman 新增opentype的資料
							tempitem=ajaxarr("uploadnewsin",tempvals,"ajax.php");
							tempitem.success(function(data){//回傳 data 義
								if(data[0]=="ERR"){
									popnotice(data[1]);
								}else{
									
									//console.log("IDD:"+nID);
									//console.log($(".maintemselect[data-id='"+nID+"'][data-open]").data("open"));
									$(".maintemselect[data-id='"+nID+"'][data-open]").attr("data-open",$("#q_open_edit").val()) //20190416 Pman 變更後修正選單上的opne參數 //20190702 Pman 修正data-id指定錯誤的問題
									$(".maintemselect[data-id='"+nID+"'][data-open]").data("open",$("#q_open_edit").val()); //20190702 Pman 修正送出後，重新點「編輯」，讀data-open資料沒變的問題。因為.attr()與.data()，寫入的目標不同
									var tempme=me.parents(".newstextbox");
									tempme.html(nl2brs(thisval));
									if(tempme.height()>347){
										tempme.css("height",347);			//要調整「閱讀更多」的顯示條件，除這邊之外，還要去調整「編輯功能」那邊的設定，編輯時才不會出錯。 ==> Pman
										tempme.append('<div class="newstextmore">......繼續閱讀</div>');
									}
								}
							});
						}else{
							popnotice("已登出,請重新登入");
						}
					}else{
						popnotice("請填寫些什麼吧!");
					}
				}else if($(this).data("type")=="articleform"){//攻略
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylista.length;a++){
						if(vtext(mylista.eq(a),2,'',50)){

						}else{
							popnotice("標題字數請介於2~50個中文字"); //20190412 Pman 顯示標題字數的錯誤訊息
							passme=0;
						}
					}
					var articles=tinyMCE.activeEditor.getContent();
					if(articles.length<30){
						popnotice("攻略請最少輸入30字");
						passme=0;
					}else if(articles.length>200000){ //攻略文章的長度限制
						popnotice("攻略內容太長,請減少");
						passme=0;
					}
					//popnotice("總字數:"+articles.length);
					var myopen=0;
					if(mylist.eq(3).is(":checked")){
						myopen=1;
					}else{
						myopen=2;
					}
					//console.log(mylist.eq(1).val());
					if(mylist.eq(1).val()==""){ //20190411 Pman 補上發布攻略時的標籤檢查
						popnotice("請選擇遊戲標籤！");
						passme=0;
					}


					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,title,content,picid,pictype,tag
								$("#articlepubwrap").append("<div class='loaderbox fixer'><img src='img/loaderd.gif'></div>");
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),articles,myopen,mylist.eq(5).val());
								tempitem=ajaxarrpost("uploadarticletext",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else if(data[0]=="OK2"){
										popnotice("修改已經儲存完畢");
										show_mypageall("3",'',1)
									}else{
										if(myopen==2){
											popnotice("儲存草稿成功！");
											show_mypageall("3x",'',2)
										}else{
											curpage="wallpage";
											showpage();
										}
									}
								});
							}else{
								popnotice("已登出,請重新登入");
							}
					}else{
					}
				}else if($(this).data("type")=="qnaform"){//QNA問題
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylista.length;a++){
							if(mylista.eq(a).attr("name")=="newstext"){
								if(vtext(mylista.eq(a),1,'',3000)){
								}else{
									passme=0;
								}
							}else{
								if(vtext(mylista.eq(a),2,'',30)){
								}else{
									passme=0;
								}
							}
					}
					if($("#q_qty").val()==""){
						passme=0;
						popnotice("請輸入獎勵貢獻值");
					}else if(parseInt($("#q_qty").val())<=0){
						passme=0;
						popnotice("懸賞貢獻值需大於0");
					}else{
						t=parseInt($("#q_qty").val());
						$("#q_qty").val(t);
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,title,content,picid,pictype,tag
								$("#newstitle").val(escape($("#newstitle").val())); //20190321 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
								$("#newstext_q").val(escape($("#newstext_q").val())); //20190321 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),$("#q_qty").val(),$("#q_type").val());
								tempitem=ajaxarr("uploadqna",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										//popnotice("貢獻值已預先扣除,如刪除問題或修改問題時會調整扣除貢獻值");
										popnotice("發問獎勵貢獻值已扣除，無人回答時可調整內容及貢獻值，若長時間無人回答，問題將刪除並返還貢獻值");//20190904 Pman 客戶要求修改
										mylist.val('');
										$("#newsformfilebox").html('');
										$("#q_typewrap").html('');
										$("#q_type").val('').trigger("chosen:updated");
										$("#q_qty").val('');
										$("#q_typebox").show();
										$("#newstext_q").css("height",60);
										get_centerqnalist(curtab);//重新抓動態強
										show_afterloginhead();//重新顯示人物資料
									}
								});
							}else{
								popnotice("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="qnaformin"){//QNA問題文字編輯
					$(this).parents(".mainitem").find(".maintemselect").show();
					passme=1;
					thisval=$(this).siblings(".inserttext").val();
					thistitle=$(this).parents(".mainitem").find(".qnatemptitle").val();
					thismoney=$(this).parents(".mainitem").find(".qnatempmoney").val();
					var me=$(this);
					if(thisval.length>0){
						if(parseInt(thismoney)<=0){
							passme=0;
							popnotice("貢獻值額需大於0");
						}else{
							t=parseInt(thismoney);
							$(this).parents(".mainitem").find(".qnatempmoney").val(t);
						}
					}else{
						passme=0;
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								thisval=escape(thisval); //20190322 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
								thistitle=escape(thistitle); //20190322 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,$(this).data("id"),thistitle,thismoney);
								tempitem=ajaxarr("uploadqnain",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										me.parents(".mainitem").find(".qatitlewrap").text(unescape(thistitle)); //20190322 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
										me.parents(".mainitem").find(".storeitemlikes2").children("span").eq(1).text(thismoney);
										me.parents(".newstextbox").html(nl2brs(thisval));
										show_afterloginhead();//重新顯示人物資料
									}
								});
							}else{
								popnotice("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="vform"){//顯示簡訊pop
					if($("#popu").length>0){popcloseu();}
					if($("#pop").length>0){popclose();}
						setTimeout(function(){
							pop_vform();
						},800);
				}else if($(this).data("type")=="sendmes"){//發簡訊
					var me=$(this);
					if(vpflag=="" && $(this).siblings(".vcont").val()!=""  && $(this).siblings(".vphone").val()!=""){
						vpflag=1;
						var tempcnt=60
						var tempbk=setInterval(function(){
							if(tempcnt<=0){
								clearInterval(tempbk);
								me.removeClass("bgcolor_lb");
								me.val("發送簡訊");
								vpflag="";
							}else{
								me.val("請等待("+tempcnt+")");
								tempcnt=tempcnt-1;
							}
						},1000);
						var tempvals=Array($(this).siblings(".vcont").val(),$(this).siblings(".vphone").val());
						tempitem=ajaxarr("sendver",tempvals,"ajax.php");
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								clearInterval(tempbk);
								me.removeClass("bgcolor_lb");
								me.val("發送簡訊");
								vpflag="";
								popnotice(data[1]);
							}else{
								popnotice("認證碼已寄送至您的手機，請前往確認，謝謝");
							}
						});
						me.addClass("bgcolor_lb");

						//setTimeout(function(){
						//		me.removeClass("bgcolor_lb");
						//		vpflag="";
						//	},60000);
					}else if(vpflag==""){
						if($(this).siblings(".vphone").val().length<9){
							popnotice("手機號碼長度不足");
						}else{
							popnotice("國碼與手機號碼皆須填寫");
						}
					}else{
						popnotice("您需要等60秒才能再次寄送簡訊認證碼");
					}
				}else if($(this).data("type")=="vmes" || $(this).data("type")=="vmes2" ){//確認簡訊
					var me=$(this);
					if($(this).siblings(".xmmsinput").val()!=""){
						var tempvals=Array(sessionStorage.getItem("key"),$(this).siblings(".xmmsinput").val());
						tempitem=ajaxarr("chkver",tempvals,"ajax.php");
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								me.siblings(".xmmsinput").val('')
								popnotice(data[1]);
							}else{
								if($("#phonevalue").length>0){
									$("#phonevalue").html($(".vcont").val()+$(".vphone").val());
								}
								if(me.data("type")=="vmes" ){
									popclose();
								}
								me.data("type","na");//更改成別的
								me.addClass("bgcolor_lb");
								if($(".vpchanger").length>0){
									$(".vpchanger").html("更改號碼");
								}
								popnotice("您的手機已確認，謝謝");
							}
						});
					}
				}
				else{//其他的
					if($(this).hasClass("aboutclick")){
						me=$(this);
						thisval=$(this).siblings(".formfield").val();
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,$(this).data("name"));// id,key,value,coulmn
						tempitem=ajaxarr("mem_update",tempvals,"ajax.php");
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								popnotice(data[1]);
							}else{
								me.parents(".hidediv").hide();
							}
						});
					}
				}

		});
		// ##################  回復
		$("body").delegate(".replynow","keyup",function(e){
			if((e.ctrlKey && e.which == 13) || (e.shiftKey && e.which == 13) ) {
				el=this;
				text="\n";
				if (typeof el.selectionStart == "number"
						&& typeof el.selectionEnd == "number") {
					var val = el.value;
					var selStart = el.selectionStart;
					el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
					el.selectionEnd = el.selectionStart = selStart + text.length;
				} else if (typeof document.selection != "undefined") {
					var textRange = document.selection.createRange();
					textRange.text = text;
					textRange.collapse(false);
					textRange.select();
				}
			}else if(e.which == 13 ) {
				console.log("1:"+escape($(this).val()));
				temp=escape($(this).val());//20190321 將emoji內容轉碼，會連同換行符號一起轉掉，回寫
				//$(this).val($(this).val().replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,""));//20190320 Pman 濾掉emoji
				$(this).val(temp);
				temp=$(this).val();
				console.log("2:"+temp);
				tempb="3"+temp.replace(/\n/g, "");
				console.log("3:"+tempb);
				//tempb=tempb.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig,"");
				if(tempb.length>0 || $(this).siblings(".picid").val() ){
					me=$(this);
					var replaceme="";
					//檢查驗證
					var mylist=$(this).parents("."+$(this).data("type")).children(".formfield");
					if(sessionStorage.getItem("userid")){
							if($(this).data("type")=="newsformreply"){
								me.css("z-index",-1).css("opacity",0);
								me.parents("."+me.data("type")).append("<img src='img/loaderys.gif' id='temptarget' style='position:absolute;top:0;z-index:1;left:35%;'>");
								 $( "#temptarget").focus();
								gameselect=JSON.parse(localStorage.getItem("gameselect"));
								//gameselect=JSON.parse(sessionStorage.getItem("gameselect"));
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),gameselect);
								tempitem=ajaxarr("uploadnewsreply",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										me.val('');
										$(".replypcibox").html('');
										var replaceme=me.parents(".mainitem");
										var mem=JSON.parse(sessionStorage.getItem("member"));
										replaceme.html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
										var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
										tempitem=ajaxarr("show_boardone",tempvals,"ajax.php");
										tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
											if(data[0]=="ERR"){
											}else{
												a=0;
												var out="";
												out+=print_wallitem(data[0]);
												replaceme.html(out);
												run_timeitem();//跑一次
											}
										});
									}
								});
							}else if($(this).data("type")=="qnaformreply"){
								//me.css("z-index",-1).css("opacity",0); //20180904 Pman 因為未驗證手機時，轉圈圈圖不會消失，所以先移除
								//me.parents("."+me.data("type")).append("<img src='img/loaderys.gif' id='temptarget' style='position:absolute;z-index:1;top:0;left:35%;'>");//20180904 Pman 同上一個備註
								// $( "#temptarget").focus(); //20180904 Pman 同上一個備註
								gameselect=JSON.parse(localStorage.getItem("gameselect"));
								//gameselect=JSON.parse(sessionStorage.getItem("gameselect"));
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),gameselect);
								tempitem=ajaxarr("uploadqnareply",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										me.val('');
										$(".replypcibox").html('');
										var replaceme=me.parents(".mainitem");
										var mem=JSON.parse(sessionStorage.getItem("member"));
										replaceme.html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
										var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
										tempitem=ajaxarr("show_qnaone",tempvals,"ajax.php");
										tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
											if(data[0]=="ERR"){
											}else{
												a=0;
												var out="";
												out+=print_qnaitem(data[0],1);
												replaceme.html(out);
												run_timeitem();//跑一次
											}
										});
									}
								});
							}else if($(this).data("type")=="artpageformreply"){
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("id"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val());
								tempitem=ajaxarr("uploadartpagereply",tempvals,"ajax.php");
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										popnotice(data[1]);
									}else{
										show_centerartpage(data[1]);
									}
								});
							}
						}else{
							popnotice("已登出,請重新登入");
						}
				}
			}

		});
		// ############# 左邊 #######################
		//左上 搜尋會員表格
		$("body").delegate("#headsearchsubmit","click",function(e){
			if($("#headsearch").val()){
				$("#mainmidwrapinleft").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
				if(sessionStorage.getItem("userid")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$("#headsearch").val());
					tempitem=ajaxarr("searchmember",tempvals,"ajax.php");
					tempitem.success(function(data){
						if(data[0]=="ERR"){
							$("#mainmidwrapinleft").html('');
							popnotice(data[1]);
						}else{
							var out="";
							if(data[1]){
								for(var a=0;a<data[1].length;a++){
										out+=print_frienditem(data[1][a],data[1][a]['isfriend']);
								}
								curpage="matchpage";
								history.pushState({page:curpage}, '', "?page="+curpage);//history
								//window[curpage]();
								$('html, body').stop().animate({scrollTop:0},100);
								var dd=out;
								showpage("",dd);
							}
							//	$("#mainmidwrapinleft").html(out);
						}
					});
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else{
				popnotice("請輸入暱稱"); //20190424 Pman 調整文案
			}
		});
		$("body").delegate("#headsearch","keypress",function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13){
				if($("#headsearch").val()){
					$("#mainmidwrapinleft").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					if(sessionStorage.getItem("userid")){
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$("#headsearch").val());
						tempitem=ajaxarr("searchmember",tempvals,"ajax.php");
						tempitem.success(function(data){
							if(data[0]=="ERR"){
								$("#mainmidwrapinleft").html('');
								popnotice(data[1]);
							}else{
								var out="";
								if(data[1]){
									for(var a=0;a<data[1].length;a++){
											out+=print_frienditem(data[1][a],data[1][a]['isfriend']);
									}
									curpage="matchpage";
									history.pushState({page:curpage}, '', "?page="+curpage);//history
									//window[curpage]();
									$('html, body').stop().animate({scrollTop:0},100);
									var dd=out;
									showpage("",dd);
								}

								//	$("#mainmidwrapinleft").html(out);
							}
						});
					}else{
						popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
					}
				}else{
					popnotice("請填寫內容");
				}
			}
		});
		//左邊 新遊戲表格
		$("body").delegate("#addgameonlistclick","click",function(e){
			e.preventDefault();
			thisval=$("#addgameonlistselect").val();
			console.log("Gameselect:"+thisval);

			var flag=0;
			if(thisval==""){//20190416 Pman 確認是否有選擇遊戲項目
				flag=3;
			}
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
			//gameselect=JSON.parse(sessionStorage.getItem("gameselect"));
			if(gameselect.length>=6){//20190416 Pman 如果要調整可選擇的標籤數量，這裡要改
				flag=2
			}else{
				for(var a=0;a<gameselect.length;a++){
					if(gameselect[a]['gameid']==thisval){
						flag=1;
					}
				}
			}
			if(flag==0){
				var temp = new Object();
				temp.gameid=thisval;
				temp.show="1";
				gameselect.push(temp);
				for(var a=0;a<gameselect.length;a++){
					if(gameselect[a]['gameid']=="999999"){
						gameselect[a]['show']=0;
					}
				}
				localStorage.setItem("gameselect",JSON.stringify(gameselect));
				//sessionStorage.setItem("gameselect",JSON.stringify(gameselect));
				left_gameselectmenu();
				if($("#maincontentbox").data("type")=="wall"){
					get_centerwalllist(curtab);
				}else if($("#maincontentbox").data("type")=="article"){
					get_centerarticlelist(curtab,1,'');
				}else if($("#maincontentbox").data("type")=="qna"){
					get_centerqnalist(curtab,1,'');
				}
			}else if(flag==1){
				popnotice("已在名單中");
			}else if(flag==2){
				popnotice("最多只能選擇5個遊戲");
			}else if(flag==3){//20190416 Pman 沒選擇遊戲項目時出提示
				popnotice("請選擇遊戲");
			}
		})
		//左邊--表格內選項
		$("body").delegate(".leftgameselect","click",function(e){
			myval=$(this).data("val");
			mytype=$(this).data("type");
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
			//gameselect=JSON.parse(sessionStorage.getItem("gameselect"));
			flag=0;
			if(mytype=="delete"){
				if(gameselect.length>2){
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']==myval){
							gameselect.splice(a, 1);
							flag=1;
						}
					}
				}else{
					popnotice("感興趣的遊戲至少需保留一個");
				}
			}else if(mytype=="show"){
				for(var a=0;a<gameselect.length;a++){
					if(gameselect[a]['gameid']==myval){
						gameselect[a]['show']=1;
						flag=1;
					}
				}
			}else if(mytype=="hide"){
				//if(gameselect.length==1){
				//	popnotice("無其他選項時,無法關閉不分類");
				//}else{
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']==myval){
							gameselect[a]['show']=0;
							flag=1;
						}
					}
				//}
			}
			if(flag==1){//表示有改
				//開/關9999
				if(mytype=="show"){//有人開了...關掉 9999
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']=="999999"){
							gameselect[a]['show']=0;
						}
					}
				}else if(mytype=="delete"){
					if(gameselect.length==1){//刪掉所有的
						gameselect[0]['show']=1;
					}
				}else if(mytype=="hide"){
					var cct=0;
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']=="999999"){
						}else if(gameselect[a]['show']==1){
							cct=1;
						}
					}
					if(cct==0){
						for(var a=0;a<gameselect.length;a++){
							if(gameselect[a]['gameid']=="999999"){
								gameselect[a]['show']=1;
							}
						}
					}
				}
			//	for(var a=0;a<gameselect.length;a++){
			//		alert(gameselect[a]['gameid'])
			//		if(gameselect[a]['gameid']=="999999"){
			//			alert(gameselect[a]['show']);
			//		}
			//	}
				localStorage.setItem("gameselect",JSON.stringify(gameselect));
				//sessionStorage.setItem("gameselect",JSON.stringify(gameselect));
				if($("#maincontentbox").data("type")=="wall"){
					left_gameselectmenu();
					get_centerwalllist(curtab);
				}else if($("#maincontentbox").data("type")=="article"){
					left_gameselectmenu();
					get_centerarticlelist(curtab,1,'');
				}else if($("#maincontentbox").data("type")=="qna"){
					sessionStorage.setItem("qnaselect","");
					left_qnaselectmenu();
					get_centerqnalist(curtab);
				}
			}
		});
		// ################# 共用的一些行為
		//刪除預覽圖片
		$("body").delegate(".predelclick","click",function(){
			if($(this).data("job")=="newspic"){
				$(this).parents(".inblock").remove();
				$("#"+$(this).data("target")).val('');
				$("#"+$(this).data("targettype")).val('');
			}else if($(this).data("job")=="albpic"){//這是動態相片
				var me=$(this);
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadalbpicdel",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						popnotice("刪除錯誤,請上傳後再試試");
					}else if(data[0]=="ERRB"){
						popnotice("相簿最少須保持一張照片");
					}else{
						if(data[0]=="OKA"){
							if($("#addalbpicwrap").length >= 1  ){
							}else if($("#newsformfilebox .inblock").length <= 5){
								$("#newsformfilebox").children(".clr").remove();
								$("#newsformfilebox").append("<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>");
								$("#newsformfilebox").append("<div class='clr'></div>");
							}
						}else if(data[0]=="OKB"){
							if($("#addalbpicwrap").length >= 1  ){
							}else if($("#newsformfilebox .inblock").length <= 20){
								$("#newsformfilebox").children(".clr").remove();
								$("#newsformfilebox").append("<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>");
								$("#newsformfilebox").append("<div class='clr'></div>");
							}
						}
						me.parents(".inblock").remove();
					}
				});
			}else if($(this).data("job")=="albqpic"){
				var me=$(this);
				//刪除qa相簿內照片
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadalbqpicdel",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						popnotice("刪除錯誤,請上傳後再試試");
					}else{
						if($("#addalbpicwrap").length >= 1  ){
						}else if($("#newsformfilebox .inblock").length <= 5){
							$("#newsformfilebox").children(".clr").remove();
							$("#newsformfilebox").append("<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbqpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>");
							$("#newsformfilebox").append("<div class='clr'></div>");
						}
						me.parents(".inblock").remove();
					}
				});
			}
		});
		//表格填寫確認
		$("body").delegate(".form-control","keyup",function(e){
			if($(this).attr("name")=="email"){
				vemail($(this),'');
			}else if($(this).attr("name")=="name"){
				vaccount($(this),'');
			}else if($(this).attr("name")=="phone"){
				vtext($(this),7,'',13);
			}else if($(this).attr("name")=="pass"){
				vtext($(this),6,'',12);
			}else if($(this).attr("name")=="passb"){
				vtext($(this),6,'',12);
			}else if($(this).attr("name")=="title"){
				vtext($(this),2,'',50);//20190412 Pman 攻略標題長度改為50
			}else if($(this).attr("name")=="newstext"){
				vtext($(this),10,'',3000);
			}else{
				vtext($(this),1,'',300);
			}
		});
		//隱藏表格顯示
		$("body").delegate(".editprofileclick","click",function(){
			if($(this).parent("span").length>=1){
				$(this).parent("span").siblings("span").children(".hidediv").show();
			}else{
				$(this).parent("div").siblings("div").children(".hidediv").show();
			}
		});
		//好友列表收縮
		$("#rightarrow").click(function(){
			var myrig=parseInt($("#mainright").css("right"));
			if(myrig<0){
				$("#mainright").stop().animate({"right":0},600);
				$(this).html("<i class='fa fa-chevron-right'></i>");
			}else{
				$("#mainright").stop().animate({"right":-240},600);
				$(this).html("<i class='fa fa-chevron-left'></i>");
			}
		})
		//選擇分類
		$("body").delegate("#q_type","change",function(){
				myval=$("#q_type").val();
				mytext=$("#q_type option:selected").text();
				if(myval){
					orglist=$("#q_typewrap .q_tag");
					tpass=1;
					if(orglist.length>0){
						for(var a=0;a<orglist.length;a++){
							if(orglist.eq(a).data("val")==myval){
								tpass=0;
							}
						}
						if(tpass==1){
							$("#q_typewrap").html("<span class='q_tag border5' data-val='"+myval+"'>"+mytext+" <i class='fa fa-times fa-vc q_tagdel' data-val='"+myval+"'></i></span>");
							$("#q_typebox").hide();
						}
					}else{
						$("#q_typewrap").html("<span class='q_tag border5' data-val='"+myval+"'>"+mytext+" <i class='fa fa-times fa-vc q_tagdel' data-val='"+myval+"'></i></span>");
						$("#q_typebox").hide();
					}
				}
		});
		$("body").delegate(".q_tagdel","click",function(){
			$(this).parents(".q_tag").remove();
			$("#q_type").val('');
			$("#q_typebox").show();
		});
		// ##########  按 morediv 的行為 這是有限高的div 變大... ##################
		$("body").delegate(".morediv","click",function(){
			mytype=$(this).data("type");
			var same=$(this)[0].outerHTML;
			var metemp=$(this);
			// now = new Date();
			get_navpop(mytype,$(this).data("val"),metemp,same);
		});
		// ########## 其他互動  ####################
		//按下 maincontenttagselect 的行為 --tag切換
		$("body").delegate("","click",function(){ //20190425 Pman 當點選頁面的其他地方時，收掉次選單
			//console.log("PS1");
			if(blnSMenuOpen==0){
				$(".mselectclick.fa.fa-chevron-up").removeClass("fa-chevron-up");
				$(".mselectclick.fa").addClass("fa-chevron-down");
				$(".mcreplytitleselectlist").hide();
				$(".mainitemtitleselectlist").hide();
			}else{
				blnSMenuOpen=0;
			}
		});

		$("body").delegate(".tagselect","click",function(){
			$(this).parent(".tagtitlewrap").children(".tagselect").removeClass("on");
			$(this).addClass("on");
			thisval=$(this).data("val");
			$(this).parent(".tagtitlewrap").siblings(".tagcontentwrap").children(".tagcontentbox").hide();
			$(this).parent(".tagtitlewrap").siblings(".tagcontentwrap").children(".tagcontentbox").eq(thisval).show();
		});
		//按下 mselectclick 的行為
		$("body").delegate(".mselectclick ","click",function(){
			//console.log("234");
			blnSMenuOpen=1; //20190425 Pman 設定次選單是開啟的狀態
			if($(this).hasClass("fa-chevron-up")){
				$(this).removeClass("fa-chevron-up");
				$(this).addClass("fa-chevron-down");
				if($(this).data("type")=="reply"){
					$(this).siblings(".mcreplytitleselectlist").hide();
				}else{
					$(this).siblings(".mainitemtitleselectlist").hide();
				}
			}else{
				$(".mselectclick.fa.fa-chevron-up").removeClass("fa-chevron-up");//20190124 Pman 把其他展開的選單收掉
				$(".mselectclick.fa").addClass("fa-chevron-down");//20190124 Pman 把其他展開的選單收掉
				$(".mcreplytitleselectlist").hide();//20190124 Pman 把其他展開的選單收掉
				$(".mainitemtitleselectlist").hide();//20190124 Pman 把其他展開的選單收掉

				$(this).removeClass("fa-chevron-down");
				$(this).addClass("fa-chevron-up");
				if($(this).data("type")=="reply"){
					$(this).siblings(".mcreplytitleselectlist").show();
				}else{
					$(this).siblings(".mainitemtitleselectlist").show();
				}
			}
		});
		// ################  TAB 切換  ##################################
		//按下 maincontentselect的行為  --頁面上的 tab切換
		$("body").delegate(".maincontentselect","click",function(e){
			e.preventDefault();
			curtab=$(this).data("val");
			if($(this).hasClass("on")){
			}else{
				$(".maincontentselect").removeClass("on");
				$(this).addClass("on");
				if($(this).parents("#maincontenttitle").data("type")=="match"){
					$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
					if($(this).data("val")==0){//好友配對
						left_friendselectmenu();
						show_centermatchlist();
					}else if($(this).data("val")==1){//系統推薦
						left_empty();
						show_centermatchsystem();
					}else if($(this).data("val")==2){//送出的邀請
						left_empty();
						show_centermatchsendlist();
					}else if($(this).data("val")==3){//收到的邀請
						left_empty();
						show_centermatchreceivelist();
					}
				}else if($(this).parents("#maincontenttitle").data("type")=="wall"){
					if($(this).data("val")==0){//全部貼文
						get_centerwalllist(0);//顯示全部動態牆
					}else if($(this).data("val")==1){//好友貼文
						get_centerwalllist(1);//顯示好友動態牆
					}
				}else if($(this).parents("#maincontenttitle").data("type")=="shop"){
					x=$(".lefttypeselecton").data("val");
					$("#maincontentbox").data("val",$(this).data("val"));
					get_centershoplist(x,$(this).data("val"));
				}else if($(this).parents("#maincontenttitle").data("type")=="qna"){
					//移除左方設定
					//sessionStorage.removeItem("qnaselect");
					get_centerqnalist($(this).data("val"))
				}else if($(this).parents("#maincontenttitle").data("type")=="article"){
					show_mypagearticlein(sessionStorage.getItem("userid"),$(this).data("val"),1,1)
				}else if($(this).parents("#maincontenttitle").data("type")=="photo"){
					show_mypagephotoin($(this).data("id"),$(this).data("val"))
				}else if($(this).parents("#maincontenttitle").data("type")=="arc"){
					get_centerarclist($(this).data("val"),1,'');//center.js
				}
			}
		});
		//################ QNA 選項 ###################
		//左方
		$("body").delegate(".qnaleftclick","click",function(){
			$(".qnaleftclick").removeClass("lefttypeselecton");
			if($(this).data("val")=="0"){
				sessionStorage.setItem("qnaselect","");
				curtab="0";
				$(".maincontentselect").removeClass("on");
				$(".maincontentselect").eq(0).addClass("on");
			}else{
				$(this).addClass("lefttypeselecton");
				sessionStorage.setItem("qnaselect",$(this).data("val"));
			}
			get_centerqnalist(curtab);//重新抓動態強
		});
		//我也想知道
		$("body").delegate(".qa_knowbtn","click",function(){
			me=$(this);
			if(me.hasClass("p")){
			}else{
				set_qaalso(me,$(this).data("val"));//在 ajax
			}
		});
		//################### 商店分類選單  ################
		$("body").delegate(".shopcatclick","click",function(){
			$(".lefttypeselect").removeClass("lefttypeselecton");
			$(this).addClass("lefttypeselecton");
			var x=$(".lefttypeselecton").data("val");
			var y=$("#maincontenttitle .on").data("val");
			$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
			setTimeout(function(){
				show_centershoplist(x,y);
			},500);
		});
		$("body").delegate(".shopcatclickb","click",function(){
			mylist=$(".lefttypeselect");
			mylist.removeClass("lefttypeselecton");
			for(var a=0;a<mylist.length;a++){
				if(mylist.eq(a).data("val")==$(this).data("val")){
					mylist.eq(a).addClass("lefttypeselecton");
				}
			}
			x=$(".lefttypeselecton").data("val");
			show_centershoplist(x,$("#maincontenttitle .on").data("val"))
		});
		$("body").delegate(".storeitemclick,.storeitemclickb","click",function(){
			if($(this).data("val")){
				show_product($(this).data("val"));
			}

		});
		// ################### 好 友 相 關 #################################
		//配對好友選擇
		$("body").delegate(".leftfriendselect","change",function(){
			if($(this).attr("id")=="addgamematchselect" && $(this).val()){
				//localStorage.setItem("friendselect","");
				if(localStorage.getItem("friendselect")){
					friendselect=JSON.parse(localStorage.getItem("friendselect"));
				}else{
					friendselect=[];
				}
				if(friendselect.length>=3){
					popnotice("最多只能選擇３個遊戲");
				}else{
					var flag=0;
					if(friendselect.length>0){
						for(var a=0;a<friendselect.length;a++){
							if(friendselect[a]['gameid']==$(this).val()){
								flag=1;
							}
						}
					}
					if(flag==0){
						var temp = new Object();
						temp.gameid=$(this).val();
						temp.show="1";
						friendselect.push(temp);
						localStorage.setItem("friendselect",JSON.stringify(friendselect));
						left_friendgamelist();
						show_centermatchlist();
					}
				}
			}else{
				show_centermatchlist();
			}
		});
		//配對好友tag 刪除選擇
		$("body").delegate(".leftfriendselect","click",function(){
			if($(this).data("type")=="delete"){
				friendselect=JSON.parse(localStorage.getItem("friendselect"));
				var newarr=[];
				var b=0;
				var flag=0;
				for(var a=0;a<friendselect.length;a++){
					if(friendselect[a]['gameid']==$(this).data("val")){
						flag=1;
					}else{
						newarr[b]=friendselect[a];
						b++;
					}
				}
				if(flag==1){
					localStorage.setItem("friendselect",JSON.stringify(newarr));
					left_friendgamelist();
					show_centermatchlist();
				}
			}
		});
		// #############  朋友相關 ###########################################
		//搜尋朋友
		$("body").delegate("#friendsearch","keyup",function(e){
			if($(this).val().length>0){
				$("#friendlist").hide();
				if(sessionStorage.getItem("userid")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).val());
					tempitem=ajaxarr("searchfriends",tempvals,"ajax.php");
					tempitem.success(function(data){
						if(data[0]=="ERR"){
							//alert(data[1]);
						}else{
							out="";
							for(var a=0;a<data.length;a++){
								out+="            	<!--item-->\n";
								out+="            	<div class='frienditem' data-type='friend' data-val='"+data[a]['uid']+"'>\n";
								out+="                	<div class='friendimgwrap friendimgwrapon'>\n";
								out+="                    	<div class='friendimgbox'>\n";
								if(data[a]['headpic']){
									out+="                        	<img src='uploadfile/"+smallpics(data[a]['headpic'])+"' />\n";
								}else{
									out+="                        	<img src='img/basicheads.png' />\n";
								}
								out+="                     	</div>\n";
								out+="                     </div>\n";
								out+="                     <div class='frienditemtext'>"+data[a]['name']+"</div>\n";
								out+="                     <div class='clr'></div>\n";
								out+="            	</div>\n";
								out+="                <!--item end -->				\n";
							}
							$("#fsearchresult").html(out);
						}
					});
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else{
				$("#friendlist").show();
				$("#fsearchresult").html('');
			}
		});
		//加減朋友 addfriend
		$("body").delegate(".addfriend","click",function(){
			var me=$(this);
			if($(this).data("type")=="addtext"){
			}else{
				xxme=$(this);
			}
			var thistype=$(this).data("type");
			if(thistype=="add"){
				popaddfriend($(this).data("val"));
			}else{
				flag=1;
				if(thistype=="cancel"){
					//if(confirm( '請問確定要取消嗎?' )){
					if(confirm( '是否取消好友？' )){//20190904 Pman 客戶要求修改
						flag=0;
					}
				}else{
					flag=0;
				}
				if(flag==0){
					var thistext="";
					if($(".addfriendtext").val()){
						thistext=$(".addfriendtext").val();
					}
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("type"),$(this).data("val"),thistext);
					tempitem=ajaxarr("addfriends",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							if(data[2]=="CLOSE"){
								popclose();
							}
							popnotice(data[1]);
						}else if (data[0]=="OK2"){
							$("#fm2cnt").html(data[2]);
							$("#fm3cnt").html(data[3]);
							popnotice(data[1]);
							 me.hide();
						}else if (data[0]=="OK3"){//reject
							popnotice("你已拒絕對方邀請");
							//curpage="matchpage";
							//showpage();
							show_centermatchreceivelist();
							$("#fm3cnt").html(parseInt($("#fm3cnt").html())-1);
							chk_notice();
						}else if (data[0]=="OK4"){//答應邀請
							popnotice("你們現在是朋友了");
							//curpage="matchpage";
							//showpage();
							show_centermatchreceivelist();
							$("#fm3cnt").html(parseInt($("#fm3cnt").html())-1);
							chk_notice();
							show_afterloginhead();//重新顯示人物資料
						}else if(data[0]=="OK5"){//刪除朋友回復
							popnotice("好友關係已取消");
							showpage();
							chk_friends();//在ajax.js\
							//更新左邊
						}else if(data[0]=="OK6"){//取消邀請
							if($("#fm2cnt").length>0){//在配對表
								me.parents(".mainitem").remove();
								$("#fm2cnt").html(data[1]);
							}else{
								popnotice("邀請已取消");
								me.html("加朋友");
								me.data("type","add");
							}
							//更新左邊
						}else{//邀請成功
							$("#fm2cnt").html(data[1]);
							$("#fm3cnt").html(data[2]);
							if(thistype=="delete"){//表示在邀請對象頁面
								show_centermatchsendlist();
							}else{
								popclose();
								xxme.html("取消邀請");
								xxme.data("type","delete");
								popnotice("邀請已送出");

								//如果有
								$("#fm2cnt").html(data[1]);

							}
						}
					});
				}
			}
		});
		$("#topadimgclick").click(function(){
			$("#headeroutwrap").animate({"top":-250},500);
			$("#mainwrap").animate({"margin-top":45},500);
			$("#mainright").animate({"top":45},500,function(){setsize();calrightpos();});
			$("#mainleft").animate({"top":45},500);
		});
		//圖片管理的X
		$("body").delegate(".imgitembox , .imgitemboxx","mouseenter",function(){
			$(this).children(".imgdelclick").show();
		});
		$("body").delegate(".imgitembox , .imgitemboxx","mouseleave",function(){
			$(this).children(".imgdelclick").hide();
		});
		//點選相簿
		$("body").delegate(".albclick","click",function(){
			show_mypagealbin($(this).data("val"))
		});
		//顯示相簿修改表格
		$("body").delegate(".albedclick","click",function(){
			if($("#albeditform").css("display")=="block"){
				$("#albeditform").hide();
				$("#albeditshow").show();

			}else{
				$("#albeditform").show();
				$("#albeditshow").hide();
				jQuery(".chosen").chosen();
			}
		});
		//點選顯示上傳
		$("body").delegate(".profileimgclick","click",function(){
				$(this).hide();
				$(this).siblings("form").children(".instantbox").children("img").hide();
		});
		$("body").delegate(".profileimgclickb","click",function(){
				$(this).hide();
				$(this).siblings("form").children(".instantbox").children(".mypeopleimg").hide();
				$("#headpicclick").show();
				$("#headpicform").show();
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
		//按下朋友--跳出對話框
		$("body").delegate(".frienditem","click",function(){
			get_chatroom($(this).data("val"));//ajax.js
			if(isinchat==1){
				clearInterval(chatreload);
			}
			isinchat=0;
			chatroomreflash();
		});
		//跳出icon選擇
		$("body").delegate(".chaticonselect","click",function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$("#iconbox").hide();
			}else{
				$(this).addClass("on");
				temp=$(this).offset();
				chroomid=$(this).data("val");//紀錄現在在哪個chatroom
				myleft=parseInt(temp.left);
				$("#iconbox").css("left",myleft-150).css("bottom",20);
				$("#iconbox").show();
				$(".icongroup").hide();
				$(".icongroup").eq(0).show();
			}
		});
		//顯示search
		$("body").delegate(".chatfriendclick","click",function(){
			if($("#chat"+$(this).data("val")).children(".chatfsearch").css("display")=="block"){
				$("#chat"+$(this).data("val")).children(".chatfsearch").children(".chatfsearchbox").val('');
				$("#chat"+$(this).data("val")).children(".chatfsearch").hide();
				$("#chat"+$(this).data("val")).children(".chatfsearch").children(".chatauto").html('');
				$("#chat"+$(this).data("val")).children(".chatfsearch").children(".chatauto").hide();
			}else{
				$("#chat"+$(this).data("val")).children(".chatfsearch").show();
			}
		});
		$("body").delegate(".chatfsearch .btn","click",function(){
				$(this).siblings(".chatfsearchbox").val('');
				$(this).siblings(".chatauto").html('');
				$(this).parents(".chatfsearch").hide();
				$(this).siblings(".chatauto").hide();

		});
		//縮小
		$("body").delegate(".minchat","click",function(){
			//if(parseInt($(this).parents(".chatroom").css("bottom"))<0){//這是已經縮小的了
			if($(this).parents(".chatroom").hasClass("s")){//修改成用class來辨識
				$(this).parents(".chatroom").removeClass("s");
				if(parseInt($(this).parents(".chatroom").css("right"))>900){
					if(parseInt($(this).parents(".chatroom").css("bottom"))>0){//後面的--本來是縮的卻又被案到前面來了
						$(this).parents(".chatroom").css("z-index",2000);
					}
					resetchatroom();
				}else{
					var me=$(this).data("val");
					$(this).parents(".chatroom").stop().animate({"bottom":0},500);
				}
				if($("#chat"+me).children(".chattitle").hasClass("on")){
					$("#chat"+me).children(".chattitle").removeClass("on");
				}
			}else if(parseInt($(this).parents(".chatroom").css("bottom"))>0){//後面的
				$(this).parents(".chatroom").css("z-index",2000);
				resetchatroom();
			}else{
				if(parseInt($(this).parents(".chatroom").css("right"))>900){
					//$(this).parents(".chatroom").css("bottom",-250);
					$(this).parents(".chatroom").addClass("s");
					resetchatroom();
				}else{
					$(this).parents(".chatroom").stop().animate({"bottom":-250},500);
					$(this).parents(".chatroom").addClass("s");
				}
			}
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
		//填寫朋友名字搜尋
		$("body").delegate(".chatfsearchbox","keyup",function(e){
				p=$(this).val();
				if(p){
					me=$(this);
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),p);//人 / key / key
					tempitem=ajaxarr("get_friendbykey",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
						if(data[0]=="ERR"){
						}else{
							var out="";
							for(var a=0;a<data[1].length;a++){
								out+="<div class='cfitem' data-val='"+data[1][a]['uid']+"'>\n";
								if(data[1][a]['headpic']){
									out+="<img src='uploadfile/"+smallpics(data[1][a]['headpic'])+"' />\n";
								}else{
									out+="<img src='img/basicheads.png' />\n";
								}
								out+=data[1][a]['name']+"</div>";
							}
							me.siblings(".chatauto").html(out);
							me.siblings(".chatauto").show();
						}
					});
				}else{
					$(this).siblings(".chatauto").hide();
				}
		});
		//朋友收尋框 按下某位朋友
		$("body").delegate(".cfitem","click",function(e){
				$(this).parents(".chatfsearch").children(".sendbtn").data("val",$(this).data("val"));
				$(this).parents(".chatfsearch").children(".chatfsearchbox").val($(this).text());
				$(this).parents(".chatauto").hide();
				/*
				r=$(this).parents(".chatroom").data("id");
				p=$(this).data("val");
				me=$(this);
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"invite",r,p);//人 / key / key
				tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
				tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
					if(data[0]=="ERR"){
						popnotice(data[1]);
					}else{
						me.parents(".chatauto").hide();
						readnewchat(r);
					}
				});
				*/

		});
		$("body").delegate(".chatfsearch .sendbtn","click",function(e){
				r=$(this).parents(".chatroom").data("id");
				p=$(this).data("val");
				if(p === undefined){		//20180911 Pman 解決當chatfsearchbox是空白時，還能邀請的問題
					return false;
				}
				//console.log($("#chatfsearchbox").val());
				me=$(this);
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"invite",r,p);//人 / key / key
				tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
				tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
					if(data[0]=="ERR"){
						popnotice(data[1]);
					}else{
						me.siblings(".chatauto").hide();
						readnewchat(r);
					}
				});
		});
		//icon選擇列表跳出
		$("body").delegate("#icontypelist img","click",function(){
			$(".icongroup").hide();
			$(".icongroup").eq($(this).data("val")).show()
		});
		//icon 選擇
		$("body").delegate(".icongroup img","click",function(){
			$("#iconbox").hide();
			//存入
			imgsrc="XX{img}"+$(this).data("val");
			chat_input(chroomid,imgsrc);//id,內容  ajax.js
		});
		//新發言
		$("body").delegate(".chatinput","keypress",function(e){
			if(e.which == 13) {
				if($(this).val()){
					$(this).val(escape($(this).val()));//20190321 Pman 將emoji內容轉碼，會連同換行符號一起轉掉
					chat_input($(this).data("val"),$(this).val());//id,內容  ajax.js
					$(this).val('');
				}
			}
		});
		$("body").delegate(".closechat","click",function(){
			var thisval=$(this).data("val");
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"extroom",thisval);
			tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
			tempitem.success(function(data){
				$("#chat"+thisval).remove();
				resetchatroom();
			});
		});
		//按下通知-->popup-->重新抓取數字
		$("body").delegate(".chatpopclick","click",function(){
			$(this).parents(".hwrap").children(".hlist").hide();
			$(this).parents(".hwrap").children(".htitle").removeClass("htitleon");
			//這個錯了 getroominfo
			//get_chatroom($(this).data("val"));//ajax.js
			//檢查是否已經開啟
			roomlist=$(".chatroom");
			flag=0;
			for(var a=0;a<roomlist.length;a++){
				if(roomlist.eq(a).data("id")==$(this).data("val")){
					flag=1;
				}
			}
			if(flag==0){//沒有開啟--檢查是否還存在
				var thisval=$(this).data("val");
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"chkroomext",thisval);
				tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						popnotice(data[1]);
					}else{
						popchatroom(thisval);
					}
				});
			}
			//清掉通知
			clean_chatnote($(this).data("val"));//ajax
			if(isinchat==1){
				clearInterval(chatreload);
			}
			isinchat=0;
			chatroomreflash();
		});
	}
	// ##########  CHAT ROOM RELATED  END ########################
	// ###########  PAGE CONTROL ########################
	// Page new or update
	function framerefresh(){//每多少秒抓一次資料
		refreshchk();
		refreshchk2();
		var refreshall=setInterval(function(){
			refreshchk();
		},refreshtimer);//60秒抓一次
		var refreshall2=setInterval(function(){
			refreshchk2();
		},refreshnote);//60秒抓一次
	}
	function refreshchk(){	//實際檢查所有登入相關功能
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			chk_online();//在login.js
			chk_friends();//在ajax.js\
			//chk_notice();//在ajax.js--這個分開
			chk_timeitem();//在share.js
			show_afterloginheadx();//在login.js
		}
	}
	function refreshchk2(){	//檢查訊息更新
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			chk_notice();//在ajax.js
		}
	}
	//
	showpage=function(x,y){
		jk=0; //20190219 Pman 用來判定是否是share.php，暫時沒用到
		if(window.page=="share.php"){
			if(x==1){
				//if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//console.log("1");
				//	show_afterloginhead();//左方頭部  //20190219 Pman 在登入狀態下，輸出登入者資料
					jk=1;
		//		}else{
					//console.log("2");
					//show_beforeloginhead();//左方頭部
			//		jk=1;
			//	}
				jk=1;
			}
		}
		if(jk==1){
			curpage=qs["page"];
			curid=qs["id"];
			if(curpage && curid){
				if(curpage=="wallpage"){//動態牆
					$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					var tempvals=Array(curid,'erwr45435');//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
					tempitem=ajaxarr("show_wallone",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
						if(data[0]=="ERR"){
							popnotice(data[1]);
							$("#maincontentbox").html('');
						}else{
							var out="";
							//動態強
							out+="                <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
							out+="                    <div id='maincontentwrap'>\n";
							out+="                      <div>\n";
							for(var a=0;a<data.length;a++){
								out+=print_wallitem(data[a]);
							}
							out+="                      </div>\n";
							out+="                    </div>\n";
							out+="                </DIV>\n";
							out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
							out+="					<div id='centerrankwrap'>\n";
							out+="					</div>\n";
							out+="					<div class='rightbanner bannerwrap' data-type='side1'>\n";
							out+="					</div>\n";
							out+="					<div class='rightbanner bannerwrap' data-type='side2'>\n";
							out+="					</div>\n";
							out+="				  </DIV>\n";
							$("#maincontentbox").html(out);
							get_centertoprank();
							run_chknewstext($("#maincontentbox .newstextbox"));
							run_timeitem();//跑一次
							set_video();

						}
					});
				}else if(curpage=="articlepage"){
					$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					show_centerartpage(curid);
				}else if(curpage=="qnapage"){
					$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					var tempvals=Array('','',curid);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
					tempitem=ajaxarr("show_qnaone",tempvals,"ajax.php");
					tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
						if(data[0]=="ERR"){
							popnotice(data[1]);
							$("#maincontentbox").html('');
						}else{
							var out="";
							out+=print_qnaitem(data[0],2);
							$("#maincontentbox").html(out);
							run_timeitem();//跑一次
						}
					});



				}
			}else{
				popnotice("資料不齊全無法顯示網頁");
			}

		}else{
			curtab=0;
			if(x==1){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					show_afterloginhead();//左方頭部
				}else{
					show_beforeloginhead();//左方頭部
				}
			}
                        if(curpage!='shoppage') {
                            $('.headercate').hide();
                        }
			if(curpage=="wallpage"){//動態牆
				$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
				topnavchange(curpage);
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					show_centerwall(0);//顯示中央動態牆
				}else{

					show_centerwall(0);//顯示中央動態牆
				}
				left_gameselectmenu();
			}else if(curpage=="articlepage"){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					show_centerarticle();//顯示中央動態牆
					left_gameselectmenu();
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="publishpage"){//發攻略
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					show_centerpublish(x);
					left_empty();
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="matchpage"){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					left_friendselectmenu();
					//因為match 不帶參數...這裡把serch result帶進來
					show_centermatch(y);
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="friendpage"){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					left_empty();
					show_centerfriendlist();
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="rankpage"){//排行榜
				//if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					left_rankselectmenu();
					show_centerranklist(1);
				//}else{
				//	popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				//}
			}else if(curpage=="shoppage"){
                            if($('.headercate').css('display') == 'none') {
                                $('.headercate').show();
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					//left_shopselectmenu();
                                        header_shopcatemenu();
					show_centershoplist();
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
                            }
                            else {
                                $('.headercate').hide();
                            }
			}else if(curpage=="actpage"){
				$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
				topnavchange(curpage);
				left_empty();
				show_centeract();
			}else if(curpage=="qnapage"){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					sessionStorage.setItem("qnaselect","");//清空
					topnavchange(curpage);
					left_qnaselectmenu();
					show_centerqna();
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="artpage"){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					//console.log("KJCC:"+x);
					left_empty();
					show_centerartpage(x);
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="arcpage"){
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					//left_empty();
					left_gameselectmenu();
					show_centerartpagec(x);
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="wallitem"){//單一動態強
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					left_empty();
					get_centerwallone(x);
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="qnaitem"){//單一QNA
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					left_empty();
					show_centerqnaone(x);
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="matchitem"){//單一交友邀請
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					left_empty();
					show_centermatchone(x);
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="mypage"){//單一交友邀請
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage,x);
					left_empty();
					show_mypageall(x,y);//center.js
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}else if(curpage=="collectpage"){//收藏--進入收藏的第一畫面
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					left_gameselectmenu();
					show_centerarc(1);//center.js
				}else{
					popnotice("您尚未登入，請登入KYOMON，享用更完善功能");
				}
			}
		}
	}
	function chatroomreflash(){
		isinchat=1;
		chatreload=setInterval(function(){
			runchatroomreflash();
		},15000);
	}
	function runchatroomreflash(){
			mylist=$(".chatroom");
			for(var a=0;a<mylist.length;a++){
				xval=mylist.eq(a).data("id");
				readnewchat(xval);
			}
	}
	function popreturn(){
		$(".poptitles").removeClass("htitleon");
	}
	function calrightpos(){
		sp=$window.scrollTop();
		mlist=$(".rightbanner");
		var vx=parseInt($(".midwrapin").offset().left)+488;
		if(mlist.length>0){
			var mah=$(".midwrapinleft").height();
			var mbh=$(".midwrapinright").height();//右方全高 ...mbh-$(window).height()==右方比windows高的不分...
			if(mah>mbh){
				var txtop=$("#topad").height();
				txtop+=parseInt($("#headeroutwrap").css("top"));
				txtop+=$("#headerwrap").height();
				txtop+=5;
				if(mbh>($(window).height()-txtop)){
					if(bshow==0 && sp>=(mbh-$(window).height())){
						$(".midwrapinright").css("position","fixed").css("left",vx).css("top","auto").css("bottom",10);
						bshow=1;
					}else if(bshow==1 && sp<(mbh-$(window).height())){
						bshow=0;
						$(".midwrapinright").css("position","relative").css("left","auto").css("bottom","auto").css("top","auto");
					}
				}else{
					$(".midwrapinright").css("position","fixed").css("left",vx).css("top",txtop).css("bottom","auto");
				}
			}else{
				bshow=0;
				$(".midwrapinright").css("position","relative").css("left","auto").css("bottom","auto").css("top","auto");
			}
		}
	}

	$(".chosen-results").change(function(){
		alert("ppp");
	});
});

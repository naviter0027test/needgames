	$window = $(window);
	url=window.location.toString();
	var orgrate=0;
	//var refreshnote=10000;//檢查訊息時間
	//var refreshtimer=30000;//檢查訊息時間
	window.page=url.substring(url.lastIndexOf('/') + 1).split("?")[0];		//目前頁面 設定成glabals
	if(window.location.hostname=="99mission.why3s.tw"){
		fbid="257730147730215";
	}else if(window.location.hostname=="gametest.demo.thinkyes.com.tw"){
		fbid="1486682161360214";
	}else if(window.location.hostname=="gametest.demo.thinkyes.com.tw:8080"){
		fbid="1486682161360214";
	}else{
		fbid="1622214028074766";
	}
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {	ismobile=1;}
	if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {	isios=1;}
	if(isapp){
		ismobile=2;//app
		document.addEventListener("deviceready",function(){
			//facebookConnectPlugin.browserInit('257730147730215');
			pushx = PushNotification.init({
				android:{
					alert: "true",
					sound: "true",
					badge: "true",//這似乎沒用
					clearNotifications:"false" //不刪掉其他的通知
				},browser:{
				},ios:{
					alert: "true",
					badge: "true",//顯示數字
					sound: "true"
				},windows: {}
			});
			//first time fire ...清理所有過去資料
			pushx.on('registration', (data) => {
					fcmid=data.registrationId;
			});
			pushx.on('notification', (data) => {
				if(data.additionalData){
					if(data.additionalData.mybadge){
						pushx.setApplicationIconBadgeNumber(() => {	 }, () => {		 }, parseInt(data.additionalData.mybadge));
					}
					if(data.additionalData.badge){
						pushx.setApplicationIconBadgeNumber(() => {	 }, () => {		 }, parseInt(data.additionalData.badge));
					}
					if(data.additionalData.notId){
						if(localStorage.getItem("fcmlistz") && localStorage.getItem("fcmlistz").length>0 ){
							fcmlist=JSON.parse(localStorage.getItem("fcmlistz"));
						}else{
							fcmlist=[];
						}
						flag=9999999;
						var cnt=0;
						if(fcmlist && fcmlist.length>0){
							for(var a=0;a<fcmlist.length;a++){
								if(fcmlist[a]==data.additionalData.notId){
									flag=a;
								}
							}
							cnt=fcmlist.length;
						}
						if(flag==9999999){//沒有重複
							fcmlist[cnt]=data.additionalData.notId;
							localStorage.setItem("fcmlistz",JSON.stringify(fcmlist));//更新
						}else{//重複--click行為--要下一步反映
							fcmlist.splice(flag, 1);
							localStorage.setItem("fcmlistz",JSON.stringify(fcmlist));//更新
							localStorage.setItem("actiontype",data.additionalData.actiontype);
							localStorage.setItem("action",data.additionalData.action);
							setTimeout(function(){
								chkmsg();
							},1500);
						}
					}
				}
			});
			if(window.MobileAccessibility){
						window.MobileAccessibility.usePreferredTextZoom(false);
			}
		},true);
		//document.addEventListener("resume", chkmsg, false);
	}

	//這是mobile判斷
	//isapp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	function chkmsg(){
		if(localStorage.getItem("action")!=""){
			var hlist=$(".htitle");
			var me=hlist.eq(2);
			hlist.removeClass("htitleon");
			me.addClass("htitleon");
			//送去ajax
			if($("#popfull")){
				popfullclose();
			}
			popbasefull("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"popnoticcomment");// 類別,ID
			tempitem=ajaxarr("clr_notice",tempvals,ajaxurl);
			tempitem.success(function(data){//回傳 data 義
				popfullclose();
				if(data[0]=="ERR"){
					popnoticall(me,"");
				}else{
				//	alert(data[1])
					popnoticall(me,data[1]);
					setTimeout(function(){
						var myroom=localStorage.getItem("action");
						entermychatroom(myroom);
						localStorage.setItem("action","");
						localStorage.setItem("actiontype","");
					},700);
				}
			});
		}
	}
	sessionStorage.setItem("browser",ismobile);
	$window.resize(function(){
		$window = $(window);
	});
	// 接收 query string
	querystring = location.search.replace( '?', '' ).split( '&' );
  qs = {};
	lastme="";
	for ( var i=0; i<querystring.length; i++ ) {
		  var name = querystring[i].split('=')[0];
		  var value = querystring[i].split('=')[1];
		  qs[name] = value;
	}
    $("body").on("swiperight", swipeleftHandler);
  // $("body").on("swipeleft", swipeleftHandler);
    function swipeleftHandler(event) {
		show_mypageall(0);
    }
    function swipeleftHandler(event) {
    //       $("footer .menu").addClass("on");
    }
	if(qs["refid"]){//介紹人
		localStorage.setItem("refid",qs["refid"])
	}
	$(window).bind("popstate", function(e){
		if(sessionStorage.getItem("userid")){
			var state =event.state;
			if(state){
				curpage=state.page;
				if(curpage){
					showpage(curpage,"");
				}else{
					navigator.notification.confirm(
					        "您確認要離開嗎?",
					        function(stat){
								    if(stat == "1"){
											 alert("記得要回來喔");
								        navigator.app.exitApp();
								    }else{
											curpage="wallpage";
											 history.pushState({page:curpage}, '', "?page="+curpage);//history
								        return;
								    };
					        },
					        "離開訊息",
					        "是,否"
					);
				}
			}
		}
	});
	var bshow=0;
	$("#mainwrap").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
	$.getScript(jsurl+'js/share.js', function() {
		$.getScript(jsurl+'js/controls.js', function(){
			setsize();
			var cntss=14;
			//中央
			$.getScript(jsurl+'js/print.js', function(){//主列印
			});
			$.getScript(jsurl+'js/printlogin.js', function(){//4--登入/註冊/通知
				cntss--;
			});
			$.getScript(jsurl+'js/printwall.js', function(){//5--動態牆
				cntss--;
			});
			$.getScript(jsurl+'js/printqna.js', function(){//6--qna
				cntss--;
			});
			$.getScript(jsurl+'js/printart.js', function(){//7--攻略
				cntss--;
			});
			$.getScript(jsurl+'js/printbanner.js', function(){//8--banner
				cntss--;
			});
			$.getScript(jsurl+'js/printrank.js', function(){//9-排行榜
				cntss--;
			});
			$.getScript(jsurl+'js/printfriend.js', function(){//10--交友
				cntss--;
			});
			$.getScript(jsurl+'js/printabout.js', function(){//11--關於我
				cntss--;
			});
			$.getScript(jsurl+'js/printstore.js', function(){//12-商店
				cntss--;
			});
			$.getScript(jsurl+'js/printarc.js', function(){//13--收藏
				cntss--;
			});
			$.getScript(jsurl+'js/printchat.js', function(){//14--聊天
				cntss--;
			});
			var gb=0;
			sessionStorage.setItem("ranks","");
			if(gb==0 && sessionStorage.getItem("ranks")==""){
				get_basic();//抓取等級及標籤等基礎資料-在ajax
			}
			//檢查是否新
			if(qs['act']){
				chk_mem(qs['act']);
			}
			sessionStorage.setItem("gamerem","");
			if(sessionStorage.getItem("userid")){//已經登入--檢查後台...有時被reload時需要
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));// 類別,ID
				tempitem=ajaxarr("chk_mem",tempvals,ajaxurl);
				tempitem.success(function(data){//回傳 data 義
					if(data[0]=="ERR"){
						var d = new Date();
						var n = d.getTime();
						if(localStorage.getItem("re_userid") && localStorage.getItem("re_time") && localStorage.getItem("re_key") && parseInt(localStorage.getItem("re_time"))>parseInt(n)){//檢查是否有自動登入
							var tempvals=Array(localStorage.getItem("re_userid"),localStorage.getItem("re_key"));// 類別,ID
							tempitem=ajaxarr("mem_autologin",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								sessionStorage.setItem("gamerem","1");
								if(data[0]=="ERR"){
									//alert(data[1]);
								}else{
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]) ;
									sessionStorage.setItem("key",data[3]) ;
									sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
									sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
									sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
									//設定gameselect
									if(localStorage.getItem("gameselect") && localStorage.getItem("gameselect").length>10){
									}else{
										var tempx= new Array();
										var temp = new Object();
										temp.gameid="9999";
										temp.show="1";
										tempx.push(temp);
										localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
									}
									if(data[1]['phonev']=="0"){
										popclose();
										var tx=pop_vrequest();
										swal(tx);
									}
								}
								cntss--;
							});
						}else{
							sessionStorage.setItem("member","");
							sessionStorage.setItem("userid","");
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
						tempitem=ajaxarr("mem_autologin",tempvals,ajaxurl);
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
								//設定gameselect
								if(localStorage.getItem("gameselect") && localStorage.getItem("gameselect").length>10){
										//alert(localStorage.getItem("gameselect"))
								}else{
									var tempx= new Array();
									var temp = new Object();
									temp.gameid="9999";
									temp.show="1";
									tempx.push(temp);
									localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
								}
								if(data[1]['phonev']=="0"){
									popclose();
									var tx=pop_vrequest();
									swal(tx);
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
					clearInterval(setstart);
					//等一下下在開始..等其他資料跑完..和儲存完畢
					setTimeout(function(){
						//進入頁面從動態牆開始
						if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0 && qs["page"]){
							curpage=qs["page"];
							showpage(1);
							show_afterloginhead();
						}
						//登入成功
						else if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
							curpage="wallpage";
							if(window.page!="share.php"){
								history.pushState({page:curpage}, '', "?page="+curpage);//history
							}
							showpage(1);
							show_afterloginhead();
							//其他功能開始
						}else{//登入頁
							showpage(99);
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
	//fb獨立
		//FB相關----APP
		if(ismobile==2){
			$("body").delegate(".fbclick","click",function(e){
				var me=$(this);
				if(me.data("type")=="rlink"){//回頭
					if($(".agreebox").is(':checked')){
					//	facebookConnectPlugin.getLoginStatus(function(xx){
						//	if(xx['status']=="connected"){
								facebookConnectPlugin.login(["public_profile","email"],
								function (userData) {
										var uid=userData['authResponse']['userID'];
										if(uid){
											facebookConnectPlugin.api(uid+"/?fields=birthday,email,name", ["email","user_birthday"],
												function (res) {
												 fbname=res['name'];
												 fbmail=res['email'];
												 fbbirth=res['birthday'];
												 if(uid && fbname){
													 var tempvals=Array(uid,fbname,fbmail,fbbirth,fcmid);
													 tempitem=ajaxarr("mem_fbreg",tempvals,ajaxurl);
													 tempitem.success(function(data){//回傳 data 義
														 if(data[0]=="ERR"){
															 swal(data[1])
														 }else{
															 sessionStorage.setItem("member",JSON.stringify(data[1]));
															 sessionStorage.setItem("key",data[2]) ;
															 showpage(97);
														 }
													 });
												 }else{swal("fb未正確執行，請稍後再試");}
											 },function (error) { alert("error:" + error) });
										}else{swal("fb未正確執行，請稍後再試");}
								},function (error) { alert("error:" + error) });
								/*
								var uid=xx['authResponse']['userID'];
								facebookConnectPlugin.api(uid+"/?fields=birthday,email,name", ["email","user_birthday"],
									function (res) {
									 fbname=res['name'];
									 fbmail=res['email'];
									 fbbirth=res['birthday'];
									 if(uid && fbname){
										 var tempvals=Array(uid,fbname,fbmail,fbbirth,fcmid);
										 tempitem=ajaxarr("mem_fbreg",tempvals,ajaxurl);
										 tempitem.success(function(data){//回傳 data 義
											 if(data[0]=="ERR"){
												 swal(data[1])
											 }else{
												 sessionStorage.setItem("member",JSON.stringify(data[1]));
												 sessionStorage.setItem("key",data[2]) ;
												 showpage(97);
											 }
										 });
									 }else{swal("fb未正確執行，請稍後再試");}
								 },function (error) { alert("error:" + error) });
								 */
					//		}else{
					//			swal("fb未成功連線，請稍後再試");
								/*
								facebookConnectPlugin.login(["public_profile","email"],
									function (userData) {
										var uid=userData['authResponse']['userID'];
										if(uid){
											facebookConnectPlugin.api(uid+"/?fields=birthday,email,name", ["email","user_birthday"],
												function (res) {
												 fbname=res['name'];
												 fbmail=res['email'];
												 fbbirth=res['birthday'];
												 if(uid && fbname){
													 var tempvals=Array(uid,fbname,fbmail,fbbirth,fcmid);
													 tempitem=ajaxarr("mem_fbreg",tempvals,ajaxurl);
													 tempitem.success(function(data){//回傳 data 義
														 if(data[0]=="ERR"){
															 swal(data[1])
														 }else{
															 sessionStorage.setItem("member",JSON.stringify(data[1]));
															 sessionStorage.setItem("key",data[2]) ;
															 showpage(97);
														 }
													 });
												 }else{swal("fb未正確執行，請稍後再試");}
											 },function (error) { alert("error:" + error) });
										}else{swal("fb未正確執行，請稍後再試");}
									},function (error) { alert("error:" + error) });
									*/
					//		}
					//	},function (error) { alert("error:" + error) });//先檢查
					}else{
						swal("請同意相關條款");
					}
				}else{//登入
					var fbcode="123456axc";
					//facebookConnectPlugin.getLoginStatus(function(xx){
					//	if(xx['status']=="connected"){
							facebookConnectPlugin.login(["public_profile","email"],
								function (userData) {
									var uid=userData['authResponse']['userID'];
									facebookConnectPlugin.api(uid+"/?fields=birthday,email,name", ["email","user_birthday"],
									 function (res) {
										 fbname=res['name'];
										 fbmail=res['email'];
										 fbbirth=res['birthday'];
										 if(me.data("type")=="link"){//登入串聯
											 setTimeout(function(){
												 poploginap(uid,fbname,fbmail,fbbirth);
											 },500);
										 }else if(me.data("type")=="login"){// fb 登入
											 var trem=$("#"+me.data("type")+" .formfield");
											 var tempvals=Array("2",uid,fbname,fbmail,fbbirth,fbcode,fcmid);
											 tempitem=ajaxarr("mem_login",tempvals,ajaxurl);
											 tempitem.success(function(data){//回傳 data 義
												 if(data[0]=="ERR"){
													 swal(data[1]);
												 }else if(data[0]=="OKFB"){//尚未完成填寫資料
													 var d = new Date();
													 var n = d.getTime();
													 sessionStorage.setItem("member",JSON.stringify(data[1]));
													 sessionStorage.setItem("key",data[2]) ;
													 localStorage.setItem("re_userid",data[2]);
													 localStorage.setItem("re_key",data[7]);
													 localStorage.setItem("re_time",n+86400*30000);
													 showpage(97);
												 }else{
													 swal("登入成功了,謝謝");
													 var d = new Date();
													 var n = d.getTime();
													 sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
													 sessionStorage.setItem("userid",data[2]) ;
													 sessionStorage.setItem("key",data[3]) ;
													 sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
													 sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
													 sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
													 localStorage.setItem("re_userid",data[2]);
													 localStorage.setItem("re_key",data[7]);
													 localStorage.setItem("re_time",n+86400*30000);
													 if(localStorage.getItem("gameselect") && localStorage.getItem("gameselect").length>10){
													 }else{
														 var tempx= new Array();
														 var temp = new Object();
														 temp.gameid="9999";
														 temp.show="1";
														 tempx.push(temp);
														 localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
													 }
													 showpage(1);
													 refreshchk();
													 show_afterloginhead();
													 if(data[1]['phonev']=="0"){
														 setTimeout(function(){
															 pop_vrequest();
														 },3000);
													 }
												 }
											 });
										 }
									 },function(error){});
								},function(error) { alert("error:" + error) });
					//	}else{
							/*
							facebookConnectPlugin.login(["public_profile","email"],
								function (userData) {
									var uid=userData['authResponse']['userID'];
									facebookConnectPlugin.api(uid+"/?fields=birthday,email,name", ["email","user_birthday"],
									 function (res) {
										 fbname=res['name'];
										 fbmail=res['email'];
										 fbbirth=res['birthday'];
										 if(me.data("type")=="link"){//登入串聯
											 setTimeout(function(){
												 poploginap(uid,fbname,fbmail,fbbirth);
											 },500);
										 }else if(me.data("type")=="login"){// fb 登入
											 var trem=$("#"+me.data("type")+" .formfield");
											 var tempvals=Array("2",uid,fbname,fbmail,fbbirth,fbcode,fcmid);
											 tempitem=ajaxarr("mem_login",tempvals,ajaxurl);
											 tempitem.success(function(data){//回傳 data 義
												 if(data[0]=="ERR"){
													 swal(data[1]);
												 }else if(data[0]=="OKFB"){//尚未完成填寫資料
													 var d = new Date();
													 var n = d.getTime();
													 sessionStorage.setItem("member",JSON.stringify(data[1]));
													 sessionStorage.setItem("key",data[2]) ;
													 localStorage.setItem("re_userid",data[2]);
													 localStorage.setItem("re_key",data[7]);
													 localStorage.setItem("re_time",n+86400*30000);
													 showpage(97);
												 }else{
													 swal("登入成功了,謝謝");
													 var d = new Date();
													 var n = d.getTime();
													 sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
													 sessionStorage.setItem("userid",data[2]) ;
													 sessionStorage.setItem("key",data[3]) ;
													 sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
													 sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
													 sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
													 localStorage.setItem("re_userid",data[2]);
													 localStorage.setItem("re_key",data[7]);
													 localStorage.setItem("re_time",n+86400*30000);
													 if(localStorage.getItem("gameselect") && localStorage.getItem("gameselect").length>10){
													 }else{
														 var tempx= new Array();
														 var temp = new Object();
														 temp.gameid="9999";
														 temp.show="1";
														 tempx.push(temp);
														 localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
													 }
													 showpage(1);
													 refreshchk();
													 show_afterloginhead();
													 if(data[1]['phonev']=="0"){
														 setTimeout(function(){
															 pop_vrequest();
														 },3000);
													 }
												 }
											 });
										 }
									 },function(error){});
								},function (error) { alert("error:" + error) });
						}
						*/
				//	},function(error) { alert("error:" + error) });
				}
			});
		}else{//手機板
			(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
			 window.fbAsyncInit = function() {
		 			FB.init({
		 			  appId      : fbid,
		 			  xfbml      : true,
		 			  version    : 'v2.12'
		 			});
					$("body").delegate(".fbclick","click",function(e){
		 				var me=$(this);
		 				if(me.data("type")=="rlink"){
		 					if($(".agreebox").is(':checked')){
		 							FB.login(function(response) {
		 								if(response.authResponse) {
		 									access_token = response.authResponse.accessToken; //get access token
		 									xfbid = response.authResponse.userID; //get FB UID
		 									FB.api('/me?fields=birthday,email,name', function(response) {
		 											fbname=response.name;
		 											fbmail=response.email;
		 											fbbirth=response.birthday;
		 											var tempvals=Array(xfbid,fbname,fbmail,fbbirth);
		 											tempitem=ajaxarr("mem_fbreg",tempvals,ajaxurl);
		 											tempitem.success(function(data){//回傳 data 義
		 												if(data[0]=="ERR"){
		 													swal(data[1])
		 												}else{
		 													sessionStorage.setItem("member",JSON.stringify(data[1]));
		 													sessionStorage.setItem("key",data[2]) ;
		 													showpage(97);
		 												}
		 											});
		 									});
		 								}
		 							}, {scope: 'email,user_birthday'});
		 					}else{
		 						swal("請同意相關條款");
		 					}
		 				}else{
		 					var fbcode="123456axc";
		 						FB.login(function(response) {
		 							if(response.authResponse) {
		 								access_token = response.authResponse.accessToken; //get access token
		 								xfbid = response.authResponse.userID; //get FB UID
		 								FB.api('/me?fields=birthday,email,name', function(response) {
		 										fbname=response.name;
		 										fbmail=response.email;
		 										fbbirth=response.birthday;
		 										if(me.data("type")=="link"){//登入串聯
		 											setTimeout(function(){
		 												poploginap(xfbid,fbname,fbmail,fbbirth);
		 											},500);
		 										}else if(me.data("type")=="login"){// fb 登入
		 											var trem=$("#"+$(this).data("type")+" .formfield");
		 											var tempvals=Array("2",xfbid,fbname,fbmail,fbbirth,fbcode);
		 											tempitem=ajaxarr("mem_login",tempvals,ajaxurl);
		 											tempitem.success(function(data){//回傳 data 義
		 												if(data[0]=="ERR"){
		 													swal(data[1]);
		 												}else if(data[0]=="OKFB"){//尚未完成填寫資料
															var d = new Date();
															var n = d.getTime();
		 													sessionStorage.setItem("member",JSON.stringify(data[1]));
		 													sessionStorage.setItem("key",data[2]) ;
		 													localStorage.setItem("re_userid",data[2]);
		 													localStorage.setItem("re_key",data[7]);
		 													localStorage.setItem("re_time",n+86400*30000);
		 													showpage(97);
		 													//chk_mem(data[1]);
		 												}else{
		 													swal("登入成功了,謝謝");
															var d = new Date();
															var n = d.getTime();
		 													sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
		 													sessionStorage.setItem("userid",data[2]) ;
		 													sessionStorage.setItem("key",data[3]) ;
		 													sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
		 													sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
		 													sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
		 													localStorage.setItem("re_userid",data[2]);
		 													localStorage.setItem("re_key",data[7]);
		 													localStorage.setItem("re_time",n+86400*30000);
		 													//設定gameselect
		 													if(localStorage.getItem("gameselect") && localStorage.getItem("gameselect").length>10){
		 														//alert(localStorage.getItem("gameselect"))
		 													}else{
		 														var tempx= new Array();
		 														var temp = new Object();
		 														temp.gameid="9999";
		 														temp.show="1";
		 														tempx.push(temp);
		 														localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
		 													}
		 													showpage(1);
		 													refreshchk();
		 													show_afterloginhead();
		 													if(data[1]['phonev']=="0"){
		 														setTimeout(function(){
		 															pop_vrequest();
		 														},3000);
		 													}
		 												}
		 											});
		 										}
		 								});
		 							}
		 						}, {scope: 'email,user_birthday'});
		 				}
		 			});
	 		}
		}
	//所有程式包裹在這裏面
	function allstart(){
		//pop_vrequest();
		//############ 起始抓取資料 ####################
		framerefresh();//開始執行即時功能
		//set_chaticon();//設定聊天室貼圖,在share.js
		//設定右下角搜尋
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
		//	$("#friendsearchbox").show();
		}else{
		//	$("#friendsearchbox").hide();
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
			if($("#popcontentbox").data("type") && $("#popitemlast") ){//有值的才跑 && 有最下面的div的才跑
				if(scroll>=($(document).height()-($(window).height()+250)) && sessionStorage.getItem("popgetmore")==1){//繼續抓資料
					sessionStorage.setItem("popgetmore","2");
					if($("#popitemlast").data("select")){
						popgetmoreboard($("#popitemlast").data("select"));
					}else{
						popgetmoreboard();
					}
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
		var isdown=0;
		var pindist=0;//两手指距离
		//var alldis=0;
		var startrat=0;
		var mtouchx=0;
		var mtouchy=0;
		var ptouchx=0;
		var ptouchy=0;
		var curimgrate=100;
		$("body").delegate("#poptouchimg","touchstart",function(e){
			e.preventDefault();
			var me=$(this);
			isdown=1;
			if(e.originalEvent.touches.length == 2) {//两手指
				ptouchx=parseInt($("#poptouchimg").css("left"));
				ptouchy=parseInt($("#poptouchimg").css("top"));
				pindist =Math.sqrt((e.originalEvent.touches[0].clientX-e.originalEvent.touches[1].clientX) * (e.originalEvent.touches[0].clientX-e.originalEvent.touches[1].clientX) +(e.originalEvent.touches[0].clientY-e.originalEvent.touches[1].clientY) * (e.originalEvent.touches[0].clientY-e.originalEvent.touches[1].clientY));
				if(e.originalEvent.touches[0].clientX<e.originalEvent.touches[1].clientX){
					mtouchx=e.originalEvent.touches[0].clientX;
				}else{
					mtouchx=e.originalEvent.touches[1].clientX;
				}
				if(e.originalEvent.touches[0].clientY<e.originalEvent.touches[1].clientY){
					mtouchy=e.originalEvent.touches[0].clientY;
				}else{
					mtouchy=e.originalEvent.touches[1].clientY;
				}
				if(startrat){
				}else{
					curimgrate=$("#poptouchimg").width();//2018 add
					startrat=curimgrate;
				}

			}else if(e.originalEvent.touches.length == 1) {
				csgx=e.originalEvent.touches[0].clientX;
				csgy=e.originalEvent.touches[0].clientY;
			//	me.css("left",parseInt(me.css("left"))+csgx);
			//	me.css("top",parseInt(me.css("top"))+csgy);

			}
		});
		$("body").on('touchEnd',function(e){
			e.preventDefault();
			isdown=0;
		});
		$("body").delegate("#poptouchimg","touchmove",function(e){
			var me=$(this);
			if(e.originalEvent.touches.length == 2) {//两手指
				if($("#poptouchimg").length>0){
					xdis=(e.originalEvent.touches[0].clientX-e.originalEvent.touches[1].clientX);
					ydis=(e.originalEvent.touches[0].clientY-e.originalEvent.touches[1].clientY);
					newpindist =Math.sqrt(xdis*xdis +ydis*ydis);
					alldis=newpindist-pindist;
					pindist=newpindist;
					//thisrat=100*(alldis/$("#poptouchimg").width());
					thisrat=alldis;// 2018改
					currat=parseInt(startrat+thisrat);//
					if(currat<orgrate){
						currat=orgrate;//2018改
					}
					//alert(currat)
					//$("#tttt").remove();
					//$("#allpopimgwrap").append("<div id='tttt' style='position:absolute;top:10px;right:10px;z-index:9999;color:#fff;'>"+orgrate+"-"+currat+"</div>");
					  startrat=currat;
						if(e.originalEvent.touches[0].clientX<e.originalEvent.touches[1].clientX){
							nf=ptouchx+(e.originalEvent.touches[0].clientX-mtouchx);
						}else{
							nf=ptouchx+(e.originalEvent.touches[1].clientX-mtouchx);
						}
						if(e.originalEvent.touches[0].clientY<e.originalEvent.touches[1].clientY){
							nt=ptouchy+(e.originalEvent.touches[0].clientY-mtouchy);
							}else{
							nt=ptouchy+(e.originalEvent.touches[1].clientY-mtouchy);
							}
						//$("#poptouchimg").css("position","absolute").css( "width", currat+"%" );
						$("#poptouchimg").css("position","absolute").css( "width", currat);
						if($("#poptouchimg").width()>$(window).width() && nf>0){
							nf=0;
						}else if(nf<$(window).width()-$("#poptouchimg").width()){
							nf=$(window).width()-$("#poptouchimg").width()
						}else if($("#poptouchimg").width()==$(window).width()){
							nf=0;
						}
						if($("#poptouchimg").height()>$(window).height() && nt>0){
							nt=0;
						}else if($("#poptouchimg").height()>$(window).height() && nt<($(window).height()-$("#poptouchimg").height())){
							nt=$(window).height()-$("#poptouchimg").height()
						}
						//else if($(window).height()>$("#poptouchimg").height() && nt>($(window).height()-$("#poptouchimg").height())){
							//nt=$(window).height()-$("#poptouchimg").height()
						//}
					//	else if($(window).height()>$("#poptouchimg").height() && nt<0){
					//		nt=0;
					//	}
						else if($(window).height()>$("#poptouchimg").height()){//小於都保持在上面
							nt=($(window).height()-$("#poptouchimg").height())/2;
						}
						$("#poptouchimg").css("top", nt ).css( "left" , nf );
						mtouchy=nt;
						mtouchx=nf;
					}
			}else if(e.originalEvent.touches.length == 1) {
				if(isdown==1){
					if($("#poptouchimg").length>0){
						nf=parseInt($("#poptouchimg").css("left"))+(e.originalEvent.touches[0].clientX-csgx);
						nt=parseInt($("#poptouchimg").css("top"))+(e.originalEvent.touches[0].clientY-csgy);
						if($("#poptouchimg").width()>$(window).width() && nf>0){
							nf=0;
						}else if(nf<$(window).width()-$("#poptouchimg").width()){
							nf=$(window).width()-$("#poptouchimg").width()
						}else if($("#poptouchimg").width()==$(window).width()){
							nf=0;
						}
						if($("#poptouchimg").height()>$(window).height() && nt>0){
							nt=0;
						}else if($("#poptouchimg").height()>$(window).height() && nt<($(window).height()-$("#poptouchimg").height())){
							nt=$(window).height()-$("#poptouchimg").height()
						}
						/*
						else if($(window).height()>$("#poptouchimg").height() && nt>($(window).height()-$("#poptouchimg").height())){
							nt=$(window).height()-$("#poptouchimg").height()
						}else if($(window).height()>$("#poptouchimg").height() && nt<0){
							nt=0;
						}
						*/
						else if($(window).height()>$("#poptouchimg").height()){
							nt=($(window).height()-$("#poptouchimg").height())/2;
						}
						$("#poptouchimg").css("left",nf).css("top",nt);
						csgx=e.originalEvent.touches[0].clientX;
						csgy=e.originalEvent.touches[0].clientY;
					}
				}
			}
		});
		//更換框架
		$("body").delegate(".pageclick","click",function(e){
			e.preventDefault();
			if($(this).data("type")=="artpage"){//這是應付手機板修改所做的
				show_centerartpage($(this).data("val"));
			}else{
				curpage=$(this).data("type");
				history.pushState({page:curpage}, '', "?page="+curpage);//history
				//window[curpage]();
				$('html, body').stop().animate({scrollTop:0},100);
				var dd="";
				if($(this).data("id")){
					dd=$(this).data("id");
				}
				var w=$("#rightmenuwrap").html();
				showpage($(this).data("val"),dd);
			}
		});
		//縮回chat 選圖框
		/*
		$("body").delegate("#dialog-windows","click",function(){
			if($(this).hasClass("short")){
				$("#dialog-windows").removeClass("short");
				$(".chart").removeClass("on");
				$(".chart .fa-smile-o").addClass("on");
			}
		});
		*/
		//pop 更換框架
		$("body").delegate(".ppageclick","click",function(e){
			e.preventDefault();
			$(this).parents(".hwrap").children(".hlist").hide();
			$(this).parents(".hwrap").children(".htitle").removeClass("htitleon");
			curpage=$(this).data("type");
			$('html, body').stop().animate({scrollTop:0},100);
			showpage($(this).data("val"));
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
				show_mypagearticle(y,1,'','');
			}else if(x==4){
				show_mypagefriend(y);
			}else if(x==5){
				show_mypagephoto(y,1);
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
		//copy to clipboard
		$("body").delegate(".copytoclip","click",function(){
			var target=$($(this).data("target"));
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val(target.text()).select();
			document.execCommand("copy");
			$temp.remove();
			swal("連結已複製至剪貼簿");
		});
		// ########### mobile 相關 ####################
		//顯示上層內容(mobile 特別)
		$("body").delegate(".popclick","click",function(){
			var me=$(this);
			if(me.data("close") && me.data("close")=="all"){
				closeallframe();
			}
			if(me.data("type")=="wallspeak"){//pop wallspeak--動態牆回應
				show_centerwallreply(me.data("id"));
			}else if(me.data("type")=="replybox"){//pop wallspeak--動態牆回應某人
				show_centerwallreplypostbox(me.data("id"),me.data("tag"),me.data("tagname"),me.data("aid"));
			}else if(me.data("type")=="mypage"){//我的資料
				if($("#popfull").length>0){
					$(".htitle").removeClass("htitleon");
					popfullclose();
				}
				if(me.data("id")){
					pthisid=me.data("id");
				}else{
					pthisid=sessionStorage.getItem("userid");
				}
				//在朋友列表按...要關掉所有的
				if($("#popuseru").length>0){
					popusercloseu();
					popuserclose();
				}
				show_mypageall(me.data("val"),pthisid);


			}else if(me.data("type")=="emailform"){//我的資料
				pop_eform();
			}else if(me.data("type")=="phoneform"){//我的資料
				popcloseu();
				pop_vform();
			}else if(me.data("type")=="qnaspeak"){//顯示QNA內頁
				show_centerqnainpage(me.data("id"))
			}else if(me.data("type")=="qnaask"){
				if(me.data("id")){
					get_centerqnapostbox(me.data("id"));
				}else{
					get_centerqnapostbox();
				}
			}else if(me.data("type")=="artpage"){//顯示art內頁
				show_centerartpage(me.data("val"))
			}else if(me.data("type")=="artspeak"){//顯示art內頁留言
				show_centerartreplyin(me.data("id"))
			}else if(me.data("type")=="shopbuy"){//顯示兌換表格
				show_shopform(me.data("id"))
			}else if(me.data("type")=="selectgametag"){//pop tag 選單
				me.blur();
				setTimeout(function(){
					show_centertaglist(me.data("id"));
				},500)

			}
		});
		$("body").delegate(".popclick","focus",function(){
			var me=$(this);
			me.blur();
			me.parents(".blurto").focus();
			if(me.data("type")=="qnapost"){//QNA回復的發言框
				show_centerqnareplypostbox(me.data("id"))
			}
		});
		//我的朋友搜尋
		$("body").delegate("#myfriendsearchclick","click",function(){
			if($("#myfriendval").val()){
				var sitem=$("#myfriendwrap").find(".name");
				$("#myfriendwrap").find(".list").hide();
				for(var a=0;a<sitem.length;a++){
					//vname=sitem.eq(a).find(".name").html().split("<span>")[0];
					vname=sitem.eq(a).html().split("<span>")[0];
					if(vname.indexOf($("#myfriendval").val())>=0){
						sitem.eq(a).parents(".list").show();
					}
				}
			}
		});
		//wall 按下發言
		$("body").delegate(".wallinputclick","focus",function(){
			show_centerwallpostbox();
			$(this).blur();
		});
		//遊戲名字快選--輸入文字顯示快選內容
		var gamekeyval="";
		$("body").delegate(".game-input","keyup touchend",function(){
			var out="";
			if($(this).val().length>0){
				if($(this).val()!=gamekeyval){
					gamekeyval=$(this).val();
					tags=JSON.parse(sessionStorage.getItem("tags"));
					for(var a=0;a<tags.length;a++){
						if(tags[a]['gamename'].indexOf(gamekeyval)>=0){
							out+="<li class='active-result tagselectclick tagselectlist' data-id="+tags[a]['gameid']+" data-name='"+tags[a]['gamename']+"'>"+tags[a]['gamename']+"</li>";
						}
					}
					$(".game-list").html(out);
				}
			}else if($(this).val()!=gamekeyval){
				tags=JSON.parse(sessionStorage.getItem("tags"));
					for(var a=0;a<tags.length;a++){
						out+="<li class='active-result tagselectclick tagselectlist' data-id="+tags[a]['gameid']+" data-name='"+tags[a]['gamename']+"'>"+tags[a]['gamename']+"</li>";
					}
				$(".game-list").html(out);
			}

		});
		//遊戲tag 選單按鈕--選擇//送回表單--關閉選單
		$("body").delegate(".tagselectclick","click",function(){
			//檢查如果同時有其他的選單有同值
			//var olist=$(".popclick");
			olist=$(".gametagselect");
			var flag=0;
			var myid=$(this).parents(".game-list").data("id");
			for(var a=0;a<olist.length;a++){
				if(olist.eq(a).data("type")=="selectgametag" && !olist.eq(a).hasClass("stagcover") && olist.eq(a).val()==$(this).data("id") && olist.eq(a).attr("id")!=myid){
					flag=1;
				}
			}
			if(flag==0){
				 //$("#"+myid).show();
				 $("#"+myid+" option").remove();
				 $("#"+myid).append($("<option></option>").attr("value", $(this).data("id")).text($(this).data("name")));
				 $("#"+myid).val($(this).data("id"));
				 popfullclosechatu2();
			}else{
				swal("其他選單已選擇這個遊戲,請選擇其他遊戲");
			}
		});
		$("body").delegate(".birthyear,.birthmonth ","change",function(){
			if($(".birthyear").val() && $(".birthmonth").val()){
				var d = new Date($(".birthyear").val(),$(".birthmonth").val(), 0);
				$(".birthday option").remove();
				var ot="";
				ot="<option value=''>日</option>";
				for(var a=1;a<=d.getDate();a++){
					ot+="<option value='"+a+"'>"+a+"</option>";
				}
				$(".birthday").append(ot);
			}
		});
		$("body").delegate("#chattitlebox","click",function(){
			var xid=$(this).parents(".chatroom").data("id");
			show_memberlist(xid);
		});
		$("body").delegate(".notchatsubselect","click",function(){
			var me=$(this);
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("val"));
			tempitem=ajaxarr("upchatroomtype",tempvals,ajaxurl);
			tempitem.success(function(data){
				if(data[0]=="ERR"){
				}else{
					if(me.data("type")=="out"){
						me.parents(".noread").remove();
						swal("已退出聊天室");
					}else if(me.data("type")=="close"){
						me.html("開啟提醒");
						me.data("type","open");
						swal("提醒已關閉");
					}else if(me.data("type")=="open"){
						me.html("關閉提醒");
						me.data("type","close");
						swal("提醒已開啟");
					}

				}
			});
		});
		/* #######################  mobile end ######################### */
		//切換icon hover
		$("body").delegate(".leftinfoselectitemcircle","mouseenter",function(e){
			$(this).children(".leftinfoselectitemin").stop().animate({"left":-38},300);
			$(this).children(".leftinfoselectitembg").stop().animate({"opacity":1},300);
		});
		$("body").delegate(".leftinfoselectitemcircle","mouseleave",function(e){
			$(this).children(".leftinfoselectitemin").stop().animate({"left":0},300);
			$(this).children(".leftinfoselectitembg").stop().animate({"opacity":0},300);
		});
		//右上角選單 手機是右下角
		$("body").delegate(".submenuclick","click",function(e){
			$("footer .menu").removeClass("on");
			if($(this).data("val")==1){
			}else if($(this).data("val")==2){//貢獻值
				print_energy();
			}else if($(this).data("val")==3){//會員條款
				popmember();
			}else if($(this).data("val")==4){//隱私權聲明
				popprivacy();
			}else if($(this).data("val")==5){//聯絡我們
				popcontactus();
			}else if($(this).data("val")==6){//登出
				curpage="wallpage";
				//要更新後台
				var tempvals=Array('tretete86758456','');
				tempitem=ajaxarr("mem_logoff",tempvals,ajaxurl);
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						sessionStorage.setItem("member",'');//更新
						sessionStorage.setItem("userid",'') ;
						sessionStorage.setItem("key",'') ;
						sessionStorage.setItem("point010",'');//更新
						sessionStorage.setItem("point012",'');//更新
						sessionStorage.setItem("point014",'');//更新
						localStorage.removeItem("gameselect");
						localStorage.removeItem("re_userid");
						localStorage.removeItem("re_key");
						localStorage.removeItem("re_time");
						if(ismobile==2 && fbname){
							window.location = "index.html";
						//	facebookConnectPlugin.logout(function(){window.location = "index.html";},function(){window.location = "index.html";});
						}else{
							window.location = "index.html";
						}
					}
				});
			}else if($(this).data("val")==7){//手機認證
				pop_vform();
			}
			$("#rightmenuwrap").hide();
			$(".showrightmenu").children(".fachanger").removeClass("fa-caret-up");
			$(".showrightmenu").children(".fachanger").addClass("fa-caret-down");
		});
		//變更感興趣的遊戲--因為功能修改...原來'應該是' 正在玩的遊戲 ...所以..保留舊的在下面
		$("body").delegate(".aboutclick","click",function(e){
			e.preventDefault();
			me=$(this);
			x=$(this).data("name");
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
			if(x=="intgamedel"){
				myval=me.data("id");
				if(gameselect.length>2){
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']==myval){
							gameselect.splice(a, 1);
							flag=1;
						}
					}
					localStorage.setItem("gameselect",JSON.stringify(gameselect));
					//更新目前畫面
					var temp=show_mypageinterestlist();
					$("#mypageintwrap").html(temp);
					showpage('');
				}else{
					swal("感興趣的遊戲至少需保留一個");
				}
			}else if(x=="intgameshow"){
				myval=me.data("id");
				if(me.hasClass("fayellow")){//目前開啟--關閉
					teston=0;
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']==myval){
							gameselect[a]['show']=0;
						}else if(gameselect[a]['show']==1){
							teston++;
						}
					}
					if(teston==0){
						for(var a=0;a<gameselect.length;a++){
							if(gameselect[a]['gameid']=="9999"){
								gameselect[a]['show']=1;
							}
						}
					}
					me.removeClass("fayellow");
					me.addClass("close");
					me.addClass("fagray");
				}else{//目前關閉--開啟
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']==myval){
							gameselect[a]['show']=1;
						}else if(gameselect[a]['gameid']=="9999"){
							gameselect[a]['show']=0;
						}
					}
					me.addClass("fayellow");
					me.removeClass("close");
					me.removeClass("fagray");
				}
				localStorage.setItem("gameselect",JSON.stringify(gameselect));
				//更新下層顯示畫面
				showpage('');
			}else if(x=="intgameadd"){//新增一條
				thisval=$("#aboutaddgame").val();
				if(thisval && thisval.length>0){
					var flag=0;
					if(gameselect.length>=6){
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
						temp.show=1;
						gameselect.push(temp);
						for(var a=0;a<gameselect.length;a++){
							if(gameselect[a]['gameid']=="9999"){
								gameselect[a]['show']=0;
							}
						}
						localStorage.setItem("gameselect",JSON.stringify(gameselect));
						//更新目前畫面
						var temp=show_mypageinterestlist();
						$("#mypageintwrap").html(temp);
						//更新下層顯示畫面
						showpage('');
					}else if(flag==1){
						swal("本遊戲已在名單中");
					}else if(flag==2){
						swal("最多只能選擇5個遊戲");
					}
				}else{
					swal("請先選擇遊戲");
				}
			}
		});
		//確認更換圖片
		$("body").delegate(".clickconfirm","click",function(e){
			var me=$(this);
			if(me.data("type")=="headpic"){
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadheadc",tempvals,ajaxurl);
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
				tempitem=ajaxarr("uploadfrontc",tempvals,ajaxurl);
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
		// 跳出相片

		$("body").delegate(".popimgclick","click",function(){
			var temp=$(this).data('type');
			if(temp=="chat"){
				//var tem=$(this).children("img").attr("src").split("uploadfile/")[1];
				//popimg(tem,'','','');
			}else if(temp=="self"){
				var tem=$(this).data("val");
				popnewsimgself(tem);
			}else if(temp=="gonext"){
				curimgrate=100;
				popnewsimg(curpopimg,$(this).data('val'));
			}else{
				curpopimg="";
				var me=$(this);
				var tempvals=Array("1",$(this).data('val'),$(this).data('type'));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
				tempitem=ajaxarr("getpics",tempvals,ajaxurl);
				tempitem.success(function(data){
					if(data[0]=="ERR"){
					}else{
						var myid="";
						curpopimg=data[1];
						for(var a=0;a<curpopimg.length;a++){
							if(data[1][a]['thisfile']==me.data("src")){
								myid=data[1][a]['thisid'];
							}
						}
						curimgrate=100;
						popnewsimg(curpopimg,myid);
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
		$("body").delegate(".htitle","click",function(){
			if($(this).hasClass("htitleon")){
			}else{
				var me=$(this);
				$(".htitle").removeClass("htitleon");
				me.addClass("htitleon");
				//送去ajax
				if($("#popfull")){
					popfullclose();
				}
				popbasefull("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("type"));// 類別,ID
				tempitem=ajaxarr("clr_notice",tempvals,ajaxurl);
				tempitem.success(function(data){//回傳 data 義
					popfullclose();
					if(data[0]=="ERR"){
						popnoticall(me,"");
					}else{
						popnoticall(me,data[1]);
					}
				});
				//新版有些問題..恢復舊版
				/*
				var me=$(this);
				$(".htitle").removeClass("htitleon");
				me.addClass("htitleon");
				//送去ajax
				if($("#popfull").length>0){
					$("#popfull").find("ul").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
				}else{
					var inlist=$("#mainheader").find(".htitle");
					var out="";
					out+="        <header id='noticewrap'>";
					out+="            <div class='link back applebtn popfullclose' >";
					out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
					out+="                <span>返回</span>";
					out+="            </div>";
					out+="        </header>";
					out+="        <ul>";
					out+="					<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
					out+="        </ul>";
					popbasefull(out);
					for(var a=0;a<inlist.length;a++){
						if(inlist.eq(a).data("type")==me.data("type")){
							inlist.eq(a).clone(true).appendTo("#noticewrap");
							v=a;
						}else{
							inlist.eq(a).clone(true).appendTo("#noticewrap");
						}
					}
				}
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("type"));// 類別,ID
				tempitem=ajaxarr("clr_notice",tempvals,ajaxurl);
				tempitem.success(function(data){//回傳 data 義
					if(data[0]=="ERR"){
						popnoticall(me,"");
					}else{
						popnoticall(me,data[1]);
					}
				});
				*/
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
			tempitem=ajaxarr("returnme",tempvals,ajaxurl);
			tempitem.success(function(data){//回傳 data 義
				if(data[0]=="ERR"){
					swal(data[1]);
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
			}else if(thisval==99){
				if(window.confirm("確認要檢舉嗎?")) {
					if($("#reporttext").val()){
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"1",thistype,thisid,$("#reporttext").val());// 類別,ID
						tempitem=ajaxarr("reactions",tempvals,ajaxurl);
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								popcloseu();
								setTimeout(function(){
									swal(data[1]);
									lastme.parents(".article").remove();
									lastme.parents(".sub").removeClass("on");
								},600);
							}else{
								 popcloseu();
								lastme.parents(".article").remove();
								swal("資料已經送至版主,謝謝您協助我們打造更好的未來");
							}
						});
					}else{
						swal("請輸入檢舉原因");
					}
				}
			}else if(thisval==2){
				if(window.confirm("確認要收藏嗎?")) {
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,thistype,thisid);// 類別,ID
					tempitem=ajaxarr("reactions",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							swal(data[1]);
						}else if(data[0]=="ERRP"){
							popnotice(data[1]);
						}else{
							me.parents(".sub").removeClass("on");
							swal("資料已經收藏");
						}
					});
				}
			}else if(thisval==3){
				if(window.confirm("是否確認刪除？提醒您，刪除後將無法回復")) {
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,thistype,thisid);// 類別,ID
					tempitem=ajaxarr("reactions",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							swal(data[1]);
						}else if(data[0]=="ERRX"){
							popnotice(data[1]);
						}else{
							if(thisjob=="c"){
								show_centerarc(2);
							}else{
								if(me.data("type")=="qna"){
									var mlist=$(".article");
									for(var a=0;a<mlist.length;a++){
										if(mlist.eq(a).data("id")==thisid){
											mlist.eq(a).remove();
										}
									}
									if($("#popfull").length>0){
										popfullclose();
									}
								}else if(me.data("type")=="article"){
									curpage="mypage";
									history.pushState({page:curpage}, '', "?page="+curpage);//history
									$('html, body').stop().animate({scrollTop:0},100);
									var dd="";
									showpage("3",dd);
								}else if(me.data("type")=="wallreply"){
									me.parents(".mcreplyitem").remove();
								}else if(me.data("type")=="arc"){
									//減數量
									if(me.data("k") && me.data("k")=="w"){
										$("#wallcollect").html(parseInt($("#wallcollect").html())-1);
									}else{
										$("#artcollect").html(parseInt($("#artcollect").html())-1);
									}
									me.parents(".mcreplyitem").remove();
								}else if(me.data("type")=="alb"){
									me.parents(".list").remove();
								}else if(me.data("type")=="pho"){
									me.parents(".list").remove();
								}else{//wall
									//me.parents(".delhide").remove();
									me.parents(".article").remove();
								}
							}
						}
					});
				}
			}else if(thisval==4){//編輯--四個地方有-動態牆/攻略/QA/相簿--相簿有-新增/修改文字/新增圖片
				if($(this).data("type")=="wall"){
					show_centerwallpostbox(thisid);
				}else if($(this).data("type")=="qna"){
					if(me.data("id")){
						get_centerqnapostbox(me.data("id"));
					}
				}else if($(this).data("type")=="article"){
					show_centerpublish(thisid);
				}else if($(this).data("type")=="albumnew"){
					show_centeralbumboxnew();
				}else if($(this).data("type")=="albumtext"){
					show_centeralbumboxtext(thisid);
				}else if($(this).data("type")=="albumphoto"){
					show_centeralbumboxphoto(thisid);
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
					if(window.confirm("選擇這個答案為最佳答案?請注意選擇後無法更改")){
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("key"),me.data("id"));// 類別,ID
						tempitem=ajaxarr("givepoint",tempvals,ajaxurl);
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								swal(data[1]);
							}else if(data[0]=="ERRP"){
								popnotice(data[1]);
							}else{
								swal(data[1]);
								show_afterloginhead();//重新顯示人物資料
								if(me.data("val")=="maker"){
									//重新製作頁面
									show_centerqnainpage(me.data("key"));
									var mlist=$("#maincontentbox").find(".article");
									for(var a=0;a<mlist.length;a++){
										if(mlist.eq(a).data("id")==me.data("key")){
											mlist.eq(a).addClass("end");
										}
									}
									//me.parents(".mcreplyqna").html("<span class='qnapwin'>最佳正解</span>");//這是舊的?
								}else{
									me.addClass("qnapoff");
									me.removeClass("qnap");
									me.data("type","");
									me.data("id","");
									//cp=parseInt(me.siblings(".qnaptext").text());
									//me.siblings(".qnaptext").text(cp+1);
								}
							}
						});
					}
				}else if(window.confirm("是否確認投票支持這個回答？")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("key"),me.data("id"));// 類別,ID
					tempitem=ajaxarr("givepoint",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							swal(data[1]);
						}else if(data[0]=="ERRP"){
							popnotice(data[1]);
						}else{
							swal(data[1]);
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
				if(window.confirm("用貢獻值給個讚?")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("type"),me.data("id"));// 類別,ID
					tempitem=ajaxarr("givepoint",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							swal(data[1]);
						}else if(data[0]=="ERRP"){
							popnotice(data[1]);
						}else{
							if(me.data("type")=="news"){
								sessionStorage.setItem("point010",JSON.stringify(data[1]));//更新
								//有兩個地方要更新數字及去掉給讚--點數是 data[3] 按讚數是 data[2]
								var tlist=$(".allnewspoints");
								for(var a=0;a<tlist.length;a++){
									if(tlist.eq(a).data("id")==me.data("id")){
										tlist.eq(a).html(data[3]);
									}
								}
								var clist=$(".newsbgip");
								for(var a=0;a<clist.length;a++){
									if(clist.eq(a).data("id")==me.data("id")){
										clist.eq(a).html('');
									}
								}
							}else if(me.data("type")=="newsreply"){
								sessionStorage.setItem("point012",JSON.stringify(data[1]));//更新
							}
							show_afterloginhead();//重新顯示人物資料
							me.addClass("bgipoff");
							me.removeClass("bgip");
							me.data("type","");
							me.data("id","");
							if(me.hasClass("t3")){
								me.siblings(".link").removeClass("t3");
								me.siblings(".link").addClass("t2");
								me.remove();
							}else if(me.hasClass("t2")){
								me.siblings(".link").removeClass("t2");
								me.siblings(".link").addClass("t1");
								me.remove();
							}
						}
					});
				}
			}
		});
		//########## 登入相關 ##################################
		//登入登出
		$("body").delegate(".loginclick","click",function(){
			if($(this).data("type")=="ap"){
				setTimeout(function(){
					poploginap();
				},500);
			}else{
				showpage(99);
				//poplogin();
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
				showpage(98);
				//registerform();
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
			show_forget();
		});
		// ############ 搜尋 #############################
		$("body").delegate(".searchsubmit","click",function(e){
			key=$(this).siblings(".searchtext").val();
			if($(this).data("type")=="article"){
				get_centerarticlelist(curtab,1,key);
			}else if($(this).data("type")=="myarticle"){
				show_mypagearticlein($(this).data("1"),$(this).data("2"),key,'')
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
				}else{
					mypg=1;
				}
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
				var me=$(this);
				if($(this).data("type")=="orderform"){
					mylist=$("#"+ $(this).data("type") +" .form-control");
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
					//radioval=$("#orderform input[name=pickup]:checked").val();
					if(passme==1){
						me=$(this);
						//me.parents("label").append("<div id='tempcover' style='position:absolute;top:0;left:0;width:100%;height:100%;z-index:99;text-align:center;'><img src='img/loaderys.gif' style='margin:5px auto;'></div>");
						radioval=2;
						mylistb=$("#"+ $(this).data("type") +" .formfield");
						//密碼-id-姓名-電話-email-radioval-確認email  / 密碼-id-姓名-電話-收件地址-radioval-email-備註
						//4-0-1-2-5-radioval-3-6
						if(mylistb.eq(5).val()){v5=mylistb.eq(5).val();}else{v5='';}
						if(mylistb.eq(6).val()){v6=mylistb.eq(6).val();}else{v6='';}
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylistb.eq(4).val(),mylistb.eq(0).val(),mylistb.eq(1).val(),mylistb.eq(2).val(),v5,radioval,mylistb.eq(3).val(),v6);
							tempitem=ajaxarr("saveorder",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								$("#tempcover").remove();
								if(data[0]=="ERR"){
									swal(data[1]);
								}else if(data[0]=="ERRP"){
									popnotice(data[1]);
								}else{
									swal("恭喜製作商品成功，您的訂單已送出");
									popfullcloseu();
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
							var tempvals=Array("1",mylist.eq(0).val(),mylist.eq(1).val(),fcmid);
							tempitem=ajaxarr("mem_login",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								if(data[0]=="ERR"){
									swal(data[1]);
									//$("#codepagew").html(data[2]);
								}else{
									swal("您已成功登入NEED！");
									//這邊套登入相關
									var d = new Date();
									var n = d.getTime();
									localStorage.setItem("re_userid",data[2]);
									localStorage.setItem("re_key",data[7]);
									localStorage.setItem("re_time",n+86400*30000);
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]) ;
									sessionStorage.setItem("key",data[3]) ;
									sessionStorage.setItem("point010",JSON.stringify(data[4]));//更新
									sessionStorage.setItem("point012",JSON.stringify(data[5]));//更新
									sessionStorage.setItem("point014",JSON.stringify(data[6]));//更新
									//設定gameselect
									if(localStorage.getItem("gameselect") && localStorage.getItem("gameselect").length>10){
									}else{
										var tempx= new Array();
										var temp = new Object();
										temp.gameid="9999";
										temp.show="1";
										tempx.push(temp);
										localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
									}
									showpage(1);
									refreshchk();
									show_afterloginhead();
									if(data[1]['phonev']=="0"){
										setTimeout(function(){
											pop_vrequest();
										},3000);
									}
								}
							});
					}
				}
				else if($(this).data("type")=="forgetform"){//忘記密碼
					passme=1;
					mylist=$("#"+$(this).data("type")+" .form-control");
					for(var a=0;a<mylist.length;a++){
							if(vtext(mylist.eq(a),1,'',300)){
							}else{
								passme=0;
							}
					}
					if(passme==1){
							//檢查驗證碼
							var tempvals=Array("1",mylist.eq(0).val());
							tempitem=ajaxarr("mem_forget",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								if(data[0]=="ERR"){
									swal(data[1]);
								}else{
									swal("忘記密碼確認信已經寄至您的信箱<BR>請前往查看<BR><BR>"+company+"敬上");
								}
							});
					}
				}
				else if($(this).data("type")=="popmemberform"){//驗證後會員
					passme=1;
					mylist=$("#"+$(this).data("type")+" .form-control");
					for(var a=0;a<mylist.length;a++){
						if(mylist.eq(a).attr("name")=="email"){
							if(vemail(mylist.eq(a),'')){
							}else{
								passme=0;
								return false;
							}
						}else if(mylist.eq(a).attr("name")=="nick"){
								if(vtext(mylist.eq(a),4,'',15)){
								}else{
									passme=0;
									return false;
								}
						}else{
								if(vtext(mylist.eq(a),1,'',200)){
								}else{
									passme=0;
									return false;
								}
						}
					}
					if(passme==1){
						var gg=$(".birthyear").val()+"-"+(0+$(".birthmonth").val()).slice(-2)+"-"+(0+$(".birthday").val()).slice(-2);
						t=Date.parse(gg);
						if(isNaN(t)){
							passme=0;
							swal("請選擇正確的生日");
							return false;
						}
						for(var a=0;a<3;a++){
							if(stringBytes($(".rgnotes").eq(a).val())>60){
								passme=0;
								swal($(".rgnotes").eq(a).data("err"));
								return false;
							}
						}
					}
					if(passme==1){
							var alllist=$("#"+$(this).data("type")+" .formfield");//暱稱/性別/生日年/生日月/生日日/地區/email/遊戲1/遊戲1note/遊戲2/遊戲2note/遊戲3/遊戲3note/遊戲時段/大頭貼
							var tempvals=Array(sessionStorage.getItem("key"),alllist.eq(0).val(),alllist.eq(1).val(),alllist.eq(2).val(),alllist.eq(3).val(),alllist.eq(4).val(),alllist.eq(5).val(),alllist.eq(6).val(),alllist.eq(7).val(),alllist.eq(8).val(),alllist.eq(9).val(),alllist.eq(10).val(),alllist.eq(11).val(),alllist.eq(12).val(),alllist.eq(13).val(),alllist.eq(14).val());
							tempitem=ajaxarr("mem_actsave",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								if(data[0]=="ERR"){
									swal(data[1]);
								}else{
									sessionStorage.setItem("member",JSON.stringify(data[1]));//更新
									sessionStorage.setItem("userid",data[2]);
									//設定正在玩的遊戲-成感興趣的遊戲
									var tempx= new Array();
									var temp = new Object();
									temp.gameid="9999";
									temp.show="0";
									tempx.push(temp);
									for(b=6;b<11;b+=2){
										if(alllist.eq(b).val().length>0){
											var temp = new Object();
											temp.gameid=alllist.eq(b).val();
											temp.show="1";
											tempx.push(temp);
											//gameselect[a]['gameid']=alllist.eq(b).val();
											//gameselect[a]['show']=1;
											//a++;
										}
									}
									localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
									$("#mainwrap").html("<div style='font-size:30px;line-height:50px;color:#fff;text-align:center;padding:60px 15px;'>謝謝您的加入<BR>請稍待片刻我們替您登入<BR><BR>"+company+"敬上</div>");
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
								if(vcheckb(mylist.eq(a))){
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
							me.removeClass("submitclick");
							me.addClass("submitclicktemp");
							me.html("請稍待...");
							var tempvals=Array("1","",mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),mylist.eq(4).val(),mylist.eq(5).val());
							tempitem=ajaxarr("mem_reg",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								me.removeClass("submitclicktemp");
								if(data[0]=="ERR"){
									swal(data[1]);
									me.addClass("submitclick");
									me.html("註冊");
								}else{
									$("#mainwrap").html("<div style='font-size:30px;line-height:50px;color:#fff;text-align:center;padding:60px 15px;'>謝謝您的註冊<BR>一封信已經寄至您的信箱<BR>請前往查看<BR><BR>"+company+"敬上</div>");
								}
							});
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
							tempitem=ajaxarr("mem_contact",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								me.removeClass("submitclicktemp");
								if(data[0]=="ERR"){
									swal(data[1]);
									me.addClass("submitclick");
									me.val("確定送出");
									$("#codepagew").html(data[2]);
								}else{
									me.hide();
									 swal("謝謝您對NEED的興趣,相關人員會馬上與您聯繫\n\n"+company+"敬上");
								}
							});
					}
				}else if($(this).data("type")=="newsformalbum"){//相簿
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					var myid="";
					for(var a=0;a<mylista.length;a++){
						if(mylist.eq(a).attr("name")=="title"){
							if(vtext(mylist.eq(a),1,'',20)){
							}else{
								passme=0;
							}
						}
					}

					var imgchk=$("#newsformfilebox").find(".s-img").length;
					if(imgchk<2){//至少三張
						passme=0;
						swal('請至少上傳一張圖片');
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,內容id(編輯),content,picid,pictype,tag--住title沒有用了
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),$("#q_type").val(),$("#q_open").val());
								tempitem=ajaxarr("uploadnews",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										popfullcloseu();//關閉發言框
										show_mypagephotoin(sessionStorage.getItem("userid"),1);//重新抓相簿列表
									}
								});
							}else{
								swal("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="newsformalbumtext"){//相簿文字編輯
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					var myid="";
					for(var a=0;a<mylista.length;a++){
						if(mylist.eq(a).attr("name")=="title"){
							if(vtext(mylist.eq(a),1,'',20)){
							}else{
								passme=0;
							}
						}
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,內容id(編輯),content,picid,pictype,tag--住title沒有用了
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),$(this).data("id"));
								tempitem=ajaxarr("uploadalbumtext",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										swal("編輯成功了");
										popfullcloseu();//關閉發言框
										show_mypagephotoin(sessionStorage.getItem("userid"),1);//重新抓相簿列表
									}
								});
							}else{
								swal("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="newsform"){//動態牆
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					var myid="";
					if($(this).data("id")){
						myid=$(this).data("id");
					}
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
						swal('請選擇遊戲');
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,內容id(編輯),content,picid,pictype,tag--住title沒有用了
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),myid,mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),$("#q_type").val(),$("#q_open").val());
								tempitem=ajaxarr("uploadnews",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										swal("新增成功了");
										popfullcloseu();//關閉發言框
										get_centerwalllist(0);//重新抓動態強
									}
								});
							}else{
								swal("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="newsformreply"){
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
					if(mylist.eq(0).val()=="" && mylist.eq(2).val()==""){
						passme=0;
						swal("請輸入內容或上傳圖片");
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								var pid=mylist.eq(1).val();
								gameselect=JSON.parse(localStorage.getItem("gameselect"));
								//gameselect=JSON.parse(sessionStorage.getItem("gameselect"));
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),pid,mylist.eq(0).val(),mylist.eq(2).val(),mylist.eq(3).val(),mylist.eq(4).val(),gameselect);
								tempitem=ajaxarr("uploadnewsreply",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										swal("謝謝你的發言");
										//關閉自己重新整理發言內容
										allpopupclose(me);//關閉發言框
										if(mylist.eq(5).val()){
											//pid=mylist.eq(5).val();
											var list=$("#mainwrap").find(".list");//動態牆
											for(var a=0;a<list.length;a++){
												if(list.eq(a).data("id")==mylist.eq(5).val()){
													ttx=list.eq(a).find(".rep");
													if(ttx.eq(0).html().length>0){
														ttx.eq(0).html(parseInt(ttx.eq(0).html())+1);
													}else{
														ttx.eq(0).html(1);
													}
												}
											}
											list=$("body").find(".article");//動態牆
											for(var a=0;a<list.length;a++){
												if(list.eq(a).data("id")==mylist.eq(5).val()){
													ttx=list.eq(a).find(".wallspeakcnt");
													if(ttx.length>0){
														ttx.eq(0).html("留言("+(parseInt(ttx.eq(0).html().split("(")[1].split(")")[0])+1)+")");
													}
													tty=list.eq(a).find(".artspeakcnt");
													if(tty.length>0){
														tty.eq(0).html("留言("+(parseInt(tty.eq(0).html().split("(")[1].split(")")[0])+1)+")");
													}
												}
											}
										}else{
											//更新動態牆..
											var list=$("body").find(".article");//動態牆
											for(var a=0;a<list.length;a++){
												if(list.eq(a).data("id")==pid){
													ttx=list.eq(a).find(".wallspeakcnt");
													if(ttx.length>0){
														ttx.eq(0).html("留言("+(parseInt(ttx.eq(0).html().split("(")[1].split(")")[0])+1)+")");
													}
													tty=list.eq(a).find(".artspeakcnt");
													if(tty.length>0){
														tty.eq(0).html("留言("+(parseInt(tty.eq(0).html().split("(")[1].split(")")[0])+1)+")");
													}
												}
											}
										}
										//這是共用
										show_centerwallreplyin(pid)
									}
								});
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
					if(passme==1){
						$(this).parents(".mainitem").find(".maintemselect").show();//回頭顯示選項
						//檢查驗證
						if(sessionStorage.getItem("userid")){
							var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),thisval,$(this).data("id"));
							tempitem=ajaxarr("uploadnewsin",tempvals,ajaxurl);
							tempitem.success(function(data){//回傳 data 義
								if(data[0]=="ERR"){
									swal(data[1]);
								}else{
									var tempme=me.parents(".newstextbox");
									tempme.html(nl2brs(thisval));
									if(tempme.height()>347){
										tempme.css("height",347);			//要調整「閱讀更多」的顯示條件，除這邊之外，還要去調整「編輯功能」那邊的設定，編輯時才不會出錯。 ==> Pman
										tempme.append('<div class="newstextmore">......繼續閱讀</div>');
									}
								}
							});
						}else{
							swal("已登出,請重新登入");
						}
					}else{
						swal("請填寫些什麼吧!");
					}
				}else if($(this).data("type")=="articleform"){//攻略
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					for(var a=0;a<mylista.length;a++){
						if(vtext(mylista.eq(a),1,'',30)){
						}else{
							passme=0;
						}
					}
					var articles=$("#articletext").val();
					if(articles.length<30){
						swal("攻略請最少輸入30字");
						passme=0;
					}else if(articles.length>200000){ //攻略文章的長度限制
						swal("攻略內容太長,請減少");
						passme=0;
					}
					var myopen=mylist.eq(3).val();
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,title,content,picid,pictype,tag
								$("#articlepubwrap").append("<div class='loaderbox fixer'><img src='img/loaderd.gif'></div>");// 0=myid,1=key,2=標題,3=遊戲,4=封面圖,5=文字,6=正搞炒搞,7=articleid
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),articles,myopen,mylist.eq(5).val());
								tempitem=ajaxarrpost("uploadarticletext",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else if(data[0]=="OK2"){
										swal("修改已經儲存完畢");
										popfullcloseu();
										popfullcloseart();
										setTimeout(function(){
											show_centerartpage(mylist.eq(5).val(),1);
										},500);
										if($("#popuseru").length>0){
											popusercloseu();
											setTimeout(function(){
												show_mypagearticle('',2);
											},500);
										}
									}else{
										popfullcloseu();
										if(myopen==2){
											swal("儲存草稿成功！");
											if($("#popfullart").length>0){
												popfullcloseart();
												setTimeout(function(){
													show_centerartpage(mylist.eq(5).val(),2);
												},500);
											}
											if($("#popuseru").length>0){
												popusercloseu();
												setTimeout(function(){
													show_mypagearticle('',2);
												},500);
											}
										}else{//這個正常頁面了
											swal("儲存成功了！");
											if($("#popuseru").length>0){
												popusercloseu();
											}
											if($("#popuser").length>0){
												popuserclose();
											}
											//更新至首頁
											setTimeout(function(){
												curpage="wallpage";
												showpage();
											},1000);
										}
									}
								});
							}else{
								swal("已登出,請重新登入");
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
					var num = parseInt($("#q_qty").val()) || 0;
					if($("#q_qty").val()==""){
						passme=0;
						swal("請輸入獎勵貢獻值");
					}else if(num<=0){
						passme=0;
						swal("獎勵貢獻值需大於0");
						$("#q_qty").val(num);
					}else{
						$("#q_qty").val(num);
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								//id,key,title,content,picid,pictype,tag
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),mylist.eq(3).val(),$("#q_qty").val(),$("#q_type").val());
								tempitem=ajaxarr("uploadqna",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										swal("懸賞幣已預先扣除,如刪除問題或修改問題時會調整扣除懸賞幣");
										popfullcloseu();
										get_centerqnalistmy(1);//重新抓動態強
										//show_afterloginhead();//重新顯示人物資料
									}
								});
							}else{
								swal("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="qnaformin"){//QNA問題文字編輯
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#qnaform .formfield");
					var me=$(this);
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
					var num = parseInt($("#q_qty").val()) || 0;
					if($("#q_qty").val()==""){
						passme=0;
						swal("請輸入獎勵貢獻值");
					}else if(num<=0){
						passme=0;
						swal("獎勵貢獻值需大於0");
						$("#q_qty").val(num);
					}else{
						$("#q_qty").val(num);
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylist.eq(1).val(),$(this).data("id"),mylist.eq(0).val(),num);
								tempitem=ajaxarr("uploadqnain",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else if(data[0]=="ERRX"){
										popnotice(data[1]);
									}else{
										if($("#popfullu").length>0){
											popfullcloseu();
											get_centerqnalistmy(1);//重新抓
											get_centerqnalist();//重新抓
										}else{
											get_centerqnalist();//重新抓
										}
									}
								});
							}else{
								swal("已登出,請重新登入");
							}
					}
				}else if($(this).data("type")=="qnaformreply"){//QNA回答問題
					var me=$(this);
					mylist=$("#qnaformreply").find(".formfield");
					gameselect=JSON.parse(localStorage.getItem("gameselect"));
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),gameselect);
					tempitem=ajaxarr("uploadqnareply",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else if(data[0]=="ERRX"){
										popnotice(data[1]);
									}else{
										//關閉回答
										popfullcloseu();
										//重作問題內頁
										popbasefull("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
										out+="    <header>";
										out+="        <div class='link back popfullclose applebtn'>";
										out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
										out+="            <span>返回</span>";
										out+="        </div>";
										out+="        <div class='link word wallreplycnt'></div>";
										out+="        <br clear='both'>";
										out+="    </header>";
										out+="    <div class='wall qa' id='qnawrap'>";
										out+="   </div>";
										$("#popfull").html(out);
										gameselect=JSON.parse(localStorage.getItem("gameselect"));
										var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"));//人 / key / id
										tempitem=ajaxarr("show_qnaone",tempvals,ajaxurl);
										tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
											if(data[0]=="ERR"){
												swal(data[1]);
											}else{
												var out="";
												//out+=print_qnaitem2(data[0]);
												out+=print_qnaitem(data[0]);
												$("#qnawrap").html(out);
												var app=print_qnaitemr(data[0]);
												$("#popfull").append(app)
												var list=$("#maincontentbox").find(".article");
												for(var a=0;a<list.length;a++){
													if(list.eq(a).data("id")==me.data("id")){
														ttx=list.eq(a).find(".qnaspeakcnt");
														ttx.eq(0).html("留言("+(parseInt(ttx.eq(0).html().split("(")[1].split(")")[0])+1)+")");
													}
												}
												run_timeitem();//跑一次
											}
										});
									}
								});
				}else if($(this).data("type")=="vform"){//顯示簡訊pop
						popcloseu();
						setTimeout(function(){
							pop_vform();
						},800);
				}else if($(this).data("type")=="sendreemail"){//發簡訊
					var me=$(this);
					if(vpflag=="" && $(this).siblings(".vemail").val()!="" && vemail($(this).siblings(".vemail"))){
						vpflag=1;
						var tempcnt=60
						var tempbk=setInterval(function(){
							if(tempcnt<=0){
								clearInterval(tempbk);
								me.removeClass("bgcolor_lb");
								me.html("發送");
								vpflag="";
							}else{
								me.html("請等待("+tempcnt+")");
								tempcnt=tempcnt-1;
							}
						},1000);
						var tempvals=Array($(this).siblings(".vemail").val());
						tempitem=ajaxarr("mem_reemail_send",tempvals,ajaxurl);
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								clearInterval(tempbk);
								me.removeClass("bgcolor_lb");
								me.html("發送");
								vpflag="";
								swal(data[1]);
							}else{
								swal("認證碼已寄送至您的Email，請前往確認，謝謝");
							}
						});
						me.addClass("bgcolor_lb");
						setTimeout(function(){
								me.removeClass("bgcolor_lb");
								vpflag="";
							},60000);
					}else if(vpflag==""){
						swal("Email格式不正確");
					}else{
						swal("您需要等60秒才能再次寄送認證碼");
					}
				}else if($(this).data("type")=="vreemail"){//確認簡訊
					var me=$(this);
					if($(this).siblings(".input").find(".xmmsinput").val()!=""){
						var tempvals=Array($(this).siblings(".input").find(".xmmsinput").val());
						tempitem=ajaxarr("mem_reemail_chk",tempvals,ajaxurl);
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								me.siblings(".input").find(".xmmsinput").val('')
								swal(data[1]);
							}else{
								$("#emailvalue").val($(".vemail").val());
								popfullclose();
								swal("您的Email已確認，謝謝");
							}
						});
					}
				}else if($(this).data("type")=="sendmes"){//發簡訊
					var me=$(this);
					if(vpflag=="" && $(this).siblings(".vphone").val()!="" && $(this).siblings(".vphone").val().length>=9){
						vpflag=1;
						var tempcnt=60
						var tempbk=setInterval(function(){
							if(tempcnt<=0){
								clearInterval(tempbk);
								me.removeClass("bgcolor_lb");
								me.html("發送");
								vpflag="";
							}else{
								me.html("請等待("+tempcnt+")");
								tempcnt=tempcnt-1;
							}
						},1000);
						var tempvals=Array("+886",$(this).siblings(".vphone").val());
						tempitem=ajaxarr("sendver",tempvals,ajaxurl);
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								clearInterval(tempbk);
								me.removeClass("bgcolor_lb");
								me.html("發送");
								vpflag="";
								swal(data[1]);
							}else{
								swal("認證碼已寄送至您的手機，請前往確認，謝謝");
							}
						});
						me.addClass("bgcolor_lb");
						setTimeout(function(){
								me.removeClass("bgcolor_lb");
								vpflag="";
							},60000);
					}else if(vpflag==""){
						if($(this).siblings(".vphone").val().length<9){
							swal("手機號碼長度不足");
						}else{
							swal("請填寫手機號碼");
						}
					}else{
						swal("您需要等60秒才能再次寄送簡訊認證碼");
					}
				}else if($(this).data("type")=="vmes" || $(this).data("type")=="vmes2" ){//確認簡訊
					var me=$(this);
					if($(this).siblings(".input").find(".xmmsinput").val()!=""){
						var tempvals=Array(sessionStorage.getItem("key"),$(this).siblings(".input").find(".xmmsinput").val());
						tempitem=ajaxarr("chkver",tempvals,ajaxurl);
						tempitem.success(function(data){//回傳 data 義
							if(data[0]=="ERR"){
								me.siblings(".input").find(".xmmsinput").val('')
								swal(data[1]);
							}else{
								//if($("#phonevalue").length>0){
									$("#phonevalue").val("+886"+$(".vphone").val());
								//}
								if(me.data("type")=="vmes" ){
									popfullclose();
								}
								//me.data("type","na");//更改成別的
								//me.addClass("bgcolor_lb");
								//if($(".vpchanger").length>0){
								//	$(".vpchanger").html("更改號碼");
								//}
								swal("您的手機已確認，謝謝");
							}
						});
					}
				}else if($(this).data("type")=="edituser"){//
					passme=1;
					var mylista=$("#"+$(this).data("type")+" .form-control");
					var mylist=$("#"+$(this).data("type")+" .formfield");
					var myid="";
					if($(this).data("id")){
						myid=$(this).data("id");
					}
					for(var a=0;a<mylista.length;a++){
							if(mylista.eq(a).attr("name")=="newstext"){
								if(vtext(mylista.eq(a),1,'',3000)){
								}else{
									passme=0;
								}
							}else if(mylista.eq(a).attr("name")=="nick"){
								if(vtext(mylista.eq(a),4,'',15)){
								}else{
									passme=0;
								}
							}
					}
					if(passme==1){
						var gg=$(".birthyear").val()+"-"+$(".birthmonth").val()+"-"+$(".birthday").val();
						t=Date.parse(gg);
						if(isNaN(t)){
							passme=0;
							swal("請選擇正確的生日");
							return false;
						}
						for(var a=0;a<3;a++){
							if(stringBytes($(".rgnotes").eq(a).val())>60){
								passme=0;
								swal($(".rgnotes").eq(a).data("err"));
								return false;
							}
						}
					}
					if(passme==1){
							//檢查驗證
							if(sessionStorage.getItem("userid")){
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
								for(var a=0;a<mylist.length;a++){
									tempvals.push(mylist.eq(a).val());
								}

								tempitem=ajaxarr("mem_useredit",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										$("#usereditor").html("<div class='loaderbox'><img src='assets/img/loader2.gif'></div>");
										show_afterloginhead();
										setTimeout(function(){
											popuserclose();//先關下面一層
											popusercloseu();//關閉發言框
											y=sessionStorage.getItem("userid");
											show_mypagefront(y);//重新顯示使用者
										},1000);
									}
								});
							}else{
								swal("已登出,請重新登入");
							}
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
				temp=$(this).val();
				tempb=temp.replace(/\n/g, "");
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
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val(),gameselect);
								tempitem=ajaxarr("uploadnewsreply",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										me.val('');
										$(".replypcibox").html('');
										var replaceme=me.parents(".mainitem");
										var mem=JSON.parse(sessionStorage.getItem("member"));
										replaceme.html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
										var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.data("id"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
										tempitem=ajaxarr("show_boardone",tempvals,ajaxurl);
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
							}
							else if($(this).data("type")=="artpageformreply"){
								var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("id"),mylist.eq(0).val(),mylist.eq(1).val(),mylist.eq(2).val());
								tempitem=ajaxarr("uploadartpagereply",tempvals,ajaxurl);
								tempitem.success(function(data){//回傳 data 義
									if(data[0]=="ERR"){
										swal(data[1]);
									}else{
										show_centerartpage(data[1]);
									}
								});
							}
						}else{
							swal("已登出,請重新登入");
						}
				}
			}
		});
		$("body").delegate("#headsearch","keypress",function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if(code == 13){
				if($("#headsearch").val()){
					$("#mainmidwrapinleft").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					if(sessionStorage.getItem("userid")){
						var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$("#headsearch").val());
						tempitem=ajaxarr("searchmember",tempvals,ajaxurl);
						tempitem.success(function(data){
							if(data[0]=="ERR"){
								$("#mainmidwrapinleft").html('');
								swal(data[1]);
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
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else{
					swal("請填寫內容");
				}
			}
		});
		//左邊 新遊戲表格
		$("body").delegate("#addgameonlistclick","click",function(e){
			e.preventDefault();
			thisval=$("#addgameonlistselect").val();

			var flag=0;
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
			if(gameselect.length>=6){
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
					if(gameselect[a]['gameid']=="9999"){
						gameselect[a]['show']=0;
					}
				}
				localStorage.setItem("gameselect",JSON.stringify(gameselect));
				left_gameselectmenu();
				if($("#maincontentbox").data("type")=="wall"){
					get_centerwalllist(curtab);
				}else if($("#maincontentbox").data("type")=="article"){
					get_centerarticlelist(curtab,1,'');
				}
			}else if(flag==1){
				swal("已在名單中");
			}else if(flag==2){
				swal("最多只能選擇5個遊戲");
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
					swal("感興趣的遊戲至少需保留一個");
				}
			}else if(mytype=="show"){
				for(var a=0;a<gameselect.length;a++){
					if(gameselect[a]['gameid']==myval){
						gameselect[a]['show']=1;
						flag=1;
					}
				}

			}else if(mytype=="hide"){
			//	if(gameselect.length==1){
			//		swal("無其他選項時,無法關閉不分類");
			//	}else{
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']==myval){
							gameselect[a]['show']=0;
							flag=1;
						}
					}
			//	}
			}
			if(flag==1){
				//開關9999
				if(mytype=="show"){//有人開了...關掉 9999
					for(var a=0;a<gameselect.length;a++){
						if(gameselect[a]['gameid']=="9999"){
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
						if(gameselect[a]['gameid']=="9999"){
						}else if(gameselect[a]['show']==1){
							cct=1;
						}
					}
					if(cct==0){
						for(var a=0;a<gameselect.length;a++){
							if(gameselect[a]['gameid']=="9999"){
								gameselect[a]['show']=1;
							}
						}
					}
				}
				localStorage.setItem("gameselect",JSON.stringify(gameselect));
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
			/*
			if($(this).data("job")=="newspic"){
				$(this).parents(".inblock").remove();
				$("#"+$(this).data("target")).val('');
				$("#"+$(this).data("targettype")).val('');
			}else
			*/
			if($(this).data("job")=="newspic"){
				var me=$(this);
				//刪除相簿內照片
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadnewspicdel",tempvals,ajaxurl);
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						swal("刪除錯誤,請上傳後再試試");
					}else{
						if(data[0]=="OKA"){
							if($("#addalbpicwrap").length >= 1  ){
							}else if($("#newsformfilebox").find(".inblock").length <= 5){
								$("#newsformfilebox .insertreplace").replaceWith("<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div><div class='insertreplace clr'></div>");
							}
							me.parents(".inblock").remove();
						}
					}
				});
			}else if($(this).data("job")=="albpic"){
				var me=$(this);
				//刪除相簿內照片
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadalbpicdel",tempvals,ajaxurl);
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						swal("刪除錯誤,請上傳後再試試");
					}else if(data[0]=="ERRB"){
						swal("相簿最少須保持一張照片");
					}else{
						if(data[0]=="OKA"){
							if($("#addalbpicwrap").length >= 1  ){
							}else if($("#newsformfilebox .inblock").length <= 5){
							}
						}else if(data[0]=="OKB"){
							if($("#addalbpicwrap").length >= 1  ){
							}else if($("#newsformfilebox .inblock").length <= 20){
							}
							//更新列表
							var tx=$("#myalbumwrap .list");
							for(a=0;a<tx.length;a++){
								if(tx.eq(a).data("id")==data[1]){
									tx.eq(a).find(".albcnt").html(data[2]);
								}
							}
						}
						me.parents(".inblock").remove();
					}
				});
			}else if($(this).data("job")=="albqpic"){
				var me=$(this);
				//刪除qa相簿內照片
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).data("val"));
				tempitem=ajaxarr("uploadalbqpicdel",tempvals,ajaxurl);
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						swal("刪除錯誤,請上傳後再試試");
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
			}else if($(this).data("job")=="articlepic"){
				if($(this).data("val")){
					$("#"+$(this).data("val")).val('');
				}
				$(this).parents(".inblock").remove();
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
				if($(this).data("type")=="reply"){
					$(this).siblings(".mcreplytitleselectlist").hide();
				}else{
					$(this).siblings(".mainitemtitleselectlist").hide();
				}
			}else{
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
			if($(this).hasClass("on") || $(this).hasClass("active")){
			}else{
				if($(this).data("type")=="arc"){
					$(".maincontentselect").removeClass("active");
					$(this).addClass("active");
					show_mypagecollectin($(this).data("val"));//
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
						if($(this).hasClass("active")){
						}else{
							$("#maincontenttitle .maincontentselect").removeClass("active");
							$(this).addClass("active");
							get_centerqnalist($(this).data("val"));
						}
					}else if($(this).parents("#maincontenttitle").data("type")=="article"){
						show_mypagearticlein(sessionStorage.getItem("userid"),$(this).data("val"),'','');
					}else if($(this).parents("#maincontenttitle").data("type")=="photo"){
						show_mypagephotoin($(this).data("id"),$(this).data("val"));
					}
				}
			}
		});
		$("body").delegate(".maincontentselect","change",function(e){
				if($(this).data("val")=="storesort"){//商店順位
					get_centershoplist($("#shopcatselect").val(),$("#shopsortselect").val());
				}else if($(this).data("val")=="storecat"){//商店分類
					get_centershoplist($("#shopcatselect").val(),$("#shopsortselect").val());
				}
		});
		//################ QNA 選項 ###################
		//左方
		$("body").delegate(".qnaleftclick","click",function(){
			if($(this).hasClass("active")){
			}else{
				//$(".qnaleftclick").removeClass("on");
				var curtab=$(this).data("val");
				sessionStorage.setItem("qnaselect",curtab);
				//$("#myselectbox .qnaleftclick").eq(curtab).addClass("active");
				/*
				if($(this).data("val")=="0"){
					//
					curtab="0";
					//$(".maincontentselect").removeClass("on");
					$("#myselectbox span").eq(0).addClass("active");
				}else{
					$(this).addClass("on");
					//sessionStorage.setItem("qnaselect",$(this).data("val"));
				}
				*/
				if($("#popfullq").length>0){
					 get_centerqnalistmy(curtab);
				}else{
					show_centerqnamy(curtab);
				}
			}
			//get_centerqnalist(curtab);//重新抓動態強
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
		//切換 friend select 頁面
		$("body").delegate(".fpageselect","click",function(){
			if($(this).hasClass("active")){
			}else{
				if($(this).data("type")=="publishpage"){//這是攻略的
					show_mypagearticlein($(this).data("id"),$(this).data("val"),'','');
				}else if($("#popfull").length>=1){
					if($(this).data("type")=="search" || $(this).data("type")=="match"  || $(this).data("type")=="sended"){
						$(this).siblings(".word").removeClass("active");
						$(this).addClass("active");
					}
					if($(this).data("type")=="search"){
						show_friendsearch("");
					}else if($(this).data("type")=="match"){
						show_friendmatch("");
					}else if($(this).data("type")=="sended"){
						show_friendsended("");
					}
				}else{
					show_centermatch();
					/*
					var me=($his);
					setTimeout(function(){
						$(".fpageselect").removeClass("active");
						$(".fpageselect").eq(1).addClass("active");
						if(me.data("type")=="search"){
							show_friendsearch("");
						}else if(me.data("type")=="match"){
							show_friendmatch("");
						}else if(me.data("type")=="sended"){
							show_friendsended("");
						}else if(me.data("type")=="publishpage"){//這是攻略的
							show_mypagearticlein($(this).data("id"),$(this).data("val"),'','');
						}
					},500);
					*/
				}
			}
		});
		/*
		$("body").delegate(".fpageselect","focus",function(){
			var me=$(this);
			me.blur();
			me.parents(".blurto").focus();
			if($("#popfull")){
					popfullclose();
			}
			show_centermatch(data);
			if(me.data("type")=="qnapost"){//QNA回復的發言框
				show_centerqnareplypostbox(me.data("id"))
			}
		});
		*/
		//搜尋會員表格
		$("body").delegate(".headsearchsubmit","click",function(e){
			var me=$(this);
			if(me.parents(".search").find(".headsearch").val()){
				if(sessionStorage.getItem("userid")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),me.parents(".search").find(".headsearch").val());
					tempitem=ajaxarr("searchmember",tempvals,ajaxurl);
					tempitem.success(function(data){
						if(data[0]=="ERR"){
							swal(data[1]);
						}else{
							me.parents(".search").find(".headsearch").val('')
							//框架
							//if($("#popfull")){
						//		popfullclose();
						//	}
							show_friendsearch(data)
							//show_centermatch(data);
						}
					});
				}else{
					swal("您尚未登入，請登入NEED，享用更完善功能");
				}
			}else{
				swal("請輸入暱稱或ID");
			}
		});
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
					swal("最多只能選擇３個遊戲");
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
		//變更 match
		$("body").delegate("#matchchangeclick","click",function(e){
			var tt=$("#popfullu .formfield");
			show_friendmatch_c(tt);
		});
		//pop 選單
		$("body").delegate("#popfriendsbox","click",function(e){
			pop_matchselect();
		});
		//搜尋朋友
		$("body").delegate("#friendsearch","keyup",function(e){
			if($(this).val().length>0){
				$("#friendlist").hide();
				if(sessionStorage.getItem("userid")){
					var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),$(this).val());
					tempitem=ajaxarr("searchfriends",tempvals,ajaxurl);
					tempitem.success(function(data){
						if(data[0]=="ERR"){
							//alert(data[1]);
						}else{
							out="";
							for(var a=0;a<data.length;a++){
								out+="            	<!--item-->\n";
								out+="            	<div class='frienditem applebtn' data-type='friend' data-val='"+data[a]['uid']+"'>\n";
								out+="                	<div class='friendimgwrap friendimgwrapon'>\n";
								out+="                    	<div class='friendimgbox'>\n";
								if(data[a]['headpic']){
									out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[a]['headpic'])+"' />\n";
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
					swal("您尚未登入，請登入NEED，享用更完善功能");
				}
			}else{
				$("#friendlist").show();
				$("#fsearchresult").html('');
			}
		});

		//加減朋友 addfriend
		var orgbtn="";
		$("body").delegate(".addfriend","click",function(){
			var me=$(this);
			if(me.data("close") && me.data("close")=="all"){
				closeallframe();
			}
			if($(this).data("type")=="addtext"){
			}else{
				orgbtn=$(this);
				xxme=$(this);
			}
			var thistype=$(this).data("type");
			if(thistype=="add"){//邀請
				popaddfriend($(this).data("val"));
			}else{
				flag=1;
				if(thistype=="cancel"){
					if(confirm( '請問確定要取消嗎?' )){
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
					tempitem=ajaxarr("addfriends",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data 義
						if(data[0]=="ERR"){
							if(data[2]=="CLOSE"){
								popcloseu();
							}else if(data[2]=="CLOSER"){//這事馬上恢復關係類型
								popcloseu();
								orgbtn.addClass("cancel");
								orgbtn.data("type","cancel");
								orgbtn.html("取消朋友")
							}
							swal(data[1]);
						}else if (data[0]=="OK2"){
							//$("#fm2cnt").html(data[2]);
							//$("#fm3cnt").html(data[3]);
							swal(data[1]);
							 me.hide();
						}else if (data[0]=="OK3"){//reject
							swal("你已拒絕對方邀請");
							me.parents(".list").remove();
							//curpage="matchpage";
							//showpage();
							//show_centermatchreceivelist();
							//$("#fm3cnt").html(parseInt($("#fm3cnt").html())-1);
							chk_notice();
						}else if (data[0]=="OK4"){//答應邀請
							swal("你們現在是朋友了");
							me.parents(".list").remove();
							chk_notice();
							//curpage="matchpage";
							//showpage();
							//show_centermatchreceivelist();
							//$("#fm3cnt").html(parseInt($("#fm3cnt").html())-1);
							//chk_notice();
							//show_afterloginhead();//重新顯示人物資料
						}else if(data[0]=="OK5"){//刪除朋友回復
							swal("好友關係已取消");
							if(orgbtn.data("react") && orgbtn.data("react")=="1"){
								orgbtn.removeClass("cancel");
								orgbtn.data("type","add");
								orgbtn.html("加朋友")
							}else{
								me.parents(".frienditem").remove();
							}
							//showpage();
							//chk_friends();//在ajax.js\
							//更新左邊
						}else if(data[0]=="OK6"){//取消邀請
							if($("#fm2cnt").length>0){//在配對表
							//	me.parents(".mainitem").remove();
							//	$("#fm2cnt").html(data[1]);
							}else{
								swal("邀請已取消");
								if(orgbtn.data("react") && orgbtn.data("react")=="1"){
									orgbtn.removeClass("cancel");
									orgbtn.data("type","add");
									orgbtn.html("加朋友")
								}else{
									me.addClass("send").addClass("add").removeClass("btn").removeClass("nobg");
									me.html("<i class='fa fa-plus' aria-hidden='true'></i>");
								}
								//me.data("type","add");
							}
							//更新左邊
						}else{//邀請成功
						//	$("#fm2cnt").html(data[1]);
						//	$("#fm3cnt").html(data[2]);
							if(thistype=="delete"){//表示在邀請對象頁面
								show_centermatchsendlist();
							}else{
								swal("邀請已送出");
								popcloseu();
								if(orgbtn.data("react") && orgbtn.data("react")=="1"){
									orgbtn.addClass("cancel");
									orgbtn.data("type","delete");
									orgbtn.html("取消邀請")
								}else{
									orgbtn.removeClass("send").removeClass("add").addClass("btn").addClass("nobg");
									orgbtn.html("取消邀請");
								}
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
		//通知列表--跳出對話框
		$("body").delegate(".frienditemnew","click",function(){
			 var me=$(this);
			 entermychatroom($(this).data("val"));//

		});
		//朋友列表
		$("body").delegate(".frienditem","click",function(){
			var me=$(this);
			if(me.data("close") && me.data("close")=="all"){
				closeallframe();
			}
			if($("#popfull").length>0){
				popfullclose();
			}
			 get_chatroom($(this).data("val"));//
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
		//跳出
		$("body").delegate(".chatfriendclick","click",function(){
			show_selectlist($(this).data("val"));
		});
		$("body").delegate(".chataddclick","click",function(){
			var roomid=$("#popchatfull").children(".chatroom").data("id");
			var uid=$(this).data("val");
			print_addchatuser(roomid,uid);
		});
		/*
		//這些事舊的
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
		*/
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
					tempitem=ajaxarr("get_friendbykey",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
						if(data[0]=="ERR"){
						}else{
							var out="";
							for(var a=0;a<data[1].length;a++){
								out+="<div class='cfitem' data-val='"+data[1][a]['uid']+"'>\n";
								if(data[1][a]['headpic']){
									out+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1][a]['headpic'])+"' />\n";
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
		});
		$("body").delegate(".chatfsearch .sendbtn","click",function(e){
				r=$(this).parents(".chatroom").data("id");
				p=$(this).data("val");
				me=$(this);
				var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"invite",r,p);//人 / key / key
				tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
				tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
					if(data[0]=="ERR"){
						swal(data[1]);
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
			if($(this).parents("li").hasClass("select")){
				//$("#iconbox").hide();
			//	$(".chatbox").addClass("short");
				$(".chart").removeClass("on");
				$(".chart .fa-smile-o").addClass("on");
				$("#dialog-windows").removeClass("short");
				//存入
				chroomid=$(this).parents(".chatroom").data("id");
				imgsrc="XX{img}"+$(this).data("val");
				chat_input(chroomid,imgsrc);
			}
		});
		//新發言
		$("body").delegate(".chatinput","keypress",function(e){
			if(e.which == 13) {
				if($(this).val()){
					chat_input($(this).data("val"),$(this).val());//id,內容  ajax.js
					$(this).val('');
					$(".chart").removeClass("on");
					$(".chart .fa-smile-o").addClass("on");
					$("#dialog-windows").removeClass("short");
				}
			}
		});
		$("body").delegate(".closechat","click",function(){
			var thisval=$(this).data("val");
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"extroom",thisval);
			tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
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
				tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
				tempitem.success(function(data){
					if(data[0]=="ERR"){
						swal(data[1]);
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
	showpage=function(x,y){
		if(window.page=="share.php"){
			curpage=qs["page"];
			curid=qs["id"];
			if(curpage && curid){
				if(curpage=="wallpage"){//動態牆
					var out="";
					out+="<div class='wall qa'>";
					out+="	<div id='maincontentbox'  data-type='qna' data-val='mainlist'>";
					out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
					out+="	</div>";
					out+="</div>";
					$("#mainwrap").html(out);
					var tempvals=Array(curid,'erwr45435');//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
					tempitem=ajaxarr("show_wallone",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
						if(data[0]=="ERR"){
							swal(data[1]);
							$("#maincontentbox").html('');
						}else{
							var out="";
							//動態強
							for(var a=0;a<data.length;a++){
								out+=print_wallitem(data[a]);
							}
							$("#maincontentbox").html(out);
							run_chknewstext($("#maincontentbox .newstextbox"));
							run_timeitem();//跑一次
							set_video();
						}
					});
				}else if(curpage=="articlepage"){
					//$("#maincontentbox").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
					//show_centerartpage(curid);
				}else if(curpage=="qnapage"){
					var out="";
					out+="<div class='wall qa'>";
					out+="	<div id='maincontentbox'  data-type='qna' data-val='mainlist'>";
					out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
					out+="	</div>";
					out+="</div>";
					$("#mainwrap").html(out);
					var tempvals=Array('','',curid);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
					tempitem=ajaxarr("show_qnaone",tempvals,ajaxurl);
					tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
						if(data[0]=="ERR"){
							swal(data[1]);
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
				swal("資料不齊全無法顯示網頁");
			}
		}else{
			curtab=0;
			if(x==99){//登入頁
				show_login();//顯示登入
				$("header").hide();
				$("footer").hide();
				curpage="";
			}else if(x==98){//註冊頁
				show_register();//顯示登入
				$("header").hide();
				$("footer").hide();
				curpage="";
			}else if(x==97){//資料填寫頁
				show_reginfo();//顯示資料填寫頁
				$("header").hide();
				$("footer").hide();
				curpage="";
			}else{
				if(curpage==""){curpage="wallpage";}
				var changef=0
				if($("footer").css("display")=="none"){
					changef=1;
				}
				$("header").show();
				$("footer").show();
				if(changef==1){
					setTimeout(function(){
						$('footer .slides').slick();
					},800);
				}
				if(curpage=="wallpage"){//動態牆
					//$("#mainwrap").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
					topnavchange(curpage);
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
						show_centerwall(0);//顯示中央動態牆
					}else{

						show_centerwall(0);//顯示中央動態牆
					}
				}else if(curpage=="articlepage"){//攻略牆
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
						//$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage);
						show_centerarticle();//顯示中央動態牆
						//left_gameselectmenu();
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="publishpage"){//發攻略
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage);
						show_centerpublish(x);
						left_empty();
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="matchpage"){
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage);
						left_friendselectmenu();
						//因為match 不帶參數...這裡把serch result帶進來
						show_centermatch(y);
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="friendpage"){
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage);
						left_empty();
						show_centerfriendlist();
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="rankpage"){//排行榜
					//if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage);
						//left_rankselectmenu();
						show_centerranklist(1);
					//}else{
					//	popnotice("您尚未登入，請登入NEED，享用更完善功能");
					//}
				}else if(curpage=="shoppage"){
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
						//$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage);
						//left_shopselectmenu();
						show_centershoplist();
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="actpage"){
					//$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
					topnavchange(curpage);
					left_empty();
					show_centeract();
				}else if(curpage=="qnapage"){
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						sessionStorage.setItem("qnaselect","");//清空
						topnavchange(curpage);
					//	left_qnaselectmenu();
						show_centerqna();
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="artpage"){
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						left_empty();
						show_centerartpage(x);
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="arcpage"){
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						//left_empty();
						left_gameselectmenu();
						show_centerartpagec(x);
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="wallitem"){//單一動態強
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						left_empty();
						get_centerwallone(x);
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="qnaitem"){//單一QNA
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						left_empty();
						show_centerqnaone(x);
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="matchitem"){//單一交友邀請
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						left_empty();
						show_centermatchone(x);
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="mypage"){//單一交友邀請
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						topnavchange(curpage,x);
						left_empty();
						show_mypageall(x,y);//center.js
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}else if(curpage=="collectpage"){//收藏--進入收藏的第一畫面
					if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
					//	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
						left_gameselectmenu();
						show_centerarc(1);//center.js
					}else{
						swal("您尚未登入，請登入NEED，享用更完善功能");
					}
				}
			}
		}
	}
	function setsize(){
	}

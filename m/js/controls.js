	var refreshnote=10000;//檢查訊息時間
	var refreshtimer=30000;//檢查訊息時間

//########### 儲存 瀏覽器設定 #################
//adopen  上方廣告
//bsort   動態牆顯示的排序
//gamesort	正在玩的遊戲
if(localStorage.getItem("adopen")){//開始時間
}else{
	localStorage.setItem("adopen",1);
}
if(localStorage.getItem("bsort")){//結束時間
}else{
	localStorage.setItem("bsort",1);
}
if(localStorage.getItem("gamesort")){//寬或嚴格
}else{
	localStorage.setItem("gamesort",1);
}
	// ################### 抓取基礎資料
	get_basic=function(){
		var tempvals=Array('1');
		tempitem=ajaxarr("get_basic",tempvals,ajaxurl);
		tempitem.success(function(data){
			sessionStorage.setItem("tags",JSON.stringify(data[1]));//更新
			sessionStorage.setItem("locations",JSON.stringify(data[2]));//更新
			sessionStorage.setItem("gametimes",JSON.stringify(data[3]));//更新
			sessionStorage.setItem("ranks",JSON.stringify(data[0]));//更新
			sessionStorage.setItem("banners",JSON.stringify(data[4]));//更新
			sessionStorage.setItem("toprank",JSON.stringify(data[5]));//更新
			sessionStorage.setItem("chatpic",JSON.stringify(data[6]));//更新
		});
	}
	// 檢查
	chk_mem= function(x) {
		var tempvals=Array("1",x);
		tempitem=ajaxarr("mem_chkmem",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data 義
			if(data[0]=="ERR"){
				popactfail(data[1]);
			}else{
				//sessionStorage.setItem("userid",data[1]['memberid']) ;
				sessionStorage.setItem("member",JSON.stringify(data[1]));
				sessionStorage.setItem("key",data[2]) ;
				popactpass();
				setTimeout(function(){
					showpage(97);
				},3000);
			}
		});
	}
// ########## 位置計算

	popreturn=function(){
		$(".poptitles").removeClass("htitleon");
	}
	calrightpos=function(){
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
// ###########  PAGE CONTROL ########################
// Page new or update
	framerefresh=function(){//每多少秒抓一次資料
		refreshchk();
		refreshchk2();
		var refreshall=setInterval(function(){
			refreshchk();
		},refreshtimer);//60秒抓一次
		var refreshall2=setInterval(function(){
			refreshchk2();
		},refreshnote);//60秒抓一次
	}
	refreshchk=function(){	//實際檢查所有登入相關功能
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			chk_online();//在login.js
			chk_friends();//在ajax.js\--這個看看手機板是不是沒有了
			chk_timeitem();//在share.js
		}
	}
	refreshchk2=function(){	//檢查訊息更新
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			chk_notice();//在ajax.js
		}
	}
	chatroomreflash=function(){
		isinchat=1;
		chatreload=setInterval(function(){
			runchatroomreflash();
		},5000);
	}
	runchatroomreflash=function(){
			mylist=$(".chatroom");
			for(var a=0;a<mylist.length;a++){
				xval=mylist.eq(a).data("id");
				readnewchat(xval);
			}
	}

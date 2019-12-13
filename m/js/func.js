// 請更新  fb.js 中的 appid
// 所有 local storage 在 store.js
var imgroot="../WEBNEW/img";
var company="NEEDS工作團隊";
var chkfb=0;
var windowHeight = 0;
var windowwidth = 0;
var ismobile=0;	//手機平板設定
var user_id="";
var fbname="";
var fbemail="";
var fbacc=0;
var chattime=3000;//chatroom refresh---這個設定和後台通知有連動..因此不能直接改
var xxme="";
var vpflag="";
var isapp=null;
var $window="";
var url="";
var fbid="";
var pictureSource;
var destinationType;
var popon="";
var curpage="";//目前頁面
var curtab="";//目前TAB
var chatreload="";
var isinchat=0;
var curpopimg="";
var querystring = "";
var qs = {};
var lastme="";
var appisonline=0;
var remotebase="";
var ajaxurl="";
var siteimgurl="";
var jsurl="";
var fcmid="";
var bdcct=0;
var pushx;
var $window = $(window);
var url=window.location.toString();
window.page=url.substring(url.lastIndexOf('/') + 1).split("?")[0];		//目前頁面 設定成glabals


$(document).ready(function() {	//設定
	//$("footer").hide();
	$("footer").css({"visibility":"hidden"});//20181017 Pman 為了處理選單文字會縮起來的問題（使用display:none，選單隱藏的情況下，變動瀏覽器寬度，會是選單失去寬度值，以至於選單無法分配）
	$("header").hide();
	//20190418 Pman 如果有登入，轉入一般頁面
	if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
		console.log(window.location.href);
		if(window.location.pathname=="/m/share.php"){
			window.location.href=window.location.href.replace("share.php","home.html");
		}
	}
	if(navigator.onLine){
		appisonline=1;
	}else{
		alert("本APP需要網路連線");
	}
	isapp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	remotebase="http://www.coinpayments.tw/";//這個有用到..給分享
	if(isapp){
		document.addEventListener("online", function(){ appisonline=1; }, false);
		remotebase="http://www.coinpayments.tw/";
		ajaxurl=remotebase+"m/ajax.php";
		siteimgurl=remotebase;
		jsurl=remotebase+"m/";
	}else{
		siteimgurl="../";
		ajaxurl="ajax.php";
	}
	if(appisonline==1){
		$.getScript(jsurl+'js/action.js', function() {
		});
	}
	sessionStorage.setItem("imgurl",siteimgurl);
});


//轉址判斷 //20180904 Pman 手機版本一版面寬度再轉回PC版
/* if($window.width()>980){
		//var goaddress=url.substring(0,url.lastIndexOf('/'))+"/"+url.substring(url.lastIndexOf('/') + 1);
		var goaddress=url.substring(0,url.lastIndexOf('/')-1)+"?"+url.substring(url.lastIndexOf('?') + 1);
		//console.log("url:"+url.substring(0,url.lastIndexOf('/')-1));
		//console.log("bss:"+url.substring(url.lastIndexOf('?') + 1));
		console.log("goaddress_1:"+goaddress);
		window.location.replace(goaddress);
} */
/* $window.resize(function(){
	$window = $(window);
	if($window.width()>980){
			//var goaddress=url.substring(0,url.lastIndexOf('/'))+"/"+url.substring(url.lastIndexOf('/') + 1);
			var goaddress=url.substring(0,url.lastIndexOf('/')-1)+"?"+url.substring(url.lastIndexOf('?') + 1);
			console.log("goaddress_2:"+goaddress);
			window.location.replace(goaddress);
	}
}); */
//20190312 Pman 將手機版切回PC版的功能關閉

<?php

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>KYOMON</title>
	<link rel="shortcut icon" href="favicon.ico" />
	<link href="css/global.css" type="text/css" rel="stylesheet">
    <link href="css/ui-lightness/jquery-ui-1.10.3.custom.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="css/jquery.rollbar.css" media="screen" />
    <link href="css/chosen.min.css" type="text/css" rel="stylesheet">
	<link href="css/all.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 	<meta http-equiv="cache-control" content="no-cache">
 	<meta http-equiv="pragma" content="no-cache">
 	<meta http-equiv="expires" content="0">
	<script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/jquery-ui-1.10.3.custom.min.js"></script>
	<script src="js/jquery.mousewheel.js"></script>
    <script src="js/jquery.rollbar.min.js"></script>
	<script src="js/Chart_min.js"></script>
    <script src="js/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/tinymce/tinymce.min.js"></script>
    <script type="text/javascript" src="js/tinymce/selectimg.js"></script>
	<script src="js/func.js"></script>
	<script>
          /*
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-86296436-1', 'auto');
          ga('send', 'pageview');
		*/
    </script>
    <script>
	//20190422 Pman 在登入狀態下，直接轉入一般頁面
	if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
		console.log(window.location.href);
		
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
			if(window.location.pathname=="/share.php"){
				window.location.href=window.location.href.replace("share.php","m/home.html");
			}
		}else{
			if(window.location.pathname=="/share.php"){
				strHref=window.location.href;
				strHref=strHref.replace("share.php","");
				strHref=strHref.replace("articlepage","artpage"); //20190422 Pman 將原本攻略分享頁，改去內容那頁
				window.location.href=strHref;
				
			}
		}
	}else{
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
			var goaddress=url.substring(0,url.lastIndexOf('/'))+"/m/"+url.substring(url.lastIndexOf('/') + 1);
			window.location.replace(goaddress);
		}
	}
	
	
    $(document).ready(function(){ 
	
        $('#mainleftin').rollbar({
	        autoHide: true,             // automatically hide scrollbars if not needed   
       	autoHideTime: 'fast',       // time to hide scrollbars  
      	lazyCheckScroll: 500,      // check content size every NN milliseconds  
			zIndex:100
		}); 
        $('#mainrightin').rollbar({
	        autoHide: true,             // automatically hide scrollbars if not needed   
        	autoHideTime: 'fast',       // time to hide scrollbars  
        	lazyCheckScroll: 500,      // check content size every NN milliseconds  
			zIndex:100
		});   
        $('.headpopwrap').rollbar({
	        autoHide: true,             // automatically hide scrollbars if not needed   
        	autoHideTime: 'fast',       // time to hide scrollbars  
        	lazyCheckScroll: 500,      // check content size every NN milliseconds  
			zIndex:100
		});  
	});  
 
	</script>
    <title></title>
</head>
<body>
<div id="fb-root"></div>
<div id='headeroutwrap'>
    <!--header-->
    <div id='headerwrap' class='bgcolor_t'>
        <!--wraper-->
        <div class='centerwrap'>
            <!--LEFT-->
            <DIV CLASS='leftwrap'>
            	<a href='index.html' class='pageclick topnavclick' data-type='wallpage'>
                <img src='img/logo.png' style='margin:3px 0 0 5px;float:left;'/>
                </a>
                <!--搜尋-->
                <div id='headsearchwrap'>
                	<!--
                    <input type=text id='headsearch' placeholder='搜尋暱稱或ID' />
                    <input type=submit id='headsearchsubmit' value=''/>
                    -->
                    <div class='clr'></div>
                </div>
                <!--搜尋 END -->                
            </DIV>
            <!--MID-->
            <DIV class='midwrap'>
                <!--換頁  NAV-->
                <div id='headnavwrap' >
                    <a href='index.html?page=matchpage' class='topnavclick'>配對好友</a>
                    <a href='index.html?page=wallpage' class='topnavclick'>動態消息</a>
                    <a href='index.html?page=articlepage' class='topnavclick'>攻略‧創作</a>
                    <a href='index.html?page=rankpage' class='topnavclick'>排行榜</a>
                    <a href='index.html?page=qnapage' class='topnavclick'>Q&A </a>
                    <a href='index.html?page=actpage' class='topnavclick'>活動專區 </a>
                    <a href='index.html?page=shoppage' class='topnavclick'>類別
					<!--<img src='img/nav_shop.png' style='margin-top:-5px' />--></a><!--20190415 Pman 修改成用文字-->
                    <div class='clr'></div>
                </div>
                <!--換頁  NAV END -->
            </div>
            <!-- mid end-->
            <DIV CLASS='rightwrap'>
            </DIV>
            <!--
            <div id='showmenu' class=' btn'>
            	<span class='showrightmenu'>
            	<i class="fa fa-bars"></i><i class="fachanger fa fa-caret-down s "></i>
                </span>
                <div id='rightmenuwrap' class='headpop'>
                </div>
            </div>
            -->
            <div class='clr'></div>
        </div>
        <!--wraper end-->
    </div>
	<!--header end -->
</div>
<!--headeroutwrap end-->
<!--LEFT-->
<DIV id='mainleft' CLASS='leftwrap' style='top:40px;'><!--20190411 Pman 先頭痛醫頭--><!--20190430 Pman 再次調整id名稱與位置-->
	<div id="mainlefttopchanger">
    	<div id="leftpeople">
            <div id="leftpeopleimg">
                <img src="img/basichead.png">
            </div>
            	<a href='index.html'>
                <div id="leftpeopleinfo">
                    <div class="loginclick color_word bgcolor_t">登入</div>
                    <div class="registorclick color_w bgcolor_f">註冊會員</div>
                </div>
                </a>
            <div class="clr"></div> 
	 	</div>
    </div>
</DIV>
<!--LEFT END-->
<!--main -->
<div id='mainwrap' style="margin-top: 45px;"> <!--20190411 Pman 先頭痛醫頭-->
	<div class='centerwrap'>
    	<!--MID-->
  		<DIV id='mainmid' class='midwrap'>
        	<div class='midwrapin' id='mainmidwrapin'>
            	<div id='maincontentbox'>
                </div>
                <div class='clr'></div>  
            </div>
        </DIV>
        <div class='clr'></div>  
	</div>
</div>
<!--RIGHT -->
<DIV id='mainright' CLASS='rightwrap' style='top:40px;'><!--20190430 Pman 調整位置-->
</DIV>
<!--right end-->
<!--main end-->
</body>
</html>

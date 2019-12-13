<?php

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>NEEDGAMES</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="Ken Huang">
    <!--Mobile Only -->
    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!--Mobile Only -->
    <link rel="shortcut icon" href="">
    <link rel="stylesheet" type="text/css" href="assets/reset.css">
    <link rel="stylesheet" type="text/css" href="css/sweetalert.css">
    <link rel="stylesheet" type="text/css" href="assets/js/slick.css">
    <link rel="stylesheet" type="text/css" href="assets/style.css">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/lightgallery.min.css">
    <link rel="stylesheet" type="text/css" href="assets/addstyle.css">
	<script src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script type="text/javascript" src="assets/js/slick.min.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.js"></script>--><!-- 20181221 Pman 沒用上先mark掉 -->
	<script type="text/javascript" src="js/sweetalert.min.js"></script>
    <script src="js/jquery-ui-1.10.3.custom.min.js"></script>
	<script src="js/func.js"></script>
    <title></title>
</head>
<body>
<!--<div id="fb-root"></div>-->
<header id='mainheader'>
	<div class="logo" onClick="javascript:location.href='index.html'">
		<img src="assets/img/logo-s.png">
	</div>
	<br clear="both">
</header>
<div id='mainwrap'>
</div>
<a href="home.html" style="text-align:center;color:#000000;"><!--20181222 Pman 新增一個登入鈕-->
	<div style="padding: 10px;background: #fccf00;position: fixed;width: 100%;left: 0;bottom: 0;height: 50px;z-index: 99;">
	登入Needgames
	</div>
</a> 
<footer>
</footer>
</body>
<script>
    /* 收藏＆檢舉 選單開闔 */
    $("body").delegate(".main .show","click",function () {
        $(this).parents(".main").children(".word").addClass("all");
    });
    $("body").delegate(".wall .article .top .sub","click",function () {
        $(this).toggleClass("on");
    });

    /* MENU 選單開闔 */
    $("footer .menu .fa").click(function () {
        $("footer .menu").addClass("on");
    });
    $("footer .black").click(function () {
        $("footer .menu").removeClass("on");
    });
    /* 我的基本資料 眼睛開關 */
    $("body").delegate(".profile .game.me li p","click",function () {
        $(this).toggleClass('close');
    });
    
    /* Game 眼睛開關 */
    $("body").delegate(".profile .game span","click",function () {
        $(this).toggleClass('close');
    });
</script>
</html>

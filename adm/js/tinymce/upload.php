<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=$rootcompanyname?>控制面板</title>
<link href="css/Global.css" rel="stylesheet" type="text/css" />
<link href="css/back3.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../jquery-1.9.0.min.js"></script>
<script>
$(document).ready(function() {
	$("#file").change(function (){
		$("#fileform").submit();
	});
});
</script>
</head>
<body>
<?php
require_once '../../config/getformin.php';
require_once '../../config/createimg.php';
$imgwidth=660;
$imgheight=0;
$imgs=1;
$thumbwidth=100;
$thumbheight=0;
################################
####  設定
	$imgurl="../../../img/upload/";
	if($job=="upnews"){
		 upnews();
	}
	getnews();
#######################################
	function upnews(){
		global $imgurl;
		global $imgwidth;
		global $imgheight;
		global $imgs;
		global $thumbwidth;
		global $thumbheight;		
		$hasimg=0;
		/*這段更新*/
		 if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
			 if(($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "image/pjpeg")){
				$fileext="jpg";															  
				$hasimg=1;
			 }else if($_FILES["file"]["type"] == "image/png") { 
			   $fileext="png";
			   $hasimg=1;
			 }
		}
		/*更新結束*/
		if($hasimg==1){
				/*這段更新*/
				$tempid=rand(123,987).date('Yndhms').rand(123,987);
				if($fileext=="jpg"){
					$src = imagecreatefromjpeg($_FILES['file']['tmp_name']);
				}else if($fileext=="png"){
					$src = imagecreatefrompng($_FILES['file']['tmp_name']);
				}
				$width = imagesx($src);
				$height =imagesy($src);
				if($width<$imgwidth){
					$imgwidth=$width;
				}
				createimg($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
				/*更新結束*/
				echo "<script>";
				echo "$(document).ready(function() {";
				echo "$.ajax({\n";
				echo "	type:'GET',\n";
				echo "	dataType: 'json',\n";
				echo "	url: 'getfile.php',\n";
				echo "	data:{'timtess':$.now()},\n";
				echo "  	success: function(data){\n";
				echo "			mylist ='';\n";
				echo "			for(var a=0;a<data.length;a++){\n";
				echo "				mylist+='<a href='+data[a][1]+' class=imgclick ><img src=../img/upload/'+data[a][0]+' style=\'margin:5px;height:40px;float:left;\'></a>';\n";
				echo "			}\n";
				echo "			$('#imglist',parent.document).html(mylist);\n";
				echo "		 }\n";
				echo "	});	\n";
				echo "});";
				echo "	</script>";
		}
	 }
	 function getnews(){
			echo "<FORM action='upload.php?job=upnews' enctype='multipart/form-data' method='post' id='fileform'>";
			echo "<div>上傳檔案：<input type='file' name='file' id='file'></div></form>";
	 }
	?>
</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=$rootcompanyname?>控制面板</title>
<link href="css/Global.css" rel="stylesheet" type="text/css" />
<link href="css/back3.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="../jquery-1.11.1.min.js"></script>
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
require_once '../../adm/config/getformin.php';
require_once '../../adm/config/createimg.php';
$imgwidth=700;
$imgheight=0;
$imgs=1;
$thumbwidth=100;
$thumbheight=0;
################################
####  設定
	$imgurl="../../uploadfile/";
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
		/*檢查資料夾*/
		if(file_exists($imgurl)){
		}else{
			mkdir($imgurl, 0777);
		}
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
				createimg($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
				/*更新結束*/
				echo "<script>\n";
				echo "$(document).ready(function() {\n";
				echo "$('.mce-placeholder',parent.document).val('"+sessionStorage.getItem("imgurl")+"uploadfile/".$tempid.".".$fileext."');\n";
				echo "$('.mce-floatpanel',parent.document).css('opacity',1);\n";
				echo "parent.popcloseu2()\n";
				echo "});\n";
				echo "	</script>\n";
		}
	 }
	 function getnews(){
			echo "<FORM action='upload.php?job=upnews' enctype='multipart/form-data' method='post' id='fileform'>";
			echo "<div>請選擇檔案：<input type='file' name='file' id='file'></div></form>";
	 }
	?>
</body>
</html>
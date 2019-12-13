<?php
//20190418 Pman 目前這版本沒有「壓縮」檔案
// Allowed origins to upload images
$accepted_origins = array("http://www.coinpayments.tw","http://www.coinpayments.tw:8080");

// Images upload path
$imageFolder = "../../uploadfile/art/";

reset($_FILES);
$temp = current($_FILES);
if(is_uploaded_file($temp['tmp_name'])){
    if(isset($_SERVER['HTTP_ORIGIN'])){
        // Same-origin requests won't set an origin. If the origin is set, it must be valid.
        if(in_array($_SERVER['HTTP_ORIGIN'], $accepted_origins)){
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        }else{
            header("HTTP/1.1 403 Origin Denied");
            return;
        }
    }
  
    // Sanitize input
	//20190418 Pman 這裡的檔名檢查，會造成中文檔名無法使用，所以先跳過
    if(preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])){
        //echo $temp['name'];
		//header("HTTP/1.1 400 Invalid file name.");
        //return;
    }
  
    // Verify extension
    if(!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))){     
		header("HTTP/1.1 400 Invalid extension.");
        return;
    }
    $ext=strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)); //20190418 Pman 取得副檔名
    // Accept upload if there was no origin, or if it is an accepted origin
	$tempid=rand(123,987).date('Yndhms').rand(123,987);
    //$filetowrite = $imageFolder . $temp['name'];
	$filetowrite = $imageFolder . $tempid.".".$ext ; //20190418 Pman 加上副檔名，之前沒加
    move_uploaded_file($temp['tmp_name'], $filetowrite); 
  
    // Respond to the successful upload with JSON.
    echo json_encode(array('location' => $filetowrite));
} else {
    // Notify editor that the upload failed
    header("HTTP/1.1 500 Server Error");
}
?>
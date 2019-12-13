<?php
//資料夾在  ../../../uploadfile/
$keycode="test";
$myfolder="../../uploadfile/".$keycode."/";
if(file_exists($myfolder)){
}else{
	mkdir($myfolder, 0777);
}
if ($handle = opendir($myfolder)) {
	$a=0;
	$out="";
    while (false !== ($entry = readdir($handle))) {
		if(((time()-filemtime($myfolder."/".$entry)) < 6000) && ( strpos($entry,'s.png')>0 || strpos($entry,'s.jpg')>0 )){
			$out[$a][0]=$keycode."/".$entry;
			$tt=str_replace("s.jpg",".jpg",$entry);
			$tt=str_replace("s.png",".png",$tt);
			$temp=$keycode."/".$tt;
			$out[$a][1]=$temp;
			$a++;
		}
    }
    closedir($handle);
	echo json_encode($out);
}
?>

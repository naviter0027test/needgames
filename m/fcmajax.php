<?php
ini_set('upload_max_filesize', '10M');
ini_set('post_max_size', '10M');
error_reporting(~E_ALL);
ini_set("display_errors", 0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Credentials,trun');
	//以下是內容
	session_start();
   	if (isset($_REQUEST['_SESSION'])) die("Get lost Muppet!");
	require_once 'adm/config/config.php';
  require_once 'adm/config/getform.php';
  require_once 'adm/config/share.php';
	require_once 'func/sendmail.php';
	require_once 'func/cap.php';
	require_once 'adm/config/createimg.php';
	require_once 'func/upload.php';
	require_once 'func/member.php';
	require_once 'func/match.php';//配對
	require_once 'func/chat.php';//聊天

	if(!empty($job)){
		if(!empty($val)){
			$job($val);
		}else{
			$job();
		}
	}
	//回復動態牆--在相簿被選取之後
	function memok(){
		$out[0]="OK";
		echo json_encode($out);
	}
	function memreg($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		if($x[0] && $x[1]){
			if(share_getinfo($pdom,"FCM","thisid","'".$x[0]."'")){
				if(share_update($pdom,"FCM","regid='".$x[1]."'","thisid='".$x[0]."'")){
					$out[0]="OK";
				}else{
					$out[0]="ERR2";
				}
			}else{
				if(share_insert($pdom,"FCM","thisid,regid","'".$x[0]."','".$x[1]."'")){
					$out[0]="OK";
				}else{
					$out[0]="ERR2";
				}
			}
		}else{
			$out[0]="ERR1";
		}
		//$out[0]="OK";
		echo json_encode($out);
	}
	function getkey($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		if($t=share_gettable($pdom,"mem_ where fcmid is not NULL")){
			for($a=0;$a<count($t);$a++){
				$out[$a]=$t[$a]['fcmid']."<BR>\n";
			}
		}
		//$out[0]="OK";
		echo json_encode($out);
	}
?>

<?php
	ini_set('upload_max_filesize', '10M');
	ini_set('post_max_size', '10M');
	//以下是內容
	session_start();
   	if (isset($_REQUEST['_SESSION'])) die("Get lost Muppet!");
	require_once 'adm/config/config.php';
    require_once 'adm/config/getform.php';
    require_once 'adm/config/share.php';
	require_once 'func/cap.php';
	require_once 'adm/config/createimg.php';
	require_once 'func/upload.php';
	require_once 'func/sendmail.php';
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
	sendmail(1,'','');


   ?>
<?php
error_reporting(~E_ALL);
ini_set('display_errors', 1);
ini_set('short_open_tag', 'on');
//	###	本網頁為基礎設定頁	###		//
	//公司名稱
	$rootcompanyname="NEED";
	//設定共用
	$s_ar=array("DASDSADFAFSADADAD","JOFIHUIQOIWJE","DHAUSKWEGDUASK","AJIOHUIJRONREIJOI","QNJJHIHDISDHISUAHD","CNIUGRIWHIEWNBNBDJA");//0-5
	$s_br=array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","!","&","#","=",":");//0-30
	$s_cr=array(0,1,2,3,4,5,6,7,8,9);
	$s_dr=array(1,11,13,19,191,1331,1771,1991,12321,15791);
	$mrr=array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","P","Q","R","S","T","X","Y","Z");//22個
	$horo1=['-1','19','49','78','108','139','171','202','233','264','295','324','354'];//20190418 Pman 調整魔羯與射手的日期
	$horo2=['-1','19','49','79','109','140','172','203','234','265','296','325','355'];//20190418 Pman 調整魔羯與射手的日期
	$horon=['魔羯座','水瓶座','雙魚座','白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','魔羯座'];
	//設定
	$conf['chmaxdays']=90;//聊天室保存日期
	$conf['chreload']=5;//聊天室reload速度
	$conf['wallkeep']=1830;//動態牆保留日期
	$conf['notkeep']=300;//未讀訊息保留日期
	$conf['actkeep']=7;//認證信保留日期
	$conf['maxQA']=10;//QA獎勵設定的最大值
	
	//20190430 Pman 將一些錯誤訊息拉出來統一設定
	$errText['reopen']="Oop！好像發生了一些錯誤，請關閉本視窗，並嘗試重新登入系統！";
	//db 設定
	//簡訊王
	$vrname="needgames";
	$vrcode="needgames54843746";
	if($_SERVER['HTTP_HOST']=="99mission.why3s.tw" || $_SERVER['HTTP_HOST']=="192.168.1.202" || $_SERVER['HTTP_HOST']=="192.168.1.204"){
		$frommail="senderfox@99mission.why3s.tw";
		$frompass="senderfox";
		$mailhost="localhost";
		$mailport=25;
		$mailssl=0;
		$rootaddress="http://99mission.why3s.tw/game/";
		$conf['fcm_key'] ='AAAAdDWNzcc:APA91bEIDnJ_jtyVtr4nXKWFjgDsF2F46GCGOfXvzek4VW-unQUBkqffC4XF5SGv8mgqcf74hGRhOQfLRpWOpC0Q6Jml8fY1BfHiRwgvudPSUm2bp7hpe1l8lqfbHeFu1sXzWtulXWAL';
		//會員
		$conf['dbhost_m'] = 'localhost';
		$conf['dbuser_m'] = 'cptjdygy_user';
		$conf['dbpass_m'] = '99missionpass';
		$conf['dbname_m'] = 'cptjdygy_game_m';
		//$conf['dbname_m'] = 'cptjdygy_game_m_empt';
		//點數
		$conf['dbhost_p'] = 'localhost';
		$conf['dbuser_p'] = 'cptjdygy_user';
		$conf['dbpass_p'] = '99missionpass';
		$conf['dbname_p'] = 'cptjdygy_game_p';
		//$conf['dbname_p'] = 'cptjdygy_game_p_empt';
		//顯示
		$conf['dbhost_d'] = 'localhost';
		$conf['dbuser_d'] = 'cptjdygy_user';
		$conf['dbpass_d'] = '99missionpass';
		$conf['dbname_d'] = 'cptjdygy_game_d';
		//$conf['dbname_d'] = 'cptjdygy_game_d_empt';
		//商店
		$conf['dbhost_s'] = 'localhost';
		$conf['dbuser_s'] = 'cptjdygy_user';
		$conf['dbpass_s'] = '99missionpass';
		$conf['dbname_s'] = 'cptjdygy_game_s';
		//$conf['dbname_s'] = 'cptjdygy_game_s_empt';
		//聊天
		$conf['dbhost_c'] = 'localhost';
		$conf['dbuser_c'] = 'cptjdygy_user';
		$conf['dbpass_c'] = '99missionpass';
		$conf['dbname_c'] = 'cptjdygy_game_c';
		//$conf['dbname_c'] = 'cptjdygy_game_c_empt';
		$conf['db_encode'] = 'utf8';
	}else{
		$rootaddress="http://kyomon.wasd.club/";
		//$frommail="iacgtw@gmail.com";
		//$frompass="Ian199281912";
		//$mailhost="smtp.gmail.com";
		//$mailport=465;
		$frommail="dwu446227@gmail.com";
		$mailuser="dwu446227@gmail.com";
		$frompass="usbhcvzoiahyacdo";
		$mailhost="smtp.gmail.com";
		$mailport=587;
		$mailssl=1;
		$conf['google_key'] ='AIzaSyAguKHLDttW-R9nDRTYGzfKpCs4VXppf1w';
		$conf['fcm_key'] ='AAAAk-Oj24Y:APA91bF7lv8Cs50Ld4tWPwynOvTv13QcFWH6Q60d-t5i8e4RM_V06JNeghWIO1E6L0mQxJIVM_a9564JFGNOblbcu-T2hDtECzAJt6vZ7IyAhkvg-6yVGYgePbYZW56N27T2srVWe3_N';
		//會員
		$conf['dbhost_m'] = 'localhost';
		$conf['dbuser_m'] = 'kyomonwa_user';
		$conf['dbpass_m'] = 'sitegrou';
		$conf['dbname_m'] = 'kyomonwa_m';
		//點數
		$conf['dbhost_p'] = 'localhost';
		$conf['dbuser_p'] = 'kyomonwa_user';
		$conf['dbpass_p'] = 'sitegrou';
		$conf['dbname_p'] = 'kyomonwa_p';
		//顯示
		$conf['dbhost_d'] = 'localhost';
		$conf['dbuser_d'] = 'kyomonwa_user';
		$conf['dbpass_d'] = 'sitegrou';
		$conf['dbname_d'] = 'kyomonwa_d';
		//商店
		$conf['dbhost_s'] = 'localhost';
		$conf['dbuser_s'] = 'kyomonwa_user';
		$conf['dbpass_s'] = 'sitegrou';
		$conf['dbname_s'] = 'kyomonwa_s';
		//聊天
		$conf['dbhost_c'] = 'localhost';
		$conf['dbuser_c'] = 'kyomonwa_user';
		$conf['dbpass_c'] = 'sitegrou';
		$conf['dbname_c'] = 'kyomonwa_c';
		$conf['db_encode'] = 'utf8';
	}

?>

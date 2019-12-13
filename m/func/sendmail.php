<?php
	function sendmail($x,$y,$z){//$x==編號,$y==email,$z==其他
		global $rootaddress;
		$sign="<BR><BR>祝您順心愉快<BR>NEED經營團隊<BR><BR>";
		if($x=="1"){
			$receivername="新會員";
			$subject="會員確認信件,請開啟後執行";
			$contents="親愛的會員您好<BR>這是您的確認信函<BR>請按下面之連結啟用您的會員資格<BR>";
			$contents.="<a href='".$rootaddress."index.html?act=".$z."'>啟用我的會員資格</a><BR><BR>";
			$contents.=$sign;
		}else if($x=="2"){
			$receivername="忘記密碼";
			$subject="會員相關資料,請妥善保管";
			$contents="親愛的玩家您好<BR>";
			$contents.="您的密碼為".$z."<BR>請妥善保管使用,若有其他使用問題請使用聯絡我們功能,將有專人與您聯絡<BR>";
			$contents.=$sign;
		}else if($x=="3"){
			$receivername="親愛的朋友";
			$subject="聯絡我們回應";
			$contents.=$z."<BR><BR>";
			$contents.=$sign;
		}else if($x=="4"){
			$receivername="非實體商品購買";
			$subject="非實體商品序號，請妥善保存";
			$contents="親愛的會員您好<BR>這是您在NEEDGAMES的榮耀商店所換取的非實體商品序號<BR>請妥善保存謝謝<BR>";//20190413 Pman 變更文案//20190524 Pman 變更文案去除逗號
			$contents.=$z."<BR><BR>";
			$contents.=$sign;
		}else if($x=="5"){
			$receivername="Email重新綁定";
			$subject="會員email驗證碼,請確認";
			$contents="親愛的會員您好<BR>這是您所要求重新綁定Email的確認信件，您的驗證碼為 ".$z." 請回網站上輸入以上驗證碼，謝謝<BR>";
			$contents.="<BR><BR>";
			$contents.=$sign;
		}
		phpmail($y,$receivername,$subject,$contents);
	}

	function defmail(){
	}
	function phpmail($receiver,$receivername,$subject,$contents){
		global $frommail;
		global $frompass;
		global $mailhost;
		global $mailport;
		global $mailssl;
		global $conf;
		mb_internal_encoding('UTF-8');    // 內部預設編碼改為UTF-8
		require 'PHPMailerAutoload.php';
		//require("class.phpmailer.php");
		//$mail = new PHPMailer();
		$mail = new PHPMailer;
		$mail->IsSMTP();
		$mail->SMTPAuth = true;
		if($mailssl==1){
			$mail->SMTPSecure = "ssl";
		}
		$mail->Host = $mailhost;
		$mail->Port = $mailport;
		$mail->CharSet = "utf-8";
		$mail->Encoding = "base64";
		$mail->Username = $frommail;
		$mail->Password = $frompass;
		$mail->FromName = $frommail;
		$mail->From = $frommail;
		$mail->AddAddress($receiver,$receivername);
		$mail->AddReplyTo($frommail,"自動寄件人-請勿回覆");
		$mail->WordWrap = 50;
		$mail->IsHTML(true); // send as HTML
		$mail->Subject = mb_encode_mimeheader($subject, "UTF-8");
		$mail->Body = $contents;
		$mail->AltBody = $contents;
		if($mail->Send()){
		}else{
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			share_insert($pdom,"mailerr","email,log","'".$receiver."','".$mail->ErrorInfo."'");
			$pdom=null;
			return false;
		}
	}
	function fcmupdatebadge($id,$cct){
		global $conf;
		$mykey=$conf['fcm_key'];
		$rnd1=rand(1234567,9876543);
		$fcmMsg = array(
			'body' => "updatebadge",
			'title' => "updatebadge",
  		'mybadge'=>$cct,
			'badge'=>$cct
		);
		$fcmFields = array(
			'to' => $id,
		  'priority' => 'high',
		  'data' => $fcmMsg
		);
		$headers = array(
			'Authorization:key='.$mykey,
			'Content-Type:application/json'
		);
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
		$result = curl_exec($ch );
		curl_close( $ch );
		return true;
	}
	function sendfcm($id,$title,$msg,$act,$xct,$mtp){
		global $conf;
		$mykey=$conf['fcm_key'];
		$rnd1=rand(123456,987654);
		$fcmMsg = array(
			'body' => $msg,
			'title' => $title,
			'mybadge'=>$xct,
			'badge'=>$xct,
			'actiontype' =>'chat',
		  'action' =>$act,
			'notId'=>$rnd1,
		  'content-available'=>'1'
		);
		if($mtp=="android"){
			$fcmFields = array(
				'to' => $id,
			  'priority' => 'high',
			  'data' => $fcmMsg
			);
		}else if($mtp=="ios"){
			$fcmFields = array(
				'to' => $id,
			  'priority' => 'high',
			  'notification' => $fcmMsg
			);
		}
		$headers = array(
			'Authorization:key='.$mykey,
			'Content-Type:application/json'
		);
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
		$result = curl_exec($ch );
		curl_close( $ch );
		return true;
	}

?>

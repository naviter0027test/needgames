<?php
require_once 'adm/config/config.php';
require_once 'adm/config/getform.php';
require_once 'adm/config/share.php';
require_once 'func/sendmail.php';

//$mykey='AAAAFbcoHqU:APA91bFDOIfEn8eFW0qNfXJRwRKiTVzMkjWhWjowzIhRVN2wpJLpOJmo_KQ5suSGkUfJR4v1EZya4hJYd5YpVktCDBesK7bOSzbUJq55kpxH0ASHVbKu6_k5gv3Sp3q1mZyAtJvBQQvs';

//$mykey='AAAAdDWNzcc:APA91bEIDnJ_jtyVtr4nXKWFjgDsF2F46GCGOfXvzek4VW-unQUBkqffC4XF5SGv8mgqcf74hGRhOQfLRpWOpC0Q6Jml8fY1BfHiRwgvudPSUm2bp7hpe1l8lqfbHeFu1sXzWtulXWAL';
//單一
//$singleID = 'c-7qteZ9DgU:APA91bEcecZU4k3fBzrtvtQ_paHsObbDPRHvSpzpISV-5ocl-jkjm40rWVT5ZJbc2CFIvFt29mDeUpvZIjRjtMOoaoLHFr_5A-k7x6DEu0Q9sM8icQwcWpzACPVaXcAJvCocM-FjYvJA' ;
//$id = 'gAAAAABaX3fzn7BN8hA5ReyKzVNOj8rMMs_682X8nH9eU-Y2Rv5LYl3GWSIXb2EGkIhNs2auFqlER5gT5Nlf3jo65iYTdwEkaT2PLetVwVV_PIIGSvC3oePc99BqhQ4z0PpuylXVAW6q';
//$id = 'c-7qteZ9DgU:APA91bEcecZU4k3fBzrtvtQ_paHsObbDPRHvSpzpISV-5ocl-jkjm40rWVT5ZJbc2CFIvFt29mDeUpvZIjRjtMOoaoLHFr_5A-k7x6DEu0Q9sM8icQwcWpzACPVaXcAJvCocM-FjYvJA' ;
$msg="test";
$title="test";
$act="173";
$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
$pdom -> exec("set names ".$conf['db_encode']);
$temp=share_getinfo($pdom,"mem_","memberid","1111111966");
if($temp['fcmid']){
  $conout="dsadad";
  if(sendfcmx($temp['fcmid'],"聊天室訊息",$conout,$act)){
    echo "OK";
  }else{
    echo "NO";
  }
}

function sendfcmx($a,$b,$c,$d){
  global $conf;
  $mykey=$conf['fcm_key'];
  $fcmMsg = array(
    'body' => $msg,
    'title' => $title,
    'sound' => "default"
  );
  $fcmFields = array(
    'to' => $id,
    'priority' => 'high',
    'notification' => $fcmMsg
  );

  $fcmdata = array(
    "title"=>"Test Notification",
    "body"=>"This offer expires at 11:30 or whatever",
    'actiontype' =>'chat',
    'action' =>$act
  );
  $fcmdataFields = array(
    'to' => $id,
    'priority' => 'high',
    'data' => $fcmdata
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
  curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmdataFields ) );
  $result = curl_exec($ch );
  curl_close( $ch );
  return true;
}


/*
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmFields ) );
$result = curl_exec($ch );
curl_close( $ch );
$res=json_decode($result);
echo $result;
*/
/*
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fcmdataFields ) );
$result = curl_exec($ch );
curl_close( $ch );
$res=json_decode($result);
echo $result;
*/

//以下是傳送方式(正式)
/*
if(sendfcm($singleID,"needgame","歡迎來到needgame2","test")){
  echo "OK";
}else{
  echo "FAIL";
}
*/
/*
$registrationIDs = array(
     'eEvFbrtfRMA:APA91bFoT2XFPeM5bLQdsa8-HpVbOIllzgITD8gL9wohZBg9U.............mNYTUewd8pjBtoywd',
     'eEvFbrtfRMA:APA91bFoT2XFPeM5bLQdsa8-HpVbOIllzgITD8gL9wohZBg9U.............mNYTUewd8pjBtoywd',
     'eEvFbrtfRMA:APA91bFoT2XFPeM5bLQdsa8-HpVbOIllzgITD8gL9wohZBg9U.............mNYTUewd8pjBtoywd'
) ;
$fcmMsg = array(
	'body' => 'here is a message. message',
	'title' => 'This is title #1',
	'sound' => "default"
);
$fcmFields = array(
	'to' => $singleID,
  'priority' => 'high',
	'notification' => $fcmMsg
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
echo $result . "\n\n";
*/

?>

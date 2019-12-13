<?php
require_once 'adm/config/config.php';
require_once 'adm/config/getform.php';
require_once 'adm/config/share.php';

$mykey='AAAAk-Oj24Y:APA91bF7lv8Cs50Ld4tWPwynOvTv13QcFWH6Q60d-t5i8e4RM_V06JNeghWIO1E6L0mQxJIVM_a9564JFGNOblbcu-T2hDtECzAJt6vZ7IyAhkvg-6yVGYgePbYZW56N27T2srVWe3_N';
$conf['fcm_key']=$mykey;
//$mykey='AAAAdDWNzcc:APA91bEIDnJ_jtyVtr4nXKWFjgDsF2F46GCGOfXvzek4VW-unQUBkqffC4XF5SGv8mgqcf74hGRhOQfLRpWOpC0Q6Jml8fY1BfHiRwgvudPSUm2bp7hpe1l8lqfbHeFu1sXzWtulXWAL';
//單一
//$singleID = 'c-7qteZ9DgU:APA91bEcecZU4k3fBzrtvtQ_paHsObbDPRHvSpzpISV-5ocl-jkjm40rWVT5ZJbc2CFIvFt29mDeUpvZIjRjtMOoaoLHFr_5A-k7x6DEu0Q9sM8icQwcWpzACPVaXcAJvCocM-FjYvJA' ;
$id = 'cdLMhtQJhfs:APA91bE2K0Wjk37Xi1ggWIpjAcXvOCs2zCocMfPDjVpKNmlmlj7ar05wq8StjTcd8HixPowirHi2JHQ35n5K9NX7PTMNpOitnU7RFMf8wq1VHFSKKUgqXBgzjGvpVPDFMlcxH2T4VwH9';
//$id = 'c-7qteZ9DgU:APA91bEcecZU4k3fBzrtvtQ_paHsObbDPRHvSpzpISV-5ocl-jkjm40rWVT5ZJbc2CFIvFt29mDeUpvZIjRjtMOoaoLHFr_5A-k7x6DEu0Q9sM8icQwcWpzACPVaXcAJvCocM-FjYvJA' ;
$msg="test";
$title="test";
$act="173";

$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
$pdom -> exec("set names ".$conf['db_encode']);
$temp=share_getinfo($pdom,"FCM","thisid","12345678");
if($temp['regid']){
  $conout="dsadad";
  testb($temp['regid']);
}
function testb($id){
global $conf;
global $msg;
global $title;
global $act;
$mykey=$conf['fcm_key'];
$rnd1=rand(12345,98765);
$rnd2=rand(123456789,987654321);
$fcmdata = array(
  "title"=>"測試訊息".$rnd1,
  "body"=>"測試內容".$rnd2." be info",
  'actiontype' =>'chat'.$rnd1,
  'action' =>$rnd2,
  'notId'=>$rnd1,
  "badge"=>3,
  'content-available'=>'1'
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
$res=json_decode($result);
echo $result;
}
function sendfcmx($a,$b,$c,$d){
  global $conf;
  global $msg;  global $title;  global $act;

  $mykey=$conf['fcm_key'];
  $fcmMsg = array(
    'body' => $msg,
    'title' => $title,
    'sound' => "default"
  );
  $fcmFields = array(
    'to' => $a,
    'priority' => 'high',
    'notification' => $fcmMsg
  );

  $fcmdata = array(
    "title"=>"Test Notification",
    "body"=>"This offer expires at 11:30 or whatever",
    "badge"=>"7",
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
  $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $error_report= curl_getinfo($ch);
  var_dump($http_status);
  var_dump($error_report);
  curl_close( $ch );
  //return true;
}


?>

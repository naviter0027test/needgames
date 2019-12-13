<?php
//申請的API金鑰
//$API_KEY = "AAAALzb6v4c:APA91bHsiqCPE2tNAafoGs3hza4yHmhbIJyx2G4pQ-3xZqDZDWgJHJZhcfw9VgT6Ch2BQWj38zBMoBucoEfYYGDod_y5VAtNBOGcJV0Pw2fkdh2vyRPlyuagpry1FLogIowIXTJEa56t";
//$API_KEY = "AIzaSyC56wyqBcNEQau04dBnZAebDV7AVGjb89Q";
$API_KEY = "AAAAk-Oj24Y:APA91bF7lv8Cs50Ld4tWPwynOvTv13QcFWH6Q60d-t5i8e4RM_V06JNeghWIO1E6L0mQxJIVM_a9564JFGNOblbcu-T2hDtECzAJt6vZ7IyAhkvg-6yVGYgePbYZW56N27T2srVWe3_N";
//推播訊息
if(!empty($_POST['message']))
{
	
	//設定內容
    //$notification_message = array("body" => $_POST['message'],"title"=>$_POST['title']);
	//$data_message = array("title" => $_POST['title'],"body" => $_POST['message'],"gotoUrl" => $_POST['gotourl'], "count" => $_POST['count']);
	$data_message = array("title" => $_POST['title'],"body" => $_POST['message'],"badge" => $_POST['count']);
	$json = array(
      'to' => $_POST['token'],
      'notification' => $data_message
	  //'badge' => $count
    );
    /* $json = array(
            'message' => $message
            ); */
	
	$url = 'https://fcm.googleapis.com/fcm/send';
	
	$headers = array(
            'Authorization: key=' . $API_KEY,
            'Content-Type: application/json'
        );
		
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);	//忽略SSL驗證
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($json));
	$result = curl_exec($curl);
	echo "dddd:".json_encode($json);
	curl_close($curl);
	
    echo $result;
	echo "<hr>";
}
?>
<html>
<body>
<form method="post" action="" id="form1">
	token: <input id="token" name="token" type="text" placeholder="token"><br>
	Title: <input id="title" name="title" type="text" placeholder="Title"><br>
	Message: <input id="message" name="message" type="text" placeholder="Message"><br>
	gotoUrl: <input id="gotourl" name="gotourl" type="text" placeholder="gotoUrl"><br>
	Badger count: <input id="count" name="count" type="text" placeholder="count"><br>
	<button type="submit">Send</button>
</form>
</body>
</html>
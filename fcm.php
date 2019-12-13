<?php
    define( 'API_ACCESS_KEY', 'AIzaSyD1Zv_8PIbd845pnd1WNsVyxVnW7iVKHes' );
    $registrationIds = $_GET['id'];
     $msg = array(
		'body' 	=> 'Body  Of Notification',
		'title'	=> 'Title Of Notification',
   	'icon'	=> 'myicon',/*Default Icon*/
  	'sound' => 'mySound'/*Default sound*/
    );
	$fields = array(
				'to'		=> $registrationIds,
				'notification'	=> $msg
			);
	$headers = array(
				'Authorization: key=' . API_ACCESS_KEY,
				'Content-Type: application/json'
			);
		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
		$result = curl_exec($ch );
		curl_close( $ch );
    echo $result;
?>


<script src="https://www.gstatic.com/firebasejs/4.8.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1Zv_8PIbd845pnd1WNsVyxVnW7iVKHes",
    authDomain: "testfcm-45fc6.firebaseapp.com",
    databaseURL: "https://testfcm-45fc6.firebaseio.com",
    projectId: "testfcm-45fc6",
    storageBucket: "testfcm-45fc6.appspot.com",
    messagingSenderId: "93267173029"
  };
  firebase.initializeApp(config);
</script>

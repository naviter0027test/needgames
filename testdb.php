<?php
	ini_set('upload_max_filesize', '10M');
	ini_set('post_max_size', '10M');
	error_reporting(~E_ALL);
	ini_set("display_errors", 1);
	//以下是內容
	echo "OK";
	session_start();
	//$pdod = new PDO('mysql:host=192.168.1.205;dbname=mysql','tester', 't1stp_ssME');
	$pdod = new PDO('mysql:host=192.168.1.203;dbname=mysql','tester', 'y111sh11');
	$pdod -> exec("set names utf8");	
	echo "OK";

?>
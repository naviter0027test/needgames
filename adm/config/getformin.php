<?php
if($_SERVER['QUERY_STRING']<>""){
	$MYSTRING=$_SERVER['QUERY_STRING'];
	parse_str($MYSTRING, $params);
	foreach ($params as $key => $term){
		$term= str_replace("'", "&#039;",$term);
		$term= str_replace("\"", "&#034;",$term);
		$term= str_replace("=", "&#061;",$term);
		$newinput=$key;
		$$newinput=$term;
	}
}
if(count($_POST)>0){
	foreach ($_POST as $key => $term){
		$term= str_replace("'", "&#039;",$term);
		$term= str_replace("\"", "&#034;",$term);
//$term= str_replace("=", "&#061;",$term);
		$$key=$term;
	}

}


?>
<?php
	if($_SERVER['QUERY_STRING']<>""){
		$MYSTRING=$_SERVER['QUERY_STRING'];
		parse_str($MYSTRING, $params);
		foreach ($params as $key => $term){
			$term= str_replace("'", "&#039;",$term);
			$term= str_replace("\"", "&#034;",$term);
			$term= str_replace("=", "&#061;",$term);
			$term= str_replace("QQHUIRCAJOSDIJDOW", "https",$term);
			$term= str_replace("VMASODIWEJWOJEO", "http",$term);
			$$key=$term;
		}
	}
	if(count($_POST)>0){
		foreach ($_POST as $key => $term){
			$term= str_replace("'", "&#039;",$term);
			$term= str_replace("\"", "&#034;",$term);
			//$term= str_replace("http:", "",$term);
			//$term= str_replace("HTTP:", "",$term);		
			//$term= str_replace(":", "",$term);
			//$term= str_replace("/", "",$term);
			$term= str_replace("QQHUIRCAJOSDIJDOW", "https",$term);
			$term= str_replace("VMASODIWEJWOJEO", "http",$term);
			$term= str_replace("=", "&#061;",$term);
			$$key=$term;
		}
	}


?>
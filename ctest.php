<?php	
if ($_SERVER['HTTPS'] != "on") {
echo "This is not HTTPS";
}else{
	$url  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
			$url .= $_SERVER['SERVER_NAME'];
			$url .= htmlspecialchars($_SERVER['REQUEST_URI']);
echo $url;
}


	?> 
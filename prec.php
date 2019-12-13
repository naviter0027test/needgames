<?
	//中文
    session_start();
    require_once 'adm/config/config.php';
    require_once 'adm/config/getformin.php';
    require_once 'adm/config/createimg.php';
    require_once 'adm/config/share.php';
	$sflag=0;
	parse_str($t, $p);
	foreach ($p as $key => $term){
		if($key=="kmsgid"){
			if($term>=0){
				$sflag=1;
			}
		}
	}
	if($sflag==1){
		echo "OK";
	}else{
		echo "NO";
	}
?>
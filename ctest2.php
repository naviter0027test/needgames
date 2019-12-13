<?php	
	session_start();
	$url="http://newwebdemo.com.tw/ZHANGLIST/cjconnecttest.php";
	$cjcode="43Drew5478frterS76Fsad";
	$cjpass="fdgsWadG534586lGwerd6456Shu345jh90Jfgd";
	$ordernumber='E092787916';//樟之提供
	$trackingid='123456789';//回傳給樟之
	$cjnumber='CJ123456';//回傳給樟之
	$orderstatus='1';//送貨完成
	$processdate='2017-10-1';//送貨日期
	$ordernote='測是測試';
	$str=MD5("cjcode=43Drew5478frterS76Fsad&ordernumber=E092787916&trackingid=123456789fdgsWadG534586lGwerd6456Shu345jh90Jfgd");
	echo $str;


	function sendtracking($o,$t,$c){
		$out['job']="updatetracking";
		$out['token']=$_SESSION['token'];
		$out['ordernumber']=$o;
		$out['trackingcode']=$t;
		$out['cjnumber']=$c;
		$data=$out;
		if($t=curl_post($GLOBALS['url'],$data)){
			$x=json_decode($t, true);
			if($x && $x['status']){
				if($x['status']=="ERROR"){
					echo $x['errorcode'];
					return false;
				}else{
					return true;
				}
			}else{
				echo "抓取錯誤";
				return false;
			}
		}else{
			echo "curl 錯誤";
			return false;
		}
	}
	function sendend($o,$c,$s,$d,$n){
		$out['job']="updateorder";
		$out['token']=$_SESSION['token'];
		$out['ordernumber']=$o;
		$out['cjnumber']=$c;
		$out['orderstatus']=$s;
		$out['processdate']=$d;
		$out['ordernote']=$n;
		$data=$out;
		if($t=curl_post($GLOBALS['url'],$data)){
			$x=json_decode($t, true);
			if($x && $x['status']){
				if($x['status']=="ERROR"){
					echo $x['errorcode'];
					return false;
				}else{
					return true;
				}
			}else{
				echo "抓取錯誤";
				return false;
			}
		}else{
			echo "curl 錯誤";
			return false;
		}
	}
	function curl_post($url,$data){//post
		$tuCurl = curl_init(); 
		curl_setopt($tuCurl, CURLOPT_URL, $url); 
		curl_setopt($tuCurl, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($tuCurl, CURLOPT_POST, 1);
		curl_setopt($tuCurl, CURLOPT_POSTFIELDS, $data); 
		$tuData = curl_exec($tuCurl);
		$x=curl_error($tuCurl);
		curl_close($tuCurl);
		if($x){
			return $x;
		}else{
			return $tuData;
		}
	}
	
	?> 
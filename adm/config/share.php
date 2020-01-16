<?php
	//本系統由沈元製作及管理
	//版本 2015 安全版
	//請勿未授權使用
	//版本 V 3.0 
	//COPY RIGHT RESERVED 
	//DANNEWKJBWIEHUIWANEIWHEAUHDASJKDHIUWAHIWUEHUHNIDWAEHIWAUEHI
	//細節翔鷺 AJSIODAJWIAJEIQ*LAASNVLKLHWILAAAWEWJOJELWAIJELWIJELWJI
	//請詳細了解整體規劃後再做任何修改
	// PLEASE USE WITH CARE
	//###########################################################################################################
	$returnerr="";
	$adm_maillist="yuan.shen65@gmail.com";
	// ########		PDO 版 共 用 功 能 		############	//
	//  共用程式,請勿修改,以免破壞全站結構
	// VERSION 2.0 PDO VERSION
	// SHARE FUNCTION IS REQUIRED TO RUN THIS SITE
	//###########################################################################################################
	//ALL SELECT ALL SELECT ALL SELECT ALL SELECT 
	function unsetmem($inarr){
		for($a=0;$a<count($inarr);$a++){
			unset($inarr[$a]);
		}
		unset($inarr['password']);
		if($inarr['email_v']==0){
			unset($inarr['email']);
		}
		if($inarr['gender_v']==0){
			unset($inarr['gender']);
		}
		if($inarr['birthday_v']==0){
			unset($inarr['birthday']);
		}
		if($inarr['location_v']==0){
			unset($inarr['location']);
		}		
		if($inarr['gt_v']==0){
			unset($inarr['gtid']);
		}
		if($inarr['game1_v']==0){
			unset($inarr['game1']);
		}
		if($inarr['game2_v']==0){
			unset($inarr['game2']);
		}
		if($inarr['game3_v']==0){
			unset($inarr['game3']);
		}
		return $inarr;
	}
	function share_gettable($db,$id){
		$pdo=$db;
		$rows = array();
		$sql_statement = $pdo->prepare("SELECT * FROM ".$id);
		$sql_statement->execute();
		$rows= $sql_statement->fetchAll();
		return $rows;
	}
	function share_getfree($db,$id){
		$pdo=$db;
		$rows = array();
		$sql_statement = $pdo->prepare($id);
		$sql_statement->execute();
		$rows= $sql_statement->fetchAll();
		return $rows;
	}
	function share_getcount($db,$id){
		$pdo=$db;
		$sql_statement = $pdo->prepare("SELECT count(*) as CC FROM ".$id);
		$sql_statement->execute();
		$row= $sql_statement->fetch();
		return $row["CC"];
	}
	function share_getcountid($db,$table,$idname,$id){
		$pdo=$db;
		$sql_statement = $pdo->prepare("SELECT count(*) as CC FROM ".$table." WHERE ".$idname."='".$id."'");
		$sql_statement->execute();
		$row= $sql_statement->fetch();
		return $row["CC"];
	}
	function share_getinfo($db,$table,$idname,$id){
		$pdo=$db;
		$sql_statement = $pdo->prepare( "SELECT * FROM ".$table." WHERE ".$idname."='".$id."'");
		$sql_statement->execute();
		$row= $sql_statement->fetch();
		return $row;
	}
	//###########################################################################################################
	// INSERT UPDATE DELETE 
	function share_del($db,$table){
		$pdo=$db;
		$sql_statement = $pdo->prepare( "DELETE  FROM ".$table);
		return $sql_statement->execute();
	}
	function share_insert($db,$table,$key,$val){
		$pdo=$db;
		$sql_statement = $pdo->prepare( "INSERT INTO ".$table."(".$key.") VALUES(".$val.")");
		return $sql_statement->execute();
	}
	function share_update($db,$table,$key,$val){
		$pdo=$db;
		$sql_statement = $pdo->prepare( "UPDATE ".$table." SET ".$key." WHERE ".$val);
		return $sql_statement->execute();
	}
	//###########################################################################################################
	//取得點數
	function get_awa($x){//ajax 使用--0317修改成可接受多重內容
		global $conf;
		$out="";
		$xx=0;
		$pdo = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
		$pdo -> exec("set names ".$conf['db_encode']);	
		for($a=0;$a<count($x);$a++){
			$awa=share_getinfo($pdo ,"awa_","awardid",$x[$a]);
			$xx=$xx+$awa['points'];
		}
		$pdo=null;
		$out[0]=$xx;
		echo json_encode($out);
	}
	function get_awain($x){	//php內部使用
		global $conf;
		$out="";
		$pdo = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
		$pdo -> exec("set names ".$conf['db_encode']);	
		$awa=share_getinfo($pdo ,"awa_","awardid",$x);
		$pdo=null;	
		return $awa['points'];
	}
	//###########################################################################################################
	// ALL OTHER SHARE FUNCTIONS 	
	function share_showerr($con){
		global $returnerr;
		$returnerr=$con;
		 echo "<div id=error style='width:100%;font-size:30px;'>".$con."<BR><BR></div>";
	}
	//link處理 ? 和= & 
	function share_setlink($x){
		$t=str_replace("=","|A|",$x);
		$tt=str_replace("?","|B|",$t);
		$ttt=str_replace("&","|C|",$tt);
		return $ttt;
	}
	function share_relink($x){
		$t=str_replace("|A|","=",$x);
		$t=str_replace("|B|","?",$t);
		$t=str_replace("|C|","&",$t);
		return $t;
	}	
	function curl_get($url,$data){
		$tuCurl = curl_init(); 
		curl_setopt($tuCurl, CURLOPT_URL, $url); 
		curl_setopt($tuCurl, CURLOPT_RETURNTRANSFER, 1); 
		curl_setopt($tuCurl, CURLOPT_POST, 1);
		curl_setopt($tuCurl, CURLOPT_POSTFIELDS, $data); 
		$tuData = curl_exec($tuCurl);
		curl_close($tuCurl);
		return $tuData;
	}
	function curl_getb($url){
		$tuCurl = curl_init(); 
    	curl_setopt($tuCurl,CURLOPT_URL,$url);
    	curl_setopt($tuCurl,CURLOPT_RETURNTRANSFER,true);
		$tuData = curl_exec($tuCurl);
		curl_close($tuCurl);
		return $tuData;
	}
	function curl_getjson($url,$code){
		$tuCurl = curl_init(); 

    	curl_setopt($tuCurl,CURLOPT_URL,$url);
    	curl_setopt($tuCurl,CURLOPT_RETURNTRANSFER,true);
		curl_setopt($tuCurl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
		curl_setopt($tuCurl, CURLOPT_POSTFIELDS, json_encode( array( "longUrl" => $code ) ));
		$tuData = curl_exec($tuCurl);
		curl_close($tuCurl);
		return $tuData;
	}
	//後台管理
	function share_tranmice($con){
		$out=str_replace("&#034;","'",$con);
		$out=str_replace("&#061;","=",$out);
		$out=str_replace("../uploadfile/","uploadfile/",$out);
		$out=str_replace("../img/upload/","img/upload/",$out);
		return $out;
	}
	//檢查檔案格式
	function share_chkfiletype($x,$y){
		if(($y=="png" && ($x["type"] == "image/png")) || ( $y=="jpg"  && ($x["type"] == "image/jpeg") || ($x["type"] == "image/pjpeg")))  { 
			return "OK";
		}else if($y=="gif" && ($x["type"] == "image/gif")){
			return "OK2";
		}else{
			return "NO";
		}
	}
	function share_substr($x,$y){
		$b=0;
		$o="";
		for($a=0;$a<$y;$a++){
			$t=mb_substr($x,$b,1,"UTF-8");
			if(strlen($t)>1){
				$a+=1;
			}
			$b++;
			$o.=$t;
		}
		if(mb_strlen($x,'UTF-8')>$b){
			return $o."...";
		}else{
			return $x;
		}
	}
	//檢查目前點數
	function chk_points($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);	
		$t=share_getinfo($pdom,"mem_","memberid",$x);
		$pdom=null;
		return $t['points'];
	}
	//取得點數
	function get_point($x){
		global $conf;
		$pdo = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
		$pdo -> exec("set names ".$conf['db_encode']);	
		$temp=share_getinfo($pdo,"awa_","awardid",$x);
		return $temp['points'];
		$pdo=null;
	}
	//寄送 通知要求使用者手機認證
	function send_vnotice($id){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		share_insert($pdod,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$id."','".$id."',9,'您的手機還沒驗證，請前往驗證您的手機，完成後可使用完整功能及額外貢獻值獎勵',''");
		$pdod=null;
	}
	function add_point($mid,$x,$y,$z,$id=""){ // 會員,點數,點數由來,note(id)
		global $conf;
		$pdo = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
		$pdo -> exec("set names ".$conf['db_encode']);	
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$flag=0;
		//檢查
		if($x<0){
			$temp=share_getinfo($pdom,"mem_","memberid",$mid);
			if(($temp['points']+$x)<0){
				$flag=1;
			}
		}
		if($flag==1){
			return false;
		}else{
			if($temp=share_insert($pdo,"poi_","memberid,points,orderid,pointname,note","'".$mid."','".$x."','".$y."','".$z."','".$id."'")){
				if($x>0){
					$ttt="score=score+".$x.",points=points+".$x;
				}else{
					$ttt="points=points ".$x;
				}
				$tb=share_update($pdom,"mem_",$ttt,"memberid='".$mid."'");
				return true;
			}else{
				return false;
			}
		}
		$pdo=null;
	}
	//增加紀錄進rank
	function addgamerank($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);			
		$dates=date('Y-m');
		if($t=share_gettable($pdom,"rank_ WHERE ymonth='".$dates."' AND gameid='".$x."'")){
			share_update($pdom,"rank_","qty=qty+1","thisid='".$t[0]['thisid']."'");
		}else{
			share_insert($pdom,"rank_","ymonth,gameid","'".$dates."','".$x."'");
		}
		$pdom=null;
	}
	
	function GetIP(){
	 if(!empty($_SERVER["HTTP_CLIENT_IP"])){
	   $cip = $_SERVER["HTTP_CLIENT_IP"];
	  }
	  elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
	   $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
	  }
	  elseif(!empty($_SERVER["REMOTE_ADDR"])){
	   $cip = $_SERVER["REMOTE_ADDR"];
	  }
	  else{
	   $cip = "999999999";
	  }
	  return $cip;
	}
	

	//#######################################################
	//########## 以下為網站程式
	//##############################################
	function get_basic($x){
		$out= array();
		// 看看需不需要通知友聊天室訊息
		chat_chk_note();
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	

		$out[0]=share_gettable($pdom,"ran_");
		$out[1]=share_gettable($pdom,"gam_ order by hotrank DESC");
		$out[2]=share_gettable($pdom,"location");
		$out[3]=share_gettable($pdom,"gtime");
		$temp=share_gettable($pdod,"bannertype WHERE isopen=1");
		$out[4]=[];
		for($a=0;$a<count($temp);$a++){
			$out[4][$a]=$temp[$a];
			$out[4][$a]['banner']=share_gettable($pdod,"ban_ WHERE typeid='".$temp[$a]['typeid']."' AND startdate<=now() AND enddate>=now() AND isopen=1");
		}
		//$dates=date('Y-m');
		$dates=date("Y-m",strtotime('-1 month'));
		$out[5]=[];
		$out[5]=share_gettable($pdom,"rank_nohide WHERE ymonth='".$dates."' order by qty desc limit 10"); //20190110 Pman 改從rank_nohide取得Top10，以免顯示隱藏標籤
		$pdom=null;
		$pdod=null;
		//chatpic
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);	
		$pictype=share_gettable($pdoc,"chatimgtype WHERE isopen=1 order by sorting DESC");
		$a=0;
		$out[6]=[];
		foreach($pictype as $type){
			$out[6][$a]=$type;
			$out[6][$a]['pic']=share_gettable($pdoc,"chatimg WHERE isopen=1 AND typeid='".$type['thisid']."'  order by sorting DESC");
			$a++;
		}
		$pdoc=null;
		$out[7]=$a;
		$out[8]=$conf['maxQA']; //20190329 Pman 輸出config的maxQA設定值
		echo json_encode($out);
	}
	//刪除超過時間的舊資料   1.walllist 超過時間的  2.只有單純發言的content 3.content 相對的rep
	function chk_walldel(){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		if($ts=share_gettable($pdod,"wall WHERE timekey<(".time()."-".$conf['wallkeep']."*86400)")){
			foreach($ts as $t){
				$c=share_getinfo($pdod,"con_","thisid",$t['contentid']);
				if($c['typeid']==0){//刪除所有
					share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
					share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
				}
				share_del($pdod,"wall WHERE thisid='".$t['thisid']."'");
			}
		}
	}
	function share_html($x){
		$x= str_replace("<", "&lt;",$x);
		$x= str_replace(">", "&gt;",$x);
		$x= str_replace("\n\n", "\n",$x);
		$x= str_replace("\n\n", "\n",$x);
		$x= str_replace("\n\n", "\n",$x);
		$x= str_replace("\n\n", "\n",$x);
		$x=str_replace("/\n$/", "",$x);
		$x=str_replace("'", "",$x);
		$x=str_replace("'", "",$x);
		$x=str_replace("'", "",$x);
		return $x;
	}
	function sendinfo1($x,$y,$z){//手機馬,序號,回復網址--g1 ice
			//$url="http://202.39.48.216/kotsmsapi-1.php?";
            /*
			$url="https://api.kotsms.com.tw/kotsmsapi-1.php?";
			$url.="username=".$GLOBALS['vrname'];
			$url.="&password=".$GLOBALS['vrcode'];
			$url.="&dstaddr=".$x;
			$url.="&smbody=".urlencode(iconv("UTF-8","big5","感謝您加入kyomon手機認證，您的認證碼是".$y));
			$url.="&dlvtime=0";
			$url.="&vldtime=0";
			$url.="&response=".$z;
			$temp=curl_getb($url);
             */
            //簡訊王不接受國外IP
            $p = array(
                'vrname' => $GLOBALS['vrname'],
                'vrcode' => $GLOBALS['vrcode'],
                'x' => $x,
                'y' => $y,
                'z' => $z,
            );
            $url = 'http://demo.axcell28.idv.tw/kotsms.php';
            $tuCurl = curl_init(); 
            curl_setopt($tuCurl,CURLOPT_URL,$url);
            curl_setopt($tuCurl,CURLOPT_RETURNTRANSFER,true);
            curl_setopt($tuCurl,CURLOPT_POSTFIELDS, http_build_query($p));
            $temp = curl_exec($tuCurl);
            curl_close($tuCurl);
            return $temp;
	}
	function getgurl($x){
		global $conf;
		//$out['longUrl']=$x;
		//return curl_getjson("https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAFu01-f8QT5iDB4BBxdsgalbLcunnHz0k",json_encode($out));
		//return curl_getjson("https://www.googleapis.com/urlshortener/v1/url?key=".$conf['google_key'],$x);
		//20190328 Pman 因為google短網址服務停用，所以改用http://tinyurl.com/的服務
		$id=file_get_contents("https://tinyurl.com/api-create.php?url=".$x);
		return json_encode(array('id' => $id));
	}
	
	function get_maxQAn($x){
		$out="";
		global $conf;
		$out[0]=$conf['maxQA']; //20190329 Pman 輸出config的maxQA設定值
		echo json_encode($out);
	}
	
	//		###		共用功能 END 		###		//
?>

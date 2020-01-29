<?php
	//show match 的 送出數和受邀請數
	function get_match_count($x){
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);	
			$out[0]="OK";
			$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=0");//我送出的
			$out[1]=$temp[0]['cc'];
			$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//別人送來的
			$out[2]=$temp[0]['cc'];				
			$pdod=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}
	//顯是一個交友邀請
	function show_matchone($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$eeeee=share_getinfo($pdom,"mem_","memberid",$x[2]);
			$out[1]=unsetmem($eeeee);

			$out[1]['uid']=$out[1]['memberid'];
			$temp=share_gettable($pdod,"friend_ WHERE (friendid='".$_SESSION['userid']."' AND memberid='".$x[2]."') OR (memberid='".$_SESSION['userid']."' AND friendid='".$x[2]."')")[0];
			$out[1]['addtext']=$temp['addtext'];
			$pdom=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}
	//顯是好友列表
	function get_friendlist($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$temp=share_gettable($pdom,"mem_ WHERE (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'  AND ispass=1))"); 
			if($temp){
				for($a=0;$a<count($temp);$a++){
					$out[1][$a]=unsetmem($temp[$a]);
					$out[1][$a]['uid']=$temp[$a]['memberid'];

				}
			}else{
				$out[1]="";
			}
			$pdom=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}
	//get_match_system系統推鑑名單
	function get_match_system($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out="";
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);	
			$me=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
			$ttt="";
			for($a=1;$a<=3;$a++){
				if($me['game'.$a] && $me['game'.$a."_v"]==1){
					for($b=1;$b<=3;$b++){
						if($ttt){
							$ttt=$ttt." OR game".$b."=".$me['game'.$a];
						}else{
							$ttt="game".$b."=".$me['game'.$a];
						}
					}
				}
			}
			$temp=[];
			$tempb=[];
			if($x[2]){//繼續抓
				if($ttt){
					$ttt="WHERE (".$ttt.") AND memberid>".$x[2];
				}else{
					$ttt="WHERE memberid>".$x[2];
				}
				$temp=share_gettable($pdom,"mem_ ".$ttt." AND (memberid NOT in (SELECT friendid from ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'))  AND (memberid NOT in (SELECT memberid from ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."')) AND memberid<>'".$_SESSION['userid']."' order by memberid limit 5");
			}else{//開始抓
				if($ttt){
					$ttt="WHERE (".$ttt.")";
				}
				$temp=share_gettable($pdom,"mem_ ".$ttt." AND (memberid NOT in (SELECT friendid from ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'))  AND (memberid NOT in (SELECT memberid from ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."')) AND memberid<>'".$_SESSION['userid']."' order by memberid limit 5");
			}
			for($a=0;$a<count($temp);$a++){
				$tempb[$a]=unsetmem($temp[$a]);
				$tempb[$a]['uid']=$temp[$a]['memberid'];

			}
			if(count($temp)>0){
				$out[0]="OK";
				$out[1]=$tempb;
			}else{
				$out[0]="ERR";
				$out[1]="無配對資料";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}	
	//get_match_request 使用者選擇的
	function get_match_request($x){
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);	
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);	
			$ttt="";
			if($x[2]){
				for($a=0;$a<count($x[2]);$a++){
					for($b=1;$b<=3;$b++){
						if($ttt){
							$ttt=$ttt." OR (game".$b."=".$x[2][$a]['gameid']." AND game".$b."_v=1)";
						}else{
							$ttt="(game".$b."=".$x[2][$a]['gameid']." AND game".$b."_v=1)";
						}
					}
				}
			}
			if($x[3]){
				if($ttt){
					$ttt="(".$ttt.") AND (location='".$x[3]."' AND location_v=1)";
				}else{
					$ttt="(location='".$x[3]."' AND location_v=1)";
				}
			}
			if($x[4]){
				if($ttt){
					$ttt="(".$ttt.") AND (gtid='".$x[4]."' AND gt_v=1)";
				}else{
					$ttt="(gtid='".$x[4]."' AND gt_v=1)";
				}
			}			
			$temp=[];
			$tempb=[];
			$temp=share_gettable($pdom,"mem_ WHERE (".$ttt.") AND (memberid NOT in (SELECT friendid as memberid from ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'))  AND (memberid NOT in (SELECT memberid from ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."')) AND memberid<>'".$_SESSION['userid']."' order by memberid limit 5");
			for($a=0;$a<count($temp);$a++){
				$tempb[$a]=unsetmem($temp[$a]);
				$tempb[$a]['uid']=$temp[$a]['memberid'];
			
			}
			if(count($temp)>0){
				$out[0]="OK";
				$out[1]=$tempb;
			}else{
				$out[0]="ERR";
				$out[1]="目前無資料";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}
	//get_match_send 我寄出去的邀請
	function get_match_send($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out="";
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);	
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);	
			$me=share_gettable($pdod,"friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=0");//我送出的
			$temp=[];
			$tempb=[];
			if(count($me)>0){
				for($a=0;$a<count($me);$a++){
					$temp=share_getinfo($pdom,"mem_","memberid",$me[$a]['friendid']);
					$tempb[$a]=unsetmem($temp);
					$tempb[$a]['uid']=$temp['memberid'];
				
				}
			}
			if(count($me)>0){
				$out[0]="OK";
				$out[1]=$tempb;
			}else{
				$out[0]="ERR";
				$out[1]="目前無資料";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}	
	//get_match_send 我寄出去的邀請
	function get_match_receive($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out="";
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);	
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);	
			$me=share_gettable($pdod,"friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//我送出的
			$temp=[];
			$tempb=[];
			if(count($me)>0){
				for($a=0;$a<count($me);$a++){
					$temp=share_getinfo($pdom,"mem_","memberid",$me[$a]['memberid']);
					$tempb[$a]=unsetmem($temp);
					$tempb[$a]['uid']=$temp['memberid'];
					$tempb[$a]['addtext']=$me[$a]['addtext'];


				}
			}
			$out[0]="ERR";
			if(count($me)>0){
				$out[0]="OK";
				$out[1]=$tempb;
			}else{
				$out[0]="ERR";
				$out[1]="目前無資料";
			}
		
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);	
	}		
	//addfriends 送出申請 加朋友--或取消
	function addfriends($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out=array();
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);	
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);	
			if($x[2]=="delete"){	//移除邀請
				if($me=share_del($pdod,"friend_ WHERE friendid='".$x[3]."' AND memberid='".$_SESSION['userid']."'")){
					$out[0]="OK6";
					$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=0");//我送出的
					$out[1]=$temp[0]['cc'];
					$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//別人送來的
					$out[2]=$temp[0]['cc'];		
				}else{
					$out[0]="ERR";
					$out[1]="取消錯誤";
				}
			}else if($x[2]=="addtext"){	//增加邀請
				if($temp=share_gettable($pdod,"friend_ WHERE memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."' AND ispass=2")){//關係已存在..對方已封鎖
						$out[0]="ERR";
						$out[1]="此會員無法邀請！";		
						$out[2]="CLOSE";
				}else if($temp=share_gettable($pdod,"friend_ WHERE memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."' AND ispass=3")){//關係已存在..對方已封鎖
						$out[0]="ERR";
						$out[1]="此會員無法邀請！";	
						$out[2]="CLOSE";
				}else if($temp=share_gettable($pdod,"friend_ WHERE ispass>1 AND memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."'")){//當初是我拒絕對方的,現在馬上可以加回來
						$me=share_update($pdod,"friend_","ispass=1","memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."'");
						$out[0]="ERR";
						$out[1]="你們已恢復朋友關係！";
						$out[2]="CLOSE";
				}else if($temp=share_gettable($pdod,"friend_ WHERE ispass>1 AND memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'")){//當初是我拒絕對方的,現在馬上可以加回來
						$me=share_update($pdod,"friend_","ispass=1","memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'");
						$out[0]="ERR";
						$out[1]="你們已恢復朋友關係！";
						$out[2]="CLOSE";
				}else if($temp=share_gettable($pdod,"friend_ WHERE memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."' AND ispass=0")){//已經在等對方了
						$out[0]="ERR";
						//$out[1]="邀約等待中，請耐心等候回復！";
						$out[1]="好友邀請已送出";//20190904 Pman 客戶要求修改
						$out[2]="CLOSE";
				}else if($temp=share_gettable($pdod,"friend_ WHERE (memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."') OR (memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."') ")){//怪怪的
						$out[0]="ERR";
						$out[1]="請耐心等候！";
						$out[2]="CLOSE";						
				}else{
					if($me=share_insert($pdod,"friend_","memberid,friendid,addtext","'".$_SESSION['userid']."','".$x[3]."','".$x[4]."'")){
						$out[0]="OK";
						$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=0");//我送出的
						$out[1]=$temp[0]['cc'];
						$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//別人送來的
						$out[2]=$temp[0]['cc'];	
					}else{
						$out[0]="ERR";
						$out[1]="取消錯誤";
					}
				}
			}else if($x[2]=="add"){	//增加邀請---這個應該沒用了...被  addtext取代
				if($temp=share_gettable($pdod,"friend_ WHERE memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'")){
						share_update($pdod,"friend_","ispass=1","memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'");

						$out[0]="OK2";
						$out[1]="你們現在已經是朋友了,謝謝";
						$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=0");//我送出的
						$out[2]=$temp[0]['cc'];
						$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//別人送來的
						$out[3]=$temp[0]['cc'];	
				}else if($temp=share_gettable($pdod,"friend_ WHERE memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."'")){
						$out[0]="ERR";
						$out[1]="已在朋友名單";
				}else{
					if($me=share_insert($pdod,"friend_","memberid,friendid","'".$_SESSION['userid']."','".$x[3]."'")){
						$out[0]="OK";
						$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=0");//我送出的
						$out[1]=$temp[0]['cc'];
						$temp=share_getfree($pdod,"SELECT count(*) as cc FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//別人送來的
						$out[2]=$temp[0]['cc'];	
					}else{
						$out[0]="ERR";
						$out[1]="取消錯誤";
					}
				}
			}else if($x[2]=="add2"){	//同意邀請
				$temp=share_gettable($pdod,"friend_ WHERE memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'");
				if($temp && $temp[0]['ispass']==0){
					if($me=share_update($pdod,"friend_","ispass=1","memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'")){
						//送出notice
						$mex=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
						$sender=share_getinfo($pdom,"mem_","memberid",$x[3]);
						share_insert($pdod,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$x[3]."','".$_SESSION['userid']."',3,'".$mex['nickname']."和你已經成為朋友了',''");
						
						if($sender['fcmid']){  //20181225 Pman 確認同意邀請時，送一個推播給發出邀請的人
							sendfcm($sender['fcmid'],"交友邀請同意",$mex['nickname']."和你已經成為朋友了","",$sender['note_count']+1,$sender['mobtype']);  //20190220 Pman 新增"mobtype"參數
						}
						
						$out[0]="OK4";
						//加點
						$tt=get_point('12');
						if($_SESSION['isver']=="1"){
							add_point($_SESSION['userid'],$tt,'005',"互為好友");
						}
						//檢查對方
						//
						$ff=share_getinfo($pdom,"mem_","memberid",$x[3]);
						if($ff['isver']==1){
							add_point($x[3],$tt,'005',"互為好友");
						}
					}else{
						$out[0]="ERR";
						$out[1]="同意錯誤";
					}
				}else{
					$out[0]="ERR";
					$out[1]="同意錯誤";
				}
			
			}else if($x[2]=="reject"){	//拒絕邀請
				if($me=share_update($pdod,"friend_","ispass=2","memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'")){
					$out[0]="OK3";
				}else{
					$out[0]="ERR";
					$out[1]="拒絕錯誤";
				}			
			}else if($x[2]=="cancel"){	//解除朋友
				if($temp=share_gettable($pdod,"friend_ WHERE memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'")){//當初是對方邀請的是對方那就封鎖--設定為 2
					if($me=share_update($pdod,"friend_","ispass=2","memberid='".$x[3]."' AND friendid='".$_SESSION['userid']."'")){
						$out[0]="OK5";
					}else{
						$out[0]="ERR";
						$out[1]="取消錯誤";
					}	
				}else{//當初是自己邀請的自己..那就刪除..(未來還可以邀請)...為了怕洗點..改設為  3
					if($me=share_update($pdod,"friend_","ispass=3","memberid='".$_SESSION['userid']."' AND friendid='".$x[3]."'")){
					//if($me=share_del($pdod,"friend_ WHERE friendid='".$x[3]."' AND memberid='".$_SESSION['userid']."'")){
						$out[0]="OK5";
					}else{
						$out[0]="ERR";
						$out[1]="取消錯誤";
					}							
				}
			}
		
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		if($out[0]=="OK"){ //20181224 Pman 成功發出交友邀請時，發出一則交友邀請通知推播
			$me=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
			$conout=$me['nickname']."向你發出交友邀請";
			$temp=share_getinfo($pdom,"mem_","memberid",$x[3]);
			if($temp['fcmid']){
				sendfcm($temp['fcmid'],"交友邀請",$conout,"",$temp['note_count']+1,$temp['mobtype']); //20181224 Pman 發出交友邀請推播時，更新badge數量 //20190220 Pman 新增"mobtype"參數
			}
		}
		echo json_encode($out);			
	}


?>

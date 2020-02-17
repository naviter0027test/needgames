<?php

	function chat_main($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			//按下朋友名字跳出room
			if($x[2]=="chkroom"){
				if($res=chat_chk_room($x[0],$x[3])){//有room
						$out[0]="OK";
						$out[1]=$res;		//回復roomid
				}else{//開新的
					//先清理
					chat_del_old_room();
					chat_del_old_usr();
					$rid=chat_create_room();
					if($rid){//建立聊天室
						chat_create_user($rid,$x[0]);
						chat_create_user($rid,$x[3]);
						$out[0]="OK";
						$out[1]=$rid;		//回復roomid
					}else{
						$out[0]="ERR";
						$out[1]="程式錯誤,請稍後再試試";
					}
				}
			}
			else if($x[2]=="getroominfo"){//剛開始進入chatroom顯示資料
				$out[0]="OK";
				$out[1]=chat_room_info($x[3]);
				$temp=chat_read_conorg($x[3],$x[0]);
				$out[2]=$temp[0];
				$out[3]=$temp[1];
			}
			else if($x[2]=="savechat"){//儲存chat
				//先清理
				chat_del_old_con();
				$out[0]="OK";
				$ttp="";
				if(strpos($x[4],"X{img}")>0){//有圖
					$ttp="<img src=\"img/chat/".explode("{img}", $x[4])[1].".png\">\n";
				}else if(strpos($x[4],"X{img2}")>0){//有圖
					$ttp="<img src=\"uploadfile/".explode("{img2}", $x[4])[1]."\">\n";
				}else{
					$ttp=$x[4];
				}
				if(chat_save_con($x[3],$_SESSION['userid'],$ttp)){
					$out[0]="OK";
					$out[1]=chat_read_con($x[3],$x[0]);
				}else{
					$out[0]="ERR";
					$out[1]="儲存錯誤";
				}
			}
			//清掉通知
			else if($x[2]=="cleanchatnote"){
				cleanchatnote($x[3]);
			}
			//讀取新的chat
			else if($x[2]=="readnewchat"){
				$out[0]="OK";
				$out[1]=chat_read_con($x[3],$_SESSION['userid']);
				$out[2]=chat_read_name($x[3],$_SESSION['userid']);
			}
			//邀請朋友
			else if($x[2]=="invite"){
				if(chat_chk_room2($x[3])){//檢查聊天室
					if(chat_chk_room3($x[3],$x[4])){//檢查是否已經存在
						$out[0]="ERR";
						$out[1]="此人已在本聊天室內,無法再邀請";
					}else{
						chat_create_user($x[3],$x[4]);//建立使用者
						chat_create_note($x[3],$_SESSION['userid'],$x[4],1);//發出通知
						//發訊息進現有所有人
						chat_tell_all($x[3],$x[4],1);
						$out[0]="OK";
					}
				}else{
					$out[0]="ERR";
					$out[1]="聊天室已不存在,請關閉這個聊天室後重新開啟,謝謝";
				}

			}
			else if($x[2]=="chkroomext"){//popchat  click
				if(chat_chk_room2($x[3])){//檢查聊天室
					$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
					$pdoc -> exec("set names ".$conf['db_encode']);
					$cnt=share_getcount($pdoc,"usr_ WHERE roomid='".$x[3]."'");
					if($cnt>2){//多人房..給訊息
						chat_tell_all($x[3],$_SESSION['userid'],3);
					}
					$out[0]="OK";
					$pdoc=null;
				}else{
					$out[0]="ERR";
					$out[1]="本聊天室已關閉,謝謝";
				}
			}
			else if($x[2]=="extroom"){
				if(chat_chk_room2($x[3])){//檢查聊天室
					$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
					$pdoc -> exec("set names ".$conf['db_encode']);
					//清除舊note
					share_del($pdoc,"rnot_ WHERE roomid='".$x[3]."' AND memberid='".$_SESSION['userid']."'");
					$cnt=share_getcount($pdoc,"usr_ WHERE roomid='".$x[3]."'");
					if($cnt>2){//多人房..給訊息
						chat_tell_all($x[3],$_SESSION['userid'],2);
						$names=chat_read_name($x[3],$_SESSION['userid']);
						share_insert($pdoc,"rnot_","roomid,fromid,memberid,thiscontent","'".$x[3]."','0','".$_SESSION['userid']."','您可以由此回到".$names."之共同聊天室'");
					}else{
						$out[0]="OK";
					}
					$pdoc=null;
				}else{
					$out[0]="ERR";
					$out[1]="本聊天室已關閉,謝謝";
				}
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	// ########## UPDATE CHAT #####################
	function upchatroomtype2($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
			$pdoc -> exec("set names ".$conf['db_encode']);
			share_update($pdoc,"usr_","dont='2'","roomid='".$x[3]."' AND memberid='".$_SESSION['userid']."'");
			$pdoc=null;
			$out[0]="OK";
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}

	function upchatroomtype($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
			$pdoc -> exec("set names ".$conf['db_encode']);
			if($x[2]=="out"){
				share_del($pdoc,"usr_ WHERE roomid='".$x[3]."' AND memberid='".$_SESSION['userid']."'");
				$gr=share_gettable($pdoc,"usr_ WHERE roomid='".$x[3]."'");
				if($gr<=1){//只剩一人了...刪除
					share_del($pdoc,"rnot_ WHERE roomid='".$x[3]."'");
					share_del($pdoc,"con_ WHERE roomid='".$x[3]."'");
					share_del($pdoc,"usr_ WHERE roomid='".$x[3]."'");
					share_del($pdoc,"roo_ WHERE roomid='".$x[3]."'");
				}
			}else if($x[2]=="close"){
				share_update($pdoc,"usr_","dont='1'","roomid='".$x[3]."' AND memberid='".$_SESSION['userid']."'");
			}else if($x[2]=="open"){
				share_update($pdoc,"usr_","dont='0'","roomid='".$x[3]."' AND memberid='".$_SESSION['userid']."'");
			}
			$pdoc=null;
			$out[0]="OK";
		}else{
			$out[0]="ERR";
			//$out[1]="認證錯誤";
		}
		echo json_encode($out);
	}
	//######### 刪 除 ##########
	function chat_del_old_con(){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		share_del($pdoc,"con_ WHERE timekey<".(time()-86400*$conf['chmaxdays'])." OR roomid not in (SELECT roomid FROM roo_)");
		$pdoc=null;
	}
	function chat_del_old_room(){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		//刪除舊的
		share_del($pdoc,"rnot_ WHERE roomid NOT IN (select roomid FROM con_ )");
		share_del($pdoc,"roo_ WHERE timekey<".(time()-60)." AND roomid NOT IN (select roomid FROM con_ )");
		//刪除相關的通知

		//刪除3人以上全離開的
		share_del($pdoc,"rnot_ WHERE roomid IN (SELECT roomid FROM roo_ WHERE timekey<".(time()-86400)." AND roomid  IN (SELECT roomid FROM usr_ group by roomid having count(*)>2 ))");
		share_del($pdoc,"roo_ WHERE timekey<".(time()-86400)." AND roomid  IN (SELECT roomid FROM usr_ group by roomid having count(*)>2 )");
		$pdoc=null;
	}
	function chat_del_old_usr(){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		//刪除舊的
		share_del($pdoc,"usr_ WHERE roomid NOT IN (select roomid FROM roo_)");
		$pdoc=null;
	}
	//更新 chatnote to viewed
	function cleanchatnote($x){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		//刪除舊的
		share_update($pdoc,"rnot_","viewed='1'","memberid='".$_SESSION['userid']."' AND roomid='".$x."'");
		$pdoc=null;
	}
	// ### 建立 room
	//檢查是否已有建立room(兩人)
	function chat_chk_room($x,$y){//使用者 1,對象
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		if($t=share_gettable($pdoc,"usr_ WHERE memberid='".$x."' AND roomid in (SELECT roomid FROM usr_ WHERE memberid='".$y."') AND roomid in (SELECT roomid FROM usr_ group by roomid having count(*)=2 )")){
			return $t[0]['roomid'];
		}else{
			return false;
		}
		$pdoc=null;
	}
	//檢查 roomid exist
	function chat_chk_room2($x){// roomid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		if(share_getinfo($pdoc,"roo_","roomid",$x)){
			return true;
		}else{
			return false;
		}
		$pdoc=null;
	}
	//檢查 此人是否已在聊天室建立
	function chat_chk_room3($x,$y){// roomid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		if(share_gettable($pdoc,"usr_ WHERE roomid='".$x."' AND memberid='".$y."'")){
			return true;
		}else{
			return false;
		}
		$pdoc=null;
	}
	//通知已經邀請人
	function chat_tell_all($x,$y,$z){// roomid,被邀請人
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$ps=share_gettable($pdoc,"usr_ WHERE roomid='".$x."' AND memberid<>'".$y."'");
		$temp=share_getinfo($pdom,"mem_","memberid",$y);
		foreach($ps as $p){
			if($z==1){//邀請
				share_insert($pdoc,"con_","roomid,memberid,fromid,name,content,viewed,timekey","'".$x."','".$p['memberid']."','','','已邀請".$temp['nickname']."進入聊天室','2','".time()."'");
			}else if($z==2){//離開
				share_insert($pdoc,"con_","roomid,memberid,fromid,name,content,viewed,timekey","'".$x."','".$p['memberid']."','','','".$temp['nickname']."已離開聊天室','2','".time()."'");
			}else if($z==3){//進入
				share_insert($pdoc,"con_","roomid,memberid,fromid,name,content,viewed,timekey","'".$x."','".$p['memberid']."','','','".$temp['nickname']."已進入聊天室','2','".time()."'");
			}
		}
		$pdom=null;
		$pdoc=null;
	}
	//建立 room
	function chat_create_room(){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$xx=time();
		if(share_insert($pdoc,"roo_","timekey","'".$xx."'")){
			$t=share_getinfo($pdoc,"roo_","timekey",$xx);
			return $t['roomid'];
		}else{
			return false;
		}
		$pdoc=null;
	}
	//建立 user
	function chat_create_user($x,$y){//roomid,memberid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		//刪除舊的
		share_insert($pdoc,"usr_","roomid,memberid","'".$x."','".$y."'");
		$pdoc=null;
	}
	//再聊天室內加入新人
	function chat_room_adduser($r){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$newf=share_getinfo($pdom,"mem_","memberid",$r[3]);
		//房間加入新人
		share_insert($pdoc,"usr_","roomid,memberid","'".$r[2]."','".$r[3]."'");
		//通知其他人
		chat_tell_all($r[2],$r[3],1);
		//通知新人
		chat_create_note($r[2],$_SESSION['userid'],$r[3],1);
		//加入內容
		//chat_save_con($r[2],0,"歡迎".$newf['nickname']."加入聊天室");
		$out="";
		$out[0]="OK";

		$pdod=null;
		$pdom=null;
		$pdoc=null;
		echo json_encode($out);
	}
	//取得room 以外朋友資料
	function chat_room_adduserlist($r){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
	//	$ta=share_gettable($pdoc,"usr_ WHERE roomid='".$r[2]."'");//所有在房間的人
		$out="";
		$out[0]="OK";
		$temp=share_gettable($pdom,"mem_ WHERE memberid not in (SELECT memberid FROM ".$conf['dbname_c'].".usr_ WHERE roomid='".$r[2]."' ) AND ((memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'  AND ispass=1)))");
		if($temp){
			for($a=0;$a<count($temp);$a++){
				$out[1][$a]=unsetmem($temp[$a]);
				$out[1][$a]['uid']=$temp[$a]['memberid'];
			}
		}else{
			$out[1]="";
		}
		$pdod=null;
		$pdom=null;
		$pdoc=null;
		echo json_encode($out);
	}
	//取得room 使用者列表
	function chat_room_userinfo($r){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$ta=share_gettable($pdoc,"usr_ WHERE roomid='".$r[2]."' AND memberid<>'".$_SESSION['userid']."'");
		$out="";
		$out[0]="OK";
		for($a=0;$a<count($ta);$a++){
			$tb=$ta[$a];
			$temp=share_getinfo($pdom,"mem_","memberid",$tb['memberid']);
			$out[1][$a]['memberid']=$temp['memberid'];
			$out[1][$a]['name']=$temp['nickname'];
			$out[1][$a]['score']=$temp['score'];
			$out[1][$a]['headpic']=$temp['headpic'];
			$out[1][$a]['rank_v']=$temp['rank_v'];
			$out[1][$a]['level_v']=$temp['level_v'];
			$out[1][$a]['id']=$temp['memberid'];
			if($tf=share_gettable($pdod,"friend_ WHERE (friendid='".$_SESSION['userid']."' AND memberid='".$tb['memberid']."') OR (memberid='".$_SESSION['userid']."' AND friendid='".$tb['memberid']."')")){
				if($tf[0]['ispass']==1){
					$out[1][$a]['isfriend']=1;
				}else{
					$out[1][$a]['isfriend']=0;//尚不是朋友
				}
			}else{
				$out[1][$a]['isfriend']=2;//可加朋友
			}
		}
		//$out[1][0]=count($ta);
		$pdod=null;
		$pdom=null;
		$pdoc=null;
		echo json_encode($out);
	}
	//取得room資料
	function chat_room_info($r){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$ta=share_gettable($pdoc,"usr_ WHERE roomid='".$r."'");
		$out="";
		$a=0;
		foreach($ta as $tb){
			$temp=share_getinfo($pdom,"mem_","memberid",$tb['memberid']);
			$out[$a]['memberid']=$temp['memberid'];
			$out[$a]['name']=$temp['nickname'];
			$a++;
		}
		$pdom=null;
		$pdoc=null;
		return $out;
	}
	//儲存內如
	function chat_save_con($x,$y,$con){//roomid,memberid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$temp=share_getinfo($pdom,"mem_","memberid",$y);
		$pdom=null;
		//將 dont=2 變 0
		share_update($pdoc,"usr_","dont='0'","roomid='".$x."' AND dont='2'");
		//取出room中所有人
		if($ta=share_gettable($pdoc,"usr_ WHERE roomid='".$x."'")){
			foreach($ta as $tb){
				share_insert($pdoc,"con_","roomid,memberid,fromid,name,content,viewed,timekey","'".$x."','".$tb['memberid']."','".$y."','".$temp['headpic']."','".$con."','0','".time()."'");
			}
			return true;
		}else{
			return false;
		}
		$pdoc=null;

	}
	//讀取內容開始
	function chat_read_conorg($x,$y){//roomid,memberid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$tcnt=0;
		$tcnt=share_getcount($pdoc,"con_ where memberid='".$y."' AND roomid='".$x."' AND (viewed=0 or viewed=2)");//尚未讀取數
		$temp=share_gettable($pdoc,"con_ WHERE roomid='".$x."' AND memberid='".$y."' AND ((viewed=1  AND timekey>".(time()-25920000).") OR viewed=0 OR viewed=2) order by thisid"); //20190426 Pman 改成顯示過去300天的聊天訊息
		share_update($pdoc,"con_","viewed=1","roomid='".$x."' AND memberid='".$y."'");
		share_update($pdoc,"roo_","timekey='".time()."'","roomid='".$x."'");
		$xo[0]=$temp;
		$xo[1]=0;
		if($tcnt>0){//表示之前有未讀
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$tx=share_getinfo($pdom,"mem_","memberid",$y);
			$pdom=null;
			if($tx['fcmid']){
				$tcnt=share_getcount($pdoc,"con_ where memberid='".$y."' AND (viewed=0 or viewed=2)");//抓取剩下未讀--其他房
				$tcnt=$tcnt+$tx['note_count'];
				/*
				if(fcmupdatebadge($tx['fcmid'],$tcnt)){
					return $xo;
				}else{
					return $xo;
				}
				*/
				//fcmupdatebadge($tx['fcmid'],$tcnt);//android用
				$xo[1]=$tcnt;
				return $xo;
			}else{
				return $xo;
			}
		}else{
			return $xo;
		}
		/*
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$tx=share_getinfo($pdom,"mem_","memberid",$y);
		$pdom=null;
		if($tx['fcmid']){
			$tcnt=share_getcount($pdoc,"con_ where memberid='".$y."' AND (viewed=0 or viewed=2)");//抓取剩下未讀--其他房
			if(fcmupdatebadge($tx['fcmid'],666)){
				return $temp;
			}else{
				return $temp;
			}
		}else{
			return $temp;
		}
*/
		$pdoc=null;
	}

	//讀取內容
	function chat_read_con($x,$y){//roomid,memberid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		if($t=share_gettable($pdoc,"con_ WHERE (viewed=0 OR viewed=2) AND roomid='".$x."' AND memberid='".$y."' order by thisid")){
		//	$tcnt=count($t);//尚未讀取數
			share_update($pdoc,"roo_","timekey='".time()."'","roomid='".$x."'");
			share_update($pdoc,"con_","viewed=1","roomid='".$x."' AND memberid='".$y."'");//0428更新
/*
			//新讀不需要送
			if($tcnt>0){//表示之前有未讀
				$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdom -> exec("set names ".$conf['db_encode']);
				$tx=share_getinfo($pdom,"mem_","memberid",$y);
				$pdom=null;
				if($tx['fcmid']){
					$tcnt=share_getcount($pdoc,"con_ where memberid='".$y."' AND (viewed=0 or viewed=2)");//抓取剩下未讀--其他房
					fcmupdatebadge($tx['fcmid'],$tcnt);
				}
			}
*/
			return $t;//回復 抓取資料
		}else{
			share_update($pdoc,"roo_","timekey='".time()."'","roomid='".$x."'");
			return false;
		}
		$pdoc=null;
	}
	//讀取名字
	function chat_read_name($x,$y){//roomid,memberid
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$temp="";
		if($t=share_gettable($pdoc,"usr_ WHERE roomid='".$x."' AND memberid<>'".$y."'")){
			foreach($t as $tb){
				$tx=share_getinfo($pdom,"mem_","memberid",$tb['memberid']);
				if($temp){
					$temp.=",<p class='pageclick' data-type='mypage' data-val='1' data-id='".$tx['memberid']."'>".$tx['nickname']."</p>";
				}else{
					$temp="<p class='pageclick' data-type='mypage' data-val='1' data-id='".$tx['memberid']."'>".$tx['nickname']."</p>";
				}
			}
		}
		return $temp;
		$pdom=null;
		$pdoc=null;
	}
	//檢查是否需要通知有訊息
	function chat_chk_note(){
		global $conf;
		if($_SESSION['userid']){
			chat_chk_msg();
			$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
			$pdoc -> exec("set names ".$conf['db_encode']);
			$ta=share_getfree($pdoc,"SELECT distinct roomid FROM con_ WHERE viewed='0' AND memberid='".$_SESSION['userid']."' AND timekey<".(time()-20));
			if($ta){
				foreach($ta as $tb){
					$cr=share_gettable($pdoc,"usr_ WHERE memberid='".$_SESSION['userid']."' AND roomid='".$tb['roomid']."'");
					if($cr[0]['dont']==1){
					}else{
						$temp=share_gettable($pdoc,"con_ WHERE viewed='0' AND memberid='".$_SESSION['userid']."' AND roomid='".$tb['roomid']."' AND timekey<".(time()-20)."  order by thisid limit 1");
						if($ttt=share_getfree($pdoc,"rnot_ WHERE roomid='".$temp[0]['roomid']."' AND fromid='".$_SESSION['userid']."'")){//自己發的
						}else{
							chat_create_note($temp[0]['roomid'],$temp[0]['fromid'],$temp[0]['memberid'],2);//發出通知
						}
					}
				}
			}
			share_update($pdoc,"con_","viewed='2'","viewed='0' AND memberid='".$_SESSION['userid']."' AND timekey<".(time()-50));
			$pdoc=null;
		}

	}
	//發出msg..所有我發出的言論
	function chat_chk_msg(){
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		$ta=share_getfree($pdoc,"SELECT memberid ,roomid FROM con_ WHERE fcmed='0' AND fromid='".$_SESSION['userid']."' AND memberid<>'".$_SESSION['userid']."'  AND timekey<".(time()-20)." group by roomid");
		if($ta){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$me=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
			$conout=$me['nickname']."向你傳遞了訊息";
			foreach($ta as $tb){
				$tcnt=share_getcount($pdoc,"con_ where memberid='".$tb['memberid']."' AND (viewed=0 OR viewed=2)");//尚未讀取數
				$temp=share_getinfo($pdom,"mem_","memberid",$tb['memberid']);
				if($temp['fcmid']){
					sendfcm($temp['fcmid'],"聊天室訊息",$conout,$tb['roomid'],$temp['note_count']+$tcnt,$temp['mobtype']); //20181224 Pman 調整送出推播時，所送出badge總數
				//	fcmupdatebadge($temp['fcmid'],$temp['note_count']+$tcnt);//android用
				}
			}
			$pdom=null;
			$ta=share_update($pdoc,"con_","fcmed='1'","fromid='".$_SESSION['userid']."' AND memberid<>'".$_SESSION['userid']."' AND timekey<".(time()-10));
		}
		$pdoc=null;
	}
	//發出通知
	function chat_create_note($r,$x,$y,$con){//討論室id,由誰,發給誰, 內容類別
		global $conf;
		$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
		$pdoc -> exec("set names ".$conf['db_encode']);
		if($con==1){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$conout="";
			$ta=share_gettable($pdoc,"usr_ WHERE roomid='".$r."' AND memberid<>'".$y."'");
			foreach($ta as $tb){
				$temp=share_getinfo($pdom,"mem_","memberid",$tb['memberid']);
				if($conout){
					$conout.=",".$temp['nickname'];
				}else{
					$conout=$temp['nickname'];
				}
			}
			//$conout.="邀請你加入聊天室";
			$pdom=null;
		}else if($con==2){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$conout="";
			$temp=share_getinfo($pdom,"mem_","memberid",$x);
			$conout=$temp['nickname'];
			//$conout.="向你傳遞了訊息";
			$pdom=null;
		}
		if($t=share_gettable($pdoc,"rnot_ WHERE roomid='".$r."' AND viewed=0 AND memberid='".$y."'")){//還有沒有看過得
			if($t[0]['fromid']==$x){//同一人
				return true;
			}else{
				if($con==1){
					$conout.="邀請你加入聊天室";
				}else if($con==2){
					$conout.="等人向你傳遞了訊息";
				}
		//		share_update($pdoc,"usr_","dont='0'","roomid='".$r."' AND dont='2'");
				return share_update($pdoc,"rnot_","thiscontent='".$conout."'","roomid='".$r."' AND memberid='".$y."'");
			}
		}else{
			if($con==1){
				$conout.="邀請你加入聊天室";
			}else if($con==2){
				$conout.="向你傳遞了訊息";
			}
		//	share_update($pdoc,"usr_","dont='0'","roomid='".$r."' AND dont='2'");
			return share_insert($pdoc,"rnot_","roomid,fromid,memberid,thiscontent","'".$r."','".$x."','".$y."','".$conout."'");

		}
		$pdoc=null;
	}

?>

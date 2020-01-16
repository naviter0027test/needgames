<?php
	// QNA
	function uploadqna($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key'] && $x[2]<>"" && $x[3]<>""){//確認資格
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			//檢查點數
			$p=chk_points($_SESSION['userid']);
			if($p<$x[6]){
				$out[0]="ERR";
				$out[1]="目前貢獻值不足,無法扣貢獻值,請調整貢獻值額後再試";//20190107 Pman 將「點」==>「貢獻值」
			}else if($conf['maxQA']<$x[6]){
				$out[0]="ERR";
				$out[1]="懸賞貢獻值需要小於或等於 ".$conf['maxQA'];//20190329 Pman 新增判斷貢獻值是否大於最高上限
			}else if($_SESSION['isver']==1){
				//分辨是影片/圖片/相簿/一班文章 1=圖片,2=影片,3=相簿
				if($x[4] && $x[5]=="1"){//圖片
					$temp=share_gettable($pdo,"phoq_ WHERE albid='".$x[4]."'");
					$tout="";
					foreach($temp as $t){
						$tout.="<img src=uploadfile/".$t['thisfile']." class=\"qnapics qnacontent\">"; //20190109 Pman 新增一個class，讓PC版QA圖片呈現時，長寬一致
					}
					if(share_insert($pdo,"qna_","memberid,gamid,thistitle,thiscontent,points,thisfile,timekey","'".$_SESSION['userid']."','".$x[7]."','".$x[2]."','<div class=\"newstextbox\">".share_html($x[3])."</div><div class=\"newsfilebox\">".$tout."</div>','".$x[6]."','".$x[4]."','".time()."'")){
						$t=share_gettable($pdo,"qna_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
						add_point($_SESSION['userid'],"-".$x[6],'014',"發問扣除貢獻值",$t[0]['thisid']);
						$out[0]="OK";
					}else{
						$out[0]="ERR";
						$out[1]="存入錯誤,請重新試試,謝謝";
					}
				}else if($x[4] && $x[5]=="2"){//影片
					if(share_insert($pdo,"qna_","memberid,gamid,thistitle,thiscontent,points,thisfile,timekey","'".$_SESSION['userid']."','".$x[7]."','".$x[2]."','<div class=\"newstextbox\">".share_html($x[3])."</div><div class=\"newsfilebox\"><video width=100% controls id=newstempvideo><source src=uploadfile/".$x[4]." type=video/mp4 ></video></div>','".$x[6]."','".$x[4]."','".time()."'")){
						$t=share_gettable($pdo,"qna_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
						add_point($_SESSION['userid'],"-".$x[6],'014',"發問扣除貢獻值",$t[0]['thisid']);
						$out[0]="OK";
					}else{
						$out[0]="ERR";
						$out[1]="存入錯誤,請重新試試,謝謝";
					}
				}else{//一般文章
					if(share_insert($pdo,"qna_","memberid,gamid,thistitle,thiscontent,points,timekey","'".$_SESSION['userid']."','".$x[7]."','".$x[2]."','<div class=\"newstextbox\">".share_html($x[3])."</div>','".$x[6]."','".time()."'")){
						$t=share_gettable($pdo,"qna_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
						add_point($_SESSION['userid'],"-".$x[6],'014',"發問扣除貢獻值",$t[0]['thisid']);
						$out[0]="OK";
					}else{
						$out[0]="ERR";
						$out[1]="存入錯誤,請重新試試,謝謝";
					}
				}
			}else{
				$out[0]="ERR";
				$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
			}
			$pdo=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		if($out[0]=="OK"){
			/*
			$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
			$pdop -> exec("set names ".$conf['db_encode']);
			if($t=share_getfree($pdop,"SELECT count(*) as cc FROM poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='003' AND dateadd>( NOW() - INTERVAL 1 DAY )")){//已經加過點了
				if($t[0]['cc']==1){
					$tt=get_point('7');
					add_point($_SESSION['userid'],$tt,'003',"每日發文(2)");
				}else if($t[0]['cc']==2){
					$tt=get_point('8');
					add_point($_SESSION['userid'],$tt,'003',"每日發文(3)");
				}else if($t[0]['cc']==0){
				$tt=get_point('6');
				add_point($_SESSION['userid'],$tt,'003',"每日發文(1)");
				}
			}
			*/
		}

		echo json_encode($out);
	}
	function uploadqnain($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			if($_SESSION['isver']==1){
				if($x[2]<>"" && $x[3]<>""&& $x[4]<>""&& $x[5]<>""){
					$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
					$pdo -> exec("set names ".$conf['db_encode']);
					$p=chk_points($_SESSION['userid']);
					$ttt=share_getinfo($pdo,"qna_","thisid",$x[3]);
					//檢查點數
					if(($p+$ttt['points'])<$x[5]){
						$out[0]="ERR";
						$out[1]="剩餘貢獻值不足,請調整懸賞值後再試";
					}else if($conf['maxQA']<$x[5]){
						$out[0]="ERR";
						$out[1]="懸賞貢獻值需要小於或等於 ".$conf['maxQA'];//20190401 Pman 新增判斷貢獻值是否大於最高上限
					}else{
						if($ttt['points']==$x[5]){
						}else{
							add_point($_SESSION['userid'],$ttt['points'],'015',"QA最佳解答修改刪除退貢獻值",$x[3]);//20190107 Pman 將「點」==>「貢獻值」
							add_point($_SESSION['userid'],"-".$x[5],'014',"發問扣除貢獻值",$x[3]);
						}
						$tttb=explode("<div class=\"newsfilebox\">",$ttt['thiscontent'])[1];
						if($tttb){
							$tttb="</div><div class=\"newsfilebox\">".$tttb;
						}else{
							$tttb="</div>";
						}
						if(share_update($pdo,"qna_","thistitle='".$x[4]."',points='".$x[5]."',thiscontent='<div class=\"newstextbox\">".share_html($x[2]).$tttb."'","thisid='".$x[3]."' AND memberid='".$_SESSION['userid']."'")){
							$out[0]="OK";
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤,請重新試試,謝謝";
						}
					}
					$pdo=null;
				}else{
					$out[0]="ERR";
					$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
				}
			}else{
				$out[0]="ERR";
				$out[1]="請注意填寫所有項目";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	function uploadchatroom($x){
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$id=rand(123,987).date('Yndhms').rand(123,987);
			//$t=uploadfilebase($id,448,1,'');
			$t=uploadfilebase($id,600,2,'',$_FILES["val"]);//20180904 Pman 因為上傳至聊天室的橫幅圖，左右都被砍掉，所以將1改成2
			echo $id.".".$t;
		}else{
			echo "ERR";
		}
	}
	// 更新2個月沒有選擇答案的..自選最佳答案  在這裡
	function uploadqnareply($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key'] && $x[2]<>"" && $x[3]<>""){//確認資格
			if($_SESSION['isver']==1){
				$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
				$pdo -> exec("set names ".$conf['db_encode']);
				//更新未選擇-最佳答案--自動選擇
				if($tsel=share_gettable($pdo,"qna_ WHERE dateadd< (NOW()-INTERVAL 60 DAY) AND thisid not in (SELECT contentid FROM qrep_ WHERE winner=1)")){
					foreach($tsel as $tem){
						$tx=share_gettable($pdo,"qrep_ WHERE contentid='".$tem['thisid']."' ORDER BY likes DESC limit 1");
						share_update($pdo,"qrep_","winner=1","thisid='".$tx[0]['thisid']."'");
						add_point($tem['memberid'],"-".$tem['points'],'014',"QA 給予最佳解答",$tem['thisid']);//20180906 Pman 客戶要求修改文字
						add_point($tem['memberid'],$tem['points'],'015',"最佳解答",$tem['thisid']);
					}
				}
				//刪除 old notice
				share_del($pdo,"not_ WHERE dateadd<( CURDATE() - INTERVAL ".$conf['notkeep']." DAY )");
				//分辨是影片/圖片/相簿/一班文章 1=圖片,2=影片,3=相簿
				if($x[5]=="1"){//圖片
					$xxt=share_insert($pdo,"qrep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".share_html($x[3])."</div><div class=\"newsfilebox\"><img src=uploadfile/".$x[4]."></div>','".time()."'");
				}else{//一般文章
					$xxt=share_insert($pdo,"qrep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".share_html($x[3])."</div>','".time()."'");
				}
				if($xxt){
						$t=share_gettable($pdo,"qrep_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
						//設定通知
						$temp1=share_getinfo($pdo,"qna_","thisid",$x[2]);
						$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
						$pdom -> exec("set names ".$conf['db_encode']);
						$me=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);//我
						$he=share_getinfo($pdom,"mem_","memberid",$temp1['memberid']);//發言人
						$sendcontent=""; //20181228 Pman QA被回覆時，發出通知推播
						//通知發言者
						if($temp1['memberid']==$_SESSION['userid']){//這是我自己的發言
						}else{
							if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$temp1['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
								share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人回覆了 你的Q&A'","thisid='".$notlist[0]['thisid']."'");
								$sendcontent=$$me['nickname']."等人回覆了 你的Q&A"; //20181228 Pman QA被回覆時，發出通知推播
								if($he['fcmid']){
									sendfcm($he['fcmid'],"Q&A回覆",$sendcontent,"",$he['note_count']+1,$he['mobtype']); //20181228 Pman QA被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}else{
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$temp1['memberid']."','".$_SESSION['userid']."',2,'".$me['nickname']."回覆了 你的Q&A','".$x[2]."'");
								$sendcontent=$me['nickname']."回覆了 你的Q&A"; //20181228 Pman QA被回覆時，發出通知推播
								if($he['fcmid']){
									sendfcm($he['fcmid'],"Q&A回覆",$sendcontent,"",$he['note_count']+1,$he['mobtype']); //20181228 Pman QA被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}
						}
						//通知其他人
						$temp2=share_getfree($pdo,"SELECT DISTINCT memberid FROM qrep_ WHERE contentid='".$x[2]."' AND memberid<>'".$_SESSION['userid']."' AND memberid<>'".$temp1['memberid']."' ");//找出我以外的所有回覆的人
						foreach($temp2 as $tt){
							if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$tt['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
								share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人也回覆了 ".$he['nickname']."的Q&A","thisid='".$notlist[0]['thisid']."'");
								$sendcontent=$me['nickname']."等人也回覆了 ".$he['nickname']."的Q&A"; //20181228 Pman QA被回覆時，發出通知推播
								$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181228 Pman 針對同一篇有留言的其它人資料
								if($others['fcmid']){
									sendfcm($others['fcmid'],"Q&A回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181228 Pman QA被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}else{
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',2,'".$me['nickname']."也回覆了 ".$he['nickname']."的Q&A','".$x[2]."'");
								$sendcontent=$me['nickname']."等人也回覆了 ".$he['nickname']."的Q&A"; //20181228 Pman QA被回覆時，發出通知推播
								$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181228 Pman 針對同一篇有留言的其它人資料
								if($others['fcmid']){
									sendfcm($others['fcmid'],"Q&A回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181228 Pman QA被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}
							//通知我也想知道的人
							$temp3=share_getfree($pdo,"SELECT DISTINCT memberid FROM qals_ WHERE contentid='".$x[2]."'");//
							foreach($temp3 as $tt){
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',2,'".$me['nickname']."回覆了 ".$he['nickname']."的Q&A','".$x[2]."'");
								$sendcontent=$me['nickname']."回覆了 ".$he['nickname']."的Q&A"; //20181228 Pman QA被回覆時，發出通知推播
								$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181228 Pman 針對同一篇有留言的其它人資料
								if($others['fcmid']){
									sendfcm($others['fcmid'],"Q&A回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181228 Pman QA被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}
						}
						/*
						if($temp1['memberid'] !=$_SESSION['userid']){
							if($tx=share_gettable($pdo,"not_ WHERE memberid='".$temp1['memberid']."' AND thislink='".$x[2]."' AND typeid=2 AND viewed=0")){//看看有沒有回覆過的還沒看
								if($tx['fromid']==$_SESSION['userid']){//最新就是我..不用更新
								}else{//超過一人了...
									share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人回覆了 你的Q&A','");
								}
							}else{
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$temp1['memberid']."','".$_SESSION['userid']."',2,'".$me['nickname']."回覆了 你的Q&A','".$x[2]."'");
							}
						}
						$temp2=share_getfree($pdo,"SELECT DISTINCT memberid FROM qrep_ WHERE contentid='".$x[2]."' AND memberid<>'".$_SESSION['userid']."' ");//找出所有回覆的人
						foreach($temp2 as $tt){
							if($tx=share_gettable($pdo,"not_ WHERE memberid='".$tt['memberid']."' AND thislink='".$x[2]."' AND typeid=2 AND viewed=0")){//看有沒有沒看過的
								share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid='2',thiscontent='".$me['nickname']."等人也回覆了 ".$he['nickname']."的問與答'","thisid='".$tx[0]['thisid']."'");
							}else{//都看過了就加新的
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',2,'".$me['nickname']."回覆了 ".$he['nickname']."的問與答','".$x[2]."'");
							}
						}
						//通知我也想知道的人
						$temp3=share_getfree($pdo,"SELECT DISTINCT memberid FROM qals_ WHERE contentid='".$x[2]."'");//找出所有回覆的人
						foreach($temp3 as $tt){
							share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',2,'".$me['nickname']."回覆了 ".$he['nickname']."的問與答','".$x[2]."'");
						}
						*/
						$out[0]="OK";
				}else{
						$out[0]="ERR";
						$out[1]="存入錯誤,請重新試試,謝謝";
				}
				$pdo=null;
			}else{
				$out[0]="ERR";
				$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//回覆在攻略中
	function uploadartpagereply($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key'] && $x[2]<>""){//確認資格
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$rins="";
			if($x[6]){
				$tempr=share_getinfo($pdom ,"mem_","memberid",$x[6]);//我
				$rins="<span class=\"replytonamebox\">".$tempr['nickname']."</span>";
			}
			//刪除 old notice
			share_del($pdo,"not_ WHERE dateadd<( CURDATE() - INTERVAL ".$conf['notkeep']." DAY )");
			//分辨是影片/圖片/相簿/一班文章 1=圖片,2=影片,3=相簿
			if($x[5]=="1"){//圖片
				$xxt=share_insert($pdo,"rep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".$rins.share_html($x[3])."</div><div class=\"newsfilebox popimgclick newsrimg \" data-type=\"chat\"><img src=uploadfile/".$x[4]."></div>','".time()."'"); //20190307 Pman 修正在攻略內，回文上傳圖片不能點開的問題
			}else{//一般文章
				$xxt=share_insert($pdo,"rep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".$rins.share_html($x[3])."</div>','".time()."'");
			}
			if($xxt){
					$t=share_gettable($pdo,"rep_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
					//設定通知
					$temp1=share_getinfo($pdo,"con_","thisid",$x[2]);
					$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
					$pdom -> exec("set names ".$conf['db_encode']);
					$me=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);//我
					$he=share_getinfo($pdom,"mem_","memberid",$temp1['memberid']);//發言人
					$sendcontent=""; //20181228 Pman 儲存攻略留言時，要推播的訊息
					//通知發言者
					if($temp1['memberid']==$_SESSION['userid']){//這是我自己的發言
					}else{
						if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$temp1['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
							share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人回覆了 你的攻略'","thisid='".$notlist[0]['thisid']."'");
							$sendcontent=$me['nickname']."等人回覆了 你的攻略";

							if($he['fcmid']){
								sendfcm($he['fcmid'],"攻略回覆",$sendcontent,"",$he['note_count']+1,$he['mobtype']); //20181228 Pman 攻略被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
							}
						}else{
							share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$temp1['memberid']."','".$_SESSION['userid']."',4,'".$me['nickname']."回覆了 你的攻略','".$x[2]."'");
							$sendcontent=$me['nickname']."回覆了 你的攻略";

							if($he['fcmid']){
								sendfcm($he['fcmid'],"攻略回覆",$sendcontent,"",$he['note_count']+1,$he['mobtype']); //20181228 Pman 攻略被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
							}
						}
					}
					//通知其他人
					$temp2=share_getfree($pdo,"SELECT DISTINCT memberid FROM qrep_ WHERE contentid='".$x[2]."' AND memberid<>'".$_SESSION['userid']."' AND memberid<>'".$temp1['memberid']."' ");//找出我以外的所有回覆的人
					foreach($temp2 as $tt){
						if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$tt['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
							share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人也回覆了 ".$he['nickname']."的攻略","thisid='".$notlist[0]['thisid']."'");
							$sendcontent=$me['nickname']."等人也回覆了 ".$he['nickname']."的攻略";
							$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181228 Pman 針對同一篇有留言的其它人資料
							if($others['fcmid']){
								sendfcm($others['fcmid'],"攻略回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181228 Pman 攻略被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
							}
						}else{
							share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',4,'".$me['nickname']."也回覆了 ".$he['nickname']."的攻略','".$x[2]."'");
							$sendcontent=$me['nickname']."也回覆了 ".$he['nickname']."的攻略";
							$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181228 Pman 針對同一篇有留言的其它人資料
							if($others['fcmid']){
								sendfcm($others['fcmid'],"動態回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181228 Pman 攻略被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
							}
						}
					}
					/*
					if($temp1['memberid'] !=$_SESSION['userid']){
						if($tx=share_gettable($pdo,"not_ WHERE memberid='".$temp1['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//看看有沒有回覆過的還沒看
							if($tx['fromid']==$_SESSION['userid']){//最新就是我..不用更新
							}else{//超過一人了...
								share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人回覆了 你的攻略','");
							}
						}else{
							share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$temp1['memberid']."','".$_SESSION['userid']."',1,'".$me['nickname']."回覆了 你的攻略','".$x[2]."'");
						}
					}
					$temp2=share_getfree($pdo,"SELECT DISTINCT memberid FROM rep_ WHERE contentid='".$x[2]."' AND memberid<>'".$_SESSION['userid']."' ");//找出所有回覆的人
					foreach($temp2 as $tt){
						if($x[6] && $x[6]==$tt['memberid']){
							share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid=1,thiscontent='".$me['nickname']."回覆了你在".$he['nickname']."動態的回覆'","thisid='".$tt['thisid']."'");
						}else{
							if($tx=share_gettable($pdo,"not_ WHERE memberid='".$tt['memberid']."' AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//看有沒有沒看過的
								if(count($tx)>2){
									share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid=1,thiscontent='".$me['nickname']."等人也回覆了 ".$he['nickname']."的攻略'","thisid='".$tx[0]['thisid']."'");
								}else{
									share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid=1,thiscontent='".$me['nickname']."也回覆了 ".$he['nickname']."的攻略'","thisid='".$tx[0]['thisid']."'");
								}
							}else{//都看過了就加新的
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',1,'".$me['nickname']."也回覆了 ".$he['nickname']."的攻略','".$x[2]."'");
							}
						}
					}
					*/
					$out[0]="OK";
					//回覆 攻略編號
					$tx=share_getinfo($pdo,"art_","contentid",$x[2]);
					$out[1]=$tx['thisid'];
			}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請重新試試,謝謝";
			}
			$pdo=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//上傳檔案
	function uploadnewsreply($x){
		global $conf;
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key'] && $x[2]<>"" && ($x[3]<>"" || $x[5]=="1")){//確認資格//20190111 Pman 修正如果只有圖片沒有文字時，會有錯誤訊息的情況
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			//刪除 old notice
			share_del($pdo,"not_ WHERE dateadd<( CURDATE() - INTERVAL ".$conf['notkeep']." DAY )");
			//分辨是影片/圖片/相簿/一班文章 1=圖片,2=影片,3=相簿
			$rins="";
			if($x[6]){
				$tempr=share_getinfo($pdom ,"mem_","memberid",$x[6]);//我
				$rins="<span class=\"replytonamebox\">".$tempr['nickname']."</span>";
			}
			if($x[5]=="1"){//圖片
			//	$xxt=share_insert($pdo,"rep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".share_html($x[3])."</div><div class=\"newsfilebox \"><img src='uploadfile/".$x[4]."'  ></div>','".time()."'");
				if($x[3]==""){//20190111 Pman 如果只有圖片沒有文字時，就不填入文字區塊的內容
					$xxt=share_insert($pdo,"rep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\"></div><div class=\" newsfilebox popimgclick newsrimg \"  data-type=\"chat\" ><img src=\"uploadfile/".$x[4]."\" ></div>','".time()."'");
				}else{
					$xxt=share_insert($pdo,"rep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".$rins.share_html($x[3])."</div><div class=\" newsfilebox popimgclick newsrimg \"  data-type=\"chat\" ><img src=\"uploadfile/".$x[4]."\" ></div>','".time()."'");
				}
			}else{//一般文章
				$xxt=share_insert($pdo,"rep_","contentid,memberid,thiscontent,timekey","'".$x[2]."','".$_SESSION['userid']."','<div class=\"newstextbox\">".$rins.share_html($x[3])."</div>','".time()."'");
			}
			if($xxt){
					$t=share_gettable($pdo,"rep_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
					//設定通知
					$temp1=share_getinfo($pdo,"con_","thisid",$x[2]);
					$me=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);//我
					$he=share_getinfo($pdom,"mem_","memberid",$temp1['memberid']);//發言人
					$sendcontent=""; //20181225 Pman 用來儲存要推播的訊息內容
					//先檢查是否是回復
					//在檢查是否發炎者是自己
					//在匯入其他人
					if($x[6]){
						if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$x[6]."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
							share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."回覆了你在".$he['nickname']."動態的回覆'","thisid='".$notlist[0]['thisid']."'");
							$sendcontent=$me['nickname']."回覆了你在".$he['nickname']."動態的回覆";
							$others=share_getinfo($pdom,"mem_","memberid",$x[6]);//20181227 Pman 找出被回覆的那個人
							if($others['fcmid']){
								sendfcm($others['fcmid'],"動態回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181227 Pman 動態牆的回覆被回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
							}
						}else{
							share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$x[6]."','".$_SESSION['userid']."',1,'".$me['nickname']."回覆了你在".$he['nickname']."動態的回覆','".$x[2]."'");
							$sendcontent=$me['nickname']."回覆了你在".$he['nickname']."動態的回覆";
							$others=share_getinfo($pdom,"mem_","memberid",$x[6]);//20181227 Pman 找出被回覆的那個人
							if($others['fcmid']){
								sendfcm($others['fcmid'],"動態回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181227 Pman 動態牆的回覆被回覆時，發出通知推播
							}
						}
					}else{
						//通知發言者
						if($temp1['memberid']==$_SESSION['userid']){//這是我自己的發言
						}else{
							if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$temp1['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
								share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人回覆了 你的動態'","thisid='".$notlist[0]['thisid']."'");
								$sendcontent=$me['nickname']."等人回覆了 你的動態";
								if($he['fcmid']){
									sendfcm($he['fcmid'],"動態回覆",$sendcontent,"",$he['note_count']+1,$he['mobtype']); //20181224 Pman 動態牆回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}else{
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$temp1['memberid']."','".$_SESSION['userid']."',1,'".$me['nickname']."回覆了 你的動態','".$x[2]."'");
								$sendcontent=$me['nickname']."回覆了 你的動態";
								if($he['fcmid']){
									sendfcm($he['fcmid'],"動態回覆",$sendcontent,"",$he['note_count']+1,$he['mobtype']); //20181224 Pman 動態牆回覆時，發出通知推播 //20190220 Pman 新增"mobtype"參數
								}
							}
						}
						//通知其他人
						$temp2=share_getfree($pdo,"SELECT DISTINCT memberid FROM rep_ WHERE contentid='".$x[2]."' AND memberid<>'".$_SESSION['userid']."' AND memberid<>'".$temp1['memberid']."' ");//找出我以外的所有回覆的人
						foreach($temp2 as $tt){
							if($notlist=share_gettable($pdo,"not_ WHERE memberid='".$tt['memberid']."'AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//目前有資料
								share_update($pdo,"not_","fromid='".$_SESSION['userid']."',thiscontent='".$me['nickname']."等人也回覆了 ".$he['nickname']."的動態'","thisid='".$notlist[0]['thisid']."'");
								$sendcontent=$me['nickname']."等人也回覆了 ".$he['nickname']."的動態";
								$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181225 Pman 針對同一篇有留言的其它人資料

								if($others['fcmid']){
									sendfcm($others['fcmid'],"動態回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181224 Pman 動態牆回覆時，發出通知推播 //20181225 Pman 修正推播發送對象 //20190220 Pman 新增"mobtype"參數
								}
							}else{
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',1,'".$me['nickname']."也回覆了 ".$he['nickname']."的動態','".$x[2]."'");
								$sendcontent=$me['nickname']."也回覆了 ".$he['nickname']."的動態";
								$others=share_getinfo($pdom,"mem_","memberid",$tt['memberid']);//20181225 Pman 針對同一篇有留言的其它人資料
								if($others['fcmid']){
									sendfcm($others['fcmid'],"動態回覆",$sendcontent,"",$others['note_count']+1,$others['mobtype']); //20181224 Pman 動態牆回覆時，發出通知推播 //20181225 Pman 修正推播發送對象 //20190220 Pman 新增"mobtype"參數
								}
							}
						}
					}
					/*

					$temp2=share_getfree($pdo,"SELECT DISTINCT memberid FROM rep_ WHERE contentid='".$x[2]."' AND memberid<>'".$_SESSION['userid']."' ");//找出我以外的所有回覆的人
					foreach($temp2 as $tt){
						if($x[6] && $x[6]==$tt['memberid']){
							share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid=1,thiscontent='".$me['nickname']."回覆了你在".$he['nickname']."動態的回覆'","thisid='".$tt['thisid']."'");
						}else{
							if($tx=share_gettable($pdo,"not_ WHERE memberid='".$tt['memberid']."' AND typeid=1 AND thislink='".$x[2]."' AND viewed=0")){//看有沒有沒看過的
								if(count($tx)>2){
									share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid=1,thiscontent='".$me['nickname']."等人也回覆了 ".$he['nickname']."的動態'","thisid='".$tx[0]['thisid']."'");
								}else{
									share_update($pdo,"not_","fromid='".$_SESSION['userid']."',typeid=1,thiscontent='".$me['nickname']."也回覆了 ".$he['nickname']."的動態'","thisid='".$tx[0]['thisid']."'");
								}
							}else{//都看過了就加新的
								share_insert($pdo,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$tt['memberid']."','".$_SESSION['userid']."',1,'".$me['nickname']."也回覆了 ".$he['nickname']."的動態','".$x[2]."'");
							}
						}
					}
					*/
					$out[0]="OK";
			}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請重新試試,謝謝";
			}
			$pdo=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'].share_html($x[3]);
		}
		echo json_encode($out);
	}
	//攻略
	function uploadarticletext($x){//4/22 修改新增編輯的條件
		global $conf;
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key'] && $x[2]<>""){//確認資格
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			$chk=0;
			//如果有id 要先確認
			if(!empty($x[7])){
				if($tart=share_gettable($pdo,"art_ WHERE thisid='".$x[7]."' AND memberid='".$_SESSION['userid']."' limit 1")){
					$chk=1;
				}
			}else{
				$chk=1;
			}
			if($chk==1){
				$temp="";
				//分辨是影片/圖片/相簿/一班文章 1=圖片,2=影片,3=相簿,4=攻略
				if( empty($x[7]) || (!empty($x[7]) && $tart[0]['isopen']=="2")){
					if($x[6]=="1" && $x[4]){//有圖片
						$temp=share_insert($pdo,"con_","memberid,typeid,gamid,thiscontent,timekey","'".$_SESSION['userid']."',4,'".$x[3]."','<div class=wallartbox><div class=\"newstextbox\">發表了:".share_html($x[2])."</div><div class=\"newsfilebox\"><img src=uploadfile/".$x[4]."></div></div>','".time()."'");
					}else if($x[6]=="1"){//無圖片
						$temp=share_insert($pdo,"con_","memberid,typeid,gamid,thiscontent,timekey","'".$_SESSION['userid']."',4,'".$x[3]."','<div class=wallartbox><div class=\"newstextbox\">發表了:".share_html($x[2])."</div></div>','".time()."'");
					}
				}else if(!empty($x[7]) && $tart[0]['isopen']=="1"){//編輯
					share_update($pdo,"art_","thistitle='".$x[2]."',gamid='".$x[3]."',thisfile='".$x[4]."',thiscontent='".$x[5]."'","thisid='".$x[7]."'");
					$out[0]="OK2";
				}
				if($temp){//開放
						$t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
						if(!empty($x[7])){
							share_update($pdo,"art_","thistitle='".$x[2]."',contentid='".$t[0]['thisid']."',gamid='".$x[3]."',thisfile='".$x[4]."',thiscontent='".$x[5]."',isopen='1'","thisid='".$x[7]."'");
						}else{
							share_insert($pdo,"art_","memberid,thistitle,contentid,gamid,thisfile,thiscontent","'".$_SESSION['userid']."','".$x[2]."','".$t[0]['thisid']."','".$x[3]."','".$x[4]."','".$x[5]."'");
						}
						share_insert($pdo,"wall","memberid,contentid,gamid,timekey","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[3]."','".time()."'");
						$out[0]="OK";
				}else if($x[6]=="2"){
					$out[0]="OK";
					if(!empty($x[7]) && $tart[0]['isopen']=="2" ){
						share_update($pdo,"art_","thistitle='".$x[2]."',contentid='".$t[0]['thisid']."',gamid='".$x[3]."',thisfile='".$x[4]."',thiscontent='".$x[5]."'","thisid='".$x[7]."'");
					}else if( empty($x[7]) ){
						share_insert($pdo,"art_","memberid,thistitle,gamid,thisfile,thiscontent,isopen","'".$_SESSION['userid']."','".$x[2]."','".$x[3]."','".$x[4]."','".$x[5]."','2'");
					}
				}else if(!empty($x[7]) && $tart[0]['isopen']=="1"){
				}else{
						$out[0]="ERR";
						$out[1]="存入錯誤,請重新試試,謝謝";
				}
			}else{
				$out[0]="ERR";
				$out[1]="身分資料核對錯誤";
			}
			$pdo=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		if($out[0]=="OK" && $x[6]=="1"){
			if( empty($x[7]) || (!empty($x[7]) && $tart[0]['isopen']=="2")){
				$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
				$pdop -> exec("set names ".$conf['db_encode']);
				if($t=share_getfree($pdop,"SELECT count(*) as cc FROM poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='003' AND FROM_UNIXTIME(Unix_Timestamp(dateadd), '%Y-%m-%d')=CURRENT_DATE()")){//已經加過點了//20190402 Pman 調整機涮時間的規則，只要過了午夜12點，貼文的前三則就算
					if($_SESSION['isver']==1){
						if($t[0]['cc']==1){
							$tt=get_point('7');
							add_point($_SESSION['userid'],$tt,'003',"每日發文(2)");
						}else if($t[0]['cc']==2){
							$tt=get_point('8');
							add_point($_SESSION['userid'],$tt,'003',"每日發文(3)");
						}else if($t[0]['cc']==0){
							$tt=get_point('6');
							add_point($_SESSION['userid'],$tt,'003',"每日發文(1)");
						}
					}
				}
			}
		}
		echo json_encode($out);
	}
	function uploadnewsin($x){//更新動態牆內容
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			$ttt=share_getinfo($pdo,"con_","thisid",$x[3]);
			$tttb=explode("<div class=\"newsfilebox\">",$ttt['thiscontent'])[1];
			if($tttb){
				$tttb="</div><div class=\"newsfilebox\">".$tttb;
			}else{
				$tttb="</div>";
			}
			if(share_update($pdo,"con_","thiscontent='<div class=\"newstextbox\">".share_html($x[2]).$tttb."',opentype='".$x[4]."'","thisid='".$x[3]."' AND memberid='".$_SESSION['userid']."'")){ //20190416 Pman 加上opentype的更新
					$out[0]="OK";
			}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請重新試試,謝謝";
			}
		}
		echo json_encode($out);
	}
	function uploadnewsalb($x){//更新相簿
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			share_update($pdo,"alb_","thisname='".$x[2]."',thiscontent='".$x[3]."',opentype='".$x[4]."'","thisid='".$x[5]."'");
			$out[0]="OK";
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	function uploadnews($x){//動態牆
		global $conf;
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			//delete old
			share_del($pdo,"rep_ WHERE contentid in ( SELECT thisid FROM con_ WHERE thisid in (select contentid FROM wall WHERE timekey<".(time()-86400*$conf['wallkeep'])." ) AND typeid=0 )");
			share_del($pdo,"con_ WHERE thisid in (select contentid FROM wall WHERE timekey<".(time()-86400*$conf['wallkeep']).") AND typeid=0 ");
			share_del($pdo,"wall WHERE timekey<".(time()-86400*$conf['wallkeep']) );

			//刪除超過時間的舊資料   1.walllist 超過時間的  2.只有單純發言的content 3.content 相對的rep
			chk_walldel();
			//分辨是影片/圖片/相簿/一班文章 1=圖片,2=影片,3=相簿
			if( $x[4] && $x[5]=="1"){//圖片
				$pics=share_gettable($pdo,"pho_ WHERE albid='".$x[4]."' order by thisid");
				$pout="";
				$ttotal=count($pics);
				if($ttotal>0){
					$pout.="<div class=\"albfacewrap popimgclick btn \" data-val=\"".$pics[0]['thisid']."\">";
					if($ttotal==1){
						$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"c100\">";
					}else if($ttotal==2){
						$pout.="<div class=\"albface1b\">";
						$tfile="uploadfile/".$pics[0]['thisfile'];
						$xdata="";
						$xdata = getimagesize($tfile);
						if($xdata[0] > $xdata[1]){
							$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"albfacepich\">";
						}else{
							$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"albfacepicw\">";
						}
						$pout.="</div>";
						$pout.="<div class=\"albface1b\">";
						$tfile="uploadfile/".$pics[1]['thisfile'];
						$xdata="";
						$xdata = getimagesize($tfile);
						if($xdata[0] > $xdata[1]){
							$pout.="<img src=\"uploadfile/".$pics[1]['thisfile']."\" class=\"albfacepich\">";
						}else{
							$pout.="<img src=\"uploadfile/".$pics[1]['thisfile']."\" class=\"albfacepicw\">";
						}
						$pout.="</div>";
					}else{
						$pout.="<div class=\"albface1\">";
						$tfile="uploadfile/".$pics[0]['thisfile'];
						$xdata="";
						$xdata = getimagesize($tfile);
						if($xdata[0] > $xdata[1]){
							$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"albfacepich\">";
						}else{
							$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"albfacepicw\">";
						}
						$pout.="</div>";
						$pout.="<div class=\"albface2\">";
						$tfile="uploadfile/".$pics[1]['thisfile'];
						$xdata="";
						$xdata = getimagesize($tfile);
						if($xdata[0] > $xdata[1]){
							$pout.="<img src=\"uploadfile/".$pics[1]['thisfile']."\" class=\"albfacepich\">";
						}else{
							$pout.="<img src=\"uploadfile/".$pics[1]['thisfile']."\" class=\"albfacepicw\">";
						}
						$pout.="</div>";
						$pout.="<div class=\"albface3\">";
						$tfile="uploadfile/".$pics[2]['thisfile'];
						$xdata="";
						$xdata = getimagesize($tfile);
						if($xdata[0] > $xdata[1]){
							$pout.="<img src=\"uploadfile/".$pics[2]['thisfile']."\" class=\"albfacepich\">";
						}else{
							$pout.="<img src=\"uploadfile/".$pics[2]['thisfile']."\" class=\"albfacepicw\">";
						}

						if($ttotal>3){
							$pout.="<div class=\"albface3cover\">+ ".($ttotal-3)."</div>";
						}
						$pout.="</div>";
					}
					$pout.="<div class=clr></div>";
					$pout.="</div>";
					//檢查是否有預設相簿
					//檢查是否有預設相簿
					/*
					if( $test=share_gettable($pdo,"alb_ WHERE memberid='".$_SESSION['userid']."' AND isdefault=1") ){
						//照片移到預設相簿
						share_update($pdo,"pho_","albid='".$test[0]['thisid']."'","albid='".$x[4]."'");
						//刪除暫存相簿
						share_del($pdo,"alb_ WHERE albid='".$x[4]."'");
					}else{//將新相簿改成預設相簿
						$tt=share_update($pdo,"alb_","isdefault=1","thisid='".$x[4]."'");//照片不用動
					}
					*/
					//不動相簿會發生什麼呢
					if($x[2]){
						if(share_update($pdo,"con_","typeid='".$x[5]."',gamid='".$x[6]."',opentype='".$x[7]."',thiscontent='<div class=\"newstextbox\">".share_html($x[3])."</div><div class=\"newsfilebox\">".$pout."</div>',fileinfo='".$x[4]."'","thisid='".$x[2]."'")){
							//更新動態牆
							share_update($pdo,"wall","gamid='".$x[6]."'","contentid='".$x[2]."'");
							$out[0]="OK";
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤,請重新試試,謝謝";
						}
					}else{
						if(share_insert($pdo,"con_","memberid,typeid,gamid,opentype,thiscontent,timekey,fileinfo","'".$_SESSION['userid']."','".$x[5]."','".$x[6]."','".$x[7]."','<div class=\"newstextbox\">".share_html($x[3])."</div><div class=\"newsfilebox\">".$pout."</div>','".time()."','".$x[4]."'")){
							$t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
							share_insert($pdo,"wall","memberid,contentid,gamid,opentype,timekey","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[6]."','".$x[7]."','".time()."'");
							$out[0]="OK";
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤,請重新試試,謝謝";
						}
					}//20180918 Pman 仿照手機版整段換掉
				}else{//圖片已經被刪光
					if($x[3]){//一般文章
						if(share_insert($pdo,"con_","memberid,typeid,gamid,thiscontent,timekey","'".$_SESSION['userid']."','0','".$x[6]."','<div class=\"newstextbox\">".share_html($x[3])."\n</div>','".time()."'")){
							$t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
							share_insert($pdo,"wall","memberid,contentid,gamid,timekey","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[6]."','".time()."'");
							$out[0]="OK";
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤,請重新試試,謝謝";
						}
					}else{
						$out[0]="ERR";
						$out[1]="請填寫內容";
					}
				}
			}else if( $x[4] && $x[5]=="2"){//影片
				if(share_insert($pdo,"con_","memberid,typeid,gamid,thiscontent,timekey,fileinfo","'".$_SESSION['userid']."','".$x[5]."','".$x[6]."','<div class=\"newstextbox\">".share_html($x[3])."\n</div><div class=\"newsfilebox\"><video width=100% controls id=newstempvideo><source src=uploadfile/".$x[4]." type=video/mp4 ></video></div>','".time()."','".$x[4]."'")){
				//if(share_insert($pdo,"con_","memberid,typeid,gamid,thiscontent,timekey,fileinfo","'".$_SESSION['userid']."','".$x[5]."','".$x[6]."','".share_html($x[3])."','".time()."','".$x[4]."'"))
					$t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
					share_insert($pdo,"vid_","memberid,contentid,thisfile,thiscontent","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[4]."','".$x[3]."'");
					share_insert($pdo,"wall","memberid,contentid,gamid,timekey","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[6]."','".time()."'");
					$out[0]="OK";
				}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請重新試試,謝謝";
					//$out[1]="(memberid,typeid,gamid,thiscontent,timekey,fileinnfo) values('".$_SESSION['userid']."','".$x[5]."','".$x[6]."','<div class=\"newstextbox\">\n".share_html($x[3])."\n</div><div class=\"newsfilebox\"><video width=100% controls id=newstempvideo><source src=uploadfile/".$x[4]." type=video/mp4 ></video></div>','".time()."','".$x[4]."')";
				}
			}else if($x[4] && $x[5]=="3"){//相簿
				//更新
				/*
				$pics=share_gettable($pdo,"pho_ WHERE albid='".$x[4]."' order by thisid");
				$pout="";
				$ttotal=count($pics);
				$pout.="<div class=\"albfacewrap popimgclick btn \" data-val=\"".$pics[0]['thisid']."\">";
				$pout.="<div class=\"albface1\">";
				$tfile="uploadfile/".$pics[0]['thisfile'];
				$xdata="";
				$xdata = getimagesize($tfile);
				if($xdata[0] > $xdata[1]){
					$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"albfacepich\">";
				}else{
					$pout.="<img src=\"uploadfile/".$pics[0]['thisfile']."\" class=\"albfacepicw\">";
				}
				$pout.="</div>";
				$pout.="<div class=\"albface2\">";
				$tfile="uploadfile/".$pics[1]['thisfile'];
				$xdata="";
				$xdata = getimagesize($tfile);
				if($xdata[0] > $xdata[1]){
					$pout.="<img src=\"uploadfile/".$pics[1]['thisfile']."\" class=\"albfacepich\">";
				}else{
					$pout.="<img src=\"uploadfile/".$pics[1]['thisfile']."\" class=\"albfacepicw\">";
				}
				$pout.="</div>";
				$pout.="<div class=\"albface3\">";
				$tfile="uploadfile/".$pics[2]['thisfile'];
				$xdata="";
				$xdata = getimagesize($tfile);
				if($xdata[0] > $xdata[1]){
					$pout.="<img src=\"uploadfile/".$pics[2]['thisfile']."\" class=\"albfacepich\">";
				}else{
					$pout.="<img src=\"uploadfile/".$pics[2]['thisfile']."\" class=\"albfacepicw\">";
				}

				if($ttotal>3){
					$pout.="<div class=\"albface3cover\">+ ".($ttotal-3)."</div>";
				}
				$pout.="</div>";
				$pout.="<div class=clr></div>";
				$pout.="</div>";
				*/
				//if($x[2]){
				//}else{
				//	$x[2]="無名的相簿";
				//}
				//if(share_insert($pdo,"con_","memberid,typeid,gamid,opentype,thiscontent,timekey","'".$_SESSION['userid']."','3','".$x[6]."','".$x[7]."','<div class=\"newstextbox\">上傳了一個相簿 ".share_html($x[2])."</div><div class=\"newsfilebox\">".$pout."</div>','".time()."'"))
				//if($t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1"))
					//$t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
				if(share_update($pdo,"alb_","thisname='".$x[2]."',thiscontent='".$x[3]."',opentype='".$x[7]."',isdefault=0","thisid='".$x[4]."'")){
					//share_insert($pdo,"wall","memberid,contentid,gamid,opentype,timekey","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[6]."','".$x[7]."','".time()."'");
					$out[0]="OK";
				}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請重新試試,謝謝";
				}//20180918 Pman 仿照手機版整段換掉

			}else if($x[3]){//一般文章
				if(share_insert($pdo,"con_","memberid,typeid,gamid,opentype,thiscontent,timekey","'".$_SESSION['userid']."','0','".$x[6]."','".$x[7]."','<div class=\"newstextbox\">".share_html($x[3])."\n</div>','".time()."'")){
					//20190322 Pman 修正在動態牆發文時，opentype沒有寫入的問題
					$t=share_gettable($pdo,"con_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
					//20190322 Pman 修正在動態牆發文時，opentype沒有寫入的問題
					share_insert($pdo,"wall","memberid,contentid,gamid,opentype,timekey","'".$_SESSION['userid']."','".$t[0]['thisid']."','".$x[6]."','".$x[7]."','".time()."'");
					$out[0]="OK";
				}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請重新試試,謝謝";
				}
			}else{
				$out[0]="ERR";
				$out[1]="請填寫內容";
			}
			$pdo=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		if($out[0]=="OK"){
			$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
			$pdop -> exec("set names ".$conf['db_encode']);
			if($t=share_getfree($pdop,"SELECT count(*) as cc FROM poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='003' AND FROM_UNIXTIME(Unix_Timestamp(dateadd), '%Y-%m-%d')=CURRENT_DATE()")){//已經加過點了//20190402 Pman 調整機涮時間的規則，只要過了午夜12點，貼文的前三則就算
				if($_SESSION['isver']==1){
					if($t[0]['cc']==1){
						$tt=get_point('7');
						add_point($_SESSION['userid'],$tt,'003',"每日發文(2)");
					}else if($t[0]['cc']==2){
						$tt=get_point('8');
						add_point($_SESSION['userid'],$tt,'003',"每日發文(3)");
					}else if($t[0]['cc']==0){
						$tt=get_point('6');
						add_point($_SESSION['userid'],$tt,'003',"每日發文(1)");
					}
				}
			}
		}
		echo json_encode($out);
	}
	function uploadhead($x){
		$id=rand(123,987).date('Yndhms').rand(123,987);
		$t=uploadfilebase($id,600,2,600,$_FILES["val"]);
		echo $id.".".$t;

	}
	function uploadheadb($x){
		global $conf;
		if($_SESSION['userid']){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$id=rand(123,987).date('Yndhms').rand(123,987);
			$t=uploadfilebase($id,600,2,600,$_FILES["val"]);
			//share_update($pdom,"mem_","headpic='".$id.".".$t."'","memberid='".$_SESSION['userid']."'");
			$pdom=null;
			echo $id.".".$t;
		}
	}
	function uploadheadc($x){
		global $conf;
                $out=array();
		if($_SESSION['userid']==$x[0] && $_SESSION['key']==$x[1]){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			share_update($pdom,"mem_","headpic='".$x[2]."'","memberid='".$_SESSION['userid']."'");
			$pdom=null;
			$out[0]="OK";
		}
		echo json_encode($out);
	}
	function uploadarticle($x){
		$id=rand(123,987).date('Yndhms').rand(123,987);
		$t=uploadfilebase($id,730,0,411,$_FILES["val"]);//$t=uploadfilebase($id,229,0,129,$_FILES["val"]);

		echo $id.".".$t;
	}
	function uploadfront($x){
		$id=rand(123,987).date('Yndhms').rand(123,987);
		$t=uploadfilebase($id,728,0,200,$_FILES["val"]);
		echo $id.".".$t;

	}
	//這是mypage更新方面圖
	function uploadfrontb($x){
		if($_SESSION['userid']){
			$id=rand(123,987).date('Yndhms').rand(123,987);
			$t=uploadfilebase($id,728,0,200,$_FILES["val"]);
			echo $id.".".$t;
		}
	}
	function uploadfrontc($x){
		global $conf;
		if($_SESSION['userid']==$x[0] && $_SESSION['key']==$x[1]){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			share_update($pdom,"mem_","frontpic='".$x[2]."'","memberid='".$_SESSION['userid']."'");
			$pdom=null;
			$out[0]="OK";
		}
		echo json_encode($out);
	}
	function uploadnewsreplypic($x){//
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$id=rand(123,987).date('Yndhms').rand(123,987);
			//$image_info = getimagesize($_FILES['val']["tmp_name"]);
			//$theight=$image_info[1];
			//if($theight>350){
			//	echo "ERRH";
			//}else{
				$t=uploadfilebase($id,1900,2,'',$_FILES["val"]);   //縮圖的尺寸放大 380 ==> 900 Pman//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
				echo $id.".".$t;
			//}
		}else{
			echo "ERR";
		}

	}
	function uploadnewspicbook(){//上船相簿圖片
		global $conf;
                $out=array();
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			//share_del($pdod,"alb_ WHERE memberid='".$_SESSION['userid']."' AND isdefault=9");//刪除舊的垃圾
			share_insert($pdod,"alb_","memberid,thisname,isdefault","'".$_SESSION['userid']."','未命名相簿',9");
			$t=share_gettable($pdod,"alb_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
			$albid=$t[0]['thisid'];
			$out[0]=$albid;
			for($a=0;$a<20;$a++){
				if($_FILES["val".$a]['tmp_name']){
					$id=rand(123,987).date('Yndhms').rand(123,987);
					$t=uploadfilebase($id,1900,2,'',$_FILES["val".$a]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
					share_insert($pdod,"pho_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$albid."','".$id.".".$t."'");
					if($t=="gif"){
						$out[1][$a]=$id.".".$t;
					}else{
						$out[1][$a]=$id.".".$t;
					}
					$out[2][$a]=$id.".".$t;
				}
			}
		}else{
			$out[0]="ERR";
		}
		$pdod=NULL;
		echo json_encode($out);
	}
	function uploadnewspic(){//上傳非相簿的相簿 //20181017 Pman 因為PC版上傳時，刪除舊相簿的行為，所以仿照手機版，整段重貼
		global $conf;
                $out=array();
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			//share_del($pdod,"pho_ WHERE albid in (SELECT thisid FROM alb_ WHERE memberid='".$_SESSION['userid']."' AND isdefault=9)");//刪除舊的垃圾
			//share_del($pdod,"alb_ WHERE memberid='".$_SESSION['userid']."' AND isdefault=9");//刪除舊的垃圾
			//share_insert($pdod,"alb_","memberid,thisname,isdefault","'".$_SESSION['userid']."','','9'");
			//$t=share_gettable($pdod,"alb_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
			//$albid=$t[0]['thisid'];
			//$out[0]=$albid;
			if($GLOBALS['albid']){
				$albid=$GLOBALS['albid'];
			}else{
				share_insert($pdod,"alb_","memberid,thisname,isdefault","'".$_SESSION['userid']."','','9'");
				$t=share_gettable($pdod,"alb_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
				$albid=$t[0]['thisid'];
			}
			$out[0]=$albid;
			for($a=0;$a<20;$a++){
				if($_FILES["val".$a]['tmp_name']){
					$id=rand(123,987).date('Yndhms').rand(123,987);
					$t=uploadfilebase($id,1900,2,'',$_FILES["val".$a]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
					share_insert($pdod,"pho_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$albid."','".$id.".".$t."'");//先不存
					if($t=="gif"){
						$out[1][$a]=$id.".".$t;
					}else{
						$out[1][$a]=$id.".".$t;
					}
					$out[2][$a]=$id.".".$t;
				}
			}
		}else{
			$out[0]="ERR";
		}
		$pdod=NULL;
		echo json_encode($out);
	}
	function uploadqnapic($x){//上傳QNA圖片
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			share_insert($pdod,"albq_","memberid,thisname,isdefault","'".$_SESSION['userid']."','預設相簿','1'");
			$t=share_gettable($pdod,"albq_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 1");
			$albid=$t[0]['thisid'];
			$out[0]=$albid;
			for($a=0;$a<20;$a++){
				if($_FILES["val".$a]['tmp_name']){
					$id=rand(123,987).date('Yndhms').rand(123,987);
					$t=uploadfilebase($id,1900,2,'',$_FILES["val".$a]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
					share_insert($pdod,"phoq_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$albid."','".$id.".".$t."'");
					if($t=="gif"){
						$out[1][$a]=$id.".".$t;
					}else{
						$out[1][$a]=$id.".".$t;
					}
					$out[2][$a]=$id.".".$t;
				}
			}
		}else{
			$out[0]="ERR";
		}
		$pdod=NULL;
		echo json_encode($out);
	}
	function uploadalbpicdel($x){//相簿內相片刪除
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$x[0] && $_SESSION['key']==$x[1]){
			//先檢查
			$tem1=share_getinfo($pdod,"pho_","thisfile",$x[2]);
			$tem2=share_getinfo($pdod,"alb_","thisid",$tem1['albid']);
			if($tem2['isdefault']=="1" || $tem2['isdefault']=="9"){//一班上傳 //20190108 Pman PC在動態牆上，發言時，刪除最後一張圖，還是會出現「至少要有一張圖」的訊息，先這樣改改看
				//share_del($pdod,"pho_ WHERE memberid='".$_SESSION['userid']."' AND albid='".$x[2]."'");//4/20修改--因為動態牆刪除錯誤
				share_del($pdod,"pho_ WHERE memberid='".$_SESSION['userid']."' AND thisfile='".$x[2]."'");
				$cnt=share_getcount($pdod,"pho_ WHERE albid='".$tem1['albid']."'");
				if($cnt==0){
					share_del($pdod,"alb_ WHERE memberid='".$_SESSION['userid']."' AND thisid='".$tem1['albid']."'");
				}
				$out[0]="OKA";
			}else{//相簿上傳
				$cnt=share_getcount($pdod,"pho_ WHERE albid='".$tem1['albid']."'");
				if($cnt<=1){
					$out[0]="ERRB";
				}else{
					//share_del($pdod,"pho_ WHERE memberid='".$_SESSION['userid']."' AND albid='".$x[2]."'");//4/20修改--因為動態牆刪除錯誤
					share_del($pdod,"pho_ WHERE memberid='".$_SESSION['userid']."' AND thisfile='".$x[2]."'");
					$out[0]="OKB";
				}
			}

		}else{
			$out[0]="ERR";
		}
		$pdod=NULL;
		echo json_encode($out);
	}
	function uploadalbqpicdel($x){//qa相簿內相片刪除
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$x[0] && $_SESSION['key']==$x[1]){
			share_del($pdod,"phoq_ WHERE memberid='".$_SESSION['userid']."' AND thisfile='".$x[2]."'");
			$out[0]="OK";
		}else{
			$out[0]="ERR";
		}
		$pdod=NULL;
		echo json_encode($out);
	}
	function addalbpic(){//增加照片
		global $conf;
                $out=array();
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$tpy=share_getinfo($pdod,"alb_","thisid",$GLOBALS['albid']);
			$cnt=share_getcount($pdod,"pho_ WHERE albid='".$GLOBALS['albid']."'");
			if($tpy['isdefault']>=1){//一班上傳
				if($tpy['isdefault']>1 && $cnt>=20){
					echo "ERRB";
				}else{
					$id=rand(123,987).date('Yndhms').rand(123,987);
					$t=uploadfilebase($id,1900,2,'',$_FILES["val"]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
					share_insert($pdod,"pho_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$GLOBALS['albid']."','".$id.".".$t."'");
					echo $id.".".$t; //."_".$cnt;
				}
			}else{
				if( $cnt>20){
					echo "ERRC";
				}else{
					if( $cnt<18){
						$cnt=1;//相簿
					}
					$id=rand(123,987).date('Yndhms').rand(123,987);
					$t=uploadfilebase($id,1900,2,'',$_FILES["val"]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
					share_insert($pdod,"pho_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$GLOBALS['albid']."','".$id.".".$t."'");
					echo $id.".".$t; //."_".$cnt;
				}
			}

		}else{
			echo "ERR";
		}
		$pdod=NULL;
	}
	function addalbqpic($x){//增加照片qa
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$cnt=share_getcount($pdod,"phoq_ WHERE albid='".$GLOBALS['albid']."'");
			if($cnt && $cnt>=5){
				echo "ERRB";
			}else{
				$id=rand(123,987).date('Yndhms').rand(123,987);
				$t=uploadfilebase($id,1900,2,'',$_FILES["val"]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
				share_insert($pdod,"phoq_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$GLOBALS['albid']."','".$id.".".$t."'");
				echo $id.".".$t."_".$cnt;
			}
		}else{
			echo "ERR";
		}
		$pdod=NULL;
	}
	function addalbpicb($x){//增加照片--相簿內
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$id=rand(123,987).date('Yndhms').rand(123,987);
			$t=uploadfilebase($id,1900,2,'',$_FILES["val"]);//20180907 Pman 因為上傳的橫幅圖，左右都被砍掉，所以將1改成2
			share_insert($pdod,"pho_","memberid,albid,thisfile","'".$_SESSION['userid']."','".$GLOBALS['albid']."','".$id.".".$t."'");
			echo $id.".".$t;
		}else{
			echo "ERR";
		}
		$pdod=NULL;
	}
	function uploadnsinglepic($x){//需要登入
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$id=rand(123,987).date('Yndhms').rand(123,987);
			//$t=uploadfilebase($id,448,1,'');
			$t=uploadfilebase($id,448,1,'',$_FILES["val"]);

			echo $id.".".$t;
		}else{
			echo "ERR";
		}

	}
	function uploadnewsvid($x){
		if($_SESSION['userid']==$GLOBALS['uid'] && $_SESSION['key']==$GLOBALS['ukey']){
			$id=rand(123,987).date('Yndhms').rand(123,987);
			$t=uploadfilebase($id,0,1,'',$_FILES["val"]);
			echo $id.".".$t;
		}else{
			echo "ERR";
		}
	}
	function uploadtest($x){
		$id=rand(123,987).date('Yndhms').rand(123,987);
		$fileext="mp4";
		$imgurl="uploadfile/";
		echo "START";
		move_uploaded_file($_FILES["val"]['tmp_name'], $imgurl.$id.".".$fileext);
		echo $id.".".$fileext;

	}
	//function uploadfilebase($id,$x,$y,$h){//使用者上傳	ID,寬,是否強迫高寬(1不強迫),高度,檔案
	function uploadfilebase($id,$x,$y,$h,$fil){//使用者上傳	ID,寬,是否強迫高寬,高度,檔案
		//$file=$_FILES["val"];
		$file=$fil;
		$imgwidth="";
		$imgurl="uploadfile/";
		$imgheight=0;
		$imgs=1;
		$thumbwidth=120;
		$thumbheight=0;
		if($y==1){
		}else{
			if($x){	$imgwidth=$x;}
			if($h){	$imgheight=$h;}
		}
		if(($file["type"] == "image/jpeg") || ($file["type"] == "image/pjpeg")){
			$fileext="jpg";
			//$src = imagecreatefromjpeg($file['tmp_name']); //20190109 Pman 修正有些JPG上傳後，方向會錯誤的問題
			//$exif = exif_read_data($file['tmp_name']); //20190109 Pman 修正有些JPG上傳後，方向會錯誤的問題

			//20190109 Pman 讀取exif資料，確認照片的方向
                        /*
			if (!empty($exif['Orientation'])) {
				$hh="y";
				switch ($exif['Orientation']) {
				case 3:
				$src = imagerotate($src, 180, 0);
				break;
				case 6:
				$src = imagerotate($src, -90, 0);
				break;
				case 8:
				$src = imagerotate($src, 90, 0);
				break;
				}
			}

			if($imgwidth){
				//$src = imagecreatefromjpeg($file['tmp_name']); //20190109 Pman 在讀取exif資料時，就已建立，所以mark掉
				$width = imagesx($src);
				$height =imagesy($src);
				createimg($id,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
			}else{
				if($x || $h){	//表示是只能小不能大
					//$src = imagecreatefromjpeg($file['tmp_name']);
					$width = imagesx($src);
					$height =imagesy($src);
					if($x && $width>$x){
						$imgwidth=$x;
					}else{//不縮圖了
						$imgwidth=$width;
					}
					if($h && $height>$h){
						$imgheight=$h;
					}else{//不縮圖了
						$imgheight=$height;
					}
					if($y==2){//強迫高寬比
						$r=$x/$h;
						$cr=$imgwidth/$imgheight;
						if($cr>$r){//寬大於高比
							$imgwidth=$imgheight*$x/$h;
						}else if($r>$cr){
							$imgheight=$imgwidth*$h/$x;
						}
					}
					createimg($id,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
				}else{//其他就是真的不管了
					move_uploaded_file($file['tmp_name'], $imgurl.$id.".".$fileext);
				}
			}
                         */
					move_uploaded_file($file['tmp_name'], $imgurl.$id.".".$fileext);
		}else if($file["type"] == "image/png") {
			$fileext="png";
                        /*
			if($imgwidth){
				$src = imagecreatefrompng($file['tmp_name']);
				$width = imagesx($src);
				$height =imagesy($src);
				createimg($id,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
			}else{
				if($x || $h){	//表示是只能小不能大
					$src = imagecreatefrompng($file['tmp_name']);
					$width = imagesx($src);
					$height =imagesy($src);
					if($x && $width>$x){
						$imgwidth=$x;
					}else{//不縮圖了
						$imgwidth=$width;
					}
					if($h && $height>$h){
						$imgheight=$h;
					}else{//不縮圖了
						$imgheight=$height;
					}
					if($y==2){//強迫高寬比
						$r=$x/$h;
						$cr=$imgwidth/$imgheight;
						if($cr>$r){//寬大於高比
							$imgwidth=$imgheight*$x/$h;
						}else if($r>$cr){
							$imgheight=$imgwidth*$h/$x;
						}
					}
					createimg($id,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
				}else{//其他就是真的不管了
					move_uploaded_file($file['tmp_name'], $imgurl.$id.".".$fileext);
				}

			}
                         */
					move_uploaded_file($file['tmp_name'], $imgurl.$id.".".$fileext);
			$fileext="jpg";//20190124 Pman 因為要將上傳的PNG，改成JPG，所以要改變副檔名
		}else if($file["type"] == "video/mp4") {
			$src = $file['tmp_name'];
			$fileext="mp4";
			move_uploaded_file($src, $imgurl.$id.".".$fileext);
		}else if($file["type"] == "image/gif") {
			$src = $file['tmp_name'];
			$fileext="gif";
			move_uploaded_file($src, $imgurl.$id.".".$fileext);
		}
		return $fileext;
	}
   ?>

<?php
	ini_set('upload_max_filesize', '10M');
	ini_set('post_max_size', '10M');
	error_reporting(~E_ALL);
	ini_set("display_errors", 1);
        ini_set('date.timezone', "Asia/Taipei");
	//以下是內容
	session_start();
   	if (isset($_REQUEST['_SESSION'])) die("Get lost Muppet!");
	require_once 'adm/config/config.php';
    require_once 'adm/config/getform.php';
    require_once 'adm/config/share.php';
	require_once 'func/sendmail.php';
	require_once 'func/cap.php';
	require_once 'adm/config/createimg.php';
	require_once 'func/upload.php';
	require_once 'func/member.php';
	require_once 'func/match.php';//配對
	require_once 'func/chat.php';//聊天
	if(!empty($job)){
		if(!empty($val)){
			$job($val);
                }elseif(isset($_FILES['val'])){
			$job($_FILES['val']);
                }else{
			$job();
		}
	}
	//回復動態牆--在相簿被選取之後
	function returnme($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);

			$temp=share_gettable($pdod,"alb_ WHERE memberid='1111111114' AND thisname='未命名相簿' AND dateadd>CURDATE()-1 order by thisid DESC");
			if(count($temp)>0){
				$tid=$temp[0]['thisid'];
				share_del($pdod,"pho_ WHERE albid='".$tid."'");
				share_del($pdod,"alb_ WHERE thisid='".$tid."'");
				$out[0]="OK";
			}else{
				$out[0]="OK";
				$out[1]="rtt";
			}
			$pdod=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//後台查會員
	function bak_memchk($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		if($out=share_gettable($pdom,"mem_ WHERE nickname='".$x[0]."' OR nickname like '%".$x[0]."%' OR  nickname like '%".$x[0]."' OR nickname like '".$x[0]."%' ")){
		}else{
			$out[0]="ERR";
		}
		$pdom=null;
		echo json_encode($out);
	}
	function returnok($x){

		$out[0]="OK";
		echo json_encode($out);
	}
	function returnerr($x){
		$out[0]="ERR";
		echo json_encode($out);
	}
	//檢舉/刪除/搜長
	function reactions($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			if($x[2]=="1"){ //檢舉
				if($t=share_gettable($pdod,"report WHERE retype='".$x[3]."' AND reid='".$x[4]."'")){
					$out[0]="ERR";
					//$out[1]="資料已經紀錄,會有專人進一步了解,謝謝";
					$out[1]="您的檢舉已送出，將會由專人處理，謝謝！";//20190904 Pman 客戶要求修改
				}else{
					share_insert($pdod,"report","retype,reid,memberid,reason","'".$x[3]."','".$x[4]."','".$_SESSION['userid']."','".$x[5]."'");
					$out[0]="ERR";
					//$out[1]="資料已經紀錄,會有專人進一步了解,謝謝";
					$out[1]="您的檢舉已送出，將會由專人處理，謝謝！";//20190904 Pman 客戶要求修改
				}
				if($tx=share_gettable($pdod,"block_ WHERE retype='".$x[3]."' AND memberid='".$_SESSION['userid']."' AND reid='".$x[4]."'")){
				}else{
					share_insert($pdod,"block_","retype,reid,memberid","'".$x[3]."','".$x[4]."','".$_SESSION['userid']."'");
				}
			}else if($x[2]=="2"){ //收藏
				if($x[3]=="wall"){
					$tempa=share_getinfo($pdod,"wall","thisid",$x[4]);
					if($x=share_gettable($pdod,"arc_ WHERE memberid='".$_SESSION['userid']."' AND atype='wall' AND contentid='".$tempa['contentid']."'")){//已存在
						$out[0]="ERR";
						//$out[1]="已收藏過,謝謝";
						$out[1]="已重複收藏";//20190904 Pman 客戶要求修改
					}else{
						if($tempa['memberid']==$_SESSION['userid']){
							$out[0]="ERR";
							//$out[1]="不能收藏自己";
							$out[1]="無法收藏自己的文章"; //20190904 Pman 客戶要求修改
						}else if($_SESSION['isver'] !=1){
							$out[0]="ERR";
							$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
						}else{
							//加扣點
							$pmi=get_point(14);
							$ppl=get_point(15);
							if(add_point($_SESSION['userid'],$pmi,'016',"收藏扣貢獻值",$x[4])){//20190107 Pman 將「點」==>「貢獻值」
								add_point($tempa['memberid'],$ppl,'017',"收藏加貢獻值",$x[4]);//20190107 Pman 將「點」==>「貢獻值」
								$tempb=share_getinfo($pdod,"con_","thisid",$tempa['contentid']);
								if($tempb['typeid']=="4"){
									$tempc=share_getinfo($pdod,"art_","contentid",$tempa['contentid']);
									share_insert($pdod,"arc_","memberid,fromid,contentid,atype,thistitle,thiscontent,thisfile,gameid","'".$_SESSION['userid']."','".$tempc['memberid']."','".$tempc['contentid']."','article','".$tempc['thistitle']."','".$tempc['thiscontent']."','".$tempc['thisfile']."','".$tempc['gamid']."'");
								}else{
									share_insert($pdod,"arc_","memberid,fromid,contentid,atype,typeid,thiscontent,gameid","'".$_SESSION['userid']."','".$tempa['memberid']."','".$tempa['contentid']."','wall','".$tempb['typeid']."','".$tempb['thiscontent']."','".$tempa['gamid']."'");
								}
								$out[0]="OK";
							}else{
								$out[0]="ERR";
								$out[1]="貢獻值不足";//20190107 Pman 將「點」==>「貢獻值」
							}
						}
					}
				}else if($x[3]=="article"){
					$tempa=share_getinfo($pdod,"art_","thisid",$x[4]);
					if($x=share_gettable($pdod,"arc_ WHERE memberid='".$_SESSION['userid']."' AND atype='article'  AND contentid='".$tempa['contentid']."'")){//已存在
						$out[0]="ERR";
						//$out[1]="已收藏過,謝謝";
						$out[1]="已重複收藏";//20190904 Pman 客戶要求修改
					}else if($_SESSION['isver'] !=1){
							$out[0]="ERR";
							$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
					}else{
						if($tempa['memberid']==$_SESSION['userid']){
							$out[0]="ERR";
							//$out[1]="不能收藏自己";
							$out[1]="無法收藏自己的文章";	//20190904 Pman 客戶要求修改
						}else{
							//加扣點
							$pmi=get_point(14);
							$ppl=get_point(15);
							if(add_point($_SESSION['userid'],$pmi,'016',"收藏支出",$x[4])){
								//add_point($m['memberid'],$ppl,'017',"收藏收入",$x[4]);
								add_point($tempa['memberid'],$ppl,'017',"收藏收入",$x[4]); //20190426 Pman 修正收藏給點紀錄裡，ID為0問題
								share_insert($pdod,"arc_","memberid,fromid,contentid,atype,thistitle,thiscontent,thisfile,gameid","'".$_SESSION['userid']."','".$tempa['memberid']."','".$tempa['contentid']."','article','".$tempa['thistitle']."','".$tempa['thiscontent']."','".$tempa['thisfile']."','".$tempa['gameid']."'");
								$out[0]="OK";
							}else{
								$out[0]="ERR";
								$out[1]="貢獻值不足";//20190107 Pman 將「點」==>「貢獻值」
							}
						}
					}
				}
				$pdod=NULL;
				$pdom=NULL;
			}else if($x[2]=="3"){ //刪除
				if($x[3]=="qna"){//這個應該只有管理者可以刪除   刪除自己(qna_)==>刪除回應(qrep_
						$t=share_getinfo($pdod,"qna_","thisid",$x[4]);
						if($t && $t['memberid']==$_SESSION['userid']){
							//檢查有沒有回應
							$tem=share_getcount($pdod,"qrep_ WHERE contentid='".$x[4]."'");
							if($tem>0){
								$flag=2;
								$out[0]="ERR";
								$out[1]="已有回答無法刪除";
							}else if($_SESSION['isver']!=1){
								$out[0]="ERR";
								$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
							}else{
								$flag=1;
								add_point($_SESSION['userid'],$t['points'],'015',"QA最佳解答修改刪除貢獻值",$x[4]);//20190107 Pman 將「點」==>「貢獻值」
								share_del($pdod,"qna_ WHERE thisid='".$x[4]."'");
								$out[0]="OK";
							}
						}else{
								$out[0]="ERR";
								$out[1]="問題已不存在";
						}
				}else{
					$flag=0;
					if($x[3]=="wall"){//卻認為自己-->回找contentid==>刪除 wall(wall)==>(如果content沒有type)==>刪除content(con_)==> 刪除 回應(rep_)
						$t=share_getinfo($pdod,"wall","thisid",$x[4]);
						if($t['memberid']==$_SESSION['userid']){
							$flag=1;
							share_del($pdod,"wall WHERE thisid='".$x[4]."'");
							$c=share_getinfo($pdod,"con_","thisid",$t['contentid']);
							if($c['typeid']=="0"){
								share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
								share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
							}
						}
					}else if($x[3]=="wallreply"){//卻認為自己-->回找contentid==>刪除 wall(wall)==>(如果content沒有type)==>刪除content(con_)==> 刪除 回應(rep_)
						$t=share_getinfo($pdod,"rep_","thisid",$x[4]);
						if($t['memberid']==$_SESSION['userid']){
							$flag=1;
						share_del($pdod,"rep_ WHERE thisid='".$x[4]."'");}
					}else if($x[3]=="article"){//卻認為自己-->回找contentid==>刪除文章(art_)==>刪除 wall(wall) with contentid==>刪除content(con_) 刪除 回應(rep_)
						$t=share_getinfo($pdod,"art_","thisid",$x[4]);
						if($t['memberid']==$_SESSION['userid']){
							$flag=1;
							share_del($pdod,"art_ WHERE thisid='".$x[4]."'");
							share_del($pdod,"wall WHERE contentid='".$t['contentid']."'");
							share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
							share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
						}
					}else if($x[3]=="pho"){//卻認為自己-->回找contentid(如果有)==>刪除圖片(pho_)==>刪除 wall(wall)(如果有) with contentid==>刪除content(con_) 刪除 回應(rep_)
						$t=share_getinfo($pdod,"pho_","thisid",$x[4]);
						if($t['memberid']==$_SESSION['userid']){
							$flag=1;
							share_del($pdod,"pho_ WHERE thisid='".$x[4]."'");
							if($t['contentid']){
								share_del($pdod,"wall WHERE contentid='".$t['contentid']."'");
								share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
								share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
							}
						}
					}else if($x[3]=="alb"){//卻認為自己-->回找contentid==>刪除圖片(pho_)(all)==>刪除相簿(alb_)==>刪除 wall(wall) with contentid==>刪除content(con_) 刪除 回應(rep_)
						$t=share_getinfo($pdod,"alb_","thisid",$x[4]);
						if($t['memberid']==$_SESSION['userid']){
							$flag=1;
							share_del($pdod,"alb_ WHERE thisid='".$x[4]."'");
							share_del($pdod,"pho_ WHERE albid='".$x[4]."'");
							share_del($pdod,"wall WHERE contentid='".$t['contentid']."'");
							share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
							share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
						}
					}else if($x[3]=="vid"){//卻認為自己-->回找contentid==>刪除圖片(pho_)==>刪除 wall(wall) with contentid==>刪除content(con_) 刪除 回應(rep_)
						$t=share_getinfo($pdod,"vid_","thisid",$x[4]);
						if($t['memberid']==$_SESSION['userid']){
							$flag=1;
							share_del($pdod,"vid_ WHERE thisid='".$x[4]."'");
							share_del($pdod,"wall WHERE contentid='".$t['contentid']."'");
							share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
							share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
						}
					}else if($x[3]=="arc"){
						$flag=1;
						share_del($pdod,"arc_ WHERE thisid='".$x[4]."'");
					}
					if($flag==0){
						$out[0]="ERR";
						$out[1]="權限錯誤,無法使用";
					}else if($flag==1){
						$out[0]="OK";
					}
				}
			}
			$pdod=NULL;
			$pdom=NULL;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//抓取圖片
	function getpics($x){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($x[2] && $x[2]=="video" && $t=share_getinfo($pdod,"vid_","thisid",$x[1])){
			$tb=share_gettable($pdod,"vid_ WHERE memberid='".$t['memberid']."' order by thisid");
			$me=0;
			for($a=0;$a<count($tb);$a++){
				if($tb[$a]['thisid']==$x[1]){
					$me=$a;
				}
			}
			$out[0]="VIDEO";
			$out[1]=$tb[$me]['thisfile'];
			if($me>0){
				$out[2]=$tb[($me-1)]['thisid'];
			}
			if($me<count($tb)){
				$out[3]=$tb[($me+1)]['thisid'];
			}
		}else if($t=share_getinfo($pdod,"pho_","thisid",$x[1])){
			if($t['albid']){
				$tt=share_getinfo($pdod,"alb_","thisid",$t['albid']);
				//檢查全縣
				$pass=0;
				if($tt['opentype']==1){
					$pass=1;
				}else if($tt['opentype']==2){
					if($_SESSION['userid']==$tt['memberid']){
						$pass=1;
					}else if($temp=share_gettable($pdod,"friend_ WHERE ispass='1' AND ((friendid='".$tt['memberid']."' AND memberid='".$_SESSION['userid']."') OR (friendid='".$_SESSION['userid']."' AND memberid='".$tt['memberid']."'))")){
						$pass=1;
					}
				}else if($tt['opentype']==3 && $_SESSION['userid']==$tt['memberid']){
					$pass=1;
				}
				if($pass==1){
					if($tt['isdefault']=="1"){
						$tb=share_gettable($pdod,"pho_ WHERE memberid='".$t['memberid']."' AND (albid='' OR albid is null OR albid in (SELECT thisid FROM alb_ WHERE memberid='".$t['memberid']."' AND isdefault=1)) order by thisid ");
					}else{
						$tb=share_gettable($pdod,"pho_ WHERE albid='".$t['albid']."' order by thisid");
					}
					$me=0;
					for($a=0;$a<count($tb);$a++){
						if($tb[$a]['thisid']==$x[1]){
							$me=$a;
						}
					}
					$out[0]="ALBPHO";
					$out[1]=$tb[$me]['thisfile'];
					if($me>0){
						$out[2]=$tb[($me-1)]['thisid'];
					}
					if($me<count($tb)){
						$out[3]=$tb[($me+1)]['thisid'];
					}
				}else{
					$out[0]="ERR";
				}

			}else{//這是舊的..以後用不到了
				$tb=share_gettable($pdod,"pho_ WHERE memberid='".$t['memberid']."' AND (albid='' OR albid is null OR albid in (SELECT thisid FROM alb_ WHERE memberid='".$t['memberid']."' AND isdefault=1)) order by thisid");
				$me=0;
				for($a=0;$a<count($tb);$a++){
					if($tb[$a]['thisid']==$x[1]){
						$me=$a;
					}
				}
				$out[0]="PHO";
				$out[1]=$tb[$me]['thisfile'];
				if($me>0){
					$out[2]=$tb[($me-1)]['thisid'];
				}
				if($me<count($tb)){
					$out[3]=$tb[($me+1)]['thisid'];
				}
			}
		}else{
			$out[0]="ERR";
		}
		$pdod=null;
		echo json_encode($out);
	}
	//個人資料顯示
	function show_mypagebase($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		if($t=share_getinfo($pdom,"mem_","memberid",$x[0])){
			$out[0]="OK";
			$out[1]['frontpic']=$t['frontpic'];
			//檢查是否是朋友
			//查看是否可以加朋友
			if($temp=share_gettable($pdom,$conf['dbname_d'].".friend_ WHERE (friendid='".$x[0]."' AND memberid='".$_SESSION['userid']."') OR (friendid='".$_SESSION['userid']."' AND memberid='".$x[0]."')")){
				$out[1]['addfriend']=2;
			}else{
				$out[1]['addfriend']=1;
			}
		}else{
			$out[0]="ERR";
		}
		$pdom=null;
		echo json_encode($out);
	}
	function show_mypage1($x){
		global $conf;
		global $horo1,$horo2,$horon;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($t=share_getinfo($pdom,"mem_","memberid",$x[0])){
			$out[0]="OK";
			$out[1]['id']=$x[0];
			$out[1]['showid']=10000000000000+$x[0]*13;
			$out[1]['name']=$t['nickname'];
			$out[1]['score']=$t['score'];
			$out[1]['headpic']=$t['headpic'];
			if($t['gender_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['gender']=$t['gender'];
			}
			if($t['birthday_v']==1 || $_SESSION['userid']==$x[0]){
				$ts1=strtotime($t['birthday']);
				$ts2=time();
				$out[1]['birthday']=floor(($ts2-$ts1)/(3600*24*365));
			}
			if($t['horo_v']==1 || $_SESSION['userid']==$x[0]){
				$myd=date(z,strtotime($t['birthday']));
				$myh="";
				if(date('z',strtotime(date('Y',strtotime($t['birthday'])).'-3-1'))==59){
					$horo=$horo1;
				}else{
					$horo=$horo2;
				}
				for($a=0;$a<count($horo);$a++){
					if($myd>$horo[$a]){
						$myh=$horon[$a];
					}
				}
				$out[1]['horo']=$myh;
			}
			$out[1]['rank_v']=$t['rank_v'];
			$out[1]['level_v']=$t['level_v'];
			if(($t['game1_v']==1 || $_SESSION['userid']==$x[0]) && $t['game1']>0 ){
				$out[1]['game1']=$t['game1'];
				$out[1]['game1note']=$t['game1note'];
			}
			if(($t['game2_v']==1 || $_SESSION['userid']==$x[0]) && $t['game2']>0 ){
				$out[1]['game2']=$t['game2'];
				$out[1]['game2note']=$t['game2note'];
			}
			if(($t['game3_v']==1 || $_SESSION['userid']==$x[0]) && $t['game3']>0 ){
				$out[1]['game3']=$t['game3'];
				$out[1]['game3note']=$t['game3note'];
			}
			if($t['location_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['location']=$t['location'];
			}
			if($t['gt_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['gtid']=$t['gtid'];
			}
			$out[1]['friendcount']=share_getcount($pdom,"mem_ WHERE (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$x[0]."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$x[0]."'  AND ispass=1))");
			$temp=share_gettable($pdom,"mem_ WHERE (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$x[0]."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$x[0]."'  AND ispass=1)) limit 9");
			if($temp){
				for($a=0;$a<count($temp);$a++){
					$out[1]['friends'][$a]['uid']=$temp[$a]['memberid'];
					$out[1]['friends'][$a]['name']=$temp[$a]['nickname'];
					$out[1]['friends'][$a]['headpic']=$temp[$a]['headpic'];
				}
			}else{
				$out[1]['friends']="";
			}
			$out[1]['photocount']=share_getcount($pdod,"pho_ WHERE memberid='".$x[0]."'");
			$temp=share_gettable($pdod,"pho_ WHERE memberid='".$x[0]."' order by thisid DESC limit 9");
			if($temp){
				for($a=0;$a<count($temp);$a++){
					$out[1]['photos'][$a]['thisid']=$temp[$a]['thisid'];
					$out[1]['photos'][$a]['thisfile']=$temp[$a]['thisfile'];
				}
			}else{
				$out[1]['photos']="";
			}
		}else{
			$out[0]="ERR";
		}
		$pdos=null;
		echo json_encode($out);
	}
	function show_mypage2($x){
		global $conf;
		global $horo1,$horo2,$horon;
                $out = array();
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($t=share_getinfo($pdom,"mem_","memberid",$x[0])){
			if($t['refurl']){
			}else{
				$temp=getgurl("http://".$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));
				$mt=json_decode($temp);
				$t['refurl']=$mt->id;
				share_update($pdom,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
			}
			$out[0]="OK";
                        $out[1] = array();
			$out[1]['id']=$x[0];
			$out[1]['showid']=10000000000000+$x[0]*13;
			$out[1]['name']=$t['nickname'];
			$out[1]['email']=$t['email'];
			$out[1]['score']=$t['score'];
			$out[1]['headpic']=$t['headpic'];
			if($t['email_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['email']=$t['email'];
			}
			if($_SESSION['userid']==$x[0]){
				$out[1]['pass']=$t['password'];
			}
			if($t['gender_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['gender']=$t['gender'];
			}
			if($t['birthday_v']==1 || $_SESSION['userid']==$x[0]){
				//$ts1=strtotime($t['birthday']);
				//$ts2=time();
				//$out[1]['birthday']=floor(($ts2-$ts1)/(3600*24*365));
				$out[1]['birthday']=$t['birthday'];
			}
			if($t['horo_v']==1 || $_SESSION['userid']==$x[0]){
				$myd=date(z,strtotime($t['birthday']));
				$myh="";
				if(date(z,strtotime(date('Y',strtotime($t['birthday'])).'-3-1'))==59){
					$horo=$horo1;
				}else{
					$horo=$horo2;
				}
				for($a=0;$a<count($horo);$a++){
					if($myd>$horo[$a]){
						$myh=$horon[$a];
					}
				}
				$out[1]['horo']=$myh;
			}
			$out[1]['rank_v']=$t['rank_v'];
			$out[1]['level_v']=$t['level_v'];
			if(($t['game1_v']==1 || $_SESSION['userid']==$x[0]) && $t['game1']>0 ){
				$out[1]['game1']=$t['game1'];
				$out[1]['game1note']=$t['game1note'];
			}
			if(($t['game2_v']==1 || $_SESSION['userid']==$x[0]) && $t['game2']>0 ){
				$out[1]['game2']=$t['game2'];
				$out[1]['game2note']=$t['game2note'];
			}
			if(($t['game3_v']==1 || $_SESSION['userid']==$x[0]) && $t['game3']>0 ){
				$out[1]['game3']=$t['game3'];
				$out[1]['game3note']=$t['game3note'];
			}
			if($t['location_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['location']=$t['location'];
			}
			if($t['gt_v']==1 || $_SESSION['userid']==$x[0]){
				$out[1]['gtid']=$t['gtid'];
			}
			if($_SESSION['userid']==$x[0]){
				$td=date("Y-m-d");
				$ld=date("Y-m-d", mktime(0, 0, 0, date("m")-1, 1));
				$allc=share_getfree($pdom,"select count(*) as CC FROM reflist where refid='".(10000000000000+$x[0]*13)."' AND (memberid-10000000000000)/13 in (select memberid FROM mem_ WHERE phonev='1')");
				$tc=share_getfree($pdom,"select count(*) as CC FROM reflist where CreateDate>='".$td."' AND refid='".(10000000000000+$x[0]*13)."' AND (memberid-10000000000000)/13 in (select memberid FROM mem_ WHERE phonev='1')");
				$lc=share_getfree($pdom,"select count(*) as CC FROM reflist where CreateDate<'".$td."' AND CreateDate>='".$ld."' AND refid='".(10000000000000+$x[0]*13)."' AND (memberid-10000000000000)/13 in (select memberid FROM mem_ WHERE phonev='1')");
				$out[1]['refurl']=$t['refurl'];
				$out[1]['allc']=$allc[0]['CC'];
				$out[1]['tc']=$tc[0]['CC'];
				$out[1]['lc']=$lc[0]['CC'];
				$out[1]['phonenum']=$t['phonenum'];
			}
		}else{
			$out[0]="ERR";
		}

		$pdos=null;
		echo json_encode($out);
	}
	function show_mypage3($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$out=array();
		$cnt=0;
		$perpage=9;
		if($x[6]){
			$stag=0;
			for($a=0;$a<count($x[6]);$a++){
				if($x[6][$a]['show']==1){
					if($x[6][$a]['gameid']=="999999"){//全部看是開的
						$stag=1;
					}
				}
			}
			if($stag==0){
				for($a=0;$a<count($x[6]);$a++){
					if($x[6][$a]['show']==1){
						if($ins){
							if($x[6][$a]['gameid']=="999999"){
							}else{
								$insx.=" AND gameid <>'".$x[6][$a]['gameid']."'";
							}
						}else{
							if($x[6][$a]['gameid']=="999999"){
							}else{
								$insx="gameid <>'".$x[6][$a]['gameid']."'";
							}
						}
					}
				}
			}
		}else{//沒有任何登入資料...等同全部看
			$stag=1;
		}
		if($stag==1){
			$ins=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
		}else{
			$ins=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1 AND ".$insx.") ";
		}
		if($_SESSION['userid']==$x[0]){
			$ins="";
		}
		$ins="";//工略創作其實沒有藏tag
		if($x[1]==1){//正搞
			if($x[3]>1){//從id
				$cnt=share_getcount($pdod,"art_ WHERE isopen=1  AND memberid='".$x[0]."' ".$ins."");
				$list=share_gettable($pdod,"art_ WHERE isopen=1 AND memberid='".$x[0]."'".$ins." order by thisid DESC limit ".($x[3]-1)*$perpage.",".$perpage);
			}else{//從頭
				$cnt=share_getcount($pdod,"art_ WHERE isopen=1  AND memberid='".$x[0]."' ".$ins."");
				$list=share_gettable($pdod,"art_ WHERE  isopen=1  AND memberid='".$x[0]."' ".$ins."  order by thisid DESC limit 9" );
			}
		}else{//草稿
			if($x[3]>1){//從id
				$cnt=share_getcount($pdod,"art_ WHERE isopen=2  AND memberid='".$x[0]."' ".$ins."");
				$list=share_gettable($pdod,"art_ WHERE isopen=2 AND memberid='".$x[0]."' ".$ins." order by thisid DESC limit ".($x[3]-1)*$perpage.",".$perpage);
			}else{//從頭
				$cnt=share_getcount($pdod,"art_ WHERE isopen=2  AND memberid='".$x[0]."' ".$ins."");
				$list=share_gettable($pdod,"art_ WHERE  isopen=2  AND memberid='".$x[0]."' ".$ins." order by thisid DESC limit 9" );
			}
		}
		if($list){
			$a=0;
			$listb=array();
			foreach($list as $t){
                            if(isset($listb[$a]) == false) {
                                $listb[$a] = array();
                            }
				if($ta=share_getcountid($pdod,"rep_","contentid",$t['contentid'])){
				}else{
					$ta=0;
				}
				if($tb=share_getinfo($pdod,"con_","thisid",$t['contentid'])){
					$listb[$a]['likes']=$tb['points'];
					$listb[$a]['name']=share_getinfo($pdom,"mem_","memberid",$tb['memberid'])['nickname'];
				}else{
					$listb[$a]['likes']=0;
					$listb[$a]['name']="NA";
				}
				if($tx=share_getcount($pdod,"arc_ WHERE atype='article' AND contentid='".$t['contentid']."'")){
					$listb[$a]['saves']=$tx;
				}else{
					$listb[$a]['saves']=0;
				}
				$listb[$a]['memberid']=$tb['memberid'];
				$listb[$a]['thisid']=$t['thisid'];
				$listb[$a]['thisfile']=$t['thisfile'];
				$listb[$a]['thistitle']=$t['thistitle'];
				$listb[$a]['reply']=$ta;
				$listb[$a]['contentid']=$t['contentid'];
				$a++;
			}
			$out[0]="OK";
			$out[1]=$listb;
			$out[2]=$cnt;
		}else{
			$out[0]="ERR";
			$out[1]="目前沒有資料";
		}
		$pdos=null;
		echo json_encode($out);
	}
	//取出朋友名單
	function show_mypage4($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$out[0]="OK";
		$temp=share_gettable($pdom,"mem_ WHERE memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$x[0]."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$x[0]."'  AND ispass=1)");
		if($temp){
			for($a=0;$a<count($temp);$a++){
				$out[1][$a]=unsetmem($temp[$a]);
				$out[1][$a]['uid']=$temp[$a]['memberid'];
			}
		}else{
			$out[1]="";
		}
		if($_SESSION['userid']){
			$temp2=share_gettable($pdom,"mem_ WHERE memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'  AND ispass=1)");
			if($temp2){
				for($a=0;$a<count($temp2);$a++){
					$out[2][$a]['uid']=$temp2[$a]['memberid'];
				}
			}
		}
		$pdom=null;
		echo json_encode($out);
	}
	//取出count
	function show_mypage5c($x){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$out[0]="OK";
		$out[1]=share_getcount($pdod,"pho_ WHERE memberid='".$x[0]."'  AND (albid='' OR albid is null OR albid in (SELECT thisid FROM alb_ WHERE memberid='".$x[0]."' AND isdefault=1))");
		if($_SESSION['userid']==$x[0]){//自己的
			$out[2]=share_getcount($pdod,"alb_ WHERE memberid='".$x[0]."' AND isdefault='0'");
		}else{
			if($f=share_gettable($pdod,"friend_ WHERE (friendid='".$x[0]."' AND memberid='".$_SESSION['userid']."' AND ispass=1) OR (friendid='".$_SESSION['userid']."' AND memberid='".$x[0]."' AND ispass=1)")){
				$out[2]=share_getcount($pdod,"alb_ WHERE memberid='".$x[0]."' AND isdefault='0'  AND opentype<>'3'");
			}else{
				$out[2]=share_getcount($pdod,"alb_ WHERE memberid='".$x[0]."' AND isdefault='0'  AND opentype='1'");
			}
		}
		$out[3]=share_getcount($pdod,"vid_ WHERE memberid='".$x[0]."' ");
		$pdod=null;
		echo json_encode($out);
	}
	//取出照片列表
	function show_mypage5($x){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($x[1]=="1"){
			$out[1]=share_gettable($pdod,"pho_ WHERE memberid='".$x[0]."'  AND (albid='' OR albid is null OR albid in (SELECT thisid FROM alb_ WHERE memberid='".$x[0]."' AND isdefault=1)) order by thisid");
		}else if($x[1]=="2"){
			$a=0;
			//這裡要加判斷類別
			if($_SESSION['userid']==$x[0]){//自己的
				$temp=share_gettable($pdod,"alb_ WHERE memberid='".$x[0]."' AND isdefault<>'1' AND isdefault<>'9' ");
			}else{
				//檢查是否是好友
				//是朋友
				if($f=share_gettable($pdod,"friend_ WHERE (friendid='".$x[0]."' AND memberid='".$_SESSION['userid']."' AND ispass=1) OR (friendid='".$_SESSION['userid']."' AND memberid='".$x[0]."' AND ispass=1)")){
					$temp=share_gettable($pdod,"alb_ WHERE memberid='".$x[0]."' AND isdefault<>'1' AND isdefault<>'9' AND opentype<>'3' "); //非本人所有的
				}
				//非朋友
				else{
					$temp=share_gettable($pdod,"alb_ WHERE memberid='".$x[0]."' AND isdefault<>'1' AND isdefault<>'9' AND opentype='1'"); //只有公開的
				}
			}
			foreach($temp as $t){
				$out[1][$a]['id']=$t['thisid'];
				$out[1][$a]['cnt']=share_getcount($pdod,"pho_ WHERE albid='".$t['thisid']."'");
				$out[1][$a]['thisname']=$t['thisname'];
				$tb=share_gettable($pdod,"pho_ WHERE albid='".$t['thisid']."' order by thisid limit 1");
				$out[1][$a]['thisfile']=$tb[0]['thisfile'];
				$a++;
			}
		}else if($x[1]=="3"){
			$out[1]=share_gettable($pdod,"vid_ WHERE memberid='".$x[0]."'");
		}
		$out[0]="OK";
		$pdod=null;
		echo json_encode($out);
	}
	//取得相簿的內容
	function show_mypage5alb($x){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$out[0]="OK";
		$temp=share_getinfo($pdod,"alb_","thisid",$x[0]);
		//這裡要加判斷類別
		if($_SESSION['userid']==$temp['memberid']){//自己的
			$out[1]=$temp;
		}else{
			if($temp['opentype']==1){
				$out[1]=$temp;
			}else if($temp['opentype']==2){
				if($f=share_gettable($pdod,"friend_ WHERE (friendid='".$temp['memberid']."' AND memberid='".$_SESSION['userid']."' AND ispass=1) OR (friendid='".$_SESSION['userid']."' AND memberid='".$temp['memberid']."' AND ispass=1)")){
					$out[1]=$temp;
				}else{
					$out[0]="ERR";
					$out[1]="你無權限看此相簿";
				}
			}else{
				$out[0]="ERR";
				$out[1]="你無權限看此相簿";
			}
		}
		//$out[1]=share_getinfo($pdod,"alb_","thisid",$x[0]);
		if($out[0]=="OK"){
			$out[1]['pho']=share_gettable($pdod,"pho_ WHERE  albid='".$x[0]."'");
		}
		$pdod=null;
		echo json_encode($out);
	}
	//取得單一照片資料
	function get_myphotoid($x){
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$temp=share_getinfo($pdod,"pho_","thisfile",$x[2]);
			$out['thisfile']=$temp['thisfile'];
			$out['thisid']=$temp['thisid'];
			$out['albid']=$temp['albid'];
			$pdod=null;
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}
	//qa板
	function get_myphotoidq($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$temp=share_getinfo($pdod,"phoq_","thisfile",$x[2]);
			$out['thisfile']=$temp['thisfile'];
			$out['thisid']=$temp['thisid'];
			$out['albid']=$temp['albid'];
			$pdod=null;
		}else{
			$out[0]="ERR";
		}

		echo json_encode($out);
	}

	//更變顯示方式
	function change_myshow($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$type="";
			if($x[2]=="email"){
				$type="email_v";
			}else if($x[2]=="sex"){
				$type="gender_v";
			}else if($x[2]=="birth"){
				$type="birthday_v";
			}else if($x[2]=="horo"){
				$type="horo_v";
			}else if($x[2]=="rank"){
				$type="rank_v";
			}else if($x[2]=="level"){
				$type="level_v";
			}else if($x[2]=="game1"){
				$type="game1_v";
			}else if($x[2]=="game2"){
				$type="game2_v";
			}else if($x[2]=="game3"){
				$type="game3_v";
			}else if($x[2]=="time"){
				$type="gt_v";
			}else if($x[2]=="location"){
				$type="location_v";
			}
			$m="";
			if($x[3]=="y"){
				$m="1";
			}else{
				$m="0";
			}
			share_update($pdom,"mem_",$type."='".$m."'","memberid='".$_SESSION['userid']."'");
			$out[0]="OK";
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//更變個人資料
	function update_myshow($x){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$type="";
			$out[0]="OK";
			if($x[2]=="pass"){
				$type="password='".$x[3]."'";
				$out[1]=$x[3];
				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
			}else if($x[2]=="sex"){
				$type="gender='".$x[3]."'";
				if($x[3]=="1"){
					$out[1]="男";
				}else{
					$out[1]="女";
				}
				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
			}else if($x[2]=="birth"){
				$type="birthday='".$x[3]."'";
				$out[1]=$x[3];
				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
			}
			//暱稱不能修改了
//			else if($x[2]=="name"){
//				$type="nickname='".$x[3]."'";
//				$out[1]=$x[3];
//				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
//			}
			else if($x[2]=="time"){
				$type="gtid='".$x[3]."'";
				$temp=share_getinfo($pdom,"gtime","thisid",$x[3]);
				$out[1]=$temp['gtname'];
				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
			}else if($x[2]=="location"){
				$type="location='".$x[3]."'";
				$temp=share_getinfo($pdom,"location","thisid",$x[3]);
				$out[1]=$temp['thisname'];
				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
			}else if($x[2]=="egame1"){
				if(mb_strwidth($x[3])>60){
					$out[0]="ERR";
					$out[1]="備註字數限制：３０中文或６０英文";
				}else{
					$out[1]=$x[3];
					$type="game1note='".$x[3]."'";
					share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
				}
			}else if($x[2]=="egame2"){
				if(mb_strwidth($x[3])>60){
					$out[0]="ERR";
					$out[1]="備註字數限制：３０中文或６０英文";
				}else{
					$out[1]=$x[3];
					$type="game2note='".$x[3]."'";
					share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
				}
			}else if($x[2]=="egame3"){
				if(mb_strwidth($x[3])>60){
					$out[0]="ERR";
					$out[1]="備註字數限制：３０中文或６０英文";
				}else{
					$out[1]=$x[3];
					$type="game3note='".$x[3]."'";
					share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
				}
			}else if($x[2]=="addgame"){
				$temp=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
				$t=0;
				$ext=0;
				for($a=1;$a<=3;$a++){
					if($temp['game'.$a]){
						if($temp['game'.$a]==$x[3]){
							$ext=1;
						}
						$t=$a;
					}
				}
				if($t>=3){//已經滿了
					$out[0]="ERR";
					$out[1]="最多只能選擇３個遊戲";
				}else if($ext==1){//重複
					$out[0]="ERR";
					$out[1]="重複的選擇";
				}else if(mb_strwidth($x[4])>60  ){//寬度
					$out[0]="ERR";
					$out[1]="備註字數限制：３０中文或６０英文";
				}else{//新增game
					$out[0]="OK";
					addgamerank($x[3]);
					$type="game".($t+1)."='".$x[3]."', game".($t+1)."note='".$x[4]."',game".($t+1)."_v='1'";
					share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
					$tempx=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
					$b=0;
					for($a=1;$a<=3;$a++){
						if($tempx['game'.$a]){
							$out[1][$b]['gameid']=$tempx['game'.$a];
							$out[1][$b]['gamenote']=$tempx['game'.$a."note"];
							$out[1][$b]['game_v']=$tempx['game'.$a."_v"];
							$b++;
						}
					}
				}
			}else if($x[2]=="gamedel"){
				$type="";
				$tempa=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
				$t="";
				$tb=1;
				for($a=1;$a<4;$a++){
					if($x[3]=="game".$a || $tempa["game".$a]==0 || $tempa["game".$a]==null){
					}else{
						if($type){
							$type.=",game".$tb."='".$tempa["game".$a]."',game".$tb."_v='".$tempa["game".$a."_v"]."',game".$tb."note='".$tempa["game".$a."note"]."'";
						}else{
							$type="game".$tb."='".$tempa["game".$a]."',game".$tb."_v='".$tempa["game".$a."_v"]."',game".$tb."note='".$tempa["game".$a."note"]."'";
						}
						$tb++;
					}
				}
				for($a=$tb;$a<4;$a++){
						if($type){
							$type.=",game".$tb."=null,game".$tb."_v=null,game".$tb."note=null";
						}else{
							$type="game".$tb."=null,game".$tb."_v=null,game".$tb."note=null";
						}
				}
				share_update($pdom,"mem_",$type,"memberid='".$_SESSION['userid']."'");
				$tempx=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
				$b=0;
				$out[0]="OK";
				$out[1]=[];
				for($a=1;$a<=3;$a++){
					if($tempx['game'.$a]){
						$out[1][$b]['gameid']=$tempx['game'.$a];
						$out[1][$b]['gamenote']=$tempx['game'.$a."note"];
						$out[1][$b]['game_v']=$tempx['game'.$a."_v"];
						$b++;
					}
				}
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}

	//活動專區
	function getcatpage($x){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		if($t=share_gettable($pdod,"news")){
			$out[0]="OK";
			$out[1]=$t[0];
			$out[1]['newscontent']=share_tranmice($t[0]['newscontent']);
		}else{
			$out[0]="ERR";
		}
		$pdos=null;
		echo json_encode($out);
	}
	//商店相關
	function getcats($x){
		global $conf;
                $out=array();
		$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
		$pdos -> exec("set names ".$conf['db_encode']);
		if($t=share_gettable($pdos,"cat_ WHERE isopen='1' ORDER BY sorting DESC")){ //20190719 Pman 修正商品分類排序無效的問題
			$out[0]="OK";
			$out[1]=$t;
			for($a=0;$a<count($t);$a++){
				$filename="img/product/cat".$t[$a]["catid"].".jpg";
				if (file_exists($filename)) {
					$out[1][$a]['img']=1;
					list($width, $height) = getimagesize($filename);
					$out[1][$a]['w']=$width;
					$out[1][$a]['h']=$height;
				}else{
					$out[1][$a]['img']=2;
				}
			}
		}else{
			$out[0]="ERR";
		}
		$pdos=null;
		echo json_encode($out);
	}
	function  getproduct($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
			$pdos -> exec("set names ".$conf['db_encode']);
			if($t=share_getinfo($pdos,"pro_","productid",$x[2])){
				//查看是否有貨
				$openme=0;
				if($t['vir']=="1" && empty($t['virnumber'])){
					$nsd=share_getfree($pdos,"SELECT count(*) as CC FROM gift_".$t['productid']." WHERE memberid is null")[0]['CC'];
					if($nsd && $nsd>0){
						$openme=1;//有數量
					}
				}else{
					$openme=1;//算數量
				}
                                $ts = share_getinfo($pdos,"setting_","skey", "pointLimit");
				if($openme==1){
					//檢查限量
					//$lim=0;
					//if($t['lim']>0){
					//	$cnt=share_getfree($pdos,"SELECT count(*) as CC FROM ord_ WHERE memberid=".$_SESSION['userid'])[0]['CC'];
					//	if($cnt>$t['lim']){
					//		$lim=1;
					//	}
					//}
					//if($lim==1){
					//	$out[0]="ERR";
					//	$out[1]="對不起,您購買的數量已超過限制";
					//}else{
						$out[0]="OK";
						$out[1]=$t;
						$out[1]['pid']=$t['productid'];
						$out[1]['pname']=$t['productname'];
						$out[1]['lim']=$t['lim'];
						unset($out[1]['productid']);
						unset($out[1]['productname']);
						unset($out[1]['virnumber']);
						for($x=0;$x<count($out[1]);$x++){
							unset($out[1][$x]);
						}
						$tb=share_getinfo($pdos,"cat_","catid",$t['catid']);
						$out[1]['catname']=$tb['catname'];
                                                $out[1]['pointLimit']=isset($ts['sval']) ? $ts['sval'] : '-1';

					//}
				}else{
					$out[0]="ERR";
					$out[1]="缺貨中,無法購買";
				}

			}else{
				$out[0]="ERR";
				$out[1]="無法取得產品資訊";
			}
			$pdos=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	function saveorder($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
			$pdos -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			if($t=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid'])){
				//if($x[2]==$t['password']){
					if($p=share_getinfo($pdos,"pro_","productid",$x[3])){//1220 修改 表格位置
                                                $cate = share_getinfo($pdos, "cat_", "catid", $p["catid"]);
						$left=0;//檢查剩餘量
						$lim=0;//檢查限量
						$ema=0;
						if($p['lim']>0){
							$cnt=share_getfree($pdos,"SELECT count(*) as CC FROM ord_ WHERE memberid=".$_SESSION['userid']." AND productid='".$p['productid']."'")[0]['CC'];
							if($cnt>=$p['lim']){
								$lim=1;
							}
						}
						if($p['vir']=="1" && empty($p['virnumber'])){//獨立序號
							$nsd=share_getfree($pdos,"SELECT count(*) as CC FROM gift_".$p['productid']." WHERE memberid is null")[0]['CC'];
							if($nsd && $nsd>0){
								$left=1;//有數量
							}
						}else{
							if($p['qty']>0){
								$left=1;//有數量
							}
						}
						if($p['vir']=="1" && $x[6]==$x[8]){
							$ema=1;
						}
						if($_SESSION['isver']!=1){
							$out[0]="ERR";
							$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
						}else if($lim==1){
							$out[0]="ERR";
							$out[1]="對不起,您購買的數量已超過限制";
						}else if($left==0){
							$out[0]="ERR";
							$out[1]="商品數量不足";
						}/*else if($t['points']<$p['dispoints']){
							$out[0]="ERR";
							$out[1]="剩餘貢獻值不足";
                                                }*/else if($p['vir']=="1" && $ema==0){// $x[7] 在這裡空掉了
							$out[0]="ERR";
							$out[1]="Email地址不相同";
						}else{//開始結帳
							$id=rand(123,987).date('Yndhms').rand(123,987);
                                                        $r=false;
                                                        //if($cate['catname'] == '虛擬卡') {//若商品為虛擬卡則要準備金流
                                                        //所有商品加上歐付寶金流
                                                        $discount = isset($x[10]) ? $x[10] : 0;
                                                        $r=add_point($_SESSION['userid'],"-".$discount,$id,"製作配方",$x[3]);
                                                        //} else {
                                                            //$r=add_point($_SESSION['userid'],"-".$p['dispoints'],$id,"製作配方",$x[3]);
                                                        //}
							if($r){//最後一個改成商品號
								if($p['vir']=="1"){
									if($z=share_insert($pdos,"ord_","orderid,memberid,productid,dispoints,email,statusid,name,telephone","'".$id."','".$_SESSION['userid']."','".$x[3]."','".$p['dispoints']."','".$x[6]."','3','".$x[4]."','".$x[5]."'")){
										$ser="";
                                                                                $virnumber="";
										$sendmail=$x[6];
										if($p['virnumber']){//共用序號
											share_update($pdos,"pro_","qty=qty-1","productid='".$x[3]."'");
											$ser=$p['productname']."序號:".$p['virnumber']."<BR>";
                                                                                        $virnumber = $p['virnumber'];
										}else{
											$temp=share_getfree($pdos,"SELECT * FROM gift_".$p['productid']." WHERE memberid is null limit 1")[0];
											$temp2=share_update($pdos,"gift_".$p['productid'],"memberid='".$_SESSION['userid']."'","giftid='".$temp['giftid']."'");
											$ser=$p['productname']."序號:".$temp['giftcode']."<BR>";
                                                                                        $virnumber = $temp['giftcode'];
										}
										//寄信去給客人，改為付完款再寄出
                                                                                //sendmail(4,$sendmail,$ser);
										$out[0]="OK";
                                                                                //if($cate['catname'] == '虛擬卡') {
                                                                                //歐付寶的前置準備
                                                                                $_SESSION['orderid'] = $id;
                                                                                $_SESSION['product'] = $p;
                                                                                $discount = isset($x[10]) ? $x[10] : 0;
                                                                                $_SESSION['discount'] = $discount;
                                                                                $_SESSION['virnumber'] = $virnumber;

                                                                                share_update($pdos,"ord_","payment='opay'","orderid='$id'");
                                                                                share_update($pdos,"ord_","price=". $p['dispoints'],"orderid='$id'");
                                                                                share_update($pdos,"ord_","dispoints=". $discount,"orderid='$id'");
                                                                                share_update($pdos,"ord_","statusid=1","orderid='$id'");
                                                                                share_update($pdos,"ord_","note='$virnumber'","orderid='$id'");
                                                                                //}
									}else{
										$out[0]="ERR";
										$out[1]="訂單存入錯誤";
									}
								}else{
                                                                        if($z=share_insert($pdos,"ord_","orderid,memberid,productid,dispoints,name,email,telephone,address,ispick,note","'".$id."','".$_SESSION['userid']."','".$x[3]."','".$p['dispoints']."','".$x[4]."','".$x[8]."','".$x[5]."','".$x[6]."','".$x[7]."','".$x[9]."'")){
                                                                                //歐付寶的前置準備 start
                                                                                $_SESSION['orderid'] = $id;
                                                                                $_SESSION['product'] = $p;
                                                                                $discount = isset($x[10]) ? $x[10] : 0;
                                                                                $_SESSION['discount'] = $discount;

                                                                                share_update($pdos,"ord_","payment='opay'","orderid='$id'");
                                                                                share_update($pdos,"ord_","price=". $p['dispoints'],"orderid='$id'");
                                                                                share_update($pdos,"ord_","dispoints=". $discount,"orderid='$id'");
                                                                                share_update($pdos,"ord_","statusid=1","orderid='$id'");
                                                                                //歐付寶的前置準備 end

										share_update($pdos,"pro_","qty=qty-1","productid='".$x[3]."'");
										$out[0]="OK";
									}else{
										$out[0]="ERR";
										$out[1]="訂單存入錯誤";
									}
								}
							}else{
								$out[0]="ERR";
								$out[1]="扣貢獻值錯誤,請重新再試";//20190107 Pman 將「點」==>「貢獻值」
							}
						}
					}else{
						$out[0]="ERR";
						$out[1]="商品核對錯誤,請重新進入網頁";
					}
				//}else{
			//		$out[0]="ERR";
			//		$out[1]="密碼錯誤,請重新輸入";
			//	}
			}else{
				$out[0]="ERR";
				$out[1]="無法取得會員資料,請重新登入謝謝";
			}
			$pdos=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	// 朋友相關
	function get_friendbykey($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$out[0]="OK";
			$temp=share_gettable($pdom,"mem_ WHERE memberid<>'".$_SESSION['userid']."' AND (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_  WHERE friendid='".$_SESSION['userid']."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_  WHERE memberid='".$_SESSION['userid']."' AND ispass=1) ) AND (nickname like '%".$x[2]."' OR nickname like '".$x[2]."%' OR nickname like '%".$x[2]."%') limit 5");
			if($temp){
				for($a=0;$a<count($temp);$a++){
					$out[1][$a]['uid']=$temp[$a]['memberid'];
					$out[1][$a]['name']=$temp[$a]['nickname'];
					$out[1][$a]['headpic']=$temp[$a]['headpic'];
				}
			}else{
				$out[1]="";
			}
			$pdom=null;
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}
	//搜會員
	function searchmember($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			if(is_numeric($x[2])){
				$vv=($x[2]-10000000000000)/13;
			}else{
				$vv=0;
			}
			$vv=0;//20190424 Pman 業主要求改成不要搜ID，所以強制vv=0
			if($temp=share_gettable($pdom,"mem_ WHERE memberid<>'".$_SESSION['userid']."' AND (memberid='".$vv."' OR nickname='".$x[2]."' OR nickname like '%".$x[2]."%' OR nickname like '".$x[2]."%' OR nickname like '%".$x[2]."')")){
					for($a=0;$a<count($temp);$a++){
						$tempb[$a]=unsetmem($temp[$a]);
						$tempb[$a]['uid']=$temp[$a]['memberid'];
						if($tb=share_gettable($pdod," friend_ WHERE friendid='".$_SESSION['userid']."' AND memberid='".$temp[$a]['memberid']."'")){//被邀請
							if($tb[0]['ispass']=="1"){
								$tempb[$a]['isfriend']=4;
							}else if($tb[0]['ispass']=="0"){
								$tempb[$a]['isfriend']=3;
							}else{
								$tempb[$a]['isfriend']=1;
							}
						}else if($tb=share_gettable($pdod," friend_ WHERE memberid='".$_SESSION['userid']."' AND friendid='".$temp[$a]['memberid']."'")){//邀請
							if($tb[0]['ispass']=="1"){
								$tempb[$a]['isfriend']=4;
							}else if($tb[0]['ispass']=="0"){
								$tempb[$a]['isfriend']=2;
							}else{
								$tempb[$a]['isfriend']=1;
							}
						}else{
							$tempb[$a]['isfriend']=1;
						}
					}
					$out[0]="OK";
					$out[1]=$tempb;
			}else{
				$out[0]="ERR";
				$out[1]="查無此暱稱";//20190424 Pman 調整文案
			}
			$pdom=NULL;
			$pdod=NULL;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//搜朋友
	function searchfriends($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			if($temp=share_gettable($pdom,"mem_ WHERE (nickname='".$x[2]."' OR nickname like '%".$x[2]."%' OR nickname like '".$x[2]."%' OR nickname like '%".$x[2]."') AND (memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=1) OR memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) )")){
				$a=0;
				$out="";
				foreach($temp as $t){
					$out[$a]['uid']=$t['memberid'];
					$out[$a]['name']=$t['nickname'];
					$out[$a]['headpic']=$t['headpic'];
					$a++;
				}
			}else{
				$out[0]="ERR";
				$out[1]="沒有取得資料";
			}
			$pdom=NULL;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	function get_friends($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$out[0]="OK";
			$temp=share_gettable($pdom,"mem_ WHERE memberid in (SELECT memberid FROM ".$conf['dbname_d'].".onl_) AND (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'  AND ispass=1))");
			if($temp){
				for($a=0;$a<count($temp);$a++){
					$out[1][$a]['uid']=$temp[$a]['memberid'];
					$out[1][$a]['name']=$temp[$a]['nickname'];
					$out[1][$a]['headpic']=$temp[$a]['headpic'];
				}
			}else{
				$out[1]="";
			}
			//未上線名單..限制10個   //暫時取消  ==> Pman 20161201
//			$temp=share_gettable($pdom,"mem_ WHERE (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."'  AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'  AND ispass=1)) AND memberid NOT in (SELECT memberid FROM ".$conf['dbname_d'].".onl_) limit 10");
			$temp=share_gettable($pdom,"mem_ WHERE (memberid in (SELECT memberid FROM ".$conf['dbname_d'].".friend_ WHERE friendid='".$_SESSION['userid']."'  AND ispass=1) OR memberid in (SELECT friendid FROM ".$conf['dbname_d'].".friend_ WHERE memberid='".$_SESSION['userid']."'  AND ispass=1)) AND memberid NOT in (SELECT memberid FROM ".$conf['dbname_d'].".onl_)"); //取消10個的限制 ==> Pman 20161201
			if($temp){
				for($a=0;$a<count($temp);$a++){
					$out[2][$a]['uid']=$temp[$a]['memberid'];
					$out[2][$a]['name']=$temp[$a]['nickname'];
					$out[2][$a]['headpic']=$temp[$a]['headpic'];
				}
			}else{
				$out[2]="";
			}
			$pdom=null;
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}

	function mob_artreply($x){//手機板抓攻略回應
		global $conf;
                $out=array();
		$out[0]="OK";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$temp=share_getinfo($pdod,"art_","thisid",$x[2]);
		$out[2]=$temp['contentid'];
		$out[1]=share_gettable($pdod,"rep_ WHERE contentid='".$temp['contentid']."' order by thisid");
		for($b=0;$b<count($out[1]);$b++){
			$temp=share_getinfo($pdom,"mem_","memberid",$out[1][$b]['memberid']);
			$out[1][$b]['user']=$temp['nickname'];
			$out[1][$b]['userpic']=$temp['headpic'];
			$out[1][$b]['uid']=$temp['memberid'];
			if($out[1][$b]['replyto']){
				$tempx=share_getinfo($pdom,"mem_","memberid",$out[1][$b]['replyto']);
				$out[1][$b]['replytoname']=$tempx['nickname'];
			}else{
				$out[1][$b]['replytoname']="";
			}
		}
		echo json_encode($out);
		$pdod=null;
	}


	//  ############  中央相關  ################################
	function show_board($x){
		$out= '';
		if($x[4]=="wall"){
			show_wall($x);
		}else if($x[4]=="mywall"){
			show_mywall($x);
		}else if($x[4]=="qna"){
			show_qna($x);
		}else if($x[4]=="match"){
			$y[0]=$x[0];
			$y[1]=$x[1];
			$y[2]=$x[2];
			get_match_system($y);
		}else if($x[4]=="article"){
			get_article_list($x);
		}else if($x[4]=="shop"){
			get_shop_list($x);
		}else if($x[3]=="arc"){//收藏
			get_arc_list($x);
		}else{
			$out="";
			$out[0]="沒有資料,缺乏變數";
			echo json_encode($out);
		}

	}
	//顯示收藏
	function get_arc_list($x){//蒐藏...
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$ins="";
			if($x[2]==1){// wall
				$list=share_gettable($pdod,"arc_ WHERE atype='wall' AND memberid='".$_SESSION['userid']."'");
				for($a=0;$a<count($list);$a++){
					if($list[$a]['typeid']=="4"){//攻略--連去攻略
						$tx=share_getinfo($pdod,"art_","contentid",$list[$a]['contentid']);
						$list[$a]['aid']=$tx['thisid'];
						//20190425 Pman 如果文章是攻略，使用art_的資料重組標題，捨棄原本con_的標題
						$strOutTitle="<div class=wallartbox><div class='newstextbox'>發表了:".$tx['thistitle']."</div>";
						if($tx['thisfile']){
							$strOutTitle=$strOutTitle."<div class='newsfilebox'><img src='uploadfile/".$tx['thisfile']."'></div>";
						}
						$strOutTitle=$strOutTitle."</div>";
						$list[$a]['main']['thiscontent']=$strOutTitle;
						$list[$a]['main'][4]=$strOutTitle;
						//=====================================================================
					}else{
						$list[$a]['aid']="";
					}
					$temp=share_getinfo($pdom,"mem_","memberid",$list[$a]['fromid']);
					$list[$a]['user']=$temp['nickname'];
					$list[$a]['uid']=$temp['memberid'];
					$list[$a]['userpic']=$temp['headpic'];
					if($list['gameid']){
						$tempz=share_getinfo($pdom,"gam_","gameid",$list[$a]['gameid']);
						$list[$a]['tag']=$tempz['gamename'];
					}else{
						$list[$a]['tag']="";
					}
				}
			}else if($x[2]==2){// article
				$ins="";
				$alltag=0;
				/* 蒐藏不管要看什麼---10/16/2016
				if($x[6]){
					for($a=0;$a<count($x[6]);$a++){
						if($x[6][$a]['show']==1){
							if($ins){
								if($x[6][$a]['gameid']=="999999"){
									$alltag=1;
									$ins.=" OR gameid='' OR gameid is NULL OR gameid=0";
								}else{
									$ins.=" OR gameid='".$x[6][$a]['gameid']."'";
								}
							}else{
								if($x[6][$a]['gameid']=="999999"){
									$alltag=1;
									$ins="gameid='' OR gameid is NULL OR gameid=0";
								}else{
									$ins="gameid='".$x[6][$a]['gameid']."'";
								}
							}
						}
					}
				}

				if($alltag==1){
					$ins="";
				}
				*/
				if($x[7]){
					if($ins){
						$ins="(".$ins.") AND thistitle like '%".$x[7]."%'";
					}else{
						$ins="thistitle like '%".$x[7]."%'";
					}

				}
				$cnt=0;
				$perpage=6;
				//if($x[4]>1){//從id
					if($ins){
						$cnt=share_getcount($pdod,"arc_ WHERE atype='article'   AND memberid='".$_SESSION['userid']."' AND (".$ins.")");
						$list=share_gettable($pdod,"arc_ WHERE atype='article'  AND memberid='".$_SESSION['userid']."' AND (".$ins.") order by thisid DESC limit ".($x[4]-1)*$perpage.",".$perpage);
					}else{
						$cnt=share_getcount($pdod,"arc_ WHERE atype='article'  AND memberid='".$_SESSION['userid']."' ");
						$list=share_gettable($pdod,"arc_ WHERE atype='article'  AND memberid='".$_SESSION['userid']."' order by thisid DESC limit ".($x[4]-1)*$perpage.",".$perpage);
					}
				//}else{//從頭
				//	if($ins){
				//		$cnt=share_getcount($pdod,"arc_ WHERE  atype='article'  AND memberid='".$_SESSION['userid']."' AND (".$ins.")" );
				//		$list=share_gettable($pdod,"arc_ WHERE  atype='article' AND memberid='".$_SESSION['userid']."'  AND (".$ins.") order by thisid DESC limit ".$perpage );
				//	}else{
				//		$cnt=share_getcount($pdod,"arc_ WHERE  atype='article'  AND memberid='".$_SESSION['userid']."' " );
				//		$list=share_gettable($pdod,"arc_ WHERE atype='article'  AND memberid='".$_SESSION['userid']."'  order by thisid DESC limit ".$perpage );
				//	}
				//}
				//	$list=share_gettable($pdod,"arc_ WHERE atype='article'");
				for($a=0;$a<count($list);$a++){
					$temp=share_getinfo($pdom,"mem_","memberid",$list[$a]['fromid']);
					$tempb=share_getinfo($pdod,"art_","contentid",$list[$a]['contentid']);
					$list[$a]['name']=$temp['nickname'];
					//$list[$a]['thisid']=$tempb['thisid'];
					//$list[$a]['thisid']=$tempb['thisid'];
				}
			}
			if($list){
				$out[0]="OK";
				$out[1]=$list;
				$out[2]=$cnt;
			}else{
				$out[0]="ERR";
				$out[1]="目前沒有資料";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//顯示 商品列表
	function get_shop_list($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out=array();
			$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
			$pdos -> exec("set names ".$conf['db_encode']);
			$ins="ORDER BY productid ASC"; //20190329 Pman 調整預設商品排序
			if($x[5] && $x[5]<>"mainlist"&& $x[5]<>"0"){
				$ins=" order by ".$x[5];
			}
			if($x[3]==0){
				if($x[2]>0){//從id
					$list=share_gettable($pdos,"pro_ WHERE isopen=1 ".$ins." limit ".$x[2].",9");
				}else{//從頭
					$list=share_gettable($pdos,"pro_ WHERE isopen=1 ".$ins." limit 9" );
				}
			}else{
				if($x[2]>0){//從id
					$list=share_gettable($pdos,"pro_ WHERE catid='".$x[3]."'  AND isopen=1  ".$ins." limit ".$x[2].",9");
				}else{//從頭
					$list=share_gettable($pdos,"pro_ WHERE catid='".$x[3]."' AND isopen=1 ".$ins."  limit 9" );
				}
			}
			if($list){
				$out[0]="OK";
				$listb=array();
				$a=0;
				foreach($list as $t){
					$listb[$a]['thisid']=$t['productid'];
					$listb[$a]['productname']=$t['productname'];
					$listb[$a]['dispoints']=$t['dispoints'];
					$listb[$a]['qty']=$t['qty'];
					$listb[$a]['vir']=$t['vir'];
					if($t['vir']=="1" && empty($t['virnumber'])){
						$nsd=share_getfree($pdos,"SELECT count(*) as CC FROM gift_".$t['productid']." WHERE memberid is null")[0]['CC'];
						if($nsd && $nsd>0){
							$listb[$a]['vopen']=1;//有數量
						}else{
							$listb[$a]['vopen']=0;//無數量
						}

					}else{
						$listb[$a]['vopen']=2;//算數量
					}
					$a++;
				}
				$out[1]=$listb;
			}else{
				$out[0]="ERR";
				$out[1]="目前沒有資料";
				$out[2]="pro_ WHERE isopen=1 ".$ins." limit ".$x[2].",9";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//顯示攻略頁面
	function show_artpage($x){
			global $conf;
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
                        $out=array();
			//抓取葉面
			if($t=share_getinfo($pdod,"art_","thisid",$x[2])){
				$out[0]="OK";
				$out[1]=$t;
				$out[1]['thiscontent']=share_tranmice($t['thiscontent']);
				$out[1]['thisfile']=$t['thisfile'];
				$tm=share_getinfo($pdom,"mem_","memberid",$out[1]['memberid']);
				$out[1]['user']=$tm['nickname'];
				$out[1]['userpic']=$tm['headpic'];
				$out[1]['uid']=$tm['memberid'];

				$tc=share_getinfo($pdod,"con_","thisid",$t['contentid']);
				$out[1]['gamid']=$tc['gamid'];
				$out[1]['likes']=$tc['points'];
				$out[1]['contentid']=$t['contentid'];
				if($out[1]['gamid']){
					$tg=share_getinfo($pdom,"gam_","gameid",$out[1]['gamid']);
					$out[1]['tag']=$tg['gamename'];
				}else{
					$out[1]['tag']="";
				}
				if($tx=share_getcount($pdod,"arc_ WHERE atype='article' AND contentid='".$t['contentid']."'")){
					$out[1]['saves']=$tx;
				}else{
					$out[1]['saves']=0;
				}

				$out[1]['reply']=share_gettable($pdod,"rep_ WHERE contentid='".$t['contentid']."' order by thisid");
				for($b=0;$b<count($out[1]['reply']);$b++){
					$temp=share_getinfo($pdom,"mem_","memberid",$out[1]['reply'][$b]['memberid']);
					$out[1]['reply'][$b]['user']=$temp['nickname'];
					$out[1]['reply'][$b]['userpic']=$temp['headpic'];
					$out[1]['reply'][$b]['uid']=$temp['memberid'];
					if($out[1]['reply'][$b]['replyto']){
						$tempx=share_getinfo($pdom,"mem_","memberid",$out[1]['reply'][$b]['replyto']);
						$out[1]['reply'][$b]['replytoname']=$tempx['nickname'];
					}else{
						$out[1]['reply'][$b]['replytoname']="";
					}
				}
			}else{
				$out[0]="ERR";
				$out[1]="無法抓取內容資料";
			}
			$pdod=null;
			echo json_encode($out);
	}
	//顯示攻略頁面--收藏
	function show_artpagec($x){
			global $conf;
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			//抓取葉面
			if($t=share_getinfo($pdod,"arc_","thisid",$x[2])){
				$out[0]="OK";
				$out[1]=$t;
				$out[1]['thiscontent']=share_tranmice($t['thiscontent']);
				$out[1]['thisfile']=$t['thisfile'];
				$tm=share_getinfo($pdom,"mem_","memberid",$out[1]['fromid']);
				$out[1]['user']=$tm['nickname'];
				$out[1]['userpic']=$tm['headpic'];
				$out[1]['uid']=$tm['memberid'];
				$tc=share_getinfo($pdod,"con_","thisid",$t['contentid']);
				$out[1]['gamid']=$tc['gamid'];
				if($out[1]['gamid']){
					$tg=share_getinfo($pdom,"gam_","gameid",$temp1['gamid']);
					$out[1]['tag']=$tg['gamename'];
				}else{
					$out[1]['tag']="";
				}
				$out[1]['reply']=share_gettable($pdod,"rep_ WHERE contentid='".$t['contentid']."' order by thisid");
				for($b=0;$b<count($out[1]['reply']);$b++){
					$temp=share_getinfo($pdom,"mem_","memberid",$out[1]['reply'][$b]['memberid']);
					$out[1]['reply'][$b]['user']=$temp['nickname'];
					$out[1]['reply'][$b]['userpic']=$temp['headpic'];
					$out[1]['reply'][$b]['uid']=$temp['memberid'];
					if($out[1]['reply'][$b]['replyto']){
						$tempx=share_getinfo($pdom,"mem_","memberid",$out[1]['reply'][$b]['replyto']);
						$out[1]['reply'][$b]['replytoname']=$tempx['nickname'];
					}else{
						$out[1]['reply'][$b]['replytoname']="";
					}
				}
			}else{
				$out[0]="ERR";
				$out[1]="無法抓取內容資料";
			}
			$pdod=null;
			echo json_encode($out);
	}
	//顯示 攻略名單
	function get_article_list($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out=array();
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$ins="";
			$alltag=0;//20190412 Pman 這個...應該....根本沒用到，不然就是取錯名字了
			$stag=0;//20190412 Pman 新增，用來判別是否是全部看
			if($x[6]){
				$stag=0;
				for($a=0;$a<count($x[6]);$a++){
					if($x[6][$a]['show']==1){
						if($x[6][$a]['gameid']=="999999"){
							$stag=1;
						}
					}
				}
				if($stag==0){
					for($a=0;$a<count($x[6]);$a++){
						if($x[6][$a]['show']==1){
							if($ins){
								if($x[6][$a]['gameid']=="999999"){
								//	$ins.=" OR gamid='' OR gamid is NULL OR gamid=0";
								}else{
									$ins.=" OR gamid='".$x[6][$a]['gameid']."'";
								}
							}else{
								if($x[6][$a]['gameid']=="999999"){
								//	$ins="gamid='' OR gamid is NULL OR gamid=0";
								}else{
									$ins="gamid='".$x[6][$a]['gameid']."'";
								}
							}
						}
					}
					if($ins){
					}else{//完全沒有選項
						$ins="gamid='99999999'";
					}
				}
			}
			//if($alltag==1){ //20190412 這個應該根本錯了
			if($stag==1){//20190412 Pman 全部看的時候，隱藏標籤的攻略要藏
				//$ins="";
				if($ins){
					$ins.=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
				}else{
					$ins.=" gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
				}
			}
			if($x[7]){
				if($ins){
					$ins="(".$ins.") AND thistitle like '%".$x[7]."%'";
				}else{
					$ins="thistitle like '%".$x[7]."%'";
				}
			}
			$cnt=0;
			$perpage=9;
			if($x[2]>1){//從id
				if($ins){
					$cnt=share_getcount($pdod,"art_ WHERE isopen=1  AND (".$ins.")");
					$list=share_gettable($pdod,"art_ WHERE isopen=1 AND (".$ins.") order by thisid DESC limit ".($x[2]-1)*$perpage.",".$perpage);
				}else{
					$cnt=share_getcount($pdod,"art_ WHERE isopen=1 ");
					$list=share_gettable($pdod,"art_ WHERE isopen=1 order by thisid DESC limit ".($x[2]-1)*$perpage.",".$perpage);
				}
			}else{//從頭
				if($ins){
					$cnt=share_getcount($pdod,"art_ WHERE  isopen=1 AND (".$ins.")" );
					$list=share_gettable($pdod,"art_ WHERE  isopen=1 AND (".$ins.") order by thisid DESC limit 9" );
				}else{
					$cnt=share_getcount($pdod,"art_ WHERE  isopen=1 " );
					$list=share_gettable($pdod,"art_ WHERE  isopen=1  order by thisid DESC limit 9" );
				}
			}
			if($list){
				$a=0;
				$listb=array();
				foreach($list as $t){
					if($ta=share_getcountid($pdod,"rep_","contentid",$t['contentid'])){
					}else{
						$ta=0;
					}
                                        if(isset($listb[$a]) == false)
                                            $listb[$a] = array();
					if($tb=share_getinfo($pdod,"con_","thisid",$t['contentid'])){
						$listb[$a]['likes']=$tb['points'];
						$listb[$a]['name']=share_getinfo($pdom,"mem_","memberid",$tb['memberid'])['nickname'];

					}else{
						$listb[$a]['likes']=0;
						$listb[$a]['name']="NA";
					}
					if($tx=share_getcount($pdod,"arc_ WHERE atype='article' AND contentid='".$t['contentid']."'")){
						$listb[$a]['saves']=$tx;
					}else{
						$listb[$a]['saves']=0;
					}
					$listb[$a]['memberid']=$tb['memberid'];
					$listb[$a]['thisid']=$t['thisid'];
					$listb[$a]['thisfile']=$t['thisfile'];
					$listb[$a]['thistitle']=$t['thistitle'];
					$listb[$a]['reply']=$ta;
					$listb[$a]['contentid']=$t['contentid'];

					$a++;
				}
				$out[0]="OK";
				$out[1]=$listb;
				$out[2]=$cnt;
			}else{
				$out[0]="ERR";
				$out[1]="目前沒有資料";
			}
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//取出單一攻略
	function get_onearticle($x){
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			global $conf;
			$out=array();
			$out[0]="OK";
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$out[1]=share_getinfo($pdod,"art_","thisid",$x[2]);
			$out[1]['thiscontent']=share_tranmice($out[1]['thiscontent']);

		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}


	// 給點
	function givepoint($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
				$out="";
				$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdom -> exec("set names ".$conf['db_encode']);
				$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
				$pdod -> exec("set names ".$conf['db_encode']);
				$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
				$pdop -> exec("set names ".$conf['db_encode']);
				if($x[2]=="news"){
					if($_SESSION['isver']==1){
						if($t=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010' AND note='".$x[3]."'")){
							$out[0]="ERR";
							$out[1]="已贊助過";
						}else{
							$m=share_getinfo($pdod,"con_","thisid",$x[3]);
							$pmi=get_point(4);
							$ppl=get_point(5);
							if($m['memberid']==$_SESSION['userid']){
								$out[0]="ERR";
								//$out[1]="不能贊助自己";
								$out[1]="不能推推自己";//20190904 Pman 客戶要求修改
							}else{
								if(add_point($_SESSION['userid'],$pmi,'010',"給予支持",$x[3])){
									add_point($m['memberid'],$ppl,'011',"獲得支持",$x[3]);
									share_update($pdod,"con_","likes=likes+1,points=points+".$ppl,"thisid='".$x[3]."'");
									$out[0]="OK";
									$out[1]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010'");
									$out[2]=$m['likes']+1;
									$out[3]=$m['points']+$ppl;
								}else{
									$out[0]="ERR";
									$out[1]="貢獻值不足";//20190107 Pman 將「點」==>「貢獻值」
								}
							}
						}
					}else{
						$out[0]="ERR";
						$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
					}
				}else if($x[2]=="newsreply"){
					if($_SESSION['isver']==1){
						if($t=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012' AND note='".$x[3]."'")){
							$out[0]="ERR";
							$out[1]="已贊助過";
						}else{
							$m=share_getinfo($pdod,"rep_","thisid",$x[3]);
							if($m['memberid']==$_SESSION['userid']){
								$out[0]="ERR";
								//$out[1]="不能贊助自己";
								$out[1]="不能推推自己";//20190904 Pman 客戶要求修改
							}else{
								$pmi=get_point(4);
								$ppl=get_point(5);
								if(add_point($_SESSION['userid'],$pmi,'012',"給予支持",$x[3])){
									add_point($m['memberid'],$ppl,'013',"獲得支持",$x[3]);
									share_update($pdod,"rep_","likes=likes+1","thisid='".$x[3]."'");
									$out[0]="OK";
									$out[1]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012'");
								}else{
									$out[0]="ERR";
									$out[1]="貢獻值不足";//20190107 Pman 將「點」==>「貢獻值」
								}
							}

						}
					}else{
						$out[0]="ERR";
						$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
					}
				}else if($x[2]=="qnalike"){
						$tempa=share_getinfo($pdod,"qna_","thisid",$x[3]);
						if($tempa['memberid']==$_SESSION['userid']){//選winner
							if($_SESSION['isver']==1){
								if($tempb=share_gettable($pdod,"qrep_ WHERE winner=1 AND contentid='".$x[3]."'")){
									$out[0]="ERR";
									$out[1]="本題已經選擇最佳答案,無法重新選擇";
								}else{
									//確認
									if($t=share_gettable($pdod,"qrep_ WHERE thisid='".$x[4]."' AND contentid='".$x[3]."'")){
										if($t[0]['memberid']==$_SESSION['userid']){
											$out[0]="ERR";
											//$out[1]="您不能選擇自己的回答為最佳解答";
											$out[1]="最佳解答無法選擇自己";//20190904 Pman 客戶要求修改
										}else{
											//選擇
											share_update($pdod,"qrep_","winner=1","thisid='".$x[4]."'");
											//扣點--這個功能移去了新增的地方
											//add_point($_SESSION['userid'],"-".$tempa['points'],'014',"QA最佳解答給點",$x[3]);
											//加點
											add_point($t[0]['memberid'],$tempa['points'],'015',"QA最佳解答得貢獻值",$x[3]);//20190107 Pman 將「點」==>「貢獻值」
											//通知
											$mex=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
											share_insert($pdod,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$t[0]['memberid']."','".$_SESSION['userid']."',2,'".$mex['nickname']."已經將您的答案選為最佳正解，您得到了".$tempa['points']."貢獻值','".$x[3]."'"); //20190107 Pman 將「點」==>「貢獻值」//20190510 Pman 修正選出正解時，寫進系統的記錄，上一版的typid寫錯，thislink沒寫
											$out[0]="OK";
											//$out[1]="您的決定已經成功紀錄了,謝謝";
											$out[1]="最佳解答已選出";//20190904 Pman 客戶要求修改
										}
									}else{
										$out[0]="ERR";
										$out[1]="無法找到相關資料";
									}
								}
							}else{
								$out[0]="ERR";
								$out[1]="本功能需要手機驗證，請完成手機驗證<div class='formline'><div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div></div>";
							}
					}else{//like--投票
						if($tempb=share_gettable($pdod,"qrep_ WHERE thisid='".$x[4]."' AND contentid='".$x[3]."'")){
							$pos=strpos($tempb[0]['rmembers'],"|".$_SESSION['userid']."|");
							if($pos=== false ){
								$newtemp="";
								if($tempb[0]['rmembers']){
									$newtemp=$tempb[0]['rmembers'].$_SESSION['userid']."|";
								}else{
									$newtemp="|".$_SESSION['userid']."|";
								}
								share_update($pdod,"qrep_","likes=likes+1,rmembers='".$newtemp."'","thisid='".$x[4]."'");
								$out[0]="OK";
								$out[1]="投票成功";
								//if($tempb[0]['rmembers'] && strpos($tempb[0]['rmembers'],"|".$_SESSION['userid']."|")>=0){//已經like過了
							}else{
								$out[0]="OK";
								$out[1]="已經投過了,謝謝你的參與";
							}
						}else{
							$out[0]="ERR";
							$out[1]="無法找到相關資料";
						}
					}
				}
				$pdod=null;
				$pdop=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	//up_matchone and show oone match
	function up_matchone($x){//抓檔案
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			share_update($pdod,"not_","viewed=1","memberid='".$_SESSION['userid']."' AND thislink='".$x[2]."'");
			show_matchone($x);
			$pdod=null;
		}
	}
	//updateqna and show oone qna
	function up_qnaone($x){//抓檔案
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			share_update($pdod,"not_","viewed=1","memberid='".$_SESSION['userid']."' AND thislink='".$x[2]."'");
			show_qnaone($x);
			$pdod=null;
		}
	}
	//update notice and show oone wall
	function up_boardone($x){//抓檔案
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			share_update($pdod,"not_","viewed=1","memberid='".$_SESSION['userid']."' AND thislink='".$x[2]."'");
			show_boardone($x);
			$pdod=null;
		}
	}
	//show one WALL post
	function show_boardone($x){//抓檔案
		global $conf;
		$out=array();
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$a=0;
		$temp1=share_getinfo($pdod,"con_","thisid",$x[2]);
		$out[$a]['main']=$temp1;
		$out[1]=$x[2];
		if($out[$a]['main']['typeid']=="4"){//攻略--連去攻略
				$tx=share_getinfo($pdod,"art_","contentid",$x[2]);
				$out[$a]['main']['aid']=$tx['thisid'];
				//20190425 Pman 如果文章是攻略，使用art_的資料重組標題，捨棄原本con_的標題
				$strOutTitle="<div class=wallartbox><div class='newstextbox'>發表了:".$tx['thistitle']."</div>";
				if($tx['thisfile']){
					$strOutTitle=$strOutTitle."<div class='newsfilebox'><img src='uploadfile/".$tx['thisfile']."'></div>";
				}
				$strOutTitle=$strOutTitle."</div>";
				$out[$a]['main']['thiscontent']=$strOutTitle;
				$out[$a]['main'][4]=$strOutTitle;
				//=====================================================================
		}
		$temp=share_getinfo($pdom,"mem_","memberid",$temp1['memberid']);
		$out[$a]['user']=$temp['nickname'];
		$out[$a]['uid']=$temp['memberid'];
		$out[$a]['userpic']=$temp['headpic'];
		if($out[$a]['main']['gamid']){
			$temp=share_getinfo($pdom,"gam_","gameid",$temp1['gamid']);
			$out[$a]['tag']=$temp['gamename'];
		}else{
			$out[$a]['tag']="";
		}
		$out[$a]['reply']=share_gettable($pdod,"rep_ WHERE contentid='".$x[2]."' order by thisid");
		for($b=0;$b<count($out[$a]['reply']);$b++){
			$temp=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['memberid']);
			$out[$a]['reply'][$b]['user']=$temp['nickname'];
			$out[$a]['reply'][$b]['userpic']=$temp['headpic'];
			$out[$a]['reply'][$b]['uid']=$temp['memberid'];
			if($out[$a]['reply'][$b]['replyto']){
				$tempx=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['replyto']);
				$out[$a]['reply'][$b]['replytoname']=$tempx['nickname'];
			}else{
				$out[$a]['reply'][$b]['replytoname']="";
			}
		}
		echo json_encode($out);
	}
	//WALL list
	function show_wall($x){
		global $conf;
		$out=array();
		$list="";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		//$x[0]=userid
		//$x[1]=key
		//$x[2]=抓取類別 0=新, 其他=之前最後一筆..
		//$x[3]=全部=0/好友=1 ..$x[0]有值才能抓好友
		//$x[4]=和這個無關
		$ins="";
		$ttt="";
		if($x[6]){
			$stag=0;
			for($a=0;$a<count($x[6]);$a++){
				if($x[6][$a]['show']==1){
					if($x[6][$a]['gameid']=="999999"){//全部看是開的
						$stag=1;
					}
				}
			}
			if($stag==0){
				for($a=0;$a<count($x[6]);$a++){
					if($x[6][$a]['show']==1){
						if($ins){
							if($x[6][$a]['gameid']=="999999"){
							}else{
								$ins.=" OR gamid='".$x[6][$a]['gameid']."'";
							}
						}else{
							if($x[6][$a]['gameid']=="999999"){
							}else{
								$ins="gamid='".$x[6][$a]['gameid']."'";
							}
						}
					}
				}
				if($ins){
				}else{//完全沒有選項
					$ins="gamid='99999999'";
				}
			}
		}else{//沒有任何登入資料...等同全部看
			$stag=1;
		}
		$blo="";//blocklist
		if($_SESSION['userid']){
			$blo="thisid not in (SELECT reid as thisid FROM block_ WHERE memberid='".$_SESSION['userid']."' AND retype='wall')";
		}
		if($ins && $blo){
			$ins=$blo." AND (".$ins.")";
		}else if($blo){
			$ins=$blo;
		}
		if ($stag==1){
			if($ins){
				$ins.=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
			}else{
				$ins.=" gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
			}
		}
		if($_SESSION['userid'] && $x[3]==1){//這是看朋友的.
			if($ins){
				$ins="AND (".$ins.")";
			}
			if($x[2]>0){//從id
				$kk=rand(5,10);
				$list=share_gettable($pdod,"wall WHERE thisid<".$x[2]." ".$ins." AND opentype<3 AND ( memberid in ( SELECT friendid as memberid FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=1) OR memberid in ( SELECT memberid  FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) ) order by thisid DESC limit ".$kk );
			}else{//從頭
				$list=share_gettable($pdod,"wall WHERE opentype<3  AND  (memberid in (SELECT  friendid as memberid FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=1) OR memberid in ( SELECT memberid  FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) ) ".$ins."  order by thisid DESC limit 10" );
			}
		}else{	//全部
			if($_SESSION['userid']){
				$discon="( opentype='1' OR (opentype>1 AND memberid='".$_SESSION['userid']."') OR (opentype='2' AND ( memberid in ( SELECT friendid as memberid FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=1) OR memberid in ( SELECT memberid  FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) )) )";
			}else{
				$discon=" opentype='1'";
			}
			if($x[2]>0){//從id
				if($ins){
					$ins="AND (".$ins.")";
				}
				$kk=rand(5,10);
				$list=share_gettable($pdod,"wall WHERE ".$discon." AND  thisid<'".$x[2]."' ".$ins." order by thisid DESC limit ".$kk );
			}else{//從頭
				if($ins){
					$ins=" AND  ".$ins;
				}
				$list=share_gettable($pdod,"wall  WHERE ".$discon.$ins." order by thisid DESC limit 10");
			}
		}
		if($list){
			$a=0;
			foreach($list as $t){
				if($out[$a]['main']=share_getinfo($pdod,"con_","thisid",$t['contentid'])){
					$out[$a]['main']['thiscontent']=str_replace("%3Cdiv%20class%3D%22newstextmore%22%3E......%u7E7C%u7E8C%u95B1%u8B80%3C/div%3E","",$out[$a]['main']['thiscontent']); //20190805 Pman 因不明原因，content中會包含「......繼續閱讀」，造成手機版輸出列表時，會出錯！因此先過濾掉。
					if($out[$a]['main']['typeid']=="4"){//攻略--連去攻略
						$tx=share_getinfo($pdod,"art_","contentid",$t['contentid']);
						$out[$a]['main']['aid']=$tx['thisid'];
						//20190425 Pman 如果文章是攻略，使用art_的資料重組標題，捨棄原本con_的標題
						$strOutTitle="<div class=wallartbox><div class='newstextbox'>發表了:".$tx['thistitle']."</div>";
						if($tx['thisfile']){
							$strOutTitle=$strOutTitle."<div class='newsfilebox'><img src='uploadfile/".$tx['thisfile']."'></div>";
						}
						$strOutTitle=$strOutTitle."</div>";
						$out[$a]['main']['thiscontent']=$strOutTitle;
						//=====================================================================
					}else if($out[$a]['main']['fileinfo']){//有附檔案
						if($out[$a]['main']['typeid']=="1"){//圖
							$out[$a]['main']['albid']=$out[$a]['main']['fileinfo'];
							$out[$a]['main']['pics']=share_gettable($pdod,"pho_","albid",$out[$a]['main']['fileinfo']);
							for($ax=0;$ax<count($out[$a]['main']['pics']);$ax++){
									$tfile="uploadfile/".$out[$a]['main']['pics'][$ax]['thisfile'];
									$xdata = getimagesize($tfile);
									if($xdata[0] > $xdata[1]){
										$out[$a]['main']['pics'][$ax]['t']="h";
									}else{
										$out[$a]['main']['pics'][$ax]['t']="w";
									}
							}
						}else if($out[$a]['main']['typeid']=="2"){//影片
							$out[$a]['main']['albid']=$out[$a]['main']['fileinfo'];
						}else if($out[$a]['main']['typeid']=="3"){//相簿
							$out[$a]['main']['albid']=$out[$a]['main']['fileinfo'];
							$out[$a]['main']['albinfo']=share_getinfo($pdod,"alb_","thisid",$out[$a]['main']['fileinfo']);
							$out[$a]['main']['pics']=share_gettable($pdod,"pho_","albid",$out[$a]['main']['fileinfo']);
							for($ax=0;$ax<count($out[$a]['main']['pics']);$ax++){
									$tfile="uploadfile/".$out[$a]['main']['pics'][$ax]['thisfile'];
									$xdata = getimagesize($tfile);
									if($xdata[0] > $xdata[1]){
										$out[$a]['main']['pics'][$ax]['t']="h";
									}else{
										$out[$a]['main']['pics'][$ax]['t']="w";
									}
							}
						}
					}
					$temp=share_getinfo($pdom,"mem_","memberid",$t['memberid']);
					$out[$a]['user']=$temp['nickname'];
					$out[$a]['uid']=$temp['memberid'];
					$out[$a]['userpic']=$temp['headpic'];
					if($t['gamid']){
						$tempz=share_getinfo($pdom,"gam_","gameid",$t['gamid']);
						$out[$a]['tag']=$tempz['gamename'];
					}else{
						$out[$a]['tag']="";
					}
					$out[$a]['reply']=share_gettable($pdod,"rep_ WHERE contentid='".$t['contentid']."' order by thisid");
					for($b=0;$b<count($out[$a]['reply']);$b++){
						$temp=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['memberid']);
						$out[$a]['reply'][$b]['user']=$temp['nickname'];
						$out[$a]['reply'][$b]['userpic']=$temp['headpic'];
						$out[$a]['reply'][$b]['uid']=$temp['memberid'];
						if($out[$a]['reply'][$b]['replyto']){
							$tempx=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['replyto']);
							$out[$a]['reply'][$b]['replytoname']=$tempx['nickname'];
						}else{
							$out[$a]['reply'][$b]['replytoname']="";
						}
					}
					$a++;
				}
			}
		}else{
			$out[0]="ERR";
			$out[1]="動態牆沒有資料";
		}

		echo json_encode($out);
	}
	//一筆動態
	function show_wallone($x){
		global $conf;
		$out=array();
		$list="";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		//$x[0]=userid
		//$x[1]=key
		//$x[2]=抓取類別 0=新, 其他=之前最後一筆..
		//$x[3]=全部=0/好友=1 ..$x[0]有值才能抓好友
		//$x[4]=和這個無關
		$list=share_gettable($pdod,"con_ WHERE thisid=".$x[0]." AND opentype<3");
		if($list){
			$a=0;
			foreach($list as $t){
				$t['contentid']=$x[0];
				if($out[$a]['main']=share_getinfo($pdod,"con_","thisid",$t['contentid'])){
					$out[$a]['main']['thiscontent']=str_replace("%3Cdiv%20class%3D%22newstextmore%22%3E......%u7E7C%u7E8C%u95B1%u8B80%3C/div%3E","",$out[$a]['main']['thiscontent']); //20190805 Pman 因不明原因，content中會包含「......繼續閱讀」，造成手機版輸出列表時，會出錯！因此先過濾掉。
					if($out[$a]['main']['typeid']=="4"){//攻略--連去攻略
						$tx=share_getinfo($pdod,"art_","contentid",$t['contentid']);
						$out[$a]['main']['aid']=$tx['thisid'];
						//20190425 Pman 如果文章是攻略，使用art_的資料重組標題，捨棄原本con_的標題
						$strOutTitle="<div class=wallartbox><div class='newstextbox'>發表了:".$tx['thistitle']."</div>";
						if($tx['thisfile']){
							$strOutTitle=$strOutTitle."<div class='newsfilebox'><img src='uploadfile/".$tx['thisfile']."'></div>";
						}
						$strOutTitle=$strOutTitle."</div>";
						$out[$a]['main']['thiscontent']=$strOutTitle;
						$out[$a]['main'][4]=$strOutTitle;
						//=====================================================================
					}else if($out[$a]['main']['fileinfo']){//有附檔案
						if($out[$a]['main']['typeid']=="1"){//圖
							$out[$a]['main']['albid']=$out[$a]['main']['fileinfo'];
							$out[$a]['main']['pics']=share_gettable($pdod,"pho_","albid",$out[$a]['main']['fileinfo']);
							for($ax=0;$ax<count($out[$a]['main']['pics']);$ax++){
									$tfile="uploadfile/".$out[$a]['main']['pics'][$ax]['thisfile'];
									$xdata = getimagesize($tfile);
									if($xdata[0] > $xdata[1]){
										$out[$a]['main']['pics'][$ax]['t']="h";
									}else{
										$out[$a]['main']['pics'][$ax]['t']="w";
									}
							}
						}else if($out[$a]['main']['typeid']=="2"){//影片
							$out[$a]['main']['albid']=$out[$a]['main']['fileinfo'];
						}else if($out[$a]['main']['typeid']=="3"){//相簿
							$out[$a]['main']['albid']=$out[$a]['main']['fileinfo'];
							$out[$a]['main']['albinfo']=share_getinfo($pdod,"alb_","thisid",$out[$a]['main']['fileinfo']);
							$out[$a]['main']['pics']=share_gettable($pdod,"pho_","albid",$out[$a]['main']['fileinfo']);
							for($ax=0;$ax<count($out[$a]['main']['pics']);$ax++){
									$tfile="uploadfile/".$out[$a]['main']['pics'][$ax]['thisfile'];
									$xdata = getimagesize($tfile);
									if($xdata[0] > $xdata[1]){
										$out[$a]['main']['pics'][$ax]['t']="h";
									}else{
										$out[$a]['main']['pics'][$ax]['t']="w";
									}
							}
						}
					}
					$temp=share_getinfo($pdom,"mem_","memberid",$t['memberid']);
					$out[$a]['user']=$temp['nickname'];
					$out[$a]['uid']=$temp['memberid'];
					$out[$a]['userpic']=$temp['headpic'];
					if($t['gamid']){
						$tempz=share_getinfo($pdom,"gam_","gameid",$t['gamid']);
						$out[$a]['tag']=$tempz['gamename'];
					}else{
						$out[$a]['tag']="";
					}
					$out[$a]['reply']=share_gettable($pdod,"rep_ WHERE contentid='".$t['contentid']."' order by thisid");
					for($b=0;$b<count($out[$a]['reply']);$b++){
						$temp=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['memberid']);
						$out[$a]['reply'][$b]['user']=$temp['nickname'];
						$out[$a]['reply'][$b]['userpic']=$temp['headpic'];
						$out[$a]['reply'][$b]['uid']=$temp['memberid'];
						if($out[$a]['reply'][$b]['replyto']){
							$tempx=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['replyto']);
							$out[$a]['reply'][$b]['replytoname']=$tempx['nickname'];
						}else{
							$out[$a]['reply'][$b]['replytoname']="";
						}
					}
					$a++;
				}
			}
		}else{
			$out[0]="ERR";
			$out[1]="動態牆沒有資料";
		}

		echo json_encode($out);
	}
	//WALL list
	function show_mywall($x){
		global $conf;
		$out=array();
		$list="";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$ins="";
		$ttt="";
		$insx="";
		$ttt="";
		if($x[6]){
			$stag=0;
			for($a=0;$a<count($x[6]);$a++){
				if($x[6][$a]['show']==1){
					if($x[6][$a]['gameid']=="999999"){//全部看是開的
						$stag=1;
					}
				}
			}
			if($stag==0){
				for($a=0;$a<count($x[6]);$a++){
					if($x[6][$a]['show']==1){
						if($ins){
							if($x[6][$a]['gameid']=="999999"){
							}else{
								$insx.=" AND gameid <>'".$x[6][$a]['gameid']."'";
							}
						}else{
							if($x[6][$a]['gameid']=="999999"){
							}else{
								$insx="gameid <>'".$x[6][$a]['gameid']."'";
							}
						}
					}
				}
			}
		}else{//沒有任何登入資料...等同全部看
			$stag=1;
		}
		if($stag==1){
			$ins=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
		}else{
			$ins=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1 AND ".$insx.") ";
		}
		if($_SESSION['userid']==$x[7] ){//我自己
			$discon="";
			$ins="";
		}else{
			$discon=" AND ( opentype='1' OR (opentype='2' AND ( memberid in ( SELECT friendid as memberid FROM friend_ WHERE memberid='".$_SESSION['userid']."' AND ispass=1) OR memberid in ( SELECT memberid  FROM friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=1) )) )";
		}
		if($x[2]>0){//從id
			$kk=rand(5,10);
			$list=share_gettable($pdod,"wall WHERE memberid='".$x[7]."' AND thisid<".$x[2]." ".$ins." ".$discon." order by thisid DESC limit ".$kk);
		}else{//從頭
			$list=share_gettable($pdod,"wall WHERE memberid='".$x[7]."' ".$discon." ".$ins."  order by thisid DESC limit 10" );
		}
		if($list){
			$out[0]="OK";
			$a=0;
			foreach($list as $t){
				if($out[1][$a]['main']=share_getinfo($pdod,"con_","thisid",$t['contentid'])){
					$out[1][$a]['main']['thiscontent']=str_replace("%3Cdiv%20class%3D%22newstextmore%22%3E......%u7E7C%u7E8C%u95B1%u8B80%3C/div%3E","",$out[1][$a]['main']['thiscontent']); //20190805 Pman 因不明原因，content中會包含「......繼續閱讀」，造成手機版輸出列表時，會出錯！因此先過濾掉。
					if($out[1][$a]['main']['typeid']=="4"){//攻略--連去攻略
						$tx=share_getinfo($pdod,"art_","contentid",$t['contentid']);
						$out[1][$a]['main']['aid']=$tx['thisid'];
						//20190425 Pman 如果文章是攻略，使用art_的資料重組標題，捨棄原本con_的標題
						$strOutTitle="<div class=wallartbox><div class='newstextbox'>發表了:".$tx['thistitle']."</div>";
						if($tx['thisfile']){
							$strOutTitle=$strOutTitle."<div class='newsfilebox'><img src='uploadfile/".$tx['thisfile']."'></div>";
						}
						$strOutTitle=$strOutTitle."</div>";
						$out[1][$a]['main']['thiscontent']=$strOutTitle;
						$out[1][$a]['main'][4]=$strOutTitle;
						//=====================================================================
					}
					$temp=share_getinfo($pdom,"mem_","memberid",$t['memberid']);
					$out[1][$a]['user']=$temp['nickname'];
					$out[1][$a]['uid']=$temp['memberid'];
					$out[1][$a]['userpic']=$temp['headpic'];
					if($t['gamid']){
						$tempz=share_getinfo($pdom,"gam_","gameid",$t['gamid']);
						$out[1][$a]['tag']=$tempz['gamename'];
					}else{
						$out[1][$a]['tag']="";
					}
					$out[1][$a]['reply']=share_gettable($pdod,"rep_ WHERE contentid='".$t['contentid']."' order by thisid");
					for($b=0;$b<count($out[1][$a]['reply']);$b++){
						$temp=share_getinfo($pdom,"mem_","memberid",$out[1][$a]['reply'][$b]['memberid']);
						$out[1][$a]['reply'][$b]['user']=$temp['nickname'];
						$out[1][$a]['reply'][$b]['userpic']=$temp['headpic'];
						$out[1][$a]['reply'][$b]['uid']=$temp['memberid'];
						if($out[1][$a]['reply'][$b]['replyto']){
							$tempx=share_getinfo($pdom,"mem_","memberid",$out[1][$a]['reply'][$b]['replyto']);
							$out[1][$a]['reply'][$b]['replytoname']=$tempx['nickname'];
						}else{
							$out[1][$a]['reply'][$b]['replytoname']="";
						}
					}
					$a++;
				}
			}
		}else{
			$out[0]="ERR";
			$out[1]="沒有資料";
		}
		echo json_encode($out);
	}
	//QNA list
	function set_qaalso($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$out="";
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$out[0]="OK";

			if($t=share_gettable($pdod,"qals_ WHERE contentid='".$x[2]."' AND memberid='".$_SESSION['userid']."'")){//查是否已經有
				share_del($pdod,"qals_ WHERE contentid='".$x[2]."' AND memberid='".$_SESSION['userid']."'");
				$out[1]="del";
			}else{
				share_insert($pdod,"qals_","contentid,memberid","'".$x[2]."','".$_SESSION['userid']."'");
				$out[1]="add";
			}
			$xt=share_getcount($pdod,"qals_ WHERE contentid='".$x[2]."'");
			$out[2]=$xt;
			$pdod=null;
		}else{
			$out[0]="ERR";
			$out[1]=$errText['reopen'];
		}
		echo json_encode($out);
	}
	function show_qnaone($x){//抓檔案
		global $conf;
		$out=array();
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$a=0;
		$temp1=share_getinfo($pdod,"qna_","thisid",$x[2]);
		$out[1]=$x[2];
		$temp=share_getinfo($pdom,"mem_","memberid",$temp1['memberid']);
		$out[$a]['user']=$temp['nickname'];
		$out[$a]['uid']=$temp['memberid'];
		$out[$a]['userpic']=$temp['headpic'];
		$out[$a]['thisid']=$temp1['thisid'];
		$out[$a]['thistitle']=$temp1['thistitle'];
		$out[$a]['thiscontent']=$temp1['thiscontent'];
		$out[$a]['points']=$temp1['points'];
		$out[$a]['dateadd']=$temp1['dateadd'];
		$out[$a]['als']=share_getcountid($pdod,"qals_","contentid",$t['thisid']);
		if($out[$a]['gamid']){
			$temp=share_getinfo($pdom,"gam_","gameid",$temp1['gamid']);
			$out[$a]['tag']=$temp['gamename'];
		}else{
			$out[$a]['tag']="";
		}
		$out[$a]['reply']=share_gettable($pdod,"qrep_ WHERE contentid='".$x[2]."' order by thisid");
		for($b=0;$b<count($out[$a]['reply']);$b++){
			$temp=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['memberid']);
			$out[$a]['reply'][$b]['user']=$temp['nickname'];
			$out[$a]['reply'][$b]['userpic']=$temp['headpic'];
			$out[$a]['reply'][$b]['uid']=$temp['memberid'];
			//$out[$a]['reply'][$b]['likes']=$temp['likes'];
			//$out[$a]['reply'][$b]['winner']=$temp['winner'];
			//$out[$a]['reply'][$b]['rmembers']=$temp['rmembers'];
		}
		echo json_encode($out);
	}
	function show_qna($x){
		global $conf;
		$out=array();
		$list="";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		//$x[0]=userid
		//$x[1]=key
		//$x[2]=抓取類別 0=新, 其他=之前最後一筆..
		//$x[3]=全部=0/好友=1 ..$x[0]有值才能抓好友
		//$x[4]=和這個無關
		$ins="";
		$ttt="";
		if($x[6] && count($x[6][0])>=2){	//這是gameselect的狀態
			$stag=0;
			for($a=0;$a<count($x[6]);$a++){
				if($x[6][$a]['show']==1){
					if($x[6][$a]['gameid']=="999999"){
						$stag=1;
					}
				}
			}
			if($stag==0){
				for($a=0;$a<count($x[6]);$a++){
					if($x[6][$a]['show']==1){
						if($ins){
							if($x[6][$a]['gameid']=="999999"){
							//	$ins.=" OR gamid='' OR gamid is NULL OR gamid=0";
							}else{
								$ins.=" OR gamid='".$x[6][$a]['gameid']."'";
							}
						}else{
							if($x[6][$a]['gameid']=="999999"){
							//	$ins="gamid='' OR gamid is NULL OR gamid=0";
							}else{
								$ins="gamid='".$x[6][$a]['gameid']."'";
							}
						}
					}
				}
				if($ins){
				}else{//完全沒有選項
					$ins="gamid='99999999'";
				}
			}
			
			if ($stag==1){ //20190408 Pman 全部看的時候，隱藏標籤的QA要藏
				if($ins){
					$ins.=" AND gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
				}else{
					$ins.=" gamid NOT in (SELECT gameid FROM ".$conf['dbname_m'].".gam_ WHERE hidesee=1) ";
				}
			}
			
			if($x[3]=="1"){//已回答
				$add=" thisid in (SELECT contentid FROM qrep_ WHERE winner='1')";
			}else if($x[3]=="2"){//未回答
				$add=" thisid not in (SELECT contentid FROM qrep_ WHERE winner='1')";
			}else{
				$add="";
			}
		}else if($x[6]){//這是選擇我的問題/我的追蹤/我的回答的狀態--沒有其他條件
			if($x[3]=="1"){//已回答
				$add=" thisid in (SELECT contentid FROM qrep_ WHERE winner='1')";
			}else if($x[3]=="2"){//未回答
					$add=" thisid not in (SELECT contentid FROM qrep_ WHERE winner='1')";
			}else{
				$add="";
			}
			if($x[6]=="1"){
				$ins=" memberid='".$_SESSION['userid']."'";
			}else if($x[6]=="3"){
				$ins=" thisid in (SELECT contentid FROM qrep_ WHERE memberid='".$_SESSION['userid']."')";
			}else if($x[6]=="2"){
				$ins=" thisid in (SELECT contentid FROM qals_ WHERE memberid='".$_SESSION['userid']."')";
			}
		}else{//只有上面條件
			if($x[3]=="1"){//已回答
				$add=" thisid in (SELECT contentid FROM qrep_ WHERE winner='1')";
			}else if($x[3]=="2"){//未回答
				$add=" thisid not in (SELECT contentid FROM qrep_ WHERE winner='1')";
			}else{
				$add="";
			}
		}
		if($x[2]>0){//從id
			if($ins && $add){
				$ins="WHERE thisid<'".$x[2]."' AND (".$ins.") AND ".$add;
			}else if ($ins){
				$ins="WHERE thisid<'".$x[2]."' AND (".$ins.")";
			}else if($add){
				$ins="WHERE thisid<'".$x[2]."' AND ".$add;
			}
		}else{//從頭
			if($ins && $add){
				$ins=" WHERE (".$ins.") AND ".$add;
			}else if ($ins){
				$ins=" WHERE ".$ins;
			}else if($add){
				$ins=" WHERE ".$add;
			}
		}
		//加入 block
		if($ins){
			$ins=$ins." AND thisid not in (SELECT reid FROM block_ WHERE memberid='".$_SESSION['userid']."' AND retype='qna')";
		}else{
			$ins=" WHERE thisid not in (SELECT reid FROM block_ WHERE memberid='".$_SESSION['userid']."' AND retype='qna')";
		}
		if($x[2]>0){//從id
			if($ins){
				$ins.=" AND thisid<".$x[2];
			}else{
				$ins=" WHERE thisid<".$x[2];
			}
			$list=share_gettable($pdod,"qna_  ".$ins." order by thisid DESC limit 5");
		}else{//從頭
			$list=share_gettable($pdod,"qna_  ".$ins." order by thisid DESC limit 5");
		}
		if($list){
			$tempq=share_gettable($pdod,"qna_  WHERE thisid in (SELECT contentid FROM qals_ WHERE memberid='".$_SESSION['userid']."')");//這是已追蹤的
			$a=0;
			foreach($list as $t){
					$out[$a]['thisid']=$t['thisid'];
					$out[$a]['thistitle']=$t['thistitle'];
					$out[$a]['thiscontent']=$t['thiscontent'];
					$out[$a]['points']=$t['points'];
					$out[$a]['dateadd']=$t['dateadd'];
					$temp=share_getinfo($pdom,"mem_","memberid",$t['memberid']);
					$out[$a]['user']=$temp['nickname'];
					$out[$a]['uid']=$temp['memberid'];
					$out[$a]['userpic']=$temp['headpic'];
					$out[$a]['istrack']=0;
					for($z=0;$z<count($tempq);$z++){
						if($tempq[$z]['thisid']==$t['thisid']){
							$out[$a]['istrack']=1;
						}
					}
					if($t['gamid']){
						$tempz=share_getinfo($pdom,"gam_","gameid",$t['gamid']);
						$out[$a]['tag']=$tempz['gamename'];
					}else{
						$out[$a]['tag']="";
					}
					$out[$a]['als']=share_getcountid($pdod,"qals_","contentid",$t['thisid']);
					$out[$a]['reply']=share_gettable($pdod,"qrep_ WHERE contentid='".$t['thisid']."' order by thisid");
					for($b=0;$b<count($out[$a]['reply']);$b++){
						$temp=share_getinfo($pdom,"mem_","memberid",$out[$a]['reply'][$b]['memberid']);
						$out[$a]['reply'][$b]['user']=$temp['nickname'];
						$out[$a]['reply'][$b]['userpic']=$temp['headpic'];
						$out[$a]['reply'][$b]['uid']=$temp['memberid'];
						//$out[$a]['reply'][$b]['likes']=$temp['likes'];
					//	$out[$a]['reply'][$b]['winner']=$temp['winner'];
						//$out[$a]['reply'][$b]['rmembers']=$temp['rmembers'];
					}
					$a++;
			}

		}else{
			$out[0]="ERR";
			//$out[1]="沒有資料";
		}

		echo json_encode($out);
	}
	// ##########   排行榜相關  ######################
	//RANK -首頁
	function gettoprank(){
		global $conf;
		$out="";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		//$dates=date('Y-m');
		$dates=date("Y-m",strtotime("-1 month"));
		$out=share_gettable($pdom,"rank_nohide WHERE ymonth='".$dates."' order by qty desc limit 10");//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
		$pdom=null;
		echo json_encode($out);
	}
	function getranktype(){
		global $conf;
		$out="";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$out[0]="OK";
		$out[1]=share_gettable($pdom,"gametype");
		$pdom=null;
		echo json_encode($out);
	}
	function get_topranklist($x){
		global $conf;
		$out[0]="OK";
		if($x[1]){
			//$thismonth=$x[1];
			//$lastmonth=date("Y-m",strtotime('-1 month', strtotime ( $x[1] )));
			//$nextmonth=date("Y-m",strtotime('+1 month', strtotime ( $x[1] )));
			$thismonth=date("Y-m",strtotime('-1 month', strtotime ( $x[1] )));
			$lastmonth=date("Y-m",strtotime('-2 month', strtotime ( $x[1] )));
			$nextmonth=$x[1];
		}else{
			//$thismonth=date('Y-m');
			//$lastmonth=date("Y-m",strtotime('-1 month'));
			//$nextmonth=date("Y-m",strtotime('+1 month'));
			$thismonth=date("Y-m",strtotime('-1 month'));
			$lastmonth=date("Y-m",strtotime('-2 month'));
			$nextmonth=date("Y-m");
		}
		if($x[0]==1){//月榜
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$out[1]=share_gettable($pdom,"rank_nohide WHERE ymonth='".$thismonth."' order by qty desc limit 10");//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$out[2]=share_gettable($pdom,"rank_nohide WHERE ymonth='".$lastmonth."' order by qty desc limit 10");//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$out[3]=array_reverse(share_getfree($pdom,"SELECT DISTINCT ymonth FROM rank_nohide order by ymonth DESC limit 6  "));//限制往回讀六個月//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$pdom=null;
		}else if($x[0]==2){//本月各類遊戲玩家人數
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$list=share_gettable($pdom,"gametype");
			$a=0;
			$tempx="";
			foreach($list as $temp){
				$tempx[$a]['type']=$temp['typename'];
				$tempx[$a]['qty']=share_getfree($pdom,"SELECT ifNull(sum(qty),0) as  sum  FROM rank_nohide WHERE ymonth='".$thismonth."' AND gameid in (SELECT gameid FROM gam_ WHERE typeid='".$temp['typeid']."')")[0]['sum'];//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
				$a++;
			}
			usort($tempx, function($a, $b) {
				if ($a['qty'] == $b['qty']) {
						return 0;
				}
				return ($a['qty'] < $b['qty']) ? -1 : 1;
			});
			$tempx=array_reverse($tempx);
			$out[1]=$tempx;
			$out[2]="";
			$out[3]=array_reverse(share_getfree($pdom,"SELECT DISTINCT ymonth FROM rank_nohide order by ymonth DESC limit 6"));//限制往回讀六個月//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$pdom=null;
		}else if($x[0]==3){//會員top30
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
			$pdop -> exec("set names ".$conf['db_encode']);
			$list=share_getfree($pdop,"SELECT memberid,sum(points) as sum FROM `poi_` WHERE dateadd<'".$nextmonth."-1' AND dateadd>='".$thismonth."-1' group by memberid order by sum DESC");
			$a=0;
			$tempx="";
			foreach($list as $temp){
				$t=share_getinfo($pdom,"mem_","memberid",$temp['memberid']);
				$out[1][$a]['name']=$t['nickname'];
				$out[1][$a]['qty']=$temp['sum'];
				$a++;
			}
			$out[2]="";
			$out[3]=array_reverse(share_getfree($pdom,"SELECT DISTINCT ymonth FROM rank_nohide order by ymonth DESC limit 6"));//限制往回讀六個月//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$pdom=null;
			$pdop=null;
		}else if($x[0]==4){//新進遊戲排行
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			$out[1]=share_gettable($pdom,"rank_nohide WHERE ymonth='".$thismonth."' AND gameid in (SELECT gameid FROM gam_ WHERE dateadd>='".$thismonth."-1')  order by qty desc limit 10");//限制往回讀六個月//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$out[2]="";
			$out[3]=array_reverse(share_getfree($pdom,"SELECT DISTINCT ymonth FROM rank_nohide order by ymonth DESC limit 6"));//限制往回讀六個月//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
			$pdom=null;
		}else if($x[0]==9){//各類型遊戲排行
			if($x[2]){
				$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdom -> exec("set names ".$conf['db_encode']);
				$out[1]=share_gettable($pdom,"rank_nohide WHERE ymonth='".$thismonth."' AND gameid in (SELECT gameid FROM gam_ WHERE typeid='".$x[2]."') order by qty desc limit 10");//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
				$out[2]=share_gettable($pdom,"rank_nohide WHERE ymonth='".$lastmonth."' AND gameid in (SELECT gameid FROM gam_ WHERE typeid='".$x[2]."') order by qty desc limit 10");//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
				$out[3]=array_reverse(share_getfree($pdom,"SELECT DISTINCT ymonth FROM rank_nohide order by ymonth DESC limit 6"));//限制往回讀六個月//20190109 Pman 該從一個新的view(rank_nohide)撈取，因為隱藏標籤不能出現在排行榜上
				$out[4]=share_getinfo($pdom,"gametype","typeid",$x[2])['typename'];
				$pdom=null;
			}else{
				$out[0]="ERR";
			}
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}
	function mob_boardreply($x){//手機板抓棟帶強回應
		global $conf;
		$out[0]="OK";
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);
		$out[1]=share_gettable($pdod,"rep_ WHERE contentid='".$x[2]."' order by thisid");
		for($b=0;$b<count($out[1]);$b++){
			$temp=share_getinfo($pdom,"mem_","memberid",$out[1][$b]['memberid']);
			$out[1][$b]['user']=$temp['nickname'];
			$out[1][$b]['userpic']=$temp['headpic'];
			$out[1][$b]['uid']=$temp['memberid'];
			if($out[1][$b]['replyto']){
				$tempx=share_getinfo($pdom,"mem_","memberid",$out[1][$b]['replyto']);
				$out[1][$b]['replytoname']=$tempx['nickname'];
			}else{
				$out[1][$b]['replytoname']="";
			}
		}
		echo json_encode($out);
		$pdod=null;
	}
?>

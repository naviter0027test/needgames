<?php
	//會員相關
	/*
	function get_memone($x){
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m'] );
			$pdom -> exec("set names ".$conf['db_encode']);
			$out=share_getinfo($pdom,"mem_","memberid",$x[2]);
			unset($out['password']);
		}else{
			$out[0]="ERR";
			$out[1]="已在其他視窗開啟,請關閉這個視窗";
		}
		echo json_encode($out);
	}
	*/
	//寄送確認馬
	function sendver($x){
		global $conf;
		$x1=array();
		$er=0;
		if($x[0] && strpos($x[0],"886")>=0){
			if(substr($x[1],0,1)=="0"){
				$x[1]=ltrim($x[1],"0");
			}
			if(strlen($x[1])!=9){
				$er=1;
			}
			$x1=$x[1];
		}else if($x[0]==""){
			$er=2;
		}else{
			$x1=$x[1];
		}
		$phone=$x[0].$x1;
		//檢查是否已有
		$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m'] );
		$pdo -> exec("set names ".$conf['db_encode']);
		$me=share_getinfo($pdo,"mem_","memberid",$_SESSION['userid']);
		if($er==1){
			$out[0]="ERR";
			$out[1]="手機號碼長度錯誤，謝謝";
		}else if($er==2){
			$out[0]="ERR";
			$out[1]="請輸入國碼，謝謝";
		}else if($me['phonenum']==$phone && $me['phonev']==1){
			$out[0]="ERR";
			$out[1]="本號碼已確認過，無須再次認證，謝謝";
		}else if($exist=share_gettable($pdo,"mem_ WHERE memberid<>'".$_SESSION['userid']."' AND phonenum='".$phone."'")){
			$out[0]="ERR";
			$out[1]="本手機號碼已有其他會員使用";
		}else{
			$_SESSION['phonenum']=$phone;
			$_SESSION['vercode']=rand(123456,987654);
			$sflag=0;
			//$phone="0917905625";
			$num=$_SESSION['vercode'];
			$url  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
			$url .= $_SERVER['SERVER_NAME'];
			$url .= htmlspecialchars($_SERVER['REQUEST_URI']);
			$add = dirname($url)."/prec.php";
			if($t=sendinfo1($phone,$num,$add)){
				$out[0]="OK";
                                $out[1]=$t;
			}else{
				$out[0]="ERR";
				$out[1]="系統錯誤，請稍後再試";
                                $out[2]=$t;
			}
		}
		$pdo=null;
		echo json_encode($out);
	}
	//檢查認證碼
	function chkver($x){
		global $conf;
                $out=array();
		if($_SESSION['vercode']==""){
			$out[0]="ERR";
			$out[1]="認證碼已失效，請重新寄送謝謝";
		}else if($x[1]==$_SESSION['vercode'] && $_SESSION['key']==$x[0]){//正確更新
			$myid="";
			if($_SESSION['userid']){
				$myid=$_SESSION['userid'];
			}else if($_SESSION['tempuserid']){
				$myid=$_SESSION['tempuserid'];
			}
			 if($myid<>""){
				//更新
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m'] );
				$pdo -> exec("set names ".$conf['db_encode']);
				$me=share_getinfo($pdo,"mem_","memberid",$myid);
				share_update($pdo,"mem_","phonev='1',phonenum='".$_SESSION['phonenum']."'","memberid='".$myid."'");
				//給點數
				//手機驗證
				if($me['phonev']=='1'){
				}else{//新人
					$pa=get_point(17); //20190422 Pman 抓錯點數編號
					add_point($myid,$pa,'022',"手機驗證獎勵",'');
					if($ref=share_getinfo($pdo,"reflist","memberid",$myid*13+10000000000000)){
						$pb=get_point(18); //20190422 Pman 抓錯點數編號，而且DB裡面沒有這個項目，已新增
						$pc=get_point(19); //20190422 Pman 抓錯點數編號，而且DB裡面沒有這個項目，已新增
						$fid=($ref['refid']-10000000000000)/13;
						$refmem=share_getinfo($pdo ,"mem_","memberid",$fid);
						add_point($refmem['memberid'],$pb,'023',"邀請會員獎勵",'被邀請人：'.$me['nickname']);
						add_point($me['memberid'],$pc,'024',"被邀請獎勵",'邀請人：'.$refmem['nickname']);
					}
				}
				$_SESSION['vercode']="";
				$_SESSION['isver']=1;
				$pdo=null;
			 }
			$out[0]="OK";
		}else if($_SESSION['key']!=$x[0]){//正確更新
			$out[0]="ERR";
			$out[1]="身分確認錯誤";
		}else{
			$out[0]="ERR";
			$out[1]="認證碼錯誤，請重新寄送謝謝";
                        $out[2]=$_SESSION['vercode'];
		}
		echo json_encode($out);
	}
	//存入註冊後詳細資料
	function mem_actsave($x){
		$out=array();
		global $conf;
		//if($_SESSION['key']==$x[0]){
			//這裡分兩邊..一邊是fb
			$basp=get_awain(1);
			if($x[8] && $x[14]){
				$basp=$basp+get_awain(2);
			}
			if($x[15]){
				$basp=$basp+get_awain(16);
			}
			if($x[0] && $x[1] && $x[2] && $x[3] && $x[4] && $x[5] && $x[6]){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m'] );
				$pdo -> exec("set names ".$conf['db_encode']);
				//檢查 及暱稱
				/*
				if($tb=share_gettable($pdo ," mem_ WHERE email='".$x[7]."' AND actcode<>'".$_SESSION['actcode']."'")){//檢查email
					$out[0]="ERR";
					$out[1]="這個email已在其他會員註冊,請選用其他email";
				}else
				*/
				if($tb=share_gettable($pdo ," mem_ WHERE nickname='".$x[1]."' AND actcode<>'".$_SESSION['actcode']."'")){//檢查email
					$out[0]="ERR";
					$out[1]="這個暱稱已被其他會員使用,請選用其他暱稱";
				}else{
					if($_SESSION['actcode'] && $t=share_getinfo($pdo ,"mem_","actcode",$_SESSION['actcode'])){/*正式Email註冊*/
						$ins="";
						if($x[8]){
							$ins.=",game1='".$x[8]."',game1note='".$x[9]."'";
						}
						if($x[10]){
							$ins.=",game2='".$x[10]."',game2note='".$x[11]."'";
						}
						if($x[12]){
							$ins.=",game3='".$x[12]."',game3note='".$x[13]."'";
						}
						if(share_update($pdo ,"mem_","gender='".$x[2]."',nickname='".$x[1]."',birthday='".$x[3]."-".$x[4]."-".$x[5]."',location='".$x[6]."',contact_email='".$x[7]."'".$ins.",gtid='".$x[14]."',headpic='".$x[15]."',score='".$basp."',points='".$basp."',lastIP='".GetIP()."',actcode=1","actcode='".$_SESSION['actcode']."'")){
							$tb=share_getinfo($pdo ,"mem_","memberid",$t['memberid']);//重新抓取]
							if($x[8]){
								addgamerank($x[8]);
							}
							if($x[10]){
								addgamerank($x[10]);
							}
							if($x[12]){
								addgamerank($x[12]);
							}
							for($x=0;$x<count($tb);$x++){
								unset($tb[$x]);
							}
							unset($tb['password']);
							$_SESSION['userid']=$tb['memberid'];
							$_SESSION['isver']=$tb['phonev'];
							if($tb['refurl']){
							}else{
								$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
								$mt=json_decode($texp);
								$tb['refurl']=$mt->id;;
								share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
							}
							$out[0]="OK";
							$out[1]=$tb;
							$out[2]=$_SESSION['userid'];
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤";
						}
					}else if($_SESSION['fbid'] && $t=share_getinfo($pdo ,"mem_","fbid",$_SESSION['fbid'])){/*FB註冊*/
						$ins="";
						if($x[8]){
							$ins.=",game1='".$x[8]."',game1note='".$x[9]."'";
						}
						if($x[10]){
							$ins.=",game2='".$x[10]."',game2note='".$x[11]."'";
						}
						if($x[12]){
							$ins.=",game3='".$x[12]."',game3note='".$x[13]."'";
						}
						if(share_update($pdo ,"mem_","gender='".$x[2]."',nickname='".$x[1]."',birthday='".$x[3]."-".$x[4]."-".$x[5]."',location='".$x[6]."',contact_email='".$x[7]."'".$ins.",gtid='".$x[14]."',headpic='".$x[15]."',score='".$basp."',points='".$basp."',lastIP='".GetIP()."',actcode=1","fbid='".$_SESSION['fbid']."'")){
							$tb=share_getinfo($pdo ,"mem_","memberid",$t['memberid']);//重新抓取]
							if($x[8]){
								addgamerank($x[8]);
							}
							if($x[10]){
								addgamerank($x[10]);
							}
							if($x[12]){
								addgamerank($x[12]);
							}
							for($x=0;$x<count($tb);$x++){
								unset($tb[$x]);
							}
							unset($tb['password']);
							$_SESSION['userid']=$tb['memberid'];
							$_SESSION['isver']=$tb['phonev'];
							if($tb['refurl']){
							}else{
								$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
								$mt=json_decode($texp);
								$tb['refurl']=$mt->id;;
								share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
							}
							$out[0]="OK";
							$out[1]=$tb;
							$out[2]=$_SESSION['userid'];
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤";
						}
					}else if(($_SESSION['phonenum'] && $t=share_getinfo($pdo ,"mem_","phonenum",$_SESSION['phonenum'])) || ($_SESSION['email'] && $t=share_getinfo($pdo ,"mem_","email",$_SESSION['email']))){
						$ins="";
						if($x[8]){
							$ins.=",game1='".$x[8]."',game1note='".$x[9]."'";
						}
						if($x[10]){
							$ins.=",game2='".$x[10]."',game2note='".$x[11]."'";
						}
						if($x[12]){
							$ins.=",game3='".$x[12]."',game3note='".$x[13]."'";
						}
						if(share_update($pdo ,"mem_","gender='".$x[2]."',nickname='".$x[1]."',birthday='".$x[3]."-".$x[4]."-".$x[5]."',location='".$x[6]."',contact_email='".$x[7]."' ".$ins." ,gtid='".$x[14]."',headpic='".$x[15]."',score='".$basp."',points='".$basp."',lastIP='".GetIP()."'","memberid='".$t['memberid']."'")){
							$tb=share_getinfo($pdo ,"mem_","memberid",$t['memberid']);//重新抓取]
							if($x[8]){
								addgamerank($x[8]);
							}
							if($x[10]){
								addgamerank($x[10]);
							}
							if($x[12]){
								addgamerank($x[12]);
							}
							for($x=0;$x<count($tb);$x++){
								unset($tb[$x]);
							}
							unset($tb['password']);
							$_SESSION['userid']=$tb['memberid'];
							$_SESSION['isver']=$tb['phonev'];
							if($tb['refurl']){
							}else{
								$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
								$mt=json_decode($texp);
								$tb['refurl']=$mt->id;;
								share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
							}
							$out[0]="OK";
							$out[1]=$tb;
							$out[2]=$_SESSION['userid'];
						}else{
							$out[0]="ERR";
							$out[1]="存入錯誤";
						}
					}else if($_SESSION['actcode']){
						$out[0]="ERR";
						$out[1]="會員已認證完畢或認證資料不存在,請嘗試登入試試,謝謝";
					}else if($_SESSION['fbid']){
						$out[0]="ERR";
						$out[1]="無法找到註冊的fb帳號,請使用fb帳號重新註冊,謝謝";
					}else{
						$out[0]="ERR";
						$out[1]="不正常的錯誤,請嘗試登入試試,謝謝";
					}
				}
 		  }else{
				$out[0]="ERR";
				$out[1]="資料不足,不正常的錯誤";
			}
		//}else{
				//$out[0]="ERR";
				//$out[1]=$errText['reopen'];
		//}
		echo json_encode($out);
	}
	//忘記密碼
	function mem_forget($x){
		global $conf;
		$out="";
		$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdo -> exec("set names ".$conf['db_encode']);
		$t=share_getinfo($pdo ,"mem_","email",$x[1]);
		$pdo=null;
		if($t){//找到
			$out[0]="OK";
			sendmail('2',$t['email'],$t['password']);
		}else{
			$out[0]="ERR";
			$out[1]="對不起,我們無法找到您的資料,建議您重新註冊";
		}
		echo json_encode($out);
	}
	function mem_getpoint($x){
		global $conf;
		$out=array();
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
		$pdop -> exec("set names ".$conf['db_encode']);
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$m=share_getinfo($pdom,"mem_","memberid",$_SESSION['userid']);
			unset($m['password']);
			for($x=0;$x<count($m);$x++){
				unset($m[$x]);
			}
			$out[0]="OK";
			$out[1]=$m;
			$p=share_gettable($pdop,"poi_ WHERE memberid='".$m['memberid']."' AND  DATEDIFF(CURDATE(),dateadd)<=10  order by thisid DESC");
			$out[2]=$p;
		}
		$pdop=null;
		$pdom=null;
		echo json_encode($out);
	}
	//驗證 檢查會員存在--
	function mem_chkmem($x){
		global $conf;
		$out=array();
		$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdo -> exec("set names ".$conf['db_encode']);
		$t=share_getinfo($pdo ,"mem_","actcode",$x[1]);
		$pdo=null;

		if($t){//找到
			$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
			//share_update($pdo ,"mem_","actcode=1","actcode='".$x[1]."'");
			$_SESSION['tempuserid']=$t['memberid'];
			$_SESSION['key']=$temp;
			$_SESSION['actcode']=$x[1];
			$_SESSION['tesmid']=$x[1];
			$t[1]="0"; //20190604 Pman 把密碼藏掉
			$t['password']="0"; //20190604 Pman 把密碼藏掉

			$out[0]="OK";
			$out[1]=$t;
			$out[2]=$temp;
		}else{
			$out[0]="ERR";
			$out[1]="對不起,我們無法找到您的驗證資料,可能時間過久或其他原因,建議重新註冊";
			$out[2]=$x[1];
		}
		echo json_encode($out);
	}
	//登入
	function mem_login($x){
		global $conf;
		global $mrr;
		$out=array();
		if($x[0]=="3"){// fb登入-舉得安全號
			$_SESSION['fbstart']=time();
			$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
			$_SESSION['fbcode']=$temp;
			$out[0]=$temp;
			echo json_encode($out);
		}else if($x[0]=="2"){// fb登入
			$_SESSION['fbstart']=time();
			$_SESSION['fbcode']="123456axc";
			if( !empty($_SESSION['fbcode']) &&  $_SESSION['fbcode']==$x[5]){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdo -> exec("set names ".$conf['db_encode']);
				share_update($pdo ,"mem_","locker='1',lockertime=null","lockertime<CURDATE()");
				if($t=share_getinfo($pdo ,"mem_","fbid",$x[1])){
					//if($x[2]==$t['fbname'] && ($x[3]==$t['fbmail'] || (empty($x[3]) && $t['fbmail']=="" )) && ($x[4]==$t['fbbirth'] || (empty($x[4]) && $t['fbbirth']=="")) ){
						if($t['actcode']==1 && $t['nickname']){
							if($t['locker']==1){
								if(!empty($x[6])){
									share_update($pdo,"mem_","fcmid=null","fcmid='".$x[6]."'");
									share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[6]."',mobtype='".$x[7]."'","memberid='".$t['memberid']."'");
								}else{
									share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW()","memberid='".$t['memberid']."'");
								}
								$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
								$_SESSION['userid']=$t['memberid'];
								$_SESSION['isver']=$t['phonev'];
								if($t['phonev'] !=1){
									send_vnotice($t['memberid']);
								}
								if($t['refurl']){
								}else{
									$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
									$mt=json_decode($texp);
									$t['refurl']=$mt->id;
									share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
								}
								$_SESSION['key']=$temp;
								unset($t['password']);
								for($x=0;$x<count($t);$x++){
									unset($t[$x]);
								}
								$out[0]="OK";
								$out[1]=$t;
								$out[2]=$_SESSION['userid'];
								$out[3]=$_SESSION['key'];
								$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
								$pdop -> exec("set names ".$conf['db_encode']);
								$out[4]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010'");
								$out[5]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012'");
								$out[6]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='014'");
								$out[7]=$_SESSION['userid']*1357531+1358743953456;
								$out[8]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='020'");
								$pdop=null;
							}else{
								$out[0]="ERR";
								$out[1]="此帳號已被鎖定，若須解除請聯絡管理單位（透過聯絡我們按鈕） ";
							}
						}else{//送去註冊後續流程
							$out[0]="OKFB";
							for($y=0;$y<count($t);$y++){
								unset($t[$y]);
							}
							unset($t['password']);
							$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
							$_SESSION['key']=$temp;
							$_SESSION['fbid']=$x[1];
							$out[1]=$t;
							$out[2]=$_SESSION['key'];
							//$out[1]=$t['actcode'];
							//這是自動登入用...2019/5/14 此時尚未正式完成
							$out[3]=$t['memberid'];
							$out[4]=$_SESSION['userid']*1357531+1358743953456;
						}
				}else{
					$out[0]="ERR";
					//$out[1]="無法找到FB相關紀錄,或FB資料已修改,請使用FB串接功能更新紀錄,謝謝";
					$out[1]="你似乎未使用FB註冊過，請先同意「會員規範&隱私權條款」！";//20190322 Pman 修改未使用FB註冊過的錯誤訊息
				}
			}else{
				$out[0]="ERR";
				$out[1]="授權逾時,請再重新試試";
			}
			echo json_encode($out);
		}else{//帳密登入
			//$test=test_capcodesub($x[1]);
			$test[0]="PASS";
			if($test[0]=="PASS"){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdo -> exec("set names ".$conf['db_encode']);
				share_update($pdo ,"mem_","locker='1',lockertime=null","lockertime<CURDATE()");
				if($x[4] && $x[4]!="ios" && $x[4]!="android" && $t=share_getfree($pdo ,"SELECT * FROM mem_ WHERE fbid='".$x[4]."' AND email<>'".$x[2]."'")){//保留串接功能
					$out[0]="ERR";
					$out[1]="此fbid 已與其他帳後串接,無法再次使用";
				}else if($t=share_getinfo($pdo ,"mem_","email",$x[1])){
					if($t['password']==$x[2]){
						if($t['actcode']==1 && $t['nickname']){
								if($t['locker']==1){
									if(!empty($x[4])){//
										//這個更新餘4/9/2019 因為匯把 mobtype值放進 fbid
										if(!empty($x[3])){
											share_update($pdo,"mem_","fcmid=null,mobtype=null","fcmid='".$x[3]."'");
										}
										share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[3]."',mobtype='".$x[4]."'","memberid='".$t['memberid']."'");
										//share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fbid='".$x[4]."',fbname='".$x[5]."',fbmail='".$x[6]."',fbbirth='".$x[7]."'","memberid='".$t['memberid']."'");
									}else if(!empty($x[3])){
										share_update($pdo,"mem_","fcmid=null,mobtype=null","fcmid='".$x[3]."'");
										share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[3]."'","memberid='".$t['memberid']."'");
									}else{
										share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW()","memberid='".$t['memberid']."'");
									}
									$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
									$_SESSION['key']=$temp;
									$_SESSION['userid']=$t['memberid'];
									$_SESSION['isver']=$t['phonev'];
									if($t['phonev'] !=1){
										send_vnotice($t['memberid']);
									}
									if($t['refurl']){
									}else{
										$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
										$mt=json_decode($texp);
										$t['refurl']=$mt->id;;
										share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
									}
									unset($t['password']);
									for($x=0;$x<count($t);$x++){
										unset($t[$x]);

									}
									$out[0]="OK";
									$out[1]=$t;
									$out[2]=$_SESSION['userid'];
									$out[3]=$_SESSION['key'];
									$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
									$pdop -> exec("set names ".$conf['db_encode']);
									$out[4]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010'");
									$out[5]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012'");
									$out[6]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='014'");
									$out[7]=$_SESSION['userid']*1357531+1358743953456;
									$out[8]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='020'");
									$pdop=null;
								}else{
									$out[0]="ERR";
									$out[1]="此帳號已被鎖定，若須解除請聯絡管理單位（透過聯絡我們按鈕） ";
								}
						}else{
							$out[0]="OKFB";
							for($y=0;$y<count($t);$y++){
								unset($t[$y]);
							}
							unset($t['password']);
							$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
							$_SESSION['key']=$temp;
							$_SESSION['email']=$x[1];
							$out[1]=$t;
							$out[2]=$_SESSION['key'];
							//這是自動登入用...2019/5/14 此時尚未正式完成
							$out[3]=$t['memberid'];
							$out[4]=$_SESSION['userid']*1357531+1358743953456;
						}
					}else{
						$out[0]="ERR";
						$out[1]="密碼錯誤";
					}
				}else if($t=share_getinfo($pdo ,"mem_","phonenum",$x[1]) ){
					if($t['password']==$x[2]){
						if($t['actcode']==1 && $t['nickname']){//還沒填詳細資料
								if($t['locker']==1){
									if(!empty($x[4])){//
										//這個更新餘4/9/2019 因為匯把 mobtype值放進 fbid
										if(!empty($x[3])){
											share_update($pdo,"mem_","fcmid=null,mobtype=null","fcmid='".$x[3]."'");
										}
										share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[3]."',mobtype='".$x[4]."'","memberid='".$t['memberid']."'");
										//share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fbid='".$x[4]."',fbname='".$x[5]."',fbmail='".$x[6]."',fbbirth='".$x[7]."'","memberid='".$t['memberid']."'");
									}else if(!empty($x[3])){
											share_update($pdo,"mem_","fcmid=null,mobtype=null","fcmid='".$x[3]."'");
											share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[3]."',mobtype=''","memberid='".$t['memberid']."'");
									}else{
											share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW()","memberid='".$t['memberid']."'");
									}
									$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
									$_SESSION['key']=$temp;
									$_SESSION['userid']=$t['memberid'];
									$_SESSION['isver']=$t['phonev'];
									if($t['phonev'] !=1){
										send_vnotice($t['memberid']);
									}
									if($t['refurl']){
									}else{
										$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
										$mt=json_decode($texp);
										$t['refurl']=$mt->id;;
										share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
									}
									unset($t['password']);
									for($x=0;$x<count($t);$x++){
										unset($t[$x]);

									}
									$out[0]="OK";
									$out[1]=$t;
									$out[2]=$_SESSION['userid'];
									$out[3]=$_SESSION['key'];
									$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
									$pdop -> exec("set names ".$conf['db_encode']);
									$out[4]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010'");
									$out[5]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012'");
									$out[6]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='014'");
									$out[7]=$_SESSION['userid']*1357531+1358743953456;
									$out[8]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='020'");
									$pdop=null;
								}else{
									$out[0]="ERR";
									$out[1]="此帳號已被鎖定，若須解除請聯絡管理單位（透過聯絡我們按鈕） ";
								}
						}else{//送去詳細資料
							$out[0]="OKFB";
							for($y=0;$y<count($t);$y++){
								unset($t[$y]);
							}
							unset($t['password']);
							$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
							$_SESSION['key']=$temp;
							$_SESSION['phonenum']=$x[1];
							$out[1]=$t;
							$out[2]=$_SESSION['key'];
							//這是自動登入用...2019/5/14 此時尚未正式完成
							$out[3]=$t['memberid'];
							$out[4]=$_SESSION['userid']*1357531+1358743953456;
						}
					}else{
						$out[0]="ERR";
						$out[1]="密碼錯誤";
					}
				}else if($t=share_getinfo($pdo ,"mem_","phonenum","+886".ltrim($x[1],"0")) ){
					if($t['password']==$x[2]){
						if($t['actcode']==1 && $t['nickname']){//還沒填詳細資料
							if($t['locker']==1){
								if(!empty($x[4])){//
									//這個更新餘4/9/2019 因為匯把 mobtype值放進 fbid
									if(!empty($x[3])){
										share_update($pdo,"mem_","fcmid=null,mobtype=null","fcmid='".$x[3]."'");
									}
									share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[3]."',mobtype='".$x[4]."'","memberid='".$t['memberid']."'");
									//share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fbid='".$x[4]."',fbname='".$x[5]."',fbmail='".$x[6]."',fbbirth='".$x[7]."'","memberid='".$t['memberid']."'");
								}else if(!empty($x[3])){
										share_update($pdo,"mem_","fcmid=null,mobtype=null","fcmid='".$x[3]."'");
										share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fcmid='".$x[3]."',mobtype='".$x[4]."'","memberid='".$t['memberid']."'");
								}else{
										share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW()","memberid='".$t['memberid']."'");
								}
								$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
								$_SESSION['key']=$temp;
								$_SESSION['userid']=$t['memberid'];
								$_SESSION['isver']=$t['phonev'];
								if($t['phonev'] !=1){
									send_vnotice($t['memberid']);
								}
								if($t['refurl']){
								}else{
									$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
									$mt=json_decode($texp);
									$t['refurl']=$mt->id;;
									share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
								}
								unset($t['password']);
								for($x=0;$x<count($t);$x++){
									unset($t[$x]);

								}
								$out[0]="OK";
								$out[1]=$t;
								$out[2]=$_SESSION['userid'];
								$out[3]=$_SESSION['key'];
								$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
								$pdop -> exec("set names ".$conf['db_encode']);
								$out[4]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010'");
								$out[5]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012'");
								$out[6]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='014'");
								$out[7]=$_SESSION['userid']*1357531+1358743953456;
								$out[8]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='020'");
								$pdop=null;
							}else{
								$out[0]="ERR";
								$out[1]="此帳號已被鎖定，若須解除請聯絡管理單位（透過聯絡我們按鈕） ";
							}
						}else{
							$out[0]="OKFB";
							for($y=0;$y<count($t);$y++){
								unset($t[$y]);
							}
							unset($t['password']);
							$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
							$_SESSION['key']=$temp;
							$_SESSION['phonenum']="+886".ltrim($x[1],"0");
							$out[1]=$t;
							$out[2]=$_SESSION['key'];
							//這是自動登入用...2019/5/14 此時尚未正式完成
							$out[3]=$t['memberid'];
							$out[4]=$_SESSION['userid']*1357531+1358743953456;
						}
					}else{
						$out[0]="ERR";
						$out[1]="密碼錯誤";
					}

				}else{
					$out[0]="ERR";
					$out[1]="找不到帳戶相關資料";
				}
				$pdo= null;
				echo json_encode($out);
			}else{
				echo json_encode($test);
			}
		}
	}
	function mem_logoff($x){
		unset ($_SESSION['key']);
		unset ($_SESSION['userid']);
		$out=array();
		$out[0]="OK";
		echo json_encode($out);
	}
	function mem_autologin($x){
		global $conf;
		global $mrr;
		$out=array();
			$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdo -> exec("set names ".$conf['db_encode']);
			if((($x[1]-1358743953456)/1357531)==$x[0]){//正確
				$t=share_getinfo($pdo ,"mem_","memberid",$x[0]);
				if($t['actcode']==1){

					if($t['refurl']){
					}else{
						$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$x[0]*13));//20190116 Pman 改成依實際情況判斷是http還是https
						$mt=json_decode($texp);
						$t['refurl']=$mt->id;;
						share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$x[0]."'");
					}
					share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW()","memberid='".$t['memberid']."'");
					$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
					$_SESSION['userid']=$t['memberid'];
					$_SESSION['isver']=$t['phonev'];
					if($t['phonev'] !=1){
						send_vnotice($t['memberid']);
					}
					$_SESSION['key']=$temp;
					unset($t['password']);
					for($x=0;$x<count($t);$x++){
						unset($t[$x]);
					}
					$out[0]="OK";
					$out[1]=$t;
					$out[2]=$_SESSION['userid'];
					$out[3]=$_SESSION['key'];
					$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
					$pdop -> exec("set names ".$conf['db_encode']);
					$out[4]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='010'");
					$out[5]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='012'");
					$out[6]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='014'");
					$out[7]=$_SESSION['userid']*1357531+1358743953456;
					$out[8]=[];
					$out[8][0]['gameid']="999999";
					$out[8][0]['show']="1";
					$b=1;
					for($a=1;$a<4;$a++){
						$temp="game".$a;
						if($t[$temp]){
							$out[8][$b]['gameid']=$t[$temp];
							$out[8][$b]['show']="1";
							$b++;
						}
					}
					$pdop=null;
				}else{
					$out[0]="ERR";
					$out[1]="這個帳號尚未啟用,錯誤不明,謝謝";
				}
			}else{
				$out[0]="ERR";
			}
		$pdo= null;
		echo json_encode($out);
	}
	// check if session exist
	function chk_mem($x){
                $out=array();
		if($_SESSION['userid'] && $x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){
			$out[0]="OK";
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}
	//更新會員資料...
	function reget_mem($x){
            $out=array();
		if($_SESSION['userid']){
			global $conf;
			$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdo -> exec("set names ".$conf['db_encode']);
			if($t=share_getinfo($pdo ,"mem_","memberid",$_SESSION['userid'])){
				unset($t['password']);
				for($x=0;$x<count($t);$x++){
					unset($t[$x]);
				}
				$out[0]="OK";
				$out[1]=$t;
			}else{
				$out[0]="ERR";
			}
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}
	//更新登入狀況
	function chk_online($x){
		global $conf;
		global $mrr;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$out[0]="OK";
			$pdo = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdo -> exec("set names ".$conf['db_encode']);
			share_del($pdo,"onl_ WHERE timekey<(".time()."-200)");//刪除太久沒上的
			if($t=share_getinfo($pdo,"onl_","memberid",$_SESSION['userid'])){	//有值
				share_update($pdo,"onl_","timekey='".time()."'","memberid='".$_SESSION['userid']."'");
			}else{
				share_insert($pdo,"onl_","memberid,timekey","'".$_SESSION['userid']."','".time()."'");
			}
			$pdo=null;
			$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
			$pdop -> exec("set names ".$conf['db_encode']);
			//if($t=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='001' AND dateadd>( NOW() - INTERVAL 1 DAY )")){//已經加過點了
			if($t=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='001' AND FROM_UNIXTIME(Unix_Timestamp(dateadd), '%Y-%m-%d')=CURRENT_DATE()")){//已經加過點了 //20190404 Pman 改成過午夜12點就符合條件
			}else{
				$tt=get_point('3');
				if($_SESSION['isver']=="1"){add_point($_SESSION['userid'],$tt,'001',"登入獎勵");}
			}
			$pdop=null;
		}else{
			$out[0]="NO";
		}
		echo json_encode($out);
	}
	//檢查通知的更新
	function chk_notice($x){
		//確認聊天室
		chat_chk_note();
		global $conf;
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$out[0]="OK";
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
			$pdoc -> exec("set names ".$conf['db_encode']);
			$out[0]=share_getcount($pdod,"friend_ WHERE friendid='".$_SESSION['userid']."' AND viewed=0");//好友-有人邀請
			//$out[0]=share_getcount($pdod,"friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0");//好友-有人邀請
			$out[1]=share_getcount($pdod,"not_ WHERE memberid='".$_SESSION['userid']."'  AND viewed=0");//通知
			$out[2]=share_getcount($pdoc,"rnot_ WHERE memberid='".$_SESSION['userid']."'  AND viewed=0");//聊天通知
			$pdoc=null;
			$pdod=null;
		}
		echo json_encode($out);
	}
	//清除 view =0;
	function clr_notice($x){
            global $conf;
            $out=array();
            if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
                $out[0]="OK";
                if($x[2]=="popnoticbell"){
                    $pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
                    $pdod -> exec("set names ".$conf['db_encode']);
                    $pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
                    $pdom -> exec("set names ".$conf['db_encode']);
                    //	$temp=share_gettable($pdod,"not_ WHERE viewed=0 AND memberid='".$_SESSION['userid']."' order by thisid desc");
                    $temp=share_gettable($pdod,"not_ WHERE viewed=0 AND memberid='".$_SESSION['userid']."' order by thisid desc");
                    share_update($pdod,"not_","viewed=1","memberid='".$_SESSION['userid']."'");//通知
                    if($temp && count($temp)<10){
                        $tempb=share_gettable($pdod,"not_ WHERE memberid='".$_SESSION['userid']."'  order by thisid desc limit ".(10-count($temp))."");
                        array_merge($temp, $tempb);
                    }else{
                        $temp=share_gettable($pdod,"not_ WHERE memberid='".$_SESSION['userid']."'  order by thisid desc limit 10");
                    }
                    for($a=0;$a<count($temp);$a++){
                        if($temp[$a]['fromid']){
                            $tb=share_getinfo($pdom,"mem_","memberid",$temp[$a]['fromid']);
                            $temp[$a]['headpic']=$tb['headpic'];
                        }else{
                            $temp[$a]['headpic']="";
                        }
                        if($temp[$a]['typeid']=="4"){//攻略--連去攻略
                            $tx=share_getinfo($pdod,"art_","contentid",$temp[$a]['thislink']);
                            $temp[$a]['thislink']=$tx['thisid'];
                        }
                    }
                    $out[1]=$temp;
                    $pdod=null;
                }
                        /*
                        else if($x[2]=="popnoticcommenttest"){
                                $pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
                                $pdoc -> exec("set names ".$conf['db_encode']);
                                $pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
                                $pdom -> exec("set names ".$conf['db_encode']);
                                //$temp=share_gettable($pdoc,"rnot_ WHERE viewed=0 AND memberid='".$_SESSION['userid']."'");
                                //抓有未讀的...
                                //$out[1]="SELECT roomid,count(*) as cc FROM con_ WHERE  memberid='".$_SESSION['userid']."' AND viewed<>1 group by roomid";
                                $out[1]="";
                                $nr=share_getfree($pdoc,"SELECT roomid,count(*) as cc FROM con_ WHERE  memberid='".$_SESSION['userid']."' AND viewed<>1 group by roomid");
                                $out[1].="<BR>nr:".count($nr);
                                $rlist="";
                                if($nr){
                                        for($a=0;$a<count($nr);$a++){
                                                if($rlist){
                                                        $rlist.=",'".$nr[$a]['roomid']."'";
                                                }else{
                                                        $rlist="'".$nr[$a]['roomid']."'";
                                                }
                                        }
                                }
                                //$out[1].="<BR>rlist:".$rlist;
                                //抓剩下的
                                if($rlist){
                                        $yr=share_getfree($pdoc,"SELECT u.roomid,r.timekey FROM usr_ as u,roo_ as r  WHERE u.roomid=r.roomid AND u.memberid='".$_SESSION['userid']."' AND r.timekey>(".time()."-86400*7) AND r.roomid not in (".$rlist.") order by r.timekey desc");
                                }else{
                                        $yr=share_getfree($pdoc,"SELECT u.roomid,r.timekey FROM usr_ as u,roo_ as r  WHERE u.roomid=r.roomid AND u.memberid='".$_SESSION['userid']."' AND r.timekey>(".time()."-86400*7)  order by r.timekey desc");
                                }
                                //$out[1].="<BR>yr:SELECT u.roomid,r.timekey FROM usr_ as u,roo_ as r  WHERE u.roomid=r.roomid AND u.memberid='".$_SESSION['userid']."' AND r.timekey>(".time()."-86400*7) AND r.roomid not in (".$rlist.") order by r.timekey desc";
                                $out[1].="<BR>YR count:".count($yr);
                                for($a=0;$a<count($yr);$a++){
                                        $yr[$a]['do']=share_gettable($pdoc,"usr_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."'")[0]['dont'];
                                        $out[1].="<BR>YR do: usr_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."'";
                                        $yr[$a]['last']=share_gettable($pdoc,"con_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."' AND fromid<>'".$_SESSION['userid']."' order by timekey DESC limit 1")[0];
                                        $out[1].="<BR>YR last:	con_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."' AND fromid<>'".$_SESSION['userid']."' order by timekey DESC limit 1";
                                        $gr=share_gettable($pdoc,"usr_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid<>'".$_SESSION['userid']."'");
                                        if(count($gr)>1){
                                                for($b=0;$b<2;$b++){
                                                                $tb=share_getinfo($pdom,"mem_","memberid",$gr[$b]['memberid']);
                                                                if($yr[$a]['last']['oname']){
                                                                        $yr[$a]['last']['oname'].=",".$tb['nickname'];
                                                                }else{
                                                                        $yr[$a]['last']['oname']=$tb['nickname'];
                                                                }
                                                }
                                                if(count($gr)>2){
                                                        $yr[$a]['last']['oname'].="...(".count($gr).")";
                                                }
                                                $yr[$a]['last']['headpic']="group";
                                        }else{
                                                $tb=share_getinfo($pdom,"mem_","memberid",$gr[0]['memberid']);
                                                $yr[$a]['last']['headpic']=$tb['headpic'];
                                                $yr[$a]['last']['oname']=$tb['nickname'];
                                        }
                                }
                                if($nr && $yr){
                                        $tr=$nr+$yr;
                                }else if($nr){
                                        $tr=$nr;
                                }else if($yr){
                                        $tr=$yr;
                                }
                                $out[1].="<BR>TR count:".count($tr);
                                $out[1].="<BR>".$tr;
                                $pdoc=null;
                        }*/
                else if($x[2]=="popnoticcomment"){
                    $pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
                    $pdoc -> exec("set names ".$conf['db_encode']);
                    $pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
                    $pdom -> exec("set names ".$conf['db_encode']);
                    //$temp=share_gettable($pdoc,"rnot_ WHERE viewed=0 AND memberid='".$_SESSION['userid']."'");
                    //抓有未讀的...
                    $nr=share_getfree($pdoc,"SELECT roomid,count(*) as cc FROM con_ WHERE  memberid='".$_SESSION['userid']."' AND viewed<>1 group by roomid");
                    $rlist="";
                    if($nr){
                        for($a=0;$a<count($nr);$a++){
                            if($rlist){
                                $rlist.=",'".$nr[$a]['roomid']."'";
                            }else{
                                $rlist="'".$nr[$a]['roomid']."'";
                            }
                            $nr[$a]['do']=share_gettable($pdoc,"usr_ WHERE roomid='".$nr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."'")[0]['dont'];
                            $nr[$a]['last']=share_gettable($pdoc,"con_ WHERE roomid='".$nr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."' AND fromid<>'".$_SESSION['userid']."' AND viewed<>1 order by timekey DESC limit 1")[0];
                            $gr=share_gettable($pdoc,"usr_ WHERE roomid='".$nr[$a]['roomid']."' AND memberid<>'".$_SESSION['userid']."'");
                            if(count($gr)>1){
                                for($b=0;$b<2;$b++){
                                    $tb=share_getinfo($pdom,"mem_","memberid",$gr[$b]['memberid']);
                                    if($nr[$a]['last']['oname']){
                                        $nr[$a]['last']['oname'].=",".$tb['nickname'];
                                    }else{
                                        $nr[$a]['last']['oname']=$tb['nickname'];
                                    }
                                }
                                if(count($gr)>2){
                                    $nr[$a]['last']['oname'].="...(".count($gr).")";
                                }
                                $nr[$a]['last']['headpic']="group";
                            }else{
                                $tb=share_getinfo($pdom,"mem_","memberid",$gr[0]['memberid']);
                                $nr[$a]['last']['headpic']=$tb['headpic'];
                                $nr[$a]['last']['oname']=$tb['nickname'];
                            }
                        }
                    }
                    //抓剩下的
                    if($rlist){
                        $yr=share_getfree($pdoc,"SELECT u.roomid,r.timekey FROM usr_ as u,roo_ as r  WHERE u.roomid=r.roomid AND u.memberid='".$_SESSION['userid']."' AND r.timekey>(".time()."-86400*300) AND r.roomid not in (".$rlist.") order by r.timekey desc");
                    }else{
                        $yr=share_getfree($pdoc,"SELECT u.roomid,r.timekey FROM usr_ as u,roo_ as r  WHERE u.roomid=r.roomid AND u.memberid='".$_SESSION['userid']."' AND r.timekey>(".time()."-86400*300)  order by r.timekey desc");
                    }
                    for($a=0;$a<count($yr);$a++){
                        $yr[$a]['do']=share_gettable($pdoc,"usr_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."'")[0]['dont'];
                        $yr[$a]['last']=share_gettable($pdoc,"con_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid='".$_SESSION['userid']."' AND fromid<>'".$_SESSION['userid']."' order by timekey DESC limit 1")[0];
                        $gr=share_gettable($pdoc,"usr_ WHERE roomid='".$yr[$a]['roomid']."' AND memberid<>'".$_SESSION['userid']."'");
                        if(count($gr)>1){
                            for($b=0;$b<2;$b++){
                                $tb=share_getinfo($pdom,"mem_","memberid",$gr[$b]['memberid']);
                                if($yr[$a]['last']['oname']){
                                    $yr[$a]['last']['oname'].=",".$tb['nickname'];
                                }else{
                                    $yr[$a]['last']['oname']=$tb['nickname'];
                                }
                            }
                            if(count($gr)>2){
                                $yr[$a]['last']['oname'].="...(".count($gr).")";
                            }
                            $yr[$a]['last']['headpic']="group";
                        }else{
                            $tb=share_getinfo($pdom,"mem_","memberid",$gr[0]['memberid']);
                            $yr[$a]['last']['headpic']=$tb['headpic'];
                            $yr[$a]['last']['oname']=$tb['nickname'];
                        }
                    }
                    share_update($pdoc,"rnot_","viewed=1","memberid='".$_SESSION['userid']."'");//聊天通知關掉
                    if($nr && $yr){
                        //array_push($nr,$yr);
                        //$out[1]=$nr+$yr;
                        $out[1]=array_merge($nr, $yr);
                    }else if($nr){
                        $out[1]=$nr;
                    }else if($yr){
                        $out[1]=$yr;
                    }else{
                        $out[1]="";
                    }
                    $pdoc=null;
                }else if($x[2]=="popnoticuser"){//這個要改成 直接顯示邀請內容
                    $pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
                    $pdod -> exec("set names ".$conf['db_encode']);
                    $pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
                    $pdom -> exec("set names ".$conf['db_encode']);
                    $me=share_gettable($pdod,"friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0 order by thisid desc");//
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
                        $out[0]="OK";
                        $out[1]=NULL;
                        //					$out[0]="ERR";
                        //					$out[1]="目前無資料";
                    }
                    //$temp=share_gettable($pdod,"rnot_ WHERE viewed=1 AND memberid='".$_SESSION['userid']."'");
                    //share_update($pdod,"friend_","viewed=1","friendid='".$_SESSION['userid']."'");//聊天通知
                    $pdod=null;
                }else{
                    $out[0]="ERR";
                    $out[1]="缺乏項目資料";
                }
            }else{
                $out[0]="ERR";
            }
            echo json_encode($out);
	}

	// 取出 notice內容
	function get_navpop($x){
		global $conf;
		$out[0]="OK";
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
			$pdod -> exec("set names ".$conf['db_encode']);
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			if($x[2]=="notice"){
				if($x[3]>0){
					$out[1]=share_gettable($pdod,"not_ WHERE memberid='".$_SESSION['userid']."' AND thisid<'".$x[3]."' order by thisid DESC limit 5");
				}else{
					$out[1]=share_gettable($pdod,"not_ WHERE memberid='".$_SESSION['userid']."' order by thisid DESC limit 5");
				}
				for($a=0;$a<count($out[1]);$a++){
					if($out[1][$a]['typeid']=="4"){//攻略--連去攻略
						$tx=share_getinfo($pdod,"art_","contentid",$out[1][$a]['thislink']);
						$out[1][$a]['thislink']=$tx['thisid'];
					}
					$temp=share_getinfo($pdom,"mem_","memberid",$out[1][$a]['memberid']);
					$out[1][$a]['user']=$temp['nickname'];
					$out[1][$a]['uid']=$temp['memberid'];
				}
			}else if ($x[2]=="addfriend"){
				if($x[3]>0){
					$out[1]=share_gettable($pdod,"friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0 AND thisid<'".$x[3]."' order by thisid DESC limit 5");
				}else{
					$out[1]=share_gettable($pdod,"friend_ WHERE friendid='".$_SESSION['userid']."' AND ispass=0 order by thisid DESC limit 5");
				}
				for($a=0;$a<count($out[1]);$a++){
					$temp=share_getinfo($pdom,"mem_","memberid",$out[1][$a]['memberid']);
					$out[1][$a]['user']=$temp['nickname'];
					$out[1][$a]['uid']=$temp['memberid'];
				}
			}else if ($x[2]=="chat"){
				$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
				$pdoc -> exec("set names ".$conf['db_encode']);
				if($x[3]>0){
					$out[1]=share_gettable($pdoc,"rnot_ WHERE memberid='".$_SESSION['userid']."' AND thisid<'".$x[3]."'  order by thisid DESC limit 5");
				}else{
					$out[1]=share_gettable($pdoc,"rnot_ WHERE memberid='".$_SESSION['userid']."'  order by thisid DESC limit 5");
				}
				$pdoc=null;
			}
			$pdod=null;
			$pdom=null;
		}
		echo json_encode($out);
	}
	//註冊
	function mem_reg($x){
		global $conf;
		global $mrr;
		$out=array();
		//$test=test_capcodesub($x[1]);
		$test[0]="PASS";
		if($test[0]=="PASS"){
			$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdo -> exec("set names ".$conf['db_encode']);
			//刪除過久的
			share_del($pdo ,"mem_ WHERE actcode<>'1' AND DATEDIFF(CURDATE(),dateadd)>".$conf['actkeep']);
			if(share_getinfo($pdo ,"mem_","email",$x[2])){
				$out[0]="ERR";
				$out[1]="此帳號已註冊";
			}
			else if($x[5]!=$_SESSION['vercode']){
				$out[0]="ERR";
				$out[1]="手機簡訊驗證碼錯誤";
                                $out[2]=$_SESSION['vercode'];
			}
			else if($x[3]==$x[4]){
				$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
				$fcname="";
				$fcmid="";
				if($x[8]){
					$fcname=",fcmid,mobtype";
					$fcmid=",'".$x[8]."','".$x[9]."'";
					share_update($pdo,"mem_","fcmid=null","fcmid='".$x[8]."'");
				}
				if(share_insert($pdo ,"mem_","email,password,actcode,phonenum,phonev".$fcname,"'".$x[2]."','".$x[3]."','1','".$_SESSION['phonenum']."',1".$fcmid)){
					//送入介紹
					if($x[7]){//有人介紹
						$myinfo=share_getinfo($pdo ,"mem_","email",$x[2]);
						$fid=($x[7]-10000000000000)/13;
						$refinfo=share_getinfo($pdo ,"mem_","memberid",$fid);
						$mid=10000000000000+$myinfo['memberid']*13;
						share_insert($pdo ,"reflist","refid,refname,memberid,memname,regtime,isexport","'".$x[7]."','".$refinfo['nickname']."','".$mid."','".$myinfo['nickname']."','".$myinfo['dateadd']."','0'");
					}
				//	sendmail('1',$x[2],$temp);
					$out[0]="OK";
				}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請稍後在試";
                                        $out[2]=$x;
                                        $out[3]=$_SESSION['phonenum'];
                                        $out[4]=$pdo->errorInfo();
                                        $out[5]="email,password,actcode,phonenum,phonev".$fcname;
                                        $out[6]="'".$x[2]."','".$x[3]."','1','".$_SESSION['phonenum']."',1".$fcmid;
				}
			}
			else{
				$out[0]="ERR";
				$out[1]="密碼與確認密碼不符合";
			}
			$pdo= null;
			echo json_encode($out);
		}else{
			echo json_encode($test);
		}
	}
	//聯絡我們
	function mem_contact($x){
		global $conf;
		global $mrr;
		$out="";
		$test=test_capcodesub($x[7]);
		if($test[0]=="PASS"){
			$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdo -> exec("set names ".$conf['db_encode']);
			//儲存
			if(share_insert($pdo ,"contacts","thisname,thisphone,thisemail,thistitle,thistype,thisqestion","'".$x[1]."','".$x[2]."','".$x[3]."','".$x[4]."','".$x[5]."','".$x[6]."'")){
				$out[0]="OK";
			}else{
				$out[0]="ERR";
				$out[1]="存入錯誤,請稍後在試";
			}
			$pdo= null;
			echo json_encode($out);
		}else{
			echo json_encode($test);
		}
	}
	//pop memberform--剛加入時的會員資料表
	function get_memberform($x){
		global $conf;
		$out=array();
		$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdo -> exec("set names ".$conf['db_encode']);
		$out[0]=share_gettable($pdo ,"gam_");//gametag
		$out[1]=share_gettable($pdo ,"location");//location
		$out[2]=share_gettable($pdo ,"gtime");//gtime
		$out[3]=get_awain(1);//啟示點
		$out[4]=get_awain(2);//填遊戲資料
		$out[5]=get_awain(16);//上傳圖片
		$pdo= null;
		echo json_encode($out);
	}
	function mem_update($x){
		global $conf;
                $out=array();
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$out[0]="OK";
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);
			if($x[4]=="name"){
				share_update($pdom ,"mem_","nickname='".$x[3]."'","memberid='".$_SESSION['userid']."'");//gametag
			}else if($x[4]=="time"){
				share_update($pdom ,"mem_","gtid='".$x[3]."'","memberid='".$_SESSION['userid']."'");//gametag
			}else if($x[4]=="location"){
				share_update($pdom ,"mem_","location='".$x[3]."'","memberid='".$_SESSION['userid']."'");//gametag
			}
			$pdom=null;
		}else{
			$out[0]="ERR";
			$out[1]="認證錯誤,或已在其他視窗開啟,請關閉這個視窗";
		}
		echo json_encode($out);
	}
	function chk_session($x){
		if($_SESSION['userid'] && $_SESSION['key'] && $x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$out[0]="OK";
		}else{
			$out[0]="NO";
		}
		echo json_encode($out);
	}
?>

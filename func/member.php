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
		/*
		$inx="";
		if($x[0] && strpos($x[0],"886")<0){
			$inx="(".str_replace("+","",$x[0]).")";
		}
		$phone=$inx.$x[1];
		*/
		$x1="";
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
			}else{
				$out[0]="ERR";
				$out[1]="系統錯誤，請稍後再試";
			}
		}
		$pdo=null;
		echo json_encode($out);
	}
	//檢查認證碼
	function chkver($x){
		global $conf;
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
		}
		echo json_encode($out);
	}
	//存入註冊後詳細資料
	function mem_actsave($x){
		$out=array();
		global $conf;
		//if($_SESSION['key']==$x[0]){
			$basp=get_awain(1);
			if($x[5] && $x[11]){
				$basp=$basp+get_awain(2);
			}
			if( $x[12] && $x[13]){
				$basp=$basp+get_awain(16);
			}
			if($x[0] && $x[1] && $x[2] && $x[3] && $x[4] ){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m'] );
				$pdo -> exec("set names ".$conf['db_encode']);
				if($t=share_getinfo($pdo ,"mem_","actcode",$_SESSION['actcode'])){
					$flag=0;
					//檢查email 和nickname
					if($x[2] && $tb=share_gettable($pdo ," mem_ WHERE email='".$x[2]."' AND actcode<>'".$_SESSION['actcode']."'")){//檢查email
						$out[0]="ERR";
						$out[1]="這個email已在其他會員註冊,請選用其他email".$x[2];
					}else if($tb=share_gettable($pdo ," mem_ WHERE nickname='".$x[3]."' AND actcode<>'".$_SESSION['actcode']."'")){//檢查email
						$out[0]="ERR";
						$out[1]="這個暱稱已被其他會員使用,請選用其他暱稱";
					}else{
						if($t['email']=="" && $x[2]<>"null"){ //20190325 Pman 用FB註冊時，email會變成"null"要去掉這個寫入資料庫的情形。
							if(share_update($pdo ,"mem_","gender='".($x[1]=="男"?"1":"2")."',email='".$x[2]."',nickname='".$x[3]."',birthday='".$x[4]."',location='".$x[5]."',game1='".$x[6]."',game1note='".$x[7]."',game2='".$x[8]."',game2note='".$x[9]."',game3='".$x[10]."',game3note='".$x[11]."',gtid='".$x[12]."',headpic='".$x[13]."',frontpic='".$x[14]."',score='".$basp."',points='".$basp."',lastIP='".GetIP()."',actcode=1","actcode='".$_SESSION['actcode']."'")){
								$flag=1;
							}else{
								$out[0]="ERR";
								$out[1]="存入錯誤";
							}
						}else{
							if(share_update($pdo ,"mem_","gender='".($x[1]=="男"?"1":"2")."',nickname='".$x[3]."',birthday='".$x[4]."',location='".$x[5]."',game1='".$x[6]."',game1note='".$x[7]."',game2='".$x[8]."',game2note='".$x[9]."',game3='".$x[10]."',game3note='".$x[11]."',gtid='".$x[12]."',headpic='".$x[13]."',frontpic='".$x[14]."',score='".$basp."',points='".$basp."',lastIP='".GetIP()."',actcode=1","actcode='".$_SESSION['actcode']."'")){
								$flag=1;
							}else{
								$out[0]="ERR";
								$out[1]="存入錯誤";
							}
						}
					}
					if($flag==1){
						$tb=share_getinfo($pdo ,"mem_","memberid",$t['memberid']);//重新抓取]
						if($x[6]){
							addgamerank($x[6]);
						}
						if($x[8]){
							addgamerank($x[8]);
						}
						if($x[10]){
							addgamerank($x[10]);
						}
						for($x=0;$x<count($tb);$x++){
							unset($tb[$x]);
						}
						unset($tb['password']);
						$_SESSION['userid']=$t['memberid'];
						$_SESSION['isver']=$t['phonev'];
						if($t['refurl']){
						}else{
							$texp=getgurl((isset($_SERVER['HTTPS']) ? 'https://' : 'http://').$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$t['memberid']*13));//20190116 Pman 改成依實際情況判斷是http還是https
							$mt=json_decode($texp);
							$t['refurl']=$mt->id;;
							share_update($pdo,"mem_","refurl='".$t['refurl']."'","memberid='".$t['memberid']."'");
						}
						$out[0]="OK";
						$out[1]=$tb;
						$out[2]=$_SESSION['userid'];
					}
				}else{
					$out[0]="ERR";
					$out[1]="會員已認證完畢或認證資料不存在,請嘗試登入試試,謝謝";
				}
			}else{
				$out[0]="ERR";
				$out[1]="資料不足,不正常的錯誤";
			}

			//$out[0]="ERR";
			//$out[1]="錯誤測試1";
		//}else{
				//$out[0]="ERR";
				//$out[1]=$errText['reopen'];
                                //$out[2] = $_SESSION['key'];
                                //$out[3] = $x[0];
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
		$out="";
		if($x[0]=="3"){// fb登入-註冊串聯/登入串聯/
			$_SESSION['fbstart']=time();
			$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
			$_SESSION['fbcode']=$temp;
			$out[0]=$temp;
			echo json_encode($out);
		}else if($x[0]=="2"){// fb登入
			if(!empty($_SESSION['fbstart']) && !empty($_SESSION['fbcode']) && (time()-$_SESSION['fbstart'])<5  && $_SESSION['fbcode']==$x[5]){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdo -> exec("set names ".$conf['db_encode']);
				share_update($pdo ,"mem_","locker='1',lockertime=null","lockertime<CURDATE()");
				if($t=share_getinfo($pdo ,"mem_","fbid",$x[1])){
					//if($x[2]==$t['fbname'] && ($x[3]==$t['fbmail'] || (empty($x[3]) && $t['fbmail']=="" )) && ($x[4]==$t['fbbirth'] || (empty($x[4]) && $t['fbbirth']=="")) ){
						if($t['actcode']==1){
							if($t['locker']==1){
								share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW()","memberid='".$t['memberid']."'");
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
							$out[1]=$t['actcode'];
								//這是自動登入用...2019/5/14 此時尚未正式完成
							$out[2]=$t['memberid'];
							$out[3]=$_SESSION['userid']*1357531+1358743953456;
						}
				}else{
					$out[0]="ERR";
					//$out[1]="無法找到FB相關紀錄,或FB資料已修改,請使用FB串接功能更新紀錄,謝謝";
					$out[1]="你似乎未使用FB註冊過，請先同意「會員規範&隱私權條款」！";//20190322 Pman 修改未使用FB註冊過的錯誤訊息
				}
			}
			echo json_encode($out);
		}else{//帳密登入 與 FB串接+帳密登入
			//$test=test_capcodesub($x[1]);
                        $test = array("PASS");
			if($test[0]=="PASS"){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdo -> exec("set names ".$conf['db_encode']);
                                $email = isset($x[2]) ? $x[2] : '';
                                $pass = isset($x[3]) ? $x[3] : '';
                                $sql = "select * from mem_ where email = '$email' and password = '$pass'";
                                $result = $pdo->query($sql);

                                $out=array();
                                $out[0]="ERR";
                                if($t = $result->fetch(PDO::FETCH_ASSOC)) {
                                    $_SESSION['userid']=$t['memberid'];
                                    $_SESSION['isver']=$t['phonev'];
                                    $out[0]="OK";
                                    $out[1]=$t;
                                    $out[2]=$_SESSION['userid'];
                                }
                                //$out[3] = $sql;

				echo json_encode($out);
                                /*
				share_update($pdo ,"mem_","locker='1',lockertime=null","lockertime<CURDATE()");
				if($x[4] && $t=share_getfree($pdo ,"SELECT * FROM mem_ WHERE fbid='".$x[4]."' AND email<>'".$x[2]."'")){
					$out[0]="ERR";
					$out[1]="此fbid 已與其他帳後串接,無法再次使用";
				}else if($t=share_getinfo($pdo ,"mem_","email",$x[2])){
					if($t['password']==$x[3]){
						if($t['actcode']==1){
							if($t['locker']==1){
								if(!empty($x[4])){
									share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fbid='".$x[4]."',fbname='".$x[5]."',fbmail='".$x[6]."',fbbirth='".$x[7]."'","memberid='".$t['memberid']."'");
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


								$out[7]=$_SESSION['userid']*1357531+1358743953456;//背後KEY
								$out[8]=share_gettable($pdop,"poi_ WHERE memberid='".$_SESSION['userid']."' AND orderid='020'");
								$pdop=null;
							}else{
								$out[0]="ERR";
								$out[1]="此帳號已被鎖定，若須解除請聯絡管理單位（透過聯絡我們按鈕） ";
							}
						}else{
							sendmail('1',$t['email'],$t['actcode']);
							$out[0]="ERR";
							$out[1]="這個Email尚未啟用,我們已經重新寄了一封確認信至您的信箱,請前往啟用,謝謝";
						}
					}else{

						$out[0]="ERR";

						$out[1]="密碼錯誤";
					}
				}else if($t=share_getinfo($pdo ,"mem_","phonenum",$x[2])){
					if($t['password']==$x[3]){
						if($t['locker']==1){
							if(!empty($x[4])){
								share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fbid='".$x[4]."',fbname='".$x[5]."',fbmail='".$x[6]."',fbbirth='".$x[7]."'","memberid='".$t['memberid']."'");
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
						$out[0]="ERR";
						$out[1]="密碼錯誤";
					}
				}else if($t=share_getinfo($pdo ,"mem_","phonenum","+886".ltrim($x[2],"0")) ){//電話
					if($t['password']==$x[3]){
						if($t['locker']==1){
							if(!empty($x[4])){
								share_update($pdo,"mem_","lastIP='".GetIP()."',lastlogin=NOW(),fbid='".$x[4]."',fbname='".$x[5]."',fbmail='".$x[6]."',fbbirth='".$x[7]."'","memberid='".$t['memberid']."'");
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
						$out[0]="ERR";
						$out[1]="密碼錯誤";
					}
				}else{
					$out[0]="ERR";
					$out[1]="這個Email/電話號碼尚未註冊";
				}
				$pdo= null;
				echo json_encode($out);
                                 */
			}else{
				echo json_encode($test);
			}
		}
	}
	function mem_logoff($x){
		unset ($_SESSION['key']);
		unset ($_SESSION['userid']);
		$out="";
		$out[0]="OK";
		echo json_encode($out);
	}
	function mem_autologin($x){
		global $conf;
		global $mrr;
		$out="";
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
		if($_SESSION['userid'] && $x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){
			$out[0]="OK";
		}else{
			$out[0]="ERR";
		}
		echo json_encode($out);
	}
	//更新會員資料...
	function reget_mem($x){
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
		if($x[0]==$_SESSION['userid'] && $x[1]==$_SESSION['key']){//確認資格
			$out[0]="OK";
			if($x[2]=="notice"){
				$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
				$pdod -> exec("set names ".$conf['db_encode']);
				share_update($pdod,"not_","viewed=1","memberid='".$_SESSION['userid']."'");//通知
				$pdod=null;
			}else if($x[2]=="chat"){
				$pdoc = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
				$pdoc -> exec("set names ".$conf['db_encode']);
				share_update($pdoc,"rnot_","viewed=1","memberid='".$_SESSION['userid']."'");//聊天通知
				$pdoc=null;
			}else if($x[2]=="addfriend"){
				$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
				$pdod -> exec("set names ".$conf['db_encode']);
				share_update($pdod,"friend_","viewed=1","friendid='".$_SESSION['userid']."'");//聊天通知
				$pdod=null;
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
		if($x[0]=="2"){//fb快速註冊
			$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdo -> exec("set names ".$conf['db_encode']);
			//刪除過久的
			share_del($pdo ,"mem_ WHERE actcode<>'1' AND DATEDIFF(CURDATE(),dateadd)>".$conf['actkeep']);
			if($t=share_getinfo($pdo ,"mem_","fbid",$x[1])){
				$out[0]="ERR";
				$out[1]="FB帳號已使用在其他帳號上";
			}else{
				$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
				if(share_insert($pdo ,"mem_","actcode,fbid,fbname,fbmail,fbbirth","'".$temp."','".$x[1]."','".$x[2]."','".$x[3]."','".$x[4]."'")){
						if($x[5]){//有人介紹
							$myinfo=share_getinfo($pdo ,"mem_","fbid",$x[1]);
							$fid=($x[5]-10000000000000)/13;
							$refinfo=share_getinfo($pdo ,"mem_","memberid",$fid);
							$mid=10000000000000+$myinfo['memberid']*13;
							share_insert($pdo ,"reflist","refid,refname,memberid,memname,regtime,isexport","'".$x[5]."','".$refinfo['nickname']."','".$mid."','".$myinfo['nickname']."','".$myinfo['dateadd']."','0'");
						}
						$out[0]="OKFB";
						$out[1]=$temp;
				}else{
					$out[0]="ERR";
					$out[1]="存入錯誤,請稍後在試";
				}
			}
			$pdo= null;
			echo json_encode($out);
		}else{
			$test[0]="PASS";
			if($test[0]=="PASS"){
				$pdo = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdo -> exec("set names ".$conf['db_encode']);
				//刪除過久的
				share_del($pdo ,"mem_ WHERE actcode<>'1' AND DATEDIFF(CURDATE(),dateadd)>".$conf['actkeep']);
				if(share_getinfo($pdo ,"mem_","email",$x[2])){
					$out[0]="ERR";
					$out[1]="此帳號已註冊";
				}else if($x[6] && share_getinfo($pdo ,"mem_","fbid",$x[6])){
					$out[0]="ERR";
					$out[1]="FB帳號已使用在其他帳號上";
				}else if($x[3]==$x[4]){
					$temp=$mrr[rand(0,21)].$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].rand(12,98).$mrr[rand(0,21)].$mrr[rand(0,21)].$mrr[rand(0,21)];
                                        $input = array(
                                            ':email' => $x[2],
                                            ':password' => $x[3],
                                            ':actcode' => $temp,
                                            ':fbid' => $x[6],
                                            ':fbname' => $x[7],
                                            ':fbmail' => $x[8],
                                            ':fbbirth' => $x[9]
                                        );
                                        $insertSql = "insert into `mem_` (email,password,actcode,fbid,fbname,fbmail,fbbirth) value (:email, :password, :actcode, :fbid, :fbname, :fbmail, :fbbirth)";
                                        $statm = $pdo->prepare($insertSql);
					//if(share_insert($pdo ,"mem_","email,password,actcode,fbid,fbname,fbmail,fbbirth","'".$x[2]."','".$x[3]."','".$temp."','".$x[6]."','".$x[7]."','".$x[8]."','".$x[9]."'"))
                                        if($statm->execute($input)){
						//$out[1]="INSERT INTO mem_(email,password,actcode) VALUES('".$x[2]."','".$x[3]."','".$temp."')";
						//送入介紹
						if($x[5]){//有人介紹
							$myinfo=share_getinfo($pdo ,"mem_","email",$x[2]);
							$fid=($x[5]-10000000000000)/13;
							$refinfo=share_getinfo($pdo ,"mem_","memberid",$fid);
							$mid=10000000000000+$myinfo['memberid']*13;
							share_insert($pdo ,"reflist","refid,refname,memberid,memname,regtime,isexport","'".$x[5]."','".$refinfo['nickname']."','".$mid."','".$myinfo['nickname']."','".$myinfo['dateadd']."','0'");
						}
						if($x[6]){
							$out[0]="OKFB";
							$out[1]=$temp;
						}else{
							$out[0]="OK";
							sendmail('1',$x[2],$temp);
						}
					}else{
						$out[0]="ERR";
						$out[1]="存入錯誤,請稍後在試";
                                                $out[2]=$pdo->errorInfo();
					}
				}else{
					$out[0]="ERR";
					$out[1]="密碼與確認密碼不符合";
				}
				$pdo= null;
				echo json_encode($out);
			}else{
				echo json_encode($test);
			}
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
?>

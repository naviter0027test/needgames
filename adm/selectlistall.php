         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="selectlistall";
	$tablelist = array();
	//執行
	if($job=="addcontent"){
		 addcontent($mytable,$mypage);
	}elseif($job=="delcontent"){
		 delcontent($mytable,$mypage);
	}elseif($job=="upcontent"){
		 upcontent($mytable,$mypage);
	}
	getcontent($mytable,$mypage);
#######################################
 function delcontent($mytable,$mypage){
	global $conf;
	$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
	$pdop -> exec("set names ".$conf['db_encode']);
	 share_del($pdom,$mytable." WHERE awardid=".$GLOBALS["id"]);
	 share_showerr("刪除成功了");
	 $pdop=null;
 }
function upcontent($mytable,$mypage){
	global $conf;
	$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
	$pdop -> exec("set names ".$conf['db_encode']);
    if( is_null($GLOBALS["points"]) ){
		 share_showerr("請確認填寫貢獻值");//20190107 Pman 將「點」==>「貢獻值」
    }else{
		if($_SESSION['issuper']==1){
		 	share_update($pdop,$mytable,"awardname='".$GLOBALS["awardname"]."',points='".$GLOBALS["points"]."'","awardid=".$GLOBALS["id"]);
		}else{
			share_update($pdop,$mytable,"points='".$GLOBALS["points"]."'","awardid=".$GLOBALS["id"]);
		}
		 share_showerr("更新成功了");
	}
	 $pdop=null;
 }
 function addcontent($mytable,$mypage){
	global $conf;
	$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
	$pdop -> exec("set names ".$conf['db_encode']);
     if( empty($GLOBALS["awardname"])|| empty($GLOBALS["points"]) ){
		share_showerr("請確認填寫資料");
     }else{
		 share_insert($pdop,$mytable,"awardname,points","'".$GLOBALS["awardname"]."','".$GLOBALS["points"]."'");
		share_showerr("新增成功了");
     }
	 $pdop=null;
 }

 function getcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);
	$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
	$pdop -> exec("set names ".$conf['db_encode']);
	$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
	$pdod -> exec("set names ".$conf['db_encode']);
	echo "<TABLE class=formtable width=800>";
	echo "<TR><Th colspan=2>數據列表</Th></TR>";
	echo "<TR><Th colspan=2>會員</Th></TR>";
	echo "<TR><Th style='width:50%'>總會員數</Th><Td style='width:40%'>".share_getcount($pdom,"mem_")."</Td></TR>";
	echo "<TR><Th>總會員數(已啟用)</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1'")."</Td></TR>";
	echo "<TR><Th>總會員數(未啟用)</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode<>'1'")."</Td></TR>";
	echo "<TR><Th>30天內註冊會員數</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1' AND dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內註冊會員數</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1' AND dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內註冊會員數</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1' AND dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "<TR><Th>30天內登入會員數</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1' AND lastlogin>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內登入會員數</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1' AND lastlogin>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內登入會員數</Th><Td>".share_getcount($pdom,"mem_ WHERE actcode='1' AND lastlogin>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "<TR><Th colspan=2>貢獻值</Th></TR>";
	echo "<TR><Th>貢獻值量數(正式會員)</Th><Td>".share_getfree($pdom,"SELECT sum(score) as s FROM mem_ WHERE actcode='1'")[0]['s']."</Td></TR>";
	echo "<TR><Th>30天貢獻值能量變化數</Th><Td>".share_getfree($pdop,"SELECT sum(points) as s FROM poi_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")[0]['s']."</Td></TR>";
	echo "<TR><Th>60貢獻值總能量變化數</Th><Td>".share_getfree($pdop,"SELECT sum(points) as s FROM poi_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")[0]['s']."</Td></TR>";
	echo "<TR><Th>90天內總貢獻值變化數</Th><Td>".share_getfree($pdop,"SELECT sum(points) as s FROM poi_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")[0]['s']."</Td></TR>";
	echo "<TR><Th>貢獻值排行</Th></TR>";
	echo "<form action='index.php?tf=".$GLOBALS['mypage']."&job=etop' method=post>";
	echo "<TR><Th>貢獻值排行top<select name='etop'>";
	for($a=10; $a<100;$a+=10){
		echo "<option value='".$a."'";
		if($a==$GLOBALS['etop']){
			echo " selected ";
		}
		echo ">".$a."</option>";
	}
	echo "</select></Th>";
	echo "<Td><input type=submit class='gray-btn'></TD></TR>";
	echo "</form>";
	if($GLOBALS['job']=="etop" && $GLOBALS['etop']){
		$tt=share_gettable($pdom,"mem_ order by score DESC limit 0,".$GLOBALS['etop']);
		echo "<TR><TD>暱稱(ID)</TD><TD>剩餘/總貢獻值</TD></TR>";
		for($b=0;$b<count($tt);$b++){
			echo "<TR><TD><a href='index.php?tf=selectmember&job=getdetail&id=".$tt[$b]['memberid']."' target=_new >".$tt[$b]['nickname']."</a>(".$tt[$b]['memberid'].")</TD><TD>".$tt[$b]['points']." / ".$tt[$b]['score']."</TD></TR>";
		}
	}
	echo "<TR><Th colspan=2>貼文</Th></TR>";
	echo "<TR><Th>總貼文數</Th><Td>".share_getcount($pdod,"con_")."</Td></TR>";
	echo "<TR><Th>30天內貼文發表數</Th><Td>".share_getcount($pdod,"con_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內貼文發表數</Th><Td>".share_getcount($pdod,"con_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內貼文發表數</Th><Td>".share_getcount($pdod,"con_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "<TR><Th colspan=2>攻略</Th></TR>";
	echo "<TR><Th>總攻略數</Th><Td>".share_getcount($pdod,"art_")."</Td></TR>";
	echo "<TR><Th>30天內攻略發表數</Th><Td>".share_getcount($pdod,"art_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內攻略發表數</Th><Td>".share_getcount($pdod,"art_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內攻略發表數</Th><Td>".share_getcount($pdod,"art_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "<TR><Th colspan=2>QNA</Th></TR>";
	echo "<TR><Th>總QNA數</Th><Td>".share_getcount($pdod,"qna_")."</Td></TR>";
	echo "<TR><Th>總QNA已解答數</Th><Td>".share_getcount($pdod,"qna_ WHERE thisid in (SELECT contentid FROM qrep_ WHERE winner=1)")."</Td></TR>";
	echo "<TR><Th>30天內QNA張貼數</Th><Td>".share_getcount($pdod,"qna_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內QNA張貼數</Th><Td>".share_getcount($pdod,"qna_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內QNA張貼數</Th><Td>".share_getcount($pdod,"qna_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "<TR><Th colspan=2>相簿</Th></TR>";
	echo "<TR><Th>總相簿數</Th><Td>".share_getcount($pdod,"alb_")."</Td></TR>";
	echo "<TR><Th>總相片數</Th><Td>".share_getcount($pdod,"pho_")."</Td></TR>";
	echo "<TR><Th>30天內新增相簿數</Th><Td>".share_getcount($pdod,"alb_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內新增相簿數</Th><Td>".share_getcount($pdod,"alb_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內新增相簿數</Th><Td>".share_getcount($pdod,"alb_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "<TR><Th colspan=2>交友</Th></TR>";
	echo "<TR><Th>總配對數</Th><Td>".share_getcount($pdod,"friend_")."</Td></TR>";
	echo "<TR><Th>總配對數(邀請中)</Th><Td>".share_getcount($pdod,"friend_ WHERE ispass=0")."</Td></TR>";
	echo "<TR><Th>總配對數(交友中)</Th><Td>".share_getcount($pdod,"friend_ WHERE ispass=1")."</Td></TR>";
	echo "<TR><Th>總配對數(已取消)</Th><Td>".share_getcount($pdod,"friend_ WHERE ispass>1")."</Td></TR>";
	echo "<TR><Th>30天內新增配對數</Th><Td>".share_getcount($pdod,"friend_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -30 DAY)")."</Td></TR>";
	echo "<TR><Th>60天內新增配對數</Th><Td>".share_getcount($pdod,"friend_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -60 DAY)")."</Td></TR>";
	echo "<TR><Th>90天內新增配對數</Th><Td>".share_getcount($pdod,"friend_ WHERE dateadd>DATE_ADD(CURDATE(), INTERVAL -90 DAY)")."</Td></TR>";
	echo "</TABLE>";
	$pdom=null;

 }
	?>
        </div>

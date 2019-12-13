         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="selectaward";
	$mytable="awa_";
	
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
	$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
	$pdop -> exec("set names ".$conf['db_encode']);	
	 echo "<TABLE class=formtable width=800>";
	 echo "<TR><Th colspan=5>貢獻值設定</Th></TR>";//20190107 Pman 將「點」==>「貢獻值」
	 echo "<TR>\n";
	 if($_SESSION['issuper']==1){
		 echo "<th style='width:100px'>刪除</th>\n";
	 }
	 echo "<th>編號</th><th class=req style='width:220px'>貢獻值描述</th><th class=req style='width:220px'>貢獻值</th><th>更新</th></TR>";//20190107 Pman 將「點」==>「貢獻值」
	 $lines=share_gettable($pdop,$mytable);
	 foreach($lines as $row){
	     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['awardid']."' method='post' >\n";
		 if($_SESSION['issuper']==1){
		 	echo "<td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['awardid']."' class='delbtn'>刪除</a></td>";
		 }
		 echo "<td>".$row['awardid']."</TD>";
		 if($_SESSION['issuper']==1){
		 	echo "<td><input type=text name=awardname value='".$row['awardname']."'></TD>";
		 }else{
			 echo "<td>".$row['awardname']."</TD>";
		 }
		 echo "<td><input type=text name=points value='".$row['points']."'></TD>";
		 echo "<td><input type=submit  class='gray-btn'></td></tr></form>";
    }
	if($_SESSION['issuper']==1){
		echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform>\n";
		echo "<td></td>\n";
		echo "<td>新增</td>";
		echo "<td><input type=text name=awardname></TD>";
		echo "<td><input type=text name=points></TD>";
		echo "<td><input type=submit class='gray-btn'></td></tr></form>";
	}
	echo "</TABLE>";
	$pdom=null;

 }
	?>
        </div>

         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="selectgame";
	$typetable="gametype";
	$mytable="gam_";
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
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
	$pdod -> exec("set names ".$conf['db_encode']);	
	 $ct=share_getcount($pdod,"con_ WHERE gamid=".$GLOBALS["id"]);
	 if($ct==0){
		 share_del($pdom,$mytable." WHERE gameid=".$GLOBALS["id"]);
		 share_showerr("刪除成功了");
	 }else{
		 share_showerr("已有繫內容資料無法刪除本資料");
	 }
	 $pdom=null;
 }
function upcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
     if( empty($GLOBALS["gamename"]) ){
		 share_showerr("請確認填寫所有內容");
     }else{
		 if($t=share_gettable($pdom,$mytable." WHERE gamename='".$GLOBALS["gamename"]."' AND gameid<>".$GLOBALS["id"])){
			 share_showerr("資料已經存在");
		 }else{
			 share_update($pdom,$mytable,"typeid='".$GLOBALS["typeid"]."',gamename='".$GLOBALS["gamename"]."'","gameid=".$GLOBALS["id"]);
			 share_showerr("更新成功了");
		}		 
	}
	 $pdom=null;
 }
 function addcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
     if( empty($GLOBALS["gamename"])){
		share_showerr("請確認填寫資料");
     }else{
		 if($t=share_getinfo($pdom,$mytable,"gamename",$GLOBALS["gamename"])){
			 share_showerr("資料已經存在");
		 }else{
			 share_insert($pdom,$mytable,"typeid,gamename","'".$GLOBALS["typeid"]."','".$GLOBALS["gamename"]."'");
			 share_showerr("新增成功了");
		}
     }
	 $pdom=null;
 }

 function getcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	$typelist=share_gettable($pdom,$GLOBALS['typetable']);
	echo "<FORM action='index.php?tf=".$mypage."' method='post'>"; 
	echo "<TABLE class=formtable width=800>";
	echo "<tr><tD>選擇分類</TD><TD><SELECT NAME=typeid><OPTION value=''>請選擇</OPTION>";
	foreach($typelist as $type){
		 $ton=share_getcount($pdom,$mytable." WHERE typeid='".$type['typeid']."'");
		 echo "<option value='".$type['typeid']."'";
		 if($GLOBALS['typeid'] && $type['typeid']==$GLOBALS['typeid']){
			 echo " SELECTED";
		 }
		 echo ">".$type['typename']."(".$ton.")</OPTION>\n";
	}
	echo "</SELECT></TD><TD><INPUT TYPE=SUBMIT class='blue-btn'></TD></TR></TABLE></FORM>";
	echo "<TABLE class=formtable width=600>";
	echo "<TR><Th colspan=4>遊戲設定</Th></TR>";
	echo "<TR><th style='width:100px'>刪除</th><th class=req style='width:220px'>分類名稱</th><th class=req style='width:220px'>遊戲</th><th>更新</th></TR>";
	if($GLOBALS['typeid']){
		$lines=share_gettable($pdom,$mytable." WHERE typeid='".$GLOBALS['typeid']."'");
		foreach($lines as $row){
				echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['gameid']."' method='post' ><td><a href='index.php?tf=".$mypage."&job=delcontent&typeid=".$GLOBALS['typeid']."&id=".$row['gameid']."' class='delbtn'>刪除</a></td>";
				echo "<td><select name=typeid>\n";
				foreach($typelist as $type){
					 echo "<option value='".$type['typeid']."'";
					 if($GLOBALS['typeid'] && $type['typeid']==$GLOBALS['typeid']){
						 echo " SELECTED";
					 }
					 echo ">".$type['typename']."</OPTION>\n";
				}
				echo "</select></TD>";
				echo "<td><input type=text name=gamename value='".$row['gamename']."'></TD>";
				echo "<td><input type=submit  class='gray-btn'></td></tr></form>";
		}
	}
	echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform><td>新增</td>";
	echo "<td><select name=typeid>\n";
	foreach($typelist as $type){
		 echo "<option value='".$type['typeid']."'";
		 if($GLOBALS['typeid'] && $type['typeid']==$GLOBALS['typeid']){
			 echo " SELECTED";
		 }
		 echo ">".$type['typename']."</OPTION>\n";
	}
	echo "</select></TD>";
	echo "<td><input type=text name=gamename></TD>";
	echo "<td><input type=submit class='gray-btn'></td></tr></form>";
	echo "</TABLE>";
	$pdom=null;

 }
	?>
        </div>

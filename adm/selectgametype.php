         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="selectgametype";
	$mytable="gametype";
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
	 $ct=share_getcount($pdom,"gam_ WHERE typeid=".$GLOBALS["id"]);
	 if($ct==0){
		 share_del($pdom,$mytable." WHERE typeid=".$GLOBALS["id"]);
		 share_showerr("刪除成功了");
	 }else{
		 share_showerr("已有繫結商品資料，要刪除本資料請先刪除/修改相關資料");
	 }
	 $pdom=null;
 }
function upcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
     if( empty($GLOBALS["typename"]) ){
		 share_showerr("請確認填寫所有內容");
     }else{
		 if($t=share_gettable($pdom,$mytable." WHERE typename='".$GLOBALS["typename"]."' AND typeid<>".$GLOBALS["id"])){
			 share_showerr("資料已經存在");
		 }else{
			 share_update($pdom,$mytable,"typename='".$GLOBALS["typename"]."'","typeid=".$GLOBALS["id"]);
			 share_showerr("更新成功了");
		}		 
	}
	 $pdom=null;
 }
 function addcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
     if( empty($GLOBALS["typename"])){
		share_showerr("請確認填寫資料");
     }else{
		 if($t=share_getinfo($pdom,$mytable,"typename",$GLOBALS["typename"])){
			 share_showerr("資料已經存在");
		 }else{
			 share_insert($pdom,$mytable,"typename","'".$GLOBALS["typename"]."'");
			 share_showerr("新增成功了");
		}
     }
	 $pdom=null;
 }

 function getcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 echo "<TABLE class=formtable width=600>";
	 echo "<TR><Th colspan=4>遊戲分類設定</Th></TR>";
	 echo "<TR><th style='width:100px'>刪除</th><th class=req style='width:220px'>分類名稱</th><th>更新</th></TR>";
	 $lines=share_gettable($pdom,$mytable);
	 foreach($lines as $row){
	     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['typeid']."' method='post' ><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['typeid']."' class='delbtn'>刪除</a></td>";
		 echo "<td><input type=text name=typename value='".$row['typename']."'></TD>";
		 echo "<td><input type=submit  class='gray-btn'></td></tr></form>";
    }
	echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform><td>新增</td>";
	echo "<td><input type=text name=typename></TD>";
	echo "<td><input type=submit class='gray-btn'></td></tr></form>";
	echo "</TABLE>";
	$pdom=null;

 }
	?>
        </div>

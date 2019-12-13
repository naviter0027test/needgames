         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="selectrank";
	$mytable="ran_";
	
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
	 $ct=share_getcount($pdom,"mem_ WHERE rankid=".$GLOBALS["id"]);
	 if($ct==0){
		 share_del($pdom,$mytable." WHERE rankid=".$GLOBALS["id"]);
		 share_showerr("刪除成功了");
	 }else{
		 share_showerr("已有繫結資料，要刪除本資料請先刪除/修改相關資料");
	 }
	 $pdom=null;
 }
function upcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
     if( empty($GLOBALS["rankname"]) || empty($GLOBALS["score"])|| empty($GLOBALS["id"])){
		 share_showerr("請確認填寫所有內容");
     }else{
		 if($t=share_getinfo($pdom,$mytable,"rankid",$GLOBALS["id"])){
			 share_update($pdom,$mytable,"rankname='".$GLOBALS["rankname"]."',score='".$GLOBALS["score"]."'","rankid=".$GLOBALS["id"]);
			 share_showerr("更新成功了");
		 }else{
			 share_insert($pdom,$mytable,"rankid,rankname,score","'".$GLOBALS["id"]."','".$GLOBALS["rankname"]."','".$GLOBALS["score"]."'");
			 share_showerr("更新成功了");
		}		 
	}
	 $pdom=null;
 }

 function getcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 echo "<TABLE class=formtable width=600>";
	 echo "<TR><Th colspan=4>等級設定</Th></TR>";
	 echo "<TR><th style='width:100px'>等級</th><th class=req style='width:220px'>等級名稱</th><th class=req style='width:220px'>(最低)貢獻值</th><th>更新</th></TR>"; //20190107 Pman 將「點」==>「貢獻值」
	 $lines=share_gettable($pdom,$mytable." order by rankid");
	 for($a=1;$a<100;$a++){
		 $nval="";
		 $sval=0;
		for($b=0;$b<count($lines);$b++){
			if($lines[$b]['rankid']==$a){
				$nval=$lines[$b]['rankname'];
				$sval=$lines[$b]['score'];
				break;
			}
		}
	     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$a."' method='post' ><td>".$a."</td>";
		 echo "<td><input type=text name=rankname value='".$nval."'></TD>";
		 echo "<td><input type=text name=score value='".$sval."'></TD>";
		 echo "<td><input type=submit  class='gray-btn'></td></tr></form>";
    }
	echo "</TABLE>";
	$pdom=null;

 }
	?>
        </div>

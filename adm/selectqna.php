         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mytitle="商品";	
	$mypage="selectqna";
	$mytable="qna_";
	$myid="thisid";
	$tablelist = array();
	//執行
	global $conf;
	$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
	$pdod -> exec("set names ".$conf['db_encode']);	
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	if($job=="addcontent"){
		 addcontent($mytable,$myid,$mypage);
	}elseif($job=="changesorting"){
	 	sorting($mytable,$myid,$id);
    }elseif($job=="delcontent"){
		 delcontent($mytable,$myid,$mypage);
	}elseif($job=="upcontent"){
		 upcontent($mytable,$myid,$mypage);
	}
	getcontent($mytable,$myid,$mypage);
	$pdod=NULL;
	$pdom=NULL;
################################
####  special function (all use)

#######################################
 function delcontent($mytable,$myid,$mypage){
	global $pdod;
	share_del($pdod,$mytable." WHERE thisid=".$GLOBALS["id"]);
	share_del($pdod,"qrep_ WHERE contentid=".$GLOBALS["id"]);
	share_del($pdod,"qals_ WHERE contentid=".$GLOBALS["id"]);
 }
 
 function getcontent($mytable,$myid,$mypage){
	 $perpage=10;
	 $plong=10;   //show how many pages
	 if($GLOBALS['page']){
		 $page=$GLOBALS['page'];
	 }else{
		 $page=1;
	 }
	 global $pdod;
	 global $pdom;
	 echo "<h2>QNA管理</h2>\n";
	 echo "<TABLE class=formtable width=900>";
	 echo "<tr><th colspan=5>管理</TH></TR>\n";
	 echo "<TR><th style='width:70px'>刪除</th><TH style='width:100px'>發表人</TH><th>問題</th></TR>";
	 $cnt=share_getcount($pdod,$mytable);
	 $rows=share_gettable($pdod,$mytable." ORDER BY thisid DESC limit ".($page-1)*$perpage.",".$perpage);
	 $z=0;
     foreach($rows as $row){
		 	$t=share_getinfo($pdom,"mem_","memberid",$row['memberid']);
		     echo "<tr><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['thisid']."' class='blue-btn'>刪除</a></td>\n";
			 echo "<TD>".$t['nickname']."</TD>";
			 //20190327 Pman 為了處理該死的emoji，將內容整理後，丟給JS處理unescape
			 $cc=str_replace("uploadfile/","../uploadfile/",$row['thiscontent']);
			 $cc=str_replace("\"","'",$cc);
			 $cc=str_replace("\n","<br>",$cc);
			 echo "<td style='text-align:left;padding:8px;font-size:13px;line-height:18px;'>";
			 echo "<script type='text/javascript'>document.write (unescape(\"".$cc."\"));</script>";
			echo "</TD></tr>\n";
 	 } 
	 echo "<tr><td colspan=3 class='pagewrap'>";
	 if($page>$plong){
		echo "<a href=index.php?tf=".$mypage."&page=".(floor($page/$plong)*$plong)."><<</A>";
	 }
	 for($i=(floor($page/$plong)+1);$i<=($cnt/$perpage+1) && $i<=(floor($page/$plong)+$plong) ;$i++){
			echo "<a href='index.php?tf=".$mypage."&page=".$i."' ".($i==$page?"class='on'":"").">".$i."</A>";
	}
	if($cnt/$perpage > floor($page/$plong)+$plong){
			echo "<a href=index.php?tf=".$mypage."&page=".(floor($page/$plong)+$plong+1).">>></A>";
	}	
	echo "</td></tr>";
	echo "</TABLE>";

 }
	?>
        </div>

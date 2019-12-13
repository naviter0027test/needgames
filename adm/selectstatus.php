         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mytitle="狀態";	
	$mypage="selectstatus";
	$mytable="sta_";
	$myid="statusid";
	$tablelist = array();
	//執行
	global $conf;
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);	
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
	$pdos=NULL;
################################
####  special function (all use)

#######################################
 function delcontent($mytable,$myid,$mypage){
	global $pdos;
	share_del($pdos,$mytable." WHERE statusid=".$GLOBALS["id"]);
	share_showerr("資料刪除成功");
 }
function upcontent($mytable,$myid,$mypage){
	global $pdos;
     if( empty($GLOBALS["statusname"]) ){
		 share_showerr("請確認填寫資料");
     }else{
		  if($t=share_gettable($pdos,$mytable." WHERE statusname='".$GLOBALS["statusname"]."' AND ".$myid."<>".$GLOBALS["id"])){
			  share_showerr("名稱已經存在,無法更新");
		  }else{
				if($t=share_update($pdos,$mytable,"statusname='".$GLOBALS["statusname"]."'",$myid."=".$GLOBALS["id"])){
					share_showerr("資料更新成功");
				}else{
					share_showerr("資料更新失敗");
				}
          }
	}
 }
 function addcontent($mytable,$myid,$mypage){
	global $pdos;
     if( empty($GLOBALS["statusname"])){
		share_showerr("請確認填寫資料");
     }else{
		if($t=share_getinfo($pdos,$mytable,"statusname",$GLOBALS["statusname"])){
				share_showerr("資料已經存在,無法新增");
		}else{
				if($t=share_insert($pdos,$mytable,"statusname","'".$GLOBALS["statusname"]."'")){
					share_showerr("資料新增成功");
				}else{
					share_showerr("資料新增失敗");
				}
	    }
     }
 }
 function getcontent($mytable,$myid,$mypage){
	global $pdos;
	 echo "<h2>".$GLOBALS['mytitle']."設定</h2>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform>\n";
	 echo "<TR><th colspan=3>新增</th></TR>\n";
	 echo "<TR><th class=req style='width:120px'>名稱(建議20個英數內)</th><th>新增</th></TR>\n";
	 echo "<td><input type=text name=statusname></TD>\n";
	 echo "<td><input type=submit value='確定新增' class='gray-btn'></td>\n";
     echo "</form></tr>";	 
	 echo "</TABLE>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><th colspan=5>管理</TH></TR>\n";
	 echo "<TR><th style='width:70px'>刪除</th><th class=req style='width:120px'>名稱(建議10個英數內)</th><th>更新</th></TR>";
	 $rows=share_gettable($pdos,$mytable."");
     foreach($rows as $row){
		     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['statusid']."' method='post' ><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['statusid']."' class='blue-btn'>刪除</a></td>\n";
			 echo "<td><input type=text name=statusname value='".$row['statusname']."'></TD>\n";
			echo "<td><input type=submit value='確定修改' class='gray-btn'></td></FORM>\n";
			echo "</tr>\n";
 	} 
	echo "</TABLE>";

 }
	?>
        </div>

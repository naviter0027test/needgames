         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mytitle="烘培風味商品";	
	$mypage="selectline";
	$mytable="linelist";
	$myid="lineid";
	$tablelist = array();
	$imgurl="../img/cattop_";
	$imgs=0;
	$thumbwidth=100;
	$imgwidth="1200";
	$imgheight="280";
	//執行
	$conn = mysql_connect($GLOBALS["dbhost"], $GLOBALS["dbuser"], $GLOBALS["dbpass"]) or die                      ('Error connecting to mysql');
	mysql_query("SET NAMES '".$GLOBALS["db_encode"]."'"); 
	mysql_select_db($GLOBALS["dbname"]);
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
    mysql_close($conn);	
################################
####  special function (all use)

#######################################
function sorting($mytable,$myid,$mypage){
	$neworder="";
	$temp=share_gettable($mytable."  ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
	if($temp){
		$neworder=$temp[0]['sorting'];
	}
	if($GLOBALS["thisorting"]>$neworder){
		share_update($mytable,"sorting=sorting+1"," sorting<".$GLOBALS["thisorting"]." AND sorting>=".$neworder);
	}else{
		share_update($mytable,"sorting=sorting-1","  sorting>".$GLOBALS["thisorting"]." AND sorting<=".$neworder);
	}
	share_update($mytable,"sorting=".$neworder,$myid."=".$GLOBALS['id']);	
	share_showerr("更新排序成功");
}
 function delcontent($mytable,$myid,$mypage){
	 $sql_statement ="SELECT count(*) as cc FROM productlist WHERE ".$myid."=".$GLOBALS["id"];
	 $qry = mysql_query($sql_statement);
	 $row = mysql_fetch_array($qry);	 
	 if($row['cc']>0){
		 share_showerr("已有繫結商品資料，要刪除本資料請先刪除/修改相關資料");
	 }else{
		 $sql_statement ="DELETE FROM ".$mytable." WHERE lineid=".$GLOBALS["id"];
		 $qry = mysql_query($sql_statement);
		share_showerr("資料刪除成功");
	}
 }
function upcontent($mytable,$myid,$mypage){
     if( empty($GLOBALS["linename"]) ){
		 share_showerr("請確認填寫所有內容");
     }else{
 	      $sql_statement ="SELECT lineid FROM ".$mytable." WHERE linename='".$GLOBALS["linename"]."' AND ".$myid."<>".$GLOBALS["id"];	
	      $qry = mysql_query($sql_statement);
		  $row = mysql_fetch_array($qry);
		  if($row['lineid']){
			  $flag=1;
		  }
		  if($flag==0){
			  
				if($GLOBALS['isopen']==1){
					$isopen=1;
				}else{
					$isopen=0;
				}
			 	$sql_statement ="UPDATE ".$mytable." SET linename='".$GLOBALS["linename"]."', isopen='".$isopen."' WHERE  ".$myid."=".$GLOBALS["id"];				  
			 	$qry = mysql_query($sql_statement); 
				share_showerr("資料更新成功");
          }else{
				share_showerr("名稱已經存在,無法更新");
		  }
	}
 }
 function addcontent($mytable,$myid,$mypage){
     if( empty($GLOBALS["linename"])){
		share_showerr("請確認填寫資料");
     }else{
	 	      $sql_statement ="SELECT lineid FROM ".$mytable." WHERE linename='".$GLOBALS["linename"]."'";
		      $qry = mysql_query($sql_statement);
			  $row = mysql_fetch_array($qry);
			  if($row['lineid']){
				  $flag=1;
			  }
			  if($flag==0){
				if($GLOBALS['isopen']==1){
					$isopen=1;
				}else{
					$isopen=0;
				}
				$temp=share_gettable($mytable." order by sorting DESC limit 0,1");
				if(count($temp)>0){
					$mysort=$temp[0]["sorting"]+1;
				}else{
					$mysort=1;
				}
				$sql_statement ="INSERT INTO ".$mytable."(linename,isopen,sorting) VALUES('".$GLOBALS["linename"]."','".$isopen."','".$mysort."')";
		     	$qry = mysql_query($sql_statement);
				share_showerr("資料新增成功");
	          }else{
					share_showerr("資料已經存在,無法新增");
			  }
     }
 }

 function getcontent($mytable,$myid,$mypage){
	 echo "<h2>".$GLOBALS['mytitle']."分類設定</h2>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform>\n";
	 echo "<TR><th colspan=3>新增</th></TR>\n";
	 echo "<TR><th class=req style='width:120px'>分類名稱(建議20個英數內)</th><th>使用</th><th>新增</th></TR>\n";
	 echo "<td><input type=text name=linename></TD>\n";
	 echo "<td><input type=checkbox name=isopen value=1 checked>是</td>\n";
	 echo "<td><input type=submit value='確定新增' class='gray-btn'></td>\n";
     echo "</form></tr>";	 
	 echo "</TABLE>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><th colspan=5>管理</TH></TR>\n";
	 echo "<TR><th style='width:70px'>刪除</th><th class=req style='width:120px'>分類名稱(建議20個英數內)</th><th>使用</th><th>更新</th><th>排序</th></TR>";
	 $rows=share_gettable($mytable." ORDER BY sorting DESC");
	 $z=0;
     foreach($rows as $row){
		     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['lineid']."' method='post' ><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['lineid']."' class='blue-btn'>刪除</a></td>\n";
			 echo "<td><input type=text name=linename value='".$row['linename']."'></TD>\n";
			if($row['isopen']=="1"){
				echo "<td><input type=checkbox name=isopen value=1 checked>是</td>\n";
			}else{
				echo "<td><input type=checkbox name=isopen value=1>是</td>\n";
			}
			echo "<td><input type=submit value='確定修改' class='gray-btn'></td></FORM>\n";
			echo "<FORM action='index.php?tf=".$mypage."&job=changesorting&thisorting=".$row["sorting"]."&id=".$row['lineid']."' method='post' ><td><select name=myorder class=changeselect>\n";
			for($b=1;$b<=count($rows);$b++){
			   if($b==($z+1)){
					echo "<option value='".$b."' selected>".$b."</option>\n";
			   }else{
					echo "<option value='".$b."'>".$b."</option>\n";		
			  }
			}
			echo "</select></td></form></tr>\n";
			$z=$z+1;
 	} 
	echo "</TABLE>";

 }
	?>
        </div>

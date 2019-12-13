         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="setchatline";
	$mytable="chatimgtype";
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
	 $ct=share_getcount("chatimg WHERE typeid=".$GLOBALS["id"]);
	 if($ct==0){
		 share_del($mytable." WHERE thisid=".$GLOBALS["id"]);
		 share_showerr("刪除成功了");
	 }else{
		 share_showerr("已有繫結資料，要刪除本資料請先刪除/修改相關資料");
	 }
 }
function upcontent($mytable,$mypage){
     if( empty($GLOBALS["thisname"]) ){
		 share_showerr("請確認填寫所有內容");
     }else{
		 if($t=share_gettable($mytable." WHERE thisname='".$GLOBALS["thisname"]."' AND thisid<>".$GLOBALS["id"])){
			 share_showerr("資料已經存在");
		 }else{
			 share_update($mytable,"thisname='".$GLOBALS["thisname"]."'","thisid=".$GLOBALS["id"]);
			 share_showerr("更新成功了");
		}		 
	}
 }
 function addcontent($mytable,$mypage){
     if( empty($GLOBALS["thisname"])){
		share_showerr("請確認填寫資料");
     }else{
		 if($t=share_getinfo($mytable,"thisname",$GLOBALS["thisname"])){
			 share_showerr("資料已經存在");
		 }else{
			 share_insert($mytable,"thisname,storeid","'".$GLOBALS["thisname"]."','".$_SESSION['storeid']."'");
			 share_showerr("新增成功了");
		}
     }
 }

 function getcontent($mytable,$mypage){
	 
	 echo "<TABLE class=formtable width=600>";
	 echo "<TR><Th colspan=4>主分類設定</Th></TR>";
	 echo "<TR><th style='width:100px'>刪除</th><th class=req style='width:220px'>分類名稱</th><th>更新</th></TR>";
	 $lines=share_gettable($mytable." WHERE storeid='".$_SESSION['storeid']."'");
	 foreach($lines as $row){
	     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['thisid']."' method='post' ><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['thisid']."' class='delbtn'>刪除</a></td>";
		 echo "<td><input type=text name=thisname value='".$row['thisname']."'></TD>";
		 echo "<td><input type=submit  class='gray-btn'></td></tr></form>";
    }
	echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform><td>新增</td>";
	echo "<td><input type=text name=thisname></TD>";
	echo "<td><input type=submit class='gray-btn'></td></tr></form>";
	echo "</TABLE>";

 }
	?>
        </div>

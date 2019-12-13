 <div class='maincontents' id='select2'>
 <?php
 ################################
	if($job=="adduser"){
		 adduser();
	 }elseif($job=="deluser"){
		 deluser();
	 }elseif($job=="upuser"){
		 upuser();
	 }
	 getuser();
 ###########################################
 function deluser(){
	 if(empty($GLOBALS["uid"])){
		 echo "<div id=error>系統錯誤</div>";
    }else{
		 if(chkcreator($GLOBALS["uid"])){
			  delone($GLOBALS["uid"]);
		 }else{
			 echo "<div id=error>您沒有權限刪除這位管理者，謝謝</div>";
		 }
	 }	 
 }
 function delone($uid){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	//看看有沒有他創造的人物,有的話一起刪除
	$temp="";
	$temp=share_getinfo($pdom,"admin","creator",$uid);
	if(is_array($temp)){
		foreach($temp as $row){
			delone($row['userid']);
		}
	}
	//刪除完 creat的使用者.刪除自己
	share_del($pdom,"funcrights WHERE userid=".$uid);
	share_del($pdom,"admin WHERE userid=".$uid);
	$pdom=null;
 }
 function adduser(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 if(empty($GLOBALS["uname"]) or empty($GLOBALS["pword"])){
		 echo "<div id=error>所有內容皆為必須填寫</div>";
    }else{
		 share_insert($pdom,"admin","username,password,email,isopen,creator","'".$GLOBALS["uname"]."','".$GLOBALS["pword"]."','".$GLOBALS["email"]."',".$GLOBALS["isopen"].",'".$_SESSION['uid']."'");
		 if(isset($GLOBALS['funcid'])){	
		 	$row=share_getinfo($pdom,"admin","username",$GLOBALS["uname"]);
			if($row){
				$myid=$row['userid'];
			}
		    for($i=0;$i<count($GLOBALS['funcid']);$i++){
				share_insert($pdom,"funcrights","funcid,userid",$GLOBALS['funcid'][$i].",".$myid);
		    }			 
		 }
	 }
	$pdom=null;
 }
 function chkcreator($uid){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	$ffk=0;
	$row=share_getinfo($pdom,"admin","userid",$uid);
	$pdom=null;
	if($row['creator']){
		if($row['creator']==$_SESSION['uid']){
			return true;
		}else{
			$ffk=$row['creator'];
		}		
	}else{
		return false;
	}		
	if($ffk){
		chkcreator($ffk);
	}

 }
 function upuser(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 $ff=0;
	 if(empty($GLOBALS["uname"]) or empty($GLOBALS["pword"]) or empty($GLOBALS["uid"])){
		 echo "<div id=error>名稱及密碼必須填寫</div>";
    }elseif(strlen($GLOBALS["uname"])<2 || strlen($GLOBALS["pword"])<2){
		 echo "<FONT color=red>名稱至少 2位數,密碼至少2位數</font><BR>";
	}else{
		$row=share_getinfo($pdom,"admin","userid",$GLOBALS["uid"]);
		if($row && $row['issuper']==1){
			$ff=1;
		}		
		if($ff==0){
			if(chkcreator($GLOBALS["uid"])|| $_SESSION['issuper']==1 || $GLOBALS["uid"]==$_SESSION['uid']){
				if($GLOBALS["uid"]==$_SESSION['uid']){
					share_update($pdom,"admin","username='".$GLOBALS["uname"]."', password='".$GLOBALS["pword"]."', email='".$GLOBALS["email"]."'","userid=".$GLOBALS["uid"]);
				}else{
					share_update($pdom,"admin","username='".$GLOBALS["uname"]."', password='".$GLOBALS["pword"]."', email='".$GLOBALS["email"]."',isopen=".$GLOBALS["isopen"],"userid=".$GLOBALS["uid"]);
					share_del($pdom,"funcrights WHERE userid=".$GLOBALS["uid"]);
					 if(isset($GLOBALS['funcid'])){
						for($i=0;$i<count($GLOBALS['funcid']);$i++){
							share_insert($pdom,"funcrights","funcid,userid",$GLOBALS['funcid'][$i].",".$GLOBALS["uid"]);
						}
					}
				}
			}else{
				 echo "<div id=error>您沒有權限修改這位管理者<BR><BR></div>";
			 }
		}else if($ff==1 && $_SESSION['issuper']==1){
			share_update($pdom,"admin","username='".$GLOBALS["uname"]."', password='".$GLOBALS["pword"]."', email='".$GLOBALS["email"]."',isopen=".$GLOBALS["isopen"],"userid=".$GLOBALS["uid"]);
			share_del($pdom,"funcrights WHERE userid=".$GLOBALS["uid"]);
			if(isset($GLOBALS['funcid'])){
				for($i=0;$i<count($GLOBALS['funcid']);$i++){
					share_insert($pdom,"funcrights","funcid,userid",$GLOBALS['funcid'][$i].",".$GLOBALS["uid"]);
				}
			}			
		}
	 }	
	$pdom=null;
 }
 function getuser(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 ?>
    <h2>管理者許可權設定</h2>
     注意事項<BR />
     [使用者建立]<BR />
     1.使用者只會看到自己有權力的管理項目,因此可以放心給予本頁的管理權力，<BR />
     2.所有使用者有權授予[自己所有的權力]給他[創造的使用者]<BR />
     [使用者授權]<BR />
     1.請小心授權所有有關[設定]的權利,最好不要把[設定]的權力授權給不知道如何操作的使用者<BR />
     [使用者刪除]<BR />
     1.只能刪除你自己建立的使用者,及你建立的使用者所建立的使用者(含所有子子孫孫)<BR />
     2.刪除使用者時,他授權的使用者也會同時被刪除<BR />
     [自我管理]<BR />
     1.你只能調整自己的名稱,密碼和email ,無法管理自己的權限和關閉自己<BR />
      <TABLE width=800  class=formtable>
      <TR>
      <th class='tCenter b-right'>管理者名稱</th>
      <th class='tCenter b-right'>Email</th>
      <th class='tCenter b-right'>密碼</th>
      <th class='tCenter b-right'>許可權</th>
      <th class='tCenter b-right'>啟用</th>
      <th class='tCenter b-right'>新增</th>
      </TR>
      <?
	 $myarr = array();
	 $a=0;
	 if($_SESSION['issuper']==1){
		 $temp=share_gettable($pdom,"funclist");
	 }else{
		  $temp=share_gettable($pdom,"funclist where funcid in (SELECT funcid FROM funcrights WHERE userid=".$_SESSION['uid'].")");
	 }
	 foreach($temp as $row){
         $myarr[$a]['id']=$row['funcid'];
         $myarr[$a]['name']=$row['funcname'];	
		 $a++;
     }
     echo "<tr><FORM action='index.php?tf=select97' method='post'><INPUT type=hidden name=job value=adduser />";
	 echo "<td class='tCenter b-right'><input type='text' name='uname' class='input02'/></td>";
	 echo "<td class='tCenter b-right'><input type='text' name='email' class='input02'/></td>";
	 echo "<td class='tCenter b-right'><input type='text' name='pword' class='input02' /></td>";
     echo "<td class='tCenter b-right'><div class=funcwrap>";
	for ($i=0;$i<sizeof($myarr);$i++){
		echo "<p class=funclist><input type=checkbox name='funcid[]' value='".$myarr[$i]['id']."'>".$myarr[$i]['name']."</p>";
	}
     echo "</div></td>";
	 echo "<td><input type=radio name=isopen value=1>是<input type=radio name=isopen  checked value=0>否</td>";
	 echo "<td><input type=submit class='gray-btn' /></td></FORM></tr>";      
	 ?>
      <TABLE width=850  class=formtable>
      <TR>
      <th class='tCenter b-right' width=60>刪除</th>
      <th class='tCenter b-right' width=40>編號</th>
      <th class='tCenter b-right' width=80>管理者名稱</th>
      <th class='tCenter b-right' width=80>密碼</th>
      <th class='tCenter b-right' width=120>Email</th>
      <th class='tCenter b-right' width=200>許可權</th>
      <th class='tCenter b-right' width=80>啟用</th>
      <th class='tCenter b-right' width=80>更新</th>
      </TR>
      <?
	  $temp=share_gettable($pdom,"admin where issuper<>1");
	  foreach($temp as $row){
 		        echo "<tr><FORM action='index.php?tf=select97&job=upuser&uid=".$row["userid"]."' method='post' >";
				echo "<td class='tCenter b-right'><a href=index.php?tf=select97&job=deluser&uid=".$row["userid"]." class='blue-btn delbtn'>刪除</a></td>";
				echo "<td class='tCenter b-right'>".$row["userid"]."</td><td class='tCenter b-right'><input type=text name=uname value='".$row["username"]."' class='input02'></TD><td class='tCenter b-right'><input type=password name=pword value='".$row["password"]."' class='input02'></TD><td class='tCenter b-right'><input type=text name=email value='".$row["email"]."' class='input02'></TD>";
                echo "<td class='tCenter b-right'><div class=funcwrap>";
				for ($i=0;$i<sizeof($myarr);$i++){
					$tp=0;
					$rowb=share_gettable($pdom,"funcrights WHERE userid=".$row['userid']." AND funcid=".$myarr[$i]['id']);
					if(isset($rowb[0]['funcid'])){
						echo "<p class=funclist><input type=checkbox name='funcid[]' value='".$myarr[$i]['id']."' checked>".$myarr[$i]['name']."</p>";
						$tp=1;
					}
					if($tp==0){
					    echo "<p class=funclist><input type=checkbox name='funcid[]' value='".$myarr[$i]['id']."'>".$myarr[$i]['name']."</p>";
                    }
				}
				echo "</div></td>";
				if(isset($row['isopen']) && $row['isopen']==1){
					 echo "<td class='tCenter b-right'><input type=radio name=isopen checked value=1>是<input type=radio name=isopen value=0>否</td>";
				}else{
					 echo "<td class='tCenter b-right'><input type=radio name=isopen value=1>是<input type=radio name=isopen  checked value=0>否</td>";					 
				}
                echo "<TD class='tCenter b-right'><input type=submit class='gray-btn'></TD>";
				echo "</form></TR>";
     }
     echo "</TABLE>";
	 echo "<BR><P>備註:<br><oL class=faqintro ><li>更新使用權時請務必重新登入</li><li>啟用後使用者才能登入</li><li>沒有許可權無法使用任何功能</li><ol></p>";
 }
	?>
        </div>

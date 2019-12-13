         <div class=maincontents id=select2>
         <?php
################################

if($job=="addfunc"){
	 addfunc();
 }elseif($job=="delfunc"){
	 delfunc();
 }elseif($job=="upfunc"){
	 upfunc();
 }elseif($job=="changesorting"){
	 sorting();
 }
 getfunc();
function sorting(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	$neworder="";
	$row=share_gettable($pdom,"funcgroup ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
    $neworder=$row[0]['sorting'];
	if($GLOBALS["thisorder"]>$neworder){
		share_update($pdom,"funcgroup","sorting=sorting+1", "sorting<".$GLOBALS["thisorder"]." AND sorting>=".$neworder);
	}else{
		share_update($pdom,"funcgroup","sorting=sorting-1", "sorting>".$GLOBALS["thisorder"]." AND sorting<=".$neworder);
	}
	share_update($pdom,"funcgroup","sorting=".$neworder, "groupid=".$GLOBALS["groupid"]);
	$pdom=null;
}	 
 function delfunc(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	if(empty($GLOBALS["groupid"])){
		 echo "系統錯誤";
    }else{
		$mycount=0;
		$row=share_getinfo($pdom,"funclist","groupid",$GLOBALS["groupid"]);
		$mycount=$row["CC"];
	   if($mycount==0){
		   share_del($pdom,"funcgroup WHERE groupid=".$GLOBALS["groupid"]);
	   }else{
		   echo "本功能已有權力系結，請先移轉相關設定，謝謝";
	   }
	}	
	$pdom=null;
 }
 function addfunc(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	if(empty($GLOBALS["groupname"])){
		 echo "所有內容皆為必須填寫";
    }else{
		$row=share_gettable($pdom,"funcgroup order by sorting desc limit 1");
		if(is_array($row)){
			$myorders=$row[0]["sorting"]+1;
		}else{
			$myorders=1;
		}
		share_insert($pdom,"funcgroup","groupname,sorting","'".$GLOBALS["groupname"]."',".$myorders);
	 }
	 $pdom=null;
 }
 function upfunc(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 if(empty($GLOBALS["groupname"]) or empty($GLOBALS["groupid"])){
		 echo "所有內容皆為必須填寫";
    }else{
		share_update($pdom,"funcgroup","groupname='".$GLOBALS["groupname"]."'","groupid=".$GLOBALS["groupid"]);
	 }	 
	 $pdom=null;
 }
 function getfunc(){

	 ?>

     <h2>管理分類設定</h2>
     <TABLE width=800  class=formtable>     
      <TR><th class='tCenter b-right'>管理分類名稱</th>
      <th class='tCenter b-right'>新增</th></TR>     
       <tr><FORM action='index.php?tf=select98' method='post'><INPUT type=hidden name=job value=addfunc />
       <td class='tCenter b-right'><input type='text' name='groupname' class='input02' /></td>
       <td class='tCenter b-right'><input type=submit value='新增' class='gray-btn'></td>
     </FORM></tr>
     </TABLE>
     <TABLE width=800  class=formtable>     
      <TR>
      <th class='tCenter b-right'>刪除</th>
      <th class='tCenter b-right'>管理分類ID</th>
      <th class='tCenter b-right'>管理分類名稱</th>
      <th class='tCenter b-right'>更新</th>
      <th class='tCenter b-right'>排序</th>
      </TR>
     <?php
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	
	$temp=share_getcount($pdom,"funcgroup");
	if($temp){
        $mycc=$temp;
     }else{
	 	$mycc=0;
	 }
     $a=1; 
	 $temp=share_gettable($pdom,"funcgroup order by sorting DESC");
	 foreach($temp as $row){
 		echo "<tr><FORM action='index.php?tf=select98&job=upfunc&groupid=".$row["groupid"]."' method='post' >";
		echo "<td class='tCenter b-right'><a href=index.php?tf=select98&job=delfunc&groupid=".$row["groupid"]." class='blue-btn delbtn'>刪除</a></td>";
		echo "<td class='tCenter b-right'>".$row["groupid"]."</td><td><input type=text name=groupname value='".$row["groupname"]."' class='input02' ></TD>";
        echo "<td class='tCenter b-right'><input type=submit class='gray-btn' value='更新'></td></form>";
 	    echo "<FORM action='index.php?tf=select98&job=changesorting&groupid=".$row["groupid"]."&thisorder=".$row["sorting"]."' method='post'>";
		echo "<td class='tCenter b-right'><select name=myorder class='changeselect select02'>";
        for($b=1;$b<=$mycc;$b++){
		    if($b==$a){
			     echo "<option value='".$b."' selected>".$b."</option>";
		    }else{
			      echo "<option value='".$b."'>".$b."</option>";		
		    }
		}
        echo "</TD></form>";
		echo "</TR>";
		$a++;					
     }
     echo "</TABLE>";
	 $pdom=null;
 }
	?>
	</div>

         <div class=maincontents id=select2>
         <?php
################################

if($job=="addfunc"){
	 addfunc();
 }elseif($job=="delfunc"){
	 delfunc();
 }elseif($job=="upfunc"){
	 upfunc();
 }
 getfunc();
	 
 function delfunc(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	 if(empty($GLOBALS["funcid"])){
		 echo "系統錯誤";
    }else{
		$mycount=0;
		$mycount=share_getcount($pdom,"funcrights WHERE funcid=".$GLOBALS["funcid"]);
	    if($mycount==0){
			share_del($pdom,"funclist WHERE funcid=".$GLOBALS["funcid"]);
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
	 if(empty($GLOBALS["funcname"]) || empty($GLOBALS["funclink"]) ){
		 echo "所有內容皆為必須填寫";
    }else{
		share_insert($pdom ,"funclist","funcname,funclink,groupid,funcval","'".$GLOBALS["funcname"]."','".$GLOBALS["funclink"]."',".$GLOBALS["groupid"].",'".$GLOBALS["funcval"]."'");
	 }
	 $pdom =null;
 }
 function upfunc(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);
	 if(empty($GLOBALS["funcname"]) or empty($GLOBALS["funcid"])or empty($GLOBALS["funclink"])){
		 echo "所有內容皆為必須填寫";
    }else{
		share_update($pdom ,"funclist","funcname='".$GLOBALS["funcname"]."',funclink='".$GLOBALS["funclink"]."',groupid=".$GLOBALS["groupid"].",funcval='".$GLOBALS["funcval"]."'","funcid=".$GLOBALS["funcid"]);
	 }
	 $pdom =null;
 }
 function getfunc(){
	 ?>
     <h2>管理功能設定</h2>
     <TABLE width=800  class=formtable>
      <TR>
      <th style='width:120px' class='tCenter b-right'>管理分類</th>
      <th style='min-width:200px' class='tCenter b-right'>名稱(僅給予參考)</th>
      <th class='tCenter b-right' width='150'>功能連結</th>
      <th class='tCenter b-right' width='50'>變數pg</th>
      <th class='tCenter b-right' width=80>新增</th>
      </TR>
     <?php
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);
	 $myarr = array();
	 $a=0;	 
	 $temp=share_gettable($pdom,"funcgroup");
	 foreach($temp as $row){
        $myarr[$a]['id']=$row['groupid'];
        $myarr[$a]['name']=$row['groupname'];	
		$a++;
     }	
     echo "<tr><FORM action='index.php?tf=select99' method='post'><INPUT type=hidden name=job value=addfunc />";
	 echo "<td class='tCenter b-right'><select name=groupid class='select01'>";
	 for ($i=0;$i<sizeof($myarr);$i++){
		echo "<option value='".$myarr[$i]['id']."'>".$myarr[$i]['name']."</option>";
 	 }
	 echo "</select></td>";
     echo "<td class='tCenter b-right'><input type='text' name='funcname' class='input02' /></td><td class='tCenter b-right'><input type='text' name='funclink' class='input02' /></td><td class='tCenter b-right'><input type=text name=funcval class='input02'></TD><td class='tCenter b-right'><input type=submit class='gray-btn' value='新增'></td>";
     echo "</FORM></tr>";      
	 ?>
      </TABLE>
     <TABLE width=800  class=formtable>
      <TR>
      <th class='tCenter b-right' width=80>刪除</th>
      <th style='width:120px' class='tCenter b-right'>管理分類</th>
      <th style='width:50px' class='tCenter b-right'>funcid</th>
      <th style='min-width:150px' class='tCenter b-right'>名稱(僅給予參考)</th>
      <th class='tCenter b-right' width='150'>功能連結</th>
      <th class='tCenter b-right' width='50'>變數pg</th>
      <th class='tCenter b-right' width=80>更新</th>
      </TR>
	<?
	$temp=share_gettable($pdom,"funclist");
	foreach($temp as $row){
		echo "<tr><FORM action='index.php?tf=select99&job=upfunc&funcid=".$row["funcid"]."' method='post' >";
		echo "<td class='tCenter b-right'><a href=index.php?tf=select99&job=delfunc&funcid=".$row["funcid"]." class='blue-btn delbtn'>刪除</a></td>";
		echo "<td class='tCenter b-right'><select name=groupid class='select01'>";
		for ($i=0;$i<sizeof($myarr);$i++){
			if($row['groupid']==$myarr[$i]['id']){
				echo "<option value='".$myarr[$i]['id']."' selected>".$myarr[$i]['name']."</option>";						
			}else{
				echo "<option value='".$myarr[$i]['id']."'>".$myarr[$i]['name']."</option>";
			}
		}
		echo "</select></td>";
        echo "<td class='tCenter b-right'>".$row["funcid"]."</td><td><input type=text name=funcname  class='input02' value='".$row["funcname"]."'></TD><td class='tCenter b-right'><input type=text name=funclink value='".$row["funclink"]."' class='input02'></TD><td class='tCenter b-right'><input type=text name=funcval value='".$row["funcval"]."' class='input02'></TD>";
        echo "<td class='tCenter b-right'><input type=submit class='gray-btn' value='更新'></td></form></TR>";
     }
     echo "</TABLE>";
 }
	?>
    </div>


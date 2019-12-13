         <div class=maincontents id=setcontent>
         <style>
		 /*20190402 Pman 調整預設寬度*/
		 .cwrap img{max-width:150px;max-height:150px;}
		 </style>
     <script>
     ﻿$(document).ready(function() {
       $(".cwrap").find("img").mouseenter(function(){
         $(this).stop().animate({"max-height":150},500); //20190402 Pman 調整變化寬度
       });
       $(".cwrap").find("img").mouseleave(function(){
         $(this).stop().animate({"max-height":150},500);//20190402 Pman 調整變化寬度
       });
     });
     </script>
         <?php
	################################
	####  設定
	$mypage="selectrep";
	$mytable="report";
	$tablelist = array();
	//執行
	if($job=="delrep"){
		 delrep($mytable,$mypage);
	}elseif($job=="delcontent"){
		 delcontent($mytable,$mypage);
	}
	getcontent($mytable,$mypage);
#######################################
 function delcontent($mytable,$mypage){
	global $conf;
	$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
	$pdod -> exec("set names ".$conf['db_encode']);
	$me=share_getinfo($pdod,$mytable,"thisid",$GLOBALS["id"]);
	if($me['retype']=="qna"){//這個應該只有管理者可以刪除   刪除自己(qna_)==>刪除回應(qrep_==>刪除我也想知道(qrep_
		$t=share_getinfo($pdod,"qna_","thisid",$me['reid']);
		share_del($pdod,"qna_ WHERE thisid='".$me['reid']."'");
		share_del($pdod,"qrep_ WHERE contentid='".$t['thisid']."'");
		share_del($pdod,"qals_ WHERE contentid='".$t['thisid']."'");
	}else if($me['retype']=="wall"){//回找contentid==>刪除 wall(wall)==>(如果content沒有type)==>刪除content(con_)==> 刪除 回應(rep_)
		$t=share_getinfo($pdod,"wall","thisid",$me['reid']);
		share_del($pdod,"wall WHERE thisid='".$me['reid']."'");
		$c=share_getinfo($pdod,"con_","thisid",$t['contentid']);
		if($c['typeid']=="0"){
			share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
			share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
		}
	}else if($me['retype']=="article"){//回找contentid==>刪除文章(art_)==>刪除 wall(wall) with contentid==>刪除content(con_)==> 刪除 回應(rep_)
		$t=share_getinfo($pdod,"art_","thisid",$me['reid']);
		share_del($pdod,"art_ WHERE thisid='".$me['reid']."'");
		share_del($pdod,"wall WHERE contentid='".$t['contentid']."'");
		share_del($pdod,"con_ WHERE thisid='".$t['contentid']."'");
		share_del($pdod,"rep_ WHERE contentid='".$t['contentid']."'");
	}
	 if(share_del($pdod,$mytable." WHERE thisid=".$GLOBALS["id"])){
		share_showerr("刪除成功了");
	 }else{
		share_showerr("刪除失敗了");
	 }
	 $pdod=null;
 }
  function delrep($mytable,$mypage){
	global $conf;
	$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
	$pdod -> exec("set names ".$conf['db_encode']);
	 if(share_del($pdod,$mytable." WHERE thisid=".$GLOBALS["id"])){
		share_showerr("更新成功了");
	 }else{
		share_showerr("更新失敗了");
	 }
	 $pdod=null;
 }

 function getcontent($mytable,$mypage){
	global $conf;
	$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
	$pdod -> exec("set names ".$conf['db_encode']);
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);
	echo "<TABLE class=formtable width=950>";
	echo "<TR><Th colspan=9>檢舉檢查</Th></TR>";
	echo "<TR><th style='width:50px'>刪除</th><th style='width:50px'>不處理</th><th class=req style='width:80px'>分類</th><th class=req style='width:100px'>原因</th><th class=req style='width:100px'>標題</th><th class=req style='width:500px'>內容</th><th class=req style='width:80px'>張貼者</th><th class=req  style='width:80px'>檢舉人</th></TR>";
	$lines=share_gettable($pdod,$mytable);
	foreach($lines as $row){
		$me="";
		$pop="";
		if($row['retype']=="wall"){
			$res="動態牆";
			$nt=share_getinfo($pdod,"wall","thisid",$row['reid']);
			$tem=share_getinfo($pdod,"con_","thisid",$nt['contentid']);
			$title="NA";
			$content=$tem['thiscontent'];
			$content=str_replace("uploadfile","../uploadfile",$content);
		}else if($row['retype']=="article"){
			$res="攻略";
			$nt=share_getinfo($pdod,"art_","thisid",$row['reid']);
			$title=mb_substr($nt['thistitle'],0,50,'UTF-8');
			$content=mb_substr($nt['thiscontent'],0,200,'UTF-8');
		}else if($row['retype']=="qna"){
			$res="Q&A";
			$nt=share_getinfo($pdod,"qna_","thisid",$row['reid']);
			$title="NA";
			//$content=mb_substr($nt['thiscontent'],0,100,'UTF-8');
			$content=$nt['thiscontent'];
			$content=str_replace("uploadfile","../uploadfile",$content);
		}
		$me=share_getinfo($pdom,"mem_","memberid",$row['memberid']);
		$pop=share_getinfo($pdom,"mem_","memberid",$nt['memberid']);
		echo "<tr>\n";
		echo "<td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['thisid']."' class='delbtn'>刪除</a></td>";
		echo "<td><a href='index.php?tf=".$mypage."&job=delrep&id=".$row['thisid']."' class='gray-btn'>不處理</a></td>";
		echo "<td>".$res."</TD>";
		echo "<td>".$row['reason']."</TD>";
		echo "<td style='width:100px;text-align:left;'>".$title."</td>\n";
		$content=str_replace("\"","'",$content);
		$content=str_replace("\n","<br>",$content);
		echo "<td style='width:320px;text-align:left;' class='cwrap'>";
		echo "<script type='text/javascript'>document.write (unescape(\"".$content."\"));</script>";//20190402 Pman 為了處理該死的emoji，將內容整理後，丟給JS處理unescape
		echo "</td>\n";
		echo "<td>".$pop['nickname']."</td>\n";
		echo "<td>".$me['nickname']."</td>\n";
		echo "</tr>";
	}
	echo "</TABLE>";
	$pdom=null;
	$pdod=null;
 }
	?>
        </div>

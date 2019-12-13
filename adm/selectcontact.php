 <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mytitle="聯絡我們";
	$mypage="selectcontact";
	$mytable="contacts";
	$myid="thisid";

################################
	$linepage=50;
	if($job=="deluser"){
		deluser($mytable,$mypage,$myid,$id);
	 	getuser($mytable,$mypage,$myid);
	 }else if($job=="getdetail"){
		 getdetail($mytable,$mypage,$myid,$id);
	}else if($job=="ans"){
		 answerme($mytable,$mypage,$myid,$id);
		 getdetail($mytable,$mypage,$myid,$id);
	}else{
		getuser($mytable,$mypage,$myid);
	}

###########################################
	function deluser($mytable,$mypage,$myid,$id){
		global $conf;	
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);	
		share_del($pdom,$mytable." where ".$myid."='".$id."'");
		$pdom=NULL;
	}
	function answerme($mytable,$mypage,$myid,$id){
		$ff="";
		
		if(isset($GLOBALS['answer'])){
			global $conf;	
			$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
			$pdom -> exec("set names ".$conf['db_encode']);		
			$me=share_getinfo($pdom,$mytable,$myid,$id);
			//if($me['thisanswer']){
			//	share_showerr("錯誤<BR>已回應過,無法再次回應");
			//}else{
				$GLOBALS['temptitle']="NEED 的回覆-".$me['thistitle'];
				sendmail('3',$me['thisemail'],"以下是NEED針對您提出的 ".$me['thistitle']."所做的回覆<BR><BR>您說:<BR>".nl2br($me['thisqestion'])."<BR><BR>NEED的回答:<BR>".nl2br($GLOBALS['answer']));
				share_update($pdom,$mytable,"thisanswer='".$GLOBALS['answer']."',dateupdate=NOW()",$myid."='".$id."'");
				share_showerr("信件已寄出");
			//}
		}else{
			share_showerr("錯誤<BR>請輸入回應");
		}
	}
	function getdetail($mytable,$mypage,$myid,$id){
		global $conf;	
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);	
		$me=share_getinfo($pdom,$mytable,$myid,$id);
		 ?>
		 <h2><?=$GLOBALS['mytitle']?> <?=$me['nickname']?>管理</h2>
		 <TABLE width=800 class='formtable'>
         <TR><TD colspan=2><a href='index.php?tf=<?=$mypage?>&page=<?=$GLOBALS['page']?>&ktype=<?=$GLOBALS['ktype']?>' class='gray-btn'>回列表</a></TD></TR>
         <TR><Th>姓名</Th><TD><?=$me['thisname']?></TD></TR>
		 <TR><TH>電話</TH><td><?=$me['thisphone']?></td></TR>
         <TR><TH>Email</TH><td><?=$me['thisemail']?></td></TR>
         <TR><TH>聯絡類型</TH><TD><?=$me['thistype']?></td></TR>
         <TR><TH>聯絡時間</TH><TD><?=$me['dateadd']?></td></TR>
         <TR><TH>更新時間</TH><TD><?=$me['dateupdate']?></td></TR>
         <TR><TH>標題</TH><TD><?=$me['thistitle']?></td></TR>
         <TR><TH>內容</TH><TD style='text-align:left'><?=nl2br($me['thisqestion']) ?></td></TR>
         <? 
		 if($me['thisanswer']){
			 echo "<TR><TH>回覆</TH><TD style='text-align:left'>".$me['thisanswer']."</td></TR>";
		 }else{
			 echo "<FORM action='index.php?tf=".$mypage,"&job=ans&id=".$id."&page=".$page."&ktype=".$GLOBALS['ktype']."' method='post' >";
			 echo "		 <TR><TH>回覆</TH><TD style='text-align:left''><textarea name='answer' style='width:100%;height:200px;'></textarea></td></TR>";
			 echo "		 <TR><TH></TH><TD><input type=submit class='gray-btn'></td></TR>";
			 echo "</FORM>";
		 }
		?>
         </TABLE>
         <?
	}
	function getuser($mytable,$mypage,$myid){
		global $conf;	
		$linepage=30;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);	
		if(isset($GLOBALS["page"])&&!empty($GLOBALS["page"])){
			$page=$GLOBALS["page"];
		}else{
			$page=1;
		}
		 $plong=20;   //show how many pages
		 ?>
		 <h2><?=$GLOBALS['mytitle']?>管理</h2>
		 <TABLE width=800 class='formtable'>
		 <TR><Th colspan=7>管理 <A href='index.php?tf=<?=$mypage?>' style='color:#444;float:right;margin-right:10px;' class='gray-btn'>回總表</A></Th></TR>
		 <TR><FORM action='index.php?tf=<?=$mypage?>&job=search' method='post' ><Th colspan=7  style='text-align:left;'> <span style='margin-left:20px;'>分類快搜</span>
         <span style='margin-left:20px;'>
             <SELECT name='ktype'>
                <option value='合作提案' <?=($GLOBALS["ktype"]=="合作提案"?"selected":"")?> >合作提案</option>
                <option value='廣告刊登' <?=($GLOBALS["ktype"]=="廣告刊登"?"selected":"")?> >廣告刊登</option>
                <option value='檢舉通報' <?=($GLOBALS["ktype"]=="檢舉通報"?"selected":"")?> >檢舉通報</option>
                <option value='聯絡客服' <?=($GLOBALS["ktype"]=="聯絡客服"?"selected":"")?> >聯絡客服</option>
                <option value='意見回饋' <?=($GLOBALS["ktype"]=="意見回饋"?"selected":"")?> >意見回饋</option>
				<option value='新聞稿投稿' <?=($GLOBALS["ktype"]=="新聞稿投稿"?"selected":"")?> >新聞稿投稿</option>
				<option value='需要新增的遊戲標籤' <?=($GLOBALS["ktype"]=="需要新增的遊戲標籤"?"selected":"")?> >需要新增的遊戲標籤</option><!--20190320 Pman 新增聯絡我們的選項-->
                <option value='系統錯誤回報' <?=($GLOBALS["ktype"]=="系統錯誤回報"?"selected":"")?> >系統錯誤回報</option><!--20190320 Pman 新增聯絡我們的選項-->
				<option value='帳號懲處相關問題' <?=($GLOBALS["ktype"]=="帳號懲處相關問題"?"selected":"")?> >帳號懲處相關問題</option><!--20190320 Pman 新增聯絡我們的選項-->
             </SELECT>
         </span>
         <span style='margin-left:20px;'> <input type='submit' class='gray-btn' /></span></FORM></Th></TR>    
		 <TR><th  width=80>刪除</th><th>姓名</th><th>類型</th><th>標題</th><th width=120>時間</th><th width=80>回覆</th><th width=200>管理</th></TR>
		 <?php
		 if($GLOBALS["ktype"]){
			 $totaluser=share_getcount($pdom,$mytable." WHERE thistype='".$GLOBALS['ktype']."'");
		 }else{
			 $totaluser=share_getcount($pdom,$mytable);
		 }
		 echo "<tr><td colspan=7>總篇數:".$totaluser."篇<TD></TR>";
		 if($GLOBALS["ktype"]){
			 $temp=share_gettable($pdom,$mytable." WHERE thistype='".$GLOBALS['ktype']."' order by ".$myid." limit ".($page-1)*$linepage.", ".$linepage);
		 }else{
			$temp=share_gettable($pdom,$mytable." order by ".$myid." limit ".($page-1)*$linepage.", ".$linepage);
		 }
		foreach($temp as $row){
			echo "<tr>\n";
			echo "<td><a href='index.php?tf=".$mypage."&job=deluser&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."' class='blue-btn delbtn'>刪除</a></td>\n";
			echo "<td>".$row["thisname"]."</td>\n";
			echo "<td>".$row["thistype"]."</td>\n";
			echo "<td>".$row["thistitle"]."</td>\n";
			echo "<td>".$row["dateadd"]."</td>\n";
			echo "<td>".($row['thisanswer']?"是":"否")."</td>\n";
			echo "<td><A HREF='index.php?tf=".$mypage."&job=getdetail&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."' class='gray-btn'>進入管理</a></td>\n";
			echo "</tr>";
		 }
		 echo "<tr><td colspan=7 class='pagewrap'>";
		if($page>$plong){
			echo "<a href=index.php?tf=".$mypage."&ktype=".$GLOBALS['ktype']."&page=".(floor($page/$plong)*$plong)."><<</A>";
		}
		for($i=(floor($page/$plong)+1);$i<=($totaluser/$linepage+1) && $i<=(floor($page/$plong)+$plong) ;$i++){
			echo "<a href='index.php?tf=".$mypage."&ktype=".$GLOBALS['ktype']."&page=".$i."' ".($i==$page?"class='on'":"").">".$i."</A>";
		}
		if($totaluser/$linepage > floor($page/$plong)+$plong){
			echo "<a href=index.php?tf=".$mypage."&ktype=".$GLOBALS['ktype']."&page=".(floor($page/$plong)+$plong+1).">>></A>";
		}	
		echo "</td></tr>";
		 echo "</TABLE>";
		 $pdom=NULL;
	}
	?>
        </div>

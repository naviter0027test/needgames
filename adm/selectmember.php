<link href="css/ui-lightness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
﻿ <div class=maincontents id=setcontent>
<script>
﻿$(document).ready(function() {
  $(".lockbtn").click(function(){
    var out="";
    out+="<FORM action='index.php?tf=selectmember&job=lockme&id="+$(this).data("id")+"&page="+$(this).data("page")+"&ktype="+$(this).data("ktype")+"&key="+$(this).data("key")+"' method='post' >\n";
    out+="<input type=text name='lockertime' class='dateitem' placeholder='yy-mm-dd'><BR>";
    out+="<input type=submit class='gray-btn'>\n";
    out+="</FORM>\n";
    $(this).parent("td").html(out);
    $( ".dateitem" ).datepicker({ dateFormat: 'yy-mm-dd' });
  });
});
</script>
         <?php
	################################
	####  設定
	$mytitle="會員";
	$mypage="selectmember";
	$mytable="mem_";
	$myid="memberid";
	//圖片尺寸
	$imgurl="../uploadfile/";
################################
	$linepage=50;
	if($job=="deluser"){
		deluser($mytable,$mypage,$myid,$id);
	 	getuser($mytable,$mypage,$myid);
	 }else if($job=="actuser"){
		actuser($mytable,$mypage,$myid,$id);
	 	getuser($mytable,$mypage,$myid);
	 }else if($job=="upuser"){
		 upuser($mytable,$mypage,$myid,$id);
		 getuser($mytable,$mypage,$myid);
	}else if($job=="adduser"){
		 adduser($mytable,$mypage,$myid);
		 getuser($mytable,$mypage,$myid);
	}else if($job=="lockme"){
		 lockme($mytable,$mypage,$myid,$id);
		 getuser($mytable,$mypage,$myid,$id);
	}else if($job=="unlockme"){
		 unlockme($mytable,$mypage,$myid,$id);
		 getuser($mytable,$mypage,$myid,$id);
	}else if($job=="pv"){
		 phonev($mytable,$mypage,$myid,$id);
		 getdetail($mytable,$mypage,$myid,$id);
	}else if($job=="getdetail"){
		 getdetail($mytable,$mypage,$myid,$id);
	}else if($job=="updetail"){
		 updetail($mytable,$mypage,$myid,$id);
		 getdetail($mytable,$mypage,$myid,$id);
	}else{
		getuser($mytable,$mypage,$myid);
	}

###########################################
	function lockme($mytable,$mypage,$myid,$id){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
    if($GLOBALS['lockertime']){
      share_update($pdom,$mytable,"locker='2',lockertime='".$GLOBALS['lockertime']."' ",$myid."='".$id."'");
    }else{
      share_update($pdom,$mytable,"locker='2'",$myid."='".$id."'");
    }

		$pdom=NULL;
	}
	function unlockme($mytable,$mypage,$myid,$id){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		share_update($pdom,$mytable,"locker='1' ,lockertime=null",$myid."='".$id."'");
		$pdom=NULL;
	}
	function phonev($mytable,$mypage,$myid,$id){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		share_update($pdom,$mytable,"phonev='1'",$myid."='".$id."'");
		$pdom=NULL;
	}
	function deluser($mytable,$mypage,$myid,$id){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		share_del($pdom,$mytable." where ".$myid."='".$id."'");
		$pdom=NULL;
	}
	function actuser($mytable,$mypage,$myid,$id){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		share_update($pdom,$mytable,"actcode='1'",$myid."='".$id."'");
		$pdom=NULL;
	}
	//新增
	function adduser($mytable,$mypage,$myid){
		$ff="";
		global $req;global $reqb;
		for($i=0;$i<sizeof($req);$i++){
			if(isset($GLOBALS[$req[$i]]) && $GLOBALS[$req[$i]]<>"" ){
			}else{
				if($ff==""){
				   $ff=$reqb[$i];
				}else{
				   $ff.=",".$reqb[$i];
				}
			}
		}
		if($ff){
			share_showerr("錯誤,請輸入欄位：".$ff);
		}else{
			if(share_getinfo($pdom,$mytable,"nickname",$GLOBALS['nickname'])){
				share_showerr("暱稱已存在,無法存入");
			}else if(share_getinfo($pdom,$mytable,"email",$GLOBALS['email'])){
				share_showerr("帳號已存在,無法存入");
			}else{
				share_insert($pdom,$mytable,"nickname,password,email","'".$GLOBALS['nickname']."','".$GLOBALS['password']."','".$GLOBALS['email']."'");
				$GLOBALS['nickname']="";
				$GLOBALS['password']="";
				$GLOBALS['email']="";
				share_showerr("資料加入成功");
			}
		}
	}
	function upuser($mytable,$mypage,$myid,$id){
		global $conf;
    $pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
    if(share_getfree($pdom,"SELECT * FROM ".$mytable." WHERE nickname='".$GLOBALS['nickname']."' AND memberid<>'".$GLOBALS['id']."'")){
      share_showerr("暱稱已存在,無法存入");
    }else if(share_getfree($pdom,"SELECT * FROM ".$mytable." WHERE email='".$GLOBALS['email']."' AND memberid<>'".$GLOBALS['id']."'")){
      share_showerr("帳號已存在,無法存入");
    }else{
		  share_update($pdom,$mytable,"nickname='".$GLOBALS['nickname']."',password='".$GLOBALS['password']."',email='".$GLOBALS['email']."'","memberid='".$GLOBALS['id']."'");
		  share_showerr("資料更新成功");
    }
		$pdom=NULL;
	}
	function updetail($mytable,$mypage,$myid,$id){
		$ff="";
		global $fileext;
		global $req;global $reqb;
		for($i=0;$i<sizeof($req);$i++){
			if(isset($GLOBALS[$req[$i]]) && $GLOBALS[$req[$i]]<>"" ){
			}else{
				if($ff==""){
				   $ff=$reqb[$i];
				}else{
				   $ff.=",".$reqb[$i];
				}
			}
		}
		//確認圖片格式
		if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
			$res=share_chkfiletype($_FILES["file"],$fileext);
			if($res=="NO"){
				$myerr.="[ 圖片 ]格式錯誤，請使用 ".$fileext." 格式,";
			}
		}
		if($ff || $myerr){
			share_showerr("錯誤,".$myerr."<BR>請輸入欄位：".$ff);
		}else{
			 $inp= array("nickname","fbid","googleid","email","password","intro","gender","telephone","address");
			  for($i=0;$i<sizeof($inp);$i++){
				if($ff==""){
				   $ff=$inp[$i]."='".$GLOBALS[$inp[$i]]."'";
				}else{
				   $ff.=",".$inp[$i]."='".$GLOBALS[$inp[$i]]."'";
				}
			  }
			  global $conf;
				$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
				$pdom -> exec("set names ".$conf['db_encode']);
 			  share_update($pdom,$mytable,$ff,$myid."='".$id."'");
			  if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
					//開始上傳圖片
					global $imgurl;global $imgwidth;global $imgwidthmax;global $imgheight;global $imgs;global $thumbwidth;global $thumbheight;
					if($fileext=="jpg"){
						$src = imagecreatefromjpeg($_FILES['file']['tmp_name']);
					}else if($fileext=="png"){
						$src = imagecreatefrompng($_FILES['file']['tmp_name']);
					}
					$width = imagesx($src);
					$height =imagesy($src);
					$tempid=$id;
					$mywidth=$imgwidth;
					createimg($tempid,$imgurl,$width,$height,$mywidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
			  }
			  share_showerr("資料更新成功");
		}
	}
	function getdetail($mytable,$mypage,$myid,$id){
		global $conf;
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);
		$me=share_getinfo($pdom,$mytable,$myid,$id);
		$td=date("Y-m-d");
		$ld=date("Y-m-d", mktime(0, 0, 0, date("m")-1, 1));
		$allc=share_getfree($pdom,"select count(*) as CC FROM reflist where refid='".(10000000000000+$id*13)."' AND (memberid-10000000000000)/13 in (select memberid FROM mem_ WHERE phonev='1')");
		$tc=share_getfree($pdom,"select count(*) as CC FROM reflist where CreateDate>='".$td."' AND refid='".(10000000000000+$id*13)."' AND (memberid-10000000000000)/13 in (select memberid FROM mem_ WHERE phonev='1')");
		$lc=share_getfree($pdom,"select count(*) as CC FROM reflist where CreateDate<'".$td."' AND CreateDate>='".$ld."' AND refid='".(10000000000000+$id*13)."' AND (memberid-10000000000000)/13 in (select memberid FROM mem_ WHERE phonev='1')");
		if($me['refurl']){
		}else{
			$temp=getgurl("http://".$_SERVER['HTTP_HOST']."/?refid=".(10000000000000+$id*13));
			$mt=json_decode($temp);
			$me['refurl']=$mt->id;
			share_update($pdom,"mem_","refurl='".$me['refurl']."'","memberid='".$id."'");
		}
		 ?>
		 <h2><?=$GLOBALS['mytitle']?> <?=$me['nickname']?>管理</h2>
		 <TABLE width=800 class='formtable'>
         <TR><TD colspan=2><a href='index.php?tf=<?=$mypage?>&page=<?=$GLOBALS['page']?>&ktype=<?=$GLOBALS['ktype']?>&key=<?=$GLOBALS['key']?>' class='gray-btn'>回列表</a></TD></TR>
         <TR><Th>邀請網址</Th><TD><?=$me['refurl'] ?></TD></TR>
         <TR><TH>累計介紹人數</TH><td><?php echo $allc[0]['CC'];?></td></TR>
         <TR><TH>本月介紹人數<?php echo date('Y / m');?></TH><td><?php echo $tc[0]['CC'];?></td></TR>
         <TR><TH>上月介紹人數<?php echo date('Y / m',strtotime($ld));?></TH><td><?php echo $lc[0]['CC'];?></td></TR>
         <TR><TH>會員ID</TH><td><?=$id?></td></TR>
		     <TR><TH>會員名稱</TH><td><?=$me['nickname']?></td></TR>
         <TR><TH>密碼</TH><td><?=$me['password']?></td></TR>
         <TR><TH>綁定Email</TH><TD><?=$me['email']?></td></TR>
         <TR><TH>手機聯繫Email</TH><TD><?=$me['contact_email']?></td></TR>
         <TR><TH>頭像</TH>
         <?
			$filename =$GLOBALS['imgurl'].$me['headpic'];
			if($me['headpic'] && file_exists($filename)){
				 //echo "<td class=imgwrap><img src=".$filename."?".time()." class='imghover notmove'style='width: 150px;'></td>\n"; //20190115 Pman 修正頭像顯示的大小 
				 echo "<td class=imgwrap><img src=".$filename."?".time()." class=' 'style='width: 150px;'></td>\n"; //20190328 Pman 修正頭像會消失的問題
				 
			}else{
				 echo "<td class=imgwrap></td>\n";
			}
			echo "</tr>\n";
		?>
         <TR><TH>性別</TH><TD><?=($me['gender']=="1"?"男":"女")?></td></TR>
         <TR><TH>生日</TH><TD><?=$me['birthday']?></td></TR>
         <TR><TH>累積分數</TH><TD><?=$me['score']?></td></TR>
         <TR><TH>目前分數</TH><TD><?=$me['points']?></td></TR>
         <TR><TH>註冊時間</TH><TD><?=$me['dateadd']?></td></TR>
         <TR><TH>手機號碼</TH><TD><?=$me['phonenum']?></td></TR>
         <TR><TH>手機驗證</TH><TD><?=($me['phonev']==1?"已驗證":"<a href='?tf=selectmember&job=pv&id=".$id."'>尚未(按我手動驗證)</a>")?></td></TR>
         <TR><TH>最後登入時間</TH><TD><?=$me['lastlogin']?></td></TR>
         <TR><TH>最後登入IP</TH><TD><?=$me['lastIP']?></td></TR>
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
		 $plong=16;   //show how many pages
		 ?>
		 <h2><?=$GLOBALS['mytitle']?>管理</h2>
     <p>鎖定時間不限制則為永久鎖定</p>
		 <TABLE width=880 class='formtable'>
		 <TR><Th colspan=8>管理<A href='index.php?tf=<?=$mypage?>' style='color:#444;float:right;margin-right:10px;' class='gray-btn'>回全員列表</A></Th></TR>
		 <TR><FORM action='index.php?tf=<?=$mypage?>&job=search' method='post' ><Th colspan=8  style='text-align:left;'> <span style='margin-left:20px;'>分類快搜</span><span style='margin-left:20px;'><SELECT name=ktype><option value=nickname>會員暱稱</option><option value=email>email</option><option value=phonenum>手機號碼</option><option value=memberid>會員ID</option></SELECT> </span><span style='margin-left:20px;'> <INPUT TYPE=text name=key style='width:200px' /></span><span style='margin-left:20px;'> <input type='submit' class='gray-btn' /></span></FORM></Th></TR>
		 <TR><th  width=80>刪除</th><th>會員暱稱</th><th>密碼</th><th>Email</th><th width=120>啟用</th><th width=70>更新</th><th width=140>詳細資料</th><th width=100>鎖定</th></TR><!--20190408 Pman 新增透過會員ID搜尋-->
		 <?php
		 if($GLOBALS["ktype"]){
			 if($GLOBALS["ktype"]=="phonenum" && !strrpos($GLOBALS['key'], "+")===false){
				 $GLOBALS['key']=substr_replace($GLOBALS['key'],"+886",0,1);
			 } //20190115 Pman 增加搜尋「手機號碼」的功能 
			 $totaluser=share_getcount($pdom,$mytable." WHERE ".$GLOBALS['ktype']." like '%".$GLOBALS['key']."%' OR ".$GLOBALS['ktype']." like '".$GLOBALS['key']."%' OR ".$GLOBALS['ktype']." like '%".$GLOBALS['key']."'  ");
		 }else{
			 $totaluser=share_getcount($pdom,$mytable);
		 }
		 $tpage=ceil($totaluser/$linepage);
		 echo "<tr><td colspan=8>總符合人數:".$totaluser."人 | 搜尋關鍵字：".$GLOBALS['key']."<TD></TR>";
		if($GLOBALS["job"]=="search"){
			$temp=share_gettable($pdom,$mytable."  WHERE ".$GLOBALS['ktype']." like '%".$GLOBALS['key']."%' OR ".$GLOBALS['ktype']." like '".$GLOBALS['key']."%' OR ".$GLOBALS['ktype']." like '%".$GLOBALS['key']."' order by ".$myid." limit ".($page-1)*$linepage.", ".$linepage);
		}else{
			$temp=share_gettable($pdom,$mytable." order by ".$myid." limit ".($page-1)*$linepage.", ".$linepage);
		}
		foreach($temp as $row){
			echo "<tr>\n";
			echo "<FORM action='index.php?tf=".$mypage."&job=upuser&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' method='post' >\n";
			echo "<td><a href='index.php?tf=".$mypage."&job=deluser&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' class='blue-btn delbtn'>刪除</a></td>\n";
			echo "<td><input type='text' name='nickname' value='".$row["nickname"]."'></td>\n";
			echo "<td><input type='text' name='password' value='".$row["password"]."'></td>\n";
			echo "<td><input type='text' name='email' value='".$row["email"]."'></td>\n";
			echo "<td>".($row['actcode']=="1"?"是":"否 <a href='index.php?tf=".$mypage."&job=actuser&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' class='blue-btn'>啟用</a>")."</td>\n";
			echo "<td><input type=submit class='gray-btn'></td>\n";
      echo "</form>\n";
			echo "<td><A HREF='index.php?tf=".$mypage."&job=getdetail&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' class='gray-btn'>查看".$row['nickname']."</a></td>\n";
			if($row["locker"]=="2"){
        if($row['lockertime']){
          echo "<td>".$row['lockertime']."<BR><A HREF='index.php?tf=".$mypage."&job=unlockme&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' class=' blue-btn'>解鎖</a></td>\n";
        }else{
          echo "<td>永久鎖定<BR><A HREF='index.php?tf=".$mypage."&job=unlockme&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' class=' blue-btn'>解鎖</a></td>\n";
        }

			}else{
				//echo "<td><A HREF='index.php?tf=".$mypage."&job=lockme&id=".$row[$myid]."&page=".$page."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."' class=' blue-btn lockbtn'>鎖定</a></td>\n";
        echo "<td><A data-id='".$row[$myid]."' data-page='".$page."' data-key='".$GLOBALS['key']."' data-ktype='".$GLOBALS['ktype']."' class='blue-btn lockbtn btn'>鎖定</a></td>\n";
			}
			echo "</tr>";

		 }
		echo "<tr><td colspan=8 class='pagewrap'>";
		if($page>($plong/2)){//超過20頁...顯示前面頁
			echo "<a href=index.php?tf=".$mypage."&job=".$GLOBALS["job"]."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."&page=".($page-($plong/2)-1)."><<</A>";
		}
		//for($i=(floor($page/$plong)+1);$i<=($totaluser/$linepage+1) && $i<=(floor($page/$plong)+$plong) ;$i++){
		if($page>($plong/2)){//超過一半顯示前後各半
			for($i=($page-($plong/2));$i<=$tpage && $i<=($page+($plong/2)) ;$i++){
				echo "<a href='index.php?tf=".$mypage."&job=".$GLOBALS["job"]."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."&page=".$i."' ".($i==$page?"class='on'":"").">".$i."</A>";
			}
		}else{
			for($i=1;$i<=$tpage && $i<=$page+($plong/2) ;$i++){
				echo "<a href='index.php?tf=".$mypage."&job=".$GLOBALS["job"]."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."&page=".$i."' ".($i==$page?"class='on'":"").">".$i."</A>";
			}
		}
			if($tpage > ($page+$plong/2)){
				echo "<a href=index.php?tf=".$mypage."&job=".$GLOBALS["job"]."&ktype=".$GLOBALS['ktype']."&key=".$GLOBALS['key']."&page=".($page+$plong/2+1).">>></A>";
			}
		echo "</td></tr>";
		 echo "</TABLE>";
		 $pdom=NULL;
	}
	?>
        </div>

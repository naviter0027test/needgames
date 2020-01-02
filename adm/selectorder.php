<link href="css/ui-lightness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
	<script>
	$(function() {
		$( ".dateitem" ).datepicker({ dateFormat: 'yy-mm-dd' });;
		$( ".selectsubmit" ).change(function(){
			this.form.submit();
		});
		
	});
	</script>
         <div class=maincontents id=select2>
         <style>
		 	#pagewrap span{
				display:inline-block;
				width:30px;
				font-size:15px;
				color:#000;
				text-decoration:underline;
			}
		 	.pcur{
				color:#fff !important;
				text-decoration:none!important;
			}			
		 </style>
         <?php
################################
if($job=="addfunc"){
	 addfunc();
	 getfunc();
 }elseif($job=="delfunc"){
	 delfunc();
	getfunc();
 }elseif($job=="upfunc"){
	 upfunc();
	getfunc();
 }elseif($job=="getdetail"){
	 getdetail();
 }elseif($job=="updetail"){
	 updetail();
	  getdetail();
 }elseif($job=="getexcel"){
	 getexcel();
 }else{
		getfunc();
 }
  function getdetail(){
	global $conf;
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);	
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	$row=share_getinfo($pdos,"ord_","thisid",$GLOBALS["thisid"]);
	$pro=share_getinfo($pdos,"pro_","productid",$row["productid"]);
	$cat=share_getinfo($pdos,"cat_","catid",$pro["catid"]);
	$mem=share_getinfo($pdom,"mem_","memberid",$row["memberid"]);
	echo "<style>.ord_ td{padding:5px;border:1px solid #ddd;border-collapse:collapse;background:#ddd;}.ord_ th{padding:5px;border:1px solid #ddd;border-collapse:collapse;}</style>";
	echo"<a href='index.php?tf=selectorder&p=".$GLOBALS['p']."' class='blue-btn' style='width:200px;'>回列表頁</a><BR>";
	echo " <TABLE style='width:900px;' class=formtable>";
	echo " <tr><Th colspan=2 style='background:#333;color:#fff;padding:5px 0;'>訂 單 資 訊</Th></tr>";
	echo " <tr><TD width=100>訂單編號</td><td>".$row['orderid']."</td></tr>";
	echo " <tr><TD width=100>會員編號</td><td>".$row['memberid']."</td></tr>";
	echo " <tr><TD width=100>會員暱稱</td><td>".$mem['nickname']."</td></tr>";
	echo " <tr><Th colspan=2 style='background:#666;color:#fff;padding:5px 0;' >時間</Th></tr>";
	echo " <tr><TD>下單時間</td><td>".$row['dateadd']."</td></tr>";
	echo "<tr><TD>最後更新時間</td><td>".$row['changedate']."</td></tr>";
	echo " <tr><Th colspan=2 style='background:#666;color:#fff;padding:5px 0;' >商品資料</Th></tr>";
	echo " <tr><TD>商品名稱</td><td>".$pro['productname']."</td></tr>";

        //20191231 dispoints顯示名稱調整為折扣
        //echo " <tr><TD>貨物幣額</td><td>NT.".$row['dispoints']."</td></tr>";
        echo " <tr><TD>折扣</td><td>NT.".$row['dispoints']."</td></tr>";
        echo " <tr><TD>貨物幣額</td><td>NT.".$row['price']."</td></tr>";
        $total = $row['price']-$row['dispoints'];
        echo " <tr><td>支付金額</td><td>NT.". ($total > 0 ? $total : 0)."</td></tr>";

	echo "<tr><Th colspan=2 style='background:#666;color:#fff;padding:5px 0;'>運送方式</Th></tr>";
	echo "<tr><TD>是否自取</td><td>".($row['ispick']==1?"是":"否")."</td></tr>";
	echo "<tr><Th colspan=2 style='background:#666;color:#fff;padding:5px 0;'>訂購人資料</Th></tr>";
	echo "<tr><TD>姓名</td><td>".$row['name']."</td></tr>";
	echo " <tr><TD>Email</td><td>".$row['email']."</td></tr>";
	echo " <tr><TD>電話</td><td>".$row['telephone']."</td></tr>";
	echo " <tr><TD>地址</td><td>".$row['address']."</td></tr>";
	echo " <tr><TD>備註</td><td>".nl2br($row['note'])."</td></tr>";
	echo "</TABLE></FORM>";

 }
 function delfunc(){
	global $conf;
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);	
	 if(empty($GLOBALS["thisid"])){
		 echo "系統錯誤";
    }else{
		share_del($pdos,"ord_ WHERE thisid=".$GLOBALS["thisid"]);
	 }	
 }

 function upfunc(){
	global $conf;
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);	
	 if( empty($GLOBALS["thisid"])){
		 echo "所有內容皆為必須填寫";
    }else{
		share_update($pdos,"ord_","statusid=".$GLOBALS["statusid"].",changedate=now()","thisid=".$GLOBALS["thisid"]);
	 }	 
 }
 function getfunc(){
	 global $conf;
	 echo "請注意,刪除訂單不會回復貢獻值給使用者";//20190107 Pman 將「點」==>「貢獻值」
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);
	 $status=share_gettable($pdos,"sta_");
     echo "<TABLE class=formtable width=980>\n";
	 echo "     <TR><Th colspan=9>訂單管理</Th></TR>\n";
	 echo "<TR><TD colspan=2>";
	 echo "<FORM action='index.php?tf=selectorder' method='post' >";
	 echo "<select name=xstatusid class='selectsubmit'>";
	 echo "<option value=''>選擇分類</option>";
		foreach($status as $st){
			echo "<option value='".$st['statusid']."'";
			if($st['statusid']==$GLOBALS['xstatusid']){
				echo " selected";
			}
			echo ">".$st['statusname']."</option>";
		}
	 echo "</select>";	 
	 echo "</form>";
	 echo "</TD>";
	 echo "<TD colspan=2>";
	 echo "<FORM action='index.php?tf=selectorder' method='post' >";
	 echo "<select name=xproducttype class='selectsubmit'>";
	 echo "<option value=''>選擇實體虛擬</option>";
	 echo "<option value='1'>實體</option>";
	 echo "<option value='2'>虛擬</option>";
	 echo "</select>";	 
	 echo "</form>";
	 echo "<TD colspan=5></TD></TR>";

	 echo "      <TR><th>刪除</th><th>訂單號碼</th><th>訂購者資料</th><th>商品名稱</th><th>訂單幣額</th><th>訂單時間</th><th>訂單狀況</th><th>更新</th><Th>詳細</Th></TR>\n";
	 $cct=share_getcount($pdos,"ord_");
	 $perpage=30;
	 $pcct=ceil($cct/$perpage);
	if($GLOBALS['p']){
		$page=$GLOBALS['p'];
	}else{
		$page=1;
	}
	if($GLOBALS['xstatusid']){
		$orders=share_gettable($pdos,"ord_  WHERE statusid=".$GLOBALS['xstatusid']." AND thisid>0 ORDER BY thisid DESC limit ".(($page-1)*$perpage)." ,".$perpage );
	}else if($GLOBALS['xproducttype']){
		if($GLOBALS['xproducttype']=="1"){
			$orders=share_gettable($pdos,"ord_  WHERE productid in (SELECT productid FROM pro_ WHERE vir<>'1') AND thisid>0 ORDER BY thisid DESC limit ".(($page-1)*$perpage)." ,".$perpage );
		}else{
			$orders=share_gettable($pdos,"ord_  WHERE productid in (SELECT productid FROM pro_ WHERE vir='1') AND thisid>0 ORDER BY thisid DESC limit ".(($page-1)*$perpage)." ,".$perpage );
		}
	}else{
		$orders=share_gettable($pdos,"ord_  WHERE thisid>0 ORDER BY thisid DESC limit ".(($page-1)*$perpage)." ,".$perpage );
	}
	foreach($orders as $row){
		$pro=share_getinfo($pdos,"pro_","productid",$row["productid"]);
 		echo "<tr><FORM action='index.php?tf=selectorder&job=upfunc&thisid=".$row["thisid"]."' method='post' ><td><a href=index.php?tf=selectorder&job=delfunc&thisid=".$row["thisid"]." class='blue-btn delbtn'>刪除</a></td>";
		echo "<td>".$row['orderid']."</td>";
		echo "<td>".$row['name']."</td>";
		echo "<td>".$pro['productname']."</td>";
		//echo "<td>P ".$row['dispoints']."</td>";
                echo "<td>NTD ".$row['price']."</td>";
		echo "<td>".$row['dateadd']."</td>";
		echo "<td><select name=statusid>";
		foreach($status as $st){
			echo "<option value='".$st['statusid']."'";
			if($st['statusid']==$row['statusid']){
				echo " selected";
			}
			echo ">".$st['statusname']."</option>";
		}
		echo "</select></td>";
		echo "<td><input type=submit class='gray-btn'></td></form>";
		echo "<td><a href='index.php?tf=selectorder&job=getdetail&thisid=".$row["thisid"]."&p=".$page."' class='gray-btn'>進入詳細表單</a></td></tr>";
	}
	echo "</TABLE>";
	echo "<div style='margin:10px 0;text-align:center;' id='pagewrap'>";
	for($a=1;$a<=$pcct;$a++){
		if($page==$a){
			echo "<span class='pcur'> ".$a." </span>";
		}else{
			echo "<a href='index.php?tf=selectorder&p=".$a."&xstatusid=".$GLOBALS['xstatusid']."&xproducttype=".$GLOBALS['xproducttype']."'><span>".$a."</span></a>";
		}
	}
	echo "</div>";

 }
	?>
        </div>

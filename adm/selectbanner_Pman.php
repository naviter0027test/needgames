<link href="css/ui-lightness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="js/tinymce/selectimg.js"></script>
	<script>
		tinymce.init({
			language:"zh_TW",
			content_css : "css/news.css",
			valid_children : "+body[style],+body[link]",
			theme_advanced_font_sizes: "12px,14px,15px,16px,18px,21px,24px",
			font_size_style_values : "12px,14px,15px,16px,18px,21px,24px",
			selector: "textarea",
			plugins: [
			        "advlist autolink lists link image charmap print preview anchor",
					"searchreplace visualblocks code fullscreen",
					"table contextmenu paste",
			],
		    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
		 });
	$(function() {
		$( ".dateitem" ).datepicker({ dateFormat: 'yy-mm-dd' });

		$(".fastselect").change(function(){
			document.fastform.submit();
		});
	});
	</script>
         <div class=maincontents id=setcontent>
     <?php

	 	if($GLOBALS['lanon']==1){
			echo "<div id='lanselect'><span>語言變更/選取:</span>";
			if($_SESSION['lanid']){
			   echo share_getlanlist($_SESSION['lanid']);
			}else{
			   echo share_getlanlist('');
			}
			echo "</DIV>";
		}
	################################
	####  設定
	$mytitle="廣告";
	$mypage="selectbanner";
	$mytable="ban_";
	$typetable="bannertype";
	$myid="bannerid";
	$contentwidth=760;
	$imgurl="../img/banner/banner";
	$imgs=0;
	$thumbwidth=300;
	$fileext="jpg";
	$tablelist = array();
	$treq=array("typename","X");
	$treqb=array("名稱(說明)","寬度");
	//執行
	if($GLOBALS['lanon']==1){
		if($_SESSION['lanid']){
			$pass=1;
		}else{
			$pass=0;
		}
	}else{
		$pass=1;
	}
	
	if($pass==0){
		echo "<div id='lanreq'>請先選擇語言</div>";
	}else{
		if($job=="addcontent"){
			 addcontent($mytable,$mypage);
			 getcontent($mytable,$mypage);
		}elseif($job=="delcontent"){
			 delcontent($mytable,$mypage);
			getcontent($mytable,$mypage);		 
		}elseif($job=="upcontent"){
			 upcontent($mytable,$mypage);
			getcontent($mytable,$mypage);
		}elseif($job=="getcontent"){
			getcontent($mytable,$mypage);
		}elseif($job=="changesorting"){
			if($GLOBALS['id']){
				sorting($mytable,$myid,$GLOBALS['id'],$typeid);
				getcontent($mytable,$mypage);
			}else{
				sortingtype($typetable,'typeid',$typeid);
				gettypes($mytable,$mypage);
			}
		}elseif($job=="updetail"){
			 updetail($mytable,$mypage);
		}elseif($job=="getdetail"){
			 getdetail($mytable,$mypage);
		}elseif($job=="uptype"){
			 uptype($mytable,$mypage);
			 gettypes($mytable,$mypage);
		}elseif($job=="addtype"){
			 addtype($mytable,$mypage);
			gettypes($mytable,$mypage);
		}elseif($job=="deltype"){
			 deltype($mytable,$mypage);
			gettypes($mytable,$mypage);
		}else{
			gettypes($mytable,$mypage);
		}
	}
################################
####  special function (all use)

#######################################
	function sorting($mytable,$myid,$thisid,$typeid){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);		
		$neworder="";
		$temp=share_gettable($pdod,$mytable." WHERE typeid='".$GLOBALS["typeid"]."' ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
		if($temp){
			$neworder=$temp[0]['sorting'];
		}
		if($GLOBALS["thisorting"]>$neworder){
			share_update($pdod,$mytable,"sorting=sorting+1","sorting<".$GLOBALS["thisorting"]." AND  typeid='".$GLOBALS["typeid"]."' AND sorting>=".$neworder);
		}else{
			share_update($pdod,$mytable,"sorting=sorting-1","sorting>".$GLOBALS["thisorting"]." AND  typeid='".$GLOBALS["typeid"]."' AND sorting<=".$neworder);
		}
		share_update($pdod,$mytable,"sorting=".$neworder,$myid."=".$thisid);	
		share_showerr("更新排序成功");
	}
	function sortingtype($mytable,$myid,$thisid){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);		
		$neworder="";
		if($_SESSION['lanid']){
			$temp=share_gettable($pdod,$mytable." where lanid='".$_SESSION['lanid']."' ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
		}else{
			$temp=share_gettable($pdod,$mytable." ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
		}
		if($temp){
			$neworder=$temp[0]['sorting'];
		}
		if($GLOBALS["thisorting"]>$neworder){
			if($_SESSION['lanid']){		
				share_update($pdod,$mytable,"sorting=sorting+1","sorting<".$GLOBALS["thisorting"]." AND lanid='".$_SESSION['lanid']."' AND sorting>=".$neworder);
			}else{
				share_update($pdod,$mytable,"sorting=sorting+1","sorting<".$GLOBALS["thisorting"]." AND sorting>=".$neworder);
			}
		}else{
			if($_SESSION['lanid']){	
				share_update($pdod,$mytable,"sorting=sorting-1","sorting>".$GLOBALS["thisorting"]." AND lanid='".$_SESSION['lanid']."' AND sorting<=".$neworder);
			}else{
				share_update($pdod,$mytable,"sorting=sorting-1","sorting>".$GLOBALS["thisorting"]." AND sorting<=".$neworder);
			}
		}
		share_update($pdod,$mytable,"sorting=".$neworder,$myid."=".$thisid);	
		share_showerr("更新分類排序成功");
	}
	//########## 內容標題管理相關 ##################
	function delcontent($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		share_del($pdod,$mytable." WHERE ".$GLOBALS['myid']."=".$GLOBALS["id"]);
		share_showerr("刪除資料成功");
	}
	//更新使用狀態
	function upcontent($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		global $fileext;global $imgurl;global $imgs;
		//確認圖片格
		if(is_uploaded_file($_FILES["file"]['tmp_name'])){
			$res=share_chkfiletype($_FILES["file"],$fileext);
			if($res=="NO"){
				$myerr.="[ 圖片]格式錯誤，請使用 ".$fileext." 格式,";
			}
		}
		if($myerr){
			 share_showerr("請確認下面內容：".$myerr);
		}else{
			if($GLOBALS['isopen']==1){
				$isopen=1;
			}else{
				$isopen=0;
			}
			if($GLOBALS['isnew']==1){
				$isnew=1;
			}else{
				$isnew=0;
			}			
			//新增或更新
			if($GLOBALS["id"]){
				share_update($pdod,$mytable,"url='".$GLOBALS['url']."',isopen='".$isopen."',isnew='".$isnew."',startdate='".$GLOBALS["startdate"]."',enddate='".$GLOBALS["enddate"]."'","bannerid=".$GLOBALS["id"]);
				$tempid=$GLOBALS["id"];
			}else{
				share_insert($pdod,$mytable,"typeid,url,isopen,isnew,startdate,enddate","'".$GLOBALS['typeid']."','".$GLOBALS['url']."','".$isopen."','".$isnew."','".$GLOBALS["startdate"]."','".$GLOBALS["enddate"]."'");
				$temp=share_gettable($pdod,$mytable." ORDER BY bannerid DESC limit 1 ");
				$tempid=$temp[0][$GLOBALS["myid"]];
			}
			if(is_uploaded_file($_FILES["file"]['tmp_name'])){
				$temp=share_gettable($pdod,$GLOBALS['typetable']." WHERE typeid IN (SELECT typeid FROM ".$mytable." WHERE ".$GLOBALS['myid']."='".$tempid."')");
				$imgwidth=$temp[0]['X'];
				$imgheight=$temp[0]['Y'];
				if(($_FILES["type"]=="image/jpeg") || ($_FILES["type"]=="image/pjpeg")){
					$src = imagecreatefromjpeg($_FILES['file']['tmp_name']);
					$subname="jpg";
				}else if($_FILES["type"]=="image/png"){
					$src = imagecreatefrompng($_FILES['file']['tmp_name']);
					$subname="png";
				}
				$width = imagesx($src);
				$height =imagesy($src);
				createimg($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$subname,0);		//這裡有調整寬度設定
			}
			if($GLOBALS["id"]){
				share_showerr("更新資料成功");
			}else{
				share_showerr("新增資料成功");
			}
		}
	}
	//顯示主要列表
	function getcontent($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
			if($GLOBALS['typeid']){
				if($_SESSION['lanid']){		
					$type=share_getinfo($pdod,$GLOBALS['typetable'],"typeid",$GLOBALS['typeid']."' AND lanid='".$_SESSION['lanid']);
				}else{
					$type=share_getinfo($pdod,$GLOBALS['typetable'],"typeid",$GLOBALS['typeid']);
				}
				 echo "<h2>".$GLOBALS['mytitle']." > ".$type['typename']."管理 [<a href='index.php?tf=".$mypage."'>回首頁</a>]</h2>";
				 echo "<TABLE class=formtable width=800>";
				 echo "<tr><th colspan=7>新增內容(輪播圖)</th>";
				 echo "<TR><th >圖片</th><th  style='width:150px' >連結</th><th  style='width:60px' >新視窗</th><th  style='width:60px' >使用</th><th  style='width:80px' >開始日</th><th  style='width:80px' >結束日</th><th style='width:80px'>新增</th></TR>";
				 echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$news[$GLOBALS['myid']]."&typeid=".$GLOBALS['typeid']."' method='post'  enctype='multipart/form-data'>";
				 echo "<td><div class=filewrap><input type='file' name='file' id='file' class=fileupload></div></td>\n";
				 echo "<td><input type=text name='url' ></td>";
				 echo "<td><input type=checkbox name=isnew value='1' checked></TD>";
				 echo "<td><input type=checkbox name=isopen value='1' checked></TD>";
				 echo "<td ><INPUT TYPE=text NAME=startdate class='dateitem' style='width:80px;'></td>";
				 echo "<td ><INPUT TYPE=text NAME=enddate class='dateitem' style='width:80px;'></td>";
				 echo "<td><input type=submit class='gray-btn' value='新增'></td></form>";
				 echo "</form>";
				 echo "</tr>";
				 echo "</TABLE>";
				 echo "<TABLE class=formtable width=800>";
				 echo "<TR><Th colspan=8 >".$GLOBALS['mytitle']."內容管理</Th></TR>";
				 echo "<TR><th style='width:60px'>刪除</th><th >圖片</th><th  style='width:150px' >連結</th><th  style='width:60px' >新視窗</th><th  style='width:60px' >使用</th><th  style='width:80px' >開始日</th><th  style='width:80px' >結束日</th><th style='width:80px'>更新</th></TR>";
				 $newslist=share_gettable($pdod,$mytable." WHERE typeid='".$GLOBALS['typeid']."'");	//數量		 
				 foreach($newslist as $news){
						echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$news[$GLOBALS['myid']]."&typeid=".$news['typeid']."' method='post'  enctype='multipart/form-data'>";
						echo "<td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$news[$GLOBALS['myid']]."&typeid=".$news['typeid']."'  class='blue-btn'>刪除</a></td>";
						$filename =$GLOBALS['imgurl'].$news['bannerid'].".jpg";
						if(file_exists($filename)){
							 echo "<td class=imgwrap><div class=hidinput ><div class=filewrap><input type='file' name='file' id='file' class=fileupload></div><div class=filewrap></div></div><a class='imgdiv rely'  style='display:inline-block'><img src=".$filename."?".time()." style='max-width:250px;max-height:40px;' class='imghover notmove'></a></td>\n";
						}else{
							 echo "<td><div class=filewrap><input type='file' name='file' id='file' class=fileupload></div></td>\n";
						}
						echo "<td><input type=text name='url' value='".$news['url']."'></td>";
						if($news['isnew']==1){
							echo "<td><input type=checkbox name=isnew value='1' checked></TD>";
						}else{
							echo "<td><input type=checkbox name=isnew value='1'></TD>";
						}
						if($news['isopen']==1){
							echo "<td><input type=checkbox name=isopen value='1' checked></TD>";
						}else{
							echo "<td><input type=checkbox name=isopen value='1'></TD>";
						}
						echo "<td ><INPUT TYPE=text NAME=startdate class='dateitem' value='".$news['startdate']."' style='width:80px;'></td>";
						echo "<td ><INPUT TYPE=text NAME=enddate class='dateitem' value='".$news['enddate']."' style='width:80px;'></td>";
						echo "<td><input type=submit class='gray-btn' value='更新'></td></form>";
						echo "</form>";
						echo "</tr>";
				 }
				 echo "</TABLE>";
			}else{
				share_showerr("缺乏必要資料,無法呈現頁面");
			}
	}
	 //########## 分類管理相關  ######################
	function addtype($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		global $treq; global $treqb;
		for($a=0;$a<count($treq);$a++){
			$temp=$GLOBALS[$treq[$a]];
			if(empty($temp)){
				$myerr.="[ ".$treqb[$a]." ]為必要欄位,";
			}
		}
		if($myerr){
			 share_showerr("請確認下面內容：".$myerr);
		 }else{	
		 	if($GLOBALS['Y']){
			}else{
				$GLOBALS['Y']='0';
			}
			if($GLOBALS['isopen']==1){
				$isopen=1;
			}else{
				$isopen=0;
			}
			if($_SESSION['lanid']){
				$temp=share_gettable($pdod,$GLOBALS['typetable']." WHERE lanid='".$_SESSION['lanid']."' order by sorting DESC limit 0,1");
			}else{
				$temp=share_gettable($pdod,$GLOBALS['typetable']." order by sorting DESC limit 0,1");
			}
			if(count($temp)>0){
				$mysort=$temp[0]["sorting"]+1;
			}else{
				$mysort=1;
			}		
			share_insert($pdod,$GLOBALS['typetable'],"typename,locationkey,X,Y,isopen,sorting","'".$GLOBALS["typename"]."','".$GLOBALS["locationkey"]."','".$GLOBALS["X"]."','".$GLOBALS["Y"]."','".$isopen."','".$mysort."'");
			//echo "INSERT INTO ".$GLOBALS['typetable']."(typename,X,Y,isopen,sorting) VALUES('".$GLOBALS["typename"]."','".$GLOBALS["X"]."','".$GLOBALS["Y"]."','".$isopen."','".$mysort."')";
			share_showerr("新增banner成功");
		 }
	}	 
	function deltype($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		//檢查是否有內容
		$temp=share_gettable($pdod,$mytable." WHERE typeid=".$GLOBALS["typeid"]);
		if(count($temp)>0){
			share_showerr("此banner已有內容無法刪除");		
		}else{
			share_del($pdod,$GLOBALS['typetable']." WHERE typeid=".$GLOBALS["typeid"]);
			share_showerr("刪除banner成功");
		}
	}
	function uptype($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		global $treq; global $treqb;
		for($a=0;$a<count($treq);$a++){
			$temp=$GLOBALS[$treq[$a]];
			if(empty($temp)){
				$myerr.="[ ".$treqb[$a]." ]為必要欄位,";
			}
		}
		if($myerr){
			 share_showerr("請確認下面內容：".$myerr);
		 }else{		
			if($GLOBALS['isopen']==1){
				$isopen=1;
			}else{
				$isopen=0;
			}
			share_update($pdod,$GLOBALS['typetable'],"typename='".$GLOBALS["typename"]."',locationkey='".$GLOBALS["locationkey"]."',isopen='".$isopen."',X='".$GLOBALS["X"]."',Y='".$GLOBALS["Y"]."'","typeid=".$GLOBALS["typeid"]);
			share_showerr("更新banner成功");
		 }
	}	 
	function gettypes($mytable,$mypage){
		global $conf;	
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		if($_SESSION['lanid']){
			 $typelist=share_gettable($pdod,$GLOBALS['typetable']." WHERE lanid='".$_SESSION['lanid']."' ORDER BY sorting DESC");
		}else{
			 $typelist=share_gettable($pdod,$GLOBALS['typetable']." ORDER BY sorting DESC");
		}
			 echo "<h2>".$GLOBALS['mytitle']."管理</h2>";
			 echo "<p>本功能不會自動在前台新增banner,需要與前台一起調整</p>";
			 echo "<FORM action='index.php?tf=".$mypage."&job=addtype' method='post'>";
			 echo "<TABLE class=formtable width=900>";
			 echo "<tr><th colspan=6>新增Banner</th>";
			 echo "<tr><th>Banner名稱(說明)</th><th>位置key</td><TH style='width:60px;'>寬度</TH><TH style='width:60px;'>高度</TH><th  style='width:60px;'>使用</th><th>新增</th></tr>";
			 echo "<tr><td><input type='text' name='typename'></td><td><input type='text' name='locationkey'></td><td><input type='text' name='X'></td><td><input type='text' name='Y'></td><td><input type=checkbox name=isopen value=1></td><td><input type=submit value='新增' class='gray-btn'></td></tr>";
			 echo "</TABLE>";
			 echo "</form>";
			 echo "<TABLE class=formtable width=900>";
			 echo "<tr><th colspan=9>管理Banner</th>";			
 			 echo "<tr><th  style='width:60px;'>刪除</th><Th>名稱</TH><th>位置key</td><TH  style='width:60px;'>寬度</TH><TH  style='width:60px;'>高度</TH><th  style='width:60px;'>使用</th><TH  style='width:60px;'>更新</TH><th>進入管理</th><th>排序</th></tr>";
			 $a=1;
			 foreach($typelist as $type){
					echo "<tr><FORM action='index.php?tf=".$mypage."&job=uptype&typeid=".$type['typeid']."' method='post'>";
					echo "<td><a href='index.php?tf=".$mypage."&job=deltype&typeid=".$type['typeid']."'  class='blue-btn'>刪除</a></td>";
					echo "<td><input type='text' name='typename' value='".$type['typename']."'></TD>";
					echo "<td><input type='text' name='locationkey' value='".$type['locationkey']."'></TD>";
					echo "<td><input type='text' name='X' value='".$type['X']."'></TD>";
					echo "<td><input type='text' name='Y' value='".$type['Y']."'></TD>";
					if($type['isopen']==1){
						echo "<td><input type=checkbox name=isopen value='1' checked></TD>";
					}else{
						echo "<td><input type=checkbox name=isopen value='1'></TD>";
					}
					echo "<td><input type=submit class='gray-btn' value='更新'></td></form>";
					echo "<td><A HREF='index.php?tf=".$mypage."&job=getcontent&typeid=".$type['typeid']."' class='gray-btn'>進入".$type['typename']."管理</a></td></form>";
					echo "<FORM action='index.php?tf=".$mypage."&job=changesorting&typeid=".$type['typeid']."&thisorting=".$type["sorting"]."' method='post'><td><select name=myorder class=changeselect>";
					for($b=1;$b<=count($typelist);$b++){
						if($b==$a){
							echo "<option value='".$b."' selected>".$b."</option>";
						}else{
							echo "<option value='".$b."'>".$b."</option>";		
						}
					}
					echo "</select></td></form></tr>";
					$a++;
			 }
			 echo "</TABLE>";
	}

	?>
        </div>

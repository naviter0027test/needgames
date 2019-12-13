         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mytitle="商品";
	$mypage="selectcat";
	$imgurl="../img/product/cat";
	$fileext="jpg";
	//圖
	$imgwidth=220;
	$imgheight=0;
	$imgs=0;
	$mytable="cat_";
	$myid="catid";
	$tablelist = array();
	//執行
	global $conf;
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);
	if($job=="addcontent"){
		 addcontent($mytable,$myid,$mypage);
	}elseif($job=="changesorting"){
	 	sorting($mytable,$myid,$id);
    }elseif($job=="delcontent"){
		 delcontent($mytable,$myid,$mypage);
	}elseif($job=="upcontent"){
		 upcontent($mytable,$myid,$mypage);
	}elseif($job=="delimg"){
		delimg($GLOBALS['id']);
	}
	getcontent($mytable,$myid,$mypage);
	$pdos=NULL;
################################
####  special function (all use)

#######################################
function sorting($mytable,$myid,$mypage){
	global $pdos;
	$neworder="";
	$temp=share_gettable($pdos,$mytable."  ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
	if($temp){
		$neworder=$temp[0]['sorting'];
	}
	if($GLOBALS["thisorting"]>$neworder){
		share_update($pdos,$mytable,"sorting=sorting+1"," sorting<".$GLOBALS["thisorting"]." AND sorting>=".$neworder);
	}else{
		share_update($pdos,$mytable,"sorting=sorting-1","  sorting>".$GLOBALS["thisorting"]." AND sorting<=".$neworder);
	}
	share_update($pdos,$mytable,"sorting=".$neworder,$myid."=".$GLOBALS['id']);
	share_showerr("更新排序成功");
}
 function delcontent($mytable,$myid,$mypage){
	global $pdos;
	if($t=share_gettable($pdos,"pro_ WHERE ".$myid."=".$GLOBALS["id"])){
		 share_showerr("已有繫結商品資料，要刪除本資料請先刪除/修改相關資料");
	 }else{
		 share_del($pdos,$mytable." WHERE catid=".$GLOBALS["id"]);
		 share_showerr("資料刪除成功");
	}
 }
 function delimg($myid){
   $filename=$GLOBALS['imgurl'].$myid.".jpg";
   if (file_exists($filename)) {
     unlink($filename);
	    share_showerr("圖片刪除成功");
    }else{
      share_showerr("圖片不存在");
    }
 }
function upcontent($mytable,$myid,$mypage){
	global $fileext;
	global $imgurl;
	global $imgwidth;
	global $imgheight;
	global $imgs;
	global $pdos;
    if( empty($GLOBALS["catname"]) ){
		share_showerr("請確認填寫資料");
    }else{
		  if($t=share_gettable($pdos,$mytable." WHERE catname='".$GLOBALS["catname"]."' AND ".$myid."<>".$GLOBALS["id"])){
			  share_showerr("名稱已經存在,無法更新");
		  }else{
			$hasimg=0;
			//確認圖片格式
			if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
				$res=share_chkfiletype($_FILES["file"],$fileext);
				if($res=="NO"){
					$myerr.="[ 背景圖) ]格式錯誤，請使用 ".$fileext." 格式,";
				}else{
					$hasimg=1;
				}
			}
			if($myerr){
				share_showerr($myerr);
				exit;
			}
			if($GLOBALS['isopen']==1){
				$isopen=1;
			}else{
				$isopen=0;
			}
			if($t=share_update($pdos,$mytable,"catname='".$GLOBALS["catname"]."', isopen='".$isopen."'",$myid."=".$GLOBALS["id"])){
				if($hasimg==1){
					if($fileext=="jpg"){
						$src = imagecreatefromjpeg($_FILES['file']['tmp_name']);
					}else if($fileext=="png"){
						$src = imagecreatefrompng($_FILES['file']['tmp_name']);
					}
					$width = imagesx($src);
					$height =imagesy($src);

					if($src){
						$tempid=$GLOBALS["id"];
						$filetowrite=$imgurl.$tempid.".".$fileext;//20190325 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
						move_uploaded_file($_FILES["file"]['tmp_name'], $filetowrite);//20190325 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
						//createimg($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定 //20190325 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
					}
				}
				share_showerr("資料更新成功");
			}else{
				share_showerr("資料更新失敗");
			}
    	}
	}
 }
 function addcontent($mytable,$myid,$mypage){
	global $fileext;
	global $imgurl;
	global $imgwidth;
	global $imgheight;
	global $imgs;
	global $pdos;
     if( empty($GLOBALS["catname"])){
		share_showerr("請確認填寫資料");
     }else{
		if($t=share_getinfo($pdos,$mytable,"catname",$GLOBALS["catname"])){
				share_showerr("資料已經存在,無法新增");
		}else{
			$hasimg=0;
			//確認圖片格式
			if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
				$res=share_chkfiletype($_FILES["file"],$fileext);
				if($res=="NO"){
					$myerr.="[ 背景圖) ]格式錯誤，請使用 ".$fileext." 格式,";
				}else{
					$hasimg=1;
				}
			}
			if($myerr){
				share_showerr($myerr);
				exit;
			}
			if($GLOBALS['isopen']==1){
				$isopen=1;
			}else{
				$isopen=0;
			}
			$temp=share_gettable($pdos,$mytable." order by sorting DESC limit 0,1");
			if(count($temp)>0){
				$mysort=$temp[0]["sorting"]+1;
			}else{
				$mysort=1;
			}
			if($t=share_insert($pdos,$mytable,"catname,isopen,sorting","'".$GLOBALS["catname"]."','".$isopen."','".$mysort."'")){
				if($hasimg==1){
					$tempids=share_gettable($pdos,$mytable." ORDER BY catid DESC limit 1");
					$tempid=$tempids[0]['catid'];
					if($fileext=="jpg"){
						$src = imagecreatefromjpeg($_FILES['file']['tmp_name']);
					}else if($fileext=="png"){
						$src = imagecreatefrompng($_FILES['file']['tmp_name']);
					}
					$width = imagesx($src);
					$height =imagesy($src);
					if($src){
						createimg($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定
					}
				}
				share_showerr("資料新增成功");
			}else{
				share_showerr("資料新增失敗");
			}
	    }
     }
 }

 function getcontent($mytable,$myid,$mypage){
	 global $pdos;
	 echo "<h2>".$GLOBALS['mytitle']."分類設定</h2>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id=addcontentform  enctype='multipart/form-data'>\n";
	 echo "<TR><th colspan=4>新增</th></TR>\n";
	 echo "<TR><th class=req style='width:120px'>分類名稱(建議20個英數內)</th><th class=req style='width:120px'>背景圖</th><th>使用</th><th>新增</th></TR>\n";
	 echo "<td><input type=text name=catname></TD>\n";
	 echo "<td class='imgwrap'><div class='filewrap'><input type='file' name='file'  class=fileupload ></div></td>";
	 echo "<td><input type=checkbox name=isopen value=1 checked>是</td>\n";
	 echo "<td><input type=submit value='確定新增' class='gray-btn'></td>\n";
     echo "</form></tr>";
	 echo "</TABLE>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><th colspan=6>管理</TH></TR>\n";
	 echo "<TR><th style='width:70px'>刪除</th><th class=req style='width:120px'>分類名稱(建議20個英數內)</th><th class=req style='width:120px'>背景圖</th><th>使用</th><th>更新</th><th>排序</th></TR>";
	 $rows=share_gettable($pdos,$mytable." ORDER BY sorting DESC");
	 $z=0;
     foreach($rows as $row){
		     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['catid']."' method='post'  enctype='multipart/form-data'><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['catid']."' class='blue-btn'>刪除</a></td>\n";
			 echo "<td><input type=text name=catname value='".$row['catname']."'></TD>\n";
			 $filename=$GLOBALS['imgurl'].$row['catid'].".jpg";
			if (file_exists($filename)) {
				echo "<td class='imgwrap'><div class='hidinput'><div class='filewrap'><input type='file' name='file' class=fileupload ></div><a href='index.php?tf=".$mypage."&job=delimg&id=".$row['catid']."' class='gray-btn'>刪除</a></div><img src='".$filename."?".time()."' class='imghover notmove'></td>";
			}else{
				echo "<td class='imgwrap'><div class='filewrap'><input type='file' name='file'  class=fileupload ></div></td>";
			}
			if($row['isopen']=="1"){
				echo "<td><input type=checkbox name=isopen value=1 checked>是</td>\n";
			}else{
				echo "<td><input type=checkbox name=isopen value=1>是</td>\n";
			}
			echo "<td><input type=submit value='確定修改' class='gray-btn'></td></FORM>\n";
			echo "<FORM action='index.php?tf=".$mypage."&job=changesorting&thisorting=".$row["sorting"]."&id=".$row['catid']."' method='post' ><td><select name=myorder class=changeselect>\n";
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

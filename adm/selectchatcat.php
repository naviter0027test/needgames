         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mytitle="貼圖";	
	$mypage="selectchatcat";
	$mytable="chatimgtype";
	$myid="thisid";
	$tablelist = array();
	$imgurl="../img/chat/type";
	$imgwidth=30;
	$imgheight=30;	
	$imgs=0;
	$fileext="png";
	//執行
	global $conf;
	$pdos = new PDO('mysql:host='.$conf['dbhost_c'].';dbname='.$conf['dbname_c'], $conf['dbuser_c'], $conf['dbpass_c']);
	$pdos -> exec("set names ".$conf['db_encode']);	
	if($job=="addcontent"){
		 addcontent($mytable,$myid,$mypage);
	}elseif($job=="changesorting"){
	 	sorting($mytable,$myid,$id);
    }elseif($job=="delcontent"){
		 delcontent($mytable,$myid,$mypage);
	}elseif($job=="upcontent"){
		 upcontent($mytable,$myid,$mypage);
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
	if($t=share_gettable($pdos,"chatimg WHERE typeid=".$GLOBALS["id"])){
		 share_showerr("已有繫結資料，要刪除本資料請先刪除/修改相關資料");
	 }else{
		 share_del($pdos,$mytable." WHERE thisid=".$GLOBALS["id"]);
		 share_showerr("資料刪除成功");
	}
 }
function upcontent($mytable,$myid,$mypage){
	global $pdos;
	global $imgurl;
	global $imgwidth;
	global $imgheight;
	global $imgs;
	global $fileext;
     if( empty($GLOBALS["thisname"]) ){
		 share_showerr("請確認填寫資料");
     }else{
		 $hasimg=0;
		  if($t=share_gettable($pdos,$mytable." WHERE thisname='".$GLOBALS["thisname"]."' AND ".$myid."<>".$GLOBALS["id"])){
			  share_showerr("名稱已經存在,無法更新");
		  }else{
			  if(is_uploaded_file($_FILES["file"]['tmp_name'])){
					$res=share_chkfiletype($_FILES["file"],$fileext);
					if($res=="NO"){
						$myerr.="[ 圖片]格式錯誤，請使用 ".$fileext." 格式,";
					}else{
						$hasimg=1;
					}
			  }
			  if($myerr){
				share_showerr($myerr);
			  }else{
				if($GLOBALS['isopen']==1){
					$isopen=1;
				}else{
					$isopen=0;
				}
				if($t=share_update($pdos,$mytable,"thisname='".$GLOBALS["thisname"]."', isopen='".$isopen."'",$myid."=".$GLOBALS["id"])){
					share_showerr("資料更新成功");
					if($hasimg==1){
						$tempid=$GLOBALS["id"];
						$src = imagecreatefrompng($_FILES['file']['tmp_name']);
						$width = imagesx($src);
						$height =imagesy($src);
						createimg2($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定	//20193028 Pman 變更成另一隻createimg2						
					}
				}else{
					share_showerr("資料更新失敗");
				}
			  }
          }
	}
 }
 function addcontent($mytable,$myid,$mypage){
	global $pdos;
	global $imgurl;
	global $imgwidth;
	global $imgheight;
	global $imgs;
	global $fileext;
     if( empty($GLOBALS["thisname"])){
		share_showerr("請確認填寫資料");
     }else{
		if(is_uploaded_file($_FILES["file"]['tmp_name'])){
			$res=share_chkfiletype($_FILES["file"],$fileext);
			if($res=="NO"){
				$myerr.="[ 圖片]格式錯誤，請使用 ".$fileext." 格式,";
			}
		}else{
			$myerr.="[ 圖片]為必要";
		}
		if($myerr){
			share_showerr($myerr);
		}else if($t=share_getinfo($pdos,$mytable,"thisname",$GLOBALS["thisname"])){
				share_showerr("資料已經存在,無法新增");
		}else{
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
			if($t=share_insert($pdos,$mytable,"thisname,isopen,sorting","'".$GLOBALS["thisname"]."','".$isopen."','".$mysort."'")){
				share_showerr("資料新增成功");
				$temp=share_gettable($pdos,$mytable." order by thisid DESC limit 1");
				$tempid=$temp[0]['thisid'];
				$src = imagecreatefrompng($_FILES['file']['tmp_name']);
				$width = imagesx($src);
				$height =imagesy($src);
				createimg2($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0);		//這裡有調整寬度設定	//20193028 Pman 變更成另一隻createimg2			
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
	 echo "<tr><FORM action='index.php?tf=".$mypage."&job=addcontent' method='post' id='addcontentform' enctype='multipart/form-data'>\n";
	 echo "<TR><th colspan=4>新增</th></TR>\n";
	 echo "<TR><th class=req style='width:120px'>分類名稱(內部用,20個英數內)</th><th>縮圖</th><th>使用</th><th>新增</th></TR>\n";
	 echo "<td><input type=text name=thisname></TD>\n";
	 echo "<td><div class=filewrap><input type='file' name='file' id='file' class=fileupload></div></td>\n";
	 echo "<td><input type=checkbox name=isopen value=1 checked>是</td>\n";
	 echo "<td><input type=submit value='確定新增' class='gray-btn'></td>\n";
     echo "</form></tr>";	 
	 echo "</TABLE>\n";
	 echo "<TABLE class=formtable width=800>";
	 echo "<tr><th colspan=6>管理</TH></TR>\n";
	 echo "<TR><th style='width:70px'>刪除</th><th class=req style='width:120px'>分類名稱(建議20個英數內)</th><th>圖片(png)</th><th>使用</th><th>更新</th><th>排序</th></TR>";
	 $rows=share_gettable($pdos,$mytable." ORDER BY sorting DESC");
	 $z=0;
     foreach($rows as $row){
		     echo "<tr><FORM action='index.php?tf=".$mypage."&job=upcontent&id=".$row['thisid']."' method='post'  enctype='multipart/form-data' ><td><a href='index.php?tf=".$mypage."&job=delcontent&id=".$row['thisid']."' class='blue-btn'>刪除</a></td>\n";
			 echo "<td><input type=text name=thisname value='".$row['thisname']."'></TD>\n";
			$filename =$GLOBALS['imgurl'].$row['thisid'].".png";
			if(file_exists($filename)){
				 echo "<td class=imgwrap><div class=hidinput ><div class=filewrap><input type='file' name='file' id='file' class=fileupload></div><div class=filewrap></div></div><a class='imgdiv rely'  style='display:inline-block'><img src=".$filename."?".time()." style='max-width:250px;max-height:40px;' class='imghover notmove'></a></td>\n";
			}else{
				 echo "<td><div class=filewrap><input type='file' name='file' id='file' class=fileupload></div></td>\n";
			}
			if($row['isopen']=="1"){
				echo "<td><input type=checkbox name=isopen value=1 checked>是</td>\n";
			}else{
				echo "<td><input type=checkbox name=isopen value=1>是</td>\n";
			}
			echo "<td><input type=submit value='確定修改' class='gray-btn'></td></FORM>\n";
			echo "<FORM action='index.php?tf=".$mypage."&job=changesorting&thisorting=".$row["sorting"]."&id=".$row['thisid']."' method='post' ><td><select name=myorder class=changeselect>\n";
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

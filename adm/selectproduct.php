<link rel="stylesheet" type="text/css" href="js/ui/jquery-ui.min.css" />
<link rel="stylesheet" type="text/css" href="js/ui/jquery-ui.structure.min.css" />
<link rel="stylesheet" type="text/css" href="js/ui/jquery-ui.theme.min.css" />
<script type="text/javascript" src="js/ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/product.js?v=3"></script>
<script type="text/javascript">
$(document).ready(function(){
						   var vnumber="";
	$(".virclick").click(function(){
		if($(this).is(':checked')){
			$(".vline").show();
			$(".vline2").hide();
			if($(".vshareclick").is(':checked')){
				$(".vline2").eq(0).show();
				$(".vline2").eq(1).hide();
				$(".vnumber").val(vnumber);
			}else{

				$(".vline2").eq(0).hide();
				$(".vline2").eq(1).show();
			}
		}else{
			$(".vline").hide();
		}
	});
	$(".vshareclick").click(function(){
		if($(this).is(':checked')){
			$(".vline2").eq(0).show();
			$(".vline2").eq(1).hide();
			$(".vnumber").val(vnumber);
		}else{
			vnumber=$(".vnumber").val();
			$(".vline2").eq(0).hide();
			$(".vline2").eq(1).show();
			$(".vnumber").val('');
		}
	});
});
</script>
    <div class=maincontents id=select1>
    <?php
	$mytitle="商品";
	$myid="productid";
	$mytable="pro_";
	$mypage="selectproduct";
	$imgurl="../img/product/product";
	$fileext="jpg";
	//大圖
	$imgwidth=484;
	$imgheight=272;
	$imgs=0;
	//小圖
	$simgwidth=229;
	$simgheight=129;
	$simgs=0;
	$thumbwidth=150;
	$thumbheight=290*(100/308);
	$pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
	$pdos -> exec("set names ".$conf['db_encode']);
################################
 if($job=="changesorting"){
	sorting($mytable,$myid,$mypage);
	frontselect($mytable,$myid,$mypage);
 }
 //序號相關
 else if($job=="numberform"){
	 numberform($mytable,$myid,$mypage);
 }
 else if($job=="savenumber"){
	 //echo $job;
	 savenumber($mytable,$myid,$mypage);
 }
 else if($job=="numberlist"){
	 numberlist($mytable,$myid,$mypage);
 }
 else if($job=="upproduct"){
	 addproduct($mytable,$myid,$mypage);
 }else if($job=="getproduct"){
	 getproduct($mytable,$myid,$mypage);
 }else if($job=="delproduct"){
	 delproduct($mytable,$myid,$mypage);
     frontselect($mytable,$myid,$mypage);
 }else if($job=="upopen"){
	 upopen($mytable,$myid,$mypage);
     frontselect($mytable,$myid,$mypage);
 }else{
    frontselect($mytable,$myid,$mypage);
 }
 	$pdos=NULL;
//############## function list ###############
// ##### 首頁
function sorting($mytable,$myid,$mypage){
	$neworder="";
	//找同一類型的該新順位的位置
	$temp=share_gettable($mytable." WHERE catid=".$GLOBALS['catid']."  ORDER BY sorting DESC limit ".($GLOBALS["myorder"]-1).",1");
	if($temp){
		$neworder=$temp[0]['sorting'];
	}
	if($GLOBALS["thisorting"]>$neworder){
		share_update($mytable,"sorting=sorting+1"," catid=".$GLOBALS['catid']." AND sorting<".$GLOBALS["thisorting"]." AND sorting>=".$neworder);
	}else{
		share_update($mytable,"sorting=sorting-1"," catid=".$GLOBALS['catid']." AND sorting>".$GLOBALS["thisorting"]." AND sorting<=".$neworder);
	}
	share_update($mytable,"sorting=".$neworder,$myid."=".$GLOBALS['id']);
	share_showerr("更新排序成功");
}
// #### 商品相關  ####
function upopen($mytable,$myid,$mypage){
	global $pdos;
	if($GLOBALS["isopen"]){
		$isopen=1;
	}else{
		$isopen=0;
	}
	share_update($pdos,"pro_","isopen=".$isopen,"productid=".$GLOBALS["id"]);
	share_showerr("更新商品完成");
}
 function delproduct($mytable,$myid,$mypage){
	global $pdos;
	//刪除商品
	share_del($pdos,"pro_ WHERE productid=".$GLOBALS["id"]);
	share_showerr("商品刪除完成");
 }
//新增商品
 function addproduct($mytable,$myid,$mypage){
	global $fileext;
	global $imgurl;
	global $imgwidth;
	global $imgheight;
	global $imgs;
	global $simgwidth;
	global $simgheight;
	global $simgs;
	global $thumbwidth;
	global $thumbheight;
	global $pdos;
	//檢查
	$req=array("catid","productname","dispoints","des1");

	$reqb=array("商品分類","商品名稱","銷售貢獻值","商品介紹");//20190107 Pman 將「點」==>「貢獻值」
	for($a=0;$a<count($req);$a++){
		if(empty($GLOBALS[$req[$a]])){
		   $myerr.="[ ".$reqb[$a]." ]為必要欄位<BR>";
		}
	}
	//數量
	if(empty($GLOBALS['qty']) && empty($GLOBALS['vir'])){
		$myerr.="[ 數量 ]為必要欄位<BR>";
	}
	if($myerr){
		share_showerr($myerr);
		getproduct($mytable,$myid,$mypage);
	}else{
		//確認圖片格式
		if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
			$res=share_chkfiletype($_FILES["file"],$fileext);
			if($res=="NO"){
				$myerr.="[ 說明圖片(大) ]格式錯誤，請使用 ".$fileext." 格式,";
			}
		}else{
			if($GLOBALS['id']){
			}else{
				$myerr.="[ 說明圖片(大) ]為必填項目,";
			}
		}
		if(isset($_FILES["files"]) && !empty($_FILES["files"]["type"])){
			$res=share_chkfiletype($_FILES["files"],$fileext);
			if($res=="NO"){
				$myerr.="[ 列表圖片(小) ]格式錯誤，請使用 ".$fileext." 格式,";
			}
		}else{
			if($GLOBALS['id']){
			}else{
				$myerr.="[ 列表圖片(小) ]為必填項目,";
			}
		}
		if($myerr){
			share_showerr($myerr);
			getproduct($mytable,$myid,$mypage);
		}else{
			//存入資料庫
			if($GLOBALS["isopen"]){
				$isopen=1;
			}else{
				$isopen=0;
			}
			if($GLOBALS["vir"]){
				$vir=1;
			}else{
				$vir=0;
			}
			if($GLOBALS["limit"]){
				$lim=$GLOBALS["limit"];
			}else{
				$lim=0;
			}
			if($GLOBALS["qty"]){
				$qty=$GLOBALS["qty"];
			}else{
				$qty=0;
			}
			if($GLOBALS['id']){
				$ex="修改";
				$rtn=share_update($pdos,"pro_","productname='".$GLOBALS["productname"]."',catid='".$GLOBALS["catid"]."',dispoints='".$GLOBALS["dispoints"]."',qty='".$qty."',des1='".$GLOBALS['des1']."',des2='".$GLOBALS['des2']."',isopen=".$isopen.",lim='".$lim."',vir='".$vir."',virnumber='".$GLOBALS['virnumber']."'" ,"productid=".$GLOBALS['id']);
			}else{
				$ex="新增";
				$rtn=share_insert($pdos,"pro_","productname,catid,dispoints,qty,des1,des2,isopen,lim,vir,virnumber","'".$GLOBALS["productname"]."','".$GLOBALS["catid"]."','".$GLOBALS["dispoints"]."','".$qty."','".$GLOBALS["des1"]."','".$GLOBALS['des2']."',".$isopen.",'".$lim."','".$vir."','".$GLOBALS['virnumber']."'");
			}
			//儲存圖片
			if($GLOBALS['id']){
				$tempid=$GLOBALS['id'];
			}else{
				$tempids=share_gettable($pdos,"pro_ ORDER BY productid DESC limit 1");
				$tempid=$tempids[0]['productid'];
				$GLOBALS['id']=$tempid;
			}
			if(isset($_FILES["file"]) && !empty($_FILES["file"]["type"])){
				//echo $_FILES["file"]["type"];
				if($fileext=="jpg"){
					$src = imagecreatefromjpeg($_FILES['file']['tmp_name']);
				}else if($fileext=="png"){
					$src = imagecreatefrompng($_FILES['file']['tmp_name']);
				}
				$width = imagesx($src);
				$height =imagesy($src);
				$mywidth=$imgwidth;
				if($src){
					$filetowrite=$imgurl.$tempid.".".$fileext;//20190308 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
					move_uploaded_file($_FILES['file']['tmp_name'], $filetowrite);//20190308 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
					//createimg($tempid,$imgurl,$width,$height,$mywidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$fileext,0,100);		//這裡有調整寬度設定 //20190307 Pman 品質設為100，上傳不壓縮//20190308 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
				}
			}
			if(isset($_FILES["files"]) && !empty($_FILES["files"]["type"])){
				if($fileext=="jpg"){
					$src = imagecreatefromjpeg($_FILES['files']['tmp_name']);
				}else if($fileext=="png"){
					$src = imagecreatefrompng($_FILES['files']['tmp_name']);
				}
				$width = imagesx($src);
				$height =imagesy($src);
				$mywidth=$simgwidth;
				$tempid=$tempid."_s";
				if($src){
					$filetowrite=$imgurl.$tempid.".".$fileext;//20190308 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
					move_uploaded_file($_FILES['files']['tmp_name'], $filetowrite);//20190308 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
					//createimg($tempid,$imgurl,$width,$height,$mywidth,$simgheight,$simgs,$thumbwidth,$thumbheight,$src,$fileext,0,100);		//這裡有調整寬度設定 //20190307 Pman 品質設為100，上傳不壓縮//20190308 Pman 客戶要求圖檔完全不壓縮，所以，上傳後直接改名另存
				}
			}
			if($rtn){
		 		share_showerr($ex."商品成功");
				if($vir==1 && $GLOBALS['virnumber']==""){
					getproduct($mytable,$myid,$mypage);
				}else{
					frontselect($mytable,$myid,$mypage);
				}
			}else{
					share_showerr($ex."商品失敗");
				  getproduct($mytable,$myid,$mypage);
			}
		}
	}

 }

 //上船序號表單
 function numberform($mytable,$myid,$mypage){
	echo " <h2>新增/增加 序號</h2>";
	echo "<a class='fR gray-btn' href='index.php?tf=selectproduct&job=getproduct&catid=".$GLOBALS["catid"]."&id=".$GLOBALS["id"]."'>回商品頁</a>";
	echo "上傳注意事項:上傳請使用單一欄位.資料一在A1,資料二在A2<BR>在A以外的欄位不會被記錄";
	echo "<FORM action='index.php?tf=".$mypage."&job=savenumber&id=".$GLOBALS["id"]."' method='post' enctype='multipart/form-data'>\n";
    echo "<TABLE class=formtable width=800>";
	echo "<tr><td width=150>請上傳excel</td><td class='imgwrap'><div class='filewrap'><input type='file' name='file' class=fileupload></div></td></TR>\n";
	echo "<TR><Th></Th><Th><INPUT TYPE=SUBMIT value='新增序號' class='gray-btn' ></Th></TR>";
	echo "</TABLE>";
	echo "</form>";
 }
 //上傳序號
 function savenumber($mytable,$myid,$mypage){ //20190412 Pman 不明原因，PHPExcel讀不到暫存檔，所以改寫
	 $err="";
	 $cnt=0;
	 $ctb=0;
	 global $pdos;
	 if($GLOBALS['id'] && $_FILES["file"]){
		require_once 'PHPExcel.php';
		$objPHPExcel = new PHPExcel ();
		$tmpFileName=$GLOBALS["id"]."_".microtime().".xls"; //20190412 Pman 用ID加時間，取暫存檔名
		move_uploaded_file($_FILES['file']['tmp_name'], "../img/product/".$tmpFileName); //20190412 Pman 然後把暫存檔搬到能讀取的地方
		$objPHPExcel = PHPExcel_IOFactory::load("../img/product/".$tmpFileName);
		//$objPHPExcel = PHPExcel_IOFactory::load($_FILES["file"]["tmp_name"]);
		//echo "5555";
		//echo $_FILES["file"];
		$sd = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
		//echo "22222";
		if(file_exists("../img/product/".$tmpFileName)){ //20190412 Pman 刪除暫存檔案
            unlink("../img/product/".$tmpFileName);//將檔案刪除
        }else{
            //echo"不存在"
        }

		if($sd && count($sd)>0){
			//先檢查是否有
			if($list=share_getcount($pdos,"gift_".$GLOBALS["id"])){
				foreach($sd as $s){//一個一個檢查重複
					if($temp=share_getinfo($pdos,"gift_".$GLOBALS["id"],"giftcode",$s['A'])){
						$ctb++;
					}else{
						share_insert($pdos,"gift_".$GLOBALS["id"],"giftcode","'".$s['A']."'");
						$cnt++;
					}
				}
			}else{
				$kk=share_getfree($pdos,"CREATE table gift_".$GLOBALS["id"]." (giftid int NOT NULL AUTO_INCREMENT, giftcode varchar(50),memberid int,dateupdate timestamp on update CURRENT_TIMESTAMP,PRIMARY KEY(giftid))");
				echo $kk;
				foreach($sd as $s){//一個一個匯入
					share_insert($pdos,"gift_".$GLOBALS["id"],"giftcode","'".$s['A']."'");
					$cnt++;
				}
			}
		}else{
			$err.= "無法抓取正確資訊";
		}
	 }else{
		  $err.= "請上傳正確資料";
	 }
	 if($err){
		 echo $err;
		 numberform();
	 }else{
		 echo "資料存入:".$cnt.",資料重複:".$ctb."<BR>";
		 numberlist($mytable,$myid,$mypage); //20190517 Pman 修正第一次匯入後，點列表分頁，會到出錯的問題
	 }
 }
 function numberlist($mytable,$myid,$mypage){
	global $pdos;
	global $conf;
	$perpage=30;
	$pg=$_GET["pg"]; //20190424 Pman 修正序號分頁按鈕無效的問題，這裡的pg原本一直是空值
	if($pg){
		//$pg=$GLOBALS["pg"];

	}else{
		$pg=1;
	}
	if($GLOBALS['skey']){
		$list=share_gettable($pdos,"gift_".$GLOBALS["id"]." WHERE memberid like '%".$GLOBALS['skey']."%' OR memberid in (SELECT memberid FROM ".$conf['dbname_m'].".mem_ WHERE nickname like '%".$GLOBALS['skey']."%')");
	}else{
		$list=share_gettable($pdos,"gift_".$GLOBALS["id"]." limit ".($pg-1)*$perpage.",".$perpage);
	}
	$act=share_getfree($pdos,"SELECT count(*) as CC FROM gift_".$GLOBALS["id"])[0]['CC'];
	$nsd=share_getfree($pdos,"SELECT count(*) as CC FROM gift_".$GLOBALS["id"]." WHERE memberid is null")[0]['CC'];
	$usd=share_getfree($pdos,"SELECT count(*) as CC FROM gift_".$GLOBALS["id"]." WHERE memberid is not null")[0]['CC'];
	echo " <h2>序號列表</h2>";
	echo "<a class='fR gray-btn' href='index.php?tf=selectproduct&job=getproduct&catid=".$GLOBALS["catid"]."&id=".$GLOBALS["id"]."'>回商品頁</a>";
	echo "總序號:".$act."<BR>";
	echo "已使用序號:".$usd."<BR>";
	echo "未使用序號:".$nsd."<BR>";
	echo "<div class='fR' style='width:230px;height:40px;'>";
	echo "<FORM action='index.php?tf=".$mypage."&job=numberlist&catid=".$GLOBALS["catid"]."&id=".$GLOBALS["id"]."' method='post'>\n";
	echo "<input type=text name='skey' class='fL' style='border:1px solid #ccc;width:120px;margin-right:15px;font-size:15px;line-height:30px;' placeholder='會員ID或會員名稱'> <input type='submit' class='gray-btn fL'>";
	echo "</form>";
	echo "</div>";
	echo "<div class='clr'></div>";
    echo "<TABLE class=formtable width=800>";
	echo "<TR><TD>序號</TD><TD>使用者</TD><TD>使用時間</TD></TR>";
	foreach($list as $t){
		echo "<TR><TD>".$t['giftcode']."</TD><TD>".$t['memberid']."</TD><TD>".((date('Y',strtotime($t['dateupdate']))>1970)?date('Y-m-d H:i',strtotime($t['dateupdate'])):"")."</TD></TR>";
	}
	echo "<TR><TD class='tCenter' colspan=3>";
	for($a=1;$a<=ceil($act/$perpage);$a++){
		if($a==$pg){
			echo "<a class='gray-btn'>".$a."</a> ";
		}else{
			echo "<a href='index.php?tf=".$mypage."&job=numberlist&catid=".$GLOBALS["catid"]."&id=".$GLOBALS["id"]."&pg=".$a."' class='gray-btn'>".$a."</a> ";//20190424 Pman 修正輸出連接錯誤的問題
		}
	}
	echo "</TD></TR>";
	echo "</TABLE>";
 }
// 商品詳細管理表單
 function getproduct($mytable,$myid,$mypage){
	global $imgurl;
	global $pdos;
	$lines=share_gettable($pdos,"cat_ ORDER BY sorting DESC");
	if($GLOBALS['id']){
		$line=share_getinfo($pdos,"cat_","catid",$GLOBALS["catid"]);
		$product=share_getinfo($pdos,"pro_","productid",$GLOBALS["id"]);
		echo " <h2>[ <a href=index.php?tf=".$mypage."&catid=".$line['catid'].">".$line['catname']."</a> ] >  ".$product["productname"]." 管理</h2>";
	}else{
		echo " <h2>新增".$GLOBALS["mytitle"]." 商品</h2>";
	}
    echo "<TABLE class=formtable width=800>";
	echo "<tr><th colspan=4>基本資料</th></tr>";
	echo "<FORM action='index.php?tf=".$mypage."&job=upproduct&id=".$GLOBALS["id"]."' method='post' enctype='multipart/form-data'>\n";
	echo "<tr><td width=150>商品ID</td><td colspan=3>".$product['productid']."</td></TR>\n";
	echo "<tr><td width=150>商品名稱</td><td colspan=3 style='text-align:left;'><INPUT TYPE=text NAME='productname' value='".($GLOBALS['productname']?$GLOBALS['productname']:$product['productname'])."' class='form-control' data-type='text'></td></TR>\n";
	echo "<tr><td width=150>所屬分類</td><td colspan=3 style='text-align:left;'><select name='catid' style='width:120px;'>\n";
	foreach($lines as $temp){
		echo "<option value='".$temp['catid']."' ";
		if($GLOBALS['catid']){
			if($temp['catid']==$GLOBALS['catid']){
				echo " selected";
			}
		}else{
			if($temp['catid']==$product['catid']){
				echo " selected";
			}
		}

		echo ">".$temp['catname']."</option>\n";
	}
	echo "</select></td></TR>\n";
	echo "<tr><td width=150>上架</td><td style='text-align:left;' colspan=3>";
	if($product['isopen']==1 || $GLOBALS['isopen']==1){
		 echo "<input type=checkbox name=isopen checked value=1>是";
	}else{
		 echo "<input type=checkbox name=isopen value=1>是";
	}
	echo "</td>\n";
	echo "<tr><td width=150>虛擬商品</td><td style='text-align:left;' colspan=3>";
	echo "<input class='virclick' type=checkbox name=vir ".($product['vir']==1?"checked":"")." value=1>是";
	echo "</td>\n";
	echo "<tr class='vline' ".($product['vir']==1?"":"style='display:none;'")."><td width=150>共用序號?</td><td style='text-align:left;' colspan=3>";
	echo "<input type=checkbox class='vshareclick' name=virx ".($product['virnumber']?"checked":"")." value=1>是";
	echo "</td>\n";
	echo "<tr class='vline vline2' ".($product['vir']==1?"":"style='display:none;'")." ".($product['virnumber']==""?"style='display:none;'":"")."><td width=150>共用序號碼</td><td style='text-align:left;'><INPUT TYPE=text NAME='virnumber' class='vnumber' value='".$product['virnumber']."'></td>\n";
	echo "<tr class='vline vline2' ".($product['vir']==1?"":"style='display:none;'")." ".($product['virnumber']==""?"":"style='display:none;'")."><td width=150>獨立序號</td><td style='text-align:left;'>";
	if($temp=share_gettable($pdos,"gift_".$GLOBALS["id"]) ){
		echo "<a href='index.php?tf=".$mypage."&job=numberlist&catid=".$GLOBALS["catid"]."&id=".$GLOBALS["id"]."' class='gray-btn'>查看獨立序號及使用狀況</a>";
	}
	if($product['vir']==1 && $product['vnumber']==""){
		echo " <a href='index.php?tf=".$mypage."&job=numberform&catid=".$GLOBALS["catid"]."&id=".$GLOBALS["id"]."' class='gray-btn'>上傳獨立序號碼</a>";
	}else{
		echo " 使用獨立序號前請先儲存目前設定</td>\n";
	}
	echo "<tr><td width=150>銷售貢獻值</td><td style='text-align:left;'><INPUT TYPE=text NAME='dispoints' value='".($GLOBALS['dispoints']?$GLOBALS['dispoints']:$product['dispoints'])."'></td>\n"; //20190107 Pman 將「點」==>「貢獻值」
	echo "<tr><td width=150>數量(虛擬獨立序號不需填)</td><td style='text-align:left;'><INPUT TYPE=text NAME='qty' value='".($GLOBALS['qty']?$GLOBALS['qty']:$product['qty'])."'></td>\n";
	echo "<tr><td width=150>每人限量(0=不限)</td><td style='text-align:left;'><INPUT TYPE=text NAME='limit' value='".($GLOBALS['lim']?$GLOBALS['lim']:$product['lim'])."'></td>\n";
	echo "<tr><th colspan=4>產品資訊</th></tr>\n";
	echo "<tr><th colspan=4>商品列表圖片 (".$GLOBALS['simgwidth']."X".$GLOBALS['simgheight']." jpg)</th></TR>\n";
	echo "<tr><th>列表圖片(小)</th>\n";
	$filename=$imgurl.$GLOBALS["id"]."_s.jpg";
	if (file_exists($filename)) {
		echo "<td class='imgwrap' colspan=3><div class='hidinput'><div class='filewrap'><input type='file' name='files' class=fileupload></div></div><img src='".$filename."?".time()."' class='imghover notmove'></td>";
	}else{
		echo "<td class='imgwrap' colspan=3><div class='filewrap'><input type='file' name='files'  class=fileupload></div></td>";
	}
	echo "<tr><th colspan=4>商品說明附加圖片 (".$GLOBALS['imgwidth']."X".$GLOBALS['imgheight']." jpg)</th></TR>";
	echo "<tr><th>說明圖片(大)</th>\n";
	$filename=$imgurl.$GLOBALS["id"].".jpg";
	if (file_exists($filename)) {
		echo "<td class='imgwrap' colspan=3><div class='hidinput'><div class='filewrap'><input type='file' name='file' class='fileupload'></div></div><img src='".$filename."?".time()."' class='imghover notmove'></td>";
	}else{
		echo "<td class='imgwrap' colspan=3><div class='filewrap'><input type='file' name='file' class=fileupload></div></td>";
	}
	echo "<tr><td>商品介紹</td><td colspan=3 style='text-align:left;'><textarea NAME=des1 style='width:90%;height:100px;' class='form-control' data-type='text'>".($GLOBALS['des1']?$GLOBALS['des1']:$product['des1'])."</textarea></td></TR>\n";
	echo "<tr><td>注意事項</td><td colspan=3 style='text-align:left;'><textarea NAME=des2 style='width:90%;height:100px;'>".($GLOBALS['des2']?$GLOBALS['des2']:$product['des2'])."</textarea></td></TR>\n";
	if($GLOBALS['id']){
		echo "<TR><Th></Th><Th colspan=3><INPUT TYPE=SUBMIT value='更新產品' class='gray-btn' ></Th></TR>";
	}else{
		echo "<TR><Th></Th><Th colspan=3><INPUT TYPE=SUBMIT value='新增產品' class='gray-btn' ></Th></TR>";
	}
	echo "</TABLE>";
	echo "</form>";
}
function frontselect($mytable,$myid,$mypage){
	global $pdos;
	?>
    <script>
 $(document).ready(function() {
	if($(".lineclick") && $(".lineclick").length>0){
		myid='<?=$GLOBALS['catid']?>';
		xx=0;
		if(myid){
			for(a=0;a<$(".lineclick").length;a++){
				if(myid==cleanhref($(".lineclick").eq(a).attr("href"))){
					firstid=cleanhref($(".lineclick").eq(a).attr("href"));
					xx=a;
				}
			}
		}else{
			var firstid=cleanhref($(".lineclick").eq(0).attr("href"));
		}
	   $(".cats").hide();
	   $(".linecat"+firstid).show();
	   $(".lineclick").eq(xx).html("-");
	   $(".lineclick").click(function(e){
			e.preventDefault();
			myline=cleanhref($(this).attr("href"));
			if($(this).text()=="-"){
				$(".lineclick").html("+");
				hideall();
			}else{
				$(".lineclick").html("+");
				$(this).html("-");
				showlines(myline);
			}
		});
	}
	/* ################## function start ############*/
	function hideall(){
	   $(".cats").stop().hide();
	}
	function showlines(x){
	   $(".cats").stop().hide();
	   $(".linecat"+x).stop().show();
	}
	function cleanhref(myhrefval){
			temp=myhrefval;
			if(temp.indexOf("/")>=0){
				temp=temp.substring(temp.lastIndexOf('/') + 1);
			}
			return temp;
	}
});
 </script>
    <?php
	echo "<h2>".$GLOBALS['mytitle']."管理</h2>";
	$lines=share_gettable($pdos,"cat_ order by sorting DESC");
	echo "<TABLE class=formtable width=800>";
	echo "<TR><TD><a href='index.php?tf=".$mypage."&job=getproduct' class='gray-btn' style='width:200px;'>新增商品</a></TD></TR>";
	echo "</TABLE>";
    echo "<TABLE class=formtable width=800>";
    echo "<tr><th width=80>刪除</th><th width=120>名稱</th><th width=150>圖片</th><th width=80>啟用</th><th width=80>更新</th><th width=150>進入管理</th></TR>";
	$xa=1;
	foreach($lines as $line){
        $catid=$line["catid"];
		$catname=$line["catname"];
		echo "<TR class='lines' id='line".$catid."'><th colspan=6 style='text-align:left'><span><a href='".$catid."' class='lineclick'>+</a></span>".$catname."</th></tr>";
            $a=1;
			$productlist=share_gettable($pdos,"pro_ WHERE catid=".$catid." order by sorting DESC");
			$mycc=count($productlist);
			for($a=0;$a<count($productlist);$a++){
					echo "<FORM action='index.php?tf=".$mypage."&job=upopen&id=".$productlist[$a]['productid']."&catid=".$catid."' method='post' >";
					echo "<TR class='cats linecat".$catid."' ><td><a href=index.php?tf=".$mypage."&job=delproduct&catid=".$catid."&id=".$productlist[$a]['productid']." class='blue-btn delbtn'>刪除</a></td><td><input type=text name=productname value='".$productlist[$a]["productname"]."'></td>";
					$filename=$GLOBALS['imgurl'].$productlist[$a]['productid'].".jpg";
					if (file_exists($filename)) {
						echo "<td><img src='".$filename."?".time()."' height=50 ></td>";
					}else{
						echo "<td></td>";
					}
					if($productlist[$a]['isopen']==1){
							 echo "<td><input type=checkbox name=isopen checked value=1>是</td>";
					}else{
							 echo "<td><input type=checkbox name=isopen value=1>是</td>";
					}
                    echo "<td><input type=submit value='更新' class='gray-btn'></td></form><form action=index.php?tf=".$mypage."&catid=".$catid."&job=getproduct&id=".$productlist[$a]["productid"]." method=post><td><input type=submit value='".$productlist[$a]["productname"]."管理' class='gray-btn'></a></td></form>";
		            echo "</tr>";
            }
    }
    echo  "</TABLE>";
}
	?>
        </div>

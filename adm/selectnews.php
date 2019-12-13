<link href="css/ui-lightness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/tinymce/tinymce.min.js"></script>
<script type="text/javascript" src="js/tinymce/selectimg.js"></script>
	<style>
#tinymce {
    background: #333333;
}
	</style>
	<script>
		tinymce.init({
			language:"zh_TW",
			valid_children : "+body[style],+body[link]",
			content_css : "mce_act.css",
			theme_advanced_font_sizes: "12px,14px,15px,16px,18px,21px,24px",
			font_size_style_values : "12px,14px,15px,16px,18px,21px,24px",
			selector: "textarea",
			plugins: [
			        "advlist autolink lists link image charmap print preview anchor",
					"searchreplace visualblocks code fullscreen",
					"table contextmenu paste",
					"textcolor"
			],
			extended_valid_elements : "a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],$elements",
		    toolbar: "insertfile undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
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
	################################
	####  設定
	$imgwidth=384;
	$imgheight=300;
	$imgs=1;
	$thumbwidth=192;
	$thumbheight=0;
	$imgurl="../img/upload";
	$mytitle="活動專區";
	$mypage="selectnews";
	$mytable="news";
	$myid="newsid";
	$contentwidth=680;
	$tablelist = array();
	$req=array("newscontent");
	
	$reqb=array("標題","內容","日期");
	//執行
	if($job=="updetail"){
		 updetail($mytable,$mypage);
		  getdetail($mytable,$mypage);
	}else{
		 getdetail($mytable,$mypage);
	}
################################
####  special function (all use)

#######################################
	 function updetail($mytable,$mypage){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);			 
		global $req; global $reqb;global $imgurl;
		$myerr="";
		//for($a=0;$a<count($req);$a++){
		//	$temp=$GLOBALS[$req[$a]];
		//	if(empty($temp)){
		//		$myerr.="[ ".$reqb[$a]." ]為必要欄位,";
		//	}
		//}
		if($myerr){
			 share_showerr("請確認下面內容：".$myerr);
		 }else{
			 $temp=$GLOBALS['id'];
			 if($temp){
				$tempid=$GLOBALS['id'];
				//share_update($pdod,$mytable,"newstitle='".$GLOBALS["newstitle"]."', newscontent='".$GLOBALS["newscontent"]."',newsdate='".$GLOBALS["newsdate"]."'", $GLOBALS["myid"]."=".$temp);
				share_update($pdod,$mytable,"newscontent='".$GLOBALS["newscontent"]."'", $GLOBALS["myid"]."=".$temp);
				share_showerr("更新資料成功");
			}else{
				if($tempx=share_gettable($pdod,$mytable)){
					$temp=$tempx[0]['newsid'];
					share_update($pdod,$mytable,"newscontent='".$GLOBALS["newscontent"]."'", $GLOBALS["myid"]."=".$temp);
					//share_update($pdod,$mytable,"newstitle='".$GLOBALS["newstitle"]."', newscontent='".$GLOBALS["newscontent"]."',newsdate='".$GLOBALS["newsdate"]."'", $GLOBALS["myid"]."=".$temp);
					share_showerr("更新資料成功");
				}else{
					//share_insert($pdod,$mytable,"newstitle,newscontent,newsdate","'".$GLOBALS["newstitle"]."','".$GLOBALS["newscontent"]."','".$GLOBALS["newsdate"]."'");
					share_insert($pdod,$mytable,"newscontent","'".$GLOBALS["newscontent"]."'");
					share_showerr("新增資料成功");
				}
			}
		 }
	 }
	 function getdetail($mytable,$mypage){
		global $conf;
		$pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		 global $imgurl;
		 if($listx=share_gettable($pdod,$mytable)){
			 $list=$listx[0];
		 }else{
			 $list="";
			 
		 }
		echo "<h2>".$GLOBALS['mytitle']."管理(寬度：PC版730px；但建議用%去設定)</Th></TR>"; //20190320 Pman 加上寬度提示
		echo "<TABLE class=formtable style='width:736px'>";	//20190403 Pman 調整寬度
		echo "<FORM action='index.php?tf=".$mypage."&job=updetail&id=".$GLOBALS["id"]."' method='post'  enctype='multipart/form-data'>";
		//echo "<tr><th width=150  class=req>標題</th><td width=600><INPUT TYPE=text NAME=newstitle value='".$list['newstitle']."' style='width:200px;'></td></TR>";
		//echo "<tr><th width=150  class=req>日期</th><td width=600><INPUT TYPE=text NAME=newsdate class='dateitem' value='".$list['newsdate']."' style='width:200px;'></td></TR>";
		echo "<tr><th class=req>內容</th><th></th></tr>";
		echo "<tr><td width='100%' colspan=2><textarea name='newscontent' style='width:680px;height:400px;background:#333333;'>".$list['newscontent']."</textarea></td></TR>"; //20190403 Pman 調整寬度
		echo "<tr><td></td><td><INPUT TYPE=SUBMIT class='blue-btn'></td></TR>";		
		echo  "</form>";
		echo "</table><BR><BR><BR><BR><BR>";	 
	 }
	?>
        </div>

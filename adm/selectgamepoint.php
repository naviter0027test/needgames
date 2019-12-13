	<script>
	$(document).ready(function() {
		$("#tn").keyup(function(){
			if($(this).val().length>0){
				var tempvals=Array($(this).val(),'123213');// 類別,ID
				tempitem=ajaxarr("bak_memchk",tempvals,"../ajax.php");
				tempitem.success(function(data){//回傳 data 義	
					out="";
					if(data.length>0){
						for(a=0;a<data.length;a++){
							out+=data[a]['nickname']+"("+data[a]['memberid']+")\n";
						}
						$("#xtns").val(out);
						$("#xtns").css("-ms-overflow-style","auto");
						$("#xtns").css("overflow","auto");
					}else{
						$("#xtns").val("查無資料");
					}
				});
			}
		});
	});
	</script>
         <div class=maincontents id=setcontent>
         <?php
	################################
	####  設定
	$mypage="selectgamepoint";
	$typetable="gametype";
	$mytable="gam_";
	$tablelist = array();
	//執行
	if($job=="addcontent"){
		 addcontent($mytable,$mypage);
	}elseif($job=="delcontent"){
		 delcontent($mytable,$mypage);
	}elseif($job=="upcontent"){
		 upcontent($mytable,$mypage);
	}
	getcontent($mytable,$mypage);
#######################################
 function addcontent($mytable,$mypage){
	global $conf;
//	if($GLOBALS['points'] && (int)$GLOBALS['points']>0){		//讓後台可以輸入"負值"，已達成扣點功能
	if($GLOBALS['points']){
		$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
		$pdom -> exec("set names ".$conf['db_encode']);	
		$pdod= new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
		$pdod -> exec("set names ".$conf['db_encode']);	
		$pdop = new PDO('mysql:host='.$conf['dbhost_p'].';dbname='.$conf['dbname_p'], $conf['dbuser_p'], $conf['dbpass_p']);
		$pdop -> exec("set names ".$conf['db_encode']);	
		if($GLOBALS["type"]==1){
			$mlist=share_gettable($pdom,"mem_");
		}else if($GLOBALS["type"]==2){
			$mlist=share_gettable($pdom,"mem_ WHERE game1 in (select gameid FROM gam_ WHERE typeid='".$GLOBALS["typeid"]."') OR game2 in (select gameid FROM gam_ WHERE typeid='".$GLOBALS["typeid"]."') OR game3 in (select gameid FROM gam_ WHERE typeid='".$GLOBALS["typeid"]."')");
		}else if($GLOBALS["type"]==3){
			$mlist=share_gettable($pdom,"mem_ WHERE game1='".$GLOBALS["gameid"]."' OR game2='".$GLOBALS["gameid"]."' OR game3='".$GLOBALS["gameid"]."'");
		}else if($GLOBALS["type"]==4){
			$temp=explode(",",$GLOBALS["nlist"]);
			$flag=0;
			$myerr="";
			for($a=0;$a<count($temp);$a++){
				if($t=share_getinfo($pdom,"mem_","memberid",$temp[$a])){
				}else{
					$flag=1;
					if($myerr){
						$myerr.=",".$temp[$a];
					}else{
						$myerr.=$temp[$a];
					}
				}
			}
			if($flag==1){
				$myerr="錯誤,以下ID無法找到相應會員".$myerr;
			}else{
				$mlist=[];
				for($a=0;$a<count($temp);$a++){
					$mlist[$a]['memberid']=$temp[$a];
				}
			}
		}
		if($mlist){
			foreach($mlist as $m){
				//share_insert($pdop,"poi_","memberid,orderid,points,pointname","'".$m['memberid']."','99','".(int)$GLOBALS['points']."','站主給點'");
				add_point($m['memberid'],(int)$GLOBALS['points'],'99','貢獻值配發','');
				//通知
				share_insert($pdod,"not_","memberid,fromid,typeid,thiscontent,thislink","'".$m['memberid']."','',6,'貢獻值中心給予您".$GLOBALS['points']."貢獻值',''");
			}
			 share_showerr("手動增加貢獻值完成,(共".count($mlist)."人)");//20190107 Pman 將「點」==>「貢獻值」
		}else if($myerr){
			share_showerr($myerr);
		}else{
			share_showerr("沒有符合之人選");
		}
		$pdom=null;
		$pdod=null;
		$pdop=null;
	}else{
		 share_showerr("請填寫貢獻值");//20190107 Pman 將「點」==>「貢獻值」
	}
 }

 function getcontent($mytable,$mypage){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);	
	$typelist=share_gettable($pdom,$GLOBALS['typetable']);
	echo "<h1>手動給貢獻值</h1>";//20190107 Pman 將「點」==>「貢獻值」
	echo "<TABLE class=formtable width=800 >";
	echo "<TR><TD>類別</TD><TD>選項</TD><TD>送出</TD></TR>";
	echo "<FORM action='index.php?tf=".$mypage."&job=addcontent&type=1' method='post'>"; 
	echo "<TR><td width='25%'>全員給貢獻值</td><TD  width='40%'></TD><TD width='20%'><input type=text name=points></td><TD width='15%'><input type=submit class='gray-btn'></td></TR>";//20190107 Pman 將「點」==>「貢獻值」
	echo "</FORM>";
	echo "<FORM action='index.php?tf=".$mypage."&job=addcontent&type=2' method='post'>"; 
	echo "<TR><td>按類別給貢獻值</td><TD>";//20190107 Pman 將「點」==>「貢獻值」
	echo "<SELECT NAME=typeid><OPTION value=''>請選擇</OPTION>";
	foreach($typelist as $type){
		 $ton=share_getcount($pdom,$mytable." WHERE typeid='".$type['typeid']."'");
		 echo "<option value='".$type['typeid']."'";
		 echo ">".$type['typename']."(".$ton.")</OPTION>\n";
	}
	echo "</SELECT>";
	echo "</TD><TD><input type=text name=points></td><TD><input type=submit class='gray-btn'></td></TR>";
	echo "</FORM>";	
	$gamelist=share_gettable($pdom,"gam_");
	echo "<FORM action='index.php?tf=".$mypage."&job=addcontent&type=3' method='post'>"; 
	echo "<TR><td>按標籤給貢獻值</td><TD>";//20190107 Pman 將「點」==>「貢獻值」
	echo "<select name=gameid>\n";
	foreach($gamelist as $type){
		echo "<option value='".$type['gameid']."'";
		 echo ">".$type['gamename']."</OPTION>\n";
	}
	echo "</select>";
	echo "</TD><TD><input type=text name=points></td><TD><input type=submit class='gray-btn'></td></TR>";
	echo "</FORM>";	
	echo "<FORM action='index.php?tf=".$mypage."&job=addcontent&type=4' method='post'>"; 
	echo "<TR><td style='vertical-align:top;'>ID給點(請用逗點分隔,111111,222222,333333)</td><TD style='height:100px;position:relative;'>";
	echo "<textarea id='userlistf' name='nlist' class='notmove' style='position:absolute;top:0;left:0;width:90%;height:90%;z-index:2;'></textarea>";
	//echo "<DIV id='userlists' style='position:absolute;background:#fff;top:0;left:0;width:95%;height:95%;overflow-y:scroll;z-index:1;'></DIV>";
	echo "</TD><TD><input type=text name=points></td><TD><input type=submit class='gray-btn'></td></TR>";
	echo "</FORM>";
	echo "<TR><td>ID快查</TD><TD><input type=text name=tn id='tn' placeholder='輸入關鍵字'></td><TD colspan=2><textarea id='xtns'  placeholder='對應資料顯示' style='height:100px;width:95%;'></textarea></td></TR>";
	echo "</TABLE>";
	$pdom=null;

 }
	?>
        </div>

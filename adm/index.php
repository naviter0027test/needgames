<?php
$job="";
$username="";
$password="";
$tf="";
$er="";

$lanon=0;	//語言開啟
session_start();
if(isset($_SESSION['intime'])){
}else{
	$_SESSION['intime']=date("Y/m/d H:i");
}
if (isset($_REQUEST['_SESSION'])) die("Get lost Muppet!");
if (ini_get('register_globals'))
 {
     foreach ($_SESSION as $key=>$value)
     {
         if (isset($GLOBALS[$key]))
             unset($GLOBALS[$key]);
     }
 }
require_once 'config/config.php';
require_once 'config/getformin.php';
require_once 'config/createimg.php';
require_once 'config/share.php';
require_once '../func/sendmail.php';
require_once 'cap.php';
if(isset($lanid)){
	$_SESSION['lanid']=$lanid;
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=$rootcompanyname ?>-後台管理介面</title>

<link rel="stylesheet" type="text/css" href="css/global.css" />
<link href="css/back3.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/menu.css" />
<script type="text/javascript" src="js/jquery-1.9.0.min.js"></script>
<script type="text/javascript" src="js/showlist.js"></script>
<script type="text/javascript" src="js/back.js"></script>
<script type="text/javascript" src="../js/sharenew.js"></script>
<script type="text/javascript">
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
</script>
</head>
<body>
<DIV id=wrapper>
    <div class="nav-box">
        <div class="nav-logo" style='width:120px;height:60px;padding:20px 30px;background:#fccf00;'><a href=''><img src='img/logo.png' /></a></div>
        <div class="nav-login">
                    <?php
                 if($username<>"" && $password<>""){
                     $req=test_capcode($code);
                     if($req=="PASS"){
                        $er=chkuser();
                     }else{
                        $er=$req;
                     }
                 }elseif($job=="logout"){
					 if($_SESSION['issuper']==1){
					 }else{
						// share_insert("loginlog","userid,ip,job","'".$_SESSION['uid']."','".GetIP()."','登出'");
					 }
                        unset($_SESSION['user']);
                        unset($_SESSION['rights']);
                        unset($_SESSION['uid']);
                        unset($_SESSION['issuper']);
						unset($_SESSION['thisid']);

                 }
                 if(isset($_SESSION['user'])){
                    echo '<table width="180" border="0" cellspacing="0" cellpadding="0">';
                    echo '      <tr>';
                    echo '        <td><p><font size="+1">';
					if(date("H")<6){
						echo "Good Night";
					}else if(date("H")<12){
						echo "Morning";
					}else if(date("H")<13){
						echo "Noon";
					}else if(date("H")<18){
						echo "Afternoon";
					}else {
						echo "Good Night";
					}
					echo ',</font></h2> '.$_SESSION['user'].'</p> </td>';
                    echo '      </tr>';
                    echo '      <tr>';
                    echo '        <td >開始時間:'.$_SESSION['intime'].'</td>';
                    echo '      </tr>';
                    echo '      <tr>';
                    echo '        <td >已登入:'.round(((time()-strtotime($_SESSION['intime']))/60)).'分鐘</td>';
                    echo '      </tr>';
                    echo '      <tr>';
                    echo '        <td style="padding:15px 10px 0 0;text-align:right;"><a href="?job=logout" class="blue-btn" >登出</a></td>';
                    echo '      </tr>';
                    echo '    </table>';
                 }
                    ?>
        </div>
        <div class="operate">
                <ul id="J_navlist">
                <?php
                if(isset($_SESSION['user'])){
                    getlist();
                }
                ?>
                </ul>
        </div>
    </div>
		<div class="nav-boxm shadow3">
    	<div class="nav-boxmin">
            <div style='position:relative;float:left;'><a href=''><img src='../img/logoa.png' style='height:50px;margin-top:10px; margin-left:10px'  class='fL' /></a></div>
            <div class='fR' style='position:relative;height:50px;z-index:5;'>
                <div class='fR' style='width:100px;padding:10px 0;'>
                <?php
                if(isset($_SESSION['user'])){
                	echo "<a href='?job=logout' class='blue-btn'>登出</a></td>";
                }
                ?>
                </div>
                <i class="navclick fR fa fa-bars" style='font-size:40px;color:#fff;margin:10px 20px 20px 100px;'></i>
            </div>
						<div class='clr'></div>
        </div>
        <ul class="J_navlist shadow">
        	<?
            if(isset($_SESSION['user'])){
            	getlist();
            }
        	?>
        </ul>
    </div>
    <div id='admrightwrap'>
        <div class="content">
        <!--內容-->
                <?php
                   if(!isset($_SESSION['user'])){
                      echo $er;
                      echo "<TABLE width=500>";
                      echo "<FORM action=index.php method=post>";
                      echo "<TR class='tr01'><Th colspan=2  class='tCenter b-right'>管理者登入</Th></TR>";
                      echo "<TR><TD class='tCenter b-right' width=150>帳號</TD><TD class='tCenter b-right'><INPUT TYPE=text NAME=username class='input02' /></TD></TR>";
                      echo "<TR><TD class='tCenter b-right'>密碼</TD><TD class='tCenter b-right'><INPUT TYPE=password NAME=password class='input02' /></TD></TR>";
                      echo "<TR><TD class='tCenter b-right'>驗證碼</TD><TD  class='tCenter b-right'><INPUT TYPE=text NAME=code class='input02'  style='float:left;width:150px;margin-left:15px;'/>";
                      echo get_caplist();
                      echo "</TD></TR>   ";
                      echo "<TR><TD></TD><TD class='tCenter b-right'><input type=submit class='blue-btn' value='登入' /></TD></TR>";
                      echo "</FORM>";
                      echo "</TABLE>";
                      echo "<!--login end -->";
                   }else{
                       if($tf=="" or $tf=="select0"){
                           require_once"select0.php";
                       }else{
                               if(isset($change) && $change=="en"){
                                   $_SESSION['lan']="en";
                               }else if(isset($change) && $change=="ch"){
                                   $_SESSION['lan']="ch";
                               }
                               if(isset($_SESSION['issuper'])==1){
                                    $temp=$tf.".php";
                                    include($temp);
                               }else if(isset($_SESSION['rights'])){
                                   $pos = strpos($_SESSION['rights'], $tf."-");
                                   if($pos>0){
                                        $temp=$tf.".php";
                                        include($temp);
                                   }else{
                                        echo "對不起，您沒有使用權使用這個功能";
                                   }
                               }else{
                                   echo "對不起，您的權限尚未設定，請洽管理者，謝謝";
                               }
                       }
                   }
                ?>

        <!--內容 END -->
        </div>
	</div>
</div>
</body>
</html>
<script>
$(document).ready(function() {
	var err="<?=$returnerr?>";
	if(err){
		poperr(err);
	}

});
</script>
<?php
function chkuser(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);
	 $row=share_getinfo($pdom,"admin","username",$GLOBALS["username"]);
	 if($row){
		    if(!isset($row['userid'])){
		             return "對不起，我們系統裡沒有這個(".$GLOBALS["username"].")使用者<BR><BR>";
			}else  if($row["isopen"]!=1){
				     return "對不起，帳號尚未啟用<BR><BR>";
			}else{
                if($row["password"]==$GLOBALS["password"]){

	   			    $_SESSION['user']=$GLOBALS["username"];
				    $_SESSION['uid']=$row["userid"];
				    $_SESSION['issuper']=$row["issuper"];
					if($row["thisid"]){
						$_SESSION['thisid']=$row["thisid"];
					}
					$temp="";
					if($_SESSION['issuper']==1){
						$rowb=share_gettable($pdom,"funclist");
					}else{
						//share_insert($pdom,"loginlog","userid,ip,job","'".$_SESSION['uid']."','".GetIP()."','登入'");
						$rowb=share_gettable($pdom,"funclist WHERE funcid in (SELECT funcid FROM funcrights WHERE userid=".$row['userid'].")");
					}
					foreach($rowb as $ttp){
					    $temp.="-".$ttp['funclink']."-";
					}
				    $_SESSION['rights']=$temp;
			    }else{
				     return "對不起，密碼錯誤<BR><BR>";
			    }
			}
     }else{
		return "對不起，我們系統裡沒有這個使用者<BR><BR>";
	 }
	 $pdom=null;
}
//功能列表
function getlist(){
	global $conf;
	$pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
	$pdom -> exec("set names ".$conf['db_encode']);
	 $row=share_gettable($pdom,"funcgroup order by sorting DESC");
	 foreach($row as $ttp){
	  	$tempa="";
		$tempb=0;
		$getc="";

		if($_SESSION['issuper']==1){
			$rowb=share_gettable($pdom,"funclist WHERE groupid=".$ttp['groupid']);
		}else{
			$rowb=share_gettable($pdom,"funclist WHERE groupid=".$ttp['groupid']." AND funcid in (SELECT funcid FROM funcrights WHERE userid=".$_SESSION['uid'].")");
		}
		foreach($rowb as $ttpb){
			$tempb=1;
	   		if($ttpb['funclink']==$GLOBALS['tf']){
				  $getc="OK";
		  		  $tempa.="<div class='am01 am01-select'><p><a href=index.php?tf=".$ttpb['funclink']."&pg=".$ttpb['funcval']." class=opencontent>".share_tranmice($ttpb['funcname'])."</a></p></div>";
			}else{
		  		  $tempa.="<div class='am01'><p><a href=index.php?tf=".$ttpb['funclink']."&pg=".$ttpb['funcval']." class=opencontent>".share_tranmice($ttpb['funcname'])."</a></p></div>";
			}
		}
	    if($getc=="OK"){
			$tempa='            <div class="list-item none">'.$tempa;
		}else{
		   $tempa='            <div class="list-item none"  style="display:none;">'.$tempa;
		}
		if($tempb==1){
	        echo '<li >';
	        echo '    <div class="nav menuheader">'.share_tranmice($ttp['groupname']).'</div>';
		  	echo $tempa;
		  	echo "</div>";
			echo "</li> ";
		}
    }
	$pdom=null;
}
 ?>

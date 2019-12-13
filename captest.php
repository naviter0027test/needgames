<?php	
	session_start();
for($a=0;$a<100;$a++){
get_caplist();
}
//echo make_caplist();

	function get_caplist(){
		 $out="<DIV>";
		 $out.=" <div style='width:100px;background:url(capw/bg".rand(0,5).".jpg)'>";
		 $out.=make_caplist();
		 $out.="</div>";
		// return $out;
		// echo json_encode($out);
		$out.="-".$_SESSION['code']."</div>";
		echo $out;
	}	 

	function test_capcode($val){
		$x="";
		 if($_SESSION['try']){
			 $_SESSION['try']++;
		 }else{
			$_SESSION['try']=1;
		 }
		if( $_SESSION['try']>5){
			$x[0]="ERR";
			$x[1]="嘗試次數太多，請關閉瀏覽器後重新開啟後再試";
		}else if($val[1]==$_SESSION['code']){
			$_SESSION['try']=0;
			$x[0]="PASS";
		}else{
			$_SESSION['try']++;
			$x[0]="ERR";
			$x[1]="對不起，驗證碼錯誤";
			$x[2]=make_caplist();
	        //return "對不起，驗證碼錯誤";		
		}
		echo json_encode($x);
	} 
	function make_caplist(){
		$code=rand(123456, 999999);
		$carr[0]=array(0,3,6,9,12,15,99,133,85,73,57);
		$carr[1]=array(13,16,19,22,25,28,233,157,422,812,611);
		$carr[2]=array(26,29,32,35,38,41,511,879,376,166,899);
		$carr[3]=array(39,42,45,48,51,54,214,280,578,419,270);
		$carr[4]=array(52,55,58,61,64,67,716,639,368,254,901);
		$carr[5]=array(65,68,71,74,77,80,534,726,843,298,345);
		$carr[6]=array(78,81,84,87,90,93,289,513,435,894,276);
		$carr[7]=array(91,94,97,100,103,106,167,198,237,312,634);
		$carr[8]=array(104,107,110,113,116,119,423,635,238,283,176);
		$carr[9]=array(117,120,123,126,129,132,27,53,62,595,788);
		$_SESSION['code']=$code;
		$out="";
		for($i=0;$i<strlen($code);$i++){
			$x=rand(0,10);
			$out.= "<img src=capw/".$carr[substr($code,$i,1)][$x].".png>";
		}
		return $out;		
	}
	
	
	?> 
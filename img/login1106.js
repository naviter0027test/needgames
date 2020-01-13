	//檢查第一次登入
	chk_mem= function(x) { 
		var tempvals=Array("1",x);
		tempitem=ajaxarr("mem_chkmem",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義	
			if(data[0]=="ERR"){
				popactfail(data[1]);
			}else{
				//sessionStorage.setItem("userid",data[1]['memberid']) ;
				sessionStorage.setItem("member",JSON.stringify(data[1]));
				sessionStorage.setItem("key",data[2]) ;
				popactpass();
				setTimeout(function(){
					popclose();
					popmeminfo();
				},3000);
			}
		});
	}
	//確認通過
	popactpass = function(x) { 
		var tempvals=Array("2");
		tempitem=ajaxarr("get_awa",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="您好,<BR>您的會員已經確認,請花一點時間填寫下列資訊,完成註冊<BR><BR>*完整填寫所有資料,會獲得點數"+data[0]+"點";
			popbase("註冊確認",out,'n');
		});
	}
	//確認失敗
	popactfail = function(x) { 
		out=x;
		popbase("註冊失敗",out,'y');
	}
	//註冊表格
	popregister = function(x) { 
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='regform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>帳號</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='Email'>\n";
			out+="                            <div class='formerr'>請填寫帳號(Email)</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>密碼</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='pass' placeholder='6-12位英數符號'>\n";
			out+="                            <div class='formerr'>請填寫密碼,6-12位英數符號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>確認密碼</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='passb' placeholder='6-12位英數符號'>\n";
			out+="                            <div class='formerr'>請填寫確認密碼,6-12位英數符號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>驗證碼</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="							<span class='inblock fL' style='width:48%'><input type='text' class='formfield form-control' name='code'></span>\n";
			out+="							<span class='inblock fL' style='width:48%'>"+data[0]+"</span>\n";
			out+="                            <div class='formerr'>請填寫驗證碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='regform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			popbase("會員註冊",out,'y');
		});
   }; 
	//會員填寫資料表格-需抓取所在地/遊戲
	popmeminfo = function(x) { 
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_memberform",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='popmemberform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>性別*</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select class='formfield form-control' name='gender'>\n";
			out+="								<option value=''>請選擇</option><option value='男'>男</option><option value='女'>女</option>\n";
			out+="							 </select>\n";
			out+="                            <div class='formerr'>請選擇性別</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>暱稱*</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='nick'>\n";
			out+="                            <div class='formerr'>請填寫暱稱</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>生日*</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control birthday' name='birth'>\n";
			out+="                            <div class='formerr'>請選擇生日</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>所在地*</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='location' class='formfield'>\n";
			for(var a=0;a<data[1].length;a++){
				out+="<option value='"+data[1][a]['thisid']+"'>"+data[1][a]['thisname']+"</option>";
			}
			out+="							  </select>\n";
			out+="                            <div class='formerr'>請填寫所在地</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>正在玩的遊戲</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='game1'  id='popgame1' class='formfield chosen gameadd' data-target='popgameselect2'><option value=''>請選擇遊戲</option>\n";
			for(var a=0;a<data[0].length;a++){
				out+="<option value='"+data[0][a]['gameid']+"'>"+data[0][a]['gamename']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>備註</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield' name='game1note'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline fader popgameselect2'>\n";
			out+="                        <div class='formitem formitem_3'>正在玩的遊戲(2)</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='game2' id='popgame2' class='formfield chosen gameadd popgamechk' data-target='popgameselect3'><option value=''>請選擇遊戲</option>\n";
			for(var a=0;a<data[0].length;a++){
				out+="<option value='"+data[0][a]['gameid']+"'>"+data[0][a]['gamename']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline fader  popgameselect2'>\n";
			out+="                        <div class='formitem formitem_3'>備註</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield' name='game2note'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline fader popgameselect3'>\n";
			out+="                        <div class='formitem formitem_3'>正在玩的遊戲(3)</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='game3'  id='popgame3' class='formfield chosen popgamechk'><option value=''>請選擇遊戲</option>\n";
			for(var a=0;a<data[0].length;a++){
				out+="<option value='"+data[0][a]['gameid']+"'>"+data[0][a]['gamename']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline fader popgameselect3'>\n";
			out+="                        <div class='formitem formitem_3'>備註</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield' name='game3note'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>最常玩的時段</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='gametime' class='formfield'>\n";
			for(var a=0;a<data[2].length;a++){
				out+="<option value='"+data[2][a]['thisid']+"'>"+data[2][a]['gtname']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="<input type='hidden' name='headpicid' class='formfield' id='headpicid'>";
			out+="<input type='hidden' name='frontpicid' class='formfield' id='frontpicid'>";
			out+="</form>";
			out+="<form action='' method='post' id='headpicform' enctype='multipart/form-data'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>設定大頭照</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="							  <div class='instantbox'>\n";
			out+="							  	<div class='btn border5'>請選擇</div>";
			out+="                            	<input type='file' class='formfield instantupload' name='headpic' data-job='uploadhead' data-form='headpicform' data-target='headpicid' data-type='cover' >\n";
			out+="							  </div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			out+="<form action='' method='post' id='frontpicform' enctype='multipart/form-data'>\n";			
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>設定封面</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="							  <div class='instantbox'>\n";
			out+="							  	<div class='btn border5'>請選擇</div>";
			out+="                            	<input type='file' class='formfield instantupload' name='frontpic'  data-job='uploadfront' data-form='frontpicform' data-target='frontpicid' data-type='cover'>\n";
			out+="							  </div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
		    out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='popmemberform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			popbase("填寫會員資料",out,'y');
		});
   }; 
   //登入表格
	poplogin = function(x) { 
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='loginform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>帳號</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name'>\n";
			out+="                            <div class='formerr'>請填寫帳號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>密碼</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='pass'>\n";
			out+="                            <div class='formerr'>請填寫密碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'>驗證碼</div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="							<span class='inblock fL' style='width:48%'><input type='text' class='formfield form-control' name='code'></span>\n";
			out+="							<span class='inblock fL' style='width:48%'>"+data[0]+"</span>\n";
			out+="                            <div class='formerr'>請填寫驗證碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='loginform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			popbase("會員登入",out,'y');
		});
   }; 

show_afterlogin=function(){	  
alert("A");
		  mem=JSON.parse(localStorage.getItem("member"));
alert("B");
		  out="";
		  out+="        		<div id='leftpeople'>\n";
		  out+="                	<div id='leftpeopleimg'>\n";
		  out+="                		<img src='uploadfile/"+mem['headpic']+"' />\n";
		  out+="                    </div>\n";
		  out+="                    <div id='leftpeopleinfo'>\n";
		  out+="                    	<P class='s'>賞金獵人</P>\n";
		  out+="                        <P>"+mem['nickname']+"</P>\n";
		  out+="                        <P><span>LV:29</span><span class='percent'><span class='percentin' style='width:45%'></span></span></P>\n";
		  out+="                        <P><span class='bgip'></span> "+mem['score'].toFixed(0);+"</P>\n";
		  out+="                        <div class='clr'></div> \n";
		  out+="                    </div>\n";
		  out+="                    <div class='clr'></div> \n";
		  out+="                </div>\n";
		  out+="                <div id='leftinfoselect'>\n";
		  out+="                    <div class='leftinfoselectitem leftinfoselectitemon' data-type='leftinfoselect' data-value='1'>\n";
		  out+="                    	<a href=''>\n";
		  out+="                            <DIV class='leftinfoselectitemcircle'><i class='fa fa-user'></i>\n";
		  out+="                            </DIV>\n";
		  out+="                            <DIV class='leftinfoselectitemtext'>好友</DIV>\n";
		  out+="                        </a>\n";
		  out+="                    </div>\n";
		  out+="                	<div class='leftinfoselectitem' data-type='leftinfoselect' data-value='2'>\n";
		  out+="                    	<a href=''>\n";
		  out+="							<DIV class='leftinfoselectitemcircle'><i class='fa fa-instagram'></i>\n";
		  out+="                            </DIV>\n";
		  out+="                            <DIV class='leftinfoselectitemtext'>相簿</DIV>\n";
		  out+="                        </a>\n";
		  out+="                    </div>\n";
		  out+="                	<div class='leftinfoselectitem' data-type='leftinfoselect' data-value='3'>\n";
		  out+="                    	<a href=''>\n";
		  out+="                            <DIV class='leftinfoselectitemcircle'><i class='fa fa-bookmark-o'></i>\n";
		  out+="                            </DIV>\n";
		  out+="                            <DIV class='leftinfoselectitemtext'>收藏</DIV>\n";
		  out+="                        </a>\n";
		  out+="                    </div>\n";
		  out+="                	<div class='leftinfoselectitem' data-type='leftinfoselect' data-value='4'>\n";
		  out+="                    	<a href=''>\n";
		  out+="                            <DIV class='leftinfoselectitemcircle'><i class='fa fa-file-text'></i>\n";
		  out+="                            </DIV>\n";
		  out+="                            <DIV class='leftinfoselectitemtext'>文章</DIV>\n";
		  out+="                        </a>\n";
		  out+="                    </div>\n";
		  out+="                	<div class='clr'></div> \n";
		  out+="                </div>\n";
		  $("#mainlefttopchanger").html(out);
	}
	show_beforelogin=function(){
		out="";
		out+="<div id='loginbtnwrap'>\n";
		out+="<Div class='loginclick color_word bgcolor_t'>登入</div>";
		out+="<Div class='registorclick color_w bgcolor_f'>註冊會員</div>";
		out+="</div>";
		$("#mainlefttopchanger").html(out);
	}
$(document).ready(function(){
	$("body").delegate(".gameadd","change",function(){
		$("."+$(this).data("target")).fadeIn();
	});
	$("body").delegate(".popgamechk","change",function(){
		poparr=["popgame1","popgame2","popgame3"];
		thisval=$(this).val();
		thisid=$(this).attr("id");
		for(var a=0;a<3;a++){
			if(thisid==poparr[a]){
			}else{
				if(thisval==$("#"+poparr[a]).val()){
					$(this).val('');
					alert("本遊戲已選擇");
				}
			}
		}
	});
});
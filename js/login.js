	//檢查註冊啟用狀況
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
					popmeminfo(data[1][39]); //20190603 Pman 帶入已驗證的手機號碼
				},3000);
			}
		});
	}
	//確認通過
	popactpass = function(x) {
		var tempvals=Array("2","16");
		tempitem=ajaxarr("get_awa",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="您好,<BR>您的會員已經確認,請花一點時間填寫下列資訊,完成註冊<BR><BR>*完整填寫所有資料,可以多獲得貢獻值"+data[0]+"貢獻值"; //20190107 Pman 將「點」==>「貢獻值」
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
		var out="";
		out+="                    <div>\n";
		out+="							<div class='registorclick color_w bgcolor_f' data-type='rap' style='display:inline-block'>帳密註冊</div>";
		out+="							<div class='fbclick fbbtn color_w bgcolor_f' data-type='rlink' style='display:inline-block'>FB帳號註冊</div>";
		out+="                    </div>\n";
		out+="                    <div>\n";
		//out+="為了您帳號的安全,使用FB註冊仍會需要輸入帳密資料";
		out+="                    </div>\n";

		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='regform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span>帳號</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='Email'>\n";
			out+="                            <div class='formerr'>請填寫帳號(Email)</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >密碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='password' class='formfield form-control' name='pass' placeholder='6-12位英數符號'>\n";
			out+="                            <div class='formerr'>請填寫密碼,6-12位英數符號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >確認密碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='password' class='formfield form-control' name='passb' placeholder='6-12位英數符號'>\n";
			out+="                            <div class='formerr'>請填寫確認密碼,6-12位英數符號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><input type='checkbox' class='formfield form-control' name='agree'></div>\n";
			out+="                        <div class='formitem formitem_4 formitemstext tleft'>\n";
			out+="                             <span style='color:#444;font-size:13px;line-height:17px;'>我已詳閱並同意盛事科技股份有限公司ＮＥＥＤ社群網站「<span class='agreemember'><span  id='aggrementclick'>會員規範</span>&<span  id='privacyclick'>隱私權條款</span></span>」及以上權利義務之相關條款</span>\n";
			out+="                            <div class='formerr'>請確認同意會員條款</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			//out+="                    <div class='formline'>\n";
			//out+="                        <div class='formitem formitem_4 formitems'><span >驗證碼</span></div>\n";
			//out+="                        <div class='formitem formitem_4 tleft formitems'>\n";
			//out+="							<span class='inblock fL' style='width:48%'><input type='text' class='formfield form-control' name='code'></span>\n";
			//out+="							<span class='inblock fL' style='width:48%'>"+data[0]+"</span>\n";
			//out+="                            <div class='formerr'>請填寫驗證碼</div>\n";
			//out+="                        </div>\n";
			//out+="                        <div class='clr'></div>\n";
			//out+="                    </div>\n";
			out+="					  <input type='hidden' class='formfield' name='cccc' value=''>\n";//填補驗證碼缺動
			out+="					  <input type='hidden' class='formfield' name='refid' value='"+(localStorage.getItem("refid")?localStorage.getItem("refid"):"")+"'>\n";//refid
			out+="                    <div class='formline tcenter formitem_5 '>\n";
			out+="								<input type='hidden' class='formfield' name='f1' value='"+((typeof x=="undefined")?"":x)+"'>";
			out+="								<input type='hidden' class='formfield' name='f2' value='"+((typeof y=="undefined")?"":y)+"'>";
			out+="								<input type='hidden' class='formfield' name='f3' value='"+((typeof z=="undefined")?"":z)+"'>";
			out+="								<input type='hidden' class='formfield' name='f4' value='"+((typeof b=="undefined")?"":b)+"'>";
			out+="                             <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='regform'>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4' style='line-height:50px;'>快速註冊</div>\n";
			out+="                        <div class='formitem formitem_4 formitemstext tcenter'>\n";
			out+="							<span><div class='fbclick fbbtn btn' data-type='rlink'><span>FaceBook</span> 註冊</div></span>";
			out+="							<div class='fbnote'>* 為了您的帳號安全,使用FB註冊仍會需要輸入帳密資料</div>";
			out+="                        </div>\n";
			/*
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='fbwrap'>\n";
			out+="							<span>快速註冊</span>";
			out+="							<span><div class='fbclick fbbtn btn' data-type='rlink'><span>FaceBook</span> 註冊</div></span>";
			out+="							<div class='fbnote'>* 為了您的帳號安全,使用FB註冊仍會需要輸入帳密資料</div>";
			out+="                    </div>\n";	*/
			out+="</form>";
			popbase_2("會員註冊",out,'y');
		});
   };
	//註冊表格
	popregisterap = function(x,y,z,b) {
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='regform'>\n";
			/*
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >帳號</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='Email'>\n";
			out+="                            <div class='formerr'>請填寫帳號(Email)</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >密碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='password' class='formfield form-control' name='pass' placeholder='6-12位英數符號'>\n";
			out+="                            <div class='formerr'>請填寫密碼,6-12位英數符號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >確認密碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='password' class='formfield form-control' name='passb' placeholder='6-12位英數符號'>\n";
			out+="                            <div class='formerr'>請填寫確認密碼,6-12位英數符號</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			*/
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><input type='checkbox' class='formfield form-control' name='agree'></div>\n";
			out+="                        <div class='formitem formitem_4 formitemstext tleft'>\n";
			out+="                             <span style='color:#444;font-size:13px;line-height:17px;'>我已詳閱並同意京門科技股份有限公司KYOMON社群網站「<span class='agreemember'><span  id='aggrementclick'>會員規範</span>&<span  id='privacyclick'>隱私權條款</span></span>」及以上權利義務之相關條款</span>\n";
			out+="                            <div class='formerr'>請確認同意會員條款</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="					  <input type='hidden' class='formfield' name='refid' value='"+(localStorage.getItem("refid")?localStorage.getItem("refid"):"")+"'>\n";//refid
			out+="                    <div class='formline tcenter  formitem_5'>\n";
			out+="								<input type='hidden' class='formfield' name='f1' value='"+((typeof x=="undefined")?"":x)+"'>";
			out+="								<input type='hidden' class='formfield' name='f2' value='"+((typeof y=="undefined")?"":y)+"'>";
			out+="								<input type='hidden' class='formfield' name='f3' value='"+((typeof z=="undefined")?"":z)+"'>";
			out+="								<input type='hidden' class='formfield' name='f4' value='"+((typeof b=="undefined")?"":b)+"'>";
			out+="                              <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='regform'>\n";
			out+="                    </div>\n";
			/*
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4 formitems'></div>\n";
			out+="                        <div class='formitem formitem_4 formitems tleft'>\n";
			out+="								<input type='hidden' class='formfield' name='f1' value='"+((typeof x=="undefined")?"":x)+"'>";
			out+="								<input type='hidden' class='formfield' name='f2' value='"+((typeof y=="undefined")?"":y)+"'>";
			out+="								<input type='hidden' class='formfield' name='f3' value='"+((typeof z=="undefined")?"":z)+"'>";
			out+="								<input type='hidden' class='formfield' name='f4' value='"+((typeof b=="undefined")?"":b)+"'>";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='regform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";*/
			out+="</form>";
			popbase_2("會員註冊",out,'y');
		});
   };
	//會員填寫資料表格-需抓取所在地/遊戲
	popmeminfo = function(x=0) {
		if(x==null || x=='') x=0; //20190603 Pman 避免null或undefind影響判斷
		console.log("x:"+x);
		var mem=JSON.parse(sessionStorage.getItem("member"));
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_memberform",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<div id='popshowpoints'><span id='poppoints' data-p1='"+data[3]+"' data-p2='"+data[4]+"' data-p3='"+data[5]+"'>目前已得到"+data[3]+"貢獻值</span></div>";//20190107 Pman 將「點」==>「貢獻值」
			out+="<form action='' method='post' id='popmemberform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w3'>*性別</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <select class='formfield form-control chosen' name='gender'>\n";
			out+="								<option value=''>請選擇性別</option><option value='男'>男</option><option value='女'>女</option>\n";
			out+="							 </select>\n";
			out+="                            <div class='formerr'>請選擇性別</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			if(mem && mem['email']==""){
				out+="					<p>客服中心聯絡用，請著實填寫有效Email</p>";
				out+="                    <div class='formline'>\n";
				out+="                        <div class='formitem formitem_3 tleft'><span class='w3'>*Email</span></div>\n";
				out+="                        <div class='formitem formitem_3 tleft'>\n";
				out+="                            <input type='text' class='formfield form-control' name='email' placeholder='請填寫有效Email'>\n";
				out+="                            <div class='formerr'>請填寫有效Email</div>\n";
				out+="                        </div>\n";
				out+="                        <div class='clr'></div>\n";
				out+="                    </div>\n";
			}else{
				out+="                            <input type='hidden' class='formfield' name='email' value='"+mem['email']+"' placeholder='請填寫有效Email'>\n";
			}
			out+="					<p>暱稱請謹慎填寫，送出後將無法修改 </p>";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w3'>*暱稱</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text' class='formfield form-control' name='nick' placeholder='請填寫暱稱(顯示的名稱)'>\n";
			out+="                            <div class='formerr'>請填寫暱稱,4~15個半形字</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w3'>*生日</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text' class='birthday formfield form-control' name='birth' placeholder='請填寫生日' >\n";
			out+="                            <div class='formerr'>請選擇生日</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w4'>*所在地</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <select name='location' class='formfield form-control chosen '><option value=''>請選擇所在地</option>\n";
			for(var a=0;a<data[1].length;a++){
				out+="<option value='"+data[1][a]['thisid']+"'>"+data[1][a]['thisname']+"</option>";
			}
			out+="							  </select>\n";
			out+="                            <div class='formerr'>請選擇所在地</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='submit'  name='submit' value='繼續' class='submitclick border5 showmore' data-target='regpart2'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="					<div id='regpart2'>\n";
			out+="					<p><BR>填寫 正在玩的遊戲 及 最常玩的時段 可多得 "+data[4]+"貢獻值</p>";//20190107 Pman 將「點」==>「貢獻值」//20190315 Pman 套用從DB中撈出的點數值
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w6'>*正在玩的遊戲</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <select name='game1'  id='popgame1' class='formfield chosen gameadd form-control' data-target='popgameselect2'><option value=''>請選擇遊戲</option>\n";
			for(var a=0;a<data[0].length;a++){
				out+="<option value='"+data[0][a]['gameid']+"'>"+data[0][a]['gamename']+"</option>";
			}
			out+="							  </select>\n";
			out+="                            <div class='formerr'>請選擇正在玩的遊戲</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>備註</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text' class='formfield rgnotes' name='game1note'  placeholder='字數限制：３０中文６０英文'>\n";
			out+="                            <div class='formerr'>字數限制：３０中文６０英文</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline popgameselect2'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w6'>正在玩的遊戲(2)</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <select name='game2' id='popgame2' class='formfield chosen gameadd popgamechk' data-target='popgameselect3'><option value=''>請選擇遊戲</option>\n";
			for(var a=0;a<data[0].length;a++){
				out+="<option value='"+data[0][a]['gameid']+"'>"+data[0][a]['gamename']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline fader  popgameselect2'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>備註</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text' class='formfield rgnotes' name='game2note'  placeholder='字數限制：３０中文６０英文'>\n";
			out+="                            <div class='formerr'>字數限制：３０中文６０英文</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline popgameselect3'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w6'>正在玩的遊戲(3)</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <select name='game3'  id='popgame3' class='formfield chosen popgamechk gameadd'><option value=''>請選擇遊戲</option>\n";
			for(var a=0;a<data[0].length;a++){
				out+="<option value='"+data[0][a]['gameid']+"'>"+data[0][a]['gamename']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline fader popgameselect3'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>備註</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text' class='formfield rgnotes' name='game3note' placeholder='字數限制：３０中文６０英文'>\n";
			out+="                            <div class='formerr'>字數限制：３０中文６０英文</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w6'>最常玩的時段</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <select name='gametime' class='formfield chosen gameadd' id='popgametime'><option value=''>請選擇最常玩的時段</option>\n";
			for(var a=0;a<data[2].length;a++){
				out+="<option value='"+data[2][a]['thisid']+"'>"+data[2][a]['gtname']+"</option>";
			}
			out+="							  </select>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='submit'  name='submit' value='繼續' class='submitclick border5 showmore' data-target='regpart3'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="					</div>";
			out+="<!--part2 end-->\n";
			out+="<input type='hidden' name='headpicid' class='formfield' id='headpicid'>";
			out+="<input type='hidden' name='frontpicid' class='formfield' id='frontpicid'>";
			out+="</form>";
			out+="					<div id='regpart3' style='border-top:1px;border-bottom:1px;'>\n";
			out+="					  <span style='font-size:12px;line-height:16px;color:#555;'>";
			if(x==0){ //20190603 Pman 判斷是否已經驗證過手機號碼
				out+="                            完成後可使用完整功能及額外貢獻值獎勵\n";
			}else{
				out+="                            已完成手機驗證（如要修改，請於登入後，使用「更改手機號碼」功能進行調整）\n";
			}
			out+="					  </span>";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'>手機驗證</div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			if(x==0){ //20190603 Pman 判斷是否已經驗證過手機號碼
			out+="                            <input type='text'  value='+886' style='width:50px;' class='vcont'>\n";
			}
			if(x==0){  //20190603 Pman 修正誤判斷造成disable的問題
				out+="                            <input type='text'  value='' style='width:150px;margin:0 10px;'  class='vphone' placeholder='9xxxxxxxx'>\n"; //20190603 Pman 判斷是否已經驗證過手機號碼
			}else{
				out+="                            <input type='text'  value='"+x+"' style='width:150px;margin:0 10px;'  class='vphone' placeholder='9xxxxxxxx'   disabled='disabled'>\n"; //20190603 Pman 判斷是否已經驗證過手機號碼
			}
			if(x==0){ //20190603 Pman 判斷是否已經驗證過手機號碼
			out+="                            <input type='submit'  name='submit' value='發送簡訊' class='btn border5 submitclick submitclickr ' style='display:inline-block;padding:0 5px;margin-left:0;width:26%;'  data-type='sendmes'>\n";
			}
			
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			if(x==0){ //20190603 Pman 判斷是否已經驗證過手機號碼
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'>輸入驗證碼</div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text'  value='' style='width:135px;' class='xmmsinput'>\n";
			out+="                            <input type='submit'  name='submit' value='進行驗證' style='display:inline-block;padding:0 10px;margin-left:0;margin-right:50px;width:26%;'  class='btn border5 submitclick submitclickr' data-type='vmes2'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			}
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='submit'  name='submit' value='繼續' class='submitclick border5 showmore' data-target='regpart4'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="					</div'>\n";
			out+="					<div id='regpart4'>\n";
			out+="					<p><BR>上傳下列圖片 可多得"+data[5]+"貢獻值</p>";//20190107 Pman 將「點」==>「貢獻值」//20190315 Pman 套用從DB中撈出的點數值
			out+="<form action='' method='post' id='headpicform' enctype='multipart/form-data'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w5'>設定大頭照</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="							  <div class='instantbox'>\n";
			out+="							  	<div class='btn border5'>請選擇</div>";
			out+="                            	<input type='file' accept='image/jpeg, image/png, image/jpg' class='formfield instantupload' name='headpic' data-job='uploadhead' data-form='headpicform' data-target='headpicid' data-type='cover' >\n";
			out+="							  </div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			out+="<form action='' method='post' id='frontpicform' enctype='multipart/form-data'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w4'>設定封面</span></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="							  <div class='instantbox'>\n";
			out+="							  	<div class='btn border5'>請選擇</div>";
			out+="                            	<input type='file' accept='image/jpeg, image/png, image/jpg' class='formfield instantupload' name='frontpic'  data-job='uploadfront' data-form='frontpicform' data-target='frontpicid' data-type='cover'>\n";
			out+="							  </div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
		    out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 formitems tleft'></div>\n";
			out+="                        <div class='formitem formitem_3 formitems tleft'>\n";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='popmemberform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="					</div><!--part3 end-->\n";
			popbase("填寫會員資料",out,'y');
			$(".popclose.popclosebg").removeClass("popclose popclosebg"); //20190408 Pman 填基本資料這時，將點黑色區域關閉pop的功能移除....會有人一直誤觸
			jQuery(".chosen").chosen();
			$("#regpart2").hide();
			$("#regpart3").hide();
			$("#regpart4").hide();
			$(".popgameselect2").hide();
			$(".popgameselect3").hide();
		});
   };
    //登入表格--頭
	poplogin = function(x) {
		//var tempvals=Array("1","42345344");
                var tempvals = Array();
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='loginform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span>帳號</span></div>\n";
			out+="                        <div class='formitem formitem_4  tleft'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='Email地址或電話號碼'>\n";
			out+="                            <div class='formerr'>請填寫Email或電話號碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >密碼</span></div>\n";
			out+="                        <div class='formitem formitem_4  tleft'>\n";
			out+="                            <input type='password' class='formfield form-control' name='pass'>\n";
			out+="                            <div class='formerr'>請填寫密碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
                        /*
			out+="                        <div class='formitem formitem_4 formitems'><span>驗證碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft formitems'>\n";
			out+="							<input type='text' class='formfield form-control' name='code' autocomplete='ppp'>\n"; //20190306 Pman 關掉自動完成
                        */
			out+="							<div style='margin-top:10px;'>";
			out+="							<span class='inblock fL' style='width:50%'><input type='checkbox' class='formfield' name='remember' value='y'> <span style='color:#444;'>記住我</span></span>\n";
                        /*
			out+="							<span class='inblock fL' style='width:46%'>"+data[0]+"</span>\n";
                        */
			//out+="                            <div class='formerr'>請填寫驗證碼</div>\n";
			//out+="							</div>";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4 formitems'></div>\n";
			out+="                        <div class='formitem formitem_4 formitems tleft'>\n";
			out+="                              <a href='' class='foregclick fL'><i class='fa fa-exclamation-circle'></i> 忘記密碼?請按我</a>\n";
			out+="								<input type='hidden' class='formfield' name='f1' value='"+((typeof x=="undefined")?"":x)+"'>";
			out+="								<input type='hidden' class='formfield' name='f2' value='"+((typeof y=="undefined")?"":y)+"'>";
			out+="								<input type='hidden' class='formfield' name='f3' value='"+((typeof z=="undefined")?"":z)+"'>";
			out+="								<input type='hidden' class='formfield' name='f4' value='"+((typeof b=="undefined")?"":b)+"'>";
			out+="                              <input type='submit'  name='submit' value='送出' class='submitclick border5 fR btn' data-type='loginform' style='margin-left:0;margin-right:15px;'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			/*
			out+="                    <div class='formline'>\n";
			//out+="                        <div class='formitem formitem_3'></div>\n";
			//out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <a href='' class='foregclick'><i class='fa fa-exclamation-circle'></i> 忘記密碼?請按我</a>\n";
			//out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			*/
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4 formitems' style='font-size:18px;font-weight:100;'>其他登入</div>\n";
			out+="                        <div class='formitem formitem_4 formitems tleft'>\n";
			out+="							<span><div class='fbclick fbbtn2 btn' data-type='login'><span>Facebook</span> 登入</div></span>";
			out+="							<span class='fbclick fbbtn2 btn' data-type='link'>FB原有帳號綁定</div>"
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			//out+="                    <div class='fbwrap2'>\n";
			//out+="							<span>其他登入</span>";
			//out+="							<span><div class='fbclick fbbtn2 btn' data-type='login'><span>Facebook</span> 登入</div></span>";
			//out+="							<span class='fbclick fbbtn2 btn' data-type='link'>FB原有帳號綁定</div>"
			//out+="                    </div>\n";
                        popbase_2("會員登入",out,'y');
                        /*
                        $('#loginTemplate').load('template/login.html', function(tem) {
                            popbase_2("會員登入",tem,'y');
                            setTimeout(function() {
                                $('#loginform .submitclick').on('click', function() {
                                    var name = $('#loginform [name=name]').val();
                                    var pass = $('#loginform [name=pass]').val();
                                    var ppp = Array(4, '123', name, pass);
                                    $.ajax({
                                        type:'GET',
                                        dataType: "json",
                                        url: 'ajax.php',
                                        data:{"job":'mem_login',"val":ppp,"timtess":$.now()},
                                        success: function(loginResult) {
                                            console.log('success');
                                            console.log(loginResult);
                                            if(loginResult[0] == 'OK') {
                                                sessionStorage.setItem("userid", loginResult[2]);
                                                alert('登入成功');
                                                location.reload();
                                            } else {
                                                alert('帳密輸入錯誤');
                                            }
                                        },
                                        error: function(loginErr) {
                                            console.log('error');
                                            console.log(loginErr);
                                        }
                                    });
                                    return false;
                                });
                            }, 1000);
                        });
                        */
		});
	/*
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			var out="";
			out+="                    <div>\n";
			out+="							<div class='loginclick color_w bgcolor_f' data-type='ap' style='display:inline-block'>帳密登入</div>";
			out+="							<div class='fbclick fbbtn color_w bgcolor_f' data-type='link' style='display:inline-block'>FB串聯帳號</div>";
			out+="							<div class='fbclick fbbtn color_w bgcolor_f' data-type='login' style='display:inline-block'>FB登入</div>";
			out+="                    </div>\n";
			out+="                    <div>\n";
			out+="使用帳密申請之會員，第一次使用fb登入時請選 [FB串聯帳號]";
			out+="                    </div>\n";
			popbase("會員登入",out,'y');
		});
	*/
   };
   //帳密登入表格
	poploginap = function(x,y,z,b) {
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='loginform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span>帳號</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='Email地址或電話號碼'>\n";
			out+="                            <div class='formerr'>請填寫Email地址或電話號碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4'><span >密碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft'>\n";
			out+="                            <input type='password' class='formfield form-control' name='pass'>\n";
			out+="                            <div class='formerr'>請填寫密碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4 formitems'><span>驗證碼</span></div>\n";
			out+="                        <div class='formitem formitem_4 tleft formitems'>\n";
			out+="							<input type='text' class='formfield form-control' name='code'>\n";
			out+="							<div style='margin-top:10px;'>";
			out+="							<span class='inblock fL' style='width:50%'><input type='checkbox' class='formfield' name='remember' value='y'> <span style='color:#444;'>記住我</span></span>\n";
			out+="							<span class='inblock fL' style='width:46%'>"+data[0]+"</span>\n";
			//out+="                            <div class='formerr'>請填寫驗證碼</div>\n";
			out+="							</div>";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_4 formitems tleft'></div>\n";
			out+="                        <div class='formitem formitem_4 formitems tleft'>\n";
			out+="                            	<a href='' class='foregclick fL'><i class='fa fa-exclamation-circle'></i> 忘記密碼?請按我</a>\n";
			out+="								<input type='hidden' class='formfield' name='f1' value='"+((typeof x=="undefined")?"":x)+"'>";
			out+="								<input type='hidden' class='formfield' name='f2' value='"+((typeof y=="undefined")?"":y)+"'>";
			out+="								<input type='hidden' class='formfield' name='f3' value='"+((typeof z=="undefined")?"":z)+"'>";
			out+="								<input type='hidden' class='formfield' name='f4' value='"+((typeof b=="undefined")?"":b)+"'>";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5 fR' data-type='loginform'  style='margin-left:0;margin-right:15px;>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			popbase_2("會員登入",out,'y');
		});
   };



    //忘記密碼表格
	popforget = function(x) {
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='forgetform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft w2'>帳號</div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='Email 地址'>\n";
			out+="                            <div class='formerr'>請填寫帳號(Email)</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 formitems tleft'></div>\n";
			out+="                        <div class='formitem formitem_3 tleft'>\n";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='forgetform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			popbase("忘記密碼",out,'y');
		});
   };
	show_afterloginhead=function(){
		var tempvals=Array("1");
		tempitem=ajaxarr("reget_mem",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			var out="";
			
			if((data[1]["locker"]==2)){ //20190509 Pman 修正鎖定的判定方式
				console.log("OUT!!");
				
				//==================
								curpage="wallpage";
				//要更新後台
				//var tempvals=Array('tretete86758456','');
				tempitemb=ajaxarr("mem_logoff",tempvals,"ajax.php");
				tempitemb.success(function(data){
					if(data[0]=="ERR"){
					}else{
						sessionStorage.setItem("member",'');//更新
						sessionStorage.setItem("userid",'') ;
						sessionStorage.setItem("key",'') ;
						sessionStorage.setItem("point010",'');//更新
						sessionStorage.setItem("point012",'');//更新
						sessionStorage.setItem("point014",'');//更新
						//sessionStorage.setItem("gameselect",'');//更新
						localStorage.removeItem("gameselect");
						localStorage.removeItem("re_userid");
						localStorage.removeItem("re_key");
						localStorage.removeItem("re_time");

						//showpage(1);
						location.reload();
					}
				});
				
				//=============
				
			}
			sessionStorage.setItem("member",JSON.stringify(data[1]));
			mem=data[1];
			ranks=JSON.parse(sessionStorage.getItem("ranks"));
			showrank="";
			myrank="";
			myrate="";
			myallscore=0;
			for(var a=0;a<ranks.length;a++){
				  if(parseInt(mem['score'])>=parseInt(ranks[a]['score'])){
					  showrank=ranks[a]['rankname'];
					   myrank=ranks[a]['rankid'];
					   myrate=parseInt(100*parseInt(mem['score'])/parseInt(ranks[a+1]['score']));
					   myallscore=parseInt(ranks[a+1]['score']);
				  }
			}
			  out="";
			  out+="        		<div id='leftpeople'>\n";
			  out+="                	<div id='leftpeopleimg' class='pageclick'  data-type='mypage' data-val='1'>\n";
			  if(mem['headpic']){
				  out+="                		<img src='uploadfile/"+smallpics(mem['headpic'])+"' />\n";
			  }else{
				  out+="                		<img src='img/basichead.png' />\n";
			  }
			  out+="                    </div>\n";
			  out+="                    <div id='leftpeopleinfo'>\n";
			  out+="                    	<P class='s'>"+showrank+"</P>\n";
			  out+="                        <P>"+mem['nickname']+"</P>\n";
			  out+="                        <P><span>聲望:"+myrank+"</span><span class='percent' title='"+parseInt(mem['score'])+"/"+myallscore+"'><span class='percentin' style='width:"+myrate+"%'></span></span></P>\n";
			  out+="                        <P><span class='bgipoff noclick'></span> "+parseInt(mem['points']).toFixed(0)+"</P>\n";//Pman修改
			  out+="                        <div class='clr'></div> \n";
			  out+="                    </div>\n";
			  out+="                    <div class='clr'></div> \n";
			  out+="                </div>\n";
			  out+="                <div id='leftinfoselect'>\n";
			  //out+="                    <div class='leftinfoselectitem leftinfoselectitemon topnavclick'  data-type='matchpage'>\n";
			  out+="                    <div class='leftinfoselectitem pageclick'  data-type='friendpage'>\n";
			  //out+="                    	<a href=''>\n";
			  out+="                            <DIV class='leftinfoselectitemcircle'><div class='leftinfoselectitembg'></div><div class='leftinfoselectitemin'><span class='leftinfoselectiteminspan'><i class='fa fa-user'></i></span><span class='leftinfoselectiteminspan2'><i class='fa fa-user'></i></span></div>\n";
			 // out+="                            <DIV class='leftinfoselectitemcircle'><i class='fa fa-user'></i>\n";
			  out+="                            </DIV>\n";
			  out+="                            <DIV class='leftinfoselectitemtext'>好友</DIV>\n";
			  //out+="                        </a>\n";
			  out+="                    </div>\n";
			  out+="                	<div class='leftinfoselectitem pageclick'  data-type='mypage' data-val='5'>\n";
			  //out+="                    	<a href=''>\n";
			  out+="							<DIV class='leftinfoselectitemcircle'><div class='leftinfoselectitembg'></div><div class='leftinfoselectitemin'><span class='leftinfoselectiteminspan'><i class='fa fa-instagram'></i></span><span class='leftinfoselectiteminspan2'><i class='fa fa-instagram'></i></span></div>\n";
			  out+="                            </DIV>\n";
			  out+="                            <DIV class='leftinfoselectitemtext topnavclick'>相簿</DIV>\n";
			  //out+="                        </a>\n";
			  out+="                    </div>\n";
			  out+="                	<div class='leftinfoselectitem  pageclick'  data-type='collectpage'>\n";
			 // out+="                    	<a href=''>\n";
			  out+="							<DIV class='leftinfoselectitemcircle'><div class='leftinfoselectitembg'></div><div class='leftinfoselectitemin'><span class='leftinfoselectiteminspan'><i class='fa fa-bookmark-o'></i></span><span class='leftinfoselectiteminspan2'><i class='fa fa-bookmark-o'></i></span></div>\n";
			  //out+="                            <DIV class='leftinfoselectitemcircle'><i class='fa fa-bookmark-o'></i>\n";
			  out+="                            </DIV>\n";
			  out+="                            <DIV class='leftinfoselectitemtext topnavclick'>收藏</DIV>\n";
			//  out+="                        </a>\n";
			  out+="                    </div>\n";
			  out+="                	<div class='leftinfoselectitem  pageclick'   data-type='mypage' data-val='3' >\n";
			 // out+="                    	<a href=''>\n";
			  out+="							<DIV class='leftinfoselectitemcircle'><div class='leftinfoselectitembg'></div><div class='leftinfoselectitemin'><span class='leftinfoselectiteminspan'><i class='fa fa-file-text'></i></span><span class='leftinfoselectiteminspan2'><i class='fa fa-file-text'></i></span></div>\n";
//			  out+="                            <DIV class='leftinfoselectitemcircle'><i class='fa fa-file-text'></i>\n";
			  out+="                            </DIV>\n";
			  out+="                            <DIV class='leftinfoselectitemtext topnavclick'>攻略</DIV>\n";
			  //out+="                        </a>\n";
			  out+="                    </div>\n";
			  out+="                	<div class='clr'></div> \n";
			  out+="                </div>\n";
			  $("#mainlefttopchanger").html(out);
			  //右邊按鍵
			  show_rightmenu();

		});
	}
	show_rightmenu=function(){
		mem=JSON.parse(sessionStorage.getItem("member"));
			  out="";
			 // out+="<div class='rightmenuitem submenuclick' data-val='1'>關於我們</div>";
			  out+="<div class='rightmenuitem submenuclick' data-val='2'>我的貢獻值</div>";
			  out+="<div class='rightmenuitem submenuclick' data-val='3'>會員規範</div>";
			  out+="<div class='rightmenuitem submenuclick' data-val='4'>隱私權聲明</div>";
			  out+="<div class='rightmenuitem pageclick' data-type='mypage' data-val='2' >修改個人資料</div>";//Pman修改，改連到修改頁去
			  out+="<div class='rightmenuitem submenuclick' data-val='5'>連絡我們</div>";
			  if(mem['phonev']=="1"){
				  out+="<div class='rightmenuitem submenuclick' data-val='7'>更改手機號碼</div>";
			  }else{
				  out+="<div class='rightmenuitem submenuclick' data-val='7'>手機驗證</div>";
			  }
			  out+="<div class='rightmenuitem submenuclick logoff' data-val='6'>登出</div>";

			  $("#rightmenuwrap").html(out);
	}
	//只更換頭部
	show_afterloginheadx=function(){
		var tempvals=Array("1");
		tempitem=ajaxarr("reget_mem",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			var out="";
			var Today=new Date();
			var strDate="";//20190508 Pman reget_Mem的時候，如果被設定鎖定，強制登出
			strDate=strDate+(Today.getFullYear()<10?'0':'')+Today.getFullYear()+ "-";
			strDate=strDate+((Today.getMonth()+1)<10?'0':'')+(Today.getMonth()+1) + "-"; 
			strDate=strDate+(Today.getDate()<10?'0':'')+Today.getDate();
			//console.log("lockTime:"+data[1]["lockertime"]);
			//console.log("today:"+strDate);
			if((data[1]["locker"]==2) && strDate<=data[1]["lockertime"]){
				console.log("OUT!!");
				
				//==================
				curpage="wallpage";
				//要更新後台
				//var tempvals=Array('tretete86758456','');
				tempitemb=ajaxarr("mem_logoff",tempvals,"ajax.php");
				tempitemb.success(function(data){
					if(data[0]=="ERR"){
					}else{
						sessionStorage.setItem("member",'');//更新
						sessionStorage.setItem("userid",'') ;
						sessionStorage.setItem("key",'') ;
						sessionStorage.setItem("point010",'');//更新
						sessionStorage.setItem("point012",'');//更新
						sessionStorage.setItem("point014",'');//更新
						//sessionStorage.setItem("gameselect",'');//更新
						localStorage.removeItem("gameselect");
						localStorage.removeItem("re_userid");
						localStorage.removeItem("re_key");
						localStorage.removeItem("re_time");

						//showpage(1);
						location.reload();
					}
				});
				
				//=============
				
			}
			sessionStorage.setItem("member",JSON.stringify(data[1]));
			  mem=data[1];
			  ranks=JSON.parse(sessionStorage.getItem("ranks"));
			  showrank="";
			  myrank="";
			  myrate="";
			  for(var a=0;a<ranks.length;a++){
				  if(parseInt(mem['score'])>=parseInt(ranks[a]['score'])){
					  showrank=ranks[a]['rankname'];
					   myrank=ranks[a]['rankid'];
					   myrate=parseInt(100*parseInt(mem['score'])/parseInt(ranks[a+1]['score']));
				  }
			  }

			  //20181228 Pman 如果沒有選擇感興趣的遊戲，登入後預帶「正在玩的遊戲」
				gameselect=JSON.parse(localStorage.getItem("gameselect"));
				if(gameselect && gameselect.length == 1){
					//console.log(mem['game1']);
					var tempx= new Array();
					var temp = new Object();
					temp.gameid="999999";
					temp.show="1"; //20190322 Pman 將預帶遊戲，改成先以「全部看」的方式
					tempx.push(temp);
					//console.log(temp);
					if(mem['game1'] != null){
						var temp = new Object();
						temp.gameid=mem['game1'];
						temp.show="0"; //20190322 Pman 將預帶遊戲，改成先以「全部看」的方式
						tempx.push(temp);
					}
					if(mem['game2'] != null){
						var temp = new Object();
						temp.gameid=mem['game2'];
						temp.show="0"; //20190322 Pman 將預帶遊戲，改成先以「全部看」的方式
						tempx.push(temp);
					}
					if(mem['game3'] != null){
						var temp = new Object();
						temp.gameid=mem['game3'];
						temp.show="0"; //20190322 Pman 將預帶遊戲，改成先以「全部看」的方式
						tempx.push(temp);
					}
					//console.log(tempx);
					localStorage.setItem("gameselect",JSON.stringify(tempx));//更新
					//tempx=null;
					left_gameselectmenu(); //20181228 Pman 設定好gameselect後，再重跑一感興趣的遊戲 //20190305 Pman 這段應該只要在登入時，跑一次就好了，所以移動執行位置，避免其他功能頁去刷新左側選單
				}
				//=====================================
			  

			  out="";
			  out+="                	<div id='leftpeopleimg' class='pageclick'  data-type='mypage' data-val='1'>\n";
			  if(mem['headpic']){
				  out+="                		<img src='uploadfile/"+smallpics(mem['headpic'])+"' />\n";
			  }else{
				  out+="                		<img src='img/basichead.png' />\n";
			  }
			  out+="                    </div>\n";
			  out+="                    <div id='leftpeopleinfo'>\n";
			  out+="                    	<P class='s'>"+showrank+"</P>\n";
			  out+="                        <P>"+mem['nickname']+"</P>\n";
			  out+="                        <P><span>聲望:"+myrank+"</span><span class='percent'  title='"+parseInt(mem['score'])+"/"+myallscore+"' ><span class='percentin' style='width:"+myrate+"%'></span></span></P>\n";
			  out+="                        <P><span class='bgipoff noclick'></span> "+parseInt(mem['points']).toFixed(0)+"</P>\n";
			  out+="                        <div class='clr'></div> \n";
			  out+="                    </div>\n";
			  out+="                    <div class='clr'></div> \n";
			  $("#leftpeople").html(out);
		});
	}

	show_beforeloginhead=function(){
		out="";
		out+="    <div id='leftpeople'>\n";
		out+="        <div id='leftpeopleimg'>\n";
		out+="            <img src='img/basichead.png' />\n";
		out+="        </div>\n";
		//out+="<div id='loginbtnwrap'>\n";
		out+="  	<div id='leftpeopleinfo'>\n";
		out+="			<Div class='loginclick color_word bgcolor_t'>登入</div>";
		out+="			<Div class='registorclick color_w bgcolor_f'>註冊會員</div>";
		out+="		</div>";
		out+="      <div class='clr'></div> \n";
		out+="	 </div>";
		$("#mainlefttopchanger").html(out);
		//右邊按鍵
		out="";
		out+="<div class='rightmenuitem submenuclick' data-val='5'>連絡我們</div>";
		$("#rightmenuwrap").html(out);
	}
	//ONLINE 控制
	chk_online=function(){
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
			tempitem=ajaxarr("chk_online",tempvals,"ajax.php");
			tempitem.success(function(data){//回傳 data
			});
		}
	}
$(document).ready(function(){
	$("body").delegate(".gameadd","change",function(){
		if($(this).data("target")){
			$("."+$(this).data("target")).fadeIn();
		}
		chk_regpoints();
	});
	$("body").delegate(".popgamechk","change",function(){
		poparr=["popgame1","popgame2","popgame3"];
		thisval=$(this).val();
		thisid=$(this).attr("id");

		for(var a=0;a<3;a++){
			if(thisid==poparr[a]){
			}else{
				if(thisval==$("#"+poparr[a]).val()){
					$(this).val('').trigger("chosen:updated");
					popnotice("本遊戲已選擇");
					$("."+$(this).data("target")).stop().hide();
				}
			}
		}


	});
	$("body").delegate(".showmore","click",function(e){
		e.preventDefault();
		thisval=$(this).data("target");
		$("#"+thisval).fadeIn();
		$(this).parents(".formline").hide();
	});

});

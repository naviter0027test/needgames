
// ##############  登入頁 ################################
show_login=function(){
	var out="";
	out+='   <div class="yellowbg">';
	out+='        <form class="form" id="loginform">';
	out+='            <img src="assets/img/logo.png" class="img">';
	out+='            <fieldset class="input">';
	out+='                <label>';
	out+='                    <span class="title">帳號</span>';
	out+='                    <input type="email" class="formfield form-control" placeholder="Email 或 手機號碼" data-err="請填寫正確的Email或手機號碼">';
	out+='                </label>';
	out+='                <label>';
	out+='                    <span class="title"  placeholder="6-12英數符號">密碼</span>';
	out+='                    <input type="password" name="pass" class="formfield form-control" data-err="請填寫密碼">';
	out+='                </label>';
	out+='            </fieldset>';
	out+='            <button type="button" class="btn submitclick  applebtn" data-type="loginform">會員登入</button>';
	out+='            <button type="button" class="btn fb  fbclick applebtn" data-type="login"><i class="fa fa-facebook" aria-hidden="true"></i> Facebook 帳號登入</button>';
	out+='        </form>';
	out+='        <div class="sigup-link">';
	out+='            <span class="registorclick applebtn">立即註冊</span> ｜';
	out+='            <span class="foregclick applebtn">忘記密碼</span> ｜';
	out+='            <span class="submenuclick applebtn" data-val="5">聯絡我們</span>';
	out+='        </div>';
	out+='    </div>';
	$("#mainwrap").html(out);
}
//忘記密碼表格
show_forget = function(x) {
	var out="";
	out+='   <div class="yellowbg">';
	out+='        <form class="form" id="forgetform">';
	out+='            <img src="assets/img/logo.png" class="img">';
	out+='            <fieldset class="input">';
	out+='                <label>';
	out+='                    <span class="title">帳號</span>';
	out+='                    <input type="email" class="formfield form-control" placeholder="Email 或 手機號碼" data-err="請填寫正確的Email或手機號碼">';
	out+='                </label>';
	out+='            </fieldset>';
	out+='            <button type="button" class="btn submitclick  applebtn" data-type="forgetform">確認送出</button>';
	out+='        </form>';
	out+='        <div class="sigup-link">';
	out+='            <span class="foregclick applebtn"  onclick="javascript:location.href=\'\'">重新登入</span> ｜';
	out+='            <span class="registorclick applebtn">立即註冊</span> ｜';
	out+='            <span class="submenuclick applebtn" data-val="5">聯絡我們</span>';
	out+='        </div>';
	out+='    </div>';
	$("#mainwrap").html(out);
};
// ##############  註冊頁 ################################
show_register=function(x=0){ //20190509 Pman x=0:一般流程 x=1:FB註冊流程
	var out="";

		out+="    <div class='yellowbg'>";
		out+="        <form class='form signup'  id='regform'>";
		out+="           <h1>加入會員</h1>";
	if(x==0){ //20190509 Pman 一般註冊流程
		out+="            <fieldset class='input'>";
		out+="                <label>";
		out+="                    <span class='title'>帳號</span>";
		out+="                    <input type='email'  name='name' placeholder='Email' class='formfield form-control' data-err='請填寫正確的Email'>";
		out+="                </label>";
		out+="                <label>";
		out+="                    <span class='title'>密碼</span>";
		out+="                    <input type='password' name='pass' placeholder='6-12英數符號' class='formfield form-control' data-err='請填寫正確的密碼'>";
		out+="                </label>";
		out+="                <label>";
		out+="                    <span class='title'>確認密碼</span>";
		out+="                    <input type='password' name='passb' placeholder='6-12英數符號'  class='formfield form-control' data-err='請填寫正確的密碼'>";
		out+="                </label>";
		out+="            </fieldset>";
		out+="            <fieldset class='input'>";
		out+="                <label>";
		out+="                    <span class='title'><input type='text' value='+886' style='width:50px;margin:0 10px 0 10px;float: none;' class='vcont' placeholder='+xxx' maxlength='4'></span>"; //20190522 Pman 增加區碼欄位
		out+="                    <input type='tel' class='vphone' placeholder='輸入手機號碼'>";
		out+="                    <button type='button' class='send submitclick submitclickr applebtn' data-type='sendmes'>發送</button>";
		out+="                </label>";
		out+="                <label>";
		out+="                    <span class='title'></span>";
		out+="                    <input type='tel' name='phonecode'  placeholder='輸入收到的簡訊驗證碼' class='formfield form-control'   data-err='請輸入收到的簡訊驗證碼'>";
		out+="                </label>";
		out+="            </fieldset>";
	}
	out+="            <fieldset class='check'>";
	out+="                <label>";
	out+="                    <input type='checkbox' name='agree' value='1' class='formfield form-control agreebox' data-err='請同意相關條款'>";
	//out+="                    <i class='fa fa-check' aria-hidden='true'></i>";
	out+="                    我已詳閱並同意盛事科技股份有限公司ＮＥＥＤ社群網站「<span id='aggrementclick'>會員規範</span>&<span id='privacyclick'>隱私權條款</span>」及以上權利義務之相關條款";
	out+="                </label>";
	out+="            </fieldset>";
	out+="					  <input type='hidden' class='formfield' name='refid' value='"+(localStorage.getItem("refid")?localStorage.getItem("refid"):"")+"'>\n";//refid
	
	if(x==0){
		out+="            <button type='button' class='btn applebtn submitclick' data-type='regform'>註冊</button>";
	}
	
	if(x==1){ //20190509 Pman 判斷是否用FB註冊
		out+="            <button type='button' class='btn fb fbclick applebtn' data-type='rlink' data-refid='"+(localStorage.getItem("refid")?localStorage.getItem("refid"):"")+"'><i class='fa fa-facebook' aria-hidden='true'></i> Facebook 快速註冊</button>";
	}
	out+="        </form>";
	out+="<div class='sigup-link' style='position: relative;bottom: 0;padding-bottom: 20px;'>";
  out+="          <a href=''><span onclick=\"javascript:location.href=''\">已有帳號</span></a>";
  out+="      </div>";
	out+="    </div>";
	$("#mainwrap").html(out);
}

// ##############  註冊後資料填寫頁 ################################
show_reginfo=function(){
	var out="";
	var d = new Date();
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_memberform",tempvals,ajaxurl);		
		tempitem.success(function(data){//回傳 data 義
			if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
			var mem=xmem;
			var intPointSum=0;
			intPointSum=parseInt(data[3])+parseInt(data[4])+parseInt(data[5]); //20190315 Pman 加總會獲得的點數
			//var mem=JSON.parse(sessionStorage.getItem("member"));
			console.log(data[3]);
			out+="    <div class='yellowbg'>";
			out+="        <div class='signup-info' id='popmemberform'>";
			out+="            <div class='head'>";
			out+="                完成步驟立即獲得";
			out+="                <span class='point'>"+intPointSum+" <img src='img/p_off.png' style='width: 20px;'></span>";//20181030 Pman 將icon加上width設定，不然頁面會爆 //20190315 Pman 可獲得總點數
			//out+="                <span class='btn' onClick='javascript:location.href='home.html''>略過</span>";
			out+="            </div>";
			out+="            <div class='title'>";
			out+="                <h2>填寫基本資料</h2>";
			out+="                <span class='point'>"+data[3]+"<img src='img/p_off.png' style='width: 20px;'></span>";
			out+="            </div>";
			out+="            <fieldset>";
			if(mem && mem['nickname']){
				//out+="                    <input type='hidden' class='formfield form-control' name='nick' value='"+mem['nickname']+"' data-err='暱稱字數為2~7個中文字，請重新調整'>";
				out+="                    <input type='hidden' class='formfield form-control' name='nick' value='"+mem['nickname']+"' data-err='暱稱必須為2-10個中文字，或20個英文字以內'>";//20190904 Pman 客戶要求修改
			}else{
				out+="                <label>";
				out+="                    <span>暱稱</span>";
				//out+="                    <input type='text' class='formfield form-control' name='nick' data-err='暱稱字數為2~7個中文字，請重新調整'>";
				out+="                    <input type='text' class='formfield form-control' name='nick' data-err='暱稱必須為2-10個中文字，或20個英文字以內' placeholder='送出後不可修改，請謹慎填寫'>";//20190904 Pman 客戶要求修改 //20190110 Pman 新增placeholder文案
				out+="                </label>";
				out+="                <label>＊暱稱設定送出後不可修改，請謹慎填寫</label>" //20190110 Pman 新增說明文案
			}
			out+="                <label>";
			out+="                    <span>性別</span>";
			out+="                    <select class='formfield form-control' name='gender'  data-err='請選擇性別'>";
			out+="                        <option value=''>請選擇</option>";
			out+="                        <option value='1'>男</option>";
			out+="                        <option value='2'>女</option>";
			out+="                    </select>";
			out+="                </label>";
			out+="                <div>";
			out+="                    <span>生日</span>";
			out+="                    <div class='date'>";
			out+="                        <select class='birthyear formfield form-control' name='birthyear' data-err='請選擇生日-年'>";
			out+="                            <option value=''>年</option>";
			for(var a=1930;a<=d.getFullYear();a++){
				out+="                     <option value='"+a+"'>"+a+"</option>";
			}
			out+="                        </select>";
			out+="                        <select class='birthmonth formfield form-control' name='birthmonth' data-err='請選擇生日-月'>";
			out+="                            <option value=''>月</option>";
			for(var a=1;a<=12;a++){
				out+="                     <option value='"+a+"'>"+a+"</option>";
			}
			out+="                        </select>";
			out+="                        <select class='birthday formfield form-control' name='birthday' data-err='請選擇生日-日'>";
			out+="                            <option value=''>日</option>";
			out+="                        </select>";
			out+="                    </div>";
			out+="                </div>";
			out+="                <label>";
			out+="                    <span>地區</span>";
			out+="                    <select  name='location' class='formfield form-control' data-err='請選擇地區'>";
			for(var a=0;a<data[1].length;a++){
				out+="<option value='"+data[1][a]['thisid']+"'>"+data[1][a]['thisname']+"</option>";
			}
			out+="                    </select>";
			out+="                </label>";
			if(mem && mem['email']){
				out+="<input type='hidden' class='formfield form-control' name='email' value='"+mem['email']+"'>";
			}else{
				out+="                <label>";
				out+="                    <span>信箱</span>";
				out+="                    <input type='email' class='formfield form-control' name='email' data-err='請著實填寫有效Email' placeholder='客服中心聯絡用，請著實填寫有效Email'>";
				out+="                </label>";
			}
			out+="            </fieldset>";
			out+="            <div class='title'>";
			out+="                <h2>設定遊戲履歷</h2>";
			out+="                <span class='point'>"+data[4]+" <img src='img/p_off.png' style='width: 20px;'></span>";//20181030 Pman 將icon加上width設定，不然頁面會爆 //20190315 Pman 套用從DB中撈出的點數值
			out+="            </div>";
			out+="            <fieldset>";
			out+="                正在玩的遊戲";
			out+="                <hr>";
			out+="						<label class='long relay'>";
			out+="					 		<div class='stagcover popclick applebtn' data-type='selectgametag' data-id='sg1'></div>";
			out+="							<select name='game1' id='sg1' class='formfield form-control gametagselect applebtn' data-type='selectgametag' data-id='sg1' data-err='請選擇遊戲名稱'>";
			out+="								<option value=''>請選擇遊戲名稱</option>";
			out+="							</select>";
			out+="						</label>";
			out+="						<label>";
			out+="							<span>備註</span>";
			out+="							<input type='text' class='formfield rgnotes' name='game1note'  placeholder='字數限制：３０中文６０英文'>";
			out+="						</label>";
			out+="						<label class='long relay'>";
			out+="					 		<div class='stagcover popclick applebtn' data-type='selectgametag' data-id='sg2'></div>";
			out+="							<select name='game2' id='sg2' class='formfield gametagselect applebtn' data-type='selectgametag' data-id='sg2' data-err='請選擇遊戲名稱'>";
			out+="								<option value=''>請選擇遊戲名稱</option>";
			out+="							</select>";
			out+="						</label>";
			out+="						<label>";
			out+="							<span>備註</span>";
			out+="							<input type='text' class='formfield rgnotes' name='game2note'  placeholder='字數限制：３０中文６０英文'>";
			out+="						</label>";
			out+="						<label class='long relay'>";
			out+="					 		<div class='stagcover popclick applebtn' data-type='selectgametag' data-id='sg3'></div>";
			out+="							<select name='game3' id='sg3' class='formfield gametagselect applebtn' data-type='selectgametag' data-id='sg3' data-err='請選擇遊戲名稱'>";
			out+="								<option value=''>請選擇遊戲名稱</option>";
			out+="							</select>";
			out+="						</label>";
			out+="						<label>";
			out+="							<span>備註</span>";
			out+="							<input type='text' class='formfield rgnotes' name='game3note'  placeholder='字數限制：３０中文６０英文'>";
			out+="						</label>";
			out+="						<br> 遊戲時段";
			out+="						<hr>";
			out+="						<label class='long'>";
			out+="							<select  name='gametime' class='formfield ' id='popgametime'>";
			for(var a=0;a<data[2].length;a++){
				out+="<option value='"+data[2][a]['thisid']+"'>"+data[2][a]['gtname']+"</option>";
			}
			out+="							</select>";
			out+="						</label>";
			out+="					</fieldset>";
			out+="					<div class='title'>";
			out+="						<h2>上傳大頭貼</h2>";
			out+="						<span class='point'>"+data[5]+" <img src='img/p_off.png' style='width: 20px;'></span>"; //20181030 Pman 將icon加上width設定，不然頁面會爆 //20190315 Pman 套用從DB中撈出的點數值
			out+="					</div>";
			out+="					<input type='hidden' name='headpicid' class='formfield' id='headpicid'>";
			//out+="<input type='hidden' name='frontpicid' class='formfield' id='frontpicid'>";
			out+="					<fieldset>";
			out+="						<div class='cover' id='piccover'>";
			out+="							<form action='' method='post' id='headpicform' enctype='multipart/form-data'>\n";
			out+="								<img src='img/basichead.png'>";
			out+="                            	<input type='file' accept='image/*' class='instantupload' name='headpic' data-job='uploadhead' data-form='headpicform' data-target='headpicid' data-pictargettype2='piccover' data-type='cover' >\n";
			out+="								<i class='fa fa-camera' aria-hidden='true'></i>";
			out+="							</form>";
			out+="						</div>";
			out+="					</fieldset>";
			out+="					<button class='send submitclick applebtn' type='button' data-type='popmemberform'>確認送出</button>";
			out+="				</div>";
			out+="			</div>";
			$("#mainwrap").html(out);
	});
}
// ########## POPUP 表格 #######################################
// ################# 聯絡頁 #############################
show_contact=function(){
	var out="";

}
//聯絡
popcontactus = function(x) {
		var mem=[];
		mem['nickname']="";
		mem['email']="";
		if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
		if(xmem){
			mem=xmem;
		}

	//	if(sessionStorage.getItem("member")){
	//		mem=JSON.parse(sessionStorage.getItem("member"));
	//	}
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data 義
			var out="";
			out+="<form action='' method='post' id='contactform'>\n";
			out+="	<header>";
			out+="			<div class='link back applebtn popfullcloset'>";
			out+="				<i class='fa fa-angle-left' aria-hidden='true'></i>";
			out+="				<span>返回</span>";
			out+="				</div>";
			out+="				<div class='link word'>聯絡我們</div>";
			out+="				<br clear='both'>";
			out+="		</header>";
			out+="		<div class='contact'>";
			out+="				<label>";
			out+="						姓名";
			out+="						<input type='text' name='name' class='formfield form-control' placeholder='請盡量填寫真實姓名' value='"+mem['nickname']+"'  data-err='請填寫真實姓名'>";
			out+="				</label>";
			out+="				<label>";
			out+="						手機";
			out+="						<input type='tel' name='phone' class='formfield' placeholder='請輸入連絡電話'>";
			out+="				</label>";
			out+="				<label>";
			out+="						Email";
			out+="						<input type='email' name='email' class='formfield form-control' placeholder='請輸入常用信箱'  value='"+mem['email']+"'  data-err='請輸入常用信箱'>";
			out+="				</label>";
			out+="				<label>";
			out+="						標題";
			out+="						<input type='text' name='title' class='formfield form-control' placeholder='20字內'  data-err='請填寫標題'>";
			out+="				</label>";
			out+="				<label>";
			out+="						類型";
			out+="						<select name='type' class='formfield form-control' data-err='請選擇聯絡類型'>";
			out+="								<option value=''>請選擇</option>";
			out+="								<option value='合作提案'>合作提案</option>";
			out+="								<option value='廣告刊登'>廣告刊登</option>";
			out+="								<option value='檢舉通報'>檢舉通報</option>";
			out+="								<option value='聯絡客服'>聯絡客服</option>";
			out+="								<option value='意見回饋'>意見回饋</option>";
			out+="								<option value='新聞稿投稿'>新聞稿投稿</option>"; //20190320 Pman 新增聯絡我們的選項
			out+="								<option value='需要新增的遊戲標籤'>需要新增的遊戲標籤</option>";//20190320 Pman 新增聯絡我們的選項
			out+="								<option value='系統錯誤回報'>系統錯誤回報</option>";
			out+="								<option value='帳號懲處相關問題'>帳號懲處相關問題</option>";
			out+="						</select>";
			out+="				</label>";
			out+="				<label>";
			out+="						內容";
			out+="						<textarea rows='10' name='content' class='formfield form-control' data-err='請填寫內容,1000字內'></textarea>";
			out+="						<br clear='both'>";
			out+="				</label>";
			out+="				<label style='height:30px;'>";
			out+="							<span style='width:50px;float:left;'>驗證碼</span>";
			out+="							<span style='width:50%;margin-left:-50px;float:left;'><input type='text' class='formfield form-control' name='code'  data-err='請填寫驗證碼'></span>\n";
			out+="							<span style='width:48%;float:left;'>"+data[0]+"</span>\n";
			out+="				</label>";
			out+="				<label>";
			out+="						<button class='send submitclick applebtn' data-type='contactform'>確定送出</button>";
			out+="				</label>";
			out+="		</div>";
			out+="</form>";
			popbasefullt(out);
			/*
			out="<form action='' method='post' id='contactform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>姓名</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='姓名' value='"+mem['nickname']+"'>\n";
			out+="                            <div class='formerr'>請填寫姓名</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>電話</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield ' name='phone' placeholder='電話'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w4'>Email</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='email' placeholder='Email' value='"+mem['email']+"'>\n";
			out+="                            <div class='formerr'>請填寫Email</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>標題</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='title' placeholder='20字內'>\n";
			out+="                            <div class='formerr'>請填寫標題,20字內</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
		    out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w4'>聯絡類型</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='type' class='wform formfield form-control'> \n";
			out+="								<option value=''>請選擇</option>";
			out+="								<option value='合作提案'>合作提案</option>";
			out+="								<option value='廣告刊登'>廣告刊登</option>";
			out+="								<option value='檢舉通報'>檢舉通報</option>";
			out+="								<option value='聯絡客服'>聯絡客服</option>";
			out+="								<option value='意見回饋'>意見回饋</option>";
			out+="								<option value='系統錯誤回報'>系統錯誤回報</option>";
			out+="							  </select>";
			out+="                            <div class='formerr'>請選擇聯絡類型</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>內容</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <textarea class='wform formfield form-control' name='content' placeholder='1000字內'></textarea>\n";
			out+="                            <div class='formerr'>請填寫內容,1000字內</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w3'>驗證碼</span></div>\n";
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
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='contactform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			popbase("聯絡我們",out,'');
			*/
		});
};
popmember=function(){//會員條款
	   out="";
	   out+="        <header>";
	   out+="            <div class='link back applebtn popfullclose' >";
	   out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	   out+="                <span>返回</span>";
	   out+="            </div>";
	   out+="            <div class='link word'>會員條款</div>";
	   out+="            <br clear='both'>";
	   out+="        </header>";
	   out+="        <div class='word-html'>";
		 //提醒過三次都不改錯..所以絕對不重貼了
		 out+="            <p>		 ■ＮＥＥＤ會員規範 </p>";
		 out+="            <p>		 歡迎來到ＮＥＥＤ社群網站（以下簡稱ＮＥＥＤ）！為了保障您的權益，在註冊前請先詳細閱讀本會員規範之所有內容，當您選擇完成註冊即視為您已閱讀完本會員規範，並同意遵守以下所有規範內容。</p>";
		 out+="            <p>		 若您不同意以下所述全部或部分規範內容，您即無法完成會員註冊，將無法使用ＮＥＥＤ網站部分服務或參與相關活動。</p>";
		 out+="            <p>		 一、會員服務條款</p>";
		 out+="            <p>		 1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成註冊並通過認證者。</p>";
		 out+="            <p>		 2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。</p>";
		 out+="            <p>		 3.本站保留有審核加入會員資格及有解除其會員資格之權利。</p>";
		 out+="            <p>		 4.本會員服務條款之修訂，適用於所有會員。</p>";
		 out+="            <p>		 ５.所有申請使用盛事科技股份有限公司（ＮＥＥＤ）會員服務的使用者，都應該詳細閱讀下列使用條款，這些使用條款訂立的目的，是為了保護盛事科技股份有限公司（ＮＥＥＤ）會員服務的提供者以及所有使用者的利益，並構成使用者與盛事科技股份有限公司（ＮＥＥＤ）會員服務的提供者之間的契約，使用者完成註冊手續、或開始使用盛事科技股份有限公司所提供之會員服務時，即視為已知悉並同意本會員規範的所有約定。</p>";
		 out+="            <p>		 ６. 盛事科技股份有限公司（ＮＥＥＤ）針對本網站擁有最終解釋權。</p>";
		 out+="            <p>		 如您是法律上之無行為能力人或限制行為能力人(如未滿20歲之未成年人)，於加入會員前，請將本服務使用條款交由您的法定代理人(如父母、輔助人或監護人)閱讀，並得到其同意，您才可註冊及使用盛事科技股份有限公司（ＮＥＥＤ）所提供之會員服務。</p>";
		 out+="            <p>		 當您開始使用盛事科技股份有限公司（ＮＥＥＤ）所提供之註冊會員服務時，視同您的法定代理人(如父母、輔助人或監護人)已閱讀、了解並同意本服務條款。</p>";
		 out+="            <p>		 二、遵守會員規範：</p>";
		 out+="            <p>		 在您於ＮＥＥＤ註冊成為會員後，可以使用ＮＥＥＤ所提供之各種服務及</p>";
		 out+="            <p>		 ＮＥＥＤ之特定服務，您可能須於使用該特定服務前同意相關使用規範。當您使用ＮＥＥＤ服務時，即表示同意接受ＮＥＥＤ之會員規範及其他ＮＥＥＤ所公告之規範或注意事項之約束。</p>";
		 out+="            <p>		 三、會員</p>";
		 out+="            <p>		 1.使用本站所提供之會員服務時，須以加入會員時所登錄之帳號及密碼使用之。</p>";
		 out+="            <p>		 2.會員須善盡管理會員帳號及密碼之責任。對於使用該會員之帳號及密碼(不論會員本身或其他人)利用本站服務所造成或衍生之所有行為及結果，會員須自行負擔全部法律責任。</p>";
		 out+="            <p>		 3.會員之帳號及密碼遺失，或發現無故遭第三者盜用時，應立即通知本站連絡掛失。若因未即時通知，導致本站無法有效防止及修改時，所造成的所有損失，會員應自負全責。</p>";
		 out+="            <p>		 4.每次結束使用本服務，會員須登出並關閉視窗，以確保您的會員權益。</p>";
		 out+="            <p>		 5.盜用他人會員之帳號及密碼，導致第三者或本公司遭他人訴訟或行政機關之調查、追訴時，第三者或本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。</p>";
		 out+="            <p>		 四、會員登錄資料</p>";
		 out+="            <p>		 1.會員登錄資料應提供您本人正確、最新及完整的資料。</p>";
		 out+="            <p>		 2.會員登錄資料不得有偽造、不實等之情事，一經發現，本公司得以拒絕、暫停或終止其會員資格，若違反中華民國相關法律，亦將依法追究。</p>";
		 out+="            <p>		 3.會員登錄之各項資料有變更時，應不定期更新，以保其正確及完整性。若您提供的資料有錯誤或不符等現象，本網站有權暫停或終止您的會員資格，並拒絕您繼續使用本服務。</p>";
		 out+="            <p>		 4.未經會員本人同意，本公司不會將會員資料揭露給第三者，唯資料共用原則... (請參閱本站「隱私權保護聲明」相關規定)等不在此限。</p>";
		 out+="            <p>		 ■隱私權保護聲明</p>";
		 out+="            <p>		 a.本網站會保護每一位使用者的隱私，不管是您的申請帳號、個人資料、郵件位址、或所儲存的網站資料，除了可能涉及違法、侵權、或違反使用條款、或長達一年沒有登入進行任何系統儲存動作、或經會員本人同意以外，本網站不會任意監視、增刪、修改或關閉，或將個人資料及郵件內容交予第三者，包括贊助之廣告廠商。</p>";
		 out+="            <p>		 b.本網站有部份特定服務是與其他合作廠商共同經營，如果您不願將個人資料揭露給其他合作伙伴，可以選擇不同意使用這些特定服務。為完成這些特定服務，本網站可能將您個人的資料揭露給合作伙伴，但會在提供會員資料前告知會員。</p>";
		 out+="            <p>		 c.   在下列的情況下，本網站有可能會查看或提供您的資料給有權機關、或主</p>";
		 out+="            <p>		         張其權利受侵害並提出適當證明之第三人：</p>";
		 out+="            <p>		 c.1. 依法令規定、或依司法機關或其他有權機關的命令；</p>";
		 out+="            <p>		 c.2. 為執行本使用條款、或使用者違反使用條款；</p>";
		 out+="            <p>		 c.3. 為保護盛事科技股份有限公司（NEED）會員服務系統之安全或經營者</p>";
		 out+="            <p>		         之合法權益；</p>";
		 out+="            <p>		 c.4. 為保護其他使用者其他第三人的合法權益；</p>";
		 out+="            <p>		 c.5. 為維護盛事科技股份有限公司（NEED）會員服務系統的正常運作。</p>";
		 out+="            <p>		 d.     經會員註冊成功後，為增加會員服務範圍，不須另行註冊即享有本公司各項產品之會員資格，本公司將於各產品內進行會員資料的建檔、揭露、轉介、或交互運用，但本公司仍保有拒絕或暫停產品服務的權利。</p>";
		 out+="            <p>		 e.     NEED社群也自動接收並記錄您電腦和瀏覽器上的資料，包括 IP位址、  </p>";
		 out+="            <p>		          NEED社群cookie中的資料、使用之軟體和硬體以及您瀏覽的網頁紀錄。</p>";
		 out+="            <p>		         在您使用NEED社群產品及服務期間，NEED社群將資料用作以下用途：改善NEED社群產品與服務品質、聯絡您、進行研究，以及提供內部及外部客戶不載有個人資料之市場分析或業務報告。</p>";
		 out+="            <p>		 5.會員應妥善保管密碼，不可將密碼洩露或提供給他人知道或使用；以同一個會員身分證字號和密碼使用本服務所進行的所有行為，都將被認為是該會員本人和密碼持有人的行為。</p>";
		 out+="            <p>		 6.會員如果發現或懷疑有第三人使用其會員身分證字號或密碼，應該立即通知本公司，採取必要的防範措施。但上述通知不得解釋為本公司對會員負有任何形式之賠償或補償之責任或義務。</p>";
		 out+="            <p>		 五、註冊資料：</p>";
		 out+="            <p>		 您同意於註冊時提供完整詳實且符合真實之個人資料，您所登錄之資料事後若有變更時，應隨時更新。若有需要由ＮＥＥＤ協助處理客戶服務事項時，</p>";
		 out+="            <p>		 ＮＥＥＤ會核對您的個人資料，若與註冊時所登錄之資料不符時，ＮＥＥＤ將無法對您提供相關服務。</p>";
		 out+="            <p>		 若您提供之個人資料有填寫不實或原登錄之資料不實而未更新，或是有任何誤導之嫌，ＮＥＥＤ將保留隨時終止您會員資格及使用ＮＥＥＤ之權利。您同意ＮＥＥＤ依法律或契約有需要通知您時，得以電子文件向您註冊時之電子郵件帳號為通知，並於通知送出時即視為產生送達之效力，請您提供正確且經常使用的電子郵件帳號，以維護您的權益。</p>";
		 out+="            <p>		 六、使用行為</p>";
		 out+="            <p>		 1.您使用本服務之一切行為必須符合當地或國際相關法令規範；對於使用者的一切行為，您須自行負擔全部法律責任。</p>";
		 out+="            <p>		 2.您同意絕不為非法之目的或以非法方式使用本服務，與確實遵守中華民國相關法規及網際網路之國際慣例，並保證不得利用本服務從事侵害他人權益或違法之行為，否則您須自行負擔全部法律責任。</p>";
		 out+="            <p>		 3.您於使用本站會員服務時應遵守以下規則：</p>";
		 out+="            <p>		  a)不得使用有損他人人格或商標權、著作權、專利權等智慧財產權或其他權利內容。</p>";
		 out+="            <p>		  b)不得使用違反公共秩序或善良風俗或其他不法之文字。</p>";
		 out+="            <p>		  c) 不得使用強烈政治、宗教色彩的偏激言論。</p>";
		 out+="            <p>		  d)未經本公司許可不得利用本服務或本網站所提供其他資源從事任何商業交   </p>";
		 out+="            <p>		      易行為。</p>";
		 out+="            <p>		  e)不得違反本站「會員規範」內容。</p>";
		 out+="            <p>		 七、本公司專有權利</p>";
		 out+="            <p>		 1.本服務所載，或本服務所連結之一切軟體或內容，或本公司之廣告商或合夥人所提供之內容，均受其著作權或其他專有權利或法律所保障。</p>";
		 out+="            <p>		 2.當您傳輸資料至本公司提供之服務時，您即同意此一資料為全開放性(任何人均可瀏覽)。您授權並許可本公司得以重製、修飾、改編或以其他形式使用該內容之全部或一部分，及利用該內容製作衍生著作。衍生著作之著作權悉歸本公司所有。</p>";
		 out+="            <p>		 3. 本公司同意除依本使用條款約定，將前述您的資料及衍生著作置於本網站供網路使用者瀏覽，以及本公司所屬相關媒體外，絕不非法轉供其他直接營利目的或侵害您的權利之使用。</p>";
		 out+="            <p>		 4.所有網頁之頁面出現之廣告看板與活動訊息，所有權及經營權均為本公司所有，使用者除事先取得本公司同意外，不得自行使用所有訊息。</p>";
		 out+="            <p>		 5.會員同意並授權本網站，得為提供個人化服務或相關加值服務之目的，提供所需之會員資料給合作單位(第三者)做約定範圍內之運用，如會員不同意將其資料列於合作單位(第三者)產品或服務名單內，可通知本網站於名單中刪除其資料，並同時放棄其本網站以外之購物優惠或獲獎權利。</p>";
		 out+="            <p>		 6.同時為提供行銷、市場分析、統計或研究、或為提供會員個人化服務或加值服務之目的，會員同意本公司、或本公司之策略合作夥伴，得記錄、保存、並利用會員在本網站所留存或產生之資料及記錄，同時在不揭露各該資料之情形下得公開或使用統計資料。</p>";
		 out+="            <p>		 7.對於會員所登錄之個人資料，會員同意本網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或行銷研究。</p>";
		 out+="            <p>		 八、隱私權政策：</p>";
		 out+="            <p>		 您所提供的註冊資訊及其他於利用本網站服務時所提供之個人資料，ＮＥＥＤ將依【隱私權政策】進行蒐集、利用與保護。</p>";
		 out+="            <p>		 九、會員內容：</p>";
		 out+="            <p>		 若您使用ＮＥＥＤ服務發表及分享您所創作之文字、美術、照片、視訊等著作，或其他利用ＮＥＥＤ服務所為之討論、對話等（以下稱「會員內容」）時，您同意聲明並擔保會員內容為您所自行創作，並未侵害任何第三人之智慧財產權或其他權益，亦未違反任何法令之規定。</p>";
		 out+="            <p>		 請注意：您須為您所提供之會員內容負各種法律上責任，若涉有違法情事，</p>";
		 out+="            <p>		 ＮＥＥＤ亦將於配合法院、檢調機關、政府機關相關程序提供相關資料。若涉有侵害他人智慧財產權或其他權益之情事者，ＮＥＥＤ得終止您全部或部分服務。</p>";
		 out+="            <p>		 為維護ＮＥＥＤ網站服務品質，您同意會員內容除須依據各該服務之板規或其他已公告之個別條款或細部規定為適當之發表外，亦不得有任何違反網路禮節、令人不愉快、令人厭惡、猥褻、暴力或其他ＮＥＥＤ認為不適當之內容。</p>";
		 out+="            <p>		 ＮＥＥＤ對於使用者內容並不會進行事前過濾，惟ＮＥＥＤ保留(但無義務)對於會員內容予以刪除或禁止存取之權利。</p>";
		 out+="            <p>		 會員內容之著作權，屬於您所享有。您同意無條件授權會員內容予ＮＥＥＤ，得為ＮＥＥＤ網站營運，或為行銷、宣傳ＮＥＥＤ網站等目的範圍內為利用，並得於前開目的範圍內再授權他人使用。如有其他利用需求，ＮＥＥＤ將另行取得您的授權。</p>";
		 out+="            <p>		 十、終止授權</p>";
		 out+="            <p>		 您使用本服務之行為若有任何違反法令或本使用條款或危害本網站或第三者權益之虞時，本公司有權不經告知您，立即暫時或永久終止您使用本服務之授權。</p>";
		 out+="            <p>		 基於公司的運作，本網站有可能變更、或停止提供服務之全部或一部，使用者不可以因此而要求賠償或補償</p>";
		 out+="            <p>		 十一、會員的義務與責任：</p>";
		 out+="            <p>		 會員對本身於ＮＥＥＤ或透過ＮＥＥＤ傳輸的一切內容自負全責，您亦不得將會員帳號同意他人使用或移轉予他人，並同意遵守下列規定：</p>";
		 out+="            <p>		 1.	會員承諾遵守中華民國相關法規及一切國際網際網路規定與慣例。</p>";
		 out+="            <p>		 2.	會員同意並保證不公布或傳送任何毀謗、不實、威脅、不雅、猥褻、不法、攻擊性、毀謗性或侵害他人智慧財產權的文字，圖片或任何形式的檔案於</p>";
		 out+="            <p>		 ＮＥＥＤ上。</p>";
		 out+="            <p>		 3.	會員同意不會於ＮＥＥＤ上從事廣告或販賣商品行為，包括虛擬寶物、遊戲點數卡或其他商品或服務之交易行為等。</p>";
		 out+="            <p>		 4.	會員同意避免在公眾討論區討論私人事務，發表文章時，請尊重他人的權益及隱私權。</p>";
		 out+="            <p>		 ＮＥＥＤ就會員的行為是否符合會員規範有最終決定權。若ＮＥＥＤ決定會員的行為違反本會員規範或任何法令，會員同意ＮＥＥＤ得隨時停止帳號使用權或清除帳號，並停止使用ＮＥＥＤ。會員在違反法律規定之情事，應自負法律責任。</p>";
		 out+="            <p>		 十二、免責事項</p>";
		 out+="            <p>		 1.下列情形發生時，本網站有權可以停止、中斷提供本服務：</p>";
		 out+="            <p>		  a)對本服務相關軟硬體設備進行更換、升級、保養或施工時。</p>";
		 out+="            <p>		  b)發生突發性之電子通信設備故障時。</p>";
		 out+="            <p>		  c)天災或其他不可抗力之因素致使本網站無法提供服務時。</p>";
		 out+="            <p>		 2.本公司對於使用者在使用本服務或使用本服務所致生之任何直接、間接、衍生之財產或非財產之損害，不負賠償責任。</p>";
		 out+="            <p>		 3.使用者對於上傳留言之文字、圖片及其它資料，應自行備份；本公司對於任何原因導致其內容全部或一部之滅失、毀損，不負任何責任。</p>";
		 out+="            <p>		 4.本公司對使用本服務之用途或所產生的結果，不負任何保證責任，亦不保證與本服務相關之軟體無缺失或會予以修正。</p>";
		 out+="            <p>		 5.對於您在本站中的所有言論、意見或行為僅代表您個人；不代表本公司的立場，本公司不負任何責任。本公司對於使用者所自稱之身分，不擔保其正確性。</p>";
		 out+="            <p>		 6.本公司無須對發生於本服務或透過本服務所涉及之任何恐嚇、誹謗、淫穢或其他一切不法行為對您或任何人負責。</p>";
		 out+="            <p>		 7.對於您透過本服務所購買或取得，或透過本公司之贊助者或廣告商所刊登、銷售或交付之任何貨品或服務，您應自行承擔其可能風險或依法向商品或服務提供者交涉求償，與本公司完全無關，本公司均不負任何責任。</p>";
		 out+="            <p>		 十三、服務之停止與更改： </p>";
		 out+="            <p>		 1.於發生下列情形之一時，ＮＥＥＤ有權停止或中斷提供服務：</p>";
		 out+="            <p>		  a)對ＮＥＥＤ之設備進行必要之保養及施工時。</p>";
		 out+="            <p>		  b)發生突發性之設備故障時。</p>";
		 out+="            <p>		 c)由於ＮＥＥＤ所申請之 ISP 業者無法提供服務時。</p>";
		 out+="            <p>		 d)因天災等不可抗力之因素致使ＮＥＥＤ無法提供服務時。</p>";
		 out+="            <p>		 c)其他本公司不可預測之因素。</p>";
		 out+="            <p>		 2.ＮＥＥＤ可能因公司或 ISP 業者網路系統軟硬體設備之故障、失靈或人為操作上之疏失而造成全部或部份中斷、暫時無法使用、延遲或造成資料傳輸或儲存上之錯誤、或遭第三人侵入系統篡改或偽造變造資料等，ＮＥＥＤ將盡力回復相關服務之正常運作，會員不得因此而要求任何補償。</p>";
		 out+="            <p>		 3.如因故ＮＥＥＤ網站須終止營運，ＮＥＥＤ將於終止前於網站公告， </p>";
		 out+="            <p>		 您應自行保留使用ＮＥＥＤ所生之各種資料或記錄。</p>";
		 out+="            <p>		 十四、保管及通知義務：</p>";
		 out+="            <p>		 您有責任維持密碼及帳號的機密安全。除可依法證明非您本身或授意他人所為者外，您必須完全負起因利用該密碼及帳號所進行之一切行為之責任。</p>";
		 out+="            <p>		 當密碼或帳號遭到未經授權之使用，或發生其他任何安全問題時，您必須立即通知ＮＥＥＤ，以減少相關損害。建議您於公用電腦使用完畢，務必登出您的帳號。因您未遵守本項約定所生之任何損失或損害，我們將無法亦不予負責。</p>";
		 out+="            <p>		 十五、特別同意事項：</p>";
		 out+="            <p>		 您同意於ＮＥＥＤ所發表之一切內容僅代表您個人之立場與行為，並同意承擔所有相關衍生之責任，ＮＥＥＤ不負任何責任。</p>";
		 out+="            <p>		 您亦同意若因其他會員行為造成您權利的損害或其他困擾時，不會對ＮＥＥＤ行使或主張任何權利或賠償。</p>";
		 out+="            <p>		 十六、責任限制：</p>";
		 out+="            <p>		 您認知並了解ＮＥＥＤ乃依其現狀及使用時之狀況提供服務，您須自行承擔使用ＮＥＥＤ網站服務時之風險。ＮＥＥＤ並未對網站服務可符合您使用上之需求及任何錯誤之修正為任何明示或默示的擔保。</p>";
		 out+="            <p>		 ＮＥＥＤ對您使用ＮＥＥＤ網站服務或與ＮＥＥＤ網站連結之其他網站下載的圖檔、軟體或資料等，不負任何擔保責任。您應於下載前自行斟酌與判斷前述資料之合適性、有效性、正確性、完整性、及是否侵害他人權利，以免遭受損失，ＮＥＥＤ對於該等損失不負任何賠償責任。</p>";
		 out+="            <p>		 您同意若依法ＮＥＥＤ須負賠償責任時，單一事件之賠償上限為您於該賠償事件發生前一個月使用本網站特定服務產生之費用。</p>";
		 out+="            <p>		 十七、擔保責任免除：</p>";
		 out+="            <p>		 1.ＮＥＥＤ保留隨時更改或調整各項服務內容之權利，無需事先通知會員。</p>";
		 out+="            <p>		 ＮＥＥＤ得依其判斷對於違反會員規範或相關規定之會員帳號終止其使用之權利。無論任何情形，就停止或更改服務或終止會員帳號使用所可能產生之困擾、不便或損害，會員同意不對ＮＥＥＤ有任何主張。</p>";
		 out+="            <p>		 2.ＮＥＥＤ保留將來新增、修改或刪除各項服務之全部或一部之權利，且不另行個別通知，會員不得因此而要求任何補償或賠償。</p>";
		 out+="            <p>		 3.廠商或個人可能透過ＮＥＥＤ之服務或經由服務連結至其他網站、營業處所提供商品買賣、服務或其他交易行為。會員若因此直接與該等廠商或個人直接進行交易，各該買賣或其他合約均僅存在您與各該廠商或個人兩造之間。ＮＥＥＤ除聲明不介入兩造之任何行為外，對於您所獲得的商品、服務或其他交易標的物亦不負任何擔保責任。</p>";
		 out+="            <p>		 4.ＮＥＥＤ提供之特定服務可能存在專屬之服務條款，在此情形下，雙方權利義務將依據該服務之專屬條款決定之。</p>";
		 out+="            <p>		 十八、廣告或促銷行為：</p>";
		 out+="            <p>		 ＮＥＥＤ上有關商業廣告及各種商品之促銷資訊，該等內容均係由廣告商或商品服務提供人所為，ＮＥＥＤ僅係提供刊登內容之平台。</p>";
		 out+="            <p>		 會員透過ＮＥＥＤ上所提供之商品、服務資訊，所購買之任何非由ＮＥＥＤ所直接販售之商品或服務，其間交易關係均存在於會員與商品或服務提供人間，與ＮＥＥＤ無關。</p>";
		 out+="            <p>		 十九、智慧財產權：</p>";
		 out+="            <p>		 ＮＥＥＤ刊出之所有著作及資料（例如文章、圖片等）內容，其著作權、專利權、商標權、營業秘密及其他智慧財產權，皆為盛事科技股份有限公司或該內容之提供者所有，且受中華民國法令及國際法律的保障。</p>";
		 out+="            <p>		 ＮＥＥＤ畫面資料之選擇、編排之版權為盛事科技股份有限公司所有，且受中華民國著作權法令及國際著作權法律的保障。非經本公司書面授權同意，不得以任何形式轉載、傳輸、傳播、散布、展示、出版、再製或利用</p>";
		 out+="            <p>		 ＮＥＥＤ內容的局部、全部的內容，以免觸犯相關法律規定。未經本公司書面同意，您不得擅自複製、進行還原工程（reverse engineering）、解編（de-compile）或反向組譯（disassemble）ＮＥＥＤ之任何功能或程式。</p>";
		 out+="            <p>		 除本公司外任何人不得逕行使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。如欲引用或轉載前述之軟體、程式或網站內容，必須依法取得本網站或其他權利人的事前書面同意。如有違反之情事，您應對本網站或其他權利人負損害賠償責任（包括但不限於訴訟費用及律師費用等）。</p>";
		 out+="            <p>		 二十、連結：</p>";
		 out+="            <p>		 ＮＥＥＤ在網站或相關網頁上所提供之所有連結，可能連結到其他個人、公司或組織之網站，提供該連結之目的，僅為便利站友搜集或取得資訊，ＮＥＥＤ對於被連結之該等個人、公司或組織之網站上所提供之產品、服務或資訊，既不擔保其真實性、完整性、即時性或可信度，該等個人、公司或組織亦不因此而當然與ＮＥＥＤ有任何僱佣、委任、代理、合夥或其他類似之關係。</p>";
		 out+="            <p>		 二十一、損害賠償：</p>";
		 out+="            <p>		 因會員違反相關法令或違背本會員規範之任一條款，致ＮＥＥＤ或其關係企業、受僱人、受託人、代理人及其他相關履行輔助人因而受有損害或支出費用（包括且不限於因進行民事、刑事及行政程序所支出之合理律師費用）時，會員應自行負擔損害賠償責任或填補其費用。</p>";
		 out+="            <p>		 二十二、會員規範之修改：</p>";
		 out+="            <p>		 ＮＥＥＤ有權於任何時間修改或變更本服務條款之內容，建議您隨時注意該等修改或變更。您於任何修改或變更後繼續使用本服務，視為您已閱讀、瞭解並同意接受該等修改或變更。如果您不同意本服務條款的內容，或者您所屬的國家或地域排除本服務條款內容之全部或一部時，您應立即停止使用本服務。</p>";
		 out+="            <p>		 當您開始使用本服務時，即表示您已充分閱讀、瞭解與同意接受本條款之內容。本公司有權於任何時間修改與變更本條款之內容，並將不個別通知會員，建議您定期查閱本服務條款。如您於本條款修改與變更後仍繼續使用本服務，則視為您已閱讀、瞭解與同意接受本條款修改或變更。</p>";
		 out+="            <p>		 本公司有權暫時或永久修改或中止提供本服務給您，您不得因此要求任何賠償。</p>";
		 out+="            <p>		 二十三、個別條款之效力：</p>";
		 out+="            <p>		 本會員規範所定之任何會員條款之全部或部份無效時，不影響其他條款之效力。</p>";
		 out+="            <p>		 二十四、準據法及管轄法院：</p>";
		 out+="            <p>		 本會員規範之解釋及適用以及會員因使用本服務而與ＮＥＥＤ間所生之權利義務關係，應依中華民國法令解釋適用之。因此所生之爭議，除法律另有規定者外，以中華民國台北地方法院為第一審管轄法院。</p>";
		 out+="            <p>		 二十五、其他規定</p>";
		 out+="            <p>		 1.本網站使用者條約，免責之內容，亦構成本使用條款之一部分。</p>";
		 out+="            <p>		 2.若因您使用本服務之任何行為，導致本公司遭第三人或行政機關之調查或追訴時，本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。</p>";
		 out+="            <p>		 3.本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前告知會員，不可預料及無預警之系統崩潰必須暫停服務時不在此列。</p>";
		 out+="            <p>		 二十六、會員身份終止與本公司通知之義務：</p>";
		 out+="            <p>		 1.本公司具有更改各項服務內容或終止任一會員帳戶服務之權利。</p>";
		 out+="            <p>		 2.若會員決定終止本公司會員資格，有義務經由本公司所提供之機制通知本公司，本公司將儘快註銷您的會員資料（以本公司發出通知日期為準），註銷後即喪失所有本公司提供之權益。</p>";
		 out+="            <p>		 二十七、關於ＮＥＥＤ上的虛擬貨幣與相關活動</p>";
		 out+="            <p>		 1.ＮＥＥＤ網站設有累積升級功能，每位已註冊的會員在網站上進行活動即可能依盛事科技股份有限公司（ＮＥＥＤ）之規定累積貢獻值，當貢獻值累積到一定點數後就可依ＮＥＥＤ之公告活動內容規定參加盛事科技股份有限公司（ＮＥＥＤ）的活動。盛事科技股份有限公司（ＮＥＥＤ）保留變更或取消「貢獻值取得及使用內容方式」之權利，惟ＮＥＥＤ於變更或取消前會先為公告於ＮＥＥＤ網站，新的「貢獻值取得及使用內容方式」自公告時生效。</p>";
		 out+="            <p>		 2.任何利用程式Bug或其他不正當方法賺取貢獻值，或竄改貢獻值之行為，盛事科技股份有限公司（ＮＥＥＤ）都可收回會員不當累積的貢獻值，或可取消活動或宣佈該次活動無效、或以其他適當方式處理之。</p>";
		 out+="            <p>		 3.活動之中獎會員應自行負擔所有依政府法令規定之義務，例如稅賦。</p>";
		 out+="            <p>		 4.會員如係無行為能力人，應由法定代理人或監護人代該會員以該會員帳號參加活動。</p>";
		 out+="            <p>		 會員如係限制行為能力人，其若欲參加活動應得法定代理人或監護人允許或輔助人之同意。</p>";
		 out+="            <p>		 5.本站提供免運費服務的範圍只限台灣本島。若送貨地點為離島等地時，目前暫不提供寄送服務。</p>";

		 /*
		 ■ＮＥＥＤ會員規範
		 歡迎來到ＮＥＥＤ社群網站（以下簡稱ＮＥＥＤ）！為了保障您的權益，在註冊前請先詳細閱讀本會員規範之所有內容，當您選擇完成註冊即視為您已閱讀完本會員規範，並同意遵守以下所有規範內容。
		 若您不同意以下所述全部或部分規範內容，您即無法完成會員註冊，將無法使用ＮＥＥＤ網站部分服務或參與相關活動。
		 一、會員服務條款
		 1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成註冊並通過認證者。
		 2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。
		 3.本站保留有審核加入會員資格及有解除其會員資格之權利。
		 4.本會員服務條款之修訂，適用於所有會員。
		 5.所有申請使用盛事科技股份有限公司（ＮＥＥＤ）會員服務的使用者，都應該詳細閱讀下列使用條款，這些使用條款訂立的目的，是為了保護盛事科技股份有限公司（ＮＥＥＤ）會員服務的提供者以及所有使用者的利益，並構成使用者與盛事科技股份有限公司（ＮＥＥＤ）會員服務的提供者之間的契約，使用者完成註冊手續、或開始使用盛事科技股份有限公司所提供之會員服務時，即視為已知悉並同意本會員規範的所有約定。
		 6. 盛事科技股份有限公司（ＮＥＥＤ）針對本網站擁有最終解釋權。
		 如您是法律上之無行為能力人或限制行為能力人(如未滿20歲之未成年人)，於加入會員前，請將本服務使用條款交由您的法定代理人(如父母、輔助人或監護人)閱讀，並得到其同意，您才可註冊及使用盛事科技股份有限公司（ＮＥＥＤ）所提供之會員服務。
		 當您開始使用盛事科技股份有限公司（ＮＥＥＤ）所提供之註冊會員服務時，視同您的法定代理人(如父母、輔助人或監護人)已閱讀、了解並同意本服務條款。
		 二、遵守會員規範：
		 在您於ＮＥＥＤ註冊成為會員後，可以使用ＮＥＥＤ所提供之各種服務及ＮＥＥＤ之特定服務，您可能須於使用該特定服務前同意相關使用規範。當您使用ＮＥＥＤ服務時，即表示同意接受ＮＥＥＤ之會員規範及其他ＮＥＥＤ所公告之規範或注意事項之約束。
		 三、會員
		 1.使用本站所提供之會員服務時，須以加入會員時所登錄之帳號及密碼使用之。
		 2.會員須善盡管理會員帳號及密碼之責任。對於使用該會員之帳號及密碼(不論會員本身或其他人)利用本站服務所造成或衍生之所有行為及結果，會員須自行負擔全部法律責任。
		 3.會員之帳號及密碼遺失，或發現無故遭第三者盜用時，應立即通知本站連絡掛失。若因未即時通知，導致本站無法有效防止及修改時，所造成的所有損失，會員應自負全責。
		 4.每次結束使用本服務，會員須登出並關閉視窗，以確保您的會員權益。
		 5.盜用他人會員之帳號及密碼，導致第三者或本公司遭他人訴訟或行政機關之調查、追訴時，第三者或本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。
		 四、會員登錄資料
		 1.會員登錄資料應提供您本人正確、最新及完整的資料。
		 2.會員登錄資料不得有偽造、不實等之情事，一經發現，本公司得以拒絕、暫停或終止其會員資格，若違反中華民國相關法律，亦將依法追究。
		 3.會員登錄之各項資料有變更時，應不定期更新，以保其正確及完整性。若您提供的資料有錯誤或不符等現象，本網站有權暫停或終止您的會員資格，並拒絕您繼續使用本服務。
		 4.未經會員本人同意，本公司不會將會員資料揭露給第三者，唯資料共用原則... (請參閱本站「隱私權保護聲明」相關規定)等不在此限。
		 ■隱私權保護聲明
		 a.本網站會保護每一位使用者的隱私，不管是您的申請帳號、個人資料、郵件位址、或所儲存的網站資料，除了可能涉及違法、侵權、或違反使用條款、或長達一年沒有登入進行任何系統儲存動作、或經會員本人同意以外，本網站不會任意監視、增刪、修改或關閉，或將個人資料及郵件內容交予第三者，包括贊助之廣告廠商。
		 b.本網站有部份特定服務是與其他合作廠商共同經營，如果您不願將個人資料揭露給其他合作伙伴，可以選擇不同意使用這些特定服務。為完成這些特定服務，本網站可能將您個人的資料揭露給合作伙伴，但會在提供會員資料前告知會員。
		 c.   在下列的情況下，本網站有可能會查看或提供您的資料給有權機關、或主張其權利受侵害並提出適當證明之第三人：
		 c.1. 依法令規定、或依司法機關或其他有權機關的命令；
		 c.2. 為執行本使用條款、或使用者違反使用條款；
		 c.3. 為保護盛事科技股份有限公司（NEED）會員服務系統之安全或經營者之合法權益；
		 c.4. 為保護其他使用者其他第三人的合法權益；
		 c.5. 為維護盛事科技股份有限公司（NEED）會員服務系統的正常運作。
		 d.經會員註冊成功後，為增加會員服務範圍，不須另行註冊即享有本公司各項產品之會員資格，本公司將於各產品內進行會員資料的建檔、揭露、轉介、或交互運用，但本公司仍保有拒絕或暫停產品服務的權利。
		 e.NEED社群也自動接收並記錄您電腦和瀏覽器上的資料，包括 IP位址、NEED社群cookie中的資料、使用之軟體和硬體以及您瀏覽的網頁紀錄。在您使用NEED社群產品及服務期間，NEED社群將資料用作以下用途：改善NEED社群產品與服務品質、聯絡您、進行研究，以及提供內部及外部客戶不載有個人資料之市場分析或業務報告。
		 5.會員應妥善保管密碼，不可將密碼洩露或提供給他人知道或使用；以同一個會員身分證字號和密碼使用本服務所進行的所有行為，都將被認為是該會員本人和密碼持有人的行為。
		 6.會員如果發現或懷疑有第三人使用其會員身分證字號或密碼，應該立即通知本公司，採取必要的防範措施。但上述通知不得解釋為本公司對會員負有任何形式之賠償或補償之責任或義務。
		 五、註冊資料：
		 您同意於註冊時提供完整詳實且符合真實之個人資料，您所登錄之資料事後若有變更時，應隨時更新。若有需要由ＮＥＥＤ協助處理客戶服務事項時，
		 ＮＥＥＤ會核對您的個人資料，若與註冊時所登錄之資料不符時，ＮＥＥＤ將無法對您提供相關服務。
		 若您提供之個人資料有填寫不實或原登錄之資料不實而未更新，或是有任何誤導之嫌，ＮＥＥＤ將保留隨時終止您會員資格及使用ＮＥＥＤ之權利。您同意ＮＥＥＤ依法律或契約有需要通知您時，得以電子文件向您註冊時之電子郵件帳號為通知，並於通知送出時即視為產生送達之效力，請您提供正確且經常使用的電子郵件帳號，以維護您的權益。
		 六、使用行為
		 1.您使用本服務之一切行為必須符合當地或國際相關法令規範；對於使用者的一切行為，您須自行負擔全部法律責任。
		 2.您同意絕不為非法之目的或以非法方式使用本服務，與確實遵守中華民國相關法規及網際網路之國際慣例，並保證不得利用本服務從事侵害他人權益或違法之行為，否則您須自行負擔全部法律責任。
		 3.您於使用本站會員服務時應遵守以下規則：
		  a)不得使用有損他人人格或商標權、著作權、專利權等智慧財產權或其他權利內容。
		  b)不得使用違反公共秩序或善良風俗或其他不法之文字。
		  c) 不得使用強烈政治、宗教色彩的偏激言論。
		  d)未經本公司許可不得利用本服務或本網站所提供其他資源從事任何商業交易行為。
		  e)不得違反本站「會員規範」內容。
		 七、本公司專有權利
		 1.本服務所載，或本服務所連結之一切軟體或內容，或本公司之廣告商或合夥人所提供之內容，均受其著作權或其他專有權利或法律所保障。
		 2.當您傳輸資料至本公司提供之服務時，您即同意此一資料為全開放性(任何人均可瀏覽)。您授權並許可本公司得以重製、修飾、改編或以其他形式使用該內容之全部或一部分，及利用該內容製作衍生著作。衍生著作之著作權悉歸本公司所有。
		 3.本公司同意除依本使用條款約定，將前述您的資料及衍生著作置於本網站供網路使用者瀏覽，以及本公司所屬相關媒體外，絕不非法轉供其他直接營利目的或侵害您的權利之使用。
		 4.所有網頁之頁面出現之廣告看板與活動訊息，所有權及經營權均為本公司所有，使用者除事先取得本公司同意外，不得自行使用所有訊息。
		 5.會員同意並授權本網站，得為提供個人化服務或相關加值服務之目的，提供所需之會員資料給合作單位(第三者)做約定範圍內之運用，如會員不同意將其資料列於合作單位(第三者)產品或服務名單內，可通知本網站於名單中刪除其資料，並同時放棄其本網站以外之購物優惠或獲獎權利。
		 6.同時為提供行銷、市場分析、統計或研究、或為提供會員個人化服務或加值服務之目的，會員同意本公司、或本公司之策略合作夥伴，得記錄、保存、並利用會員在本網站所留存或產生之資料及記錄，同時在不揭露各該資料之情形下得公開或使用統計資料。
		 7.對於會員所登錄之個人資料，會員同意本網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或行銷研究。
		 八、隱私權政策：
		 您所提供的註冊資訊及其他於利用本網站服務時所提供之個人資料，ＮＥＥＤ將依【隱私權政策】進行蒐集、利用與保護。
		 九、會員內容：
		 若您使用ＮＥＥＤ服務發表及分享您所創作之文字、美術、照片、視訊等著作，或其他利用ＮＥＥＤ服務所為之討論、對話等（以下稱「會員內容」）時，您同意聲明並擔保會員內容為您所自行創作，並未侵害任何第三人之智慧財產權或其他權益，亦未違反任何法令之規定。
		 請注意：您須為您所提供之會員內容負各種法律上責任，若涉有違法情事，
		 ＮＥＥＤ亦將於配合法院、檢調機關、政府機關相關程序提供相關資料。若涉有侵害他人智慧財產權或其他權益之情事者，ＮＥＥＤ得終止您全部或部分服務。
		 為維護ＮＥＥＤ網站服務品質，您同意會員內容除須依據各該服務之板規或其他已公告之個別條款或細部規定為適當之發表外，亦不得有任何違反網路禮節、令人不愉快、令人厭惡、猥褻、暴力或其他ＮＥＥＤ認為不適當之內容。
		 ＮＥＥＤ對於使用者內容並不會進行事前過濾，惟ＮＥＥＤ保留(但無義務)對於會員內容予以刪除或禁止存取之權利。
		 會員內容之著作權，屬於您所享有。您同意無條件授權會員內容予ＮＥＥＤ，得為ＮＥＥＤ網站營運，或為行銷、宣傳ＮＥＥＤ網站等目的範圍內為利用，並得於前開目的範圍內再授權他人使用。如有其他利用需求，ＮＥＥＤ將另行取得您的授權。
		 十、終止授權
		 您使用本服務之行為若有任何違反法令或本使用條款或危害本網站或第三者權益之虞時，本公司有權不經告知您，立即暫時或永久終止您使用本服務之授權。
		 基於公司的運作，本網站有可能變更、或停止提供服務之全部或一部，使用者不可以因此而要求賠償或補償
		 十一、會員的義務與責任：
		 會員對本身於ＮＥＥＤ或透過ＮＥＥＤ傳輸的一切內容自負全責，您亦不得將會員帳號同意他人使用或移轉予他人，並同意遵守下列規定：
		 1.會員承諾遵守中華民國相關法規及一切國際網際網路規定與慣例。
		 2.會員同意並保證不公布或傳送任何毀謗、不實、威脅、不雅、猥褻、不法、攻擊性、毀謗性或侵害他人智慧財產權的文字，圖片或任何形式的檔案於 ＮＥＥＤ上。
		 3.會員同意不會於ＮＥＥＤ上從事廣告或販賣商品行為，包括虛擬寶物、遊戲點數卡或其他商品或服務之交易行為等。
		 4.會員同意避免在公眾討論區討論私人事務，發表文章時，請尊重他人的權益及隱私權。
		 ＮＥＥＤ就會員的行為是否符合會員規範有最終決定權。若ＮＥＥＤ決定會員的行為違反本會員規範或任何法令，會員同意ＮＥＥＤ得隨時停止帳號使用權或清除帳號，並停止使用ＮＥＥＤ。會員在違反法律規定之情事，應自負法律責任。
		 十二、免責事項
		 1.下列情形發生時，本網站有權可以停止、中斷提供本服務：
		  a)對本服務相關軟硬體設備進行更換、升級、保養或施工時。
		  b)發生突發性之電子通信設備故障時。
		  c)天災或其他不可抗力之因素致使本網站無法提供服務時。
		 2.本公司對於使用者在使用本服務或使用本服務所致生之任何直接、間接、衍生之財產或非財產之損害，不負賠償責任。
		 3.使用者對於上傳留言之文字、圖片及其它資料，應自行備份；本公司對於任何原因導致其內容全部或一部之滅失、毀損，不負任何責任。
		 4.本公司對使用本服務之用途或所產生的結果，不負任何保證責任，亦不保證與本服務相關之軟體無缺失或會予以修正。
		 5.對於您在本站中的所有言論、意見或行為僅代表您個人；不代表本公司的立場，本公司不負任何責任。本公司對於使用者所自稱之身分，不擔保其正確性。
		 6.本公司無須對發生於本服務或透過本服務所涉及之任何恐嚇、誹謗、淫穢或其他一切不法行為對您或任何人負責。
		 7.對於您透過本服務所購買或取得，或透過本公司之贊助者或廣告商所刊登、銷售或交付之任何貨品或服務，您應自行承擔其可能風險或依法向商品或服務提供者交涉求償，與本公司完全無關，本公司均不負任何責任。
		 十三、服務之停止與更改：
		 1.於發生下列情形之一時，ＮＥＥＤ有權停止或中斷提供服務：
		 a)對ＮＥＥＤ之設備進行必要之保養及施工時。
		 b)發生突發性之設備故障時。
		 c)由於ＮＥＥＤ所申請之 ISP 業者無法提供服務時。
		 d)因天災等不可抗力之因素致使ＮＥＥＤ無法提供服務時。
		 c)其他本公司不可預測之因素。
		 2.ＮＥＥＤ可能因公司或 ISP 業者網路系統軟硬體設備之故障、失靈或人為操作上之疏失而造成全部或部份中斷、暫時無法使用、延遲或造成資料傳輸或儲存上之錯誤、或遭第三人侵入系統篡改或偽造變造資料等，ＮＥＥＤ將盡力回復相關服務之正常運作，會員不得因此而要求任何補償。
		 3.如因故ＮＥＥＤ網站須終止營運，ＮＥＥＤ將於終止前於網站公告，
		 您應自行保留使用ＮＥＥＤ所生之各種資料或記錄。
		 十四、保管及通知義務：
		 您有責任維持密碼及帳號的機密安全。除可依法證明非您本身或授意他人所為者外，您必須完全負起因利用該密碼及帳號所進行之一切行為之責任。
		 當密碼或帳號遭到未經授權之使用，或發生其他任何安全問題時，您必須立即通知ＮＥＥＤ，以減少相關損害。建議您於公用電腦使用完畢，務必登出您的帳號。因您未遵守本項約定所生之任何損失或損害，我們將無法亦不予負責。
		 十五、特別同意事項：
		 您同意於ＮＥＥＤ所發表之一切內容僅代表您個人之立場與行為，並同意承擔所有相關衍生之責任，ＮＥＥＤ不負任何責任。
		 您亦同意若因其他會員行為造成您權利的損害或其他困擾時，不會對ＮＥＥＤ行使或主張任何權利或賠償。
		 十六、責任限制：
		 您認知並了解ＮＥＥＤ乃依其現狀及使用時之狀況提供服務，您須自行承擔使用ＮＥＥＤ網站服務時之風險。ＮＥＥＤ並未對網站服務可符合您使用上之需求及任何錯誤之修正為任何明示或默示的擔保。
		 ＮＥＥＤ對您使用ＮＥＥＤ網站服務或與ＮＥＥＤ網站連結之其他網站下載的圖檔、軟體或資料等，不負任何擔保責任。您應於下載前自行斟酌與判斷前述資料之合適性、有效性、正確性、完整性、及是否侵害他人權利，以免遭受損失，ＮＥＥＤ對於該等損失不負任何賠償責任。
		 您同意若依法ＮＥＥＤ須負賠償責任時，單一事件之賠償上限為您於該賠償事件發生前一個月使用本網站特定服務產生之費用。
		 十七、擔保責任免除：
		 1.ＮＥＥＤ保留隨時更改或調整各項服務內容之權利，無需事先通知會員。ＮＥＥＤ得依其判斷對於違反會員規範或相關規定之會員帳號終止其使用之權利。無論任何情形，就停止或更改服務或終止會員帳號使用所可能產生之困擾、不便或損害，會員同意不對ＮＥＥＤ有任何主張。
		 2.ＮＥＥＤ保留將來新增、修改或刪除各項服務之全部或一部之權利，且不另行個別通知，會員不得因此而要求任何補償或賠償。
		 3.廠商或個人可能透過ＮＥＥＤ之服務或經由服務連結至其他網站、營業處所提供商品買賣、服務或其他交易行為。會員若因此直接與該等廠商或個人直接進行交易，各該買賣或其他合約均僅存在您與各該廠商或個人兩造之間。ＮＥＥＤ除聲明不介入兩造之任何行為外，對於您所獲得的商品、服務或其他交易標的物亦不負任何擔保責任。
		 4.ＮＥＥＤ提供之特定服務可能存在專屬之服務條款，在此情形下，雙方權利義務將依據該服務之專屬條款決定之。
		 十八、廣告或促銷行為：
		 ＮＥＥＤ上有關商業廣告及各種商品之促銷資訊，該等內容均係由廣告商或商品服務提供人所為，ＮＥＥＤ僅係提供刊登內容之平台。
		 會員透過ＮＥＥＤ上所提供之商品、服務資訊，所購買之任何非由ＮＥＥＤ所直接販售之商品或服務，其間交易關係均存在於會員與商品或服務提供人間，與ＮＥＥＤ無關。
		 十九、智慧財產權：
		 ＮＥＥＤ刊出之所有著作及資料（例如文章、圖片等）內容，其著作權、專利權、商標權、營業秘密及其他智慧財產權，皆為盛事科技股份有限公司或該內容之提供者所有，且受中華民國法令及國際法律的保障。
		 ＮＥＥＤ畫面資料之選擇、編排之版權為盛事科技股份有限公司所有，且受中華民國著作權法令及國際著作權法律的保障。非經本公司書面授權同意，不得以任何形式轉載、傳輸、傳播、散布、展示、出版、再製或利用
		 ＮＥＥＤ內容的局部、全部的內容，以免觸犯相關法律規定。未經本公司書面同意，您不得擅自複製、進行還原工程（reverse engineering）、解編（de-compile）或反向組譯（disassemble）ＮＥＥＤ之任何功能或程式。
		 除本公司外任何人不得逕行使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。如欲引用或轉載前述之軟體、程式或網站內容，必須依法取得本網站或其他權利人的事前書面同意。如有違反之情事，您應對本網站或其他權利人負損害賠償責任（包括但不限於訴訟費用及律師費用等）。
		 二十、連結：
		 ＮＥＥＤ在網站或相關網頁上所提供之所有連結，可能連結到其他個人、公司或組織之網站，提供該連結之目的，僅為便利站友搜集或取得資訊，ＮＥＥＤ對於被連結之該等個人、公司或組織之網站上所提供之產品、服務或資訊，既不擔保其真實性、完整性、即時性或可信度，該等個人、公司或組織亦不因此而當然與ＮＥＥＤ有任何僱佣、委任、代理、合夥或其他類似之關係。
		 二十一、損害賠償：
		 因會員違反相關法令或違背本會員規範之任一條款，致ＮＥＥＤ或其關係企業、受僱人、受託人、代理人及其他相關履行輔助人因而受有損害或支出費用（包括且不限於因進行民事、刑事及行政程序所支出之合理律師費用）時，會員應自行負擔損害賠償責任或填補其費用。
		 二十二、會員規範之修改：
		 ＮＥＥＤ有權於任何時間修改或變更本服務條款之內容，建議您隨時注意該等修改或變更。您於任何修改或變更後繼續使用本服務，視為您已閱讀、瞭解並同意接受該等修改或變更。如果您不同意本服務條款的內容，或者您所屬的國家或地域排除本服務條款內容之全部或一部時，您應立即停止使用本服務。
		 當您開始使用本服務時，即表示您已充分閱讀、瞭解與同意接受本條款之內容。本公司有權於任何時間修改與變更本條款之內容，並將不個別通知會員，建議您定期查閱本服務條款。如您於本條款修改與變更後仍繼續使用本服務，則視為您已閱讀、瞭解與同意接受本條款修改或變更。
		 本公司有權暫時或永久修改或中止提供本服務給您，您不得因此要求任何賠償。
		 二十三、個別條款之效力：
		 本會員規範所定之任何會員條款之全部或部份無效時，不影響其他條款之效力。
		 二十四、準據法及管轄法院：
		 本會員規範之解釋及適用以及會員因使用本服務而與ＮＥＥＤ間所生之權利義務關係，應依中華民國法令解釋適用之。因此所生之爭議，除法律另有規定者外，以中華民國台北地方法院為第一審管轄法院。
		 二十五、其他規定
		 1.本網站使用者條約，免責之內容，亦構成本使用條款之一部分。
		 2.若因您使用本服務之任何行為，導致本公司遭第三人或行政機關之調查或追訴時，本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。
		 3.本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前告知會員，不可預料及無預警之系統崩潰必須暫停服務時不在此列。
		 二十六、會員身份終止與本公司通知之義務：
		 1.本公司具有更改各項服務內容或終止任一會員帳戶服務之權利。
		 2.若會員決定終止本公司會員資格，有義務經由本公司所提供之機制通知本公司，本公司將儘快註銷您的會員資料（以本公司發出通知日期為準），註銷後即喪失所有本公司提供之權益。
		 二十七、關於ＮＥＥＤ上的虛擬貨幣與相關活動
		 1.ＮＥＥＤ網站設有累積升級功能，每位已註冊的會員在網站上進行活動即可能依盛事科技股份有限公司（ＮＥＥＤ）之規定累積貢獻值，當貢獻值累積到一定點數後就可依ＮＥＥＤ之公告活動內容規定參加盛事科技股份有限公司（ＮＥＥＤ）的活動。盛事科技股份有限公司（ＮＥＥＤ）保留變更或取消「貢獻值取得及使用內容方式」之權利，惟ＮＥＥＤ於變更或取消前會先為公告於ＮＥＥＤ網站，新的「貢獻值取得及使用內容方式」自公告時生效。
		 2.任何利用程式Bug或其他不正當方法賺取貢獻值，或竄改貢獻值之行為，盛事科技股份有限公司（ＮＥＥＤ）都可收回會員不當累積的貢獻值，或可取消活動或宣佈該次活動無效、或以其他適當方式處理之。
		 3.活動之中獎會員應自行負擔所有依政府法令規定之義務，例如稅賦。
		 4.會員如係無行為能力人，應由法定代理人或監護人代該會員以該會員帳號參加活動。
		 會員如係限制行為能力人，其若欲參加活動應得法定代理人或監護人允許或輔助人之同意。
		 5.本站提供免運費服務的範圍只限台灣本島。若送貨地點為離島等地時，目前暫不提供寄送服務。
		 */
	   out+="        </div>";
		popbasefull(out);
}
popprivacy=function(){//隱私
		var out="";
	   out+="        <header>";
	   out+="            <div class='link back applebtn popfullclose' >";
	   out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	   out+="                <span>返回</span>";
	   out+="            </div>";
	   out+="            <div class='link word'>隱私權與社群平台著作權</div>";
	   out+="            <br clear='both'>";
	   out+="        </header>";
	   out+="        <div class='word-html'>";
		 out+="            <p>		 ■NEED社群平台隱私權政策</p>";
		 out+="            <p>		 「NEED社群平台」是由「盛事科技股份有限公司」所經營；為了支持個人資料的保護，以維護線上隱私權，「NEED社群平台」謹以下列聲明，對外說明「NEED社群平台」相關網站在線上搜集使用者個人資料的方式、範圍、利用方法、以及查詢或更正的方式等事項</p>";
		 out+="            <p>		 請您仔細閱讀以下各項說明，若您不同意我們的做法，請暫時不要參與我們網站上的活動。當然您也可以告訴我們您的想法，若有任何意見或疑問，請利用聯絡我們回報系統提出您的疑義。</p>";
		 out+="            <p>		 ◎本隱私權政策適用範圍</p>";
		 out+="            <p>		 本隱私權政策適用於NEED社群平台網站（本站）相關個人資料蒐集、處理及利用事宜。</p>";
		 out+="            <p>		 本隱私權保護政策不適用於NEED社群平台以外的網站，您認知並了解瀏覽本站服務時，在某些情形下，您可能會因超連結而被導致第三者所提供之網站。例如：點選廣告、閱讀某則資訊或網友張貼之內容。本隱私權政策不適用於經前述超連結所指向的網站，因此，誠摯地在此提醒您，當您離開NEED社群平台進入其他網站時，請別忘了先閱讀該網站所提供的隱私權條款，再決定您是否繼續接受該網站的服務。</p>";
		 out+="            <p>		 ◎個人資料取得</p>";
		 out+="            <p>		 「NEED社群平台」會記錄使用者上站的位址、以及在「NEED社群平台」相關網站內的瀏覽活動等資料，但是這些資料僅供作流量分析和網路行為調查，以便於改善「NEED社群平台」相關網站的服務品質，這些資料也只是總量上的分析，不會和特定個人相連繫。</p>";
		 out+="            <p>		 在某些情況下，例如當使用者要求加入會員或參加其他活動時，「NEED社群平台」相關網站或其合作對象可能會要求使用者登錄個人資料，以便於和使用者聯繫並提供服務；在此等情況下，「NEED社群平台」相關網站或其合作對象將明白告知使用者此等事實，如果使用者選擇不接收任何廣告或聯繫資訊，「NEED社群平台」將完全予以尊重。</p>";
		 out+="            <p>		 「NEED社群平台」相關網站或網頁都可能包含其他網站或網頁的連結，對於此等不屬於「NEED社群平台」之網站或網頁，不論關於其內容或隱私權政策，均與「NEED社群平台」無關。</p>";
		 out+="            <p>		 ◎個人資料蒐集應告知事項</p>";
		 out+="            <p>		 蒐集主體：盛事科技股份有限公司</p>";
		 out+="            <p>		 蒐集之目的：</p>";
		 out+="            <p>		 ○八八 消費者、客戶管理與服務、</p>";
		 out+="            <p>		 一五○ 廣告和商業行為管理業務、</p>";
		 out+="            <p>		 一七三 其他經營合於營業登記項目或組織章程所定之業務、</p>";
		 out+="            <p>		 一七六 其他契約、類似契約或法律關係管理之事務或業務</p>";
		 out+="            <p>		 個人資料之類別：</p>";
		 out+="            <p>		 C○○一 識別個人者，如：姓名、電話號碼、地址、帳號等、</p>";
		 out+="            <p>		 C○一一 個人描述，如：年齡、性別、出生年月日等、</p>";
		 out+="            <p>		 C○三五 休閒活動及興趣、</p>";
		 out+="            <p>		 C○七三 安全細節，如：本站密碼、</p>";
		 out+="            <p>		 C一三二 未分類之資料，如：電子郵件往來、網站訊息往來。</p>";
		 out+="            <p>		 個人資料利用期間：會員期間及會員關係終止後 6 個月，惟會員關係終止後 6 個月內之期間，我們不會就會員的資料為積極利用；</p>";
		 out+="            <p>		 個人資料利用地區：本公司伺服器及備援伺服器所在地；</p>";
		 out+="            <p>		 個人資料利用對象：限於本公司及為達成契約目的所必要之金流、物流、第三方廣告業者或其他協力廠商，若有與合作廠商共同蒐集之情形，將於蒐集時告知會員；</p>";
		 out+="            <p>		 個人資料利用方式：於蒐集目的之特定範圍及依本隱私權政策為利用。</p>";
		 out+="            <p>		 ◎個人資料蒐集之補充說明：</p>";
		 out+="            <p>		 NEED社群平台將於下述情形蒐集您的個人資料：</p>";
		 out+="            <p>		 1.當您加入NEED社群平台會員時，我們會要求您填寫基本的個人資料。</p>";
		 out+="            <p>		 2.當您參加我們所舉辦的任何活動，我們將視活動性質而請您登錄相關個人資料；若有與廠商共同蒐集者，將於活動辦法中說明。</p>";
		 out+="            <p>		 3.當您投稿、有客戶服務需求或其他有身分確認或金流往來之需求時，我們會基於稅法或核對身分需求，請您提供身分證影本、銀行帳戶或其他個人資料。</p>";
		 out+="            <p>		 4.您於使用本站時，本站伺服器會自動留存您上線時間、IP位址及站內活動資訊。 </p>";
		 out+="            <p>		 ◎個人資料的修改與刪除：</p>";
		 out+="            <p>		 當您在NEED社群平台註冊成為會員後，除系統禁止變更之資料（例如：姓名、性別、生日、身份證字號等）外，您可以隨時利用您的會員帳號和密碼更改您原先提供的資料，以確保其正確性。</p>";
		 out+="            <p>		 您認知並了解您所能修改的資料並不包括您以往在本站之服務內容記錄。</p>";
		 out+="            <p>		 您認知並同意NEED社群平台於會員帳號刪除時，您的個人資料將保留至少 6 個月，以備相關爭議查證之用。為避免他人在帳號刪除時，重新註冊相同的會員帳號產生身分混淆困擾，該等帳號將保留不提供後續註冊使用。</p>";
		 out+="            <p>		 ◎個人資料的揭露：</p>";
		 out+="            <p>		 除依本隱私權政策為利用外，NEED社群平台不會在未經您同意的狀況下向任何人出售或提供您的個人資料。您同意NEED社群平台得於下述情形對外利用或揭露您的個人資料：</p>";
		 out+="            <p>		 1.若您的行為違反NEED社群平台的服務條款，或可能損害NEED社群平台權益，或您的行為已導致任何人遭受損害，揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</p>";
		 out+="            <p>		 2.檢警調或司法單位或其他有權機關依法或基於公共利益，要求NEED社群平台提供特定個人資料時，經NEED社群平台考量依法或基於公共利益予以配合者。</p>";
		 out+="            <p>		 3.其他為履行法定義務或依法得對第三人揭露的情形。</p>";
		 out+="            <p>		 為了保護使用者個人隱私，我們無法為您查詢其他使用者的帳號資料，敬請見諒！若您有相關法律上問題需查閱他人資料時，請務必向警政單位提出告訴，我們將全力配合警政單位調查並提供所有相關資料以協助調查。</p>";
		 out+="            <p>		 ◎關於Cookie的使用： </p>";
		 out+="            <p>		 「Cookie」是一種儲存於使用者電腦端的小型資訊檔案，可配合瀏覽器的使用作為使用者電腦與網站互動時識別或讀取使用者的偏好設定之用，為會員制網站所普遍使用。NEED社群平台為提昇使用者使用本站之便利性，若您的瀏覽器的偏好設定允許cookie，NEED社群平台網站伺服器將會送出 cookie 至您的電腦。您可以隨時變更您的瀏覽器的設定，決定是否允許NEED社群平台網站設定或讀取您電腦端的 cookie。</p>";
		 out+="            <p>		 ◎兒童隱私保護：</p>";
		 out+="            <p>		 NEED社群平台網站並未刻意設計或提供吸引兒童（未滿12歲）內容或機制，亦無意透過本站蒐集兒童或其法定代理人之個人資料。然而社群網站內容來源複雜，為確保兒童隱私權，若您為兒童，請勿註冊本站會員，並避免與陌生網友互動。</p>";
		 out+="            <p>		 ◎個人資料處理委託第三人事宜</p>";
		 out+="            <p>		 由於電子商務及其他線上服務無可避免需使用第三方所提供之金流、物流或直接由原廠或經銷商供貨或提供預購贈品、保固服務等，因此，有關電子商務或線上服務交易之必要資訊，將會提供予第三方進行處理及利用，我們將透過契約要求第三方合作廠商應依個人資料保護法等相關法令確保您個人資料之安全，並禁止第三方用於該交易以外之利用。若您發現有第三方有任何違反前開原則之行為時，請您儘速予我們聯繫，我們將協助您釐清個人資料是否遭第三方濫用或其他違法情形，以利您依法主張權利。</p>";
		 out+="            <p></p>";
		 out+="            <p>		 ■NEED社群平台著作權聲明</p>";
		 out+="            <p>		 會員於使用本站服務或於本站發表圖文或其他著作前，請您先同意下列事項，若您不同意下列事項， 請勿使用本站服務或於本站發表著作。 </p>";
		 out+="            <p>		 1.您保證您係為您所發表於NEED社群平台之文章及其他各種著作之著作人，或您確有得到著作權人之授權而發表，否則應對NEED社群平台負損害賠償責任。</p>";
		 out+="            <p>		 2. NEED社群平台會員於NEED社群平台所發表之文章、圖像或其他各種著作之著作權為其著作權人所有。 </p>";
		 out+="            <p>		 3. 若是您要重製、公開口述、公開播送、公開上映、公開演出、公開傳輸、改作、散布、公開展示、發行或公開發表任何NEED社群平台內登載之任何內容，請先得到著作權人之同意。尊重智慧財產權是您應盡的義務，如有違反，您應對權利人負損害賠償責任。</p>";
		 out+="            <p>		 4.您若認為NEED社群平台網站內某些內容涉及侵權或有其他不妥之處，請您逕向該內容提供者反應意見。</p>";
		 out+="            <p>		 5.您有權同意NEED社群平台得將會員發表於本站網域「.com.tw」及其下各次級網域內之著作以不同形式呈現及彙整於NEED社群平台網站中，以供網友查詢及閱讀。但於未經著作權人同意前，NEED社群平台無權將著作刊載於非網路形式之書報雜誌刊物。 </p>";
		 out+="            <p>		 6.您同意瀏覽NEED社群平台網站之網友在非營利用途下，得下載或列印您所發表之圖文內容。 </p>";
		 out+="            <p>		 7.您同意NEED社群平台之管理人員在註明著作人格權人名稱及不變更原圖文內容情況下，得以將圖文編排收錄至精華區中。 </p>";
		 out+="            <p>		 8.您同意若您所發表之圖文或其他內容有違反本站會員條款或國家法令之情形時，NEED社群平台之管理人員得刪除之。</p>";
		 out+="            <p>		 ◎電腦網路內容分級</p>";
		 out+="            <p>		 根據「電腦網路內容分級處理辦法」修正條文第六條第三款規定，已於網站首頁或各該限制級網頁，依台灣網站分級推廣基金會規定作標示。台灣網站分級推廣基金會( TICRF ) 網站：http://www.ticrf.org.tw</p>";
		 out+="            <p>		 兒少網路安全</p>";
		 out+="            <p>		 兒童篇</p>";
		 out+="            <p>		 1、如果在網路上看到讓你感覺怪怪的或不舒服的、令人討厭的文字、圖片或其他內容，請先暫時離開電腦，告訴你的家長，請他們幫忙；或是你可以先關掉網路，等到有大人陪你時再使用。</p>";
		 out+="            <p>		 2、在網路上洩露自己的資訊給陌生人是很危險的，千萬不要告訴別人自己和家人的私人資料，像是本名、身分證字號、電話、地址、或學校等；也不要把網路帳號的密碼告訴任何人。</p>";
		 out+="            <p>		 3、請遵守每個網站的遊戲規則，例如：當你看到網站上有註明「未滿十八歲者不可進入」，那你就應該立刻離開。</p>";
		 out+="            <p>		 4、如果遇到很友善、有趣、對你很好的網友，要記得：在網路上認識的人，現實生活中你們還是陌生人，他們不一定和他們看起來的一樣好，或是跟他們形容的一樣，所以不要隨便跟網友見面。即使真的有見面的必要，也一定要有大人陪同，絕對不可以單獨見面。</p>";
		 out+="            <p>		 5、收到不認識的人寄來的郵件，一定要立刻刪除，不要因為好奇而開啟附加檔案或連結，它很可能含有病毒，會損害你的電腦。</p>";
		 out+="            <p>		 6、許多免費分享的檔案可能是非法的，請不要任意複製、下載來路不明的音樂、影片、或其他類型的檔案，以免觸犯法律。</p>";
		 out+="            <p>		 7、請在網路上，任何人都可能看到你的行為，不可以對他人有不尊重的舉動。即使別人不知道你是誰，也不可以在網路上假扮成別人。</p>";
		 out+="            <p>		 家長篇</p>";
		 out+="            <p>		 使用網際網路是您的孩子必備的技能之一，網路雖然可以讓您的孩子學習更多知識，但也有許多不宜兒童發展的訊息是您的孩子隨手可得的，而且網路的匿名性也讓兒童易於在網路上進行不適當的互動。因此，當您的孩子要求使用網路時，請務必多加注意。遵守以下的幾項守則可以使您安心讓孩子們使用網路：</p>";
		 out+="            <p>		 1、網路上可能有色情、暴力等成人取向的資訊，為了讓您的孩子能使用一個乾淨無害的網路空間，請教育您的孩子盡量不要開啟這類資訊。並且經常檢查您孩子的連線記錄，以便了解未成年的孩童是否瀏覽過不應觀看的網頁；您或可選擇啟用瀏覽器中的分級警告器，以遠離這些資訊。</p>";
		 out+="            <p>		 2、您的孩子可能會洩露過多的個人資料給陌生人，這會威脅到您們的安全，請讓他們了解網路屬於公共場所，並督導他們不可將姓名、電話、地址、身分證字號等個人資料在網路上公開，以免受到有心人士利用。</p>";
		 out+="            <p>		 3、請不要讓您的孩子在沒有大人的監督下使用網路，請將電腦放置在全家都可使用的位置如客廳，並盡量撥空陪同他們使用電腦，教導他們如何利用網路以擴展知識、進行有益身心的娛樂。</p>";
		 out+="            <p>		 4、注意您的孩子在網路聊天室或留言板與他人的互動，請盡量不要讓您的孩子與網友會面，若有必要，也請您務必陪同他們，絕對不要讓孩子單獨與網友見面，並選擇安全的會面地點，盡量選在人多的公共場所，以便應付突發狀況。</p>";
		 out+="            <p>		 5、網路上分享的許多圖片、音樂、影片或文字檔案仍受到著作權法的保護，請教導您的孩子尊重著作權，不要下載非法的MP3或其他類型的檔案。</p>";
		 out+="            <p>		 6、孩童可能在不經意的狀況下誤使您的電腦受到病毒攻擊，請讓他們了解隨意下載軟體可能的危險性，不要任意開啟來路不明的電子郵件或下載不安全的軟體。</p>";
		 out+="            <p>		 7、請指導您的孩子尊重他人，不要發表帶有人身攻擊的言論；並請多加留意孩童瀏覽的聊天室或留言版，檢查是否散播不適當的言論。</p>";
		 out+="            <p>		 8、如果您的孩子希望在網路上購物，請他們務必在訂購物品前告訴您，不要讓他們在不安全的網站上進行交易，請選擇有信譽的網路賣場，並且注意商品的內容、金額及付款方式。</p>";
		 out+="            <p>		 檢舉色情內容</p>";
		 out+="            <p>		 請到終止童妓協會網站檢舉色情內容，以保護兒童上網安全。</p>";



/*
		 out+="            <p>     ■NEED社群平台隱私權政策</p>";
		 out+="            <p>		 「NEED社群平台」是由「盛事科技股份有限公司」所經營；為了支持個人資料的保護，以維護線上隱私權，「NEED社群平台」謹以下列聲明，對外說明「NEED社群平台」相關網站在線上搜集使用者個人資料的方式、範圍、利用方法、以及查詢或更正的方式等事項</p>";
		 out+="            <p>		 請您仔細閱讀以下各項說明，若您不同意我們的做法，請暫時不要參與我們網站上的活動。當然您也可以告訴我們您的想法，若有任何意見或疑問，請利用聯絡我們回報系統提出您的疑義。</p>";
		 out+="            <p>		 ◎本隱私權政策適用範圍</p>";
		 out+="            <p>		 本隱私權政策適用於NEED社群平台網站（本站）相關個人資料蒐集、處理及利用事宜。</p>";
		 out+="            <p>		 本隱私權保護政策不適用於NEED社群平台以外的網站，您認知並了解瀏覽本站服務時，在某些情形下，您可能會因超連結而被導致第三者所提供之網站。例如：點選廣告、閱讀某則資訊或網友張貼之內容。本隱私權政策不適用於經前述超連結所指向的網站，因此，誠摯地在此提醒您，當您離開NEED社群平台進入其他網站時，請別忘了先閱讀該網站所提供的隱私權條款，再決定您是否繼續接受該網站的服務。</p>";
		 out+="            <p>		 ◎個人資料取得</p>";
		 out+="            <p>		 「NEED社群平台」會記錄使用者上站的位址、以及在「NEED社群平台」相關網站內的瀏覽活動等資料，但是這些資料僅供作流量分析和網路行為調查，以便於改善「NEED社群平台」相關網站的服務品質，這些資料也只是總量上的分析，不會和特定個人相連繫。</p>";
		 out+="            <p>		 在某些情況下，例如當使用者要求加入會員或參加其他活動時，「NEED社群平台」相關網站或其合作對象可能會要求使用者登錄個人資料，以便於和使用者聯繫並提供服務；在此等情況下，「NEED社群平台」相關網站或其合作對象將明白告知使用者此等事實，如果使用者選擇不接收任何廣告或聯繫資訊，「NEED社群平台」將完全予以尊重。</p>";
		 out+="            <p>		 「NEED社群平台」相關網站或網頁都可能包含其他網站或網頁的連結，對於此等不屬於「NEED社群平台」之網站或網頁，不論關於其內容或隱私權政策，均與「NEED社群平台」無關。</p>";
		 out+="            <p>		 ◎個人資料蒐集應告知事項</p>";
		 out+="            <p>		 蒐集主體：盛事科技股份有限公司</p>";
		 out+="            <p>		 蒐集之目的：</p>";
		 out+="            <p>		 ○八八 消費者、客戶管理與服務、</p>";
		 out+="            <p>		 一五○ 廣告和商業行為管理業務、</p>";
		 out+="            <p>		 一七三 其他經營合於營業登記項目或組織章程所定之業務、</p>";
		 out+="            <p>		 一七六 其他契約、類似契約或法律關係管理之事務或業務</p>";
		 out+="            <p>		 個人資料之類別：</p>";
		 out+="            <p>		 C○○一 識別個人者，如：姓名、電話號碼、地址、帳號等、</p>";
		 out+="            <p>		 C○一一 個人描述，如：年齡、性別、出生年月日等、</p>";
		 out+="            <p>		 C○三五 休閒活動及興趣、</p>";
		 out+="            <p>		 C○七三 安全細節，如：本站密碼、</p>";
		 out+="            <p>		 C一三二 未分類之資料，如：電子郵件往來、網站訊息往來。</p>";
		 out+="            <p>		 個人資料利用期間：會員期間及會員關係終止後 6 個月，惟會員關係終止後 6 個月內之期間，我們不會就會員的資料為積極利用；</p>";
		 out+="            <p>		 個人資料利用地區：本公司伺服器及備援伺服器所在地；</p>";
		 out+="            <p>		 個人資料利用對象：限於本公司及為達成契約目的所必要之金流、物流、第三方廣告業者或其他協力廠商，若有與合作廠商共同蒐集之情形，將於蒐集時告知會員；</p>";
		 out+="            <p>		 個人資料利用方式：於蒐集目的之特定範圍及依本隱私權政策為利用。</p>";
		 out+="            <p>		 ◎個人資料蒐集之補充說明：</p>";
		 out+="            <p>		 NEED社群平台將於下述情形蒐集您的個人資料：</p>";
		 out+="            <p>		 1.當您加入NEED社群平台會員時，我們會要求您填寫基本的個人資料。</p>";
		 out+="            <p>		 2.當您參加我們所舉辦的任何活動，我們將視活動性質而請您登錄相關個人資料；</p>";
		 out+="            <p>		  若有與廠商共同蒐集者，將於活動辦法中說明。</p>";
		 out+="            <p>		 3.當您投稿、有客戶服務需求或其他有身分確認或金流往來之需求時，我們會基</p>";
		 out+="            <p>		  於稅法或核對身分需求，請您提供身分證影本、銀行帳戶或其他個人資料。</p>";
		 out+="            <p>		 4.您於使用本站時，本站伺服器會自動留存您上線時間、IP位址及站內活動資</p>";
		 out+="            <p>		  訊。 </p>";
		 out+="            <p>		 ◎個人資料的修改與刪除：</p>";
		 out+="            <p>		 當您在NEED社群平台註冊成為會員後，除系統禁止變更之資料（例如：姓名、性別、生日、身份證字號等）外，您可以隨時利用您的會員帳號和密碼更改您原先提供的資料，以確保其正確性。</p>";
		 out+="            <p>		 您認知並了解您所能修改的資料並不包括您以往在本站之服務內容記錄。</p>";
		 out+="            <p>		 您認知並同意NEED社群平台於會員帳號刪除時，您的個人資料將保留至少 6 個月，以備相關爭議查證之用。為避免他人在帳號刪除時，重新註冊相同的會員帳號產生身分混淆困擾，該等帳號將保留不提供後續註冊使用。</p>";
		 out+="            <p>		  		 ◎個人資料的揭露：</p>";
		 out+="            <p>		 除依本隱私權政策為利用外，NEED社群平台不會在未經您同意的狀況下向任何人出售或提供您的個人資料。您同意NEED社群平台得於下述情形對外利用或揭露您的個人資料：</p>";
		 out+="            <p>		 1.若您的行為違反NEED社群平台的服務條款，或可能損害NEED社群平台權益，或您的行為已導致任何人遭受損害，揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</p>";
		 out+="            <p>		 2.檢警調或司法單位或其他有權機關依法或基於公共利益，要求NEED社群平台提供特定個人資料時，經NEED社群平台考量依法或基於公共利益予以配合者。</p>";
		 out+="            <p>		 3.其他為履行法定義務或依法得對第三人揭露的情形。</p>";
		 out+="            <p>		 為了保護使用者個人隱私，我們無法為您查詢其他使用者的帳號資料，敬請見諒！若您有相關法律上問題需查閱他人資料時，請務必向警政單位提出告訴，我們將全力配合警政單位調查並提供所有相關資料以協助調查。</p>";
		 out+="            <p>		 ◎關於Cookie的使用： </p>";
		 out+="            <p>		 「Cookie」是一種儲存於使用者電腦端的小型資訊檔案，可配合瀏覽器的使用作為使用者電腦與網站互動時識別或讀取使用者的偏好設定之用，為會員制網站所普遍使用。NEED社群平台為提昇使用者使用本站之便利性，若您的瀏覽器的偏好設定允許cookie，NEED社群平台網站伺服器將會送出 cookie 至您的電腦。您可以隨時變更您的瀏覽器的設定，決定是否允許NEED社群平台網站設定或讀取您電腦端的 cookie。</p>";
		 out+="            <p>		 ◎兒童隱私保護：</p>";
		 out+="            <p>		 NEED社群平台網站並未刻意設計或提供吸引兒童（未滿12歲）內容或機制，亦無意透過本站蒐集兒童或其法定代理人之個人資料。然而社群網站內容來源複雜，為確保兒童隱私權，若您為兒童，請勿註冊本站會員，並避免與陌生網友互動。</p>";
		 out+="            <p>		 ◎個人資料處理委託第三人事宜</p>";
		 out+="            <p>		 由於電子商務及其他線上服務無可避免需使用第三方所提供之金流、物流或直接由原廠或經銷商供貨或提供預購贈品、保固服務等，因此，有關電子商務或線上服務交易之必要資訊，將會提供予第三方進行處理及利用，我們將透過契約要求第三方合作廠商應依個人資料保護法等相關法令確保您個人資料之安全，並禁止第三方用於該交易以外之利用。若您發現有第三方有任何違反前開原則之行為時，請您儘速予我們聯繫，我們將協助您釐清個人資料是否遭第三方濫用或其他違法情形，以利您依法主張權利。</p>";
		 out+="            <p>	 	 ■NEED社群平台著作權聲明</p>";
		 out+="            <p>		 會員於使用本站服務或於本站發表圖文或其他著作前，請您先同意下列事項，若您不同意下列事項， 請勿使用本站服務或於本站發表著作。 </p>";
		 out+="            <p>		 1.您保證您係為您所發表於NEED社群平台之文章及其他各種著作之著作人，或您確有得到著作權人之授權而發表，否則應對NEED社群平台負損害賠償責任。</p>";
		 out+="            <p>		 2. NEED社群平台會員於NEED社群平台所發表之文章、圖像或其他各種著作之著作權為其著作權人所有。 </p>";
		 out+="            <p>		 3. 若是您要重製、公開口述、公開播送、公開上映、公開演出、公開傳輸、改作、散布、公開展示、發行或公開發表任何NEED社群平台內登載之任何內容，請先得到著作權人之同意。尊重智慧財產權是您應盡的義務，如有違反，您應對權利人負損害賠償責任。</p>";
		 out+="            <p>		 4.您若認為NEED社群平台網站內某些內容涉及侵權或有其他不妥之處，請您逕向該內容提供者反應意見。</p>";
		 out+="            <p>		 5.您有權同意NEED社群平台得將會員發表於本站網域「.com.tw」及其下各次級網域內之著作以不同形式呈現及彙整於NEED社群平台網站中，以供網友查詢及閱讀。但於未經著作權人同意前，NEED社群平台無權將著作刊載於非網路形式之書報雜誌刊物。 </p>";
		 out+="            <p>		 6.您同意瀏覽NEED社群平台網站之網友在非營利用途下，得下載或列印您所發表之圖文內容。 </p>";
		 out+="            <p>		 7.您同意NEED社群平台之管理人員在註明著作人格權人名稱及不變更原圖文內容情況下，得以將圖文編排收錄至精華區中。 </p>";
		 out+="            <p>		 8.您同意若您所發表之圖文或其他內容有違反本站會員條款或國家法令之情形時，NEED社群平台之管理人員得刪除之。</p>";
		 out+="            <p>		 ◎電腦網路內容分級</p>";
		 out+="            <p>		 根據「電腦網路內容分級處理辦法」修正條文第六條第三款規定，</p>";
		 out+="            <p>		 已於網站首頁或各該限制級網頁，依台灣網站分級推廣基金會規定作標示。</p>";
		 out+="            <p>		 台灣網站分級推廣基金會( TICRF ) 網站：http://www.ticrf.org.tw</p>";
		 out+="            <p>		 兒少網路安全</p>";
		 out+="            <p>		 兒童篇</p>";
		 out+="            <p>		 1、如果在網路上看到讓你感覺怪怪的或不舒服的、令人討厭的文字、圖片或其他內容，請先暫時離開電腦，告訴你的家長，請他們幫忙；或是你可以先關掉網路，等到有大人陪你時再使用。</p>";
		 out+="            <p>		 2、在網路上洩露自己的資訊給陌生人是很危險的，千萬不要告訴別人自己和家人的私人資料，像是本名、身分證字號、電話、地址、或學校等；也不要把網路帳號的密碼告訴任何人。</p>";
		 out+="            <p>		 3、請遵守每個網站的遊戲規則，例如：當你看到網站上有註明「未滿十八歲者不可進入」，那你就應該立刻離開。</p>";
		 out+="            <p>		 4、如果遇到很友善、有趣、對你很好的網友，要記得：在網路上認識的人，現實生活中你們還是陌生人，他們不一定和他們看起來的一樣好，或是跟他們形容的一樣，所以不要隨便跟網友見面。即使真的有見面的必要，也一定要有大人陪同，絕對不可以單獨見面。</p>";
		 out+="            <p>		 5、收到不認識的人寄來的郵件，一定要立刻刪除，不要因為好奇而開啟附加檔案或連結，它很可能含有病毒，會損害你的電腦。</p>";
		 out+="            <p>		 6、許多免費分享的檔案可能是非法的，請不要任意複製、下載來路不明的音樂、影片、或其他類型的檔案，以免觸犯法律。</p>";
		 out+="            <p>		 7、請在網路上，任何人都可能看到你的行為，不可以對他人有不尊重的舉動。即使別人不知道你是誰，也不可以在網路上假扮成別人。</p>";
		 out+="            <p>		 家長篇</p>";
		 out+="            <p>		 使用網際網路是您的孩子必備的技能之一，網路雖然可以讓您的孩子學習更多知識，但也有許多不宜兒童發展的訊息是您的孩子隨手可得的，而且網路的匿名性也讓兒童易於在網路上進行不適當的互動。因此，當您的孩子要求使用網路時，請務必多加注意。遵守以下的幾項守則可以使您安心讓孩子們使用網路：</p>";
		 out+="            <p>		 1、網路上可能有色情、暴力等成人取向的資訊，為了讓您的孩子能使用一個乾淨無害的網路空間，請教育您的孩子盡量不要開啟這類資訊。並且經常檢查您孩子的連線記錄，以便了解未成年的孩童是否瀏覽過不應觀看的網頁；您或可選擇啟用瀏覽器中的分級警告器，以遠離這些資訊。</p>";
		 out+="            <p>		 2、您的孩子可能會洩露過多的個人資料給陌生人，這會威脅到您們的安全，請讓他們了解網路屬於公共場所，並督導他們不可將姓名、電話、地址、身分證字號等個人資料在網路上公開，以免受到有心人士利用。</p>";
		 out+="            <p>		 3、請不要讓您的孩子在沒有大人的監督下使用網路，請將電腦放置在全家都可使用的位置如客廳，並盡量撥空陪同他們使用電腦，教導他們如何利用網路以擴展知識、進行有益身心的娛樂。</p>";
		 out+="            <p>		 4、注意您的孩子在網路聊天室或留言板與他人的互動，請盡量不要讓您的孩子與網友會面，若有必要，也請您務必陪同他們，絕對不要讓孩子單獨與網友見面，並選擇安全的會面地點，盡量選在人多的公共場所，以便應付突發狀況。</p>";
		 out+="            <p>		 5、網路上分享的許多圖片、音樂、影片或文字檔案仍受到著作權法的保護，請教導您的孩子尊重著作權，不要下載非法的MP3或其他類型的檔案。</p>";
		 out+="            <p>		 6、孩童可能在不經意的狀況下誤使您的電腦受到病毒攻擊，請讓他們了解隨意下載軟體可能的危險性，不要任意開啟來路不明的電子郵件或下載不安全的軟體。</p>";
		 out+="            <p>		 7、請指導您的孩子尊重他人，不要發表帶有人身攻擊的言論；並請多加留意孩童瀏覽的聊天室或留言版，檢查是否散播不適當的言論。</p>";
		 out+="            <p>		 8、如果您的孩子希望在網路上購物，請他們務必在訂購物品前告訴您，不要讓他們在不安全的網站上進行交易，請選擇有信譽的網路賣場，並且注意商品的內容、金額及付款方式。</p>";
		 out+="            <p>		 檢舉色情內容</p>";
		 out+="            <p>		 請到終止童妓協會網站檢舉色情內容，以保護兒童上網安全。</p>";

	   out+="            <p>a.本網站會保護每一位使用者的隱私，不管是您的申請帳號、個人資料、郵件位址、或所儲存的網站資料，除了可能涉及違法、侵權、或違反使用條款、或長達一年沒有登入進行任何系統儲存動作、或經會員本人同意以外，本網站不會任意監視、增刪、修改或關閉，或將個人資料及郵件內容交予第三者，包括贊助之廣告廠商。</p>";
	   out+="            <p>b.本網站有部份特定服務是與其他合作廠商共同經營，如果您不願將個人資料揭露給其他合作伙伴，可以選擇不同意使用這些特定服務。為完成這些特定服務，本網站可能將您個人的資料揭露給合作伙伴，但會在提供會員資料前告知會員。</p>";
	   out+="            <p>c.在下列的情況下，本網站有可能會查看或提供您的資料給有權機關、或主張其權利受侵害並提出適當證明之第三人：</p>";
	   out+="            <p>c.1. 依法令規定、或依司法機關或其他有權機關的命令；</p>";
	   out+="            <p>c.2. 為執行本使用條款、或使用者違反使用條款；</p>";
	   out+="            <p>c.3. 為保護盛事科技股份有限公司（NEED）會員服務系統之安全或經營者之合法權益；</p>";
	   out+="            <p>c.4. 為保護其他使用者其他第三人的合法權益；</p>";
	   out+="            <p>c.5. 為維護盛事科技股份有限公司（NEED）會員服務系統的正常運作。</p>";
	   out+="            <p>d.經會員註冊成功後，為增加會員服務範圍，不須另行註冊即享有本公司各項產品之會員資格，本公司將於各產品內進行會員資料的建檔、揭露、轉介、或交互運用，但本公司仍保有拒絕或暫停產品服務的權利。</p>";
	   out+="            <p>e.NEED社群也自動接收並記錄您電腦和瀏覽器上的資料，包括 IP位址、NEED社群cookie中的資料、使用之軟體和硬體以及您瀏覽的網頁紀錄。在您使用NEED社群產品及服務期間，NEED社群將資料用作以下用途：改善NEED社群產品與服務品質、聯絡您、進行研究，以及提供內部及外部客戶不載有個人資料之市場分析或業務報告。</p>";
*/
	   out+="        </div>";
		popbasefull(out);
}

pop_vrequest=function(x){//手機驗證提醒
		var out="";
		out+="                           <h2> 請進行手機驗證，享有更完整功能及獎勵</h2>\n";
		out+="                    <div>\n";
		out+="						<div class=' popclose submitclick popbtn applebtn' data-type='vform' >立即驗證</div>"; //20181101 Pman 修正未關閉背景的遮蓋，增加class：popclose
		out+="						<div class=' popclose popbtn applebtn' >下次再說</div>";
		out+="                    </div>\n";
		popbase_v(out);
}
pop_vform=function(x){//手機驗證表格
		var out="";
	   out+="        <header>";
	   out+="            <div class='link back applebtn popfullcloset' >";
	   out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	   out+="                <span>返回</span>";
	   out+="            </div>";
	   out+="            <br clear='both'>";
	   out+="        </header>";
	   out+="    <div class='yellowbg'>";
	   out+="        <form class='form'>";
	   out+="            <h1>手機號碼綁定</h1>";
	   out+="            <fieldset class='input'>";
	   out+="                <label>";
	   out+="                    <span class='title '><input type='text' value='+886' style='width:50px;margin:0 10px 0 10px;float: none;' class='vcont' placeholder='+xxx' maxlength='4'></span>";  //20190522 Pman 增加區碼欄位
	   out+="                    <input type='text'  value='' style='width:175px;margin:0 10px;float: none;'  class='vphone' placeholder='9xxxxxxxx'>";
	   out+="                    <button type='button' class='send  submitclick submitclickr' data-type='sendmes'>發送</button>";
	   out+="                </label>";
	   out+="                <label>";
	   out+="                    <span class='title'></span>";
	   out+="                    <input type='text' placeholder='輸入收到的簡訊驗證碼' class='xmmsinput'>";
 	   out+="               </label>";
	   out+="            </fieldset>";
	   out+="            <button type='button' class='btn applebtn submitclick submitclickr' data-type='vmes'>綁定</button>";
	   out+="        </form>";
	   out+="    </div>";
	   popbasefullt(out);
}
pop_eform=function(x){//Email驗證表格
		var out="";
	   out+="        <header>";
	   out+="            <div class='link back applebtn popfullcloset' >";//20181017 Pman 修正重新綁定email的圖層，被壓在下面的問題，popfullclose==>popfullcloset（下面還有一段有修改）
	   out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	   out+="                <span>返回</span>";
	   out+="            </div>";
	   out+="            <br clear='both'>";
	   out+="        </header>";
	   out+="    <div class='yellowbg'>";
	   out+="        <form class='form'>";
	   out+="            <h1>Email綁定</h1>";
	   out+="            <fieldset class='input'>";
	   out+="                <label>";
	   out+="                    <span class='title '></span>";
	   out+="                    <input type='text'  value=''  class='vemail' placeholder='xxx@xxx.xxx''>";
	   out+="                    <button type='button' class='send  submitclick submitclickr' data-type='sendreemail'>發送</button>";
	   out+="                </label>";
	   out+="                <label>";
	   out+="                    <span class='title'></span>";
	   out+="                    <input type='text' placeholder='輸入收到的Email驗證碼' class='xmmsinput'>";
 	   out+="               </label>";
	   out+="            </fieldset>";
	   out+="            <button type='button' class='btn applebtn submitclick submitclickr' data-type='vreemail'>綁定</button>";
	   out+="        </form>";
	   out+="    </div>";
		popbasefullt(out);//20181017 Pman 修正重新綁定email的圖層，被壓在下面的問題（上面還有一段有修改）
}
// ############# 顯示登入後相關 #########################
show_afterloginhead=function(){
	if(sessionStorage.getItem("userid")){
		if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
		mem=xmem;
		if(mem['headpic']){
			$("footer").find(".user").html("<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(mem['headpic'])+"' />");
		}else{
			$("footer").find(".user").html("<img src='img/basichead.png' />");
		}

		if(ismobile==2){  //20181228 Pman 登入APP後，新更新一次badge數量
			pushx.setApplicationIconBadgeNumber(() => {	 }, () => {		 }, mem['note_count']);
		}
		//20181228 Pman 如果沒有選擇感興趣的遊戲，登入後預帶「正在玩的遊戲」
		gameselect=JSON.parse(localStorage.getItem("gameselect"));
		if(gameselect && gameselect.length == 1){
			console.log(mem['game1']);
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
		}
		//=====================================
	}
	/*
		var tempvals=Array("1");
		tempitem=ajaxarr("reget_mem",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data 義
			var out="";
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
			if(mem['headpic']){
				$("footer").find(".user").html("<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(mem['headpic'])+"' />");
			}else{
				$("footer").find(".user").html("<img src='img/basichead.png' />");
			}
		});
		*/
}
// ########### 通知相關 ################################
/*
popnoticall=function(x,d){//
	var me=x;
	var v=0;
	out="";
	var myul=$("#popfull").find("ul");
	myul.removeClass("friend");
	myul.removeClass("alert");
	if(me.data("type")=="popnoticbell"){//通知
		myul.addClass("alert");
		if(d && d.length<1){
			out+="<div class='nocontent'>暫無資料</div>";
		}else{
			for(var a=0;a<d.length;a++){
					out+="				<li class='noread'>";
					out+="					<div class='user'>";
					if(d[a]["headpic"]){
						out+="            <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(d[a]['headpic'])+"'  />";
					}else{
						out+="            <img src='img/basichead.png'  />";
					}
					out+="</div>";
					out+="					<div class='name'>"+d[a]["thiscontent"]+"<span class='timeitem' data-t='"+d[a]["dateadd"]+"'>"+d[a]["dateadd"]+"</span></div>";
					out+="					<br clear='both'>";
					out+="				</li>";
			}
		}
		//out+="        </ul>";
	}else if(me.data("type")=="popnoticcomment"){//chat room
		myul.addClass("alert");
		if(d && d.length<1){
			out+="<div class='nocontent'>暫無資料</div>";
		}else if(d){
			var ct=1;
			for(var a=0;a<d.length;a++){
				out+="			<li class='noread'>";
				out+="				  <div class='user frienditemnew applebtn' data-val='"+d[a]['roomid']+"' data-type='room'>";

				if(d[a]['last']["headpic"] && d[a]['last']["headpic"]=="group"){
					 out+="<img src='img/cman"+ct+".png'>";
					 ct++;
					 if(ct>7){ct=1;}
				}else if(d[a]['last']["headpic"]){
				    out+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(d[a]['last']['headpic'])+"'  />";
				}else{
					out+="            <img src='img/basichead.png'  />";
				}
				out+="          </div>";
				out+="         <div class='name'>";
				out+="<span class='frienditemnew applebtn' data-val='"+d[a]['roomid']+"' data-type='room'>";
				out+=d[a]['last']['oname'];
				out+="</span>";
				if(d[a]['last']['dateadd']){
				out+="					 <span class='timeitem frienditemnew applebtn' data-t='"+d[a]['last']['dateadd']+"'  data-val='"+d[a]['roomid']+"' data-type='room'>"+d[a]['last']['dateadd']+"</span>";
				}else{
					out+="					 <span></span>";
				}
				out+="           <label class='sub applebtn'>";
				out+="              <i class='fa fa-chevron-down' aria-hidden='true'></i>";
				out+="				      <div class='sub-menu'>";
				if(d[a]['last']["headpic"] && d[a]['last']["headpic"]=="group"){
					out+="                 <span class='notchatsubselect applebtn' data-type='out' data-val='"+d[a]['roomid']+"'>退出群組</span>";
			  }
				if(d[a]['do']==1){
					out+="                 <span class='notchatsubselect applebtn' data-type='open' data-val='"+d[a]['roomid']+"'>開啟提醒</span>";
				}else{
					out+="                 <span class='notchatsubselect applebtn' data-type='close' data-val='"+d[a]['roomid']+"'>關閉提醒</span>";
				}
				out+="              </div>";
				out+="           </label>";
				out+="         </div>";

				if(d[a]['last']['content']){
					out+="<div class='message frienditemnew applebtn' data-val='"+d[a]['roomid']+"' data-type='room'>";
					if(d[a]['last']['content'].indexOf("http")>=0){
						out+="傳送了一個連結！";
					}else if(d[a]['last']['content'].indexOf("src=")>=0){
						out+="傳送了一張貼圖！";
					}else{
						out+=d[a]['last']['content'];
					}
					out+="</div>";
				}else{
					out+="         <div class='message'></div>";
				}
				out+="            <br clear='both'>";
				if(d[a]['cc'] && d[a]['cc']>0){
					out+="         <i class='number'>"+d[a]['cc']+"</i>";
				}
				out+="			</li>";
			}

		}

		out+="<button class='post-btn popclick applebtn' data-type='mypage' data-val='4' ><i class='fa fa-plus' aria-hidden='true'></i> 發訊息</button>";
	}else if(me.data("type")=="popnoticuser"){//add friend
		myul.addClass("friend");
		if(!d || d==null || d.length<1){
			out+="<div class='nocontent'>暫無資料</div>";
		}else{
			for(var a=0;a<d.length;a++){
				out+=print_frienditem(d[a],3);
			}
		}
	}
	myul.html(out);
	run_timeitem();//跑一次
	var klist=$("#noticewrap .htitle");
	for(var a=0;a<klist.length;a++){
		klist.eq(a).attr("id","");
		if(klist.eq(a).data("type")==me.data("type")){
			klist.eq(a).addClass("active");
			klist.eq(a).find().html("");
		}else{
			klist.eq(a).parents(".link").removeClass("active");
		}
	}

}
*/
popnoticall=function(x,d){//
	var me=x;
	var inlist=$("#mainheader .htitle");
	var v=0;
	out="";
	out+="        <header id='noticewrap'>";
	out+="            <div class='link back applebtn popfullclose' >";
	out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="                <span>返回</span>";
	out+="            </div>";
	//out+=insert;
	out+="        </header>";
        console.log(d);
	if(me.data("type")=="popnoticbell"){//通知
		out+="        <ul class='alert'>";
		if(d && d.length<1){
			out+="<div class='nocontent'>暫無資料</div>";
		}else{
			for(var a=0;a<d.length;a++){
					if(d[a]['typeid']=="4"){
						mytype="artpage";
					}else if(d[a]['typeid']=="2"){
						mytype="qnaspeak";
					}else if(d[a]['typeid']=="9"){ //20181101 Pman 當typeid=9的時候，要變更mytype的值，之前沒有設定。
						mytype="phoneform";
					}else if(d[a]['typeid']=="3"){ //20181101 Pman 當typeid=3的時候，要變更mytype的值，之前沒有設定。
						mytype="mypage";
					}else{
						mytype="wallspeak";
					}

					if(d[a]['typeid']=="3"){ //20181101 Pman 當typeid=3的時候，連去好友列表頁面
						out+="				<li class='noread popclick applebtn' data-type='"+mytype+"' data-val='4' data-id='"+d[a]['memberid']+"'>";
					}else{
						out+="				<li class='noread popclick applebtn' data-type='"+mytype+"' data-val='"+d[a]['thislink']+"' data-id='"+d[a]['thislink']+"'>";
					}

					out+="					<div class='user'>";
					if(d[a]["headpic"]){
						out+="            <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(d[a]['headpic'])+"'  />";
					}else{
						out+="            <img src='img/basichead.png'  />";
					}
					out+="</div>";
					out+="					<div class='name'>"+d[a]["thiscontent"]+"<span class='timeitem' data-t='"+d[a]["dateadd"]+"'>"+d[a]["dateadd"]+"</span></div>";
					out+="					<br clear='both'>";
					out+="				</li>";
			}
		}
		out+="        </ul>";
	}else if(me.data("type")=="popnoticcomment"){//chat room
		out+="        <ul class='alert'>";
		if(d && d.length<1){
			out+="<div class='nocontent'>暫無資料</div>";
		}else if(d){
			var ct=1;
			for(var a=0;a<d.length;a++){
				if(d[a]['do']==2){
				}else{
				//	out+="			<li class='noread'>";
				//	out+="				  <div class='user frienditemnew applebtn' data-val='"+d[a]['roomid']+"' data-type='room'>";
					out+="			<li class='noread  frienditemnew applebtn' data-val='"+d[a]['roomid']+"' data-type='room'>";
					out+="				  <div class='user'>";
					if(d[a]['last']["headpic"] && d[a]['last']["headpic"]=="group"){
						 out+="<img src='img/cman"+ct+".png'>";
						 ct++;
						 if(ct>7){ct=1;}
					}else if(d[a]['last']["headpic"]){
					    out+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(d[a]['last']['headpic'])+"'  />";
					}else{
						out+="            <img src='img/basichead.png'  />";
					}
					out+="          </div>";
					out+="         <div class='name'>";
				//	out+="<span class='frienditemnew applebtn' data-val='"+d[a]['roomid']+"' data-type='room'>";
					out+="<span>";
					out+=d[a]['last']['oname'];
					out+="</span>";
					if(d[a]['last']['dateadd']){
					out+="					 <span class='timeitem' data-t='"+d[a]['last']['dateadd']+"' data-val='"+d[a]['roomid']+"' data-type='room'>"+d[a]['last']['dateadd']+"</span>"; //20180918 Pman 解決聊天室訊息會重複出現的問題，移除class中的相關參數。原因是因為li元件上有frienditemnew，各元件也有，所以觸發兩次取得聊天室訊息的問題
					}else{
						out+="					 <span></span>";
					}
					out+="           <label class='sub applebtn'>";
					out+="              <i class='fa fa-chevron-down' aria-hidden='true'></i>";
					out+="				      <div class='sub-menu'>";
					if(d[a]['last']["headpic"] && d[a]['last']["headpic"]=="group"){
						out+="                 <span class='notchatsubselect applebtn' data-type='out' data-val='"+d[a]['roomid']+"'>退出群組</span>";
				  }
					if(d[a]['do']==1){
						out+="                 <span class='notchatsubselect applebtn' data-type='open' data-val='"+d[a]['roomid']+"'>開啟提醒</span>";
					}else{
						out+="                 <span class='notchatsubselect applebtn' data-type='close' data-val='"+d[a]['roomid']+"'>關閉提醒</span>";
					}
					out+="                 <span class='notshowsubselect applebtn' data-type='close' data-val='"+d[a]['roomid']+"'>刪除對話</span>";
					out+="              </div>";
					out+="           </label>";
					out+="         </div>";

					if(d[a]['last']['content']){
						out+="<div class='message' data-val='"+d[a]['roomid']+"' data-type='room'>"; //20180918 Pman 解決聊天室訊息會重複出現的問題，移除class中的相關參數。原因是因為li元件上有frienditemnew，各元件也有，所以觸發兩次取得聊天室訊息的問題
						if(d[a]['last']['content'].indexOf("http")>=0){
							out+="傳送了一個連結！";
						}else if(d[a]['last']['content'].indexOf("chat")>=0){
							out+="傳送了一張貼圖！";//20180912 Pman 判斷是貼圖還是照片，送不同的訊息
						}else if(d[a]['last']['content'].indexOf("src=")>=0){
							out+="傳送了一張圖片！";
						}else{
							out+=unescape(d[a]['last']['content']); //20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
						}
						out+="</div>";
					}else{
						out+="         <div class='message'></div>";
					}
					out+="            <br clear='both'>";
					if(d[a]['cc'] && d[a]['cc']>0){
						out+="         <i class='number' id='"+d[a]['roomid']+"'>"+d[a]['cc']+"</i>"; //20180918 Pman 新增用來判定移除未讀數量的id
					}
					out+="			</li>";
				}
			}
		}
		out+="<button class='post-btn popclick applebtn' data-type='mypage' data-val='4' ><i class='fa fa-plus' aria-hidden='true'></i> 發訊息</button>";
		out+="        </ul>";
	}else if(me.data("type")=="popnoticuser"){//add friend
		out+="        <div class='friend'>";
		if(!d || d==null || d.length<1){
			out+="<div class='nocontent'>暫無資料</div>";
		}else{
			for(var a=0;a<d.length;a++){
				out+=print_frienditem(d[a],3);
			}
		}
		out+="        </div>";
	}
	$("#popfull").html(out);
	run_timeitem();//跑一次
	//更新數量為0
	for(var a=0;a<inlist.length;a++){
		if(inlist.eq(a).data("type")==me.data("type")){
			inlist.eq(a).find(".alert").html("");//移掉數量
		}
	}
	for(var a=0;a<inlist.length;a++){
		if(inlist.eq(a).data("type")==me.data("type")){
			inlist.eq(a).clone(true).appendTo("#noticewrap");
			v=a;
		}else{
			inlist.eq(a).clone(true).appendTo("#noticewrap");
		}
	}
	var klist=$("#noticewrap .alert");
	for(var a=0;a<klist.length;a++){
		klist.eq(a).attr("id","");
		if(a==v){
			klist.eq(a).parents(".link").addClass("active");
			klist.eq(a).html("");
		}
	}
}

// ##############  MYPAGE ################################
show_mypageall=function(x,y,z){  	// x=subpage,y=id
	if(!x){		x=1;	}
	if(y && x==1){
		if(x==1){
			$("#mainmidwrapin").html("<div class='loaderbox'><img src='assets/img/loaderd.gif'></div>");
			var m=y;
			var tempvals=Array(y,'vv'); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
			tempitem=ajaxarr("show_mypagebase",tempvals,ajaxurl);
			tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
				if(data[0]=="ERR"){
					$("#mainmidwrapin").html('');
				}else{
					var out="";
					//這裡應該有一個是不是要加朋友的檢查
					show_mypagefront(y);//是不是可以加朋友
				}
			});
		}
	}else if(x==1){//自己
		if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
		mem=xmem;
//		mem=JSON.parse(sessionStorage.getItem("member"));
		y=sessionStorage.getItem("userid");
		show_mypagefront(y);
	}else if(x==2){
		show_mypageabout(y);
	}else if(x==3){
		if(z){
			show_mypagearticle(y,z,'','');
		}else{
			show_mypagearticle(y,1,'','');
		}
	}else if(x=="3x"){
		show_mypagearticle(y,2,1,1);
	}else if(x==4){
		show_mypagefriend(y);
	}else if(x==5){
		show_mypagephoto(y,1);
	}else if(x==6){// 6收藏
		show_mypagecollect(y,1);
	}


}
// MYPAGE 首頁
show_mypagefront=function(x,chf){
	var out="";
	out+="    <header>";
	out+="        <div class='link back popuserclose  applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	if(x==sessionStorage.getItem("userid")){
		out+="        <div class='link'>";
		out+="            <i class='fa fa-pencil-square-o popclick' aria-hidden='true' data-type='mypage' data-val='2' ></i>";
		out+="        </div>";
	}else{
		out+="        <div class='link  addbtn'  style='display:none;'>";
		out+="            <a  class='btn addfriend applebtn' data-type='add' data-val='"+x+"' data-react='1'>加好友</a>";
		out+="        </div>";
		out+="        <div class='link cancelbtn'  style='display:none;'>";
		out+="            <a class='btn cancel  addfriend applebtn' data-type='cancel' data-val='"+x+"'  data-react='1' >取消好友</a>";
		out+="        </div>";
		out+="        <div class='link deletebtn'  style='display:none;'>";
		out+="            <a class='btn cancel addfriend applebtn' data-type='delete' data-val='"+x+"'  data-react='1' >取消邀請</a>";
		out+="        </div>";
	}
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="		<div id='maincontentwrap'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="		</div>";
	popbaseuser(out);//寫出
	var ranks=JSON.parse(sessionStorage.getItem("ranks"));
	var tags=JSON.parse(sessionStorage.getItem("tags"));
	var locations=JSON.parse(sessionStorage.getItem("locations"));
	var gametimes=JSON.parse(sessionStorage.getItem("gametimes"));
	var mem=x;
	var tempvals=Array(mem,'');
	tempitem=ajaxarr("show_mypage1",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		var out="";
		out+="	  <div class='profile'>";
		out+="        <div class='top'>";
		mylevel="";
		myrank="";
		if(data[1]['isfriend'] && data[1]['isfriend']==1){//已是平有
			$("header .addbtn").remove();
			$("header .deletebtn").remove();
		}else if(data[1]['isfriend'] && data[1]['isfriend']==2){//不是朋友
			$("header .cancelbtn").remove();
			$("header .deletebtn").remove();
		}else if(data[1]['isfriend'] && data[1]['isfriend']==3){//邀請中
			$("header .cancelbtn").remove();
			$("header .addbtn").remove();
		}
		$("header").find(".link").show();
		for(var a=0;a<ranks.length;a++){
			  if(parseInt(data[1]['score'])>=parseInt(ranks[a]['score'])){
				 if(data[1]['rank_v']=="1" || sessionStorage.getItem("userid")==mem ){
				 	 myrank=ranks[a]['rankname'];
				 }
				 if(data[1]['level_v']=="1" || sessionStorage.getItem("userid")==mem ){
				 	 mylevel=ranks[a]['rankid'];
				 }
			  }
		}
		if(myrank || mylevel){
			out+="            <div>LV"+mylevel+"</div>";
			out+="            <div>"+myrank+"</div>";
		}else{
			out+="            <div></div>";
			out+="            <div></div>";
		}
		out+="            <div class='cover'>";
		if(data[1]['headpic']){
			out+="                		<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1]['headpic']+"' class='popimgclick fullw applebtn' data-type='self' data-val='"+data[1]['headpic']+"' />\n";
		}else{
			out+="                		<img src='img/basichead.png' />\n";
		}
		out+="            </div>";
		out+="            <h1>"+data[1]['name']+"</h1>";
		out+="            <span class='point'>"+parseInt(data[1]['score']).toFixed(0)+" <img src='img/p_off.png' width='20px'></span>";
		out+="        </div>";
		if(mem==sessionStorage.getItem("userid")){
			out+="        <div id='mypageintwrap'>";
			out+=show_mypageinterestlist(mem);
			out+="        </div>";
		}else{
			out+="        <ul class='game'>";
			out+="            <li>";
			out+="                <center>正在玩的遊戲</center>";
			out+="            </li>";
			var cal=0;
			for(var w=1;w<4;w++){
				dd="";
				if(data[1]['game'+w]){
					cal++;
					for(var a=0;a<tags.length;a++){
						if(tags[a]['gameid']==data[1]['game'+w]){
							dd=tags[a]['gamename'];
							break; //20190305 Pman 找到對應的標籤後就中斷，減少不必要的比對
						}
					}
					if(a<tags.length-1 && tags[a]['hidesee']==1) continue; //20190305 Pman 如果是隱藏標籤，不顯示	//20190509 Pman 加上a的數值判斷，避免超過tags的陣列長度
					nn="";
					if(data[1]['game'+w+'note']){
						nn=data[1]['game'+w+'note'];
					}
					out+="            <li>";
					out+="                <span >"+dd+"</span>";
					out+="                <p>"+nn+"</p>";
					out+="            </li>";
				}
			}
			out+="        </ul>";
		}
		out+="        <div class='link'>";
		out+="            <button class='popclick applebtn' data-type='mypage' data-val='4' data-id='"+mem+"'><i class='fa fa-user' aria-hidden='true'></i></button>";
		out+="            <button class='popclick applebtn' data-type='mypage' data-val='5' data-id='"+mem+"'><i class='fa fa-instagram' aria-hidden='true'></i></button>";
		if(mem==sessionStorage.getItem("userid")){ //20190426 Pman 如果看的是自己，才輸出「收藏」按鈕
			out+="            <button class='popclick applebtn' data-type='mypage' data-val='6' data-id='"+mem+"'><i class='fa fa-bookmark-o' aria-hidden='true'></i></button>";
		}
		out+="            <button class='popclick applebtn' data-type='mypage' data-val='3' data-id='"+mem+"'><i class='fa fa-file-text' aria-hidden='true'></i></button>";
		out+="        </div>";
		out+="        <ul class='game me'>";
		out+="            <li>";
		out+="                <center>我的基本資料</center>";
		out+="            </li>";
		out+="            <hr>";
		out+="            <li>";
		out+="                <p>ID：<em>"+data[1]['showid']+"</em></p>"; //20190422 Pman 新增輸出ID
		out+="            </li>";
		if(data[1]['email']){
			out+="            <li>";
			if(mem==sessionStorage.getItem("userid")){
				out+="                <p class='applebtn "+(data[1]['email_v']=="1"?"fayellow":"close fagray")+"  showprofileclick'  data-name='email' >帳號：<em>"+data[1]['email']+"</em>";
				out+="			<i class='fa fa-eye aria-hidden='true'></i>";
			}else{
				out+="                <p>帳號：<em>"+data[1]['email']+"</em>";
			}
			out+="				  </p>";
			out+="            </li>";
		}
		if(data[1]['gender']){
			out+="            <li>";

			if(mem==sessionStorage.getItem("userid")){
				out+="                <p class='applebtn "+(data[1]['gender_v']=="1"?"fayellow":"close fagray")+"  showprofileclick'  data-name='sex'>性別：<em>"+(data[1]['gender']=="1"?"男":"女")+"</em>";
				out+="			<i class='fa fa-eye' aria-hidden='true'></i>";
			}else{
				out+="                <p >性別：<em>"+(data[1]['gender']=="1"?"男":"女")+"</em>";
			}
			out+="				  </p>";
			out+="            </li>";
		}
		if(data[1]['birthday']){
			out+="            <li>";

			if(mem==sessionStorage.getItem("userid")){
				out+="                <p class='applebtn "+(data[1]['birthday_v']=="1"?"fayellow":"close fagray")+"  showprofileclick'  data-name='birth'>年齡：<em>"+data[1]['birthday']+"</em>";
				out+="			<i class='fa fa-eye' aria-hidden='true'></i>";
			}else{
				out+="                <p>年齡：<em>"+data[1]['birthday']+"</em>";
			}
			out+="				  </p>";
			out+="            </li>";
		}
		out+="            <li>";
		out+="                <p>暱稱：<em>"+data[1]['name']+"</em></p>";
		out+="            </li>";
		if(myrank){
			out+="            <li>";
			if(mem==sessionStorage.getItem("userid")){
				out+="                <p class='applebtn "+(data[1]['level_v']=="1"?"fayellow":"close fagray")+"  showprofileclick'  data-name='level'>稱號：<em>"+myrank+"</em>";
				out+="			<i class='fa fa-eye' aria-hidden='true'></i>";
			}else{
				out+="                <p >稱號：<em>"+myrank+"</em>";
			}
			out+="				  </p>";
			out+="            </li>";
		}
		if(data[1]['location']){
			dd="";
			for(var a=0;a<locations.length;a++){
				if(locations[a]['thisid']==data[1]['location']){
					dd=locations[a]['thisname'];
				}
			}
			out+="            <li>";
			if(mem==sessionStorage.getItem("userid")){
				out+="                <p class='applebtn "+(data[1]['location_v']=="1"?"fayellow":"close fagray")+"  showprofileclick'  data-name='location'>所在地區：<em>"+dd+"</em>";
				out+="			<i class='fa fa-eye' aria-hidden='true'></i>";
			}else{
				out+="                <p >所在地區：<em>"+dd+"</em>";
			}
			out+="				  </p>";
			out+="            </li>";
		}
		if(data[1]['gtid']){
			dd="";
			for(var a=0;a<gametimes.length;a++){
				if(gametimes[a]['thisid']==data[1]['gtid']){
					dd=gametimes[a]['gtname'];
				}
			}
			out+="            <li>";
			if(mem==sessionStorage.getItem("userid")){
				out+="                <p class='applebtn "+(data[1]['gt_v']=="1"?"fayellow":"close fagray")+"  showprofileclick'  data-name='time' >遊戲時段：<em>"+dd+"</em>";
				out+="			<i class='fa fa-eye' aria-hidden='true'></i>";
			}else{
				out+="                <p>遊戲時段：<em>"+dd+"</em>";
			}
			out+="				  </p>";
			out+="            </li>";
		}
		out+="        </ul>";
		if(mem==sessionStorage.getItem("userid")){
			out+="        <ul class='game'>";
			out+="            <li>";
			out+="                <center>我的邀請紀錄</center>";
			out+="            </li>";
			out+="            <hr>";
			out+="            <li class='long'>";
			out+="                <p>邀請網址：<button class='copytoboard applebtn' data-val='"+data[1]['refurl']+"'  >複製</button><em>"+data[1]['refurl']+"</em></p>";
		//	out+="                <p>邀請網址：<button class='copytoclip submitclick border5 btn bgcolor_lc' data-val='"+data[1]['refurl']+"'  >複製</button><em>"+data[1]['refurl']+"</em></p>";
			out+="            </li>";
			out+="            <li class='long'>";
			out+="                <p>上月邀請人數：<em>"+data[1]['lc']+"</em></p>";
			out+="            </li>";
			out+="            <li class='long'>";
			out+="                <p>累積邀請人數：<em>"+data[1]['allc']+"</em></p>";
			out+="            </li>";
			out+="        </ul>";
		}
		out+="        <ul class='game'>";
		out+="            <li>";
		out+="                <center>我的貼文</center>";
		out+="            </li>";
		out+="        </ul>";
		out+="    </div>";
		out+="    </div>";
		out+="    <div class='wall' id='anoutmaincontentbox'>";
		out+="    </div>\n";
		$("#maincontentwrap").html(out);
		getaboutboard(mem);
		setTimeout(function(){
			wall_slides();
		},1000);
	});
}
//感興趣的遊戲
show_mypageinterestlist=function(){
	var out="";
	var mem=sessionStorage.getItem("userid");
	var	tags=JSON.parse(sessionStorage.getItem("tags"));
	out+="        <ul class='game'>";
	out+="            <li>";
	out+="                <center>感興趣的遊戲</center>";
	out+="            </li>";
	var cal=0;
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	if(gameselect && gameselect.length>1){

		for(w=1;w<gameselect.length;w++){
			dd="";
			if(gameselect[w]['gameid']){
				for(var a=0;a<tags.length;a++){
					if(tags[a]['gameid']==gameselect[w]['gameid']){
						dd=tags[a]['gamename'];
					}
				}
				out+="            <li>";
				if(mem==sessionStorage.getItem("userid")){
					out+="                <i class='fa fa-times aboutclick' aria-hidden='true' data-id='"+gameselect[w]['gameid']+"' data-name='intgamedel'></i>";
					out+="                <span class='"+((gameselect[w]['show']=="1")?"fayellow":"close fagray")+"  aboutclick' data-name='intgameshow' data-id='"+gameselect[w]['gameid']+"'><i class='fa fa-eye' aria-hidden='true'></i> "+dd+"</span>";
				}else{
					out+="                <span >"+dd+"</span>";
				}
				out+="            </li>";
			}
		}
	}
	if(gameselect.length<6 && mem==sessionStorage.getItem("userid")){
		out+="            <li id='aboutaddgamewrap'>";
		//out+="					<div name='game1' id='aboutaddgame' class='popclick applebtn' data-type='selectgametag'  data-id='aboutaddgame'>";//
		//out+="						選擇遊戲";
		//out+="					</div>";
		out+="				  <div class='popclick applebtn stagcover' data-type='selectgametag' data-id='aboutaddgame'></div>";
		out+="					<select name='game1' id='aboutaddgame' class='popclick applebtn' data-type='selectgametag'  data-id='aboutaddgame' style='z-index:0;'>";//
		out+="						<option value=''>選擇遊戲</option>";
		out+="					</select>";
		out+="					<div class='plus  aboutclick' style='z-index:1' data-name='intgameadd'>新增</div>";
		out+="					<div style='clear:both;'></div>";
		out+="            </li>";
	}
	out+="        </ul>";
	return out;
}
show_mypageabout=function(x){
	var out="";
	var m=x;
	out+="  <div class='yellowbg' id='usereditor'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader2.gif'></div>";
	out+="	</div>";
	popbaseuseru(out);//寫出
	ranks=JSON.parse(sessionStorage.getItem("ranks"));
	tags=JSON.parse(sessionStorage.getItem("tags"));
	locations=JSON.parse(sessionStorage.getItem("locations"));
	gametimes=JSON.parse(sessionStorage.getItem("gametimes"));
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	mem=xmem;
	//mem=JSON.parse(sessionStorage.getItem("member"));
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage2",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義
		var out="";
		var d = new Date();
		out+="        <div class='signup-info' id='edituser'>\n";
		out+="            <div class='head popusercloseu  applebtn' >\n";
		out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>\n";
		out+="                <span>返回</span>\n";
		out+="            </div>\n";
		out+="            <div class='title'>\n";
		out+="                <h2>我的基本資料</h2>\n";
		out+="                <br clear='both'>\n";
		out+="            </div>\n";
		out+="            <fieldset>";
		out+="                <label>";
		out+="                    <span>暱稱</span>";
	//	out+="                    <input type='text' name='nick' value='"+data[1]['name']+"' class='formfield form-control' data-err='暱稱字數為2~7個中文字，請重新調整' >";
		out+=data[1]['name'];
		out+="                </label>";
		out+="                <label>";
		out+="                    <span>性別</span>";
		out+="                    <select name='sex' class='formfield' disabled='disabled'>";//20180907 Pman 關掉修改
		out+="                        <option value='1' "+(data[1]['gender']=="1"?"SELECTED":"")+" >男</option>";
		out+="                        <option value='2' "+(data[1]['gender']=="2"?"SELECTED":"")+"  >女</option>";
		out+="                    </select>";
		out+="                </label>";
		out+="                <div>";
		out+="                    <span>生日</span>";
		out+="                    <div class='date'>";
		out+="                        <select class='birthyear formfield form-control' name='birthyear' data-err='請選擇生日-年' disabled='disabled'>";//20180907 Pman 關掉修改
		out+="                            <option value=''>年</option>";
		var mydate = new Date(data[1]['birthday']);
		for(var a=1930;a<=d.getFullYear();a++){
			out+="                     <option value='"+a+"' "+((mydate.getFullYear()==a)?"SELECTED":"")+">"+a+"</option>";
		}
		out+="                        </select>";
		out+="                        <select class='birthmonth formfield form-control' name='birthmonth' data-err='請選擇生日-月' disabled='disabled'>";//20180907 Pman 關掉修改
		out+="                            <option value=''>月</option>";
		for(var a=1;a<=12;a++){
			out+="                     <option value='"+a+"' "+(((mydate.getMonth()+1)==a)?"SELECTED":"")+">"+a+"</option>";
		}
		out+="                        </select>";
		var dx = new Date(mydate.getFullYear(),mydate.getMonth(), 0);
		out+="                        <select class='birthday formfield form-control' name='birthday' data-err='請選擇生日-日' disabled='disabled'>";//20180907 Pman 關掉修改
		out+="                            <option value=''>日</option>";
		for(var a=1;a<=dx.getDate();a++){
			out+="<option value='"+a+"' "+((mydate.getDate()==a)?"SELECTED":"")+">"+a+"</option>";
		}
		out+="                        </select>";
		out+="                    </div>";
		out+="                </div>";
		out+="                <label>";
		out+="                    <span>地區</span>";
		out+="                    <select  name='location' class='formfield form-control' data-err='請選擇地區' disabled='disabled'>";//20180907 Pman 關掉修改
		for(var a=0;a<locations.length;a++){
			out+="<option value='"+locations[a]['thisid']+"' "+((data[1]['location']==locations[a]['thisid'])?"SELECTED":"")+">"+locations[a]['thisname']+"</option>";
		}
		out+="                    </select>";
		out+="                </label>";
		//out+="                <label>";
		//out+="                    <span>信箱</span>";
		//out+="                    <input type='text'  name='name' placeholder='Email' class='formfield form-control' placeholder='請填寫用於聯絡的email' data-err='請填寫用於聯絡的email'>";
		//out+="                </label>";
		out+="            </fieldset>";
		out+="            <div class='title'>";
		out+="                <h2>Email信箱綁定</h2>";
		out+="                <br clear='both'>";
		out+="            </div>";
		out+="            <fieldset>";
		out+="                <label class='popclick' data-type='emailform'>";//這個藥重新綁定
		out+="                    <span>信箱</span>";
		out+="                    <input type='email' id='emailvalue' name='name' value='"+(data[1]['email']?data[1]['email']:"")+"'>";
		out+="                    <button type='button'>重新綁定</button>";
		out+="                </label>";
		out+="            </fieldset>";
		out+="            <div class='title'>";
		out+="                <h2>手機號碼綁定</h2>";
		out+="                <br clear='both'>";
		out+="            </div>";
		out+="            <fieldset>";
		out+="                <label  class='popclick' data-type='phoneform'>";//這個藥重新綁定
		out+="                    <span>手機</span>";
		out+="                    <input type='text' id='phonevalue' value='"+(data[1]['phonenum']?data[1]['phonenum']:"")+"'>";
		out+="                    <button type='button'>重新綁定</button>";
		out+="                </label>";
		out+="            </fieldset>";
		out+="            <div class='title'>";
		out+="                <h2>設定遊戲履歷</h2>";
		out+="                <br clear='both'>";
		out+="            </div>";
		out+="            <fieldset>";
		out+="                正在玩的遊戲";
		out+="                <hr>";
		for(w=1;w<4;w++){
			dt="";
			dd="";
			nn="";
			if(data[1]['game'+w]){
				dt=data[1]['game'+w];
				for(var a=0;a<tags.length;a++){
					if(tags[a]['gameid']==data[1]['game'+w]){
						dd=tags[a]['gamename'];
					}
				}
				if(data[1]['game'+w+'note']){
					nn=data[1]['game'+w+'note'];
				}
			}
			out+="<a class='game-delete gdclick applebtn' data-id='"+w+"'><i class='fa fa-times-circle' aria-hidden='true'></i></a>";
			out+="                <label class='long'  style='width: calc(100% - 30px);display: inline-block;'>";
			out+="				  		<div class='popclick applebtn stagcover' data-type='selectgametag' data-id='sg"+w+"'></div>";
			out+="							<select name='game"+w+"' id='sg"+w+"' class='formfield form-control popclick applebtn' data-type='selectgametag' data-id='sg"+w+"' data-err='請選擇遊戲名稱'>";
			out+="								<option value='"+dt+"'>"+dd+"</option>";
			out+="							</select>";
			out+="                </label>";
			out+=" <br clear='both'>";
			out+="                <label>";
			out+="                    <span>備註</span>";
			out+="                    <input class='formfield rgnotes' id='tg"+w+"' type='text' value='"+nn+"'>";
			out+="                </label>";

		}
		out+="                <label class='long'>";
		out+="							<select  name='gametime' class='formfield ' id='popgametime'>";
		for(var a=0;a<gametimes.length;a++){
			out+="<option value='"+gametimes[a]['thisid']+"' "+((data[1]['gtid']==gametimes[a]['thisid'])?"SELECTED":"")+">"+gametimes[a]['gtname']+"</option>";
		}
		out+="							</select>";
		out+="                </label>";
		out+="            </fieldset>";
		out+="            <div class='title'>";
		out+="                <h2>更改大頭貼</h2>";
		out+="                <br clear='both'>";
		out+="            </div>";
		out+="			  <input type='hidden' name='headpicid' class='formfield' id='headpicid' value='"+(data[1]['headpic']?data[1]['headpic']:"")+"'>";
		out+="            <fieldset>";
		out+="                <div class='cover' id='piccover'>";
		out+="					 <form action='' method='post' id='headpicform' enctype='multipart/form-data'>\n";
		if(data[1]['headpic']){
			out+="                		<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1]['headpic'])+"' class='popimgclick fullw' data-type='self' data-val='"+data[1]['headpic']+"' />\n";
		}else{
			out+="                		<img src='img/basichead.png' />\n";
		}
		out+="                    <input type='file' accept='image/*' class='instantupload' name='headpic' data-job='uploadhead' data-form='headpicform' data-target='headpicid' data-pictargettype2='piccover' data-type='cover'>";
		out+="                    <i class='fa fa-camera' aria-hidden='true'></i>";
		out+="				     </form>";
		out+="                </div>";
		out+="            </fieldset>";
		out+="            <button class='send submitclick' type='button' data-type='edituser'>確認修改</button>";
		out+="        </div>";
		$("#usereditor").html(out);
	});
}
show_mypagearticle=function(x,z,y,p){
	var out="";
	if(x){
		var m=x;
	}else{
		var m=sessionStorage.getItem("userid");
	}
	var m2=z;
	if(y){
		myy=y;
	}else{
		myy="";
	}
	if(p){
		myp=p;
	}else{
		myp="";
	}
	out+="    <header>";
	out+="        <div class='link back popusercloseu  applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	if(m==sessionStorage.getItem("userid")){
		out+="        <div class='link maintemselect applebtn' id='myarticlecnt'  data-type='article' data-val='4'>";
		out+="			<i class='fa fa-plus' aria-hidden='true'></i>";
		out+="        </div>";
		out+="        	  <div class='word active fpageselect applebtn' data-type='publishpage' data-val='1' data-id='"+x+"'>我的攻略</div>";
		out+="        	  <div class='word fpageselect applebtn' data-type='publishpage' data-val='2' data-id='"+x+"'>我的草稿</div>";
	}
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='album' id='popcontentbox' data-type='article' data-val='mainlist' data-id='"+myp+"'>";
	out+="    	<div class='search'>";
	out+="    		<input class='searchtext' type='text' placeholder='搜尋標題'>";
	out+="    		<button class='applebtn searchsubmit' data-type='myarticle' data-1='"+m+"'  data-2='"+m2+"'   data-3='"+myy+"'   data-4='"+myp+"'>";
	out+="    		<i class='fa fa-search' aria-hidden='true'></i>";
	out+="    		</button>";
	out+="    	</div>";
	out+="    	<div id='popitemlast'></div>\n";
	out+="    </div>\n";

	//out+="    <div class='album' id='myarticlewrap'>";
	//out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	//out+="	</div>";
	popbaseuseru(out);//寫出
	sessionStorage.getItem("popgetmore",1);
	popgetmoreboard(m,m2,myy,myp);
	//show_mypagearticlein(x,z,y,p);
}
show_mypagearticlein=function(x,z,y,p){
	var out="";
	var m=x;
	var m2=parseInt(z);
	var mysea=y;
	var mylast=p;
	$("#popcontentbox").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
	var tempvals=Array(x,z,y,p); //類別 / key / 最後id / page
	tempitem=ajaxarr("show_mypage3",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
			if(data[0]=="ERR"){
				$("#popcontentbox").html('');
				$(".fpageselect").removeClass("active");
				$(".fpageselect").eq(m2-1).addClass("active");
				var out="";
				out+="    	<div class='search'>";
				out+="    		<input class='searchtext' type='text' placeholder='搜尋標題'>";
				out+="    		<button class='applebtn searchsubmit' data-type='myarticle' data-1='"+m+"'  data-2='"+m2+"'  >";
				out+="    		<i class='fa fa-search' aria-hidden='true'></i>";
				out+="    		</button>";
				out+="    	</div>";
			//	out+="查無相關資料";
				$("#popcontentbox").html(out);
				swal("查無相關資料");
			}else{
				var out="";
				out+="    	<div class='search'>";
				out+="    		<input class='searchtext' type='text' placeholder='搜尋標題'>";
				out+="    		<button class='applebtn searchsubmit' data-type='myarticle' data-1='"+m+"'  data-2='"+m2+"'  >";
				out+="    		<i class='fa fa-search' aria-hidden='true'></i>";
				out+="    		</button>";
				out+="    	</div>";
				//out+="<div>";
				if(data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['thisid'];
						if(m2==2){
							out+=print_articleitem(data[1][a],2);
						}else{
							out+=print_articleitem(data[1][a]);
						}
					}
					//out+="</div>";
					out+="    	<div id='popitemlast'></div>\n";
				}else{
					//out+="查無相關資料";
					swal("查無相關資料");
				}
				$("#popcontentbox").html(out);
				$(".fpageselect").removeClass("active");
				$(".fpageselect").eq(m2-1).addClass("active");
			}
	});
}
//我的朋友列表
show_mypagefriend=function(x){
	var out="";
	var m=x;
		out+="    <header>";
		out+="        <div class='link back popusercloseu  applebtn'>";
		out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
		out+="            <span>返回</span>";
		out+="        </div>";
		out+="        <div class='link word' id='myfriendcnt'>我的好友</div>";
		out+="        <br clear='both'>";
		out+="    </header>";
		out+="    <div class='friend' id='myfriendwrap'>";
		out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
		out+="	</div>";
	popbaseuseru(out);//寫出
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage4",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[0]=="ERR"){
			$("#myfriendwrap").html(data[1]);
		}else{
			var out="";
			out+="		  <div class='search'>";
			out+="            <input type='text' id='myfriendval' placeholder='搜尋暱稱'>"; //20190424 Pman 移除ID的搜尋提示
			out+="            <button id='myfriendsearchclick' class='applebtn'><i class='fa fa-search' aria-hidden='true'></i></button>";
			out+="        </div>";
			if(m==sessionStorage.getItem("userid")){
				for(var a=0;a<data[1].length;a++){
					out+=print_frienditem(data[1][a],11);
				}
				for(var a=0;a<data[2].length;a++){
					out+=print_frienditem(data[2][a],12);
				}
			}else{
				var flist=[];
				if(data[2]){
					flist=data[2];//這是我的朋友名單
				}
				for(var a=0;a<data[1].length;a++){
					if(m==sessionStorage.getItem("userid")){
						out+=print_frienditem(data[1][a],11);
					}else if(flist.length>0){
						flag=0;
						for(b=0;b<flist.length;b++){
							if(flist[b]['uid']==data[1][a]['uid']){
								flag=1;
							}
						}
						if(flag==1){
							out+=print_frienditem(data[1][a],4);
						}else{
							out+=print_frienditem(data[1][a],1);
						}
					}else{
						out+=print_frienditem(data[1][a],1);
					}
				}
			}
			$("#myfriendwrap").html(out);
		}

	});
}
//我的蒐藏
show_mypagecollect=function(x){
	var out="";
	var m=x;
	out+="    <header>";
	out+="        <div class='link back popusercloseu  applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="		<div class='word maincontentselect active applebtn' data-val='1' data-type='arc'>動態收藏(<span id='wallcollect'></span>)</div>";
	out+="		<div class='word maincontentselect applebtn' data-val='2' data-type='arc'>攻略收藏(<span id='artcollect'></span>)</div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall' id='mycollectwrap'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="	  </div>";
	popbaseuseru(out);//寫出
	show_mypagecollectin(1);//設定第一頁
}
show_mypagecollectin=function(x,y,z){
	var mytype="arc";
	var myval=x;
	if(y){
		var mylast=y;
	}else{
		mylast=0;
	}
	var mykey=z;

	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),myval,mytype,mylast,'',gameselect,mykey);//人 / key
	tempitem=ajaxarr("show_board",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		if(data[0]=="ERR"){
			//$("#mycollectwrap").html(data[1]);
		}else{
			$("#wallcollect").html(data[3]);
			$("#artcollect").html(data[4]);
			var out="";
			lastid=0;
			if(myval==1){
				out+="    <div >";
				if(data[1] && data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						out+=print_wallitemc(data[1][a]);
						//lastid=data[1][a]['thisid'];
					}
				}
				out+="</div>";
			}else if(myval==2){
				out+="    <div class='album white' data-type='arc' data-val='mainlist' data-key='2'>";
				if(data[1] && data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						out+=print_articleitemc(data[1][a]);
						//lastid=data[1][a]['thisid'];
					}
				}
				//out+="							<div id='mainitemlastpop' data-val='"+lastid+"'></div>";
				out+="</div>";
			}
			$("#mycollectwrap").html(out);
			setTimeout(function(){
				wall_slides();
			},1000);
		}
	});
}
//相簿
show_mypagephoto=function(x,z){
	var out="";
	var m=x;
	out+="    <header>";
	out+="        <div class='link back popusercloseu  applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	if(x==sessionStorage.getItem("userid")){
		out+="        <div class='link maintemselect applebtn' data-type='albumnew' data-val='4'>";
		out+="		  	<i class='fa fa-plus' aria-hidden='true'></i>";
		out+="        </div>";
	}
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='album photos' id='myalbumwrap'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="	</div>";
	popbaseuseru(out);//寫出
	//show_mypagecollectin(1);//設定第一頁
	var out="";
	var m=x;
	var m2=z;
	$("#myalbumwrap").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
	show_mypagephotoin(m,m2);
}
//相簿元件
show_mypagephotoin=function(x,z){
	var out="";
	var m=x;
	var m2=parseInt(z);
	//$("#maincontentwrapin").html("<div class='loaderbox'><img src='assets/img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,z); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(m2==1){
			out="";
			if(data[1]){
				for(var a=0;a<data[1].length;a++){
					out+="        <div class='list' data-id='"+data[1][a]['id']+"'>\n";
					out+="            <div class='title'>"+data[1][a]['thisname']+"(<span class='albcnt'>"+data[1][a]['cnt']+"</span>)\n";
					out+="                <label class='sub applebtn'>\n";
					out+="                    <i class='fa fa-chevron-down applebtn' aria-hidden='true'></i>\n";
					if(m==sessionStorage.getItem("userid")){
						out+="                    <div class='sub-menu'>\n";
						out+="                        <span class='maintemselect applebtn' data-type='albumtext' data-val=4' data-id='"+data[1][a]['id']+"'>編輯相簿名稱</span>\n";
						out+="                        <span class='maintemselect applebtn' data-type='albumphoto' data-val=4' data-id='"+data[1][a]['id']+"'>新增照片</span>\n";
						out+="                        <span class='maintemselect applebtn' data-type='alb' data-val=3' data-id='"+data[1][a]['id']+"'>刪除</span>\n";
						out+="                    </div>\n";
					}
					out+="                </label>\n";
					out+="            </div>\n";
					out+="           <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1][a]['thisfile']+"' class='albclick applebtn' data-val='"+data[1][a]['id']+"'>\n";
					out+="        </div>\n";
				}
			}
		}
		$("#myalbumwrap").html(out);
	});
}
//相簿內頁
show_mypagealbin=function(x){
	var out="";
	var m=x;
	var out="";
	var m=x;
	/*
	out+="    <header>";
	out+="        <div class='link back popfullclose applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div id='albuminid' class='link maintemselect applebtn' data-type='albumphoto' data-val=4' data-id=''>";
	out+="		  	<i class='fa fa-plus' aria-hidden='true'></i>";
	out+="        </div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='album photos' id='myalbumwrapin'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="	  </div>";
	popbasefull(out);
	*/

	$("#myalbumwrapin").html("<div class='loaderbox'><img src='assets/img/loaderd.gif'></div>");
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5alb",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		out="";
		if(data[1]){
			out+="    <header>";
			out+="        <div class='link back allpopupclose applebtn'>";
			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
			out+="            <span>返回</span>";
			out+="        </div>";
			if(data[1]['memberid']==sessionStorage.getItem("userid")){
				out+="        <div id='albuminid' class='link maintemselect applebtn' data-type='albumphoto' data-val='4' data-id='"+m+"'>";
				out+="		  	<i class='fa fa-plus' aria-hidden='true'></i>";
				out+="        </div>";
			}
			out+="        <br clear='both'>";
			out+="    </header>";
			out+="    <div class='album photos' id='myalbumwrapin'>";
			out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
			out+="	  </div>";
			allpopup(out);
			out+="		  <p>"+data[1]['thiscontent']+"</p>";
			for(var a=0;a<data[1]['pho'].length;a++){
				out+="        <div class='list'>";
				if(data[1]['memberid']==sessionStorage.getItem("userid")){
					out+="            <div class='title'>";
					out+="                <label class='sub applebtn'>";
					out+="                    <i class='fa fa-chevron-down applebtn' aria-hidden='true'></i>";
					out+="                    <div class='sub-menu'>";
					out+="                        <span class='maintemselect applebtn' data-type='pho' data-val=3' data-id='"+data[1]['pho'][a]['thisid']+"'>刪除</span>";
					out+="                    </div>";
					out+="                </label>";
					out+="            </div>";
				}
				out+="            <div class='img-gallery'>";
				out+="            <span class='chatimg popimgclick' data-type='chat'>"; //20181005 Pman 幫相簿加上單張放大觀看的功能
				out+="                <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1]['pho'][a]['thisfile']+"' />";
				out+="                </span>";
				out+="            </div>";
				out+="        </div>";
			}
		}
		$("#albuminid").data("id",m);
		$("#myalbumwrapin").html(out);
	});
}
//修改文字
show_centeralbumboxtext=function(x){
	var out="";
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	var mem=xmem;
	//var mem=JSON.parse(sessionStorage.getItem("member"));
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5alb",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[1]['isdefault']==1){
			swal("動態相片無法編輯");
		}else{
			out+="    <form action='' method='post' id='newsformalbumtext'>\n";
			out+="    <header>";
			out+="        <div class='link back allpopupclose applebtn submitback'>";
			//out+="        <div class='link back popfullcloseu applebtn'>";
			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
			out+="            <span>返回</span>";
			out+="        </div>";
			out+="        <div class='link'>";
			out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='newsformalbumtext' data-id='"+data[1]['thisid']+"'>確認編輯</span>";
			out+="		  </div>";
			out+="        <br clear='both'>";
			out+="    </header>";
			out+="    <div class='wall qa'>";
			out+="        <div class='post page'>";
			out+="            <input type=text name='title' class='formfield form-control' value='"+data[1]['thisname']+"' placeholder='輸入標題30字內'  data-err='請輸入標題'>";
			out+="            <textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield '>"+data[1]['thiscontent']+"</textarea>";
			out+="            <br clear='both'>";
			out+="        </div>";
			out+="    </div>";
			out+="    </form>";
			//popbasefullu(out);
			allpopup(out);
		}
	});
}
//修改照片
show_centeralbumboxphoto=function(x){
	var out="";
	var tt=x;
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	var mem=xmem;
	//var mem=JSON.parse(sessionStorage.getItem("member"));
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5alb",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[1]['isdefault']==1){
			swal("動態相片無法編輯");
		}else{
			out+="    <form action='' method='post' id='newsformalbum'>\n";
			out+="    <header>";
	//		out+="        <div class='link back allpopupclose applebtn submitback'>";
			out+="        <div class='link back allpopupclose applebtn'>";//關閉提醒未儲存
//			out+="        <div class='link back popfullcloseu applebtn'>";
			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
			out+="            <span>返回</span>";
			out+="        </div>";
			//out+="        <div class='link'>";
			//out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='newsformalbumphoto'>確認修改</span>";
			//out+="		  </div>";
			out+="        <br clear='both'>";
			out+="    </header>";
			out+="    <div class='wall qa'>";
			out+="        <div class='post page'>";
			out+="            <br clear='both'>";
			out+="            <div class='select'>";
			out+="                <div class='label'>";
			out+="                	<div class='img' id='newsformfilebox' style='position:relative;z-index:4;'>";
			for(var a=0;a<data[1]['pho'].length;a++){
				out+="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1]['pho'][a]['thisfile'])+"'><i class='fa fa-times-circle predelclick applebtn' aria-hidden='true' data-job='albpic'  data-albid='"+data[1]['pho'][a]['albid']+"' data-val='"+data[1]['pho'][a]['thisfile']+"' ></i></div>";
			}
			out+="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+tt+"' class='fileupload instantupload' data-job='addalbpicx' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
			out+="                	</div>";
			out+="                </div>";
			out+="            </div>";
			out+="        </div>";
			out+="    </div>";
			out+="    </form>";
			//popbasefullu(out);
			allpopup(out);
		}
	});
}
//新增相簿
show_centeralbumboxnew=function(x){
	var out="";
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	var mem=xmem;
	//var mem=JSON.parse(sessionStorage.getItem("member"));

		out+="    <form action='' method='post' id='newsformalbum'>\n";
		out+="    <header>";
		out+="        <div class='link back allpopupclose applebtn submitback'>";
		//out+="        <div class='link back popusercloseu2 applebtn'>";
		out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
		out+="            <span>返回</span>";
		out+="        </div>";
		out+="        <div class='link'>";
		out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='newsformalbum'>新增相簿</span>";
		out+="		  </div>";
		out+="        <br clear='both'>";
		out+="    </header>";
		out+="    <div class='wall qa'>";
		out+="        <div class='post page'>";
		out+="            <input type=text name='title' class='formfield form-control' placeholder='輸入標題30字內'  data-err='請輸入標題'>";
		out+="            <textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield '></textarea>";
		out+="            <input type=hidden name='picaddress' id='newsformfilename'  class='formfield'/>\n";
		out+="            <input type=hidden name='pictype' id='newsformfiletype'  value='3' class='formfield'/>\n";
		out+="            <br clear='both'>";
		out+="            <div class='select'>";
		out+="                 <label>";
		out+="                     設定權限";
		out+="                     <select id='q_open'>";
		out+="                         <option value='1'>公開</option><option value='2'>僅限朋友</option><option value='3'>僅限本人</option>";
		out+="                     </select>";
		out+="                 </label>";
		out+="					<input type=hidden value='' id='q_type'  data-id='q_type'>";
		//out+="                <label>";
		//out+="                    選擇遊戲";
		//out+="                    <select class='popclick applebtn' data-type='selectgametag' id='q_type' data-id='q_type'>";
		//out+="                        <option value=''>請選擇</option>";
		//out+="                    </select>";
		//out+="                </label>";
		out+="                <label>";
		out+="                    上傳圖片";
		out+="					   <input name='file[]' class='fileupload instantuploadm' type='file' accept='image/*' multiple='multiple' data-type='replace' data-pictarget='newsformfilebox' data-targettype='newsformfiletype' data-target='newsformfilename' data-form='newspicform' data-job='uploadnewspicbook'>";
		out+="                     <button class='upload'>";
		out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
		out+=" 					   </button>";
		out+="                </label>";
		out+="                <div class='label'>";
		out+="                	<div class='img' id='newsformfilebox' style='position:relative;z-index:4;'>";
		out+="                	</div>";
		out+="                </div>";
		out+="            </div>";
		out+="        </div>";
		out+="    </div>";
		out+="    </form>";
		//popbaseuseru2(out);
		allpopup(out);
}

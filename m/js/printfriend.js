//############### 配對 ##############################

// 配對好友首頁
show_centermatch=function(x){
	var temp=x;
	var out="";
	out+="        <header id='noticewrap'>";
	out+="            <div class='link back applebtn popfullclose' >";
	out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="                <span>返回</span>";
	out+="            </div>";
	out+="        	  <div class='word active fpageselect applebtn' data-type='search'>搜尋</div>";
	out+="        	  <div class='word  fpageselect applebtn' data-type='match'>配對</div>";
	out+="        	  <div class='word fpageselect applebtn' data-type='sended'>已送出</div>";
	out+="        </header>";
	out+="    	  <div class='friend friendwrap'>";
	out+="			<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="	  	  </div>";
	popbasefull(out);
	//show_friendmatch("");
	show_friendsearch('');
}
//搜尋頁
show_friendsearch=function(x){
	var out="";
	out+="        <div class='search'>";
	out+="            <input type='text' class='headsearch' placeholder='搜尋暱稱'>"; //20190424 Pman 移除ID的搜尋提示
	out+="            <button  class='headsearchsubmit'><i class='fa fa-search' aria-hidden='true'></i></button>";
	out+="        </div>";
	if(x[1]){
		for(var a=0;a<x[1].length;a++){
			out+=print_frienditem(x[1][a],x[1][a]['isfriend']);
		}
	}
	$(".friendwrap").html(out);
}
// 配對頁
show_friendmatch=function(x){
		$(".friendwrap").html("			<div class='loaderbox'><img src='assets/img/loader.gif' style='padding-top:45px;'></div>"); //20190423 Pman 調整Loading 圖的位置
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
		tempitem=ajaxarr("get_match_system",tempvals,ajaxurl);
		tempitem.success(function(data){
			var out="";
			out+="        <div class='change'>";
			out+="             <button id='popfriendsbox'>更改配對條件</button>";
			out+="         </div>";
			if(data[0]=="ERR"){
				swal(data[1]);
			}else{
				if(data[1]){
					for(var a=0;a<data[1].length;a++){
						out+=print_frienditem(data[1][a],1);
					}
				}
			}
			$(".friendwrap").html(out);
		});
}
// 配對頁--自選項
show_friendmatch_c=function(x){
	var tt=x;
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),tt.eq(0).val(),tt.eq(1).val(),tt.eq(2).val(),tt.eq(3).val(),tt.eq(4).val());//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	popfullcloseu();
	$(".friendwrap").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
	tempitem=ajaxarr("get_match_request",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		var out="";
		out+="        <div class='change'>";
		out+="             <button id='popfriendsbox'>更改配對條件</button>";
		out+="         </div>";
		if(data[0]=="ERR"){
			swal(data[1]);
		}else{
			if(data[1]){
				for(var a=0;a<data[1].length;a++){
					out+=print_frienditem(data[1][a],1);
				}
			}
		}
		$(".friendwrap").html(out);
	});
}
//送出頁(邀請)
show_friendsended=function(x){
		$(".friendwrap").html("			<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
		tempitem=ajaxarr("get_match_send",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				swal(data[1]);
				$(".friendwrap").html('');
			}else{
				var out="";
				//out+="        <div class='change'>";
				//out+="             <button>更改配對條件</button>";
				//out+="         </div>";
				if(data[1]){
					for(var a=0;a<data[1].length;a++){
						out+=print_frienditem(data[1][a],2);
					}
				}
				$(".friendwrap").html(out);
			}
		});
}

//好友列表
show_centerfriendlist=function(x){
	var out="";
	out+="                    <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
	out+="                        <div id='maincontentwrap'>\n"
	out+="                            <!--主要內容-->\n";
	out+="                            <div id='maincontentbox'  data-type='match' data-val='mainlist'>\n";
	out+="                            </div>\n";
	out+="                            <!--主要內容-->\n";
	out+="                        </div>\n";
	out+="                    </DIV>\n";
	out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
	out+="					<div id='centerrankwrap'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside1' data-type='side1'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside2' data-type='side2'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside3' data-type='side3'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside4' data-type='side4'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside5' data-type='side5'>\n";
	out+="					</div>\n";
	out+="				  </DIV>\n";
	$("#mainmidwrapin").html(out);
	get_centerrightbanner();
	get_centertoprank();
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / id
	tempitem=ajaxarr("get_friendlist",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#maincontentbox").html('');
		}else{
			var out="";
			for(var a=0;a<data[1].length;a++){
				out+=print_frienditem(data[1][a],4);
			}
			$("#maincontentbox").html(out);
			chk_notice();//在ajax.js
		}
	});
}
// 跳出配對選項
pop_matchselect=function(){
	var out="";
	//var tags=sessionStorage.getItem("tags");//更新
	var locs=JSON.parse(sessionStorage.getItem("locations"));//更新
	var gts=JSON.parse(sessionStorage.getItem("gametimes"));//更新
	out+="        <header id='noticewrap'>";
	out+="            <div class='link back applebtn popfullcloseu' >";
	out+="                <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="                <span>返回</span>";
	out+="            </div>";
	out+="            <div class='link word'>修改配對條件</div>";
	out+="            <br clear='both'>";
	out+="        </header>";
	out+="        <div class='contact match' id='fswrap'>";
	out+="            <label class='relay'>";
	out+="                玩的遊戲1";
	out+="					 		<div class='popclick applebtn stagcover' data-type='selectgametag' data-id='sg1'></div>";
	out+="							<select name='game1' id='sg1' class='formfield form-control gametagselect applebtn' data-type='selectgametag' data-id='sg1' data-err='請選擇遊戲名稱'>";
	out+="								<option value=''>請選擇遊戲名稱</option>";
	out+="							</select>";
	out+="            </label>";
	out+="            <label class='relay'>";
	out+="                玩的遊戲2";
	out+="					 		<div class='popclick applebtn stagcover' data-type='selectgametag' data-id='sg2'></div>";
	out+="							<select name='game2' id='sg2' class='formfield form-control gametagselect applebtn' data-type='selectgametag' data-id='sg2' data-err='請選擇遊戲名稱'>";
	out+="								<option value=''>請選擇遊戲名稱</option>";
	out+="							</select>";
	out+="            </label>";
	out+="            <label class='relay'>";
	out+="                玩的遊戲3";
	out+="					 		<div class='popclick applebtn stagcover' data-type='selectgametag' data-id='sg3'></div>";
	out+="							<select name='game3' id='sg3' class='formfield form-control gametagselect applebtn' data-type='selectgametag' data-id='sg3' data-err='請選擇遊戲名稱'>";
	out+="								<option value=''>請選擇遊戲名稱</option>";
	out+="							</select>";
	out+="            </label>";
	out+="            <label>";
	out+="                遊戲時段";
	out+="							<select  name='gametime' class='formfield ' id='popgametime'>";
	out+="								<option value=''>請選擇遊戲時段</option>";
	for(var a=0;a<gts.length;a++){
		out+="<option value='"+gts[a]['thisid']+"'>"+gts[a]['gtname']+"</option>";
	}
	out+="							</select>";
	out+="            </label>";
	out+="            <label>";
	out+="                所在地區";
	out+="                    <select  name='location' class='formfield form-control' data-err='請選擇地區'>";
	out+="								<option value=''>請選擇地區</option>";
	for(var a=0;a<locs.length;a++){
		out+="<option value='"+locs[a]['thisid']+"'>"+locs[a]['thisname']+"</option>";
	}
	out+="                    </select>";
	out+="            </label>";
	out+="            <label>";
	out+="                <button class='send' id='matchchangeclick'>開始配對</button>";
	out+="            </label>";
	out+="        </div>";
	popbasefullu(out);
}
//交友邀請 one
show_centermatchone=function(x){
	var out="";
	out+="                    <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
	out+="                        <div id='maincontentwrap'>\n"
	out+="                            <!--主要內容-->\n";
	out+="                            <div id='maincontentbox'  data-type='match' data-val='mainlist'>\n";
	out+="                            </div>\n";
	out+="                            <!--主要內容-->\n";
	out+="                        </div>\n";
	out+="                    </DIV>\n";
	out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
	out+="					<div id='centerrankwrap'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside1' data-type='side1'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside2' data-type='side2'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside3' data-type='side3'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside4' data-type='side4'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' id='bannerside5' data-type='side5'>\n";
	out+="					</div>\n";
	out+="				  </DIV>\n";
	$("#mainmidwrapin").html(out);
	get_centerrightbanner();
	get_centertoprank();
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	//tempitem=ajaxarr("up_matchone",tempvals,ajaxurl);
	tempitem=ajaxarr("show_matchone",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#maincontentbox").html('');
		}else{
			var out="";
			out+=print_frienditem(data[1],3);
			$("#maincontentbox").html(out);
			chk_notice();//在ajax.js
		}
	});
}

show_centermatchlist=function(x){
	if($("#addgamematchselecttime").val() || $("#addgamematchselectarea").val() || localStorage.getItem("friendselect")){
		var out="";
		$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),JSON.parse(localStorage.getItem("friendselect")),$("#addgamematchselectarea").val(),$("#addgamematchselecttime").val());//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
		tempitem=ajaxarr("get_match_request",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
				if(data[0]=="ERR"){
					popnotice(data[1]);
					$("#maincontentbox").html('');
				}else{
					var out="";
					for(var a=0;a<data[1].length;a++){
							lastid=data[1][a]['uid'];
							out+=print_frienditem(data[1][a],1);
					}
					out+="							<div id='mainitemlast' data-val='"+lastid+"'></div>";
					$("#maincontentbox").html(out);
					setTimeout(function(){
						wall_slides();//這是為了getboard用的
					},1000);
				}
		});
	}else{
		$("#maincontentbox").html('');
	}
}
//系統配對葉面
show_centermatchsystem=function(){
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("get_match_system",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				popnotice(data[1]);
			}else{
				var out="";
				for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['uid'];
						out+=print_frienditem(data[1][a],1);
				}
				out+="							<div id='mainitemlast' data-val='"+lastid+"'></div>";
				$("#maincontentbox").html(out);
				setTimeout(function(){
					wall_slides();//這是為了getboard用的
				},1000);
			}
	});
}

//寄送邀請葉面
show_centermatchsendlist=function(){
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("get_match_send",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				//alert(data[1]);
				$("#maincontentbox").html('');
			}else{
				var out="";
				for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['uid'];
						out+=print_frienditem(data[1][a],2);
				}
				$("#maincontentbox").html(out);
			}
	});
}


//################### POP UP
	popaddfriend=function(x){//加朋友
		var out="";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3 tleft'>輸入邀請訊息</div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='text' class='addfriendtext' name='name' placeholder='寫一段話給對方吧?'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3'></div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='submit'  name='submit' value='送出' class='addfriend border5 formbtn ' data-type='addtext' data-val='"+x+"'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		popbase("輸入邀請訊息",out,''); //20190426 Pman 調整輸出訊息
		$("#popinu").addClass("add-friend"); //20190426 Pman 強制修改輸入邀請訊息的對話框樣式
	}
//############交友原件
print_frienditem=function(xdata,z){//z=1 加朋友, z=2 刪除邀,z=3加朋友請,z=13 加聊天室
		ranks=JSON.parse(sessionStorage.getItem("ranks"));
		tags=JSON.parse(sessionStorage.getItem("tags"));
		showrank="";
		 myrank="";
		 myrate="";
		if(ranks){
			 for(var a=0;a<ranks.length;a++){
				  if(parseInt(xdata['score'])>=parseInt(ranks[a]['score'])){
					  showrank=ranks[a]['rankname'];
					   myrank=ranks[a]['rankid'];
				  }
			 }
		}
		var out="";

		out+="        <div class='list'>";
		if(xdata['headpic']){
			out+="                                      <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['headpic'])+"' class='img popclick applebtn' data-type='mypage' data-id='"+xdata['uid']+"' data-val='1'/>\n";
		}else{
			out+="										<img src='img/basichead.png'  class='img popclick applebtn'  data-type='mypage' data-id='"+xdata['uid']+"' data-val='1'/>\n";
		}
		out+="            <div class='right'>";
		out+="            	 <div class='name popclick applebtn' data-type='mypage' data-id='"+xdata['uid']+"' data-val='1'>"+xdata['nickname']+"<span>"+showrank+"/聲望."+myrank; //20181012 Pman 'LV.'==>'聲望'
		if(xdata['gender']){//20181012 Pman 增加玩家名片「性別」的顯示
				out+="/"+(xdata['gender']=="1"?"男":"女");
		}
		if(xdata['birthday']){//20181012 Pman 增加玩家名片「年齡」、「星座」的顯示
				out+="/"+get_ages(xdata['birthday'])+"/"+get_horo(xdata['birthday']);
		}
		out+="</span></div>";
		if(z==3){
			out+="				<div class='message'>";
			if(xdata['addtext']){
				out+=xdata['addtext'];
			}else{
				out+="讓我們成為朋友吧";
			}
			out+="              </div>";
			out+="<button class='btn addfriend' data-type='add2' data-val='"+xdata['uid']+"'>接受邀請</button> <button class='btn nobg addfriend' data-type='reject' data-val='"+xdata['uid']+"'>忽略</button>";
		    //out+="            <button class='send add addfriend' data-type='add2' data-val='"+xdata['uid']+"' ><i class='fa fa-plus' aria-hidden='true'></i></button>";
			//out+="                                                <div class='btn addfriend fR' data-type='add2' data-val='"+xdata['uid']+"'>加朋友</div> <div class='btn addfriend fR' data-type='reject' data-val='"+xdata['uid']+"'>拒絕邀請</div>\n";
		}else{
			out+="                <ul class='game'>";
			for(var a=1;a<4;a++){
				if(xdata['game'+a] && xdata['game'+a] >0 && xdata['game'+a+"_v"]==1){
					showtag="";
					mytag="";
					for(var b=0;b<tags.length;b++){
					  if(tags[b]['gameid']==xdata['game'+a]){
						  showtag=tags[b]['gamename'];
						   mytag=tags[b]['gameid'];
						   break; //20190305 Pman 找到對應的標籤後就中斷，減少不必要的比對
					  }
					}
					if(b<tags.length-1 && tags[b]['hidesee']==1) continue; //20190305 Pman 如果是隱藏標籤，不顯示	//20190509 Pman 加上a的數值判斷，避免超過tags的陣列長度	
					out+="            <li>";
					out+="                <span>"+showtag+"</span>";
					out+="                <p>"+(xdata['game'+a+'note']?xdata['game'+a+'note']:"")+"</p>";
					out+="             </li>";

				}
			}
			out+="                </ul>";
		}
		out+="           </div>\n";
		//接受邀請的換到menu上去了
		if(z==1 && xdata['uid']!=sessionStorage.getItem("userid") ){//加好友的標準版
			out+="            <button class='send add addfriend applebtn' data-type='add' data-val='"+xdata['uid']+"' ><i class='fa fa-plus' aria-hidden='true'></i></button>";
			//out+="                                                <div class='btn addfriend fR' data-type='add' data-val='"+xdata['uid']+"'>加朋友</div>\n";
		}else if(z==2){//邀請中版本
			out+="            <button class='btn nobg addfriend applebtn' data-type='delete' data-val='"+xdata['uid']+"'>取消邀請</button>";
			//out+="                                                <div class='btn addfriend fR' data-type='delete' data-val='"+xdata['uid']+"'>取消邀請</div>\n";
		}else if(z==4){//取消朋友
			out+="            <button class='btn nobg addfriend applebtn' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</button>";
			//out+="                                                <div class='btn addfriend fR' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</div>\n";
		}else if(z==11){//我的好友列表//本人-- 線上好友
			out+="<button class='send on fa frienditem applebtn' data-type='friend' data-val='"+xdata['uid']+"'><i class='fa fa-commenting-o' aria-hidden='true'></i></button>";
			//out+="            <button class='btn nobg addfriend' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</button>";
			//out+="                                                <div class='btn addfriend fR' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</div>\n";
		}else if(z==12){//我的好友列表//本人-- 不在線好友
			out+="<button class='send fa frienditem applebtn' data-type='friend' data-val='"+xdata['uid']+"'><i class='fa fa-commenting-o' aria-hidden='true'></i></button>";
			//out+="            <button class='btn nobg addfriend' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</button>";
			//out+="                                                <div class='btn addfriend fR' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</div>\n";
		}else if(z==13){//邀請加入聊天室
			out+="<button class='send add chataddclick applebtn' data-val='"+xdata['uid']+"'><i class='fa fa-plus' aria-hidden='true'></i></button>";
		}
		//out+="            <button class='send add'><i class='fa fa-plus' aria-hidden='true'></i></button>
		out+="            <br clear='both'>";
		out+="            </div>";
		return out;
}

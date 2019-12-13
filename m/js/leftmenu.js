left_gameselectmenu=function(){
	if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
		var out="";
		//$("#leftfunctionbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
		/*
		tags=JSON.parse(sessionStorage.getItem("tags"));
		out+="                    <div id='leftgameonwrap'>\n";
		out+="                        <div id='leftgameontitle'>\n";
		out+="                            <img src='img/leftgameicon.png' class='fL' />\n";
		out+="                            <span class='fL' id='leftgameontitletext'>感興趣的</span>\n";
		out+="                            <div class='clr'></div>\n";
		out+="                        </div>\n";
		//out+="                        <div class='leftgameonlist'>\n";
		//out+="                            <div class='leftgameonlistname eyeselect' >\n";
		//out+="                               全部看\n";
		//if(gameselect[0]['show']==1){
		//	out+="                               <img src='img/lefteyes.png'class='leftgameselect'  data-type='hide' data-val='9999' />\n";
		//}else{
		//	out+="                               <img src='img/lefteyesoff.png' class='leftgameselect'  data-type='show' data-val='9999' />\n";
		//}
		//out+="                            </div>\n";
		//out+="                        </div>\n";
		if(gameselect.length>1){
			for(var a=1;a<gameselect.length;a++){//0=未分類
				for(var b=0;b<tags.length;b++){
					if(tags[b]['gameid']==gameselect[a]['gameid']){
						out+="                        <div class='leftgameonlist'>\n";
						out+="                            <div class='leftgameonlistname  eyeselect'>\n";
						if(stringBytes(tags[b]['gamename'])>22){
							tt=tags[b]['gamename'].split("");
							ax=0;
							for(ay=0;ay<tt.length;ay++){
								if(stringBytes(tt[ay])>1){
									ax+=2;
								}else{
									ax++;
								}
								if(ax<20){
								   out+=tt[ay];
								}
							}
							out+="...";
						}else{
							out+=tags[b]['gamename']+" \n";
						}
						if(gameselect[a]['show']==1){
							out+="                                <img src='img/lefteyes.png' class='leftgameselect' data-type='hide' data-val='"+tags[b]['gameid']+"' />\n";
						}else{
							out+="                                <img src='img/lefteyesoff.png' class='leftgameselect' data-type='show' data-val='"+tags[b]['gameid']+"' />\n";
						}
						out+="                                <i class='leftgameselect fa fa-times fa-vc eyedel' data-type='delete'  data-val='"+tags[b]['gameid']+"'></i>\n";
						out+="                            </div>\n";
						out+="                      	</div>\n";
						//break;
					}
				}
			}
		}
		out+="                        <!--新增-->\n";
		out+="                        <div id='addgameonlist'>\n";
		//out+="                            <div id='addgameonlisttitle'>\n";
		//out+="                                <DIV id='addgameonlistcircle'>+</DIV>\n";
		//out+="                                <DIV id='addgameonlisttext'>新增感興趣的遊戲</DIV>\n";
		//out+="                            </div>\n";
		out+="                            <div id='addgameonlistformwrap' style='display:block;'>\n";
		out+="                                <div id='addgameonlistselectwrap'>\n";
		out+="                                    <select id='addgameonlistselect' class='chosen leftselectitem'>\n";
		out+="                                        <option value=''>請選擇遊戲名稱</option>\n";
		for(var a=0;a<tags.length;a++){
			out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
		}
		out+="                                    </select>\n";
		out+="                                </div>\n";
		//out+="                                <div>\n";
		//out+="                                    <input type=text name='addgameonlistnote' id='addgameonlistnote' placeholder='請輸入備註' />\n";
		//out+="                                </div>\n";
		out+="                                <div class='tcenter marginv10'>\n";
		out+="                                    <input type=submit id='addgameonlistclick' class='border5' value='新增' />\n";
		out+="                                </div>\n";
		out+="                            </div>\n";
		out+="                        </div>\n";
		out+="                    </div><BR><BR><BR><BR><BR><BR><BR><BR><BR><BR><BR><BR>\n";
		$("#leftfunctionbox").html(out);
		jQuery(".chosen").chosen();
		*/
	}
}
left_qnaselectmenu=function(){
	var out="";
	$("#leftfunctionbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	//gameselect=JSON.parse(sessionStorage.getItem("gameselect"));
	tags=JSON.parse(sessionStorage.getItem("tags"));
	out+="                    <div id='leftgameonwrap'>\n";
	out+="                        <div id='leftgameontitle'>\n";
	out+="                            <img src='img/leftgameicon.png' class='fL' />\n";
	out+="                            <span class='fL' id='leftgameontitletext'>感興趣的</span>\n";
	out+="                            <div class='clr'></div>\n";
	out+="                        </div>\n";
//	out+="                        <div class='leftgameonlist'>\n";
//	out+="                            <div class='leftgameonlistname eyeselect ' >\n";
//	out+="                               全部看\n";
//	if(gameselect[0]['show']==1){
//		out+="                               <img src='img/lefteyes.png'class='leftgameselect'  data-type='hide' data-val='9999' />\n";
//	}else{
//		out+="                               <img src='img/lefteyesoff.png' class='leftgameselect'  data-type='show' data-val='9999' />\n";
//	}
//	out+="                            </div>\n";
//	out+="                        </div>\n";
	if(gameselect.length>1){
		for(var a=1;a<gameselect.length;a++){//0=未分類
			for(var b=0;b<tags.length;b++){
				if(tags[b]['gameid']==gameselect[a]['gameid']){
					out+="                        <div class='leftgameonlist'>\n";
					out+="                            <div class='leftgameonlistname  eyeselect'>\n";
					if(stringBytes(tags[b]['gamename'])>22){
						tt=tags[b]['gamename'].split("");
						ax=0;
						for(ay=0;ay<tt.length;ay++){
							if(stringBytes(tt[ay])>1){
								ax+=2;
							}else{
								ax++;
							}
							if(ax<20){
							   out+=tt[ay];
							}
						}
						out+="...";
					}else{
						out+=tags[b]['gamename']+" \n";
					}
					//out+=tags[b]['gamename']+" \n";
					if(gameselect[a]['show']==1){
						out+="                                <img src='img/lefteyes.png' class='leftgameselect' data-type='hide' data-val='"+tags[b]['gameid']+"' />\n";
					}else{
						out+="                                <img src='img/lefteyesoff.png' class='leftgameselect' data-type='show' data-val='"+tags[b]['gameid']+"' />\n";
					}
					out+="                                <i class='leftgameselect fa fa-times fa-vc eyedel' data-type='delete'  data-val='"+tags[b]['gameid']+"'></i>\n";
					out+="                            </div>\n";
					out+="                      	</div>\n";
					//break;
				}
			}
		}
	}
	out+="                        <!--新增-->\n";
	out+="                        <div id='addgameonlist'>\n";
	/*
	out+="                            <div id='addgameonlisttitle'>\n";
	out+="                                <DIV id='addgameonlistcircle'>+</DIV>\n";
	out+="                                <DIV id='addgameonlisttext'>新增感興趣的遊戲</DIV>\n";
	out+="                            </div>\n";
	*/
	out+="                            <div id='addgameonlistformwrap' style='display:block;'>\n";
	out+="                                <div id='addgameonlistselectwrap'>\n";
	out+="                                    <select id='addgameonlistselect' class='chosen leftselectitem'>\n";
	out+="                                        <option value=''>請選擇遊戲名稱</option>\n";
	for(var a=0;a<tags.length;a++){
		out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
	}
	out+="                                    </select>\n";
	out+="                                </div>\n";
	out+="                                <div class='tcenter marginv10'>\n";
	out+="                                    <input type=submit id='addgameonlistclick' class='border5' value='新增' />\n";
	out+="                                </div>\n";
	out+="                            </div>\n";
	out+="                        </div>\n";
	out+="                        <div class='leftgameontitle' style='margin-top:30px;'>\n";
	out+="                            <i class='fa fa-tags fL leftgameontitlei'></i>\n";
	out+="                            <span class='fL leftgameontitletext'>我的Q&A</span>\n";
	out+="                            <div class='clr'></div>\n";
	out+="                        </div>\n";
	out+="                        <li class='lefttypeselect_b btn qnaleftclick' data-val='0'>全部QA</li>\n";
	out+="                        <li class='lefttypeselect_b btn qnaleftclick' data-val='1'>我的Q&A</li>\n";
	out+="                        <li class='lefttypeselect_b btn qnaleftclick' data-val='2'>我的追蹤</li>\n";
	out+="                        <li class='lefttypeselect_b btn qnaleftclick' data-val='3'>我的回答</li>	\n";

	out+="                    </div><BR><BR><BR><BR><BR><BR><BR><BR><BR><BR><BR><BR>\n";
	$("#leftfunctionbox").html(out);
	jQuery(".chosen").chosen();
}
left_friendselectmenu=function(){
	var out="";
	$("#leftfunctionbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	tags=JSON.parse(sessionStorage.getItem("tags"));
	locations=JSON.parse(sessionStorage.getItem("locations"));
	gametimes=JSON.parse(sessionStorage.getItem("gametimes"));
	out+="                    <div id='leftgameonwrap'>\n";
	out+="                        <div id='leftgameontitle'>\n";
	out+="                            <img src='img/leftfriendicon.png' class='fL' />\n";
	out+="                            <span class='fL' id='leftgameontitletext'>好友配對</span>\n";
	out+="                            <div class='clr'></div>\n";
	out+="                        </div>\n";
	out+="                        <div class='leftgameontitletextsub'>選擇要配對的遊戲(最多三項)</div>\n";
	out+="                        <div id='addgameonlistselectwrap'>\n";
	out+="                                    <select id='addgamematchselect' class='leftfriendselect leftselectitem chosen' data-type='tags'>\n";
	out+="                                        <option value=''>請選擇遊戲名稱</option>\n";
	for(var a=0;a<tags.length;a++){
		out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
	}
	out+="                                    </select>\n";
	out+="                        </div>\n";
	out+="                        <div id='addgamematchwrap'>\n";
	/*
	if(friendselect.length>0){
		for(var a=1;a<=friendselect.length;a++){//0=未分類
			for(var b=0;b<tags.length;b++){
				if(tags[b]['gameid']==friendselect[a]['gameid']){
					out+="                            <div class='leftgameonlistname'>\n";
					out+=tags[b]['gamename']+"e \n";

					out+="                                <i class='leftfriendselect fa fa-times fa-vc delmatch btn' data-type='delete'  data-val='"+tags[b]['gameid']+"'></i>\n";
					out+="                            </div>\n";
					//break;
				}
			}
		}
	}
	*/

	out+="                        </div>\n";
	out+="                        <div class='leftgameontitletextsub'>選擇地區</div>\n";
	out+="                        <select id='addgamematchselectarea' class='leftfriendselect leftselectitem chosen' data-type='locations'>\n";
	out+="                                        <option value=''>選擇地區</option>\n";
	for(var b=0;b<locations.length;b++){
			out+="<option value='"+locations[b]['thisid']+"'>"+locations[b]['thisname']+"</option>\n";
	}
	out+="                        </select>\n";
	out+="                        <div class='leftgameontitletextsub'>選擇時段</div>\n";
	out+="                        <select id='addgamematchselecttime' class='leftfriendselect leftselectitem chosen' data-type='gametimes'>\n";
	out+="                                        <option value=''>選擇時段</option>\n";
	for(var b=0;b<gametimes.length;b++){
			out+="<option value='"+gametimes[b]['thisid']+"'>"+gametimes[b]['gtname']+"</option>\n";
	}
	out+="                        </select>\n";
	out+="                        <BR /><BR /><BR /><BR /><BR /><BR /><BR /><BR />\n";
	out+="						  <BR /><BR /><BR /><BR /><BR /><BR /><BR /><BR />\n";
	out+="                    </div>\n";
	$("#leftfunctionbox").html(out);
	jQuery(".chosen").chosen();
	left_friendgamelist();
}
left_friendgamelist=function(){
	var out="";
	$("#addgamematchwrap").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	tags=JSON.parse(sessionStorage.getItem("tags"));
	if(localStorage.getItem("friendselect")){
		friendselect=JSON.parse(localStorage.getItem("friendselect"));
	}else{
		localStorage.setItem("friendselect","");//更新
		friendselect="";
	}
	if(friendselect.length>0){
		for(var a=0;a<friendselect.length;a++){//
			for(var b=0;b<tags.length;b++){
				if(tags[b]['gameid']==friendselect[a]['gameid']){
					out+="                            <div class='leftgameonlistname'>\n";
					if(stringBytes(tags[b]['gamename'])>22){
						tt=tags[b]['gamename'].split("");
						ax=0;
						for(ay=0;ay<tt.length;ay++){
							if(stringBytes(tt[ay])>1){
								ax+=2;
							}else{
								ax++;
							}
							if(ax<20){
							   out+=tt[ay];
							}
						}
						out+="...";
					}else{
						out+=tags[b]['gamename']+" \n";
					}
					//out+=tags[b]['gamename']+" \n";

					out+="                                <i class='leftfriendselect fa fa-times fa-vc delmatch btn' data-type='delete'  data-val='"+tags[b]['gameid']+"'></i>\n";
					out+="                            </div>\n";
					break;
				}
			}
		}
	}
	$("#addgamematchwrap").html(out);
}
left_shopselectmenu=function(){
	var out="";
	$("#leftfunctionbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
	tempitem=ajaxarr("getcats",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		if(data[0]=="ERR"){
		}else{
			out+="<div class='lefttypeselect lefttypeselecton shopcatclick' data-val='0'>全部</div>";
			for(var a=0;a<data[1].length;a++){
				if(data[1][a]['img']==1){
					out+="<div class='lefttypeselect shopcatclick' data-val='"+data[1][a]['catid']+"' style='height:"+data[1][a]['h']+"px;background:url("+sessionStorage.getItem("imgurl")+"img/product/cat"+data[1][a]['catid']+".jpg);line-height:"+(parseInt(data[1][a]['h'])-16)+"px;text-shadow:1px 1px 7px rgba(0,0,0,0.5);'>"+data[1][a]['catname']+"</div>";
				}else{
					out+="<div class='lefttypeselect shopcatclick' data-val='"+data[1][a]['catid']+"'>"+data[1][a]['catname']+"</div>";
				}
			}
		}
		$("#leftfunctionbox").html(out);
	});

}
//排行榜選單
left_rankselectmenu=function(){
	var out="";
	$("#leftfunctionbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
	tempitem=ajaxarr("getranktype",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		if(data[0]=="ERR"){
		}else{
			var out="";
			out+="					<div class='lefttypeselect leftrankselect lefttypeselecton' data-type='click' data-val='1'>本月熱門遊戲排行Top 10</div>\n";
			out+="                    <div class='lefttypeselect leftrankselect' data-type='click' data-val='2'>本月熱門類型</div>\n";
			out+="                    <div class='lefttypeselect leftrankselect' data-type='open' data-val='leftsub1'>本月各類型人氣排行</div>\n";
			out+="                    <div class='lefttypeselectsubwrap' id='leftsub1'>\n";
			for(a=0;a<data[1].length;a++){
				out+="                        <li class='lefttypeselect_b  leftrankselect btn' data-type='subclick' data-val='9' data-id='"+data[1][a]['typeid']+"' >"+data[1][a]['typename']+"</li>\n";
			}
			out+="                    </div>\n";
			//out+="                    <div class='lefttypeselect leftrankselect' data-type='click' data-val='3'>本月會員排行Top30</div>\n";
			out+="                    <div class='lefttypeselect leftrankselect' data-type='click' data-val='4'>新進熱門遊戲排行</div>\n";
			out+="                </div>\n";
		}
		$("#leftfunctionbox").html(out);
	});
}




left_empty=function(){
	$("#leftfunctionbox").html('');
}

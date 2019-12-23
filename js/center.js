// ##############  MYPAGE ################################
show_mypageall=function(x,y,z){  	// x=subpage,y=id
	if(!x){		x=1;	}
	if(y){
		$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
		var m=y;
		var tempvals=Array(y,'vv'); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
		tempitem=ajaxarr("show_mypagebase",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
			if(data[0]=="ERR"){
				$("#mainmidwrapin").html('');
			}else{
				var out="";
				out+="                <!--上方個人資料框+選單-->\n";
				out+="                <div id='maincontenttitle' data-type='my' data-val='mainlist' class='imgitemboxx'>\n";
				/*
				if(data[1]['frontpic']){
					out+="                	<img src='uploadfile/"+data[1]['frontpic']+"' />\n";
				}else{
					out+="                	<img src='img/profile.jpg' />\n";
				}
				*/
				if(m==sessionStorage.getItem("userid")){
					out+="                            <span class='profileimgclick'  data-type='front'><i class='fa fa-pencil-square-o color_w  btn'></i></span>\n";
					out+="							  <form action='' method='post' id='frontpicformb' enctype='multipart/form-data'>\n";
					out+="							  <div class='instantbox' style='z-index:9;min-height:80px;position:relative;' id='mypagefrontpic' >\n";
				}
				if(data[1]['frontpic']){
					out+="                	<img src='uploadfile/"+data[1]['frontpic']+"'  style='position:relative;z-index:9;' id='frontpicitem' />\n";
				}else{
					out+="                	<img src='img/profile.jpg'  style='position:relative;z-index:9;' id='frontpicitem' />\n";
				}
				if(data[1]['addfriend']==1 && m!=sessionStorage.getItem("userid")){
					out+="			<div class='btn addfriend ' data-type='add' data-val='"+y+"' style='position:absolute;z-index:11;bottom:65px;right:20px;' >加朋友</div>\n";
				}
				if(m==sessionStorage.getItem("userid")){
					out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;'>請選擇</div>";
					out+="                            	<input type='file' accept='image/gif, image/jpeg, image/png, image/jpg' style='top:10px;left:10px;' class='formfield instantupload' name='frontpic'  data-job='uploadfrontb' data-form='frontpicformb' data-pictarget='mypagefrontpic' data-target='frontpicid' data-type='replace'>\n";
					out+="							  </div>\n";
					out+="							  </form>";
				}
				out+="                  <div id='maincontenttitlenav'>\n";
				out+="                    	<div class='maincontenttitlenavitem selectitem selectitem5 "+(x==1?"on":"")+"  mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='1' data-id='"+y+"'>動態</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==2?"on":"")+"  mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='2' data-id='"+y+"'>關於</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==3?"on":"")+"  mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='3' data-id='"+y+"'>攻略‧創作</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==4?"on":"")+"  mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='4' data-id='"+y+"'>朋友</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==5?"on":"")+"  mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='5' data-id='"+y+"'>相片</div>\n";
				out+="                      <div class='clr'></div>\n";
				out+="                  </div> \n";
				out+="                </div>\n";
				out+="                <!--個人資料框+選單 END-->\n";
				out+="                <!--主要內容 -->\n";
				out+="                <div id='maincontentwrap'>	\n";
				out+="				  </div>\n";
				out+="				  <!--主要內容end-->\n";
				$("#mainmidwrapin").html(out);
			}
		});
	}else{//自己
		mem=JSON.parse(sessionStorage.getItem("member"));
		y=sessionStorage.getItem("userid");
				var out="";
				out+="                <!--上方個人資料框+選單-->\n";
				out+="                <div id='maincontenttitle' data-type='my' data-val='mainlist' class='imgitemboxx'>\n";
				out+="                            <span class='profilebtn profileimgclick ' data-type='front'><i class='fa fa-pencil-square-o color_w  btn'></i></span>\n";
				out+="							  <form action='' method='post' id='frontpicformb' enctype='multipart/form-data'>\n";
				out+="							  <div class='instantbox' style='z-index:9;min-height:80px;position:relative;' id='mypagefrontpic' >\n";
				if(mem['frontpic']){
					out+="                	<img src='uploadfile/"+mem['frontpic']+"' style='position:relative;z-index:9;'  id='frontpicitem' />\n";
				}else{
					out+="                	<img src='img/profile.jpg'  style='position:relative;z-index:9;'  id='frontpicitem' />\n";
				}
				out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;'>請選擇</div>";
				out+="                            	<input type='file' accept='image/gif, image/jpeg, image/png, image/jpg' style='top:10px;left:10px;' class='formfield instantupload' name='frontpic'  data-job='uploadfrontb' data-form='frontpicformb' data-pictarget='mypagefrontpic' data-target='frontpicid' data-type='replace'>\n";
				out+="							  </div>\n";
				out+="							  </form>";
				out+="                  <div id='maincontenttitlenav'>\n";
				out+="                    	<div class='maincontenttitlenavitem selectitem selectitem5 "+(x==1?"on":"")+" mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='1' data-id='"+y+"'>動態</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==2?"on":"")+" mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='2' data-id='"+y+"'>關於</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==3?"on":"")+" mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='3' data-id='"+y+"'>攻略‧創作</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==4?"on":"")+" mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='4' data-id='"+y+"'>朋友</div>\n";
				out+="                      <div class='maincontenttitlenavitem selectitem selectitem5 "+(x==5?"on":"")+" mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='5' data-id='"+y+"'>相片</div>\n";
				out+="                      <div class='clr'></div>\n";
				out+="                  </div> \n";
				out+="                </div>\n";
				out+="                <!--個人資料框+選單 END-->\n";
				out+="                <!--主要內容 -->\n";
				out+="                <div id='maincontentwrap'>	\n";
				out+="				  </div>\n";
				out+="				  <!--主要內容end-->\n";
				$("#mainmidwrapin").html(out);
	}
	if(x==1 || x==""){
		show_mypagefront(y);
	}else if(x==2){
		show_mypageabout(y);
	}else if(x==3){
		if(z){
			show_mypagearticle(y,z,1,1);
		}else{
			show_mypagearticle(y,1,1,1);
		}
	}else if(x=="3x"){
		show_mypagearticle(y,2,1,1);
	}else if(x==4){
		show_mypagefriend(y);
	}else if(x==5){
		show_mypagephoto(y,2); //20180907 Pman 不再顯示「動態相簿」，只顯示
	}

}
// MYPAGE 首頁
show_mypagefront=function(x){
	var out="";
	var mem=x;
	ranks=JSON.parse(sessionStorage.getItem("ranks"));
	tags=JSON.parse(sessionStorage.getItem("tags"));
	locations=JSON.parse(sessionStorage.getItem("locations"));
	gametimes=JSON.parse(sessionStorage.getItem("gametimes"));
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	if(gameselect && gameselect.length==1 && gameselect[0]['show']=="0"){
		gameselect[0]['show']=1;
		localStorage.setItem("gameselect",JSON.stringify(gameselect));
	}
	$("#maincontentwrap").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,gameselect);
	tempitem=ajaxarr("show_mypage1",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		out+="                <!--內容-->\n";
		out+="                    <!--mid right-->\n";
		out+="                    <DIV class='midwrapinright fL'>\n";
		out+="                    	<!--人物基本-->\n";
		out+="                        <div class='mysubtitle bgcolor_f'>基本資料\n";
		out+="                        	<span class='btn mysubbtn border15 fR mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='2'  data-id='"+x+"'>MORE</span>\n";
		out+="                        </div>\n";
		out+="                        <div class='mysubcontent bgcolor_f tcenter rely'>\n";
		out+="							<div id='mypageheadwrap' style='min-height:40px;'>\n";
		if(mem==sessionStorage.getItem("userid")){
			out+="                            <span class='profileimgclickb' data-type='head'><i class='fa fa-pencil-square-o color_w  btn'></i></span>\n";
			out+="							  <form action='' method='post' id='headpicformb' enctype='multipart/form-data'>\n";
			out+="							  <div class='instantbox' style='z-index:9;min-height:80px;position:relative;' id='mypageheadpic' >\n";
		}
		out+="                            <div class='mypeopleimg'>\n";
		if(data[1]['headpic']){
			out+="                		<img src='uploadfile/"+smallpics(data[1]['headpic'])+"' class='popimgclick fullw' data-type='self' data-val='"+data[1]['headpic']+"' />\n";
		}else{
			out+="                		<img src='img/basichead.png' />\n";
		}
		out+="                            </div>\n";
		if(mem==sessionStorage.getItem("userid")){
			out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;display:none;' id='headpicclick'>請選擇</div>";
			out+="                            	<input type='file' accept='image/gif, image/jpeg, image/png, image/jpg' id='headpicform' style='top:10px;left:10px;display:none;' class='formfield instantupload fixer' name='headpic'  data-job='uploadheadb' data-form='headpicformb' data-pictarget='mypageheadpic' data-target='frontpicid' data-type='replace'>\n";
			out+="							  </div>\n";
			out+="							  </form>";
		}
		out+="							</div>\n";
		out+="                            <div class='mypeopleintro'>\n";
		out+="                            	<span>ID：</span>\n";
		out+="                                <span>"+data[1]['showid']+"</span>\n";
		out+="                            </div>\n";
		out+="                            <div class='mypeopleintro'>\n";
		out+="                            	<span>暱稱：</span>\n";
		out+="                                <span>"+data[1]['name']+"</span>\n";
		out+="                            </div>\n";
		mylevel="";
		myrank="";
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
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>等級稱謂：</span>\n";
			out+="                                <span>聲望"+mylevel+"-"+myrank+"</span>\n";
			out+="                            </div>\n";
		}
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>累積貢獻值：</span>\n";
			out+="                                <span>"+parseInt(data[1]['score']).toFixed(0)+"</span>\n";
			out+="                            </div>\n";
		if(data[1]['gender']){
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>性別：</span>\n";
			out+="                                <span>"+(data[1]['gender']=="1"?"男":"女")+"</span>\n";
			out+="                            </div>\n";
		}
		if(data[1]['birthday']){
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>年齡：</span>\n";
			out+="                                <span>"+data[1]['birthday']+"</span>\n";
			out+="                            </div>\n";
		}
		if(data[1]['horo']){
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>星座：</span>\n";
			out+="                                <span>"+data[1]['horo']+"</span>\n";
			out+="                            </div>\n";
		}
		if(data[1]['location']){
			dd="";
			for(var a=0;a<locations.length;a++){
				if(locations[a]['thisid']==data[1]['location']){
					dd=locations[a]['thisname'];
				}
			}
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>所在地區：</span>\n";
			out+="                                <span>"+dd+"</span>\n";
			out+="                            </div>\n";
		}
		if(data[1]['gtid']){
			dd="";
			for(var a=0;a<gametimes.length;a++){
				if(gametimes[a]['thisid']==data[1]['gtid']){
					dd=gametimes[a]['gtname'];
				}
			}
			out+="                            <div class='mypeopleintro'>\n";
			out+="                            	<span>遊戲時段：</span>\n";
			out+="                                <span>"+dd+"</span>\n";
			out+="                            </div>\n";
		}

		out+="                            <div class='mysubplaylist'>\n";
		out+="                                        <div>\n";
		out+="                                            <img src='img/leftgameicon.png' class='fL' />\n";
		out+="                                            <span class='fL mainitemcontenttextp'>正在玩的遊戲</span> \n";
		out+="                                            <div class='clr'></div>\n";
		out+="                                        </div>\n";
		//遊戲列表
		for(w=1;w<4;w++){
			dd="";
			if(data[1]['game'+w]){
				for(var a=0;a<tags.length;a++){
					if(tags[a]['gameid']==data[1]['game'+w]){
						dd=tags[a]['gamename'];
						break; //20190305 Pman 找到對應的標籤後就中斷，減少不必要的比對
					}
				}

				if(a<tags.length-1 && tags[a]['hidesee']==1) continue; //20190305 Pman 如果是隱藏標籤，不顯示//20190509 Pman 加上a的數值判斷，避免超過tags的陣列長度
				nn="";

				if(data[1]['game'+w+'note']){
					nn=data[1]['game'+w+'note'];
				}
				out+="                                        <div class='leftgameonlistp'>\n";
				out+="                                            <div class='leftgameonlistnamep'>\n";
				out+="                                                "+dd+"\n";
				out+="                                            </div>\n";
				if(nn){
					out+="                                            <div class='leftgameonlistnotep'>\n";
					out+="                                                "+nn+"\n";
					out+="                                            </div>                        \n";
				}
				out+="                                       </div>\n";
			}
		}
		out+="                        	</div>                           \n";
		out+="                        </div>                        \n";
		out+="                        <!--人物基本 END -->\n";

		out+="                    	<!--朋友基本-->\n";
		out+="                        <div class='mysubtitle bgcolor_f'>朋友 "+data[1]['friendcount']+"\n";
		out+="                        	<span class='btn mysubbtn border15 fR mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='4' data-id='"+x+"'>MORE</span>\n";
		out+="                        </div>\n";
		out+="                        <div class='mysubcontent bgcolor_f tcenter'>\n";
		//朋友列表
		for(var a=0;a<data[1]['friends'].length;a++){
			out+="                        	  <div class='friendimgoutwrapp pageclick' data-type='mypage' data-val='1' data-id='"+data[1]['friends'][a]['uid']+"'>\n";
			out+="                        	  <div class='friendimgwrapp'>\n";
			out+="                                <div class='friendimgboxp fL'>\n";
			if(data[1]['friends'][a]['headpic']){
				out+="                                    <img src='uploadfile/"+smallpics(data[1]['friends'][a]['headpic'])+"' />\n";
			}else{
				out+="                		<img src='img/basichead.png' />\n";
			}

			out+="                                </div>\n";
			out+="                            </div>\n";
			out+="								  <div class='friendimgboxtext'>"+data[1]['friends'][a]['name']+"</div>";
			out+="                            </div>\n";
		}

		//列表END
		out+="                            <div class='clr'></div>\n";
		out+="                        </div>\n";
		out+="                        <!--朋友基本 END -->       \n";
		//20190122 Pman 客戶要求拿掉這個區塊
		//out+="                    	<!--相片基本-->\n";
		//out+="                        <div class='mysubtitle bgcolor_f'>相片 "+data[1]['photocount']+"\n";
		//out+="                        	<span class='btn mysubbtn border15 fR mysubclick' data-type='my_nav' data-taget='maincontentwrap' data-val='5' data-id='"+x+"'>MORE</span>\n";
		//out+="                        </div>\n";
		//out+="                        <div class='mysubcontent bgcolor_f tcenter'>\n";
		////相片列表--列新的..X9
		//for(var a=0;a<data[1]['photos'].length;a++){
			////out+="                            <div class='imgitemboxp photoclick btn' data-val='"+data[1]['photos'][a]['thisid']+"'>\n";
			//out+="                            <div class='imgitemboxp popimgclick btn' data-val='"+data[1]['photos'][a]['thisid']+"'>\n";
			//out+="                                <img src='uploadfile/"+data[1]['photos'][a]['thisfile']+"' />\n";
			//out+="                            </div>\n";
		//}
		////列表END
		//out+="                            <div class='clr'></div>\n";
		//out+="                        </div>\n";
		//out+="                        <!--相片基本 END -->                   \n";
		//20190122 Pman 客戶要求拿掉這個區塊
		out+="                    </DIV>\n";
		out+="                    <!--mid right end -->       \n";
		out+="                    <!--mid left -->\n";
		out+="                    <DIV class='midwrapinleft fR'>\n";
		out+="                         <!--動態框-->\n";
		out+="                         <div id='maincontentwrap'>\n";
		out+="                            <!--主要內容-->\n";
		out+="                            <div id='maincontentbox' data-type='mywall' data-val='mainlist' data-id='"+data[1]['id']+"'>\n";
		//動態框內容
		//這邊插入  items
		out+="                                <div id='mainitemlast'></div>\n";
		out+="                            </div>\n";
		out+="                            <!--主要內容-->\n";
		out+="                        </div>\n";
		out+="                        <!--動態框 END -->\n";
		out+="                    </DIV>\n";
		out+="                <!--內容 END-->\n";
		$("#maincontentwrap").html(out);
		centermyimg();
		getmoreboard(0);
	});
}
show_mypageabout=function(x){
	var out="";
	var m=x;
	ranks=JSON.parse(sessionStorage.getItem("ranks"));
	tags=JSON.parse(sessionStorage.getItem("tags"));
	locations=JSON.parse(sessionStorage.getItem("locations"));
	gametimes=JSON.parse(sessionStorage.getItem("gametimes"));
	mem=JSON.parse(sessionStorage.getItem("member"));
	$("#maincontentwrap").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage2",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..

		out+="                <div id='aboutformwrap' class='marginv10'>\n";
		if(data[1]['email']){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>帳號 (email)</div>\n";
			out+="                      	  <div class='formitem formitem_2'>\n";
			out+="                                <div id='emailvalue'>"+data[1]['email']+"</div>\n";
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
				out+="                                <i class='fa fa-eye "+(mem['email_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='email'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		out+="                    <div class='formline'>\n";
		out+="                            <div class='formitem formitem_2 tright'>ID</div>\n";
		out+="                      	  <div class='formitem formitem_2'>\n";
		out+="                                <div id='IDvalue'>"+data[1]['showid']+"</div>\n";
		out+="                            </div>\n";
		out+="                            <div class='clr'></div>\n";
		out+="                    </div>\n";
		if(data[1]['pass']){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>密碼</div>\n";
			out+="                      	  <div class='formitem formitem_2'>\n";
			out+="                                <div id='passvalue'>*****</div>\n";
			out+="                                <div class='hidediv'>\n";
			out+="                                    <input type='text' name='pass' value='"+data[1]['pass']+"' class='formfield' id='passform' style='width:75%;'><input type='submit'  name='submit' value='送出' class='submitclick border5 aboutclick' data-name='pass'  />\n";
			out+="                                </div>\n";
			out+="                            </div>\n";
			out+="                            <div class='formitem formitem_2'>\n";
			out+="                                <i class='fa fa-pencil fayellow editprofileclick maright5 btn'  data-name='pass'></i>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		//手機驗證
		if(m==sessionStorage.getItem("userid")){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>手機號碼</div>\n";
			out+="                      	  <div class='formitem formitem_2'>\n";
			if(data[1]['phonenum']=="" || data[1]['phonenum']== null){
				out+="                                <div id='phonevalue' class='fL'></div>\n";
				out+="<div class='btn border5 submitclick submitclickr f16 fL vpchanger' data-type='vform' style='margin-left:0;'>立即驗證</div>";
			}else{
				out+="                                <div id='phonevalue' class='fL'>"+data[1]['phonenum']+"</div>\n";
				out+="<div class='btn border5 submitclick submitclickr f16 fL' data-type='vform' >更改號碼</div>";
			}

			//out+="                                <div class='hidediv'>\n";
			//out+="                                    <input type='text' name='pass' value='"+data[1]['pass']+"' class='formfield' id='passform' style='width:75%;'><input type='submit'  name='submit' value='送出' class='submitclick border5 aboutclick' data-name='pass'  />\n";
			//out+="                                </div>\n";
			out+="                            </div>\n";
			out+="                            <div class='formitem formitem_2'>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		if(data[1]['gender']){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>性別</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div id='sexvalue'>"+(data[1]['gender']=="1"?"男":"女")+"</div>\n";
		//	if(m==sessionStorage.getItem("userid")){
		//		out+="                                <div class='hidediv'>\n";
		//		out+="                                    <label><input type='radio' name='sex' value='1' "+(data[1]['gender']=="1"?"ChECKED":"")+" class='sexform'/>男</label><label><input type='radio' name='sex' value='2' "+(data[1]['gender']=="2"?"ChECKED":"")+" class='sexform'/>女</label><input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='sex' />\n";
		//		out+="                                </div>\n";
		//	}
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
			//	out+="                                <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='sex'></i>\n";
				out+="                                <i class='fa fa-eye "+(mem['gender_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn'  data-name='sex'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		if(data[1]['birthday']){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>生日</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div id='birthvalue'>"+data[1]['birthday']+"</div>\n";
	//		if(m==sessionStorage.getItem("userid")){
	//			out+="                                <div class='hidediv'>\n";
	//			out+="                                    <input type='text' name='birth' value='"+data[1]['birthday']+"' class='formfield birthday' id='birthform'><input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='birth' />\n";
	//			out+="                                </div>\n";
	//		}
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
		//		out+="                                <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='birth'></i>\n";
				out+="                                <i class='fa fa-eye "+(mem['birthday_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='birth'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		if(data[1]['horo']){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>星座</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div>"+data[1]['horo']+"</div>\n";
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
				out+="                                <i class='fa fa-eye "+(mem['horo_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='horo'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		out+="                    <div class='formline'>\n";
		out+="                            <div class='formitem formitem_2 tright'>暱稱</div>\n";
		out+="                      		<div class='formitem formitem_2'>\n";
		out+="                                <div id='namevalue'>"+data[1]['name']+"</div>\n";
//		if(m==sessionStorage.getItem("userid")){
//			out+="                                <div class='hidediv'>\n";
//			out+="                                	<input type='text' name='name' value='"+data[1]['name']+"' class='formfield' id='nameform' style='width:50%'>\n";
//			out+="                                  <input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='name' />\n";
//			out+="                                </div>\n";
//		}
		out+="                            </div>\n";
//		if(m==sessionStorage.getItem("userid")){
//			out+="                            <div class='formitem formitem_2'>\n";
//			out+="                                <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='name'></i>\n";
//			out+="                            </div>\n";
//		}
		out+="                            <div class='clr'></div>\n";
		out+="                    </div>\n";
		mylevel="";
		myrank="";
		myscoreall=0;
		for(var a=0;a<ranks.length;a++){
			  if(parseInt(data[1]['score'])>=parseInt(ranks[a]['score'])){
				 if(data[1]['rank_v']=="1" || sessionStorage.getItem("userid")==mem ){
				 	 myrank=ranks[a]['rankname'];
				 }
				 if(data[1]['level_v']=="1" || sessionStorage.getItem("userid")==mem ){
				 	 mylevel=ranks[a]['rankid'];
				 }
				myscoreall=parseInt(ranks[a+1]['score']);
			  }
		}
		out+="                    <div class='formline'>\n";
		out+="                            <div class='formitem formitem_2 tright'>累積貢獻值</div>\n";
		out+="                      	  <div class='formitem formitem_2'>\n";
		out+="                                <div id='emailvalue'>"+parseInt(data[1]['score'])+"</div>\n";
		out+="                            </div>\n";
		out+="                            <div class='clr'></div>\n";
		out+="                    </div>\n";
		if(myrank){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>等級稱謂</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div>"+myrank+"</div>\n";
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
				out+="                                <i class='fa fa-eye "+(mem['rank_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='rank'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		if(mylevel){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>等級</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div>聲望:"+mylevel+"</div>\n";
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
				out+="                                <i class='fa fa-eye "+(mem['level_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='level'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		out+="                    <div class='formline'>\n";
		out+="                            <div class='formitem formitem_2 tright'>正在玩的遊戲<span class='formitemsub'>(配對好友以此為條件)</span></div>\n";
		out+="                      	  <div class='formitem formitem_2'>\n";
		out+="								<div id='mytagwrap'>\n";
		getg=0;
		for(w=1;w<4;w++){
			dd="";
			if(data[1]['game'+w]){
				getg++;
				for(var a=0;a<tags.length;a++){
					if(tags[a]['gameid']==data[1]['game'+w]){
						dd=tags[a]['gamename'];
						break; //20190305 Pman 找到對應的標籤後就中斷，減少不必要的比對
					}
				}
				if(tags[a]['hidesee']==1) continue; //20190305 Pman 如果是隱藏標籤，不顯示
				nn="";
				if(data[1]['game'+w+'note']){
					nn=data[1]['game'+w+'note'];
				}
				out+="                            	<div class='subformitem subformitem_2'>\n";
				out+="                                	<span>"+dd+"</span>\n";
				out+="                                  <span class='rely'>";
				out+="										<div id='egame"+w+"value'>備註："+nn+"</DIV>";
				if(m==sessionStorage.getItem("userid")){
					out+="                                <div class='hidediv'>\n";
					out+="                                	<input type='text' name='egame"+w+"' value='"+nn+"' class='formfield' id='egame"+w+"form' style='width:75%' placeholder='字數限制：３０中文６０英文'>\n";
					out+="                                  <input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='egame"+w+"' />\n";
					out+="                                </div>\n";
				}
				out+="									</span>\n";
				if(m==sessionStorage.getItem("userid")){
					out+="                                  <span> <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='time'></i> <i class='fa fa-times fayellow maright5 fa-vc btn aboutclick' data-name='gamedel' data-id='game"+w+"'></i>\n";
					out+="                                	<i class='fa fa-eye "+(mem['game'+w+'_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='game"+w+"'></i></span>\n";
				}
				out+="                                  <div class='clr'></div>\n";
				out+="                              </div>\n";
			}
		}
		out+="							</div>\n";
		if(m==sessionStorage.getItem("userid")){
			out+="                            	<div class='subformitem subformitem_2' style='position:relative!important;' id='tempaddselect'>\n";
			out+="                                	<span style='width:160px;'><select name='tag' class='chosen' id='addgameform'  style='width:150px;'>\n";
			for(var a=0;a<tags.length;a++){
				out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
			}
			out+=" 									</select></span>\n";
			out+="                                  <span><input type='text' name='notes' style='width:160px;' id='addgamenote' /><input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='addgame' /></span>\n";
			out+="                                  <span></span>\n";
			out+="                                  <div class='clr'></div>\n";
			out+="                              </div>\n";
		}
		out+="                      	  </div>\n";
		if(m==sessionStorage.getItem("userid")){
			out+="                            <div class='formitem formitem_2'>\n";
			out+="                                <i class='fa fa-plus fayellow editprofileclick maright5 btn' data-name='addgame' ";
			if(getg>=3){
				out+=" style='display:none;' ";
			}
			out+="></i>\n";
			out+="                            </div>\n";
		}
		out+="                            <div class='clr'></div>\n";
		out+="                    </div>\n";
		if(data[1]['gtid']){
			dd="";
			for(var a=0;a<gametimes.length;a++){
				if(gametimes[a]['thisid']==data[1]['gtid']){
					dd=gametimes[a]['gtname'];
				}
			}
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>遊戲時段</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div id='timevalue'>"+dd+"</div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                                <div class='hidediv'>\n";
				out+="                                    <select name='time' id='timeform' style='width:300px' class='formfield'>\n";
				for(var a=0;a<gametimes.length;a++){
					out+="<option value='"+gametimes[a]['thisid']+"' "+(gametimes[a]['thisid']==data[1]['gtid']?"selected":"")+" >"+gametimes[a]['gtname']+"</option>\n";
				}
				out+="                                    </select>\n";
				out+="                                    <input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='time' />\n";
				out+="                                </div>\n";
			}
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
				out+="                                <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='time'></i>\n";
				out+="                                <i class='fa fa-eye "+(mem['gt_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='time'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		if(data[1]['location']){
			dd="";
			for(var a=0;a<locations.length;a++){
				if(locations[a]['thisid']==data[1]['location']){
					dd=locations[a]['thisname'];
				}
			}
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>所在地區</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div id='locationvalue'>"+dd+"</div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                                <div class='hidediv'>\n";
				out+="                                    <select name='location' id='locationform' class='formfield' style='width:300px'>\n";
				for(var a=0;a<locations.length;a++){
					out+="<option value='"+locations[a]['thisid']+"' "+(locations[a]['thisid']==data[1]['location']?"selected":"")+">"+locations[a]['thisname']+"</option>\n";
				}
				out+="                                    </select>\n";
				out+="                                    <input type='submit'  name='submit' value='送出' class='submitclick  border5 aboutclick' data-name='location' />\n";
				out+="                                </div>\n";
			}
			out+="                            </div>\n";
			if(m==sessionStorage.getItem("userid")){
				out+="                            <div class='formitem formitem_2'>\n";
				out+="                                <i class='fa fa-pencil fayellow editprofileclick maright5 btn' data-name='location'></i>\n";
				out+="                                <i class='fa fa-eye "+(mem['location_v']=="1"?"fayellow":"fagray")+" showprofileclick maright5 btn' data-name='location'></i>\n";
				out+="                            </div>\n";
			}
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";

		}
		//介紹人數
		if(m==sessionStorage.getItem("userid")){
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>上月註冊人數</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div >"+data[1]['lc']+"</div>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>邀請網址</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div ><span id='invitevalue'>"+mem['refurl']+"</span><span style='display:inline-block;' class='copytoclip submitclick border5 btn ' data-target='#invitevalue'>複製網址</span></div>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>上月註冊人數</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div >"+data[1]['lc']+"</div>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>當月註冊人數</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div >"+data[1]['tc']+"</div>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                            <div class='formitem formitem_2 tright'>累計註冊人數</div>\n";
			out+="                      		<div class='formitem formitem_2'>\n";
			out+="                                <div >"+data[1]['allc']+"</div>\n";
			out+="                            </div>\n";
			out+="                            <div class='clr'></div>\n";
			out+="                    </div>\n";

		}

		out+="                </div>\n";
		out+="<BR><BR><BR><BR><BR><BR><BR>\n";
		$("#maincontentwrap").html(out);
		jQuery(".chosen").chosen();
		$("#tempaddselect").addClass("hidediv");//解決chosen 短小問題
	});
}
show_mypagearticle=function(x,z,y,p){
	var out="";
	var m=x;
	var m2=z;
	$("#maincontentwrap").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var out="";
	if(m==sessionStorage.getItem("userid")){
		out+="                <div id='maincontenttitle' data-type='article' data-val='mainlist'>\n";
		out+="                	<span class='maincontentselect border15 pageclick' data-type='publishpage'>發布攻略\n";
		out+="                    </span>\n";
		out+="                    <span class='maincontentselect on border15' data-val='1'>我的攻略\n";
		out+="                    </span>\n";
		out+="                    <p class='spliter'></p>\n";
		out+="                    <span class='maincontentselect border15' data-val='2'>我的草稿\n";
		out+="                    </span>\n";
		out+="                </div>				\n";
	}
	out+="<DIV style='margin:0;padding:0;' id='maincontentwrapin'>\n";
	out+="</DIV>\n";
	$("#maincontentwrap").html(out);
	show_mypagearticlein(x,z,y,p);
}
show_mypagearticlein=function(x,z,y,p){
	var out="";
	var m=x;
	var m2=parseInt(z);
	var mysea=y;
	var mylast=p;
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	if(gameselect && gameselect.length==1 && gameselect[0]['show']=="0"){
		gameselect[0]['show']=1;
		localStorage.setItem("gameselect",JSON.stringify(gameselect));
	}
	$("#maincontentwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,z,y,p,gameselect); //類別 / key / 最後id / page
	tempitem=ajaxarr("show_mypage3",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
			if(data[0]=="ERR"){
				$("#maincontentwrapin").html('');
			}else{
				var out="";
				out+="<div>";
				for(var a=0;a<data[1].length;a++){
					lastid=data[1][a]['thisid'];
					if(m2==2){
						out+=print_articleitem(data[1][a],2);
					}else{
						out+=print_articleitem(data[1][a]);
					}
				}
				out+="</div>";
				//out+="							<div id='mainitemlast' data-val='"+mylast+"'></div>";
				out+="					<div class='clr'></div>\n";
				out+="					<div class='inpageclickwrap'>\n";
				var xa=1;
				if(mylast>8){
					xa=mylast-8;
					out+="<div class='inpageclick' data-pg='1'  data-type='myarticle' data-m='"+m+"' data-val='"+m2+"' data-s='"+mysea+"'>|<</div>";
				}
				if(mylast>1){
					out+="<div class='inpageclick' data-pg='"+(mylast-1)+"'  data-type='myarticle' data-m='"+m+"' data-val='"+m2+"' data-s='"+mysea+"'><</div>";

				}
				for(var a=xa ; a<=Math.ceil(data[2]/9) && a<=mylast+8 ;a++){
					out+="<div class='inpageclick";
					if(mylast==a){
						out+=" on ";
					}
					out+="' data-pg='"+a+"'  data-type='myarticle' data-m='"+m+"' data-val='"+m2+"' data-s='"+mysea+"'>"+a+"</div>";
				}
				if(mylast<Math.ceil(data[2]/9)){
					out+="<div class='inpageclick' data-pg='"+(mylast+1)+"' data-type='myarticle' data-m='"+m+"' data-val='"+m2+"' data-s='"+mysea+"'>></div>";

				}
				if(Math.ceil(data[2]/9)>17){
					out+="<div class='inpageclick' data-pg=" + Math.ceil( data[2]/9 ) + "'  data-type='myarticle' data-m='"+m+"' data-val='"+m2+"' data-s='"+mysea+"'>>|";
					out+="</div>";
				}
				out+="					</div>";
				/*
				for(var a=0;a<data[1].length;a++){
					if(m2==2){
						out+=print_articleitem(data[1][a],2);
					}else{
						out+=print_articleitem(data[1][a]);
					}
				}
				*/
				$("#maincontentwrapin").html(out);
				$(".maincontentselect").removeClass("on");
				$(".maincontentselect").eq(m2).addClass("on");
			}
	});
}
show_mypagefriend=function(x){
	var out="";
	var m=x;
	$("#maincontentwrap").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage4",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[0]=="ERR"){
			$("#maincontentwrap").html(out);
		}else{
			var out="";
			var flist=[];
			if(data[2]){
				flist=data[2];
			}
			if(data[1] && data[1].length>0){
				for(var a=0;a<data[1].length;a++){
					if(m==sessionStorage.getItem("userid")){
						out+=print_frienditem(data[1][a],4);
					}else if(flist.length>0){
						flag=0;
						for(b=0;b<flist.length;b++){
							if(flist[b]['uid']==data[1][a]['uid']){
								flag=1;
							}
						}
						if(flag==1){
							out+=print_frienditem(data[1][a],99);



						}else{
							out+=print_frienditem(data[1][a],1);
						}
					}else{
						out+=print_frienditem(data[1][a],1);
					}
				}
			}
			$("#maincontentwrap").html(out);
		}

	});
}
show_mypagephoto=function(x,z){
	var out="";
	var m=x;
	var m2=z;
	$("#maincontentwrap").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5c",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義
		var out="";
		if(sessionStorage.getItem("userid")==m){
			out+="		<div id='albuminputwrapx' class='fader rely'>";
			out+="				<div id='maininputwrapbg' style='z-index:0;'></div>";
			out+="          <form action='' method='post' id='albumform'>\n";
			out+="				<div class='pad15 rely' style='z-index:1;'>";
			out+="                                <div class='marginv5'>\n";
			out+="                                	<input type='text' name='newstitle' id='newstitle' class='formfield' placeholder='未命名相簿' style='width:calc(100% - 10px);' >\n";
			out+="                                </div>\n";
			out+="                                <div class='rely'>\n";
			out+="                                	 <textarea name='newstext' id='newstext' class='formfield ' placeholder='相簿內容描述'  style='width:calc(100% - 10px);'></textarea>\n"; //20190312 Pman 客戶要求修改文案
			out+="                            		 <div class='formerr'>發文內容不得空白,最多2000字</div>\n";
			out+="                                </div>\n";
			out+="                                <div class='rely padtop10'>\n";
			out+="	                              	<span id='q_openbox'><select name='q_open' id='q_open' class='chosen fR'><option value='1'>公開</option><option value='2'>僅限朋友</option><option value='3'>僅限本人</option></select></span>\n";
			out+="									<div class='clr'></div>";
			out+="                                </div>\n";
			out+="                                <input type=hidden name='picaddress' id='newsformfilename'  class='formfield'/>\n";
			out+="                                <input type=hidden name='pictype' id='newsformfiletype'  class='formfield'/>\n";
			out+="                                <input type=hidden name='q_type' id='q_type'  value=''/>\n";
			out+="                                <div id='newsformfilebox'></div>\n";
			out+="                                <div id='maininputboxsubmitwrap'>\n";
			out+="                                	<input type=submit name=submit id='newsformsubmit' value='發佈' class='submitclick border5' data-type='albumform' />\n";
			out+="                                </div>\n";
			out+="          	</div>\n";
			out+="          </form>\n";
			out+="      </div>";
		}
		out+="      <div id='maincontenttitle' data-type='photo' data-val='mainlist'>\n";
		//out+="                	<span class='maincontentselect border15' data-id='"+m+"' data-val='1'>動態相片("+data[1]+")\n";
		//out+="                    </span>\n";
		//20180907 Pman 客戶要求不顯示動態相片
		out+="                    <span class='maincontentselect border15 on' data-id='"+m+"' data-val='2'>相簿("+data[2]+")\n";
		out+="                    </span>\n";
//		out+="                    <p class='spliter'></p>\n";		//取消影片功能==>Pman
//		out+="                    <span class='maincontentselect border15' data-id='"+m+"' data-val='3'>影片("+data[3]+")\n";
//		out+="                    </span>\n";
		if(sessionStorage.getItem("userid")==m){
			out+="        <div class='maintemselect applebtn fR ' data-type='albumnew' data-val='4' style='position:relative;overflow:hidden;'>";
			out+="			<form action='' method=post id='picbookform' enctype='multipart/form-data' class='hideform'><input name='file[]' type='file' multiple='multiple' class='fileupload instantuploadm' data-job='uploadnewspicbook' data-form='newspicform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' /></form>";
			out+="		  	<i class='fa fa-plus mcselecticon' aria-hidden='true'></i>";
			out+="        </div>";
		}
		out+="     </div>\n";
		out+="<DIV style='margin:0;padding:0;' id='maincontentwrapin'>\n";
		out+="</DIV>\n";
		$("#maincontentwrap").html(out);
		$("#albuminputwrapx").show();
		if(sessionStorage.getItem("userid")==m){
			jQuery(".chosen").chosen();
		}
		$("#albuminputwrapx").hide();
		show_mypagephotoin(m,m2);
	});
}
show_mypagephotoin=function(x,z){
	var out="";
	var m=x;
	var m2=parseInt(z);
	$("#maincontentwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,z); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(m2==1){//動態相片 //20180907 Pman 客戶要求不顯示動態相片
		/*
			out="";
			if(data[1]){
				for(var a=0;a<data[1].length;a++){
					out+="                        <div class='imgitembox delhide'>\n";
					out+="                        	<img src='uploadfile/"+data[1][a]['thisfile']+"' class='popimgclick btn' data-val='"+data[1][a]['thisid']+"'/>\n";
					if(m==sessionStorage.getItem("userid")){
						out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3'  data-type='pho' data-id='"+data[1][a]['thisid']+"'></i></span>\n";
					}
					out+="                        </div>				\n";
				}
			}
		*/
		}else if(m2==2){//相簿

			out="";
			if(data[1]){
				for(var a=0;a<data[1].length;a++){
					out+="                        <div class='imgitembox delhide'>\n";
					out+="							<div class='imgitemboximg'>";
					out+="                        		<img src='uploadfile/"+data[1][a]['thisfile']+"' class='albclick btn' data-val='"+data[1][a]['id']+"' />\n";
					out+="							</div>";
					if(m==sessionStorage.getItem("userid")){
						out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3' data-type='alb' data-id='"+data[1][a]['id']+"'></i></span>\n";
					}
					out+="                            <div class='storeitemtitle2 albclick btn'  data-val='"+data[1][a]['id']+"'>";
					if(data[1][a]['thisname'].length>0){
						out+=data[1][a]['thisname'];
					}else{
						out+="未命名相簿";
					}
					out+="                            <span class='storeitembody2'>\n";
					out+="("+data[1][a]['cnt']+") \n";
					out+="                            </span>\n";
					out+="							  </div>\n";
					out+="                        </div>				\n";
				}
			}

		}else if(m2==3){//影片，這項在PC版網站上線，就已隱藏
		/*
			out="";
			if(data[1]){
				for(var a=0;a<data[1].length;a++){
					out+="                        <div class='imgitembox delhide' >\n";
					out+="                        	<video width='100%' class='popimgclick btn' data-val='"+data[1][a]['thisid']+"' data-type='video'><source src='uploadfile/"+data[1][a]['thisfile']+"' type='video/mp4' ></video>\n";
				//	out+="                        	<img src='uploadfile/"+data[1][a]['thisfile']+"' class='popimgclick btn' data-val='"+data[1][a]['thisid']+"'/>\n";
					if(m==sessionStorage.getItem("userid")){
						out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3'  data-type='pho' data-id='"+data[1][a]['thisid']+"'></i></span>\n";
					}
					out+="                            <div class='storeitemtitle rely imgitemboxx' >"+data[1][a]['thiscontent'];
					out+="                        	  </div>				\n";
					out+="                        </div>				\n";
				}

			}
		*/
			/*
			if(data[1]){
				for(var a=0;a<data[1].length;a++){
					out+="                        <div style='margin-bottom:30px' class='delhide'>\n";
					out+="                        	<video width=100% controls ><source src=uploadfile/"+data[1][a]['thisfile']+" type=video/mp4 ></video>\n";
					out+="                            <div class='storeitemtitle rely imgitemboxx' >"+data[1][a]['thiscontent'];
					if(m==sessionStorage.getItem("userid")){
						out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3' data-type='vid' data-id='"+data[1][a]['thisid']+"'></i></span>\n";
					}
					out+="								</div>\n";
					out+="                        </div>				\n";
				}
			}
			*/
		}
		$("#maincontentwrapin").html(out);
		if(m2==3){
			//set_video();//影片，這項在PC版網站上線，就已隱藏
		}
		//$(".maincontentselect").removeClass("on");
		//$(".maincontentselect").eq((m2-1)).addClass("on");
		console.log(m2);
		centermyimg2();//share.js
	});
}
show_mypagealbin=function(x){
	var out="";
	var m=x;
	$("#maincontentwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div><BR><BR><BR><BR><BR><BR>");
	var tempvals=Array(x,''); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_mypage5alb",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[0]=="ERR"){
			popnotice(data[1]);
		}else{
			out="";
			if(data[1]){
					if(data[1]['memberid']==sessionStorage.getItem("userid")){
						out+="<div id='albeditshow'>";
						out+="<i class='fa fa-pencil mcselecticon fR albedclick btn' aria-hidden='true'></i>";
						out+="<div class='storeitemtitle3'>"+data[1]['thisname']+"</div>\n";
						out+="<div class='storeitembodyx'>"+data[1]['thiscontent']+"</div>\n";
						out+="</div>";
						out+="<div id='albeditform' style='position:relative;display:none;z-index:9;' data-id='"+m+"'>";
						out+="			<i class='fa fa-reply mcselecticon fR albedclick btn' aria-hidden='true'></i>";
						out+="			<div id='maininputwrapbg2'>";
						out+="				<div class='pad15 rely' style='z-index:1;' id='albumupform'>";
						out+="                                <div class='marginv5'>\n";
						out+="                                	<input type='text' name='newstitle' id='newstitle' class='formfield' value='"+data[1]['thisname']+"' placeholder='未命名相簿' style='width:calc(100% - 10px);' >\n";
						out+="                                </div>\n";
						out+="                                <div class='rely'>\n";
						out+="                                	 <textarea name='newstext' id='newstext' class='formfield form-control' placeholder='請輸入想要發文的內容'  style='width:calc(100% - 10px);'>"+data[1]['thiscontent']+"</textarea>\n";
						out+="                            		 <div class='formerr'>發文內容不得空白,最多2000字</div>\n";
						out+="                                </div>\n";
						out+="                                <div class='rely padtop10'>\n";
						out+="	                              	<span id='q_openbox2'><select name='q_open' id='q_open2' class='chosen fR'><option value='1' "+(data[1]['opentype']=="1"?"selected":"")+" >公開</option><option value='2' "+(data[1]['opentype']=="2"?"selected":"")+">僅限朋友</option><option value='3' "+(data[1]['opentype']=="3"?"selected":"")+">僅限本人</option></select></span>\n";
						out+="									<div class='clr'></div>";
						out+="                                </div>\n";
						out+="                                <div id='maininputboxsubmitwrap'>\n";
						out+="                                	<input type=submit name=submit id='newsformsubmit' value='更新' class='submitclick border5' data-type='albumupform' />\n";
						out+="                                </div>\n";
						out+="          	</div>\n";
						out+="          </div>\n";
						out+="</div>";
					}else{
						out+="<div class='storeitemtitle3'>"+data[1]['thisname']+"</div>\n";
						out+="<div class='storeitembodyx'>"+data[1]['thiscontent']+"</div>\n";
					}

					out+="<div style='position:relative;z-index:1;'>";
					for(var a=0;a<data[1]['pho'].length;a++){
						out+="                        <div class='imgitembox delhide'>\n";
						out+="                        	<img src='uploadfile/"+data[1]['pho'][a]['thisfile']+"' class='popimgclick btn' data-val='"+data[1]['pho'][a]['thisid']+"'/>\n";
						if(data[1]['memberid']==sessionStorage.getItem("userid")){
							out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3' data-type='pho' data-id='"+data[1]['pho'][a]['thisid']+"'></i></span>\n";
						}
						out+="                        </div>				\n";
					}
					if(data[1]['memberid']==sessionStorage.getItem("userid")){
						out+="<div class='imgitembox delhide temppicwrapb' id='addalbpicwrapb'><img src='img/addpicb.png'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+m+"' class='fileupload instantupload' data-job='addalbpicb' data-form='addpicform' data-target='temppicwrapb' data-pictarget='addalbpicwrapb' data-type='insert' /></form>\n";
						out+="</div>";
					}
					out+="<div class='clr'></div>";
			}
			$("#maincontentwrapin").html(out);
			$(".maincontentselect").removeClass("on");
			centermyimg2();//share.js

		}
	});
}
// ##############  攻略 #######################
//顯示攻略內頁
show_centerartpage=function(x){
	var querystring = location.search.replace( '?', '' ).split( '&' );
	var qs = {};
	for ( var i=0; i<querystring.length; i++ ) {
		  var name = querystring[i].split('=')[0];
		  var value = querystring[i].split('=')[1];
		  qs[name] = value;
	}
	if(qs["id"]){x=qs["id"];} //20190422 Pman 如果在有id的情況下，以id為主
	if(sessionStorage.getItem("member") == ""){ //20190621 Pman 避免 member 是空值的時候，會出現JSON.parse的錯誤
		mem="";
	}else{
		mem=JSON.parse(sessionStorage.getItem("member"));
	}
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_artpage",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#mainmidwrapin").html('');
		}else{
			var out="";
			out+="                   <div id='maincontentbox' data-type='article' data-val='mainlist' class='delhide'>\n";
			out+="                            	<div class='mainitemtitle'>\n";
			// left
			out+="                                	<div class='mainitemimg'>\n";
			out+="	                                	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+data[1]['uid']+"'>\n";//20180905 Pman QA頭像加上連結
			if(data[1]['userpic']){
				out+="									<img src='uploadfile/"+smallpics(data[1]['userpic'])+"' />\n";
			}else{
				out+="									<img src='img/basicheads.png' />\n";
			}
			out+="										</a>\n";
			out+="									</div>\n";
			// left end
			// right
			out+="									<div class='mainitemtitletext'>\n";
			out+="										<div class='fL' style='width:140px;'>\n";
			out+="	                                		<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+data[1]['uid']+"' ><h1>"+data[1]['user']+"</h1></a>\n";
			out+="                                  		<h6 class='timeitem' data-t='"+data[1]['dateadd']+"'>"+data[1]['dateadd']+"</h6>\n";
			out+="										</div>\n";
			out+="										<div class='fL' style='width:460px;'>\n";
			out+="											<h1 class='artpageh1'>"+data[1]['thistitle']+"</h1>";
			out+="										</div>\n";
			out+="									</div>";
			// insert

			if(sessionStorage.getItem("userid")){
				out+="                                    	<div class='mainitemtitleselect' style='margin-right:20px;margin-top:10px;'>\n";
				out+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
				out+="                                                <ul class='mainitemtitleselectlist'>\n";
				if(sessionStorage.getItem("userid")==data[1]['uid']){
					out+="                                                <li class='maintemselect' data-type='article' data-val='3' data-id='"+data[1]['thisid']+"'>刪除</li>\n";
					out+="                                                <li class='maintemselect' data-type='article' data-val='4' data-id='"+data[1]['thisid']+"'>編輯</li>\n";
				}else{
					out+="                                                <li class='maintemselect' data-type='article' data-val='1' data-id='"+data[1]['thisid']+"'>檢舉</li>\n";
					out+="                                                <li class='maintemselect' data-type='article' data-val='2' data-id='"+data[1]['thisid']+"'>收藏</li>\n";
				}
				out+="                                                <li class='maintemselect' data-val='9' data-type='articlepage'  data-id='"+data[1]['thisid']+"'>分享</li>\n";
				out+="                                            	</ul>\n";
				out+="                                        </div>\n";
			}else{
				out+="                                    	<div class='mainitemtitleselect' style='margin-right:20px;margin-top:10px;'>\n";
				out+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
				out+="                                                <ul class='mainitemtitleselectlist'>\n";
				out+="                                                <li class='maintemselect' data-val='9' data-type='articlepage'  data-id='"+data[1]['thisid']+"'>分享</li>\n";
				out+="                                            	</ul>\n";
				out+="                                        </div>\n";
			}
			// insert end
			out+="                            	</div>\n";
			// right end
			if(data[1]['thisfile']){
				out+="<img src='uploadfile/"+data[1]['thisfile']+"' id='articlefrontpic'>";
			}
			out+="<div class='artpagecontentwrap'>\n";
			out+=data[1]['thiscontent'];
			out+="<div class='clr'></div>";
			if(data[1]['tag']){
				out+="<p class='artpagetag'>"+data[1]['tag']+"</p>";
			}
			if(sessionStorage.getItem("userid")==data[1]['uid']){
				out+="                            <div class='storeitemlikes2'><span class='bgipoff fR'></span><span class='fR'>"+data[1]['likes']+"</span> </div>\n";
			}else{
				flag=0;
				if(typeof point010 !== 'undefined' && point010.length>0){
					for(var a=0;a<point010.length;a++){
						if(point010[a]['note']==data[1]['contentid']){
							flag=1;
							break;
						}
					}
				}else if(sessionStorage.getItem("userid")){
				}else{
					flag=1;
				}
				if(flag==1){
					out+="                            <div class='storeitemlikes2'><span class='bgipoff fR'></span><span class='fR'>"+data[1]['likes']+"</span> </div>\n";
				}else{
					out+="                            <div class='storeitemlikes2'><span class='bgip fR' data-type='news' data-id='"+data[1]['contentid']+"'></span><span class='newspointsbox fR'>"+data[1]['likes']+"</span> </div>\n";
				}
			}
			out+="                            	<P class='artpagetag'>留言("+data[1]['reply'].length+") 收藏("+data[1]['saves']+") </P>\n";
			out+="</div>";

			out+="                                <div class='mainitemreply'>\n";
			if((data[1]['reply'].length-4)>0){
				out+="<div class='replyshowall'>尚有"+(data[1]['reply'].length-4)+"篇回答,看全部</div>";
			}
			for(var b=0;b<data[1]['reply'].length;b++){
				out+="                                	<!--reitem-->\n";
				if((data[1]['reply'].length-b)>4){
					out+="                                	<div class='mcreplyitem' style='display:none;'>\n";
				}else{
					out+="                                	<div class='mcreplyitem'>\n";
				}
				out+="                                		<div class='mcreplyicon'>\n";
				out+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1' data-id='"+data[1]['reply'][b]['uid']+"' >\n";//20180905 Pman 頭像加上連結
				if(data[1]['reply'][b]['userpic']){
					out+="<img src='uploadfile/"+smallpics(data[1]['reply'][b]['userpic'])+"'  />\n";
				}else{
					out+="<img src='img/basicheads.png' />\n";
				}
				out+="											</a>\n";
				out+="</div>\n";
				out+="                                        <div class='mcreplybox_q  article'>\n";
				out+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1' data-id='"+data[1]['reply'][b]['uid']+"' ><span class='color_red'>"+data[1]['reply'][b]['user']+"</span></a>\n"; //20180905 Pman data-val帶錯，class寫錯，並缺少data-id
				out+=nl2br(data[1]['reply'][b]['thiscontent']);
				if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid")==data[1]['reply'][b]['uid']){
				}else{
					out+="<a class='replyclick fR btn' data-id='"+data[1]['reply'][b]['uid']+"' data-name='"+data[1]['reply'][b]['user']+"' style='padding:5px 0;'>回覆</a>";
				}
				out+="                                            <div class='mcreplyboxsub timeitem' data-t='"+data[1]['reply'][b]['dateadd']+"'>"+data[1]['reply'][b]['dateadd']+" </div>\n";
				out+="                                        </div>\n";
				out+="                                        <div class='clr'></div>\n";
				out+="                                    </div>\n";
				out+="                                    <!--reitem end -->\n";
			}
			if(window.page!="share.php"){
				out+="		                                	<!--reitem-->\n";
				out+="                                	<div class='mcreplyitem replyspeakbox' style='padding-bottom:5px;'>\n";
				out+="                                    	<div class='mcreplyicon'>\n";
				if(mem && mem['headpic']){
					out+="                                    	<img src='uploadfile/"+smallpics(mem['headpic'])+"'  />\n";
				}else{
					out+="										<img src='img/basicheads.png' />\n";
				}
				out+="                                        </div>\n";
				out+="                                        	<div class='replyspeakinsert'>\n";
				out+="                                        	</div>\n";
				out+="                                        <div class='mcreplybox_q article'>\n";
				out+="                                			<form action='' method='post' class='artpageformreply' >\n";
				out+="                                        	<textarea class='replynow formfield' data-type='artpageformreply' data-id='"+data[1]['contentid']+"' placeholder='發表意見'  onkeydown='if(event.keyCode==13) {return false;}'></textarea>\n";
				out+=" 											<input type='hidden' name='picid' class='picid formfield'>\n";
				out+=" 											<input type='hidden' name='pictype' class='pictype formfield'>\n";
				out+=" 											<input type='hidden' name='replyto' class='replyto formfield'>\n";
				out+="											</form>\n";

				out+="                                    		<div class='replypicclick'>\n";
				out+="                                    	  		<img src='img/mainpicbtn.jpg' />\n";
				out+="                                        		<form action='' method=post enctype='multipart/form-data' class='pciform hideform newspicform'><input name='file'  accept='image/*' type='file' class='fileupload instantupload' data-job='uploadnewsreplypic' data-form='artpageformreply' data-target='picid' data-targettype='pictype' data-pictarget='replypcibox' data-type='replace' /></form>\n";
				out+="                                   		</div>\n";
				out+="											<div class='replypcibox'></div>\n";
				out+="                                        </div>\n";
				out+="                                        <div class='clr'></div>\n";
				out+="                                    </div>\n";
				out+="                                    <!--reitem end -->\n";
				out+="                                </div>\n";
				out+="                   </div>\n";
			}
			$("#mainmidwrapin").html(out);
		}
	});
}
//顯示收藏之攻略內頁
show_centerartpagec=function(x){
	mem=JSON.parse(sessionStorage.getItem("member"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_artpagec",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#mainmidwrapin").html('');
		}else{
			var out="";
			out+="                   <div id='maincontentbox' data-type='article' data-val='mainlist' class='delhide'>\n";
			out+="                            	<div class='mainitemtitle'>\n";
			// left
			out+="                                	<div class='mainitemimg'>\n";
			out+="	                                		<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+data[1]['uid']+"'>\n"; //20180905 Pman 頭像加上連結
			if(data[1]['userpic']){
				out+="									<img src='uploadfile/"+smallpics(data[1]['userpic'])+"' />\n";
			}else{
				out+="									<img src='img/basicheads.png' />\n";
			}
			out+="											</a>\n";
			out+="									</div>\n";
			// left end
			// right
			out+="									<div class='mainitemtitletext'>\n";
			out+="										<div class='fL' style='width:140px;'>\n";
			out+="	                                		<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+data[1]['uid']+"' ><h1>"+data[1]['user']+"</h1></a>\n";
			//out+="                                  		<h6 class='timeitem' data-t='"+data[1]['dateadd']+"'>"+data[1]['dateadd']+"</h6>\n";
			out+="											<h6 class='artpagedate'>收藏時間："+data[1]['dateadd']+"</h6>";
			out+="										</div>\n";
			out+="										<div class='fL' style='width:460px;'>\n";
			out+="											<h1 class='artpageh1'>"+data[1]['thistitle']+"</h1>";
			out+="										</div>\n";
			out+="									</div>";
			// insert
			if(sessionStorage.getItem("userid")){
				out+="                                    	<div class='mainitemtitleselect' style='margin-right:20px;margin-top:10px;'>\n";
				out+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
				out+="                                                <ul class='mainitemtitleselectlist'>\n";
				out+="                                                <li class='maintemselect' data-type='arc' data-val='3' data-id='"+data[1]['thisid']+"' data-job='c'>刪除</li>\n";
				out+="                                            	</ul>\n";
				out+="                                        </div>\n";
			}
			// insert end
			out+="                            	</div>\n";
			if(data[1]['thisfile']){
				out+="<img src='uploadfile/"+data[1]['thisfile']+"' id='articlefrontpic'>";
			}
			out+="<div class='artpagecontentwrap'>\n";
			out+=data[1]['thiscontent'];
			out+="<div class='clr'></div>";
			if(data[1]['tag']){
				out+="<p class='artpagetag'>"+data[1]['tag']+"</p>";
			}
			out+="</div>";
			$("#mainmidwrapin").html(out);
		}
	});
}
// 攻略主控...
show_centerarticle=function(x){
				var out="";
				out+="                   <div id='maincontentbox' data-type='article' data-val='mainlist'>\n";
				out+="                   </div>\n";
				$("#mainmidwrapin").html(out);
				
	if(sessionStorage.getItem("actPG")){ //20190730 Pman 如果actPG參數存在的話，指定從特定頁面開始顯示列表
		//console.log("actPG="+sessionStorage.getItem("actPG"));
		var zz=0;
		zz=parseInt(sessionStorage.getItem("actPG"));
		get_centerarticlelist(x,zz,'');
				//插入都要在這裡呼叫
	}else{
		console.log("xxc="+x);
		get_centerarticlelist(x,1,'');
				//插入都要在這裡呼叫
	}
}
show_centerarc=function(x){//收藏列表
		var out="";
		out+="                <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
		out+="                    <div id='maincontentwrap'>\n";
		out+="                    	<div id='maincontenttitle' data-type='arc' data-val='mainlist'>\n";
		//alert(sessionStorage.getItem("userid"));
		if(sessionStorage.getItem("userid")){
			if(x==1){
				out+="                        	<span class='maincontentselect on border15' data-val='1'>動態牆\n";
				out+="                            </span>\n";
				out+="                        	<span class='maincontentselect border15' data-val='2'>攻略\n";
				out+="                            </span>\n";
			}else{
				out+="                        	<span class='maincontentselect border15' data-val='1'>動態牆\n";
				out+="                            </span>\n";
				out+="                        	<span class='maincontentselect on border15' data-val='2'>攻略\n";
				out+="                            </span>\n";
			}
		}
		out+="                      </div>\n";
		out+="                      <div id='maincontentbox' data-type='wall' data-val='mainlist'>\n";
		out+="                      </div>\n";
		out+="                    </div>\n";
		out+="                </DIV>\n";
		out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
		out+="					<div id='centerrankwrap'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side1' id='bannerside1'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side2' id='bannerside2'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side3' id='bannerside3'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side4' id='bannerside4'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side5' id='bannerside5'>\n";
		out+="					</div>\n";
		out+="				  </DIV>\n";
		$("#mainmidwrapin").html(out);
		get_centerarclist(x,1,'');
		get_centerrightbanner();
		//插入都要在這裡呼叫
}

get_centerarclist=function(x,y,z){//收藏內容
	$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var mytype="arc";
	var myval=x;
	var mylast=y;
	var mykey=z;
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),myval,mytype,mylast,'',gameselect,mykey);//人 / key
	tempitem=ajaxarr("show_board",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		if(data[0]=="ERR"){
			$("#maincontentbox").html('');
		}else{
			var out="";
			if(myval==1){
				for(var a=0;a<data[1].length;a++){
					out+=print_wallitemc(data[1][a]);
				}
				out+="					<div class='clr'></div>\n";
				$("#maincontentbox").html(out);
			}else if(myval==2){
				out+="<div class='tright'><div class='searchbox' style='margin-right:0;'><input class='searchtext' type='text' placeholder='請填入關鍵字'><input class='searchsubmit' type='submit' value='' data-type='arc2'></div></div>";
				out+="<div>";
				for(var a=0;a<data[1].length;a++){
					out+=print_articleitemc(data[1][a]);
				}
				out+="					<div class='clr'></div>\n";
				out+="</div>";
				out+="					<div class='inpageclickwrap'>\n";
				var xa=1;
				if(mylast>8){
					xa=mylast-8;
					out+="<div class='inpageclick' data-pg='1' data-type='arc2' data-s='"+mykey+"'>|<</div>";
				}
				if(mylast>1){
					out+="<div class='inpageclick' data-pg='"+(mylast-1)+"' data-type='arc2' data-s='"+mykey+"'><</div>";

				}
				for(var a=xa ; a<=Math.ceil(data[2]/6) && a<=mylast+8 ;a++){
					out+="<div class='inpageclick";
					if(mylast==a){
						out+=" on ";
					}
					out+="' data-pg='"+a+"' data-type='arc2' data-s='"+mykey+"'>"+a+"</div>";
				}
				if(mylast<Math.ceil(data[2]/6)){
					out+="<div class='inpageclick' data-pg='"+(mylast+1)+"' data-type='arc2' data-s='"+mykey+"'>></div>";

				}
				if(Math.ceil(data[2]/9)>17){
					out+="<div class='inpageclick' data-pg=" + Math.ceil( data[2]/6 ) + "' data-type='arc2' data-s='"+mykey+"'>>|";
					out+="</div>";
				}
				out+="					</div>";
				out+="					<div class='clr'></div>\n";
				$("#maincontentbox").html(out);
				run_chknewstext($("#maincontentbox .newstextbox"));
			}


		}
	});
}
get_centerarticlelist=function(x,y,z){
	sessionStorage.setItem("getmore","1");
	$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var mylast=y;
	var mytype="article";
	var mysea=z;
	myval="";
	console.log("gx"+x);
	console.log("gy"+y);
	console.log("gz"+z);
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect,mysea);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲...z=搜尋
	tempitem=ajaxarr("show_board",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試

			if(data[0]=="ERR"){
				var out="";
				out+="<div class='tcenter'><div class='searchbox'><input class='searchtext' type='text' placeholder='請填入關鍵字'><input class='searchsubmit' type='submit' value='' data-type='article'></div></div>";
				$("#maincontentbox").html(out);
			}else{

				var out="";
				out+="<div class='tcenter'><div class='searchbox'><input class='searchtext' type='text' placeholder='請填入關鍵字'><input class='searchsubmit' type='submit' value='' data-type='article'></div></div>";
				out+="<div>";

				for(var a=0;a<data[1].length;a++){
					lastid=data[1][a]['thisid'];
					out+=print_articleitem(data[1][a]);
				}
				out+="</div>";
				//out+="							<div id='mainitemlast' data-val='"+mylast+"'></div>";
				out+="					<div class='clr'></div>\n";
				out+="					<div class='inpageclickwrap'>\n";
				var xa=1;
				var totalpages=Math.ceil(data[2]/9);
				if(mylast>8){
					xa=mylast-8;
					out+="<div class='inpageclick' data-pg='1' data-type='article' data-s='"+mysea+"'>|<</div>";
				}
				if(mylast>1){
					out+="<div class='inpageclick' data-pg='"+(mylast-1)+"' data-type='article' data-s='"+mysea+"'><</div>";

				}
				maxPGs=parseInt(mylast)+8; //20190730 Pman 要將mylast轉成「數值型態」再進行加總計算
				for(var a=xa ; a<=totalpages && a<=maxPGs ;a++){
					//console.log("xa:"+xa);
					//console.log("totalpages:"+totalpages);
					//console.log("mylast+8:"+mylast+8);
					out+="<div class='inpageclick";
					if(mylast==a){
						out+=" on ";
					}
					out+="' data-pg='"+a+"' data-type='article' data-s='"+mysea+"'>"+a+"</div>";
				}
				if(mylast<totalpages){
					out+="<div class='inpageclick' data-pg='"+(mylast+1)+"' data-type='article' data-s='"+mysea+"'>></div>";

				}
				if(totalpages>17 && (mylast<totalpages-9)){
					out+="<div class='inpageclick' data-pg='" + totalpages + "' data-type='article' data-s='"+mysea+"'>>|";
					out+="</div>";
				}
				out+="					</div>";
				$("#maincontentbox").html(out);
			}
	});
}
// ############# 發攻略 ########################
show_centerpublish=function(x){
	if(x){
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
		tempitem=ajaxarr("get_onearticle",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
				if(data[0]=="ERR"){
					popnotice(data[1]);
					$("#mainmidwrapin").html('');
				}else{
					//console.log("x:"+x);
					out="";
					out+="                <div id='maincontenttitle' data-type='qna' data-val='mainlist'>\n";
					out+="                	<span class='maincontentselect on border15' data-val='0'>發布攻略\n";
					out+="                  </span>\n";
					out+="                    <span class='maincontentselect border15 pageclick'  data-type='mypage' data-val='3'>我的攻略\n";
					out+="                    </span>\n";
					out+="                    <p class='spliter'></p>\n";
					out+="                    <span class='maincontentselect border15 pageclick'  data-type='mypage' data-val='3x'>我的草稿\n";
					out+="                    </span>\n";
					out+="                </div>\n";
					out+="                <div id='articlepubwrap'>\n";
					out+="<form action='' method='post' id='articlepicform' enctype='multipart/form-data'>\n";
					out+="                    <div class='formline'>\n";
					out+="                        <div class='formitem formitem_2'>封面圖</div>\n";
					out+="                        <div class='formitem formitem_2'>\n";
					out+="							  <div class='instantbox'>\n";
					out+="							  	<div class='btn border5 fixer'>請選擇</DIV>";
					out+="                            	<input type='file' accept='image/gif, image/jpeg, image/png, image/jpg' class='formfield instantupload' name='headpic' data-job='uploadarticle' data-form='articlepicform' data-target='titlepicid' data-type='cover' >\n";
					if(data[1]['thisfile']){
						out+="							<img src='uploadfile/"+data[1]['thisfile']+"' class='imgover'>\n";
					}
					out+="							  <p class='fixer' style='right:10%;bottom:0;color:#cccccc;font-size:13px;bottom:0;'>建議圖片尺寸為730x411</p>\n";
					out+="							  </div>\n";
					out+="                        </div>\n";
					out+="                        <div class='clr'></div>\n";
					out+="                    </div>\n";
					out+="</form>";
					out+="				<form action='' method='post' id='articleform'>\n";
					out+="                <div class='formline'>\n";
					out+="                    <div class='formitem formitem_2'>標題*</div>\n";
					out+="                    <div class='formitem formitem_2'>\n";
					out+="                        <input type='text' class='formfield form-control' name='title' value='"+data[1]['thistitle']+"' placeholder='中文字數限制50個字' maxlength='50'>\n";//20190412 Pman 修改字數限制
					out+="                        <div class='formerr'>請填寫標題</div>\n";
					out+="                    </div>\n";
					out+="                    <div class='clr'></div>\n";
					out+="                </div>\n";
					out+="                <div class='formline'>\n";
					out+="                    <div class='formitem formitem_2'>遊戲*</div>\n";
					out+="                    <div class='formitem formitem_2'>\n";
					out+="                        <SELECT class='formfield chosen form-control' name='tag'><option value=''>請選擇</option>\n";
					tags=JSON.parse(sessionStorage.getItem("tags"));
					for(var a=0;a<tags.length;a++){
						out+="<option value='"+tags[a]['gameid']+"' "+(data[1]['gamid']==tags[a]['gameid']?"selected":"")+" >"+tags[a]['gamename']+"</option>\n";
					}
					out+="						  </SELECT>";
					out+="                        <div class='formerr'>請選擇遊戲</div>\n";
					out+="                    </div>\n";
					out+="                    <div class='clr'></div>\n";
					out+="                </div>\n";

					out+="					<input type='hidden' name='titlepicid' class='formfield' id='titlepicid' value='"+data[1]['thisfile']+"'>";
					out+="                <div id='maincontentwrap'>\n";
					out+="                	<textarea NAME='longdes' class=wild style='width:100%;height:400px;' id='publishtextarea' placeholder='最少10字'>\n"; //20190312 Pman 調整編輯器寬度
					out+=data[1]['thiscontent'];
					out+="                    </textarea>\n";
					out+="                </div>\n";
					out+="				  <div class='clr'></div>\n";
					out+="                <div class='formline'>\n";
					out+="                    <div class='formitem formitem_2 tright'>發佈選項</div>\n";
					out+="                    <div class='formitem formitem_2'>\n";
					out+="                        <input type='radio' class='formfield' name='isopen' value='1' "+(data[1]['isopen']=="1"?"checked":"")+" > 發佈\n";
					out+="                        <input type='radio' class='formfield' name='isopen' value='2' "+(data[1]['isopen']=="2"?"checked":"")+"> 草稿\n";
					out+="                    </div>\n";
					out+="                    <div class='clr'></div>\n";
					out+="                </div>\n";
					out+="					<input type='hidden' name='myid' class='formfield' value='"+data[1]['thisid']+"'>";
					out+="                <div class='formline'>\n";
					out+="                    <div class='formitem formitem_3'></div>\n";
					out+="                    <div class='formitem formitem_3'>\n";
					out+="                        <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='articleform' style='margin-left: 30px;'>\n"; //20190522 Pman 調整送出鈕的CSS
					out+="                        <input class='maintemselect submitclick border5' data-type='article' data-val='3' data-id='"+x+"' type='button' value='刪除' style='margin-right: 0px; background: #aaa;'>\n"; //20190522 Pman 新增草稿階段的刪除鈕
					out+="                        <div class='formerr'>有點錯誤,請改正</div>\n";
					out+="                    </div>\n";

					out+="                    <div class='clr'></div>\n";
					out+="                </div>\n";
					out+="				</form>";
					out+="				</div>";
					$("#mainmidwrapin").html(out);
					jQuery(".chosen").chosen();
					tinysetup("#publishtextarea");
					//tinyMCE.activeEditor.setContent(data[1]['thiscontent'])
				}
		});
	}else{
		out="";
		out+="                <div id='maincontenttitle' data-type='qna' data-val='mainlist'>\n";
		out+="                	<span class='maincontentselect on border15' data-val='0'>發布攻略\n";
		out+="                  </span>\n";
		out+="                    <span class='maincontentselect border15 pageclick'  data-type='mypage' data-val='3'>我的攻略\n";
		out+="                    </span>\n";
		out+="                    <p class='spliter'></p>\n";
		out+="                    <span class='maincontentselect border15 pageclick'  data-type='mypage' data-val='3x'>我的草稿\n";
		out+="                    </span>\n";
		out+="                </div>\n";
		out+="                <div id='articlepubwrap'>\n";
		out+="<form action='' method='post' id='articlepicform' enctype='multipart/form-data'>\n";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_2'>封面圖</div>\n";
		out+="                        <div class='formitem formitem_2'>\n";
		out+="							  <div class='instantbox'>\n";
		out+="							  	<div class='btn border5 fixer'>請選擇</div>";
		out+="                            	<input type='file' accept='image/jpeg, image/png, image/jpg' class='formfield instantupload' name='headpic' data-job='uploadarticle' data-form='articlepicform' data-target='titlepicid' data-type='cover' >\n";
		out+="							  </div>\n";
		out+="							  <p class='fixer' style='right:10%;bottom:0;color:#cccccc;font-size:13px;'>建議圖片尺寸為730x411</p>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		out+="</form>";
		out+="				<form action='' method='post' id='articleform'>\n";
		out+="                <div class='formline'>\n";
		out+="                    <div class='formitem formitem_2'>標題*</div>\n";
		out+="                    <div class='formitem formitem_2'>\n";
		out+="                        <input type='text' class='formfield form-control' name='title'  placeholder='中文字數限制50個字' maxlength='50'>\n"; //20190412 Pman 修改字數限制
		out+="                        <div class='formerr'>請填寫標題</div>\n";
		out+="                    </div>\n";
		out+="                    <div class='clr'></div>\n";
		out+="                </div>\n";
		out+="                <div class='formline'>\n";
		out+="                    <div class='formitem formitem_2'>遊戲*</div>\n"; //20190411 Pman 「遊戲」補上必填的提示符號＊
		out+="                    <div class='formitem formitem_2'>\n";
		out+="                        <SELECT class='formfield chosen ' name='tag'><option value=''>請選擇</option>\n";
		tags=JSON.parse(sessionStorage.getItem("tags"));
		for(var a=0;a<tags.length;a++){
			out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
		}
		out+="						  </SELECT>";
		out+="                    </div>\n";
		out+="                    <div class='clr'></div>\n";
		out+="                </div>\n";

		out+="					<input type='hidden' name='titlepicid' class='formfield' id='titlepicid'>";
		out+="                <div id='maincontentwrap'>\n";
		out+="                	<textarea NAME='longdes' class=wild style='width:100%;height:400px;' id='publishtextarea' placeholder='最少10字'>\n";//20190312 Pman 調整編輯器寬度
		if(x){
			out+=x;
		}
		out+="                    </textarea>\n";
		out+="                </div>\n";
		out+="				  <div class='clr'></div>\n";
		out+="                <div class='formline'>\n";
		out+="                    <div class='formitem formitem_2 tright'>發佈選項</div>\n";
		out+="                    <div class='formitem formitem_2'>\n";
		out+="                        <input type='radio' class='formfield' name='isopen' value='1' > 發佈\n"; //20190522 Pman 取消預設
		out+="                        <input type='radio' class='formfield' name='isopen' value='2' checked> 草稿\n"; //20190522 Pman 預設改為「草稿」
		out+="                    </div>\n";
		out+="                    <div class='clr'></div>\n";
		out+="                </div>\n";
		out+="					<input type='hidden' name='myid' class='formfield' value=''>";
		out+="                <div class='formline'>\n";
		out+="                    <div class='formitem formitem_3'></div>\n";
		out+="                    <div class='formitem formitem_3'>\n";
		out+="                        <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='articleform'>\n";
		out+="                        <div class='formerr'>有點錯誤,請改正</div>\n";
		out+="                    </div>\n";
		out+="                    <div class='clr'></div>\n";
		out+="                </div>\n";
		out+="				</form>";
		out+="				</div>";
		$("#mainmidwrapin").html(out);
		jQuery(".chosen").chosen();
		tinysetup("#publishtextarea");
	}
}
//################# 商店 ###############################
show_centershoplist=function(x,y){
	var out="";
	out+="                <!--選單-->\n";
	out+="                <div id='maincontenttitle' data-type='shop' data-val='mainlist'>\n";
	out+="                	<span class='maincontentselect on border15' data-val='0'>預設\n";
	out+="                    </span>\n";
	out+="                    <span class='maincontentselect border15' data-val='dateadd DESC'>按上架日期\n";//20180906 Pman 降冪排序，新的在最前面
	out+="                    </span>\n";
	out+="                    <p class='spliter'></p>\n";
	out+="                    <span class='maincontentselect border15' data-val='dispoints DESC'>貢獻值高到低\n";
	out+="                    </span>\n";
	out+="                    <p class='spliter'></p>\n";
	out+="                    <span class='maincontentselect border15' data-val='dispoints'>貢獻值低到高\n";
	out+="                    </span>   \n";
	out+="                </div>\n";
	out+="                <!--選單 END-->\n";
	out+="                   <div id='maincontentbox' data-type='shop' data-val='mainlist'>\n";
	out+="                   </div>\n";
	$("#mainmidwrapin").html(out);
	get_centershoplist(x,y);
	//插入都要在這裡呼叫
}
get_centershoplist=function(x,y){//x==分類  y==順位
	sessionStorage.setItem("getmore","1");
	if(x){
	}else{
		x=0;
	}
	mytype="shop";
	mylast=0;
	var xxxx=x;
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,y);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  / 順位
	tempitem=ajaxarr("show_board",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				popnotice(data[1]);
				$("#maincontentbox").html('');
			}else{
				var out="";
				for(var a=0;a<data[1].length;a++){
					//lastid=data[1][a]['thisid'];
					out+=print_shopitem(data[1][a]);
				}
				out+="							<div id='mainitemlast' data-val='"+data[1].length+"' data-select='"+xxxx+"'></div>";
				$("#maincontentbox").html(out);
				//因為9個可能畫面太小
				if(($(window).height()-parseInt($("#mainwrap").css("margin-top")))>700 && sessionStorage.getItem("getmore")==1){//繼續抓資料
						sessionStorage.setItem("getmore","2");
						getmoreboard($("#mainitemlast").data("select"));
				}
			}
	})
    .error(function(data) {
        console.log('err');
        console.log(data);
    });
}
show_product=function(x){
	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("getproduct",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		out="";
		out+="                <!--麵包屑-->\n";
		out+="                <div class='crumbwrap'>\n";
		out+="                	<a data-val='"+data[1]['catid']+"' class='btn shopcatclickb'>"+data[1]['catname']+"</a> > "+data[1]['pname']+"\n";
		out+="                </div>\n";
		out+="                <!--麵包END-->\n";
		out+="                <!--大圖-->\n";
		out+="                <div id='productintrowrap'>\n";
		out+="                	<img src='img/product/product"+data[1]['pid']+".jpg' class='fL' />\n";
		out+="                    <!--選單-->\n";
		out+="                    <div id='productintrobox'>\n";
		out+="                        <div id='maincontenttitle' class='tagtitlewrap'>\n";
		out+="                            <span class='tagselect border15 on' data-val='0'>商品介紹</span>\n";
		out+="                            <span class='tagselect border15' data-val='1'>注意事項</span>\n";
		out+="                        </div>\n";
		out+="                        <!--選單 END-->\n";
		out+="                        <!--內容-->\n";
		out+="                        <div class='tagcontentwrap'>\n";
		out+="                            <div class='tagcontentbox on' style='display: block;'>\n"; //20190325 Pman 修正會顯示「注意事項」的問題
		out+="                            "+nl2br(data[1]['des1'])+"\n";
		out+="                            </div>\n";
		out+="                            <div class='tagcontentbox' style='display: none;'>\n"; //20190325 Pman 修正會顯示「注意事項」的問題
		out+="                            "+nl2br(data[1]['des2'])+"\n";
		out+="                            </div>\n";
		out+="                        </div>\n";
		out+="                        <!--內容 END-->\n";
		out+="                    </div>\n";
		out+="                    <div class='clr'></div>\n";
		out+="                    <div id='producttitlebox'>\n";
		out+="                    	<span class='fR'>\n";
		out+="                    		<P class='storeitemlikes'><span class='fL'>"+data[1]['dispoints']+"</span> <span class='bgipdis fL'></span></P>\n";
		out+="                    	</span>\n";
		out+="                    	"+data[1]['pname']+" \n";
		if(data[1]['lim']>0){
			out+=" <span style='font-size:13px;'>限量商品,每人限量:"+data[1]['lim']+"</span>";
		}
		out+="                    </div>\n";
		out+="                </div>\n";
		out+="                <!-- 大圖 END -->\n";
		out+="				<form action='' method='post' id='orderform'>\n";
		out+="                <div id='maincontentwrap' class='pad10'>\n";
		out+="                	<!--主要內容-->\n";
		if(data[1]['vir']=="1"){
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'></div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            本商品為無實體之序號商品，訂單成立後會將序號寄至您所指定的信箱\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		/*
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_1 tleft'>密碼</div>\n";
		out+="                        <div class='formitem formitem_1'>\n";
		out+="                            <input type='password' class='formfield form-control' name='pass'>\n";
		out+="                            <div class='formerr'>請輸入密碼</div>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		*/
		out+="					  <input type=hidden name='password' value='暫無作用'  class='formfield'>\n";
		out+="					  <input type=hidden name='pid' value='"+data[1]['pid']+"'  class='formfield'>\n";
		if(data[1]['vir']==1){
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>姓名</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='realname'>\n";
			out+="                            <div class='formerr'>請填寫姓名</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>連絡電話</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='phone'>\n";
			out+="                            <div class='formerr'>請填連絡電話</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>寄送Email</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='email'>\n";
			out+="                            <div class='formerr'>請填寫Email</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>                    \n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>確認Email</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='email2'>\n";
			out+="                            <div class='formerr'>請填寫Email</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>                    \n";
		}else{
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>姓名</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='realname'>\n";
			out+="                            <div class='formerr'>請填寫姓名</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>連絡電話</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='phone'>\n";
			out+="                            <div class='formerr'>請填連絡電話</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>收件地址</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='address'>\n";
			out+="                            <div class='formerr'>請填收件地址</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>Email</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <input type='text' class='formfield form-control' name='email'>\n";
			out+="                            <div class='formerr'>請填寫Email</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>                    \n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>是否自取</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <label><input type='radio' name='pickup' value='1' checked  /> 是</label> <label><input type='radio' name='pickup' value='2'   />否 </label>\n";
			out+="                            <div class='formerr'>請勾選是否自取</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_1 tleft'>備註</div>\n";
			out+="                        <div class='formitem formitem_1'>\n";
			out+="                            <textarea name='notes' class='formfield'></textarea>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
		}
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_1'></div>\n";
		out+="                        <div class='formitem formitem_1'>\n";
		out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='orderform'>\n";
		out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		out+="                	<!--主要內容-->\n";
		out+="                </div>\n";
		out+="				</form>\n";
		$("#mainmidwrapin").html(out);
	});
}
//############# 活動專區 ############################
show_centeract=function(x){
	var out="";
	$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var tempvals=Array('1');//
	tempitem=ajaxarr("getcatpage",tempvals,"ajax.php");
	tempitem.success(function(data){//
		if(data[0]=="ERR"){
			$("#mainmidwrapin").html('');
		}else{
			//out+="<h1>"+data[1]['newstitle']+"</h1>";
			//out+="<p class='newsdate'>"+data[1]['newsdate']+"</p>";
			out+="<div class='newswrap'>\n";
			out+=data[1]['newscontent'];
			out+="</div>";
			$("#mainmidwrapin").html(out);
		}
	});
}
// ########### Q & A ########################
show_centerqna=function(x){
	var out="";
	out+="                <div id='maincontentwrap'>\n";
	out+="                        <!--貼文框-->\n";
	out+="                        <div id='maininputwrap' >\n";
	out+="                        	<div id='maininputwrapbg' ></div>\n";
	out+="                            <div  class='pad10 rely' style='z-index:1'>\n";
	out+="                                <!--又邊框-->\n";
	out+="                                <form action='' method='post' id='qnaform'>\n";
	out+="                                <div id='maininputbox_q' class='fL'>\n";
	out+="                               	 <div class='marginv5' id='newstitlewrapx'>\n";
	out+="                                		<input type='text' name='newstitle' id='newstitle' class='formfield form-control' placeholder='請輸入發問標題,30字內' style='width:688px' >\n";
	out+="                                	</div>\n";
	out+="                                    <div>\n";
	out+="                                        <textarea name='newstext' id='newstext_q' class='formfield form-control' placeholder='請輸入想要發文的內容' ></textarea>\n";
	out+="                            		 	  <div class='formerr'>發文內容不得空白,最多2000字</div>\n";
	out+="                                    </div>\n";
	out+="                                	<input type=hidden name='picaddress' id='newsformfilename'  class='formfield'/>\n";
	out+="                                	<input type=hidden name='pictype' id='newsformfiletype'  class='formfield'/>\n";
	out+="                                  <div id='newsformfilebox'></div>\n";
	out+="                                </form>\n";
	out+="                                    <div id='maininputboxsubmitwrap'>\n";
	out+="                                        <input type=submit name=submit id='newsformsubmit' value='發佈' class='submitclick border5 ' data-type='qnaform'  />\n";
	out+="                                        <span><input type='text' name='q_qty' id='q_qty' placeholder='輸入獎勵貢獻值 最多為 10' /></span>\n"; //2019-329 Pman 調整文案
	out+="                                        <span id='q_typebox'><select name='q_type' id='q_type' class='chosen fR'><option value=''>請選擇遊戲</option>\n";
	tags=JSON.parse(sessionStorage.getItem("tags"));
	for(var a=0;a<tags.length;a++){
		out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
	}
	out+="										  </select></span>\n";
	out+="                                        <span id='q_typewrap'>\n";
	out+="                                        </span>\n";
	out+="                                        </form>\n";
	out+="                                        <div id='mainpicclick'>\n";
	out+="                                            <img src='img/mainpicbtn.jpg' />\n";
	out+="                                        <form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='newspicform'><input name='file[]'  accept='image/*' multiple='multiple' type='file' class='fileupload instantuploadm' data-job='uploadqnapic' data-form='newspicform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' /></form>\n";
	//	out+="                                            <form action='' method=post enctype='multipart/form-data' class='pciform hideform'><input name='file' type='file' class='fileupload instantupload' data-job='uploadnsinglepic' data-form='qnaform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' /></form>\n";
	out+="                                        </div>\n";
	//out+="                                        <div id='mainvideoclick'>\n";
	//out+="                                            <img src='img/mainvideobtn.jpg' />\n";
	//out+="                                          <form action='' method=post enctype='multipart/form-data' class='pciform hideform'><input name='file' type='file' accept='video/mp4' class='fileupload instantupload' data-job='uploadnewspic' data-form='qnaform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' /></form>\n";
	//out+="                                      	</div>\n";
	out+="                                        <div class='clr'></div>\n";
	out+="                                    </div>                           \n";
	out+="                                </div>\n";
	out+="                                <div class='clr'></div> \n";
	out+="                            </div>\n";
	out+="                        </div>\n";
	out+="                        <!--貼文框 END-->\n";
	out+="	                <!--選單-->\n";
	out+="	                <div id='maincontenttitle' data-type='qna' data-val='mainlist'>\n";
	out+="	                	<span class='maincontentselect on border15' data-val='0'>全部問題\n";
	out+="	                    </span>\n";
	out+="	                    <span class='maincontentselect border15' data-val='1'>已解答\n";
	out+="	                    </span>\n";
	out+="	                    <p class='spliter'></p>\n";
	out+="	                    <span class='maincontentselect border15' data-val='2'>未解答\n";
	out+="	                    </span>\n";
	out+="	                </div>\n";
	out+="	                <!--選單 END-->	\n";
	out+="                	<!--主要內容-->\n";
	out+="                	<div id='maincontentbox'  data-type='qna' data-val='mainlist'>	\n";
	out+="					</div>";
	out+="				</div>";
	$("#mainmidwrapin").html(out);
	jQuery(".chosen").chosen();
	get_centerqnalist(x);
}

show_centerqnaone=function(x){
	var out="";
	out+="                <div id='maincontentwrap'>\n";
	out+="                	<!--主要內容-->\n";
	out+="                	<div id='maincontentbox'  data-type='qna' data-val='mainlist'>	\n";
	out+="					</div>";
	out+="				</div>";
	$("#mainmidwrapin").html(out);
	$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	mylast=0;
	mytype="wall";
	myval="";
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	tempitem=ajaxarr("up_qnaone",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#maincontentbox").html('');
		}else{
			var out="";
			out+=print_qnaitem(data[0],1);
			$("#maincontentbox").html(out);
			chk_notice();//在ajax.js
			run_timeitem();//跑一次
			set_video();
		}
	});
}
get_centerqnalist=function(x){//這裡需要改成同時抓兩邊資料
	var querystring = location.search.replace( '?', '' ).split( '&' );
	var qs = {};
	for ( var i=0; i<querystring.length; i++ ) {
		  var name = querystring[i].split('=')[0];
		  var value = querystring[i].split('=')[1];
		  qs[name] = value;
	}
	sessionStorage.setItem("getmore","1");
	$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	mylast=0;
	mytype="qna";
	myval="";
	if(sessionStorage.getItem("qnaselect")==""){
		gameselect=JSON.parse(localStorage.getItem("gameselect"));
	}else{
		gameselect=sessionStorage.getItem("qnaselect");
	}
	if(x){
	}else{
		x=0;
	}
	var temp=x;
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	if(qs["id"]){ //20190423 Pman 在有id的情況之下，改成只顯示一篇
		console.log(qs["id"]);
		tempvals=Array('','',qs["id"]);
		tempitem=ajaxarr("show_qnaone",tempvals,"ajax.php");
	}else{
		tempitem=ajaxarr("show_board",tempvals,"ajax.php");
	}
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
			if(data[0]=="ERR"){
				//alert(data[1]);
				$("#maincontentbox").html('');
			}else{
				if(qs["id"]){ //20190423 Pman 在有id的情況之下，要走這段輸出方式
					var out="";
					out+=print_qnaitem(data[0],2);
					$("#maincontentbox").html(out);
					run_timeitem();//跑一次
				}else{
					var out="";
					var lastid="";
					var tempd=data;
					for(var a=0;a<tempd.length;a++){
							lastid=tempd[a]['thisid'];
							out+=print_qnaitem(tempd[a],1);
					}
					out+="							<div id='mainitemlast' data-val='"+lastid+"' data-select='"+temp+"'></div>";
					$("#maincontentbox").html(out);
					run_timeitem();//跑一次
					set_video();
				}
			}
	});
}



//################# 動態牆  ####################################
//顯示動態牆主控...
show_centerwall=function(x){
		var out="";
		out+="                <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
		out+="                <DIV class='bannerwrap' data-type='walltop' id='bannerwalltop'>\n";
		out+="                </DIV>\n";
		if(sessionStorage.getItem("userid")){
			out+=get_centerwallinput();
		}
		out+="                    <div id='maincontentwrap'>\n";
		out+="                    	<div id='maincontenttitle' data-type='wall' data-val='mainlist'>\n";
		if(sessionStorage.getItem("userid")){
			out+="                        	<span class='maincontentselect on border15' data-val='0'>全部貼文\n";
			out+="                            </span>\n";
			out+="                        	<span class='maincontentselect border15' data-val='1'>好友貼文\n";
			out+="                            </span>\n";
		}
		out+="                      </div>\n";
		out+="                      <div id='maincontentbox' data-type='wall' data-val='mainlist'>\n";
		out+="                      </div>\n";
		out+="                    </div>\n";
		out+="                </DIV>\n";
		out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
		out+="					<div id='centerrankwrap'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side1' id='bannerside1'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side2' id='bannerside2'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side3' id='bannerside3'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side4' id='bannerside4'>\n";
		out+="					</div>\n";
		out+="					<div class='rightbanner bannerwrap' data-type='side5' id='bannerside5'>\n";
		out+="					</div>\n";
		out+="				  </DIV>\n";
		$("#mainmidwrapin").html(out);
		jQuery(".chosen").chosen();
		get_centerwalllist(x);
		get_centertopbanner();
		get_centerrightbanner();
		get_centertoprank();
		//插入都要在這裡呼叫
}
get_centerwalllist=function(x){
	var querystring = location.search.replace( '?', '' ).split( '&' );
	var qs = {};
	for ( var i=0; i<querystring.length; i++ ) {
		  var name = querystring[i].split('=')[0];
		  var value = querystring[i].split('=')[1];
		  qs[name] = value;
	}
	sessionStorage.setItem("getmore","1");
	$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	mylast=0;
	mytype="wall";
	myval="";
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	if(gameselect && gameselect.length==1 && gameselect[0]['show']=="0"){
		gameselect[0]['show']=1;
		localStorage.setItem("gameselect",JSON.stringify(gameselect));
	}
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	//console.log(tempvals);
	console.log(qs["id"]);
	if(qs["id"]){ //20190422 Pman 在有id的情況之下，改成只顯示一篇
		console.log(qs["id"]);
		tempvals=Array(qs["id"]);
		tempitem=ajaxarr("show_wallone",tempvals,"ajax.php");
	}else{
		tempitem=ajaxarr("show_board",tempvals,"ajax.php");
	}
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
			if(data[0]=="ERR"){
				//popnotice(data[1]);
				$("#maincontentbox").html("<div class='tcenter' style='color:#fccf00'>"+data[1]+"</div>");
			}else{
				var out="";
				//動態強
				for(var a=0;a<data.length;a++){
					lastid=data[a]['main']['thisid'];
					out+=print_wallitem(data[a]);
					if( ((a+1)%5) == 0){
						if(get_insertbanner()){
							out+=get_insertbanner();
						}
					}
				}
				if(qs["id"]){//20190426 只有一篇的情況下，就不輸出網下繼續讀的div

				}else{
					out+="							<div id='mainitemlast' data-val='"+lastid+"' data-select='"+x+"'></div>";
				}
				$("#maincontentbox").html(out);
				run_chknewstext($("#maincontentbox .newstextbox"));
				run_timeitem();//跑一次
				set_video();
			}
	});
}
//單一動態強..需更新通知
get_centerwallone=function(x){
	var out="";
	out+="                <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
	out+="                    <div id='maincontentwrap'>\n";
	out+="                      <div id='maincontentbox' data-type='wall' data-val='mainlist'>\n";
	out+="                      </div>\n";
	out+="                    </div>\n";
	out+="                </DIV>\n";
	out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
	out+="					<div id='centerrankwrap'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side1'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side2'>\n";
	out+="					</div>\n";
	out+="				  </DIV>\n";
	$("#mainmidwrapin").html(out);
	$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	get_centerrightbanner();
	get_centertoprank();
	mylast=0;
	mytype="wall";
	myval="";
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	tempitem=ajaxarr("up_boardone",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			//popnotice(data[1]);
			$("#maincontentbox").html("<div class='tcenter' style='color:#fccf00'>"+data[1]+"</div>");
		}else{
			var out="";
			out+=print_wallitem(data[0]);
			$("#maincontentbox").html(out);
			run_chknewstext($("#maincontentbox .newstextbox"));
			chk_notice();//在ajax.js
			run_timeitem();//跑一次
			set_video();
		}
	});
}
//############### 配對 ##############################
// 配對好友首頁
show_centermatch=function(x){
	var temp=x;
	var out="";
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("get_match_count",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		if(data[0]=="ERR"){
			popnotice(data[1]);
		}else{
			out+="                    <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
			out+="                        <div id='maincontenttitle' data-type='match' data-val='mainlist'>\n";
			out+="                                <span class='maincontentselect on border15' data-val='0'>手動配對\n";
			out+="                                </span>\n";
			out+="                                <span class='maincontentselect border15' data-val='1'>系統推薦好友\n";
			out+="                                </span>\n";
			out+="                                <span class='maincontentselect border15 fR' data-val='2'>送出的邀請(<h9 id='fm2cnt'>"+data[1]+"</h9>)\n";
			out+="                                </span>\n";
			out+="                                <p class='spliter fR'></p>\n";
			out+="                                <span class='maincontentselect border15 fR' data-val='3'>交友邀請(<h9 id='fm3cnt'>"+data[2]+"</h9>)\n";
			out+="                                </span>\n";
			out+="                        </div>\n";
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
			//這裡為了搜尋修改 0607
			if(temp==""){
				show_centermatchlist();
			}else{
				$("#mainmidwrapinleft").html(temp);
			}
			get_centerrightbanner();
			get_centertoprank();
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
	tempitem=ajaxarr("get_friendlist",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#maincontentbox").html('');
		}else{
			var out="";
			if(data[1] && data[1].length>=1){
				for(var a=0;a<data[1].length;a++){
					out+=print_frienditem(data[1][a],4);
				}
			}
			$("#maincontentbox").html(out);
			chk_notice();//在ajax.js
		}
	});
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
	//tempitem=ajaxarr("up_matchone",tempvals,"ajax.php");
	tempitem=ajaxarr("show_matchone",tempvals,"ajax.php");
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
// 配對好友內頁
show_centermatchlist=function(x){
	if($("#addgamematchselecttime").val() || $("#addgamematchselectarea").val() || localStorage.getItem("friendselect")){
		var out="";
		$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),JSON.parse(localStorage.getItem("friendselect")),$("#addgamematchselectarea").val(),$("#addgamematchselecttime").val());//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
		tempitem=ajaxarr("get_match_request",tempvals,"ajax.php");
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
	tempitem=ajaxarr("get_match_system",tempvals,"ajax.php");
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
			}
	});
}

//寄送邀請葉面
show_centermatchsendlist=function(){
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("get_match_send",tempvals,"ajax.php");
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

//接受邀請葉面
show_centermatchreceivelist=function(){
	$("#maincontentbox").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("get_match_receive",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				//alert(data[1]);
				$("#maincontentbox").html('');
			}else{
				var out="";
				for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['uid'];
						out+=print_frienditem(data[1][a],3);
				}
				$("#maincontentbox").html(out);
			}
	});
}
//排行榜頁中央
show_centerranklist=function(x){
	var out="";
	out+="                <DIV id='mainmidwrapinleft' class='midwrapinleft'>\n";
	out+="                </DIV>\n";
	out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side1' id='bannerside1'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side2' id='bannerside2'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side3' id='bannerside3'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side4' id='bannerside4'>\n";
	out+="					</div>\n";
	out+="					<div class='rightbanner bannerwrap' data-type='side5' id='bannerside5'>\n";
	out+="					</div>\n";
	out+="				  </DIV>\n";
	/* 改廣告
	out+="                <DIV id='mainmidwrapinright' class='midwrapinright'>\n";
	out+="					<div id='centerrankwrap'>\n";
	out+="					</div>\n";
	out+="				  </DIV>\n";
	*/
	$("#mainmidwrapin").html(out);
	show_centerranklistin(x,'','');//中間資料
	//get_centertoprank();//修改成廣告
	get_centerrightbanner();//抓取廣告
}
//排行榜頁中央內容
show_centerranklistin=function(x,y,z){
	var ranktype=x;
	var xmonth=y;
	var xtype=z;
	$("#mainmidwrapinleft").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var tempvals=Array(ranktype,xmonth,xtype);//人 / key / id
	tempitem=ajaxarr("get_topranklist",tempvals,"ajax.php");
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
		}else{
			var out="";
			mytype="";
			if(data[4]){
				mytype=data[4];
			}
			titlearr=["","熱門遊戲排行榜 TOP10","本月各類遊戲玩家人數","本月會員排行Top30","新進遊戲熱門排行","","","","","類排行榜"];
			out="";
			//out+="	                <DIV id='mainmidwrapinleft' class='midwrapinleft' data-ranktype='"+ranktype+"' data-type='"+mytype+"'>\n";
			out+="                	<!-- game list-->\n";
			out+="					<div id='gamelistwrap'  class='midwrapinleft' data-ranktype='"+ranktype+"' data-type='"+xtype+"'>\n";
			out+="                    	<div id='gamelisttitle'>"+mytype+titlearr[ranktype]+"</div>\n";

			//前後月選單
			out+="                      <div id='gamelistdateselect'>\n";
			flag=0;
			//if(ranktype!="4"){
				for(a=0;a<data[3].length;a++){
					if((data[3][a]['ymonth']==xmonth || ((a+1)==data[3].length && xmonth=="")) && ((a-1)>=0)){
						flag=1;
						out+="                        	<div class='gamemonthselect monthselectb btn' data-m='"+data[3][(a-1)]['ymonth']+"'>\n";
						out+="                            	<i class='fa fa-chevron-circle-left'></i>\n";
						out+="                                前一月\n";
						out+="                           </div>\n";
					}
				}
			//}
			if(flag==0){
						out+="                        	<div class='gamemonthselect'>\n";
						out+="                           </div>\n";
			}
			out+="                           <div class='gamemonthselect'>\n";
			out+="                            	<select name='monthselect' id='monthselect'>\n";
			for(a=0;a<data[3].length;a++){
				out+="                               <option value='"+data[3][a]['ymonth']+"'"+((data[3][a]['ymonth']==xmonth)||((a+1)==data[3].length&&xmonth=="")?"SELECTED":"")+" >"+data[3][a]['ymonth']+"</option>\n";
			}

			out+="                                </select>\n";
			out+="                           </div>\n";
			//out+="                        	 <div class='gamemonthselect'>\n";
			flag=0;
			//if(ranktype!="4"){
				for(a=0;a<data[3].length;a++){
					if(data[3][a]['ymonth']==xmonth && ((a+1)<data[3].length) ){
						flag=1;
						out+="                        	<div class='gamemonthselect monthselectb btn' data-m='"+data[3][(a+1)]['ymonth']+"'>\n";
						out+="                                後一月\n";
						out+="                                <i class='fa fa-chevron-circle-right'></i>\n";
						out+="                           </div>\n";
					}
				}
		//	}
			if(flag==0){
						out+="                        	<div class='gamemonthselect'>\n";
						out+="                           </div>\n";
			}
			//out+="                           </div>\n";
			out+="                      </div>\n";
			//表格標題
			out+="                      <div id='gamelistbox'>\n";
			out+="                        	<div class='gamelistitem_2 sp'>\n";
			out+="                            	<span>當月</span>\n";
			out+="                                <span></span>\n";
			if(ranktype==1 || ranktype==9){
				out+="                                <span>上月</span>\n";
				out+="                                <span>遊戲名稱</span>\n";
				out+="                                <span>人數</span>\n";
			}else if(ranktype==2){
				out+="                                <span></span>\n";
				out+="                                <span>類型名稱</span>\n";
				out+="                                <span>人數</span>\n";
			}else if(ranktype==3){
				out+="                                <span></span>\n";
				out+="                                <span>會員名稱</span>\n";
				out+="                                <span>貢獻值</span>\n"; //20190107 Pman 將「點」==>「貢獻值」
			}else if(ranktype==4){
				out+="                                <span></span>\n";
				out+="                                <span>遊戲名稱</span>\n";
				out+="                                <span>人數</span>\n";
			}

			out+="                          </div>\n";
			//內容
			for(a=0;a<data[1].length;a++){
				out+="                        	<div class='gamelistitem_2'>\n";
				out+="                            	<span class='fa-stack'><i class='fa fa-circle fa-stack-2x gamelistbgon'></i><strong class='fa-stack-1x gamelisttexton'>"+(a+1)+"</strong></span>\n";
				tfag=0;
				if(ranktype==1 || ranktype==9){
					for(b=0;b<data[2].length;b++){
						if(data[2][b]['gameid']==data[1][a]['gameid']){
							tfag=1;
							if(b>a){
								out+="                                <span><i class='fa fa-caret-up'></i></span>\n";//向上
							}else if(a>b){
								out+="                                <span><i class='fa fa-caret-down'></i></span>\n";
							}else{
								out+="                                <span>-</span>\n";
							}
							out+="                                <span class='fa-stack'><i class='fa fa-circle fa-stack-2x gamelistbg'></i><strong class='fa-stack-1x gamelisttext'>"+(b+1)+"</strong></span>\n";
						}
					}
				}
				if(tfag==0){
					out+="                                <span></span>\n";
					out+="                                <span class='fa-stack'></span>\n";
				}
				if(ranktype==1 || ranktype==4 || ranktype==9){
					tags=JSON.parse(sessionStorage.getItem("tags"));
					for(var c=0;c<tags.length;c++){
						if(tags[c]['gameid']==data[1][a]['gameid']){
							out+="<span>";
							//tags[c]['gamename']
							if(stringBytes(tags[c]['gamename'])>22){
								tt=tags[c]['gamename'].split("");
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
								out+=tags[c]['gamename']+" \n";
							}
							out+="</span>";
							break;
						}
					}
				}else if(ranktype==2){
					out+="<span>"+data[1][a]['type']+"</span>";
				}else if(ranktype==3){
					out+="<span>"+data[1][a]['name']+"</span>";
				}
				out+="                                <span>"+data[1][a]['qty']+"</span>\n";
				out+="                          </div>\n";
			}
			out+="                     </div>\n";
			out+="                 </div>\n";
			out+="                 <!-- game list end-->\n";
			//out+="                 </DIV>	\n";
		}
		$("#mainmidwrapinleft").html(out);
	});

}


// 抓取 中央的 toprank 回傳給主控--首頁
get_centertoprank=function(){
	tags=JSON.parse(sessionStorage.getItem("tags"));
	toprank=JSON.parse(sessionStorage.getItem("toprank"));
	$("#centerrankwrap").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
	var out="";
	out+="					<div id='gamelistwrap'>\n";
	out+="                    	<div id='gamelisttitle'>熱門遊戲排行榜 TOP10</div>\n";
	out+="                        <div id='gamelistbox'>\n";
	for(var a=0;a<toprank.length;a++){
		for(var b=0;b<tags.length;b++){
			if(tags[b]['gameid']==toprank[a]['gameid']){
				out+="                        	<div class='gamelistitem'>\n";
				out+="                            	<span class='fa-stack'><i class='fa fa-circle fa-stack-2x gamelistbgon'></i><strong class='fa-stack-1x gamelisttexton'>"+(a+1)+"</strong></span>\n";
				out+="                                <span>";
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
				out+="</span>\n";
				out+="                                <span>"+toprank[a]['qty']+"</span>\n";
				out+="                            </div>\n";
				break;
			}
		}
	}
	out+="                        </div>\n";
	out+="                    </div>\n";
	$("#centerrankwrap").html(out);
}
// ############ BANNERS ######################################################
get_insertbanner=function(){
	myid="wallinsert";
	banners=JSON.parse(sessionStorage.getItem("banners"));
	var thisb="";
	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		var out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg' class='wallinsertimg'>\n";
		out+="</a>";
		return out;
	}
}

get_topbanner=function(){
	myid="topadimg";
	banners=JSON.parse(sessionStorage.getItem("banners"));
	var thisb="";

	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}

	if(thisb['banner'] && thisb['banner'].length>0){
		//檢查gameid
		/*
		mybanner=[];
		cc=0;
		gameselect=JSON.parse(localStorage.getItem("gameselect"));
		for(var b=0;b<thisb['banner'].length;b++){
			for(var a=0;a<gameselect.length;a++){
				if(gameselect[a]['gameid']==thisb['banner'][b]['gameid']){
					mybanner[cc]=thisb['banner'][b];
					cc++;
				}
			}
		}
		if(cc>0){
			thisb['banner']=mybanner[cc];//取代
		}
		*/
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg' id='topadimgimg'>\n";
		out+="</a>";
		out+="<img src='img/close2.png' id='topadimgclick' />";
		$("#topadimg").html(out);
	}else if(location.pathname!="/share.php"){//20190109 Pman 在沒有topadimg的時後，自動將該區塊收掉 //20190524 Pman 修正share.php頁面在沒有banner的時候，選單會消失
		$("#headeroutwrap").animate({"top":-250},500);
		$("#mainwrap").animate({"margin-top":45},500);
		$("#mainright").animate({"top":45},500,function(){setsize();calrightpos();});
		$("#mainleft").animate({"top":45},500);
	}
}
get_centerrightbanner=function(){
	banners=JSON.parse(sessionStorage.getItem("banners"));
	myid="side1";
	thisb="";
	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
	myid="side2";
	thisb="";
	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
	myid="side3";
	thisb="";
	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
	myid="side4";
	thisb="";
	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
	myid="side5";
	thisb="";
	for(var a=0;a<banners.length;a++){
		if(banners[a]['locationkey']==myid){
			thisb=banners[a];
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
}
get_centertopbanner=function(){
	myid="walltop";
	banners=JSON.parse(sessionStorage.getItem("banners"));
	var thisb="";
	if(banners.length>0){
		for(var a=0;a<banners.length;a++){
			if(banners[a]['locationkey']==myid){
				thisb=banners[a];
			}
		}
	}
	if(thisb['banner'] && thisb['banner'].length>0){
		thisb['banner']=set_bannerselect(thisb['banner']);
		out="";
		t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
		out+="<a href='"+thisb['banner'][t]['url']+"' target=_new >\n";
		out+="<img src='img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'  style='margin-bottom:10px;'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
}
get_centerwallinput=function(){
	var out="";
	out+="                  <div id='maininputwrap' class='midwrapinleft'>\n";
	out+="                      <div id='maininputwrapbg' ></div>\n";
	out+="                    	<div  class='pad10 rely' style='z-index:1;'>\n";
	out+="                           <div id='maininputbox'>\n";
	out+="                            	<div id='inputboxselectwrap'>\n";
	out+="                                	<span style='background:#eee;' class='returnmeclick'>近況發佈</span>\n";
	//out+="                                    <span>新增相簿<form action='' method=post id='picbookform' enctype='multipart/form-data' class='hideform'><input name='file[]' type='file' multiple='multiple' class='fileupload instantuploadm' data-job='uploadnewspicbook' data-form='newspicform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' /></form></span>\n";
	out+="                                    <span id='articlepopclick' class='pageclick' data-type='publishpage'>新增攻略</span>\n";
	out+="                                </div>\n";
	out+="                                <form action='' method='post' id='newsform'>\n";
	out+="                                <div class='marginv5 fader' id='newstitlewrapx'>\n";
	out+="                                	<input type='text' name='newstitle' id='newstitle' class='formfield' placeholder='未命名相簿' >\n";
	out+="                                </div>\n";
	out+="                                <div class='rely'>\n";
	//out+="                                	<textarea name='newstext' id='newstext' class='formfield ' placeholder='請輸入想要發文的內容\n網址請單獨一行\nyoutube及twitch請直接貼網址' ></textarea>\n";
	out+="                                	<textarea name='newstext' id='newstext' class='formfield ' placeholder='請輸入想要發文的內容' ></textarea>\n";
	out+="                            		 <div class='formerr'>發文內容不得空白,最多2000字</div>\n";
	out+="                                </div>\n";
	out+="                                	<input type=hidden name='picaddress' id='newsformfilename'  class='formfield'/>\n";
	out+="                                	<input type=hidden name='pictype' id='newsformfiletype'  class='formfield'/>\n";
	out+="                                <div id='newsformfilebox'></div>\n";

	out+="                                <div id='maininputboxsubmitwrap'>\n";
	out+="                                	<input type=submit name=submit id='newsformsubmit' value='發佈' class='submitclick border5' data-type='newsform' />\n";
	out+="                                </form>\n";
	out+="	                                      <span id='q_typebox'><select name='q_type' id='q_type' class='chosen fR'><option value=''>請選擇遊戲</option>\n";
	tags=JSON.parse(sessionStorage.getItem("tags"));
	for(var a=0;a<tags.length;a++){
		out+="<option value='"+tags[a]['gameid']+"'>"+tags[a]['gamename']+"</option>\n";
	}
	out+="</select></span>\n";
	out+="                                        <span id='q_typewrap'>\n";
	out+="                                        </span>\n";
	out+="	                                      <span id='q_openbox'><select name='q_open' id='q_open' class='chosen fR'><option value='1'>公開</option><option value='2'>僅限朋友</option><option value='3'>僅限本人</option></select></span>\n";
	out+="                                    <div id='mainpicclick'>\n";
	out+="                                    	  <img src='img/mainpicbtn.jpg' />\n";
	out+="                                        <form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='newspicform'><input name='file[]'  accept='image/*' multiple='multiple' type='file' class='fileupload instantuploadm' data-job='uploadnewspic' data-form='newspicform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' /></form>\n";
	out+="                                    </div>\n";
	//out+="                                    <div id='mainvideoclick'>\n";
	//out+="                                    	<img src='img/mainvideobtn.jpg' />\n";
	//out+="                                      <form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='newsvidform'><input name='file' type='file' accept='video/mp4' class='fileupload instantupload' data-job='uploadnewsvid' data-form='newsvidform' data-target='newsformfilename'  data-targettype='newsformfiletype' data-pictarget='newsformfilebox' data-type='replace' data-format='mp4' /></form>\n";
	//out+="                                    </div>\n";
	out+="                                	  <div class='clr'></div>\n";
	out+="                                </div>                           \n";
	out+="                            </div>\n";
	out+="                            <div class='clr'></div> \n";
	out+="                        </div>\n";
	out+="                    </div>\n";
	return out;
}

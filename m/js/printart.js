// ##############  攻略 #######################
// 攻略主控...
show_centerarticle=function(x){
	var out="";
	out+="    <div id='maincontentbox' class='album white' data-type='article' data-val='mainlist'>";
	out+="			<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="	  </div>\n";
	//out+="                   <div id='maincontentbox' data-type='article' data-val='mainlist'>\n";
	//out+="                   </div>\n";
	$("#mainwrap").html(out);
	get_centerarticlelist(x,1,'');
	//插入都要在這裡呼叫
}
get_centerarticlelist=function(x,y,z){
	sessionStorage.setItem("getmore","1");
	//$("#maincontentbox").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var mylast=y;
	var mytype="article";
	var mysea=z;
	myval="";
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect,mysea);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲...z=搜尋
	console.log(tempvals);//20190326 Pman 列印參數debug
	tempitem=ajaxarr("show_board",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				var out="";
				out+="				<div class='search'>  ";
				out+="				<input class='searchtext'  type='text' placeholder='搜尋標題'>";
				out+="				<button class='applebtn searchsubmit' data-type='article' >";
				out+="				<i class='fa fa-search' aria-hidden='true'></i>";
				out+="				</button>";
				out+="				</div>";
				//out+="查無相關資料";
			//	out+="<div class='tcenter'><div class='searchbox'><input class='searchtext' type='text' placeholder='請填入關鍵字'><input class='searchsubmit' type='submit' value='' data-type='article'></div></div>";
				$("#maincontentbox").html(out);
				swal("查無相關資料");
			}else{
				var out="";
				out+="				<div class='search'>  ";
				out+="				<input class='searchtext'  type='text' placeholder='搜尋標題'>";
				out+="				<button class='applebtn searchsubmit' data-type='article' >";
				out+="				<i class='fa fa-search' aria-hidden='true'></i>";
				out+="				</button>";
				out+="				</div>";
			//	out+="<div class='tcenter'><div class='searchbox'><input class='searchtext' type='text' placeholder='請填入關鍵字'><input class='searchsubmit' type='submit' value='' data-type='article'></div></div>";
				//out+="<div>";
				if(data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['thisid'];
						out+=print_articleitem(data[1][a]);
					}
					out+="							<div id='mainitemlast' data-val='"+lastid+"'></div>";
				}else{
					swal("查無相關資料");
				}
				$("#maincontentbox").html(out);
				setTimeout(function(){
					wall_slides();//這是為了getboard用的
				},1000);
			}
	});
	if(qs["id"]){ //20190423 Pman 如果有id，跳去內容頁
		show_centerartpage(qs["id"])
		qs["id"]="";
	}
}
//顯示攻略內頁
show_centerartpage=function(x){
	var out="";
	//使用第一層popfull
	out+="    <header>";
	out+="        <div class='link back popfullcloseart applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall' id='artdetailwrap'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="    </div>";
	console.log("x:"+x);
	popbasefullart(out);
	console.log("Klss2");
	if(xmem){}else{
		if(sessionStorage.getItem("member")==""){ //20190621 Pman 在登入後，又登出的情況下，sessionStorage.getItem("member")會殘留空值，以至於JSON.parse會出錯
			xmem="";
		}else{
			xmem=JSON.parse(sessionStorage.getItem("member"));
		}
	}
	mem=xmem;
	//mem=JSON.parse(sessionStorage.getItem("member"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_artpage",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		//console.log(data);
		if(data[0]=="ERR"){
			swal(data[1]);
			$("#artdetailwrap").html('');
		}else{
			console.log("here")
			var out="";
			out+=get_artdetailone(data,0);// 0=全部列--1等於列局部--蒐藏
			//console.log("out:"+out);
			$("#artdetailwrap").html(out);
			
		}
	});
}
//顯示收藏之攻略內頁
show_centerartpagec=function(x){
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	mem=xmem;
	//mem=JSON.parse(sessionStorage.getItem("member"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("show_artpagec",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
		if(data[0]=="ERR"){
			swal(data[1]);
			$("#mainmidwrapin").html('');
		}else{
			var out="";
			out+="                   <div id='maincontentbox' data-type='article' data-val='mainlist' class='delhide'>\n";
			out+="                            	<div class='mainitemtitle'>\n";
			// left
			out+="                                	<div class='mainitemimg'>\n";
			if(data[1]['userpic']){
				out+="									<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1]['userpic'])+"' />\n";
			}else{
				out+="									<img src='img/basicheads.png' />\n";
			}
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
				out+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1]['thisfile']+"' id='articlefrontpic'>";
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
// ############# 發攻略 ########################
//發言框
show_centerpublish=function(x){
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	mem=xmem;
//	var mem=JSON.parse(sessionStorage.getItem("member"));
	if(x){
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,"wall");//人 / key
		tempitem=ajaxarr("get_onearticle",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				swal(data[1])
			}else{
				var out="";
				temp=show_centerpublishbox(data);
				if(temp=="ERR"){
					swal("手機板無法編輯PC版製作/修改之攻略")
				}else{
					out+=temp;
					//popbasefullu(out);
					allpopup(out);
				}
			}
		});
	}else{
		var out="";
		out+=show_centerpublishbox();
		//popbasefullu(out);
		allpopup(out);
	}
}
show_centerpublishbox=function(data){
	var out="";
	mytext="";
	tags=JSON.parse(sessionStorage.getItem("tags"));
	if(data && data[1]){
		var ttb=data[1]['thiscontent'].split('<p>');
		if(ttb[1]){
			return "ERR";
		}else{
			//mytext=ttb[0];
			mytext=data[1]['thiscontent'];
			//轉換圖片
			ttc=mytext.replace(/<img src=uploadfile\//g, "{image:");
			ttd=ttc.replace(/>/g, "}");
			mytext=ttd;
		}
	}
	out+="    <div action='' method='post' id='articleform'>\n";
	out+="    <header>";
	out+="        <div class='link back allpopupclose applebtn submitback'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link'>";
	out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='articleform' data-id='"+(data?data[1]['thisid']:"")+"'>發佈攻略</span>";
	out+="		  </div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall qa'>";
	out+="        <div class='post page'>";
	out+="        <div class='select article'>";
	out+="			  <form action='' method='post' id='articlepicform' enctype='multipart/form-data'>\n";
	out+="            <label>";
	out+="                    攻略封面";
	out+="					   <input type=file name='articlepic' class='fileupload instantupload' accept='image/*' data-job='uploadarticle' data-form='articlepicform' data-target='titlepic' data-type='cover' >";
	out+="                     <button class='upload'>";
	out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
	out+=" 					   </button>";
	out+="                    <div class='img' id='articlepicformbox'>";
	if(data && data[1]['thisfile']){
		out+="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1]['thisfile']+"'><i class='fa fa-times-circle predelclick applebtn' aria-hidden='true' data-job='articlepic' data-val='titlepic' ></i></div>";
	}
	out+="						<div class='clr'></div>";
	out+="                    </div>";
	out+="					<br clear='both'>";
	out+="            </label>";
	out+="			  </form>";
	out+="            <label>";
	out+="            	攻略標題";
	out+="              <input type=text name='title' class='formfield form-control' value='"+(data?data[1]['thistitle']:"")+"' placeholder='輸入標題1~50字內'  data-err='標題長度限制1~50個中文字內' maxlength='50'>";
	out+="            </label>";
	//out+="                <label>";
	//out+="                    選擇遊戲";
	//out+="                    <select class='popclick applebtn formfield form-control' data-type='selectgametag' id='q_type' data-id='q_type' data-err='請選擇遊戲'>";
	out+="                <label class='relay'>";
	out+="                    選擇遊戲";

	if(data && data[1]['gamid']){
		//out+="            <input type=hidden class='formfield form-control' value='"+data[1]['gamid']+"'/>\n";
		tagname="";
		for(a=0;a<tags.length;a++){
			if(tags[a]['gameid']==data[1]['gamid']){
				tagname=tags[a]['gamename'];
			}
		}
		out+="                    <select class='formfield form-control' data-type='selectgametag' id='q_type' data-id='q_type' >";
		out+="                        <option value='"+data[1]['gamid']+"' selected>"+tagname+"</option>";
		out+="                    </select>";
	}else{
		out+="					 <div class='popclick applebtn stagcover' data-type='selectgametag' data-id='q_type'></div>";
		out+="                    <select class='gametagselect formfield form-control' data-type='selectgametag' id='q_type' data-id='q_type' data-err='請選擇遊戲' style='z-index:0;'>";
		out+="                        <option value=''>請選擇遊戲</option>";
		out+="                    </select>";
	}
	out+="                </label>";
	out+="            <input type=hidden name='headpic' id='titlepic' value='"+(data?data[1]['thisfile']:"")+"' class='formfield'/>\n";
	out+="                 <label>";
	out+="                     發佈選項";
	out+="                     <select id='q_open' class='formfield form-control'>";
	if(data && data[1]['isopen']==1){
		out+="                         <option value='1' selected >發佈</option>";
	}else{
		out+="                         <option value='1' "+((data && data[1]['isopen']==1)?"selected":"")+">發佈</option><option value='2' "+((data && data[1]['isopen']==2)?"selected":"")+">草稿</option>";
	}
	out+="                     </select>";
	out+="                 </label>";
	out+="            <label>";
	out+="			  <form action='' method='post' id='articleinsertform' enctype='multipart/form-data'>\n";
	out+="                    圖片";
	out+="					   <input type=file  name='headpic' class='fileupload instantupload' accept='image/*' data-job='uploadarticleinsert' data-form='articleinsertform' data-target='newstext' data-type='insert' >";
	out+="                     <button class='upload'>";
	out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
	out+=" 					   </button>";
	out+="            </form>";
	out+="             </label>";
	out+="            <label>";
	out+="					內容";
	out+="            		<textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='articletext' class='formfield'>"+mytext+"</textarea>";
	out+="					<br clear='both'>";
	out+="            </label>";
	out+="            <input name='myid' class='formfield' type='hidden' value='"+(data?data[1]['thisid']:"")+"'>";
	out+="        </div>";
	out+="        </div>";
	out+="    </div>";
	out+="    </div>";
	return out;
}
// ###########################################################
//############# 攻略 列表元件 ###############################
	print_articleitem=function(data,x){
		point010="";
		if(sessionStorage.getItem("userid")){
			if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
			mem=xmem;
			//mem=JSON.parse(sessionStorage.getItem("member"));
			if(xpoint010){point010=xpoint010;}else if(sessionStorage.getItem("point010")){
				point010=JSON.parse(sessionStorage.getItem("point010"));
			}
		//	if(sessionStorage.getItem("point010")){
	//			point010=JSON.parse(sessionStorage.getItem("point010"));
	//		}
		}
		out="";

		out+="        <div class='list' data-id='"+data['thisid']+"'>";
		if(x==2){
			if(data['thisfile']){
				out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data['thisfile']+"' class='applebtn popclick'  data-type='artpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='applebtn  popclick' data-type='artpage' data-val='"+data['thisid']+"'/>";
			}
		}else{
			if(data['thisfile']){
				out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data['thisfile']+"' class='applebtn  popclick' data-type='artpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='applebtn  popclick' data-type='artpage' data-val='"+data['thisid']+"'/>";
			}
		}
		out+="            <div class='title'>"+data['thistitle']+"</div>";
		out+="            <div class='name'><i class='fa fa-pencil' aria-hidden='true'></i> "+data['name']+"</div>";
		out+="            <div class='other'>留言(<span class='rep'>"+data['reply']+"</span>) 收藏("+data['saves']+")";
		out+="                            <div class='point'>"+data['likes']+" <img src='img/p_off.png'></div>\n";
		out+="            </div>";
		out+="        </div>";
		return out;
	}
// ###########################################################
// ###################### 攻略 detail 頁 ######################
get_artdetailone=function(data,tp){//data=內容 tp=類別..一班頁 收藏頁
	var out="";
	var point010=""; //20190417 Pman 為了避免這段function裡的錯誤，加入這個變數
	if(sessionStorage.getItem("point010")){ //20190621 Pman 如果point010存在，讀取資料
		//console.log("NMMMN");
		point010=JSON.parse(sessionStorage.getItem("point010"));
	}
	out+="		<div class='article' data-id='"+data[1]['thisid']+"'>";
	out+="            <div class='top'>";
	out+="                <div class='user popclick applebtn'  data-close='all' data-type='mypage' data-val='1'  data-id='"+data[1]['uid']+"'  >";
	if(data[1]['userpic']){
		out+="									<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1]['userpic'])+"' />\n";
	}else{
		out+="									<img src='img/basicheads.png' />\n";
	}
	out+="				  </div>";
	out+="                <div class='name popclick applebtn' data-type='mypage' data-val='1' data-close='all'  data-id='"+data[1]['uid']+"' >"+data[1]['user']+"<span class='timeitem' data-t='"+data[1]['dateadd']+"'>"+data[1]['dateadd']+"</span></div>";
	out+="                <br clear='both'>";
	out+="                <label class='sub applebtn'>";
	out+="                    <i class='fa fa-chevron-down  applebtn' aria-hidden='true'></i>";
	out+="                    <div class='sub-menu'>";
	if(sessionStorage.getItem("userid")==data[1]['uid']){
		out+="                                                <span class='maintemselect applebtn' data-type='article' data-val='3' data-id='"+data[1]['thisid']+"'>刪除</span>\n";
		out+="                                                <span class='maintemselect applebtn' data-type='article' data-val='4' data-id='"+data[1]['thisid']+"'>編輯</span>\n";
	}else{
		out+="                                                <span class='maintemselect applebtn' data-type='article' data-val='1' data-id='"+data[1]['thisid']+"'>檢舉</span>\n";
		out+="                                                <span class='maintemselect applebtn' data-type='article' data-val='2' data-id='"+data[1]['thisid']+"'>收藏</span>\n";
	}
	out+="                     	<span class='maintemselect applebtn'  data-type='articlepage'  data-val='9' data-id='"+data[1]['thisid']+"'>分享</span>\n"; //20190429 Pman 調整輸出的data-type資料，article ==> articlepage
	out+="                    </div>";
	out+="                </label>";
	out+="            </div>";
	out+="            <div class='main'>";
	out+="                <div class='word all'>";
	out+="                    <h1>"+data[1]['thistitle']+"</h1>";
	out+="                </div>";
	out+="			      <div class='word all'>";
	out+=				 nl2br_art(data[1]['thiscontent']);
	//out+=data[1]['thiscontent'];
	out+="                </div>";
	//設計把圖片和文字分設計了class...但實際上是不符合上傳的
	out+="            </div>";
	out+="            <div class='bottom'>";
	if(data[1]['tag']){
		out+="                <span class='tab'>"+data[1]['tag']+"</span>";
	}else{
		out+="                <span class='tab'></span>";
	}
	console.log("LKH2");
	if(sessionStorage.getItem("userid")==data[1]['uid']){
		out+="                <div class='point'>"+data[1]['likes']+" <img class='bgipoff' src='img/p_off.png'></div>";
		//out+="                            <div class='storeitemlikes2'><span class='bgipoff fR'></span><span class='fR'>"+data[1]['likes']+"</span> </div>\n";
	}else{
		flag=0;
		//20190417 Pman 之前因為卻缺少point010，所以分享略內頁，會GG
		console.log("point010.length:"+point010.length);
		if(point010 && point010.length>0){
			for(var a=0;a<point010.length;a++){
				if(point010[a]['note']==data[1]['contentid']){
					console.log("note:"+point010[a]['note']);
					flag=1;
					break;
				}
			}
		}else if(sessionStorage.getItem("userid")){
		}else{
			flag=1;
		}

		if(flag==1){
			out+="                <div class='point'><span class='allnewspoints' data-id='"+data[1]['contentid']+"'>"+data[1]['likes']+"</span> <img class='bgipoff' src='img/p_off.png'></div>";
		//	out+="                <div class='point'><span class='allnewspoints' data-id='"+data[1]['thisid']+"'>"+data[1]['likes']+"</span> <img class='bgipoff' src='img/p_off.png'></div>";
			//out+="                            <div class='storeitemlikes2'><span class='bgipoff fR'></span><span class='fR'>"+data[1]['likes']+"</span> </div>\n";
		}else{
				out+="                <div class='point' ><span class='allnewspoints' data-id='"+data[1]['contentid']+"'>"+data[1]['likes']+"</span> <img src='img/p_on.png'></div>";
		//	out+="                <div class='point' ><span class='allnewspoints' data-id='"+data[1]['thisid']+"'>"+data[1]['likes']+"</span> <img src='img/p_on.png'  class='bgip' data-type='article' data-id='"+data[1]['contentid']+"'></div>";
			//out+="                            <div class='storeitemlikes2'><span class='bgip fR' data-type='news' data-id='"+data[1]['contentid']+"'></span><span class='newspointsbox fR'>"+data[1]['likes']+"</span> </div>\n";
		}
	}
console.log("LKH");
	//out+="                <div class='point'>250 <img src='img/p_on.png'></div>";
	out+="            </div>";
	out+="            <div class='button'>";
	if(sessionStorage.getItem("userid")==data[1]['uid'] || flag==1){ //20190621 如果是自己，或已點讚過，不顯示"推推"的按鈕
	}else{
		out+="                <div class='link bgip applebtn newsbgip t3' data-type='news' data-id='"+data[1]['contentid']+"'>推推</div>"; //20180912 Pman 客戶要求修改文案
	}
	out+="                <div class='link popclick applebtn artspeakcnt  t3' data-type='artspeak' data-id='"+data[1]['thisid']+"'>留言("+data[1]['reply'].length+")</div>";
	out+="                <div class='link end maintemselect applebtn  t3' data-type='article' data-id='"+data[1]['thisid']+"' data-val='2'>收藏</div>";
	out+="            </div>";
	out+="        </div>";
	
	return out;
}
// 留言的內容列表
show_centerartreplyin=function(x){
	var out="";
	var point010="";
	var point012="";
	if(sessionStorage.getItem("userid")){
		console.log("klss");
		if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
		mem=xmem;
	//	mem=JSON.parse(sessionStorage.getItem("member"));
	if(xpoint010){point010=xpoint010;}else if(sessionStorage.getItem("point010")){
		point010=JSON.parse(sessionStorage.getItem("point010"));
	}
	if(xpoint012){point012=xpoint012;}else if(sessionStorage.getItem("point012")){
		point012=JSON.parse(sessionStorage.getItem("point012"));
	}
	/*
		if(sessionStorage.getItem("point010")){
			point010=JSON.parse(sessionStorage.getItem("point010"));
		}
		if(sessionStorage.getItem("point012")){
			point012=JSON.parse(sessionStorage.getItem("point012"));
		}
		*/
	}
	out+="    <header>";
	out+="        <div class='link back allpopupclose applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link word wallreplycnt'></div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <ul class='alert message wallreplyin'>";
	out+="   </ul>";
	allpopup(out);
	//popbasefull("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var pid=x;
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	var tempitem=ajaxarr("mob_artreply",tempvals,ajaxurl)
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			swal(data[1]);
			return false;
		}else{
			var out="";
			for(var b=0;b<data[1].length;b++){
				out+="        <li>";
				if(data[1][b]['userpic']){
					out+="            <div class='user popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+data[1][b]['uid']+"'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1][b]['userpic'])+"'  /></div>";
				}else{
					out+="            <div class='user popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+data[1][b]['uid']+"'><img src='img/basichead.png'  /></div>";
				}
				out+="            <div class='name'><p><span style='display:inline;' class='popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+data[1][b]['uid']+"'>"+data[1][b]['user']+"</span> ";

				if(sessionStorage.getItem("userid")!=data[1][b]['memberid']){
					out+="				<i class='popclick applebtn' data-type='replybox' data-aid='"+pid+"'  data-id='"+data[2]+"' data-tag='"+data[1][b]['uid']+"'  data-tagname='"+data[1][b]['user']+"'> 回覆</i>";
				}
				out+="            </p>"; //20180913 Pman 調整「回覆」功能的位置
				out+="				<span class='timeitem' data-t='"+data[1][b]['dateadd']+"'>"+data[1][b]['dateadd']+"</span>";
				if(sessionStorage.getItem("userid")==data[1][b]['memberid']){
					out+="                <img src='img/p_off.png' class='icon bgipoff'>";
				}else{
					flag=0;
					if(point012 && point012.length>0){
						for(var a=0;a<point012.length;a++){
							if(point012[a]['note']==data[1][b]['thisid']){
								flag=1;
								break;
							}
						}
					}else if(sessionStorage.getItem("userid")){
					}else{
						flag=1;
					}

					if(flag==1 || sessionStorage.getItem("userid")==""){
						out+="                <img src='img/p_off.png' class='icon bgipoff'>";
					}else{
						out+="                <img src='img/p_on.png' class='icon bgip applebtn' data-type='newsreply' data-id='"+data[1][b]['thisid']+"'>";
					}
				}
				out+="            </div>";
				out+="            <div class='message'>"+nl2br_reply(data[1][b]['thiscontent'])+"</div>";
				out+="            <br clear='both'>";
				out+="        </li>";
			}
			out+="        <button class='post-btn popclick applebtn' data-type='replybox' data-aid='"+pid+"' data-id='"+data[2]+"' data-tag='' data-tagname=''>立即留言</button>";
 			//out+="   </ul>";
			$(".wallreplyin").html(out);
			$(".wallreplycnt").html("留言("+data[1].length+")");
			run_timeitem();//跑一次
			set_video();
		}
	})
}

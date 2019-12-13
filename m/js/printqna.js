// ########### Q & A ########################
// ##########################################################
// #################### 框架 #################################
// ###########################################################
show_centerqna=function(x){
	var out="";
	out+="<div class='wall qa'>";
	out+="        <div class='change'>";
	out+="            <button class='qnaleftclick applebtn' data-val='1' >我的QA</button>";
	out+="        </div>";
	out+="        <div class='tab' id='maincontenttitle' data-type='qna' data-val='mainlist'>";
	out+="            <span class='maincontentselect active applebtn' data-val='0'>全部問題</span>";
	out+="            <span class='maincontentselect applebtn' data-val='1'>已解答</span>";
	out+="            <span class='maincontentselect applebtn' data-val='2'>未解答</span>";
	out+="        </div>";
	out+="		<div id='maincontentbox'  data-type='qna' data-val='mainlist'>";
	out+="			<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="		</div>";
	out+="</div>";
	$("#mainwrap").html(out);
	get_centerqnalist(x);
	/*
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
	out+="                                        <span><input type='text' name='q_qty' id='q_qty' placeholder='輸入獎勵貢獻值' /></span>\n";
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
	*/
}
// ############## 我的框架
show_centerqnamy=function(x){
	var out="";
	out+="    <header>";
	out+="        <div class='link back popfullcloseq applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="		  <div class='link'>";
	out+="            <span class='btn popclick applebtn' data-type='qnaask'>我要發問</span>";
	out+="        </div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall qa' id='qnamywrap'>";
	out+="    </div>";
	popbasefullq(out);
    get_centerqnalistmy(x);
	//$("#mainwrap").html(out);
	//get_centerqnalist(x);
}

// ##################################################
// #################### 列表	 ########################
// ##################################################
get_centerqnalist=function(x){//這裡需要改成同時抓兩邊資料
	sessionStorage.setItem("getmore","1");
	$("#maincontentbox").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
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
	if(qs["id"]){ //20190423 Pman 如果有id以id為主
		var tempvals=Array('','',qs["id"]);
		tempitem=ajaxarr("show_qnaone",tempvals,ajaxurl);
	}else{
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
		tempitem=ajaxarr("show_board",tempvals,ajaxurl);
	}
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
			if(data[0]=="ERR"){
				//alert(data[1]);
				$("#maincontentbox").html('');
			}else{
				if(qs["id"]){ //20190423 Pman 有id以id為主
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
							out+=print_qnaitem(tempd[a]);
					}
					out+="							<div id='mainitemlast' data-val='"+lastid+"' data-select='"+temp+"'></div>";
					$("#maincontentbox").html(out);
					run_timeitem();//跑一次
					set_video();
					setTimeout(function(){
						wall_slides();
					},1000);
				}
			}
	});
}
// ######################## 我的 XX 列表
get_centerqnalistmy=function(x){//這裡需要改成同時抓兩邊資料
	sessionStorage.setItem("getmore","1");
	$("#qnamywrap").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
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
	//console.log("qna:"+tempvals);
	tempitem=ajaxarr("show_board",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
			if(data[0]=="ERR"){
				swal(data[1]);
				var out="";
				out+="<div class='tab' id='myselectbox'>";
				out+="            <span class='qnaleftclick applebtn "+((temp==1)?"active":"")+"' data-val='1'>我的問題</span>";
				out+="            <span class='qnaleftclick applebtn "+((temp==2)?"active":"")+"' data-val='2'>我的追蹤</span>";
				out+="            <span class='qnaleftclick applebtn "+((temp==3)?"active":"")+"' data-val='3'>我的回答</span>";
				out+="        </div>";
				$("#qnamywrap").html(out);
			}else{
				var out="";
				out+="<div class='tab' id='myselectbox'>";
				out+="            <span class='qnaleftclick applebtn "+((temp==1)?"active":"")+"' data-val='1'>我的問題</span>";
				out+="            <span class='qnaleftclick applebtn "+((temp==2)?"active":"")+"' data-val='2'>我的追蹤</span>";
				out+="            <span class='qnaleftclick applebtn "+((temp==3)?"active":"")+"' data-val='3'>我的回答</span>";
				out+="        </div>";
				var lastid="";
				var tempd=data;
				for(var a=0;a<tempd.length;a++){
						lastid=tempd[a]['thisid'];
						out+=print_qnaitem(tempd[a]);
				}
				out+="							<div id='mainitemlast' data-val='"+lastid+"' data-select='"+temp+"'></div>";

				$("#qnamywrap").html(out);
				run_timeitem();//跑一次
				set_video();
				setTimeout(function(){
					wall_slides();
				},1000);
			}
	});
}
// ##################### 顯是一個內容
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
	tempitem=ajaxarr("up_qnaone",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			popnotice(data[1]);
			$("#maincontentbox").html('');
		}else{
			var out="";
			out+=print_qnaitem(data[0]);
			$("#maincontentbox").html(out);
			chk_notice();//在ajax.js
			run_timeitem();//跑一次
			set_video();
			setTimeout(function(){
				wall_slides();
			},1000);
		}
	});
}
// #############  顯示qna內頁
show_centerqnainpage=function(x){
	popbasefull("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
	var out="";
	out+="    <header>";
	out+="        <div class='link back popfullclose applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link word wallreplycnt'></div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall qa' id='qnawrap'>";
	out+="			<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="   </div>";
	$("#popfull").html(out);
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	//var tempvals=Array('','',x);//人 / key / id
	tempitem=ajaxarr("show_qnaone",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			swal(data[1]);
		}else{
			var out="";
			//out+=print_qnaitem2(data[0]);
			out+=print_qnaitem(data[0]);
			$("#qnawrap").html(out);
			var app=print_qnaitemr(data[0]);
			$("#popfull").append(app)
			run_timeitem();//跑一次
			setTimeout(function(){
				wall_slides();
			},1000);
		}
	});
}
// #############################################################
// 手機板 單一QA 全體內容+ 回應入口
	print_qnaitemr=function(xdata){
		var xout="";
		if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
		mem=xmem;
		//mem=JSON.parse(sessionStorage.getItem("member"));
		haswin=0;
		for(var b=0;b<xdata['reply'].length;b++){
			if(xdata['reply'][b]['winner']==1){
				haswin=1;
			}
		}
		xout+="    <ul class='alert message' style=''>";//20190123 Pman 去掉margin-bottom:80px;
		for(var b=0;b<xdata['reply'].length;b++){
			if(haswin==0){
				xout+="        <li>";
			}else{
				if(xdata['reply'][b]['winner']=="1"){
					xout+="        <li class='no1'>";
				}else{
					xout+="        <li>";
				}
			}
			xout+=" 					 <div class='user popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"'>";
//			xout+="            <div class='user'>";
			if(xdata['reply'][b]['userpic']){
				xout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['reply'][b]['userpic'])+"'  />\n";
			}else{
				xout+="<img src='./img/basicheads.png' />\n";
			}
			xout+="            </div>";
			xout+="            <div class='name'><span class='popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' style='display:inline'>"+xdata['reply'][b]['user']+"</span><span  class='timeitem' data-t='"+xdata['reply'][b]['dateadd']+"'>"+xdata['reply'][b]['dateadd']+"</span>";
			if(haswin==0){
				temp=xdata['reply'][b]['rmembers'];
				xout+="<div class='point'><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>";
				if(sessionStorage.getItem("userid")==xdata['uid']){
					xout+="                                        	<i class='qnap fa fa-circle-o right-icon ok applebtn' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"' data-val='maker'></i>\n";
					//xout+="                                        	<i class='qnap fa fa-circle-o' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"' data-val='maker'></i>\n";
				}else if(temp && temp.indexOf(sessionStorage.getItem("userid"))>=0 ){//投過
					//<i class="fa fa-circle-o right-icon ok" aria-hidden="true"></i>
					 xout+="                                        	<i class='qnapoff fa fa-circle-o  right-icon' aria-hidden='true'></i>\n";
					//xout+="                                        	<i class='qnap qnapoff fa fa-circle-o'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
				}else{
					xout+="                                        	<i class='qnap fa fa-circle-o right-icon ok  applebtn' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"'></i>\n";
				}
				xout+="</div>";
			}else{
				xout+="	<span class='right-icon end'>"+xdata['reply'][b]['likes']+"</span>";

			}
			xout+="            </div>";
			xout+="            <div class='message'>"+nl2br_reply(xdata['reply'][b]['thiscontent']).replace("<img ","<div class='newsfilebox popimgclick newsrimg' data-type='chat'><img ")+"</div>";
			//20190109 Pman 替QA回文的照片，加上點開的功能.......這部分，從PC版上線一開始就沒有......
			//console.log(nl2br_reply(xdata['reply'][b]['thiscontent']).replace("<img ","<div class='newsfilebox popimgclick newsrimg' data-type='chat'><img "));
			xout+="            <br clear='both'>";
			if(haswin==0){
			}else{
				if(xdata['reply'][b]['winner']=="1"){
					xout+="            <div class='check'>";
					xout+="                <i class='fa fa-check' aria-hidden='true'></i>";
					xout+="            </div>";
				}
			}
			xout+="        </li>";
		}
		if(haswin==0){//20190123 Pman 修正會被遮住的問題
			xout+="		<div class='qa-post-m blurto'  >";
			xout+="        <input type='text' class=' popclick' placeholder='輸入回答...' data-type='qnapost' data-id='"+xdata['thisid']+"'>";
			xout+="        <i class='fa fa-paper-plane' aria-hidden='true'></i>";
			xout+="        <br clear='both'>";
			xout+="    </div>";
		}
		xout+="    </ul>";
		
		return xout;
	}
// ############################################################
// ###################### QNA 元件 ############################
	print_qnaitem=function(xdata){
		var xout="";
		if(xmem){
			
		}else{
			if(sessionStorage.getItem("member")){ //20190423 Pman 避免沒有member這個資料，而產生錯誤
				xmem=JSON.parse(sessionStorage.getItem("member"));
			}
		}
		mem=xmem;
		//mem=JSON.parse(sessionStorage.getItem("member"));
		haswin=0;
		for(var b=0;b<xdata['reply'].length;b++){
			if(xdata['reply'][b]['winner']==1){
				haswin=1;
			}
		}
		if(haswin==1){
			xout +="        <div class='article end' data-id='"+xdata['thisid']+"' >";//style='margin-bottom:80px;'
		}else{
			xout +="        <div class='article' data-id='"+xdata['thisid']+"' >";// style='margin-bottom:80px;'
		}
		xout +="           <div class='top'>";
		if(xdata['userpic']){
			xout +="                <div class='user popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['userpic'])+"' /></div>";
		}else{
			xout +="                <div class='user popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><img src='img/basicheads.png' /></div>";
		}
		//xout +="                <div class='name popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><span>"+xdata['user']+"</span>"+unescape(xdata['thistitle'])+"</div>";//20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		xout +="                <div class='name popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><span>"+xdata['user']+"</span></div>";//20190710 Pman 變更輸出結構，以修正標題換行問題
		xout +="                <span id='qatitle'>"+unescape(xdata['thistitle'])+"</span>";//20190710 Pman 將標題獨立一個span
		xout +="                <br clear='both'>";
		if(sessionStorage.getItem("userid")){
			xout +="                <label class='sub applebtn'>"; //20190425 Pman 加上applebtn，讓選單開取／關閉的判定能一致
			xout +="                    <i class='fa fa-chevron-down applebtn' aria-hidden='true'></i>";
			xout +="                    <div class='sub-menu'>";
			if(sessionStorage.getItem("userid")==xdata['uid']){
				xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='4' data-id='"+xdata['thisid']+"'>編輯</span>\n";
				xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='3' data-id='"+xdata['thisid']+"'>刪除</span>\n";
			}else{
				xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='1' data-id='"+xdata['thisid']+"'>檢舉</span>\n";
				if(xdata['istrack'] && xdata['istrack']==1){ //這事顯示我的追蹤
					xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='5' data-id='"+xdata['thisid']+"'>取消追蹤</span>\n";
				}else{
					xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='5' data-id='"+xdata['thisid']+"'>追蹤</span>\n";
				}
			}
			xout+="                     	<span class='maintemselect applebtn'  data-type='qnapage'  data-val='9' data-id='"+xdata['thisid']+"'>分享</span>\n";
			xout +="                    </div>";
			xout +="                </label>";
		}
		xout +="            </div>";
		xout +="            <div class='main'>";
		xout +="                <div class='word'>";
		xout +="                    <p>";
		//這邊要分析文章
		var mytemp=unescape(xdata['thiscontent']).split("</div>");//20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		var mytext="";
		var myimage=[];
		var ttb=mytemp[0].split('<div class="newstextbox">');
		mytext=ttb[1];
		mytemp=xdata['thiscontent'].split('src=');
		if(mytemp.length>1){
			for(a=1;a<mytemp.length;a++){
				ttx=mytemp[a].split(".jpg");
				if(ttx.length>1){
					myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".jpg";
				}
				ttx=mytemp[a].split(".png");
				if(ttx.length>1){
					myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".png";
				}
				ttx=mytemp[a].split(".gif");
				if(ttx.length>1){
					myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".gif";
				}
			}
		}
    xout+=nl2br(mytext);
		xout +="                    </p>";
		//xout +="                </div>";
		//xout +="                <div class='show'>...閱讀更多</div>";
		if(myimage.length>0){
			if(myimage.length>1){
				xout+="                <div class='slides'>";
				for(a=0;a<myimage.length;a++){
					xout+="                    <img src='"+myimage[a]+"'>";
				}
				xout+="                </div>";
			}else{
				xout+="                    <img src='"+myimage[0]+"'>";
			}
		}
		//xout +="                <div class='slides'>";
       //             <img src='http://www.needgames.tw/uploadfile/5352017418110440831.png'>
       //             <img src='http://pic.pimg.tw/catchtest/4a4a476cd12f5.jpg'>
       //             <img src='http://www.needgames.tw/img/product/product10_s.jpg'>
		//xout +="                </div>";
		xout +="            </div>";
		xout+="            <div class='bottom'>";
		xout+="                <span class='tab'>";
		if(xdata['tag']){
			xout+=xdata['tag'];
		}
		xout+="		</span>";
		xout+="                <div class='point'>"+xdata['points']+" <img src='img/p_off.png'></div>";
		xout+="            </div>";
		xout+="            <div class='button'>";
		xout+="                <div class='link popclick applebtn qnaspeakcnt' data-type='qnaspeak' data-id='"+xdata['thisid']+"'>回答("+xdata['reply'].length+")</div>";
		if(xdata['istrack'] && xdata['istrack']==1){ //這事顯示我的追蹤
			xout+="                <div class='link end maintemselect applebtn'  data-type='qna'  data-val='51' data-id='"+xdata['thisid']+"' data-cnt='"+xdata['als']+"'>取消追蹤("+xdata['als']+")</div>";
		}else{
			xout+="                <div class='link end maintemselect applebtn'  data-type='qna'  data-val='51' data-id='"+xdata['thisid']+"' data-cnt='"+xdata['als']+"'>追蹤("+xdata['als']+")</div>";
		}
		xout+="            </div>";
		xout+="        </div>";
		return xout;
	}
// ####################################################
// QNA 原件-單頁運作版及內頁板
	print_qnaitem2=function(xdata){
		var xout="";
		if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
		mem=xmem;
		//mem=JSON.parse(sessionStorage.getItem("member"));
		haswin=0;
		for(var b=0;b<xdata['reply'].length;b++){
			if(xdata['reply'][b]['winner']==1){
				haswin=1;
			}
		}
		if(haswin==1){
			xout +="        <div class='article end'>";
		}else{
			xout +="        <div class='article'>";
		}
		xout +="           <div class='top'>";
		if(xdata['userpic']){
			xout +="                <div class='user popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['userpic'])+"' /></div>";
		}else{
			xout +="                <div class='user popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><img src='img/basicheads.png' /></div>";
		}
		xout +="                <div class='name popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><span>"+xdata['user']+"</span>"+xdata['thistitle']+"</div>";
		xout +="                <br clear='both'>";
		if(sessionStorage.getItem("userid")){
			xout +="                <label class='sub applebtn'>";
			xout +="                    <i class='fa fa-chevron-down  applebtn' aria-hidden='true'></i>";
			xout +="                    <div class='sub-menu'>";
			if(sessionStorage.getItem("userid")==xdata['uid']){
				xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='4' data-id='"+xdata['thisid']+"'>編輯</span>\n";
				xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='3' data-id='"+xdata['thisid']+"'>刪除</span>\n";
			}else{
				xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='1' data-id='"+xdata['thisid']+"'>檢舉</span>\n";
				if(xdata['istrack'] && xdata['istrack']==1){ //這事顯示我的追蹤
					xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='5' data-id='"+xdata['thisid']+"'>取消追蹤</span>\n";
				}else{
					xout+="                                                <span class='maintemselect applebtn'  data-type='qna'  data-val='5' data-id='"+xdata['thisid']+"'>追蹤</span>\n";
				}
			}
			xout+="                     	<span class='maintemselect applebtn'  data-type='qnapage'  data-val='9' data-id='"+xdata['thisid']+"'>分享</span>\n";
			xout +="                    </div>";
			xout +="                </label>";
		}
		xout +="            </div>";
		xout +="            <div class='main'>";
		xout +="                <div class='word'>";
		xout +="                    <p>";
		//這邊要分析文章
		var mytemp=xdata['thiscontent'].split("</div>");
		var mytext="";
		var myimage=[];
		var ttb=mytemp[0].split('<div class="newstextbox">');
		mytext=ttb[1];
		mytemp=xdata['thiscontent'].split('src="');
		for(a=1;a<mytemp.length;a++){
			ttx=mytemp[a].split(".jpg");
			if(ttx.length>1){
				myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".jpg";
			}
			ttx=mytemp[a].split(".png");
			if(ttx.length>1){
				myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".png";
			}
			ttx=mytemp[a].split(".gif");
			if(ttx.length>1){
				myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".gif";
			}
		}
        xout+=nl2br(mytext);
		xout +="                    </p>";
		//xout +="                </div>";
		//xout +="                <div class='show'>...閱讀更多</div>";
		if(myimage.length>0){
			if(myimage.length>1){
				xout+="                <div class='slides'>";
				for(a=0;a<myimage.length;a++){
					xout+="                    <img src='"+myimage[a]+"'>";
				}
				xout+="                </div>";
			}else{
				xout+="                    <img src='"+myimage[0]+"'>";
			}
		}
		//xout +="                <div class='slides'>";
       //             <img src='http://www.needgames.tw/uploadfile/5352017418110440831.png'>
       //             <img src='http://pic.pimg.tw/catchtest/4a4a476cd12f5.jpg'>
       //             <img src='http://www.needgames.tw/img/product/product10_s.jpg'>
		//xout +="                </div>";
		xout +="            </div>";
		xout+="            <div class='bottom'>";
		xout+="                <span class='tab'>";
		if(xdata['tag']){
			xout+=xdata['tag'];
		}
		xout+="					</span>";
		xout+="                <div class='point'>"+xdata['points']+" <img src='img/p_on.png'></div>";
		xout+="            </div>";
		xout+="            <div class='button'>";
		xout+="                <div class='link popclick applebtn qnaspeakcnt' data-type='qnaspeak' data-id='"+xdata['thisid']+"'>回答("+xdata['reply'].length+")</div>";
		if(xdata['istrack'] && xdata['istrack']==1){ //這事顯示我的追蹤
			xout+="                <div class='link end maintemselect applebtn'  data-type='qna'  data-val='51' data-id='"+xdata['thisid']+"' data-cnt='"+xdata['als']+"'>取消追蹤("+xdata['als']+")</div>";
		}else{
			xout+="                <div class='link end maintemselect applebtn'  data-type='qna'  data-val='51' data-id='"+xdata['thisid']+"' data-cnt='"+xdata['als']+"'>追蹤("+xdata['als']+")</div>";
		}
		xout+="            </div>";
		xout+="        </div>";
		xout+="    <ul class='alert message'>";
		for(var b=0;b<xdata['reply'].length;b++){
			if(haswin==0){
				xout+="        <li>";
			}else{
				if(xdata['reply'][b]['winner']=="1"){
					xout+="        <li class='no1'>";
				}else{
					xout+="        <li>";
				}
			}
			//xout+="            <div class='user'>";
			xout+=" 					 <div class='user popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"'>";
			if(xdata['reply'][b]['userpic']){
				xout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['reply'][b]['userpic'])+"'  />\n";
			}else{
				xout+="<img src='./img/basicheads.png' />\n";
			}
			xout+="            </div>";
			xout+="            <div class='name'><span class='popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' style='display:inline'>"+xdata['reply'][b]['user']+"</span><span  class='timeitem' data-t='"+xdata['reply'][b]['dateadd']+"'>"+xdata['reply'][b]['dateadd']+"</span>";
			if(haswin==0){
				temp=xdata['reply'][b]['rmembers'];
				xout+="<div class='point'>";
				if(sessionStorage.getItem("userid")==xdata['uid']){
					xout+="                                        	<i class='qnap fa fa-circle-o right-icon ok' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"' data-val='maker'></i>\n";
					//xout+="                                        	<i class='qnap fa fa-circle-o' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"' data-val='maker'></i>\n";
				}else if(temp && temp.indexOf(sessionStorage.getItem("userid"))>=0 ){//投過
					//<i class="fa fa-circle-o right-icon ok" aria-hidden="true"></i>
					 xout+="                                        	<i class='qnap qnapoff fa fa-circle-o  right-icon' aria-hidden='true'></i>\n";
					//xout+="                                        	<i class='qnap qnapoff fa fa-circle-o'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
				}else{
					xout+="                                        	<i class='qnap fa fa-circle-o right-icon ok' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"'></i>\n";
				}
				xout+="</div>";
			}else{
				xout+="	<span class='right-icon end'>"+xdata['reply'][b]['likes']+"</span>";
			}
			xout+="            </div>";
			xout+="            <div class='message'>"+nl2br(xdata['reply'][b]['thiscontent']).replace("<img ","<div class='newsfilebox popimgclick newsrimg' data-type='chat'><img ")+"</div>";
			//20190109 Pman 替QA回文的照片，加上點開的功能.......這部分，從PC版上線一開始就沒有......
			xout+="            <br clear='both'>";
			if(haswin==0){
			}else{
				if(xdata['reply'][b]['winner']=="1"){
					xout+="            <div class='check'>";
					xout+="                <i class='fa fa-check' aria-hidden='true'></i>";
					xout+="            </div>";
				}
			}
			xout+="        </li>";
		}

		xout+="    </ul>";
		return xout;
	}

//############################################################
/* ################### 發言相關  ########################### */
// ###########################################################
// ########### 發言框
get_centerqnapostbox=function(x){
	if(x){//
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,"qna");//人 / key
		tempitem=ajaxarr("show_boardedit",tempvals,ajaxurl);
		tempitem.success(function(data){//
			if(data[0]=="ERR"){
				swal(data[1]);
			}else{
				show_centerqnapostbox(data[1]);
			}
		});
	}else{
		show_centerqnapostbox();
	}
}
show_centerqnapostbox=function(data){
	var out="";
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	mem=xmem;
	//var mem=JSON.parse(sessionStorage.getItem("member"));
	var pictype=0;
	var mytext="";
	if(data){
		var ttb=data['thiscontent'].split('<div class="newstextbox">');
		mytext=unescape(ttb[1].split('</div>')[0]); //20190322 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		if(data['albid'] && data['albid'].length>0){
			pictype=1;
		}
	}
	if(data){ //20190710 Pman 依編輯或新增，給予id不同值，以修正編輯QA沒有檢查文字長度的問題
		out+="    <form action='' method='post' id='qnaformin'>\n";
	}else{
		out+="    <form action='' method='post' id='qnaform'>\n";
	}
	out+="    <header>";
//	out+="        <div class='link back popfullcloseu applebtn'>";
  out+="        <div class='link back allpopupclose applebtn submitback'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link'>";
	if(data){
		out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='qnaformin' data-id='"+data['thisid']+"'>修改QA</span>";
	}else{
		out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='qnaform'>發佈QA</span>";
	}
	out+="		  </div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall qa'>";
	out+="        <div class='post page'>";
	out+="			  <input type='text' placeholder='輸入標題 30字內' id='qnatitle' class='formfield form-control' value='"+(data?unescape(data['thistitle']):"")+"' data-err='請輸入標題' data-err2='標題長度限制在30個中文字以內'>"; //20190321 Pman 新增id屬性  //20190322 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來 //20190710 Pman 新增 data-err2屬性
	out+="            <textarea placeholder='輸入想發問問題' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield form-control'  data-err='請填寫文字'>"+mytext+"</textarea>";
	if(data){
	}else{
		out+="            <input type=hidden name='picaddress' id='newsformfilename' value='' class='formfield'/>\n";
		out+="            <input type=hidden name='pictype' id='newsformfiletype' value='' class='formfield'/>\n";
	}
	out+="            <br clear='both'>";
	out+="            <div class='select blurto'>";
	out+="                 <label>";
	out+="                     獎勵貢獻值";
	out+="                     <img class='point-img' src='img/p_off.png'>";
	out+="                     <input class='point formfield' type='text' id='q_qty' value='"+(data?data['points']:"")+"' placeholder='輸入獎勵貢獻值 最多為 10'>"; //2019-329 Pman 調整文案
	out+="                 </label>";
	if(data){
	}else{
		out+="                <label class='relay'>";
		out+="                    選擇遊戲";
		out+="					 <div class='popclick applebtn stagcover' data-type='selectgametag' data-id='q_type'></div>";
		out+="                    <select class='gametagselect' data-type='selectgametag' id='q_type' data-id='q_type' data-err='請選擇遊戲'>";
		out+="                        <option value='' selected>請選擇遊戲</option>";
		out+="                    </select>";
		out+="                </label>";
		out+="                <label>";
		out+="                    上傳圖片";
		out+="					   <input name='file[]' class='fileupload instantuploadm' type='file' accept='image/*' multiple='multiple' data-type='replace' data-pictarget='newsformfilebox' data-targettype='newsformfiletype' data-target='newsformfilename' data-form='newspicform' data-job='uploadnewspic'>";
		out+="                     <button class='upload'>";
		out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
		out+=" 					   </button>";
		out+="                    <div class='img' id='newsformfilebox'>";
		out+="                    </div>";
		out+="                </label>";
	}
	out+="            </div>";
	out+="        </div>";
	out+="    </div>";
	out+="    </form>";
	//popbasefullu(out);
	allpopup(out);
}

// ###########  回覆的發言框
show_centerqnareplypostbox=function(myid){
	var out="";
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	mem=xmem;
	//mem=JSON.parse(sessionStorage.getItem("member"));
	out+="    <form action='' method='post' id='qnaformreply' class='qnaformreply'>\n";
	out+="    <header>";
	//out+="        <div class='link back popfullcloseu applebtn'>";
	out+="        <div class='link back allpopupclose applebtn submitback'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link'>";
	out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='qnaformreply' data-id='"+myid+"'>發佈留言</span>";
	out+="		  </div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall'>";
	out+="        <div class='post page'>";
	out+="            <div class='user'>";
	if(mem['headpic']){
			out+="            <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(mem['headpic'])+"'  />";
	}else{
			out+="            <img src='img/basichead.png'  />";
	}
	out+="			  </div>";
	out+="            <textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield replynow form-control'  data-err='請填寫文字'></textarea>";
	//out+="            <input type=hidden name='rid' id='rid'  class='formfield' value='"+myid+"' />\n";
	out+="            <input type=hidden name='picid picaddress' id='newsformfilename'  class='formfield'/>\n";
	out+="            <input type=hidden name='pictype' id='newsformfiletype'  class='formfield'/>\n";
	out+="            <br clear='both'>";
	out+="            <div class='select'>";
	out+="                <label>";
	out+="                    上傳圖片";
	out+="					   <input name='file' class='fileupload instantupload' type='file' accept='image/*' data-type='replace' data-pictarget='newsformfilebox' data-targettype='newsformfiletype' data-target='newsformfilename' data-form='newsformreply' data-job='uploadnewsreplypic'>";
	//out+="                     <input type='file'>";
	out+="                     <button class='upload'>";
	out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
	out+=" 					   </button>";
	out+="                    <div class='img' id='newsformfilebox'>";
	out+="                    </div>";
	out+="                </label>";
	out+="            </div>";
	out+="        </div>";
	out+="    </div>";
	out+="    </form>";
//	popbasefullu(out);
	allpopup(out);
}
//#########################################
// ###### 追蹤 #############################
	// QA 相關
	set_qaalso=function(z,x,t){
		var me=z;
		var id=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);
		tempitem=ajaxarr("set_qaalso",tempvals,ajaxurl);
		tempitem.success(function(data){
			out="";
			if(data[0]=="ERR"){
				swal($data[1])
			}else{
				if(data[1]=="del"){
					z.html("追蹤");
					swal("取消追蹤成功");
					if(t==1){//這是下面案件
						var ncnt=parseInt(me.data("cnt"))-1;
						me.html("追蹤("+ncnt+")");
						me.data("cnt",ncnt);
						//更新上方
						var tlist=me.parents(".article").find(".maintemselect");
						for(var a=0;a<tlist.length;a++){
							var meitem=tlist.eq(a);
							if(meitem.data("val")=="5"){
								meitem.html("追蹤");
							}
						}
						if($("#popfull").length>0){//正在my qna
							mlis=$("#maincontentbox .maintemselect");
							for(var a=0;a<mlis.length;a++){
								var meitem=mlis.eq(a);
								if(meitem.data("type")=="qna" && meitem.data("val")=="51" && meitem.data("id")==id){
									var ncnt=parseInt(meitem.data("cnt"))-1;
									meitem.html("追蹤("+ncnt+")");
									meitem.data("cnt",ncnt);
								}else if(meitem.data("type")=="qna" && meitem.data("val")=="5" && meitem.data("id")==id){
									meitem.html("追蹤");
								}
							}
						}
					}else{
						me.parents(".sub").removeClass("on");
						//更新下方
						var tlist=me.parents(".article").find(".maintemselect");
						for(var a=0;a<tlist.length;a++){
							var meitem=tlist.eq(a);
							if(meitem.data("val")=="51"){
								var ncnt=parseInt(meitem.data("cnt"))-1;
								meitem.html("追蹤("+ncnt+")");
								meitem.data("cnt",ncnt);
							}
						}
						if($("#popfull").length>0){//正在my qna-
							//列表頁更新
							mlis=$("#maincontentbox .maintemselect");
							for(var a=0;a<mlis.length;a++){
								var meitem=mlis.eq(a);
								if(meitem.data("type")=="qna" && meitem.data("val")=="51" && meitem.data("id")==id){
									var ncnt=parseInt(meitem.data("cnt"))-1;
									meitem.html("追蹤("+ncnt+")");
									meitem.data("cnt",ncnt);
								}else if(meitem.data("type")=="qna" && meitem.data("val")=="5" && meitem.data("id")==id){
									meitem.html("追蹤");
								}
							}
						}
					}
				}else{
					swal("追蹤問題成功");
					if(t==1){//-這是是下面的案件
						var ncnt=parseInt(me.data("cnt"))+1;
						me.html("取消追蹤("+ncnt+")");
						me.data("cnt",ncnt);
						//更新上方
						var tlist=me.parents(".article").find(".maintemselect");
						for(var a=0;a<tlist.length;a++){
							var meitem=tlist.eq(a);
							if(meitem.data("val")=="5"){
								meitem.html("取消追蹤");
							}
						}
						if($("#popfull").length>0){//正在my qna
							//更新列表
							var mlis=$("#maincontentbox .maintemselect");
							for(var a=0;a<mlis.length;a++){
								var meitem=mlis.eq(a);
								if(meitem.data("type")=="qna" && meitem.data("val")=="51" && meitem.data("id")==id){
									var ncnt=parseInt(meitem.data("cnt"))+1;
									meitem.html("取消追蹤("+ncnt+")");
									meitem.data("cnt",ncnt);
								}else if(meitem.data("type")=="qna" && meitem.data("val")=="5" && meitem.data("id")==id){
									meitem.html("取消追蹤");
								}
							}
						}
					}else{//--這是右邊案件
						z.html("取消追蹤");
						me.parents(".sub").removeClass("on");
						//更新下方
						var tlist=me.parents(".article").find(".maintemselect");
						for(var a=0;a<tlist.length;a++){
							var meitem=tlist.eq(a);
							if(meitem.data("val")=="51"){
								var ncnt=parseInt(meitem.data("cnt"))+1;
								meitem.html("取消追蹤("+ncnt+")");
								meitem.data("cnt",ncnt);
							}
						}
						if($("#popfull").length>0){//正在my qna--更新
							//列表頁更新
							mlis=$("#maincontentbox .maintemselect");
							for(var a=0;a<mlis.length;a++){
								var meitem=mlis.eq(a);
								if(meitem.data("type")=="qna" && meitem.data("val")=="51" && meitem.data("id")==id){
									var ncnt=parseInt(meitem.data("cnt"))+1;
									meitem.html("取消追蹤("+ncnt+")");
									meitem.data("cnt",ncnt);
								}else if(meitem.data("type")=="qna" && meitem.data("val")=="5" && meitem.data("id")==id){
									meitem.html("取消追蹤");
								}
							}
						}
					}
				}
			}
		});
	}

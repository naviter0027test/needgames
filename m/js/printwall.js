//################# 動態牆  ####################################
//顯示動態牆主控...
show_centerwall=function(x){
		var out="";
		out+="<div class='wall'>";
		if(sessionStorage.getItem("userid")){
			if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
			mem=xmem;
			out+="        <div class='post' >";
			if(mem['headpic']){
				out+="            <div class='user'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(mem['headpic'])+"' /></div>";
			}else{
				out+="            <div class='user'><img src='img/basichead.png' /></div>";
			}
			out+="            <input type='text' class='wallinputclick' value='發佈動態消息...' style='color: #909090;'  readonly='readonly'>";//20180906 Pman 處理從發文介面回來後，placeholder文字不見的問題 //20190329 Pman 限制不能輸入
			out+="            <br clear='both'>";
			out+="        </div>";
		}
		//20190531 Pman 新增「全部貼文」、「好友貼文」區塊
		out+="        <div class='tab' id='maincontenttitle' data-type='wall' data-val='mainlist'>";
		out+="            <span class='maincontentselect applebtn on' data-val='0'>全部貼文</span>";
		out+="            <span class='maincontentselect applebtn' data-val='1'>好友貼文</span>";
		out+="        </div>";
		//20190531 Pman 新增「全部貼文」、「好友貼文」區塊
		out+="<div id='maincontentwrap'>";
		out+="                      <div id='maincontentbox' data-type='wall' data-val='mainlist'>\n";
		out+="                      </div>\n";
		out+="</div>";
		out+="</div>";
		$("#mainwrap").html(out);
	//	setTimeout(function(){
			get_centerwalllist(x);
		//},300);

}
get_centerwalllist=function(x){
	sessionStorage.setItem("getmore","1");
	$("#maincontentbox").html("<div class='loaderbox'><img src='assets/img/loader.gif' style='margin-top: 100px;'></div>"); //20190531 Pman 調整loading圖的位置
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
	//console.log(qs["id"]);
	if(qs["id"]){ //20190418 Pman 在有id的情況之下，改成只顯示一篇
		console.log(qs["id"]);
		tempvals=Array(qs["id"]);
		tempitem=ajaxarr("show_wallone",tempvals,ajaxurl);
	}else{
		tempitem=ajaxarr("show_board",tempvals,ajaxurl);
	}
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
			if(data[0]=="ERR"){
				swal(data[1]);
				$("#maincontentbox").html('');
			}else{
				var out="";
				//動態強
				//alert(sessionStorage.getItem("userid"))
			//	alert(sessionStorage.getItem("memberx"))
				for(var qa=0;qa<data.length;qa++){
					if(typeof(data[qa])!== 'undefined' && typeof(data[qa]['main']['thisid'])!== 'undefined'){
						lastid=data[qa]['main']['thisid'];
						out+=print_wallitem(data[qa]);
					}
				}
				if(!(qs["id"])){//20190418 Pman 判斷是否有id，再決定要不要印這段，如果印，頁面會自動往下讀取
					out+="							<div id='mainitemlast' data-val='"+lastid+"' data-select='"+x+"'></div>";
				}
				$("#maincontentbox").html(out);
				run_timeitem();//跑一次
				set_video();
				setTimeout(function(){
					wall_slides();
				},1000);
			}
	}).error(function(err) {
            console.log('show wall err');
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
	$("#maincontentbox").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
	get_centerrightbanner();
	get_centertoprank();
	mylast=0;
	mytype="wall";
	myval="";
	gameselect=JSON.parse(localStorage.getItem("gameselect"));
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	tempitem=ajaxarr("up_boardone",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			swal(data[1]);
			$("#maincontentbox").html('');
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
show_centerwallreply=function(x){
	/*
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
	out+="    <ul class='alert message wallreplyin'>";
	out+="   </ul>";
	$("#popfull").html(out);
	show_centerwallreplyin(x);
	*/
	var out="";
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
	show_centerwallreplyin(x);
}
show_centerwallreplyin=function(x){
	var out="";
	var pid=x;
	//popbasefull("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	var tempitem=ajaxarr("mob_boardreply",tempvals,ajaxurl)
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			swal(data[1]);
			return false;
		}else{
			out="";
			/*
			out+="    <header>";
			out+="        <div class='link back popfullclose'>";
			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
			out+="            <span>返回</span>";
			out+="        </div>";
			out+="        <div class='link word'>留言("+data[1].length+")</div>";
			out+="        <br clear='both'>";
			out+="    </header>";
			out+="    <ul class='alert message'>";
			*/
			for(var b=0;b<data[1].length;b++){
				out+="        <li class='mcreplyitem'>";  //20180917 Pman 為了讓留言刪除可即時變動，新增class屬性mcreplyitem
				if(data[1][b]['userpic']){
					out+="            <div class='user popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+data[1][b]['uid']+"'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1][b]['userpic'])+"'  /></div>";
				}else{
					out+="            <div class='user popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+data[1][b]['uid']+"'><img src='img/basichead.png'  /></div>";
				}
				out+="            <div class='name'><p><span  class='popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+data[1][b]['uid']+"' style='display:inline'>"+data[1][b]['user']+"</span> ";
				if(sessionStorage.getItem("userid")!=data[1][b]['memberid']){
					out+="				<i class='popclick applebtn' data-type='replybox' data-id='"+pid+"' data-tag='"+data[1][b]['uid']+"'  data-tagname='"+data[1][b]['user']+"'> 回覆</i>"; //20180913 Pman 調整「回覆」功能的位置
				}else{
					out+="              <i class='maintemselect applebtn' data-val='3' data-type='wallreply' data-id='"+data[1][b]['thisid']+"'>刪除</i>\n";
					//console.log(data[1][b]['thisid']);  //20180913 Pman 新增「刪除」留言功能
				}
				out+="            </p>";
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
				out+="            <div class='message'>"+nl2br_reply(data[1][b]['thiscontent'])+"</div>";//20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來 //20190321 Pman 改在nl2br_reply裡面處理
				out+="            <br clear='both'>";
				out+="        </li>";
			}
			out+="        <button class='post-btn popclick applebtn' data-type='replybox' data-id='"+pid+"' data-tag='' data-tagname=''>立即留言</button>";
 			//out+="   </ul>";
			$(".wallreplyin").html(out);
			$(".wallreplycnt").html("留言("+data[1].length+")");
			run_timeitem();//跑一次
			set_video();
		}
	}).error(function(err) {
            console.log(err);
        });
}
//發言框
show_centerwallpostbox=function(x){
	var out="";
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	var mem=xmem;
	if(x){
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,"wall");//人 / key
		tempitem=ajaxarr("show_boardedit",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				swal(data[1])
			}else{
				var pictype=0;
				var ttb=data[1]['thiscontent'].split('<div class="newstextbox">');
				mytext=unescape(ttb[1].split('</div>')[0]); //20190322 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
				if(data[1]['albid'] && data[1]['albid'].length>0){
					pictype=1;
				}
				out+="    <form action='' method='post' id='newsform'>\n";
				out+="    <header>";
				out+="        <div class='link back allpopupclose applebtn submitback'>";
//				out+="        <div class='link back popfullcloseu applebtn'>";
				out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
				out+="            <span>返回</span>";
				out+="        </div>";
				out+="        <div class='link'>";
				out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='newsform' data-id='"+data[1]['thisid']+"'>發佈貼文</span>";
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
				out+="            <textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield'>"+mytext+"</textarea>";
				out+="            <input type=hidden name='picaddress' id='newsformfilename' value='"+data[1]['albid']+"' class='formfield'/>\n";
				out+="            <input type=hidden name='pictype' id='newsformfiletype' value='"+pictype+"' class='formfield'/>\n";
				out+="            <br clear='both'>";
				out+="            <div class='select blurto'>";
				out+="                 <label>";
				out+="                     設定權限";
				out+="                     <select id='q_open'>";
				out+="                         <option value='1' "+((data[1]['opentype']==1)?"selected":"")+">公開</option><option value='2' "+((data[1]['opentype']==2)?"selected":"")+">僅限朋友</option><option value='3' "+((data[1]['opentype']==3)?"selected":"")+">僅限本人</option>";
				out+="                     </select>";
				out+="                 </label>";
				out+="                <label class='relay'>";
				out+="                    選擇遊戲";
				out+="					 <div class='popclick applebtn stagcover' data-type='selectgametag' data-id='q_type'></div>";
				out+="                    <select class='gametagselect' data-type='selectgametag' id='q_type' data-id='q_type'>";
				out+="                        <option value='"+data[1]['gamid']+"' selected>"+data[1]['tagname']+"</option>";
				out+="                    </select>";
				out+="                </label>";
				/*
				if(data[1]['albid'] && data[1]['albid'].length>0 && data[1]['image'] && data[1]['image'].length>0){
				}else{
					out+="                <label>";
					out+="                    上傳圖片";
					out+="					   <input name='file[]' class='fileupload instantuploadm' type='file' accept='image/*' multiple='multiple' data-type='replace' data-pictarget='newsformfilebox' data-targettype='newsformfiletype' data-target='newsformfilename' data-form='newspicform' data-job='uploadnewspic'>";
					//out+="                     <input type='file'>";
					out+="                     <button class='upload'>";
					out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
					out+=" 					   </button>";
					//out+="                    <div class='img' id='newsformfilebox'>";
					//out+="                    </div>";
					out+="                </label>";
				}
				*/
				out+="                <div class='label'>";
				out+="                	<div class='img' id='newsformfilebox' style='position:relative;z-index:4;'>";
				if(data[1]['albid'] && data[1]['albid'].length>0 && data[1]['image'] && data[1]['image'].length>0){
						for(var a=0;a<data[1]['image'].length;a++){
							out+="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1]['image'][a]+"'><i class='fa fa-times-circle predelclick applebtn' aria-hidden='true' data-job='newspic'  data-albid='"+data[1]['albid']+"' data-val='"+data[1]['image'][a]+"' ></i></div>"; //20190522 Pman 修改data-job（albpic==>newspic），以避免「相簿最少須保持一張照片」的問題
						//	out+="<div class='s-img inblock'><img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data[1]['image'][a]+"'></div>";//20190121 Pman 現在的編輯，會真的刪圖片，所以先關掉
						}
						if(data[1]['image'].length<5){
	                    	out+="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+data[1]['albid']+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
						}

				}else{
					out+="<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
				}
				out+="										<div class='clr'></div>";
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
	}else{
		out+="    <form action='' method='post' id='newsform'>\n";
		out+="    <header>";
//		out+="        <div class='link back popfullcloseu applebtn'>";
		out+="        <div class='link back allpopupclose applebtn submitback'>";
		out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
		out+="            <span>返回</span>";
		out+="        </div>";
		out+="        <div class='link'>";
		//out+="			<input type='submit' id='newsformsubmit' class='btn submitclick' data-type='newsform' value='發佈貼文'>";
		out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='newsform'>發佈貼文</span>";
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
		out+="            <textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield '></textarea>";
		out+="            <input type=hidden name='picaddress' id='newsformfilename'  class='formfield'/>\n";
		out+="            <input type=hidden name='pictype' id='newsformfiletype'  class='formfield'/>\n";
		out+="            <br clear='both'>";
		out+="            <div class='select'>";
		out+="                 <label>";
		out+="                     設定權限";
		out+="                     <select id='q_open'>";
		out+="                         <option value='1'>公開</option><option value='2'>僅限朋友</option><option value='3'>僅限本人</option>";
		out+="                     </select>";
		out+="                 </label>";
		out+="                <label class='relay'>";
		out+="                    選擇遊戲";
		out+="					 <div class='popclick applebtn stagcover' data-type='selectgametag' data-id='q_type'></div>";
		out+="                    <select class='gametagselect' data-type='selectgametag' id='q_type' data-id='q_type' style='z-index:0;'>";
		out+="                        <option value=''>請選擇</option>";
		out+="                    </select>";
		out+="                </label>";
		/*
		out+="                <label>";
		out+="                    上傳圖片";
		out+="					   <input name='file[]' class='fileupload instantuploadm' type='file' accept='image/*' multiple='multiple' data-type='replace' data-pictarget='newsformfilebox' data-targettype='newsformfiletype' data-target='newsformfilename' data-form='newspicform' data-job='uploadnewspic'>";
		//out+="                     <input type='file'>";
		out+="                     <button class='upload'>";
		out+=" 						<i class='fa fa-upload' aria-hidden='true'></i> 選擇檔案";
		out+=" 					   </button>";
		//out+="                    <div class='img' id='newsformfilebox'>";
		//out+="                    </div>";
		out+="                </label>";
		*/

		out+="                <div class='label'>";
		out+="                	<div class='img' id='newsformfilebox' style='position:relative;z-index:4;'>";
		out+="										<div class='s-img' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>";
	 	out+="										<div class='clr'></div>";
		out+="                	</div>";
		out+="            </div>";
		out+="        </div>";
		out+="    </div>";
		out+="    </form>";
		//popbasefullu(out);
		allpopup(out);
	}
}

//回覆的發言框
show_centerwallreplypostbox=function(myid,mytag,mytagname,myaid){
	var out="";
	if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
	mem=xmem;
	//mem=JSON.parse(sessionStorage.getItem("member"));
	out+="    <form action='' method='post' id='newsformreply'>\n";
	out+="    <header>";
	out+="        <div class='link back allpopupclose applebtn submitback'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link'>";
	//out+="			<input type='submit' id='newsformsubmit' class='btn submitclick' data-type='newsform' value='發佈貼文'>";
	out+="			<span id='newsformsubmit' class='btn submitclick applebtn' data-type='newsformreply'>發佈留言</span>";
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
	var tagins="";
	if(mytag && mytagname){
		 //tagins="@"+mytagname+" ";
		 tagins="<div class='replytonameoutbox'><span class='replytonamebox'>"+mytagname+"</span></div>"
	}
	out+=tagins;
	out+="            <textarea placeholder='輸入想發文的內容' style='height: calc(100vh - 350px);' name='newstext' id='newstext' class='formfield '></textarea>";
	out+="            <input type=hidden name='rid' id='rid'  class='formfield' value='"+myid+"' />\n";
	out+="            <input type=hidden name='picaddress' id='newsformfilename'  class='formfield'/>\n";
	out+="            <input type=hidden name='pictype' id='newsformfiletype'  class='formfield'/>\n";
	if(mytag && mytagname){
		out+="            <input type=hidden name='replyto' id='newsformreplyto'  class='formfield' value='"+mytag+"' />\n";
	}else{
		out+="            <input type=hidden name='replyto' id='newsformreplyto'  class='formfield' />\n";
	}
	if(myaid){
		out+="            <input type=hidden name='aid' id='aid'  class='formfield' value='"+myaid+"' />\n";
	}
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
	//popbasefullu(out);
	allpopup(out);
}
//動態牆原件
	print_wallitem=function(xdata){
		point010="";
		point012="";
		if(sessionStorage.getItem("userid")){
			if(xmem){}else{xmem=JSON.parse(sessionStorage.getItem("member"));}
			mem=xmem;
			if(xpoint010){point010=xpoint010;}else if(sessionStorage.getItem("point010")){
				point010=JSON.parse(sessionStorage.getItem("point010"));
			}
			if(xpoint012){point012=xpoint012;}else if(sessionStorage.getItem("point012")){
				point012=JSON.parse(sessionStorage.getItem("point012"));
			}
		}
		var xout="";
		xout+="        <div class='article' data-id='"+xdata['main']['thisid']+"'>";
		xout+="            <div class='top'>";
		xout+="                <a href='' class='popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><div class='user' >";
		if(xdata['userpic']){
			xout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['userpic'])+"' />\n";
		}else{
			xout+="<img src='img/basichead.png' />\n";
		}
		xout+="                </div></a>";
		xout+="                <div class='name' ><span  class=' popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' >"+xdata['user']+"</span><span  class='timeitem' data-t='"+xdata['main']['dateadd']+"'>"+xdata['main']['dateadd']+"</span></div>";
		xout+="                <br clear='both'>";
		xout+="                <label class='sub applebtn'>";
		xout+="                    <i class='fa fa-chevron-down applebtn' aria-hidden='true'></i>";
		xout+="                    <div class='sub-menu'>";
		if(sessionStorage.getItem("userid")==xdata['uid']){
			if(xdata['main']['typeid']=="0" || xdata['main']['typeid']=="1" || xdata['main']['typeid']=="2"){
				xout+="                                                <span class='maintemselect applebtn' data-val='4' data-type='wall' data-id='"+xdata['main']['thisid']+"'>編輯</span>\n";
			}
			xout+="                                                <span class='maintemselect applebtn' data-val='3' data-type='wall' data-id='"+xdata['main']['thisid']+"'>刪除</span>\n";
		}else{
			xout+="                                                <span class='maintemselect applebtn' data-val='1' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>檢舉</span>\n";
			if(xdata['main']['typeid']==4){ //20190425 Pman 修正攻略在動態牆上可能重複收藏的問題
				xout+="                                                <span class='maintemselect applebtn' data-val='2' data-type='article'  data-id='"+xdata['main']['aid']+"'>收藏</span>\n";
			}else{
				xout+="                                                <span class='maintemselect applebtn' data-val='2' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>收藏</span>\n";
			}
		}
		xout+="                     	<span class='maintemselect applebtn'  data-type='wallpage'  data-val='9' data-id='"+xdata['main']['thisid']+"'>分享</span>\n";
		xout+="                    </div>";
		xout+="                </label>";
		xout+="            </div>";
		xout+="            <div class='main'>";
		if(xdata['main']['typeid'] && xdata['main']['typeid']==4){
			xout+="							<div class='bigcover'>";
			xout+="								 <div class='word pageclick  applebtn' data-type='artpage' data-val='"+xdata['main']['aid']+"'>\n";
		}else{
			xout+="                <div class='word'>";
		}
		xout+="                    <p>";
		//這邊要分析文章
		var mytemp="";
		if(xdata['main']['thiscontent'].indexOf("</div>")>0){//
		//if(xdata['main']['thiscontent'].length>0){
			mytemp=unescape(xdata['main']['thiscontent']).split("</div>"); //20190320 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		}
		var mytext="";
		var myimage=[];
		var myalbid="";
		if(xdata['main']['typeid'] && xdata['main']['typeid']==4){//攻略--只會有一張圖
			var ttb=mytemp[0].split('<div class="newstextbox">');
			mytext=ttb[1];
			if(xdata['main']['thiscontent'].indexOf("newsfilebox")>0){//有圖
				ttb=mytemp[1].split("src='");
				ttc=ttb[1].split("'>");
				myimage[0]=sessionStorage.getItem("imgurl")+ttc[0];
			}
		}else{
			var ttb=mytemp[0].split('<div class="newstextbox">');
			mytext=ttb[1];
			var myimgorg=[];
			mytemp=xdata['main']['thiscontent'].split('src="');
			mytemp2=xdata['main']['thiscontent'].split('albface3cover">');
			for(a=1;a<mytemp.length;a++){
				ttx=mytemp[a].split(".jpg");
				if(ttx.length>1){
					myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".jpg";
					myimgorg[a-1]=ttx[0].split("/")[1]+".jpg";
				}
				ttx=mytemp[a].split(".png");
				if(ttx.length>1){
					myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".png";
					myimgorg[a-1]=ttx[0].split("/")[1]+".png";
				}
				ttx=mytemp[a].split(".gif");
				if(ttx.length>1){
					myimage[a-1]=sessionStorage.getItem("imgurl")+ttx[0]+".gif";
					myimgorg[a-1]=ttx[0].split("/")[1]+".gif";
				}
			}
		}
    xout+=nl2br(mytext);
		xout+="                    </p>";
		if(myimage.length>0){
			myalbx1=xdata['main']['thiscontent'].split('popimgclick');
			if(myalbx1.length>1){
				myalbx2=myalbx1[1];
				myalbid=myalbx2.split('data-val=')[1].split('"')[1];
				if(myimage.length>1){
					xout+="                <div class='slides'>";
					for(a=0;a<myimage.length;a++){
						if(a==2 && mytemp2.length>1){
							ins=mytemp2[1].split("</div>")[0];
							xout+="                    <div class='slidein'><img src='"+myimage[a]+"'><div class='slidecover'><span class='popimgclick applebtn'  data-val='"+myalbid+"' data-src='"+myimgorg[a]+"'>"+ins+"</span></div></div>";
						}else{
							xout+="                    <div class='slidein'><img src='"+myimage[a]+"'  class='popimgclick applebtn'  data-val='"+myalbid+"' data-src='"+myimgorg[a]+"'></div>";
						}
					//xout+="                    <img src='"+myimage[a]+"' class='popimgclick'  data-val='"+myalbid+"' data-src='"+myimgorg[0]+"'>";
					}
					xout+="                </div>";
				}else{
					xout+="                    <img src='"+myimage[0]+"' class='popimgclick applebtn'  data-val='"+myalbid+"' data-src='"+myimgorg[0]+"'>";
				}
			}else{
				if(myimage.length>1){
					xout+="                <div class='slides'>";
					for(a=0;a<myimage.length;a++){
						//xout+="                    <img src='"+myimage[a]+"'>";
						if(a==2 && mytemp2.length>1){
							ins=mytemp2[1].split("</div>")[0];
							xout+="                    <div class='slidein'><img src='"+myimage[a]+"'><div class='slidecover'><span>"+ins+"</span></div></div>";
						}else{
							xout+="                    <div class='slidein'><img src='"+myimage[a]+"'></div>";
						}
					}
					xout+="                </div>";
				}else{
					if(xdata['main']['typeid'] && xdata['main']['typeid']==4){
						xout+="                    <img src='"+myimage[0]+"' class='pageclick  applebtn' data-type='artpage' data-val='"+xdata['main']['aid']+"'>\n";;
					}else{
						xout+="                    <img src="+myimage[0]+">";
					}

				}
			}
		}
		//xout+="            </div>";//word end
		if(xdata['main']['typeid'] && xdata['main']['typeid']==4){
			xout+="            </div>";//bigcover end
		}
		xout+="            </div>";//main end
		xout+="            <div class='bottom'>";
		xout+="                <span class='tab'>";
		if(xdata['tag']){
			xout+=xdata['tag'];
		}
		xout+="				   </span>";
		flag=0;
		if(typeof point010 !== 'undefined' && point010.length>0){
			for(var a=0;a<point010.length;a++){
				if(point010[a]['note']==xdata['main']['thisid']){
					flag=1;
					break;
				}
			}
		}else if(sessionStorage.getItem("userid")){
		}else{
			flag=1;
		}
		if(sessionStorage.getItem("userid")==xdata['uid']){ //20180911 Pman 自己的貼文，能量符號應該是要「亮」的
			//console.log(xdata['uid']);
			flag=1;
		}
		if(flag==1){
			xout+="             <div class='point'><span class='allnewspoints' data-id='"+xdata['main']['thisid']+"'>"+xdata['main']['points']+"</span> <img src='img/p_off.png'></div>";
		}else{
			xout+="             <div class='point'><span class='allnewspoints' data-id='"+xdata['main']['thisid']+"'>"+xdata['main']['points']+"</span> <img src='img/p_on.png'></div>";
		}

		xout+="            </div>";
		xout+="            <div class='button'>";
		//計算數量
		var tx=1;
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid")==xdata['main']['memberid']){
		}else{
			flag=0;
			if(point010 && point010.length>0){
				for(var a=0;a<point010.length;a++){
					if(point010[a]['note']==xdata['main']['thisid']){
						flag=1;
						break;
					}
				}
			}else if(sessionStorage.getItem("userid")){
			}else{
				flag=1;
			}
			if(flag==1){
			}else{
				tx++;
			}
		}
		if(xdata['main']['typeid']=="0" || xdata['main']['typeid']=="1" || xdata['main']['typeid']=="2"|| xdata['main']['typeid']=="4"){
			tx++;
		}
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid")==xdata['main']['memberid']){
			//xout+="                <div class='link bgipoff'></div>";
		}else{
			flag=0;
			if(point010 && point010.length>0){
				for(var a=0;a<point010.length;a++){
					if(point010[a]['note']==xdata['main']['thisid']){
						flag=1;
						break;
					}
				}
			}else if(sessionStorage.getItem("userid")){
			}else{
				flag=1;
			}
			if(flag==1){
			}else{
				xout+="                <div class='link bgip t"+tx+" applebtn newsbgip' data-type='news' data-id='"+xdata['main']['thisid']+"'>推推</div>";
			}

		}
		xout+="                <div class='link popclick  t"+tx+" applebtn wallspeakcnt' data-type='wallspeak' data-id='"+xdata['main']['thisid']+"'>留言("+xdata['reply'].length+")</div>";
		if(xdata['main']['typeid']=="0" || xdata['main']['typeid']=="1" || xdata['main']['typeid']=="2" || xdata['main']['typeid']=="4"){
			//xout+="                <div class='link t"+tx+" end maintemselect applebtn'  data-val='2' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>收藏</div>";
			if(xdata['main']['typeid']==4){ //20190426 Pman 修正攻略在動態牆上可能重複收藏的問題
				//xout+="                                                <span class='maintemselect applebtn' data-val='2' data-type='article'  data-id='"+xdata['main']['aid']+"'>收藏</span>\n";
				xout+="                <div class='link t"+tx+" end maintemselect applebtn'  data-val='2' data-type='article'  data-id='"+xdata['main']['aid']+"'>收藏</div>";
			}else{
				xout+="                <div class='link t"+tx+" end maintemselect applebtn'  data-val='2' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>收藏</div>";
			}


		}
		xout+="            </div>";
		xout+="        </div>";
		return xout;
	}

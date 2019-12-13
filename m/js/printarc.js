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
	tempitem=ajaxarr("show_board",tempvals,ajaxurl);
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
//######################### 收藏原件 ############
	//收藏攻略
	print_articleitemc=function(data,x){
		/*
		out="";
		out+="        <div class='list' data-id='"+data['artid']+"'>";
		if(data['thisfile']){
			out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data['thisfile']+"' class='applebtn popclick'  data-type='artpage' data-val='"+data['artid']+"' />\n";
		}else{
			out+="<img src='img/storetemp.jpg'   class='applebtn  popclick' data-type='artpage' data-val='"+data['artid']+"'/>";
		}
		out+="            <div class='title'>"+data['thistitle']+"</div>";
		out+="            <div class='name'><i class='fa fa-pencil' aria-hidden='true'></i> "+data['name']+"</div>";
		out+="            <div class='other'>&nbsp;</div>";
		out+="        </div>";
		*/
		out="";
		out+="        <div class='list article' data-id='"+data['thisid']+"'>";

		out+="            <div class='top'>";
		out+="                <a href='' class='popclick applebtn' data-type='artpage' data-val='"+data['artid']+"' >";
		out+=data['thistitle'];
		out+="                </a>";
		out+="                <label class='sub applebtn'>";
		out+="                    <i class='fa fa-chevron-down applebtn' aria-hidden='true'></i>";
		out+="                    <div class='sub-menu'>";
		out+="                    	<span class='maintemselect applebtn' data-val='3' data-type='arc' data-id='"+data['thisid']+"'>刪除</span>\n";
		out+="					          </div>";
		out+="                </label>";
		out+="					   </div>";
		if(data['thisfile']){
			out+="                        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+data['thisfile']+"' class='applebtn popclick'  data-type='artpage' data-val='"+data['artid']+"' />\n";
		}else{
			out+="<img src='img/storetemp.jpg'   class='applebtn  popclick' data-type='artpage' data-val='"+data['artid']+"'/>";
		}
		out+="				</div>";
		return out;
	}
	//收藏元件
	print_wallitemc=function(xdata){
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
			/*
			mem=JSON.parse(sessionStorage.getItem("member"));
			if(sessionStorage.getItem("point010")){
				point010=JSON.parse(sessionStorage.getItem("point010"));
			}
			if(sessionStorage.getItem("point012")){
				point012=JSON.parse(sessionStorage.getItem("point012"));
			}
			*/
		}
		var xout="";
		xout+="        <div class='article' data-id='"+xdata['thisid']+"'>";//改成自己的ID
	//	xout+="        <div class='article' data-id='"+xdata['aid']+"'>";
		xout+="            <div class='top'>";
		xout+="                <a href='' class='popclick applebtn' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><div class='user' >";
		if(xdata['userpic']){
			xout+="<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(xdata['userpic'])+"' />\n";
		}else{
			xout+="<img src='img/basichead.png' />\n";
		}
		xout+="                </div></a>";
		xout+="                <div class='name'><span class='popclick applebtn'  data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' style='display:inline'>"+xdata['user']+"</span><span  class='timeitem' data-t='"+xdata['dateadd']+"'>"+xdata['dateadd']+"</span></div>";
		xout+="                <br clear='both'>";
		xout+="                <label class='sub applebtn'>";
		xout+="                    <i class='fa fa-chevron-down applebtn' aria-hidden='true'></i>";
		xout+="                    <div class='sub-menu'>";
		//xout+="                    	<span class='maintemselect applebtn' data-val='3' data-type='arc' data-id='"+xdata['aid']+"' data-k='w'>刪除</span>\n";
		xout+="                    	<span class='maintemselect applebtn' data-val='3' data-type='arc' data-id='"+xdata['thisid']+"' data-k='w'>刪除</span>\n";//改成自己的ID
		xout+="					    </div>";
		xout+="                </label>";
		xout+="            </div>";
		xout+="            <div class='main'>";
		if(xdata['typeid']=="4"){
			xout+="<div class='word pageclick  applebtn' data-type='artpage' data-val='"+xdata['aid']+"'>\n";
		}else{
			xout+="                <div class='word'>";
		}
		xout+="                    <p>";
		//這邊要分析文章
		var mytemp=unescape(xdata['thiscontent']).split("</div>"); //20190322 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		var mytext="";
		var myimage=[];
		if(xdata['typeid']==4){//攻略--只會有一張圖
			var ttb=mytemp[0].split('<div class="newstextbox">');
			mytext=ttb[1];
			if(xdata['thiscontent'].indexOf("newsfilebox")>0){//有圖
				ttb=mytemp[1].split('src=');
				ttc=ttb[1].split('>');
				myimage[0]=sessionStorage.getItem("imgurl")+ttc[0];
			}
		}else{
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
		}
    xout+=nl2br(mytext);
		xout+="                    </p>";
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
		xout+="            </div>";
		xout+="            <div class='bottom'>";
		xout+="                <span class='tab'>";
		if(xdata['tag']){
			xout+=xdata['tag'];
		}
		xout+="		</span>";
		xout+="            </div>";
		xout+="      </div>";
		return xout;
	}

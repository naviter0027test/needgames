// ############ BANNERS ######################################################
get_insertbanner=function(){
	myid="mwalltop";
	banners=JSON.parse(sessionStorage.getItem("banners"));
	var thisb="";
	var out="";
	if(banners && banners.length>0){
		for(var a=0;a<banners.length;a++){
			if(banners[a]['locationkey']==myid){
				thisb=banners[a];
			}
		}
		if(thisb['banner'] && thisb['banner'].length>0){
			thisb['banner']=set_bannerselect(thisb['banner']);
			t=Math.floor(Math.random()*(thisb['banner'].length-0.001));
			out+="<a href='"+thisb['banner'][t]['url']+"' target=_new>\n";
			out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg' class='wallinsertimg'>\n";
			out+="</a>";
		}
	}
	return out;
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg' id='topadimgimg'>\n";
		out+="</a>";
		out+="<img src='img/close2.png' id='topadimgclick' />";
		$("#topadimg").html(out);
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner//banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'>\n";
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
		out+="<img src='"+sessionStorage.getItem("imgurl")+"img/banner/banner"+thisb['banner'][t]['bannerid']+".jpg'  style='margin-bottom:10px;'>\n";
		out+="</a>";
		$("#banner"+myid).html(out);
	}
}

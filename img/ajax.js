//說明..本頁面為所有ajax 的轉換程式
//因為為外掛程式...資料基本上不吐出訊息回主程式
(function($){ 
	$.getScript('js/store.js', function() {	});		
	getmoreboard=function(x){//中央版控制--x==動態牆上之選項....
		mem=JSON.parse(sessionStorage.getItem("member"));
		if($("#mainitemlast").data("val")){
			mylast=$("#mainitemlast").data("val");
		}else{
			mylast=0;
		}
		if(x){}else{x=0;}
		var mytype=$("#maincontentbox").data("type");
		var myval=$("#maincontentbox").data("val");
		gameselect=JSON.parse(localStorage.getItem("gameselect"));
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
		tempitem=ajaxarr("show_board",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
			if(data[0]=="ERR"){
			}else{
				var out="";
				var lastid="";
				if(mytype=="wall" && myval=="mainlist"){
					for(var a=0;a<data.length;a++){
						lastid=data[a]['main']['thisid'];
						out+=print_wallitem(data[a]);
					}
					
				}else if(mytype=="match" && myval=="mainlist"){
					
					for(a=0;a<data[1].length;a++){
						lastid=data[1][a]['uid'];
						out+=print_frienditem(data[1][a]);
					}
					
				}else if(mytype=="notice" && myval=="mainlist"){
					out+="                        	<div class='mainitem_2'>\n";
					out+="                            	<span>XXX 發佈了一篇攻略「XXXXXXXX」</span>\n";
					out+="                                <span>2015/6/11 13:00</span>\n";
					out+="                            </div>\n";
					out+=out;
					out+=out;		
					out+=out;					
				}else if(mytype=="storelist" && myval=="mainlist"){
					out+="                        	                        <div class='storeitembox'>\n";
					out+="                        	<img src='img/storetemp.jpg' />\n";
					out+="                            <div class='storeitemtitle'>iPhone 6 128GB</div>\n";
					out+="                            <div class='storeitembody'>\n";
					out+="                            	<div class='btn storeitemclick fR'>兌換商品</div>\n";
					out+="                            	<P><span class='bgipdis'></span> 994,300</P>\n";
					out+="                            </div>\n";
					out+="                        </div>\n";
					out+=out;
					out+=out;		
					out+=out;					
				}else if(mytype=="articlelist" && myval=="mainlist"){
					out+="                        <div class='storeitembox'>\n";
					out+="                        	<img src='img/storetemp.jpg' />\n";
					out+="                            <div class='storeitemtitle'>文章名稱</div>\n";
					out+="                            <div class='storeitembody'>\n";
					out+="                            	<div class='btn storeitemclick fR'>看攻略</div>\n";
					out+="                            	<P>贊助(22) 留言(2) </P>\n";
					out+="                            </div>\n";
					out+="                        </div>\n";
					out+=out;
					out+=out;		
					out+=out;					
				}
				if(data.length>0){
					sessionStorage.setItem("getmore","1");
					out+="<div id='mainitemlast' data-val='"+lastid+"'></div>";
					$("#mainitemlast").replaceWith(out);
					run_timeitem();
					set_video();
					setsize();
				}else{
					sessionStorage.setItem("getmore","0");
				}
				

			};
		});
	}
	setprepage=function(){
		//設定如果有 tag的情形就顯示第一個
		if($(".tagtitlewrap")){
			$(".tagtitlewrap .tagselect").eq(0).addClass("on");
			$(".tagcontentwrap .tagcontentbox").hide();
			$(".tagcontentwrap .tagcontentbox").eq(0).show();
		}

	};
	setsize=function(){
		$window = $(window);
		//修改成左右固定
		mx=parseInt($(".centerwrap").css("width"));
		if($window.width()>mx){
			$("#mainright").css("right",($window.width()-mx)/2);
			$("#mainleft").css("left",($window.width()-mx)/2);
			gor=($window.width()-mx)/2;
		}else{
			$("#mainright").css("right",0);
			$("#mainleft").css("left",0);
			gor=$window.width()-mx;
		}
		thisval=$("#mainwrap").offset();
		//$("#mainwrap").css("height",$(window).height()-thisval.top);
		//$("#mainleft").css("height",$(window).height()-thisval.top);
		$("#mainright").css("height",$(window).height()-thisval.top-60);
		$("#mainleft").css("height",$(window).height()-thisval.top-60);
		//$("#mainleft").css("top",thisval.top);
		$("#mainright").css("top",thisval.top);
		$("#mainleft").css("top",thisval.top);
		//#mainmid
		xx=(mx-$("#mainright").width()-$("#mainleft").width()-750)/2;
		if(xx<0){
			xx=0;
		}
		$(".midwrap").css("margin-left",xx);//這個要在$("#mainmid")的上面
		$("#mainmid").css("margin-left",$("#mainleft").width()+xx);
		
		resetchatroom(gor)
		/*
		//設定左方高度
		mea=parseInt($("#mainmid").css("height"));
		meb=parseInt($("#mainleft").css("height"));
		mec=parseInt($("#mainright").css("height"));
		if(meb>mea){
			mea=meb;
		}
		if(mec>mea){
			mea=mec;
		}		
		$("#mainleft").css("min-height",mea);
		$("#mainright").css("min-height",mea);
		w=$window.width();
		if(w>1340 ){
			w=1340;
		}else if(w<1260){
			w=1260;
		}else{
		}
		tt=w-(parseInt($(".leftwrap").css("width"))+parseInt($(".rightwrap").css("width"))+2);
		$(".midwrap").css("width",tt);
		//if(ht>parseInt($("#maincenter").css("min-height"))){
		//	$("#maincenter").css("min-height",parseInt($window.height())-45);
		//}
		*/
		
	}	
	//抓取基礎資料
	get_basic=function(){
		var tempvals=Array('1');
		tempitem=ajaxarr("get_basic",tempvals,"ajax.php");
		tempitem.success(function(data){
			sessionStorage.setItem("tags",JSON.stringify(data[1]));//更新
			sessionStorage.setItem("locations",JSON.stringify(data[2]));//更新
			sessionStorage.setItem("gametimes",JSON.stringify(data[3]));//更新
			sessionStorage.setItem("ranks",JSON.stringify(data[0]));//更新
		});
	}
	resetchatroom=function(minx){
		list=$(".chatroom");
		minx=minx+260;
		for(var a=0;a<list.length;a++){
			ta=a;
			if(ta>2){				ta=2;}
			list.eq(a).css("right",minx+270*ta);
		}
	}
	chk_friends=function(){
		$("#friendlist").html("<div class='tcenter'><img src='img/loaderd.gif' style='padding:20px;'></div>");
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
		tempitem=ajaxarr("get_friends",tempvals,"ajax.php");
		tempitem.success(function(data){
			out="";
			if(data[0]=="ERR"){
			}else{
				if(data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						out+="            	<!--item-->\n";
						out+="            	<div class='frienditem' data-type='friend' data-val='"+data[1][a]['uid']+"'>\n";
						out+="                	<div class='friendimgwrap friendimgwrapon'>\n";
						out+="                    	<div class='friendimgbox'>\n";
						if(data[1][a]['headpic']){
							out+="                        	<img src='uploadfile/"+data[1][a]['headpic']+"' />\n";
						}else{
							out+="                        	<img src='img/basicheads.png' />\n";
						}
						out+="                     	</div>\n";
						out+="                     </div>\n";
						out+="                     <div class='frienditemtext'>"+data[1][a]['name']+"</div>\n";
						out+="                     <div class='clr'></div>\n";
						out+="            	</div>\n";
						out+="                <!--item end -->				\n";
					}
				}
				if(data[2].length>0){
					for(var a=0;a<data[2].length;a++){
						out+="            	<!--item-->\n";
						out+="            	<div class='frienditem' data-type='friend' data-val='"+data[2][a]['uid']+"'>\n";
						out+="                	<div class='friendimgwrap'>\n";
						out+="                    	<div class='friendimgbox'>\n";
						if(data[2][a]['headpic']){
							out+="                        	<img src='uploadfile/"+data[2][a]['headpic']+"' />\n";
						}else{
							out+="                        	<img src='img/basicheads.png' />\n";
						}
						out+="                     	</div>\n";
						out+="                     </div>\n";
						out+="                     <div class='frienditemtext'>"+data[2][a]['name']+"</div>\n";
						out+="                     <div class='clr'></div>\n";
						out+="            	</div>\n";
						out+="                <!--item end -->				\n";
					}
				}
			}
			//alert(out);
			$("#friendlist").html(out);
		});		
	}
	// QA 相關
	set_qaalso=function(z,x){
		var me=z;
		alert(x);
		me.addClass("p");
		me.html("<div class='tcenter'><img src='img/loaderys.gif'></div>");
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);
		tempitem=ajaxarr("set_qaalso",tempvals,"ajax.php");
		tempitem.success(function(data){
			out="";
			me.removeClass("p");
			if(data[0]=="ERR"){
				alert($data[1])
			}else{
				z.html("我也想知道("+data[1]+")");
			}
		});	
	}
	
	
	
	
	
	
	
})(jQuery); 
$(document).ready(function(){
});

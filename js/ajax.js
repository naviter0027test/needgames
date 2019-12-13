//說明..本頁面為所有ajax 的轉換程式
//因為為外掛程式...資料基本上不吐出訊息回主程式
(function($){
	$.getScript('js/store.js', function() {	});
	getmoreboard=function(x){//中央版控制--x==動態牆上之選項....y=人的id
		mem=JSON.parse(sessionStorage.getItem("member"));
		if($("#mainitemlast").data("val")){
			mylast=$("#mainitemlast").data("val");
		}else{
			mylast=0;
		}
		if(x){}else{x=0;}
		var mytype=$("#maincontentbox").data("type");
		var myval=$("#maincontentbox").data("val");
		y="";
		if($("#maincontentbox").data("id")){
			var y=$("#maincontentbox").data("id");
		}
		gameselect=JSON.parse(localStorage.getItem("gameselect"));
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,myval,gameselect,y);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
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

				}else if(mytype=="mywall" && myval=="mainlist"){
					for(a=0;a<data[1].length;a++){
						lastid=data[1][a]['main']['thisid'];
						out+=print_wallitem(data[1][a]);
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
	//抓取notice內容
	get_navpop=function(x,y,t,s){// 類別 /最後id,物件,附加內容
		var me=x;
		var mytemp=t;
		var same=s;
		if(mytemp){
			var ttp=me+"keywordwrap";
			mytemp.html("<img src='img/loaderys.gif' style='padding:10px;'>");
		}else{
			$("#h"+me+"keywordwrap").html("<div class='tcenter' style='margin:20px 0;width:265px;'><img src='img/loaderys.gif'></div>");
			$("#h"+me+"list").show();
		}
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,y);//人 / key / 類別  /最後id
		tempitem=ajaxarr("get_navpop",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試用
			if(data[0]=="ERR"){
			}else{
				var out="";
				var lastid="";
				if(me=="notice"){//開單一動態/攻略/qna
					for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['thisid'];
						if(data[1][a]['typeid']=="4"){
							mytype="artpage";
						}else if(data[1][a]['typeid']=="2"){
							mytype="qnaitem";
						//	mytype="wallitem";
						}else{
							mytype="wallitem";
						}
						if(data[1][a]['viewed']=="1"){
							out+="                              <div class='formdivdiv ppageclick' data-type='"+mytype+"' data-val='"+data[1][a]['thislink']+"'>\n";
						}else{
							out+="                              <div class='formdivdivon formdivdiv ppageclick' data-type='"+mytype+"' data-val='"+data[1][a]['thislink']+"'>\n";
						}
						out+="                                  <P class='title'>"+data[1][a]['thiscontent']+"</P>\n";
						out+="                                  <p class='timeitem' data-t='"+data[1][a]['dateadd']+"'>"+data[1][a]['dateadd']+"</p>\n";
						out+="                              </div>				\n";
					}
					if(data[1].length>=5){
						out+="                                  <div class='morediv' data-type='"+me+"' data-val='"+lastid+"'>\n";
						out+="                                          看更多\n";
						out+="                                  </div>\n";
					}else{
						out+="<div class='clr' style='width:265px;'></div>";
					}
					if(mytemp){
						myoffset=mytemp.position();
						myoffsettop=myoffset.top;
						mytemp.replaceWith(out);
						myoffsettop=2000;
						$("#h"+ttp).css("padding-top","15px");
						$("#h"+ttp).stop().animate({scrollTop :myoffsettop},800);
					}else{
						$("#h"+me+"keywordwrap").html(out);
					}
					run_timeitem();//跑一次
				}else if(me=="addfriend"){//開單伊人的交友
					for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['thisid'];
						out+="                              <div class='formdivdivon formdivdiv ppageclick' data-type='matchitem' data-val='"+data[1][a]['memberid']+"'>\n";
						out+="                                  <P class='title'>"+data[1][a]['user']+"邀請你成為朋友</P>\n";
						out+="                              </div>				\n";
					}
					if(data[1].length>=5){
						out+="                                  <div class='morediv' data-type='"+me+"' data-val='"+lastid+"'>\n";
						out+="                                          看更多\n";
						out+="                                  </div>\n";
					}else{
						out+="<div class='clr' style='width:265px;'></div>";
					}
					if(mytemp){
						myoffset=mytemp.position();
						myoffsettop=myoffset.top;
						mytemp.replaceWith(out);
						myoffsettop=2000;
						$("#h"+ttp).css("padding-top","15px");
						$("#h"+ttp).stop().animate({scrollTop :myoffsettop},800);
					}else{
						$("#h"+me+"keywordwrap").html(out);
					}
				}else if(me=="chat"){//開 chat window
					for(var a=0;a<data[1].length;a++){
						lastid=data[1][a]['thisid'];
						if(data[1][a]['viewed']==1){
							out+="                              <div class='formdivdiv chatpopclick' data-val='"+data[1][a]['roomid']+"''>\n";
						}else{
							out+="                              <div class='formdivdivon formdivdiv chatpopclick' data-val='"+data[1][a]['roomid']+"'>\n";
						}
						out+="                                  <P class='title'>"+data[1][a]['thiscontent']+"</P>\n";
						out+="                              </div>				\n";
					}
					if(data[1].length>=5){
						out+="                                  <div class='morediv' data-type='"+me+"' data-val='"+lastid+"'>\n";
						out+="                                          看更多\n";
						out+="                                  </div>\n";
					}else{
						out+="<div class='clr' style='width:265px;'></div>";
					}
					if(mytemp){
						myoffset=mytemp.position();
						myoffsettop=myoffset.top;
						mytemp.replaceWith(out);
						myoffsettop=2000;
						$("#h"+ttp).css("padding-top","15px");
						$("#h"+ttp).stop().animate({scrollTop :myoffsettop},800);
					}else{
						$("#h"+me+"keywordwrap").html(out);
					}
				}
			}
		});
	}
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

		resetchatroom()
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
			sessionStorage.setItem("banners",JSON.stringify(data[4]));//更新
			sessionStorage.setItem("toprank",JSON.stringify(data[5]));//更新
			sessionStorage.setItem("chatpic",JSON.stringify(data[6]));//更新

		});
	}
	resetchatroom=function(minx){
		mx=parseInt($(".centerwrap").css("width"));
		if($window.width()>mx){
			gor=($window.width()-mx)/2;
		}else{
			gor=$window.width()-mx;
		}
		minx=gor;
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
			$("#friendlist").html(out);
		});
	}
	// QA 相關
	set_qaalso=function(z,x){
		var me=z;
		me.addClass("p");
		me.html("<div class='tcenter'><img src='img/loaderys.gif'></div>");
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);
		tempitem=ajaxarr("set_qaalso",tempvals,"ajax.php");
		tempitem.success(function(data){
			out="";
			me.removeClass("p");
			if(data[0]=="ERR"){
				popnotice($data[1])
			}else{
				z.html("我也想知道("+data[1]+")");
			}
		});
	}
	//抓取是否有更新 notice 回覆數量
	chk_notice=function(){
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){//會員
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
			tempitem=ajaxarr("chk_notice",tempvals,"ajax.php");
			tempitem.success(function(data){
				if(data){
					if(parseInt(data[1])>0){
						$("#hnoticeqty").html("<i class='fa fa-circle  fa-stack-2x noticebg'></i><strong class='fa-stack-1x hstext'>"+data[1]+"</strong>");
					}else{
						$("#hnoticeqty").html("");
					}
					if(parseInt(data[2])>0){
						$("#hchatqty").html("<i class='fa fa-circle  fa-stack-2x noticebg'></i><strong class='fa-stack-1x hstext'>"+data[2]+"</strong>");
					}else{
						$("#hchatqty").html("");
					}
					if(parseInt(data[0])>0){
						$("#haddfriendqty").html("<i class='fa fa-circle  fa-stack-2x noticebg'></i><strong class='fa-stack-1x hstext'>"+data[0]+"</strong>");
					}else{
						$("#haddfriendqty").html("");
					}
				}
			});
		}
	}
	//跳出chat window 的功能
	get_chatroom=function(x){
			thisf=x;
			var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"chkroom",thisf);
			tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
			tempitem.success(function(data){
				if(data[0]=="ERR"){
					popnotice(data[1])
				}else{
					//檢查是否已經開啟
					roomlist=$(".chatroom");
					flag=0;
					for(var a=0;a<roomlist.length;a++){
						if(roomlist.eq(a).data("id")==data[1]){
							flag=1;
						}
					}
					if(flag==0){
						popchatroom(data[1]);
					}
				}
				chk_notice();//更新數字

			});
	}
	//更換顯示設定
	change_myshow=function(x,y,z){
		var me=z;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,y);//更改物件,顯示與否
		tempitem=ajaxarr("change_myshow",tempvals,"ajax.php");
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				popnotice($data[1])
			}else{
				if(me.hasClass("fayellow")){
					me.removeClass("fayellow");
					me.addClass("fagray");
				}else{
					me.removeClass("fagray");
					me.addClass("fayellow");
				}
			}
		});
	}
	//更換個人資料
	update_myshow=function(x,y,z,y2){
		var me=z;
		var myid=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x,y,y2);//更改物件,顯示與否
		tempitem=ajaxarr("update_myshow",tempvals,"ajax.php");
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				popnotice(data[1])
			}else{
				if(myid=="addgame"){
					out="";
					var tags=JSON.parse(sessionStorage.getItem("tags"));
					for(w=0;w<3;w++){
						dd="";
						if(data[1][w]){
							for(var a=0;a<tags.length;a++){
								if(tags[a]['gameid']==data[1][w]['gameid']){
									dd=tags[a]['gamename'];
								}
							}
							nn="";
							if(data[1][w]['gamenote']){
								nn=data[1][w]['gamenote'];
							}
							out+="                            	<div class='subformitem subformitem_2'>\n";
							out+="                                	<span>"+dd+"</span>\n";
							out+="                                  <span>備註："+nn+"</span>\n";
							out+="                                  <span> <i class='fa fa-times fayellow maright5 fa-vc  btn aboutclick' data-name='gamedel' data-id='game"+(w+1)+"'></i>\n";
							out+="                                	<i class='fa fa-eye "+(data[1][w]['game_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='game"+(w+1)+"'></i></span>\n";
							out+="                                  <div class='clr'></div>\n";
							out+="                              </div>\n";
						}
					}
					$("#mytagwrap").html(out);
					me.parents(".hidediv").hide();
				}else if(myid=="gamedel"){
					out="";
					var tags=JSON.parse(sessionStorage.getItem("tags"));
					for(w=0;w<3;w++){
						dd="";
						if(data[1][w]){
							for(var a=0;a<tags.length;a++){
								if(tags[a]['gameid']==data[1][w]['gameid']){
									dd=tags[a]['gamename'];
								}
							}
							nn="";
							if(data[1][w]['gamenote']){
								nn=data[1][w]['gamenote'];
							}
							out+="                            	<div class='subformitem subformitem_2'>\n";
							out+="                                	<span>"+dd+"</span>\n";
							out+="                                  <span>備註："+nn+"</span>\n";
							out+="                                  <span> <i class='fa fa-times fayellow maright5 fa-vc  btn aboutclick' data-name='gamedel' data-id='game"+(w+1)+"'></i>\n";
							out+="                                	<i class='fa fa-eye "+(data[1][w]['game_v']=="1"?"fayellow":"fagray")+"  showprofileclick maright5 btn' data-name='game"+(w+1)+"'></i></span>\n";
							out+="                                  <div class='clr'></div>\n";
							out+="                              </div>\n";
						}
					}
					$("#mytagwrap").html(out);
				}else{
					$("#"+myid+"value").html(data[1]);
					me.parents(".hidediv").hide();
				}
			}
		});
	}
	// ###### chat 相關
	get_chat_content=function(x){
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"getroominfo",x);
		tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
		tempitem.success(function(data){
			if(data[0]=="ERR"){
			}else{
				namelist=data[1];
				conlist=data[2];
				out1="";
				for(var a=0;a<namelist.length;a++){
					if(namelist[a]['memberid']==sessionStorage.getItem("userid")){
					}else{
						if(out1){
							out1+=","+namelist[a]['name'];
						}else{
							out1=namelist[a]['name'];
						}
					}
				}
				$("#chat"+me+" .titlename").html(out1);
				chat_content(me,data[2]);
			}
		});
	}
	readnewchat=function(x){
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"readnewchat",x);
		tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				alert(data[1]);
			}else{
				chat_content(me,data[1]);
				$("#chat"+me).children(".chattitle").children(".titlename").html(data[2]);
			}
		});
	}
	chat_input=function(x,y){//id,內容
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"savechat",x,y);
		tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				alert(data[1]);
			}else{
				/*
				namelist=data[1];
				conlist=data[2];
				out1="";
				for(var a=0;a<namelist.length;a++){
					if(namelist[a]['memberid']==sessionStorage.getItem("userid")){
					}else{
						out1+=namelist[a]['name']+" ";
					}
				}
				$("#chat"+me+" .titlename").html(out1);
				*/
				chat_content(me,data[1]);
			}
		});
	}
	clean_chatnote=function(x){
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"cleanchatnote",x);
		tempitem=ajaxarr("chat_main",tempvals,"ajax.php");
		tempitem.success(function(data){
		});
	};



})(jQuery);
$(document).ready(function(){
});

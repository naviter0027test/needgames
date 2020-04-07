//排行榜頁中央
show_centerranklist=function(x){
	var out="";
	out+="    <div class='rank' id='rankoverwrap'>";
	out+="			<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="    </div>";
	$("#mainwrap").html(out);
	show_centerranklistin(x,'','');//中間資料
	/*
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

	$("#mainmidwrapin").html(out);
	show_centerranklistin(x,'','');//中間資料
	//get_centertoprank();//修改成廣告
	get_centerrightbanner();//抓取廣告
	*/
}
//排行榜頁中央內容
show_centerranklistin=function(x,y,z){
	var ranktype=x;
	var xdate=new Date();
	if(y){
		var xmonth=y;
	}else{
		xmonth=xdate.getFullYear()+"-"+(xdate.getMonth()+1);
	}
	var xtype=z;
	var tempvals=Array(1,xmonth,xtype);//人 / key / id
	tempitem=ajaxarr("get_topranklist",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
            console.log(data);
		if(data[0]=="ERR"){
		}else{
			var tags=JSON.parse(sessionStorage.getItem("tags"));
			var out="";
			mytype="";
			if(data[4]){
				mytype=data[4];
			}
			out+="        <div class='title'>";
			for(a=0;a<data[3].length;a++){
				if((data[3][a]['ymonth']==xmonth || ((a+1)==data[3].length && xmonth==(xdate.getFullYear()+"-"+(xdate.getMonth()+1)))) && ((a-1)>=0)){
					out+="            <i class='fa fa-chevron-circle-left gamemonthselect monthselectb applebtn' aria-hidden='true' data-m='"+data[3][(a-1)]['ymonth']+"'></i>";
				}
			}
			out+="            "+xmonth+"月熱門遊戲 TOP 20";//20190312 Pman 客戶要求改成20
			for(a=0;a<data[3].length;a++){
				if(data[3][a]['ymonth']==xmonth && ((a+1)<data[3].length) ){
					out+="            <i class='fa fa-chevron-circle-right gamemonthselect monthselectb applebtn' aria-hidden='true' data-m='"+data[3][(a+1)]['ymonth']+"'></i>";
				}
			}
			out+="            <br clear='both'>";
			out+="        </div>";
			out+="        <table cellspacing='0'>";
			out+="            <tr>";
			out+="                <th>名次</th>";
			out+="                <th>遊戲名稱</th>";
			out+="                <th>人數</th>";
			out+="            </tr>";
			iMax=20; //20190312 Pman 最多TOP幾
			for(a=0;a<data[1].length;a++){
				if(a==iMax){break;}//20190312 Pman 輸出到最大值後離開
				out+="            <tr>";
				out+="                <td><i>"+(a+1)+"</i></td>";
				out+="                <td>";
				for(var c=0;c<tags.length;c++){
					if(tags[c]['gameid']==data[1][a]['gameid']){
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
						break;
					}
				}
				out+="			</td>";
				out+="                <td>"+data[1][a]['qty']+"</td>";
				out+="            </tr>";
			}
			out+="		  </table>";
		/*
			//titlearr=["","熱門遊戲排行榜 TOP10","本月各類遊戲玩家人數","本月會員排行Top30","新進遊戲熱門排行","","","","","類排行榜"];
			//out="";

			//	out+="                	<!-- game list-->\n";
		//	out+="					<div id='gamelistwrap'  class='midwrapinleft' data-ranktype='"+ranktype+"' data-type='"+xtype+"'>\n";
		//	out+="                    	<div id='gamelisttitle'>"+mytype+titlearr[ranktype]+"</div>\n";

			//前後月選單
			//out+="                      <div id='gamelistdateselect'>\n";


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
				out+="                                <span>點數</span>\n";
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
					*/
		}
		$("#rankoverwrap").html(out);

	}).error(function(err) {
            console.log(err);
        });

}


// #########  抓取 中央的 toprank 回傳給主控--首頁
get_centertoprank=function(){
	tags=JSON.parse(sessionStorage.getItem("tags"));
	toprank=JSON.parse(sessionStorage.getItem("toprank"));
	$("#centerrankwrap").html("<div class='loaderbox'><img src='assets/img/loader.gif'></div>");
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

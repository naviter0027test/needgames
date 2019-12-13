//############# 活動專區 ############################
show_centeract=function(x){
	var out="";
	$("#mainwrap").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>"); //20190320 Pman 修改「活動專區」要輸出的DIV名稱
	var tempvals=Array('1');//
	tempitem=ajaxarr("getcatpage",tempvals,ajaxurl);
	tempitem.success(function(data){//
		if(data[0]=="ERR"){
			$("#mainwrap").html('');//20190320 Pman 修改「活動專區」要輸出的DIV名稱
		}else{
			//out+="<h1>"+data[1]['newstitle']+"</h1>";
			//out+="<p class='newsdate'>"+data[1]['newsdate']+"</p>";
			out+="<div class='newswrap'>\n";//20190320 Pman 修改「活動專區」要輸出的DIV名稱
			out+=data[1]['newscontent'];
			out+="</div>";
			$("#mainwrap").html(out);//20190320 Pman 修改「活動專區」要輸出的DIV名稱
		}
	});
}
//########## 選擇遊戲的框 ########### 共用架構 ############
show_centertaglist=function(x){
	var out="";
	out+="    <header>";
	out+="        <div class='link back popfullclosechatu2 applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="        <div class='link word'></div>";
	out+="        <br clear='both'>";
	out+="    </header>";
	out+="    <div class='wall qa'>";
	out+="        <div class='post page'>";
	out+="            <input type='text' placeholder='輸入遊戲名稱可快速篩選' class='game-input'>";
	out+="            <br clear='both'>";
	out+="            <ul class='game-list' data-id='"+x+"'>";
	tags=JSON.parse(sessionStorage.getItem("tags"));
	for(var a=0;a<50;a++){ //20190611 Pman 第一次輸出遊戲標籤時，改成先輸出前50個
		out+="<li class='active-result tagselectclick applebtn' data-id="+tags[a]['gameid']+" data-name='"+tags[a]['gamename']+"'>"+tags[a]['gamename']+"</li>";
	}
	out+="            </ul>";
	out+="        </div>";
	out+="    </div>";
	popchatfullu2(out);
	//20190612 Pman 當滾動的時候，逐步讀取內容
	j=50;
	
	$(".game-list").scroll(function(){
		//j=j+1;
		intLast=$(".game-list")[0].scrollHeight-$(window).height();
		//console.log("last:"+intLast);
		txtSearch=$(".game-input").val();
		if($(".game-list").scrollTop()>=intLast && j<=tags.length+1 && txtSearch == ""){
			out="";
			//console.log("VCVC:"+tags.length);
			jmax=j+50;
			for(j;j<tags.length;j++){ //20190611 Pman 第一次輸出遊戲標籤時，改成先輸出前50個
				if(j===jmax){break;}
				out+="<li class='active-result tagselectclick applebtn' data-id="+tags[j]['gameid']+" data-name='"+tags[j]['gamename']+"'>"+tags[j]['gamename']+"</li>";
				
			}
			//console.log(j);
			if(j<=tags.length+1){
				
				$(".game-list").append(out);
			}
		}
		
	});
	//20190612 Pman 當滾動的時候，逐步讀取內容
}
// ################## POP 共用 ##################
	popreport=function(x,y){//檢舉
		var out="";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3 tleft'>輸入檢舉原因:</div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='text' id='reporttext' name='name' placeholder='請輸入檢舉原因'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3'></div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='submit'  name='submit' value='送出' class='submitclickr maintemselect border5  popbtn applebtn' data-type='"+x+"' data-val='99' data-id='"+y+"'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		popbase("檢舉",out,'');
	}
   //跳出圖片
 	popimgsimple = function(x) { //title/內容/是否可以關閉
		out="";
		/*
		if($("#pop").length){
			$("#pop .popimgclick").remove();
		}else{
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg  applebtn' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="		<a href=''  class='popclose popclosebtn  applebtn' style='' ><i class='fa fa-times'></i></a>";
				out+="		<img src='"+x+"' id='popimg'>\n";

		}
		if($("#pop").length){
		}else{
			out+="</div>";
		}
		*/
		if($("#pop").length){
			$("#pop .popimgclick").remove();
		}else{
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg  applebtn' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="		<a href=''  class='popclose popclosebtn  applebtn' style='' ><i class='fa fa-times'></i></a>";
				out+="		<img src='"+x+"' id='popimg'>\n";
				out+="	</div>";
				out+="</div>";
		}
		if($("#pop").length){
			$("#popimg").animate({"opacity":0},500,function(){
				var tepimg = new Image();
				tepimg.onload = function(){
					$("#popimg").attr("src",x);
					$("#popimg").animate({"opacity":1},500);
					//$("#popin").prepend(out);
				}
				tepimg.src = x;
			});
		}else{
			$("body").prepend(out);
			$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
			$("#pop").stop().fadeIn(400);
		}
		c=$("#popimg").height();
		d=$("#popin").height();
		if(c>d){
			$("#popimg").css("height",d);
		}
   };
   //跳出個人圖片
  	popimg = function(x,y,z,tmp) { //title/內容/是否可以關閉
		out="";
		if($("#pop").length){
			$("#pop i.popimgclick").remove();
		}else{
			if(tmp=="video"){
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg  applebtn' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="	<a href=''  class='popclose popclosebtn  applebtn' style='' ><i class='fa fa-times'></i></a>";
				out+="	<video controls autoplay><source src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+x+"' type='video/mp4' ></video>\n";
				out+="  </div>";
			}else{
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg  applebtn' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="	<a href=''  class='popclose popclosebtn  applebtn' style='' ><i class='fa fa-times'></i></a>";
				if(z){
					out+="		<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+x+"' id='popimg' class='popimgclick' data-val='"+z+"'>\n";
				}else{
					out+="		<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+x+"' id='popimg'>\n";
				}
				out+="  </div>";
			}
		}
		if(y){
			out+="<i class='picgoprev fa fa-chevron-left popimgclick applebtn' data-val='"+y+"'></i>";
		}
		if(z){
			out+="<i class='picgonext fa fa-chevron-right popimgclick applebtn' data-val='"+z+"'></i>";
		}
		if($("#pop").length){
		}else{
			out+="</div>";
		}
		if($("#pop").length){
			$("#popimg").animate({"opacity":0},500,function(){
				var tepimg = new Image();
				tepimg.onload = function(){
					$("#popimg").attr("src",sessionStorage.getItem("imgurl")+"uploadfile/"+x);
					$("#popimg").data("val",z);
					$("#popimg").animate({"opacity":1},500);
					//$("#popin").prepend(out);
				}
				tepimg.src = sessionStorage.getItem("imgurl")+"uploadfile/"+x;
			});
		}else{
			$("body").prepend(out);
			$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
			$("#pop").stop().fadeIn(400);
		}
		c=$("#popimg").height();
		d=$("#popin").height();
		if(c>d){
			$("#popimg").css("height",d);
		}
   };
  // #################貢獻值頁
  print_energy=function(){
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"));
	tempitem=ajaxarr("mem_getpoint",tempvals,ajaxurl);
	tempitem.success(function(data){
		if(data[0]=="ERR"){
		}else{
			var out="";
			out+="<div class='yellowbg'>";
			out+="    <header>";
			out+="        <div class='link back popfullcloseu2 applebtn'>";
			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
			out+="            <span>返回</span>";
			out+="        </div>";
			out+="		  <div class='link word'>";
			out+="            <span>我的貢獻值</span>";
			out+="        </div>";
			out+="        <br clear='both'>";
			out+="    </header>";
			out+="    <div class='energy'>";
			out+="    	<div class='title'>累積貢獻值 <span>"+data[1]['score']+"</span></div>";
			out+="    	<div class='title'>剩餘貢獻值 <span>"+data[1]['points']+"</span><br>";
			out+="      <img src='../img/pointL.png' style='max-width:100%;'></div>\n"; //20190329 Pman 新增一張說明圖
			out+="    	<div class='all'>近30日貢獻值紀錄</div>";
			out+="    	<table cellspacing='0'>";
			out+="      	<tbody>";
			out+="			<tr>";
			out+="          <th width='33%'>時間</th>";//20190402 Pman 調整欄寬分布
			out+="          <th>貢獻值增減</th>";//20190402 Pman 調整欄寬分布
			out+="          <th width='33%'>事由</th>";//20190402 Pman 調整欄寬分布
			out+="          </tr>";
			for(var a=0;a<data[2].length;a++){
				if(data[2][a]['points']!=0){
					out+="           <tr>";
					out+="            <td>"+data[2][a]['dateadd']+"</td>";
					out+="             <td>"+data[2][a]['points']+"</td>";
					out+="             <td>"+data[2][a]['pointname']+"</td>";
					out+="           </tr>";
				}
			}
			out+="          </tbody></table>";
			out+="    </div>";
			out+="</div>";
			popbasefullu2(out);
		}
	});
  }

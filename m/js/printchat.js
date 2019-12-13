//跳出chat window 的功能
get_chatroom=function(x){
  var thisf=x;

  setTimeout(function(){
    var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"chkroom",thisf);
  	tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
  	tempitem.success(function(data){
  		if(data[0]=="ERR"){
  			swal(data[1])
  		}else{

  			x=data[1];
  		   var out="";
  		   chatpic=JSON.parse(sessionStorage.getItem("chatpic"));
  			out+="<div class='chatroom' data-id='"+x+"' id='chat"+x+"'>\n";
  			out+="    <header>";
  			out+="        <div class='link back popfullclosechat applebtn'>";
  			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
  			out+="            <span>返回</span>";
  			out+="        </div>";
  			out+="        <div class='titlename member'>";
  			out+="            <span class='name titlename applebtn' id='chattitlebox'></span>";
  			out+="       </div>";
  			//out+="        <div class='link closechat'   data-val='"+x+"'>";
  			//out+="            <i class='fa fa-times ' aria-hidden='true'></i>";
  			//out+="        </div>";
			//20181101 Pman 客戶端要求先隱藏多人聊天功能(一共兩個地方)
  			//out+="        <div class='link chatfriendclick applebtn'   data-val='"+x+"'>";
  			//out+="            <i class='fa fa-user-plus' aria-hidden='true'></i>";
  			//out+="        </div>";
  			out+="        <br clear='both'>";
  			out+="    </header>";
  			out+="    <div id='dialog-windows' class='chatbox'>";
  			out+="    </div>";
  			out+="    <div class='qa-post-m'>";
        out+="      <form  method=post>";
  			out+="        <input type='text' name='chatinput' class='chatinput' placeholder='輸入對話...' data-val='"+x+"'>";
        out+="      </form>";
  			out+="		  <div class='chatinputwrap'>";
  			out+="        	<i class='fa fa-camera' aria-hidden='true'></i>";
  			out+="        	<form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='chatpicform'><input name='file' type='file' accept='image/*' class='fileupload instantupload' data-val='"+x+"' data-job='uploadchatroom' /></form>\n";//Pman
  			out+="		  </div>";
  			//out+="       <input type='file' class='file'>";
  			out+="        <br clear='both'>	";
  			out+="        <div class='chart' id='tabs'>";
  			out+=set_chaticon();
  			out+="        </div>";
  			out+="    </div>";
  			out+="</div>";
  			popchatfull(out);
  			/* 貼圖tabs */
			console.log("G1");
  			get_chat_content(x);
  			$("#tabs").tabs();
  			//$('.dialog .photo').lightGallery({thumbnail: false, animateThumb: false,showThumbByDefault: false,download: false,zoom: true,}); //20180918 Pman 不知有何用，console會一直報錯，先mark掉 lightGallery
  		}
  	});
  },500);
}

  entermychatroom=function(x){
     var thisf=x;
  	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"chkroomext",thisf);
  	tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
  	tempitem.success(function(data){
  		if(data[0]=="ERR"){
  			swal(data[1])
  		}else{
  			//x=data[1];
  		   var out="";
  		  chatpic=JSON.parse(sessionStorage.getItem("chatpic"));
  			out+="<div class='chatroom' data-id='"+thisf+"' id='chat"+thisf+"'>\n";
  			out+="    <header>";
  			out+="        <div class='link back popfullclosechat applebtn'>";
  			out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
  			out+="            <span>返回</span>";
  			out+="        </div>";
  			out+="        <div class='titlename member'>";
  			out+="            <span class='name titlename applebtn' id='chattitlebox'></span>";
  			out+="       </div>";
  			//out+="        <div class='link closechat'   data-val='"+x+"'>";
  			//out+="            <i class='fa fa-times ' aria-hidden='true'></i>";
  			//out+="        </div>";
			//20181101 Pman 客戶端要求先隱藏多人聊天功能(一共兩個地方)
  			//out+="        <div class='link chatfriendclick applebtn'   data-val='"+thisf+"'>";
  			//out+="            <i class='fa fa-user-plus' aria-hidden='true'></i>";
  			//out+="        </div>";
  			out+="        <br clear='both'>";
  			out+="    </header>";
  			out+="    <div id='dialog-windows' class='chatbox'>";
  			out+="    </div>";
  			out+="    <div class='qa-post-m'>";
  			out+="        <input type='text' name='chatinput' class='chatinput' placeholder='輸入對話...' data-val='"+x+"'>";
  			out+="		  <div class='chatinputwrap'>";
  			out+="        	<i class='fa fa-camera' aria-hidden='true'></i>";
  			out+="        	<form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='chatpicform'><input name='file' type='file' accept='image/jpeg, image/png, image/jpg' class='fileupload instantupload' data-val='"+x+"' data-job='uploadchatroom' /></form>\n";//20180918 Pman 移除gif的上傳
  			out+="		  </div>";
  			//out+="       <input type='file' class='file'>";
  			out+="        <br clear='both'>	";
  			out+="        <div class='chart' id='tabs'>";
  			out+=set_chaticon();
  			out+="        </div>";
  			out+="    </div>";
  			out+="</div>";
  			popchatfull(out);
  			/* 貼圖tabs */
			console.log("G2");
  			get_chat_content(thisf);
			chatroomreflash();  //20180918 Pman註解說明：手機版用來控制聊天室刷新的程式
  			$("#tabs").tabs();
  			//$('.dialog .photo').lightGallery({thumbnail: false, animateThumb: false,showThumbByDefault: false,download: false,zoom: true,}); //20180918 Pman 不知有何用，console會一直報錯，先mark掉 lightGallery

  		}
  	});
}

print_addchatuser=function(room,id){
		popfullclosechatu();
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),room,id);
		tempitem=ajaxarr("chat_room_adduser",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				swal(data[1]);
			}else{
			}
		});
	}
	show_selectlist=function(x){//x chatroom number
		var out="";
		out+="    <header>";
		out+="        <div class='link back popfullclosechatu applebtn'>";
		out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
		out+="            <span>返回</span>";
		out+="        </div>";
		out+="        <div class='link word' id='chatcnt' >";
		out+="        </div>";
		out+="        <br clear='both'>";
		out+="    </header>";
		out+="    <div class='chatfriendwrap friend'>";
		out+="    	<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
		out+="    </div>";
		popchatfullu(out);
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);
		tempitem=ajaxarr("chat_room_adduserlist",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				$(".chatfriendwrap").html("系統忙碌中,請稍後再試");
			}else{
				var out="";
				if(data[1].length>0){
					for(var a=0;a<data[1].length;a++){
						//alert(data[1][a]['uid']);
						out+=print_frienditem(data[1][a],13);
					}
				}
				$(".chatfriendwrap").html(out);
			}

		});
	}
	//pop聊天室成員列表
	show_memberlist=function(x){
		var chatid=x;
		var out="";
		var ranks=JSON.parse(sessionStorage.getItem("ranks"));
		var mylevel="";
		var myrank="";
		out+="    <header>";
		out+="        <div class='link back popfullclosechatu applebtn'>";
		out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
		out+="            <span>返回</span>";
		out+="        </div>";
		out+="        <div class='link word' id='chatcnt' >";
		out+="        </div>";
		out+="        <br clear='both'>";
		out+="    </header>";
		out+="    <div class='chatfriendwrap friend'>";
		out+="    	<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
		out+="    </div>";
		popchatfullu(out);
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),chatid);
		tempitem=ajaxarr("chat_room_userinfo",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
			}else{
				var out="";
				$("#chatcnt").html("聊天室成員("+data[1].length+")");
				for(var a=0;a<data[1].length;a++){
					for(var b=0;b<ranks.length;b++){
						  if(parseInt(data[1][a]['score'])>=parseInt(ranks[b]['score'])){
							 if(data[1][a]['rank_v']=="1"){
								 myrank=ranks[b]['rankname'];
							 }
							 if(data[1][a]['level_v']=="1"){
								 mylevel=ranks[b]['rankid'];
							 }
						  }
					}
					out+="        <div class='list'>";
					if(data[1][a]["headpic"]){
						out+="            <img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+smallpics(data[1][a]['headpic'])+"'  class='img' />";
					}else{
						out+="            <img src='img/basichead.png'  class='img' />";
					}
					out+="            <div class='right'>";
					if(mylevel){
						out+="                <div class='name'>"+data[1][a]['name']+"<span>LV."+mylevel+" "+myrank+"</span></div>";
					}else{
						out+="                <div class='name'>"+data[1][a]['name']+"</div>";
					}
					if(data[1][a]["isfriend"]=="1"){
						out+="                <button class='btn yellow frienditem applebtn' data-type='friend' data-val='"+data[1][a]['id']+"'  data-close='all'>聊天</button>";
					}else if(data[1][a]["isfriend"]=="2"){
						out+="                <button class='btn addfriend applebtn' data-type='add' data-val='"+data[1][a]['id']+"'  data-close='all'>加朋友</button>";
					}
					out+="                <button class='btn nobg popclick applebtn' data-type='mypage' data-val='1' data-id='"+data[1][a]['id']+"' data-close='all'>查看資訊</button>";
					out+="            </div>";
					out+="        </div>";
				}
				$(".chatfriendwrap").html(out);
			}
		});
	}
	//第一次抓取chatroom 取得資料..並給予title
	get_chat_content=function(x){
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"getroominfo",x);
		tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
			}else{
				namelist=data[1];
				conlist=data[2];
        if(ismobile==2){//測試更新數量
          var incnt=data[3];
          pushx.setApplicationIconBadgeNumber(function() {
          }, function() {
          }, parseInt(incnt));
        }
				out1="";
				if(namelist.length>3){
					out1="<span class='name'>"+namelist[0]['name']+"</span><span class='name'>...等"+namelist.length+"人</span>";
				}else{
					for(var a=0;a<namelist.length;a++){
						if(namelist[a]['memberid']==sessionStorage.getItem("userid")){
						}else{
							if(out1){
								out1+=","+"<span class='name'>"+namelist[a]['name']+"</span>";
							}else{
								out1="<span class='name'>"+namelist[a]['name']+"</span>";
							}
						}
					}
				}
				$("#chattitlebox").html(out1);
				console.log("C1");
				chat_content(me,data[2],'n');
			}
		});
	}
// chatroom content
chat_content=function(id,x,tp){
	   var out="";
	   var dlist=$("#dialog-windows").find(".dialog-date");
	   var odate="";
	   if(dlist.length>0){
       //odate=new Date(dlist.eq(dlist.length-1).data("d").replace(/-/g, "/"));
		   odate=new Date(dlist.eq(dlist.length-1).data("d"));
	   }
	   var mdate="";
	   var week=["日","一","二","三","四","五","六"];
     var texist=$("#dialog-windows").html();
	   //out+="<div class='dialog'>";
	   //console.log("1");
	   //console.log($("#dialog-windows").find(".dialog").length);
	   if($("#dialog-windows").find(".dialog").length==0){ //20190115 Pman 當.dialog沒有的時後，才加入（通常是一進聊天室的時候）的時候）
		   out+="<div class='dialog'>";
	   }
  if(x){
    for(var a=0;a<x.length;a++){
      //檢查是否是新人
      if(texist.length>10 && x[a]['content'].indexOf("已邀請")==0){
        var pa=x[a]['content'].split("已邀請")[1];
        var pb=pa.split("進入聊天室")[0];
        var chatcc=$("#chattitlebox").find(".name");

        if(chatcc.eq(chatcc.length-1).text().indexOf("...等")==0){
          var temp=chatcc.eq(chatcc.length-1).text().split("...等")[1];
          var tempb=parseInt(temp.split("人")[0])+1;
          chatcc.eq(chatcc.length-1).text("...等"+tempb+"人");
        }else{
          $("#chattitlebox").append(",<span class='name'>"+pb+"</span>");
        }
      }
      var tt=parseInt(x[a]['timekey']+"000");
      mdate=new Date(tt);
	  //alert(odate);
      if(odate=="" || (odate.getFullYear()+odate.getMonth()+odate.getDate())!=(mdate.getFullYear()+mdate.getMonth()+mdate.getDate())){
        odate=mdate;
        out+="<div class='dialog-date' data-d='"+odate.getFullYear()+"/"+(odate.getMonth()+1)+"/"+odate.getDate()+"'><center>"+(odate.getMonth()+1)+"/"+odate.getDate()+"（"+week[odate.getDay()]+"）</center></div>";//20190115 Pman 因為ios系上的瀏覽器，不接受YYYY-MM-DD的格式，所以改成YYYY/MM/DD
      }
      if(x[a]['fromid']==sessionStorage.getItem("userid")){
        out+="    	<div class='my'>\n";
        out+=insert_changerchat(x[a]);
		console.log(insert_changerchat(x[a]));
        out+="<br clear='both'>";
        out+="<i class='fa fa-caret-left' aria-hidden='true'></i>";
        out+="       </div>";
      }else if(x[a]['fromid']!='0'){
        out+="    	<div>\n";
         if(x[a]['name']){
              out+="        	<img src='"+sessionStorage.getItem("imgurl")+"uploadfile/"+x[a]['name']+"' class='img' />\n";
         }else{
              out+="        	<img src='img/basichead.png' class='img' />\n";
         }
        out+=insert_changerchat(x[a]);
        out+="<br clear='both'>";
        out+="<i class='fa fa-caret-left' aria-hidden='true'></i>";
        out+="       </div>";
      }else{
         out+="<div class='dialog-date' data-d='"+odate.getFullYear()+"/"+(odate.getMonth()+1)+"/"+odate.getDate()+"'><center>"+x[a]['content']+"</center></div>";
      }
    }
  }
	   if($("#dialog-windows").find(".dialog").length==0){
			out+="</div>";
			$("#dialog-windows").append(out);//20190115 Pman 當.dialog沒有的時後，在#dialog-windows裡面加入內容
	   }else{		   
		   $(".dialog").append(out);//20190115 Pman 當有.dialog的時後，在.dialog裡面加入內容
	   }
	   
	   //console.log("Pp1")
	   
	   //$("#popchatfull").stop().animate({scrollTop :100000},2000);
	   document.documentElement.scrollTop=50000000; //20190417 Pman 原本的寫法不work，改這寫法
	   $('html,body').animate({ scrollTop: 50000000 },300) //20190419 Pman 幹！iphone用上面的方法不行

}
	readnewchat=function(x){
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"readnewchat",x);
		tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				popnotice(data[1]);
			}else{
				if(data[1]){
					if(parseInt($("#chat"+me).css("bottom"))==0){
					}else{
						if($("#chat"+me).children(".chattitle").hasClass("on")){
						}else{
							$("#chat"+me).children(".chattitle").addClass("on");
						}
					}
					console.log("C2");
					chat_content(me,data[1],'e');//
					$("#chat"+me).children(".chattitle").children(".titlename").html(data[2]);
				}
			}
		});
	}
	chat_input=function(x,y){//id,內容
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"savechat",x,y);
		tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
		tempitem.success(function(data){
			if(data[0]=="ERR"){
				swal(data[1]);
			}else{
				console.log("C3");
				chat_content(me,data[1],'e');
			}
		});
	}
	clean_chatnote=function(x){
		var me=x;
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),"cleanchatnote",x);
		tempitem=ajaxarr("chat_main",tempvals,ajaxurl);
		tempitem.success(function(data){
		});
	};
	//設定chat icon
 	set_chaticon=function(){
		var chatpic=JSON.parse(sessionStorage.getItem("chatpic"));
		out="";
		outa="";
		outb="";
		for(var a=0;a<chatpic.length;a++){
			outb+="<ul id='tabs-"+a+"' class='icongroup'>\n";
			for(var b=0;b<chatpic[a]['pic'].length;b++){
				outb+="<li><img src='"+sessionStorage.getItem("imgurl")+"img/chat/"+chatpic[a]['pic'][b]['thisid']+".png' data-val='"+chatpic[a]['pic'][b]['thisid']+"'  title='"+chatpic[a]['pic'][b]['thisname']+"'></li>";
			}
			outb+="</ul>\n";
		}
        out+="    <i class='fa fa-smile-o on btn' aria-hidden='true'></i>";
        out+="     <div class='top'>";
        out+="	     <ul>";
        var xout="";
    		for(var a=0;a<chatpic.length;a++){
            	//xout+="         <a href='#tabs-"+a+"'><li>";
            //  xout+="          <img src='"+sessionStorage.getItem("imgurl")+"img/chat/type"+chatpic[a]['thisid']+".png' class='icongroupclick' data-val='"+a+"' title='"+chatpic[a]['thisname']+"' />";
            xout+="         <li>";
            xout+="          <a href='#tabs-"+a+"'><img src='"+sessionStorage.getItem("imgurl")+"img/chat/type"+chatpic[a]['thisid']+".png' class='icongroupclick' data-val='"+a+"' title='"+chatpic[a]['thisname']+"' /></a>";
            xout+="         </li>";
            	//xout+="         </li></a>";
    		}
        out+= xout;
        out+="          <br clear='both'>";
        out+="       </ul>";
        out+="     </div>";
        out+="     <div class='main'>";
		    out+=outb;
        out+="     </div>";
		return out;
	}

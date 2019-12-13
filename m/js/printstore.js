//################# 商店 ###############################
show_centershoplist=function(x,y){
	var out="";
	var x1=x;
	var y1=y;
	out+="<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	$("#mainwrap").html(out);
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / id
	tempitem=ajaxarr("getcats",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
		if(data[0]=="ERR"){
			swal(data[1]);
			var out="";
		}else{
			var out="";
			out+="    <div class='friend'>";
			out+="        <div class='change half'>";
			out+="            <select  id='shopcatselect' class='maincontentselect' data-val='storecat'>";
			out+="                <option value='0'>全部</option>";
			for(var a=0;a<data[1].length;a++){
				out+="                <option value='"+data[1][a]['catid']+"'>"+data[1][a]['catname']+"</option>";
			}
			out+="            </select>";
			out+="       </div>";
			out+="        <div class='change half'>";
			out+="            <select id='shopsortselect' class='maincontentselect' data-val='storesort'>";
			out+="                <option value='dateadd '>--</option>";//20180906 Pman 因為下面的選項改降冪排序，所以新增一個項目
			out+="                <option value='dateadd DESC'>上架時間新到舊</option>";//20180906 Pman 降冪排序，新的在最前面
			out+="                <option value='dispoints DESC'>貢獻值高到低</option>";
			out+="                <option value='dispoints'>貢獻值低到高</option>";
			out+="                <option value='allowex'>僅顯示可兌換(按貢獻值低到高)</option>";
			out+="            </select>";
			out+="        </div>";
			out+="        <br clear='both'>";
			out+="    </div>";
			out+="    <div class='album' id='maincontentbox'  data-type='shop' data-val='mainlist'>";
			out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
			out+="    </div>";
		}
		$("#mainwrap").html(out);
		get_centershoplist(0,0);

	});
}
get_centershoplist=function(x,y){//x==分類  y==順位
	sessionStorage.setItem("getmore","1");
	if(x){
	}else{
		x=0;
	}
	mytype="shop";
	mylast=0;
	var x1=x;
	var y1=y;
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),mylast,x,mytype,y);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  / 順位
	tempitem=ajaxarr("show_board",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
			if(data[0]=="ERR"){
				swal(data[1]);
				$("#maincontentbox").html('');
			}else{
				var out="";
				var lastid="";
				for(var a=0;a<data[1].length;a++){
					out+=print_shopitem(data[1][a]);
					lastid=data[1][a]['productid'];
				}
				lastid=data[1].length;
				out+="<div id='mainitemlast' data-val='"+lastid+"' data-select='"+x1+"' data-sort='"+y1+"'></div>";
				$("#maincontentbox").html(out);
				setTimeout(function(){
					wall_slides();//這是為了getboard用的
				},1000);
			}
	});
}
show_product=function(x){
	var out="";
	out+="  <div style='padding-bottom:50px;'>";
	out+="    <header>";
	out+="        <div class='link back popfullclose applebtn'>";
	out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
	out+="            <span>返回</span>";
	out+="        </div>";
	out+="    </header>	";
	out+="    <div class='album' id='shopitembox'>";
	out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
	out+="    </div>";
	//out+="    <button id='buybtn' class='post-btn popclick applebtn'  data-type='shopbuy' data-id=''>兌換商品</button>";
	out+="    <button id='buybtn' class='post-btn popclick applebtn'  data-type='shopbuy' data-id=''>我要兌換</button>";//20190904 Pman 客戶要求修改
	out+="  </div>";
	popbasefull(out);
	//$("#mainmidwrapin").html("<div class='loaderbox'><img src='img/loaderd.gif'></div>");
	var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
	tempitem=ajaxarr("getproduct",tempvals,ajaxurl);
	tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測試
		var out="";
		out+="        <div class='list'>";
		out+="            <img src='"+sessionStorage.getItem("imgurl")+"img/product/product"+data[1]['pid']+".jpg'>";
		out+="            <div class='title'>"+data[1]['pname']+"</div>";
		out+="            <div class='other'>";
		out+="                <div class='point'>"+data[1]['dispoints']+" <img src='img/p_off.png'></div>";
		out+="                <br clear='both'>";
		out+="            </div>";
		out+="        </div>";
		out+="        <div class='tabs'>";
		out+="            <input type='radio' id='tab1' name='tab' checked>";
		out+="            <label for='tab1'>商品介紹</label>";
		out+="            <div class='detail'>";
		out+=nl2brs(data[1]['des1']);
		out+="            </div>";
		out+="            <input type='radio' id='tab2' name='tab'>";
		out+="            <label for='tab2'>注意事項</label>";
		out+="            <div class='detail'>";
		out+=nl2brs(data[1]['des2']);
		out+="            </div>";
		out+="        </div>";
		$("#shopitembox").html(out);
		$("#buybtn").data("id",data[1]['pid']);

	});
}
//####### 商品元件 ##############
	print_shopitem=function(data){
		var out="";
		out+="        <div class='list' >";
		if((data['vopen']=="2" && parseInt(data['qty'])>0) || data['vopen']=="1"){
			out+="            <img src='"+sessionStorage.getItem("imgurl")+"img/product/product"+data['thisid']+"_s.jpg' class='btn storeitemclick applebtn' data-val='"+data['thisid']+"'>"; //20190327 Pman 商品列表要用「列表用」的圖
		}else{
			out+="            <img src='"+sessionStorage.getItem("imgurl")+"img/product/product"+data['thisid']+"_s.jpg'>"; //20190327 Pman 商品列表要用「列表用」的圖
		}
		out+="            <div class='title'>"+data['productname']+"</div>";
		out+="            <div class='other'>";
		if((data['vopen']=="2" && parseInt(data['qty'])>0) || data['vopen']=="1"){
			//out+="                <div class='btn ok storeitemclick applebtn'  data-val='"+data['thisid']+"'>可以製作</div>";
			out+="                <div class='btn ok storeitemclick applebtn'  data-val='"+data['thisid']+"'>可以兌換</div>";//20190904 Pman 客戶要求修改
		}else{
			out+="                <div class='btn storeitemclick applebtn' >缺貨中</div>\n";
		}
		out+="                <div class='point'>"+data['dispoints']+" <img src='img/p_off.png'></div>";
		out+="            </div>";
		out+="        </div>";
		return out;
	}
	show_shopform=function(x){
		var out="";
		out+="  <div style='padding-bottom:50px;'>";
		out+="    <header>";
		out+="        <div class='link back popfullcloseu applebtn'>";
		out+="            <i class='fa fa-angle-left' aria-hidden='true'></i>";
		out+="            <span>返回</span>";
		out+="        </div>";
		out+="    </header>	";
		out+="    <div class='contact' id='orderform'>";
		out+="		<div class='loaderbox'><img src='assets/img/loader.gif'></div>";
		out+="    </div>";
		out+="  </div>";
		popbasefullu(out);
		var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),x);//人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 遊戲
		tempitem=ajaxarr("getproduct",tempvals,ajaxurl);
		tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..測
			var out="";
			if(data[1]['lim']>0){
				out+="            <label>";
				out+=" 限量商品,每人限量:"+data[1]['lim'];
				out+="            </label>";
			}
			if(data[1]['vir']=="1"){
				out+="            <label>";
				out+="                            本商品為無實體之序號商品，訂單成立後會將序號寄至您所指定的信箱\n";
				out+="            </label>";
			}
			out+="			  <input type=hidden name='pid' value='"+data[1]['pid']+"'  class='formfield'>\n";
			out+="            <label>";
			out+="                姓名";
			out+="                <input type='text' placeholder='請輸入真實姓名'  class='formfield form-control' data-err='請輸入真實姓名'>";
			out+="            </label>";
			out+="            <label>";
			out+="                電話";
			out+="                <input type='tel' name='phone' placeholder='請輸入連絡電話'  class='formfield form-control' data-err='請輸入連絡電話'>";
			out+="            </label>";
			out+="            <label>";
			out+="                Email";
			out+="                <input type='email' name='email' placeholder='請輸入常用信箱' class='formfield form-control' data-err='請輸入常用信箱'>";
			out+="            </label>";
			out+="<input type='hidden' class='formfield' value='pass'>";
			//out+="            <label>";
			//out+="                密碼";
			//out+="                <input type='password' placeholder='請再輸入一次登入密碼' class='formfield form-control' data-err='請再輸入一次登入密碼'>";
			//out+="            </label>";
			if(data[1]['vir']=="1"){
			}else{
				out+="            <label>";
				out+="                地址";
				out+="                <input type='text' placeholder='請輸入方便收件的地址' class='formfield form-control' data-err='請輸入方便收件的地址'>";
				out+="            </label>";
				out+="            <label>";
				out+="                備註";
				out+="                <textarea rows='10' placeholder='請輸入100字內'  class='formfield'></textarea>";
				out+="                <br clear='both'>";
				out+="            </label>";
			}
			out+="            <label>";
			out+="                <button class='send submitclick applebtn' data-type='orderform'>確定送出</button>";
			out+="            </label>";
			$("#orderform").html(out);
		});
	}

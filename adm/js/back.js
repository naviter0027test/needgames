$(document).ready(function() {
  var $window = $(window);
  var $document = $(document);
  var setover=""; //image hover 出現 upload icon
  setsize();
  $window.resize(function(){
	 setsize();
  });
 // get query string
  var querystring = location.search.replace( '?', '' ).split( '&' );
  var qs = {};
  for ( var i=0; i<querystring.length; i++ ) {
      var name = querystring[i].split('=')[0];
      var value = querystring[i].split('=')[1];
      qs[name] = value;
  }
 	//顯示電子信
	$("#showmime").click(function(e){
		e.preventDefault();
		$("body").append("<DIV id=fixme><DIV style='position:relative;left:50%;padding:5px 10px;margin-left:-40px;background:#666;color:#fff;width:60px;'>按我關閉</DIV>"+$("#mime").val()+"</DIV>");
		$("#fixme").animate({"left":30},900);
    });
	$("body").delegate("#fixme","click",function(){
		$("#fixme").remove();
    });
	//menu控制
	$(".type1 li").hover(function(){
		$(this).children(".type2").stop().slideDown();
	},function(){
		$(this).children(".type2").stop().slideUp();
	});
  //刪除管理
   $(".delbtn").click(function(){
		return confirm( '請問確定要刪除嗎?' );
	});
   $(".delicon").click(function(){
		return confirm( '請問確定要刪除嗎?' );
	});
  $(".navclick").click(function(){
   if(parseInt($(".J_navlist").css("top"))==80){
     $(".J_navlist").stop().animate({"top":-1000},600);
   }else{
     $(".J_navlist").stop().animate({"top":80},600);
   }
  });
  //產品頁開關控制
  if($(".line").length>0){
	  $(".line").css("cursor","pointer");
	  $(".catlist").hide();
	  if($(".CURRENT").length>0){
		  $("."+$(".CURRENT").attr("id")+"cat").show();
		  $(".CURRENT").children("th").children("span").text("-");
	  }else{
		  $("."+$(".line").eq(0).attr("id")+"cat").show();
		  $(".line").eq(0).children("th").children("span").text("-");
	  }
  }
  $(".line").click(function(){
		if( $("."+$(this).attr("id")+"cat").eq(0).css("display")=="table-row"){
			$("."+$(this).attr("id")+"cat").hide();
	 		 $(this).children("th").children("span").text("+");
		}else{
			$(".catlist").hide();
			$("."+$(this).attr("id")+"cat").show();
	  		$(".line").children("th").children("span").text("+");
	 		 $(this).children("th").children("span").text("-");
		}
	});
 $(".cityid").change(function(){
		var tempb=$(this).siblings(".areaid");
		ma=$(this).val();
		ttp=getarea(ma);
		ttp.success(function(data){
			out="<option value=''>請選擇鄉鎮市區</option>";
			for(var a=0;a<data.length;a++){
				out+="<option value='"+data[a]['areaid']+"'>"+data[a]['areaname']+"</option>";
			}
			tempb.children("option").remove();
			tempb.append(out);
		});
	});


  // default page fadeIn()
  $(".maincontents").hide();
  $(".maincontents").eq(0).fadeIn();
 $(".changeselect").change(function(){
		this.form.submit();
	});
 $(".fileuploadb").change(function(){
		this.form.submit();

	});
 $(".openclose").change(function(){
		this.form.submit();

	});
 $(".formtable td").on("mouseenter",function(){
		$(this).parent("tr").css("background","#eeeeff");
	}).on("mouseleave",function(){
		$(this).parent("tr").css("background","none");
	});
 $(".shotxt",".inputwrap").click(
	function(){
	$(this).hide().parent("td").css("height",120).children(".hidinput").fadeIn();
	});
 $(".imghover").click(
	function(){
			$(this).hide().parents(".imgwrap").children(".hidinput").fadeIn();
	});
 $(".imgwrap").delegate(".imgover","click",function(){
			$(this).parents(".imgdiv").hide().parents(".imgwrap").children(".hidinput").fadeIn();
  });
  $(".imgwrap").delegate("#imgpop","click",function(){
			$(this).parents(".imgdiv").hide().parents(".imgwrap").children(".hidinput").fadeIn();
  });
 $("textarea.autoresize").focus(wilderme).keyup(wilderme).blur(returnme);
 $("input:file").change(function() {
	  //$(this).parent("div").css("opacity","0").parent("td").prepend("<div class=fileselect>selected</div>");
	  //$(this).css("opacity","0").parent("td").prepend("<div class=fileselect>selected</div>");
	  $(this).parent("div").prepend("<div class=fileselect>selected</div>");
	});

 $("input[type='text'].autoresize").focus(wildertext).keyup(wildertext).blur(returntext);
  $(".funcwrap").mouseenter(showlist).mouseleave(returnwrap);
  //顯示 上傳icon
 $(".imgdiv").hover(function(){
		var mypo="<div id=imgpop style='position:absolute;width:100%;height:100%;;top:0;left:0;z-index:99999999;background:url(../img/b30.png);'>";
		mypo+="<img class='imgover' src=img/icon_uploadw.png style='position:absolute;top:50%;left:50%;margin-left:-20px;margin-top:-20px;z-index:9999999999;width:40px;'></div>";
		$(this).append(mypo);
   },function(){
	   	   $("#imgpop").remove();
   });
  $(".imghover").hover(function(){
		if($(this).hasClass("notmove")){
		}else{
			thisratio=$(this).width()/$(this).height();
			newheight=200;
			if(newheight*thisratio>400){
				newheight=parseInt(400/thisratio);
			}
			$(this).stop().animate({"height":newheight},500);
			setsize();
		}
   },function(){
	   if($(this).hasClass("notmove")){
		}else{
			$(this).stop().animate({"height":"50px"},500);
			setsize();
		}
	});
 //商品快查專用
 if($("#ppkey")){
	 mykey=$("#ppkey");
	 mykey.keyup(getplist);

 }
 //商品刪除顯示專用
 if($("#barkey")){
	 mykey=$("#barkey");
	 mykey.keyup(getbarlist);

 }

setTimeout(function(){setsize();},500);
 /* ################## function start ############*/
 function getarea(ttt){
		return  $.ajax({
			 type:'GET',
			 dataType: "json",
			 url:'page.php',
			 data:{"job":"getarea","ma":ttt,"timtess":$.now()}
		});
 }
function getbarlist(){
			if($("#barkey").val().length>=3){
				$.ajax({
				 type:'GET',
				 url:'page.php',
				 data:{"job":"getbarlist","timtess":$.now(),"key":$("#barkey").val()},
				 success:function(data){
					  $("#showproductid").val(data);
				 },error:function(){
					  $temp="database connect error";
				 }
			   });
			}
}
/* ################## function start ############*/
function getplist(){
			if($("#ppkey").val().length>0){
				$.ajax({
				 type:'GET',
				 url:'page.php',
				 data:{"job":"getplist","timtess":$.now(),"key":$("#ppkey").val()},
				 success:function(data){
					  $("#showproductid").val(data);
				 },error:function(){
					  $temp="database connect error";
				 }
			   });
			}
}
function wildertext(){
	if(!$(this).hasClass("notmove")){
		myteext=$(this).val();
		var sDiv = $("<span />").text("l" + myteext + "l").appendTo("body"),
        myl = sDiv.width();
        sDiv.detach();
		nowwidth=parseInt($(this).css("width"));
		if(myl<80){
			myl=80;
		}
		for(var i=2;i<8;i++){
			if(i*40>myl && myl>(i-1)*40){
				myl=i*40;
				break;
			}
		}
		if(nowwidth!=myl){
			 $(this).stop().animate({"width":myl},1000);
		}
	}
}
function returntext(){
	if(!$(this).hasClass("notmove")){
		$(this).stop().animate({"width":"100px"},500);
	}
}
function wilderme(){
	if($(this).hasClass("notmove")){
		$(this).stop().animate({"width":"400px","height":"200px"},500);
	}
}
function returnme(){
	if($(this).hasClass("notmove")){
		$(this).stop().animate({"width":"400px","height":"50px"},500);
	}
}
function showlist(){
	$(this).stop().animate({"height":$(this).children("p").length*22+15},500);
		setsize();
}
function returnwrap(){
	$(this).stop().animate({"height":"20px"},500);
		setsize();
}
  function setsize(){
	 var $window = $(window);
     var $document = $(document);
	  $('.nav-box').css({'min-height':($(document).height())+'px'});
	 $("input[type='file']").css("z-index","10").css("opacity",0).parent(0).append("<div class='filepreselect gray-btn'>瀏覽</div>");
	// $("input[type='file']").css("z-index","10").css("opacity",0);
	 $("#wrapper").css("min-height",$window.height());
  }

});

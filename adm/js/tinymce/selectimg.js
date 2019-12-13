//本功能需要 PHP協助

$(document).ready(function() {
	//跳出選擇畫面
	$("body").delegate(".mce-placeholder","focus",function(){
		tt=$(this).parents("div").siblings("label").text();
		if(tt=="圖片網址"){
			$.ajax({
				type:'GET',
				dataType: "json",
				url: "js/tinymce/getfile.php",
				data:{"timtess":$.now()},
			   success: function(data){
					mylist ="<div style='width:90%;height:430px;position:fixed;top:10%;left:5%;background:#fff;z-index:9999999999' class='shadow' id='imgselect'>";
					mylist+=	"<div  style='width:100%;height:40px;position:relative;background:#fee;'>";
					mylist+=		"<p style='color:#444;line-height:40px;font-size:16px;margin-left:20px;font-weight:bold;'>請選擇圖片</p>";
					mylist+=		"<img src=img/close.png style='position:absolute;top:5px;right:5px;' id='closeselect'>";		
					mylist+=	"</div>";
					mylist+=	"<div id='imglist' style='width:90%;height:300px;position:relative;background:#f3f3f3;border:1px solid #eee;margin-left:5%;margin-top:10px;	overflow-y:scroll;:'>";
					for(var a=0;a<data.length;a++){
						if(data[a][0].toLowerCase().indexOf("png")>0 || data[a][0].toLowerCase().indexOf("jpg")>0 ){
							mylist+="<a href='"+data[a][1]+"' class='imgclick'><img src='../img/upload/"+data[a][0]+"' style='margin:5px;height:40px;float:left;'></a>";
						}
					}
					mylist+=	"</div>";
					mylist+=	"<div id='imgupload' style='width:90%;height:50px;position:relative;background:#f3f3f3;border:1px solid #eee;margin-left:5%;margin-top:10px;'>";
					mylist+=	"<iframe src=js/tinymce/upload.php style='width:100%;height:100%;border:none;'></iframe>";
					mylist+=	"</div>";				
					mylist+=	"</div>";
					mylist+="</div>";
					$("body").prepend(mylist);
			  }
			});			
		}
	});
	$("body").delegate(".imgclick","click",function(e){
		e.preventDefault();
		thisurl=cleanhref($(this).attr("href"));
		$(".mce-placeholder").val("../img/upload/"+thisurl);
		$("#imgselect").hide();
	});
	$("body").delegate("#closeselect","click",function(){
		$("#imgselect").hide();
	});

	function cleanhref(myhrefval){
		temp=myhrefval;
		if(temp.indexOf("/")>=0){
			temp=temp.substring(temp.lastIndexOf('/') + 1);
		}
		return temp;
	}
});

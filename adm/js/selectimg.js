$(document).ready(function() {
	//跳出選擇畫面
	$("body").delegate(".mce-placeholder","focus",function(){
		 alert("E");
		tt=$(this).parents("div").siblings("label").text();
		alert(tt);		
		mylist ="<div style='width:90%;height:360px;position:absolute;top:10%;left;5%;background:#fff;' class='shadow' id='imgselect'>";
		mylist+=	"<div  style='width:100%;height:30px;position:relative;background:#ccc;'>";
		mylist+=		"<p style='color:#444;line-height:30px;font-size:15px;'>請選擇圖片</p>";
		mylist+=		"<img src=img/close.png style='position:absolute;top:5px;right:5px;' id='closeselect'>";		
		mylist+=	"</div>";
		mylist+=	"<div id='imglist' style='width:90%;height:300px;position:relative;background:#f3f3f3;border:1px solid #eee;margin-left:5%;margin-top:10px;'>";
		var dir = "uploadfiles/";
		var fileextension = ".jpg";
		var fileextensionb = ".png";
		$.ajax({
			//This will retrieve the contents of the folder if the folder is configured as 'browsable'
			url: dir,
			success: function (data) {
				//Lsit all png file names in the page
				$(data).find("a:contains(" + fileextension + ")").each(function () {
					var filename = this.href.replace(window.location.host, "").replace("http:///", "");
					$("body").append($("<img src=" + dir + filename + " style='height:90px;margin:5px;float:left;'></img>"));
				});
			}
		});
		mylist+=	"</div>";
		mylist+="</div>";
	});
	$("body").delegate("#closeselect","click",function(){
		$("#imgselect").hide();
	});

});
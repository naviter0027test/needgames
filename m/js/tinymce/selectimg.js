//本功能需要 PHP協助

$(document).ready(function() {
	//跳出選擇畫面
	$("body").delegate(".mce-placeholder","focus",function(){
		tt=$(this).parents("div").siblings("label").text();
		if(tt=="圖片網址"){
			if($("#popu").length>0){
			}else{
				$(".mce-floatpanel").css("opacity",0);
				mylist="";
				mylist+=	"<div id='imgupload' style='position:relative;'>";
				mylist+=	"<iframe src=js/tinymce/upload.php style='width:100%;height:100%;border:none;'></iframe>";
				mylist+=	"</div>";	
				popbaseu("選擇圖片",mylist,'y');
				setTimeout(function(){
					$("#popu").focus();
				},900);
			}
		}
	});

	$("body").delegate(".imgclick","click",function(e){
		e.preventDefault();
		thisurl=cleanhref($(this).attr("href"));
		$(".mce-placeholder").val("../uploadfile/"+thisurl);

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

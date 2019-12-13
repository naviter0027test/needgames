(function( $ ) {
    $.fn.paracomplete = function() {
        var mydiv="";
        var temprecord="";
        var first=0;
        this.keyup(function( e ) {
            mydiv=$(this);
            var myleft=$(this).position().left;
            var mytop=$(this).position().top;
            var myheight=$(this).height();
            var mywidth=$(this).width();
            if($(this).val()){
                ma=$(this).val();
				data="";
                out="";
                tempitem=get_jason(ma);
                tempitem.success(function(data) {
                    if(data && data.length>0){
                        out="<div id='s_searchbox' style='position:absolute;top:"+(myheight+mytop+2)+"px;left:"+myleft+"px;z-index:99;width:"+mywidth+"px;background:#fff;color:#444;border:1px solid #ccc;padding:1px;'>";
                        for(var a=0;a<data.length;a++){
                            out+="<p style='height:25px;line-leight:25px;font-size:14px;width:100%;' class='selectitem'>"+data[a]['productname']+" (id:"+data[a]['productid']+")</p>";
                        }
                        out+="</div>";
						if($("#s_searchbox").length){
							$("#s_searchbox").remove('.selectitem');
							$("#s_searchbox").remove();
						}
                        $("body").append(out);
                        first=0;
                    }
                });
            }else{
                    if($("#s_searchbox").length){
                       $("#s_searchbox").remove('.selectitem');
                        $("#s_searchbox").remove();
                    }
            }
         });
        //滑入選單
        $("body").delegate(".selectitem","mouseenter",function(e){
            $(this).css("background","#eee");
        });
        $("body").delegate(".selectitem","mouseleave",function(e){
            $(this).css("background","#fff");
        });
        this.keydown(function(e) {
            switch(e.which) {
                case 40: // down
                $(this).blur();
                $(".selectitem").removeClass("selected");
                $(".selectitem").eq(0).focus();
                $(".selectitem").eq(0).addClass("selected");
                first=1;
                break;
                default: return ture; // exit this handler for other keys
            }									  
        });
        $(document).keydown(function(e) {
            switch(e.which) {
                case 40: // down
                    if(first==1){
                        first=2;
                    }else if(first==2){
                        elm=$(".selectitem");
                        for(var a=0; a<elm.length; a++){
                            if(elm.eq(a).hasClass("selected")){
                                e.preventDefault();
                                elm.eq(a).removeClass("selected");
                                elm.eq(a).blur();
                                a++;
                                if(a<elm.length){
                                    elm.eq(a).focus();
                                    elm.eq(a).addClass("selected");
                                }else{
                                    elm.eq(0).focus();
                                    elm.eq(0).addClass("selected");
                                }
                                break;
                            }
                        }
                    }
                break;
                case 38:
                    if(first==1){
                        mydiv.focus();
                        first=2;
                    }else if(first==2){
                        elm=$(".selectitem");
                        for(var a=elm.length-1;a>=0;a--){
                            if(elm.eq(a).hasClass("selected")){
                                e.preventDefault();
                                elm.eq(a).removeClass("selected");
                                elm.eq(a).blur();
                                a--;
                                if(a>=0){
                                    elm.eq(a).focus();
                                    elm.eq(a).addClass("selected");
                                }else{
                                    mydiv.focus();
                                }
                                break;
                            }
                        }
                    }
                break;
                case 13 :
                    if(first==1){
                        first=2;
                    }else if(first==2){
                        elm=$(".selectitem");
                        for(var a=0; a<elm.length; a++){
                            if(elm.eq(a).hasClass("selected")){
                                myval=elm.eq(a).html();
                                mydiv.val(myval);
                                temprecord=myval;
                                $("#s_searchbox").remove('.selectitem');
                                $("#s_searchbox").remove();
                                break;
                            }
                        }			
                    }
                    break;
                default: return; // exit this handler for other keys
            }									  
        });
        //點選項目
        $("body").delegate(".selectitem","click",function(e){
            myval=$(this).html();
            mydiv.val(myval);
            temprecord=myval;
            $("#s_searchbox").remove('.selectitem');
            $("#s_searchbox").remove();
        });
        //進入欄位控制
        this.focus(function( e ) {
            temprecord=$(this).val();
            $(this).val('');
            first=0;
        });
        this.blur(function( e ) {
            $(this).val(temprecord);
            if ($('#s_searchbox').is(':hover')) {
            }else{
                $("#s_searchbox").remove('.selectitem');
                $("#s_searchbox").remove();
            }
        });
        $("body").delegate("#s_searchbox","mouseleave",function( e ) {
            $("#s_searchbox").remove('.selectitem');
            $("#s_searchbox").remove();
        });
        return this;
    };
	function get_jason(mx){
		return  $.ajax({
			 type:'GET',
			 dataType: "json",
			 url:'selectproductjson.php',
			 data:{"ma":mx,"timtess":$.now()}
		});
	}
}( jQuery ));


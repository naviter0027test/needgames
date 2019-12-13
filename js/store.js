//這裡儲存 瀏覽器設定
//adopen  上方廣告
//bsort   動態牆顯示的排序
//gamesort	正在玩的遊戲
	if(localStorage.getItem("adopen")){//開始時間
	}else{
		localStorage.setItem("adopen",1);
	}
	//$("#startdate").val(localStorage.getItem("startdate"));
	if(localStorage.getItem("bsort")){//結束時間
	}else{
		localStorage.setItem("bsort",1);
	}
	//$("#enddate").val(localStorage.getItem("enddate"));
	if(localStorage.getItem("gamesort")){//寬或嚴格
	}else{
		localStorage.setItem("gamesort",1);
	}

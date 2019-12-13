// FACEBOOK　登入檔案
		var chkfb=0;
		$("body").delegate(".fbclick","click",function(e){
			e.preventDefault();
			if(chkfb==1){
			}else{
				popnotice("fb尚未連結\n 請稍待reload畫面 \n reload後請稍等候10秒上下 ");
				location.reload(); 
			}
		});
		
		

		window.fbAsyncInit = function() {
				chkfb=1;
				FB.init({
				  appId      : '257730147730215',
				  xfbml      : true,
				  version    : 'v2.0',
				  frictionlessRequests : true
				});
				$("body").delegate("#logoff","click",function(e){
					FB.logout(function(response) {
						$("#login").show();
						$("#logtitle").hide();
						$(".poptitles").removeClass("tracktitleon");
						$("#loglist").hide();
					});
				});
		
				FB.getLoginStatus(function(response) {
				  if (response.status === 'connected') {
					 	 userid = response.authResponse.userID; //get FB UID
						if(userid==localStorage.getItem("userid")){
							$("#logtitle").html(localStorage.getItem("username").substring(0,15) +"<img src='"+localStorage.getItem("userphoto")+"' id='logphoto' class='fR'>");
							$("#logtitle").show();
							$("#login").hide();
						}
				  }
				});
				$("body").delegate(".fbclick","click",function(e){
						FB.login(function(response) {
							if(response.authResponse) {
								access_token = response.authResponse.accessToken; //get access token
								userid = response.authResponse.userID; //get FB UID
								var url = '/me?fields=name,email';
								FB.api(url, function (response) {
										fbname = response.name;
										fbemail=response.email;
										FB.api('/me/picture?type=large&redirect=false', function(response) {
											fbphoto=response.data.url;
											if(fbemail){
												x=Array(userid);
												//傳送使用者
												tempitem=ajaxarr("returnok",x,"ajax.php");
												tempitem.success(function(data){
													if(data[0]=="ERR"){
														//沒有登記則要要求註冊
				
													}else{
														//正確更新前台資料
														localStorage.setItem("userid",userid);
														localStorage.setItem("username",fbname);
														localStorage.setItem("userphoto",fbphoto);
														$("#logtitle").html(localStorage.getItem("username").substring(0,15)+"<img src='"+localStorage.getItem("userphoto")+"' id='logphoto' class='fR'>");
														$("#logtitle").show();
														$("#login").hide();
													}
												});
											}else{
												popnotice("無法抓取email相關訊息,無法完成註冊");
											}
										});

								});

							}
						}, {scope: 'email'});  				
				});
		}
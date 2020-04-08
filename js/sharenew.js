(function($){
	popimg = function(x,y,z,tmp) { //title/內容/是否可以關閉
		out="";
		if($("#pop").length){
			$("#pop i.popimgclick").remove();
		}else{
			if(tmp=="video"){
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
				out+="		<video controls autoplay><source src='uploadfile/"+x+"' type='video/mp4' ></video>\n";
			}else{
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
				if(z){
					//out+="		<img src='uploadfile/"+x+"' id='popimg'>\n";
					out+="		<img src='uploadfile/"+x+"' id='popimg' class='popimgclick' data-val='"+z+"'>\n";
				}else{
					out+="		<img src='uploadfile/"+x+"' id='popimg'>\n";
				}
			}
		}
		if(y){
			out+="<i class='picgoprev fa fa-chevron-left popimgclick' data-val='"+y+"'></i>";
		}
		if(z){
			out+="<i class='picgonext fa fa-chevron-right popimgclick' data-val='"+z+"'></i>";
		}
		if($("#pop").length){
		}else{
			out+="</div>";
		}
		if($("#pop").length){
			$("#popimg").animate({"opacity":0},500,function(){
				var tepimg = new Image();
				tepimg.onload = function(){
					$("#popimg").attr("src","uploadfile/"+x);
					$("#popimg").data("val",z);
					$("#popimg").animate({"opacity":1},500);
					$("#popin").prepend(out);
				}
				tepimg.src = "uploadfile/"+x;
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
 	popimgsimple = function(x) { //title/內容/是否可以關閉
		out="";
		if($("#pop").length){
			$("#pop .popimgclick").remove();
		}else{
				out+="<div id='pop'>";
				out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
				out+="	<div id='popin' style='width:80%;background:#000;max-height:80%;text-align:center;left:10%;margin-left:0;padding:30px 0;'>\n";
				out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
				out+="		<img src='"+x+"' id='popimg'>\n";
		}
		if($("#pop").length){
		}else{
			out+="</div>";
		}
		if($("#pop").length){
			$("#popimg").animate({"opacity":0},500,function(){
				var tepimg = new Image();
				tepimg.onload = function(){
					$("#popimg").attr("src",x);
					$("#popimg").animate({"opacity":1},500);
					$("#popin").prepend(out);
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
    popnotice=function(x) { //一般地跳出
		popbaseu("系統回應",x,'');
    }
	//分享表格
	popshare=function(a,b) { //一般地跳出
		var x="";
		xurl=window.location.toString();
		xpage=xurl.substring(0,xurl.lastIndexOf('/'));
		x="<a href='"+xpage+"/share.php?page="+a+"&id="+b+"' id='sharemeplease' target=_new >"+xpage+"/share.php?page="+a+"&id="+b+"</a><div style='margin-top:5px;' class='copytoclip submitclick border5 btn bgcolor_lc' data-target='#sharemeplease'>複製網址</div>";
		popbaseu("分享連結",x,'');
	}
	//註冊表格
	popcontactus = function(x) {
		var mem=[];
		mem['nickname']="";
		mem['email']="";
		if(sessionStorage.getItem("member")){
			mem=JSON.parse(sessionStorage.getItem("member"));
		}
		var tempvals=Array("1","42345344");
		tempitem=ajaxarr("get_caplist",tempvals,"ajax.php");
		tempitem.success(function(data){//回傳 data 義
			out="<form action='' method='post' id='contactform'>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>姓名</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='name' placeholder='姓名' value='"+mem['nickname']+"'>\n";
			out+="                            <div class='formerr'>請填寫姓名</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>電話</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield ' name='phone' placeholder='請輸入連絡電話'>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w4'>Email</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='email' placeholder='Email' value='"+mem['email']+"'>\n";
			out+="                            <div class='formerr'>請填寫Email</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>標題</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='text' class='formfield form-control' name='title' placeholder='20字內'>\n";
			out+="                            <div class='formerr'>請填寫標題,20字內</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
		    out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w4'>聯絡類型</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <select name='type' class='wform formfield form-control'> \n";
			out+="								<option value=''>請選擇</option>";
			out+="								<option value='合作提案'>合作提案</option>";
			out+="								<option value='廣告刊登'>廣告刊登</option>";
			out+="								<option value='檢舉通報'>檢舉通報</option>";
			out+="								<option value='聯絡客服'>聯絡客服</option>";
			out+="								<option value='意見回饋'>意見回饋</option>";
			out+="								<option value='新聞稿投稿'>新聞稿投稿</option>"; //20190320 Pman 新增聯絡我們的選項
			out+="								<option value='需要新增的遊戲標籤'>需要新增的遊戲標籤</option>";//20190320 Pman 新增聯絡我們的選項
			out+="								<option value='系統錯誤回報'>系統錯誤回報</option>";
			out+="							  </select>";
			out+="                            <div class='formerr'>請選擇聯絡類型</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w2'>內容</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <textarea class='wform formfield form-control' name='content' placeholder='1000字內'></textarea>\n";
			out+="                            <div class='formerr'>請填寫內容,1000字內</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3 tleft'><span class='w3'>驗證碼</span></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="							<span class='inblock fL' style='width:48%'><input type='text' class='formfield form-control' name='code'></span>\n";
			out+="							<span class='inblock fL' style='width:48%'>"+data[0]+"</span>\n";
			out+="                            <div class='formerr'>請填寫驗證碼</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="                    <div class='formline'>\n";
			out+="                        <div class='formitem formitem_3'></div>\n";
			out+="                        <div class='formitem formitem_3'>\n";
			out+="                            <input type='submit'  name='submit' value='送出' class='submitclick border5' data-type='contactform'>\n";
			out+="                            <div class='formerr'>有點錯誤,請改正</div>\n";
			out+="                        </div>\n";
			out+="                        <div class='clr'></div>\n";
			out+="                    </div>\n";
			out+="</form>";
			popbase("聯絡我們",out,'');
		});
   };
	popmember=function(){//會員條款
	   out="";
		 out+="            <span class='aggp'>		 歡迎來到KYOMON社群網站（以下簡稱KYOMON）！為了保障您的權益，在註冊前請先詳細閱讀本會員規範之所有內容，當您選擇完成註冊即視為您已閱讀完本會員規範，並同意遵守以下所有規範內容。</span>";
		 out+="            <span class='aggp'>		 若您不同意以下所述全部或部分規範內容，您即無法完成會員註冊，將無法使用KYOMON網站部分服務或參與相關活動。</span>";
		 out+="            <span class='aggh1'>		 一、會員服務條款</span>";
		 out+="            <span class='aggh2'>		 1.本會員服務條款所稱之「會員」，為依照本站所定之加入會員程序加入完成註冊並通過認證者。</span>";
		 out+="            <span class='aggh2'>		 2.當您使用本站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。</span>";
		 out+="            <span class='aggh2'>		 3.本站保留有審核加入會員資格及有解除其會員資格之權利。</span>";
		 out+="            <span class='aggh2'>		 4.本會員服務條款之修訂，適用於所有會員。</span>";
		 out+="            <span class='aggh2'>		 ５.所有申請使用京門科技股份有限公司（KYOMON）會員服務的使用者，都應該詳細閱讀下列使用條款，這些使用條款訂立的目的，是為了保護京門科技股份有限公司（KYOMON）會員服務的提供者以及所有使用者的利益，並構成使用者與京門科技股份有限公司（KYOMON）會員服務的提供者之間的契約，使用者完成註冊手續、或開始使用京門科技股份有限公司所提供之會員服務時，即視為已知悉並同意本會員規範的所有約定。</span>";
		 out+="            <span class='aggh2'>		 ６. 京門科技股份有限公司（KYOMON）針對本網站擁有最終解釋權。</span>";
		 out+="            <span class='aggp'>		 如您是法律上之無行為能力人或限制行為能力人(如未滿20歲之未成年人)，於加入會員前，請將本服務使用條款交由您的法定代理人(如父母、輔助人或監護人)閱讀，並得到其同意，您才可註冊及使用京門科技股份有限公司（KYOMON）所提供之會員服務。</span>";
		 out+="            <span class='aggp'>		 當您開始使用京門科技股份有限公司（KYOMON）所提供之註冊會員服務時，視同您的法定代理人(如父母、輔助人或監護人)已閱讀、了解並同意本服務條款。</span>";
		 out+="            <span class='aggh1'>		 二、遵守會員規範：</span>";
		 out+="            <span class='aggp'>		 在您於KYOMON註冊成為會員後，可以使用KYOMON所提供之各種服務及</span>";
		 out+="            <span class='aggp'>		 KYOMON之特定服務，您可能須於使用該特定服務前同意相關使用規範。當您使用KYOMON服務時，即表示同意接受KYOMON之會員規範及其他KYOMON所公告之規範或注意事項之約束。</span>";
		 out+="            <span class='aggh1'>		 三、會員</span>";
		 out+="            <span class='aggh2'>		 1.使用本站所提供之會員服務時，須以加入會員時所登錄之帳號及密碼使用之。</span>";
		 out+="            <span class='aggh2'>		 2.會員須善盡管理會員帳號及密碼之責任。對於使用該會員之帳號及密碼(不論會員本身或其他人)利用本站服務所造成或衍生之所有行為及結果，會員須自行負擔全部法律責任。</span>";
		 out+="            <span class='aggh2'>		 3.會員之帳號及密碼遺失，或發現無故遭第三者盜用時，應立即通知本站連絡掛失。若因未即時通知，導致本站無法有效防止及修改時，所造成的所有損失，會員應自負全責。</span>";
		 out+="            <span class='aggh2'>		 4.每次結束使用本服務，會員須登出並關閉視窗，以確保您的會員權益。</span>";
		 out+="            <span class='aggh2'>		 5.盜用他人會員之帳號及密碼，導致第三者或本公司遭他人訴訟或行政機關之調查、追訴時，第三者或本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。</span>";
		 out+="            <span class='aggh1'>		 四、會員登錄資料</span>";
		 out+="            <span class='aggh2'>		 1.會員登錄資料應提供您本人正確、最新及完整的資料。</span>";
		 out+="            <span class='aggh2'>		 2.會員登錄資料不得有偽造、不實等之情事，一經發現，本公司得以拒絕、暫停或終止其會員資格，若違反中華民國相關法律，亦將依法追究。</span>";
		 out+="            <span class='aggh2'>		 3.會員登錄之各項資料有變更時，應不定期更新，以保其正確及完整性。若您提供的資料有錯誤或不符等現象，本網站有權暫停或終止您的會員資格，並拒絕您繼續使用本服務。</span>";
		 out+="            <span class='aggh2'>		 4.未經會員本人同意，本公司不會將會員資料揭露給第三者，唯資料共用原則... (請參閱本站「隱私權保護聲明」相關規定)等不在此限。</span>";
		 out+="            <span class='aggp'>		 ■隱私權保護聲明</span>";
		 out+="            <span class='aggint'>		 a.本網站會保護每一位使用者的隱私，不管是您的申請帳號、個人資料、郵件位址、或所儲存的網站資料，除了可能涉及違法、侵權、或違反使用條款、或長達一年沒有登入進行任何系統儲存動作、或經會員本人同意以外，本網站不會任意監視、增刪、修改或關閉，或將個人資料及郵件內容交予第三者，包括贊助之廣告廠商。</span>";
		 out+="            <span class='aggint'>		 b.本網站有部份特定服務是與其他合作廠商共同經營，如果您不願將個人資料揭露給其他合作伙伴，可以選擇不同意使用這些特定服務。為完成這些特定服務，本網站可能將您個人的資料揭露給合作伙伴，但會在提供會員資料前告知會員。</span>";
		 out+="            <span class='aggint'>		 c.   在下列的情況下，本網站有可能會查看或提供您的資料給有權機關、或主</span>";
		 out+="            <span class='aggp'>		         張其權利受侵害並提出適當證明之第三人：</span>";
		 out+="            <span class='aggint'>		 c.1. 依法令規定、或依司法機關或其他有權機關的命令；</span>";
		 out+="            <span class='aggint'>		 c.2. 為執行本使用條款、或使用者違反使用條款；</span>";
		 out+="            <span class='aggint'>		 c.3. 為保護京門科技股份有限公司（KYOMON）會員服務系統之安全或經營者</span>";
		 out+="            <span class='aggp'>		         之合法權益；</span>";
		 out+="            <span class='aggint'>		 c.4. 為保護其他使用者其他第三人的合法權益；</span>";
		 out+="            <span class='aggint'>		 c.5. 為維護京門科技股份有限公司（KYOMON）會員服務系統的正常運作。</span>";
		 out+="            <span class='aggint'>		 d.     經會員註冊成功後，為增加會員服務範圍，不須另行註冊即享有本公司各項產品之會員資格，本公司將於各產品內進行會員資料的建檔、揭露、轉介、或交互運用，但本公司仍保有拒絕或暫停產品服務的權利。</span>";
		 out+="            <span class='aggint'>		 e.     KYOMON社群也自動接收並記錄您電腦和瀏覽器上的資料，包括 IP位址、  </span>";
		 out+="            <span class='aggp'>		          KYOMON社群cookie中的資料、使用之軟體和硬體以及您瀏覽的網頁紀錄。</span>";
		 out+="            <span class='aggp'>		         在您使用KYOMON社群產品及服務期間，KYOMON社群將資料用作以下用途：改善KYOMON社群產品與服務品質、聯絡您、進行研究，以及提供內部及外部客戶不載有個人資料之市場分析或業務報告。</span>";
		 out+="            <span class='aggh2'>		 5.會員應妥善保管密碼，不可將密碼洩露或提供給他人知道或使用；以同一個會員身分證字號和密碼使用本服務所進行的所有行為，都將被認為是該會員本人和密碼持有人的行為。</span>";
		 out+="            <span class='aggh2'>		 6.會員如果發現或懷疑有第三人使用其會員身分證字號或密碼，應該立即通知本公司，採取必要的防範措施。但上述通知不得解釋為本公司對會員負有任何形式之賠償或補償之責任或義務。</span>";
		 out+="            <span class='aggh1'>		 五、註冊資料：</span>";
		 out+="            <span class='aggp'>		 您同意於註冊時提供完整詳實且符合真實之個人資料，您所登錄之資料事後若有變更時，應隨時更新。若有需要由KYOMON協助處理客戶服務事項時，</span>";
		 out+="            <span class='aggp'>		 KYOMON會核對您的個人資料，若與註冊時所登錄之資料不符時，KYOMON將無法對您提供相關服務。</span>";
		 out+="            <span class='aggp'>		 若您提供之個人資料有填寫不實或原登錄之資料不實而未更新，或是有任何誤導之嫌，KYOMON將保留隨時終止您會員資格及使用KYOMON之權利。您同意KYOMON依法律或契約有需要通知您時，得以電子文件向您註冊時之電子郵件帳號為通知，並於通知送出時即視為產生送達之效力，請您提供正確且經常使用的電子郵件帳號，以維護您的權益。</span>";
		 out+="            <span class='aggh1'>		 六、使用行為</span>";
		 out+="            <span class='aggh2'>		 1.您使用本服務之一切行為必須符合當地或國際相關法令規範；對於使用者的一切行為，您須自行負擔全部法律責任。</span>";
		 out+="            <span class='aggh2'>		 2.您同意絕不為非法之目的或以非法方式使用本服務，與確實遵守中華民國相關法規及網際網路之國際慣例，並保證不得利用本服務從事侵害他人權益或違法之行為，否則您須自行負擔全部法律責任。</span>";
		 out+="            <span class='aggh2'>		 3.您於使用本站會員服務時應遵守以下規則：</span>";
		 out+="            <span class='aggint'>		  a)不得使用有損他人人格或商標權、著作權、專利權等智慧財產權或其他權利內容。</span>";
		 out+="            <span class='aggint'>		  b)不得使用違反公共秩序或善良風俗或其他不法之文字。</span>";
		 out+="            <span class='aggint'>		  c) 不得使用強烈政治、宗教色彩的偏激言論。</span>";
		 out+="            <span class='aggint'>		  d)未經本公司許可不得利用本服務或本網站所提供其他資源從事任何商業交   </span>";
		 out+="            <span class='aggp'>		      易行為。</span>";
		 out+="            <span class='aggint'>		  e)不得違反本站「會員規範」內容。</span>";
		 out+="            <span class='aggh1'>		 七、本公司專有權利</span>";
		 out+="            <span class='aggh2'>		 1.本服務所載，或本服務所連結之一切軟體或內容，或本公司之廣告商或合夥人所提供之內容，均受其著作權或其他專有權利或法律所保障。</span>";
		 out+="            <span class='aggh2'>		 2.當您傳輸資料至本公司提供之服務時，您即同意此一資料為全開放性(任何人均可瀏覽)。您授權並許可本公司得以重製、修飾、改編或以其他形式使用該內容之全部或一部分，及利用該內容製作衍生著作。衍生著作之著作權悉歸本公司所有。</span>";
		 out+="            <span class='aggh2'>		 3. 本公司同意除依本使用條款約定，將前述您的資料及衍生著作置於本網站供網路使用者瀏覽，以及本公司所屬相關媒體外，絕不非法轉供其他直接營利目的或侵害您的權利之使用。</span>";
		 out+="            <span class='aggh2'>		 4.所有網頁之頁面出現之廣告看板與活動訊息，所有權及經營權均為本公司所有，使用者除事先取得本公司同意外，不得自行使用所有訊息。</span>";
		 out+="            <span class='aggh2'>		 5.會員同意並授權本網站，得為提供個人化服務或相關加值服務之目的，提供所需之會員資料給合作單位(第三者)做約定範圍內之運用，如會員不同意將其資料列於合作單位(第三者)產品或服務名單內，可通知本網站於名單中刪除其資料，並同時放棄其本網站以外之購物優惠或獲獎權利。</span>";
		 out+="            <span class='aggh2'>		 6.同時為提供行銷、市場分析、統計或研究、或為提供會員個人化服務或加值服務之目的，會員同意本公司、或本公司之策略合作夥伴，得記錄、保存、並利用會員在本網站所留存或產生之資料及記錄，同時在不揭露各該資料之情形下得公開或使用統計資料。</span>";
		 out+="            <span class='aggh2'>		 7.對於會員所登錄之個人資料，會員同意本網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或行銷研究。</span>";
		 out+="            <span class='aggh1'>		 八、隱私權政策：</span>";
		 out+="            <span class='aggp'>		 您所提供的註冊資訊及其他於利用本網站服務時所提供之個人資料，KYOMON將依【隱私權政策】進行蒐集、利用與保護。</span>";
		 out+="            <span class='aggh1'>		 九、會員內容：</span>";
		 out+="            <span class='aggp'>		 若您使用KYOMON服務發表及分享您所創作之文字、美術、照片、視訊等著作，或其他利用KYOMON服務所為之討論、對話等（以下稱「會員內容」）時，您同意聲明並擔保會員內容為您所自行創作，並未侵害任何第三人之智慧財產權或其他權益，亦未違反任何法令之規定。</span>";
		 out+="            <span class='aggp'>		 請注意：您須為您所提供之會員內容負各種法律上責任，若涉有違法情事，</span>";
		 out+="            <span class='aggp'>		 KYOMON亦將於配合法院、檢調機關、政府機關相關程序提供相關資料。若涉有侵害他人智慧財產權或其他權益之情事者，KYOMON得終止您全部或部分服務。</span>";
		 out+="            <span class='aggp'>		 為維護KYOMON網站服務品質，您同意會員內容除須依據各該服務之板規或其他已公告之個別條款或細部規定為適當之發表外，亦不得有任何違反網路禮節、令人不愉快、令人厭惡、猥褻、暴力或其他KYOMON認為不適當之內容。</span>";
		 out+="            <span class='aggp'>		 KYOMON對於使用者內容並不會進行事前過濾，惟KYOMON保留(但無義務)對於會員內容予以刪除或禁止存取之權利。</span>";
		 out+="            <span class='aggp'>		 會員內容之著作權，屬於您所享有。您同意無條件授權會員內容予KYOMON，得為KYOMON網站營運，或為行銷、宣傳KYOMON網站等目的範圍內為利用，並得於前開目的範圍內再授權他人使用。如有其他利用需求，KYOMON將另行取得您的授權。</span>";
		 out+="            <span class='aggh1'>		 十、終止授權</span>";
		 out+="            <span class='aggp'>		 您使用本服務之行為若有任何違反法令或本使用條款或危害本網站或第三者權益之虞時，本公司有權不經告知您，立即暫時或永久終止您使用本服務之授權。</span>";
		 out+="            <span class='aggp'>		 基於公司的運作，本網站有可能變更、或停止提供服務之全部或一部，使用者不可以因此而要求賠償或補償</span>";
		 out+="            <span class='aggh1'>		 十一、會員的義務與責任：</span>";
		 out+="            <span class='aggp'>		 會員對本身於KYOMON或透過KYOMON傳輸的一切內容自負全責，您亦不得將會員帳號同意他人使用或移轉予他人，並同意遵守下列規定：</span>";
		 out+="            <span class='aggh2'>		 1.	會員承諾遵守中華民國相關法規及一切國際網際網路規定與慣例。</span>";
		 out+="            <span class='aggh2'>		 2.	會員同意並保證不公布或傳送任何毀謗、不實、威脅、不雅、猥褻、不法、攻擊性、毀謗性或侵害他人智慧財產權的文字，圖片或任何形式的檔案於</span>";
		 out+="            <span class='aggp'>		 KYOMON上。</span>";
		 out+="            <span class='aggh2'>		 3.	會員同意不會於KYOMON上從事廣告或販賣商品行為，包括虛擬寶物、遊戲點數卡或其他商品或服務之交易行為等。</span>";
		 out+="            <span class='aggh2'>		 4.	會員同意避免在公眾討論區討論私人事務，發表文章時，請尊重他人的權益及隱私權。</span>";
		 out+="            <span class='aggp'>		 KYOMON就會員的行為是否符合會員規範有最終決定權。若KYOMON決定會員的行為違反本會員規範或任何法令，會員同意KYOMON得隨時停止帳號使用權或清除帳號，並停止使用KYOMON。會員在違反法律規定之情事，應自負法律責任。</span>";
		 out+="            <span class='aggh1'>		 十二、免責事項</span>";
		 out+="            <span class='aggh2'>		 1.下列情形發生時，本網站有權可以停止、中斷提供本服務：</span>";
		 out+="            <span class='aggint'>		  a)對本服務相關軟硬體設備進行更換、升級、保養或施工時。</span>";
		 out+="            <span class='aggint'>		  b)發生突發性之電子通信設備故障時。</span>";
		 out+="            <span class='aggint'>		  c)天災或其他不可抗力之因素致使本網站無法提供服務時。</span>";
		 out+="            <span class='aggh2'>		 2.本公司對於使用者在使用本服務或使用本服務所致生之任何直接、間接、衍生之財產或非財產之損害，不負賠償責任。</span>";
		 out+="            <span class='aggh2'>		 3.使用者對於上傳留言之文字、圖片及其它資料，應自行備份；本公司對於任何原因導致其內容全部或一部之滅失、毀損，不負任何責任。</span>";
		 out+="            <span class='aggh2'>		 4.本公司對使用本服務之用途或所產生的結果，不負任何保證責任，亦不保證與本服務相關之軟體無缺失或會予以修正。</span>";
		 out+="            <span class='aggh2'>		 5.對於您在本站中的所有言論、意見或行為僅代表您個人；不代表本公司的立場，本公司不負任何責任。本公司對於使用者所自稱之身分，不擔保其正確性。</span>";
		 out+="            <span class='aggh2'>		 6.本公司無須對發生於本服務或透過本服務所涉及之任何恐嚇、誹謗、淫穢或其他一切不法行為對您或任何人負責。</span>";
		 out+="            <span class='aggh2'>		 7.對於您透過本服務所購買或取得，或透過本公司之贊助者或廣告商所刊登、銷售或交付之任何貨品或服務，您應自行承擔其可能風險或依法向商品或服務提供者交涉求償，與本公司完全無關，本公司均不負任何責任。</span>";
		 out+="            <span class='aggh1'>		 十三、服務之停止與更改： </span>";
		 out+="            <span class='aggh2'>		 1.於發生下列情形之一時，KYOMON有權停止或中斷提供服務：</span>";
		 out+="            <span class='aggint'>		  a)對KYOMON之設備進行必要之保養及施工時。</span>";
		 out+="            <span class='aggint'>		  b)發生突發性之設備故障時。</span>";
		 out+="            <span class='aggint'>		 c)由於KYOMON所申請之 ISP 業者無法提供服務時。</span>";
		 out+="            <span class='aggint'>		 d)因天災等不可抗力之因素致使KYOMON無法提供服務時。</span>";
		 out+="            <span class='aggint'>		 c)其他本公司不可預測之因素。</span>";
		 out+="            <span class='aggh2'>		 2.KYOMON可能因公司或 ISP 業者網路系統軟硬體設備之故障、失靈或人為操作上之疏失而造成全部或部份中斷、暫時無法使用、延遲或造成資料傳輸或儲存上之錯誤、或遭第三人侵入系統篡改或偽造變造資料等，KYOMON將盡力回復相關服務之正常運作，會員不得因此而要求任何補償。</span>";
		 out+="            <span class='aggh2'>		 3.如因故KYOMON網站須終止營運，KYOMON將於終止前於網站公告， </span>";
		 out+="            <span class='aggp'>		 您應自行保留使用KYOMON所生之各種資料或記錄。</span>";
		 out+="            <span class='aggh1'>		 十四、保管及通知義務：</span>";
		 out+="            <span class='aggp'>		 您有責任維持密碼及帳號的機密安全。除可依法證明非您本身或授意他人所為者外，您必須完全負起因利用該密碼及帳號所進行之一切行為之責任。</span>";
		 out+="            <span class='aggp'>		 當密碼或帳號遭到未經授權之使用，或發生其他任何安全問題時，您必須立即通知KYOMON，以減少相關損害。建議您於公用電腦使用完畢，務必登出您的帳號。因您未遵守本項約定所生之任何損失或損害，我們將無法亦不予負責。</span>";
		 out+="            <span class='aggh1'>		 十五、特別同意事項：</span>";
		 out+="            <span class='aggp'>		 您同意於KYOMON所發表之一切內容僅代表您個人之立場與行為，並同意承擔所有相關衍生之責任，KYOMON不負任何責任。</span>";
		 out+="            <span class='aggp'>		 您亦同意若因其他會員行為造成您權利的損害或其他困擾時，不會對KYOMON行使或主張任何權利或賠償。</span>";
		 out+="            <span class='aggh1'>		 十六、責任限制：</span>";
		 out+="            <span class='aggp'>		 您認知並了解KYOMON乃依其現狀及使用時之狀況提供服務，您須自行承擔使用KYOMON網站服務時之風險。KYOMON並未對網站服務可符合您使用上之需求及任何錯誤之修正為任何明示或默示的擔保。</span>";
		 out+="            <span class='aggp'>		 KYOMON對您使用KYOMON網站服務或與KYOMON網站連結之其他網站下載的圖檔、軟體或資料等，不負任何擔保責任。您應於下載前自行斟酌與判斷前述資料之合適性、有效性、正確性、完整性、及是否侵害他人權利，以免遭受損失，KYOMON對於該等損失不負任何賠償責任。</span>";
		 out+="            <span class='aggp'>		 您同意若依法KYOMON須負賠償責任時，單一事件之賠償上限為您於該賠償事件發生前一個月使用本網站特定服務產生之費用。</span>";
		 out+="            <span class='aggh1'>		 十七、擔保責任免除：</span>";
		 out+="            <span class='aggh2'>		 1.KYOMON保留隨時更改或調整各項服務內容之權利，無需事先通知會員。</span>";
		 out+="            <span class='aggp'>		 KYOMON得依其判斷對於違反會員規範或相關規定之會員帳號終止其使用之權利。無論任何情形，就停止或更改服務或終止會員帳號使用所可能產生之困擾、不便或損害，會員同意不對KYOMON有任何主張。</span>";
		 out+="            <span class='aggh2'>		 2.KYOMON保留將來新增、修改或刪除各項服務之全部或一部之權利，且不另行個別通知，會員不得因此而要求任何補償或賠償。</span>";
		 out+="            <span class='aggh2'>		 3.廠商或個人可能透過KYOMON之服務或經由服務連結至其他網站、營業處所提供商品買賣、服務或其他交易行為。會員若因此直接與該等廠商或個人直接進行交易，各該買賣或其他合約均僅存在您與各該廠商或個人兩造之間。KYOMON除聲明不介入兩造之任何行為外，對於您所獲得的商品、服務或其他交易標的物亦不負任何擔保責任。</span>";
		 out+="            <span class='aggh2'>		 4.KYOMON提供之特定服務可能存在專屬之服務條款，在此情形下，雙方權利義務將依據該服務之專屬條款決定之。</span>";
		 out+="            <span class='aggh1'>		 十八、廣告或促銷行為：</span>";
		 out+="            <span class='aggp'>		 KYOMON上有關商業廣告及各種商品之促銷資訊，該等內容均係由廣告商或商品服務提供人所為，KYOMON僅係提供刊登內容之平台。</span>";
		 out+="            <span class='aggp'>		 會員透過KYOMON上所提供之商品、服務資訊，所購買之任何非由KYOMON所直接販售之商品或服務，其間交易關係均存在於會員與商品或服務提供人間，與KYOMON無關。</span>";
		 out+="            <span class='aggh1'>		 十九、智慧財產權：</span>";
		 out+="            <span class='aggp'>		 KYOMON刊出之所有著作及資料（例如文章、圖片等）內容，其著作權、專利權、商標權、營業秘密及其他智慧財產權，皆為京門科技股份有限公司或該內容之提供者所有，且受中華民國法令及國際法律的保障。</span>";
		 out+="            <span class='aggp'>		 KYOMON畫面資料之選擇、編排之版權為京門科技股份有限公司所有，且受中華民國著作權法令及國際著作權法律的保障。非經本公司書面授權同意，不得以任何形式轉載、傳輸、傳播、散布、展示、出版、再製或利用</span>";
		 out+="            <span class='aggp'>		 KYOMON內容的局部、全部的內容，以免觸犯相關法律規定。未經本公司書面同意，您不得擅自複製、進行還原工程（reverse engineering）、解編（de-compile）或反向組譯（disassemble）KYOMON之任何功能或程式。</span>";
		 out+="            <span class='aggp'>		 除本公司外任何人不得逕行使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。如欲引用或轉載前述之軟體、程式或網站內容，必須依法取得本網站或其他權利人的事前書面同意。如有違反之情事，您應對本網站或其他權利人負損害賠償責任（包括但不限於訴訟費用及律師費用等）。</span>";
		 out+="            <span class='aggh1'>		 二十、連結：</span>";
		 out+="            <span class='aggp'>		 KYOMON在網站或相關網頁上所提供之所有連結，可能連結到其他個人、公司或組織之網站，提供該連結之目的，僅為便利站友搜集或取得資訊，KYOMON對於被連結之該等個人、公司或組織之網站上所提供之產品、服務或資訊，既不擔保其真實性、完整性、即時性或可信度，該等個人、公司或組織亦不因此而當然與KYOMON有任何僱佣、委任、代理、合夥或其他類似之關係。</span>";
		 out+="            <span class='aggh1'>		 二十一、損害賠償：</span>";
		 out+="            <span class='aggp'>		 因會員違反相關法令或違背本會員規範之任一條款，致KYOMON或其關係企業、受僱人、受託人、代理人及其他相關履行輔助人因而受有損害或支出費用（包括且不限於因進行民事、刑事及行政程序所支出之合理律師費用）時，會員應自行負擔損害賠償責任或填補其費用。</span>";
		 out+="            <span class='aggh1'>		 二十二、會員規範之修改：</span>";
		 out+="            <span class='aggp'>		 KYOMON有權於任何時間修改或變更本服務條款之內容，建議您隨時注意該等修改或變更。您於任何修改或變更後繼續使用本服務，視為您已閱讀、瞭解並同意接受該等修改或變更。如果您不同意本服務條款的內容，或者您所屬的國家或地域排除本服務條款內容之全部或一部時，您應立即停止使用本服務。</span>";
		 out+="            <span class='aggp'>		 當您開始使用本服務時，即表示您已充分閱讀、瞭解與同意接受本條款之內容。本公司有權於任何時間修改與變更本條款之內容，並將不個別通知會員，建議您定期查閱本服務條款。如您於本條款修改與變更後仍繼續使用本服務，則視為您已閱讀、瞭解與同意接受本條款修改或變更。</span>";
		 out+="            <span class='aggp'>		 本公司有權暫時或永久修改或中止提供本服務給您，您不得因此要求任何賠償。</span>";
		 out+="            <span class='aggh1'>		 二十三、個別條款之效力：</span>";
		 out+="            <span class='aggp'>		 本會員規範所定之任何會員條款之全部或部份無效時，不影響其他條款之效力。</span>";
		 out+="            <span class='aggh1'>		 二十四、準據法及管轄法院：</span>";
		 out+="            <span class='aggp'>		 本會員規範之解釋及適用以及會員因使用本服務而與KYOMON間所生之權利義務關係，應依中華民國法令解釋適用之。因此所生之爭議，除法律另有規定者外，以中華民國台北地方法院為第一審管轄法院。</span>";
		 out+="            <span class='aggh1'>		 二十五、其他規定</span>";
		 out+="            <span class='aggh2'>		 1.本網站使用者條約，免責之內容，亦構成本使用條款之一部分。</span>";
		 out+="            <span class='aggh2'>		 2.若因您使用本服務之任何行為，導致本公司遭第三人或行政機關之調查或追訴時，本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。</span>";
		 out+="            <span class='aggh2'>		 3.本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前告知會員，不可預料及無預警之系統崩潰必須暫停服務時不在此列。</span>";
		 out+="            <span class='aggh1'>		 二十六、會員身份終止與本公司通知之義務：</span>";
		 out+="            <span class='aggh2'>		 1.本公司具有更改各項服務內容或終止任一會員帳戶服務之權利。</span>";
		 out+="            <span class='aggh2'>		 2.若會員決定終止本公司會員資格，有義務經由本公司所提供之機制通知本公司，本公司將儘快註銷您的會員資料（以本公司發出通知日期為準），註銷後即喪失所有本公司提供之權益。</span>";
		 out+="            <span class='aggh1'>		 二十七、關於KYOMON上的虛擬貨幣與相關活動</span>";
		 out+="            <span class='aggh2'>		 1.KYOMON網站設有累積升級功能，每位已註冊的會員在網站上進行活動即可能依京門科技股份有限公司（KYOMON）之規定累積貢獻值，當貢獻值累積到一定點數後就可依KYOMON之公告活動內容規定參加京門科技股份有限公司（KYOMON）的活動。京門科技股份有限公司（KYOMON）保留變更或取消「貢獻值取得及使用內容方式」之權利，惟KYOMON於變更或取消前會先為公告於KYOMON網站，新的「貢獻值取得及使用內容方式」自公告時生效。</span>";
		 out+="            <span class='aggh2'>		 2.任何利用程式Bug或其他不正當方法賺取貢獻值，或竄改貢獻值之行為，京門科技股份有限公司（KYOMON）都可收回會員不當累積的貢獻值，或可取消活動或宣佈該次活動無效、或以其他適當方式處理之。</span>";
		 out+="            <span class='aggh2'>		 3.活動之中獎會員應自行負擔所有依政府法令規定之義務，例如稅賦。</span>";
		 out+="            <span class='aggh2'>		 4.會員如係無行為能力人，應由法定代理人或監護人代該會員以該會員帳號參加活動。</span>";
		 out+="            <span class='aggp'>		 會員如係限制行為能力人，其若欲參加活動應得法定代理人或監護人允許或輔助人之同意。</span>";
		 out+="            <span class='aggh2'>		 5.本站提供免運費服務的範圍只限台灣本島。若送貨地點為離島等地時，目前暫不提供寄送服務。</span>";
		popbaseu("會員規範",out,"");
	}
	popprivacy=function(){//隱私
		var out="";
		out+="            <span class='aggp'>		 ■KYOMON社群平台隱私權政策</span>";
		out+="            <span class='aggp'>		 「KYOMON社群平台」是由「京門科技股份有限公司」所經營；為了支持個人資料的保護，以維護線上隱私權，「KYOMON社群平台」謹以下列聲明，對外說明「KYOMON社群平台」相關網站在線上搜集使用者個人資料的方式、範圍、利用方法、以及查詢或更正的方式等事項</span>";
		out+="            <span class='aggp'>		 請您仔細閱讀以下各項說明，若您不同意我們的做法，請暫時不要參與我們網站上的活動。當然您也可以告訴我們您的想法，若有任何意見或疑問，請利用聯絡我們回報系統提出您的疑義。</span>";
		out+="            <span class='aggp'>		 ◎本隱私權政策適用範圍</span>";
		out+="            <span class='aggp'>		 本隱私權政策適用於KYOMON社群平台網站（本站）相關個人資料蒐集、處理及利用事宜。</span>";
		out+="            <span class='aggp'>		 本隱私權保護政策不適用於KYOMON社群平台以外的網站，您認知並了解瀏覽本站服務時，在某些情形下，您可能會因超連結而被導致第三者所提供之網站。例如：點選廣告、閱讀某則資訊或網友張貼之內容。本隱私權政策不適用於經前述超連結所指向的網站，因此，誠摯地在此提醒您，當您離開KYOMON社群平台進入其他網站時，請別忘了先閱讀該網站所提供的隱私權條款，再決定您是否繼續接受該網站的服務。</span>";
		out+="            <span class='aggp'>		 ◎個人資料取得</span>";
		out+="            <span class='aggp'>		 「KYOMON社群平台」會記錄使用者上站的位址、以及在「KYOMON社群平台」相關網站內的瀏覽活動等資料，但是這些資料僅供作流量分析和網路行為調查，以便於改善「KYOMON社群平台」相關網站的服務品質，這些資料也只是總量上的分析，不會和特定個人相連繫。</span>";
		out+="            <span class='aggp'>		 在某些情況下，例如當使用者要求加入會員或參加其他活動時，「KYOMON社群平台」相關網站或其合作對象可能會要求使用者登錄個人資料，以便於和使用者聯繫並提供服務；在此等情況下，「KYOMON社群平台」相關網站或其合作對象將明白告知使用者此等事實，如果使用者選擇不接收任何廣告或聯繫資訊，「KYOMON社群平台」將完全予以尊重。</span>";
		out+="            <span class='aggp'>		 「KYOMON社群平台」相關網站或網頁都可能包含其他網站或網頁的連結，對於此等不屬於「KYOMON社群平台」之網站或網頁，不論關於其內容或隱私權政策，均與「KYOMON社群平台」無關。</span>";
		out+="            <span class='aggp'>		 ◎個人資料蒐集應告知事項</span>";
		out+="            <span class='aggp'>		 蒐集主體：京門科技股份有限公司</span>";
		out+="            <span class='aggp'>		 蒐集之目的：</span>";
		out+="            <span class='aggp'>		 ○八八 消費者、客戶管理與服務、</span>";
		out+="            <span class='aggp'>		 一五○ 廣告和商業行為管理業務、</span>";
		out+="            <span class='aggp'>		 一七三 其他經營合於營業登記項目或組織章程所定之業務、</span>";
		out+="            <span class='aggp'>		 一七六 其他契約、類似契約或法律關係管理之事務或業務</span>";
		out+="            <span class='aggp'>		 個人資料之類別：</span>";
		out+="            <span class='aggp'>		 C○○一 識別個人者，如：姓名、電話號碼、地址、帳號等、</span>";
		out+="            <span class='aggp'>		 C○一一 個人描述，如：年齡、性別、出生年月日等、</span>";
		out+="            <span class='aggp'>		 C○三五 休閒活動及興趣、</span>";
		out+="            <span class='aggp'>		 C○七三 安全細節，如：本站密碼、</span>";
		out+="            <span class='aggp'>		 C一三二 未分類之資料，如：電子郵件往來、網站訊息往來。</span>";
		out+="            <span class='aggp'>		 個人資料利用期間：會員期間及會員關係終止後 6 個月，惟會員關係終止後 6 個月內之期間，我們不會就會員的資料為積極利用；</span>";
		out+="            <span class='aggp'>		 個人資料利用地區：本公司伺服器及備援伺服器所在地；</span>";
		out+="            <span class='aggp'>		 個人資料利用對象：限於本公司及為達成契約目的所必要之金流、物流、第三方廣告業者或其他協力廠商，若有與合作廠商共同蒐集之情形，將於蒐集時告知會員；</span>";
		out+="            <span class='aggp'>		 個人資料利用方式：於蒐集目的之特定範圍及依本隱私權政策為利用。</span>";
		out+="            <span class='aggp'>		 ◎個人資料蒐集之補充說明：</span>";
		out+="            <span class='aggp'>		 KYOMON社群平台將於下述情形蒐集您的個人資料：</span>";
		out+="            <span class='aggp'>		 1.當您加入KYOMON社群平台會員時，我們會要求您填寫基本的個人資料。</span>";
		out+="            <span class='aggp'>		 2.當您參加我們所舉辦的任何活動，我們將視活動性質而請您登錄相關個人資料；若有與廠商共同蒐集者，將於活動辦法中說明。</span>";
		out+="            <span class='aggp'>		 3.當您投稿、有客戶服務需求或其他有身分確認或金流往來之需求時，我們會基於稅法或核對身分需求，請您提供身分證影本、銀行帳戶或其他個人資料。</span>";
		out+="            <span class='aggp'>		 4.您於使用本站時，本站伺服器會自動留存您上線時間、IP位址及站內活動資訊。 </span>";
		out+="            <span class='aggp'>		 ◎個人資料的修改與刪除：</span>";
		out+="            <span class='aggp'>		 當您在KYOMON社群平台註冊成為會員後，除系統禁止變更之資料（例如：姓名、性別、生日、身份證字號等）外，您可以隨時利用您的會員帳號和密碼更改您原先提供的資料，以確保其正確性。</span>";
		out+="            <span class='aggp'>		 您認知並了解您所能修改的資料並不包括您以往在本站之服務內容記錄。</span>";
		out+="            <span class='aggp'>		 您認知並同意KYOMON社群平台於會員帳號刪除時，您的個人資料將保留至少 6 個月，以備相關爭議查證之用。為避免他人在帳號刪除時，重新註冊相同的會員帳號產生身分混淆困擾，該等帳號將保留不提供後續註冊使用。</span>";
		out+="            <span class='aggp'>		 ◎個人資料的揭露：</span>";
		out+="            <span class='aggp'>		 除依本隱私權政策為利用外，KYOMON社群平台不會在未經您同意的狀況下向任何人出售或提供您的個人資料。您同意KYOMON社群平台得於下述情形對外利用或揭露您的個人資料：</span>";
		out+="            <span class='aggp'>		 1.若您的行為違反KYOMON社群平台的服務條款，或可能損害KYOMON社群平台權益，或您的行為已導致任何人遭受損害，揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</span>";
		out+="            <span class='aggp'>		 2.檢警調或司法單位或其他有權機關依法或基於公共利益，要求KYOMON社群平台提供特定個人資料時，經KYOMON社群平台考量依法或基於公共利益予以配合者。</span>";
		out+="            <span class='aggp'>		 3.其他為履行法定義務或依法得對第三人揭露的情形。</span>";
		out+="            <span class='aggp'>		 為了保護使用者個人隱私，我們無法為您查詢其他使用者的帳號資料，敬請見諒！若您有相關法律上問題需查閱他人資料時，請務必向警政單位提出告訴，我們將全力配合警政單位調查並提供所有相關資料以協助調查。</span>";
		out+="            <span class='aggp'>		 ◎關於Cookie的使用： </span>";
		out+="            <span class='aggp'>		 「Cookie」是一種儲存於使用者電腦端的小型資訊檔案，可配合瀏覽器的使用作為使用者電腦與網站互動時識別或讀取使用者的偏好設定之用，為會員制網站所普遍使用。KYOMON社群平台為提昇使用者使用本站之便利性，若您的瀏覽器的偏好設定允許cookie，KYOMON社群平台網站伺服器將會送出 cookie 至您的電腦。您可以隨時變更您的瀏覽器的設定，決定是否允許KYOMON社群平台網站設定或讀取您電腦端的 cookie。</span>";
		out+="            <span class='aggp'>		 ◎兒童隱私保護：</span>";
		out+="            <span class='aggp'>		 KYOMON社群平台網站並未刻意設計或提供吸引兒童（未滿12歲）內容或機制，亦無意透過本站蒐集兒童或其法定代理人之個人資料。然而社群網站內容來源複雜，為確保兒童隱私權，若您為兒童，請勿註冊本站會員，並避免與陌生網友互動。</span>";
		out+="            <span class='aggp'>		 ◎個人資料處理委託第三人事宜</span>";
		out+="            <span class='aggp'>		 由於電子商務及其他線上服務無可避免需使用第三方所提供之金流、物流或直接由原廠或經銷商供貨或提供預購贈品、保固服務等，因此，有關電子商務或線上服務交易之必要資訊，將會提供予第三方進行處理及利用，我們將透過契約要求第三方合作廠商應依個人資料保護法等相關法令確保您個人資料之安全，並禁止第三方用於該交易以外之利用。若您發現有第三方有任何違反前開原則之行為時，請您儘速予我們聯繫，我們將協助您釐清個人資料是否遭第三方濫用或其他違法情形，以利您依法主張權利。</span>";
		out+="            <span class='aggp'></span>";
		out+="            <span class='aggp'>		 ■KYOMON社群平台著作權聲明</span>";
		out+="            <span class='aggp'>		 會員於使用本站服務或於本站發表圖文或其他著作前，請您先同意下列事項，若您不同意下列事項， 請勿使用本站服務或於本站發表著作。 </span>";
		out+="            <span class='aggp'>		 1.您保證您係為您所發表於KYOMON社群平台之文章及其他各種著作之著作人，或您確有得到著作權人之授權而發表，否則應對KYOMON社群平台負損害賠償責任。</span>";
		out+="            <span class='aggp'>		 2. KYOMON社群平台會員於KYOMON社群平台所發表之文章、圖像或其他各種著作之著作權為其著作權人所有。 </span>";
		out+="            <span class='aggp'>		 3. 若是您要重製、公開口述、公開播送、公開上映、公開演出、公開傳輸、改作、散布、公開展示、發行或公開發表任何KYOMON社群平台內登載之任何內容，請先得到著作權人之同意。尊重智慧財產權是您應盡的義務，如有違反，您應對權利人負損害賠償責任。</span>";
		out+="            <span class='aggp'>		 4.您若認為KYOMON社群平台網站內某些內容涉及侵權或有其他不妥之處，請您逕向該內容提供者反應意見。</span>";
		out+="            <span class='aggp'>		 5.您有權同意KYOMON社群平台得將會員發表於本站網域「.com.tw」及其下各次級網域內之著作以不同形式呈現及彙整於KYOMON社群平台網站中，以供網友查詢及閱讀。但於未經著作權人同意前，KYOMON社群平台無權將著作刊載於非網路形式之書報雜誌刊物。 </span>";
		out+="            <span class='aggp'>		 6.您同意瀏覽KYOMON社群平台網站之網友在非營利用途下，得下載或列印您所發表之圖文內容。 </span>";
		out+="            <span class='aggp'>		 7.您同意KYOMON社群平台之管理人員在註明著作人格權人名稱及不變更原圖文內容情況下，得以將圖文編排收錄至精華區中。 </span>";
		out+="            <span class='aggp'>		 8.您同意若您所發表之圖文或其他內容有違反本站會員條款或國家法令之情形時，KYOMON社群平台之管理人員得刪除之。</span>";
		out+="            <span class='aggp'>		 ◎電腦網路內容分級</span>";
		out+="            <span class='aggp'>		 根據「電腦網路內容分級處理辦法」修正條文第六條第三款規定，已於網站首頁或各該限制級網頁，依台灣網站分級推廣基金會規定作標示。台灣網站分級推廣基金會( TICRF ) 網站：http://www.ticrf.org.tw</span>";
		out+="            <span class='aggp'>		 兒少網路安全</span>";
		out+="            <span class='aggp'>		 兒童篇</span>";
		out+="            <span class='aggp'>		 1、如果在網路上看到讓你感覺怪怪的或不舒服的、令人討厭的文字、圖片或其他內容，請先暫時離開電腦，告訴你的家長，請他們幫忙；或是你可以先關掉網路，等到有大人陪你時再使用。</span>";
		out+="            <span class='aggp'>		 2、在網路上洩露自己的資訊給陌生人是很危險的，千萬不要告訴別人自己和家人的私人資料，像是本名、身分證字號、電話、地址、或學校等；也不要把網路帳號的密碼告訴任何人。</span>";
		out+="            <span class='aggp'>		 3、請遵守每個網站的遊戲規則，例如：當你看到網站上有註明「未滿十八歲者不可進入」，那你就應該立刻離開。</span>";
		out+="            <span class='aggp'>		 4、如果遇到很友善、有趣、對你很好的網友，要記得：在網路上認識的人，現實生活中你們還是陌生人，他們不一定和他們看起來的一樣好，或是跟他們形容的一樣，所以不要隨便跟網友見面。即使真的有見面的必要，也一定要有大人陪同，絕對不可以單獨見面。</span>";
		out+="            <span class='aggp'>		 5、收到不認識的人寄來的郵件，一定要立刻刪除，不要因為好奇而開啟附加檔案或連結，它很可能含有病毒，會損害你的電腦。</span>";
		out+="            <span class='aggp'>		 6、許多免費分享的檔案可能是非法的，請不要任意複製、下載來路不明的音樂、影片、或其他類型的檔案，以免觸犯法律。</span>";
		out+="            <span class='aggp'>		 7、請在網路上，任何人都可能看到你的行為，不可以對他人有不尊重的舉動。即使別人不知道你是誰，也不可以在網路上假扮成別人。</span>";
		out+="            <span class='aggp'>		 家長篇</span>";
		out+="            <span class='aggp'>		 使用網際網路是您的孩子必備的技能之一，網路雖然可以讓您的孩子學習更多知識，但也有許多不宜兒童發展的訊息是您的孩子隨手可得的，而且網路的匿名性也讓兒童易於在網路上進行不適當的互動。因此，當您的孩子要求使用網路時，請務必多加注意。遵守以下的幾項守則可以使您安心讓孩子們使用網路：</span>";
		out+="            <span class='aggp'>		 1、網路上可能有色情、暴力等成人取向的資訊，為了讓您的孩子能使用一個乾淨無害的網路空間，請教育您的孩子盡量不要開啟這類資訊。並且經常檢查您孩子的連線記錄，以便了解未成年的孩童是否瀏覽過不應觀看的網頁；您或可選擇啟用瀏覽器中的分級警告器，以遠離這些資訊。</span>";
		out+="            <span class='aggp'>		 2、您的孩子可能會洩露過多的個人資料給陌生人，這會威脅到您們的安全，請讓他們了解網路屬於公共場所，並督導他們不可將姓名、電話、地址、身分證字號等個人資料在網路上公開，以免受到有心人士利用。</span>";
		out+="            <span class='aggp'>		 3、請不要讓您的孩子在沒有大人的監督下使用網路，請將電腦放置在全家都可使用的位置如客廳，並盡量撥空陪同他們使用電腦，教導他們如何利用網路以擴展知識、進行有益身心的娛樂。</span>";
		out+="            <span class='aggp'>		 4、注意您的孩子在網路聊天室或留言板與他人的互動，請盡量不要讓您的孩子與網友會面，若有必要，也請您務必陪同他們，絕對不要讓孩子單獨與網友見面，並選擇安全的會面地點，盡量選在人多的公共場所，以便應付突發狀況。</span>";
		out+="            <span class='aggp'>		 5、網路上分享的許多圖片、音樂、影片或文字檔案仍受到著作權法的保護，請教導您的孩子尊重著作權，不要下載非法的MP3或其他類型的檔案。</span>";
		out+="            <span class='aggp'>		 6、孩童可能在不經意的狀況下誤使您的電腦受到病毒攻擊，請讓他們了解隨意下載軟體可能的危險性，不要任意開啟來路不明的電子郵件或下載不安全的軟體。</span>";
		out+="            <span class='aggp'>		 7、請指導您的孩子尊重他人，不要發表帶有人身攻擊的言論；並請多加留意孩童瀏覽的聊天室或留言版，檢查是否散播不適當的言論。</span>";
		out+="            <span class='aggp'>		 8、如果您的孩子希望在網路上購物，請他們務必在訂購物品前告訴您，不要讓他們在不安全的網站上進行交易，請選擇有信譽的網路賣場，並且注意商品的內容、金額及付款方式。</span>";
		out+="            <span class='aggp'>		 檢舉色情內容</span>";
		out+="            <span class='aggp'>		 請到終止童妓協會網站檢舉色情內容，以保護兒童上網安全。</span>";
            $.ajax({
                url:'/servicepolicy.html',
                type:'GET',
                success: function(data){
                    out = data;
                    popbaseu("隱私權保護聲明",out,"");
                }
            });
		//popbaseu("隱私權保護聲明",out,"");
	}
	pop_vrequest=function(x){//手機驗證提醒
		var out="";
		out+="                    <div class='formline'>\n";
		out+="							<span class='f16 bld'>";
		out+="                            請進行手機驗證，享有更完整功能及獎勵\n";
		out+="							</span>";
		out+="                    </div>\n";
		out+="                    <div class='formline'>\n";
		out+="						<div class='btn border5 submitclick submitclickr f16' data-type='vform' >立即驗證</div>";
		out+="                    </div>\n";
		popbase("系統提示",out,'');
	}
	pop_vform=function(x){//手機驗證表格
		var out="";
		out+="					  <span style='font-size:12px;line-height:16px;color:#555;'>";
		out+="                            完成後可使用完整功能及額外貢獻值獎勵\n";
		out+="					  </span>";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3 f16 bld'>手機驗證</div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='text'  value='+886' style='width:50px;margin-left:-10px;' class='vcont' placeholder='+xxx'>\n"; //20190522 Pman 加上placeholder
		out+="                            <input type='text'  value='' style='width:175px;margin:0 10px;'  class='vphone' placeholder='9xxxxxxxx'>\n";
		out+="                            <input type='submit'  name='submit' value='發送簡訊' class='btn border5 submitclick submitclickr ' style='display:inline-block;padding:0 5px;margin-left:0;width:26%;'  data-type='sendmes'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3 f16 bld' style='margin-left:60px; margin-right:-75px;width:24%'>輸入簡訊認證碼</div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='text'  value='' style='width:135px;margin:0 0 0 65px;' class='xmmsinput'>\n";
		out+="                            <input type='submit'  name='submit' value='送出' style='display:inline-block;padding:0 10px;margin-left:0;margin-right:70px;'  class='btn border5 submitclick submitclickr' data-type='vmes'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		popbase("手機驗證",out,'');
	}
	popaddfriend=function(x){//加朋友
		var out="";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3 tleft'>輸入邀請訊息</div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='text' class='addfriendtext' name='name' placeholder='寫一段話給對方吧?'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		out+="                    <div class='formline'>\n";
		out+="                        <div class='formitem formitem_3'></div>\n";
		out+="                        <div class='formitem formitem_3'>\n";
		out+="                            <input type='submit'  name='submit' value='送出' class='addfriend border5 ' data-type='addtext' data-val='"+x+"'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		popbase("邀請朋友",out,'');
	}
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
		out+="                            <input type='submit'  name='submit' value='送出' class='submitclickr maintemselect border5 ' data-type='"+x+"' data-val='99' data-id='"+y+"'>\n";
		out+="                        </div>\n";
		out+="                        <div class='clr'></div>\n";
		out+="                    </div>\n";
		popbase("檢舉",out,'');
	}
	popbase = function(x,y,z) { //title/內容/是否可以關閉
		var out="<div id='pop'>";
		if(z!="n"){
			out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
		}
		out+="	<div id='popin'>\n";
		if(z!='n'){
			out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
		}
		out+="		<div id='pophead'>"+x+"</div>\n";
		out+="			<div id='popbody' style='text-align:center;'>\n";
		out+=y;
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#pop").stop().fadeIn(400);
   };
	popbase_2 = function(x,y,z) { //title/內容/是否可以關閉
		var out="<div id='pop'>";
		if(z!="n"){
			out+="	<a href=''  class='popclose popclosebg' style='' ></a>";
		}
		out+="	<div id='popin'>\n";
		if(z!='n'){
			out+="	<a href=''  class='popclose popclosebtn' style='' ><i class='fa fa-times'></i></a>";
		}
		out+="		<div id='pophead_2'>"+x+"</div>\n";
		out+="			<div id='popbody' style='text-align:center;'>\n";
		out+=y;
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		$("#popin").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#pop").stop().fadeIn(400);
   };
	popbaseu = function(x,y,z) { //title/內容/是否可以關閉
		out="<div id='popu'>";
		if(z!="n"){
			out+="	<a href=''  class='popcloseu popclosebg' style='' ></a>";
		}
		out+="	<div id='popinu'>\n";
		if(z!='n'){
			out+="	<a href=''  class='popcloseu popclosebtn' style='' ><i class='fa fa-times'></i></a>";
		}
		out+="		<div id='popheadu'>"+x+"</div>\n";
		out+="			<div id='popbodyu'  style='text-align:center;'>\n";
		out+=y;
		out+="			</div>\n";
		out+="	</div>";
		out+="</div>";
		$("body").prepend(out);
		wh=$(window).height();
		$("#popbodyu").css("max-height",2*wh/3);
		$("#popu").show();
		myx=$("#popinu").outerHeight();
		$("#popu").hide();
		$("#popinu").css("top",(wh-myx)/2);
		$("#popinu").animate({"margin-top":20},500).animate({"margin-top":0},50);
		$("#popu").stop().fadeIn(400);

   };
   //跳出 chatroom
   popchatroom=function(x){
	   var out="";
	   out+="<div class='chatroom' data-id='"+x+"' id='chat"+x+"'>\n";
	   out+="	<div class='chattitle'>\n";
	   out+="		<div class='minchat chattitlebg' data-val='"+x+"'></div>";
	   out+="    	<span class='titlename' style='text-align:left;width:auto;'></span>\n";//這裡插入名字
	  // out+="      	<span class='fa-stack fR closechat' data-val='"+x+"'><i class='fa fa-circle  fa-stack-2x fagray'></i><i class='fa fa-times fa-stack-1x fayellow'></i></span>\n";
	   out+="       <span class='fR' ><i class='fa fa-times fagray closechat' style='font-size:17px;line-height:25px;' data-val='"+x+"'></i></span>\n";
	  // out+="       <span class='fR' style='font-size:17px;'><i class='fa fa-minus fagray minchat'  data-val='"+x+"'></i></span>\n";
	   //20181101 Pman 客戶端要求先隱藏多人聊天功能
	   //out+="       <span class='fR' ><i class='fa fa-plus fagray chatfriendclick' style='font-size:17px;line-height:25px;' data-val='"+x+"'></i></span>\n";
	   out+="   </div>\n";
	   out+="   <div class='chatfsearch'>\n";
	   out+="       <input type=text name='chatfsearchbox' class='chatfsearchbox' />\n";
	   out+="       <div class='sendbtn btn'>完成</div>\n";
	   out+="       <div class='chatauto'></div>\n";
	   out+="   </div>\n";
	   out+="   <div class='chatbox scrollable'>\n";

	   out+="   </div>\n";
	   out+="   <div class='chatinputbox'>\n";
	   out+="    	<div class='chatinputinbox'>\n";
	   out+="      	    <input type=text name='chatinput' class='chatinput' placeholder='請輸入對話' data-val='"+x+"' autocomplete='ppp'/>\n"; //20190109 Pman 關掉瀏覽器自動填寫
	   out+="           <i class='fa fa-smile-o fagray chaticonselect' data-val='"+x+"'></i>\n";
	   out+="           <div id='chatpicclick'>\n";
	   out+="           	<i class='fa fa-camera chatpicclickimg'></i>\n";
	   out+="               <form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='chatpicform'><input name='file' type='file' accept='image/gif, image/jpeg, image/png, image/jpg' class='fileupload instantupload' data-val='"+x+"' data-job='uploadchatroom' /></form>\n";//Pman
	   out+="           </div>\n";
	   out+="       </div>\n";
	   out+="   </div>\n";
	   out+="</div>\n";
	   $("body").append(out);
	   get_chat_content(x);//ajax.js
	   resetchatroom();//固定位置

   }
   // chatroom content
   chat_content=function(id,x){
	   var out="";
	   for(var a=0;a<x.length;a++){
		   if(x[a]['fromid']==sessionStorage.getItem("userid")){
			   out+="    	<div class='chatline2'>\n";

			    out+=insert_changerchat(x[a]);
			   /*
			   if(x[a]['content'].indexOf("src=")>0){
				   if(x[a]['content'].indexOf("upload")>0){
					   out+="<span class='chatimg popimgclick' data-type='chat' >"+x[a]['content']+"</span>";
				   }else{
					   out+="<span class='chatimg'>"+x[a]['content']+"</span>";
				   }
			   }else{
				   out+="           <span class='chattalk'>"+x[a]['content']+"</span>\n";
			   }
			   */
			   out+="           <div class='clr'></div>\n";
			   out+="       </div>\n";
		   }else if(x[a]['fromid']!='0'){
			   out+="    	<div class='chatline1'>\n";
				   if(x[a]['name']){
					   out+="        	<img src='uploadfile/"+x[a]['name']+"' class='chatlinehead pageclick' data-type='mypage' data-val='1' data-id='"+x[a]['fromid']+"'  />\n";
				   }else{
					   out+="        	<img src='img/basichead.png' class='chatlinehead pageclick' data-type='mypage' data-val='1' data-id='"+x[a]['fromid']+"'  />\n";
				   }
				    out+=insert_changerchat(x[a]);
				    /*
				   if(x[a]['content'].indexOf("src=")>0){
					   if(x[a]['content'].indexOf("upload")>0){
						   out+="<span class='chatimg popimgclick' data-type='chat'>"+x[a]['content']+"</span>";
					   }else{
						   out+="<span class='chatimg'>"+x[a]['content']+"</span>";
					   }
				   }else{
					   out+="           <span class='chattalk'>"+x[a]['content']+"</span>\n";
				   }
				   */
			   out+="           <div class='clr'></div>\n";
			   out+="       </div>\n";
		   }else{
				   out+="<div class='chatline3'>"+x[a]['content']+"</div>";
			}
	   }
	   $("#chat"+id+" .chatbox").append(out);
	   $("#chat"+id+" .chatbox").stop().animate({scrollTop :100000},200);
   }
   insert_changerchat=function(x){
		var nx=x;
		nx['content']=unescape(nx['content']);
		console.log(nx['content']);
		if(nx['content'].indexOf("https://www.youtube.com/watch?v=")==0){ //20190321 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
			var yy=nx['content'].split("https://www.youtube.com/watch?v=")[1]; //20190321 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
			newx="<div class='chatline3'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>";
			//newx="<div class='box photo'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><span class=time>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("https://m.youtube.com/watch?v=")==0){ //20190321 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
			var yy=nx['content'].split("https://m.youtube.com/watch?v=")[1]; //20190321 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
			newx="<div class='chatline3'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>";
		}else if(nx['content'].indexOf("https://youtu.be/")==0){
			var yy=nx['content'].split("https://youtu.be/")[1];
			newx="<div class='chatline3'><iframe width='100%' height='150' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>";
		}else if(nx['content'].indexOf("twitch.tv/")>=0){
			var yy=nx['content'].split("twitch.tv/")[1];
			var yyy=yy.split("/v/");
			if(yyy.length>1){
				newx="<div class='chatline3'><iframe src='https://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='100%' height='150' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe></div>";
			}else{
				newx="<div class='chatline3'><iframe src='https://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='100%' height='150' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe></div>";
			}
		}else if(nx['content'].indexOf("http://")==0){
			newx="<div class='chatline3'><a href='"+nx['content']+"' target='_new'>"+nx['content']+"</a></div>";
		}else if(nx['content'].indexOf("https://")==0){
			newx="<div class='chatline3'><a href='"+nx['content']+"' target='_new'>"+nx['content']+"</a></div>";
		}else if(nx['content'].indexOf("src=")>0 && nx['content'].indexOf("upload")>0){//上傳
			newx="<span class='chatimg popimgclick' data-type='chat'>"+nx['content']+"</span>";
			//newx="<div class='box photo'><a href='"+nx['content']+"'>"+nx['content']+"</a><span class='time'>"+mtime+"</span></div>";
		}else if(nx['content'].indexOf("src=")>0){//表情
			var ttt=nx['content'].replace(/img\//g, "../img/");
			newx="<span class='chatimg'>"+nx['content']+"</span>";
			//newx="<div class='box photo'>"+ttt+"<span class='time'>"+mtime+"</span></div>";
		}else{
			newx="<span class='chattalk'>"+nx['content']+"</span>";
		}
		//newx=newx.replace(/upload/g, "../upload");
	   return newx
   }
   //斷航---動態/動態回復/攻略回復--其他用了要換掉...因為有去</div>功能..要小心用
   nl2br=function(x){
	 //   if(x.indexOf("newsfilebox")>0){//有圖
			x=unescape(x); //20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
			xa=x.replace("<div class=newstextbox>","<div class=\"newstextbox\">");
			xa=xa.replace("<div class=\"newstextbox\">","<div class=\"newstextbox\">\n");
	 		xa=xa.replace("<div class=newsfilebox>","<div class=\"newsfilebox\">");
			xa=xa.replace("<div class=\"newsfilebox\">","\n<div class=\"newsfilebox\">");
			xa=xa.replace("</div>","\n</div>");	//2017-9 把收尾也段行
			var xx2="";
			var x2="";
			if(xa){
				xx=xa.split("\n");
				for(var a=0;a<xx.length;a++){
					if(xx2.length>1){
						xx2+="\n";
					}
					if(xx[a].indexOf("https://www.youtube.com/watch?v=")==0){ //20190327 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
						var yy=xx[a].split("https://www.youtube.com/watch?v=")[1]; //20190327 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
						xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
					}if(xx[a].indexOf("https://m.youtube.com/watch?v=")==0){ //20190327 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
						var yy=xx[a].split("https://m.youtube.com/watch?v=")[1]; //20190327 Pman 因為有先做unescape，所以"="會先被還原，因此修改判斷方式
						xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
					}if(xx[a].indexOf("https://youtu.be/")==0){
						var yy=xx[a].split("https://youtu.be/")[1];
						xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
					}else if(xx[a].indexOf("twitch.tv/")>=0){
						var yy=xx[a].split("twitch.tv/")[1];
						var yyy=yy.split("/v/");
						if(yyy.length>1){
							xx2+="<iframe src='https://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
						}else{
							xx2+="<iframe src='https://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
						}

					}else if(xx[a].indexOf("http://")==0){
						xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
					}else if(xx[a].indexOf("https://")==0){
						xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
					}else{
						xx2+=xx[a];
					}
				}
				xx2=xx2.replace("<div class=\"newstextbox\">\n","<div class=\"newstextbox\">");
				xx2=xx2.replace("\n</div>","</div>"); //20190111 Pman 輸出時，會有多餘的br，因為前面加了\n，忘了移除，所以移掉它.....上一版改錯了
				xx2=xx2.replace("\n<div class=\"newsfilebox\">","<div class=\"newsfilebox\">");
				x2=xx2.replace(/\n/g, "<BR>");
			}

		//}
		return x2;
   }

 
   //斷航-去頭版
   nl2brx=function(x){
		var xa=x;
		xa=xa.replace("<div class=newstextbox>","");
		xa=xa.replace("<div class=\"newstextbox\">","");
		xa=xa.replace("</div>","");
		var xx2="";
		var x2="";
		if(xa){
			xx=xa.split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx2.length>0){
					xx2+="\n";
				}
				if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("twitch.tv/")>=0){
					var yy=xx[a].split("twitch.tv/")[1];
						//if(yy.indexOf("</div>")>0){
						//	yy=yy.split("</div>")[0];
						//}
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						xx2+="<iframe src='https://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}else{
						xx2+="<iframe src='https://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}

				}else if(xx[a].indexOf("http://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else if(xx[a].indexOf("https://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else{
					xx2+=xx[a];
				}
			}
			x2=xx2.replace(/\n/g, "<BR>");
		}
	   return "<div class=\"newstextbox\">"+x2+"</div>";
   }
   //斷航-簡易版
   nl2brs=function(x){
	   x=unescape(x); //20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		var xa=x;
		var xx2="";
		var x2="";
		if(xa){
			xx=xa.split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx[a].indexOf("https://www.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v&#061;")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v&#061;")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					xx2+="<iframe width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
				}else if(xx[a].indexOf("twitch.tv/")>=0){
					var yy=xx[a].split("twitch.tv/")[1];
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						xx2+="<iframe src='https://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;'  autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}else{
						xx2+="<iframe src='https://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>";
					}

				}else if(xx[a].indexOf("http://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else if(xx[a].indexOf("https://")==0){
					xx2+="<a href='"+xx[a]+"' target='_new' class='inpagelink'>"+xx[a]+"</a>";
				}else{
					xx2+=xx[a];
				}
				if(a<(xx.length-1)){
					xx2+="\n";
				}
			}
			x2=xx2.replace(/\n/g, "<BR>");
		}
	   return x2;
   }
   //反轉 n12bt
   br2nl=function(x){
	   x=unescape(x); //20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		var xa=x;
		//xa=xa.replace("<div class=newstextbox>","");
		//xa=xa.replace("</div>","");
		xa=xa.replace(/<br>/g, "\n");
		var xx=xa.split("\n");
		var xx2="";
		for(var a=0;a<xx.length;a++){
			if(xx[a].indexOf("https://www.youtube.com/embed/")>0){
				var yy=xx[a].split("https://www.youtube.com/embed/")[1];
				var yyb=yy.split("'")[0];
				yyb=yy.split("\"")[0];
				if(xx2){
					xx2+="\nhttps://www.youtube.com/watch?v="+yyb;
				}else{
					xx2+="https://www.youtube.com/watch?v="+yyb;
				}
			}else if(xx[a].indexOf("https://player.twitch.tv/?")>0){
				var yy=xx[a].split("https://player.twitch.tv/?")[1];
				var yyy=yy.split("video=v");
				if(yyy.length>1){
					var yyy2=yyy[1].split("&")[0];
					if(xx2){
						xx2+="\nhttps://www.twitch.tv/v/"+yyy2;
					}else{
						xx2+="https://www.twitch.tv/v/"+yyy2;
					}
				}else{
					var yyy2=yy.split("channel=")[1];
					var yyy3=yyy2.split("'")[0];
					yyy3=yyy2.split("\"")[0];
					if(xx2){
						xx2+="\nhttps://www.twitch.tv/"+yyy3;
					}else{
						xx2+="https://www.twitch.tv/"+yyy3;
					}
				}
			}else if(xx[a].indexOf("href=\"")>=0){
				var yy=xx[a].split("href=\"")[1];
				var yyb=yy.split("\"")[0];
				if(xx2){
					xx2+="\n"+yyb;
				}else{
					xx2+=yyb;
				}
			}else{
				if(xx2){
					xx2+="\n"+xx[a];
				}else{
					xx2+=xx[a];
				}
			}
		}
	   return xx2;
   }
   //轉換時間
   chk_timeitem=function(){
	   run_timeitem();
	   var timechk=setInterval(function(){
		 run_timeitem();
	    },30000);
   }
   set_video=function(){
				var myVid=$("video");
				for(var a=0;a<myVid.length;a++){
					var temp=myVid.eq(a);
					temp.on('loadedmetadata', function() {
  							temp.prop("currentTime",2);
					});
				}
   }
   run_timeitem=function(){
	   var nowx = new Date().getTime();
	   tlist=$(".timeitem");
	   for(var a=0;a<tlist.length;a++){
		   if(tlist.eq(a).data("t")){
				var n=new Date( Date.parse(tlist.eq(a).data("t").replace(/-/g,"/") )).getTime();
				if((nowx-n)<1000*60*60*24){//10小時內
					var k=nowx-n;
					if(k>1000*60*100){//超過小時
						sh=Math.floor(k/(1000*60*60));
						tlist.eq(a).html("於"+sh+"小時前");
					}else if(k>1000*60){
						sh=Math.floor(k/(1000*60));
						tlist.eq(a).html("於"+sh+"分鐘前");
					}else{
						tlist.eq(a).html("於剛剛");
					}
				}else{
					var n=new Date( Date.parse(tlist.eq(a).data("t").replace(/-/g,"/") ));
					tlist.eq(a).html(n.getFullYear()+"年"+(n.getMonth()+1)+"月"+n.getDate()+"日 "+ run_addZero(n.getHours())+":"+run_addZero(n.getMinutes()));
				}
		   }
	   }
   }
	run_addZero=function(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	//計算高度
	run_chknewstext=function(x){
		var allh=18*20;
		for(var a=0;a<x.length;a++){
			chk=x.eq(a).height();
			if(chk>allh){
				x.eq(a).css("height",allh-155);//長文張折疊的高度計算 ==> Pman
				x.eq(a).append("<div class='newstextmore'>......繼續閱讀</div>");
			}
		}
	}
	// AJAX  JASON
 	ajaxarr=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		var temp=y;
		var ntemp
		for(var a=0;a<temp.length;a++){
			if($.isArray(temp[a])){
			}else if(temp[a] && temp[a].length>0){
				temp[a] = temp[a].replace("https","QQHUIRCAJOSDIJDOW");
				temp[a] = temp[a].replace("http","VMASODIWEJWOJEO");
			}else{
			}
		}
		return  $.ajax({
			 type:'GET',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":temp,"timtess":$.now()}
		});

	};

 	ajaxarr2=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		var temp=y;
		var ntemp
		for(var a=0;a<temp.length;a++){
			if($.isArray(temp[a])){
			}else if(temp[a] && temp[a].length>0){
				temp[a] = temp[a].replace("https","QQHUIRCAJOSDIJDOW");
				temp[a] = temp[a].replace("http","VMASODIWEJWOJEO");
			}else{
			}
		}
		return  {
			 type:'GET',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":temp,"timtess":$.now()}
		};

	};
 	ajaxarrval=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		return  $.ajax({
			 type:'GET',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":y,"timtess":$.now()}
		});
	};
 	ajaxarrpost=function(x,y,z){	//兩個項目的 ajax	 x=程式變數  y1,y2=網頁變數	..回復 array..第三個是頁面
		return  $.ajax({
			 type:'POST',
			 dataType: "json",
			 url:z,
			 data:{"job":x,"val":y,"timtess":$.now()}
		});
	};

 	cleanhref= function(x) {
		temp=x;
		if(temp.indexOf("/")>=0){
			temp=temp.substring(temp.lastIndexOf('/') + 1);
		}
		return temp;
	};
   popclose= function() {
		$("#popin").stop().animate({"margin-top":-600},500);
		$("#pop").delay(400).stop().fadeOut(300).remove();
   }
   popcloseu= function() {
		$("#popinu").stop().animate({"margin-top":-600},500);
		$("#popu").delay(400).stop().fadeOut(300).remove();
		if($(".mce-floatpanel").length>0){
			$(".mce-floatpanel").remove();
			$("#mce-modal-block").hide();
		}
   }
   popcloseu2= function() {
		$("#popinu").stop().animate({"margin-top":-600},500);
		$("#popu").delay(400).stop().fadeOut(300).remove();
   }
	changeimg=function(x){
		temp=x.attr("src");
		tempb=temp.split("_x");
		if(tempb[1]){
			x.attr("src",tempb[0]+tempb[1]);
		}else{
			tempb=temp.split(".j");
			if(tempb[1]){
				x.attr("src",tempb[0]+"_x.j"+tempb[1]);
			}else{
				tempb=temp.split(".p");
				x.attr("src",tempb[0]+"_x.p"+tempb[1]);
			}
		}
	}
	//form validation
	vaccount=function(x,z){
		var a = x.val();
		var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9_.-]+.[a-z]{2,4}$/;
		var numbers = /^[-+]?[0-9]+$/;
		if(filter.test(a)){//email
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else if(a.length> 8 && a.match(numbers) ){//phone
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	vemail=function(x,z){
		var a = x.val();
		var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
		if(filter.test(a)){
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	vtext=function(x,y,z,mx){
		if(x.val().length> mx){
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}else if(x.val().length < y){
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}else{
			x.removeClass("forminput");
			x.parent(".formitem").children(".formerr").hide();
			return true;
		}
	}
	 vnum=function(x,y,z,mx){
		var numbers = /^[-+]?[0-9]+$/;
		if(x.val().match(numbers) && x.val() >=y && x.val()<=mx){
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	vdate=function(x){
		t=Date.parse(x.val());
		if(isNaN(t)){
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}else{
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}
	}
	 vcheck=function(x,z){
		var numbers = /^[-+]?[0-9]+$/;
		if(x.is(':checked')){
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			popnotice("請確認"+z);
			return false;
		}
	}
	 vcheckb=function(x,z){
		var numbers = /^[-+]?[0-9]+$/;
		if(x.is(':checked')){
			x.parent(".formitem").children(".formerr").hide();
			x.removeClass("forminput");
			return true;
		}else{
			x.addClass("forminput");
			x.parent(".formitem").children(".formerr").show();
			return false;
		}
	}
	tinysetup=function(x){
		if(tinymce){
			tinymce.remove();
		}
//20190307 Pman 關掉螢幕功能
//20190307 Pman 修改image上傳的功能，不確定這樣做會出甚麼問題.....
		tinymce.init({
			language:"zh_TW",
			valid_children : "+body[style],+body[link]",
			theme_advanced_font_sizes: "12px,14px,15px,16px,18px,21px,24px",
			font_size_style_values : "12px,14px,15px,16px,18px,21px,24px",
			selector: x,
			plugins: [
									"advlist autolink lists link image charmap print preview anchor",
									"searchreplace visualblocks code",
									"table contextmenu paste",
									"textcolor"
			],
			toolbar: "insertfile undo redo | sizeselect fontsizeselect bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",//20190418 Pman 加上字型大小選擇
			fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 72pt",//20190418 Pman 加上字型大小選擇
			// without images_upload_url set, Upload tab won't show up
			images_upload_url: 'up.php',

			
			// override default upload handler to simulate successful upload
			images_upload_handler: function (blobInfo, success, failure) {
				var xhr, formData;
			  
				xhr = new XMLHttpRequest();
				xhr.withCredentials = false;
				xhr.open('POST', '../js/tinymce/up.php');
			  
				xhr.onload = function() {
					var json;
				
					if (xhr.status != 200) {
						failure('HTTP Error: ' + xhr.status);
						return;
					}
				
					json = JSON.parse(xhr.responseText);
				
					if (!json || typeof json.location != 'string') {
						failure('Invalid JSON: ' + xhr.responseText);
						return;
					}
				
					success(json.location);
				};
			  
				formData = new FormData();
				formData.append('file', blobInfo.blob(), blobInfo.filename());
			  
				xhr.send(formData);
			},
		});
	}
	topnavchange=function(curpage,x){
		var showkey="";
		if(curpage=="wallpage"){
			showkey="wallpage";
		}else if(curpage=="friendpage"){
			showkey="friendpage";
		}else if(curpage=="matchpage"){
			showkey="matchpage";
		}else if(curpage=="articlepage" || curpage=="publishpage"){
			showkey="articlepage";
		}else if(curpage=="rankpage"){
			showkey="rankpage";
		}else if(curpage=="qnapage"){
			showkey="qnapage";
		}else if(curpage=="actpage"){
			showkey="actpage";
		}else if(curpage=="shoppage"){
			showkey="shoppage";
		}else if(curpage=="collectpage"){
			showkey="collectpage";
		}else if(curpage=="mypage"){
			showkey="mypage";
		}
		$(".topnavclick").removeClass("on");
		$(".leftinfoselectitem").removeClass("leftinfoselectitemon");
		navlist=$(".topnavclick");
		navlist.eq(7).children("img").attr("src","img/nav_shop.png");
		for(var a=0;a<navlist.length;a++){
			if(navlist.eq(a).data("type")==showkey){
				navlist.eq(a).addClass("on");
				if(a==7){
					navlist.eq(7).children("img").attr("src","img/nav_shopo.png");
				}
			}
		}
		navlistx=$(".leftinfoselectitem");
		for(var a=0;a<navlistx.length;a++){
			if(navlistx.eq(a).data("type")==showkey){
				if(showkey=="mypage"){
					if(navlistx.eq(a).data("val")==x){
						navlistx.eq(a).addClass("leftinfoselectitemon");
					}
				}else{
					navlistx.eq(a).addClass("leftinfoselectitemon");
				}
			}
		}

	}
	mynav_change=function(x){
		$(".mysubclick").removeClass("on");
		$(".mysubclick").eq(x-1).addClass("on");

	}
	print_shopitem=function(data){
		out="";
		out+="                    	<!--product item-->\n";
		out+="                        <div class='storeitembox'>\n";
		if((data['vopen']=="2" && parseInt(data['qty'])>0) || data['vopen']=="1"){
			out+="                        	<img src='img/product/product"+data['thisid']+"_s.jpg'   class='btn storeitemclickb' data-val='"+data['thisid']+"'/>\n";
		}else{
			out+="                        	<img src='img/product/product"+data['thisid']+"_s.jpg'  />\n";
		}
		out+="                            <div class='storeitemtitle'>"+data['productname']+"</div>\n";
		out+="                            <div class='storeitembody txtcenter'>\n";
		if((data['vopen']=="2" && parseInt(data['qty'])>0) || data['vopen']=="1"){
			out+="                            	<div class='btn storeitemclick ' data-val='"+data['thisid']+"'>了解更多</div>\n";
		}else{
			out+="                            	<div class='btn storeitemclick emp ' >缺貨中</div>\n";
		}
		//out+="                            	<P class='storeitemlikes'><SPAN class='fL'>"+data['dispoints']+"</SPAN> <span class='bgipdis fL'></span><div class='clr'></div></P>\n";
		out+="                            </div>\n";
		out+="                        </div>\n";
		out+="                        <!--item end-->\n";

		return out;
	}
	print_articleitem=function(data,x){
		point010="";
		if(sessionStorage.getItem("userid")){
			mem=JSON.parse(sessionStorage.getItem("member"));
			if(sessionStorage.getItem("point010")){
				point010=JSON.parse(sessionStorage.getItem("point010"));
			}
		}
		out="";
		out+="    					<!--product item-->\n";
		out+="                        <div class='storeitemboxa'>\n";
		if(x==2){
			if(data['thisfile']){
				out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='pageclick'  data-type='publishpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='btn pageclick' data-type='publishpage' data-val='"+data['thisid']+"'/>";
			}
		}else{
			if(data['thisfile']){
				out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='btn pageclick'  data-type='artpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='btn pageclick' data-type='artpage' data-val='"+data['thisid']+"'/>";
			}
		}
		out+="                            <div class='storeitemname'><i class='fa fa-pencil'></i> "+data['name']+"</div>\n";
		out+="                            <div class='storeitemtitle'>"+data['thistitle']+"</div>\n";
		if(sessionStorage.getItem("userid")==data['memberid']){//20190327 Pman 修改列表頁輸出樣式，去除「看攻略」按鈕，數量與火焰往下移動
			//out+="                            <div class='storeitemlikes'></div>";
			out+="<div class='storeitembody storeitemlikes'><span class='bgipoff fR'></span> <span class='fR'>"+data['likes']+"</span>\n";//Pman //20190326 Pman 將like的數量、icon改成齊右、對調數字與火焰
			out+="                            	<P class='artcilenotes'>留言("+data['reply']+") 收藏("+data['saves']+") </P>\n";
			out+="                            </div>\n";
		}else{
			flag=0;
			if(point010 && point010.length>0){
				for(var a=0;a<point010.length;a++){
					if(point010[a]['note']==data['contentid']){
						flag=1;
						break;
					}
				}
			}else if(sessionStorage.getItem("userid")){
			}else{
				flag=1;
			}
			
			//out+="                            <div class='storeitemlikes'></div>";
			out+="                            <div class='storeitembody storeitemlikes'>\n";
			if(flag==1){
				out+="<span class='fR'>"+data['likes']+"</span> <span class='bgipoff fR'></span>\n"; //20190328 Pman like的數量、icon改成齊右 
			}else{
				out+="<span class='bgipoff fR' data-type='news' data-id='"+data['contentid']+"'></span> <span class='fR newspointsbox'>"+data['likes']+"</span>\n";//Pman //20190311 Pman 客戶要求將like的數量、icon改成齊右 //20190326 Pman 對調數字與火焰
			}
			out+="                            	<P class='artcilenotes'>留言("+data['reply']+") 收藏("+data['saves']+") </P>\n";
			out+="                            </div>\n";
		
		}
		
		out+="                        </div>\n";
		out+="    					<!--item end-->		\n";
		return out;
	}
	print_articleitemc=function(data,x){
		out="";
		out+="    					<!--product item-->\n";
		out+="                        <div class='storeitemboxc'>\n";
		if(x==2){
			if(data['thisfile']){
				out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='pageclick'  data-type='publishpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='btn pageclick' data-type='publishpage' data-val='"+data['thisid']+"'/>";
			}
		}else{
			if(data['thisfile']){
				out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='btn pageclick'  data-type='arcpage' data-val='"+data['thisid']+"' />\n";
			}else{
				out+="<img src='img/storetemp.jpg'   class='btn pageclick' data-type='arcpage' data-val='"+data['thisid']+"'/>";
			}
		}
		out+="                            <div class='storeitemnamec'><i class='fa fa-pencil'></i> "+data['name']+"</div>\n";
		out+="                            <div class='storeitemtitle'>"+data['thistitle']+"</div>\n";

		out+="                            <div class='storeitembody'>\n";
		if(x==2){
			out+="                            	<div class='btn pageclick storeitemclickx fR' data-type='publishpage' data-val='"+data['thisid']+"'>看攻略</div>\n";
		}else{
			out+="                            	<div class='btn pageclick storeitemclickx fR' data-type='artpage' data-val='"+data['thisid']+"'>看攻略</div>\n";
		}
		out+="                            </div>\n";
		out+="                        </div>\n";
		out+="    					<!--item end-->		\n";
		return out;
	}
	print_qnaitem=function(xdata,w){
		var xout="";
		mem=JSON.parse(sessionStorage.getItem("member"));
		haswin=0;
		for(var b=0;b<xdata['reply'].length;b++){
			if(xdata['reply'][b]['winner']==1){
				haswin=1;
			}
		}
		xout+="	                        	<div class='mainitem delhide'>";
		if(haswin==1){
			xout+="                            	<div class='mainitemtitle1'>\n";
		}else{
			xout+="                            	<div class='mainitemtitle2'>\n";
		}
		xout+="                                	<div class='mainitemimg'>\n";
		xout+="	                            <a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'>\n"; //20180905 Pman QA頭像加上連結
		if(xdata['userpic']){
			xout+="<img src='uploadfile/"+smallpics(xdata['userpic'])+"' />\n";
		}else{
			xout+="<img src='img/basicheads.png' />\n";
		}
		xout+="								</a>\n";
		xout+="									</div>\n";
		xout+="                                 <div class='mainitemtitletext'>\n";
		if(sessionStorage.getItem("userid")){
			xout+="                                    	<div class='mainitemtitleselect'>\n";
			xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
			xout+="                                                <ul class='mainitemtitleselectlist'>\n";
			if(sessionStorage.getItem("userid")==xdata['uid']){
				xout+="                                                <li class='maintemselect'  data-type='qna'  data-val='4' data-id='"+xdata['thisid']+"'>編輯</li>\n";
				xout+="                                                <li class='maintemselect'  data-type='qna'  data-val='3' data-id='"+xdata['thisid']+"'>刪除</li>\n";
			}else{
				xout+="                                                <li class='maintemselect'  data-type='qna'  data-val='1' data-id='"+xdata['thisid']+"'>檢舉</li>\n";
				if(xdata['istrack']==1){ //這事顯示我的追蹤
					xout+="                                                <li class='maintemselect'  data-type='qna'  data-val='5' data-id='"+xdata['thisid']+"'>取消追蹤</li>\n";
				}else{
					xout+="                                                <li class='maintemselect'  data-type='qna'  data-val='5' data-id='"+xdata['thisid']+"'>追蹤</li>\n";
				}
			}
			xout+="                                                <li class='maintemselect' data-val='9' data-type='qnapage'  data-id='"+xdata['thisid']+"'>分享</li>\n";
			xout+="                                            	</ul>\n";
			xout+="                                        </div>\n";
		}else{
			xout+="                                    	<div class='mainitemtitleselect'>\n";
			xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
			xout+="                                                <ul class='mainitemtitleselectlist'>\n";
			xout+="                                                <li class='maintemselect' data-val='9' data-type='qnapage'  data-id='"+xdata['thisid']+"'>分享</li>\n";
			xout+="                                            	</ul>\n";
			xout+="                                        </div>\n";
		}
		xout+="                                        <div class='qauserwrap' >\n";
		if(haswin==1){
			xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><h1 class='qnauserw'>"+xdata['user']+"</h1></a>\n";
		}else{
			xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><h1 class='qnauser'>"+xdata['user']+"</h1></a>\n";
		}
		xout+="                                            <h6 class='timeitem' data-t='"+xdata['dateadd']+"'>"+xdata['dateadd']+"</h6>\n";
		xout+="                                        </div>\n";
		xout+="                                        <div class='qatitlewrap' >\n";
		xout+=unescape(xdata['thistitle']); //20190321 Pman 將原本轉換掉的emoji，再轉回來，換行字元也會轉回來
		xout+="                                        </div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		//title end
		xout+="                                <div class='mainitemcontent'>\n";
		xout+="                                	<div class='mainitemcontenttop'>\n";
		xout+=nl2br(xdata['thiscontent']);
		xout+="                                    </div>\n";
		xout+="                                	<div class='mainitemcontenttag'>\n";
		if(xdata['tag']){
			xout+=xdata['tag'];
		}
		xout+="                                    </div>\n";
		xout+="                                    <div class='mainitemcontentpoint'>\n";
		xout+="											<div class='storeitemlikes2'><span class='bgipoff fR noclick'></span><span class='fR'>"+xdata['points']+"</span> </div>\n";//Pman
		//xout+="                                        <P class='fL'><span class='bgip'></span> +"+xdata['points']+"</P>\n";
		//xout+="                                        <div class='qa_ansbox border5 fR'>回答("+xdata['reply'].length+")</div>\n";
		xout+="											<p class='artpagetag'>";
		if(haswin==1){
		}else{
			xout+="回答("+xdata['reply'].length+") ";
		}
		xout+="追蹤("+xdata['als']+") </p>\n";
		//xout+="                                        <div class='qa_knowbtn border5 fR' data-val='"+xdata['thisid']+"'>我也想知道("+xdata['als']+")</div>\n";
		xout+="                                        <div class='clr'></div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemreply'>\n";
		if((xdata['reply'].length-4)>0){
			xout+="<div class='replyshowall'>尚有"+(xdata['reply'].length-4)+"篇回答,看全部</div>";
		}

		for(var b=0;b<xdata['reply'].length;b++){
			xout+="                                	<!--reitem-->\n";

			if((xdata['reply'].length-b)>4){
				xout+="                                	<div class='mcreplyitem' style='display:none;'>\n";
			}else{
				xout+="                                	<div class='mcreplyitem'>\n";
			}
			xout+="                                		<div class='mcreplyicon'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' >\n";//20180906 Pman 頭像加上連結
			if(xdata['reply'][b]['userpic']){
				xout+="<img src='uploadfile/"+smallpics(xdata['reply'][b]['userpic'])+"'  />\n";
			}else{
				xout+="<img src='img/basicheads.png' />\n";
			}
			xout+="										</a>\n";
			xout+="</div>\n";
			xout+="                                        <div class='mcreplybox_q'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' ><span class='color_red'>"+xdata['reply'][b]['user']+"</span></a>\n";
			xout+=xdata['reply'][b]['thiscontent'].replace("img ","img class='qnapics' style='width:100% !important;' ");
			//20190109 Pman 替QA回文的照片，加上點開的功能.......這部分，從PC版上線一開始就沒有......
			xout+="                                            <div class='mcreplyboxsub timeitem' data-t='"+xdata['reply'][b]['dateadd']+"'>"+xdata['reply'][b]['dateadd']+" </div>\n";
			xout+="                                        </div>\n";
			xout+="                                        <div class='mcreplyqna'>\n";
			/*這裡修改按鍵的設定..因為要移除不能投票的投票功能*/
			if(haswin==0){
				temp=xdata['reply'][b]['rmembers'];
				if(sessionStorage.getItem("userid")==xdata['uid']){
					xout+="                                        	<i class='qnap fa fa-circle-o' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"' data-val='maker'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
				}else if(temp && temp.indexOf(sessionStorage.getItem("userid"))>=0 ){//投過
					xout+="                                        	<i class='qnapoff fa fa-circle-o'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
					//xout+="                                        	<i class='qnap qnapoff fa fa-circle-o'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
				}else{
					xout+="                                        	<i class='qnap fa fa-circle-o' data-type='qnalike' data-key='"+xdata['reply'][b]['contentid']+"' data-id='"+xdata['reply'][b]['thisid']+"'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
				}
			}else{
				if(xdata['reply'][b]['winner']=="1"){
					xout+="                                        	<span class='qnapwin'>最佳正解</span>\n";
				}else {//結束
					xout+="                                        	<i class='qnapoff fa fa-circle-o'></i><span class='qnaptext'>"+xdata['reply'][b]['likes']+"</span>\n";
				}
			}
			xout+="                                        </div>\n";
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		if(w && w==2){
		}else{
			xout+="		                                	<!--reitem-->\n";
			xout+="                                	<div class='mcreplyitem' style='padding-bottom:5px;'>\n";
			xout+="                                    	<div class='mcreplyicon'>\n";
			if(mem && mem['headpic']){
				xout+="                                    	<img src='uploadfile/"+smallpics(mem['headpic'])+"'  />\n";
			}else{
				xout+="										<img src='img/basicheads.png' />\n";
			}
			xout+="                                        </div>\n";
			xout+="                                        <div class='mcreplybox_q'>\n";
			xout+="                                			<form action='' method='post' class='qnaformreply' >\n";
			xout+="                                        		<textarea class='replynow formfield' data-type='qnaformreply' data-id='"+xdata['thisid']+"' placeholder='發表意見'></textarea>\n";
			xout+=" 											<input type='hidden' name='picid' class='picid formfield'>\n";
			xout+=" 											<input type='hidden' name='pictype' class='pictype formfield'>\n";
			xout+="											</form>\n";
			xout+="                                    		<div class='replypicclick'>\n";
			xout+="                                    	  		<img src='img/mainpicbtn.jpg' />\n";
			xout+="                                        		<form action='' method=post enctype='multipart/form-data' class='pciform hideform newspicform'><input name='file'  accept='image/*' type='file' class='fileupload instantupload' data-job='uploadnewsreplypic' data-form='qnaformreply' data-target='picid' data-targettype='pictype' data-pictarget='replypcibox' data-type='replace' /></form>\n";
			xout+="                                   		</div>\n";
			xout+="											<div class='replypcibox'></div>\n";
			xout+="                                        </div>\n";
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		xout+="                                </div>\n";
		xout+="                            </div>";
		return xout;

	}
	print_wallitem=function(xdata){
		point010="";
		point012="";
		if(sessionStorage.getItem("userid")){
			mem=JSON.parse(sessionStorage.getItem("member"));
			if(sessionStorage.getItem("point010")){
				point010=JSON.parse(sessionStorage.getItem("point010"));
			}
			if(sessionStorage.getItem("point012")){
				point012=JSON.parse(sessionStorage.getItem("point012"));
			}
		}
		var xout="";
		xout+="	                        	<div class='mainitem delhide'>";
		xout+="                            	<div class='mainitemtitle'>\n";
		xout+="                                	<div class='mainitemimg'>\n";
		xout+="	                            		<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'>\n"; //20180905 Pman QA頭像加上連結
		if(xdata['userpic']){
			xout+="<img src='uploadfile/"+smallpics(xdata['userpic'])+"' />\n";
		}else{
			xout+="<img src='img/basicheads.png' />\n";
		}
		xout+="										</a>\n";
		xout+="									</div>\n";
		xout+="                                 <div class='mainitemtitletext'>\n";
		if(sessionStorage.getItem("userid")){
			xout+="                                    	<div class='mainitemtitleselect'>\n";
			xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
			xout+="                                                <ul class='mainitemtitleselectlist'>\n";
			if(sessionStorage.getItem("userid")==xdata['uid']){
				if(xdata['main']['typeid']=="0" || xdata['main']['typeid']=="1" || xdata['main']['typeid']=="2"){
					xout+="                                                <li class='maintemselect' data-val='4' data-type='wall' data-id='"+xdata['main']['thisid']+"' data-open='"+xdata['main']['opentype']+"'>編輯</li>\n"; //20190416 Pman 新增open的參數
				}
				xout+="                                                <li class='maintemselect' data-val='3' data-type='wall' data-id='"+xdata['main']['thisid']+"'>刪除</li>\n";
			}else{
				xout+="                                                <li class='maintemselect' data-val='1' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>檢舉</li>\n";
				if(xdata['main']['typeid']==4){ //20190425 Pman 修正攻略在動態牆上可能重複收藏的問題
					xout+="                                                <li class='maintemselect' data-val='2' data-type='article'  data-id='"+xdata['main']['aid']+"'>收藏</li>\n";
				}else{
					xout+="                                                <li class='maintemselect' data-val='2' data-type='wall'  data-id='"+xdata['main']['thisid']+"'>收藏</li>\n";
				}
			}
			xout+="                                                <li class='maintemselect' data-val='9' data-type='wallpage'  data-id='"+xdata['main']['thisid']+"'>分享</li>\n";
			xout+="                                            	</ul>\n";
			xout+="                                        </div>\n";
		}else{
			xout+="                                    	<div class='mainitemtitleselect'>\n";
			xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
			xout+="                                                <ul class='mainitemtitleselectlist'>\n";
			xout+="                                                <li class='maintemselect' data-val='9' data-type='wallpage'  data-id='"+xdata['main']['thisid']+"'>分享</li>\n";
			xout+="                                            	</ul>\n";
			xout+="                                        </div>\n";
		}
		xout+="                                    	<div >\n";
		xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><h1>"+xdata['user']+"</h1></a>\n";
		xout+="                                            <h6 class='timeitem' data-t='"+xdata['main']['dateadd']+"'>"+xdata['main']['dateadd']+"</h6>\n";
		xout+="                                     </div>\n";
		xout+="                                  </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemcontent'>\n";
		//內容
		xout+="                                	<div class='mainitemcontenttop'>\n";
		if(xdata['main']['typeid']=="4"){
			xout+="<div class='pageclick btn' data-type='artpage' data-val='"+xdata['main']['aid']+"'>\n";
		}
		//這部分的修改是動態更新的部分..因為比較傷系統,所以先不執行
	//	if(xdata['main']['albid']){
	//		xout+="<div class=newstextbox>"+nl2br(xdata['main']['thiscontent'])+"</div>";
	//		if(xdata['main']['typeid']=="1"){//圖片
	//			var temp=setimages();
	//		}
	//	}else{
			//xout+=nl2br(xdata['main']['thiscontent']);
	//	}
		 if(typeof xdata['main']['thiscontent'] !="undefined"){
			xout+=xdata['main']['thiscontent'];
		 }
		if(xdata['main']['typeid']=="4"){
			xout+="</div>\n";
		}
		xout+="                                    </div>\n";
		xout+="                                	<div class='mainitemcontenttag'>\n";
		if(xdata['tag']){
			xout+="                                    	"+xdata['tag']+" \n";
		}
		xout+="                                    </div>\n";
		xout+="                                    <div class='mainitemcontentpoint'>\n";
		xout+="                                        <div style=''>留言("+xdata['reply'].length+")</div>\n";
		//xout+="                                        <div class='newslikeboxwrap'>贊助(<span class='newslikebox'>"+xdata['main']['likes']+"</span> )</div>\n";
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid")==xdata['main']['memberid']){
			xout+="                                    	<P class='fR'><span class='newspointsbox fL'>"+xdata['main']['points']+"</span> <span class='bgipoff fL'></span></P>\n";
		}else{
			flag=0;
			if(point010 && point010.length>0){
				for(var a=0;a<point010.length;a++){
					if(point010[a]['note']==xdata['main']['thisid']){
						flag=1;
						break;
					}
				}
			}else if(sessionStorage.getItem("userid")){
			}else{
				flag=1;
			}
			if(flag==1){
				xout+="                                    	<P class='fR'><span class='newspointsbox fL'>"+xdata['main']['points']+"</span> <span class='bgipoff fL'></span></P>\n";
			}else{
				xout+="                                    	<P class='fR'><span class='newspointsbox fL'>"+xdata['main']['points']+"</span> <span class='bgip fL' data-type='news' data-id='"+xdata['main']['thisid']+"'></span></P>\n";
			}
		}

		xout+="                                        <div class='clr'></div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		//回復
		xout+="                                <div class='mainitemreply'>\n";
		if((xdata['reply'].length-4)>0){
			xout+="<div class='replyshowall'>尚有"+(xdata['reply'].length-4)+"篇留言,看全部</div>";
		}
		for(var b=0;b<xdata['reply'].length;b++){
			xout+="                                	<!--reitem-->\n";
			if((xdata['reply'].length-b)>4){
				xout+="                                	<div class='mcreplyitem' style='display:none;'>\n";
			}else{
				xout+="                                	<div class='mcreplyitem'>\n";
			}
			xout+="                                		<div class='mcreplyicon'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"' >\n";//20180906 Pman 頭像加上連結
			if(xdata['reply'][b]['userpic']){
				xout+="<img src='uploadfile/"+smallpics(xdata['reply'][b]['userpic'])+"'  />\n";
			}else{
				xout+="<img src='img/basicheads.png' />\n";
			}
			xout+="										</a>\n";
			xout+="</div>\n";
			xout+="                                        <div class='mcreplybox'>\n";
			xout+="                                        	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['reply'][b]['uid']+"'><span class='color_red'>"+xdata['reply'][b]['user']+"</span></a>\n";
			//if(xdata['reply'][b]['replyto']){
			//	xout+="<span class='replytonamebox'>to:"+xdata['reply'][b]['replytoname']+"</span>";
			//}
			xout+=xdata['reply'][b]['thiscontent'];
			if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid")==xdata['reply'][b]['uid']){
			}else{
				xout+="<a class='replyclick fR btn' data-id='"+xdata['reply'][b]['uid']+"' data-name='"+xdata['reply'][b]['user']+"' style='padding:5px 0;'>回覆</a>";
			}
			xout+="                                            <div class='mcreplyboxsub timeitem' data-t='"+xdata['reply'][b]['dateadd']+"'>"+xdata['reply'][b]['dateadd']+" </div>\n";

			xout+="                                        </div>\n";
			xout+="                                        <div class='mcadmbox'>\n";
			if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid")==xdata['reply'][b]['uid']){//自己不需要能源按件
				xout+="                                    	<div class='mcreplytitleselect'>\n";
				xout+="                                         <i class='mselectclick fa fa-chevron-down' data-type='reply'></i> \n";
				xout+="                                         <ul class='mcreplytitleselectlist'>\n";
				xout+="                                           <li class='maintemselect' data-val='3' data-type='wallreply' data-id='"+xdata['reply'][b]['thisid']+"'>刪除</li>\n";
				xout+="                                         </ul>\n";
				xout+="                                      </div>\n";
			}else{
				xout+="                                        	<div class='mcreplybigp'>\n";
				if(sessionStorage.getItem("userid")==xdata['reply'][b]['memberid']){
					xout+="                                        	<span class='bgipoff'></span>\n";
				}else{
					flag=0;
					if(point012 && point012.length>0){
						for(var a=0;a<point012.length;a++){
							if(point012[a]['note']==xdata['reply'][b]['thisid']){
								flag=1;
								break;
							}
						}
					}else if(sessionStorage.getItem("userid")){
					}else{
						flag=1;
					}
					if(flag==1 || sessionStorage.getItem("userid")==""){
						xout+="                                        	<span class='bgipoff'></span>\n";
					}else{
						xout+="                                        	<span class='bgip' data-type='newsreply' data-id='"+xdata['reply'][b]['thisid']+"'></span>\n";
					}
				}
				xout+="                                        	</div>\n";
			}
			xout+="                                        </div>\n";
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		//發言
		if(sessionStorage.getItem("userid")){
			xout+="		                                	<!--reitem-->\n";
			xout+="                                	<div class='mcreplyitem replyspeakbox' style='padding-bottom:5px;'>\n";
			xout+="                                    	<div class='mcreplyicon'>\n";
			if(mem['headpic']){
				xout+="                                    	<img src='uploadfile/"+smallpics(mem['headpic'])+"'  />\n";
			}else{
				xout+="										<img src='img/basicheads.png' />\n";
			}
			xout+="                                        </div>\n";
			xout+="                                        <div class='replyspeakinsert'>\n";
			xout+="                                        </div>\n";
			xout+="                                        <div class='mcreplybox'>\n";
			xout+="                                			<form action='' method='post' class='newsformreply' >\n";
			xout+="                                        	<textarea class='replynow formfield' data-type='newsformreply' data-id='"+xdata['main']['thisid']+"' placeholder='發表意見' onkeydown='if(event.keyCode==13) {return false;}' onblur='if (this.value.length>=300){alert(\"輸入的內容過長，最多僅能300個中文字！\");}'></textarea>\n";    //Pman亂改  20161206 20181005 處理回覆過長時，URL長度超過限制的問題
			xout+=" 											<input type='hidden' name='picid' class='picid formfield'>\n";
			xout+=" 											<input type='hidden' name='pictype' class='pictype formfield'>\n";
			xout+=" 											<input type='hidden' name='replyto' class='replyto formfield'>\n";
			xout+="											</form>\n";
			xout+="                                    		<div class='replypicclick'>\n";
			xout+="                                    	  		<img src='img/mainpicbtn.jpg' />\n";
			xout+="                                        		<form action='' method=post enctype='multipart/form-data' class='pciform hideform newspicform'><input name='file'  accept='image/*' type='file' class='fileupload instantupload' data-job='uploadnewsreplypic' data-form='newsformreply' data-target='picid' data-targettype='pictype' data-pictarget='replypcibox' data-type='replace' /></form>\n";
			xout+="                                   		</div>\n";
			xout+="											<div class='replypcibox'></div>\n";
			xout+="                                        </div>\n";
			xout+="                                        <div class='clr'></div>\n";
			xout+="                                    </div>\n";
			xout+="                                    <!--reitem end -->\n";
		}
		xout+="                                </div>\n";
		xout+="                            </div>";
		return xout;

	}
	print_wallitemc=function(xdata){
		var xout="";
		xout+="	                        	<div class='mainitem delhide'>";
		xout+="                            	<div class='mainitemtitle'>\n";
		xout+="                                	<div class='mainitemimg'>\n";
		xout+="	                            		<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'>\n"; //20180905 Pman QA頭像加上連結
		if(xdata['userpic']){
			xout+="<img src='uploadfile/"+smallpics(xdata['userpic'])+"' />\n";
		}else{
			xout+="<img src='img/basicheads.png' />\n";
		}
		xout+="										</a>\n";
		xout+="</div>\n";
		xout+="                                    <div class='mainitemtitletext'>\n";
		xout+="                                    	<div class='mainitemtitleselect'>\n";
		xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
		xout+="                                                <ul class='mainitemtitleselectlist'>\n";
		xout+="                                                <li class='maintemselect' data-val='3' data-type='arc' data-id='"+xdata['thisid']+"'>刪除</li>\n";
		xout+="                                            	</ul>\n";
		xout+="                                        </div>\n";
		xout+="                                    	<div >\n";
		xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><h1>"+xdata['user']+"</h1></a>\n";
		xout+="                                            <h6 class='timeitem' data-t='"+xdata['dateadd']+"'>收藏日期："+xdata['dateadd']+"</h6>\n";
		xout+="                                        </div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemcontent'>\n";
		xout+="                                	<div class='mainitemcontenttop'>\n";
		if(xdata['typeid']=="4"){
			xout+="<div class='pageclick btn' data-type='artpage' data-val='"+xdata['aid']+"'>\n";
		}
		xout+=nl2br(xdata['thiscontent']);
		if(xdata['typeid']=="4"){
			xout+="</div>\n";
		}
		xout+="                                    </div>\n";
		xout+="                                	<div class='mainitemcontenttag'>\n";
		if(xdata['tag']){
			xout+="                                    	"+xdata['tag']+" \n";
		}
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                            </div>";
		return xout;
		/*
		var xout="";
		xout+="	                        	<div class='mainitem delhide'>";
		xout+="                            	<div class='mainitemtitle'>\n";
		xout+="                                	<div class='mainitemimg'>\n";
		if(xdata['userpic']){
			xout+="<img src='uploadfile/"+xdata['userpic']+"' />\n";
		}else{
			xout+="<img src='img/basicheads.png' />\n";
		}
		xout+="</div>\n";
		xout+="                                    <div class='mainitemtitletext'>\n";
		xout+="                                    	<div class='mainitemtitleselect'>\n";
		xout+="                                             	<i class='mselectclick fa fa-chevron-down'></i> \n";
		xout+="                                                <ul class='mainitemtitleselectlist'>\n";
		xout+="                                                <li class='maintemselect' data-val='3' data-type='arc' data-id='"+xdata['thisid']+"'>刪除</li>\n";
		xout+="                                            	</ul>\n";
		xout+="                                        </div>\n";
		xout+="                                    	<div >\n";
		xout+="	                                    	<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"' ><h1>"+xdata['user']+"</h1></a>\n";
		xout+="                                            <h6 class='timeitem' data-t='"+xdata['dateadd']+"'>收藏日期："+xdata['dateadd']+"</h6>\n";
		xout+="                                        </div>\n";
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                                <div class='mainitemcontent'>\n";
		xout+="                                	<div class='mainitemcontenttop'>\n";
		if(xdata['typeid']=="4"){
			xout+="<div class='pageclick btn' data-type='artpage' data-val='"+xdata['aid']+"'>\n";
		}
		xout+=nl2br(xdata['thiscontent']);
		if(xdata['typeid']=="4"){
			xout+="</div>\n";
		}
		xout+="                                    </div>\n";
		xout+="                                	<div class='mainitemcontenttag'>\n";
		if(xdata['tag']){
			xout+="                                    	"+xdata['tag']+" \n";
		}
		xout+="                                    </div>\n";
		xout+="                                </div>\n";
		xout+="                            </div>";
		return xout;
		*/
	}
	print_frienditem=function(xdata,z){//z=1 加朋友, z=2 刪除邀請
		ranks=JSON.parse(sessionStorage.getItem("ranks"));
		tags=JSON.parse(sessionStorage.getItem("tags"));
		showrank="";
		 myrank="";
		 myrate="";
		if(ranks){
			 for(var a=0;a<ranks.length;a++){
				  if(parseInt(xdata['score'])>=parseInt(ranks[a]['score'])){
					  showrank=ranks[a]['rankname'];
					   myrank=ranks[a]['rankid'];
				  }
			 }
		}
		var out="";
			out+="                                <!--人物框-->\n";
			out+="                                <div class='mainitem'>\n";
			out+="                                    <div class='mainitemtitle'>\n";
			out+="                                        <div class='mainitemimg'>\n";
			out+="	                            			<a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'>\n"; //20180905 Pman QA頭像加上連結
			if(xdata['headpic']){
				out+="                                            <img src='uploadfile/"+smallpics(xdata['headpic'])+"' />\n";
			}else{
				out+="										<img src='img/basichead.png' />\n";
			}
			out+="											</a>\n";
			out+="										  </div>\n";
			out+="                                        <div class='mainitemtitletext'>\n";
			out+="                                            <div >\n";
			if(z==1 && xdata['uid']!=sessionStorage.getItem("userid") ){
				out+="                                                <div class='btn addfriend fR' data-type='add' data-val='"+xdata['uid']+"'>加朋友</div>\n";
			}else if(z==2){
				out+="                                                <div class='btn addfriend fR' data-type='delete' data-val='"+xdata['uid']+"'>取消邀請</div>\n";
			}else if(z==3){
				out+="                                                <div class='btn addfriend fR' data-type='add2' data-val='"+xdata['uid']+"'>加朋友</div> <div class='btn addfriend fR' data-type='reject' data-val='"+xdata['uid']+"'>拒絕邀請</div>\n";
			}else if(z==4){//取消朋友
				out+="                                                <div class='btn addfriend fR' data-type='cancel' data-val='"+xdata['uid']+"'>取消朋友</div>\n";
			}
			out+="                                                <a href='' class='pageclick' data-type='mypage' data-val='1'  data-id='"+xdata['uid']+"'><h1>"+xdata['nickname']+"</h1></a>\n";
			out+="                                                <h6>"+showrank+"/聲望."+myrank;
			if(xdata['gender']){
				out+="/"+(xdata['gender']=="1"?"男":"女");
			}
			if(xdata['birthday']){
				out+="/"+get_ages(xdata['birthday'])+"/"+get_horo(xdata['birthday']);
			}
			out+="</h6>\n";
			out+="                                            </div>\n";
			out+="                                        </div>\n";
			out+="                                    </div>\n";
			out+="                                    <div class='mainitemcontent'>\n";
			if(z==3){
				out+="                                        <div style='margin:10px 0 15px 0'>\n";
				out+="                                            <span class='fL mainitemcontenttext2'>邀請內容：</span> \n";
				if(xdata['addtext']){
					out+="                                            <span class='fL mainitemcontenttext'>"+xdata['addtext']+"</span> \n";
				}else{
					out+="                                            <span class='fL mainitemcontenttext'>讓我們成為朋友吧</span> \n";
				}
				out+="                                            <div class='clr'></div>\n";
				out+="                                        </div>\n";
			}
			/*
			out+="                                        <div>\n";
			out+="                                            <img src='img/leftgameicond.png' class='fL' />\n";
			out+="                                            <span class='fL mainitemcontenttext'>正在玩的遊戲</span> \n";
			out+="                                            <div class='clr'></div>\n";
			out+="                                        </div>\n";
			*/
			for(var a=1;a<4;a++){
				if(xdata['game'+a] && xdata['game'+a] >0 && xdata['game'+a+"_v"]==1){
					showtag="";
					mytag="";
					 for(var b=0;b<tags.length;b++){
						  if(tags[b]['gameid']==xdata['game'+a]){
							  showtag=tags[b]['gamename'];
							   mytag=tags[b]['gameid'];
							   break; //20190305 Pman 找到對應的標籤後就中斷，減少不必要的比對
						  }
					 }
					 if(b<tags.length-1 && tags[b]['hidesee']==1) continue; //20190305 Pman 如果是隱藏標籤，不顯示	//20190509 Pman 加上a的數值判斷，避免超過tags的陣列長度		 
					out+="                                        <div class='centergameonlist'>\n";
					out+="                                            <div class='leftgameonlistnamed'>\n";
					out+="                                                "+showtag+"\n";
					out+="                                            </div>\n";
					if(xdata['game'+a+'note']){
						out+="                                            <div class='leftgameonlistnoted'>\n";
						out+="                                                "+xdata['game'+a+'note']+"\n";
						out+="                                            </div>                        \n";
					}

					out+="                                        </div>\n";
				}
			}
			out+="                                    </div>\n";
			out+="                                </div>\n";
			out+="                                <!--人物框尾-->\n";
			return out;
	}
	centermyimg=function(){
		mylist=$(".imgitemboxp img");
		rw=$(".imgitemboxp").width();
		rh=$(".imgitemboxp").height();
		if(mylist.length>0){
			for(var a=0;a<mylist.length;a++){
				h=mylist.eq(a).height();
				w=mylist.eq(a).width();
				if((h/w)>(rh/rw)){
					mylist.eq(a).css("width",rw);
					mylist.eq(a).css("height",rw*h/w);
					mylist.eq(a).css("margin-top",-(rw*h/w-rh)/2);
				}else if(w>h){
					mylist.eq(a).css("height",rh);
					mylist.eq(a).css("width",rh*w/h);
					mylist.eq(a).css("margin-left",-(rh*w/h-rw)/2);
				}
			}
		}
	}
	centermyimg2=function(){
		if($(".imgitemboximg img").length>0){
			mylist=$(".imgitemboximg img");
			rw=$(".imgitemboximg").width();
			rh=$(".imgitemboximg").height();
		}else{
			mylist=$(".imgitembox img");
			rw=$(".imgitembox").width();
			rh=$(".imgitembox").height();
		}
		if(mylist.length>0){
			for(var a=0;a<mylist.length;a++){
				h=mylist.eq(a).height();
				w=mylist.eq(a).width();
				if((h/w)>(rh/rw)){
					mylist.eq(a).css("width",rw);
					mylist.eq(a).css("height",rw*h/w);
					mylist.eq(a).css("margin-top", -(rw*h/w-rh)/2);
				}else{
					mylist.eq(a).css("height",rh);
					mylist.eq(a).css("width",rh*w/h);
					mylist.eq(a).css("margin-left",-(rh*w/h-rw)/2);
				}
			}
		}
	}
		/*
 	subutf8=function(str, startInBytes, lengthInBytes) {
		var resultStr = '';
		var startInChars = 0;
		for (bytePos = 0; bytePos < startInBytes; startInChars++) {
			ch = str.charCodeAt(startInChars);
			bytePos += (ch < 128) ? 1 : encode_utf8(str[startInChars]).length;
		}
		end = startInChars + lengthInBytes - 1;
		for (n = startInChars; startInChars <= end; n++) {
			ch = str.charCodeAt(n);
			end -= (ch < 128) ? 1 : encode_utf8(str[n]).length;
			resultStr += str[n];
		}
		return resultStr;
	}
​	*/
	set_chaticon=function(){
		chatpic=JSON.parse(sessionStorage.getItem("chatpic"));
		out="";
		outa="";
		outb="";
		for(var a=0;a<chatpic.length;a++){
			outa+="<img src='img/chat/type"+chatpic[a]['thisid']+".png' class='icongroupclick' data-val='"+a+"' title='"+chatpic[a]['thisname']+"'/>\n";
			outb+="<div  class='icongroup'>\n";
			for(var b=0;b<chatpic[a]['pic'].length;b++){
				outb+="<img src='img/chat/"+chatpic[a]['pic'][b]['thisid']+"s.png' data-val='"+chatpic[a]['pic'][b]['thisid']+"'  title='"+chatpic[a]['pic'][b]['thisname']+"' />\n";
			}
			outb+="</div>\n";
		}
		out+="<div id='icontypelist'>\n";
		out+=outa;
		out+="</div>\n";
		out+=outb;
		$("#iconboxin").html(out);
	}
	chk_regpoints=function(){//註冊時計算點數
		toppoint=parseInt($("#poppoints").data("p1"))+parseInt($("#poppoints").data("p2"))+parseInt($("#poppoints").data("p3"));
		allpoint=parseInt($("#poppoints").data("p1"));
		if($("#popgame1").val().length>0 && $("#popgametime").val().length>0 ){
			allpoint=allpoint+parseInt($("#poppoints").data("p2"));
		}
		if($("#headpicid").val().length>0 && $("#frontpicid").val().length>0){
			allpoint=allpoint+parseInt($("#poppoints").data("p3"));
		}
		if(allpoint<toppoint){
			allpoint="目前已得到"+allpoint+"貢獻值"; //20190107 Pman 將「點」==>「貢獻值」
		}else{
			allpoint="恭喜您，得到最高的"+allpoint+"貢獻值!"; //20190107 Pman 將「點」==>「貢獻值」
		}
		$("#poppoints").html(allpoint);
	}
	get_ages = function(x) {
		var now = new Date();
		var past = new Date(x);
		if(past.getFullYear()){
			var nowYear = now.getFullYear();
			var pastYear = past.getFullYear();
			var nowM = now.getMonth();
			var pastM = past.getMonth();
			if(now.getMonth()<past.getMonth()){
				age = now.getFullYear() - past.getFullYear();
			}else if(now.getMonth()>past.getMonth()){
				age = now.getFullYear() -1- past.getFullYear();
			}else{
				if(now.getDate()>=past.getDate()){
				age = now.getFullYear() - past.getFullYear();
			  }else{
				age = now.getFullYear() -1- past.getFullYear();
			  }
			}
			return age;
		}else{
			return "年不知幾許";
		}
	};
	get_horo=function(x){
		horo1=['-1','19','49','78','108','139','171','202','233','264','295','324','353'];
		horo2=['-1','19','49','79','109','140','172','203','234','265','296','325','354'];
		horon=['魔羯座','水瓶座','雙魚座','白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','魔羯座'];
		var past = new Date(x);
		if(past.getFullYear()){
			var mydays = dayofyear(past);
			var testx=past.getFullYear()+"-3-1";
			var testd=dayofyear(new Date(testx));
						if(testd==59){
							horo=horo1;
						}else{
							horo=horo2;
						}
						for(a=0;a<horo.length;a++){
							if(mydays>horo[a]){
								myh=horon[a];
							}
						}
			return myh;
		}else{
			return "人客來座";
		}
	}
	dayofyear=function(d) {   // d is a Date object
		var yn = d.getFullYear();
		var mn = d.getMonth();
		var dn = d.getDate();
		var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
		var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
		var ddiff = Math.round((d2-d1)/864e5);
		return ddiff+1;
	}
	setimages=function(m){
		ttotal=m.length;
		var pout="";
		if(ttotal==1){
			pout+="<div class='albfacewrap popimgclick btn ' data-val='"+m[0]['thisid']+"'>";
			pout+="<img src='uploadfile/"+pics[0]['thisfile']+"' class='albfacepicw'>";
			pout+="</div>";
		}else if(ttotal==2){
			pout+="<div class='albfacewrap popimgclick btn ' data-val='"+m[0]['thisid']+"'>";
			pout+="<div class='albface1'>";
			pout+="<img src='uploadfile/"+m[0]['thisfile']+"' class='albfacepic"+m[0]['t']+"'>";
			pout+="</div>";
			pout+="<div class='albface1'>";
			pout+="<img src='uploadfile/"+m[1]['thisfile']+"' class='albfacepic"+m[1]['t']+"'>";
			pout+="</div>";
			pout+="</div>";
		}else{
			var img = new Image();
			pout+="<div class='albfacewrap popimgclick btn ' data-val='"+m[0]['thisid']+"'>";
			pout+="<div class='albface1'>";
			pout+="<img src='uploadfile/"+m[0]['thisfile']+"' class='albfacepic"+m[0]['t']+"'>";
			pout+="</div>";
			pout+="<div class='albface2'>";
			pout+="<img src='uploadfile/"+m[1]['thisfile']+"' class='albfacepic"+m[1]['t']+"'>";
			pout+="</div>";
			pout+="<div class='albface3'>";
			pout+="<img src='uploadfile/"+m[2]['thisfile']+"' class='albfacepic"+m[2]['t']+"'>";
			if(ttotal>3){
				pout+="<div class='albface3cover'>+ "+(ttotal-3)+"</div>";
			}
			pout+="</div>";
			pout+="<div class=clr></div>";
			pout+="</div>";
		}
		return pout;
	}
	set_bannerselect=function(x){
		//檢查gameid
		mybanner=[];
		cc=0;
		tags=JSON.parse(sessionStorage.getItem("tags"));
		if(localStorage.getItem("gameselect")){
			gameselect=JSON.parse(localStorage.getItem("gameselect"));
			for(var b=0;b<x.length;b++){
				for(var a=0;a<gameselect.length;a++){
					for(var r=0;r<tags.length;r++){
						if(gameselect[a]['gameid']==tags[r]['gameid']){
							if(tags[r]['typeid']==x[b]['gameid']){
								mybanner[cc]=x[b];
								cc++;
							}
						}
					}
				}
			}
			if(cc>0){
				return mybanner;
				//thisb['banner']=mybanner[cc];//取代
			}else{
				return x;
			}
		}else{
			return x;
		}
	}
	stringBytes=function(c){
		var n=c.length,s;
		var len=0;
		for(var i=0; i <n;i++){
			s=c.charCodeAt(i);
			while( s > 0 ){
				len++;
				s = s >> 8;
			}
		}
		return len;
	}

	smallpics=function(x){
            /*
		if(x.indexOf(".jpg")>0){
			return x.replace(".jpg", "s.jpg");
		}else if(x.indexOf(".png")>0){
			return x.replace(".png", "s.png");
                }
            */
            return x;
        }
	/*
	copyToClipboard=function(elem) {
		  // create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);

		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}

		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
	*/
})(jQuery);

$(document).ready(function(){
   ismobile=0;
	// 共用功能
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		ismobile=1;
	}
	$("body").delegate(".popclose","click",function(e){
		e.preventDefault();
		popclose();
	});
	$("body").delegate(".popcloseu","click",function(e){
		e.preventDefault();
		popcloseu();
	});
	$("body").delegate(".btn","click",function(e){
		e.preventDefault();
	});
	//自動延伸 teatarea 功能
	$("textarea.formfield").css("-ms-overflow-style","none");
	$("textarea.formfield").css("overflow","hidden");
	//$("textarea").val("");
	$("body").delegate("textarea.formfield","keyup",function(){
		if(!$(this).hasClass("notmove")){
			 $(this).height( 0 );
			inheight=this.scrollHeight;
			if(inheight<40){
				inheight=40;
			}
			$(this).css("height",inheight);
		}
	});
	/*
	$("body").on("focusin",".birthday",function(){
		$(this).datepicker({
						dateFormat: 'yy-mm-dd',
						minDate: '1920-07-01',
						maxDate: '0',
						defaultDate: 7000
		});
	});
	*/
	$('body').on('focus',".birthday", function(){
		$(this).datepicker({
            			changeYear: true,
						yearRange: "-80:-5",
						dateFormat: 'yy-mm-dd',
						minDate: '1920-07-01',
						maxDate: '0',
						defaultDate: '-9000'
		});
	});
	$('body').on('focus',".chosen", function(){
		//jQuery($(this)).chosen();
	});

	// 互換 IMAGE 的 HOVER 共用
	$(".hoverimg").hover(function(){
		if($(this).parents("a").hasClass("selected")){
		}else{
			changeimg($(this));
		}
	},function(){
		if($(this).parents("a").hasClass("selected")){
		}else{
			if($(this).hasClass("selected")){
			}else{
				changeimg($(this));
			}
		}
	});
	$('body').delegate(".replyshowall","click", function(){
		$(this).hide();
		$(this).siblings(".mcreplyitem").slideDown(500);
		$(this).siblings(".mcreplyitem2").slideDown(500);
	 });
	//上傳檔案的共用
	$("body").delegate(".instantuploadm","change",function(){//多重檔案--相簿
		if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
			var me=$(this);
			var ifile = this.files;
			var tpchk=0;
			if(me.data("job")=="uploadnewspicbook"){
				$("#maincontentwrap").prepend("<div class='loaderbox' id='temploader'><img src='img/loaderd.gif'></div>");
			}
			for(a=0;a<ifile.length;a++){
				if(ifile[a].type == 'image/png' || ifile[a].type == 'image/jpg' || ifile[a].type == 'image/gif' || ifile[a].type == 'image/jpeg'){
					if(ifile[a].size > 10000000) {	tpchk=1;	}//20190108 Pman 取消照片上限2MB的限制（其實...手機版好像很早就取消了）//20190109 Pman 修正上傳上限為10MB
				}else{			tpchk=2;	}
			}
			if(ifile.length>20){
				popnotice("限制最多20張圖片");
				$("#temploader").remove();
			}else if(ifile.length<1 && me.data("job")=="uploadnewspicbook"){
				popnotice("相簿限制至少1張圖片");
				$("#temploader").remove();
			}else if(ifile.length >20 && ( me.data("job")=="uploadqnapic" || me.data("job")=="uploadnewspic" ) ) {
				popnotice("上傳最高上限二十張圖片");
				$("#temploader").remove();
			}else if(tpchk==1) {
				popnotice("相片大小一張限制2MB");
				$("#temploader").remove();
			}else if(tpchk==2) {
				popnotice("檔案格式不符合,僅接受jpg,gif,png格式");
				$("#temploader").remove();
			}else {
				var formData = new FormData();
				for(a=0;a<ifile.length;a++){
				 formData.append( 'val'+a,ifile[a]);
				}
				 formData.append( 'job', $(this).data("job"));
				 formData.append( 'uid',sessionStorage.getItem("userid"));
				 formData.append( 'ukey',sessionStorage.getItem("key"));
				 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loader.gif'></div>");
				 $.ajax({
						url: 'ajax.php',  //server script to process data
						type: 'POST',
						success: completeHandler = function(data) {
							//cdata=data.replace(/ /g,'');
							$(".fileupload").val('');//更新 2016/7/18
							datax=JSON.parse(data);
							if(datax[0]=="ERR"){
								popnotice("會員資料不符合,請重新登入,謝謝");
								$("#temploader").remove();
							}else{
								$("#temploader").remove();
								if(me.data("job")=="uploadnewspic"){
									var pout="";
									for(var a=0;a<datax[1].length;a++){
										pout+="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albpic'  data-albid='"+datax[0]+"' data-val='"+datax[2][a]+"' ></i><img src='uploadfile/"+datax[1][a]+"'></div>";
									}
									if(datax[1].length<5){
										pout+="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+datax[0]+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form>\n";
										pout+="</div>";
									}
									pout+="<div class='clr'></div>";

									$("#"+me.data("pictarget")).html(pout);
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(datax[0]);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val("1");
									}
								}else if(me.data("job")=="uploadnewspicbook"){
                                                                    console.log('uploadnewspicbook');
                                                                    console.log(data);
									var pout="";
									for(var a=0;a<datax[1].length;a++){
										pout+="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albpic'  data-albid='"+datax[0]+"' data-val='"+datax[2][a]+"' ></i><img src='uploadfile/"+datax[1][a]+"'></div>";
									}
									pout+="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+datax[0]+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form>\n";
									pout+="</div>";
									pout+="<div class='clr'></div>";
									$("#albuminputwrapx").show();
									$("#"+me.data("pictarget")).html(pout);
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(datax[0]);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val("3");
									}
								}else if(me.data("job")=="uploadqnapic"){
									var pout="";//這要去不同相簿
									for(var a=0;a<datax[1].length;a++){
										pout+="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albqpic' data-albid='"+datax[0]+"' data-val='"+datax[2][a]+"' ></i><img src='uploadfile/"+datax[1][a]+"'></div>";
									}
									if(datax[1].length<5){
										pout+="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+datax[0]+"' class='fileupload instantupload' data-job='addalbqpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form>\n";
										pout+="</div>";
									}
									pout+="<div class='clr'></div>";
									$("#"+me.data("pictarget")).html(pout);
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(datax[0]);
									}
									if(me.data("targettype")){//需要傳檔案的類別
										$("#"+me.data("targettype")).val("1");
									}
								}
							}
						},
						error: errorHandler = function() {
							popnotice("發生錯誤,請檢查檔案");
						},
						// Form data
						data: formData,
						//Options to tell JQuery not to process data or worry about content-type
						cache: false,
						contentType: false,
						processData: false
					}, 'json');
			}
		}else{
			popnotice("本功能僅開放會員使用");
		}
	});

	//上傳檔案的共用
	$("body").delegate(".instantupload","change",function(){
		//允許免會員上船的只有 uploadhead,uploadfront
		isallowed=0;
		if($(this).data("job")=="uploadhead" || $(this).data("job")=="uploadfront"){
			isallowed=1;
		}else if(sessionStorage.getItem("userid") && sessionStorage.getItem("userid").length>0){
			isallowed=1;
		}
		if(isallowed==1){
			var me=$(this);
			var ifile = this.files[0];
			var tpchk=0;
			if(ifile.type == 'image/png' || ifile.type == 'image/jpg' || ifile.type == 'image/gif' || ifile.type == 'image/jpeg'){
				tpchk=1;
			}else if(ifile.type == 'video/mp4' && $(this).data("format")=="mp4"){
				tpchk=2;
			}
			if(ifile.name.length < 1) {
			}
			else if(ifile.size > 10000000 && tpchk==1) { //20190109 Pman 修正上傳上限為10MB
				popnotice("相片大小一張限制10MB");
			}
			else if(ifile.size > 20000000 && tpchk==2) {
				popnotice("影片 尺寸不得超過20MB");
			}
			else if(tpchk==0) {
				if($(this).data("format")=="mp4"){
					popnotice("檔案格式不符合,僅接受mp4格式");
				}else{
					popnotice("檔案格式不符合,僅接受jpg,gif,png格式");
				}
			}
			else {
				var formData = new FormData();
				//if(me.data("job")=="uploadnewsreplypic"){
					//alert(me.parents(1).siblings("."+me.data("form")).data("test"))
					formData.append( 'val',ifile  );

				//}else{
			//		 formData.append( 'val', $('#'+$(this).data("form")+' .instantupload')[0].files[0] );
				//}
				 me.hide();
				 if($("#frontpicitem")){
					 var fpicxx=$("#frontpicitem").attr("src");//這是給frontpic用的
				}
				 formData.append( 'job', $(this).data("job"));
				 formData.append( 'uid',sessionStorage.getItem("userid"));
				 formData.append( 'ukey',sessionStorage.getItem("key"));
				 formData.append( 'albid',me.data("albid"));
				 if(me.data("albid")){
					 if(me.data("job")=="addalbpicb"){
						 $("#"+me.data("pictarget")).html("<div class='loaderboxs'><img src='img/loaderd.gif'>1</div>");//20190123 Pman
					 }else{
						 $("#"+me.data("pictarget")).html("<div class='loaderboxs'><img src='img/loader.gif'>2</div>");//20190123 Pman
					 }
				 }else if(me.data("job")=="uploadfront" || me.data("job")=="uploadhead"  || me.data("job")=="uploadfrontb" || me.data("job")=="uploadheadb" ){
					 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loaderd.gif'>3</div>");//20190123 Pman
				 }else{
					 $("#"+me.data("pictarget")).html("<div class='loaderbox'><img src='img/loader.gif'>4</div>");//20190123 Pman
				 }
				 var returnbox="";
				 $.ajax({
						url: 'ajax.php',  //server script to process data
						type: 'POST',
						//Ajax events
						success: completeHandler = function(data) {
							me.show();
							$(".fileupload").val('');//更新 2016/7/18
							cdata=data.replace(/ /g,'');
							if(cdata=="ERR"){
								popnotice("會員資料不符合,請重新登入,謝謝");
							}else if(cdata=="ERRB"){
								popnotice("上傳最高限制五張圖片");
							}else if(cdata=="ERRC"){
								popnotice("上傳最高限制二十張圖片");
							}else if(cdata=="ERRH"){
								popnotice("上傳圖片高度限制350px");
							}else{
								//判斷是否是回應
								if(me.data("job")=="uploadnewsreplypic"){
									if(me.data("type")=="replace"){
										me.parents(1).siblings("."+me.data("pictarget")).html("<img src='uploadfile/"+cdata+"'>");
									}
									me.parents(1).siblings("."+me.data("form")).children("."+me.data("target")).val(cdata);
									me.parents(1).siblings("."+me.data("form")).children("."+me.data("targettype")).val(tpchk);
								}else if(me.data("job")=="addalbpic"){//動態/相簿新增照片
									cdatax=cdata.split("_");
									if(cdata.indexOf("gif")>0){
										tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albpic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='uploadfile/"+cdatax[0]+"' style='height:100%'></div>";
									}else{
										//tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albpic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='uploadfile/"+cdatax[0].replace(/\./g, "s.")+"'></div>";
										tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albpic'  data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='uploadfile/"+cdatax[0]+"' style='height:100%'></div>";
									}
									if(parseInt(cdatax[1] )<=5 ){//上船前第幾個,上船後+1
										returnbox="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>\n";
									}
									tempout+=returnbox;
									$("#"+me.data("pictarget")).replaceWith(tempout);
								}else if(me.data("job")=="addalbpicb"){//動態相簿新增照片--相簿內
									var tempvals=Array(sessionStorage.getItem("userid"),sessionStorage.getItem("key"),data.trim()); //人 / key / 最後id / 選項 /  哪一類(哪一頁)  /  預留目前都是mainlist/ 標籤
									tempitem=ajaxarr("get_myphotoid",tempvals,"ajax.php");
									tempitem.success(function(data){//回傳 data --data[0]都是確認正確  data[1]就是回傳的array  data[2]-->則是未定義..
										out="";
										out+="                        <div class='imgitembox delhide'>\n";
										out+="                        	<img src='uploadfile/"+data['thisfile']+"' class='popimgclick btn' data-val='"+data['thisid']+"'/>\n";
										out+="                            <span class='imgdelclick'><i class='fa fa-times color_w  btn maintemselect' data-val='3' data-type='pho'   data-albid='"+data['albid']+"' data-id='"+data['thisid']+"'></i></span>\n";
										out+="                        </div>				\n";
										out+="<div class='imgitembox delhide temppicwrapb' id='addalbpicwrapb'><img src='img/addpicb.png'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+data['albid']+"' class='fileupload instantupload' data-job='addalbpicb' data-form='addpicform' data-target='temppicwrapb' data-pictarget='addalbpicwrapb' data-type='insert' /></form>\n";
										out+="</div>";
										$("#"+me.data("pictarget")).replaceWith(out);
										centermyimg2();//share.js
									});
								}else if(me.data("job")=="addalbqpic"){//QNA新增照片
									cdatax=cdata.split("_");
									if(cdata.indexOf("gif")>0){
										tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albqpic' data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='uploadfile/"+cdatax[0]+"' style='height:100%'></div>";
									}else{
										tempout="<div class='temppicwrap inblock'><i class='predelclick fa fa-times' data-job='albqpic' data-albid='"+me.data("albid")+"' data-val='"+cdatax[0]+"' ></i><img src='uploadfile/"+cdatax[0].replace(/\./g, "s.")+"'></div>";
									}
									if(parseInt(cdatax[1])<=3){//上船前第幾個,上船後+1
										returnbox="<div class='temppicwrap' id='addalbpicwrap'><img src='img/addpic.jpg'><form action='' method=post enctype='multipart/form-data' class='pciform hideform' id='addpicform'><input name='file' type='file'  data-albid='"+me.data("albid")+"' class='fileupload instantupload' data-job='addalbqpic' data-form='addpicform' data-target='temppicwrap' data-pictarget='addalbpicwrap' data-type='insert' /></form></div>\n";
									}
									tempout+=returnbox;
									$("#"+me.data("pictarget")).replaceWith(tempout);
								}else if(me.data("job")=="uploadfrontb"){

									out="";
									out+="                	<img src='uploadfile/"+cdata+"' style='position:relative;z-index:9;'  id='frontpicitem' />\n";
									out+="					<div class='btn border5 fixer' style='top:10px;left:10px;'>請選擇</div>";
									out+="					<div class='btn border5 fixer clickconfirm' style='bottom:5px;right:100px;z-index:49' data-type='frontpiccancel' data-val='"+fpicxx+"'>取消修改</div>";
									out+="					<div class='btn border5 fixer clickconfirm' style='bottom:5px;right:0px;z-index:49' data-type='frontpic' data-val='"+cdata+"'>確認修改</div>";
									out+="                  <input type='file' accept='image/gif, image/jpeg, image/png, image/jpg'  style='top:10px;left:10px;' class='formfield instantupload' name='frontpic'  data-job='uploadfrontb' data-form='frontpicformb' data-pictarget='mypagefrontpic' data-target='frontpicid' data-type='replace'>\n";
									$("#"+me.data("pictarget")).html(out);
									$(".profileimgclick").show();

								}else if(me.data("job")=="uploadheadb"){
									out="";
									out+="                            <div class='mypeopleimg'>\n";
									out+="                				<img src='uploadfile/"+smallpics(cdata)+"' style='position:relative;z-index:9;'  class='popimgclick fullw' data-type='self' data-val='"+cdata+"' />\n";
									out+="							  </div>\n";
									out+="							  	<div class='btn border5 fixer clickconfirm' style='bottom:0px;right:0px;z-index:49' data-type='headpic' data-val='"+cdata+"'>確認修改</div>";
									out+="							  	<div class='btn border5 fixer' style='top:10px;left:10px;display:none;' id='headpicclick'>請選擇</div>";
									out+="                            	<input type='file' accept='image/gif, image/jpeg, image/png, image/jpg'  id='headpicform' style='top:10px;left:10px;display:none;' class='formfield instantupload' name='headpic'  data-job='uploadheadb' data-form='headpicformb' data-pictarget='mypageheadpic' data-target='frontpicid' data-type='replace'>\n";
									$("#"+me.data("pictarget")).html(out);
								}else if(me.data("job")=="uploadchatroom"){//chatroom上傳圖片
									imgsrc="XX{img2}"+cdata;
									chat_input(me.data("val"),imgsrc);//id,內容  ajax.js
								}
								else{
									if(me.data("type")=="cover"){
										//me.siblings(".btn").css("opacity",0);
										me.val('');
										//me.parents(".instantbox").append("<img src='uploadfile/"+cdata+"' class='instantimg imgover'>");
										//說明  instantimg 和 imgover css有衝突.目前因為註冊修改,但不知道和那裡衝突了
										me.parents(".instantbox").append("<span class='inblock coverpic'><i class='predelclick fa fa-times' data-job='newspic' data-val='"+cdata+"' data-target='"+me.data("target")+"' data-targettype='"+me.data("targettype")+"'></i><img src='uploadfile/"+cdata+"' class='instantimgb'></span>");
										if(me.data("job")=="uploadhead"){
											me.parents(".instantbox").css("height",100);
										}else{
											me.parents(".instantbox").css("height",80);
										}
									}else if(me.data("type")=="replace"){
										if(me.data("format")=="mp4"){
											$("#"+me.data("pictarget")).html("<span class='inblock'><i class='predelclick fa fa-times' data-job='newspic' data-val='"+cdata+"' data-target='"+me.data("target")+"' data-targettype='"+me.data("targettype")+"'></i><video width=100% controls id='newstempvideo'><source src='uploadfile/"+cdata+"' type='video/mp4'></video></span>");
											var h=$("#newstempvideo").innerHeight();
											$("#newstempvideo").css("height",h);
										}else{
											$("#"+me.data("pictarget")).html("<span class='inblock'><i class='predelclick fa fa-times' data-job='newspic' data-val='"+cdata+"' data-target='"+me.data("target")+"' data-targettype='"+me.data("targettype")+"'></i><img src='uploadfile/"+cdata+"' class='imgover'></span>");
										}
									}
									if(me.data("target")){//需要傳檔案ID的
										$("#"+me.data("target")).val(cdata);
										if(me.data("job")=="uploadfront" ||me.data("job")=="uploadhead"){
											chk_regpoints();
										}
									}
									if(me.data("targettype")){//需要傳檔案ID的
										$("#"+me.data("targettype")).val(tpchk);
									}
								}
							}
						},
						error: errorHandler = function() {
							popnotice("發生錯誤,請檢查檔案");
							$("#"+me.data("pictarget")).html(returnbox);


						},
						// Form data
						data: formData,
						//Options to tell JQuery not to process data or worry about content-type
						cache: false,
						contentType: false,
						processData: false
					}, 'json');
			}
		}else{
			popnotice("本功能僅開放會員使用");
		}
	});
	$("body").delegate('.scrollable','mousewheel DOMMouseScroll', function(e){
		var e0 = e.originalEvent,
		delta = e0.wheelDelta || -e0.detail;
		this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		e.preventDefault();
	});
	$("body").delegate('#newstext','keyup', function(){
		if($("#newsformfilebox").html()){//已有資料
		}else{
			var xx=$("#newstext").val().split("\n");
			for(var a=0;a<xx.length;a++){
				if(xx[a].indexOf("https://www.youtube.com/watch?v=")==0){
					var yy=xx[a].split("https://www.youtube.com/watch?v=")[1];
					$("#newsformfilebox").html("<iframe  width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'></iframe>");
					break;
				}else if(xx[a].indexOf("https://m.youtube.com/watch?v=")==0){
					var yy=xx[a].split("https://m.youtube.com/watch?v=")[1];
					$("#newsformfilebox").html("<iframe  width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'></iframe>");
					break;
				}else if(xx[a].indexOf("https://youtu.be/")==0){
					var yy=xx[a].split("https://youtu.be/")[1];
					$("#newsformfilebox").html("<iframe  width='468' height='263' style='margin:0 -10px;' src='https://www.youtube.com/embed/"+yy+"' frameborder='0'></iframe>");
					break;
				}else if(xx[a].indexOf("https://twitch.tv/")==0){
					var yy=xx[a].split("https://twitch.tv/")[1];
					var yyy=yy.split("/v/");
					if(yyy.length>1){
						$("#newsformfilebox").html("<iframe src='https://player.twitch.tv/?video=v"+yyy[1]+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>");
					}else{
						$("#newsformfilebox").html("<iframe src='https://player.twitch.tv/?channel="+yy+"&!autoplay' frameborder='0' scrolling='no'  width='468' height='263' style='margin:0 -10px;' autoplay=false allowfullscreen webkitallowfullscreen mozallowfullscreen ></iframe>");
					}
					break;
				}
			}
		}
	});
});

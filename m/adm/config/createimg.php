<?php 
function addwater($watermark_image,$thumb){
    // 載入浮水印圖
    $w_image = imagecreatefrompng($watermark_image) ;
	// 取出浮水印圖 寬 與 高
	$w_width = imagesx($w_image);
	$w_height = imagesy($w_image);
	imagecopy($thumb,$w_image,0,0,0,0,$w_width,$w_height);
}
function createimg($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$myext,$wat,$qrt=75){//$wat==water mark //20190307 Pman 增加qrt參數，用來控制jpg要壓縮的品質
	// water mark
	$watermark_image="../img/water.png";
	if(file_exists($watermark_image)){
		$w_image = imagecreatefrompng($watermark_image) ;
	}
	if($imgwidth>0 && $imgheight>0){
		$thumb_w = $imgwidth;
		$thumb_h = intval($height / $width * $thumb_w);
		if($imgheight>=$thumb_h ){		  //如果不夠高,要以高為標準
			$thumb_h = $imgheight;
			$thumb_w = intval($width / $height  * $thumb_h);				  
		}
		//計算圖片位置
		if($thumb_w==$imgwidth){
			  $xpos =0;
			  $ypos =-($thumb_h-$imgheight)/2;
		}else{
			   $xpos =-($thumb_w-$imgwidth)/2;
			   $ypos =0;
		}				  
	}else if($imgwidth>0){	//使用一邊為尺寸基礎不切圖
		$thumb_w = $imgwidth;
		$thumb_h = intval($height / $width * $thumb_w); //不切圖
		$xpos =0;
		$ypos =0;
		$imgheight=$thumb_h;
    }else if($imgheight>0){	//使用一邊為尺寸基礎不切圖
		$thumb_h = $imgheight;
		$thumb_w = intval($width / $height  * $thumb_h);	
		$xpos =0;
		$ypos =0;	
		$imgwidth=$thumb_w;
    }else{	//使用原尺寸
		$thumb_h=$height;
		$thumb_w=$width;
		$xpos =0;
		$ypos =0;	
	}
 	$thumb = imagecreatetruecolor($imgwidth, $imgheight);
	if($myext=="png"){
		imagealphablending($thumb,false);
		imagesavealpha($thumb,true);
	}
	imagecopyresampled($thumb, $src,$xpos,$ypos, 0, 0, $thumb_w, $thumb_h, $width, $height);  
	if($wat==1){
		imagealphablending($thumb, true);
	//	imagesavealpha($thumb,true);
	//	imagecopyresampled($thumb, $src,$xpos,$ypos, 0, 0, $thumb_w, $thumb_h, $width, $height);  
	//	$w_width = imagesx($w_image);
	//	$w_height = imagesy($w_image);
	}
	//儲存
	if($myext=="png"){
		//imagepng($thumb, $imgurl.$tempid.".png");	
		imagejpeg($thumb, $imgurl.$tempid.".jpg", $qrt);	 //20190124 Pman 將png也存成jpg，以減小圖檔尺寸
	}else{
		imagejpeg($thumb, $imgurl.$tempid.".jpg", $qrt);	 //20190111 Pman 降低品質設定，以減小圖檔尺寸
	}
	//作縮圖--邏輯與 大圖相同 分開計算與儲存
	if($imgs==1){
		if($thumbwidth>0 && $thumbheight>0){
			$thumb_w = $thumbwidth;
			$thumb_h = intval($height / $width * $thumb_w);
			if($thumbheight>=$thumb_h ){		  //如果不夠高,要以高為標準
				$thumb_h = $thumbheight;
				$thumb_w = intval($width / $height  * $thumb_h);				  
			}
			//計算圖片位置
			if($thumb_w==$thumbwidth){
				  $xpos =0;
				  $ypos =-($thumb_h-$thumbheight)/2;
			}else{
				   $xpos =-($thumb_w-$thumbwidth)/2;
				   $ypos =0;
			}				  
		}else if($thumbwidth>0){	//使用一邊為尺寸基礎不切圖
			$thumb_w = $thumbwidth;
			$thumb_h = intval($height / $width * $thumb_w); //不切圖
			$xpos =0;
			$ypos =0;
			$thumbheight=$thumb_h;
		}else if($thumbheight>0){	//使用一邊為尺寸基礎不切圖
			$thumb_h = $thumbheight;
			$thumb_w = intval($width / $height  * $thumb_h);	
			$xpos =0;
			$ypos =0;	
			$thumbwidth=$thumb_w;
		}else{	//使用60
			$thumb_h=60;
			$thumb_w=60*($width / $height);
			$xpos =0;
			$ypos =0;	
		}
		$thumb = imagecreatetruecolor($thumbwidth, $thumbheight);
		if($myext=="png"){
			imagealphablending($thumb,false);
			imagesavealpha($thumb,true);
		}
		imagecopyresampled($thumb, $src,$xpos,$ypos, 0, 0, $thumb_w, $thumb_h, $width, $height);  
		//儲存
		if($myext=="png"){
			//imagepng($thumb, $imgurl.$tempid."s.png");	
			imagejpeg($thumb, $imgurl.$tempid."s.jpg", $qrt);	 //20190124 Pman 將png也存成jpg，以減小圖檔尺寸
		}else{
			imagejpeg($thumb, $imgurl.$tempid."s.jpg", $qrt);	 //20190111 Pman 降低品質設定，以減小圖檔尺寸
		}
	}

} 

//20190328 Pman 這個新增給後台上貼圖的功能用，因為該項目格式指定png
function createimg2($tempid,$imgurl,$width,$height,$imgwidth,$imgheight,$imgs,$thumbwidth,$thumbheight,$src,$myext,$wat,$qrt=75){//$wat==water mark //20190307 Pman 增加qrt參數，用來控制jpg要壓縮的品質
	// water mark
	$watermark_image="../img/water.png";
	if(file_exists($watermark_image)){
		$w_image = imagecreatefrompng($watermark_image) ;
	}
	if($imgwidth>0 && $imgheight>0){
		$thumb_w = $imgwidth;
		$thumb_h = intval($height / $width * $thumb_w);
		if($imgheight>=$thumb_h ){		  //如果不夠高,要以高為標準
			$thumb_h = $imgheight;
			$thumb_w = intval($width / $height  * $thumb_h);				  
		}
		//計算圖片位置
		if($thumb_w==$imgwidth){
			  $xpos =0;
			  $ypos =-($thumb_h-$imgheight)/2;
		}else{
			   $xpos =-($thumb_w-$imgwidth)/2;
			   $ypos =0;
		}				  
	}else if($imgwidth>0){	//使用一邊為尺寸基礎不切圖
		$thumb_w = $imgwidth;
		$thumb_h = intval($height / $width * $thumb_w); //不切圖
		$xpos =0;
		$ypos =0;
		$imgheight=$thumb_h;
    }else if($imgheight>0){	//使用一邊為尺寸基礎不切圖
		$thumb_h = $imgheight;
		$thumb_w = intval($width / $height  * $thumb_h);	
		$xpos =0;
		$ypos =0;	
		$imgwidth=$thumb_w;
    }else{	//使用原尺寸
		$thumb_h=$height;
		$thumb_w=$width;
		$xpos =0;
		$ypos =0;	
	}
 	$thumb = imagecreatetruecolor($imgwidth, $imgheight);
	if($myext=="png"){
		imagealphablending($thumb,false);
		imagesavealpha($thumb,true);
	}
	imagecopyresampled($thumb, $src,$xpos,$ypos, 0, 0, $thumb_w, $thumb_h, $width, $height);  
	if($wat==1){
		imagealphablending($thumb, true);
	//	imagesavealpha($thumb,true);
	//	imagecopyresampled($thumb, $src,$xpos,$ypos, 0, 0, $thumb_w, $thumb_h, $width, $height);  
	//	$w_width = imagesx($w_image);
	//	$w_height = imagesy($w_image);
	}
	//儲存
	if($myext=="png"){
		imagepng($thumb, $imgurl.$tempid.".png");	
		//imagejpeg($thumb, $imgurl.$tempid.".jpg", $qrt);	 //20190124 Pman 將png也存成jpg，以減小圖檔尺寸
	}else{
		imagejpeg($thumb, $imgurl.$tempid.".jpg", $qrt);	 //20190111 Pman 降低品質設定，以減小圖檔尺寸
	}
	//作縮圖--邏輯與 大圖相同 分開計算與儲存
	if($imgs==1){
		if($thumbwidth>0 && $thumbheight>0){
			$thumb_w = $thumbwidth;
			$thumb_h = intval($height / $width * $thumb_w);
			if($thumbheight>=$thumb_h ){		  //如果不夠高,要以高為標準
				$thumb_h = $thumbheight;
				$thumb_w = intval($width / $height  * $thumb_h);				  
			}
			//計算圖片位置
			if($thumb_w==$thumbwidth){
				  $xpos =0;
				  $ypos =-($thumb_h-$thumbheight)/2;
			}else{
				   $xpos =-($thumb_w-$thumbwidth)/2;
				   $ypos =0;
			}				  
		}else if($thumbwidth>0){	//使用一邊為尺寸基礎不切圖
			$thumb_w = $thumbwidth;
			$thumb_h = intval($height / $width * $thumb_w); //不切圖
			$xpos =0;
			$ypos =0;
			$thumbheight=$thumb_h;
		}else if($thumbheight>0){	//使用一邊為尺寸基礎不切圖
			$thumb_h = $thumbheight;
			$thumb_w = intval($width / $height  * $thumb_h);	
			$xpos =0;
			$ypos =0;	
			$thumbwidth=$thumb_w;
		}else{	//使用60
			$thumb_h=60;
			$thumb_w=60*($width / $height);
			$xpos =0;
			$ypos =0;	
		}
		$thumb = imagecreatetruecolor($thumbwidth, $thumbheight);
		if($myext=="png"){
			imagealphablending($thumb,false);
			imagesavealpha($thumb,true);
		}
		imagecopyresampled($thumb, $src,$xpos,$ypos, 0, 0, $thumb_w, $thumb_h, $width, $height);  
		//儲存
		if($myext=="png"){
			imagepng($thumb, $imgurl.$tempid."s.png");	
			//imagejpeg($thumb, $imgurl.$tempid."s.jpg", $qrt);	 //20190124 Pman 將png也存成jpg，以減小圖檔尺寸
		}else{
			imagejpeg($thumb, $imgurl.$tempid."s.jpg", $qrt);	 //20190111 Pman 降低品質設定，以減小圖檔尺寸
		}
	}

}
?>

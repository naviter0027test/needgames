<?php
/**
*    TenPay財付通產生訂單範例，參數說明請參考SDK技術文件(https://www.opay.tw/Content/files/allpay_047.pdf)
*/
    
    //載入SDK(路徑可依系統規劃自行調整)
    include('AllPay.Payment.Integration.php');
    try {
        
    	$obj = new AllInOne();
   
        //服務參數
        $obj->ServiceURL  = "https://payment-stage.opay.tw/Cashier/AioCheckOut/V4"; //服務位置
        $obj->HashKey     = '5294y06JbISpM5x9' ;                                          //測試用Hashkey，請自行帶入AllPay提供的HashKey
        $obj->HashIV      = 'v77hoKGq4kWxNNIS' ;                                          //測試用HashIV，請自行帶入AllPay提供的HashIV
        $obj->MerchantID  = '2000132';                                                    //測試用MerchantID，請自行帶入AllPay提供的MerchantID
        $obj->EncryptType = '1';                                                          //CheckMacValue加密類型，請固定填入1，使用SHA256加密


        //基本參數(請依系統規劃自行調整)
        $MerchantTradeNo = "Test".time();

        $obj->Send['ReturnURL']         = "http://www.opay.tw/receive.php" ;    //付款完成通知回傳的網址
        $obj->Send['MerchantTradeNo']   = $MerchantTradeNo;                           //訂單編號
        $obj->Send['MerchantTradeDate'] = date('Y/m/d H:i:s');                        //交易時間
        $obj->Send['TotalAmount']       = 2000;                                       //交易金額
        $obj->Send['TradeDesc']         = "good to drink" ;                           //交易描述
        $obj->Send['ChoosePayment']     = PaymentMethod::Tenpay ;                     //付款方式:Tenpay財付通

        //訂單的商品資料
        array_push($obj->Send['Items'], array('Name' => "歐付寶黑芝麻豆漿", 'Price' => (int)"2000",
                   'Currency' => "元", 'Quantity' => (int) "1", 'URL' => "dedwed"));


        //Tenpay財付通延伸參數(可依系統需求選擇是否代入)
        $obj->SendExtend['ExpireTime'] = ''; //付款截止時間只能帶入送出交易後的 72 小時(三天)之內時間。不填則預設為送出交易後的 72 小時。

        # 電子發票參數
        /*
        $obj->Send['InvoiceMark'] = InvoiceState::Yes;
        $obj->SendExtend['RelateNumber'] = $MerchantTradeNo;
        $obj->SendExtend['CustomerEmail'] = 'test@opay.tw';
        $obj->SendExtend['CustomerPhone'] = '0911222333';
        $obj->SendExtend['TaxType'] = TaxType::Dutiable;
        $obj->SendExtend['CustomerAddr'] = '台北市南港區三重路19-2號5樓D棟';
        $obj->SendExtend['InvoiceItems'] = array();
        // 將商品加入電子發票商品列表陣列
        foreach ($obj->Send['Items'] as $info)
        {
            array_push($obj->SendExtend['InvoiceItems'],array('Name' => $info['Name'],'Count' =>
                $info['Quantity'],'Word' => '個','Price' => $info['Price'],'TaxType' => TaxType::Dutiable));
        }
        $obj->SendExtend['InvoiceRemark'] = '測試發票備註';
        $obj->SendExtend['DelayDay'] = '0';
        $obj->SendExtend['InvType'] = InvType::General;
        */


        //產生訂單(auto submit至AllPay)
        $obj->CheckOut();

    } catch (Exception $e) {
    	echo $e->getMessage();
    } 


 
?>
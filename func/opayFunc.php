<?php 
function opayAllPayment($payment) {
    require_once(__DIR__. '/opay_php/sdk/AllPay.Payment.Integration.php');

    $obj = new AllInOne();

    /*
    $obj->ServiceURL = 'https://payment-stage.opay.tw/Cashier/AioCheckOut/V5';
    $obj->HashKey       = '5294y06JbISpM5x9';
    $obj->HashIV        = 'v77hoKGq4kWxNNiS';
    $obj->MerchantID    = '2000132';
     */
    $obj->ServiceURL = 'https://payment.opay.tw/Cashier/AioCheckOut/V5';
    $obj->HashKey       = 'Q6HITLw1kRBrCPKP';
    $obj->HashIV        = 'WHNMudhgpY3Uex93';
    $obj->MerchantID    = '1084005';

    $obj->EncryptType   = '1';

    $MerchantTradeNo = date('Ymd'). time();
    if(isset($payment['MerchantTradeNo']) == true)
        $MerchantTradeNo = $payment['MerchantTradeNo'];

    $obj->Send['ReturnURL']     = "https://". $_SERVER['HTTP_HOST']. '/paymentNotify.php?orderid='. $MerchantTradeNo;
    $obj->Send['ClientBackURL'] = "https://". $_SERVER['HTTP_HOST']. '/paymentResult.php';
    $obj->Send['MerchantTradeNo'] = $MerchantTradeNo;
    $obj->Send['MerchantTradeDate'] = date('Y/m/d H:i:s');
    $obj->Send['TotalAmount']   = $payment['money'];
    $obj->Send['TradeDesc']     = '虛擬卡商品交易 交易';
    $obj->Send['ChoosePayment'] = PaymentMethod::ALL;

    foreach($payment['items'] as $item) {
        array_push($obj->Send['Items'],
            array(
                'Name' => $item['Name'],
                'Price' => (int) $item['Price'],
                'Currency' => '元',
                'Quantity' => (int) $item['Quantity'],
                'URL' => 'dedwed',
            )
        );
    }

    $obj->CheckOut();
}

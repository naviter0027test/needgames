<?php

require_once(__DIR__. '/opayFunc.php');

session_start();

$orderItem = array();
$dispoints = isset($_SESSION['product']['dispoints']) ? $_SESSION['product']['dispoints'] : 0;
$price = $dispoints - (isset($_SESSION['discount']) ? $_SESSION['discount'] : 0);
$product = array(
    'Name' => isset($_SESSION['product']) ? $_SESSION['product']['productname'] : '',
    'Price' => $price,
    'Currency' => '元',
    'Quantity' => 1,
);
array_push($orderItem, $product);
$payment = array(
    'money' => $price,
    'items' => $orderItem,
);
if(isset($_SESSION['orderid'])) {
    $payment['MerchantTradeNo'] = $_SESSION['orderid'];
}

opayAllPayment($payment);
echo 'wait...';

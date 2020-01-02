<?php

session_start();
require_once(__DIR__. '/adm/config/config.php');
require_once(__DIR__. '/func/sendmail.php');
global $conf;
//if(isset($_GET['orderid']) && $_GET['orderid'] == $_SESSION['orderid']) {
    $pdom = new PDO('mysql:host='.$conf['dbhost_m'].';dbname='.$conf['dbname_m'], $conf['dbuser_m'], $conf['dbpass_m']);
    $pdom -> exec("set names ".$conf['db_encode']);
    $pdos = new PDO('mysql:host='.$conf['dbhost_s'].';dbname='.$conf['dbname_s'], $conf['dbuser_s'], $conf['dbpass_s']);
    $pdos -> exec("set names ".$conf['db_encode']);
    $pdod = new PDO('mysql:host='.$conf['dbhost_d'].';dbname='.$conf['dbname_d'], $conf['dbuser_d'], $conf['dbpass_d']);
    $pdod -> exec("set names ".$conf['db_encode']);

    $virnumber = $_SESSION['virnumber'];

    //取出訂單
    $orderid = $_SESSION['orderid'];
    $sql = "select * from ord_ where orderid = '$orderid'";
    $stat = $pdos->query($sql);
    $orderArr = $stat->fetchALL(PDO::FETCH_ASSOC);
    //print_r($orderArr);
    $order = $orderArr[0];

    //改變訂單狀態
    $sql = "update ord_ set statusid = :statusid where orderid = :orderid";
    $stat = $pdos->prepare($sql);
    $stat->execute(array( 'statusid' => 4, 'orderid' => $orderid));

    //察看是哪種虛擬卡
    $productid = $order['productid'];
    $sql = "select * from pro_ where productid = $productid";
    $stat = $pdos->query($sql);
    $productArr = $stat->fetchALL(PDO::FETCH_ASSOC);
    $product = $productArr[0];
    //echo "<br />";
    //print_r($product);
    $sendTo = $order['email'];
    unset($_SESSION['orderid']);
    unset($_SESSION['product']);
    if($product['vir'] == 1) {
        sendmail(4, $sendTo, $virnumber);
        unset($_SESSION['virnumber']);
        echo "<script>";
        echo "alert('虛擬卡已寄出，如有疑問再麻煩通知敝站管理者');";
        echo "location.href='./';";
        echo "</script>";
    }else{
        echo "<script>";
        echo "alert('商品購買結束，如有疑問再麻煩通知敝站管理者');";
        echo "location.href='./';";
        echo "</script>";
    }
//}

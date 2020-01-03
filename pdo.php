<?php
ini_set("display_errors", "On");
error_reporting(E_ALL & ~E_NOTICE);

$mysqli = new mysqli("146.66.116.66","kyomonwa_user","sitegrou", "kyomonwa_m");

    //如果连接错误
    if(mysqli_connect_errno()){
        echo "连接数据库失败：".mysqli_connect_error();
        $mysqli=null;
        exit;
    }
    //构造SQL语句
    $query = "SELECT * FROM `mem_`";
    //执行SQL语句
    $req = $mysqli->query($query);
	print_r($req);
    echo $mysqli->error; 

//exit();


$dsn = "mysql:host=localhost;dbname=needgam3_c";
$db = new PDO($dsn, "needgam3_c", "sitegrou");
$count = $db->query("SELECT * FROM `Usr_`");
$result_arr = $count->fetchAll();
print_r($result_arr);
$db = null;

?>

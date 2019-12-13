<?php
$dsn = "mysql:host=10.1.0.6;dbname=game_c";
$db = new PDO($dsn, "gamer", "Ty24947630");
 $db->query("set names `UTF8`");
$count = $db->query("SELECT * FROM `chatimg`");
$result_arr = $count->fetchAll();
print_r($result_arr);
$db = null;


?>

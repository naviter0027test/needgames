<?PHP
session_start();
echo "userid:".$_SESSION['userid'];
echo "<br>";
echo "key:".$_SESSION['key'];
echo "<br>";
echo "key:".$_SESSION['vercode'];
?>
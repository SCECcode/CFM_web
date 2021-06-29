<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$fname = $_POST['fname'];
$dstr = $_POST['dstr'];

$fp= fopen($fname,"w") or die("Unable to open file!"+$fname);
fwrite($fp,$dstr); 
fclose($fp);

pg_close($dbconn);
?>
</body>
</html>


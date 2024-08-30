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

$stub="../result/";
$file=$stub.$fname;

echo $file;

$fp= fopen($file,"w") or die("Unable to open file!"+$file);
fwrite($fp,$dstr); 
fclose($fp);

pg_close($dbconn);
?>
</body>
</html>


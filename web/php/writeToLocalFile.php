<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$fname = ($_GET['fname']);
$dstr = ($_GET['dstr']);

$fp= fopen($fname,"w") or die("Unable to open file!");
fwrite($fp,$dstr); fwrite($fp,"\n");
fclose($fp);

echo "<div data-side=\""+$fname+"\" data-params=\"ok\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


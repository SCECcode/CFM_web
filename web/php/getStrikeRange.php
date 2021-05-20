<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$query = "SELECT avg_strike FROM OBJECT_tb";
$query = "SELECT MIN(avg_strike) min, MAX(avg_strike) max FROM OBJECT_tb";
$result = pg_query($dbconn, $query);

$row = pg_fetch_row($result);
$min=$row[0];
$max=$row[1];

$arr = array('min' => $min, 'max' => $max);
$arrstring = htmlspecialchars(json_encode($arr), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"strike-range\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");
$mindepth = floatVal($_GET['min']);
$maxdepth = floatVal($_GET['max']);

$dbconn = getConnection();

$query = "SELECT Lon, Lat, Depth FROM EQ_hauksson_tb WHERE Depth > $1 AND Depth < $2";

$result = pg_prepare($dbconn, "my_query", $query);
$data = array($mindepth, $macdepth);
$result = pg_execute($dbconn, "my_query", $data);

$eqList=array();

while($row = pg_fetch_row($result)) {
    array_push($eqList, makeEQDepthObj($row));
}

$eqstring = htmlspecialchars(json_encode($eqList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"quakesByDepth\" data-params=\"";
echo $eqstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


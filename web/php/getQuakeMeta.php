<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$dbconn = getConnection();

$query = "SELECT MIN(EventTime) minTime, MAX(EventTime) maxTime, MIN(Lon) minLon, MAX(Lon) maxLon, MIN(Lat) minLat, MAX(Lat) maxLat, MIN(Depth) minDepth, MAX(Depth) maxDepth, MIN(Mag) minMag, MAX(Mag) maxMag, count(gid) total  FROM EQ_tb WHERE Dataset = 'Hauksson'";

$result = pg_query($dbconn, $query);
$row = pg_fetch_row($result);

$arr = array( 'Hauksson' => makeEQMetaObj($row) );

$arrstring = htmlspecialchars(json_encode($arr), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"quake-meta\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


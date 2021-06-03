<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$dbconn = getConnection();

$query = "SELECT MIN(EventTime) minTime, MAX(EventTime) maxTime, MIN(Lon) minLon, MAX(Lon) maxLon, MIN(Lat) minLat, MAX(Lat) maxLat, MIN(Depth) minDepth, MAX(Depth) maxDepth, MIN(Mag) minMag, MAX(Mag) maxMag, count(gid) total  FROM EQ_tb";
$result = pg_query($dbconn, $query);
$row = pg_fetch_row($result);

$minTime = $row[0];
$maxTime = $row[1];
$minLon = $row[2];
$maxLon = $row[3];
$minLat = $row[4];
$maxLat = $row[5];
$minDepth = $row[6];
$maxDepth = $row[7];
$minMag = $row[8];
$maxMag = $row[9];
$total = $row[10];

$arr = array( 'total' => $total, 'minTime' => $minTime, 'maxTime' => $maxTime, 'minLon' => $minLon, 'maxLon' => $maxLon, 'minLat' => $minLat, 'maxLat' => $maxLat, 'minDepth' => $minDepth, 'maxDepth' => $maxDepth, 'minMag' => $minMag, 'maxMag' => $maxMag);

$arrstring = htmlspecialchars(json_encode($arr), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"quake-meta\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


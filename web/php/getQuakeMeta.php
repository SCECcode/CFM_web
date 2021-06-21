<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$quake_type = intVal($_GET['quake_type']);

$dbconn = getConnection();

if ($quake_type == $quake_type_Hauksson ) { 
  $query = "SELECT MIN(EventTime) minTime, MAX(EventTime) maxTime, MIN(Lon) minLon, MAX(Lon) maxLon, MIN(Lat) minLat, MAX(Lat) maxLat, MIN(Depth) minDepth, MAX(Depth) maxDepth, MIN(Mag) minMag, MAX(Mag) maxMag, count(gid) total  FROM EQ_hauksson_tb";
}
if ($quake_type == $quake_type_Ross ) { 
  $query = "SELECT MIN(EventTime) minTime, MAX(EventTime) maxTime, MIN(Lon) minLon, MAX(Lon) maxLon, MIN(Lat) minLat, MAX(Lat) maxLat, MIN(Depth) minDepth, MAX(Depth) maxDepth, MIN(Mag) minMag, MAX(Mag) maxMag, count(gid) total  FROM EQ_ross_tb";
}

$result = pg_query($dbconn, $query);
$row = pg_fetch_row($result);

if ($quake_type == $quake_type_Hauksson ) { 
  $arr = array( 'Hauksson' => makeEQMetaObj($row) );
}
if ($quake_type == $quake_type_Ross ) { 
  $arr = array( 'Ross' => makeEQMetaObj($row) );
}

$arrstring = htmlspecialchars(json_encode($arr), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"quake-meta\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


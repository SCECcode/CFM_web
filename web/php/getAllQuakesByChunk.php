<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$dbconn = getConnection();

$quake_type = intVal($_GET['quake_type']);
$startpoint = intVal($_GET['startpoint']);
$endpoint = intVal($_GET['endpoint']);

if ($quake_type == $quake_type_Hauksson ) { 
  $query = "SELECT EventId, Lon, Lat, Depth, Mag, EventTime FROM EQ_hauksson_tb WHERE gid > $1 AND gid <= $2";
}
if ($quake_type == $quake_type_Significant ) { 
  $query = "SELECT EventId, Lon, Lat, Depth, Mag, EventTime, Description FROM EQ_significant_tb WHERE gid > $1 AND gid <= $2";
}
$data = array($startpoint, $endpoint);
$result = pg_query_params($dbconn, $query, $data);

$eqList=array();

while($row = pg_fetch_row($result)) {
  if($quake_type == $quake_type_Significant) {
    array_push($eqList, makeEQChunkWithDescriptionObj($row));
    } else {
      array_push($eqList, makeEQChunkObj($row));
  }
}

$eqstring = htmlspecialchars(json_encode($eqList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allQuakesByChunk\" data-params=\"";
echo $eqstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


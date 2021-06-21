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
if ($quake_type == $quake_type_Ross ) { 
  $query = "SELECT EventId, Lon, Lat, Depth, Mag, EventTime FROM EQ_ross_tb WHERE gid > $1 AND gid <= $2";
}

$result = pg_prepare($dbconn, "my_query", $query);
$data = array($start, $end);
$result = pg_execute($dbconn, "my_query", $data);

$eqList=array();

while($row = pg_fetch_row($result)) {
    array_push($eqList, makeEQChunkObj($row));
}

$eqstring = htmlspecialchars(json_encode($eqList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allQuakesByChunk\" data-params=\"";
echo $eqstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


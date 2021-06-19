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
$current_chunk_orig = $_GET['current_chunk'];
$current_chunk = intVal($_GET['current_chunk']);
$step = intVal($_GET['step']);

$start_gid= $step * $current_chunk; 
$end_gid= $start_gid + $step; 

if ($quake_type == $quake_type_Hauksson ) { 
  $query = "SELECT EventId, Lon, Lat, Depth, Mag, EventTime FROM EQ_tb WHERE gid >= $1 AND gid < $2 AND Dataset = 'Hauksson'";
}
if ($quake_type == $quake_type_Ross ) { 
  $query = "SELECT EventId, Lon, Lat, Depth, Mag, EventTime FROM EQ_tb WHERE gid >= $1 AND gid < $2 AND Dataset = 'Ross'";
}

$result = pg_prepare($dbconn, "my_query", $query);
$data = array($start_gid, $end_gid);
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


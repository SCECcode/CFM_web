<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$dbconn = getConnection();

$current_chunk = intVal($_GET['current_chunk']);
$step = intVal($_GET['step']);

$start_gid= $step * $current_chunk; 
$end_gid= $start_gid + $step; 

echo "current_chunk";
echo $current_chunk;
echo "step";
echo $step;

$query = "SELECT Lon, Lat, Depth, Mag FROM EQ_tb WHERE gid >= $1 AND gid < $2";

$result = pg_prepare($dbconn, "my_query", $query);
$data = array($start_gid, $end_gid);
$result = pg_execute($dbconn, "my_query", $data);

$eqList=array();

echo "got result";

while($row = pg_fetch_row($result)) {
    array_push($eqList, makeEQChunkObj($row));
}

$eqstring = htmlspecialchars(json_encode($eqList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allEQsChunk\" data-params=\"";
echo $eqstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$objgid = intVal($_GET['obj_gid']);

$query = "select ST_AsGeoJSON(ST_TRANSFORM(TRACE_tb.geom,4326)),OBJECT_tb.name from OBJECT_tb,TRACE_tb where OBJECT_tb.gid=$1 and TRACE_tb.gid=ANY(OBJECT_tb.trace_tb_gid)";
$data = array($objgid);

$result = pg_query_params($dbconn, $query, $data);

// should only has 1 row and 2 data
$row = pg_fetch_row($result);

$geomList=array();
array_push($geomList, $row[0]);

$resultarray = new \stdClass();
$resultarray->geoms = $geomList;

$arrstring = htmlspecialchars(json_encode($resultarray),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geo-json\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


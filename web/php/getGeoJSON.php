<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$dbconn = pg_connect("host=db port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$objgid = intVal($_GET['obj_gid']);

$query = "select ST_AsGeoJSON(ST_TRANSFORM(TRACE_tb.geom,4326)),OBJECT_tb.name from OBJECT_tb,TRACE_tb where OBJECT_tb.gid=$1 and OBJECT_tb.trace_tb_gid=TRACE_tb.gid";
$result = pg_prepare($dbconn, "my_query", $query);

$data = array($objgid);
$result = pg_execute($dbconn, "my_query", $data);

// should only has 2 row
$row = pg_fetch_row($result);
$arrstring = htmlspecialchars(json_encode($row[0]),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geo-json\" data-params=\"[";
echo $arrstring;
echo "]\" style=\"display:flex\">$arrstring</div>";

pg_close($dbconn);
?>
</body>
</html>


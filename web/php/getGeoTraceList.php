<!DOCTYPE html>
<html>
<head>
</head>
<body>
<?php

$dbconn = pg_connect("host=db port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT gid,name FROM OBJECT_tb where Trace_tb_gid is not null";
$result = pg_query($dbconn, $query);
$gidList=array();
while($row = pg_fetch_row($result)) {
    array_push($gidList, $row[0]);
}
$query = "SELECT gid,name FROM OBJECT_tb where Trace_tb_gid is null";
$result = pg_query($dbconn, $query);
$nogidList=array();
while($row = pg_fetch_row($result)) {
    array_push($nogidList, $row[0]);
}

$gidstring = htmlspecialchars(json_encode($gidList), ENT_QUOTES, 'UTF-8');
$nogidstring = htmlspecialchars(json_encode($nogidList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allGeoList\" data-params=\"";
echo $gidstring;
echo "\" style=\"display:flex\"></div>";
echo "<div data-side=\"allNoGeoList\" data-params=\"";
echo $nogidstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


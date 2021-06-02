<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$dbconn = getConnection();

$query = "SELECT gid, EventTime, EventID, Lon, Lat, Depth, Mag FROM EQ_tb WHERE Mag > 3";

$result = pg_query($dbconn, $query);

$eqList=array();

while($row = pg_fetch_row($result)) {
    array_push($eqList, makeEQObj($row));
}

$eqstring = htmlspecialchars(json_encode($eqList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allEQs\" data-params=\"";
echo $eqstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


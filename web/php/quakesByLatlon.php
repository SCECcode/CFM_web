<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$swlat = floatVal($_GET['swlat']);
$swlon = floatVal($_GET['swlon']);
$nelat = floatVal($_GET['nelat']);
$nelon = floatVal($_GET['nelon']);

//echo "lat range: ", $swlat,", ",$nelat,"<br>";
//echo "lon range: ", $swlon,", ",$nelon,"<br>";

$query = "SELECT gid, EventTime, EventID, Lon, Lat, Depth, Mag FROM EQ_hauksson_tb WHERE ST_INTERSECTS(ST_MakeEnvelope( $1, $2, $3, $4, 4326), EQ_tb.geom)";

$result = pg_prepare($dbconn, "my_query", $query);
$data = array($swlon, $swlat, $nelon, $nelat);
$result = pg_execute($dbconn, "my_query", $data);

//echo $query;
//echo "<br>";
//echo $swlon,",",$swlat;
//echo "<br>";
//echo $nelon,",",$nelat,",","4326), EQ_tb.geom)<br>";
//echo $result;

$resultList=array();
$num = pg_numrows($result);
echo "SIZE of result..",$num;

if ( $num < 50000 ) {
while($row = pg_fetch_row($result)) {
    array_push($resultList, makeEQObj($row));
}
} else {
echo "SIZE of result..",$num;
}

$resultstring = htmlspecialchars(json_encode($resultList), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"quakesByLatLon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


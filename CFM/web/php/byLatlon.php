<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

// if there are only 1 set of lat lon, then expand into a range



$firstlat = floatVal($_GET['firstlat']);
$secondlat = floatVal($_GET['secondlat']);
$firstlon = floatVal($_GET['firstlon']);
$secondlon = floatVal($_GET['secondlon']);

if($secondlat == "0") { 
  $secondlat = $firstlat+0.001;
  $firstlat = $firstlat-0.001;
}
if($secondlon == "0") {
  $secondlon = $firstlon+0.001;
  $firstlon = $firstlon-0.001;
}

$minlon = $firstlon;
$maxlon = $secondlon;
if($firstlon > $secondlon) {
   $minlon = $secondlon;
   $maxlon = $firstlon;
}

$minlat = $firstlat;
$maxlat = $secondlat;
if($firstlat > $secondlat) {
  $minlat = $secondlat;
  $maxlat = $firstlat;
}

echo "lat range: ", $minlat,", ",$maxlat,"<br>";
echo "lon range: ", $minlon,", ",$maxlon,"<br>";

$query00 = "SELECT OBJECT_tb.name, TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where ST_Intersects(ST_MakePoint($1,$2)::geography, (ST_Transform(geom,4326)::geography))";

$query01 = "SELECT OBJECT_tb.gid, OBJECT_tb.name, TRACE_tb.gid from TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where TRACE_tb.geom && ST_Transform(ST_MakeEnvelope( $1, $2, $3, $4, 4326), 26711)";

$query02 = "SELECT OBJECT_tb.gid,OBJECT_tb.name FROM TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where TRACE_tb.geom && ST_Transform(ST_MakeEnvelope( $1, $2, $3, $4, 4326), 26711)";

$query = "SELECT OBJECT_tb.gid,OBJECT_tb.name FROM TRACE_tb INNER JOIN OBJECT_tb ON TRACE_tb.gid = OBJECT_tb.trace_tb_gid where ST_INTERSECTS(ST_Transform(ST_MakeEnvelope( $1, $2, $3, $4, 4326), 26711), TRACE_tb.geom)";

$result = pg_prepare($dbconn, "my_query", $query);

$data = array($minlon, $minlat, $maxlon, $maxlat);
$result = pg_execute($dbconn, "my_query", $data);

$resultList=array();
while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->gid=$row[0];
    $item->name=$row[1];
    array_push($resultList, json_encode($item));
}

$resultstring = htmlspecialchars(json_encode($resultList), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"resultByLatLon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

// convert from USGS's WGS84 utm to NAD27 utm

$lat = floatVal($_GET['lat']);
$lon = floatVal($_GET['lon']);
// 10S or 10T
$zone = ($_GET['zone']);

$query = "echo \"$1 $2\" | cs2cs -f '%.4f' +proj=latlong +datum=WGS84 +to +proj=utm +zone=11 +datum=NAD27";

$data = array($lon, $lat);
$result = pg_query_params($dbconn, $query, $data);

$tokens = preg_split('/\s+/', trim($result));

$item = new \stdClass();
if(count($tokens) >= 2) {
  $item->easting=float($tokens[0]);
  $item->northing=float($tokens[0]);
}
    
$resultstring = htmlspecialchars(json_encode($item), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"proj2NAD27\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


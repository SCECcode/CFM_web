<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");

// convert from USGS's WGS84 utm to NAD27 utm
$lat = escapeshellarg($_GET['lat']);
$lon = escapeshellarg($_GET['lon']);

$query = "echo $lon $lat | cs2cs -f '%.4f' +proj=latlong +datum=WGS84 +to +proj=utm +zone=11 +datum=NAD27";

$result=exec(escapeshellcmd($query), $retval, $status);

print($query);
print($retval);
print_r($result);
print($status);

$tokens = preg_split('/\s+/', trim($result));
$item = new \stdClass();
if(count($tokens) >= 2) {
  $item->easting=floatVal($tokens[0]);
  $item->northing=floatVal($tokens[1]);
}
    
$resultstring = htmlspecialchars(json_encode($item), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"proj2NAD27\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");

// convert from USGS's WGS84 utm to NAD27 utm
$lat = ($_GET['lat']);
$lon = ($_GET['lon']);

//$query = "echo '$lon $lat' | cs2cs -f '%.4f' +proj=latlong +datum=WGS84 +to +proj=utm +zone=11 +datum=NAD27 2>&1";

$tmpfile = tempnam(sys_get_temp_dir(), 'cs2cs_');
$tmpfp= fopen($tmpfile,"w+") or die("Unable to open file!");

fwrite($tmpfp, "#!/bin/bash\n");
fwrite($tmpfp, "cs2cs -f '%.4f' +proj=latlong +datum=WGS84 +to +proj=utm +zone=11 +datum=NAD27 << EOF\n");
fwrite($tmpfp, "$lon $lat\n");
fwrite($tmpfp, "EOF\n");
fclose($tmpfp);

chmod($tmpfile, 0755);
$result=exec(escapeshellcmd($tmpfile), $retval, $status);

unlink($tmpfile);

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


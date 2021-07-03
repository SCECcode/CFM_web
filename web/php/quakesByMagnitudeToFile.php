<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$quake_type = intVal($_GET['quake_type']);
$msg = $_GET['msg'];
$uid = intVal($_GET['uid']);
$minmag = floatVal($_GET['min']);
$maxmag = floatVal($_GET['max']);

$dbconn = getConnection();

$fname="./data/seismicity/";

if ($quake_type == $quake_type_Hauksson) {
  $query = "SELECT Easting, Northing, Depth FROM EQ_hauksson_tb WHERE Mag > $1 AND Mag < $2";
  $fname=$fname+"hauksson_mag_"+$uid+".utm";
  } else {
  $query = "SELECT Easting, Northing, Depth FROM EQ_ross_tb WHERE Mag > $1 AND Mag < $2";
  $fname=$fname+"ross_mag_"+$uid+".utm";
}
$fp= fopen($fname,"w") or die("Unable to open file!"+$fname);

$result = pg_prepare($dbconn, "my_query", $query);
$data = array($minmag, $maxmag);
$result = pg_execute($dbconn, "my_query", $data);

$dstr="##\n";
fwrite($fp,$dstr); 
$dstr="## "+$fname+"\n";
fwrite($fp,$dstr); 
$dstr="##\n";
fwrite($fp,$dstr); 
$dstr="> \""+$msg+"\"\n";
fwrite($fp,$dstr); 

while($row = pg_fetch_row($result)) {
    $easting=floatVal($row[0]);
    $northing=floatVal($row[1]);
    $depth=floatVal($row[2])*1000;
    $dstr="  "+$easting+"   "+northing+"   "+$depth+"\n";
    fwrite($fp,$dstr); 
}

fclose($fp);

echo "<div data-side=\"quakesByMagnitudeToFile\" data-params=\"";
echo $fname;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


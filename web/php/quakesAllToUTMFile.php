<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declare.php");
include("util.php");

$quake_type = $_GET['quake_type'];
$msg = $_GET['msg'];
$uid = $_GET['uid'];

$dbconn = getConnection();

$fname="../result/";

if ($quake_type == $quake_type_Hauksson) {
  $query = "SELECT Easting, Northing, Depth FROM EQ_hauksson_tb";
  $fname=$fname."hauksson_".$uid.".utm";
}
echo $fname;

$fp= fopen($fname,"w") or die("Unable to open file!"+$fname);
$result = pg_query($dbconn, $query);

$dstr="##\n";
fwrite($fp,$dstr); 
$dstr="## ".$fname."\n";
fwrite($fp,$dstr); 
$dstr="##\n";
fwrite($fp,$dstr); 
$dstr="> ".$msg."\n";
fwrite($fp,$dstr); 

while($row = pg_fetch_row($result)) {
    $easting=floatVal($row[0]);
    $northing=floatVal($row[1]);
    $depth=floatVal($row[2]) * -1000;
    $dstr="  ".$easting."   ".$northing."   ".$depth."\n";
    fwrite($fp,$dstr); 
}

fclose($fp);

echo "<div data-side=\"quakesAllToFile\" data-params=\"";
echo $fname;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


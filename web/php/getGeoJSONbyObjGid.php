<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");

$dbconn = getConnection();

$objarray = array($_GET['obj_gid']);

$resultarray=array();
foreach ($objarray as $objgid) {
  $geom=getGeom($dbconn,$objgid);
  $geom->objgid=$objgid;
  array_push($resultarray, $geom);
}


$arrstring = htmlspecialchars(json_encode($resultarray),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geo-json\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\">$arrstring</div>";

pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$objgid = intVal($_GET['obj_gid']);

#$resultarray=array();
#$geom=getGeom($objgid);
#array_push($resultarray, $geom);
$resultarray=getGeom($objgid);

$arrstring = htmlspecialchars(json_encode($resultarray),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geo-json\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\">$arrstring</div>";

pg_close($dbconn);
?>
</body>
</html>


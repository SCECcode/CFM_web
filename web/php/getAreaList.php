<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$query = "SELECT name,abb FROM AREA_tb";
$result = pg_query($dbconn, $query);

$areaList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->name=$row[0];
    $item->abb=$row[1];
    array_push($areaList, json_encode($item));
}

$areastring = htmlspecialchars(json_encode($areaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"areas\" data-params=\"";
echo $areastring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=db port=5432 dbname=CFM52_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT name,abb FROM ZONE_tb";
$result = pg_query($dbconn, $query);

$zoneList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->name=$row[0];
    $item->abb=$row[1];
    array_push($zoneList, json_encode($item));
}

$zonestring = htmlspecialchars(json_encode($zoneList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"zones\" data-params=\"";
echo $zonestring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


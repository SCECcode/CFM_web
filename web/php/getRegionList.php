<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT name,abb FROM REGION_tb";
$result = pg_query($dbconn, $query);

$regionList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->name=$row[0];
    $item->abb=$row[1];
    array_push($regionList, json_encode($item));
}

$regionstring = htmlspecialchars(json_encode($regionList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"regions\" data-params=\"";
echo $regionstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


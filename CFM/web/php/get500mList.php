<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT OBJECT_500m_tb.gid, OBJECT_500m_tb.name, OBJECT_500m_tb.url, OBJECT_tb.gid FROM OBJECT_tb, OBJECT_500m_tb where OBJECT_tb.object_500m_tb_gid=OBJECT_500m_tb.gid ";

$result = pg_query($dbconn, $query);

$obj500mList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->gid=$row[0];
    $item->name=$row[1];
    $item->url=$row[2];
    $item->objgid=$row[3];
    array_push($obj500mList, json_encode($item));
}

$objstring = htmlspecialchars(json_encode($obj500mList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"obj500m\" data-params=\"";
echo $objstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


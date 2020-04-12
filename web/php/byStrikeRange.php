<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$min = floatVal($_GET['min']);
$max = floatVal($_GET['max']);

$query = "SELECT gid,name FROM OBJECT_tb WHERE strike IS NOT NULL AND strike > $1 AND strike < $2";

$result = pg_prepare($dbconn, "my_query", $query);

$data = array($min,$max);
$result = pg_execute($dbconn, "my_query", $data);

$resultList=array();
while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->gid=$row[0];
    $item->name=$row[1];
    array_push($resultList, json_encode($item));
}

$resultstring = htmlspecialchars(json_encode($resultList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"resultByStrikeRange\" data-params=\"";
echo $resultstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


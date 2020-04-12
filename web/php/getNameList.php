<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$query = "SELECT name,abb FROM FAULT_tb";
$result = pg_query($dbconn, $query);

$nameList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->name=$row[0];
    $item->abb=$row[1];
    array_push($nameList, json_encode($item));
}

$namestring = htmlspecialchars(json_encode($nameList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"names\" data-params=\"";
echo $namestring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=db port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT name,abb FROM SYSTEM_tb";
$result = pg_query($dbconn, $query);

$systemList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->name=$row[0];
    $item->abb=$row[1];
    array_push($systemList, json_encode($item));
}

$systemstring = htmlspecialchars(json_encode($systemList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"systems\" data-params=\"";
echo $systemstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


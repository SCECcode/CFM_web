<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=db port=5432 dbname=CFM5_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$q = ($_GET['q']);

$query = "SELECT OBJECT_tb.gid,OBJECT_tb.name FROM OBJECT_tb,SYSTEM_tb where SYSTEM_tb.abb=$1 and SYSTEM_tb.gid=OBJECT_tb.SYSTEM_tb_gid";

$result = pg_prepare($dbconn, "my_query", $query);

$data = array($q);

$result = pg_execute($dbconn, "my_query", $data);

$resultList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->gid=$row[0];
    $item->name=$row[1];
    array_push($resultList, json_encode($item));
}

$resultstring = htmlspecialchars(json_encode($resultList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"resultBySystem\" data-params=\"";
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
pg_close($dbconn);
?>
</body>
</html>


<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$q = ($_GET['q']);

$query = "SELECT OBJECT_tb.gid,OBJECT_tb.name FROM OBJECT_tb,SECTION_tb where SECTION_tb.abb=$1 and SECTION_tb.gid=OBJECT_tb.SECTION_tb_gid";


$result = pg_prepare($dbconn, "my_query", $query);

$data = array($q);

$result = pg_execute($dbconn, "my_query", $data);

$resultList=array();
while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->gid=$row[0];
    $item->name=$row[1];
    array_push($resultList, $item);
}

$resultstring = htmlspecialchars(json_encode($resultList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"resultBySection\" data-params=\"";
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
pg_close($dbconn);
?>
</body>
</html>


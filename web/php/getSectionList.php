<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

$dbconn = pg_connect("host=db port=5432 dbname=CFM52_db user=webonly password=scec");
if (!$dbconn) { die('Could not connect'); }

$query = "SELECT name,abb FROM SECTION_tb";
$result = pg_query($dbconn, $query);

$sectionList=array();

while($row = pg_fetch_row($result)) {
    $item = new \stdClass();
    $item->name=$row[0];
    $item->abb=$row[1];
    array_push($sectionList, json_encode($item));
}

$sectionstring = htmlspecialchars(json_encode($sectionList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"sections\" data-params=\"";
echo $sectionstring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


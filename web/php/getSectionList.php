<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

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


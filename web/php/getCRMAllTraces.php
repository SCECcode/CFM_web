<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include("declareCRM.php");
include("utilCRM.php");

$dbconn = getCRMConnection();

$query = "SELECT gid, domain_id, name, sliver, state, color from REGION_tb";
$result = pg_query($dbconn, $query);

$metaList=array();

while($row = pg_fetch_row($result)) {
    array_push($metaList, makeCRMObj($row));
}

$metastring = htmlspecialchars(json_encode($metaList), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"allTraces\" data-params=\"";
echo $metastring;
echo "\" style=\"display:flex\"></div>";

pg_close($dbconn);
?>
</body>
</html>


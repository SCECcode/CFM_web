<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$q = ($_GET['q']);

$query = "SELECT gid,name FROM OBJECT_tb WHERE to_tsvector(name) @@ plainto_tsquery($1)";

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

echo "<div data-side=\"resultByKeyword\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>"; 

pg_close($dbconn);
?>    
</body>
</html>


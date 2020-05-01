<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");
$dbconn = getConnection();

$objgid = intVal($_GET['obj_gid']);
$data = array($objgid);

$query = "select TRACES_tb_gid, name from OBJECT_tb where gid=$1";
$result = pg_prepare($dbconn, "my_query", $query);
$result = pg_execute($dbconn, "my_query", $data);

$geomList=array();

while($row = pg_fetch_row($result)) {
   $tgid=$row;
   $query2 = "select geom from TRACE_tb where gid=$tgid";
   $result2 = pg_prepare($dbconn, "my_query2", $query2);
   $result2 = pg_execute($dbconn, "my_query2", $data);
   array_push($geomList, $result2);
}

$arrstring = htmlspecialchars(json_encode($geomList),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geos-json\" data-params=\"[";
echo $arrstring;
echo "]\" style=\"display:flex\">$arrstring</div>";

pg_close($dbconn);
?>
</body>
</html>


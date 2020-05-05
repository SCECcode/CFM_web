<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("utilCRM.php");
$dbconn = getConnection();

$gid = $_GET['domain_gid'];

$query = "select TRACE_tb_gid from REGION_tb where gid=".$gid;
$result = pg_query($dbconn, $query);

$geomList=array();
$tgidList=array();

$row = pg_fetch_row($result);
$glist= $row[0];

$data = substr($glist,1,-1);
$tgids=explode(",",$data);

foreach ($tgids as $tgid) {
   array_push($tgidList,intVal($tgid));
   $nquery = "select gid, ST_AsGeoJSON(ST_TRANSFORM(TRACE_tb.geom,4326)) from TRACE_tb where gid=".$tgid;
   $nresult = pg_query($dbconn, $nquery);
   $nrow = pg_fetch_row($nresult);
   array_push($geomList, $nrow[1]);
}

$resultarray = new \stdClass();
$resultarray->geoms = $geomList;
$resultarray->tgids = $tgidList;

$arrstring = htmlspecialchars(json_encode($resultarray),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geo-json\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\">$arrstring</div>";

pg_close($dbconn);
?>
</body>
</html>


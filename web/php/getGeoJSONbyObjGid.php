<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");

function getGeom($objgid) {

$data = array($objgid);

$query = "select TRACE_tb_gid from OBJECT_tb where gid=$1;";
$result = pg_prepare($dbconn, "my_query", $query);
$result = pg_execute($dbconn, "my_query", $data);

$geomList=array();
$tgidList=array();
$blindList=array();
$ngidList=array();

$row = pg_fetch_row($result);
$glist= $row[0];

$data = substr($glist,1,-1);
$tgids=explode(",",$data);

foreach ($tgids as $tgid) {
   array_push($tgidList,intVal($tgid));
   $nquery = "select gid, ___isblind, ST_AsGeoJSON(ST_TRANSFORM(TRACE_tb.geom,4326)) from TRACE_tb where gid=".$tgid;
   $nresult = pg_query($dbconn, $nquery);
   $nrow = pg_fetch_row($nresult);
   array_push($geomList, $nrow[2]);
   array_push($ngidList, intVal($nrow[0]));
   if ( empty($nrow[1]) ) {
     array_push($blindList, 0);
   } else {
     array_push($blindList, intVal($nrow[1]));
   }
}

$newresult = new \stdClass();
$newresult->geoms = $geomList;
$newresult->tgids = $tgidList;
$newresult->ogids = $ngidList;
$newresult->blinds = $blindList;

return $newresult;

}

$dbconn = getConnection();

$objgid = intVal($_GET['obj_gid']);

#$resultarray=array();
#$geom=getGeom($objgid);
#array_push($resultarray, $geom);
$resultarray=getGeom($objgid);
$resultarray->objgid=$objgid;

$arrstring = htmlspecialchars(json_encode($resultarray),ENT_QUOTES,'UTF-8');

echo "<div data-side=\"geo-json\" data-params=\"";
echo $arrstring;
echo "\" style=\"display:flex\">$arrstring</div>";

pg_close($dbconn);
?>
</body>
</html>


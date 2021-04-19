<?php
function getConnection() {
  $dbconn = @pg_connect("host=db port=5432 dbname=CFM53_db user=webonly password=scec");

  if (!$dbconn) { // try localhost
    $dbconn = pg_connect("host=localhost port=5432 dbname=CFM53_db user=webonly password=scec");
  }

  if (!$dbconn) { die('Could not connect'); }
  return $dbconn;
}

function makeObj($row) {

include ("declare.php");

$myObj = new \stdClass();

$myObj->gid=$row[$gid];
$myObj->name=$row[$name];
$myObj->alternative=$row[$alternative];
$myObj->source_author=$row[$source_author];
$myObj->last_update=$row[$last_update];
$myObj->descriptor=$row[$descriptor];
$myObj->descriptor=$row[$descriptor];
$myObj->avg_strike=$row[$avg_strike];
$myObj->avg_dip=$row[$avg_dip];
$myObj->area_km2=$row[$area_km2];
$myObj->exposure=$row[$exposure];
$myObj->slip_sense=$row[$slip_sense];
$myObj->ID_comments=$row[$ID_comments];
$myObj->USGS_ID=$row[$USGS_ID];
$myObj->fault_strand_model_description=$row[$fault_strand_model_description];
$myObj->reference=$row[$reference];

$myObj->area=$row[$area];
$myObj->zone=$row[$zone];
$myObj->section=$row[$section];
$myObj->fault=$row[$fault];
$myObj->TRACE_tb_gid=$row[$TRACE_tb_gid];

$myJSON = json_encode($myObj);

return $myJSON;
}

function getGeom($dbconn,$objgid) {

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

?>

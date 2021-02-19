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
?>

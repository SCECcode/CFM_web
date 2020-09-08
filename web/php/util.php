<?php
function getConnection() {
  $dbconn = @pg_connect("host=db port=5432 dbname=CFM52_db user=webonly password=scec");

  if (!$dbconn) { // try localhost
    $dbconn = pg_connect("host=localhost port=5432 dbname=CFM52_db user=webonly password=scec");
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
$myObj->source_Author=$row[$source_author];
$myObj->CFM_version=$row[$CFM_version];
$myObj->model_description=$row[$model_description];
$myObj->descriptor=$row[$descriptor];
$myObj->strike=$row[$strike];
$myObj->dip=$row[$dip];
$myObj->area_m2=$row[$area_m2];
$myObj->exposure=$row[$exposure];
$myObj->slip_sense=$row[$slip_sense];
$myObj->reference=$row[$reference];
$myObj->reference_check=$row[$reference_check];
$myObj->ID_comments=$row[$ID_comments];
$myObj->USGS_ID=$row[$USGS_ID];
$myObj->area=$row[$area];
$myObj->zone=$row[$zone];
$myObj->section=$row[$section];
$myObj->fault=$row[$fault];
$myObj->TRACE_tb_gid=$row[$TRACE_tb_gid];

$myJSON = json_encode($myObj);

return $myJSON;
}
?>

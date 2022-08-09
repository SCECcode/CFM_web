<?php
function getConnection() {
  $db=getenv("CFM_DB");

  if($db == "") { die('Could not get CFM_DB environment value'); }

  $dbconn = @pg_connect("host=db port=5432 dbname=$db user=webonly password=scec");

  if (!$dbconn) { // try localhost
    $dbconn = pg_connect("host=localhost port=5432 dbname=$db user=webonly password=scec");
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

function makeEQMetaObj($row) {
include ("declare.php");

$myObj = new \stdClass();

$myObj->minTime = $row[0];
$myObj->maxTime = $row[1];
$myObj->minLon = $row[2];
$myObj->maxLon = $row[3];
$myObj->minLat = $row[4];
$myObj->maxLat = $row[5];
$myObj->minDepth = $row[6];
$myObj->maxDepth = $row[7];
$myObj->minMag = $row[8];
$myObj->maxMag = $row[9];
$myObj->total = $row[10];

$myJSON = json_encode($myObj);

return $myJSON;
}

function makeEQLatlonObj($row) {
include ("declare.php");

$myObj = new \stdClass();

$myObj->gid=$row[$eq_gid_latlon];
$myObj->EventTime=$row[$eq_EventTime_latlon];
$myObj->EventID=$row[$eq_EventID_latlon];
$myObj->Lon=$row[$eq_Lon_latlon];
$myObj->Lat=$row[$eq_Lat_latlon];
$myObj->Depth=$row[$eq_Depth_latlon];
$myObj->Mag=$row[$eq_Mag_latlon];

$myJSON = json_encode($myObj);

return $myJSON;
}

function makeEQLatlonWithDescriptionObj($row) {
include ("declare.php");

$myObj = new \stdClass();

$myObj->gid=$row[$eq_gid_latlon];
$myObj->EventTime=$row[$eq_EventTime_latlon];
$myObj->EventID=$row[$eq_EventID_latlon];
$myObj->Lon=$row[$eq_Lon_latlon];
$myObj->Lat=$row[$eq_Lat_latlon];
$myObj->Depth=$row[$eq_Depth_latlon];
$myObj->Mag=$row[$eq_Mag_latlon];
$myObj->Description=$row[$eq_Description_latlon];

$myJSON = json_encode($myObj);

return $myJSON;
}

function makeEQDepthObj($row) {
include ("declare.php");
$myObj = new \stdClass();
$myObj->Lon=$row[$eq_Lon_depth];
$myObj->Lat=$row[$eq_Lat_depth];
$myObj->Depth=$row[$eq_Depth_depth];
$myJSON = json_encode($myObj);
return $myJSON;
}

function makeEQDepthWithDescriptionObj($row) {
include ("declare.php");
$myObj = new \stdClass();
$myObj->Lon=$row[$eq_Lon_depth];
$myObj->Lat=$row[$eq_Lat_depth];
$myObj->Depth=$row[$eq_Depth_depth];
$myObj->Description=$row[$eq_Description_depth];
$myJSON = json_encode($myObj);
return $myJSON;
}

function makeEQChunkObj($row) {
include ("declare.php");
$myObj = new \stdClass();
$myObj->Id=$row[$eq_Id_chunk];
$myObj->Lon=$row[$eq_Lon_chunk];
$myObj->Lat=$row[$eq_Lat_chunk];
$myObj->Depth=$row[$eq_Depth_chunk];
$myObj->Mag=$row[$eq_Mag_chunk];
$myObj->Time=$row[$eq_Time_chunk];
$myJSON = json_encode($myObj);
return $myJSON;
}

function makeEQChunkWithDescriptionObj($row) {
include ("declare.php");
$myObj = new \stdClass();
$myObj->Id=$row[$eq_Id_chunk];
$myObj->Lon=$row[$eq_Lon_chunk];
$myObj->Lat=$row[$eq_Lat_chunk];
$myObj->Depth=$row[$eq_Depth_chunk];
$myObj->Mag=$row[$eq_Mag_chunk];
$myObj->Time=$row[$eq_Time_chunk];
$myObj->Description=$row[$eq_Description_chunk];
$myJSON = json_encode($myObj);
return $myJSON;
}
?>

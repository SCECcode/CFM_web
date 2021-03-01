/**
   cfm_view3d_util.js

***/

var viewerType="CFM";
var initial_track_trace = 1;
var initial_trace_html="Hide Trace";
var initial_not_trace_html="Show Trace";
function reset_search_selection() {
   $("#search-filter-type").val("dismissClick");
   dismiss_sidebar();
}

/*********************************/
// this is to collect up all the names used
// in composing the selected faults
// for modal popup
var MODAL_TS_LIST=[];
var MODAL_TS_NAME=[];
var MODAL_TS_PATH=null;
function clear_MODAL_TS_LIST()
{
  MODAL_TS_LIST=[];
  MODAL_TS_NAME=[];
  MODAL_TS_PATH=null;
}

function save_MODAL_TS_LIST(name,url)
{
// https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM52_preferred/500m/CRFA-BPPM-WEST-Big_Pine_fault-CFM2_m500.ts
  var n;
  var path;
  var file;

  n=url.indexOf('/500m/');
  if(n == -1) {
    n=url.indexOf('/1000m/');
    if( n == -1) {
      n=url.indexOf('/2000m/');
      if( n == -1) {
        n=url.indexOf('/native/');
      }
    }
  }
  if( n != -1) {
    path=url.substring(0,n+1);
    file=url.substring(n+1);
    MODAL_TS_PATH=path;
    MODAL_TS_LIST.push(file);
    MODAL_TS_NAME.push(name);
    } else {
      MODAL_TS_LIST.push(url);
      MODAL_TS_NAME.push(name);
  }
}

function get_MODAL_TS_LIST()
{
   if(MODAL_TS_LIST.length > 0) {
     var str=MODAL_TS_LIST.toString();
     return "["+str+"]";
   }
   return undefined;
}

function get_MODAL_TS_NAME()
{
   if(MODAL_TS_NAME.length > 0) {
     var str=MODAL_TS_NAME.toString();
     return "["+str+"]";
   }
   return undefined;
}

function get_MODAL_TS_PATH()
{
   if(MODAL_TS_PATH != null) {
     var pstr=MODAL_TS_PATH.toString();
     return "["+pstr+"]";
   }
   return undefined;
}

/***
   cxm_eq.js

   manage the relocated seismicity (earthquakes)
   as pixi overlay layer

   manage the significant historic earthquakes > M6.0
   as a leaflet overlay layer
***/

//const SEISMICITY_DIR="./data/seismicity";
//const SEISMICITY_DIR="https://files.scec.org/s3fs-public/projects/cfm/CFM6/CFM6_Seismicity";
const SEISMICITY_DIR="https://files.scec.org/s3fs-public/projects/cfm/seismicity/cache";


// these are being used as 'uid' for eqPixiOverlayList
// quake_metric_type
const EQ_HAUKSSON_FOR_DEPTH=0;
const EQ_HAUKSSON_FOR_MAG=1;
const EQ_HAUKSSON_FOR_TIME=2;

const EQ_METRIC_LIST = [ EQ_HAUKSSON_FOR_DEPTH, EQ_HAUKSSON_FOR_MAG, EQ_HAUKSSON_FOR_TIME];
const EQ_METRIC_NAME_LIST = [ "hauksson_depth", "hauksson_mag", "hauksson_time"];

/*********************************************************
*********************************************************/
// quake_type,  Hauksson=1, Significant=2
const QUAKE_TYPE_HAUKSSON=0;
const QUAKE_TYPE_SIGNIFICANT=1;
const QUAKE_TYPE_BUCKET=2;
const EQ_QUAKE_TYPE_NAME_LIST=["hauksson","significant","bucket"];

var showing_significant=false;

// for tracking groups of earthquakes for SIGNIFICANT eq dataset
var cxm_quake_significant_layer=null;
var cxm_quake_significant_latlng=[];
var cxm_quake_significant_description=[];

// Not USED
var cxm_quake_group=null;
// {"group_id":groupid, "trace":a_trace}
var cxm_quake_group_list=[];

//original, var init_map_zoom_level = 7;
/* marker's resizing size's zoom threshold */
var eq_zoom_threshold=8;

/* set are predefined by user, real is from the backend search */
var eq_hauksson_min_depth = 0.0;
var eq_hauksson_max_depth = 20.0;
var eq_hauksson_min_mag = 0.0;
var eq_hauksson_max_mag = 6.0;
var eq_hauksson_min_time = new Date("1980-01-01T00:00:00");
var eq_hauksson_max_time = new Date("2020-01-01T00:00:00");

/***
  { "visible":true,
    "overlay":overlay,
    "top":pixiContainer,
    "active_uid":aUid,
    "active_opacity":aOpacity,
    "groups": [{"uid":uid,"visible":1, "segments": segments, opacity:opacity,inner:particleContainers},...]}

 JUST one master pixi overlay for CFM,  with groups of particleContainers --
    one(group/layer)  per metric/metric-segment
 particleContainers = [ one particleContainer per chunking segments ]

 for each group,  all data are put in this structure with NUM(20) chunks/segments
     eqLatlngList= {"uid":uid,"data":datalist}

       uid is EQ_HAUKSSON_FOR_DEPTH, EQ_HAUKSSON_FOR_MAG, EQ_HAUKSSON_FOR_TIME

       datalist is (array of arrays)
       [ [[lat0,lon0],[lat1,lon1],...],  ]

 segments track number of data per segment/chunk
       [ len1, len2 .. ]
***/


// ???
/* multiple set of pixi+marker containers                            */
/* [{"uid":EQ_HAUKSSON_FOR_DEPTH, "vis":true, "layer": overlay,              */
/*   "top":pixiContainer,"inner":[ {"container":c0, "vis":1 }, ...] */
var eqPixiOverlayList=[];

// break up data into buckets (one per segment)
// [ { marker-latlngs } {mag-latlngs} {time-latlngs} ]  
/* [{"uid":EQ_HAUKSSON_FOR_DEPTH, "data":[ [[lat,lng], ...], ...] */
//var pixiLatlngList=[];
var eqLatlngList=[];

/* PixiOverlayLayer holder */
var pixiLayer = null;

/* expose pixiOverlay's util to globae scope */
var pixi_project=null;

/* 
eq_spec.push ( { 'name': quake_type, 'meta': meta });
QUAKE_TYPE_HAUKSSON
   'minTime','maxTime' 'minLon','maxLon' 'minLat','maxLat'
   'minDepth','maxDepth' 'minMag','maxMag' 'total'

QUAKE_TYPE_SIGNIFICANT
   ??
*/
var  eq_spec = [];
var  eq_metric_spec = [];

/**********************************************************************/
function getEQType(typestr) {
  if(typestr == "haukssondepth" || typestr == "haukssonmag" || typestr == "haukssontime" )
    return QUAKE_TYPE_HAUKSSON;  
  return null;
}

// datalist match up with chunks per metrix
function setupEQDatalist() {
//window.console.log("callinging initForEQPixiOverlay..");
  eq_metric_spec.push({ 'name': EQ_HAUKSSON_FOR_DEPTH, 'chunks': 20});
  eq_metric_spec.push({ 'name': EQ_HAUKSSON_FOR_MAG, 'chunks': 20 });
  eq_metric_spec.push({ 'name': EQ_HAUKSSON_FOR_TIME, 'chunks': 20 });
  // iterate through all the metric

  let mcnt=EQ_METRIC_LIST.length;
  for(let i=0; i<mcnt; i++) {
    let mtype=EQ_METRIC_LIST[i]; // 0,1,2
    let dlist=[];
    let dcnt= eq_metric_spec[i].chunks;
    for(var j=0; j<dcnt; j++) {
        dlist.push([]);
    }
    eqLatlngList.push({"uid":mtype, "data":dlist});
  }
}

function printEQMarkerLatlngInfo(quake_metric_type) {
  switch (quake_metric_type) {
     case EQ_HAUKSSON_FOR_DEPTH:
       window.console.log("  For HAUKSSON DEPTH:");
       break;
     case EQ_HAUKSSON_FOR_MAG:
       window.console.log("  For HAUKSSON MAG:");
       break;
     case EQ_HAUKSSON_FOR_TIME:
       window.console.log("  For HAUKSSON TIME:");
       break;
  }
  // assume idx if list matches up with quak_metric_type
  var list=eqLatlngList[quake_metric_type];
  var sum=0;
  let dlist=list.data;
  let dlistcnt=dlist.length;
  for(var i=0; i<dlistcnt; i++) {
    var data=dlist[i];
    sum=sum+data.length;
    window.console.log("    i: "+i+" count: "+ data.length);
  }
  window.console.log("  sum up :"+sum);
}


function _loadFromFileLatlngSignificantSet() {
    var fname=SEISMICITY_DIR+"/significant_log.json.gz";

    fetch(fname)
        .then(
          function(response) {
            if (response.status !== 200) {
               window.console.log('Fetching, Looks like there was a problem. Status Code: ' +
                         response.status);
               return;
            }
            response.arrayBuffer().then(function(zdata) {
              var jzdata= _decompress2JSON(zdata);
              var desc=jzdata['description'];
              var latlng=jzdata['latlng'];
              cxm_quake_significant_latlng=latlng;
              cxm_quake_significant_description=desc;
              doneQuakeCounterWithVal();
              finishLoadSeismicity();
            });
         }
       )
       .catch(function(err) { window.console.log("Fetch Error :-S"+err); });
}


// load everything, one chunk at a time
// tidx=metric idx
// tsz= total metric
// sidx=segment idx
// ssz= total segments
function _loadFromFileEQLatlngSet(tidx,tsz,sidx,ssz) {
    var ttype=EQ_METRIC_LIST[tidx];
    var fname=_eq_gzfname(ttype,sidx);
//window.console.log("XXX _loadFromFileEQLatlngSet in cxm_eq.js..%s",fname);

    fetch(fname)
        .then(
          function(response) {
            if (response.status !== 200) {
               window.console.log('Fetching, Looks like there was a problem. Status Code: ' +
                         response.status);
               return;
            }

          // Examine the text in the response
            response.arrayBuffer().then(function(zdata) {
//window.console.log("processing incoming file-- "+fname);
                var fdata= _decompress2JSON(zdata);

                _process_json(fdata,ttype,sidx);

                add2QuakeCounterWithVal(1); // tracking number of files

                if(sidx+1 == ssz) {
                  if(tidx+1 == tsz) { // all done
//window.console.log("XXX regular json data files : ALL DONE");
// need to retrieve "significant_log.json"
                    _loadFromFileLatlngSignificantSet();
                    } else { // next set
                      _loadFromFileEQLatlngSet(tidx+1,tsz,0,eq_metric_spec[tidx+1].chunks);
                  }
                  } else {
                    _loadFromFileEQLatlngSet(tidx,tsz,sidx+1,ssz);
                }
            });
         }
       )
       .catch(function(err) { window.console.log("Fetch Error :-S"+err); });
}

function _loadEQMetaFromFile(quake_type) {
      var fname=SEISMICITY_DIR+"/"+EQ_QUAKE_TYPE_NAME_LIST[quake_type]+"_meta.json.gz";
window.console.log("XXX _loadEQMetaFromFile cxm_eq.js..%s",fname);

      fetch(fname)
        .then(
          function(response) {
            if (response.status !== 200) {
               window.console.log('Fetching, Looks like there was a problem. Status Code: ' +
                         response.status);
               return;
            }

          // Examine the text in the response
            response.arrayBuffer().then(function(zdata) {
//window.console.log("processing incoming file-- "+fname);
                var fdata= _decompress2JSON(zdata);
// ??  var spec=JSON.parse(fdata);
                eq_spec.push ( fdata );
            });
         }
      ).catch(function(err) { window.console.log("Fetch Error :-S"+err); });
}

function _loadEQMetricMetaFromFile() {
    var cnt = EQ_METRIC_LIST.length;
    for(let i=0; i<cnt; i++) {
      var quake_type=EQ_METRIC_LIST[i];
      var fname=_eq_log_gzfname(quake_type);
window.console.log("XXX _loadEQMetricMetaFromFile cxm_eq.js..%s",fname);

      fetch(fname)
        .then(
          function(response) {
            if (response.status !== 200) {
               window.console.log('Fetching, Looks like there was a problem. Status Code: ' +
                         response.status);
               return;
            }

          // Examine the text in the response
            response.arrayBuffer().then(function(zdata) {
//window.console.log("processing incoming file-- "+fname);
                var fdata= _decompress2JSON(zdata);
// ??		var meta=JSON.parse(fdata);
		eq_metric_spec.push (fdata);

            });
         }
      ).catch(function(err) { window.console.log("Fetch Error :-S"+err); });
    }
}

function _total_eq_segments() {
    var sum=0;
    let cnt=eq_metric_spec.length;
    for(let i=0; i<cnt; i++) {
       sum+=eq_metric_spec[i].chunks;
    }
    return sum;
}

function loadFromFileEQMarkerLatlng() {
    var sz=eq_metric_spec.length;
    var counterTotal= _total_eq_segments();
    switchModalWaitEQLabel(QUAKE_TYPE_BUCKET);
    startQuakeCounterWithVal(counterTotal);
    // start with first one
    _loadFromFileEQLatlngSet(0,sz,0,eq_metric_spec[0].chunks);
    _loadEQMetricMetaFromFile();
    _loadEQMetaFromFile(QUAKE_TYPE_HAUKSSON); // load hauksson's eq meta
}

function _process_json(response_data,quake_metric_type,sidx) {
  var cnt=response_data.length; 
  for(var i=0;i<cnt;i++) {
    data=response_data[i];
    var lat=data['lat'];
    var lng=data['lng'];

    updateEQMarkerLatlng(quake_metric_type,sidx,lat,lng)
  }
}

function updateEQMarkerLatlng(quake_metric_type,idx,lat,lng) {
  let eptr=getEQpixiLatlngList(quake_metric_type);
  if(eptr == null) {
          window.console.log("hum.. BAD...eqLatlngList did not get initialized.."); 
  }
  var item=eptr.data;
  item[idx].push([lat,lng]);
//XXX   item[idx].push({'lat':lat,"lng":lng});
}

function getEQMarkerCount(quake_metric_type,idx) {
  let eptr=getEQpixiLatlngList(quake_metric_type);
  var item=eptr.data;
  var sz=item[idx].length;
  return sz;
}
function getEQMarkerLatlngs(quake_metric_type,idx) {
  let eptr=getEQpixiLatlngList(quake_metric_type);
  var item=eptr.data;
  return item[idx];
}

function getEQpixiLatlngList(quake_metric_type) {
  let cnt=eqLatlngList.length;
  for(let i=0; i<cnt; i++) {
     if(eqLatlngList[i].uid==quake_metric_type)
        return eqLatlngList[i];
  }
  return null;
}

function getEQChunks(quake_metric_type) {
  let cnt=eq_metric_spec.length;
  for(let i=0; i<cnt; i++) {
     if(eq_metric_spec[i].name==quake_metric_type)
       return eq_metric_spec[i].chunks;
  }
  return 0;
}

function getEQRangeIdx(quake_metric_type,target) {
  var eq_min;
  var eq_max;
  var eq_target=target;
  var data_segment_count=getEQChunks(quake_metric_type);

  if(quake_metric_type == EQ_HAUKSSON_FOR_DEPTH) {
     eq_min=eq_hauksson_min_depth;
     eq_max=eq_hauksson_max_depth;
  }
  if(quake_metric_type == EQ_HAUKSSON_FOR_MAG) {
     eq_min=eq_hauksson_min_mag;
     eq_max=eq_hauksson_max_mag;
  }
  if(quake_metric_type == EQ_HAUKSSON_FOR_TIME) {
     eq_min=eq_hauksson_min_time.getTime();
     eq_max=eq_hauksson_max_time.getTime();
     eq_target=target.getTime();
  }
 

  if(eq_target <= eq_min) {
    return 0;  
  }
  if(eq_target >= eq_max) {
    return data_segment_count-1;
  }
  var step = (eq_max - eq_min)/data_segment_count;

  var idx= Math.floor((eq_target-eq_min)/step);

//  alert("min"+eq_min+"max"+eq_max+"target"+eq_target+"step"+step+"idx is"+idx);

  return idx;
}

function setup_new_pixi(quake_metric_type) {
  window.console.log("setup_new_pixi loading >>>"+ quake_metric_type);
  let scnt=eq_metric_spec[quake_metric_type].chunks;
  let pixiLatlngList=setupPixiLatlngList(quake_metric_type,scnt);
  // load all the data into it
  for(var i=0; i<scnt; i++ ) {
    let datalist=getEQMarkerLatlngs(quake_metric_type,i);
    _loadup_data_list_segment(pixiLatlngList,i,datalist);
  }

  $("#modalwaitpixi").modal({ backdrop: 'static', keyboard: false });
  let spec={'hint':0};
  pixiLayer = makeEQPixiOverlayLayer(quake_metric_type, spec);
}

function changePixiOverlay(typestr) {
  let target_type=getEQType(typestr);
  clearAllPixiOverlay();

  var center, zoom;
  [center, zoom] = get_map();
//window.console.log("save map.."+center+" and "+zoom);
  _changeOverlay(target_type, typestr, center, zoom);
}

function _changeOverlay(target_type, typestr, center, zoom) {

// return to initial map
  refresh_map();

  switch (typestr) {
    case "none": removePixiLegend();
                 viewermap.setView(center, zoom);
                 return;
    case "haukssondepth": togglePixiOverlay(EQ_HAUKSSON_FOR_DEPTH);
                          break;
    case "haukssonmag": togglePixiOverlay(EQ_HAUKSSON_FOR_MAG);
                        break;
    case "haukssontime": togglePixiOverlay(EQ_HAUKSSON_FOR_TIME);
                         break;
  }
  let seginfo=pixiFindSegmentProperties(target_type);
  setupPixiLegend(target_type,typestr,seginfo);

  // refocus back
  viewermap.setView(center, zoom);
  return;
}

function clearAllPixiOverlay() {
  pixiClearAllPixiOverlay();
  removePixiLegend();
}

// show which pixiOverlay
function togglePixiOverlay(target_type) {
  let pixi=pixiFindPixiWithUid(target_type);
  if(pixi == null) { 
window.console.log(" togglePixiOverlay..> need to make a NEW ONE>>"+target_type);
    setup_new_pixi(target_type);
    return;
  }
  pixiShowPixiOverlay(target_type);

}

// toggle off a child container from an overlay layer
function toggleEQMarkerContainer(target_type,target_segment) {
  var pixi=pixiFindPixiWithUid(target_type);

  var data_segment_count=getEQChunks(target_type);

  if(pixi == []) { return; }
  var plist=pixi['inner'];
  var top=pixi['top'];
  if(pixi["vis"]==false) {
    windown.console.log("layer not visible To TOGGLE!!\n");
    return;
  } 
  var clist=pixi['inner'];
  var top=pixi['top'];
  for(var j=0; j<data_segemet_count; j++) {
    var citem=clist[j];
    var cptr=citem["container"];
    if(cptr == target_segment) {
      if(citem["vis"]) { // toggle off
        citem["vis"]=0;
        top.removeChild(cptr);
        } else {
          citem["vis"]=1;
          top.addChild(cptr);
      }
      return;
    }
  }
}

/****************** for handling earthquakes ********************/
function processQuakeResult(type) {
    var eqstr=[];
    var eqarray=[]; // array of json items

    if ( type == 'quakesByDepth') {
       eqstr = $('[data-side="quakesByDepth"]').data('params');
    } else if (type == 'quakesByLatLon') {
       eqstr = $('[data-side="quakesByLatLon"]').data('params');
    } else if (type == 'allQuakesByChunk') {
       eqstr = $('[data-side="allQuakesByChunk"]').data('params');
    } 

    if(eqstr == undefined) {
        window.console.log("processQuakeResult: BAD BAD BAD");
        return;
    }

    var sz=(Object.keys(eqstr).length);
//    window.console.log("Number of eq blobs received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var tmp= JSON.parse(eqstr[i]);
       eqarray.push(tmp);
    }
    return eqarray;
}

function _processTimeString(t) {
    var str=t.replace(" ","T");
    return str;
}

function add2QuakePoints(quake_type,eqarray) {
//window.console.log( "XXX add2QuakePoints quake_type(%d) with size %d\n", quake_type, Object.keys(eqarray).length);
    eqarray.forEach(function(marker) {
        var lat=parseFloat(marker['Lat']);
        var lng=parseFloat(marker['Lon']);
        var depth=parseFloat(marker['Depth']);
        var mag=parseFloat(marker['Mag']);
// from backend always get: "1981-01-01 01:49:29.504"
// but need it to be in :"1981-01-01T01:49:29.504"
        var t=_processTimeString(marker['Time']);
        var otime=new Date(t);
        switch (quake_type) {
          case QUAKE_TYPE_HAUKSSON:
            var didx=getEQRangeIdx(EQ_HAUKSSON_FOR_DEPTH, depth);
            updateEQMarkerLatlng(EQ_HAUKSSON_FOR_DEPTH,didx,lat,lng);
            var midx= getEQRangeIdx(EQ_HAUKSSON_FOR_MAG, mag);
            updateEQMarkerLatlng(EQ_HAUKSSON_FOR_MAG,midx,lat,lng);
            var tidx= getEQRangeIdx(EQ_HAUKSSON_FOR_TIME, otime);
            updateEQMarkerLatlng(EQ_HAUKSSON_FOR_TIME,tidx,lat,lng);
            break;
          case QUAKE_TYPE_SIGNIFICANT:
            cxm_quake_significant_latlng.push({lat:lat,lng:lng});
            cxm_quake_significant_description.push( marker['Description']);
            break;
        }
    });
}


function add2QuakePointsChunk(quake_type, eqarray, next_chunk, total_chunk, step) {
    add2QuakePoints(quake_type,eqarray);
    // get next chunk
    _getAllQuakesByChunk(quake_type, next_chunk, total_chunk, step);
}

// default to depth
function showQuakePointsAndBound(eqarray,swlat,swlon,nelat,nelon) {
   // XX should grab type from the UI
   showQuakePoints(EQ_HAUKSSON_FOR_DEPTH,eqarray);
   // create a bounding area and add to the layergroup
   var layer=makeRectangleLayer(swlat,swlon,nelat,nelon);
   cxm_quake_group.addLayer(layer);
}

/*********************************************************
 significant historic earthquakes (>M6) since 1900
*********************************************************/
function makeSignificantEQLayer() {
   // create a group layer with many marker within..
   //   collect up latlng, description list, "red"
//   cxm_quake_significant_layer2=addMarkerLayerGroup( cxm_quake_significant_latlng, cxm_quake_significant_description, 6);
   cxm_quake_significant_layer=makeLeafletCircleMarker( cxm_quake_significant_latlng, cxm_quake_significant_description);

};

function toggleSignificant() {
   let $elt=$('#eye_significant');
   if(showing_significant) {
     removeSignificantEQLayer();
     $elt.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
     } else {
       addSignificantEQLayer();
       $elt.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
   }
}

function removeSignificantEQLayer() {
    viewermap.removeLayer(cxm_quake_significant_layer);
    showing_significant=false;
}

function addSignificantEQLayer() {
    if(showing_significant)
      return;

    if(cxm_quake_significant_layer==null) {
      makeSignificantEQLayer();
      } else {
        viewermap.addLayer(cxm_quake_significant_layer);
    }
    showing_significant=true;
}


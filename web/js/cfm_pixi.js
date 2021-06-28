/***
   cfm_pixi.js
***/

try {
    var isFileSaverSupported = !!new Blob;
} catch (e) {
    window.console.log("FileSaver is not working!!!");
    abort();
}


// pixi, Leafle.overlayLayer.js
// handle the seismicity info
// one set for Hauksson and one set for ROSS
const EQ_HAUKSSON_FOR_DEPTH=0;
const EQ_HAUKSSON_FOR_MAG=1;
const EQ_HAUKSSON_FOR_TIME=2;
const EQ_ROSS_FOR_DEPTH=3;
const EQ_ROSS_FOR_MAG=4;
const EQ_ROSS_FOR_TIME=5;
const EQ_HISTORICAL_FOR_DEPTH=6;
const EQ_HISTORICAL_FOR_MAG=7;
const EQ_HISTORICAL_FOR_TIME=8;

const SEISMICITY_DIR="./data/seismicity";

const EQ_LIST = [ EQ_HAUKSSON_FOR_DEPTH, EQ_HAUKSSON_FOR_MAG, EQ_HAUKSSON_FOR_TIME, EQ_ROSS_FOR_DEPTH, EQ_ROSS_FOR_MAG, EQ_ROSS_FOR_TIME, EQ_HISTORICAL_FOR_DEPTH, EQ_HISTORICAL_FOR_MAG, EQ_HISTORICAL_FOR_TIME];

/* data sections, to matching marker name markerN_icon.png */
const DATA_SEGMENT_COUNT= 20; // 0 to 19 -- to matching marker names

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

var eq_ross_min_depth = 0.0;
var eq_ross_max_depth = 20.0;
var eq_ross_min_mag = 0.0;
var eq_ross_max_mag = 6.0;
var eq_ross_min_time = new Date("2008-01-01T00:00:00");
var eq_ross_max_time = new Date("2018-01-01T00:00:00");

var eq_historical_min_depth = 0.0;
var eq_historical_max_depth = 20.0;
var eq_historical_min_mag = 0.0;
var eq_historical_max_mag = 6.0;
var eq_historical_min_time = new Date("1980-01-01T00:00:00");
var eq_historical_max_time = new Date("2020-12-31T24:00:00");

/* multiple set of pixi+marker containers                            */
/* [{"type":EQ_HAUKSSON_FOR_DEPTH, "vis":true, "layer": overlay,              */
/*   "top":pixiContainer,"inner":[ {"container":c0, "vis":1 }, ...] */
var pixiOverlayList=[];

// break up data into buckets (one per segment)
// [ { marker-latlngs } {mag-latlngs} {time-latlngs} ]  
/* [{"type":EQ_HAUKSSON_FOR_DEPTH, "data":[ [{"lat":lat,"lng":lng},...], ...] }] */
var pixiLatlngList=[];

/* PixiOverlayLayer */
var pixiLayer = null;

/* expose pixiOverlya's util to global scope */
var pixi_project=null;

/* textures in a marker container                         */
/* [ markerTexture0, markerTexture1,... markerTexture19 ] */
var markerTextures=[];

var loadOnce=1;

function initMarkerTextures(resources) {
    markerTextures.push(resources.marker1.texture);
    markerTextures.push(resources.marker2.texture);
    markerTextures.push(resources.marker3.texture);
    markerTextures.push(resources.marker4.texture);
    markerTextures.push(resources.marker5.texture);
    markerTextures.push(resources.marker6.texture);
    markerTextures.push(resources.marker7.texture);
    markerTextures.push(resources.marker8.texture);
    markerTextures.push(resources.marker9.texture);
    markerTextures.push(resources.marker10.texture);
    markerTextures.push(resources.marker11.texture);
    markerTextures.push(resources.marker12.texture);
    markerTextures.push(resources.marker13.texture);
    markerTextures.push(resources.marker14.texture);
    markerTextures.push(resources.marker15.texture);
    markerTextures.push(resources.marker16.texture);
    markerTextures.push(resources.marker17.texture);
    markerTextures.push(resources.marker18.texture);
    markerTextures.push(resources.marker19.texture);
    markerTextures.push(resources.marker20.texture);
}

function initForPixiOverlay() {
window.console.log("XXX callinging initForPixiOverlay..");
  pixiLatlngList.push({"type":EQ_HAUKSSON_FOR_DEPTH, "data":[]});
  pixiLatlngList.push({"type":EQ_HAUKSSON_FOR_MAG, "data":[]});
  pixiLatlngList.push({"type":EQ_HAUKSSON_FOR_TIME, "data":[]});
  for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
    pixiLatlngList[EQ_HAUKSSON_FOR_DEPTH].data.push([]);
    pixiLatlngList[EQ_HAUKSSON_FOR_MAG].data.push([]);
    pixiLatlngList[EQ_HAUKSSON_FOR_TIME].data.push([]);
  }
  pixiLatlngList.push({"type":EQ_ROSS_FOR_DEPTH, "data":[]});
  pixiLatlngList.push({"type":EQ_ROSS_FOR_MAG, "data":[]});
  pixiLatlngList.push({"type":EQ_ROSS_FOR_TIME, "data":[]});
  for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
    pixiLatlngList[EQ_ROSS_FOR_DEPTH].data.push([]);
    pixiLatlngList[EQ_ROSS_FOR_MAG].data.push([]);
    pixiLatlngList[EQ_ROSS_FOR_TIME].data.push([]);
  }
  pixiLatlngList.push({"type":EQ_HISTORICAL_FOR_DEPTH, "data":[]});
  pixiLatlngList.push({"type":EQ_HISTORICAL_FOR_MAG, "data":[]});
  pixiLatlngList.push({"type":EQ_HISTORICAL_FOR_TIME, "data":[]});
  for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
    pixiLatlngList[EQ_HISTORICAL_FOR_DEPTH].data.push([]);
    pixiLatlngList[EQ_HISTORICAL_FOR_MAG].data.push([]);
    pixiLatlngList[EQ_HISTORICAL_FOR_TIME].data.push([]);
  }
}

function printMarkerLatlngInfo(type) {
  switch (type) {
     case EQ_HAUKSSON_FOR_DEPTH:
       window.console.log("  For HAUKSSON DEPTH:");
       break;
     case EQ_HAUKSSON_FOR_MAG:
       window.console.log("  For HAUKSSON MAG:");
       break;
     case EQ_HAUKSSON_FOR_TIME:
       window.console.log("  For HAUKSSON TIME:");
       break;
     case EQ_ROSS_FOR_DEPTH:
       window.console.log("  For ROSS DEPTH:");
       break;
     case EQ_ROSS_FOR_MAG:
       window.console.log("  For ROSS MAG:");
       break;
     case EQ_ROSS_FOR_TIME:
       window.console.log("  For ROSS TIME:");
       break;
     case EQ_HISTORICAL_FOR_DEPTH:
       window.console.log("  For HISTORICAL DEPTH:");
       break;
     case EQ_HISTORICAL_FOR_MAG:
       window.console.log("  For HISTORICAL MAG:");
       break;
     case EQ_HISTORICAL_FOR_TIME:
       window.console.log("  For HISTORICAL TIME:");
       break;
  }
  var list=pixiLatlngList[type];
  var sum=0;
  for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
    var data=list.data[i];
    sum=sum+data.length;
    window.console.log("    i: "+i+" count: "+ data.length);
  }
  window.console.log("  sum up :"+sum);
}

function toFileMarkerLatlng() {
    var sz=EQ_LIST.length;
    _toFileLatlngSet(0,sz,0,DATA_SEGMENT_COUNT);
}

function _toFileLatlngSet(tidx,tsz,sidx,ssz) {
    var ttype=EQ_LIST[tidx];
    var list=pixiLatlngList[ttype];
    var fname_stub=_eq_fname_stub(ttype);
    var fdata=list.data[sidx]; // arraylist

    // output the log only when tidx is 0
    if(sidx == 0) {
      var sum=0;
      var logname=fname_stub+"log.txt";
      var loglist=[]; 
      for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
        var dlist=list.data[i]; //
        var v=dlist.length;
        sum=sum+v;
        loglist.push({id:i,sz:v});
      }
      log={total:sum , list:loglist};

      // if this is Historical, need to putput a list of descriptions..
      // with matching latlngs
      log={total:sum , list:loglist};
      if(ttype == EQ_HISTORICAL_FOR_DEPTH) {
          log['latlng']=cfm_quake_historical_latlng;
          log['description']=cfm_quake_historical_description;
      } 
      _outputBlob(log,logname);
    }

    var fname=_eq_fname(ttype,sidx);
     _outputBlob(fdata,fname);

    if(sidx+1 == ssz) {
      if(tidx+1 == tsz) { // all done 
        } else {
          _toFileLatlngSet(tidx+1,tsz,0,ssz);
      }
      } else {
        _toFileLatlngSet(tidx,tsz,sidx+1,ssz);
    }
}

// had to do this manually.. since is is asynchronously
function _outputBlob(obj,fname) {

window.console.log("writing out blob file.."+fname);

/*  to server solution
  window.console.log("writing out ..."+fname);
  writeToServerFile(fname,obj); 
*/

  var ostr=JSON.stringify(obj);
  var dload = document.createElement('a');
  dload.href = URL.createObjectURL(new Blob([ostr], {type: 'text/plain'}));
  dload.download = fname;
  dload.style.display='none';
  document.body.appendChild(dload);
  dload.click();
  document.body.removeChild(dload);
  delete dload;

/*
  var link = document.createElement('a');
  link.download = fname;
  let blob = new Blob([ostr], {type: 'text/plain'});
  var rc=link.click();
  URL.revokeObjectURL(link.href);

  var blob = new Blob([ostr],{ type: "text/plain;charset=utf-8" });
  saveAs(blob,fname);
window.console.log(">>>SSS saving a file.."+fname+" sz "+ostr.length);
*/
}

function _eq_fname_stub(ttype) {

    var fname="NA";
    switch(ttype) {
       case EQ_HAUKSSON_FOR_DEPTH:
         fname=SEISMICITY_DIR+"/hauksson_depth_";
         break;
       case EQ_HAUKSSON_FOR_MAG:
         fname=SEISMICITY_DIR+"/hauksson_mag_";
         break;
       case EQ_HAUKSSON_FOR_TIME:
         fname=SEISMICITY_DIR+"/hauksson_time_";
         break;
       case EQ_ROSS_FOR_DEPTH:
         fname=SEISMICITY_DIR+"/ross_depth_";
         break;
       case EQ_ROSS_FOR_MAG:
         fname=SEISMICITY_DIR+"/ross_mag_";
         break;
       case EQ_ROSS_FOR_TIME:
         fname=SEISMICITY_DIR+"/ross_time_";
         break;
       case EQ_HISTORICAL_FOR_DEPTH:
         fname=SEISMICITY_DIR+"/historical_depth_";
         break;
       case EQ_HISTORICAL_FOR_MAG:
         fname=SEISMICITY_DIR+"/historical_mag_";
         break;
       case EQ_HISTORICAL_FOR_TIME:
         fname=SEISMICITY_DIR+"/historical_time_";
         break;
    }
    return fname;
}

function _eq_fname(ttype,sidx) {
    var stub=_eq_fname_stub(ttype);
    var fname=stub+sidx+".csv";
    return fname;
}

function _loadFromFileLatlngLastSet() {
    var fname=SEISMICITY_DIR+"/historical_depth_log.txt";
    fetch(fname)
        .then(
          function(response) {
            if (response.status !== 200) {
               window.console.log('Fetching, Looks like there was a problem. Status Code: ' +
                         response.status);
               return;
            }
          // Examine the text in the response
            response.json().then(function(fdata) {
                var desc=fdata['description'];
                var latlng=fdata['latlng'];
                cfm_quake_historical_latlng=latlng;
                cfm_quake_historical_description=desc;
                doneQuakeCounterWithVal();
                finishLoadSeismicity();
            });
         }
       )
       .catch(function(err) { window.console.log("Fetch Error :-S"+err); });
}
function _loadFromFileLatlngSet(tidx,tsz,sidx,ssz) {
    var ttype=EQ_LIST[tidx];
    var fname=_eq_fname(ttype,sidx);

    fetch(fname)
        .then(
          function(response) {
            if (response.status !== 200) {
               window.console.log('Fetching, Looks like there was a problem. Status Code: ' +
                         response.status);
               return;
            }

          // Examine the text in the response
            response.json().then(function(fdata) {
                add2QuakeCounterWithVal(1);
window.console.log("processing incoming file-- "+fname);
                _process_csv(fdata,ttype,sidx);

                // special case: collect a set of historical 
                if(ttype==QUAKE_TYPE_HISTORICAL && sidx == 0) {
                  var sz=fdata.length; 
                  for(var i=0; i<sz; i++) {
                    var item=fdata[i];
                    var lat=item['lat'];
                    var lng=item['lng'];
 //                   var desc=item['Description'];
                    var desc="blah description"+i;
                    cfm_quake_historical_latlng.push([lat,lng]);
                    cfm_quake_historical_description.push( desc );
                  }
                }

                if(sidx+1 == ssz) {
                  if(tidx+1 == tsz) { // all done
window.console.log("regular csv files : ALL DONE");
                    // need to retrieve "historical_depth_log.txt"
                    _loadFromFileLatlngLastSet();
                    } else {
                      _loadFromFileLatlngSet(tidx+1,tsz,0,ssz);
                  }
                  } else {
                    _loadFromFileLatlngSet(tidx,tsz,sidx+1,ssz);
                }
            });
         }
       )
       .catch(function(err) { window.console.log("Fetch Error :-S"+err); });
}

function loadFromFileMarkerLatlng() {
    var sz=EQ_LIST.length;
    var counterTotal= sz * DATA_SEGMENT_COUNT;
    switchModalWaitEQLabel(QUAKE_TYPE_BUCKET);
    startQuakeCounterWithVal(counterTotal);
    _loadFromFileLatlngSet(0,sz,0,DATA_SEGMENT_COUNT);
}

function _process_csv(response_data,ttype,sidx) {
  var cnt=response_data.length; 
  for(var i=0;i<cnt;i++) {
    data=response_data[i];
    var lat=data['lat'];
    var lng=data['lng'];
    updateMarkerLatlng(ttype,sidx,lat,lng)
  }
}

function updateMarkerLatlng(ttype,idx,lat,lng) {
  var alist=pixiLatlngList[ttype];
  if(alist == null) {
      alist[ttype]= {"type":ttype, "data":[]};
      window.console.log("hum.. pixiLatlngList did not get initialized.."); 
  }
  var item=pixiLatlngList[ttype].data;
  item[idx].push({'lat':lat,"lng":lng});
}

function getMarkerCount(quake_type,idx) {
  var item=pixiLatlngList[quake_type].data;
  var sz=item[idx].length;
  return sz;
}
function getMarkerLatlngs(quake_type,idx) {
  var item=pixiLatlngList[quake_type].data;
  return item[idx];
}

function getRangeIdx(quake_type,target) {

  var eq_min;
  var eq_max;
  var eq_target=target;

  if(quake_type == EQ_HAUKSSON_FOR_DEPTH) {
     eq_min=eq_hauksson_min_depth;
     eq_max=eq_hauksson_max_depth;
  }
  if(quake_type == EQ_HAUKSSON_FOR_MAG) {
     eq_min=eq_hauksson_min_mag;
     eq_max=eq_hauksson_max_mag;
  }
  if(quake_type == EQ_HAUKSSON_FOR_TIME) {
     eq_min=eq_hauksson_min_time.getTime();
     eq_max=eq_hauksson_max_time.getTime();
     eq_target=target.getTime();
  }
  if(quake_type == EQ_ROSS_FOR_DEPTH) {
     eq_min=eq_ross_min_depth;
     eq_max=eq_ross_max_depth;
  }
  if(quake_type == EQ_ROSS_FOR_MAG) {
     eq_min=eq_ross_min_mag;
     eq_max=eq_ross_max_mag;
  }
  if(quake_type == EQ_ROSS_FOR_TIME) {
     eq_min=eq_ross_min_time.getTime();
     eq_max=eq_ross_max_time.getTime();
     eq_target=target.getTime();
  }
  if(quake_type == EQ_HISTORICAL_FOR_DEPTH) {
     eq_min=eq_historical_min_depth;
     eq_max=eq_historical_max_depth;
  }
  if(quake_type == EQ_HISTORICAL_FOR_MAG) {
     eq_min=eq_historical_min_mag;
     eq_max=eq_historical_max_mag;
  }
  if(quake_type == EQ_HISTORICAL_FOR_TIME) {
     eq_min=eq_historical_min_time.getTime();
     eq_max=eq_historical_max_time.getTime();
     eq_target=target.getTime();
  }
 
  if(eq_target <= eq_min) {
    return 0;  
  }
  if(eq_target >= eq_max) {
    return DATA_SEGMENT_COUNT-1;
  }
  var step = (eq_max - eq_min)/DATA_SEGMENT_COUNT;
  var idx= Math.floor((eq_target-eq_min)/step);

  return idx;
}

// from pixi,
//  >> Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
function init_pixi(loader) {
  loader
    .add('marker1', 'img/marker1_icon.png')
    .add('marker2', 'img/marker2_icon.png')
    .add('marker3', 'img/marker3_icon.png')
    .add('marker4', 'img/marker4_icon.png')
    .add('marker5', 'img/marker5_icon.png')
    .add('marker6', 'img/marker6_icon.png')
    .add('marker7', 'img/marker7_icon.png')
    .add('marker8', 'img/marker8_icon.png')
    .add('marker9', 'img/marker9_icon.png')
    .add('marker10', 'img/marker10_icon.png')
    .add('marker11', 'img/marker11_icon.png')
    .add('marker12', 'img/marker12_icon.png')
    .add('marker13', 'img/marker13_icon.png')
    .add('marker14', 'img/marker14_icon.png')
    .add('marker15', 'img/marker15_icon.png')
    .add('marker16', 'img/marker16_icon.png')
    .add('marker17', 'img/marker17_icon.png')
    .add('marker18', 'img/marker18_icon.png')
    .add('marker19', 'img/marker19_icon.png')
    .add('marker20', 'img/marker20_icon.png');
}

function setup_pixi(quake_type) {
  // this is used to simulate leaflet zoom animation timing:
  var loader = new PIXI.loaders.Loader();

window.console.log("setup_pixi loading >>>"+ quake_type);
 
  if(loadOnce) {
    init_pixi(loader);
  }

  loader.load(function(loader, resources) {
      if(loadOnce) {
        initMarkerTextures(resources);
        loadOnce=0;
      }

      pixiLayer = makePixiOverlayLayer(quake_type);

      var ticker = new PIXI.ticker.Ticker();

      ticker.add(function(delta) { 
        pixiLayer.redraw({type: 'redraw', delta: delta});
      });
      viewermap.on('changetart', function() {
        ticker.start();
      });
      viewermap.on('changeend', function() { 
        ticker.stop();
      });

      viewermap.on('zoomstart', function() {
        ticker.start();
//        togglePixiOverlay(quake_type);
//        let cidx=get1stNoneEmptyContainer(quake_type);
//        window.console.log("first none empty container is.."+cidx);
//        if(cidx != null) toggleMarkerContainer(quake_type, cidx);
      });
      viewermap.on('zoomend', function() { 
        ticker.stop();
      });
      viewermap.on('zoomanim', pixiLayer.redraw, pixiLayer);
  });
}

function get1stNoneEmptyContainer(quake_type) {
   var pixi=pixiOverlayList[quake_type];
   if(pixi['vis'] == 0) 
     return;
   var inner=tmp['inner'];
   for(var i=0; i<DATA_SEGMENT_COUNT; i++ ) {
     var item=inner[i];
     if(item['vis'] && getMarkerCount(quake_type,i)>0) { // found it and it got particles in there
        return i;
     }
   }
   return null;
}

function changePixiOverlay(typestr) {
  clearAllPixiOverlay();

  var center, zoom;
  [center, zoom] = get_map();
  window.console.log("save map.."+center+" and "+zoom);
  _changeOverlay(typestr);
// XXX  this does not seem to work??
//  set_map(center,zoom);
}

function _changeOverlay(typestr) {

// return to initial map
  refresh_map();

  switch (typestr) {
    case "none": removeSeismicityKey();
                 removeHistoricalEQLayer();
                 break;
    case "haukssondepth": togglePixiOverlay(EQ_HAUKSSON_FOR_DEPTH);
                          showSeismicityKey("hauksson_depth");
                          addHistoricalEQLayer();
                          break;
    case "haukssonmag": togglePixiOverlay(EQ_HAUKSSON_FOR_MAG);
                        showSeismicityKey("hauksson_mag");
                        addHistoricalEQLayer();
                        break;
    case "haukssontime": togglePixiOverlay(EQ_HAUKSSON_FOR_TIME);
                         showSeismicityKey("hauksson_time");
                         addHistoricalEQLayer();
                         break;
    case "rossdepth": togglePixiOverlay(EQ_ROSS_FOR_DEPTH);
                      showSeismicityKey("ross_depth");
                      addHistoricalEQLayer();
                      break;
    case "rossmag": togglePixiOverlay(EQ_ROSS_FOR_MAG);
                    showSeismicityKey("ross_mag");
                    addHistoricalEQLayer();
                    break;
    case "rosstime": togglePixiOverlay(EQ_ROSS_FOR_TIME);
                     showSeismicityKey("ross_time");
                     addHistoricalEQLayer();
                     break;
    case "historicaldepth": togglePixiOverlay(EQ_HISTORICAL_FOR_DEPTH);
                            showSeismicityKey("historical_depth");
                            addHistoricalEQLayer();
                            break;
    case "historicalmag": togglePixiOverlay(EQ_HISTORICAL_FOR_MAG);
                          showSeismicityKey("historical_mag");
                          addHistoricalEQLayer();
                          break;
    case "historicaltime": togglePixiOverlay(EQ_HISTORICAL_FOR_TIME);
                           showSeismicityKey("historical_time");
                           addHistoricalEQLayer();
                           break;
  }
  return;
}

function getPixiByType(quake_type) {
   var sz=pixiOverlayList.length;
   if(sz == 0)
      return null;
   for(var i=0; i<sz; i++ ) {
      var tmp=pixiOverlayList[i];
      if(tmp['type'] == quake_type)
        return i;
   }
   return null;
}

function clearAllPixiOverlay() {
  pixiOverlayList.forEach(function(pixi) {
    if(pixi !=null || pixi.length !=0) {
      if(pixi["vis"]==1) {
        var layer=pixi["overlay"];
        viewermap.removeLayer(layer);
        pixi["vis"]=0;
      }
    }
  });
}

// show which pixiOverlay
function togglePixiOverlay(target_type) {
  var tmp=pixiOverlayList;
  var pixi=pixiOverlayList[target_type];
  if(pixi == null || pixi.length == 0) { 
    setup_pixi(target_type);
    return;
  }
  var v=pixi["vis"];
  var layer=pixi["overlay"];
  if(v==1) {
    viewermap.removeLayer(layer);
    pixi["vis"]=0;
    } else {
      viewermap.addLayer(layer);
      pixi["vis"]=1;
  }
}

// toggle off a child container from an overlay layer
function toggleMarkerContainer(target_type,target_segment) {
  var pixi=pixiOverlayList[target_type];
  if(pixi == []) { return; }
  var plist=pixi['inner'];
  var top=pixi['top'];
  if(pixi["vis"]==false) {
    windown.console.log("layer not visible To TOGGLE!!\n");
    return;
  } 
  var clist=pixi['inner'];
  var top=pixi['top'];
  for(var j=0; j<DATA_SEGMENT_COUNT; j++) {
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

function makePixiOverlayLayer(quake_type) {
    var zoomChangeTs = null;

    var pixiContainer = new PIXI.Container();
    var pContainers=[]; //particle container

    window.console.log("making pixi overlay layer..");

    for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
      var length=getMarkerCount(quake_type,i);
      var a = new PIXI.particles.ParticleContainer(length, {vertices: true});
      // add properties for our patched particleRenderer:
      a.texture = markerTextures[i];
      a.baseTexture = markerTextures[i].baseTexture;
      a.anchor = {x: 0.5, y: 1};
      pixiContainer.addChild(a);
      pContainers.push(a);
    }

    var doubleBuffering = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var initialScale;

    var overlay=L.pixiOverlay(function(utils, event) {
      var zoom = utils.getMap().getZoom();
      var container = utils.getContainer();
      var renderer = utils.getRenderer();
      pixi_project = utils.latLngToLayerPoint;
      var getScale = utils.getScale;
      var invScale = 1 / getScale();

//window.console.log("in L.pixiOverlay layer, auto zoom at "+zoom+" scale at>"+getScale()+" invScale"+invScale);

      var mapcenter=viewermap.getCenter();
      var mapzoom=viewermap.getZoom();

      if (event.type === 'add') {
        // check if this is the first time..
        if(pixiOverlayList.length != 0) {
           var pixi=pixiOverlayList[quake_type];
           if(pixi != null && pixi != []) {
             pixi['vis']=1;
             return pixi['overlay'];
           }
        }

        var origin = pixi_project([mapcenter['lat'], mapcenter['lng']]);
        initialScale = invScale / 16; // initial size of the marker
//initialScale = invScale / 2; // initial size of the marker

window.console.log("FFFirst time making this pixiOverlay,"+quake_type+" initial scale "+initialScale +" mapzoom" + mapzoom);
        printMarkerLatlngInfo(quake_type);

        // fill in the particles
        for(var i=0; i< DATA_SEGMENT_COUNT; i++ ) {
           var a=pContainers[i];
           a.x = origin.x;
           a.y = origin.y;
           a.localScale = initialScale;

           var latlngs=getMarkerLatlngs(quake_type,i);
           var len=latlngs.length;
           for (var j = 0; j < len; j++) {
              var latlng=latlngs[j];
              var ll=latlng['lat'];
              var gg=latlng['lng'];
//              window.console.log("start latlon>>"+ll+" "+gg);
              var coords = pixi_project([ll,gg]);
              // our patched particleContainer accepts simple {x: ..., y: ...} objects as children:
//              window.console.log("    and xy at "+coords.x+" "+coords.y);
              var aParticle=a.addChild({ x: coords.x - origin.x, y: coords.y - origin.y });

/**** trying it out 
              var marker = new PIXI.Sprite(markerTextures[9]);
              marker.popup = L.popup({className: 'pixi-popup'})
                                        .setLatLng(latlng)
                                        .setContent('<b>Hello world!</b><br>I am a popup.'+ latlng['lat']+' '+latlng['lng']).openOn(viewermap);
              pixiContainer.addChild(marker);
***/
//            window.console.log( "      adding  child at..("+latlng['lat']+')('+latlng['lng']+')');
           }
        }
      }

      // change size of the marker after zoomin and zoomout
      if (event.type === 'zoomanim') {
        var targetZoom = event.zoom;
        if (targetZoom >= eq_zoom_threshold || zoom >= eq_zoom_threshold) {
          zoomChangeTs = 0;
          var targetScale = targetZoom >= eq_zoom_threshold ? (1 / getScale(event.zoom))/10  : initialScale;

window.console.log(" ZOOManim.. new targetScale "+targetScale);

          pContainers.forEach(function(innerContainer) {
            innerContainer.currentScale = innerContainer.localScale;
            innerContainer.targetScale = targetScale;
          });
        }
        return null;
      }

      if (event.type === 'redraw') {
        var easing = BezierEasing(0, 0, 0.25, 1);
        var delta = event.delta;
        if (zoomChangeTs !== null) {
          var duration = 5; // 17
          zoomChangeTs += delta;
          var lambda = zoomChangeTs / duration;
          if (lambda > 1) {
            lambda = 1;
            zoomChangeTs = null;
          }
          lambda = easing(lambda);
          pContainers.forEach(function(innerContainer) {
            innerContainer.localScale = innerContainer.currentScale + lambda * (innerContainer.targetScale - innerContainer.currentScale);
          });
        } else { return null;}
      }

      renderer.render(container);
    }, pixiContainer, {
      doubleBuffering: doubleBuffering,
      destroyInteractionManager: true
    }).addTo(viewermap);

    var tmp=pixiOverlayList;
    pixiOverlayList[quake_type]={"type":quake_type,"vis":1,"overlay":overlay,"top":pixiContainer,"inner":pContainers};
 
    return overlay;
}

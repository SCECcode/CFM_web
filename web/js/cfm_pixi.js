/***
   cfm_pixi.js
***/

// pixi, Leafle.overlayLayer.js
// handle the seismicity info
// one set for Hauksson and one set for ROSS
const EQ_HAUKSSON_FOR_DEPTH=0;
const EQ_HAUKSSON_FOR_MAG=1;
const EQ_HAUKSSON_FOR_TIME=2;
const EQ_ROSS_FOR_DEPTH=3;
const EQ_ROSS_FOR_MAG=4;
const EQ_ROSS_FOR_TIME=5;
const EQ_HISTORICAL_FOR_DEPTH=3;
const EQ_HISTORICAL_FOR_MAG=4;
const EQ_HISTORICAL_FOR_TIME=5;

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
var eq_hauksson_min_time = new Date("1980-01-01T01:49:29.504");
var eq_hauksson_max_time = new Date("2020-12-31T23:28:38.59");
var eq_ross_min_depth = 0.0;
var eq_ross_max_depth = 20.0;
var eq_ross_min_mag = 0.0;
var eq_ross_max_mag = 6.0;
var eq_ross_min_time = new Date("1980-01-01T01:49:29.504");
var eq_ross_max_time = new Date("2020-12-31T23:28:38.59");
var eq_historical_min_depth = 0.0;
var eq_historical_max_depth = 20.0;
var eq_historical_min_mag = 0.0;
var eq_historical_max_mag = 6.0;
var eq_historical_min_time = new Date("1980-01-01T01:49:29.504");
var eq_historical_max_time = new Date("2020-12-31T23:28:38.59");

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
  window.console.log("callinging initForPixiOverlay..");
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

function updateMarkerLatlng(type,idx,lat,lng) {
  var alist=pixiLatlngList[type];
  if(alist == null) {
      alist[type]= {"type":type, "data":[]};
      window.console.log("hum.. pixiLatlngList did not get initialized.."); 
  }
  var item=pixiLatlngList[type].data;
  item[idx].push({'lat':lat,"lng":lng});
}

function getMarkerCount(eqType,idx) {
  var item=pixiLatlngList[eqType].data;
  var sz=item[idx].length;
  return sz;
}
function getMarkerLatlngs(eqType,idx) {
  var item=pixiLatlngList[eqType].data;
  return item[idx];
}

function getRangeIdx(eqType,target) {

  var eq_min;
  var eq_max;
  var eq_target=target;

  if(eqType == EQ_HAUKSSON_FOR_DEPTH) {
     eq_min=eq_hauksson_min_depth;
     eq_max=eq_hauksson_max_depth;
  }
  if(eqType == EQ_HAUKSSON_FOR_MAG) {
     eq_min=eq_hauksson_min_mag;
     eq_max=eq_hauksson_max_mag;
  }
  if(eqType == EQ_HAUKSSON_FOR_TIME) {
     eq_min=eq_hauksson_min_time.getTime();
     eq_max=eq_hauksson_max_time.getTime();
     eq_target=target.getTime();
  }
  if(eqType == EQ_ROSS_FOR_DEPTH) {
     eq_min=eq_ross_min_depth;
     eq_max=eq_ross_max_depth;
  }
  if(eqType == EQ_ROSS_FOR_MAG) {
     eq_min=eq_ross_min_mag;
     eq_max=eq_ross_max_mag;
  }
  if(eqType == EQ_ROSS_FOR_TIME) {
     eq_min=eq_ross_min_time.getTime();
     eq_max=eq_ross_max_time.getTime();
     eq_target=target.getTime();
  }
  if(eqType == EQ_HISTORICAL_FOR_DEPTH) {
     eq_min=eq_historical_min_depth;
     eq_max=eq_historical_max_depth;
  }
  if(eqType == EQ_HISTORICAL_FOR_MAG) {
     eq_min=eq_historical_min_mag;
     eq_max=eq_historical_max_mag;
  }
  if(eqType == EQ_HISTORICAL_FOR_TIME) {
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

function setup_pixi(eqType) {
  // this is used to simulate leaflet zoom animation timing:
  var loader = new PIXI.loaders.Loader();

window.console.log("setup_pixi loading >>>"+ eqType);
 
  if(loadOnce) {
    init_pixi(loader);
  }

  loader.load(function(loader, resources) {
      if(loadOnce) {
        initMarkerTextures(resources);
        loadOnce=0;
      }

      pixiLayer = makePixiOverlayLayer(eqType);

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
//        togglePixiOverlay(eqType);
//        let cidx=get1stNoneEmptyContainer(eqType);
//        window.console.log("first none empty container is.."+cidx);
//        if(cidx != null) toggleMarkerContainer(eqType, cidx);
      });
      viewermap.on('zoomend', function() { 
        ticker.stop();
      });
      viewermap.on('zoomanim', pixiLayer.redraw, pixiLayer);
  });
}

function get1stNoneEmptyContainer(eqType) {
   var pixi=pixiOverlayList[eqType];
   if(pixi['vis'] == 0) 
     return;
   var inner=tmp['inner'];
   for(var i=0; i<DATA_SEGMENT_COUNT; i++ ) {
     var item=inner[i];
     if(item['vis'] && getMarkerCount(eqType,i)>0) { // found it and it got particles in there
        return i;
     }
   }
   return null;
}

function changePixiOverlay(typestr) {
  clearAllPixiOverlay();
// return to initial map
  refresh_map();
  switch (typestr) {
    case "none": removeSeisimicityKey(); break;
    case "haukssondepth": togglePixiOverlay(EQ_HAUKSSON_FOR_DEPTH); showSeisimicityKey("hauksson_depth"); break;
    case "haukssonmag": togglePixiOverlay(EQ_HAUKSSON_FOR_MAG); showSeisimicityKey("hauksson_mag"); break;
    case "haukssontime": togglePixiOverlay(EQ_HAUKSSON_FOR_TIME); showSeisimicityKey("hauksson_time"); break;
    case "rossdepth": togglePixiOverlay(EQ_ROSS_FOR_DEPTH); showSeisimicityKey("ross_depth"); break;
    case "rossmag": togglePixiOverlay(EQ_ROSS_FOR_MAG); showSeisimicityKey("ross_mag"); break;
    case "rosstime": togglePixiOverlay(EQ_ROSS_FOR_TIME); showSeisimicityKey("ross_time"); break;
    case "historicaldepth": togglePixiOverlay(EQ_HISTORICAL_FOR_DEPTH); showSeisimicityKey("historical_depth"); break;
    case "historicalmag": togglePixiOverlay(EQ_HISTORICAL_FOR_MAG); showSeisimicityKey("historical_mag"); break;
    case "historicaltime": togglePixiOverlay(EQ_HISTORICAL_FOR_TIME); showSeisimicityKey("historical_time"); break;
  }
  return;
}

function getPixiByType(eqType) {
   var sz=pixiOverlayList.length;
   if(sz == 0)
      return null;
   for(var i=0; i<sz; i++ ) {
      var tmp=pixiOverlayList[i];
      if(tmp['type'] == eqType)
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

function makePixiOverlayLayer(eqType) {
    var zoomChangeTs = null;

    var pixiContainer = new PIXI.Container();
    var pContainers=[]; //particle container

    for(var i=0; i<DATA_SEGMENT_COUNT; i++) {
      var length=getMarkerCount(eqType,i);
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
           var pixi=pixiOverlayList[eqType];
           if(pixi != null && pixi != []) {
             pixi['vis']=1;
             return pixi['overlay'];
           }
        }

        var origin = pixi_project([mapcenter['lat'], mapcenter['lng']]);
        initialScale = invScale / 16; // initial size of the marker
//initialScale = invScale / 2; // initial size of the marker

window.console.log("FFFirst time making this pixiOverlay,"+eqType+" initial scale "+initialScale +" mapzoom" + mapzoom);
        printMarkerLatlngInfo(eqType);

        // fill in the particles
        for(var i=0; i< DATA_SEGMENT_COUNT; i++ ) {
           var a=pContainers[i];
           a.x = origin.x;
           a.y = origin.y;
           a.localScale = initialScale;

           var latlngs=getMarkerLatlngs(eqType,i);
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

//window.console.log(" ZOOManim.. new targetScale "+targetScale);

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
    pixiOverlayList[eqType]={"type":eqType,"vis":1,"overlay":overlay,"top":pixiContainer,"inner":pContainers};
 

    return overlay;
}

/***
   cfm_pixi.js
***/

// pixi, Leafle.overlayLayer.js
// handle the seismicity info
const EQ_FOR_DEPTH=0;
const EQ_FOR_MAG=1;
const EQ_FOR_TIME=2;

var viewermap=null;
/* data sections, to matching marker name marker_N.icon.png */
var data_segment_count= 20; // 0 to 19 -- to matching marker names

/* marker's size zoom limit*/
var eq_zoom_threshold=7;

/* set are predefined by user, real is from the backend search */
var eq_min_depth = 0.0;
var eq_max_depth = 50.0;
var eq_min_mag = 0.0;
var eq_max_mag = 7.0;
var eq_min_time = new Date("1981-01-01T01:49:29.504");
var eq_max_time = new Date("2019-12-31T23:28:38.59");

/* multiple set of pixi+marker containers                            */
/* [{"type":EQ_FOR_DEPTH, "vis":true, "layer": overlay,              */
/*   "top":pixiContainer,"inner":[ {"container":c0, "vis":1 }, ...] */
var pixiOverlayList=[];

// break up data into buckets (one per segment)
// [ { marker-latlngs } {mag-latlngs} {time-latlngs} ]  
/* [{"type":EQ_FOR_DEPTH, "data":[ [{"lat":lat,"lng":lng},...], ...] }] */
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
  window.console.log(">>>> calling initMarkerTextures");
    markerTextures.push(resources.marker0.texture);
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
}

function initForPixiOverlay() {
  window.console.log("callinging initForPixiOverlay..");
  pixiLatlngList.push({"type":EQ_FOR_DEPTH, "data":[]});
  pixiLatlngList.push({"type":EQ_FOR_MAG, "data":[]});
  pixiLatlngList.push({"type":EQ_FOR_TIME, "data":[]});
  for(var i=0; i<data_segment_count; i++) {
    pixiLatlngList[EQ_FOR_DEPTH].data.push([]);
    pixiLatlngList[EQ_FOR_MAG].data.push([]);
    pixiLatlngList[EQ_FOR_TIME].data.push([]);
  }
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

function getMarkerCount(forType,idx) {
  var item=pixiLatlngList[forType].data;
  var sz=item[idx].length;
  return sz;
}
function getMarkerLatlngs(forType,idx) {
  var item=pixiLatlngList[forType].data;
  return item[idx];
}

// set if eq_min_depth/eq_max_depth hasn't been set already
function setDepthRange(min,max) {
  if(eq_min_depth == null &&
          eq_max_depth == null) {
    eq_min_depth=min;
    eq_max_depth=max;
  }
}

function getRangeIdx(forType,target) {
  if(forType == EQ_FOR_DEPTH) {
     eq_min=eq_min_depth;
     eq_max=eq_max_depth;
  }
  if(forType == EQ_FOR_MAG) {
     eq_min=eq_min_mag;
     eq_max=eq_max_mag;
  }
  if(forType == EQ_FOR_TIME) {
     eq_min=eq_min_time.getTime();
     eq_max=eq_max_time.getTime();
     target=target.getTime();
  }
 
  if(target <= eq_min)
    return 0;  
  if(target >= eq_max)
    return data_segment_count-1;
  var step = (eq_max - eq_min)/data_segment_count;
  var idx= Math.floor((target-eq_min)/step);

  return idx;
}

// from pixi,
//  >> Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
function init_pixi(loader) {
  window.console.log(">>>> calling init_pixi");
  loader
    .add('marker0', 'img/marker0-icon.svg')
    .add('marker1', 'img/marker1-icon.svg')
    .add('marker2', 'img/marker2-icon.svg')
    .add('marker3', 'img/marker3-icon.svg')
    .add('marker4', 'img/marker4-icon.svg')
    .add('marker5', 'img/marker5-icon.svg')
    .add('marker6', 'img/marker6-icon.svg')
    .add('marker7', 'img/marker7-icon.svg')
    .add('marker8', 'img/marker8-icon.svg')
    .add('marker9', 'img/marker9-icon.svg')
    .add('marker10', 'img/marker10-icon.svg')
    .add('marker11', 'img/marker11-icon.svg')
    .add('marker12', 'img/marker12-icon.svg')
    .add('marker13', 'img/marker13-icon.svg')
    .add('marker14', 'img/marker14-icon.svg')
    .add('marker15', 'img/marker15-icon.svg')
    .add('marker16', 'img/marker16-icon.svg')
    .add('marker17', 'img/marker17-icon.svg')
    .add('marker18', 'img/marker18-icon.svg')
    .add('marker19', 'img/marker19-icon.svg');
}

function setup_pixi(forType) {
  // this is used to simulate leaflet zoom animation timing:
  var loader = new PIXI.loaders.Loader();

window.console.log("setup_pixi loading >>>"+ forType);
 
  if(loadOnce) {
    init_pixi(loader);
  }

  loader.load(function(loader, resources) {
      if(loadOnce) {
        initMarkerTextures(resources);
        loadOnce=0;
      }

      pixiLayer = makePixiOverlayLayer(forType);

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
//        togglePixiOverlay(forType);
//        let cidx=get1stNoneEmptyContainer(forType);
//        window.console.log("first none empty container is.."+cidx);
//        if(cidx != null) toggleMarkerContainer(forType, cidx);
      });
      viewermap.on('zoomend', function() { 
        ticker.stop();
      });
      viewermap.on('zoomanim', pixiLayer.redraw, pixiLayer);
  });
}

function get1stNoneEmptyContainer(forType) {
   var pixi=pixiOverlayList[forType];
   if(pixi['vis'] == 0) 
     return;
   var inner=tmp['inner'];
   for(var i=0; i<data_segment_count; i++ ) {
     var item=inner[i];
     if(item['vis'] && getMarkerCount(forType,i)>0) { // found it and it got particles in there
        return i;
     }
   }
   return null;
}

function changePixiOverlay(typestr) {
  clearAllPixiOverlay();
  switch (typestr) {
    case "depth": togglePixiOverlay(EQ_FOR_DEPTH); break;
    case "mag": togglePixiOverlay(EQ_FOR_MAG); break;
    case "time": togglePixiOverlay(EQ_FOR_TIME); break;
  }
}

function getPixiByType(forType) {
   var sz=pixiOverlayList.length;
   if(sz == 0)
      return null;
   for(var i=0; i<sz; i++ ) {
      var tmp=pixiOverlayList[i];
      if(tmp['type'] == forType)
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
  if(v) {
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
  for(var j=0; j<data_segment_count; j++) {
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

function makePixiOverlayLayer(forType) {
    var zoomChangeTs = null;

    var pixiContainer = new PIXI.Container();
    var pContainers=[]; //particle container

    for(var i=0; i<data_segment_count; i++) {
      var length=getMarkerCount(forType,i);
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

window.console.log("in L.pixiOverlay zoom at "+zoom+" scale at>", getScale());

      var mapcenter=viewermap.getCenter();
      var mapzoom=viewermap.getZoom();

      if (event.type === 'add') {
        // check if this is the first time..
        if(pixiOverlayList.length != 0) {
           var pixi=pixiOverlayList[forType];
           if(pixi != null && pixi != []) {
             pixi['vis']=1;
window.console.log("adding back a preexisting pixiOverlay"+forType);
             return pixi['overlay'];
           }
        }
window.console.log("First time making this pixiOverlay, >> "+forType);

        var origin = pixi_project([mapcenter['lat'], mapcenter['lng']]);
        initialScale = invScale/4 ; // initial size of the marker

window.console.log("First time making this pixiOverlay,"+forType+" initial scale "+initialScale +" mapzoom" + mapzoom);

        // fill in the particles
        for(var i=0; i< data_segment_count; i++ ) {
           var a=pContainers[i];
           a.x = origin.x;
           a.y = origin.y;
           a.localScale = initialScale;

           var latlngs=getMarkerLatlngs(forType,i);
           var len=latlngs.length;
           for (var j = 0; j < len; j++) {
              var latlng=latlngs[j];
              var ll=latlng['lat'];
              var gg=latlng['lng'];
//              window.console.log("start latlon>>"+ll+" "+gg);
              var coords = pixi_project([ll,gg]);
              // our patched particleContainer accepts simple {x: ..., y: ...} objects as children:
//              window.console.log("    and xy at "+coords.x+" "+coords.y);
              a.addChild({ x: coords.x - origin.x, y: coords.y - origin.y });
//              window.console.log( "      adding  child at..("+(coords.x- origin.x)+')('+(coords.y - origin.y)+')');
           }
        }
      }

      // change size of the marker after zoomin and zoomout
      if (event.type === 'zoomanim') {
window.console.log("event: layer zoomanim.."+event.zoom);
        var targetZoom = event.zoom;
        if (targetZoom >= eq_zoom_threshold || zoom >= eq_zoom_threshold) {
          zoomChangeTs = 0;
          var targetScale = targetZoom >= eq_zoom_threshold ? 1 / getScale(event.zoom) : initialScale;
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
          var duration = 17;
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
    pixiOverlayList[forType]={"type":forType,"vis":1,"overlay":overlay,"top":pixiContainer,"inner":pContainers};
 

    return overlay;
}

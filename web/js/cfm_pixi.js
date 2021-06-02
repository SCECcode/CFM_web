/***
   cfm_pixi.js
***/

// pixi, Leafle.overlayLayer.js
// handle the seismicity info
const EQ_FOR_DEPTH=1;
const EQ_FOR_MAG=2;
const EQ_FOR_TIME=3;

var redraw_count=0;

var viewermap=null;
/* data sections, to matching marker name marker_N.icon.png */
var data_segment_count= 20; // 0 to 19 -- to matching marker names

/* marker's size zoom limit*/
var eq_zoom_threshold=16;

/* set are predefined by user, real is from the backend search */
var eq_min_depth = 5.0;
var eq_max_depth = 8.0;
var eq_min_mag = 0.0;
var eq_max_mag = 3.0;

/* multiple set of pixi+marker containers                            */
/* [{"type":EQ_FOR_DEPTH, "vis":true, "overlay": layer,              */
/*   "top":pixiContainer,"inner":[container0, container1, ...]},...] */
var pixiContainerList=[];

/* number of marker in marker container */
/* [ markerCnt0, markerCnt1,... markerCnt19 ] */
var  markerLengths=[];

/* textures in a marker container                         */
/* [ markerTexture0, markerTexture1,... markerTexture19 ] */
var  markerTextures=[];

/* latlngs in a marker container*/
var  markerLatlngs=[];

/* PixiOverlayLayer */
var pixiLayer = null;

/* save ptr to the project() */
var global_project=null;
function initMarkerTextures(resources) {

    if(markerTextures.length == data_segment_count) // do only once
      return;

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

function initMarkerInfo() {
  markerLengths=[];
  markerLatlngs=[];
  for(var i=0; i<data_segment_count; i++) {
    markerLengths.push(0);
    markerLatlngs.push([]);
  }
}

function printMarkerLengths() {
  for(var i=0;i<data_segment_count;i++) {
    window.console.log("marker length :"+ i+ "="+ markerLengths[i]);
  }
}

function updateMarkerLengths(idx) {
  var tmp=markerLengths[idx];
  markerLengths[idx]=tmp+1;
}

function updateMarkerLatlng(idx,lat,lng) {
  markerLatlngs[idx].push({'lat':lat,"lng":lng});
}

// set if eq_min_depth/eq_min_max hasn't been set already
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
     } else {
       eq_min=eq_min_mag;
       eq_max=eq_max_mag;
  }
  if(target <= eq_min)
    return 0;  
  if(target >= eq_max)
    return (data_segment_count-1);
  var step=(eq_max - eq_min)/data_segment_count;
  var idx= Math.floor((target-eq_min)/step);

  if(idx == data_segment_count) {
    window.console.log("BADD");
  }

  return idx;
}

function getData(forType) {
    var getJSON = function(url, successHandler, errorHandler) {
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', url, true);
        xhr.onreadystatechange = function() {
            var status;
            var data;
            if (xhr.readyState == 4) {
                status = xhr.status;
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    successHandler && successHandler(data);
                } else {
                    errorHandler && errorHandler(status);
                }
            }
        };
        xhr.send();
    };
    getJSON('data/pixidata.json', function(markers) {
        markers.forEach(function(marker) {
             var id=marker['id'];
             var lat=marker['latitude'];
             var lng=marker['longitude'];
             var depth=marker['depth'];
             var mag=marker['mag'];
//             window.console.log("depth"+depth+" mag"+mag);
             var target;
             if(forType == EQ_FOR_DEPTH)
               target=depth
             if(forType == EQ_FOR_MAG)
               target=mag;
             var idx= getRangeIdx(forType, target);
             updateMarkerLengths(idx);
             updateMarkerLatlng(idx,lat,lng);
        });
//        printMarkerLengths();
    });
}
 
function setup_pixi(forType) {
  // this is used to simulate leaflet zoom animation timing:
  var easing = BezierEasing(0, 0, 0.25, 1);

  var loader = new PIXI.loaders.Loader();

  loader
    .add('marker0', 'img/marker0-icon.png')
    .add('marker1', 'img/marker1-icon.png')
    .add('marker2', 'img/marker2-icon.png')
    .add('marker3', 'img/marker3-icon.png')
    .add('marker4', 'img/marker4-icon.png')
    .add('marker5', 'img/marker5-icon.png')
    .add('marker6', 'img/marker6-icon.png')
    .add('marker7', 'img/marker7-icon.png')
    .add('marker8', 'img/marker8-icon.png')
    .add('marker9', 'img/marker9-icon.png')
    .add('marker10', 'img/marker10-icon.png')
    .add('marker11', 'img/marker11-icon.png')
    .add('marker12', 'img/marker12-icon.png')
    .add('marker13', 'img/marker13-icon.png')
    .add('marker14', 'img/marker14-icon.png')
    .add('marker15', 'img/marker15-icon.png')
    .add('marker16', 'img/marker16-icon.png')
    .add('marker17', 'img/marker17-icon.png')
    .add('marker18', 'img/marker18-icon.png')
    .add('marker19', 'img/marker19-icon.png');

  loader.load(function(loader, resources) {
      initMarkerTextures(resources);

      pixiLayer = makePixiOverlayLayer(forType);
      pixiLayer.addTo(viewermap);

      var ticker = new PIXI.ticker.Ticker();

      ticker.add(function(delta) { 
        pixiLayer.redraw({type: 'redraw', delta: delta});
      });

      viewermap.on('zoomstart', function() {
        ticker.start();
//        let idx=getPixiByType(forType);
//        if(idx != null) togglePixiOverlay(idx);
//        let cidx=get1stNoneEmptyContainer(forType);
//        window.console.log("first none empty container is.."+cidx);
//      if(idx != null && cidx != null) toggleMarkerContainer(idx, cidx);
      });
      viewermap.on('zoomend', function() { 
        ticker.stop();
      });
      viewermap.on('zoomanim', pixiLayer.redraw, pixiLayer);
  });
}

function get1stNoneEmptyContainer(forType) {
   let sz=pixiContainerList.length;
   if(sz == 0)
      return null;
   for(var i=0; i<sz; i++ ) {
      var tmp=pixiContainerList[i];
      if(tmp['type'] == forType) {
         var ttmp=tmp['inner'];
         let ssz=ttmp.length; // should be 20 of them
         for(var j=0; j<ssz; j++) {
            var tttmp=ttmp[j]; // container
            var chd=tttmp.children;
            if(chd.length > 0) {
//              window.console.log("This set has none zero particles.."+j);
              return j;
              } else {
//                window.console.log("this segment ",j," does not have anything..");
            }
         }
      }
   }
   return null;
}

function getPixiByType(forType) {
   var sz=pixiContainerList.length;
   if(sz == 0)
      return null;
   for(var i=0; i<sz; i++ ) {
      var tmp=pixiContainerList[i];
      if(tmp['type'] == forType)
        return i;
   }
   return null;
}

// toggle off all child containers
function togglePixiOverlay(pidx) {
  var pixi=pixiContainerList[pidx];

  var plist=pixi['inner'];
  var top=pixi['top'];
  var layer=pixi['overlay'];
  var vis=pixi['vis'];
  var sz=plist.length; 

  if(sz==0) {
    windown.console.log("NOTHING To TOGGLE!!\n");
    return;
  }

  if(vis) { // remove starts from the back
    for(var i=sz-1;i>0;i--) { 
      var target=plist[i];
      var tmp=top.getChildAt(i);
      if(target == tmp) {
        if(target.children.length > 0) { 
          top.removeChild(tmp); // remove it
          window.console.log("togglePixiOverlay:remove child at "+i);
        }
        } else {
          window.console.log("BAD.. should be the same");
      }
    }
    pixi['vis']=0;
    } else {
      for(var i=0;i<sz;i++) { 
        var target=plist[i];
        if(target.children.length > 0) { 
          top.addChildAt(target,i); // add it back 
          window.console.log("togglePixiOverlay:add back child at "+i);
        }
      }
      pixi['vis']=1;
    }
}

// toggle off a child container from an overlay layer
function toggleMarkerContainer(pidx,iidx) {
  window.console.log("toggleMarkerContainer: toggle off a layer "+iidx+" from "+pidx);
  var tmp=pixiContainerList[pidx];
  var plist=tmp['inner'];
  var top=tmp['top'];
  if(plist.length==0) {
    windown.console.log("NOTHING To TOGGLE!!\n");
    return;
  }
  var targetContainer=plist[iidx];

  var tmp=top.getChildAt(iidx);
  if(tmp == targetContainer) { // remove it
    top.removeChild(targetContainer);
    } else {
      top.addChildAt(targetContainer,iidx);
  }
}

function makeMap() {
    window.console.log("makeMap..");
    var mymap = L.map('map').setView([ 34.3,  -118.4], 10);
    L.tileLayer('//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
      { subdomains: 'abcd',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    minZoom: 4,
    maxZoom: 14
      }).addTo(mymap);

    mymap.attributionControl.setPosition('bottomleft');
    mymap.zoomControl.setPosition('bottomright');

    return mymap;
}

function makePixiOverlayLayer(forType) {
    var zoomChangeTs = null;
    var pixiContainer = new PIXI.Container();
    var pContainers= []; //particle container

    for(var i=0; i<data_segment_count; i++) {
      var length=markerLengths[i];
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
      var project = utils.latLngToLayerPoint;
      global_project = project;
      var getScale = utils.getScale;
      var invScale = 1 / getScale();

      window.console.log("in L.pixiOverlay zoom at "+zoom+" scale at>", getScale());

      var center=viewermap.getCenter();
//      window.console.log(center['lat'], center['lng']);

      if (event.type === 'add') {

        window.console.log("  Pixi add HERE..");
        // check if this is the first time..
        if(pixiContainerList != null) {
             pixiContainerList.forEach(function(item) {
               var t=item['type'];
               if(forType === t) {  
                  item['vis']=1;
                  return item['overlay'];
               }
            });
        }

        var origin = project([center['lat'], center['lng']]);
        initialScale = invScale/4 ; // initial size of the marker

        // fill in the particles
        for(var i=0; i< data_segment_count; i++ ) {
           var a=pContainers[i];
           a.x = origin.x;
           a.y = origin.y;
           a.localScale = initialScale  ;
           var len=markerLengths[i];
           var latlngs=markerLatlngs[i];
           for (var j = 0; j < len; j++) {
              var latlng=latlngs[j];
              var ll=latlng['lat'];
              var gg=latlng['lng'];
//              window.console.log("start latlon>>"+ll+" "+gg);
              var coords = project([ll,gg]);
              // our patched particleContainer accepts simple {x: ..., y: ...} objects as children:
//              window.console.log("    and xy at "+coords.x+" "+coords.y);
              a.addChild({ x: coords.x - origin.x, y: coords.y - origin.y });
//              window.console.log( "      adding  child at..("+(coords.x- origin.x)+')('+(coords.y - origin.y)+')');
           }
        }
      }

      // change size of the marker after zoomin and zoomout
      if (event.type === 'zoomanim') {
        var targetZoom = event.zoom;
        if (targetZoom >= eq_zoom_threshold || zoom >= eq_zoom_threshold) {
          zoomChangeTs = 0;
          var targetScale = targetZoom >= eq_zoom_threshold ? 1 / getScale(event.zoom) : initialScale;
          innerContainer.currentScale = innerContainer.localScale;
          innerContainer.targetScale = targetScale;
        }
        return null;
      }

      if (event.type === 'redraw') {
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
          innerContainer.localScale = innerContainer.currentScale + lambda * (innerContainer.targetScale - innerContainer.currentScale);
        } else { return null;}
      }

      renderer.render(container);
    }, pixiContainer, {
      doubleBuffering: doubleBuffering,
      destroyInteractionManager: true
    });

    pixiContainerList.push({"type":forType,"vis":1,"overlay":overlay,"top":pixiContainer,"inner":pContainers});

    return overlay;
}

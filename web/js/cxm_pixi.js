/***
   cxm_pixi.js

   create a pixi layer

***/

var PIXI_pixiOverlayList=[];

/* How many segments to chunk a set of data */
var PIXI_DEFAULT_DATA_SEGMENT_COUNT=undefined;

var PIXI_DEFAULT_OPACITY=0.8;

var PIXI_DATA_SEGMENT_COUNT=undefined; // chunking supplied from client 
var PIXI_DATA_MAX_V=undefined;
var PIXI_DATA_MIN_V=undefined;
var PIXI_DATA_count=0;

var pixi_cmap_tb=undefined;

/* expose pixiOverlay's util to global scope */
var pixi = null;
var pixiProject=null;
var pixiContainer = null;
var pixiOverlay = null;

var particleGroups = null;
var particleContainers =[];
var particleTexturesPtr=null; /* textures in a container */

var loadOnce=1;


/*************************************************************************/
/** debug for seeing where canvas context were called

HTMLCanvasElement.prototype.getContext = function(origFn) {
  return function(type, attribs) {
          window.console.log("    ----Calling new getContext,", Context_count);
    Context_count++;
    attribs = attribs || {};
//    attribs.preserveDrawingBuffer = true;
    return origFn.call(this, type, attribs);
  };
}(HTMLCanvasElement.prototype.getContext);
**/

/*************************************************************************/
// print each segment's count and whole set's count
function printParticleLatlngInfo(plist) {
  let sum=0;
  window.console.log("PIXI: For: "+plist.uid);
  for(let i=0; i<PIXI_DATA_SEGMENT_COUNT; i++) {
    let dlist=plist[i];
    sum=sum+data.length;
    window.console.log("PIXI:    i: "+i+" count: "+ dlist.length);
  }
  window.console.log("PIXI:  sum up :"+sum);
}

function addParticleLatlng(plist,idx,lat,lng) {
  let dlist=plist[idx];
  dlist.push({'lat':lat,"lng":lng});
}

function getParticleCount(latlonlist,idx) {
  let dlist=latlonlist.data[idx];
  let sz=dlist.length;
  return sz;
}

function getParticleLatlngs(latlonlist,idx) {
  let dlist=latlonlist.data[idx];
  return dlist;
}

/*************************************************************************/
function pixiGetSegmentRangeIdx(vs_target, N, vs_max, vs_min) {
  if(vs_target <= vs_min) {
    return 0;  
  }
  if(vs_target >= vs_max) {
    return N-1;
  }
  var step = (vs_max - vs_min)/N;
  var offset= Math.floor((vs_target-vs_min)/step);
  return offset;
}

function pixiFindSegmentProperties(uid) {
  let rlist={};
  let namelist=[];
  let colorlist=[];
  let labellist=[];
  let lengthlist=[];
  let checklist=[];
  let ret=pixiFindPixiWithUid(uid);

  if(ret != null) {
    let pixi=ret.pixi;
    let clist=pixi.inner;
    let sz=clist.length;

    for(let i=0; i<sz; i++) {
      let citem=clist[i];
      let term=citem.cfm_properties;
      namelist.push(term.segment_name);
      lengthlist.push(term.segment_cnt);
      labellist.push(term.segment_label);
      colorlist.push(term.segment_color);
      if(citem.visible) {
        checklist.push(1);
        } else {
          checklist.push(0);
      }
    }
    // put in the end label of the last term
    let term=clist[sz-1].cfm_properties;
    labellist.push(term.segment_label_end);
    
    rlist={ names: namelist, 
         counts:lengthlist,
         labels:labellist,
         colors:colorlist,
         checks:checklist};
  }
  return rlist;
}


// create a list of N values for creating legend labels
function pixiGetSegmentRangeList(N, vs_max, vs_min) {
  var step = (vs_max - vs_min)/N;
  var mult=10;
  let abs_step=Math.abs(step);
  let abs_vs_min=Math.abs(vs_min);

  if (abs_step < 0.00001 || (abs_vs_min < 0.00009 && abs_vs_min!=0)) {
    mult=1000000; 
  } else if (abs_step < 0.0001 || (abs_vs_min < 0.0009 && abs_vs_min!=0))  {
    mult=100000;
  } else if (abs_step < 0.001 || (abs_vs_min < 0.009 && abs_vs_min!=0))  { 
    mult=10000;
  } else if (abs_step < 0.01 || (abs_vs_min < 0.09 && abs_vs_min!=0))  { 
    mult=1000;
  } else if (abs_step < 0.1 || (abs_vs_min < 0.9 && abs_vs_min!=0))  { 
    mult=100;
  }
//window.console.log( "  ---> STEP is ", abs_step);
//window.console.log( "  ---> vs_min is ", abs_vs_min);
//window.console.log( "  ---> USING MULTI is ", mult);
  let digits=0;

  let tlist= [];
  for(let i=0; i<N; i++) {
    let v= (Math.floor((vs_min + (step * i ))*mult)/mult);
    let parts=String(v).split('.');
    if(parts[1] != undefined) {
      let t=parts[1].length;
      if(t>digits) {
        digits=t;
      }
    }
    tlist.push(v);
  }

  var slist=[];
  for(let j=0; j<N; j++) {
    slist.push(tlist[j].toFixed(digits));
  }

// including the last one
  slist.push( (Math.floor(vs_max*mult)/mult).toFixed(digits));
  return slist;
}

// from pixi,
//  >> Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
// PIXI.BaseTexture.addToCache (baseTexture, id)
// PIXI.BaseTexture.from (source, options, strict) PIXI.BaseTexture static
//

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
function pixiCreateBaseTexture(color,name) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 10, 10);

  let texture=PIXI.Texture.from(canvas);
  PIXI.BaseTexture.addToCache(texture,name);
  return texture;
}

/*************************************************************************/
/*************************************************************************/
function init_pixi(loader) {
  PIXI_pixiOverlayList=[];
  cxm_eq_init_pixi();
}

function setup_pixi() {
  if(loadOnce) {
    init_pixi();
    loadOnce=0;
  }
}

/*************************************************************************/
// utilities for a group -
//({"uid":uid,"visible":true,"segments":segments,"opacity":opacity,inner:particleContainers}) 
//return pidx, and group
function pixiFindPixiWithUid(uid) {
    for(let i=0; i< PIXI_pixiOverlayList.length; i++) {
        let groups=PIXI_pixiOverlayList[i].groups;
        for(let j=0; j<groups.length; j++) {
          let group=groups[j];
          if(group.uid ==  uid) {
            return {"pidx":i, "pixi":group};
          }
        }
    }
window.console.log(" did not find pix with this uid ("+uid+")");
    return null;
}

function pixiFindPixiSegmentsWithUid(uid) {
    let ret=pixiFindPixiWithUid(uid);
    if(ret != null) {
        let pixi=ret.pixi;
        return pixi.segments;   
    }
    return null;
}


function pixiFindPixiOpacityWithUid(uid) {
    let ret=pixiFindPixiWithUid(uid);
    if(ret != null) {
        let pixi=ret.pixi;
        return pixi.opacity;   
    }
    return null;
}

function pixiFindPixiVisibleWithUid(uid) {
    let ret=pixiFindPixiWithUid(uid);
    if(ret != null) {
        let pixi=ret.pixi;
        return pixi.visible;   
    }
    return null;
}

function _foundOverlay(uid) {
    let ret=pixiFindPixiWithUid(uid);
    if(ret != null) {
        return 1;
    }
    return 0;
}

function _toggleInnerGroupSegment(target,pidx,sidx) {
    let layer=PIXI_pixiOverlayList[pidx];
    let overlay=layer.overlay;
    let top=layer.top;
    let groups=layer.groups;
    for(let j=0; j< groups.length; j++) {
        let group=groups[j];
        if(group.uid == target) { // found it.
            if(group.visible == true) {
              let tmp=group.inner;
              if(sidx < tmp.length) {
                let chunk=tmp[sidx];
                if(chunk.visible ==true) {
                  top.removeChild(chunk);
                  chunk.visible=false;
                  } else {
                    top.addChild(chunk);
                    chunk.visible=true;
                }
                overlay.redraw(chunk);
              }
            }
            return;
        }
    }
}


function _clearInnerGroup(target,pidx) {
    let layer=PIXI_pixiOverlayList[pidx];
    let top=layer.top;
    let overlay=layer.overlay;
    let groups=layer.groups;
window.console.log("PIXI: clearInnerGroup..",target);
    for(let i=0; i< groups.length; i++) {
        let group=groups[i];
        if(group.uid == target) { // found it.
            if(group.visible == true) {
              let tmp=group.inner;
              for(let j=0; j<tmp.length; j++) {
                let chunk=tmp[j];
                chunk.visible=false;
                top.removeChild(chunk);
              }
              group.visible=false;
window.console.log("PIXI: clear one group..uid=",target);
              overlay.redraw({type: 'redraw'});
              } else {
                return;
            }
        }
    }
}
function _addInnerGroup(target,pidx) {
    let layer=PIXI_pixiOverlayList[pidx];
    let top=layer.top;
    let overlay=layer.overlay;
    let groups=layer.groups;
window.console.log("PIXI: addInnerGroup..",target);
    for(let i=0; i< groups.length; i++) {
        let group=groups[i];
        if(group.uid == target) { // found it.
            if(group.visible == false) {
              let tmp=group.inner;
              for(let j=0; j<tmp.length; j++) {
                let chunk=tmp[j];
                chunk.visible=true;
                top.addChild(chunk);
              }
window.console.log("PIXI: adding one group..uid=",target);
              top.alpha=group.opacity;
              group.visible=true;
              overlay.redraw({type: 'redraw'});
              } else {
                return;
            }
        }
    }
}

/*************************************************************************/
//({"active_uid":uid,"active_opacity":opacity,"overlay":overlay,"top":pixiContainer,"groups": groups")
function pixiFindPixiOverlayByIdx(pidx=0) {
    if(PIXI_pixiOverlayList.length < pidx) return null;
    let tmp=PIXI_pixiOverlayList[pidx];
    return tmp.overlay;
}

function pixiFindPixiContainerByIdx(pidx=0) {
    if(PIXI_pixiOverlayList.length < pidx) return null;
    let tmp=PIXI_pixiOverlayList[pidx];
    return tmp.top;
}

/*************************************************************************/
/* there is just 1 overlay with different groups of particleContainers/inner,
   clearing the pixi overlay means remove current active group's container
   from the viewer map 
({"uid":uid,"visible":true,"segments":segments,"opacity":opacity,inner:particleContainers}) 
*/
function pixiClearAllPixiOverlay() {
    for(let i=0; i< PIXI_pixiOverlayList.length; i++) {
        let layer=PIXI_pixiOverlayList[i];
        if(layer.visible == false) {
          continue;
        }
        let target=layer.active_uid;
        let overlay=layer.overlay;
        _clearInnerGroup(target,i);
        layer.active_uid=null;
        layer.active_opacity=0;
        layer.visible=false;
//XXX	viewermap.removeLayer(overlay);    
    }
}

function pixiShowPixiOverlay(uid) {
    let ret=pixiFindPixiWithUid(uid);
    if(ret == null) return;
    let pidx=ret.pidx; 
    let pixi=ret.pixi;
    let opacity=pixi.opacity;
    let layer=PIXI_pixiOverlayList[pidx];
    let overlay = layer.overlay;
    let active=layer.active_uid;

    if(layer.visible == true) {
      if(active == uid) return; // do nothing
      // turn off the current one
      _clearInnerGroup(active,pidx);
    } 

    _addInnerGroup(uid,pidx);
    layer.active_uid=uid;
    layer.active_opacity=opacity;
// not sure if this is needed
    overlay.redraw({type: 'redraw'});

    if(layer.visible == false) {
//XXX      viewermap.addLayer(overlay);
    }
    layer.visible=true;
}


// from a overlay that has this uid 
function pixiGetPixiOverlayOpacity(uid) {
    let ret=pixiFindPixiWithUid(uid);
//window.console.log("calling pixiGetPixiOverlayOpacity--"+ret);
    if(ret == null) return PIXI_DEFAULT_OPACITY;
    let pidx=ret.pidx; 
    let pixi=ret.pixi;

    let layer=PIXI_pixiOverlayList[pidx];
    let opacity=pixi.opacity;

// should be the same
    if( (layer.active_uid != uid) || (pixi.opacity != layer.active_opacity)) {
      window.console.log("pixiGetPixiOverlayOpacity.. BAD.. should match");
    }
    return opacity;
}

function pixiSetPixiOverlayOpacity(uid,alpha) {
    let ret=pixiFindPixiWithUid(uid);
    if(ret == null) return;
    let pidx=ret.pidx; 
    let pixi=ret.pixi;
    pixi.opacity=alpha;

    let layer=PIXI_pixiOverlayList[pidx];
    let overlay=layer.overlay;
    let pContainer=layer.top;

// should be the same
    if(layer.active_uid != uid) {
      window.console.log("pixiGetPixiOverlayOpacity.. BAD.. should match");
    }
    layer.active_opacity=alpha; 

    pContainer.alpha=alpha;
    overlay.redraw({type: 'redraw'});
}

function pixiResetAllOverlayOpacity() {
  for(let i=0; i< PIXI_pixiOverlayList.length; i++) {
    let layer=PIXI_pixiOverlayList[i];
    if(layer.visible == false) {
      continue;
    }
    if(layer.active_opacity == PIXI_DEFAULT_OPACITY) {
      continue;
    }
    let target=layer.active_uid;
    let overlay=layer.overlay;
    let pContainer=layer.top;
    let groups=layer.groups;
    for(let j=0; j<groups.length; j++) {
       let t=groups[i];
        if(t.uid == target) {
          t.opacity=PIXI_DEFAULT_OPACITY;
          break;
        }
    }
    layer.active_opacity=PIXI_DEFAULT_OPACITY;
    pContainer.alpha=PIXI_DEFAULT_OPACITY;
    overlay.redraw({type: 'redraw'});
  }
}

/*************************************************************************/
// for debug toggling a chunk from particleContainers
// toggle off a child container from an overlay layer
function pixiToggleParticleContainer(uid,target_segment_idx) {

  let ret=pixiFindPixiWithUid(uid);
  if(ret == null) return;

  let pixi=ret.pixi;
  let pidx=ret.pidx;

  let layer=PIXI_pixiOverlayList[pidx];
  let top=layer.top;
  let groups=layer.groups;

  if(layer.visible==false || pixi.visible==false) {
    window.console.log("PIXI: grouplayer not visible To TOGGLE!!\n");
    return;
  } 
  _toggleInnerGroupSegment(uid,pidx,target_segment_idx);
}

/*************************************************************************************
    MAIN ENTRY POINTS  to cxm_pixi
*************************************************************************************/

/**
used by cfm_web
   put datalist from each json file into a bucket
   input : pixiLatlngList, sid, datalist
           pxiLatlngList, ptr to list
           sid, segment id
           datalist, {"lat":lat,"lng":lng}
**/
function _loadup_data_list_segment(pixiLatlngList,sid,datalist) {
   let dlist=pixiLatlngList.data;
   dlist[sid]=datalist;
   
   return pixiLatlngList;
}

/*
  used by cfm_web
*/
function setupPixiLatlngList(uid,scnt) {
   let datalist=[];
   for(var i=0; i<scnt; i++) {
      datalist.push([]);
   }
   let pixiLatlngList= {"uid":uid,"data":datalist} ;
   return pixiLatlngList;
}


/*************************************************************************/
/**
  MAIN creation routine

  spec = {'data_max':3.0, 'data_min':1.0, 'seg_cnt':12};
  data_max and data_min is client specified limits

  for each group,  all data are put in this structure with 12 chunks/segments
     pixiLatlngList= {"uid":uid,"data":datalist}
       (array of arrays)
       datalist[ [{'lat':v,'lon':vv}...], [{...}], ... ]

  return 'uid'
 
**/

/** for cfm EQ,**/
// just like pixiLatlngList
// using type
function makeEQPixiOverlayLayer(quake_metric_type, spec) {

window.console.log( "  >>>> CALLING makeEQPixiOverlayLayer for %d ",quake_metric_type);

    var pixiLatlngList=getEQpixiLatlngList(quake_metric_type);

    var uid=quake_metric_type;

    var zoomChangeTs = null;
    var opacity = PIXI_DEFAULT_OPACITY;
    var doubleBuffering = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if(PIXI_pixiOverlayList.length == 0) { // first one
      pixiContainer = new PIXI.Container({vertices: true, tint: true});
      particleGroups = [];
      particleContainers = [];
      } else {
        pixi=PIXI_pixiOverlayList[0];
        pixiContainer = pixi.top;
        pixiOverlay = pixi.overlay;
        particleGroups = pixi.groups;
        particleContainers = [];
    }

    pixiContainer.alpha=opacity;

// set the particleTexturesPtr to the right set
    var segment_color_list;

    particleTexturesPtr=getParticleTextures(quake_metric_type);
    segment_color_list=getSegmentParticleRGBList(quake_metric_type);

    PIXI_DATA_SEGMENT_COUNT= eq_metric_spec[quake_metric_type].chunks;
    PIXI_DATA_MIN_V, PIXI_DATA_MAX_V = get_EQ_range(QUAKE_TYPE_HAUKSSON, quake_metric_type);

    var segment_label_list=pixiGetSegmentRangeList(PIXI_DATA_SEGMENT_COUNT, PIXI_DATA_MAX_V, PIXI_DATA_MIN_V);

// pixiLatlngList is in global scope at cxm_eq.js

    for(let i=0; i<PIXI_DATA_SEGMENT_COUNT; i++) {
      var length=getParticleCount(pixiLatlngList,i);

      var a = new PIXI.ParticleContainer(length, {vertices: true, tint: true});
      a.texture = particleTexturesPtr[i];
      a.baseTexture = particleTexturesPtr[i].baseTexture;
      a.anchor = {x: 0.5, y: 0.5};
      a.visible = true;

      // each set shares the same segment_gid, using quake_metric_type as master global uid
      a.cfm_properties = { segment_gid:uid,
                           segment_name:"segment_"+i,
                           segment_cnt:length,
                           segment_label: segment_label_list[i],
                           segment_label_end: segment_label_list[i+1],
                           segment_color: segment_color_list[i]};          

      pixiContainer.addChild(a);
      particleContainers.push(a);
    }

    if(pixiOverlay != null) {
        pixiOverlay.redraw({type: 'redraw', data: {'pixiLatlngList':pixiLatlngList,'spec':spec }});

      } else { 
        pixiOverlay=L.pixiOverlay(function(utils, event) {

window.console.log("PIXI: calling pixiOverlay - callback to fill in data");

        if(event.type == "undefined") {
          window.console.log(" ???? XXX why is event type of undefined ???");
        }

        var zoom = utils.getMap().getZoom();
        var container = utils.getContainer();
        var renderer = utils.getRenderer();
        pixiProject = utils.latLngToLayerPoint;
        var getScale = utils.getScale;
        var invScale = 1 / getScale();
  
        if (event.type === "redraw") {

          var data=event.data;

          if(data != undefined) {
window.console.log(" >>>   PIXI: redraw event -- with data update");
            uid=pixiLatlngList.uid;
            spec=data.spec;

            let mapcenter=viewermap.getCenter();
            let mapzoom=viewermap.getZoom();
  
            let pixi=PIXI_pixiOverlayList[0];

            let pixiContainer=pixi.top;
            let particleGroups = pixi.groups;
            let pixiOverlay = pixi.overlay;

            var origin = pixiProject([mapcenter['lat'], mapcenter['lng']]);
  
            let scaleFactor=16; // default came from seismicity
            if(spec.scale_hint == 2 ) { // when grid points are about 2km len is 70k
              scaleFactor=24;
            }
            if(spec.scale_hint == 5) {  // when grid points are about 5km
              scaleFactor=8; 
            }
  
  // :-) very hacky, just in case it got zoomed in before search
            let t= (8/invScale);
            scaleFactor=scaleFactor / t;
  
          // fill in the particles one group at a time
            let collect_len=0;
            var segments=[];
            for(var i=0; i< PIXI_DATA_SEGMENT_COUNT; i++ ) {
  
               var latlngs=getParticleLatlngs(pixiLatlngList,i);
               var len=latlngs.length;
               var pTexture = particleTexturesPtr[i];
  
               var a=particleContainers[i];
               a.x = origin.x;
               a.y = origin.y;
               a.localScale = invScale/scaleFactor;
  
               collect_len=collect_len+len;

 window.console.log("PIXI: for REDRAW group ",i," len is ",len);

               segments.push(len);
               for (var j = 0; j < len; j++) {
                  var latlng=latlngs[j];
                  var ll=latlng['lat'];
                  var gg=latlng['lng'];
                  var coords = pixiProject([ll,gg]);
              
                  var particle = new PIXI.TilingSprite(pTexture);
                  particle.clampMargin = -0.5;
               
                  particle.alpha=1; // add, multiply,screen
                  particle.blendMode=0; // add, multiply,screen
  
                  particle.x = coords.x - origin.x;
                  particle.y= coords.y - origin.y;
    
                  particle.scale.set(invScale/scaleFactor);
                  a.addChild(particle);
              }
            }

            particleGroups.push( { "uid":uid, "visible":true, "segments":segments, "opacity": opacity, "inner":particleContainers} ); 
            pixi.visible=true;
            pixi.active_uid=uid;
            pixi.active_opacity=opacity;		    
window.console.log("        redraw adding into group--(",uid,") >>", particleGroups.length);
            } else {
               window.console.log(" >>>   PIXI: redraw event - with no data");
          }
        }
  
        if (event.type === 'add') {
window.console.log(" >>>   PIXI: add event");

          if (_foundOverlay(uid)) { // only add it first time
            return null;
          }
  
          let mapcenter=viewermap.getCenter();
          let mapzoom=viewermap.getZoom();
  
          var origin = pixiProject([mapcenter['lat'], mapcenter['lng']]);
  
          let scaleFactor=16; // default came from seismicity

          if(spec.scale_hint == 2 ) { // when grid points are about 2km len is 70k
            scaleFactor=24;
          }
          if(spec.scale_hint == 5) {  // when grid points are about 5km
            scaleFactor=8; 
          }
  
  // :-) very hacky, just in case it got zoomed in before search
          let t= (8/invScale);
          scaleFactor=scaleFactor / t;
  
          // fill in the particles one group at a time
          let collect_len=0;
          var segments=[];
          for(var i=0; i< PIXI_DATA_SEGMENT_COUNT; i++ ) {
  
             var latlngs=getParticleLatlngs(pixiLatlngList,i);
             var len=latlngs.length;
             var pTexture = particleTexturesPtr[i];
  
             var a=particleContainers[i];
             a.x = origin.x;
             a.y = origin.y;
             a.localScale = invScale/scaleFactor;
  
             collect_len=collect_len+len;
             segments.push(len);
             for (var j = 0; j < len; j++) {
                var latlng=latlngs[j];
                var ll=latlng['lat'];
                var gg=latlng['lng'];
                var coords = pixiProject([ll,gg]);
  
  
  // our patched particleContainer accepts simple {x: ..., y: ...} objects as children:
  //window.console.log("    and xy at "+coords.x+" "+coords.y);
              
                var particle = new PIXI.TilingSprite(pTexture);
                particle.clampMargin = -0.5;
               
                particle.alpha=1; // add, multiply,screen
                particle.blendMode=0; // add, multiply,screen
  
                particle.x = coords.x - origin.x;
                particle.y= coords.y - origin.y;
  
                particle.scale.set(invScale/scaleFactor);
                a.addChild(particle);
             }
          }
window.console.log("PIXI: total of len, ",collect_len); 
          particleGroups.push( { "uid":uid, "visible":true, "segments":segments, "opacity": opacity, inner:particleContainers} ); 
       }

       renderer.render(container,{ antialias: false, resolution:2 });

    }, pixiContainer, {
      doubleBuffering: doubleBuffering,
      destroyInteractionManager: true
    }).addTo(viewermap);

    PIXI_pixiOverlayList.push({ "visible":true, "active_uid":uid, "active_opacity":opacity, "overlay":pixiOverlay,
                           "top":pixiContainer, "groups": particleGroups });
window.console.log(">>> PIXI..Make new layer into poxiOverlayList with uid of:",uid);
   $("#modalwaitpixi").modal('hide');
   }

   return uid;
}
